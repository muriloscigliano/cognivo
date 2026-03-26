/**
 * SELF-REFERENCE EFFECT
 *
 * We remember information better when it relates to ourselves
 */


import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const selfReferenceEffect: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'self-reference-effect',
    name: 'Self-Reference Effect',
    aliases: [],
    category: BiasCategory.MEMORY,
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
    simple: 'We remember information better when it relates to ourselves',

    detailed: `The self-reference effect is a memory phenomenon where information encoded in relation to the self is remembered better than information encoded in other ways. When people process information by relating it to their own experiences, identity, or personal attributes, deeper encoding occurs, leading to significantly improved recall.

This effect arises because self-referential processing activates a rich, well-organized knowledge structure (the self-schema) that provides numerous associations and elaborations for incoming information. The self acts as a powerful mnemonic device.

In UX design, the self-reference effect is a cornerstone of personalization strategy. Interfaces that use the user's name, reflect their history, tailor content to their preferences, and address them directly with "you" language create deeper engagement and stronger memory traces. Users remember personalized experiences far better than generic ones, leading to higher retention, satisfaction, and conversion.`,

    psychologyBasis: {
      discoveredBy: 'Various Researchers',
      year: 1970,
      theory: 'Cognitive Bias Research',
      mechanism: `Information related to oneself is processed more efficiently and remembered better than other information. This happens because:

1. **Self-Schema Activation**: The self is the most elaborately encoded concept in memory, providing a dense network of associations for linking new information
2. **Deeper Encoding**: Relating information to personal experience triggers elaborative processing, creating richer memory traces
3. **Organizational Advantage**: The self-schema provides a well-structured framework that organizes incoming information more effectively than other encoding strategies
4. **Emotional Enhancement**: Self-relevant information often triggers emotional responses, which strengthen memory consolidation
5. **Attentional Priority**: The brain automatically allocates more attention to self-relevant stimuli, leading to better initial encoding`,
    },

    realWorldExample: `In Rogers, Kuiper, and Kirker's 1977 landmark experiment, participants were shown adjectives and asked to process them in four ways: structural (uppercase?), phonemic (rhymes with?), semantic (means same as?), or self-referential (describes you?). Self-referential processing produced significantly higher recall than all other conditions, including deep semantic processing. This demonstrated that the self is a uniquely powerful memory structure.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `The self-reference effect profoundly impacts how users engage with and remember interfaces. Personalized experiences that connect to users' identity, history, and preferences create deeper cognitive engagement. Designers can leverage this to:

- Increase content recall by using "you" and "your" language in copy
- Boost engagement through personalized recommendations and dashboards
- Improve onboarding retention by connecting features to users' specific goals
- Strengthen brand loyalty by reflecting users' identity and preferences back to them
- Drive action through user-centric notifications that reference personal data`,

    whenToUse: [
      {
        title: 'Personalized Onboarding',
        scenario:
          'When introducing new users to your product and helping them form habits',
        example:
          'Use the user\'s name and ask about their goals: "Welcome, Sarah! What would you like to accomplish this week?"',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Content Recommendations',
        scenario: 'When surfacing content, products, or features users might enjoy',
        example:
          '"Because you listened to Jazz Classics" or "Based on your recent searches" creates self-relevant framing',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Progress and Activity Summaries',
        scenario: 'When showing users their history, achievements, or usage patterns',
        example:
          '"Your weekly summary: You completed 12 tasks and saved 3 hours" makes data personally meaningful',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Personalized Notifications',
        scenario: 'When re-engaging users or alerting them to relevant updates',
        example:
          '"Your saved item is back in stock" or "3 people commented on your post" ties notifications to user identity',
        impact: ImpactLevel.MEDIUM,
      },
      {
        title: 'User-Centric Copy',
        scenario: 'When writing interface text, headings, or marketing copy',
        example:
          'Use "Your dashboard" instead of "Dashboard", "Your files" instead of "Files" to activate self-reference encoding',
        impact: ImpactLevel.MEDIUM,
      },
      {
        title: 'Personalized Dashboards',
        scenario: 'When presenting data, metrics, or analytics to users',
        example:
          'Show "Your performance this month" with user-specific metrics rather than generic team averages',
        impact: ImpactLevel.HIGH,
      },
    ],

    whenToAvoid: [
      {
        title: 'Privacy-Sensitive Contexts',
        reason:
          'Displaying personal information can feel invasive when users haven\'t opted in or expect privacy',
        consequence:
          'Users feel surveilled, lose trust, and may abandon the product entirely',
        alternative:
          'Let users control personalization settings and clearly explain what data is used',
      },
      {
        title: 'Sensitive or Embarrassing Data',
        reason:
          'Personalizing around health conditions, financial difficulties, or personal struggles can feel exploitative',
        consequence:
          'Users feel exposed and manipulated, damaging the relationship permanently',
        alternative:
          'Use personalization only with non-sensitive data; let users control what is reflected back',
      },
      {
        title: 'Insufficient Data Quality',
        reason:
          'Wrong personalization (wrong name, incorrect recommendations) is worse than no personalization',
        consequence:
          'Users feel unknown or misunderstood, undermining the intended effect',
        alternative:
          'Fall back to generic language when data confidence is low; allow users to correct errors',
      },
      {
        title: 'Shared or Public Devices',
        reason:
          'Personalized content on shared devices can expose private information to others',
        consequence:
          'Privacy violations, embarrassment, or security risks for users',
        alternative:
          'Detect shared contexts and reduce personalization, or require re-authentication',
      },
    ],

    commonMistakes: [
      {
        title: 'Shallow Personalization',
        description:
          'Using only the user\'s name without deeper relevance ("Hi Sarah, check out our generic sale!")',
        why: 'Name-only personalization without relevant content feels hollow and can seem like a template',
        fix: 'Combine name usage with genuinely relevant content based on user behavior and preferences',
      },
      {
        title: 'Over-Personalization',
        description:
          'Reflecting so much personal data that users feel surveilled or creeped out',
        why: 'Users have a threshold for how much personal knowledge they expect a product to display',
        fix: 'Be transparent about data usage, give users control, and personalize at a comfortable level',
      },
      {
        title: 'Stale Personalization',
        description:
          'Recommending based on outdated preferences or one-time behaviors',
        why: 'People change, and outdated self-references feel irrelevant or annoying',
        fix: 'Weight recent behavior more heavily, let users update preferences, and provide feedback loops',
      },
      {
        title: 'Generic "You" Without Substance',
        description:
          'Overusing "you" and "your" in copy without actual personalization behind it',
        why: 'Empty self-referential language without personalized content feels like a marketing trick',
        fix: 'Pair "you" language with genuinely personalized data, recommendations, or insights',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.HIGH,
        description:
          'Layout determines where personalized content appears and how prominently user-specific data is displayed',
        examples: [
          'User avatar and name in the header creates persistent self-reference',
          'Personalized dashboard widgets tailored to user preferences',
          'Recently viewed items placed prominently for immediate self-recognition',
          '"Your" sections visually separated from generic content',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Typography can emphasize personalized content and self-referential language',
        examples: [
          'User name displayed in bold or distinct weight for self-recognition',
          'Personalized headlines ("Your Week in Review") stand out typographically',
          'Distinct styling for user-generated content vs system content',
          '"You" pronouns in clear, readable text strengthen self-reference encoding',
        ],
      },
      color: {
        level: ImpactLevel.MEDIUM,
        description:
          'Color can distinguish personalized content and reinforce user identity',
        examples: [
          'User-chosen theme colors create personal ownership of the interface',
          'Personalized sections highlighted with a distinct background color',
          'User avatar colors or custom brand colors reinforce identity',
          'Color-coded achievements reflecting personal progress',
        ],
      },
      interaction: {
        level: ImpactLevel.CRITICAL,
        description:
          'Interactions that respond to user identity and history create the strongest self-reference effects',
        examples: [
          'Autocomplete suggestions based on user\'s past inputs',
          'Personalized shortcuts based on most-used features',
          'Greeting animations that use the user\'s name or avatar',
          'Contextual actions based on user role, preferences, or history',
        ],
      },
      content: {
        level: ImpactLevel.CRITICAL,
        description:
          'Content that directly addresses the user or reflects their data back to them is the primary vehicle for self-reference effect',
        examples: [
          '"You" and "your" language throughout copy activates self-schema',
          'Personalized email subject lines ("Sarah, your report is ready") boost open rates',
          'User-specific statistics and insights create meaningful self-reference',
          'Recommendations framed as personal ("picked for you") vs generic ("popular items")',
        ],
      },
      accessibility: {
        level: ImpactLevel.HIGH,
        description:
          'Personalization must be accessible to all users regardless of ability',
        examples: [
          'Screen reader announcements include user name and personalized context',
          'Personalized content has proper ARIA labels reflecting user-specific data',
          'Keyboard navigation preserves access to personalized sections',
          'Alt text for personalized images references user-specific content',
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
        title: 'Personalized Email Subject Lines',
        description:
          'Email campaigns using recipient name and personal data for higher engagement',
        code: `<div class="email-preview">
  <div class="subject-line">
    <strong>Sarah, your weekly summary is ready</strong>
  </div>
  <div class="preview-text">
    <p>You completed <strong>12 tasks</strong> this week —
    that's 3 more than last week! Here's what stood out:</p>
    <ul>
      <li>Your top project: <strong>Brand Redesign</strong> (6 tasks)</li>
      <li>You saved an estimated <strong>2.5 hours</strong> with templates</li>
      <li>Your streak: <strong>4 weeks</strong> of hitting your goals</li>
    </ul>
    <p>Keep it up, Sarah!</p>
  </div>
</div>`,
        explanation:
          'The subject line uses the name for immediate self-reference. The body reflects personal data (task count, specific projects, time saved, streak) back to the user, activating the self-schema at every line.',
        principle:
          'Personal data reflected back to the user creates deep encoding and emotional engagement',
        metrics: {
          before: '18% open rate with generic subject "Weekly Summary Available"',
          after: '34% open rate with personalized "Sarah, your weekly summary is ready"',
          improvement: '89% increase in email open rate through self-reference',
        },
      },
      {
        title: 'Personalized Dashboard',
        description:
          'Analytics dashboard showing user-specific data with self-referential framing',
        code: `<div class="dashboard">
  <header class="greeting">
    <img src="avatar.jpg" alt="Sarah's avatar" class="user-avatar">
    <h1>Good morning, Sarah</h1>
    <p class="subtitle">Here's your Monday overview</p>
  </header>

  <section class="your-metrics">
    <h2>Your Performance This Month</h2>
    <div class="metric-grid">
      <div class="metric-card">
        <span class="label">Your Revenue</span>
        <span class="value">$12,450</span>
        <span class="trend positive">+18% vs your last month</span>
      </div>
      <div class="metric-card">
        <span class="label">Your Clients</span>
        <span class="value">23 active</span>
        <span class="trend positive">4 new this month</span>
      </div>
    </div>
  </section>

  <section class="recommendations">
    <h2>Picked for You</h2>
    <p>Based on your recent activity, you might want to:</p>
    <ul>
      <li>Follow up with <strong>Acme Corp</strong> (your proposal was viewed yesterday)</li>
      <li>Review <strong>Q4 Report</strong> (you started editing last Thursday)</li>
    </ul>
  </section>
</div>`,
        explanation:
          'Every element references the user directly: their avatar, name, personal metrics compared to their own history, and recommendations based on their specific activity. This saturates the interface with self-reference.',
        principle:
          'User-centric framing throughout an interface activates the self-schema continuously, improving recall and engagement',
      },
      {
        title: 'User Name in Product Experience',
        description:
          'Consumer product incorporating user name and identity into the core experience',
        code: `<div class="music-player">
  <section class="playlist-header">
    <div class="playlist-art generated">
      <span class="user-initial">S</span>
    </div>
    <div class="playlist-info">
      <span class="playlist-label">Made for Sarah</span>
      <h2>Your Discover Weekly</h2>
      <p>Fresh picks based on your listening history.
      Updated every Monday.</p>
      <p class="detail">We noticed you've been into jazz fusion
      and lo-fi beats lately.</p>
    </div>
  </section>

  <div class="track-list">
    <div class="track">
      <span class="track-reason">Because you listened to Miles Davis</span>
      <span class="track-name">Snarky Puppy — Lingus</span>
    </div>
    <div class="track">
      <span class="track-reason">Similar to your Chill Evening playlist</span>
      <span class="track-name">Nujabes — Feather</span>
    </div>
  </div>
</div>`,
        explanation:
          'The playlist is framed as personally curated: "Made for Sarah", "Your Discover Weekly", "based on your listening history". Each track recommendation references the user\'s own behavior, creating continuous self-reference throughout the experience.',
        principle:
          'Framing algorithmic recommendations as personal curation activates self-reference and increases perceived value',
      },
    ],

    bad: [
      {
        title: 'Creepy Over-Personalization',
        description:
          'Displaying too much personal data that feels invasive',
        code: `<!-- DON'T DO THIS -->
<div class="notification">
  <h3>Hi Sarah! We noticed you searched for
  "anxiety medication" at 2:47 AM last night</h3>
  <p>Based on your location in Portland, OR, here are
  therapists near your home at 742 Evergreen Terrace:</p>
  <p>Also, your insurance provider Aetna covers these options!</p>
  <button>Book Now</button>
</div>`,
        explanation:
          'While technically self-referential, this reveals sensitive health data, exact location, late-night browsing times, and insurance details. Users feel surveilled, not served. Self-reference becomes a trust violation.',
        principle:
          'Self-reference must respect privacy boundaries; revealing too much personal data destroys trust',
      },
      {
        title: 'Hollow Name-Only Personalization',
        description:
          'Using the user\'s name without any actual personalized content',
        code: `<!-- DON'T DO THIS -->
<div class="marketing-email">
  <h2>Sarah, check out our amazing deals!</h2>
  <p>Sarah, we have the best prices on everything!</p>
  <p>Don't miss out, Sarah!</p>
  <p>Sarah, act now before it's too late!</p>
  <div class="products">
    <!-- Exact same generic products shown to every user -->
    <div class="product">Generic Product A - $29.99</div>
    <div class="product">Generic Product B - $49.99</div>
    <div class="product">Generic Product C - $19.99</div>
  </div>
</div>`,
        explanation:
          'Repeating the user\'s name excessively with zero actual personalization feels robotic and manipulative. The content is identical for every user; only the name changes. This creates a negative self-reference association.',
        principle:
          'Name repetition without relevant personalization feels like a cheap mail-merge trick',
      },
      {
        title: 'Wrong Personalization',
        description:
          'Incorrect personal data that breaks the self-reference effect',
        code: `<!-- DON'T DO THIS -->
<div class="dashboard">
  <h2>Welcome back, Srah!</h2>
  <p>Based on your interest in knitting:</p>
  <!-- User has never shown interest in knitting -->
  <div class="recommendations">
    <p>Top knitting patterns for you</p>
    <p>Yarn sales in your area</p>
  </div>
  <p>Your recent order: Blue Widget</p>
  <!-- This was someone else's order -->
</div>`,
        explanation:
          'Misspelled name, wrong interest attribution, and incorrect order data actively harm the experience. Wrong self-reference is worse than no self-reference because it signals the system doesn\'t actually know the user.',
        principle:
          'Inaccurate personalization undermines trust more than generic content',
      },
    ],

    realWorld: [
      {
        company: 'Spotify',
        product: 'Discover Weekly / Wrapped',
        description: 'Spotify\'s "Your Discover Weekly" playlist and annual "Wrapped" summary are masterclasses in self-reference. Every recommendation is framed as personally curated ("Made for You"), and Wrapped reflects a full year of listening back as an identity-affirming narrative that users eagerly share.',
        effectiveness: 'very-effective',
        analysis: 'Spotify leverages self-reference at every level: playlist names ("Your Daily Mix"), recommendation explanations ("Because you listened to..."), and the viral Wrapped campaign that turns personal data into shareable identity content. Users form deeper attachment because the product feels like it truly knows them.',
      },
      {
        company: 'Netflix',
        product: 'Because You Watched',
        description: 'Netflix frames every recommendation as personally motivated: "Because you watched Breaking Bad", "Top picks for Sarah", "Continue watching for Sarah". The entire browse experience is organized around the user\'s viewing identity.',
        effectiveness: 'very-effective',
        analysis: 'By attributing recommendations to the user\'s own behavior rather than algorithmic popularity, Netflix makes each suggestion feel personally relevant. This self-referential framing increases click-through on recommendations and reduces the paradox-of-choice friction.',
      },
      {
        company: 'Coca-Cola',
        product: 'Share a Coke Campaign',
        description: 'Coca-Cola replaced its iconic logo with common first names on bottles. Consumers searched for their own name, bought bottles as personal items, and shared photos on social media. A mass-produced product became a personal artifact.',
        effectiveness: 'very-effective',
        analysis: 'The campaign is a textbook self-reference effect application in physical product design. By putting personal names on bottles, Coca-Cola transformed a generic commodity into a self-relevant object. Sales in the US increased by more than 2% after a decade of declining revenue, driven entirely by the self-reference connection.',
      },
      {
        company: 'Duolingo',
        product: 'Personalized Learning Path',
        description: 'Duolingo constantly references the user\'s personal progress: "Your streak: 45 days", "You learned 12 new words this week", "Your Spanish is 23% fluent". Progress is always framed as belonging to the user.',
        effectiveness: 'effective',
        analysis: 'Self-referential progress framing ("your streak", "your words") creates ownership of learning outcomes. Users are more motivated by personal progress metrics than abstract completion percentages because the self-reference effect makes the data emotionally meaningful.',
      },
      {
        company: 'Amazon',
        product: 'Personalized Recommendations',
        description: 'Amazon\'s "Recommended for you", "Inspired by your browsing history", and "Customers who bought items in your cart also bought" all frame suggestions through the user\'s own behavior and purchases.',
        effectiveness: 'very-effective',
        analysis: 'Amazon pioneered e-commerce self-reference by making the entire shopping experience a reflection of user behavior. Personalized recommendations drive an estimated 35% of Amazon\'s revenue, demonstrating the commercial power of the self-reference effect.',
      },
    ],

    abTests: [
      {
        title: 'Email Subject Lines: Personalized vs Generic',
        hypothesis:
          'Email subject lines containing the recipient\'s name and personal data will achieve higher open and click rates',
        controlVersion: {
          description:
            'Generic subject line: "Your weekly activity summary is ready"',
          metrics: {
            conversionRate: '18.2%',
            timeOnPage: '0:45',
            scrollDepth: '35%',
          },
        },
        treatmentVersion: {
          description:
            'Personalized subject line: "Sarah, you completed 12 tasks this week — here\'s your summary"',
          metrics: {
            conversionRate: '34.1%',
            timeOnPage: '2:10',
            scrollDepth: '72%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Personalized subject lines with name and personal data nearly doubled open rates. Users who opened spent 189% more time reading and scrolled significantly deeper, indicating the self-reference effect sustained engagement beyond the initial open.',
          learnings: [
            'Name + personal data in subject lines dramatically outperforms name-only personalization',
            'Self-reference drives not just opens but deeper engagement with content',
            'Users were more likely to click CTAs in personalized emails (3.2x higher CTR)',
            'Effect was strongest for users who had been active in the past week',
          ],
        },
      },
      {
        title: 'Dashboard Framing: "Your" Data vs Generic Labels',
        hypothesis:
          'Framing dashboard metrics with "Your" language will increase engagement and recall',
        controlVersion: {
          description:
            'Dashboard with generic labels: "Revenue", "Tasks Completed", "Team Performance"',
          metrics: {
            conversionRate: '42%',
            clickThroughRate: '23%',
          },
        },
        treatmentVersion: {
          description:
            'Dashboard with self-referential labels: "Your Revenue", "Tasks You Completed", "Your Team\'s Performance"',
          metrics: {
            conversionRate: '58%',
            clickThroughRate: '37%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Simply adding "Your" to dashboard labels increased daily active usage by 38% and click-through on detail views by 61%. In follow-up surveys, users in the treatment group recalled their metrics more accurately 24 hours later.',
          learnings: [
            '"Your" framing costs nothing to implement but significantly boosts engagement',
            'Self-referential labels increased perceived relevance of the same data',
            'Users checked personalized dashboards more frequently throughout the day',
            'Recall accuracy improved by 27% for self-referentially framed metrics',
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
        name: 'User Name Display',
        description:
          'User\'s name, avatar, or initials displayed in the interface',
        howToSpot:
          'Look for greetings with names, personalized headers, or user avatars in navigation',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: '"You/Your" Language',
        description:
          'Copy that directly addresses the user with second-person pronouns',
        howToSpot:
          'Scan headings and labels for "Your dashboard", "Your activity", "For you", "Recommended for you"',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Personalized Recommendations',
        description:
          'Content or product suggestions framed as based on user behavior',
        howToSpot:
          'Look for "Because you watched/listened/bought", "Based on your history", "Picked for you"',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Personal Progress Indicators',
        description:
          'User-specific metrics, streaks, achievements, or activity summaries',
        howToSpot:
          'Look for progress bars, streak counters, "Your stats", weekly/monthly personal summaries',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'User-Generated Content Prominence',
        description:
          'User\'s own content, posts, or contributions displayed prominently',
        howToSpot:
          'Check for "Your posts", "Your contributions", profile-centric views, or personal feeds',
        severity: ImpactLevel.MEDIUM,
      },
    ],

    patterns: [
      {
        name: 'Personal Greeting Pattern',
        description: 'Interface greets user by name with contextual information (time of day, recent activity)',
        indicators: ['Name in header or welcome message', 'Time-contextual greetings ("Good morning, Sarah")', 'Activity-based welcome ("Welcome back, you have 3 new messages")'],
        severity: ImpactLevel.MEDIUM,
        confidence: 'high',
      },
      {
        name: 'Behavioral Recommendation Pattern',
        description: 'Suggestions and recommendations explicitly tied to user\'s past behavior',
        indicators: ['"Because you..." explanations', '"Based on your..." framing', 'Recommendation sections labeled "For You"', 'History-driven content feeds'],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Personal Data Reflection Pattern',
        description: 'User\'s own data, metrics, or activity presented back as a narrative',
        indicators: ['Weekly/monthly personal summaries', 'Year-in-review features', 'Personal analytics dashboards', 'Achievement and milestone notifications'],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Identity Customization Pattern',
        description: 'Interface elements that users personalize to reflect their identity',
        indicators: ['Custom avatars and profile pictures', 'Theme or color customization', 'Customizable dashboard layouts', 'Personal bio or status fields'],
        severity: ImpactLevel.MEDIUM,
        confidence: 'medium',
      },
    ],

    checklistQuestions: [
      'Is the user\'s name or avatar displayed prominently in the interface?',
      'Does the copy use "you" and "your" to address the user directly?',
      'Are recommendations framed as based on the user\'s own behavior?',
      'Does the interface reflect personal data, metrics, or activity back to the user?',
      'Are notifications and emails personalized with user-specific content?',
      'Can users customize the interface to reflect their identity (themes, layouts, avatars)?',
      'Is personalization based on accurate, current data?',
      'Are there personal progress indicators (streaks, achievements, summaries)?',
      'Does the design balance personalization with privacy boundaries?',
      'Is there a fallback experience for users without enough data for personalization?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in the self-reference effect.

Analyze the provided design for self-reference effect patterns. Identify:

1. **Personal Addressing**: Use of user's name, avatar, "you/your" language
2. **Behavioral Personalization**: Recommendations, suggestions, or content tied to user history
3. **Data Reflection**: Personal metrics, progress, or activity summaries shown to the user
4. **Identity Customization**: Options for users to make the interface their own
5. **Self-Relevant Notifications**: Alerts and messages referencing user-specific events

For each pattern found:
- Identify what personal data or identity elements are leveraged
- Assess whether the personalization is genuine or superficial
- Determine if privacy boundaries are respected
- Evaluate accuracy and freshness of personal data used
- Suggest improvements for deeper, more ethical self-reference

Consider:
- Is personalization genuine (data-driven) or hollow (name-only)?
- Does the level of personalization feel helpful or invasive?
- Are there privacy concerns with how personal data is displayed?
- Is there a graceful fallback for users without sufficient data?
- Are all users (including those using assistive technology) getting the personalized experience?

Provide actionable recommendations for ethical, effective personalization.`,

    outputSchema: {
      type: 'object',
      properties: {
        selfReferencePatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              personalDataUsed: { type: 'string' },
              depth: { type: 'string' },
              privacyRisk: { type: 'string' },
              ethical: { type: 'boolean' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'personalDataUsed',
              'depth',
              'ethical',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            personalizationDepth: { type: 'number' },
            privacyRespect: { type: 'number' },
            dataAccuracy: { type: 'number' },
            ethicalScore: { type: 'number' },
          },
          required: [
            'personalizationDepth',
            'privacyRespect',
            'dataAccuracy',
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
        'selfReferencePatterns',
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
        title: 'Audit Your Copy for Self-Referential Language',
        description:
          'Review all interface text and replace generic labels with "you/your" framing where appropriate',
        example:
          'Change "Dashboard" to "Your Dashboard", "Recent Activity" to "Your Recent Activity"',
        tips: [
          'Start with headings, navigation labels, and page titles',
          'Don\'t overdo it — every label doesn\'t need "Your"',
          'Ensure the "your" framing is backed by actual personalization',
        ],
      },
      {
        step: 2,
        title: 'Implement Name-Based Personalization',
        description:
          'Display the user\'s name in key touchpoints: greetings, emails, notifications, and headers',
        example:
          '"Good morning, Sarah" in dashboard header, "Sarah, your report is ready" in email subject',
        tips: [
          'Use first name for warmth, full name for formal contexts',
          'Always have a fallback for missing names ("Welcome back!")',
          'Respect cultural naming conventions and preferences',
        ],
      },
      {
        step: 3,
        title: 'Connect Recommendations to User Behavior',
        description:
          'Frame every recommendation with an explicit link to the user\'s own actions or preferences',
        example:
          '"Because you purchased Running Shoes" instead of "You might also like"',
        tips: [
          'Explain why something is recommended in terms of user behavior',
          'Use specific references ("because you listened to X") not vague ones ("based on your preferences")',
          'Let users correct or dismiss recommendations to improve accuracy',
        ],
      },
      {
        step: 4,
        title: 'Reflect Personal Data as Narrative',
        description:
          'Transform raw user data into meaningful personal narratives and summaries',
        example:
          '"You\'ve been learning Spanish for 45 days and know 340 words — that\'s more than 78% of learners at your level"',
        tips: [
          'Compare users to their own past performance, not just averages',
          'Celebrate milestones and progress personally',
          'Make data actionable: "You\'re close to your goal, here\'s what to do next"',
        ],
      },
      {
        step: 5,
        title: 'Respect Privacy Boundaries',
        description:
          'Give users control over what personal data is displayed and how it\'s used for personalization',
        example:
          'Settings page with toggles: "Show my name in greetings", "Use my history for recommendations"',
        tips: [
          'Never display sensitive data without explicit consent',
          'Offer clear privacy controls for personalization features',
          'Be transparent about what data drives personalization',
        ],
      },
    ],

    dos: [
      'Use "you" and "your" in interface copy to activate self-reference encoding',
      'Display the user\'s name in greetings, emails, and key touchpoints',
      'Frame recommendations as personally curated based on user behavior',
      'Reflect personal data back as meaningful narratives and progress summaries',
      'Let users customize the interface to reflect their identity',
      'Compare users to their own past performance for motivation',
      'Provide accurate, current personalization based on real user data',
      'Give users control over their personalization and privacy settings',
    ],

    donts: [
      'Don\'t repeat the user\'s name excessively — it feels robotic and manipulative',
      'Don\'t display sensitive personal data without explicit consent',
      'Don\'t personalize based on outdated or inaccurate data',
      'Don\'t use personalization to surface embarrassing or private information',
      'Don\'t fake personalization with generic content behind "Your" labels',
      'Don\'t show personal data on shared or public screens without protection',
      'Don\'t make wrong assumptions about user identity or preferences',
      'Don\'t personalize at the expense of user privacy or autonomy',
    ],

    bestPractices: [
      {
        title: 'Genuine Over Superficial Personalization',
        description:
          'Ensure every "your" or name reference is backed by actual personalized content, not just template variables',
        rationale:
          'Hollow personalization is worse than no personalization — users quickly detect when "personal" content is generic',
        example:
          '"Sarah, based on your 3 recent design projects, here are typography resources" vs "Sarah, check out our resources!"',
      },
      {
        title: 'Progressive Personalization',
        description:
          'Increase personalization depth as you gather more user data over time',
        rationale:
          'New users have little data; forcing deep personalization early leads to inaccurate or empty experiences',
        example:
          'Week 1: "Welcome, Sarah!" → Month 1: "Your top category is Design" → Month 6: Full personalized dashboard',
      },
      {
        title: 'Self-Reference in Notifications',
        description:
          'Frame every notification as personally relevant to the user',
        rationale:
          'Self-referential notifications have dramatically higher open and action rates than generic ones',
        example:
          '"Your saved item is back in stock" vs "Item back in stock"; "3 people replied to your comment" vs "New replies"',
      },
      {
        title: 'Identity Ownership',
        description:
          'Let users shape how the interface reflects their identity (avatars, themes, display names)',
        rationale:
          'User-customized interfaces create stronger self-reference because the environment itself becomes self-relevant',
        example:
          'Customizable dashboard layouts, theme colors, profile avatars, and display name preferences',
      },
      {
        title: 'Privacy-First Personalization',
        description:
          'Always prioritize user privacy and consent over personalization depth',
        rationale:
          'Trust is foundational; invasive personalization destroys the relationship it was meant to strengthen',
        example:
          'Clear opt-in for personalization features, easy data deletion, transparent "why am I seeing this?" explanations',
      },
    ],

    accessibility: [{
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships - Ensure personalized content has proper semantic structure',
        implementation:
          'Use proper heading levels and ARIA labels for personalized sections so screen reader users access the same personalized experience as sighted users',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.4.1',
        guideline:
          'Use of Color - Don\'t rely only on color for personalization indicators',
        implementation:
          'Combine color-based personalization cues (custom themes, progress colors) with text labels and semantic markup',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.4.6',
        guideline:
          'Headings and Labels - Use personalized headings that include user context',
        implementation:
          'Include user name or personalized context in heading text, not just in visual elements inaccessible to screen readers',
      },
    ],

    ethics: [
      {
        concern: 'Privacy Invasion',
        severity: 'critical',
        explanation:
          'Displaying personal data (location, health info, browsing history) that users didn\'t expect the system to know or show',
        mitigation:
          'Only personalize with data users have explicitly provided or clearly consented to. Offer transparency about data usage and easy opt-out.',
      },
      {
        concern: 'Manipulative Personalization',
        severity: 'high',
        explanation:
          'Using personal data to manipulate users into purchases, engagement, or decisions against their interest',
        mitigation:
          'Ensure personalization serves user goals, not just business metrics. Ask: "Does this personalization help the user or just the business?"',
      },
      {
        concern: 'Filter Bubble Creation',
        severity: 'high',
        explanation:
          'Over-personalizing content to the point where users only see reinforcing information, limiting exposure to diverse perspectives',
        mitigation:
          'Balance personalized content with diverse recommendations. Include "explore beyond your preferences" features.',
      },
      {
        concern: 'Data Accuracy Responsibility',
        severity: 'medium',
        explanation:
          'Incorrect personalization (wrong name, wrong interests) can be offensive or alienating',
        mitigation:
          'Validate data quality, provide easy correction mechanisms, and gracefully degrade to generic content when data confidence is low.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'Self-Reference and the Encoding of Personal Information',
        author: 'Rogers, T. B., Kuiper, N. A., & Kirker, W. S.',
        year: 1977,
        doi: '10.1037/0022-3514.35.9.677',
        description:
          'The foundational paper demonstrating that self-referential encoding produces superior memory compared to semantic, phonemic, or structural encoding',
        type: 'foundational',
      },
      {
        title: 'Self-Reference and Memory: A Meta-Analysis',
        author: 'Symons, C. S., & Johnson, B. T.',
        year: 1997,
        doi: '10.1037/0033-2909.121.3.371',
        description:
          'Comprehensive meta-analysis confirming the robustness of the self-reference effect across 129 studies and identifying moderating variables',
        type: 'foundational',
      },
      {
        title: 'The Self-Reference Effect in Memory: A Meta-Analysis and Review',
        author: 'Klein, S. B., & Loftus, J.',
        year: 1988,
        doi: '10.1037/0033-2909.104.1.65',
        description:
          'Early meta-analytic review examining the role of self-schema organization in the memory advantage',
        type: 'advanced',
      },
    ],

    books: [
      {
        title: 'The Self in Social Psychology',
        author: 'Baumeister, Roy F.',
        year: 1999,
        isbn: '9781841690148',
        description:
          'Comprehensive overview of self-related cognitive processes including the self-reference effect and self-schema theory',
        type: 'foundational',
      },
      {
        title: 'Designing for Behavior Change',
        author: 'Wendel, Stephen',
        year: 2013,
        isbn: '9781449367626',
        description:
          'Practical guide to applying behavioral science (including self-reference) to product design and user engagement',
        type: 'practical',
      },
    ],

    articles: [
      {
        title: 'Personalization in UX: How to Do It Right',
        author: 'Nielsen Norman Group',
        url: 'https://www.nngroup.com/articles/personalization/',
        description:
          'Practical UX guide on implementing personalization that leverages the self-reference effect without crossing privacy boundaries',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'The Self-Reference Effect: Why Personalization Works',
        author: 'The Decision Lab',
        url: 'https://thedecisionlab.com/biases/self-reference-effect',
        description:
          'Overview of the self-reference effect with implications for design and marketing',
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
