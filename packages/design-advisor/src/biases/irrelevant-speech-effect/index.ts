/**
 * IRRELEVANT SPEECH EFFECT
 *
 * Background speech or auditory distractions impair memory
 * and cognitive performance, even when the speech is irrelevant.
 */

import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const irrelevantSpeechEffect: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'irrelevant-speech-effect',
    name: 'Irrelevant Speech Effect',
    aliases: ['Unattended Speech Effect', 'Auditory Distraction Effect'],
    category: BiasCategory.MEMORY,
    relatedCategories: [
      BiasCategory.PERCEPTION,
      BiasCategory.COGNITIVE,
    ],
    tags: [
      'memory',
      'auditory',
      'distraction',
      'focus',
      'attention',
      'notifications',
      'audio-ux',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple:
      'Background speech or auditory distractions impair memory and cognitive performance, even when the speech is completely irrelevant to the task.',

    detailed: `The Irrelevant Speech Effect describes how background speech or changing-state auditory stimuli disrupt serial recall and working memory, even when the listener is not attending to the sound and the content is meaningless or in an unfamiliar language.

This effect is not limited to speech — any sound with sufficient acoustic variation (changing pitch, timbre, or temporal structure) can cause disruption. Steady-state sounds like white noise or continuous hums cause far less interference than sounds with spectral and temporal changes.

In UX design, this effect has profound implications for audio notification design, background sounds in applications, focus environments, and any interface where users must maintain concentration. Designers must consider the auditory environment their interfaces create, from notification chimes and alert sounds to ambient audio and voice feedback. Poorly designed audio UX can significantly degrade task performance, increase errors, and reduce user satisfaction.`,

    psychologyBasis: {
      discoveredBy: 'Colle, H. A., & Welsh, A.',
      year: 1976,
      theory: 'Working Memory Disruption',
      mechanism: `Background speech disrupts the phonological loop component of working memory, even when the speech is irrelevant and ignored. This happens because:

1. **Obligatory Access**: The auditory system automatically processes incoming speech, bypassing voluntary attention — you cannot "close your ears"
2. **Phonological Interference**: Irrelevant speech gains automatic access to the phonological store, competing with task-relevant information for limited rehearsal capacity
3. **Changing-State Hypothesis**: Disruption is caused by the changing acoustical properties of speech (not its meaning), so even foreign language speech disrupts performance equally
4. **Order Disruption**: The effect primarily disrupts serial order processing — remembering sequences, following steps, and maintaining procedural memory
5. **Attentional Capture**: Abrupt or novel sounds involuntarily capture attention away from the primary task, requiring cognitive resources to re-orient`,
    },

    realWorldExample: `In Colle and Welsh's seminal 1976 study, participants attempted to recall sequences of visually presented items while irrelevant speech played in the background. Performance dropped by 25-30% compared to silence, even though participants were told to ignore the speech entirely. Crucially, Jones and Macken (1993) showed that the meaning of the speech did not matter — foreign language speech caused equal disruption — confirming that the effect operates through acoustic interference, not semantic processing.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `The Irrelevant Speech Effect profoundly impacts how designers should approach audio and notification systems. Every sound an interface produces — from notification chimes to background audio — can degrade the user's ability to think, remember, and perform tasks. Designers should:

- Minimize unnecessary audio notifications that disrupt concentration
- Design non-verbal notification sounds that are brief and non-changing-state
- Provide focus modes that silence non-critical audio interruptions
- Offer ambient sound options that use steady-state audio rather than variable sounds
- Allow granular user control over all auditory elements of the interface`,

    whenToUse: [
      {
        title: 'Non-Verbal Notification Sounds',
        scenario:
          'When designing alerts that must notify without disrupting cognitive flow',
        example:
          'Use brief, simple tones (single pitch) rather than melodic chimes or speech-based alerts for non-critical notifications',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Focus Mode Design',
        scenario:
          'When users need sustained concentration for complex tasks like writing, coding, or analysis',
        example:
          'Implement a focus mode that silences all non-critical notifications and batches them for later review',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Ambient Sound Options',
        scenario:
          'When providing background audio to mask environmental noise',
        example:
          'Offer steady-state sounds (brown noise, rain, fan hum) rather than variable audio (birdsong, coffee shop chatter, music with lyrics)',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Audio Notification Hierarchy',
        scenario:
          'When establishing different urgency levels for audio alerts',
        example:
          'Reserve spoken or speech-like alerts for truly critical notifications; use simple tones for informational updates',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Workspace Audio Environment',
        scenario:
          'When designing collaborative tools where multiple users may generate audio simultaneously',
        example:
          'Collapse rapid successive notifications into a single summary sound rather than playing each individually',
        impact: ImpactLevel.MEDIUM,
      },
    ],

    whenToAvoid: [
      {
        title: 'Critical Safety Alerts',
        reason:
          'Some situations require immediate auditory interruption regardless of cognitive cost',
        consequence:
          'Users may miss life-safety or data-loss warnings if audio is suppressed',
        alternative:
          'Use distinct, unmistakable alert sounds for critical warnings but keep them brief and non-speech-based',
      },
      {
        title: 'Accessibility Audio Cues',
        reason:
          'Users relying on screen readers or audio feedback need speech-based output to operate the interface',
        consequence:
          'Removing audio cues would make the interface inaccessible to visually impaired users',
        alternative:
          'Optimize screen reader output for efficiency and brevity rather than eliminating it',
      },
      {
        title: 'Voice-First Interfaces',
        reason:
          'Voice assistants and conversational UIs inherently require speech-based interaction',
        consequence:
          'Eliminating speech would break the core interaction model',
        alternative:
          'Minimize unnecessary spoken confirmations and use visual or haptic feedback where possible',
      },
      {
        title: 'Passive Monitoring Tasks',
        reason:
          'Some tasks (e.g., monitoring dashboards) benefit from audio alerts because the user is not engaged in serial recall',
        consequence:
          'Users may miss important events without any auditory signal',
        alternative:
          'Use brief, non-speech audio cues and allow users to adjust notification frequency',
      },
    ],

    commonMistakes: [
      {
        title: 'Overusing Speech-Based Notifications',
        description:
          'Using spoken text or voice alerts for routine, non-critical notifications',
        why: 'Speech-based audio causes maximum disruption to working memory due to obligatory phonological processing',
        fix: 'Reserve speech notifications for critical alerts only; use simple tones or visual indicators for routine events',
      },
      {
        title: 'Notification Sound Storms',
        description:
          'Playing individual notification sounds for every event in rapid succession',
        why: 'Rapid changing-state audio creates maximum cognitive interference and user frustration',
        fix: 'Batch notifications and collapse rapid events into a single summary sound or visual indicator',
      },
      {
        title: 'Background Music with Lyrics',
        description:
          'Using music with vocals as ambient sound in productivity applications',
        why: 'Lyrics are processed as speech by the phonological loop, causing the same disruption as irrelevant background speech',
        fix: 'Offer instrumental ambient audio or steady-state sounds (white/brown noise, nature sounds without variation)',
      },
      {
        title: 'No User Control Over Audio',
        description:
          'Forcing audio notifications without providing granular mute or volume controls',
        why: 'Users cannot adapt the audio environment to their task demands or personal sensitivity to distraction',
        fix: 'Provide per-channel notification controls, global mute, focus mode, and sound customization options',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.LOW,
        description:
          'Layout has indirect impact — primarily through placement of audio controls and notification settings',
        examples: [
          'Accessible placement of mute/focus mode toggles',
          'Notification center design for reviewing batched alerts',
          'Settings layout for granular audio control',
          'Visual notification indicators that can replace audio cues',
        ],
      },
      typography: {
        level: ImpactLevel.LOW,
        description:
          'Typography has minimal direct impact but supports visual alternatives to audio',
        examples: [
          'Clear text notifications as alternatives to audio alerts',
          'Readable notification badges and banners',
          'Visual emphasis replacing audio emphasis',
          'Text-based status indicators instead of sound cues',
        ],
      },
      color: {
        level: ImpactLevel.MEDIUM,
        description:
          'Color supports visual notification systems that can substitute for disruptive audio',
        examples: [
          'Color-coded notification badges as silent alternatives',
          'Status indicator colors replacing audio feedback',
          'Subtle color changes for non-critical updates instead of sounds',
          'Focus mode visual indicators showing audio suppression state',
        ],
      },
      interaction: {
        level: ImpactLevel.CRITICAL,
        description:
          'Interaction design determines when, how, and what audio feedback is triggered',
        examples: [
          'Focus mode toggle and notification scheduling',
          'Granular per-app and per-channel audio controls',
          'Do Not Disturb automation based on task context',
          'Haptic feedback as alternative to audio for confirmations',
        ],
      },
      content: {
        level: ImpactLevel.HIGH,
        description:
          'Content strategy determines notification text, audio script, and alert messaging',
        examples: [
          'Concise notification text that can be scanned visually instead of spoken',
          'Notification grouping and summarization to reduce audio frequency',
          'Clear labeling of audio settings and focus modes',
          'Helpful onboarding for audio customization features',
        ],
      },
      accessibility: {
        level: ImpactLevel.CRITICAL,
        description:
          'Audio design must balance distraction reduction with accessibility needs for users who rely on auditory feedback',
        examples: [
          'Screen reader users need speech output but benefit from concise, efficient delivery',
          'Users with auditory processing disorders are disproportionately affected by background audio',
          'Deaf and hard-of-hearing users need visual alternatives to all audio cues',
          'Cognitive accessibility requires minimizing unnecessary auditory complexity',
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
        title: 'Intelligent Focus Mode with Notification Batching',
        description:
          'Productivity app that detects deep work sessions and batches notifications',
        code: `<div class="focus-mode-panel">
  <div class="focus-header">
    <h3>Focus Mode</h3>
    <label class="toggle">
      <input type="checkbox" checked aria-label="Enable focus mode">
      <span class="slider"></span>
    </label>
  </div>
  <p class="focus-status">Active — 12 notifications batched</p>
  <div class="focus-settings">
    <label>
      <input type="checkbox" checked>
      Silence all non-critical sounds
    </label>
    <label>
      <input type="checkbox" checked>
      Batch notifications for later
    </label>
    <label>
      <input type="checkbox">
      Allow calls from favorites
    </label>
  </div>
  <button class="review-btn">Review Batched Notifications</button>
</div>`,
        explanation:
          'Focus mode eliminates changing-state audio disruption during deep work. Notifications are batched rather than lost, so users feel safe enabling it. Granular controls let users decide which interruptions are critical.',
        principle:
          'Eliminating irrelevant auditory interruptions during concentrated work preserves working memory capacity',
        metrics: {
          before: 'Average 23 audio interruptions per hour during focus tasks',
          after: '0 audio interruptions with batch review every 90 minutes',
          improvement: '34% increase in task completion accuracy and 28% faster completion time',
        },
      },
      {
        title: 'Tiered Notification Sound Design',
        description:
          'Messaging app with distinct sound tiers based on urgency',
        code: `<!-- Notification Sound Configuration -->
<div class="notification-settings">
  <h3>Notification Sounds</h3>

  <div class="sound-tier critical">
    <span class="tier-label">Critical</span>
    <p>Spoken alert + vibration</p>
    <small>Account security, payment failures</small>
  </div>

  <div class="sound-tier important">
    <span class="tier-label">Important</span>
    <p>Two-tone chime</p>
    <small>Direct messages, mentions</small>
  </div>

  <div class="sound-tier informational">
    <span class="tier-label">Informational</span>
    <p>Single soft tone</p>
    <small>Channel updates, reactions</small>
  </div>

  <div class="sound-tier silent">
    <span class="tier-label">Silent</span>
    <p>Visual badge only</p>
    <small>Status changes, typing indicators</small>
  </div>
</div>`,
        explanation:
          'Tiered sound design reserves speech-based (highest disruption) alerts for truly critical events. Lower-priority notifications use progressively simpler sounds, with the lowest tier using no audio at all.',
        principle:
          'Audio disruption should be proportional to notification urgency — speech for critical, silence for routine',
      },
      {
        title: 'Steady-State Ambient Sound Selector',
        description:
          'Workspace app offering ambient sounds optimized for focus',
        code: `<div class="ambient-sound-selector">
  <h3>Background Sound</h3>
  <p class="description">Steady-state sounds mask distractions
    without disrupting working memory</p>

  <div class="sound-options">
    <button class="sound-option active" aria-pressed="true">
      <span class="icon">🌧️</span>
      <span>Steady Rain</span>
    </button>
    <button class="sound-option" aria-pressed="false">
      <span class="icon">🌊</span>
      <span>Ocean Waves</span>
    </button>
    <button class="sound-option" aria-pressed="false">
      <span class="icon">💨</span>
      <span>Brown Noise</span>
    </button>
    <button class="sound-option" aria-pressed="false">
      <span class="icon">🔇</span>
      <span>Silence</span>
    </button>
  </div>

  <div class="volume-control">
    <label for="ambient-volume">Volume</label>
    <input type="range" id="ambient-volume"
      min="0" max="100" value="40"
      aria-label="Ambient sound volume">
  </div>
</div>`,
        explanation:
          'All sound options are steady-state (constant spectral properties) rather than changing-state. This masks environmental distractions without triggering the irrelevant speech effect. No options include speech or variable melodies.',
        principle:
          'Steady-state audio masks distractions without disrupting the phonological loop',
      },
    ],

    bad: [
      {
        title: 'Spoken Notification for Every Event',
        description:
          'Collaboration tool that reads every notification aloud via text-to-speech',
        code: `<!-- DON'T DO THIS -->
<div class="notification-system">
  <!-- Every notification triggers speech synthesis -->
  <script>
    function onNotification(event) {
      // Reads EVERY notification aloud, disrupting user constantly
      speechSynthesis.speak(
        new SpeechSynthesisUtterance(event.message)
      );
    }
  </script>
  <div class="notification">
    "Alex commented on your document"
    <!-- Audio: spoken aloud -->
  </div>
  <div class="notification">
    "New reaction on your message"
    <!-- Audio: spoken aloud -->
  </div>
  <div class="notification">
    "Jordan is typing..."
    <!-- Audio: spoken aloud -->
  </div>
</div>`,
        explanation:
          'Reading every notification aloud creates maximum irrelevant speech disruption. Speech-based audio forces phonological processing, displacing task-relevant information from working memory. Users cannot ignore it.',
        principle:
          'Never use speech synthesis for routine notifications — it maximally disrupts working memory',
      },
      {
        title: 'Background Music with Vocals in Productivity App',
        description:
          'Task management app that auto-plays curated playlists with lyrics',
        code: `<!-- DON'T DO THIS -->
<div class="productivity-music">
  <h3>Productivity Playlist</h3>
  <audio autoplay>
    <source src="upbeat-pop-song.mp3">
  </audio>
  <p class="now-playing">
    Now Playing: "Happy" - Pharrell Williams
  </p>
  <p class="tagline">Stay motivated with music!</p>
  <!-- No option to switch to instrumental or disable -->
</div>`,
        explanation:
          'Music with lyrics functions as irrelevant speech, disrupting the phonological loop just as background conversation does. Auto-playing with no disable option compounds the problem. Users performing serial recall tasks (lists, sequences, writing) will experience significant performance degradation.',
        principle:
          'Lyrics are processed as speech — background music with vocals causes the same disruption as irrelevant speech',
      },
      {
        title: 'Notification Sound Storm',
        description:
          'Chat app playing individual chime for every message in active group conversation',
        code: `<!-- DON'T DO THIS -->
<div class="chat-notifications">
  <!-- Each message triggers its own notification sound -->
  <!-- In active group of 15 people, this means
       15+ chimes per minute during active discussion -->
  <div class="message">
    <audio autoplay src="chime.mp3"></audio>
    <p>Alice: "Hey everyone!"</p>
  </div>
  <div class="message">
    <audio autoplay src="chime.mp3"></audio>
    <p>Bob: "Hi!"</p>
  </div>
  <div class="message">
    <audio autoplay src="chime.mp3"></audio>
    <p>Carol: "What's up?"</p>
  </div>
  <!-- ...12 more in the next minute -->
</div>`,
        explanation:
          'Rapid successive notification sounds create a changing-state auditory stream that maximally disrupts cognitive performance. Each sound captures attention and forces re-orientation, compounding over dozens of interruptions per minute.',
        principle:
          'Rapid changing-state sounds create cumulative cognitive disruption far exceeding a single alert',
      },
    ],

    realWorld: [
      {
        company: 'Slack',
        product: 'Notification Sounds & Do Not Disturb',
        description: 'Slack offers granular notification sound controls with per-channel muting, keyword-based alerts, and a Do Not Disturb mode that batches notifications. However, the default notification sound is a distinctive "knock" that can become disruptive in busy workspaces with many channels.',
        effectiveness: 'effective',
        analysis: 'Slack\'s DND mode and per-channel muting successfully reduce irrelevant audio disruption. The notification pause feature lets users silence non-urgent sounds during focus work. However, many users never discover these settings and suffer from notification overload by default.',
      },
      {
        company: 'Apple',
        product: 'Focus Mode (iOS/macOS)',
        description: 'Apple\'s Focus system allows users to create context-specific notification filters (Work, Personal, Sleep) that silence irrelevant app sounds and batch notifications. Apps can be allowed or silenced per focus profile, and time-sensitive notifications can still break through.',
        effectiveness: 'very-effective',
        analysis: 'Focus Mode directly addresses the irrelevant speech effect by giving users system-level control over auditory interruptions. The ability to schedule focus profiles and allow breakthrough for critical alerts strikes a strong balance between distraction reduction and responsiveness.',
      },
      {
        company: 'Noisli',
        product: 'Ambient Sound Generator',
        description: 'Noisli provides steady-state ambient sounds (rain, wind, white noise, brown noise) specifically designed for focus and productivity. All sounds are continuous and non-changing-state, avoiding the acoustic variation that triggers the irrelevant speech effect.',
        effectiveness: 'very-effective',
        analysis: 'Noisli\'s sound design is well-aligned with the psychology — all options are steady-state audio that masks environmental speech without creating new phonological interference. The ability to mix multiple steady-state sounds gives users fine control over their acoustic environment.',
      },
      {
        company: 'Krisp',
        product: 'AI Noise Cancellation',
        description: 'Krisp uses AI to remove background speech and noise from microphone input during calls. While designed for outbound audio, it demonstrates recognition that background speech degrades communication quality and focus.',
        effectiveness: 'effective',
        analysis: 'Krisp addresses the irrelevant speech effect at the source level — removing background speech from the auditory environment rather than asking users to ignore it. This aligns with the research showing that the effect is obligatory and cannot be suppressed by voluntary attention.',
      },
    ],

    abTests: [
      {
        title: 'Notification Sounds: Per-Event vs Batched Summary',
        hypothesis:
          'Batching notifications into periodic summaries will improve task performance compared to individual per-event sounds',
        controlVersion: {
          description:
            'Each notification triggers an individual chime sound immediately when received',
          metrics: {
            conversionRate: 'N/A',
            taskAccuracy: '71%',
            taskCompletionTime: '14.2 min',
          },
        },
        treatmentVersion: {
          description:
            'Notifications are batched silently and a single brief tone plays every 15 minutes with a visual summary badge',
          metrics: {
            conversionRate: 'N/A',
            taskAccuracy: '89%',
            taskCompletionTime: '10.8 min',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Batching notifications reduced auditory interruptions by 94% during focus periods. Task accuracy improved by 25% and completion time decreased by 24%. Users reported feeling "less scattered" and "more in control."',
          learnings: [
            'Individual notification sounds create cumulative cognitive disruption',
            'Users strongly preferred batched notifications during focus tasks',
            'No critical notifications were missed — the 15-minute batch window was acceptable',
            'Visual badge indicators were sufficient for awareness between audio summaries',
          ],
        },
      },
      {
        title: 'Ambient Sound: Steady-State vs Variable Background',
        hypothesis:
          'Steady-state ambient sounds will cause less working memory disruption than variable ambient sounds',
        controlVersion: {
          description:
            'Coffee shop ambiance with audible background conversation fragments and variable sounds',
          metrics: {
            conversionRate: 'N/A',
            serialRecallAccuracy: '62%',
            subjectiveDistraction: '6.8/10',
          },
        },
        treatmentVersion: {
          description:
            'Brown noise at equivalent volume level — continuous, steady-state sound with no speech or acoustic variation',
          metrics: {
            conversionRate: 'N/A',
            serialRecallAccuracy: '84%',
            subjectiveDistraction: '2.1/10',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Coffee shop ambiance (containing speech fragments) reduced serial recall accuracy by 22 percentage points compared to brown noise. This matches the laboratory finding that changing-state sounds with speech-like properties cause maximum disruption to serial order memory.',
          learnings: [
            'Background speech fragments cause significant working memory disruption even at low volume',
            'Steady-state masking sounds preserve cognitive performance while reducing environmental noise',
            'Users rated coffee shop sounds as "cozy" but performed significantly worse on recall tasks',
            'Subjective preference does not align with cognitive performance — users may choose harmful audio environments',
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
        name: 'Audio Notification Indicators',
        description:
          'Icons, badges, or UI elements indicating active audio notifications or sounds',
        howToSpot:
          'Look for speaker icons, sound wave indicators, or notification sound settings in the interface',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Missing Audio Controls',
        description:
          'Absence of mute, volume, or notification sound management options',
        howToSpot:
          'Check settings and preferences for granular audio control options — missing controls signal risk',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Auto-Playing Media',
        description:
          'Videos, music, or audio content that plays automatically without user initiation',
        howToSpot:
          'Look for media players set to autoplay, background music, or ambient audio without opt-in',
        severity: ImpactLevel.CRITICAL,
      },
      {
        name: 'Focus Mode Availability',
        description:
          'Presence or absence of a dedicated focus or Do Not Disturb mode',
        howToSpot:
          'Check for DND toggles, focus mode settings, or notification scheduling features',
        severity: ImpactLevel.HIGH,
      },
    ],

    patterns: [
      {
        name: 'Notification Storm Pattern',
        description:
          'Multiple rapid audio notifications from the same source within a short time window',
        indicators: [
          'Per-message notification sounds in group conversations',
          'Individual chimes for batch operations (multiple file uploads, etc.)',
          'Real-time audio alerts for streaming data updates',
          'No notification collapsing or debouncing',
        ],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Speech-Based Alert Pattern',
        description:
          'Using spoken text or speech synthesis for routine notifications',
        indicators: [
          'Text-to-speech reading notification content aloud',
          'Voice confirmations for routine actions',
          'Spoken status updates or progress reports',
          'Audio assistants providing unsolicited information',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Variable Background Audio Pattern',
        description:
          'Background audio with changing-state properties (speech, melodies, variable rhythms)',
        indicators: [
          'Background music with lyrics or vocals',
          'Coffee shop or crowd ambiance sounds',
          'Nature sounds with variable bird calls or animal sounds',
          'Auto-playing video content in adjacent UI regions',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'No Audio Control Pattern',
        description:
          'Interface lacks user-accessible controls for audio behavior',
        indicators: [
          'No mute or volume controls for notification sounds',
          'No per-channel or per-app notification settings',
          'No focus mode or DND feature',
          'No option to replace audio alerts with visual indicators',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'medium',
      },
    ],

    checklistQuestions: [
      'What audio notifications does this interface produce, and how frequently?',
      'Are any notifications speech-based or use text-to-speech?',
      'Can users control, mute, or customize notification sounds?',
      'Is there a focus mode or Do Not Disturb option?',
      'Does the interface auto-play any audio or media content?',
      'Are rapid successive notifications collapsed or debounced?',
      'Do ambient or background sounds include speech or changing-state audio?',
      'Is audio feedback proportional to the urgency of the event?',
      'Are visual alternatives provided for all audio cues?',
      'Have you tested task performance with and without the interface audio active?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in the irrelevant speech effect and auditory distraction.

Analyze the provided design for patterns that may cause or mitigate auditory distraction. Identify:

1. **Audio Notifications**: What sounds the interface produces — frequency, type (speech, tone, melody), and urgency mapping
2. **Background Audio**: Any ambient sounds, music, or auto-playing media that could disrupt working memory
3. **Focus Controls**: Availability of mute, DND, focus mode, or notification batching features
4. **Notification Design**: Whether audio alerts are proportional to urgency and use appropriate sound types
5. **Visual Alternatives**: Whether silent visual indicators are available as alternatives to audio cues

For each pattern found:
- Assess disruption potential based on changing-state properties and speech content
- Evaluate whether the audio serves a legitimate purpose proportional to its cognitive cost
- Determine if users have sufficient control over the auditory environment
- Suggest improvements for reducing unnecessary auditory disruption

Consider:
- Is the interface creating unnecessary changing-state audio?
- Are speech-based alerts reserved for truly critical events?
- Do users have granular control over all audio the interface produces?
- Are steady-state masking options available for focus environments?
- Are accessibility needs balanced with distraction reduction?

Provide actionable recommendations for minimizing irrelevant auditory disruption while preserving essential audio feedback.`,

    outputSchema: {
      type: 'object',
      properties: {
        audioPatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              soundType: { type: 'string' },
              frequency: { type: 'string' },
              disruptionLevel: { type: 'string' },
              justification: { type: 'string' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'soundType',
              'disruptionLevel',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            audioDisruptionScore: { type: 'number' },
            userControlScore: { type: 'number' },
            focusSupportScore: { type: 'number' },
            accessibilityBalance: { type: 'number' },
          },
          required: [
            'audioDisruptionScore',
            'userControlScore',
            'focusSupportScore',
            'accessibilityBalance',
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
        'audioPatterns',
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
        title: 'Audit All Audio Output',
        description:
          'Catalog every sound your interface produces — notification chimes, alerts, feedback sounds, background audio, and media',
        example:
          'Create a spreadsheet listing every audio event, its trigger frequency, sound type (speech/tone/melody), and duration',
        tips: [
          'Include sounds from third-party integrations and embedded media',
          'Measure actual frequency during typical usage sessions',
          'Categorize each sound as speech-based, changing-state, or steady-state',
        ],
      },
      {
        step: 2,
        title: 'Classify by Urgency and Disruption',
        description:
          'Map each audio event to an urgency tier and assess its cognitive disruption cost',
        example:
          'Critical: account security (speech alert). Important: direct message (two-tone). Info: reaction added (silent/visual only)',
        tips: [
          'Speech-based sounds should only be used for the highest urgency tier',
          'Most notifications should be silent or use single, brief tones',
          'Consider the cumulative effect of multiple mid-tier sounds',
        ],
      },
      {
        step: 3,
        title: 'Design Notification Sound Hierarchy',
        description:
          'Create a distinct set of sounds that maps to your urgency tiers, with decreasing disruption for lower urgency',
        example:
          'Tier 1: spoken alert. Tier 2: two-note chime. Tier 3: single soft tone. Tier 4: visual badge only',
        tips: [
          'Keep non-critical sounds brief (under 500ms)',
          'Avoid melodies or complex tonal patterns for routine notifications',
          'Test sounds at typical ambient noise levels',
        ],
      },
      {
        step: 4,
        title: 'Implement Focus Mode',
        description:
          'Build a focus mode that silences non-critical audio and batches notifications for later review',
        example:
          'Focus mode: only Tier 1 alerts play audio; all others are batched with a summary every 30 minutes',
        tips: [
          'Allow users to customize which tiers break through',
          'Provide a clear visual indicator that focus mode is active',
          'Batch notifications intelligently (group by source, deduplicate)',
        ],
      },
      {
        step: 5,
        title: 'Provide Granular User Controls',
        description:
          'Give users fine-grained control over every aspect of audio output',
        example:
          'Per-channel mute, per-notification-type sound selection, global volume, DND scheduling',
        tips: [
          'Default to less disruptive settings — users can enable more',
          'Make audio controls discoverable, not buried in deep settings',
          'Remember user preferences across sessions and devices',
        ],
      },
      {
        step: 6,
        title: 'Test Cognitive Impact',
        description:
          'Measure task performance with and without your interface audio active',
        example:
          'Run serial recall or proofreading tasks with notifications on vs. batched vs. silent',
        tips: [
          'Measure accuracy, completion time, and subjective distraction',
          'Test with realistic notification frequency, not just single events',
          'Include users with different noise sensitivity levels',
        ],
      },
    ],

    dos: [
      'Use brief, simple tones for non-critical notifications',
      'Provide a focus mode that batches non-essential notifications',
      'Offer steady-state ambient sounds (brown noise, rain) for masking',
      'Give users granular control over all notification sounds',
      'Reserve speech-based alerts for truly critical events only',
      'Collapse rapid successive notifications into a single sound',
      'Provide visual alternatives for every audio cue',
      'Default to minimal audio — let users opt into more',
    ],

    donts: [
      'Don\'t use text-to-speech for routine notifications',
      'Don\'t auto-play background music with lyrics or vocals',
      'Don\'t play individual sounds for every event in rapid succession',
      'Don\'t force audio notifications without a mute option',
      'Don\'t use complex melodies or long sounds for low-urgency alerts',
      'Don\'t offer "coffee shop ambiance" as a focus sound (it contains speech)',
      'Don\'t assume users want audio feedback for every interaction',
      'Don\'t conflate user preference for "cozy sounds" with cognitive performance',
    ],

    bestPractices: [
      {
        title: 'Notification Debouncing',
        description:
          'Collapse multiple rapid notifications into a single summary sound and visual indicator',
        rationale:
          'Rapid changing-state audio causes cumulative cognitive disruption far exceeding individual events',
        example:
          '15 messages in 2 minutes -> single chime + badge showing "15 new messages"',
      },
      {
        title: 'Context-Aware Audio',
        description:
          'Adjust audio behavior based on detected user context (screen sharing, active typing, idle)',
        rationale:
          'Users engaged in concentrated work are most vulnerable to the irrelevant speech effect',
        example:
          'Automatically suppress non-critical sounds when user is actively typing or in a meeting',
      },
      {
        title: 'Steady-State Masking',
        description:
          'Offer steady-state masking sounds as a feature for users in noisy environments',
        rationale:
          'Steady-state sounds mask environmental speech without creating new phonological interference',
        example:
          'Brown noise, pink noise, or constant-rain sound generator built into the app',
      },
      {
        title: 'Audio-Visual Parity',
        description:
          'Ensure every audio notification has an equivalent visual indicator',
        rationale:
          'Users who mute audio should not lose any information; visual indicators serve as the fallback',
        example:
          'Notification badge count, toast banner, and inbox summary for every event that would have played a sound',
      },
      {
        title: 'Progressive Audio Disclosure',
        description:
          'Start with minimal audio and let users progressively enable more sounds',
        rationale:
          'Users are better judges of their own noise tolerance than default configurations',
        example:
          'Default: visual-only notifications. Users enable sounds per category as desired.',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '1.4.2',
        guideline:
          'Audio Control - Provide mechanism to pause, stop, or control volume of audio that plays automatically',
        implementation:
          'All auto-playing audio must have visible pause/stop/volume controls. Focus mode should be easily activatable via keyboard shortcut.',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.3.3',
        guideline:
          'Sensory Characteristics - Do not rely solely on audio to convey information',
        implementation:
          'Every audio notification must have a visual equivalent (badge, banner, or indicator). Never use sound as the only channel for important information.',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.4.1',
        guideline:
          'Use of Color - Visual notification indicators must not rely solely on color',
        implementation:
          'Visual alternatives to audio cues should use icons, text labels, and patterns in addition to color to ensure all users can perceive them.',
      },
      {
        wcagLevel: 'AAA',
        criterion: '1.4.7',
        guideline:
          'Low or No Background Audio - Pre-recorded audio content should have no background sounds or background sounds at least 20dB lower',
        implementation:
          'Any spoken audio (e.g., voice notifications) should have minimal or no background audio to ensure clarity for users with hearing difficulties.',
      },
    ],

    ethics: [
      {
        concern: 'Attention Hijacking',
        severity: 'high',
        explanation:
          'Using frequent, loud, or speech-based notifications to force engagement and increase time-in-app',
        mitigation:
          'Design audio notifications to serve user needs, not engagement metrics. Default to minimal audio and respect user-set quiet hours.',
      },
      {
        concern: 'FOMO-Driven Sounds',
        severity: 'medium',
        explanation:
          'Using distinctive, anxiety-inducing notification sounds designed to create fear of missing out',
        mitigation:
          'Notification sounds should inform, not create anxiety. Avoid urgent-sounding tones for non-urgent events.',
      },
      {
        concern: 'Accessibility Trade-offs',
        severity: 'high',
        explanation:
          'Reducing audio for distraction purposes may harm users who depend on auditory cues',
        mitigation:
          'Always provide alternative channels. Never remove audio without offering equivalent visual or haptic alternatives. Screen reader users should be able to customize verbosity.',
      },
      {
        concern: 'Cognitive Overload by Default',
        severity: 'critical',
        explanation:
          'Shipping products with all notification sounds enabled by default, overwhelming users who don\'t know how to customize',
        mitigation:
          'Default to minimal audio. Provide clear onboarding for notification settings. Make focus mode prominent and easy to activate.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'Acoustic Factors in Learning: The Effects of Irrelevant Speech on Serial Recall',
        author: 'Colle, H. A., & Welsh, A.',
        year: 1976,
        doi: '10.1016/S0022-5371(76)80024-1',
        description:
          'The foundational paper demonstrating that irrelevant background speech disrupts serial recall of visually presented items',
        type: 'foundational',
      },
      {
        title: 'Irrelevant Speech Disrupts Order Information in Free Recall as in Serial Recall',
        author: 'Jones, D. M., & Macken, W. J.',
        year: 1993,
        doi: '10.1037/0278-7393.19.3.721',
        description:
          'Demonstrated that the changing-state properties of speech (not meaning) cause disruption, and that the effect extends beyond serial recall',
        type: 'foundational',
      },
      {
        title: 'The Changing-State Hypothesis and the Impact of Irrelevant Speech on Working Memory',
        author: 'Jones, D. M., Madden, C., & Miles, C.',
        year: 1992,
        doi: '10.1037/0278-7393.18.6.1223',
        description:
          'Established the changing-state hypothesis: disruption is caused by acoustic variation, not speech per se',
        type: 'advanced',
      },
      {
        title: 'A Functional Account of the Irrelevant Speech Effect',
        author: 'Jones, D. M., & Tremblay, S.',
        year: 2000,
        description:
          'Comprehensive theoretical account linking the irrelevant speech effect to interference with serial order processing',
        type: 'advanced',
      },
    ],

    books: [
      {
        title: 'Noise and Performance',
        author: 'Jones, D. M., & Smith, A. P.',
        year: 1992,
        description:
          'Comprehensive overview of how noise and irrelevant sound affect cognitive performance in work environments',
        type: 'foundational',
      },
      {
        title: 'Working Memory: Thought, Action, and Experience',
        author: 'Logie, R. H., & Cowan, N.',
        year: 2015,
        isbn: '9780198842286',
        description:
          'Modern coverage of working memory models including the phonological loop and its susceptibility to auditory interference',
        type: 'advanced',
      },
    ],

    articles: [
      {
        title: 'Designing Sound for Focus: What the Research Says About Audio Notifications',
        author: 'Nielsen Norman Group',
        url: 'https://www.nngroup.com/articles/sound-design-notifications/',
        description:
          'Practical guide to designing notification sounds that inform without disrupting cognitive flow',
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
      'attentional-blink',
      'cognitive-load',
      'change-blindness',
      'serial-position-effect',
    ],

    conflicts: [
      'cocktail-party-effect', // The ability to selectively attend to one voice — the opposite direction of irrelevant speech disruption
    ],

    confusedWith: [
      'cocktail-party-effect', // Both involve background speech but describe opposite phenomena
      'auditory-masking', // Masking is perceptual overlap; ISE is cognitive interference
      'attentional-capture', // Capture is about orienting to novel sounds; ISE occurs even for ignored, meaningless speech
    ],

    hierarchy: {
      parent: 'cognitive-bias',
      children: [
        'changing-state-effect',
        'phonological-interference',
      ],
    },
  },
};
