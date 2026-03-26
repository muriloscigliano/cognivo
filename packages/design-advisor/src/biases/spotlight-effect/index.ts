/**
 * SPOTLIGHT EFFECT
 *
 * We overestimate how much others notice our appearance and behavior
 */


import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const spotlightEffect: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'spotlight-effect',
    name: 'Spotlight Effect',
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
    simple: 'We overestimate how much others notice our appearance and behavior',

    detailed: `The spotlight effect is a cognitive bias in which people overestimate the degree to which others notice, observe, and judge their appearance, behavior, and mistakes. We feel as though a spotlight is shining on us, making our every flaw and action visible to the world, when in reality others are far less attentive to us than we believe.

This bias stems from our inherent egocentrism: because we are the center of our own world, we assume we are also central in others' awareness. Research consistently shows that the number of people who actually notice our embarrassing moments, fashion choices, or social blunders is roughly half of what we predict.

In product design, the spotlight effect profoundly shapes how users interact with social features, privacy settings, and public-facing profiles. Users overestimate how much others scrutinize their activity, posts, contributions, and mistakes, leading to sharing anxiety, reduced participation, and avoidance of social features. Designers who understand this bias can reduce social friction by providing reassurance, granular visibility controls, and private-by-default experiences.`,

    psychologyBasis: {
      discoveredBy: 'Thomas Gilovich, Victoria Medvec, and Kenneth Savitsky',
      year: 2000,
      theory: 'Egocentric Anchoring and Adjustment',
      mechanism: `The brain anchors heavily on its own internal experience and insufficiently adjusts for others' perspectives. This happens because:

1. **Egocentric Anchoring**: We start from our own vivid, first-person experience and try to adjust for how others see us, but the adjustment is always insufficient
2. **Asymmetric Attention**: We are acutely aware of our own appearance and actions but only superficially process others', leading us to assume the reverse is also true
3. **Emotional Amplification**: Embarrassing or salient personal experiences feel magnified because our emotional arousal makes the moment feel more conspicuous than it actually is
4. **Illusion of Transparency**: A closely related effect where we overestimate how visible our internal states (nervousness, embarrassment, discomfort) are to others
5. **Confirmation Bias Feedback**: We selectively notice the rare occasions when someone does comment on our appearance, reinforcing the belief that everyone is watching

The mechanism is automatic and pervasive -- we cannot easily simulate others' divided attention and limited interest in us.`,
    },

    realWorldExample: `In Gilovich, Medvec & Savitsky's classic 2000 experiment, participants were asked to wear an embarrassing Barry Manilow T-shirt into a room of peers. Participants estimated that roughly 50% of people in the room would notice the shirt. In reality, only about 25% did. The effect was equally strong for positive items: people wearing flattering clothing also overestimated how many people noticed. We feel "on stage" regardless of whether the attention is positive or negative.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `The spotlight effect profoundly affects how users interact with social and public-facing features in interfaces. Users consistently overestimate how much others notice their activity, profile, mistakes, and contributions. Designers can leverage this understanding to:

- Reduce sharing anxiety by providing clear visibility controls and reassurance
- Increase participation by making contributions feel less exposed
- Build trust through private-by-default settings and granular privacy options
- Minimize social friction by reducing unnecessary public exposure of user activity
- Encourage engagement by normalizing mistakes and imperfect contributions`,

    whenToUse: [
      {
        title: 'Privacy Controls and Settings',
        scenario:
          'When designing visibility settings for user profiles, activity, and content',
        example:
          'Provide granular privacy controls with clear labels: "Only you can see this", "Visible to connections only", "Public"',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Social Sharing Features',
        scenario: 'When encouraging users to share content, achievements, or contributions',
        example:
          'Show a preview of exactly what others will see before publishing, with easy options to limit audience',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Profile and Activity Displays',
        scenario: 'When showing user activity, contributions, or status to others',
        example:
          'Default to minimal public exposure; let users opt in to sharing more, with clear indicators of who can see what',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Error and Mistake Recovery',
        scenario: 'When users make visible mistakes such as typos, wrong actions, or embarrassing posts',
        example:
          'Provide generous edit windows, undo options, and quiet deletion without drawing attention to the mistake',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'First-Time Contributions',
        scenario: 'When new users are making their first posts, comments, or contributions',
        example:
          'Offer "draft" or "preview" modes so users can see how their contribution will appear before committing publicly',
        impact: ImpactLevel.MEDIUM,
      },
    ],

    whenToAvoid: [
      {
        title: 'Critical Safety Visibility',
        reason:
          'Some user activity genuinely needs to be visible for safety (e.g., location sharing in emergencies)',
        consequence:
          'Over-applying privacy to reduce spotlight anxiety could compromise user safety',
        alternative:
          'Clearly explain why certain information must be visible and provide contextual controls',
      },
      {
        title: 'Accountability Contexts',
        reason:
          'In workplace or collaborative tools, some visibility is necessary for accountability and coordination',
        consequence:
          'Hiding all activity feeds could reduce team awareness and accountability',
        alternative:
          'Provide team-scoped visibility with clear norms, not public-by-default broadcasting',
      },
      {
        title: 'Community Moderation',
        reason:
          'Overly private settings can enable harmful behavior without accountability',
        consequence:
          'Bad actors may exploit privacy features to avoid detection',
        alternative:
          'Balance privacy with moderation visibility; public accountability for harmful content, privacy for normal activity',
      },
      {
        title: 'Genuine Social Connection',
        reason:
          'Over-indexing on privacy can prevent serendipitous social discovery and connection',
        consequence:
          'Users may feel isolated if everything is hidden by default',
        alternative:
          'Provide opt-in social features with clear previews rather than hiding everything',
      },
    ],

    commonMistakes: [
      {
        title: 'Forcing Public Activity',
        description:
          'Making user actions, likes, or views visible to everyone by default without consent',
        why: 'Users feel exposed and anxious, leading to reduced engagement or account deletion',
        fix: 'Default to private; let users choose what to share publicly with clear opt-in controls',
      },
      {
        title: 'Exposing Mistakes Publicly',
        description:
          'Showing edit histories, deleted content, or corrections prominently to other users',
        why: 'Users feel that everyone notices their errors, amplifying spotlight anxiety',
        fix: 'Keep edit histories private or accessible only on request; provide graceful undo and edit windows',
      },
      {
        title: 'Ambiguous Visibility Indicators',
        description:
          'Not clearly communicating who can see a user\'s activity, profile, or content',
        why: 'Uncertainty about audience size amplifies the spotlight effect; users imagine the worst case',
        fix: 'Always show clear visibility indicators: "Visible to 12 people", "Only you can see this"',
      },
      {
        title: 'Unnecessary Attention to Inactivity',
        description:
          'Broadcasting when users are offline, haven\'t posted recently, or haven\'t responded',
        why: 'Users feel judged for their absence, creating anxiety about returning',
        fix: 'Avoid "last seen" or "hasn\'t posted in X days" indicators, or make them opt-in only',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.HIGH,
        description:
          'Layout determines how prominently user activity and identity are exposed to others',
        examples: [
          'Profile cards showing activity status broadcast presence to everyone',
          'Activity feeds placing user actions front-and-center amplify spotlight anxiety',
          'Sidebar "who\'s online" lists make users feel watched',
          'Prominent placement of view counts on content increases self-consciousness',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Text treatment affects how exposed users feel about their contributions',
        examples: [
          'Large, bold usernames next to every action make users feel identified',
          'Subtle, de-emphasized attribution reduces spotlight pressure on contributors',
          'Typography size on error messages affects perceived embarrassment',
          'Readability of privacy labels determines whether users trust visibility settings',
        ],
      },
      color: {
        level: ImpactLevel.MEDIUM,
        description:
          'Color signals attention and visibility, affecting user comfort with social features',
        examples: [
          'Green "online" dots make users feel constantly surveilled',
          'Bright badges on profiles draw unwanted attention to activity',
          'Muted, subtle social indicators reduce spotlight pressure',
          'Red error highlights on public contributions amplify embarrassment',
        ],
      },
      interaction: {
        level: ImpactLevel.CRITICAL,
        description:
          'Social interactions are where spotlight effect anxiety is most acute',
        examples: [
          'Typing indicators in chat make users self-conscious about composing messages',
          'Read receipts create pressure and anxiety about response timing',
          'Real-time "X is viewing this" notifications make users feel watched',
          'Mandatory profile photos increase self-consciousness about appearance',
        ],
      },
      content: {
        level: ImpactLevel.HIGH,
        description:
          'Content framing determines whether users feel safe participating and sharing',
        examples: [
          '"Only you can see this" reassurances dramatically reduce sharing anxiety',
          'Showing exact audience size helps users calibrate their spotlight expectations',
          'Normalizing imperfection ("Everyone starts somewhere") reduces contribution anxiety',
          'Privacy-focused copy builds trust and encourages participation',
        ],
      },
      accessibility: {
        level: ImpactLevel.MEDIUM,
        description:
          'Accessible social features must consider spotlight anxiety across different user groups',
        examples: [
          'Screen reader announcements of social indicators should be configurable, not forced',
          'Users with social anxiety disorders may be disproportionately affected by visibility features',
          'Clear, accessible privacy controls ensure all users can manage their exposure',
          'Alternative text for activity indicators should respect privacy preferences',
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
        title: 'Granular Privacy Controls with Reassurance',
        description:
          'Profile settings with clear visibility labels and "only you" reassurances',
        code: `<div class="privacy-settings">
  <h3>Profile Visibility</h3>
  <div class="setting-group">
    <div class="setting">
      <label>Activity Status</label>
      <select>
        <option selected>Only you can see this</option>
        <option>Connections only</option>
        <option>Everyone</option>
      </select>
      <p class="reassurance">No one will know when you're online</p>
    </div>
    <div class="setting">
      <label>Profile Views</label>
      <select>
        <option selected>Private mode</option>
        <option>Show my name</option>
      </select>
      <p class="reassurance">Browse profiles anonymously</p>
    </div>
    <div class="setting">
      <label>Contribution History</label>
      <select>
        <option selected>Visible to you only</option>
        <option>Team members</option>
        <option>Public</option>
      </select>
      <p class="reassurance">Your edits and comments stay private by default</p>
    </div>
  </div>
</div>`,
        explanation:
          'Each privacy setting includes a clear reassurance message explaining exactly who can see what. The "only you" language directly counteracts spotlight anxiety by confirming that the perceived audience is zero.',
        principle:
          'Explicit visibility reassurance reduces the gap between perceived and actual audience',
        metrics: {
          before: '34% of users completed profile setup with default-public settings',
          after: '67% completed setup with private-by-default and clear reassurances',
          improvement: '97% increase in profile completion with privacy-first defaults',
        },
      },
      {
        title: 'Private-by-Default with Opt-In Sharing',
        description:
          'Activity tracking that keeps data private unless users explicitly choose to share',
        code: `<div class="activity-settings">
  <h3>Your Activity</h3>
  <div class="private-indicator">
    <span class="lock-icon">&#128274;</span>
    <p><strong>Your activity is private by default.</strong></p>
    <p class="detail">Only you can see your workout history, routes, and stats.</p>
  </div>

  <div class="share-option">
    <h4>Want to share with friends?</h4>
    <p>Choose exactly what to share:</p>
    <div class="share-toggles">
      <label><input type="checkbox"> Workout completion (no details)</label>
      <label><input type="checkbox"> Distance and time</label>
      <label><input type="checkbox"> Route map</label>
      <label><input type="checkbox"> Photos</label>
    </div>
    <p class="preview-note">Preview what others see before sharing</p>
    <button class="secondary">Preview</button>
  </div>
</div>`,
        explanation:
          'Starting from a completely private state and letting users opt in to specific sharing removes the anxiety of unknown exposure. The preview feature lets users see exactly what others will see, reducing spotlight uncertainty.',
        principle:
          'Private-by-default with granular opt-in sharing eliminates audience uncertainty',
      },
      {
        title: 'Graceful Error Recovery',
        description:
          'Comment editing with generous edit window and no public edit history',
        code: `<div class="comment-posted">
  <div class="comment-content">
    <p>This is my comment with a typo I juts noticed...</p>
  </div>
  <div class="comment-actions">
    <button class="edit-btn">Edit</button>
    <button class="delete-btn">Delete</button>
    <span class="edit-window">You can edit for 15 minutes</span>
  </div>
  <p class="reassurance-text">
    <span class="eye-icon">&#128065;</span>
    Edits are silent -- no one is notified when you fix a typo
  </p>
</div>`,
        explanation:
          'Providing a generous edit window and explicitly stating that edits are silent directly addresses spotlight anxiety about public mistakes. Users feel safe contributing because they know mistakes can be corrected without anyone noticing.',
        principle:
          'Silent error correction reduces the perceived cost of public participation',
        metrics: {
          before: '23% of users deleted comments after posting (shame-driven)',
          after: '8% deleted after introducing silent editing and reassurance',
          improvement: '65% reduction in shame-driven comment deletion',
        },
      },
    ],

    bad: [
      {
        title: 'Forced Public Activity Broadcasting',
        description:
          'Social network that broadcasts all user activity to connections without consent',
        code: `<!-- DON'T DO THIS -->
<div class="activity-feed">
  <h3>What Your Friends Are Doing</h3>
  <div class="activity-item">
    <img src="avatar.jpg" alt="Sarah">
    <p><strong>Sarah Chen</strong> viewed <strong>3 job postings</strong> today</p>
    <span class="time">2 minutes ago</span>
  </div>
  <div class="activity-item">
    <img src="avatar2.jpg" alt="Mike">
    <p><strong>Mike Torres</strong> updated his resume</p>
    <span class="time">15 minutes ago</span>
  </div>
  <div class="activity-item">
    <img src="avatar3.jpg" alt="Priya">
    <p><strong>Priya Sharma</strong> followed <strong>Competitor Inc.</strong></p>
    <span class="time">1 hour ago</span>
  </div>
</div>`,
        explanation:
          'Broadcasting sensitive activities like job searching, resume updates, and company follows creates extreme spotlight anxiety. Users feel exposed and surveilled, leading to reduced platform usage or abandonment. This is especially harmful because the consequences (employer seeing job search activity) can be real.',
        principle:
          'Never broadcast sensitive user activity without explicit, informed consent',
      },
      {
        title: 'Public Mistake Exposure',
        description:
          'Code review tool that prominently displays error counts and edit histories',
        code: `<!-- DON'T DO THIS -->
<div class="contributor-profile">
  <h3>Sarah Chen's Contributions</h3>
  <div class="stats-grid">
    <div class="stat negative">
      <span class="number">47</span>
      <span class="label">Bugs Introduced</span>
    </div>
    <div class="stat negative">
      <span class="number">23</span>
      <span class="label">Reverted Commits</span>
    </div>
    <div class="stat">
      <span class="number">156</span>
      <span class="label">Edits After Review</span>
    </div>
  </div>
  <h4>Recent Mistakes</h4>
  <ul class="mistake-list">
    <li>Broke production build (3 days ago)</li>
    <li>Typo in customer-facing copy (1 week ago)</li>
  </ul>
</div>`,
        explanation:
          'Prominently displaying mistakes, bug counts, and reverted work creates an environment of surveillance and shame. Contributors will avoid contributing or only submit "safe" changes, destroying innovation and learning.',
        principle:
          'Public mistake tracking amplifies spotlight anxiety and suppresses participation',
      },
      {
        title: 'Mandatory Social Sharing Gates',
        description:
          'App requiring social share to unlock features',
        code: `<!-- DON'T DO THIS -->
<div class="share-gate">
  <h2>Share to Continue!</h2>
  <p>Post your progress to Facebook to unlock the next level</p>
  <div class="share-preview">
    <p>"I just completed Level 12 in BrainTrainer! My score: 847"</p>
    <small>This will be posted to your timeline and visible to all friends</small>
  </div>
  <button class="primary">Share to Facebook</button>
  <p class="small-text">No other way to continue</p>
</div>`,
        explanation:
          'Forcing users to share activity publicly exploits spotlight anxiety as a pressure mechanism. Users feel trapped between losing progress and exposing their activity to everyone they know. This is manipulative and drives uninstalls.',
        principle:
          'Never force public sharing as a requirement; it weaponizes spotlight anxiety',
      },
    ],

    realWorld: [
      {
        company: 'LinkedIn',
        product: 'Profile View Notifications',
        url: 'https://www.linkedin.com',
        description: 'LinkedIn notifies users when someone views their profile, and offers "Private Mode" browsing where users can view profiles anonymously. The mere existence of "Who Viewed Your Profile" creates spotlight anxiety, but Private Mode acknowledges and addresses it.',
        effectiveness: 'effective',
        analysis: 'LinkedIn successfully monetizes spotlight anxiety (premium users get full viewer lists) while providing a privacy escape valve. The feature both triggers and resolves the bias, driving premium conversions. However, the default non-private mode still creates ambient anxiety for free users.',
      },
      {
        company: 'Strava',
        product: 'Activity Privacy Controls',
        url: 'https://www.strava.com',
        description: 'Strava allows users to hide activity from the feed, create privacy zones around their home, and control who sees their routes. Many users reported anxiety about their running pace or fitness level being publicly visible, prompting Strava to expand privacy options.',
        effectiveness: 'effective',
        analysis: 'Strava recognized that spotlight anxiety about fitness levels was suppressing participation. Adding granular privacy controls (hide pace, blur start/end locations, followers-only visibility) increased activity uploads by reducing the perceived judgment from the audience.',
      },
      {
        company: 'Slack',
        product: 'Typing Indicators and Status',
        url: 'https://slack.com',
        description: 'Slack shows "X is typing..." indicators in channels and DMs. While useful for conversation flow, these create spotlight pressure: users feel watched while composing messages and may abandon messages mid-composition. Slack also shows online/away status, creating presence anxiety.',
        effectiveness: 'somewhat-effective',
        analysis: 'Typing indicators create a micro-spotlight effect where users feel observed during message composition. Some users report rewriting messages multiple times or abandoning them because the indicator reveals their hesitation. The feature helps conversation pacing but increases social anxiety for some users.',
      },
      {
        company: 'Instagram',
        product: 'Story Viewer Lists',
        url: 'https://www.instagram.com',
        description: 'Instagram shows story posters exactly who viewed their story, creating a bidirectional spotlight effect: posters feel judged by their audience, and viewers feel surveilled knowing that the poster can see they watched. This drives both engagement and anxiety.',
        effectiveness: 'somewhat-effective',
        analysis: 'Story viewer lists create mutual spotlight anxiety. Posters obsess over who did and didn\'t view their story, while viewers avoid watching stories of certain people to avoid being "seen." The feature drives engagement metrics but contributes to social anxiety and unhealthy usage patterns.',
      },
    ],

    abTests: [
      {
        title: 'Private-by-Default vs Public-by-Default Profile Settings',
        hypothesis:
          'Private-by-default settings will increase profile completion and platform engagement by reducing spotlight anxiety',
        controlVersion: {
          description:
            'All profile fields and activity public by default. Users must manually change each setting to private.',
          metrics: {
            conversionRate: '41%',
            timeOnPage: '2:15',
            scrollDepth: '55%',
          },
        },
        treatmentVersion: {
          description:
            'All profile fields and activity private by default with clear "Share with others" opt-in toggles and visibility previews.',
          metrics: {
            conversionRate: '68%',
            timeOnPage: '3:45',
            scrollDepth: '82%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Private-by-default settings increased profile completion by 66%. Users spent more time customizing their profiles when they felt in control of visibility. Paradoxically, users who started private chose to share more fields over time than users who started public.',
          learnings: [
            'Users who feel safe from the start engage more deeply over time',
            'Explicit opt-in sharing creates more intentional, higher-quality social connections',
            'Spotlight anxiety at onboarding is the #1 barrier to profile completion',
            'Users who chose to share voluntarily were 3x more engaged than those who shared by default',
          ],
        },
      },
      {
        title: 'Visibility Reassurance on Comment Posting',
        hypothesis:
          'Showing explicit audience information before posting will increase comment rates by reducing spotlight uncertainty',
        controlVersion: {
          description:
            'Standard comment box with "Post" button and no visibility information',
          metrics: {
            conversionRate: '6.2%',
            clickThroughRate: '14%',
          },
        },
        treatmentVersion: {
          description:
            'Comment box with "Visible to 23 team members" label, preview option, and "You can edit for 15 min after posting" reassurance',
          metrics: {
            conversionRate: '11.8%',
            clickThroughRate: '28%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Explicit audience size and edit-window reassurance nearly doubled comment posting rates. Users reported feeling "less nervous" about contributing when they knew exactly who would see their comment and that they could fix mistakes.',
          learnings: [
            'Concrete audience numbers ("23 people") reduce imagined-audience inflation',
            'Edit windows dramatically reduce fear of permanent public mistakes',
            'Preview options are used by 40% of first-time commenters',
            'The combination of audience clarity + error recovery is more effective than either alone',
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
        name: 'Public Activity Indicators',
        description:
          'Displays showing user activity, status, or presence to others (online dots, activity feeds, "last seen" timestamps)',
        howToSpot:
          'Look for green online indicators, "active now" labels, or activity timestamps visible to other users',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Audience Visibility Gaps',
        description:
          'Features where users cannot tell who can see their content, activity, or profile',
        howToSpot:
          'Check whether each piece of user-generated content has a clear visibility label or audience indicator',
        severity: ImpactLevel.CRITICAL,
      },
      {
        name: 'View/Read Receipts',
        description:
          'Indicators that reveal when someone has viewed, read, or interacted with content',
        howToSpot:
          'Look for read receipts, view counts attributed to specific users, "seen by" lists, or story viewer lists',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Typing and Composition Indicators',
        description:
          'Real-time signals that broadcast when a user is composing a message or editing content',
        howToSpot:
          'Check for "X is typing..." indicators, real-time cursor presence, or live editing indicators',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Public Error Exposure',
        description:
          'Features that make user mistakes, corrections, or failures visible to others',
        howToSpot:
          'Look for public edit histories, correction logs, visible error counts, or "edited" labels on content',
        severity: ImpactLevel.HIGH,
      },
    ],

    patterns: [
      {
        name: 'Forced Public Sharing Pattern',
        description: 'Features that require or strongly pressure users to share activity publicly',
        indicators: ['Social share gates blocking functionality', 'Auto-posting activity to feeds', 'No privacy options for shared content', 'Default public visibility with no opt-out'],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Surveillance Signaling Pattern',
        description: 'Features that signal to users that their behavior is being observed by others',
        indicators: ['Profile view notifications', 'Read receipts and seen indicators', '"X people are viewing this" counters', 'Typing indicators in group contexts'],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Activity Broadcasting Pattern',
        description: 'Automatic sharing of user actions, preferences, or engagement to a social feed',
        indicators: ['Auto-generated activity feed posts', '"X liked/followed/viewed Y" notifications to others', 'Public contribution or engagement metrics', 'Leaderboards exposing individual performance'],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Missing Privacy Controls Pattern',
        description: 'Absence of visibility settings for social or public-facing features',
        indicators: ['No audience selector on posts or contributions', 'No private mode or anonymous browsing option', 'No control over activity feed appearance', 'No way to hide online status or presence'],
        severity: ImpactLevel.CRITICAL,
        confidence: 'medium',
      },
    ],

    checklistQuestions: [
      'Can users clearly see who will view their content before posting?',
      'Are activity feeds and social features private by default or public by default?',
      'Do users have granular control over what activity is visible to others?',
      'Are there "only you can see this" reassurances on private data?',
      'Do read receipts or view indicators create surveillance pressure?',
      'Can users edit or delete content without the edit being publicly visible?',
      'Are online/presence indicators opt-in or forced?',
      'Does the interface show explicit audience sizes to calibrate spotlight expectations?',
      'Are user mistakes (typos, wrong actions) handled gracefully without public exposure?',
      'Is there a preview feature so users can see how their contribution appears to others?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in the spotlight effect.

Analyze the provided design for spotlight effect patterns. Identify:

1. **Public Exposure**: How user activity, identity, and behavior are made visible to others
2. **Visibility Controls**: Whether users can control who sees their content and activity
3. **Social Pressure Points**: Features that make users feel watched, judged, or surveilled
4. **Privacy Reassurance**: Presence or absence of "who can see this" indicators
5. **Mistake Handling**: How user errors and corrections are displayed to others

For each pattern found:
- Identify what user activity or information is exposed
- Assess whether users have adequate control over visibility
- Determine if the feature creates unnecessary spotlight anxiety
- Evaluate whether privacy defaults protect users
- Suggest improvements for reducing social friction

Consider:
- Are users forced to share activity they might prefer to keep private?
- Do view/read indicators create surveillance pressure?
- Can users correct mistakes without public embarrassment?
- Are visibility settings granular enough for user comfort?
- Do social features normalize participation or amplify self-consciousness?

Provide actionable recommendations for reducing spotlight anxiety while maintaining social engagement.`,

    outputSchema: {
      type: 'object',
      properties: {
        spotlightPatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              exposedActivity: { type: 'string' },
              visibilityControl: { type: 'string' },
              anxietyLevel: { type: 'string' },
              hasPrivacyOption: { type: 'boolean' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'exposedActivity',
              'anxietyLevel',
              'hasPrivacyOption',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            privacyDefaultScore: { type: 'number' },
            visibilityClarity: { type: 'number' },
            socialPressureLevel: { type: 'number' },
            errorRecoveryScore: { type: 'number' },
          },
          required: [
            'privacyDefaultScore',
            'visibilityClarity',
            'socialPressureLevel',
            'errorRecoveryScore',
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
        'spotlightPatterns',
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
        title: 'Audit Public Exposure Points',
        description:
          'Map every place in your product where user activity, identity, or behavior is visible to others',
        example:
          'List all features: activity feeds, profile views, online status, read receipts, contribution logs, error displays',
        tips: [
          'Include both explicit features (activity feeds) and implicit ones (typing indicators)',
          'Document the default visibility state for each feature',
          'Identify which exposure points create the most user anxiety',
        ],
      },
      {
        step: 2,
        title: 'Set Privacy-First Defaults',
        description:
          'Make all social and public-facing features private by default, requiring explicit opt-in to share',
        example:
          'Default: activity private, profile minimal, online status hidden. Users choose what to make visible.',
        tips: [
          'Apply "minimum necessary visibility" principle',
          'Every default should answer: "Would the user want this public?"',
          'Test defaults with privacy-sensitive users, not just power users',
        ],
      },
      {
        step: 3,
        title: 'Add Visibility Reassurance',
        description:
          'For every piece of user-generated content, clearly indicate who can see it',
        example:
          'Below every post or comment: "Visible to: 23 team members" or "Only you can see this"',
        tips: [
          'Use concrete numbers, not vague labels ("your network")',
          'Place reassurance inline, not buried in settings',
          'Update visibility indicators in real-time as settings change',
        ],
      },
      {
        step: 4,
        title: 'Provide Graceful Error Recovery',
        description:
          'Let users edit, undo, and delete without drawing attention to the correction',
        example:
          'Silent edit within 15 minutes, quiet delete with no notification to others, undo for accidental actions',
        tips: [
          'Avoid "edited" labels unless necessary for accountability',
          'Provide undo for social actions (likes, follows, reactions)',
          'Never notify others about corrections or deletions',
        ],
      },
      {
        step: 5,
        title: 'Test with Anxiety-Prone Users',
        description:
          'Validate your design with users who have social anxiety or are privacy-sensitive',
        example:
          'Run usability tests with a mix of social confidence levels, specifically probing for comfort with visibility features',
        tips: [
          'Ask: "How many people do you think will see this?" to measure spotlight calibration',
          'Watch for hesitation, abandonment, or anxiety behaviors during posting flows',
          'Measure time-to-post as a proxy for posting anxiety',
        ],
      },
    ],

    dos: [
      'Default all social features to private, allowing users to opt in to sharing',
      'Show clear visibility indicators ("Only you can see this", "Visible to 12 people")',
      'Provide generous edit and undo windows for public contributions',
      'Let users preview exactly what others will see before posting',
      'Make online/presence status opt-in, not automatic',
      'Allow anonymous or pseudonymous participation where appropriate',
      'Normalize imperfection with supportive copy ("Everyone starts somewhere")',
      'Provide granular controls for each type of social exposure',
    ],

    donts: [
      'Don\'t broadcast user activity without explicit consent',
      'Don\'t show public edit histories or correction counts',
      'Don\'t force social sharing as a requirement to use features',
      'Don\'t expose sensitive actions (job searching, health tracking) to others',
      'Don\'t use "X people viewed your profile" to create anxiety-driven engagement',
      'Don\'t show typing indicators in large group contexts without opt-out',
      'Don\'t display leaderboards or rankings without user consent',
      'Don\'t auto-share achievements, milestones, or activity to social feeds',
    ],

    bestPractices: [
      {
        title: 'Privacy-First Architecture',
        description:
          'Design every feature assuming the user wants privacy, then provide clear paths to share more',
        rationale:
          'Users who feel safe are more likely to share voluntarily than users who feel exposed',
        example:
          'New features default to private. Sharing is a deliberate, previewed action with audience selection.',
      },
      {
        title: 'Concrete Audience Indicators',
        description:
          'Replace vague visibility labels with specific audience counts and names',
        rationale:
          'The spotlight effect causes users to imagine a larger audience than actually exists; concrete numbers correct this',
        example:
          'Instead of "Shared with your network" show "Visible to 23 connections"',
      },
      {
        title: 'Silent Error Recovery',
        description:
          'Allow editing and correction without notifying others or leaving visible traces',
        rationale:
          'Fear of permanent, public mistakes is one of the strongest inhibitors of participation',
        example:
          'Comments editable for 15 minutes with no "edited" label; typo corrections are always silent',
      },
      {
        title: 'Opt-In Social Signals',
        description:
          'Make all social presence indicators (online status, typing, read receipts) opt-in rather than default',
        rationale:
          'Social signals create surveillance pressure that suppresses natural behavior',
        example:
          'Users choose whether to show online status, share read receipts, and display typing indicators',
      },
    ],

    accessibility: [{
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships - Ensure privacy controls and visibility indicators are programmatically determinable',
        implementation:
          'Use ARIA labels on privacy selectors and visibility indicators so screen reader users can understand and control who sees their content',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.4.1',
        guideline:
          'Use of Color - Don\'t rely solely on color for privacy/visibility status',
        implementation:
          'Combine green/red privacy indicators with text labels and icons so all users can determine visibility state',
      },
      {
        wcagLevel: 'AA',
        criterion: '3.3.2',
        guideline:
          'Labels or Instructions - Provide clear labels for visibility controls and audience selectors',
        implementation:
          'Every audience selector and privacy toggle must have a descriptive label explaining what it controls and who is affected',
      },
    ],

    ethics: [
      {
        concern: 'Anxiety-Driven Engagement',
        severity: 'critical',
        explanation:
          'Using spotlight anxiety (e.g., "who viewed your profile") to drive addictive checking behavior',
        mitigation:
          'Provide visibility features as informational tools, not engagement hooks. Avoid notification-driven anxiety loops.',
      },
      {
        concern: 'Forced Public Exposure',
        severity: 'critical',
        explanation:
          'Requiring public sharing of activity, achievements, or personal information to use features',
        mitigation:
          'Never gate functionality behind social sharing. Provide fully functional private alternatives for every social feature.',
      },
      {
        concern: 'Surveillance by Design',
        severity: 'high',
        explanation:
          'Building features that inherently surveil user behavior and broadcast it to others',
        mitigation:
          'Audit every social feature for surveillance implications. Default to minimal data collection and sharing.',
      },
      {
        concern: 'Exploiting Social Anxiety',
        severity: 'high',
        explanation:
          'Designing premium features that monetize spotlight anxiety (pay to see who viewed you, pay for private mode)',
        mitigation:
          'Make basic privacy controls free. Premium features should add value, not exploit anxiety as a paywall.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'The Spotlight Effect in Social Judgment: An Egocentric Bias in Estimates of the Salience of One\'s Own Actions and Appearance',
        author: 'Gilovich, T., Medvec, V. H., & Savitsky, K.',
        year: 2000,
        doi: '10.1037/0022-3514.78.2.211',
        description:
          'The foundational paper introducing the spotlight effect, demonstrating that people consistently overestimate how much others notice their appearance and behavior',
        type: 'foundational',
      },
      {
        title: 'The Illusion of Transparency: Biased Assessments of Others\' Ability to Read One\'s Emotional States',
        author: 'Gilovich, T., Savitsky, K., & Medvec, V. H.',
        year: 1998,
        doi: '10.1037/0022-3514.75.2.332',
        description:
          'Closely related research showing people overestimate how visible their internal states are to others',
        type: 'foundational',
      },
      {
        title: 'The Spotlight Effect Revisited: Overestimating the Manifest Variability of Our Actions and Appearance',
        author: 'Gilovich, T., & Savitsky, K.',
        year: 2002,
        description:
          'Follow-up research extending the spotlight effect to changes in appearance and behavior over time',
        type: 'advanced',
      },
    ],

    books: [
      {
        title: 'The Wisest One in the Room',
        author: 'Gilovich, Thomas & Ross, Lee',
        year: 2015,
        isbn: '9781451677553',
        description:
          'Gilovich\'s accessible discussion of the spotlight effect and its real-world implications for social behavior',
        type: 'foundational',
      },
      {
        title: 'Designing for Behavior Change',
        author: 'Wendel, Stephen',
        year: 2020,
        isbn: '9781492056034',
        description:
          'Practical guide to applying behavioral science including social biases to product design',
        type: 'practical',
      },
    ],

    articles: [
      {
        title: 'Privacy by Design: Principles for User-Centered Privacy',
        author: 'Nielsen Norman Group',
        url: 'https://www.nngroup.com/articles/privacy-design/',
        description:
          'Practical guidelines for designing privacy-respecting interfaces that account for social anxiety',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'The Spotlight Effect: Why No One Is Watching You',
        author: 'Thomas Gilovich (TEDx)',
        url: 'https://www.youtube.com/watch?v=e1s6oERn0n0',
        description:
          'Thomas Gilovich explains his research on the spotlight effect and its everyday implications',
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
