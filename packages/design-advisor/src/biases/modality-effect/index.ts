/**
 * MODALITY EFFECT
 *
 * Information presented auditorily is recalled differently than visually;
 * auditory presentation produces a stronger recency effect.
 */

import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const modalityEffect: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'modality-effect',
    name: 'Modality Effect',
    aliases: ['Modality Principle', 'Auditory Recency Effect', 'Multi-Modal Learning Effect'],
    category: BiasCategory.MEMORY,
    relatedCategories: [
      BiasCategory.PERCEPTION,
      BiasCategory.COGNITIVE,
    ],
    tags: [
      'memory',
      'learning',
      'multi-modal',
      'audio',
      'visual',
      'recency',
      'accessibility',
      'multimedia',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple:
      'Information presented auditorily is recalled differently than information presented visually, with auditory presentation producing a stronger recency effect.',

    detailed: `The modality effect describes the phenomenon where memory performance differs depending on whether information is presented through auditory or visual channels. Most notably, items at the end of a list are remembered significantly better when presented auditorily (spoken aloud) compared to visually (read silently). This auditory advantage for recent items is known as the auditory recency effect.

The effect has profound implications for multimedia learning and interface design. When information is delivered through multiple sensory channels simultaneously — such as narrated visuals or audio-accompanied text — retention and comprehension improve dramatically compared to single-channel delivery. This is because the auditory and visual processing systems operate semi-independently in working memory, effectively expanding cognitive capacity.

In UX design, the modality effect informs decisions about when to use audio narration, sound feedback, video tutorials, multi-modal onboarding, and accessible content delivery. Designers who leverage complementary modalities can reduce cognitive load while improving recall and user engagement.`,

    psychologyBasis: {
      discoveredBy: 'Crowder and Morton',
      year: 1969,
      theory: 'Precategorical Acoustic Store (PAS) / Dual Coding Theory',
      mechanism: `The modality effect arises from fundamental differences in how auditory and visual information is processed and stored in memory:

1. **Precategorical Acoustic Store (PAS)**: Auditory information persists in a brief echoic memory store (~2-4 seconds) that has no visual equivalent, giving the last few auditory items a recall advantage
2. **Temporal Encoding**: Auditory input is inherently temporal and sequential, creating stronger order and recency cues than visual input, which can be processed simultaneously
3. **Dual Coding**: When information arrives through both auditory and visual channels, it is encoded twice in distinct subsystems (Paivio's Dual Coding Theory), creating redundant memory traces
4. **Reduced Cognitive Load**: Splitting information across modalities distributes the load between the phonological loop and visuospatial sketchpad in working memory (Baddeley's model), preventing either channel from being overloaded
5. **Echoic vs Iconic Persistence**: Echoic memory (auditory) lasts longer (~3-4 seconds) than iconic memory (visual, ~250ms), giving auditory information a temporal advantage for recent items`,
    },

    realWorldExample: `In a classic experiment by Crowder (1972), participants were presented with lists of digits either visually (on screen) or auditorily (spoken aloud). Recall of the last 2-3 items was significantly better for auditorily presented lists, while recall of earlier items was roughly equivalent across modalities. This auditory recency advantage disappears when a "suffix" stimulus (an irrelevant spoken item) is added at the end, confirming the role of the precategorical acoustic store.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `The Modality Effect informs how designers should present information across sensory channels to maximize comprehension and recall. Designers can leverage this to:

- Combine audio narration with visual content for tutorials and onboarding
- Use sound feedback to reinforce visual actions and confirmations
- Present critical last-step information auditorily for stronger recency recall
- Design multi-modal learning experiences that reduce cognitive load
- Improve accessibility by providing information through complementary channels`,

    whenToUse: [
      {
        title: 'Tutorial and Onboarding Flows',
        scenario:
          'When teaching users how to use complex features or workflows',
        example:
          'Pair step-by-step visual walkthroughs with audio narration explaining each step, leveraging dual encoding for better retention',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Video Documentation',
        scenario: 'When creating help content, guides, or documentation',
        example:
          'Produce narrated screencasts rather than text-only docs, combining visual demonstration with spoken explanation',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Action Feedback and Confirmations',
        scenario: 'When users complete important actions or encounter errors',
        example:
          'Play a subtle confirmation sound alongside a visual success message for form submissions; use an error tone paired with a visual alert for failures',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Accessibility and Screen Reader Support',
        scenario: 'When designing for users who rely on auditory interfaces',
        example:
          'Ensure meaningful ARIA labels and live regions so screen reader users receive auditory equivalents of visual state changes',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Interactive Learning Platforms',
        scenario: 'When building educational content or skill-training interfaces',
        example:
          'Combine visual exercises with audio pronunciation guides (like Duolingo), leveraging the modality effect for better vocabulary retention',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Critical Information at End of Sequences',
        scenario: 'When the final step in a flow contains the most important information',
        example:
          'Present the final confirmation or summary auditorily (or multi-modally) to exploit the auditory recency advantage',
        impact: ImpactLevel.MEDIUM,
      },
    ],

    whenToAvoid: [
      {
        title: 'Noisy or Public Environments',
        reason:
          'Audio content is unusable in loud environments or where sound would disturb others',
        consequence:
          'Users miss critical information if audio is the only channel; frustration and task failure in public settings',
        alternative:
          'Always provide visual equivalents (captions, transcripts) alongside audio; never make audio the sole delivery channel',
      },
      {
        title: 'Dense Data or Reference Material',
        reason:
          'Auditory presentation is poor for information users need to scan, compare, or revisit',
        consequence:
          'Users cannot skim or search audio content, leading to inefficiency and frustration',
        alternative:
          'Use visual tables, charts, and text for reference material; reserve audio for narrative explanations',
      },
      {
        title: 'Hearing-Impaired Users',
        reason:
          'Relying on audio excludes deaf and hard-of-hearing users',
        consequence:
          'Accessibility violations and exclusion of a significant user population',
        alternative:
          'Provide synchronized captions, transcripts, and visual alternatives for all audio content (WCAG 1.2)',
      },
      {
        title: 'Autoplay or Unsolicited Audio',
        reason:
          'Unexpected sound is disruptive and violates user control expectations',
        consequence:
          'Users will mute, leave, or distrust the interface; accessibility violations (WCAG 1.4.2)',
        alternative:
          'Let users opt in to audio; provide clear play controls and mute options',
      },
    ],

    commonMistakes: [
      {
        title: 'Audio Without Visual Fallback',
        description:
          'Presenting critical information only through audio with no visual alternative',
        why: 'Excludes users in noisy environments, those with hearing impairments, and those who prefer reading',
        fix: 'Always provide captions, transcripts, or visual equivalents alongside audio content',
      },
      {
        title: 'Redundant Modalities Instead of Complementary',
        description:
          'Showing text on screen while simultaneously reading the exact same text aloud',
        why: 'Reading identical text while hearing it creates split attention and redundancy, not dual coding; the two channels compete rather than complement',
        fix: 'Use audio to narrate or explain while visuals show diagrams, animations, or demonstrations — each channel should carry different but related information',
      },
      {
        title: 'Overloading a Single Channel',
        description:
          'Cramming all information into one modality (e.g., walls of text or non-stop narration)',
        why: 'Overwhelms the single working memory subsystem while leaving the other channel idle',
        fix: 'Distribute information across modalities: use narration for explanations and visuals for spatial/structural information',
      },
      {
        title: 'Ignoring User Preferences and Context',
        description:
          'Forcing audio-heavy experiences without considering user context or preferences',
        why: 'Users in offices, libraries, or commuting without headphones cannot use audio',
        fix: 'Detect user context when possible, default to visual-first, and let users opt into audio enhancements',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.MEDIUM,
        description:
          'Layout must accommodate multi-modal elements like video players, audio controls, and caption areas',
        examples: [
          'Video tutorial sections need space for captions and playback controls',
          'Audio feedback indicators should be visually represented with icons or animations',
          'Multi-modal onboarding requires layout space for both visual and audio player elements',
          'Transcript panels need to be positioned for easy reference alongside media',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Text should complement audio rather than duplicate it; caption and transcript typography matters',
        examples: [
          'Caption text must be legible against video backgrounds (contrast, size, shadows)',
          'Visual labels should summarize while narration elaborates — not repeat verbatim',
          'Transcript formatting should aid scanning with timestamps and headings',
          'Key terms shown visually while defined auditorily create dual-coded memory traces',
        ],
      },
      color: {
        level: ImpactLevel.LOW,
        description:
          'Color plays a secondary role but supports multi-modal indicators and feedback states',
        examples: [
          'Audio playing states can be indicated with color changes (e.g., pulsing accent color)',
          'Caption backgrounds need sufficient contrast for readability',
          'Visual feedback that accompanies audio cues should use consistent color coding',
          'Mute/unmute states clearly distinguished through color and icon',
        ],
      },
      interaction: {
        level: ImpactLevel.CRITICAL,
        description:
          'Audio interactions require clear controls, feedback timing, and multi-modal synchronization',
        examples: [
          'Play/pause/mute controls must be immediately accessible and clearly labeled',
          'Audio feedback for actions (clicks, completions, errors) must be synchronized with visual feedback',
          'Scrubbing or seeking in audio/video must maintain caption synchronization',
          'Volume controls and audio preferences should persist across sessions',
        ],
      },
      content: {
        level: ImpactLevel.CRITICAL,
        description:
          'Content strategy must plan for complementary information across modalities, not duplication',
        examples: [
          'Narration should explain "why" while visuals show "what" — not the same content twice',
          'Key terminology should be both spoken and shown on screen for dual encoding',
          'Sequential information benefits from audio delivery to exploit the recency effect',
          'Complex spatial information (diagrams, layouts) should be visual with audio annotation',
        ],
      },
      accessibility: {
        level: ImpactLevel.CRITICAL,
        description:
          'Multi-modal design directly affects accessibility; all channels must have alternatives',
        examples: [
          'All audio content must have synchronized captions (WCAG 1.2.2)',
          'Pre-recorded video must have audio descriptions for visual content (WCAG 1.2.5)',
          'Screen reader users receive information auditorily — structure must support this',
          'Users must be able to pause, stop, or control all audio (WCAG 1.4.2)',
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
        title: 'Narrated Interactive Tutorial',
        description:
          'Software onboarding combining audio narration with visual step highlighting',
        code: `<div class="tutorial-step" aria-live="polite">
  <div class="visual-guide">
    <div class="highlighted-area" aria-label="Click the Create button">
      <img src="screenshot-create-btn.png" alt="Create button highlighted in the toolbar">
      <div class="pulse-indicator"></div>
    </div>
  </div>

  <div class="audio-narration">
    <audio id="step-narration" preload="auto">
      <source src="step-3-narration.mp3" type="audio/mpeg">
    </audio>
    <button class="play-narration" aria-label="Play step narration">
      <span class="icon">🔊</span> Listen to instructions
    </button>
    <p class="caption">
      "Click the Create button in the top toolbar to start a new project.
      You can also use the keyboard shortcut Ctrl+N."
    </p>
  </div>

  <div class="step-progress">
    <span>Step 3 of 7</span>
    <button class="next-step">Next →</button>
  </div>
</div>`,
        explanation:
          'The visual highlight shows WHERE to act while audio narration explains WHY and HOW. Each modality carries complementary information, creating dual-coded memory traces. Captions ensure accessibility when audio is unavailable.',
        principle:
          'Complementary multi-modal delivery improves recall over single-channel presentation',
        metrics: {
          before: '54% of users completed onboarding with text-only tutorial',
          after: '81% completed onboarding with narrated visual tutorial',
          improvement: '50% increase in onboarding completion with multi-modal delivery',
        },
      },
      {
        title: 'Audio Feedback for User Actions',
        description:
          'Subtle sound cues paired with visual confirmations for important actions',
        code: `<div class="save-feedback" role="status" aria-live="polite">
  <!-- Visual confirmation -->
  <div class="toast success" aria-label="Document saved successfully">
    <span class="icon">✓</span>
    <span class="message">Document saved</span>
  </div>

  <!-- Audio confirmation (user-controlled) -->
  <audio id="save-sound" preload="auto">
    <source src="sounds/save-confirm.mp3" type="audio/mpeg">
  </audio>
</div>

<script>
  // Respect user audio preferences
  function confirmSave() {
    showToast('Document saved');
    if (userPreferences.audioFeedback) {
      playSound('save-sound');
    }
  }
</script>

<!-- User control for audio feedback -->
<div class="audio-preferences">
  <label>
    <input type="checkbox" id="audio-feedback-toggle">
    Enable sound feedback for actions
  </label>
</div>`,
        explanation:
          'The dual confirmation (visual toast + audio chime) creates a stronger memory signal that the action succeeded. Critically, audio is opt-in and never the sole feedback channel.',
        principle:
          'Multi-modal feedback reinforces action confirmation through dual encoding',
      },
      {
        title: 'Language Learning with Audio + Visual',
        description:
          'Vocabulary exercise combining written word, image, and pronunciation',
        code: `<div class="vocab-card" role="group" aria-label="Vocabulary: Bonjour">
  <div class="visual-content">
    <img src="greeting-illustration.svg"
         alt="Two people waving hello to each other">
    <p class="word" lang="fr">Bonjour</p>
    <p class="translation">Hello / Good morning</p>
  </div>

  <div class="audio-content">
    <button class="pronunciation" aria-label="Hear pronunciation of Bonjour">
      <span class="icon">🔊</span> Listen
    </button>
    <audio preload="auto">
      <source src="audio/bonjour.mp3" type="audio/mpeg">
    </audio>
  </div>

  <div class="practice">
    <button class="record" aria-label="Record your pronunciation">
      <span class="icon">🎙</span> Speak
    </button>
    <p class="hint">Try saying "bon-ZHOOR"</p>
  </div>
</div>`,
        explanation:
          'Three modalities work together: the visual shows the written word and context image, audio provides correct pronunciation, and the speak-back feature adds kinesthetic encoding. Each channel reinforces the others without redundancy.',
        principle:
          'Multi-modal encoding (visual + auditory + kinesthetic) creates the strongest memory traces',
      },
    ],

    bad: [
      {
        title: 'Reading Text Aloud Without Adding Value',
        description:
          'Tutorial that simply reads on-screen text word-for-word',
        code: `<!-- DON'T DO THIS -->
<div class="tutorial-step">
  <p class="instruction">Click the blue "Submit" button at the bottom
  of the form to send your application.</p>

  <audio autoplay>
    <!-- Narration says: "Click the blue Submit button at the bottom
    of the form to send your application." -->
    <source src="step-narration.mp3" type="audio/mpeg">
  </audio>
</div>`,
        explanation:
          'Reading the exact same text that is displayed on screen creates redundancy, not dual coding. The two channels compete for the same verbal processing resources rather than complementing each other. Additionally, autoplay audio violates user control.',
        principle:
          'Identical content in both channels wastes cognitive capacity; audio should narrate while visuals demonstrate',
      },
      {
        title: 'Audio-Only Critical Instructions',
        description:
          'Error message delivered only through audio with no visual indicator',
        code: `<!-- DON'T DO THIS -->
<script>
  function handleError(error) {
    // Only audio feedback, no visual
    const utterance = new SpeechSynthesisUtterance(
      'Error: Your payment could not be processed. ' +
      'Please check your card details and try again.'
    );
    speechSynthesis.speak(utterance);
    // No visual error message shown!
  }
</script>`,
        explanation:
          'Critical error information delivered only through audio excludes deaf users, users in noisy environments, and users with audio muted. Payment errors require persistent, visual feedback that users can re-read.',
        principle:
          'Never use audio as the sole channel for critical information; always provide visual equivalents',
      },
      {
        title: 'Unsolicited Background Music and Narration',
        description:
          'Website that autoplays background music and narrated intro without user consent',
        code: `<!-- DON'T DO THIS -->
<body onload="startExperience()">
  <audio id="bg-music" autoplay loop>
    <source src="ambient-music.mp3" type="audio/mpeg">
  </audio>
  <audio id="welcome-narration" autoplay>
    <source src="welcome-message.mp3" type="audio/mpeg">
  </audio>
  <!-- No mute button visible, no user control -->
</body>`,
        explanation:
          'Autoplaying audio is universally disliked, violates WCAG 1.4.2, and causes users to immediately leave. Layering background music with narration creates auditory interference that degrades comprehension rather than enhancing it.',
        principle:
          'Audio must be user-initiated; unsolicited sound degrades experience and violates accessibility standards',
      },
    ],

    realWorld: [
      {
        company: 'YouTube',
        product: 'Video Tutorials',
        description: 'YouTube tutorials combine visual demonstration (screencasts, diagrams) with spoken narration. Viewers consistently prefer and retain more from narrated tutorials compared to equivalent text documentation. Auto-generated captions provide a visual fallback.',
        effectiveness: 'very-effective',
        analysis: 'YouTube tutorials exploit the modality effect by delivering spatial/procedural information visually while providing explanatory context auditorily. The combination creates dual-coded memory traces. Studies show 65% higher retention from video tutorials vs text docs for procedural tasks.',
      },
      {
        company: 'Duolingo',
        product: 'Language Learning',
        description: 'Duolingo combines written words, images, audio pronunciation, and speech recognition across every exercise. Users see the word, hear it spoken by a native speaker, and practice saying it themselves — engaging visual, auditory, and kinesthetic channels.',
        effectiveness: 'very-effective',
        analysis: 'Multi-modal encoding is central to Duolingo\'s effectiveness. By engaging three modalities (reading, listening, speaking), each vocabulary item is encoded through multiple pathways. The auditory component is especially critical for language learning, where pronunciation and phonology cannot be conveyed visually.',
      },
      {
        company: 'Apple',
        product: 'VoiceOver Screen Reader',
        description: 'Apple\'s VoiceOver transforms visual interfaces into auditory experiences for blind and low-vision users. Well-designed apps with proper ARIA labels and semantic HTML create effective multi-modal experiences when combined with VoiceOver\'s auditory output.',
        effectiveness: 'effective',
        analysis: 'Screen readers demonstrate the modality effect in accessibility: users who receive information auditorily show strong recency effects, remembering the most recently spoken elements best. This makes reading order and ARIA live region design critical for accessible interfaces.',
      },
      {
        company: 'Spotify',
        product: 'Podcast Learning',
        description: 'Podcasts and audiobooks on Spotify enable learning through pure auditory delivery. The modality effect predicts that listeners will remember the most recent content best (recency effect), which is why podcast summaries at the end of episodes are more effective than those at the beginning.',
        effectiveness: 'effective',
        analysis: 'Pure audio content like podcasts leverages the auditory recency advantage — listeners naturally remember the last few minutes most clearly. Effective podcasters exploit this by placing key takeaways and calls-to-action at the end of episodes rather than the beginning.',
      },
      {
        company: 'Slack',
        product: 'Notification Sounds',
        description: 'Slack uses distinct notification sounds for different event types (new message, mention, huddle invite). The audio cues complement visual badges and banners, allowing users to triage notifications without looking at the screen.',
        effectiveness: 'effective',
        analysis: 'Multi-modal notification design lets users identify event types through sound alone, reducing the need to context-switch visually. The auditory channel processes the notification type while the user\'s visual attention remains on their current task — a practical application of distributing load across modalities.',
      },
    ],

    abTests: [
      {
        title: 'Onboarding: Text-Only vs Narrated Visual Tutorial',
        hypothesis:
          'Adding audio narration to visual onboarding will increase feature adoption and tutorial completion',
        controlVersion: {
          description:
            'Step-by-step text-only tutorial with static screenshots showing users how to create their first project',
          metrics: {
            conversionRate: '54%',
            timeOnPage: '2:10',
            featureAdoption: '31%',
          },
        },
        treatmentVersion: {
          description:
            'Interactive visual walkthrough with synchronized audio narration explaining each step, highlighting UI elements, and providing context',
          metrics: {
            conversionRate: '81%',
            timeOnPage: '3:45',
            featureAdoption: '58%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'The multi-modal onboarding increased completion by 50% and nearly doubled feature adoption. Users spent more time but accomplished more. Post-test recall of feature locations was 72% higher in the narrated group.',
          learnings: [
            'Audio narration explaining "why" while visuals show "where" is more effective than text alone',
            'Users who heard narration recalled feature locations better 7 days later',
            'Providing a mute option was critical — 12% of users muted but still completed the tutorial',
            'Captioned narration (audio + text captions) performed best of all variants',
          ],
        },
      },
      {
        title: 'Error Feedback: Visual-Only vs Multi-Modal',
        hypothesis:
          'Adding subtle audio cues to error messages will improve error recovery speed',
        controlVersion: {
          description:
            'Form validation showing red text error messages below invalid fields',
          metrics: {
            errorRecoveryTime: '18.3s',
            errorNoticeRate: '72%',
            formCompletionRate: '68%',
          },
        },
        treatmentVersion: {
          description:
            'Form validation with red text error messages plus a brief, distinct error tone when validation fails, and a positive chime on successful submission',
          metrics: {
            errorRecoveryTime: '11.7s',
            errorNoticeRate: '94%',
            formCompletionRate: '79%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Audio cues helped users notice errors 30% faster, leading to quicker recovery. The error notice rate improved from 72% to 94%, meaning far fewer users unknowingly submitted invalid forms.',
          learnings: [
            'Subtle audio cues draw attention even when visual attention is elsewhere on the page',
            'Distinct sounds for error vs success create quick auditory associations over time',
            'Audio must be optional — users who disabled sound still benefited from the visual improvements made alongside audio',
            'Audio feedback was especially effective for long forms where errors occurred off-screen',
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
        name: 'Audio/Video Player Elements',
        description:
          'Presence of embedded audio players, video tutorials, or narrated walkthroughs',
        howToSpot:
          'Look for play buttons, volume controls, video embeds, or audio waveform indicators',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Caption and Transcript Areas',
        description:
          'Visible captions overlaid on video or transcript panels alongside audio content',
        howToSpot:
          'Check for subtitle tracks, CC buttons, or expandable transcript sections below media',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Sound Feedback Indicators',
        description:
          'Visual indicators of audio feedback such as speaker icons, sound toggles, or vibration patterns',
        howToSpot:
          'Look for speaker/bell icons near interactive elements, audio preference toggles in settings',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Multi-Modal Learning Layouts',
        description:
          'Content layouts that combine visual demonstrations with narration or audio components',
        howToSpot:
          'Look for side-by-side video + text layouts, narrated slideshows, or interactive tutorials with audio controls',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Screen Reader Optimization Markers',
        description:
          'ARIA live regions, role attributes, and semantic structure designed for auditory consumption',
        howToSpot:
          'Inspect HTML for aria-live, role="alert", aria-label attributes indicating auditory channel design',
        severity: ImpactLevel.HIGH,
      },
    ],

    patterns: [
      {
        name: 'Complementary Modality Pattern',
        description: 'Visual and auditory channels carry different but related information simultaneously',
        indicators: ['Video narration explains while screen shows demonstration', 'Audio provides context while visuals show spatial layout', 'Sound cues complement visual state changes', 'Each modality adds unique information, not duplication'],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Auditory Feedback Pattern',
        description: 'Sound effects or audio cues that accompany user actions and system responses',
        indicators: ['Confirmation sounds on successful actions', 'Error tones paired with visual error states', 'Notification sounds for background events', 'Distinct sounds for different event types'],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Audio-First Content Pattern',
        description: 'Content primarily delivered through audio with visual supplements',
        indicators: ['Podcast-style content embedded in interface', 'Voice narration as primary instruction method', 'Audio previews or summaries of content', 'Speech-to-text or voice input interfaces'],
        severity: ImpactLevel.MEDIUM,
        confidence: 'medium',
      },
      {
        name: 'Redundant Modality Anti-Pattern',
        description: 'Same text displayed visually and read aloud simultaneously without differentiation',
        indicators: ['Narration reads on-screen text verbatim', 'Audio duplicates rather than complements visual content', 'Both channels carry identical information', 'No unique contribution from either modality'],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
    ],

    checklistQuestions: [
      'Is information delivered through multiple sensory channels (audio + visual)?',
      'Do the different modalities carry complementary information, or do they redundantly duplicate each other?',
      'Are audio elements user-controlled (no autoplay)?',
      'Are captions, transcripts, or visual alternatives provided for all audio content?',
      'Are audio descriptions provided for visual content in videos?',
      'Is critical information presented through at least two modalities?',
      'Do sound cues accompany important visual state changes (errors, confirmations)?',
      'Is the interface usable with audio muted?',
      'Are screen reader users considered in the information architecture?',
      'Does the end of sequential content exploit the auditory recency advantage?',
      'Are users given control over audio preferences?',
      'Is cognitive load distributed across modalities rather than concentrated in one?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in the modality effect and multi-modal learning.

Analyze the provided design for modality effect patterns. Identify:

1. **Channel Usage**: How information is distributed across auditory and visual channels
2. **Complementary vs Redundant**: Whether modalities carry unique information or duplicate each other
3. **Auditory Recency**: Whether sequential content exploits the auditory recency advantage
4. **Cognitive Load Distribution**: Whether information load is balanced across modalities
5. **Accessibility**: Whether all modalities have appropriate alternatives

For each pattern found:
- Identify which modalities are used and how they interact
- Assess whether the modal combination enhances or hinders comprehension
- Determine if audio content has visual alternatives (and vice versa)
- Evaluate whether the modality choices match the content type
- Suggest improvements for optimal multi-modal design

Consider:
- Is audio used to explain while visuals demonstrate (complementary)?
- Or is audio reading on-screen text (redundant)?
- Are there opportunities to add a modality for better encoding?
- Is the interface usable when one modality is unavailable (muted, screen reader)?
- Are critical messages delivered through multiple channels?

Provide actionable recommendations for leveraging the modality effect ethically and accessibly.`,

    outputSchema: {
      type: 'object',
      properties: {
        modalityPatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              channelsUsed: { type: 'string' },
              relationship: { type: 'string' },
              effectiveness: { type: 'string' },
              accessibilityScore: { type: 'number' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'channelsUsed',
              'relationship',
              'effectiveness',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            multiModalCoverage: { type: 'number' },
            complementarity: { type: 'number' },
            accessibilityScore: { type: 'number' },
            cognitiveLoadBalance: { type: 'number' },
          },
          required: [
            'multiModalCoverage',
            'complementarity',
            'accessibilityScore',
            'cognitiveLoadBalance',
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
        'modalityPatterns',
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
        title: 'Audit Content by Information Type',
        description:
          'Categorize your content into spatial/visual (diagrams, layouts) and verbal/explanatory (procedures, rationale) to determine optimal modality assignment',
        example:
          'A tutorial: visual channel shows the UI with highlights, audio channel explains the purpose and steps',
        tips: [
          'Spatial and structural information is best suited for visual presentation',
          'Procedural explanations and reasoning are well suited for narration',
          'Terminology benefits from dual presentation (shown + spoken)',
        ],
      },
      {
        step: 2,
        title: 'Design Complementary Channels',
        description:
          'Assign different but related information to each modality — never simply duplicate',
        example:
          'Visual: animated diagram of data flow. Audio: "Data moves from the API endpoint through the middleware layer before reaching your component"',
        tips: [
          'Each channel should add unique value',
          'Visual + verbal beats visual + visual (e.g., diagram + narration > diagram + text block)',
          'Use audio for temporal/sequential info and visuals for spatial/structural info',
        ],
      },
      {
        step: 3,
        title: 'Provide Universal Fallbacks',
        description:
          'Ensure every modality has an alternative for users who cannot access it',
        example:
          'All narrated videos include synchronized captions and downloadable transcripts',
        tips: [
          'Captions for audio (WCAG 1.2.2)',
          'Audio descriptions for visual-only content in video (WCAG 1.2.5)',
          'Text alternatives for sound cues',
          'Visual indicators for audio-conveyed state changes',
        ],
      },
      {
        step: 4,
        title: 'Implement User Controls',
        description:
          'Give users full control over audio playback, volume, and preferences',
        example:
          'Settings panel with toggles for sound effects, narration auto-play, and audio feedback',
        tips: [
          'Never autoplay audio (WCAG 1.4.2)',
          'Persist audio preferences across sessions',
          'Provide keyboard shortcuts for play/pause/mute',
          'Allow independent control of music, narration, and sound effects',
        ],
      },
      {
        step: 5,
        title: 'Exploit Auditory Recency Strategically',
        description:
          'Place the most important information at the end of auditory sequences where the recency effect is strongest',
        example:
          'End a tutorial video with the key takeaway spoken clearly; end a podcast episode with the call-to-action',
        tips: [
          'The last 2-3 items in an auditory sequence have the strongest recall',
          'Summarize key points at the end of narrated content',
          'Critical instructions at the end of spoken sequences are remembered best',
        ],
      },
    ],

    dos: [
      'Combine audio narration with visual demonstration for tutorials and onboarding',
      'Use distinct sound cues to complement visual feedback for actions and errors',
      'Provide captions, transcripts, and visual alternatives for all audio content',
      'Let users control audio playback, volume, and preferences',
      'Assign different but related information to each modality (complementary, not redundant)',
      'Place critical information at the end of auditory sequences for recency advantage',
      'Design for graceful degradation when one modality is unavailable',
      'Test with screen reader users to validate auditory information architecture',
    ],

    donts: [
      'Don\'t autoplay audio or video without explicit user action',
      'Don\'t read on-screen text aloud verbatim — narrate and explain instead',
      'Don\'t rely on audio as the sole channel for any critical information',
      'Don\'t present dense data tables or reference material exclusively through audio',
      'Don\'t layer background music with narration, causing auditory interference',
      'Don\'t ignore the needs of deaf, hard-of-hearing, or audio-muted users',
      'Don\'t overload a single modality while leaving the other idle',
      'Don\'t assume all users can hear — always provide visual equivalents',
    ],

    bestPractices: [
      {
        title: 'Complementary, Not Redundant',
        description:
          'Each modality should carry unique information that complements the other channel',
        rationale:
          'Dual coding theory shows that complementary channels create independent memory traces, while redundant channels compete for the same verbal processing resources',
        example:
          'Narration explains the rationale ("We use a binary search because...") while the visual shows the algorithm animation',
      },
      {
        title: 'Audio for Explanation, Visual for Demonstration',
        description:
          'Use the auditory channel for verbal/explanatory content and the visual channel for spatial/procedural content',
        rationale:
          'This aligns with the natural strengths of each processing subsystem in working memory (phonological loop vs visuospatial sketchpad)',
        example:
          'A cooking app shows the technique visually while narrating the tips and timing',
      },
      {
        title: 'Recency-Aware Sequencing',
        description:
          'Place the most critical information at the end of auditory sequences',
        rationale:
          'The modality effect produces a strong recency advantage for auditory lists — the last items spoken are recalled significantly better',
        example:
          'End a narrated onboarding sequence with the single most important action the user should take',
      },
      {
        title: 'Progressive Multi-Modal Enhancement',
        description:
          'Start with solid visual-only design, then layer audio as an enhancement',
        rationale:
          'Ensures the experience works without audio (muted, deaf users, noisy environments) while offering multi-modal benefits to those who opt in',
        example:
          'Visual tutorial works standalone; "Enable narration" button adds audio explanation layer',
      },
      {
        title: 'Context-Sensitive Audio',
        description:
          'Detect or infer user context and adapt audio behavior accordingly',
        rationale:
          'Audio is highly context-dependent — helpful with headphones, disruptive in an office',
        example:
          'Default to visual-only on mobile web; suggest enabling audio in app settings; auto-pause narration when headphones are disconnected',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'A',
        criterion: '1.2.1',
        guideline:
          'Audio-only and Video-only - Provide alternatives for time-based media',
        implementation:
          'Provide transcripts for audio-only content and text descriptions or audio tracks for video-only content',
      },
      {
        wcagLevel: 'A',
        criterion: '1.2.2',
        guideline:
          'Captions (Prerecorded) - Provide synchronized captions for all prerecorded audio in video',
        implementation:
          'Include accurate, synchronized captions for all narrated video content; support user-adjustable caption styling',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.2.5',
        guideline:
          'Audio Description (Prerecorded) - Provide audio description for visual content in video',
        implementation:
          'Add audio description track that narrates important visual information not conveyed through the primary audio track',
      },
      {
        wcagLevel: 'A',
        criterion: '1.4.2',
        guideline:
          'Audio Control - Provide mechanism to pause, stop, or control volume of auto-playing audio',
        implementation:
          'Never autoplay audio. If audio plays, provide immediately visible pause/stop/mute controls. Allow volume adjustment.',
      },
    ],

    ethics: [
      {
        concern: 'Exclusion Through Modality Choice',
        severity: 'critical',
        explanation:
          'Delivering critical information through only one modality excludes users who cannot access that channel (deaf users for audio, blind users for visual)',
        mitigation:
          'Always provide alternatives: captions for audio, audio descriptions for video, text alternatives for sound cues. Critical information must be available through at least two modalities.',
      },
      {
        concern: 'Manipulative Audio Design',
        severity: 'high',
        explanation:
          'Using dramatic music, urgent tones, or emotional voice acting to manipulate user decisions through auditory arousal',
        mitigation:
          'Use neutral, informative audio design. Sound cues should inform, not pressure. Avoid urgency-inducing audio patterns for commercial gain.',
      },
      {
        concern: 'Privacy in Audio Interactions',
        severity: 'high',
        explanation:
          'Audio output can be overheard by others, potentially exposing private information (medical, financial) in shared spaces',
        mitigation:
          'Default to visual-only for sensitive information. Warn users before speaking private data aloud. Support headphone-only audio modes.',
      },
      {
        concern: 'Cognitive Overload Through Forced Multi-Modal',
        severity: 'medium',
        explanation:
          'Forcing users to process multiple modalities simultaneously when they prefer single-channel interaction',
        mitigation:
          'Make multi-modal features opt-in. Allow users to disable audio or hide visual supplements. Respect neurodiversity in processing preferences.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'Modality Effects in Short-Term Memory',
        author: 'Penney, C. G.',
        year: 1989,
        doi: '10.1037/0033-2909.105.2.300',
        description:
          'Comprehensive review of modality effects in short-term memory, documenting the auditory advantage for recency and the conditions under which it occurs',
        type: 'foundational',
      },
      {
        title: 'Waiting for the Stimulus Suffix: Decay, Delay, Rhythm, and Readout in Immediate Memory',
        author: 'Crowder, R. G.',
        year: 1972,
        description:
          'Key paper on the precategorical acoustic store (PAS) and the suffix effect, demonstrating the mechanisms underlying the auditory recency advantage',
        type: 'foundational',
      },
      {
        title: 'A Cognitive Theory of Multimedia Learning',
        author: 'Mayer, R. E.',
        year: 2005,
        description:
          'Foundational theory of multimedia learning establishing the modality principle: people learn better from animation + narration than from animation + text',
        type: 'foundational',
      },
      {
        title: 'Nine Ways to Reduce Cognitive Load in Multimedia Learning',
        author: 'Mayer, R. E., & Moreno, R.',
        year: 2003,
        doi: '10.1207/S15326985EP3801_6',
        description:
          'Practical guidelines for reducing cognitive load through multi-modal design, including the modality effect as a key strategy',
        type: 'practical',
      },
    ],

    books: [
      {
        title: 'Multimedia Learning',
        author: 'Mayer, Richard E.',
        year: 2009,
        isbn: '9780521735353',
        description:
          'The definitive book on multimedia learning, including extensive coverage of the modality principle and its design implications',
        type: 'foundational',
      },
      {
        title: 'E-Learning and the Science of Instruction',
        author: 'Clark, Ruth C., & Mayer, Richard E.',
        year: 2016,
        isbn: '9781119158660',
        description:
          'Practical application of modality effect research to e-learning design with evidence-based guidelines',
        type: 'practical',
      },
    ],

    articles: [
      {
        title: 'The Modality Effect in Multimedia Instructions',
        author: 'Ginns, P.',
        url: 'https://doi.org/10.1007/s10648-005-5767-z',
        description:
          'Meta-analysis confirming the modality effect across 43 studies, showing consistent learning benefits for audio + visual over visual-only presentations',
        type: 'advanced',
      },
    ],

    videos: [
      {
        title: 'Multimedia Learning Principles',
        author: 'Richard Mayer',
        url: 'https://www.youtube.com/watch?v=EEWkNyGmGnI',
        description:
          'Lecture by Richard Mayer explaining multimedia learning principles including the modality effect',
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
      'dual-coding-theory',    // Multi-modal encoding creates redundant memory traces
      'recency-effect',        // Auditory modality amplifies the recency effect
      'multimedia-learning',   // Modality effect is a core multimedia learning principle
      'cognitive-load',        // Distributing modalities reduces cognitive load
    ],

    conflicts: [
      'split-attention-effect', // Poorly designed multi-modal can cause split attention
      'redundancy-effect',      // Identical content in both channels is redundant, not helpful
    ],

    confusedWith: [
      'recency-effect',      // Related but modality effect is specifically about auditory vs visual recency
      'dual-coding-theory',  // Broader theory; modality effect is one manifestation
      'picture-superiority', // Opposite direction: visual > verbal for some content
    ],

    hierarchy: {
      parent: 'memory-bias',
      children: [
        'auditory-recency-effect',
        'suffix-effect',
      ],
    },
  },
};
