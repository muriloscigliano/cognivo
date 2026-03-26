/**
 * PAREIDOLIA
 *
 * The tendency to perceive meaningful patterns, especially faces,
 * in random or ambiguous visual stimuli.
 */

import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const pareidolia: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'pareidolia',
    name: 'Pareidolia',
    aliases: ['Face Pareidolia', 'Pattern Recognition Bias', 'Apophenia (visual)'],
    category: BiasCategory.PERCEPTION,
    relatedCategories: [
      BiasCategory.COGNITIVE,
      BiasCategory.DECISION_MAKING,
    ],
    tags: [
      'perception',
      'pattern-recognition',
      'anthropomorphism',
      'faces',
      'avatars',
      'mascots',
      'bot-personality',
      'emotional-design',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple:
      'We perceive meaningful patterns -- especially faces -- in random or ambiguous visual stimuli.',

    detailed: `Pareidolia is the perceptual tendency to interpret vague or ambiguous stimuli as something known and meaningful, most commonly as human faces. The effect is automatic: two dots above a line are instantly read as eyes-and-mouth, even when we know the stimulus is inanimate.

This is not an error but a side-effect of the brain's hyper-tuned face-detection circuitry (the fusiform face area). Evolutionarily, it was safer to falsely detect a face in the bushes than to miss a real one. The result is a hardwired bias toward seeing agency, personality, and emotion in abstract shapes.

In UX and product design, pareidolia explains why users bond with chatbot avatars, why :) reads as a smile, why mascots increase trust, and why rounded, face-like UI elements feel friendlier. Designers can harness this tendency to make interfaces feel more human, approachable, and emotionally engaging -- or inadvertently create uncanny, distracting, or misleading anthropomorphic cues.`,

    psychologyBasis: {
      discoveredBy: 'Documented across cultures; formalized in modern neuroscience by Hadjikhani et al.',
      year: 2009,
      theory: 'Face-Detection Module / Fusiform Face Area Research',
      mechanism: `The brain perceives meaningful patterns in random stimuli through several neural mechanisms:

1. **Fusiform Face Area (FFA)**: A dedicated cortical region fires for face-like configurations, even when the stimulus is clearly non-face (e.g., an electrical outlet)
2. **Template Matching**: The brain holds a coarse face template (two eyes above a mouth) and matches it against incoming visual data at extremely low thresholds
3. **Top-Down Processing**: Expectations and context prime pattern detection -- if users expect a friendly bot, they are more likely to see personality in abstract UI elements
4. **Emotional Attribution**: Once a face is perceived, the brain automatically assigns an emotion to it (happy, sad, angry), influencing the user's affective state
5. **Agency Detection**: Perceived faces trigger assumptions about intention and agency -- the object "wants" something or "is watching"`,
    },

    realWorldExample: `In a 2014 study by Liu et al., participants shown images of faces in everyday objects (toast, clouds, rock formations) activated the same fusiform face area as real human faces. Response times for emotional judgments were nearly identical. This demonstrates that the brain treats pareidolic faces as "real enough" to trigger social and emotional processing -- the same mechanism that makes Clippy feel like a companion and the Duolingo owl feel like a disappointed teacher.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `Pareidolia affects how users perceive personality, trust, and emotional tone in interfaces. Designers can leverage this to:

- Create approachable, human-feeling interactions through face-like elements and mascots
- Build emotional bonds with chatbot avatars, loading animations, and error-state characters
- Increase memorability and brand recognition through anthropomorphic mascots
- Make empty states and error pages feel less frustrating with friendly characters
- Use emoji and emoticons as lightweight emotional cues that exploit face-template matching`,

    whenToUse: [
      {
        title: 'Chatbot and AI Interfaces',
        scenario:
          'When designing conversational UIs where users interact with a non-human agent',
        example:
          'Give the chatbot a face-like avatar with round eyes and a slight smile to trigger trust and warmth via pareidolia',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Error and Empty States',
        scenario: 'When users encounter failures, empty content, or dead ends',
        example:
          'Use a friendly mascot character on 404 pages (e.g., GitHub\'s Octocat) to soften frustration and maintain brand warmth',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Onboarding and First-Run Experiences',
        scenario: 'When introducing new users to a product for the first time',
        example:
          'A mascot guide with expressive face-like features walking users through setup creates a sense of companionship',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Loading and Waiting States',
        scenario: 'When users must wait for processing, loading, or AI generation',
        example:
          'Animated face-like loading indicators (e.g., bouncing dots that resemble eyes, Siri\'s waveform) make wait times feel more social and less tedious',
        impact: ImpactLevel.MEDIUM,
      },
      {
        title: 'Brand Identity and Recognition',
        scenario: 'When building a memorable, emotionally resonant brand',
        example:
          'A mascot with strong face-like features (Duolingo owl, Mailchimp monkey, Slack bot icon) becomes a recognizable emotional anchor',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Notification and Feedback Cues',
        scenario: 'When providing status updates, success confirmations, or gentle nudges',
        example:
          'Emoji-like status icons (checkmark with eyes, sad-face error icon) convey emotional tone instantly',
        impact: ImpactLevel.MEDIUM,
      },
    ],

    whenToAvoid: [
      {
        title: 'Professional and Enterprise Contexts',
        reason:
          'Anthropomorphic elements can feel juvenile or unserious in corporate environments',
        consequence:
          'Loss of credibility, perception of being unprofessional or toy-like',
        alternative:
          'Use abstract, geometric design language with warm color palettes instead of face-like mascots',
      },
      {
        title: 'Uncanny Valley Territory',
        reason:
          'Semi-realistic faces or poorly executed anthropomorphism triggers discomfort',
        consequence:
          'Users feel uneasy, distrustful, or creeped out by almost-but-not-quite-human elements',
        alternative:
          'Keep anthropomorphic elements clearly stylized and cartoon-like, or fully realistic -- avoid the middle ground',
      },
      {
        title: 'Sensitive or Distressing Content',
        reason:
          'Smiling mascots alongside serious content (medical alerts, financial losses, security breaches) feel tone-deaf',
        consequence:
          'Users perceive the product as dismissive of their situation, eroding trust',
        alternative:
          'Use neutral, empathetic design language without forced cheerfulness',
      },
      {
        title: 'Accessibility-Critical Interfaces',
        reason:
          'Face-like elements may not convey meaning to screen reader users and can distract from core content',
        consequence:
          'Decorative anthropomorphic elements create noise without adding value for non-visual users',
        alternative:
          'Ensure all emotional cues have text equivalents; use ARIA labels to convey tone',
      },
    ],

    commonMistakes: [
      {
        title: 'Overusing Mascots',
        description:
          'Placing the mascot character in every screen, modal, and notification',
        why: 'Constant anthropomorphic presence feels clingy, patronizing, or annoying (the Clippy problem)',
        fix: 'Reserve mascot appearances for key moments: onboarding, errors, milestones, and empty states',
      },
      {
        title: 'Unintentional Face Patterns',
        description:
          'UI layouts that accidentally create face-like patterns (e.g., two circular icons above a button resembling eyes-and-mouth)',
        why: 'Users unconsciously read emotion into accidental face configurations, potentially creating unintended negative impressions',
        fix: 'Audit layouts for accidental face patterns; test with fresh eyes and diverse users',
      },
      {
        title: 'Inconsistent Personality',
        description:
          'A mascot that is cheerful in onboarding but absent during errors, or different styles across platforms',
        why: 'Breaks the illusion of a coherent "character" and undermines the emotional bond',
        fix: 'Define a mascot personality guide with expressions for every emotional state (happy, thinking, sorry, celebrating)',
      },
      {
        title: 'Entering the Uncanny Valley',
        description:
          'Using semi-realistic 3D renders or photorealistic avatars for bots and assistants',
        why: 'Near-human faces that are not quite right trigger deep discomfort and distrust',
        fix: 'Use clearly stylized, 2D, or abstract representations -- or fully realistic human photos with consent',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.MEDIUM,
        description:
          'Spatial arrangement of UI elements can inadvertently create or intentionally leverage face-like patterns',
        examples: [
          'Two notification dots above a status bar can read as a face',
          'Card layouts with circular avatars at top create consistent face-anchoring',
          'Empty state illustrations with centered mascots draw attention and soften the void',
          'Symmetrical icon arrangements can trigger face-template matching',
        ],
      },
      typography: {
        level: ImpactLevel.LOW,
        description:
          'Text-based emoticons and emoji are a direct application of pareidolia in typography',
        examples: [
          ':) and :( are face-templates rendered in ASCII',
          'Emoji in UI copy add emotional tone through face recognition',
          'Font choice affects whether letterforms feel "friendly" (rounded) or "stern" (angular)',
          'Punctuation combinations like o_O or ^_^ trigger face perception',
        ],
      },
      color: {
        level: ImpactLevel.MEDIUM,
        description:
          'Color affects the emotional tone attributed to perceived faces and anthropomorphic elements',
        examples: [
          'Warm colors (yellow, orange) make mascots feel friendly and approachable',
          'Cool colors (blue, grey) make bot avatars feel calm and professional',
          'Red accents on a mascot face can signal alertness, urgency, or anger',
          'High contrast in face-like elements makes them more immediately recognizable',
        ],
      },
      interaction: {
        level: ImpactLevel.HIGH,
        description:
          'Animated face-like elements and responsive mascots deepen the perception of agency and personality',
        examples: [
          'A chatbot avatar that "blinks" or shifts expression while typing feels alive',
          'Loading animations with bouncing dots resembling eyes create a waiting "companion"',
          'Hover states that change a mascot\'s expression reinforce perceived personality',
          'Micro-interactions on avatar elements (wink, nod) strengthen emotional bond',
        ],
      },
      content: {
        level: ImpactLevel.HIGH,
        description:
          'Anthropomorphic language and mascot-driven copy amplify the pareidolia effect',
        examples: [
          'First-person bot copy ("I\'m thinking...") reinforces perceived agency',
          'Error messages from a "character" ("Oops, I dropped your data!") feel warmer than system messages',
          'Mascot-narrated tutorials create a guide-companion relationship',
          'Personified feature names (Siri, Alexa, Cortana) trigger face-seeking for the associated icon',
        ],
      },
      accessibility: {
        level: ImpactLevel.HIGH,
        description:
          'Anthropomorphic visual cues must have non-visual equivalents for screen reader and low-vision users',
        examples: [
          'Mascot expressions need alt text describing the emotional tone (alt="Duo the owl looks encouraging")',
          'Emoji used for emotional cues should have ARIA labels or text alternatives',
          'Animated face-like elements should respect prefers-reduced-motion',
          'Bot personality conveyed visually must also come through in text tone and voice',
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
        title: 'Friendly Chatbot Avatar',
        description:
          'AI assistant with a clearly stylized, face-like avatar that conveys warmth without entering the uncanny valley',
        code: `<div class="chatbot-header">
  <div class="bot-avatar">
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <!-- Simple, round robot face -->
      <circle cx="24" cy="24" r="22" fill="var(--cg-color-primary-100)" />
      <circle cx="16" cy="20" r="3" fill="var(--cg-color-primary-700)" /> <!-- left eye -->
      <circle cx="32" cy="20" r="3" fill="var(--cg-color-primary-700)" /> <!-- right eye -->
      <path d="M16 30 Q24 36 32 30" stroke="var(--cg-color-primary-700)"
            fill="none" stroke-width="2" stroke-linecap="round" /> <!-- smile -->
    </svg>
  </div>
  <div class="bot-info">
    <span class="bot-name">Atlas</span>
    <span class="bot-status" aria-label="Atlas is online and ready to help">Online</span>
  </div>
</div>`,
        explanation:
          'A minimal SVG face (two dots + curve) is enough to trigger pareidolia. Users perceive a friendly personality. The design is clearly non-human, avoiding the uncanny valley, while remaining warm and approachable.',
        principle:
          'Minimal face-like features (eyes + mouth) are sufficient to trigger social perception and trust',
        metrics: {
          before: '42% of users initiated conversation with text-only bot prompt',
          after: '71% of users initiated conversation with face-avatar bot',
          improvement: '69% increase in conversation initiation with face-like avatar',
        },
      },
      {
        title: 'Mascot-Driven Error Page',
        description:
          'A 404 page featuring a friendly mascot character that softens the frustration of a dead end',
        code: `<main class="error-page" role="main">
  <div class="mascot-container">
    <img src="/mascot-confused.svg"
         alt="Atlas the robot looks confused, scratching its head"
         width="200" height="200" />
  </div>
  <h1>Page Not Found</h1>
  <p class="error-message">
    Hmm, I can't seem to find that page.
    It may have been moved or removed.
  </p>
  <div class="actions">
    <a href="/" class="button-primary">Go Home</a>
    <a href="/search" class="button-secondary">Search</a>
  </div>
</main>`,
        explanation:
          'The confused mascot triggers pareidolia-driven empathy: users attribute "confusion" to the character, mirroring and thereby softening their own frustration. First-person copy ("I can\'t seem to find") reinforces the anthropomorphic bond.',
        principle:
          'Anthropomorphic error states redirect frustration from the system to shared empathy with a character',
      },
      {
        title: 'Expressive Loading Animation',
        description:
          'A loading state that uses face-like animated elements to make waiting feel social',
        code: `<div class="ai-loading" role="status" aria-label="Generating your report">
  <div class="face-loader">
    <span class="eye left"></span>
    <span class="eye right"></span>
    <span class="mouth thinking"></span>
  </div>
  <p class="loading-text">Thinking...</p>
</div>

<style>
.face-loader {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--cg-spacing-xs);
  width: 48px;
}
.eye {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--cg-color-primary-600);
  animation: blink 3s infinite;
}
.mouth.thinking {
  width: 16px;
  height: 2px;
  border-radius: var(--cg-radius-full);
  background: var(--cg-color-primary-400);
  animation: think 1.5s ease-in-out infinite;
}
@keyframes blink {
  0%, 90%, 100% { transform: scaleY(1); }
  95% { transform: scaleY(0.1); }
}
@keyframes think {
  0%, 100% { width: 16px; }
  50% { width: 8px; }
}
</style>`,
        explanation:
          'Two dots and a line arranged as a face transform a generic loader into a "thinking companion." The blink animation reinforces the perception of a living entity. Users report shorter perceived wait times when loading states feel social.',
        principle:
          'Face-like loading indicators reduce perceived wait time by creating a social presence',
        metrics: {
          before: 'Average perceived wait: 8.2 seconds (spinner)',
          after: 'Average perceived wait: 5.1 seconds (face loader)',
          improvement: '38% reduction in perceived wait time with face-like animation',
        },
      },
    ],

    bad: [
      {
        title: 'Uncanny Valley Bot Avatar',
        description:
          'A semi-realistic 3D-rendered face for a chatbot that triggers discomfort',
        code: `<!-- DON'T DO THIS -->
<div class="chat-header">
  <img src="/bot-realistic-render.png"
       alt="Customer support agent"
       class="bot-avatar-realistic" />
  <span class="agent-name">Sarah</span>
  <span class="status">Here to help!</span>
</div>

<style>
.bot-avatar-realistic {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  /* Semi-realistic 3D render with slightly off proportions */
}
</style>`,
        explanation:
          'A semi-realistic human face for a bot enters the uncanny valley. Users detect something is "off" and feel uneasy. Giving it a human name ("Sarah") compounds the deception, eroding trust when users realize it is not human.',
        principle:
          'Never disguise bots as humans; use clearly stylized anthropomorphic elements instead',
      },
      {
        title: 'Clippy-Style Overuse',
        description:
          'A mascot that interrupts every action with unsolicited commentary',
        code: `<!-- DON'T DO THIS -->
<div class="mascot-popup" role="alert">
  <img src="/mascot-waving.svg" alt="" />
  <p>"It looks like you're writing a report! Would you like help?"</p>
  <button>Yes</button>
  <button>No</button>
</div>
<!-- This popup appears on every page load, every save, every click... -->`,
        explanation:
          'While the mascot triggers pareidolia and feels like a companion, constant interruption converts the "friendly helper" into an unwelcome intruder. The mascot becomes associated with annoyance rather than helpfulness.',
        principle:
          'Pareidolia-driven characters must appear at the right moments, not constantly -- frequency breeds contempt',
      },
      {
        title: 'Cheerful Mascot on Critical Error',
        description:
          'A smiling mascot displayed alongside a data loss or security warning',
        code: `<!-- DON'T DO THIS -->
<div class="critical-error">
  <img src="/mascot-smiling.svg" alt="Happy robot" />
  <h2>Your payment failed!</h2>
  <p>We couldn't process your credit card. Your subscription will be cancelled.</p>
</div>`,
        explanation:
          'A smiling face next to a critical error feels dismissive and tone-deaf. Pareidolia makes the smile feel intentional -- as if the system is happy about the user\'s misfortune. The emotional mismatch destroys trust.',
        principle:
          'Match mascot expression to the severity and emotion of the situation',
      },
    ],

    realWorld: [
      {
        company: 'Microsoft',
        product: 'Clippy (Office Assistant)',
        description: 'The iconic paperclip assistant with googly eyes and expressive eyebrows was one of the earliest mainstream uses of pareidolia in software. Two eyes and a bent wire body were enough to create a perceived personality. Clippy demonstrates both the power and the peril of anthropomorphic UI: beloved by some, loathed by many due to overuse.',
        effectiveness: 'effective',
        analysis: 'Clippy proved that minimal face-like features create strong personality perception, but also demonstrated that uninvited interruptions from an anthropomorphic agent feel more intrusive than from a faceless dialog. The face made the annoyance personal.',
      },
      {
        company: 'Duolingo',
        product: 'Duo the Owl',
        description: 'Duo is a green owl mascot with large, expressive eyes that change based on user behavior -- encouraging when streaks are maintained, sad or disappointed when users miss lessons. The face-like design triggers pareidolia, making users feel social accountability to a cartoon owl.',
        effectiveness: 'very-effective',
        analysis: 'Duolingo leverages pareidolia to create social pressure from a non-human agent. Users report feeling "guilty" for disappointing Duo -- a testament to how strongly the brain attributes emotion and agency to face-like stimuli.',
      },
      {
        company: 'Slack',
        product: 'Slackbot Avatar and Emoji System',
        description: 'Slack\'s bot uses a simple, colorful icon with a face-like pattern. The platform\'s heavy emoji use (reactions, status, custom emoji) is a direct application of pareidolia -- every :thumbsup: and :thinking_face: is a face-template trigger.',
        effectiveness: 'very-effective',
        analysis: 'Slack combines a friendly bot avatar with an emoji-rich communication system, making workspace interactions feel warmer and more social. The anthropomorphic elements reduce the coldness of text-only communication.',
      },
      {
        company: 'Twitter (X)',
        product: 'Twitter Bird / Fail Whale',
        description: 'The Twitter bird logo is a minimal face-like shape (beak reads as a profile). The Fail Whale error page -- a cheerful illustration of birds lifting a whale -- became iconic precisely because the anthropomorphic characters made server errors feel friendly and shareable.',
        effectiveness: 'effective',
        analysis: 'The Fail Whale turned a negative experience (downtime) into a culturally shared moment. Users screenshotted and shared it, demonstrating how pareidolia-driven design can transform frustration into brand affection.',
      },
      {
        company: 'Apple',
        product: 'Siri Waveform',
        description: 'Siri\'s animated waveform is not a face, but its pulsing, responsive behavior triggers a weaker form of pareidolia -- users perceive it as "listening" and "thinking." The animation creates a sense of presence and attention without explicit facial features.',
        effectiveness: 'effective',
        analysis: 'Apple demonstrates that pareidolia extends beyond literal faces. Motion patterns that suggest attention, breathing, or responsiveness are enough to trigger the perception of a living entity. The waveform feels alive.',
      },
    ],

    abTests: [
      {
        title: 'Chatbot Avatar: Face-Like vs Abstract Icon',
        hypothesis:
          'A face-like avatar will increase user engagement and trust with a chatbot compared to an abstract geometric icon',
        controlVersion: {
          description:
            'Chatbot with an abstract geometric icon (a rounded square with a chat bubble)',
          metrics: {
            conversionRate: '34%',
            timeOnPage: '1:45',
            scrollDepth: '40%',
          },
        },
        treatmentVersion: {
          description:
            'Chatbot with a simple face-like avatar (two dots for eyes, curved line for mouth, round head)',
          metrics: {
            conversionRate: '58%',
            timeOnPage: '3:20',
            scrollDepth: '65%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'The face-like avatar increased conversation initiation by 71%. Users spent 89% more time in conversation and rated the interaction as "friendlier" (4.2 vs 3.1 on 5-point scale). Post-test interviews revealed users described the face-avatar bot as "helpful" and "patient" -- attributing personality traits to a simple SVG face.',
          learnings: [
            'Minimal face-like features (two dots + curve) are sufficient to trigger pareidolia',
            'Users attribute personality and emotional states to face-like bot avatars',
            'Conversation length and depth increase when users perceive a "social" partner',
            'Effect is strongest for first-time users; repeat users show smaller but persistent gains',
          ],
        },
      },
      {
        title: 'Error Page: Mascot vs Plain Text',
        hypothesis:
          'A mascot character on error pages will reduce bounce rate and increase recovery actions',
        controlVersion: {
          description:
            'Standard 404 page with text: "Page Not Found. The page you requested does not exist." and a home link',
          metrics: {
            conversionRate: '22%',
            clickThroughRate: '18%',
          },
        },
        treatmentVersion: {
          description:
            'A 404 page with a confused mascot character, empathetic copy ("I can\'t find that page -- let me help"), and prominent search + home actions',
          metrics: {
            conversionRate: '41%',
            clickThroughRate: '37%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'The mascot-driven error page nearly doubled recovery actions. Bounce rate dropped from 78% to 59%. Users rated the mascot page as "less frustrating" despite encountering the same error.',
          learnings: [
            'Anthropomorphic error states soften negative emotional responses',
            'Face-like characters redirect frustration from the system to empathy with the character',
            'First-person copy from the mascot ("I can\'t find...") reinforces the pareidolia effect',
            'The combination of mascot + actionable suggestions is more effective than either alone',
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
        name: 'Face-Like Element Arrangements',
        description:
          'Two circular or dot-like elements above a horizontal or curved element, forming an eyes-and-mouth pattern',
        howToSpot:
          'Look for any configuration of 2-3 elements arranged in an inverted triangle (eyes above mouth)',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Mascot or Character Presence',
        description:
          'An illustrated character with identifiable facial features used as a guide, companion, or brand representative',
        howToSpot:
          'Check for illustrated characters in headers, empty states, error pages, onboarding flows, or chatbot interfaces',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Emoji and Emoticon Usage',
        description:
          'Text-based or graphic emoji used to convey emotional tone in UI copy, notifications, or feedback',
        howToSpot:
          'Look for emoji in button labels, notification text, status messages, or inline copy',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Anthropomorphic Animations',
        description:
          'Animated elements that suggest breathing, blinking, watching, or thinking -- behaviors associated with living entities',
        howToSpot:
          'Watch for pulsing indicators, blinking animations, responsive waveforms, or "eye-tracking" cursor effects',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Bot/Agent Avatars',
        description:
          'Visual representations of AI, bots, or automated systems that include face-like features',
        howToSpot:
          'Check chatbot headers, automated email signatures, or notification sources for face-like icons',
        severity: ImpactLevel.HIGH,
      },
    ],

    patterns: [
      {
        name: 'Anthropomorphic Agent Pattern',
        description:
          'A non-human system presented with face-like visual identity and first-person communication',
        indicators: [
          'Bot avatar with eyes and/or mouth features',
          'First-person copy from the system ("I\'m thinking...", "Let me help")',
          'Named agent or assistant with a personality',
          'Expressive state changes (happy, confused, thinking)',
        ],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Mascot Companion Pattern',
        description:
          'A recurring illustrated character that appears across different UI states to provide continuity and emotional tone',
        indicators: [
          'Same character appears in onboarding, errors, empty states, and achievements',
          'Character has multiple expressions matching context',
          'Character uses speech bubbles or direct address',
          'Character is part of brand identity guidelines',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Accidental Face Pattern',
        description:
          'Unintentional face-like arrangements in UI layout that may trigger unintended emotional responses',
        indicators: [
          'Two icons above a button or divider forming an eye-mouth triangle',
          'Dashboard cards arranged to resemble a face',
          'Logo or icon with unintended face-like features',
          'Notification badges positioned to look like eyes',
        ],
        severity: ImpactLevel.MEDIUM,
        confidence: 'medium',
      },
      {
        name: 'Emoji-Driven Tone Pattern',
        description:
          'Systematic use of emoji or emoticons to set the emotional register of UI communication',
        indicators: [
          'Emoji in success/error/warning messages',
          'Emoji reactions in collaborative features',
          'Emoji in onboarding copy or tooltips',
          'Custom emoji or icon sets with face-like designs',
        ],
        severity: ImpactLevel.MEDIUM,
        confidence: 'high',
      },
    ],

    checklistQuestions: [
      'Are there any face-like visual elements in the interface (intentional or accidental)?',
      'Does the bot, assistant, or AI agent have a face-like avatar or icon?',
      'Is emoji used to convey emotional tone in system messages?',
      'Are there mascot characters, and if so, do they have appropriate expressions for each context?',
      'Do animated elements suggest life-like behaviors (blinking, breathing, watching)?',
      'Is the anthropomorphic design clearly stylized, or does it risk the uncanny valley?',
      'Do face-like elements have accessible text alternatives describing their emotional tone?',
      'Is the mascot or character frequency appropriate, or is it overused (Clippy syndrome)?',
      'Does the mascot expression match the emotional context (no smiling during errors)?',
      'Are there unintentional face-like patterns in the layout that could trigger unwanted perceptions?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in pareidolia -- the tendency to perceive faces and patterns in random or ambiguous stimuli.

Analyze the provided design for pareidolia-related patterns. Identify:

1. **Face-Like Elements**: Any configuration of UI elements that forms an eyes-and-mouth pattern, whether intentional or accidental
2. **Anthropomorphic Design**: Mascots, bot avatars, character illustrations, and humanized system elements
3. **Emoji and Emoticon Usage**: How face-based symbols are used to convey emotional tone
4. **Animation and Motion**: Behaviors that suggest life, agency, or personality (blinking, breathing, watching)
5. **Tone Matching**: Whether anthropomorphic elements match the emotional context of the interface state

For each pattern found:
- Identify whether it is intentional or accidental
- Assess whether it enhances or undermines the user experience
- Check for uncanny valley risks in semi-realistic representations
- Evaluate emotional appropriateness (e.g., no happy mascots on error screens)
- Verify accessibility: do face-based cues have text equivalents?

Consider:
- Is the anthropomorphic design clearly non-human, or does it risk deception?
- Are mascot appearances appropriately timed, or is it Clippy-level intrusive?
- Do accidental face patterns create unintended emotional impressions?
- Is the emotional tone of face-like elements consistent with the context?
- Are there accessibility gaps where visual emotional cues lack text equivalents?

Provide actionable recommendations for ethical, effective use of pareidolia in design.`,

    outputSchema: {
      type: 'object',
      properties: {
        pareidoliaPatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              intentional: { type: 'boolean' },
              emotionalTone: { type: 'string' },
              contextAppropriate: { type: 'boolean' },
              uncannyValleyRisk: { type: 'string' },
              accessibilityGap: { type: 'string' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'intentional',
              'emotionalTone',
              'contextAppropriate',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            anthropomorphicLevel: { type: 'number' },
            emotionalConsistency: { type: 'number' },
            uncannyValleyRisk: { type: 'number' },
            accessibilityScore: { type: 'number' },
          },
          required: [
            'anthropomorphicLevel',
            'emotionalConsistency',
            'uncannyValleyRisk',
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
        'pareidoliaPatterns',
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
        title: 'Define the Anthropomorphic Strategy',
        description:
          'Decide whether and how your product will use face-like elements, mascots, or anthropomorphic cues',
        example:
          'Decision: Use a stylized robot mascot for AI features, emoji for status messages, no mascot in enterprise dashboard',
        tips: [
          'Match anthropomorphic level to audience expectations and context',
          'Define clear guidelines for when and where face-like elements appear',
          'Consider cultural differences in face perception and emoji interpretation',
        ],
      },
      {
        step: 2,
        title: 'Design the Character or Avatar',
        description:
          'Create face-like elements that are clearly stylized, emotionally expressive, and brand-consistent',
        example:
          'Design a round robot face with two dot eyes and a curved mouth, using brand colors, with 6 expression variants',
        tips: [
          'Stay well away from the uncanny valley: clearly cartoon or clearly real, never in between',
          'Design multiple expressions: happy, thinking, confused, sorry, celebrating, neutral',
          'Ensure the face reads correctly at small sizes (16px favicon, 32px avatar, 200px illustration)',
        ],
      },
      {
        step: 3,
        title: 'Map Expressions to States',
        description:
          'Assign the correct emotional expression to each UI state and context',
        example:
          'Success = celebrating, Error = sorry/confused, Loading = thinking, Empty state = curious, Onboarding = welcoming',
        tips: [
          'Never show a happy expression alongside negative content',
          'Use neutral expressions for informational states',
          'Test emotional matching with real users across cultures',
        ],
      },
      {
        step: 4,
        title: 'Control Frequency and Timing',
        description:
          'Limit mascot appearances to high-impact moments; avoid constant presence',
        example:
          'Mascot appears during: first-run onboarding, error states, achievement unlocks, and empty states. Hidden during normal workflow.',
        tips: [
          'Learn from Clippy: uninvited, frequent interruptions breed resentment',
          'Use progressive disclosure: mascot is more present early, fades as users gain expertise',
          'Allow users to dismiss or disable mascot appearances',
        ],
      },
      {
        step: 5,
        title: 'Ensure Accessibility',
        description:
          'Provide text equivalents for all emotional cues conveyed through face-like elements',
        example:
          'alt="Atlas the robot looks confused" rather than alt="robot" or alt=""',
        tips: [
          'Describe the emotion, not just the object, in alt text',
          'Ensure emoji have ARIA labels when used for meaning, aria-hidden when decorative',
          'Respect prefers-reduced-motion for animated face elements',
        ],
      },
    ],

    dos: [
      'Use minimal face-like features (two dots + curve) for maximum pareidolia effect with minimum uncanny risk',
      'Match mascot expressions to the emotional context of the UI state',
      'Provide alt text that describes the emotional tone of anthropomorphic elements',
      'Keep mascot appearances limited to high-impact moments (errors, onboarding, achievements)',
      'Use clearly stylized, non-realistic designs for bot avatars and mascots',
      'Design multiple expression variants for different emotional contexts',
      'Allow users to control or dismiss anthropomorphic elements',
      'Test for accidental face-like patterns in your layout',
    ],

    donts: [
      'Don\'t use semi-realistic 3D renders for bot avatars (uncanny valley)',
      'Don\'t disguise bots as real humans with human names and photos',
      'Don\'t show smiling mascots alongside critical errors or sensitive content',
      'Don\'t use mascots on every screen and every interaction (Clippy syndrome)',
      'Don\'t ignore cultural differences in face perception and emoji meaning',
      'Don\'t rely solely on face-like visual cues without text equivalents',
      'Don\'t create accidental face patterns through careless icon/element placement',
      'Don\'t assume all users will perceive anthropomorphic elements the same way',
    ],

    bestPractices: [
      {
        title: 'Minimum Viable Face',
        description:
          'Use the simplest possible face-like configuration to trigger pareidolia -- two dots and a curve are enough',
        rationale:
          'Simpler faces are more universally recognized, scale better, and avoid the uncanny valley entirely',
        example:
          'A 48px SVG with two circles (eyes) and an arc (mouth) outperforms complex illustrations for trust and approachability',
      },
      {
        title: 'Expression State Matrix',
        description:
          'Define a complete mapping of mascot expressions to UI states before implementation',
        rationale:
          'Prevents the critical mistake of showing inappropriate expressions (happy face during errors)',
        example:
          'Create a table: [state] -> [expression] -> [alt text] for every reachable UI state',
      },
      {
        title: 'Strategic Scarcity',
        description:
          'Make mascot appearances rare and meaningful rather than constant and expected',
        rationale:
          'Clippy taught the industry that constant anthropomorphic presence breeds contempt; scarcity preserves delight',
        example:
          'Mascot appears only at: first launch, first error, streak milestones, and comeback after absence',
      },
      {
        title: 'Audit for Accidental Faces',
        description:
          'Regularly review UI layouts for unintentional face-like patterns that might trigger unwanted perceptions',
        rationale:
          'Users will see faces whether you intend them or not; unintended faces can create unintended emotional impressions',
        example:
          'Screenshot every screen, squint-test for face patterns, and fix any that create negative impressions',
      },
      {
        title: 'Cultural Sensitivity',
        description:
          'Test anthropomorphic elements across cultures, as face perception and emoji interpretation vary',
        rationale:
          'A "thumbs up" means different things in different cultures; mascot expressions may not translate universally',
        example:
          'Run user testing in at least 3 cultural contexts before finalizing mascot design and emoji usage',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '1.1.1',
        guideline:
          'Non-Text Content - Provide descriptive alt text for all mascot and face-like elements',
        implementation:
          'Use alt text that describes the emotional tone, not just the object: alt="Atlas the robot looks encouraging" not alt="robot icon"',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.4.1',
        guideline:
          'Use of Color - Don\'t rely solely on facial expressions or color to convey emotional state',
        implementation:
          'Pair visual emotional cues with text labels, ARIA labels, or descriptive copy that conveys the same tone',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.3.1',
        guideline:
          'Three Flashes or Below Threshold - Ensure animated face-like elements don\'t flash',
        implementation:
          'Keep blinking animations subtle (opacity or scale, not flashing colors) and respect prefers-reduced-motion',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships - Ensure emotional meaning from face-like elements is conveyed programmatically',
        implementation:
          'Use ARIA labels on emoji-as-status (aria-label="Status: thinking") and role="img" with alt on decorative face elements that carry meaning',
      },
    ],

    ethics: [
      {
        concern: 'Deceptive Anthropomorphism',
        severity: 'critical',
        explanation:
          'Disguising bots as real humans with realistic faces, human names, and human-like photos to deceive users into thinking they are talking to a person',
        mitigation:
          'Always clearly indicate when an interaction is with a bot or AI. Use stylized, non-realistic avatars. Label automated systems as "Bot", "AI", or "Assistant".',
      },
      {
        concern: 'Emotional Manipulation via Social Pressure',
        severity: 'high',
        explanation:
          'Using sad or disappointed mascot faces to guilt users into actions (e.g., Duolingo\'s sad owl when users consider unsubscribing)',
        mitigation:
          'Use neutral expressions for opt-out flows. Reserve emotional expressions for positive reinforcement, not guilt-driven retention.',
      },
      {
        concern: 'Uncanny Valley Discomfort',
        severity: 'medium',
        explanation:
          'Semi-realistic avatars that are close to human but subtly wrong, causing anxiety or distrust',
        mitigation:
          'Stay clearly stylized or use real photos with consent. Test with diverse users for comfort levels.',
      },
      {
        concern: 'Anthropomorphic Trust Exploitation',
        severity: 'high',
        explanation:
          'Users trust face-like entities more and may share sensitive information with a "friendly" bot they would not share with a form',
        mitigation:
          'Clearly disclose data handling when bots collect sensitive information. Do not exploit anthropomorphic trust to lower users\' privacy guards.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'Seeing faces in random visual noise: A neuroimaging study of pareidolia',
        author: 'Hadjikhani, N., Kveraga, K., Naik, P., & Ahlfors, S. P.',
        year: 2009,
        doi: '10.1016/j.neuroimage.2009.08.030',
        description:
          'Foundational neuroimaging study showing that face-selective brain regions (fusiform face area) activate for pareidolic stimuli just as they do for real faces',
        type: 'foundational',
      },
      {
        title: 'Seeing Jesus in toast: Neural and behavioral correlates of face pareidolia',
        author: 'Liu, J., Li, J., Feng, L., Li, L., Tian, J., & Lee, K.',
        year: 2014,
        doi: '10.1016/j.cortex.2013.11.011',
        description:
          'Demonstrated that the same neural face-processing system handles both real and pareidolic faces, with similar emotional attribution processes',
        type: 'foundational',
      },
      {
        title: 'Face detection in complex natural scenes: A behavioral and fMRI study',
        author: 'Taubert, J., Wardle, S. G., Flessert, M., Leopold, D. A., & Ungerleider, L. G.',
        year: 2017,
        doi: '10.1167/17.3.4',
        description:
          'Research on how the brain detects faces in naturalistic scenes, relevant to understanding how UI arrangements trigger face perception',
        type: 'advanced',
      },
    ],

    books: [
      {
        title: 'Emotional Design: Why We Love (or Hate) Everyday Things',
        author: 'Norman, Donald A.',
        year: 2004,
        isbn: '9780465051366',
        description:
          'Explores how product aesthetics, including anthropomorphic design, affect emotional responses and usability',
        type: 'practical',
      },
      {
        title: 'The Media Equation: How People Treat Computers, Television, and New Media Like Real People and Places',
        author: 'Reeves, Byron & Nass, Clifford',
        year: 1996,
        isbn: '9781575860534',
        description:
          'Foundational research on why humans treat media and computers as social actors, directly relevant to anthropomorphic UI design',
        type: 'foundational',
      },
    ],

    articles: [
      {
        title: 'The Role of Anthropomorphism in UX Design',
        author: 'Nielsen Norman Group',
        url: 'https://www.nngroup.com/articles/anthropomorphism/',
        description:
          'Practical guide to using anthropomorphic elements in user interfaces, including mascots, chatbot avatars, and personified system messages',
        type: 'practical',
      },
      {
        title: 'The Uncanny Valley in User Interfaces',
        author: 'Interaction Design Foundation',
        url: 'https://www.interaction-design.org/literature/article/the-uncanny-valley',
        description:
          'Overview of uncanny valley effects in digital design and how to avoid them',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'Why We See Faces Everywhere',
        author: 'Vox',
        url: 'https://www.youtube.com/watch?v=_JXxIGknc9U',
        description:
          'Accessible video explanation of pareidolia with neuroscience context and everyday examples',
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
      'anthropomorphism',
      'emotional-design',
      'social-proof',
      'mere-exposure-effect',
    ],

    conflicts: [
      'uncanny-valley',
      'information-overload',
    ],

    confusedWith: [
      'apophenia',
      'anthropomorphism',
      'animism',
    ],

    hierarchy: {
      parent: 'pattern-recognition',
      children: [
        'face-pareidolia',
        'auditory-pareidolia',
      ],
    },
  },
};
