/**
 * PLURALISTIC IGNORANCE
 *
 * We privately reject norms while assuming others accept them
 */


import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const pluralisticIgnorance: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'pluralistic-ignorance',
    name: 'Pluralistic Ignorance',
    aliases: [],
    category: BiasCategory.SOCIAL,
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
    simple: 'We privately reject norms while assuming others accept them',

    detailed: `Pluralistic ignorance is a social psychological phenomenon in which the majority of a group privately disagrees with a norm, belief, or behavior, yet each individual incorrectly assumes that most others accept it. Because everyone conforms publicly while dissenting privately, the perceived norm persists unchallenged.

This creates a self-reinforcing cycle: individuals look to others for cues about what is acceptable, see only public compliance, and conclude they are alone in their private dissent. The result is a "spiral of silence" where nobody speaks up because they believe they are the only one who disagrees.

In product design, pluralistic ignorance profoundly affects feedback systems, community engagement, and feature adoption. Users may silently struggle with a confusing workflow, assume they are the only ones having trouble, and never report it. They may dislike a feature but assume everyone else loves it. Designers must build systems that surface private opinions safely, making it clear that individual concerns are widely shared.`,

    psychologyBasis: {
      discoveredBy: 'Floyd Allport',
      year: 1924,
      theory: 'Social Norms and Conformity Research',
      mechanism: `Pluralistic ignorance arises from a gap between private beliefs and public behavior, sustained by faulty social inference. This happens because:

1. **Conformity Pressure**: Individuals publicly comply with perceived norms to avoid social rejection, even when they privately disagree
2. **Faulty Social Inference**: People interpret others' public compliance as genuine agreement, not recognizing that others are also conforming reluctantly
3. **Illusion of Unanimity**: Because dissent is invisible, the group appears unanimous, reinforcing the false norm
4. **Fear of Deviance**: The perceived cost of speaking up (embarrassment, ostracism) outweighs the perceived benefit, so silence continues
5. **Self-Censorship**: Individuals suppress their true opinions preemptively, never testing whether others actually agree with them

The mechanism is self-perpetuating: silence breeds more silence, because each person's quiet compliance becomes evidence for the next person that the norm is genuine.`,
    },

    realWorldExample: `In a classic study by Prentice and Miller (1993) at Princeton University, students privately reported being uncomfortable with the campus drinking culture but believed their peers were far more comfortable with it. In reality, the majority shared the same private discomfort. Because each student assumed they were alone in their unease, nobody spoke up, and the heavy-drinking norm persisted unchallenged. Once the study results were shared and students learned others felt the same way, attitudes shifted significantly.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `Pluralistic ignorance affects how users provide feedback, report problems, request features, and engage in communities. When users believe they are alone in their opinions, they stay silent. Designers can counter this by:

- Building anonymous feedback channels that reduce the social cost of speaking up
- Showing aggregated sentiment to reveal that private concerns are widely shared
- Using "others have asked this too" prompts to normalize dissent
- Creating safe spaces for honest opinion expression
- Surfacing hidden demand through anonymous voting and polling mechanisms`,

    whenToUse: [
      {
        title: 'Anonymous Feedback Systems',
        scenario:
          'When collecting honest user opinions about features, workflows, or policies',
        example:
          'Provide an anonymous suggestion box where users can submit feedback without fear of judgment, then surface aggregate themes publicly',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Feature Request Voting',
        scenario: 'When prioritizing product roadmap based on user demand',
        example:
          'Allow anonymous upvoting on feature requests and display total vote counts so users see they are not alone in wanting a change',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Community Forums and Discussions',
        scenario: 'When fostering authentic discussion in user communities',
        example:
          'Show "X people are wondering the same thing" badges on forum posts to validate concerns and encourage participation',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Product Feedback Channels',
        scenario: 'When gathering honest feedback on product direction or changes',
        example:
          'Run anonymous NPS or CSAT surveys and share aggregated results back to the community: "42% of users found this confusing too"',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Onboarding and Help Systems',
        scenario: 'When users encounter confusing or frustrating workflows',
        example:
          'Display contextual hints like "63% of new users asked about this step" to normalize confusion and encourage help-seeking',
        impact: ImpactLevel.MEDIUM,
      },
    ],

    whenToAvoid: [
      {
        title: 'Manufactured Consensus',
        reason:
          'Fabricating "others agree" signals to manipulate user behavior is deceptive',
        consequence:
          'Users lose trust when they discover the numbers are inflated or fake',
        alternative:
          'Only display genuine aggregate data; be transparent about sample sizes and methodology',
      },
      {
        title: 'Suppressing Legitimate Minority Views',
        reason:
          'Overemphasizing majority sentiment can silence valid minority perspectives',
        consequence:
          'Minority users feel dismissed, reducing diversity of feedback and missing edge cases',
        alternative:
          'Surface both majority and minority viewpoints; create dedicated channels for underrepresented perspectives',
      },
      {
        title: 'Privacy-Sensitive Contexts',
        reason:
          'Revealing that others share a sensitive opinion could inadvertently identify individuals',
        consequence:
          'Users feel exposed or unsafe, reducing willingness to provide future feedback',
        alternative:
          'Ensure strong anonymity guarantees and only show aggregate data with sufficient sample sizes',
      },
      {
        title: 'High-Stakes Decisions',
        reason:
          'Showing "others chose this too" for medical, financial, or legal decisions can lead to herd behavior',
        consequence:
          'Users follow the crowd rather than evaluating options for their individual situation',
        alternative:
          'Present objective information and encourage independent evaluation rather than social comparison',
      },
    ],

    commonMistakes: [
      {
        title: 'No Anonymous Channel',
        description:
          'Requiring users to attach their identity to all feedback, suppressing honest opinions',
        why: 'Users fear social judgment and self-censor, leaving systemic issues unreported',
        fix: 'Provide anonymous feedback mechanisms alongside identified channels; make anonymity the default for sensitive topics',
      },
      {
        title: 'Ignoring Silent Majorities',
        description:
          'Treating the absence of complaints as evidence of satisfaction',
        why: 'Pluralistic ignorance means most dissatisfied users stay quiet, assuming they are alone',
        fix: 'Proactively survey users with anonymous instruments; track behavioral signals (drop-off, workarounds) as proxies for silent dissent',
      },
      {
        title: 'Not Closing the Loop',
        description:
          'Collecting anonymous feedback but never sharing aggregated results back to users',
        why: 'Without seeing that others share their concerns, users remain trapped in pluralistic ignorance',
        fix: 'Publish aggregated feedback themes and action plans; show users that their private concerns are widely shared',
      },
      {
        title: 'Performative Transparency',
        description:
          'Showing feedback counts but not acting on them, creating cynicism',
        why: 'Users learn that voting and feedback have no real impact, reducing future participation',
        fix: 'Tie feedback directly to product decisions; visibly act on popular requests and communicate progress',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.MEDIUM,
        description:
          'Layout affects whether feedback mechanisms and social proof signals are visible and accessible',
        examples: [
          'Prominent placement of anonymous feedback buttons encourages participation',
          'Displaying "others asked too" badges near confusing UI elements normalizes help-seeking',
          'Burying feedback forms deep in menus reinforces silence',
          'Sidebar or inline feedback widgets reduce friction for honest expression',
        ],
      },
      typography: {
        level: ImpactLevel.LOW,
        description:
          'Text framing affects whether users feel safe expressing dissent',
        examples: [
          'Warm, inviting language on feedback prompts reduces perceived risk',
          'Displaying aggregate counts in clear, readable type makes shared sentiment visible',
          'Neutral, non-judgmental question phrasing encourages honest responses',
          'Small, de-emphasized feedback links signal that opinions are unwelcome',
        ],
      },
      color: {
        level: ImpactLevel.LOW,
        description:
          'Color can signal safety and approachability for feedback channels',
        examples: [
          'Calm, neutral tones on anonymous feedback forms reduce anxiety',
          'Green confirmation badges on "others agree" signals feel reassuring',
          'Aggressive red on dissent options discourages honest expression',
          'Warm highlight colors on aggregate sentiment make shared feelings visible',
        ],
      },
      interaction: {
        level: ImpactLevel.CRITICAL,
        description:
          'Interaction patterns determine whether users can safely express true opinions or are trapped in silent conformity',
        examples: [
          'Anonymous polls during meetings surface hidden disagreement',
          'One-click "me too" buttons lower the barrier to expressing shared frustration',
          'Private upvote mechanisms let users signal agreement without public exposure',
          'Real-time aggregate sentiment displays break the illusion of unanimity',
        ],
      },
      content: {
        level: ImpactLevel.HIGH,
        description:
          'Content framing determines whether users feel they are alone in their opinions or part of a silent majority',
        examples: [
          '"You\'re not alone: 68% of users found this step confusing" breaks pluralistic ignorance',
          '"Be the first to report this issue" language discourages participation',
          'Sharing anonymized feedback summaries validates individual concerns',
          'Showing response rates on surveys normalizes participation',
        ],
      },
      accessibility: {
        level: ImpactLevel.HIGH,
        description:
          'Accessible feedback mechanisms ensure all users can break out of pluralistic ignorance',
        examples: [
          'Screen reader accessible feedback widgets ensure all users can participate',
          'Keyboard-navigable voting mechanisms include users who cannot use a mouse',
          'Clear, plain-language prompts make feedback accessible to non-native speakers',
          'Multiple input modalities (text, voice, emoji) accommodate diverse user needs',
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
        title: 'Anonymous Suggestion Box with Aggregate Display',
        description:
          'Internal tool providing anonymous feedback submission with visible aggregate themes',
        code: `<div class="feedback-panel">
  <h3>Share Your Thoughts Anonymously</h3>
  <p class="reassurance">Your identity is never attached to submissions.</p>
  <textarea placeholder="What's on your mind?"></textarea>
  <button class="primary">Submit Anonymously</button>

  <div class="trending-themes">
    <h4>What others are saying</h4>
    <div class="theme">
      <span class="count">47 people</span>
      <p>"The new checkout flow is confusing"</p>
      <button class="me-too">+1 Me too</button>
    </div>
    <div class="theme">
      <span class="count">31 people</span>
      <p>"Would love dark mode support"</p>
      <button class="me-too">+1 Me too</button>
    </div>
  </div>
</div>`,
        explanation:
          'By making feedback anonymous and immediately showing aggregate themes, users see they are not alone. The "me too" button lowers the cost of expressing agreement, breaking the cycle of pluralistic ignorance.',
        principle:
          'Anonymous expression + visible agreement counts dissolve the illusion of unanimity',
        metrics: {
          before: '8% of users submitted feedback via identified channels',
          after: '34% of users submitted feedback via anonymous channel',
          improvement: '325% increase in feedback volume; surfaced 12 previously unknown pain points',
        },
      },
      {
        title: '"Others Have Asked Too" Contextual Prompt',
        description:
          'Help system showing that other users had the same question at the same step',
        code: `<div class="help-prompt">
  <div class="confusion-indicator">
    <span class="icon">?</span>
    <p><strong>63% of users paused here too.</strong></p>
    <p>This step asks for your API key. Here's where to find it:</p>
    <a href="/help/api-keys">Show me how</a>
  </div>
  <button class="feedback-btn">
    Still confused? Let us know (anonymous)
  </button>
</div>`,
        explanation:
          'Showing "63% of users paused here" normalizes confusion and encourages help-seeking. Users no longer assume they are uniquely struggling, which breaks pluralistic ignorance and reduces abandonment.',
        principle:
          'Normalizing shared difficulty encourages help-seeking and reduces silent abandonment',
      },
      {
        title: 'Private NPS Survey with Community Results',
        description:
          'NPS survey that shares anonymized aggregate results back to respondents',
        code: `<div class="nps-survey">
  <h3>How likely are you to recommend us?</h3>
  <div class="nps-scale">
    <button>0</button><button>1</button><button>2</button>
    <button>3</button><button>4</button><button>5</button>
    <button>6</button><button>7</button><button>8</button>
    <button>9</button><button>10</button>
  </div>
  <textarea placeholder="Tell us why (anonymous)"></textarea>
  <button class="submit">Submit</button>

  <div class="community-results">
    <h4>Last month's results (1,247 responses)</h4>
    <div class="distribution-bar">
      <span class="detractors" style="width: 28%">28%</span>
      <span class="passives" style="width: 35%">35%</span>
      <span class="promoters" style="width: 37%">37%</span>
    </div>
    <p class="insight">Top concern: "Reporting features need improvement" (raised by 41%)</p>
  </div>
</div>`,
        explanation:
          'Sharing aggregate NPS results and top concerns breaks pluralistic ignorance by showing users that their frustrations are shared. The 28% detractor rate validates individual dissatisfaction and signals that feedback leads to visibility.',
        principle:
          'Closing the feedback loop with aggregate data validates private dissent and encourages future participation',
      },
    ],

    bad: [
      {
        title: 'Public-Only Feedback with Identity Exposure',
        description:
          'Forum requiring full name and photo for every post, suppressing honest feedback',
        code: `<!-- DON'T DO THIS -->
<div class="feedback-forum">
  <h3>Share Your Feedback</h3>
  <div class="identity-required">
    <img src="user-photo.jpg" alt="Your profile photo">
    <span>Posting as <strong>John Smith, Engineering</strong></span>
  </div>
  <textarea placeholder="What do you think about the new policy?"></textarea>
  <p class="warning">Your manager and team will see this post.</p>
  <button>Post Publicly</button>
</div>`,
        explanation:
          'Forcing users to attach their identity and warning that managers will see the post guarantees self-censorship. Users with legitimate concerns will stay silent, assuming they are alone in their dissatisfaction.',
        principle:
          'Mandatory identity exposure maximizes pluralistic ignorance by raising the cost of dissent',
      },
      {
        title: 'Fake "Others Agree" Social Proof',
        description:
          'Fabricating agreement counts to manipulate user behavior',
        code: `<!-- DON'T DO THIS -->
<div class="upgrade-prompt">
  <h3>Upgrade to Pro!</h3>
  <p class="social-proof">
    <strong>94% of users</strong> say Pro is worth it!
  </p>
  <small style="display: none;">
    Based on 3 handpicked testimonials, not actual survey data
  </small>
  <button class="primary">Upgrade Now</button>
</div>`,
        explanation:
          'Fabricating consensus ("94% of users say...") exploits pluralistic ignorance in reverse: it manufactures a false norm to pressure users into conforming. When users discover the deception, trust collapses.',
        principle:
          'Never manufacture false consensus; it weaponizes pluralistic ignorance against users',
      },
      {
        title: 'Feedback Black Hole',
        description:
          'Collecting user feedback but never sharing results or acting on it',
        code: `<!-- DON'T DO THIS -->
<div class="feedback-form">
  <h3>We value your feedback!</h3>
  <textarea placeholder="Tell us what you think"></textarea>
  <button>Submit</button>
  <!-- No confirmation, no aggregate display, no follow-up -->
  <!-- Feedback goes into a database nobody reads -->
</div>`,
        explanation:
          'Without closing the loop, users never learn that others share their concerns. Each person submits feedback into a void, assumes nobody else complained, and gives up. Pluralistic ignorance persists because the system never reveals shared dissent.',
        principle:
          'Feedback without follow-up perpetuates the illusion that each user is alone in their concerns',
      },
    ],

    realWorld: [
      {
        company: 'Slido (Cisco)',
        product: 'Anonymous Meeting Polls',
        url: 'https://www.slido.com',
        description: 'Slido enables anonymous polling during meetings and presentations. Attendees can submit questions and vote without revealing their identity. This surfaces topics that nobody would raise publicly, breaking the "everyone seems fine with it" illusion common in group settings.',
        effectiveness: 'very-effective',
        analysis: 'By removing identity from participation, Slido consistently surfaces concerns that would never emerge in open discussion. Organizations report discovering widespread dissent on policies that appeared to have full consensus.',
      },
      {
        company: 'Stack Overflow',
        product: 'Question Upvoting',
        url: 'https://stackoverflow.com',
        description: 'Stack Overflow allows users to upvote questions, creating a visible signal that many people share the same confusion. A question with 500 upvotes tells each visitor "you are not the only one struggling with this."',
        effectiveness: 'very-effective',
        analysis: 'The upvote count directly breaks pluralistic ignorance by quantifying shared confusion. Users who thought they were uniquely stuck see hundreds of others with the same question, normalizing the difficulty and validating their experience.',
      },
      {
        company: 'Canny',
        product: 'Feature Request Boards',
        url: 'https://canny.io',
        description: 'Canny provides public feature request boards where users can submit and vote on requests. Vote counts make hidden demand visible. Users see that dozens or hundreds of others want the same feature, breaking the assumption that their need is unique.',
        effectiveness: 'effective',
        analysis: 'By aggregating private desires into visible vote counts, Canny dissolves pluralistic ignorance around feature demand. Product teams gain accurate signal about true priorities rather than relying on the loudest voices.',
      },
      {
        company: 'Glassdoor',
        product: 'Anonymous Company Reviews',
        url: 'https://www.glassdoor.com',
        description: 'Glassdoor enables anonymous workplace reviews, allowing employees to share honest opinions about company culture, management, and policies. Aggregate ratings reveal whether dissatisfaction is individual or systemic.',
        effectiveness: 'very-effective',
        analysis: 'Glassdoor systematically breaks workplace pluralistic ignorance. Employees who assumed "it\'s just me" discover through aggregate ratings and recurring themes that their concerns are widely shared, empowering collective voice.',
      },
    ],

    abTests: [
      {
        title: 'Anonymous vs Identified Feedback Collection',
        hypothesis:
          'Anonymous feedback channels will surface more honest and diverse user opinions',
        controlVersion: {
          description:
            'Standard feedback form requiring user name and email, with responses visible to support team with identity attached',
          metrics: {
            conversionRate: '6%',
            feedbackVolume: '42 submissions/month',
            issueDiscovery: '3 new issues identified',
          },
        },
        treatmentVersion: {
          description:
            'Anonymous feedback form with no identity required, aggregate themes displayed publicly, and "me too" button for agreement',
          metrics: {
            conversionRate: '23%',
            feedbackVolume: '187 submissions/month',
            issueDiscovery: '14 new issues identified',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Anonymous feedback increased submission rates by 283% and surfaced 4.7x more unique issues. Qualitative analysis showed anonymous submissions were significantly more critical and specific about pain points. Multiple high-impact issues had been silently affecting the majority of users.',
          learnings: [
            'Anonymous channels dramatically increase feedback volume and honesty',
            'Users self-censor heavily when identity is attached to criticism',
            'Showing aggregate themes ("47 others said this") encouraged further participation',
            'The "me too" button was used 3x more than writing new feedback, providing low-friction agreement signals',
          ],
        },
      },
      {
        title: '"Others Struggled Here Too" Contextual Help',
        hypothesis:
          'Showing that others had difficulty at the same step will reduce abandonment by normalizing confusion',
        controlVersion: {
          description:
            'Standard help tooltip: "Need help? Click here for documentation."',
          metrics: {
            conversionRate: '67%',
            helpClickRate: '8%',
            abandonmentRate: '22%',
          },
        },
        treatmentVersion: {
          description:
            'Contextual prompt: "63% of users paused at this step. Here\'s a quick guide." with inline help expansion',
          metrics: {
            conversionRate: '81%',
            helpClickRate: '34%',
            abandonmentRate: '11%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Normalizing confusion by showing "63% paused here" increased completion by 21% and cut abandonment in half. Users were 4x more likely to click help when they knew others needed it too. Post-study interviews revealed users felt "relieved" to know they were not uniquely confused.',
          learnings: [
            'Breaking pluralistic ignorance about shared difficulty reduces abandonment',
            'Users are far more willing to seek help when they know others needed it',
            'Specific percentages ("63%") are more effective than vague language ("many users")',
            'Contextual placement at the moment of confusion is critical for timing',
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
        name: 'Feedback Channel Visibility',
        description:
          'Whether anonymous or low-friction feedback mechanisms are prominently accessible',
        howToSpot: 'Look for feedback buttons, suggestion boxes, or anonymous polling options in the interface. Check if they require identity.',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Aggregate Sentiment Display',
        description:
          'Whether shared opinions and common concerns are made visible to users',
        howToSpot: 'Look for vote counts, "X people asked this", percentage displays, or trending topics that reveal collective opinion.',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Identity Requirements',
        description:
          'Whether feedback and voting mechanisms require or expose user identity',
        howToSpot: 'Check if feedback forms require names, emails, or profile photos. Check if votes, reviews, or comments are publicly attributed.',
        severity: ImpactLevel.CRITICAL,
      },
      {
        name: 'Social Pressure Indicators',
        description:
          'Elements that increase social cost of expressing dissenting opinions',
        howToSpot: 'Look for manager visibility warnings, public attribution, lack of anonymity options, or social proof that discourages disagreement.',
        severity: ImpactLevel.HIGH,
      },
    ],

    patterns: [
      {
        name: 'Silent Majority Pattern',
        description: 'Feedback systems that collect input but never reveal aggregate results, keeping users unaware that their concerns are shared',
        indicators: ['Feedback forms with no aggregate display', 'No "me too" or upvote mechanisms', 'No follow-up communication about trends', 'One-way feedback channels'],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Identity Barrier Pattern',
        description: 'Feedback mechanisms that require or expose identity, suppressing honest expression',
        indicators: ['Required name/email on feedback forms', 'Public attribution of comments or votes', 'Manager/admin visibility warnings', 'No anonymous option available'],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Consensus Fabrication Pattern',
        description: 'False or misleading aggregate signals designed to manufacture perceived agreement',
        indicators: ['Inflated agreement percentages', 'Cherry-picked testimonials presented as consensus', 'Hidden methodology for satisfaction claims', 'Suppressed negative feedback in displays'],
        severity: ImpactLevel.CRITICAL,
        confidence: 'medium',
      },
      {
        name: 'Loop-Closing Pattern (Positive)',
        description: 'Systems that collect feedback and share aggregated results back, breaking pluralistic ignorance',
        indicators: ['Public roadmap with vote counts', '"X users requested this" labels', 'Aggregate NPS or satisfaction displays', 'Trending concerns or common questions sections'],
        severity: ImpactLevel.MEDIUM,
        confidence: 'high',
      },
    ],

    checklistQuestions: [
      'Can users provide feedback anonymously, or is identity always required?',
      'Are aggregate sentiment and common concerns visible to users?',
      'Do users know how many others share their frustrations or requests?',
      'Is there a "me too" or upvote mechanism for existing feedback?',
      'Are feedback results shared back with the community?',
      'Could users be self-censoring due to identity exposure or social pressure?',
      'Are there signals that normalize shared difficulty (e.g., "63% paused here")?',
      'Is the system potentially fabricating or inflating consensus signals?',
      'Are minority viewpoints given a safe channel for expression?',
      'Does the feedback system close the loop by showing action taken on concerns?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in pluralistic ignorance.

Analyze the provided design for pluralistic ignorance patterns. Identify:

1. **Feedback Channels**: Whether anonymous or low-friction mechanisms exist for honest expression
2. **Aggregate Visibility**: Whether shared opinions and common concerns are surfaced to users
3. **Identity Barriers**: Whether identity requirements suppress honest feedback
4. **Social Pressure**: Whether design elements increase the cost of dissent
5. **Loop Closing**: Whether feedback results are shared back with the community

For each pattern found:
- Identify whether users might be self-censoring due to pluralistic ignorance
- Assess whether the design surfaces or suppresses shared concerns
- Determine if any consensus signals are genuine or fabricated
- Evaluate whether anonymous channels are available and accessible
- Suggest improvements for breaking the cycle of silence

Consider:
- Are users likely assuming they are alone in their frustrations?
- Does the design make shared difficulty or dissent visible?
- Are feedback mechanisms low-friction enough for casual participation?
- Could identity requirements be suppressing honest expression?
- Is the system closing the loop by showing that individual concerns are widely shared?

Provide actionable recommendations for breaking pluralistic ignorance ethically.`,

    outputSchema: {
      type: 'object',
      properties: {
        ignorancePatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              silenceRisk: { type: 'string' },
              identityExposure: { type: 'string' },
              aggregateVisibility: { type: 'string' },
              ethical: { type: 'boolean' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'silenceRisk',
              'aggregateVisibility',
              'ethical',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            anonymityScore: { type: 'number' },
            aggregateVisibilityScore: { type: 'number' },
            loopClosingScore: { type: 'number' },
            ethicalScore: { type: 'number' },
          },
          required: [
            'anonymityScore',
            'aggregateVisibilityScore',
            'loopClosingScore',
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
        'ignorancePatterns',
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
        title: 'Identify Where Silence May Hide Dissent',
        description:
          'Audit your product for areas where users might be silently struggling, dissatisfied, or confused without reporting it',
        example:
          'Analyze drop-off points, low help-seeking rates, and features with high usage but no feedback',
        tips: [
          'High drop-off with no reported issues is a strong signal of pluralistic ignorance',
          'Low NPS with few written comments suggests users are self-censoring',
          'Compare behavioral signals (workarounds, drop-offs) to explicit feedback volume',
        ],
      },
      {
        step: 2,
        title: 'Create Anonymous Feedback Channels',
        description:
          'Build mechanisms that let users express honest opinions without identity exposure',
        example:
          'Add an anonymous suggestion box with a simple text field and no login requirement',
        tips: [
          'Make anonymity the default, not an opt-in',
          'Clearly communicate that feedback is anonymous and cannot be traced',
          'Provide multiple modalities: text, emoji reactions, rating scales',
        ],
      },
      {
        step: 3,
        title: 'Surface Aggregate Sentiment',
        description:
          'Display aggregated feedback themes and vote counts so users can see their concerns are shared',
        example:
          'Show "47 people have raised this concern" next to common feedback themes',
        tips: [
          'Use specific numbers rather than vague language',
          'Update aggregates in near real-time to feel current',
          'Include both positive and negative themes for balance',
        ],
      },
      {
        step: 4,
        title: 'Add Low-Friction Agreement Signals',
        description:
          'Provide "me too" buttons, upvotes, or reactions that let users express agreement with minimal effort',
        example:
          'One-click "I have this problem too" button on support articles and feedback items',
        tips: [
          'Keep agreement actions to a single click',
          'Show the aggregate count immediately after the action',
          'Allow anonymous agreement even on identified submissions',
        ],
      },
      {
        step: 5,
        title: 'Close the Feedback Loop',
        description:
          'Share aggregated results back to the community and show how feedback drives product decisions',
        example:
          'Monthly "You spoke, we listened" digest showing top concerns and planned actions',
        tips: [
          'Connect feedback themes directly to roadmap items',
          'Notify users when their concern receives widespread agreement',
          'Show progress on addressing top issues',
        ],
      },
    ],

    dos: [
      'Provide anonymous feedback channels as the default for sensitive topics',
      'Display aggregate sentiment so users know they are not alone',
      'Use "others asked this too" prompts to normalize confusion and dissent',
      'Close the feedback loop by sharing results and actions taken',
      'Add low-friction "me too" buttons for expressing agreement',
      'Track behavioral signals as proxies for silent dissent',
      'Communicate anonymity guarantees clearly and credibly',
      'Surface both majority and minority viewpoints fairly',
    ],

    donts: [
      'Don\'t require identity for all feedback, especially criticism',
      'Don\'t treat silence as satisfaction; probe for hidden dissent',
      'Don\'t fabricate or inflate consensus signals to manipulate users',
      'Don\'t collect feedback without ever sharing aggregate results',
      'Don\'t make dissent socially costly by exposing critics publicly',
      'Don\'t suppress negative feedback in aggregate displays',
      'Don\'t ignore behavioral signals that contradict explicit feedback',
      'Don\'t use aggregate data to shame or pressure users into conformity',
    ],

    bestPractices: [
      {
        title: 'Anonymity by Default',
        description:
          'Make anonymous submission the default mode for feedback, with optional identity attachment',
        rationale:
          'Users who want to identify themselves can opt in, but the default protects honest expression',
        example:
          'Feedback form with "Submit anonymously" as the primary CTA, and a smaller "Attach my name" checkbox',
      },
      {
        title: 'Normalize Shared Difficulty',
        description:
          'Proactively show users that their confusion or frustration is common, especially at known pain points',
        rationale:
          'Breaking the illusion that "everyone else gets it" reduces abandonment and encourages help-seeking',
        example:
          '"63% of users paused at this step. Here\'s a quick walkthrough."',
      },
      {
        title: 'Aggregate Before Asking',
        description:
          'Show existing feedback themes before asking for new input, so users see the conversation',
        rationale:
          'Users are more willing to contribute when they see others have already spoken up',
        example:
          'Display trending concerns with vote counts above the new feedback submission form',
      },
      {
        title: 'Act Visibly on Feedback',
        description:
          'Publicly connect product changes to user feedback themes',
        rationale:
          'Demonstrating that feedback leads to action incentivizes future participation',
        example:
          '"Based on feedback from 234 users, we\'ve redesigned the checkout flow"',
      },
      {
        title: 'Multi-Channel Feedback',
        description:
          'Offer multiple feedback channels with different identity levels: anonymous, pseudonymous, and identified',
        rationale:
          'Different users have different comfort levels; providing options maximizes honest participation',
        example:
          'Anonymous suggestion box + pseudonymous forum + identified support ticket, all feeding into the same aggregate view',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships - Ensure feedback mechanisms and aggregate displays have proper semantic structure',
        implementation:
          'Use proper form labels, ARIA roles for vote buttons, and semantic HTML for aggregate data displays so screen reader users can fully participate in feedback',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.1.1',
        guideline:
          'Keyboard - Ensure all feedback and voting interactions are keyboard accessible',
        implementation:
          'Make "me too" buttons, upvotes, feedback forms, and aggregate displays fully navigable and operable via keyboard',
      },
      {
        wcagLevel: 'AA',
        criterion: '3.3.2',
        guideline:
          'Labels or Instructions - Clearly communicate anonymity guarantees and feedback purpose',
        implementation:
          'Provide clear, visible text explaining that feedback is anonymous, how data is used, and what aggregate means. Use aria-describedby for additional context.',
      },
    ],

    ethics: [
      {
        concern: 'Manufactured Consensus',
        severity: 'critical',
        explanation:
          'Fabricating or inflating "others agree" signals to create false social pressure',
        mitigation:
          'Only display genuine aggregate data from real user inputs. Be transparent about sample sizes and methodology. Never inflate numbers.',
      },
      {
        concern: 'Weaponized Transparency',
        severity: 'high',
        explanation:
          'Using aggregate data to shame individuals or pressure specific users into conformity',
        mitigation:
          'Present aggregate data as informational, not prescriptive. Never target individuals with "everyone else does X" messaging. Respect autonomy.',
      },
      {
        concern: 'False Anonymity',
        severity: 'critical',
        explanation:
          'Claiming feedback is anonymous while secretly tracking identity or making it traceable',
        mitigation:
          'Implement genuine anonymity: no IP logging, no session correlation, no behavioral fingerprinting. Have anonymity audited independently.',
      },
      {
        concern: 'Minority Suppression',
        severity: 'high',
        explanation:
          'Overemphasizing majority opinion in a way that dismisses or silences valid minority perspectives',
        mitigation:
          'Surface minority viewpoints alongside majority themes. Create dedicated safe channels for underrepresented voices. Weight feedback by representativeness, not just volume.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'Pluralistic Ignorance and Alcohol Use on Campus: Some Consequences of Misperceiving the Social Norm',
        author: 'Prentice, D. A., & Miller, D. T.',
        year: 1993,
        doi: '10.1037/0022-3514.64.2.243',
        description:
          'Landmark study demonstrating pluralistic ignorance among Princeton students regarding campus drinking norms',
        type: 'foundational',
      },
      {
        title: 'Social Psychology',
        author: 'Allport, F. H.',
        year: 1924,
        description:
          'Early foundational work identifying the phenomenon of individuals conforming to perceived group norms despite private disagreement',
        type: 'foundational',
      },
      {
        title: 'Pluralistic Ignorance and the Perpetuation of Social Norms by Unwitting Actors',
        author: 'Miller, D. T., & McFarland, C.',
        year: 1987,
        doi: '10.1037/0022-3514.53.2.298',
        description:
          'Key study on how pluralistic ignorance perpetuates norms that nobody privately supports',
        type: 'advanced',
      },
      {
        title: 'The Spiral of Silence: A Theory of Public Opinion',
        author: 'Noelle-Neumann, E.',
        year: 1974,
        description:
          'Related theory explaining how fear of isolation leads individuals to suppress opinions they perceive as minority views',
        type: 'foundational',
      },
    ],

    books: [
      {
        title: 'Influence: The Psychology of Persuasion',
        author: 'Cialdini, Robert',
        year: 2006,
        isbn: '9780061241895',
        description:
          'Covers social proof and conformity dynamics closely related to pluralistic ignorance',
        type: 'practical',
      },
      {
        title: 'The Righteous Mind',
        author: 'Haidt, Jonathan',
        year: 2012,
        isbn: '9780307455772',
        description:
          'Explores how moral psychology and group dynamics create conformity pressures that enable pluralistic ignorance',
        type: 'foundational',
      },
    ],

    articles: [
      {
        title: 'Pluralistic Ignorance in Product Feedback',
        author: 'Teresa Torres',
        url: 'https://www.producttalk.org/',
        description:
          'Practical guide to recognizing and addressing pluralistic ignorance in product discovery and user research',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'Pluralistic Ignorance: Why We Stay Silent',
        author: 'Sprouts',
        url: 'https://www.youtube.com/watch?v=Qo-lIlOlmRg',
        description:
          'Animated explanation of pluralistic ignorance with everyday examples',
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
