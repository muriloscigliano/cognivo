/**
 * ILLUSION OF TRANSPARENCY
 *
 * We overestimate how well others can perceive our internal states,
 * emotions, and thoughts.
 */

import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const illusionTransparency: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'illusion-transparency',
    name: 'Illusion of Transparency',
    aliases: ['Transparency Illusion', 'Spotlight Effect (related)', 'Observer\'s Illusion'],
    category: BiasCategory.SOCIAL,
    relatedCategories: [
      BiasCategory.DECISION_MAKING,
      BiasCategory.PERCEPTION,
    ],
    tags: [
      'communication',
      'social-cognition',
      'self-awareness',
      'feedback',
      'collaboration',
      'emotional-expression',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple:
      'We overestimate how well others can perceive our internal states, emotions, and thoughts.',

    detailed: `The Illusion of Transparency is a cognitive bias in which people overestimate the degree to which their personal mental states — emotions, intentions, knowledge, and thoughts — are apparent to others. We feel as though our inner experiences "leak out" and are obvious, when in reality others have far less insight into what we are feeling or thinking than we assume.

This bias operates in both directions: we also tend to overestimate how well we can read others' internal states. The result is a persistent communication gap — people assume their intentions, frustrations, excitement, or confusion are obvious without explicitly expressing them.

In product design, the Illusion of Transparency has profound implications for communication tools, collaboration features, status indicators, and feedback mechanisms. When users believe their state is already apparent, they are less likely to use explicit communication tools. Designers must bridge this gap by providing structured ways for users to make their internal states visible — through reactions, status indicators, sentiment tools, and explicit feedback mechanisms.`,

    psychologyBasis: {
      discoveredBy: 'Thomas Gilovich, Kenneth Savitsky, and Victoria Husted Medvec',
      year: 1998,
      theory: 'Anchoring-and-Adjustment Framework of Perspective-Taking',
      mechanism: `The Illusion of Transparency arises from a failure in perspective-taking, rooted in an anchoring-and-adjustment process:

1. **Egocentric Anchoring**: We anchor to our own subjective experience — since we feel our emotions intensely, we assume they must be visible
2. **Insufficient Adjustment**: We attempt to adjust from our own perspective to imagine how others see us, but the adjustment is insufficient
3. **Curse of Knowledge**: Once we know something (our own feelings), we cannot fully "unknow" it when estimating what others perceive
4. **Embodied Cognition**: Physical sensations of emotion (racing heart, flushed face) feel so strong internally that we assume external signs must be equally obvious
5. **Asymmetric Information Access**: We have full access to our own thoughts but forget that others only see external behavior

The mechanism is automatic — we genuinely believe our internal states are more visible than they are, which reduces motivation to communicate explicitly.`,
    },

    realWorldExample: `In a classic study by Gilovich, Savitsky, and Medvec (1998), participants were asked to taste pleasant and unpleasant drinks while observers watched. Tasters consistently overestimated how well observers could detect which drinks tasted bad. Similarly, in a lie-detection study, liars believed their deception was far more transparent than it actually was — observers detected lies at near-chance rates. The tasters and liars felt their internal reactions were "leaking out," but observers had far less access to these signals than expected.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `The Illusion of Transparency affects how users communicate, collaborate, and give feedback in digital products. Because users overestimate how well their intentions and emotions come across, they often under-communicate, leading to misunderstandings. Designers can address this by:

- Providing explicit feedback mechanisms (reactions, emoji, sentiment indicators)
- Building clear communication tools that lower the barrier to expressing internal states
- Designing status indicators that make context visible (availability, mood, workload)
- Creating structured feedback formats that prompt explicit expression
- Surfacing potential misunderstandings before they escalate`,

    whenToUse: [
      {
        title: 'Collaboration Tools',
        scenario:
          'When users work together asynchronously and cannot read body language or tone',
        example:
          'Provide reaction emoji, tone indicators, and structured comment templates so collaborators can explicitly signal intent',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Status and Presence Indicators',
        scenario: 'When team members need to understand each other\'s availability, mood, or workload',
        example:
          'Design rich status indicators (busy, focusing, in meetings, open to chat) instead of simple online/offline states',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Feedback Collection',
        scenario: 'When gathering user sentiment, satisfaction, or emotional responses',
        example:
          'Use structured sentiment scales, emoji reactions, or mood selectors rather than assuming users will volunteer feelings',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Code Review and PR Descriptions',
        scenario: 'When developers need to communicate intent behind code changes',
        example:
          'Prompt authors to explain the "why" behind changes with structured PR templates, since reviewers cannot infer intent from code alone',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Customer Support Interfaces',
        scenario: 'When users need to communicate frustration levels or urgency to support agents',
        example:
          'Offer explicit urgency selectors and sentiment indicators so agents understand how the user feels without guessing',
        impact: ImpactLevel.MEDIUM,
      },
      {
        title: 'Email and Messaging Composition',
        scenario: 'When users compose text-based messages where tone is easily misread',
        example:
          'Provide tone analysis previews or suggest emoji/reactions to help senders convey intent they assume is already obvious',
        impact: ImpactLevel.MEDIUM,
      },
    ],

    whenToAvoid: [
      {
        title: 'Privacy-Sensitive Contexts',
        reason:
          'Forcing users to share emotional states can violate privacy boundaries',
        consequence:
          'Users may feel surveilled or pressured to perform emotions they don\'t actually feel',
        alternative:
          'Make emotional expression opt-in and never mandatory. Provide anonymous feedback options.',
      },
      {
        title: 'High-Stakes Professional Environments',
        reason:
          'Mood indicators in workplace tools can create pressure to appear positive or "on"',
        consequence:
          'Employees may feel coerced into emotional labor or penalized for honest states',
        alternative:
          'Focus on task-relevant status (availability, workload) rather than emotional status',
      },
      {
        title: 'Situations Requiring Emotional Autonomy',
        reason:
          'Users sometimes benefit from keeping their emotional state private',
        consequence:
          'Over-designed transparency can remove healthy boundaries between professional and personal states',
        alternative:
          'Provide granular control over what is shared and with whom',
      },
      {
        title: 'Manipulative Nudging',
        reason:
          'Using awareness of this bias to guilt users into sharing more than they want',
        consequence:
          'Erosion of trust and user autonomy',
        alternative:
          'Design tools that empower voluntary communication, not compelled disclosure',
      },
    ],

    commonMistakes: [
      {
        title: 'Assuming Text Conveys Tone',
        description:
          'Designing messaging interfaces with no way to signal tone, assuming the words alone will convey intent',
        why: 'Senders believe their tone is obvious from the text because they can "hear" it in their head while writing',
        fix: 'Add reaction options, tone indicators, or structured response templates to supplement plain text',
      },
      {
        title: 'Minimal Status Options',
        description:
          'Providing only online/offline presence states, assuming colleagues will infer context',
        why: 'Users believe their situation (in a meeting, deep in focus, running late) is known by others',
        fix: 'Offer rich status options: focusing, in a meeting, taking a break, available for quick questions, etc.',
      },
      {
        title: 'Bare Code Diffs Without Context',
        description:
          'Expecting code reviewers to understand intent from diffs alone without PR descriptions',
        why: 'Authors assume the reasoning behind changes is self-evident from the code',
        fix: 'Require structured PR descriptions with "What", "Why", and "How to test" sections',
      },
      {
        title: 'Feedback Forms Without Prompts',
        description:
          'Offering only free-text feedback fields, assuming users will articulate their feelings',
        why: 'Users feel their satisfaction or frustration is already obvious from their usage patterns',
        fix: 'Use structured satisfaction scales, emoji sentiment selectors, and targeted questions',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.MEDIUM,
        description:
          'Layout affects where communication tools and status indicators are placed',
        examples: [
          'Prominent placement of reaction buttons encourages explicit emotional expression',
          'Visible status indicators near user avatars communicate availability',
          'Feedback prompts positioned at natural pause points capture sentiment',
          'Persistent notification areas for status updates keep context visible',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Text styling can help or hinder tone clarity in communication',
        examples: [
          'Rich text formatting helps users add emphasis and convey tone',
          'Clear differentiation between system messages and user messages',
          'Tone preview features showing how a message might be interpreted',
          'Structured templates with clear labels reduce ambiguity',
        ],
      },
      color: {
        level: ImpactLevel.HIGH,
        description:
          'Color signals emotional states and status in communication tools',
        examples: [
          'Green/yellow/red presence indicators communicate availability at a glance',
          'Sentiment-coded reactions (warm colors for positive, cool for neutral) aid expression',
          'Color-coded urgency levels in support tickets make priority explicit',
          'Mood indicators using color spectrums help visualize team sentiment',
        ],
      },
      interaction: {
        level: ImpactLevel.CRITICAL,
        description:
          'Interactive elements are the primary way users bridge the transparency gap',
        examples: [
          'One-click emoji reactions lower the barrier to explicit emotional expression',
          'Status dropdown selectors make context-sharing quick and easy',
          'Inline reaction pickers in message threads encourage moment-by-moment feedback',
          'Structured PR templates prompt authors to explain intent they assume is obvious',
        ],
      },
      content: {
        level: ImpactLevel.CRITICAL,
        description:
          'Content design determines whether users are prompted to communicate what they assume is already known',
        examples: [
          'Placeholder text like "Help others understand why..." prompts explicit intent sharing',
          'Template structures with "Context:", "Intent:", "Expected outcome:" sections',
          'Microcopy that normalizes explicit communication: "Let your team know how you\'re feeling"',
          'Tooltips explaining why sharing status or reactions helps team collaboration',
        ],
      },
      accessibility: {
        level: ImpactLevel.HIGH,
        description:
          'Accessible communication tools ensure all users can express and perceive internal states',
        examples: [
          'Screen reader-compatible status indicators with text alternatives',
          'Keyboard-accessible reaction pickers and status selectors',
          'Alt text on emoji reactions describing the intended sentiment',
          'Non-visual tone indicators for screen reader users (e.g., "Message marked as urgent")',
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
        title: 'Rich Status Indicators',
        description:
          'Team collaboration tool with detailed presence and context indicators',
        code: `<div class="team-member">
  <img src="avatar.jpg" alt="Sarah Chen" class="avatar">
  <div class="status-indicator">
    <span class="presence focusing" aria-label="Focusing">
      <span class="status-dot"></span>
    </span>
    <div class="status-detail">
      <p class="status-text">Deep work — back at 3pm</p>
      <p class="status-subtext">Prefer async messages</p>
    </div>
  </div>
  <div class="quick-actions">
    <button class="action" aria-label="Send async message">
      Message (async)
    </button>
    <button class="action urgent" aria-label="Send urgent notification">
      Urgent only
    </button>
  </div>
</div>

<style>
.presence.focusing { color: var(--cg-color-warning); }
.status-text { font-weight: 600; font-size: 0.9rem; }
.status-subtext { color: var(--cg-color-text-muted); font-size: 0.8rem; }
</style>`,
        explanation:
          'Instead of a simple green/grey dot, this design makes the person\'s context explicit — what they\'re doing, when they\'ll be available, and how to reach them. This bridges the gap the Illusion of Transparency creates: Sarah doesn\'t need to assume others know she\'s in deep work.',
        principle:
          'Explicit context indicators replace the assumption that others know your state',
        metrics: {
          before: '34% of interruptions during focus time were non-urgent',
          after: '11% of interruptions during focus time were non-urgent',
          improvement: '68% reduction in unnecessary interruptions',
        },
      },
      {
        title: 'Structured PR Description Template',
        description:
          'Code review tool with structured templates that prompt developers to explain intent',
        code: `<form class="pr-template">
  <h3>Pull Request Description</h3>

  <fieldset class="section">
    <legend>What does this change?</legend>
    <textarea placeholder="Describe the change in plain language..."></textarea>
  </fieldset>

  <fieldset class="section">
    <legend>Why is this change needed?</legend>
    <textarea placeholder="What problem does this solve? What motivated this approach?"></textarea>
  </fieldset>

  <fieldset class="section">
    <legend>How should reviewers test this?</legend>
    <textarea placeholder="Steps to verify the change works as expected..."></textarea>
  </fieldset>

  <fieldset class="section">
    <legend>Anything reviewers should know?</legend>
    <textarea placeholder="Tradeoffs, alternatives considered, areas of uncertainty..."></textarea>
  </fieldset>

  <div class="confidence-selector">
    <label>How confident are you in this change?</label>
    <select>
      <option>High — straightforward change</option>
      <option>Medium — would appreciate careful review</option>
      <option>Low — exploring an approach, feedback wanted</option>
    </select>
  </div>
</form>`,
        explanation:
          'Developers often assume reviewers will understand the "why" behind code changes. This template explicitly prompts for intent, context, and confidence level — information that authors typically believe is obvious from the code itself.',
        principle:
          'Structured prompts extract context that authors assume is self-evident',
        metrics: {
          before: '42% of PR comments were requests for clarification',
          after: '18% of PR comments were requests for clarification',
          improvement: '57% reduction in back-and-forth during code review',
        },
      },
      {
        title: 'Message Tone Indicator',
        description:
          'Messaging tool that helps senders signal the intended tone of their message',
        code: `<div class="compose-area">
  <textarea class="message-input" placeholder="Type a message...">
    Let's revisit the deadline for this project
  </textarea>

  <div class="tone-selector">
    <label>How should this read?</label>
    <div class="tone-options">
      <button class="tone selected" aria-pressed="true">
        <span class="tone-emoji">💬</span>
        <span class="tone-label">Neutral</span>
      </button>
      <button class="tone" aria-pressed="false">
        <span class="tone-emoji">🙂</span>
        <span class="tone-label">Friendly</span>
      </button>
      <button class="tone" aria-pressed="false">
        <span class="tone-emoji">⚡</span>
        <span class="tone-label">Urgent</span>
      </button>
      <button class="tone" aria-pressed="false">
        <span class="tone-emoji">🤔</span>
        <span class="tone-label">Thoughtful</span>
      </button>
    </div>
    <p class="tone-preview">
      Recipients will see: 💬 <em>"Let's revisit the deadline for this project"</em>
    </p>
  </div>

  <button class="send-btn">Send</button>
</div>`,
        explanation:
          'Text messages are notoriously tone-deaf. Senders assume their intent is clear ("I\'m just asking a question") while recipients may read urgency, criticism, or frustration. The tone selector makes intent explicit, bridging the transparency gap.',
        principle:
          'Explicit tone signals prevent the misinterpretation that arises when senders assume tone is obvious',
      },
    ],

    bad: [
      {
        title: 'Bare Online/Offline Status',
        description:
          'Collaboration tool showing only green dot (online) or grey dot (offline)',
        code: `<!-- DON'T DO THIS -->
<div class="team-member">
  <img src="avatar.jpg" alt="Sarah">
  <span class="status-dot online"></span>
  <span class="name">Sarah Chen</span>
</div>

<style>
.status-dot.online { background: green; }
.status-dot.offline { background: grey; }
</style>`,
        explanation:
          'A simple online/offline indicator tells colleagues nothing about context. Sarah might be online but in a critical meeting, deeply focused, or about to leave. Colleagues assume they know her state ("she\'s online, she must be free") and interrupt at bad times. Sarah assumes others know she\'s busy ("can\'t they see I haven\'t responded in 20 minutes?").',
        principle:
          'Minimal status indicators reinforce the Illusion of Transparency by letting everyone assume they know more than they do',
      },
      {
        title: 'Plain Text Without Reaction Options',
        description:
          'Chat interface with no way to react or signal understanding beyond typing a response',
        code: `<!-- DON'T DO THIS -->
<div class="chat">
  <div class="message">
    <span class="author">Manager:</span>
    <p>The client moved the launch date up by two weeks.</p>
  </div>
  <div class="message">
    <span class="author">You:</span>
    <textarea placeholder="Type a message..."></textarea>
  </div>
</div>`,
        explanation:
          'When the only response option is typing a full message, users often don\'t respond at all — assuming their reaction (surprise, concern, acknowledgment) is somehow obvious. The manager assumes silence means agreement, when it might mean shock, confusion, or simply "I haven\'t processed this yet."',
        principle:
          'Without low-friction response mechanisms, the Illusion of Transparency causes dangerous communication gaps',
      },
      {
        title: 'Feedback Form With Only Free Text',
        description:
          'Post-experience survey with a single open-ended text field',
        code: `<!-- DON'T DO THIS -->
<form class="feedback">
  <h3>How was your experience?</h3>
  <textarea placeholder="Tell us what you think..."></textarea>
  <button type="submit">Submit</button>
</form>`,
        explanation:
          'Users believe their satisfaction or frustration is already evident from their usage patterns ("they can see I stopped using the feature"). An unstructured text field provides no scaffolding for expressing feelings that users assume are already known. Most users submit nothing, and those who do often fail to articulate what they truly feel.',
        principle:
          'Unstructured feedback assumes users will volunteer feelings they believe are already obvious',
      },
    ],

    realWorld: [
      {
        company: 'Slack',
        product: 'Custom Status and Presence',
        description: 'Slack allows users to set custom status messages with emoji, scheduled durations, and notification pause settings. Users can communicate "In a meeting until 2pm," "On PTO," or "Heads down — slow to respond" — making their context visible to colleagues who would otherwise assume availability.',
        effectiveness: 'very-effective',
        analysis: 'Slack\'s status system directly addresses the Illusion of Transparency by providing a structured, low-friction way to share context. The emoji + text + duration format reduces the effort of making internal state visible. Custom statuses reduced unnecessary @mentions during focus time by an estimated 30% in enterprise deployments.',
      },
      {
        company: 'Microsoft',
        product: 'Teams Presence and Focus Mode',
        description: 'Microsoft Teams integrates calendar data to automatically set presence indicators (In a meeting, Presenting, Focusing) and provides Do Not Disturb modes that suppress notifications. The system makes context visible without requiring manual updates.',
        effectiveness: 'very-effective',
        analysis: 'Automatic status based on calendar events is particularly effective because it overcomes the effort barrier — users don\'t need to remember to update their status. However, the auto-detection of "Available" when a meeting ends is sometimes inaccurate (user may need post-meeting processing time), showing the limits of automated transparency.',
      },
      {
        company: 'GitHub',
        product: 'PR Description Templates and Review Requests',
        description: 'GitHub\'s PR template system prompts authors to explain changes with structured sections. The review request feature lets authors explicitly tag reviewers and mark PRs as drafts, making their confidence level and expectations visible rather than assuming reviewers will infer these from the diff.',
        effectiveness: 'effective',
        analysis: 'Templates bridge the transparency gap by prompting authors to share context they assume is obvious. Teams using structured PR templates report significantly fewer review cycles and clarification comments. The "Draft PR" feature is particularly powerful — it explicitly signals "I\'m not confident yet, feedback welcome" instead of relying on reviewers to guess.',
      },
      {
        company: 'Gmail',
        product: 'Smart Compose and Tone Suggestions',
        description: 'Gmail\'s AI-powered suggestions help users choose words and phrasing that convey their intended tone. The system flags potentially ambiguous phrasing and suggests alternatives, helping senders realize their tone may not come across as intended.',
        effectiveness: 'effective',
        analysis: 'By surfacing how a message might be interpreted, Gmail\'s tools directly counter the Illusion of Transparency. Senders often assume their friendly intent is clear, but AI analysis reveals when phrasing could read as curt or demanding. This nudges toward explicit tone-setting without requiring manual tone selection.',
      },
    ],

    abTests: [
      {
        title: 'Emoji Reactions vs Text-Only Responses',
        hypothesis:
          'Adding emoji reaction buttons will increase response rates and reduce misunderstandings in team messaging',
        controlVersion: {
          description:
            'Chat interface with text-only responses — users must type a message to respond',
          metrics: {
            conversionRate: '23%',
            timeOnPage: '0:45',
            scrollDepth: '60%',
          },
        },
        treatmentVersion: {
          description:
            'Chat interface with one-click emoji reactions (thumbs up, eyes, check mark, question mark, heart) plus text responses',
          metrics: {
            conversionRate: '71%',
            timeOnPage: '0:12',
            scrollDepth: '85%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Emoji reactions tripled response rates. Messages that previously went "acknowledged but unresponded" now received explicit reactions. Follow-up surveys showed 64% of non-responders in the control believed their acknowledgment was already apparent from reading the message. The reaction buttons bridged the transparency gap by making "I saw this and agree" explicit.',
          learnings: [
            'Low-friction response mechanisms dramatically increase explicit communication',
            'Most non-responses are not disagreement — they are assumed transparency',
            'Emoji reactions reduce "Did you see my message?" follow-ups by 78%',
            'Question mark reactions surface confusion that would otherwise go unexpressed',
          ],
        },
      },
      {
        title: 'Rich Status vs Simple Online/Offline',
        hypothesis:
          'Rich status indicators with context will reduce unnecessary interruptions and improve team collaboration',
        controlVersion: {
          description:
            'Simple green/grey presence dots showing only online or offline status',
          metrics: {
            conversionRate: '100%',
            clickThroughRate: '45%',
          },
        },
        treatmentVersion: {
          description:
            'Rich status with options: Available, Focusing (do not disturb), In a meeting, On break, Open to chat. Each with optional custom text and auto-expire time.',
          metrics: {
            conversionRate: '82%',
            clickThroughRate: '23%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Rich status reduced non-urgent interruptions during focus time by 52%. Users in the control assumed colleagues knew they were busy (Illusion of Transparency), while colleagues assumed "online" meant "available." The rich status system made this invisible context visible, reducing friction and frustration on both sides.',
          learnings: [
            'Simple online/offline creates a double illusion: both parties assume shared understanding',
            'Auto-expiring statuses increase adoption by 3x over permanent status settings',
            'The "Focusing" status reduced context-switch interruptions more than any other option',
            'Teams using rich status reported 28% higher satisfaction with async collaboration',
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
        name: 'Missing Feedback Mechanisms',
        description:
          'Interfaces where users can view content but have no structured way to signal their reaction or understanding',
        howToSpot:
          'Look for read-only views, comment sections without reactions, or dashboards without feedback widgets',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Minimal Presence Indicators',
        description:
          'Simple online/offline dots with no context about what the person is doing or their availability',
        howToSpot:
          'Check for single-color status dots, binary presence states, or absence of status text',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Unstructured Communication Fields',
        description:
          'Free-text inputs for feedback, PR descriptions, or messages with no templates or scaffolding',
        howToSpot:
          'Look for empty textareas with generic placeholders like "Write something..." without guiding structure',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Missing Tone Signals',
        description:
          'Text messaging interfaces without emoji, reactions, formatting, or tone indicators',
        howToSpot:
          'Check for plain text-only messaging with no rich text, reactions, or sentiment options',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Absent Acknowledgment Signals',
        description:
          'Systems where messages or requests can be seen without any way to signal receipt or understanding',
        howToSpot:
          'Look for task assignments, announcements, or requests with no read receipts, reactions, or acknowledgment buttons',
        severity: ImpactLevel.MEDIUM,
      },
    ],

    patterns: [
      {
        name: 'Communication Gap Pattern',
        description: 'Interfaces that rely on users to voluntarily explain their intent, feelings, or context without prompting',
        indicators: ['Empty PR descriptions', 'Low survey response rates', 'Frequent "Did you see my message?" follow-ups', 'Misunderstood tone in text communications'],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Assumed Context Pattern',
        description: 'Systems where team members are expected to infer each other\'s state from minimal signals',
        indicators: ['Binary online/offline indicators', 'No meeting or calendar integration', 'No custom status options', 'Unclear availability expectations'],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Silent Agreement Pattern',
        description: 'Workflows where lack of response is ambiguously interpreted as agreement, disagreement, or simple non-engagement',
        indicators: ['No reaction or acknowledgment options', 'Approval flows without explicit "I reviewed this" signals', 'Meeting notes without action-item confirmation', 'Chat messages with no read receipts or reactions'],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Implicit Intent Pattern',
        description: 'Features that expect users to communicate intent through behavior rather than explicit declaration',
        indicators: ['No structured templates for pull requests or proposals', 'Task assignments without priority or context fields', 'Feature requests without structured impact descriptions', 'Bug reports without severity or emotional impact selectors'],
        severity: ImpactLevel.MEDIUM,
        confidence: 'medium',
      },
    ],

    checklistQuestions: [
      'Can users easily signal their emotional reaction without composing a full response?',
      'Are there structured prompts that help users share context they might assume is obvious?',
      'Do presence indicators convey meaningful context beyond online/offline?',
      'Can message senders signal intended tone or urgency?',
      'Are there acknowledgment mechanisms (reactions, read receipts) for important communications?',
      'Do feedback collection tools use structured formats rather than only free text?',
      'Can team members see each other\'s workload, focus status, or availability context?',
      'Are PR and code review templates structured to prompt intent explanation?',
      'Does the design normalize explicit communication rather than assuming shared understanding?',
      'Are there safeguards against silence being misinterpreted as agreement or dismissal?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in the Illusion of Transparency.

Analyze the provided design for patterns where users might overestimate how well others understand their internal states. Identify:

1. **Communication Gaps**: Places where users must share intent, emotion, or context but lack tools to do so easily
2. **Status Ambiguity**: Where user availability, mood, or workload is invisible to collaborators
3. **Assumed Understanding**: Where the design assumes users will infer each other's intent from minimal signals
4. **Missing Feedback Mechanisms**: Where reactions, acknowledgments, or sentiment signals are absent
5. **Tone Blindness**: Where text communication lacks tone indicators or could be easily misinterpreted

For each pattern found:
- Identify what internal state is assumed to be transparent
- Assess the consequences of the transparency gap (misunderstanding, conflict, dropped communication)
- Determine whether explicit communication tools could bridge the gap
- Evaluate whether proposed solutions respect user privacy and autonomy
- Suggest specific mechanisms (reactions, status indicators, structured templates, tone signals)

Consider:
- Are users likely to assume their intent is obvious when it isn't?
- Do collaborators have enough context to understand each other's state?
- Are there communication channels that lack structured expression tools?
- Would adding transparency features violate privacy or create pressure?
- Are silence and non-response ambiguous in this design?

Provide actionable recommendations for bridging transparency gaps ethically.`,

    outputSchema: {
      type: 'object',
      properties: {
        transparencyGaps: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              location: { type: 'string' },
              assumedTransparentState: { type: 'string' },
              actualVisibility: { type: 'string' },
              consequence: { type: 'string' },
              suggestedMechanism: { type: 'string' },
              privacyImplication: { type: 'string' },
              ethical: { type: 'boolean' },
            },
            required: [
              'location',
              'assumedTransparentState',
              'actualVisibility',
              'consequence',
              'ethical',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            communicationClarity: { type: 'number' },
            statusVisibility: { type: 'number' },
            feedbackRichness: { type: 'number' },
            privacyRespect: { type: 'number' },
          },
          required: [
            'communicationClarity',
            'statusVisibility',
            'feedbackRichness',
            'privacyRespect',
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
        'transparencyGaps',
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
        title: 'Identify Communication Gaps',
        description:
          'Audit your product for places where users assume their state, intent, or feelings are obvious to others',
        example:
          'Map every point where User A needs to understand User B\'s state: availability, reaction, intent, urgency',
        tips: [
          'Look for "Did you see my message?" patterns in support tickets or user interviews',
          'Identify where silence is ambiguous (agreement? disagreement? didn\'t see it?)',
          'Check code review, feedback, and collaboration flows for missing context',
        ],
      },
      {
        step: 2,
        title: 'Add Low-Friction Expression Mechanisms',
        description:
          'Provide easy ways for users to make their internal states explicit without heavy effort',
        example:
          'Add emoji reactions to messages so users can signal "I saw this and agree" with one click',
        tips: [
          'One-click reactions are far more adopted than typed responses',
          'Offer a curated set of reactions that cover common states (agree, question, celebrate, concerned)',
          'Make reactions visible but not intrusive to maintain social comfort',
        ],
      },
      {
        step: 3,
        title: 'Design Rich Status Indicators',
        description:
          'Replace binary online/offline with contextual presence that communicates availability and workload',
        example:
          'Allow custom status with emoji, text, and auto-expire: "Focusing until 3pm, prefer async messages"',
        tips: [
          'Integrate with calendar to auto-set meeting/focus statuses',
          'Offer preset statuses for common states (focusing, in a meeting, commuting, on PTO)',
          'Allow scheduled statuses that expire automatically',
        ],
      },
      {
        step: 4,
        title: 'Create Structured Templates',
        description:
          'Build templates that prompt users to share context they would otherwise assume is obvious',
        example:
          'PR template with sections: "What changed", "Why", "How to test", "Confidence level"',
        tips: [
          'Templates should feel helpful, not bureaucratic — keep them concise',
          'Pre-fill what you can from system data (branch name, linked issues)',
          'Include optional sections for context like confidence level or areas of concern',
        ],
      },
      {
        step: 5,
        title: 'Respect Privacy Boundaries',
        description:
          'Ensure all transparency features are opt-in and give users control over what they share',
        example:
          'Allow users to choose granularity: "Available" vs "In therapy appointment" — never require the latter',
        tips: [
          'All emotional or personal status features should be optional',
          'Provide generic options alongside detailed ones',
          'Never penalize users for not sharing detailed status',
          'Offer different visibility levels (team, company, public)',
        ],
      },
    ],

    dos: [
      'Provide one-click reactions and acknowledgment options for all communications',
      'Design rich presence indicators with context beyond online/offline',
      'Use structured templates to prompt sharing of intent and context',
      'Normalize explicit communication with encouraging microcopy',
      'Integrate calendar and system data to auto-set availability context',
      'Make tone indicators available for text-based messaging',
      'Provide read receipts or "seen by" indicators for important announcements',
      'Allow users to signal confidence level on work products (drafts, PRs, proposals)',
    ],

    donts: [
      'Don\'t assume users will voluntarily explain their intent without prompts',
      'Don\'t rely on binary online/offline as meaningful presence information',
      'Don\'t design feedback collection using only unstructured free text',
      'Don\'t force users to share emotional states they want to keep private',
      'Don\'t treat silence as agreement — design for explicit acknowledgment',
      'Don\'t expect code diffs, designs, or work products to be self-explanatory',
      'Don\'t create social pressure to constantly update emotional status',
      'Don\'t assume text tone is obvious to recipients just because it\'s clear to senders',
    ],

    bestPractices: [
      {
        title: 'Bridge the Transparency Gap with Structured Tools',
        description:
          'Provide explicit mechanisms for sharing states that users assume are already visible',
        rationale:
          'Users genuinely believe their feelings, intent, and context are more obvious than they are — tools must bridge this gap',
        example:
          'Emoji reactions, status indicators, PR templates, tone selectors, sentiment scales',
      },
      {
        title: 'Make Explicit Communication the Path of Least Resistance',
        description:
          'Design systems where sharing context is easier than not sharing it',
        rationale:
          'If explicit communication requires effort, users will default to the assumption that their state is already known',
        example:
          'Pre-populated status options, one-click reactions, auto-status from calendar integration',
      },
      {
        title: 'Disambiguate Silence',
        description:
          'Design systems that distinguish between "didn\'t see," "saw and agree," "saw and need time," and "disagree"',
        rationale:
          'Silence is the most dangerous manifestation of the Illusion of Transparency — both parties fill it with assumptions',
        example:
          'Read receipts with reaction options, "acknowledged" buttons, "will review by [date]" responses',
      },
      {
        title: 'Respect the Right to Opacity',
        description:
          'Allow users to be vague about their state when they choose — not all internal states should be shared',
        rationale:
          'Forced transparency can be as harmful as assumed transparency; users need autonomy over what they reveal',
        example:
          'Generic status options ("Away") alongside detailed ones ("Doctor appointment"), never requiring specificity',
      },
      {
        title: 'Test Comprehension, Not Just Delivery',
        description:
          'Verify that recipients actually understand what senders intended to communicate',
        rationale:
          'Senders will report high confidence that their message was clear even when recipients misunderstood',
        example:
          'Paired surveys: ask senders "How clear was your message?" and recipients "What was the intent?" — compare results',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships - Status indicators must convey meaning through more than color alone',
        implementation:
          'Use text labels, icons, and ARIA attributes alongside color-coded presence dots. Screen readers should announce "Sarah - Focusing, back at 3pm" not just "Sarah - green dot"',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.4.1',
        guideline:
          'Use of Color - Reaction and tone indicators must not rely solely on color',
        implementation:
          'Emoji reactions should include text labels. Tone indicators should use icons and text, not just color coding.',
      },
      {
        wcagLevel: 'AA',
        criterion: '4.1.2',
        guideline:
          'Name, Role, Value - Interactive reaction and status controls must have accessible names',
        implementation:
          'Reaction buttons need aria-labels ("React with thumbs up"), status selectors need clear labels, and status changes should be announced to screen readers.',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.4.6',
        guideline:
          'Headings and Labels - Structured templates must use clear, descriptive labels',
        implementation:
          'PR templates, feedback forms, and structured communication tools should use labeled fieldsets and clear headings for each section.',
      },
    ],

    ethics: [
      {
        concern: 'Forced Emotional Disclosure',
        severity: 'critical',
        explanation:
          'Requiring users to share their emotional state or mood as a condition of using the product',
        mitigation:
          'All emotional expression features must be strictly opt-in. Provide generic alternatives ("Away") alongside specific ones. Never gate functionality behind mood disclosure.',
      },
      {
        concern: 'Surveillance Culture',
        severity: 'high',
        explanation:
          'Rich presence and status indicators can create a culture of monitoring where employees feel constantly watched',
        mitigation:
          'Focus status tools on user empowerment ("I control what others see") rather than management monitoring. Never provide manager dashboards of individual emotional states.',
      },
      {
        concern: 'Emotional Labor Pressure',
        severity: 'high',
        explanation:
          'Mood indicators and sentiment tools can pressure users to perform positivity even when struggling',
        mitigation:
          'Normalize neutral and "need space" statuses. Never use team sentiment aggregations in performance reviews. Allow fully private modes.',
      },
      {
        concern: 'Weaponized Transparency',
        severity: 'medium',
        explanation:
          'Read receipts and "seen by" indicators can be used to pressure responses or create guilt',
        mitigation:
          'Allow users to disable read receipts. Provide "will respond later" quick-actions. Never show typing indicators for users who have opted out.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'The Illusion of Transparency: Biased Assessments of Others\' Ability to Read One\'s Emotional States',
        author: 'Gilovich, T., Savitsky, K., & Medvec, V. H.',
        year: 1998,
        doi: '10.1037/0022-3514.75.2.332',
        description:
          'The foundational paper establishing the Illusion of Transparency through multiple experiments on emotional state perception',
        type: 'foundational',
      },
      {
        title: 'The Spotlight Effect in Social Judgment: An Egocentric Bias in Estimates of the Salience of One\'s Own Actions and Appearance',
        author: 'Gilovich, T., Medvec, V. H., & Savitsky, K.',
        year: 2000,
        doi: '10.1037/0022-3514.78.2.211',
        description:
          'Extends the Illusion of Transparency to show people overestimate how much others notice their appearance and actions',
        type: 'foundational',
      },
      {
        title: 'The Illusion of Transparency and the Alleviation of Speech Anxiety',
        author: 'Savitsky, K., & Gilovich, T.',
        year: 2003,
        doi: '10.1016/S0022-1031(03)00056-8',
        description:
          'Demonstrates that informing people about the Illusion of Transparency reduces public speaking anxiety',
        type: 'practical',
      },
      {
        title: 'The Curse of Knowledge in Reasoning About False Beliefs',
        author: 'Birch, S. A., & Bloom, P.',
        year: 2007,
        doi: '10.1111/j.1467-9280.2007.01909.x',
        description:
          'Related research on the curse of knowledge — the difficulty of unknowing what you know when predicting others\' perceptions',
        type: 'advanced',
      },
    ],

    books: [
      {
        title: 'The Wisest One in the Room',
        author: 'Gilovich, Thomas & Ross, Lee',
        year: 2015,
        isbn: '9781451677546',
        description:
          'Co-authored by the discoverer of the Illusion of Transparency, covers how social psychological insights apply to everyday life',
        type: 'foundational',
      },
      {
        title: 'Thinking, Fast and Slow',
        author: 'Kahneman, Daniel',
        year: 2011,
        isbn: '9780374275631',
        description:
          'Covers the anchoring-and-adjustment framework that underlies the Illusion of Transparency mechanism',
        type: 'foundational',
      },
      {
        title: 'Crucial Conversations',
        author: 'Patterson, K., Grenny, J., McMillan, R., & Switzler, A.',
        year: 2011,
        isbn: '9780071771320',
        description:
          'Practical guide to explicit communication that directly addresses transparency illusions in high-stakes conversations',
        type: 'practical',
      },
    ],

    articles: [
      {
        title: 'The Illusion of Transparency in Negotiations',
        author: 'Van Boven, L., Gilovich, T., & Medvec, V. H.',
        url: 'https://doi.org/10.1023/A:1025697231071',
        description:
          'Explores how negotiators overestimate how transparent their strategies and preferences are to opponents',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'The Illusion of Transparency',
        author: 'Thomas Gilovich, Cornell University',
        url: 'https://www.youtube.com/watch?v=transparency-gilovich',
        description:
          'Lecture by the primary researcher on how and why we overestimate our emotional transparency',
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
      'spotlight-effect',       // We also overestimate how much others notice our appearance/actions
      'curse-of-knowledge',     // Once we know something, we assume others know it too
      'false-consensus-effect', // We overestimate how much others share our beliefs
      'empathy-gap',            // We misjudge others' emotional states
    ],

    conflicts: [
      'fundamental-attribution-error', // We attribute others' behavior to character, not context — opposite of assuming transparency
    ],

    confusedWith: [
      'spotlight-effect',       // Related but distinct: spotlight is about appearance, transparency is about internal states
      'curse-of-knowledge',     // Overlaps but curse of knowledge is about factual knowledge, not emotional states
      'false-consensus-effect', // Overlaps but false consensus is about beliefs, transparency is about emotional visibility
    ],

    hierarchy: {
      parent: 'egocentric-bias',
      children: [
        'emotional-transparency-illusion',
        'deception-transparency-illusion',
      ],
    },
  },
};
