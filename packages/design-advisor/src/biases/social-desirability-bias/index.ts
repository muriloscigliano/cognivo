/**
 * SOCIAL DESIRABILITY BIAS
 *
 * The tendency to answer questions or behave in ways that will be
 * viewed favorably by others, rather than truthfully.
 */

import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const socialDesirabilityBias: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'social-desirability-bias',
    name: 'Social Desirability Bias',
    aliases: ['Social Approval Bias', 'Impression Management', 'Self-Presentation Bias'],
    category: BiasCategory.COGNITIVE,
    relatedCategories: [
      BiasCategory.DECISION_MAKING,
      BiasCategory.PERCEPTION,
    ],
    tags: [
      'surveys',
      'feedback',
      'anonymity',
      'self-report',
      'user-research',
      'privacy',
      'honesty',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple:
      'People tend to answer questions or behave in ways that will be viewed favorably by others, rather than truthfully.',

    detailed: `Social desirability bias is the tendency for people to present themselves in a favorable light when they believe they are being observed or judged. Instead of responding truthfully, individuals adjust their answers, preferences, and behaviors to align with perceived social norms, cultural expectations, or the anticipated approval of others.

This bias is pervasive in surveys, user research, feedback forms, and any context where users know their responses are being recorded. People over-report socially desirable behaviors (exercising, reading, donating) and under-report undesirable ones (procrastinating, binge-watching, overspending).

In UX and product design, social desirability bias compromises the quality of user research data, distorts feedback channels, and shapes how users interact with public-facing features. Designers must account for this bias by creating environments that encourage honest expression — through anonymity, private interactions, and non-judgmental framing.`,

    psychologyBasis: {
      discoveredBy: 'Douglas P. Crowne and David Marlowe',
      year: 1960,
      theory: 'Social Desirability Theory / Need for Approval',
      mechanism: `People modify their self-presentation to gain social approval and avoid disapproval. This happens through two distinct processes:

1. **Self-Deceptive Enhancement**: Unconsciously holding an overly positive self-view — people genuinely believe their idealized version of themselves
2. **Impression Management**: Consciously tailoring responses to create a favorable impression on a specific audience
3. **Norm Adherence**: Adjusting behavior to match perceived cultural or group norms, even when private views differ
4. **Evaluation Apprehension**: Heightened concern about being judged triggers more cautious, socially acceptable responses
5. **Demand Characteristics**: Participants infer what the "correct" or "expected" answer is and provide it rather than their true response

The bias is strongest when responses are identifiable, when the topic is sensitive, and when there is a clear socially desirable answer.`,
    },

    realWorldExample: `Crowne and Marlowe (1960) developed the Marlowe-Crowne Social Desirability Scale, demonstrating that participants who scored high on the scale systematically distorted their responses on other surveys to appear more virtuous, agreeable, and socially conforming. For instance, when asked "Have you ever been jealous of someone else's good fortune?", high scorers would deny it — despite jealousy being a universal human experience. This foundational work revealed that self-report data is systematically contaminated by the desire to look good.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `Social desirability bias directly affects the accuracy of user feedback, survey responses, and behavioral data. It distorts every channel where users know they are being observed or evaluated. Designers must account for this by:

- Providing anonymous feedback mechanisms to elicit honest responses
- Designing surveys that minimize social pressure and judgment cues
- Creating private interaction modes for sensitive features
- Separating public-facing behavior from private decision-making
- Using indirect measurement techniques alongside direct self-report`,

    whenToUse: [
      {
        title: 'Anonymous Feedback Systems',
        scenario:
          'When collecting honest opinions about products, services, or workplace culture',
        example:
          'Employee satisfaction surveys with guaranteed anonymity and no identifying metadata, encouraging candid feedback',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Private Voting and Rating',
        scenario: 'When users need to express preferences without social judgment',
        example:
          'Allow users to rate content privately before showing aggregate results, preventing conformity to visible majority opinion',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Incognito and Private Modes',
        scenario: 'When users want to explore content without social consequences',
        example:
          'Offer private browsing or incognito search modes so users can research sensitive topics without fear of judgment',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Confidential Feedback Channels',
        scenario: 'When collecting feedback about authority figures or sensitive topics',
        example:
          'Provide a confidential channel for reporting concerns, with clear guarantees that identity will not be disclosed',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Survey Design for Sensitive Topics',
        scenario: 'When asking about health, finances, or stigmatized behaviors',
        example:
          'Use indirect questioning techniques, randomized response, or normalized framing ("Many people experience X. How often do you?") to reduce social pressure',
        impact: ImpactLevel.HIGH,
      },
    ],

    whenToAvoid: [
      {
        title: 'Public Accountability Features',
        reason:
          'Sometimes social desirability pressure is beneficial — it motivates positive behavior',
        consequence:
          'Removing all social pressure can reduce motivation for pro-social actions like fitness goals or learning streaks',
        alternative:
          'Give users control over what is public vs private, letting them opt into social accountability',
      },
      {
        title: 'Community Trust and Safety',
        reason:
          'Complete anonymity can enable toxic behavior and reduce accountability',
        consequence:
          'Anonymous forums often devolve into harassment and low-quality content',
        alternative:
          'Use pseudonymity (consistent identity without real name) to balance honesty with accountability',
      },
      {
        title: 'Identity Verification Contexts',
        reason:
          'Some scenarios require verified, attributable responses for legal or safety reasons',
        consequence:
          'Anonymous medical or financial advice could be dangerous without accountability',
        alternative:
          'Collect identity where legally required but separate it from response data where possible',
      },
      {
        title: 'Collaborative Decision-Making',
        reason:
          'Fully private input can prevent productive group discussion and consensus-building',
        consequence:
          'Teams may struggle to align when all opinions are hidden',
        alternative:
          'Use anonymous initial input followed by structured group discussion of aggregated themes',
      },
    ],

    commonMistakes: [
      {
        title: 'Asking Leading Questions',
        description:
          'Survey questions that signal the "right" answer through framing or loaded language',
        why: 'Users detect the expected response and provide it instead of their honest opinion',
        fix: 'Use neutral language, avoid value-laden terms, and randomize response options',
      },
      {
        title: 'Visible Responses in Group Settings',
        description:
          'Collecting feedback in meetings or group calls where responses are visible to peers and managers',
        why: 'Social presence triggers impression management, suppressing dissenting or negative feedback',
        fix: 'Collect individual responses privately before group discussion; use anonymous polling tools',
      },
      {
        title: 'Identifiable "Anonymous" Surveys',
        description:
          'Claiming anonymity but collecting metadata (IP, device, timestamp) that could identify respondents',
        why: 'Users suspect they can be identified and self-censor accordingly, defeating the purpose of anonymity',
        fix: 'Strip all identifying metadata, use third-party survey tools, and clearly communicate data handling',
      },
      {
        title: 'Public-Only Feedback Mechanisms',
        description:
          'Only offering public review systems without private feedback options',
        why: 'Users avoid leaving negative or nuanced feedback that could reflect poorly on them',
        fix: 'Offer both public reviews and private feedback channels; make private the default for sensitive topics',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.MEDIUM,
        description:
          'Layout affects whether feedback feels private or exposed',
        examples: [
          'Feedback forms embedded in public pages feel less anonymous than dedicated private pages',
          'Positioning survey inputs away from identifying information reduces association anxiety',
          'Separate private feedback sections from public profile areas',
          'Modal overlays for feedback can feel more private than inline forms',
        ],
      },
      typography: {
        level: ImpactLevel.LOW,
        description:
          'Text tone and language can signal judgment or neutrality',
        examples: [
          'Neutral, non-judgmental language in survey questions reduces bias',
          'Avoid value-laden headers like "How well did we do?" (implies expectation of positive response)',
          'Use matter-of-fact phrasing: "Describe your experience" vs "Tell us how great it was"',
          'Small, conversational text can feel less formal and more honest',
        ],
      },
      color: {
        level: ImpactLevel.LOW,
        description:
          'Color can inadvertently signal preferred responses',
        examples: [
          'Green for positive ratings and red for negative can bias toward green selections',
          'Neutral, uniform colors for rating scales reduce directional pressure',
          'Avoid color-coding that maps to good/bad for survey responses',
          'Privacy-related UI benefits from calm, non-threatening color palettes',
        ],
      },
      interaction: {
        level: ImpactLevel.CRITICAL,
        description:
          'Interaction design determines whether users feel observed or private',
        examples: [
          'Anonymous submission flows remove identity cues from the interaction',
          'Private mode toggles let users control their visibility',
          'Delayed or batched feedback display prevents identification by timing',
          'Secret ballot interactions (hidden votes) encourage honest expression',
        ],
      },
      content: {
        level: ImpactLevel.HIGH,
        description:
          'Content framing shapes whether users feel safe to be honest',
        examples: [
          'Normalizing statements ("Many users feel this way...") reduce stigma of honest answers',
          'Explicit privacy guarantees in survey introductions increase candor',
          'Indirect questioning ("How do people you know feel about X?") bypasses self-presentation',
          'Clear data handling policies build trust for honest responses',
        ],
      },
      accessibility: {
        level: ImpactLevel.MEDIUM,
        description:
          'Accessible design must preserve privacy and anonymity guarantees',
        examples: [
          'Screen readers announcing "anonymous survey" reinforces privacy for visually impaired users',
          'Keyboard-only users should have equal access to private feedback channels',
          'ARIA labels should not inadvertently expose identifying information',
          'Assistive technology interactions must maintain the same level of anonymity as visual interfaces',
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
        title: 'Anonymous Employee Pulse Survey',
        description:
          'Workplace feedback tool with strong anonymity guarantees and normalized framing',
        code: `<div class="pulse-survey">
  <div class="anonymity-badge">
    <span class="icon">🔒</span>
    <p><strong>Fully Anonymous</strong></p>
    <p class="detail">Your identity is never recorded. Results are only
    shown in aggregate when 5+ responses are collected.</p>
  </div>

  <div class="question">
    <p>Many employees experience challenges with their direct manager.
    How would you describe your experience?</p>
    <div class="scale">
      <label><input type="radio" name="q1" value="1"> Very Difficult</label>
      <label><input type="radio" name="q1" value="2"> Somewhat Difficult</label>
      <label><input type="radio" name="q1" value="3"> Neutral</label>
      <label><input type="radio" name="q1" value="4"> Somewhat Positive</label>
      <label><input type="radio" name="q1" value="5"> Very Positive</label>
    </div>
  </div>

  <p class="reassurance">Your response will be combined with others.
  No individual answers are ever shared.</p>
</div>`,
        explanation:
          'The normalizing framing ("Many employees experience challenges...") reduces stigma. The anonymity badge and minimum-threshold guarantee (5+ responses) build trust. Neutral scale labels avoid signaling a preferred answer.',
        principle:
          'Anonymity guarantees + normalized framing elicit more honest feedback',
        metrics: {
          before: '62% positive ratings with identified surveys',
          after: '41% positive ratings with anonymous + normalized surveys',
          improvement: 'More accurate data: honest feedback increased 34%, revealing previously hidden issues',
        },
      },
      {
        title: 'Private Rating Before Public Display',
        description:
          'Review system that collects private opinions before showing community ratings',
        code: `<div class="review-flow">
  <!-- Step 1: Private rating (no external influence) -->
  <div class="private-rating">
    <h3>What did you think?</h3>
    <p class="privacy-note">Your rating is private until you choose to share it.</p>
    <div class="stars" role="radiogroup" aria-label="Your private rating">
      <button aria-label="1 star">★</button>
      <button aria-label="2 stars">★</button>
      <button aria-label="3 stars">★</button>
      <button aria-label="4 stars">★</button>
      <button aria-label="5 stars">★</button>
    </div>
  </div>

  <!-- Step 2: After private rating, show community -->
  <div class="community-context" hidden>
    <p>Community average: 3.8 / 5 (2,341 ratings)</p>
    <label>
      <input type="checkbox" name="share">
      Share my rating publicly (optional)
    </label>
  </div>
</div>`,
        explanation:
          'Collecting the private rating before revealing community scores prevents conformity bias. Making public sharing opt-in respects users who prefer privacy. This yields more diverse, honest ratings.',
        principle:
          'Private-first, public-optional rating preserves honest expression',
      },
      {
        title: 'Confidential Reporting Channel',
        description:
          'Workplace or product reporting system with strong confidentiality guarantees',
        code: `<div class="confidential-report">
  <h3>Share a Concern</h3>

  <div class="trust-indicators">
    <div class="indicator">
      <span class="icon">🔒</span>
      <span>End-to-end encrypted</span>
    </div>
    <div class="indicator">
      <span class="icon">👤</span>
      <span>Identity never shared with subject of report</span>
    </div>
    <div class="indicator">
      <span class="icon">📊</span>
      <span>Reviewed only by independent ethics team</span>
    </div>
  </div>

  <textarea
    placeholder="Describe your concern. Be as specific as you feel comfortable."
    aria-label="Confidential report"
  ></textarea>

  <div class="identity-choice">
    <label>
      <input type="radio" name="identity" value="anonymous" checked>
      Submit anonymously
    </label>
    <label>
      <input type="radio" name="identity" value="confidential">
      Include my name (shared only with ethics team)
    </label>
  </div>

  <button class="primary">Submit Confidentially</button>
</div>`,
        explanation:
          'Multiple trust indicators (encryption, independent review, identity protection) address the fear of retaliation that drives social desirability bias. Giving users control over their identity level empowers honest reporting.',
        principle:
          'Layered trust signals and identity control encourage honest disclosure of sensitive concerns',
      },
    ],

    bad: [
      {
        title: 'Public-Only Feedback with Social Pressure',
        description:
          'Review form that ties feedback to public profile with visible identity',
        code: `<!-- DON'T DO THIS -->
<div class="review-form">
  <div class="reviewer-identity">
    <img src="avatar.jpg" alt="Your photo">
    <p>Reviewing as <strong>Jane Smith</strong></p>
    <p class="public-note">This review will appear on your public profile</p>
  </div>

  <h3>How was your experience with Dr. Johnson?</h3>
  <div class="stars">★ ★ ★ ★ ★</div>
  <textarea placeholder="Write your public review..."></textarea>

  <p class="warning">Dr. Johnson will see your name and review.</p>
  <button>Post Review</button>
</div>`,
        explanation:
          'Tying the review to a public profile and informing the user that the subject will see their name and review virtually guarantees inflated positive ratings. Users will avoid honest negative feedback to maintain their social relationships.',
        principle:
          'Never force public identity on sensitive feedback — it guarantees dishonest data',
      },
      {
        title: 'Leading Survey with Expected Answers',
        description:
          'NPS survey with loaded language that signals the desired response',
        code: `<!-- DON'T DO THIS -->
<div class="survey">
  <h3>We love hearing from our amazing customers! 🎉</h3>
  <p>Our team worked incredibly hard on this feature.
  How much do you love it?</p>

  <div class="options">
    <label><input type="radio" value="love"> I love it! 💕</label>
    <label><input type="radio" value="like"> It's pretty good 👍</label>
    <label><input type="radio" value="okay"> It's okay</label>
    <label><input type="radio" value="dislike"> Needs work</label>
  </div>

  <p class="note">Your response will be shared with the product team
  who built this feature.</p>
</div>`,
        explanation:
          'The emotional language ("love," "amazing," "incredibly hard"), unbalanced scale (2 positive, 1 neutral, 1 negative), and note about the team seeing responses all trigger social desirability bias. Users feel guilted into positive responses.',
        principle:
          'Emotionally loaded framing and unbalanced scales produce artificially positive data',
      },
      {
        title: 'Falsely Anonymous Survey',
        description:
          'Survey claiming anonymity while collecting identifying information',
        code: `<!-- DON'T DO THIS -->
<div class="survey">
  <h3>Anonymous Employee Survey</h3>
  <p>Your responses are completely anonymous.</p>

  <!-- But then asks: -->
  <label>Department: <select>...</select></label>
  <label>Role level: <select>...</select></label>
  <label>Years at company: <select>...</select></label>
  <label>Office location: <select>...</select></label>

  <!-- With a small department, this combination uniquely identifies people -->
</div>`,
        explanation:
          'Collecting department, role, tenure, and location can uniquely identify individuals in small teams. Employees recognize this and self-censor, making the "anonymous" label counterproductive — it erodes trust more than having no anonymity claim at all.',
        principle:
          'False anonymity is worse than honest identification — it destroys trust in all future surveys',
      },
    ],

    realWorld: [
      {
        company: 'Glassdoor',
        product: 'Anonymous Company Reviews',
        description: 'Glassdoor allows employees to review their employers anonymously. Reviews are only published when there are enough responses to prevent identification. This design directly addresses social desirability bias by removing fear of retaliation.',
        effectiveness: 'very-effective',
        analysis: 'By guaranteeing anonymity, Glassdoor obtains far more candid workplace feedback than identified review systems. The platform has become a trusted source precisely because reviews reflect honest rather than socially desirable opinions.',
      },
      {
        company: 'Google Chrome',
        product: 'Incognito Mode',
        description: 'Chrome Incognito mode lets users browse without recording history, cookies, or site data. This enables users to research sensitive topics (health conditions, financial problems, personal questions) without fear of judgment.',
        effectiveness: 'very-effective',
        analysis: 'Incognito mode acknowledges that users have legitimate private interests they would not search for in a logged, observable mode. Usage data confirms that incognito searches differ significantly from regular searches, revealing the gap between public and private interests.',
      },
      {
        company: 'SurveyMonkey',
        product: 'Anonymous Response Collector',
        description: 'SurveyMonkey offers an Anonymous Response Collector that strips all identifying information (IP address, email, custom data) from survey responses. A visible "Anonymous" badge is displayed to respondents throughout the survey.',
        effectiveness: 'effective',
        analysis: 'The visible anonymity badge throughout the survey continuously reassures respondents, reducing self-censoring as they progress through sensitive questions. Surveys using this feature show measurably different response distributions compared to identified surveys.',
      },
      {
        company: 'Reddit',
        product: 'Pseudonymous Posting',
        description: 'Reddit uses pseudonymous accounts rather than real names, allowing users to discuss sensitive personal topics, share unpopular opinions, and seek advice without connecting to their real-world identity.',
        effectiveness: 'effective',
        analysis: 'Pseudonymity balances honesty with accountability. Users share far more candidly than on real-name platforms (Facebook, LinkedIn), while persistent usernames still discourage the worst anonymous behavior. Subreddits like r/offmychest and r/personalfinance thrive because of this balance.',
      },
    ],

    abTests: [
      {
        title: 'Anonymous vs Identified Employee Surveys',
        hypothesis:
          'Anonymous surveys will yield more honest (lower satisfaction) scores than identified surveys',
        controlVersion: {
          description:
            'Employee satisfaction survey where responses are linked to employee names and shared with managers',
          metrics: {
            conversionRate: '78% completion rate',
            timeOnPage: '4:12',
            scrollDepth: '92%',
          },
        },
        treatmentVersion: {
          description:
            'Same survey questions but fully anonymous with visible anonymity guarantees and minimum response threshold before results are shown',
          metrics: {
            conversionRate: '85% completion rate',
            timeOnPage: '6:45',
            scrollDepth: '95%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Anonymous surveys revealed 34% more negative feedback on management quality, 28% more honest reporting of work-life balance issues, and 41% more specific actionable suggestions. Completion rates also increased because employees felt safe completing the full survey.',
          learnings: [
            'Identified surveys systematically inflate satisfaction scores by 20-35%',
            'Free-text responses are 3x longer and more specific in anonymous surveys',
            'Sensitive topics (compensation, management, harassment) show the largest honesty gap',
            'Visible anonymity guarantees throughout the survey are critical, not just at the start',
          ],
        },
      },
      {
        title: 'Private-First vs Public-First Rating',
        hypothesis:
          'Collecting private ratings before showing community scores will produce more diverse ratings',
        controlVersion: {
          description:
            'Product review page showing average rating (4.5 stars) and existing reviews before the user rates',
          metrics: {
            conversionRate: '23% leave a rating',
            clickThroughRate: '89% of ratings within 1 star of displayed average',
          },
        },
        treatmentVersion: {
          description:
            'Users rate privately first, then see community average and existing reviews after submitting',
          metrics: {
            conversionRate: '31% leave a rating',
            clickThroughRate: '62% of ratings within 1 star of community average',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Private-first ratings showed significantly more variance and more honest distribution. Users gave lower ratings for mediocre products and higher ratings for genuinely excellent ones, rather than clustering around the visible average.',
          learnings: [
            'Showing community ratings before user input creates conformity pressure',
            'Private-first approach yields 35% more rating variance (more honest signal)',
            'Users are more likely to leave a rating when not pressured to conform',
            'The resulting data is more useful for product improvement because it reflects genuine opinions',
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
        name: 'Visible Identity on Feedback',
        description:
          'User name, photo, or profile linked to feedback forms, reviews, or survey responses',
        howToSpot:
          'Look for avatar images, display names, or "Posting as..." labels near input fields',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Public Response Indicators',
        description:
          'Labels or warnings that responses will be visible to others, especially to the subject of feedback',
        howToSpot:
          'Look for "This will be posted publicly" or "Your manager will see this" notices',
        severity: ImpactLevel.CRITICAL,
      },
      {
        name: 'Leading Question Language',
        description:
          'Emotionally loaded, value-laden, or directionally biased question framing',
        howToSpot:
          'Check for words like "love," "amazing," "how much did you enjoy," or unbalanced scales',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Demographic Overreach',
        description:
          'Collecting excessive demographic data in supposedly anonymous surveys',
        howToSpot:
          'Count how many demographic fields are collected; assess whether combinations could identify individuals',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Missing Privacy Indicators',
        description:
          'Feedback forms that lack any anonymity guarantees or privacy assurances',
        howToSpot:
          'Look for absence of lock icons, privacy badges, or data handling explanations near sensitive inputs',
        severity: ImpactLevel.MEDIUM,
      },
    ],

    patterns: [
      {
        name: 'Identity-Linked Feedback Pattern',
        description: 'Feedback mechanisms that tie responses to identifiable user profiles',
        indicators: [
          'User avatar or name displayed on feedback forms',
          'Responses posted to public profiles',
          'Subject of feedback can see reviewer identity',
          'Login required for submitting anonymous feedback',
        ],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Loaded Framing Pattern',
        description: 'Survey or feedback questions framed to signal desired responses',
        indicators: [
          'Emotionally charged language in questions',
          'Unbalanced response scales (more positive than negative options)',
          'Leading introductions ("We worked hard on...")',
          'Guilt-inducing context before questions',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'False Anonymity Pattern',
        description: 'Claiming anonymity while collecting identifiable metadata or demographics',
        indicators: [
          'Anonymous label with extensive demographic collection',
          'Small-group surveys where demographics identify individuals',
          'Tracking metadata (IP, timestamp, device) in "anonymous" surveys',
          'Unique survey links tied to individual email addresses',
        ],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Social Pressure Pattern',
        description: 'Design elements that introduce social observation or accountability pressure',
        indicators: [
          'Showing others\' responses before collecting user input',
          'Real-time response counters or live result displays',
          'Peer comparison features on sensitive topics',
          'Manager or authority figure visibility in feedback flows',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'medium',
      },
    ],

    checklistQuestions: [
      'Is the user\'s identity connected to their feedback or survey responses?',
      'Can the subject of feedback identify who provided it?',
      'Are survey questions framed neutrally without signaling a preferred answer?',
      'Is the response scale balanced (equal positive and negative options)?',
      'Could collected demographics identify individuals in small groups?',
      'Are anonymity guarantees clearly communicated throughout the process?',
      'Is community opinion shown before or after individual input is collected?',
      'Are there private alternatives for sensitive feedback topics?',
      'Does the UI create any social pressure to respond in a particular way?',
      'Is metadata (IP, timing, device) stripped from anonymous responses?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in social desirability bias.

Analyze the provided design for social desirability bias patterns. Identify:

1. **Identity Exposure**: How user identity is connected to feedback, surveys, or opinions
2. **Question Framing**: Whether questions are neutral or signal socially desirable answers
3. **Anonymity Design**: How anonymity and privacy are communicated and implemented
4. **Social Pressure**: Elements that create observation or conformity pressure
5. **Sensitive Topics**: Whether sensitive questions have appropriate privacy protections

For each pattern found:
- Identify where social desirability bias may contaminate data
- Assess whether anonymity guarantees are genuine
- Determine if question framing is neutral or leading
- Evaluate whether users feel safe to respond honestly
- Suggest improvements for more honest data collection

Consider:
- Are feedback channels designed for honesty or for flattering responses?
- Do anonymous surveys truly protect identity (including small-group demographics)?
- Is community opinion influencing individual input through ordering or visibility?
- Are sensitive topics given appropriate privacy protections?
- Could the design be reframed to elicit more truthful responses?

Provide actionable recommendations for reducing social desirability bias in the design.`,

    outputSchema: {
      type: 'object',
      properties: {
        socialDesirabilityPatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              identityExposure: { type: 'string' },
              socialPressure: { type: 'string' },
              honestyRisk: { type: 'string' },
              ethical: { type: 'boolean' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'identityExposure',
              'honestyRisk',
              'ethical',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            anonymityScore: { type: 'number' },
            questionNeutrality: { type: 'number' },
            privacyDesign: { type: 'number' },
            dataIntegrity: { type: 'number' },
          },
          required: [
            'anonymityScore',
            'questionNeutrality',
            'privacyDesign',
            'dataIntegrity',
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
        'socialDesirabilityPatterns',
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
        title: 'Identify Honesty-Sensitive Touchpoints',
        description:
          'Map all places in your product where users provide opinions, feedback, or self-report data',
        example:
          'Surveys, reviews, ratings, feedback forms, NPS scores, onboarding questions, preference settings',
        tips: [
          'Pay special attention to topics where there is a clear socially desirable answer',
          'Identify where user identity is connected to responses',
          'Note which feedback reaches authority figures or is publicly visible',
        ],
      },
      {
        step: 2,
        title: 'Design for Anonymity Where Appropriate',
        description:
          'Implement genuine anonymity for feedback on sensitive topics',
        example:
          'Use third-party survey tools, strip metadata, enforce minimum response thresholds before showing results',
        tips: [
          'Anonymity must be real, not cosmetic — strip IP, timing, and device data',
          'Set minimum response thresholds to prevent identification in small groups',
          'Use separate systems for anonymous and identified data to prevent linking',
        ],
      },
      {
        step: 3,
        title: 'Frame Questions Neutrally',
        description:
          'Remove all directional cues, emotional language, and social pressure from question design',
        example:
          'Instead of "How much did you enjoy our new feature?", ask "Describe your experience with the new feature"',
        tips: [
          'Use balanced scales with equal positive and negative options',
          'Avoid emotive language, exclamation marks, or loaded terms',
          'Normalize sensitive topics with framing like "Some people... How about you?"',
        ],
      },
      {
        step: 4,
        title: 'Separate Private Input from Public Display',
        description:
          'Collect honest opinions privately before exposing users to social information',
        example:
          'Collect user rating first, then show community average; let users choose whether to publish',
        tips: [
          'Never show aggregate opinions before collecting individual input',
          'Make public sharing opt-in, not opt-out',
          'Allow users to provide private feedback alongside any public review',
        ],
      },
      {
        step: 5,
        title: 'Communicate Privacy Clearly and Continuously',
        description:
          'Display privacy guarantees throughout the feedback process, not just at the beginning',
        example:
          'Show a persistent anonymity badge, explain data handling at each section, reiterate at submission',
        tips: [
          'Use lock icons, privacy badges, and clear plain-language guarantees',
          'Explain exactly who will see responses and in what form',
          'Reiterate privacy at submission to reinforce trust at the decision point',
        ],
      },
    ],

    dos: [
      'Provide genuinely anonymous channels for sensitive feedback',
      'Use neutral, balanced language in survey questions and response scales',
      'Collect private opinions before revealing community or aggregate data',
      'Normalize sensitive topics to reduce the stigma of honest responses',
      'Clearly communicate privacy guarantees throughout the feedback process',
      'Use indirect measurement techniques alongside direct self-report',
      'Set minimum response thresholds before displaying results from small groups',
      'Give users control over what is public vs private',
    ],

    donts: [
      'Don\'t tie user identity to sensitive feedback without offering anonymous alternatives',
      'Don\'t use leading, loaded, or emotionally charged survey questions',
      'Don\'t claim anonymity while collecting identifying metadata or demographics',
      'Don\'t show community opinions before collecting individual responses',
      'Don\'t guilt users into positive responses by mentioning team effort',
      'Don\'t make public feedback the only option for sensitive topics',
      'Don\'t collect excessive demographics in anonymous small-group surveys',
      'Don\'t share individual responses with the subject of feedback',
    ],

    bestPractices: [
      {
        title: 'Genuine Anonymity, Not Theater',
        description:
          'Ensure anonymous surveys truly cannot identify respondents through metadata, demographics, or timing',
        rationale:
          'Users quickly detect false anonymity and will self-censor in all future surveys, not just the current one',
        example:
          'Use third-party tools, strip all metadata, enforce minimum response thresholds, avoid fine-grained demographics in small teams',
      },
      {
        title: 'Private-First, Public-Optional',
        description:
          'Always collect individual input before exposing users to social information or peer responses',
        rationale:
          'Seeing others\' responses before giving your own creates conformity pressure and anchoring to visible norms',
        example:
          'Rate a product privately, then see community average; opt-in to share your review publicly',
      },
      {
        title: 'Normalize Sensitive Disclosures',
        description:
          'Frame sensitive questions with normalizing language that reduces the stigma of honest answers',
        rationale:
          'When people know their experience is common, they feel safer disclosing it honestly',
        example:
          '"Many professionals experience burnout. On a scale of 1-5, how would you rate your current stress level?"',
      },
      {
        title: 'Balanced Response Scales',
        description:
          'Design response options with equal positive and negative anchors and a true neutral midpoint',
        rationale:
          'Unbalanced scales (more positive options than negative) systematically inflate positive responses',
        example:
          'Use: Very Negative / Negative / Neutral / Positive / Very Positive — not: Okay / Good / Great / Amazing',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships - Anonymity indicators must be programmatically determinable',
        implementation:
          'Use ARIA labels and roles to convey anonymity status to assistive technology. Screen readers should announce "This survey is anonymous" at the start of anonymous forms.',
      },
      {
        wcagLevel: 'AA',
        criterion: '3.3.2',
        guideline:
          'Labels or Instructions - Clearly label private vs public feedback channels',
        implementation:
          'Provide clear, accessible labels indicating whether a response will be anonymous, confidential, or public. Use consistent iconography with text alternatives.',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.4.1',
        guideline:
          'Use of Color - Don\'t use color alone to indicate anonymity status',
        implementation:
          'Combine lock icons with text labels and ARIA attributes to convey privacy status, not just green vs red color coding.',
      },
    ],

    ethics: [
      {
        concern: 'False Anonymity',
        severity: 'critical',
        explanation:
          'Claiming survey responses are anonymous while collecting identifiable metadata or fine-grained demographics that can uniquely identify individuals',
        mitigation:
          'Conduct a de-anonymization audit on all anonymous surveys. Strip metadata, limit demographics, enforce minimum response thresholds. Use third-party tools when possible.',
      },
      {
        concern: 'Weaponized Feedback',
        severity: 'high',
        explanation:
          'Anonymous feedback channels can be used to bully, harass, or make false accusations without accountability',
        mitigation:
          'Implement content moderation, require specific and constructive feedback, and offer confidential (identity known to mediator but not subject) as well as fully anonymous options.',
      },
      {
        concern: 'Manipulative Question Framing',
        severity: 'high',
        explanation:
          'Intentionally framing questions to elicit positive feedback for reporting or marketing purposes',
        mitigation:
          'Use neutral, pre-validated survey instruments. Have an independent party review questions for leading language before deployment.',
      },
      {
        concern: 'Data Misuse After Collection',
        severity: 'critical',
        explanation:
          'Using honest, privately shared data in ways that could harm or identify the respondent',
        mitigation:
          'Clearly define and communicate data retention, access, and usage policies before collection. Never re-identify anonymous data. Store anonymous and identified data in separate systems.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'A New Scale of Social Desirability Independent of Psychopathology',
        author: 'Crowne, D. P., & Marlowe, D.',
        year: 1960,
        doi: '10.1037/h0047358',
        description:
          'The foundational paper introducing the Marlowe-Crowne Social Desirability Scale, establishing social desirability as a measurable construct that systematically distorts self-report data',
        type: 'foundational',
      },
      {
        title: 'Two-Component Models of Socially Desirable Responding',
        author: 'Paulhus, D. L.',
        year: 1984,
        doi: '10.1037/0022-3514.46.3.598',
        description:
          'Distinguished between self-deceptive enhancement (unconscious) and impression management (conscious), providing the theoretical framework for understanding two mechanisms of social desirability bias',
        type: 'foundational',
      },
      {
        title: 'Socially Desirable Responding in Web-Based Surveys',
        author: 'Dodou, D., & de Winter, J. C. F.',
        year: 2014,
        description:
          'Meta-analysis comparing social desirability effects in online vs paper surveys, relevant to digital product design',
        type: 'practical',
      },
      {
        title: 'The Effect of Anonymity on Responses to Sensitive Questions',
        author: 'Lelkes, Y., Krosnick, J. A., Marx, D. M., Judd, C. M., & Park, B.',
        year: 2012,
        description:
          'Demonstrates how anonymity affects response patterns on sensitive topics, with direct implications for survey and feedback design',
        type: 'practical',
      },
    ],

    books: [
      {
        title: 'The Psychology of Survey Response',
        author: 'Tourangeau, R., Rips, L. J., & Rasinski, K.',
        year: 2000,
        isbn: '9780521576291',
        description:
          'Comprehensive treatment of social desirability and other response biases in survey methodology',
        type: 'foundational',
      },
      {
        title: 'Thinking, Fast and Slow',
        author: 'Kahneman, Daniel',
        year: 2011,
        isbn: '9780374275631',
        description:
          'Covers social cognition and self-presentation biases within the broader framework of cognitive biases',
        type: 'foundational',
      },
    ],

    articles: [
      {
        title: 'Avoiding Social Desirability Bias in UX Research',
        author: 'Nielsen Norman Group',
        url: 'https://www.nngroup.com/articles/social-desirability-bias/',
        description:
          'Practical guide to designing user research studies that minimize social desirability bias',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'Social Desirability Bias in Research',
        author: 'Research Methods',
        url: 'https://www.youtube.com/watch?v=social-desirability',
        description:
          'Overview of social desirability bias and its impact on research validity',
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
      'conformity-bias', // Social pressure to match group norms
      'hawthorne-effect', // Behavior changes when being observed
      'acquiescence-bias', // Tendency to agree regardless of content
      'self-serving-bias', // Presenting oneself favorably
    ],

    conflicts: [
      'anonymity-effect', // Anonymity reduces social desirability bias
      'online-disinhibition', // Digital contexts can reduce self-censoring
    ],

    confusedWith: [
      'conformity-bias', // Related but conformity is about matching group behavior, not self-presentation
      'hawthorne-effect', // Overlaps but Hawthorne is about behavior change under observation generally
      'demand-characteristics', // Related but demand characteristics are about guessing experimenter intent
    ],

    hierarchy: {
      parent: 'cognitive-bias',
      children: [
        'impression-management',
        'self-deceptive-enhancement',
      ],
    },
  },
};
