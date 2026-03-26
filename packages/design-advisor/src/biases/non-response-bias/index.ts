/**
 * NON-RESPONSE BIAS
 *
 * People who don't respond to surveys or feedback systematically
 * differ from those who do, skewing collected results.
 */

import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const nonResponseBias: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'non-response-bias',
    name: 'Non-Response Bias',
    aliases: ['Participation Bias', 'Self-Selection Bias', 'Silent Majority Bias'],
    category: BiasCategory.COGNITIVE,
    relatedCategories: [
      BiasCategory.DECISION_MAKING,
      BiasCategory.PERCEPTION,
    ],
    tags: [
      'feedback',
      'surveys',
      'data-quality',
      'sampling',
      'user-research',
      'silent-majority',
      'response-rates',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple:
      'People who don\'t respond to surveys or feedback systematically differ from those who do, skewing results.',

    detailed: `Non-response bias occurs when the people who choose not to respond to a survey, feedback request, or research study differ in meaningful ways from those who do respond. The resulting data represents only the self-selected subset of respondents, not the full population.

This bias is pervasive in digital product design because feedback mechanisms (NPS surveys, app reviews, support tickets, feature requests) inherently over-represent users with extreme opinions — either very satisfied or very frustrated — while the moderate majority stays silent. Decisions based solely on collected feedback therefore reflect a distorted picture of the user base.

Understanding non-response bias is critical for product teams because the "silent majority" often holds different views, experiences different problems, and uses the product in different ways than the vocal minority who respond to surveys, leave reviews, or submit feedback.`,

    psychologyBasis: {
      discoveredBy: 'Various researchers in survey methodology',
      year: 1977,
      theory: 'Survey Methodology and Sampling Theory',
      mechanism: `Non-response bias arises from systematic differences between respondents and non-respondents. This happens because:

1. **Motivation Asymmetry**: People with strong opinions (positive or negative) are more motivated to respond than those with moderate views
2. **Self-Selection**: Respondents opt in based on interest, time availability, or emotional engagement — creating a non-random sample
3. **Effort Threshold**: Surveys and feedback forms require effort; only users who perceive sufficient value or urgency will invest that effort
4. **Satisfaction Extremes**: Highly satisfied and highly dissatisfied users are disproportionately likely to respond, creating a bimodal distribution that misrepresents the moderate center
5. **Demographic Skew**: Certain demographics (age, tech literacy, cultural norms) systematically under-respond, further distorting results`,
    },

    realWorldExample: `Armstrong and Overton (1977) demonstrated that late respondents to mail surveys differed systematically from early respondents in attitudes and demographics. By comparing early vs. late responses, they showed that non-respondents likely held different views than the collected sample — a finding that has been replicated extensively in digital product research, where NPS scores, app store ratings, and customer surveys consistently over-represent extreme opinions.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `Non-response bias fundamentally affects how product teams collect, interpret, and act on user feedback. Designers must account for the silent majority by:

- Designing feedback collection that minimizes effort and maximizes response rates
- Building multiple channels for capturing passive behavioral signals alongside active feedback
- Analyzing who is NOT responding and why
- Conducting targeted outreach to under-represented user segments
- Using behavioral analytics to supplement self-reported feedback`,

    whenToUse: [
      {
        title: 'Feedback Collection Strategy',
        scenario:
          'When designing surveys, NPS prompts, or feedback mechanisms',
        example:
          'Use in-context micro-surveys (1-2 questions) triggered at natural completion points rather than standalone email surveys to increase response rates across all user segments',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Survey Response Rate Optimization',
        scenario: 'When response rates are low and collected data may not represent the full user base',
        example:
          'Offer multiple response formats (emoji scale, star rating, text) and reduce survey length to lower the effort threshold and capture responses from moderate users',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Silent Majority Consideration',
        scenario: 'When making product decisions based on user feedback data',
        example:
          'Cross-reference survey results with behavioral analytics (feature usage, session length, drop-off points) to validate whether vocal feedback represents actual user behavior',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Non-Responder Outreach',
        scenario: 'When key user segments are under-represented in feedback data',
        example:
          'Identify users who never respond to surveys and conduct targeted 1-on-1 interviews or usability tests with incentives to capture their perspectives',
        impact: ImpactLevel.MEDIUM,
      },
      {
        title: 'Churn Analysis',
        scenario: 'When understanding why users leave the product',
        example:
          'Design exit surveys that are short and immediate (before account deletion completes) and supplement with behavioral pattern analysis of churned users who never responded',
        impact: ImpactLevel.CRITICAL,
      },
    ],

    whenToAvoid: [
      {
        title: 'Over-Surveying',
        reason:
          'Aggressively pursuing non-respondents with repeated survey requests creates frustration and further reduces response rates',
        consequence:
          'Users feel harassed, response quality declines, and previously willing respondents start ignoring surveys too',
        alternative:
          'Use passive behavioral signals and analytics alongside targeted, infrequent survey touchpoints',
      },
      {
        title: 'Incentive Distortion',
        reason:
          'Heavy incentives for survey completion attract responses motivated by the reward rather than genuine feedback',
        consequence:
          'Collected data reflects incentive-seekers rather than actual user sentiment, introducing a different kind of bias',
        alternative:
          'Use modest, appropriate incentives and validate incentivized responses against organic feedback patterns',
      },
      {
        title: 'Ignoring Privacy Boundaries',
        reason:
          'Tracking non-responder behavior extensively to compensate for missing survey data can violate privacy expectations',
        consequence:
          'Loss of user trust, potential regulatory violations, and ethical concerns',
        alternative:
          'Use aggregated, anonymized behavioral analytics and be transparent about data collection practices',
      },
      {
        title: 'Forced Responses',
        reason:
          'Making feedback mandatory (blocking features behind surveys) eliminates non-response bias but creates resentment bias',
        consequence:
          'Low-quality responses from annoyed users, negative brand perception, and artificially inflated response rates',
        alternative:
          'Keep feedback optional but reduce friction; use contextual prompts at natural moments',
      },
    ],

    commonMistakes: [
      {
        title: 'Treating Feedback as Representative',
        description:
          'Assuming that collected survey responses reflect the views of all users',
        why: 'Self-selected respondents systematically differ from non-respondents in motivation, satisfaction, and demographics',
        fix: 'Always report response rates alongside results; weight or adjust findings based on known non-response patterns',
      },
      {
        title: 'Ignoring Response Rate Metrics',
        description:
          'Focusing only on survey results without tracking or reporting response rates',
        why: 'A 5% response rate means 95% of users are unrepresented; the results may be heavily skewed',
        fix: 'Track response rates by segment, set minimum thresholds for actionable data, and flag low-response segments',
      },
      {
        title: 'One-Channel Feedback',
        description:
          'Relying on a single feedback channel (e.g., only email surveys) to understand user sentiment',
        why: 'Different channels reach different user segments; email surveys may miss mobile-first or younger users entirely',
        fix: 'Deploy multiple feedback channels (in-app, email, SMS, contextual prompts) and compare results across channels',
      },
      {
        title: 'Survivorship Bias in Feedback',
        description:
          'Only collecting feedback from active users while ignoring churned or dormant users',
        why: 'Active users have fundamentally different experiences than those who left; their feedback cannot represent departed users',
        fix: 'Implement exit surveys, analyze behavioral patterns before churn, and conduct win-back research with former users',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.HIGH,
        description:
          'Survey and feedback placement in the interface affects who responds and when',
        examples: [
          'In-context feedback prompts near completed actions yield higher and more representative response rates',
          'Buried feedback links in footers attract only highly motivated users, skewing results',
          'Modal surveys interrupt flow and bias toward users who are patient enough to complete them',
          'Inline micro-surveys within content attract broader participation than standalone forms',
        ],
      },
      typography: {
        level: ImpactLevel.LOW,
        description:
          'Text clarity in survey questions affects response quality and willingness to respond',
        examples: [
          'Clear, concise question text reduces abandonment mid-survey',
          'Large, readable scales improve response accuracy for all demographics',
          'Progress indicators reduce perceived survey length and increase completion',
          'Accessible font sizes ensure older users and those with visual impairments can respond',
        ],
      },
      color: {
        level: ImpactLevel.LOW,
        description:
          'Visual treatment of feedback prompts affects response likelihood',
        examples: [
          'Subtle, non-intrusive feedback prompts avoid survey fatigue',
          'Color-coded satisfaction scales (red-yellow-green) make responding faster and more intuitive',
          'High-contrast feedback buttons improve visibility for accessibility',
          'Warm, inviting colors on feedback prompts feel less clinical and increase willingness to respond',
        ],
      },
      interaction: {
        level: ImpactLevel.CRITICAL,
        description:
          'Feedback interaction design determines effort threshold and who participates',
        examples: [
          'One-tap emoji ratings have 3-5x higher response rates than text-based surveys',
          'Progressive disclosure (start simple, optionally add detail) captures broader participation',
          'Timing of feedback prompts after task completion captures in-the-moment sentiment',
          'Skip and dismiss options respect user autonomy and reduce resentment',
        ],
      },
      content: {
        level: ImpactLevel.HIGH,
        description:
          'Question framing and survey content influence who responds and how they answer',
        examples: [
          'Leading questions attract confirmatory responses from already-positive users',
          'Neutral, open-ended questions reduce self-selection bias in who chooses to respond',
          'Transparent communication about why feedback matters increases response rates across segments',
          'Communicating how previous feedback drove changes motivates future participation',
        ],
      },
      accessibility: {
        level: ImpactLevel.HIGH,
        description:
          'Inaccessible feedback mechanisms systematically exclude users with disabilities from the respondent pool',
        examples: [
          'Screen-reader-compatible surveys ensure visually impaired users can respond',
          'Keyboard-navigable rating scales include users who cannot use a mouse',
          'Alternative input methods (voice, switch access) expand the respondent pool',
          'Multilingual surveys reduce language-based non-response among diverse user bases',
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
        title: 'Contextual Micro-Survey After Task Completion',
        description:
          'In-app feedback prompt appearing immediately after a user completes a workflow',
        code: `<div class="feedback-prompt" role="complementary" aria-label="Quick feedback">
  <p>How was your experience completing this task?</p>
  <div class="emoji-scale" role="radiogroup" aria-label="Satisfaction rating">
    <button role="radio" aria-label="Very frustrated">😞</button>
    <button role="radio" aria-label="Somewhat frustrated">😕</button>
    <button role="radio" aria-label="Neutral">😐</button>
    <button role="radio" aria-label="Satisfied">🙂</button>
    <button role="radio" aria-label="Very satisfied">😊</button>
  </div>
  <button class="dismiss" aria-label="Dismiss feedback prompt">Not now</button>
</div>`,
        explanation:
          'A one-tap emoji rating at the moment of task completion minimizes effort and captures feedback from moderate users who would never fill out a standalone survey. The dismiss option respects autonomy.',
        principle:
          'Reducing effort threshold captures the silent majority who have mild opinions but won\'t invest time in traditional surveys',
        metrics: {
          before: '8% response rate with email NPS survey',
          after: '47% response rate with contextual micro-survey',
          improvement: '488% increase in response rate, significantly more representative sample',
        },
      },
      {
        title: 'Follow-Up Survey with Non-Responder Analysis',
        description:
          'Dashboard comparing survey respondent demographics against full user base',
        code: `<div class="survey-analysis">
  <h3>NPS Survey Results — Q4 2025</h3>
  <div class="response-meta">
    <div class="stat">
      <span class="label">Response Rate</span>
      <span class="value">12%</span>
      <span class="warning">Below 20% threshold — interpret with caution</span>
    </div>
    <div class="stat">
      <span class="label">Non-Responder Profile</span>
      <span class="value">Skews younger, mobile-first, free tier</span>
    </div>
  </div>
  <div class="comparison-table">
    <h4>Respondents vs. Full User Base</h4>
    <table>
      <thead>
        <tr><th>Segment</th><th>User Base</th><th>Respondents</th><th>Gap</th></tr>
      </thead>
      <tbody>
        <tr><td>Enterprise</td><td>15%</td><td>38%</td><td class="over">+23%</td></tr>
        <tr><td>Free Tier</td><td>45%</td><td>12%</td><td class="under">-33%</td></tr>
        <tr><td>Mobile-Only</td><td>35%</td><td>8%</td><td class="under">-27%</td></tr>
      </tbody>
    </table>
  </div>
  <div class="action">
    <button class="primary">Launch targeted mobile survey</button>
    <button class="secondary">View behavioral analytics for non-responders</button>
  </div>
</div>`,
        explanation:
          'Explicitly comparing respondent demographics to the full user base reveals non-response bias. Flagging low response rates and offering targeted outreach actions helps teams make better-informed decisions.',
        principle:
          'Making non-response bias visible prevents teams from treating skewed feedback as representative truth',
      },
      {
        title: 'Behavioral Analytics Supplementing Survey Data',
        description:
          'Product analytics dashboard showing usage patterns for users who did and did not respond to surveys',
        code: `<div class="silent-user-analytics">
  <h3>Silent User Behavior Analysis</h3>
  <p class="subtitle">Comparing behavior of survey respondents vs. non-respondents</p>

  <div class="insight-cards">
    <div class="insight">
      <h4>Feature Usage</h4>
      <p>Non-respondents use <strong>3.2 fewer features</strong> on average</p>
      <p class="implication">They may not engage deeply enough to form strong opinions</p>
    </div>
    <div class="insight">
      <h4>Session Duration</h4>
      <p>Non-respondents have <strong>40% shorter sessions</strong></p>
      <p class="implication">Shorter sessions suggest task-focused usage with less exploration</p>
    </div>
    <div class="insight">
      <h4>Churn Risk</h4>
      <p>Non-respondents churn at <strong>2.1x the rate</strong> of respondents</p>
      <p class="implication">Silent dissatisfaction may be a stronger churn predictor than negative feedback</p>
    </div>
  </div>

  <div class="recommendation">
    <p>Consider passive feedback mechanisms for this segment: session recordings,
    click heatmaps, and funnel analysis to understand their experience without requiring active input.</p>
  </div>
</div>`,
        explanation:
          'Behavioral analytics reveal patterns in the silent majority that surveys miss entirely. By comparing respondent and non-respondent behavior, teams can identify risks (like higher churn) that would be invisible in survey data alone.',
        principle:
          'Passive behavioral signals capture insights from users who will never fill out a survey',
      },
    ],

    bad: [
      {
        title: 'Treating Low-Response Survey as Definitive',
        description:
          'Product team presenting 5% response rate NPS as "the voice of the customer"',
        code: `<!-- DON'T DO THIS -->
<div class="nps-report">
  <h2>Customer Satisfaction: Excellent!</h2>
  <div class="nps-score">
    <span class="big-number">72</span>
    <span class="label">NPS Score</span>
  </div>
  <p>Our customers love us! Based on survey responses.</p>
  <!-- Hidden: only 5% of users responded, skewing heavily toward power users -->
  <!-- Hidden: free tier users (45% of base) had 0.3% response rate -->
</div>`,
        explanation:
          'Presenting NPS without response rate or segment analysis hides massive non-response bias. The 72 NPS likely reflects only engaged power users; the silent 95% may have very different experiences.',
        principle:
          'Never present survey results without response rates and representativeness analysis',
      },
      {
        title: 'Forced Feedback Gate',
        description:
          'Blocking feature access behind a mandatory survey completion',
        code: `<!-- DON'T DO THIS -->
<div class="feedback-gate">
  <h3>Complete Our Survey to Continue</h3>
  <p>We value your feedback! Please answer these 15 questions
  before accessing your dashboard.</p>
  <form class="mandatory-survey">
    <!-- 15 required questions -->
    <p class="required">* All fields are required</p>
    <button type="submit">Submit to Access Dashboard</button>
  </form>
  <!-- No skip or dismiss option -->
</div>`,
        explanation:
          'Forcing users to complete surveys eliminates non-response bias but introduces resentment bias. Users will rush through with random or dishonest answers, producing data that is technically "complete" but qualitatively worthless.',
        principle:
          'Forced responses trade non-response bias for resentment bias — the data quality is worse, not better',
      },
      {
        title: 'Only Collecting App Store Reviews',
        description:
          'Using app store ratings as the sole measure of user satisfaction',
        code: `<!-- DON'T DO THIS -->
<div class="satisfaction-report">
  <h2>User Satisfaction Report</h2>
  <div class="rating">
    <span class="stars">★★★★☆</span>
    <span class="score">4.2 / 5.0</span>
    <span class="count">2,847 reviews</span>
  </div>
  <p>Conclusion: Users are highly satisfied with our product.</p>
  <!-- Not mentioned: 500,000 total users, meaning 0.6% left reviews -->
  <!-- Not mentioned: Review distribution is bimodal (mostly 5-star and 1-star) -->
</div>`,
        explanation:
          'App store reviews represent a tiny, bimodal fraction of users — those who love or hate the product. The moderate majority (99.4% of users) is completely unrepresented, making the 4.2 rating potentially meaningless.',
        principle:
          'App store ratings suffer from extreme non-response bias; the moderate majority never reviews',
      },
    ],

    realWorld: [
      {
        company: 'Slack',
        product: 'In-App Feedback',
        description: 'Slack uses contextual micro-surveys triggered after specific actions (e.g., creating a channel, using search) with one-tap ratings. This captures feedback from casual users who would never respond to an email survey, yielding response rates 5-8x higher than traditional approaches.',
        effectiveness: 'very-effective',
        analysis: 'By reducing effort to a single tap at the moment of experience, Slack captures sentiment from the moderate middle — not just power users and complainers. Their response demographics closely match their actual user base distribution.',
      },
      {
        company: 'Netflix',
        product: 'Implicit Feedback System',
        description: 'Netflix largely abandoned explicit star ratings in favor of implicit behavioral signals: what users watch, when they pause, what they rewatch, and when they abandon content. This captures preferences from 100% of users, not the small fraction who rate content.',
        effectiveness: 'very-effective',
        analysis: 'Netflix recognized that explicit ratings suffered from severe non-response bias — only highly opinionated viewers rated content. By shifting to behavioral signals, they eliminated non-response bias entirely and improved recommendation accuracy significantly.',
      },
      {
        company: 'Intercom',
        product: 'Customer Survey Analytics',
        description: 'Intercom provides built-in non-response analysis in their survey tools, showing response rates by segment and flagging when results may not be representative. They recommend follow-up strategies for under-represented segments.',
        effectiveness: 'effective',
        analysis: 'By making non-response bias visible in the analytics interface, Intercom helps product teams avoid the common mistake of treating partial feedback as universal truth. Their segmented response rate reports reveal gaps in coverage.',
      },
      {
        company: 'Apple',
        product: 'App Store Review Prompts',
        description: 'Apple\'s SKStoreReviewController API limits review prompts to 3 per year and shows them at developer-chosen moments. By controlling timing and frequency, it aims to capture feedback from satisfied-but-silent users who wouldn\'t seek out the review form independently.',
        effectiveness: 'effective',
        analysis: 'The controlled prompt system addresses non-response bias by reaching users who would never navigate to the App Store to leave a review. However, the limit means coverage is still incomplete. Apps that prompt after positive experiences tend to get inflated ratings.',
      },
    ],

    abTests: [
      {
        title: 'Email Survey vs. In-App Micro-Survey',
        hypothesis:
          'In-app micro-surveys will yield higher response rates and more representative data than email surveys',
        controlVersion: {
          description:
            'Traditional email NPS survey sent to all users quarterly, with 10 questions and 5-minute estimated completion time',
          metrics: {
            conversionRate: '6.2%',
            timeOnPage: '4:30',
          },
        },
        treatmentVersion: {
          description:
            'In-app one-tap emoji rating triggered after task completion, with optional follow-up text field',
          metrics: {
            conversionRate: '41.8%',
            timeOnPage: '0:12',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'In-app micro-surveys achieved 574% higher response rates. Critically, the respondent demographics closely matched the full user base, while email survey respondents skewed heavily toward enterprise accounts (38% of respondents vs. 15% of user base). NPS scores differed by 18 points between the two methods, confirming significant non-response bias in the email approach.',
          learnings: [
            'Lower effort threshold captures the moderate majority',
            'Contextual timing captures in-the-moment sentiment rather than recalled sentiment',
            'Email surveys systematically over-represent enterprise and power users',
            'Combining micro-surveys with behavioral analytics provides the most complete picture',
          ],
        },
      },
      {
        title: 'Standard Exit Survey vs. Incentivized Follow-Up',
        hypothesis:
          'Offering a modest incentive to churned non-respondents will capture previously missing perspectives',
        controlVersion: {
          description:
            'Standard exit survey shown during account cancellation flow (optional, no incentive)',
          metrics: {
            conversionRate: '23%',
            clickThroughRate: '15%',
          },
        },
        treatmentVersion: {
          description:
            'Follow-up email to churned users who skipped exit survey, offering a $10 gift card for a 3-minute phone interview',
          metrics: {
            conversionRate: '34%',
            clickThroughRate: '28%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'The incentivized follow-up captured 48% more responses from churned users. Crucially, the reasons cited by follow-up respondents differed significantly: the exit survey over-represented "found a competitor" (price-sensitive users), while follow-up interviews revealed "didn\'t understand the value" and "too complex" as dominant themes — actionable insights that were invisible in the standard exit survey.',
          learnings: [
            'Non-respondents to exit surveys have different reasons for leaving than respondents',
            'Modest incentives are effective for hard-to-reach churned users',
            'Phone interviews yield richer qualitative data than written surveys',
            'The "silent churners" represent the largest opportunity for product improvement',
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
        name: 'Low Response Rate Indicators',
        description:
          'Survey results presented without response rate context or representativeness analysis',
        howToSpot:
          'Check if response rates are displayed; look for segment-level response breakdowns; verify if non-responder profiles are analyzed',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Single-Channel Feedback',
        description:
          'Feedback collected through only one mechanism (e.g., only email surveys or only app store reviews)',
        howToSpot:
          'Check how many distinct feedback channels exist; verify if passive behavioral data supplements active feedback',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Missing Segment Representation',
        description:
          'Certain user segments (free tier, mobile-only, international) are absent or under-represented in feedback data',
        howToSpot:
          'Compare respondent demographics to full user base demographics; look for segments with zero or very low response rates',
        severity: ImpactLevel.CRITICAL,
      },
      {
        name: 'Bimodal Distribution',
        description:
          'Feedback shows mostly extreme positive and extreme negative responses with little in the middle',
        howToSpot:
          'Plot response distributions; check if moderate ratings (3/5, 6-7 NPS) are under-represented relative to extremes',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'High-Effort Feedback Forms',
        description:
          'Feedback mechanisms that require significant time or effort, naturally filtering out less motivated users',
        howToSpot:
          'Check survey length, number of required fields, and estimated completion time; look for multi-page or complex survey flows',
        severity: ImpactLevel.MEDIUM,
      },
    ],

    patterns: [
      {
        name: 'Silent Majority Pattern',
        description: 'The vast majority of users never provide explicit feedback, yet product decisions are made solely from the vocal minority',
        indicators: ['Response rates below 10%', 'No behavioral analytics to supplement surveys', 'Product decisions cited as "based on user feedback" without response rate context', 'Feature requests driven entirely by submitted tickets'],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Vocal Extremes Pattern',
        description: 'Feedback data shows disproportionate representation from users with extreme positive or negative experiences',
        indicators: ['Bimodal satisfaction distributions', 'App store reviews clustered at 1-star and 5-star', 'NPS showing mostly promoters and detractors with few passives', 'Support tickets dominating product roadmap priorities'],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Demographic Gap Pattern',
        description: 'Certain user segments are systematically absent from feedback data',
        indicators: ['Enterprise users over-represented in surveys', 'Free tier users under-represented', 'Mobile-only users missing from desktop-optimized surveys', 'International users absent due to language barriers'],
        severity: ImpactLevel.HIGH,
        confidence: 'medium',
      },
      {
        name: 'Survivorship Feedback Pattern',
        description: 'Feedback comes only from users who stayed, missing insights from those who left',
        indicators: ['No exit survey data', 'Churned user feedback absent from analysis', 'Trial-to-paid conversion feedback only from converters', 'Onboarding feedback only from users who completed onboarding'],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
    ],

    checklistQuestions: [
      'What is the response rate for this survey or feedback mechanism?',
      'How do respondent demographics compare to the full user base?',
      'Which user segments are under-represented or absent in collected feedback?',
      'Are we supplementing active feedback with passive behavioral analytics?',
      'Do we have feedback from users who churned or abandoned the product?',
      'Is our feedback mechanism accessible across all platforms and demographics?',
      'Are we using multiple channels to collect feedback or relying on a single method?',
      'Does the satisfaction distribution show a realistic bell curve or a bimodal extreme pattern?',
      'Have we analyzed the behavioral differences between respondents and non-respondents?',
      'Are we transparent about response rates and representativeness when presenting feedback data?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in survey methodology, cognitive psychology, and UX research, specializing in non-response bias.

Analyze the provided design for non-response bias patterns. Identify:

1. **Feedback Collection Methods**: How user feedback is gathered and what effort is required
2. **Response Rate Context**: Whether response rates are tracked, reported, and accounted for
3. **Segment Representation**: Which user segments are represented or missing in feedback data
4. **Passive Signal Usage**: Whether behavioral analytics supplement active feedback
5. **Non-Responder Analysis**: Whether the team analyzes who is NOT responding and why

For each pattern found:
- Identify which user segments may be under-represented
- Assess the potential gap between collected feedback and actual user sentiment
- Determine if product decisions based on this feedback are at risk of bias
- Evaluate the feedback mechanism's accessibility and effort threshold
- Suggest improvements for more representative data collection

Consider:
- Is the feedback mechanism capturing the moderate majority or only extreme opinions?
- Are there user segments systematically excluded by the feedback design?
- Is behavioral data being used to validate or supplement survey findings?
- Are response rates reported alongside results?
- Could the silent majority hold fundamentally different views?

Provide actionable recommendations for reducing non-response bias in research and feedback.`,

    outputSchema: {
      type: 'object',
      properties: {
        nonResponsePatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              responseRate: { type: 'string' },
              missingSegments: { type: 'string' },
              biasRisk: { type: 'string' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'biasRisk',
              'recommendation',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            responseRateAdequacy: { type: 'number' },
            segmentCoverage: { type: 'number' },
            passiveSignalUsage: { type: 'number' },
            representativenessScore: { type: 'number' },
          },
          required: [
            'responseRateAdequacy',
            'segmentCoverage',
            'passiveSignalUsage',
            'representativenessScore',
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
        'nonResponsePatterns',
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
        title: 'Audit Current Feedback Channels',
        description:
          'Map all existing feedback collection mechanisms and their response rates by user segment',
        example:
          'Discovery: Email NPS has 6% response rate skewing 3x toward enterprise; in-app has 0% (none exists); app store has 0.5%',
        tips: [
          'List every feedback channel and its response rate',
          'Compare respondent demographics to full user base',
          'Identify segments with zero or near-zero representation',
        ],
      },
      {
        step: 2,
        title: 'Design Low-Effort Feedback Mechanisms',
        description:
          'Create feedback touchpoints that minimize effort and maximize response rates across all user segments',
        example:
          'Implement one-tap emoji ratings at task completion points, reducing survey effort from 5 minutes to 3 seconds',
        tips: [
          'Aim for under 10 seconds to complete',
          'Make the primary action a single tap or click',
          'Offer optional depth (follow-up text) without requiring it',
        ],
      },
      {
        step: 3,
        title: 'Implement Behavioral Analytics',
        description:
          'Deploy passive behavioral tracking to capture signals from the 90%+ of users who will never fill out a survey',
        example:
          'Track feature usage frequency, session duration, drop-off points, and rage clicks as implicit satisfaction signals',
        tips: [
          'Focus on behavioral proxies for satisfaction (e.g., repeat usage = satisfaction)',
          'Compare behavioral patterns between respondents and non-respondents',
          'Use aggregate, anonymized data to respect privacy',
        ],
      },
      {
        step: 4,
        title: 'Target Under-Represented Segments',
        description:
          'Conduct targeted outreach to user segments that are absent from existing feedback data',
        example:
          'Run 10 usability interviews with free-tier mobile users (0% survey response rate) using modest incentives',
        tips: [
          'Prioritize segments with largest representation gaps',
          'Use appropriate incentives without distorting responses',
          'Consider alternative methods (interviews, usability tests) for hard-to-reach segments',
        ],
      },
      {
        step: 5,
        title: 'Report Response Rates and Representativeness',
        description:
          'Always present feedback data with response rate context and segment representativeness analysis',
        example:
          'Dashboard shows: NPS 72 (12% response rate, enterprise-heavy — interpret with caution for free tier)',
        tips: [
          'Set minimum response rate thresholds for actionable data',
          'Flag segments where data may not be representative',
          'Compare conclusions across multiple feedback channels',
        ],
      },
    ],

    dos: [
      'Track and report response rates for all feedback mechanisms',
      'Compare respondent demographics to full user base demographics',
      'Use multiple feedback channels to reach different user segments',
      'Supplement surveys with behavioral analytics and passive signals',
      'Design feedback with minimum effort threshold (one-tap preferred)',
      'Conduct targeted outreach to under-represented segments',
      'Analyze non-responder behavior separately to identify hidden patterns',
      'Present response rates alongside all survey findings',
    ],

    donts: [
      'Don\'t treat survey results as representative without checking response rates',
      'Don\'t rely on a single feedback channel for understanding user sentiment',
      'Don\'t force mandatory surveys that create resentment bias',
      'Don\'t ignore churned users in satisfaction measurements',
      'Don\'t use app store ratings as the sole measure of user satisfaction',
      'Don\'t over-survey users in pursuit of higher response rates',
      'Don\'t present NPS or satisfaction scores without response rate context',
      'Don\'t assume the vocal minority speaks for the silent majority',
    ],

    bestPractices: [
      {
        title: 'Layer Multiple Feedback Signals',
        description:
          'Combine active surveys, passive behavioral analytics, support tickets, and qualitative research for a complete picture',
        rationale:
          'No single feedback channel is representative; layering signals from multiple sources reduces non-response bias',
        example:
          'Cross-reference NPS survey (12% response) with behavioral engagement metrics (100% coverage) and support ticket themes',
      },
      {
        title: 'Analyze the Gap, Not Just the Data',
        description:
          'Explicitly study who is NOT responding and model what their feedback might look like based on behavioral data',
        rationale:
          'The absence of data is itself data — understanding non-responders reveals blind spots in product strategy',
        example:
          'Non-respondents have 40% shorter sessions and 2x churn rate — their satisfaction is likely lower than survey results suggest',
      },
      {
        title: 'Time Feedback to Context',
        description:
          'Trigger feedback prompts at natural moments of task completion, not at arbitrary times',
        rationale:
          'Contextual prompts capture in-the-moment sentiment from a broader range of users than asynchronous surveys',
        example:
          'Show one-tap rating immediately after file export completes, not in a weekly email digest',
      },
      {
        title: 'Set Response Rate Thresholds',
        description:
          'Establish minimum response rate requirements before treating survey data as actionable',
        rationale:
          'Low response rates indicate high non-response bias risk; setting thresholds prevents overconfident decisions',
        example:
          'Policy: Survey results below 20% response rate are labeled "directional only" and require behavioral validation',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships - Ensure survey forms are semantically structured for assistive technologies',
        implementation:
          'Use proper form labels, fieldsets, and ARIA attributes so screen reader users can complete surveys independently',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.1.1',
        guideline:
          'Keyboard - All feedback mechanisms must be fully keyboard-navigable',
        implementation:
          'Ensure rating scales, submit buttons, and dismiss actions are reachable and operable via keyboard alone',
      },
      {
        wcagLevel: 'AA',
        criterion: '3.3.2',
        guideline:
          'Labels or Instructions - Provide clear labels for all survey inputs',
        implementation:
          'Label each survey question and response option clearly; provide instructions for rating scales (e.g., "1 = very dissatisfied, 5 = very satisfied")',
      },
    ],

    ethics: [
      {
        concern: 'Data-Driven Misinformation',
        severity: 'critical',
        explanation:
          'Presenting low-response-rate surveys as representative of all users misleads stakeholders and drives poor product decisions',
        mitigation:
          'Always report response rates, segment coverage, and confidence levels. Flag when data may not be representative.',
      },
      {
        concern: 'Systematic Exclusion',
        severity: 'high',
        explanation:
          'Inaccessible or single-channel feedback mechanisms systematically exclude certain user groups from having a voice in product direction',
        mitigation:
          'Ensure feedback mechanisms are accessible, multilingual, and available across all platforms. Actively recruit under-represented segments.',
      },
      {
        concern: 'Incentive Manipulation',
        severity: 'medium',
        explanation:
          'Using incentives to boost response rates can attract responses motivated by the reward rather than genuine feedback',
        mitigation:
          'Use modest, appropriate incentives. Validate incentivized responses against organic feedback patterns. Disclose incentive structures.',
      },
      {
        concern: 'Privacy Overreach',
        severity: 'high',
        explanation:
          'Aggressively tracking non-responder behavior to compensate for missing survey data can violate user privacy expectations',
        mitigation:
          'Use aggregated, anonymized behavioral analytics. Be transparent about data collection. Comply with privacy regulations (GDPR, CCPA).',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'Nonresponse in Household Interview Surveys: A Review of Theories and Evidence',
        author: 'Groves, R. M., & Peytcheva, E.',
        year: 2008,
        doi: '10.1093/poq/nfn011',
        description:
          'Comprehensive review of non-response bias theories and empirical evidence across survey types',
        type: 'foundational',
      },
      {
        title: 'Estimating Nonresponse Bias in Mail Surveys',
        author: 'Armstrong, J. S., & Overton, T. S.',
        year: 1977,
        doi: '10.2307/3150783',
        description:
          'Foundational methodology for detecting and estimating non-response bias using early vs. late respondent comparisons',
        type: 'foundational',
      },
      {
        title: 'Nonresponse Rates and Nonresponse Bias in Household Surveys',
        author: 'Groves, R. M.',
        year: 2006,
        doi: '10.1093/poq/nfl033',
        description:
          'Demonstrates that low response rates do not always indicate high non-response bias, but the relationship is context-dependent',
        type: 'advanced',
      },
      {
        title: 'Consequences of Survey Nonresponse',
        author: 'Brick, J. M.',
        year: 2013,
        doi: '10.1214/12-AOAS642',
        description:
          'Analysis of how non-response affects survey accuracy and methods for adjustment and correction',
        type: 'advanced',
      },
    ],

    books: [
      {
        title: 'Survey Nonresponse',
        author: 'Groves, R. M., Dillman, D. A., Eltinge, J. L., & Little, R. J. A.',
        year: 2002,
        isbn: '9780471396277',
        description:
          'Comprehensive reference on causes, consequences, and remedies for survey non-response',
        type: 'foundational',
      },
      {
        title: 'Internet, Phone, Mail, and Mixed-Mode Surveys: The Tailored Design Method',
        author: 'Dillman, D. A., Smyth, J. D., & Christian, L. M.',
        year: 2014,
        isbn: '9781118456149',
        description:
          'Practical guide to maximizing survey response rates and minimizing non-response bias across channels',
        type: 'practical',
      },
    ],

    articles: [
      {
        title: 'How to Avoid Non-Response Bias in UX Research',
        author: 'Nielsen Norman Group',
        url: 'https://www.nngroup.com/articles/nonresponse-bias/',
        description:
          'Practical guide to identifying and mitigating non-response bias in UX research',
        type: 'practical',
      },
      {
        title: 'The Silent Majority: Why Most Users Never Give Feedback',
        author: 'Intercom Blog',
        url: 'https://www.intercom.com/blog/silent-majority-feedback/',
        description:
          'Product-focused analysis of why most users stay silent and how to hear from them',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'Non-Response Bias Explained',
        author: 'Research Methods',
        url: 'https://www.youtube.com/watch?v=nonresponse-bias',
        description:
          'Overview of non-response bias with survey design examples and correction methods',
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
      'survivorship-bias', // Both involve missing data from absent populations
      'selection-bias', // Self-selection in survey participation
      'confirmation-bias', // Teams interpret skewed feedback to confirm beliefs
      'availability-heuristic', // Vocal feedback is more mentally available than silent behavior
    ],

    conflicts: [
      'social-proof', // Social proof relies on visible feedback which is biased by non-response
    ],

    confusedWith: [
      'selection-bias', // Related but selection bias is broader; non-response is a specific type
      'survivorship-bias', // Both involve missing data, but survivorship focuses on those who "survived" a process
      'sampling-bias', // Non-response is one cause of sampling bias, not the same thing
    ],

    hierarchy: {
      parent: 'sampling-bias',
      children: [
        'survey-fatigue',
        'silent-majority-effect',
      ],
    },
  },
};
