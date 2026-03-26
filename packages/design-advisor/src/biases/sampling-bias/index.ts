/**
 * SAMPLING BIAS
 *
 * Systematic error from non-representative samples that produce
 * conclusions which don't generalize to the full population.
 */

import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const samplingBias: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'sampling-bias',
    name: 'Sampling Bias',
    aliases: ['Selection Bias', 'Sample Selection Bias', 'Ascertainment Bias'],
    category: BiasCategory.COGNITIVE,
    relatedCategories: [
      BiasCategory.DECISION_MAKING,
      BiasCategory.PERCEPTION,
    ],
    tags: [
      'research-methodology',
      'user-research',
      'analytics',
      'data-interpretation',
      'a-b-testing',
      'feedback',
      'representativeness',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple:
      'Drawing conclusions from a non-representative sample that don\'t generalize to the full population.',

    detailed: `Sampling bias is a systematic error that occurs when the participants or data points collected for analysis are not representative of the broader population being studied. When a sample is skewed -- by self-selection, convenience, exclusion criteria, or platform limitations -- the conclusions drawn from it fail to generalize.

In product design and UX research, sampling bias is pervasive and dangerous. It distorts user personas, invalidates A/B test results, skews analytics dashboards, and produces feedback loops that serve vocal minorities while ignoring silent majorities. Every design decision based on biased data compounds the problem: the product drifts toward the sampled group and away from the true audience.

Understanding sampling bias is essential for anyone interpreting user data, running experiments, or making design decisions informed by research. It is not a bias that users experience in an interface -- it is a bias that designers and researchers introduce into their process, with downstream effects on every user.`,

    psychologyBasis: {
      discoveredBy: 'William Gemmell Cochran (formalized in survey methodology)',
      year: 1977,
      theory: 'Survey Sampling Theory',
      mechanism: `Sampling bias arises when the method of selecting observations systematically excludes or over-represents certain segments of a population. This happens because:

1. **Self-Selection**: Only users who feel strongly (positively or negatively) volunteer feedback, excluding the indifferent majority
2. **Convenience Sampling**: Researchers study whoever is easiest to reach (e.g., English-speaking, tech-savvy, urban users) rather than the full target audience
3. **Survivorship Bias**: Only data from users who stayed is analyzed; churned users and their reasons are invisible
4. **Platform Filtering**: Analytics tools only capture certain user segments (e.g., logged-in users, cookie-accepting users, specific browsers)
5. **Exclusion Criteria**: Recruitment screeners, geographic restrictions, or technical requirements systematically filter out relevant groups

The error is structural, not perceptual -- it lives in the data collection process itself, making it invisible unless actively audited.`,
    },

    realWorldExample: `The 1936 Literary Digest presidential poll surveyed 2.4 million people -- an enormous sample -- yet predicted Alf Landon would defeat Franklin Roosevelt in a landslide. The prediction was catastrophically wrong because the sample was drawn from telephone directories and automobile registrations, systematically excluding lower-income voters who overwhelmingly supported Roosevelt. Sample size did not compensate for sample bias. George Gallup, using a much smaller but properly stratified sample, correctly predicted the outcome.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `Sampling bias affects not how users experience interfaces, but how designers build them. Every research finding, analytics insight, A/B test result, and feedback report is only as valid as the sample behind it. Designers must:

- Audit who is represented in user research and who is missing
- Validate that A/B test cohorts reflect the full user base
- Recognize that app store reviews, support tickets, and NPS surveys attract biased respondents
- Ensure analytics capture all user segments, not just the easiest to track
- Design recruitment strategies that reach underrepresented groups`,

    whenToUse: [
      {
        title: 'User Research Planning',
        scenario:
          'When designing studies, interviews, or usability tests',
        example:
          'Use stratified sampling to recruit participants across age, technical proficiency, accessibility needs, and geographic location -- not just whoever responds first',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'A/B Test Design',
        scenario: 'When setting up experiments to validate design decisions',
        example:
          'Ensure test cohorts include new users, power users, mobile users, and users with slow connections -- not just the segment most likely to convert',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Feedback Collection',
        scenario: 'When gathering user feedback through surveys, reviews, or interviews',
        example:
          'Actively solicit feedback from silent users through in-app micro-surveys timed to specific interactions, rather than relying on voluntary submission',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Analytics Interpretation',
        scenario: 'When making decisions based on behavioral data',
        example:
          'Before acting on analytics insights, verify what percentage of total users the data represents and which segments are excluded (e.g., users who block tracking, non-logged-in visitors)',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Beta Testing Programs',
        scenario: 'When recruiting beta testers for new features',
        example:
          'Recruit beta testers from diverse demographics, device types, and usage patterns rather than relying on early adopters who volunteer',
        impact: ImpactLevel.MEDIUM,
      },
      {
        title: 'Persona Development',
        scenario: 'When creating or updating user personas',
        example:
          'Validate personas against actual demographic and behavioral data, not just the loudest voices in user interviews',
        impact: ImpactLevel.HIGH,
      },
    ],

    whenToAvoid: [
      {
        title: 'Rapid Prototyping',
        reason:
          'Early-stage exploration benefits from fast, imperfect feedback over no feedback',
        consequence:
          'Over-investing in representative sampling too early can slow iteration without proportional benefit',
        alternative:
          'Use convenience samples for early exploration but flag all findings as preliminary; validate with representative samples before shipping',
      },
      {
        title: 'Expert Reviews',
        reason:
          'Heuristic evaluations by experts are intentionally non-representative and rely on expertise, not population coverage',
        consequence:
          'Applying sampling-bias corrections to expert reviews misunderstands their purpose',
        alternative:
          'Use expert reviews for structural issues and reserve representative sampling for validation research',
      },
      {
        title: 'Internal Dogfooding',
        reason:
          'Internal testing serves a different purpose than external research',
        consequence:
          'Treating internal testers as representative users introduces its own sampling bias',
        alternative:
          'Use dogfooding for bug detection and workflow validation, not for user preference or behavior insights',
      },
    ],

    commonMistakes: [
      {
        title: 'Confusing Sample Size with Sample Quality',
        description:
          'Believing a large number of responses compensates for a non-representative sample',
        why: 'A million biased data points are still biased -- the Literary Digest poll surveyed 2.4 million and was wrong',
        fix: 'Prioritize representativeness over volume. A stratified sample of 300 beats a convenience sample of 30,000',
      },
      {
        title: 'Treating App Store Reviews as User Voice',
        description:
          'Making design decisions based on app store reviews, which skew toward extremely satisfied or dissatisfied users',
        why: 'The vast moderate middle never writes reviews; the sample is bimodal and unrepresentative',
        fix: 'Use in-app surveys with random sampling to capture the full sentiment distribution',
      },
      {
        title: 'Ignoring Non-Respondents',
        description:
          'Analyzing only users who completed a survey without considering who did not respond and why',
        why: 'Non-response is often correlated with the very variables being studied (e.g., dissatisfied users are less likely to respond to satisfaction surveys)',
        fix: 'Calculate and report response rates. Compare respondent demographics to overall user demographics. Use follow-up methods for non-respondents',
      },
      {
        title: 'Survivorship Bias in Analytics',
        description:
          'Drawing conclusions from active users while ignoring churned users',
        why: 'The users who remain are systematically different from those who left; analyzing only survivors paints a false picture of overall experience',
        fix: 'Track and analyze churn cohorts separately. Include exit surveys and session data from users who did not return',
      },
      {
        title: 'Testing Only on Modern Devices',
        description:
          'Running usability tests exclusively on latest-model devices with fast connections',
        why: 'A significant portion of real users access products on older devices, slower networks, and smaller screens',
        fix: 'Include representative device and network conditions in your test matrix. Use throttling and device labs',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.MEDIUM,
        description:
          'Layout decisions based on biased samples may not serve the full user base',
        examples: [
          'Optimizing for desktop layouts when mobile users are underrepresented in testing',
          'Designing for large screens because test participants had premium devices',
          'Information architecture shaped by power-user navigation patterns only',
          'Responsive breakpoints tested on a narrow range of viewport sizes',
        ],
      },
      typography: {
        level: ImpactLevel.LOW,
        description:
          'Typography choices are less affected by sampling bias but readability testing can be skewed',
        examples: [
          'Font size preferences tested only with younger users with good vision',
          'Reading speed studies conducted only in one language',
          'Line length optimization based on desktop-only reading patterns',
        ],
      },
      color: {
        level: ImpactLevel.MEDIUM,
        description:
          'Color perception and preference testing must account for vision diversity',
        examples: [
          'Color palette preferences tested without colorblind participants',
          'Contrast ratios validated only under ideal lighting conditions',
          'Cultural color associations tested in a single market',
          'Dark mode preferences skewed by developer-heavy test panels',
        ],
      },
      interaction: {
        level: ImpactLevel.HIGH,
        description:
          'Interaction patterns are highly sensitive to who is included in testing',
        examples: [
          'Touch target sizing based on able-bodied participants only',
          'Gesture interactions tested without motor-impaired users',
          'Task completion rates inflated by tech-savvy test participants',
          'Error recovery flows untested with novice users',
        ],
      },
      content: {
        level: ImpactLevel.HIGH,
        description:
          'Content strategy built on biased feedback reflects a narrow audience',
        examples: [
          'Tone and vocabulary calibrated to English-first respondents only',
          'Help content priorities driven by support tickets (biased toward reporting users)',
          'Terminology preferences tested with domain experts, not beginners',
          'Content length preferences skewed by high-engagement power users',
        ],
      },
      accessibility: {
        level: ImpactLevel.CRITICAL,
        description:
          'Users with disabilities are the most frequently excluded group in sampling',
        examples: [
          'Usability studies that never recruit screen reader users',
          'Testing environments that exclude users with cognitive disabilities',
          'Feedback channels inaccessible to users with motor impairments',
          'Satisfaction surveys that are themselves not accessible, ensuring those users never respond',
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
        title: 'Stratified User Research Recruitment',
        description:
          'Research plan using stratified sampling to ensure representative participant mix',
        code: `<div class="research-plan">
  <h3>Usability Study: Checkout Redesign</h3>
  <h4>Participant Recruitment Matrix</h4>
  <table class="recruitment-matrix">
    <thead>
      <tr>
        <th>Segment</th>
        <th>Population %</th>
        <th>Target N</th>
        <th>Recruited</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Mobile users</td>
        <td>62%</td>
        <td>9</td>
        <td class="complete">9</td>
      </tr>
      <tr>
        <td>Desktop users</td>
        <td>38%</td>
        <td>6</td>
        <td class="complete">6</td>
      </tr>
      <tr>
        <td>Screen reader users</td>
        <td>4%</td>
        <td>2</td>
        <td class="complete">2</td>
      </tr>
      <tr>
        <td>First-time buyers</td>
        <td>45%</td>
        <td>7</td>
        <td class="complete">7</td>
      </tr>
      <tr>
        <td>Repeat customers</td>
        <td>55%</td>
        <td>8</td>
        <td class="complete">8</td>
      </tr>
    </tbody>
  </table>
  <p class="note">Quotas based on last 90 days of production analytics.</p>
</div>`,
        explanation:
          'By matching recruitment quotas to actual user demographics, the study produces findings that generalize to the real user base rather than reflecting whoever was easiest to recruit.',
        principle:
          'Stratified sampling ensures every significant user segment is represented proportionally',
        metrics: {
          before: 'Previous study: 100% desktop, 0% accessibility, 80% repeat customers',
          after: 'Stratified study: matched production demographics within 5% per segment',
          improvement: '3 critical mobile-specific usability issues discovered that previous studies missed',
        },
      },
      {
        title: 'Representative A/B Test Cohorts',
        description:
          'A/B test configuration that validates cohort representativeness before analyzing results',
        code: `<div class="ab-test-validation">
  <h3>Experiment: New Onboarding Flow</h3>
  <div class="cohort-check">
    <h4>Pre-Analysis Cohort Validation</h4>
    <div class="check passed">
      <span class="status">PASS</span>
      <span>Control vs Treatment: device distribution within 2%</span>
    </div>
    <div class="check passed">
      <span class="status">PASS</span>
      <span>Control vs Treatment: new/returning ratio within 1.5%</span>
    </div>
    <div class="check passed">
      <span class="status">PASS</span>
      <span>Control vs Treatment: geographic distribution within 3%</span>
    </div>
    <div class="check failed">
      <span class="status">FAIL</span>
      <span>Control vs Treatment: browser distribution off by 8%</span>
      <p class="action">Action: Re-randomize before proceeding</p>
    </div>
  </div>
</div>`,
        explanation:
          'Validating that test cohorts are balanced across key dimensions before analyzing results prevents Simpson\'s paradox and ensures observed differences are caused by the treatment, not by sample imbalance.',
        principle:
          'Always validate cohort balance before trusting A/B test results',
      },
      {
        title: 'Inclusive Feedback Collection',
        description:
          'Multi-channel feedback system designed to reach underrepresented users',
        code: `<div class="feedback-strategy">
  <h3>Feedback Collection Channels</h3>
  <div class="channel">
    <h4>In-App Micro-Survey (Random 5%)</h4>
    <p>Triggered after task completion for randomly selected users.</p>
    <p class="reach">Reaches: All active users including silent majority</p>
  </div>
  <div class="channel">
    <h4>Exit Survey (Churning Users)</h4>
    <p>Shown when user cancels subscription or is inactive 30+ days.</p>
    <p class="reach">Reaches: Dissatisfied users who would otherwise leave silently</p>
  </div>
  <div class="channel">
    <h4>Accessibility Feedback Panel</h4>
    <p>Dedicated channel for assistive technology users with accessible form.</p>
    <p class="reach">Reaches: Users with disabilities often excluded from standard channels</p>
  </div>
  <div class="channel">
    <h4>Voluntary Feedback Button</h4>
    <p>Always available but NOT the primary data source.</p>
    <p class="reach">Reaches: Highly motivated users (recognized as biased sample)</p>
  </div>
</div>`,
        explanation:
          'Using multiple channels with different selection mechanisms reduces the overall sampling bias. Random in-app surveys capture the silent majority, exit surveys capture churning users, and a dedicated accessibility channel ensures disabled users are heard.',
        principle:
          'Diversify feedback channels to counteract each channel\'s inherent sampling bias',
      },
    ],

    bad: [
      {
        title: 'Social Media Poll as User Research',
        description:
          'Using a Twitter/X poll to make product decisions',
        code: `<!-- DON'T DO THIS -->
<div class="twitter-poll">
  <p class="tweet">What feature should we build next?</p>
  <div class="poll-options">
    <div class="option">Dark mode - 47%</div>
    <div class="option">API access - 31%</div>
    <div class="option">Mobile app - 22%</div>
  </div>
  <p class="votes">1,247 votes</p>
  <p class="conclusion">Decision: Prioritize dark mode!</p>
</div>`,
        explanation:
          'Twitter followers are not representative of your user base. They skew toward tech-savvy, English-speaking, highly engaged users. The 99% of users who don\'t follow you on Twitter had no voice in this decision.',
        principle:
          'Social media audiences are self-selected and never representative of your full user base',
      },
      {
        title: 'Analytics Without Coverage Audit',
        description:
          'Making decisions from analytics that only track a subset of users',
        code: `<!-- DON'T DO THIS -->
<div class="analytics-dashboard">
  <h3>User Behavior Insights</h3>
  <div class="metric">
    <p>Average session duration: 8.2 minutes</p>
  </div>
  <div class="metric">
    <p>Most used feature: Advanced filters (73%)</p>
  </div>
  <div class="metric">
    <p>Satisfaction score: 4.6/5</p>
  </div>
  <!-- Hidden: Only tracking logged-in users (35% of total traffic) -->
  <!-- Hidden: Cookie consent rejection rate: 28% in EU -->
  <!-- Hidden: Ad blocker rate: 22% blocks analytics script -->
</div>`,
        explanation:
          'These metrics look authoritative but represent only a fraction of actual users. Logged-in users behave differently from anonymous visitors. Users who accept cookies differ from those who don\'t. The dashboard creates false confidence in incomplete data.',
        principle:
          'Always report what percentage of total users your analytics actually capture',
      },
      {
        title: 'Homogeneous Beta Tester Group',
        description:
          'Beta program populated entirely by early adopters and power users',
        code: `<!-- DON'T DO THIS -->
<div class="beta-results">
  <h3>Beta Test Results: New Dashboard</h3>
  <p>Participants: 50 beta testers (all from our power-user community)</p>
  <div class="result positive">
    <p>Task completion rate: 96%</p>
  </div>
  <div class="result positive">
    <p>Satisfaction score: 4.8/5</p>
  </div>
  <div class="result positive">
    <p>"Most intuitive dashboard we've ever used!"</p>
  </div>
  <p class="conclusion">Ready for general release!</p>
</div>`,
        explanation:
          'Power users who volunteer for beta programs are not representative of general users. They have higher technical proficiency, stronger motivation, and more familiarity with your product. A 96% task completion rate among experts says nothing about novice success rates.',
        principle:
          'Beta tester enthusiasm does not predict general-population usability',
      },
    ],

    realWorld: [
      {
        company: 'Twitter/X',
        product: 'Platform Polls',
        description: 'Social media polls are used by companies and public figures to gauge opinion, but respondents are limited to platform users who see the tweet, self-select to participate, and skew toward specific demographics. Results are routinely treated as representative when they are not.',
        effectiveness: 'somewhat-effective',
        analysis: 'Social media polls are a textbook example of sampling bias. The audience is self-selected, platform-specific, and uncontrolled. Any product decision based solely on a social media poll risks serving a vocal minority.',
      },
      {
        company: 'Apple App Store',
        product: 'App Store Reviews',
        description: 'App store review demographics skew heavily toward extreme opinions. Studies show review writers are disproportionately either very satisfied or very dissatisfied, creating a bimodal distribution that misrepresents the moderate-majority experience.',
        effectiveness: 'somewhat-effective',
        analysis: 'Review-driven development creates a feedback loop that amplifies edge cases. Teams that treat reviews as representative voice-of-customer systematically misallocate development resources.',
      },
      {
        company: 'Google Analytics',
        product: 'Web Analytics (Logged-In Users Only)',
        description: 'Many analytics implementations only track logged-in users or users who accept cookies. With GDPR consent rates varying from 40-80% across regions, analytics dashboards can miss 20-60% of actual traffic, systematically excluding privacy-conscious and casual visitors.',
        effectiveness: 'somewhat-effective',
        analysis: 'Analytics coverage gaps are a form of sampling bias that is rarely acknowledged. Teams make confident decisions based on data that may represent only half their actual users.',
      },
      {
        company: 'Spotify',
        product: 'Wrapped (Year in Review)',
        description: 'Spotify Wrapped analyzes listening data from active users, but the data inherently excludes music consumed on other platforms, offline, or by users who churned mid-year. The feature celebrates engagement but presents a partial picture as a complete one.',
        effectiveness: 'effective',
        analysis: 'While Wrapped is brilliant as a marketing feature, product teams using similar data for catalog decisions must recognize that listening data only represents retained, active users -- not the broader music audience.',
      },
    ],

    abTests: [
      {
        title: 'Stratified vs Convenience Sampling in Usability Testing',
        hypothesis:
          'Stratified sampling will surface more usability issues than convenience sampling',
        controlVersion: {
          description:
            'Usability study with 15 convenience-sampled participants (recruited from internal Slack channel and designer networks)',
          metrics: {
            conversionRate: '15 usability issues found',
            timeOnPage: '2 critical issues',
            scrollDepth: '0 accessibility issues',
          },
        },
        treatmentVersion: {
          description:
            'Usability study with 15 stratified-sampled participants (matched to production user demographics across device, age, ability, and experience level)',
          metrics: {
            conversionRate: '27 usability issues found',
            timeOnPage: '6 critical issues',
            scrollDepth: '4 accessibility issues',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Stratified sampling revealed 80% more usability issues, including 4 critical accessibility problems and 3 mobile-specific issues that convenience sampling completely missed. The convenience sample\'s participants were too skilled and too familiar with the product category to encounter real-world problems.',
          learnings: [
            'Convenience sampling systematically under-reports problems experienced by underrepresented groups',
            'Accessibility issues are invisible when participants with disabilities are not recruited',
            'Mobile-specific issues are missed when testers predominantly use desktop',
            'Novice-user confusion is undetectable when all participants are tech-savvy',
          ],
        },
      },
      {
        title: 'Multi-Channel vs Single-Channel Feedback Collection',
        hypothesis:
          'Collecting feedback through multiple channels will produce more representative results than relying on a voluntary feedback form',
        controlVersion: {
          description:
            'Single voluntary feedback button in app footer. 230 responses over 30 days.',
          metrics: {
            conversionRate: 'NPS: 72',
            clickThroughRate: 'Top request: API improvements (45%)',
          },
        },
        treatmentVersion: {
          description:
            'Multi-channel: voluntary button + random in-app survey (2% of sessions) + exit survey for churning users. 230 voluntary + 1,847 random + 312 exit responses.',
          metrics: {
            conversionRate: 'NPS: 41',
            clickThroughRate: 'Top request: Simpler onboarding (38%)',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'The voluntary-only channel produced an NPS 31 points higher than the representative multi-channel approach, because only engaged, satisfied users bothered to submit feedback. The top feature request flipped entirely: power users wanted API improvements, but the broader user base needed simpler onboarding.',
          learnings: [
            'Voluntary feedback dramatically over-represents satisfied power users',
            'NPS from voluntary channels is inflated and misleading',
            'Product priorities can completely invert when sampling bias is corrected',
            'Exit surveys are essential for hearing from users who leave silently',
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
        name: 'Unaudited Analytics Dashboards',
        description:
          'Analytics dashboards that display metrics without indicating what percentage of total users the data represents',
        howToSpot:
          'Look for dashboards missing coverage reports, consent-rate disclosures, or "tracked users vs total users" ratios',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Homogeneous Participant Lists',
        description:
          'Research participant lists that show similar demographics, technical backgrounds, or user types',
        howToSpot:
          'Check recruitment screeners and participant profiles for lack of diversity in age, ability, device type, or experience level',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Voluntary-Only Feedback Sources',
        description:
          'Product decisions justified exclusively by voluntary feedback channels (reviews, support tickets, community forums)',
        howToSpot:
          'Look for decisions citing only app reviews, NPS from voluntary surveys, or community forum requests without representative validation',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Missing Segment Analysis',
        description:
          'A/B test results presented as overall averages without breakdowns by user segment',
        howToSpot:
          'Check whether results are broken down by device, user type, geography, and experience level -- or presented only as a single aggregate number',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Survivorship in Metrics',
        description:
          'Metrics that only measure retained users, ignoring those who left',
        howToSpot:
          'Look for satisfaction or engagement metrics that exclude churned users from the denominator',
        severity: ImpactLevel.CRITICAL,
      },
    ],

    patterns: [
      {
        name: 'Convenience Sample Pattern',
        description: 'Research conducted with whoever is easiest to recruit rather than who is representative',
        indicators: [
          'Participants recruited from internal teams, friends, or social media',
          'No recruitment screener matching production demographics',
          'All participants from a single geographic region or language',
          'No participants with disabilities or accessibility needs',
        ],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Vocal Minority Pattern',
        description: 'Product decisions driven by the loudest users rather than the most representative ones',
        indicators: [
          'Feature priorities based on support ticket volume',
          'Roadmap driven by community forum requests',
          'Design changes in response to social media complaints',
          'No mechanism for hearing from silent majority',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Platform Exclusion Pattern',
        description: 'Entire user segments excluded from data collection due to platform or technical limitations',
        indicators: [
          'Analytics only tracking logged-in users',
          'Cookie consent reducing sample by 20%+ in some regions',
          'Ad blockers preventing tracking script execution',
          'Mobile web users excluded from desktop-focused analytics',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Survivorship Data Pattern',
        description: 'Analysis conducted only on users who remained, ignoring those who left',
        indicators: [
          'Satisfaction metrics exclude churned users',
          'Feature usage stats based only on active accounts',
          'Onboarding success measured without dropout tracking',
          'No exit interview or churn analysis process',
        ],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
    ],

    checklistQuestions: [
      'What percentage of our total user base does this data sample represent?',
      'Who is systematically excluded from our data collection methods?',
      'Are our research participants matched to production user demographics?',
      'Do our A/B test cohorts reflect the full user base, or just a subset?',
      'Are we hearing from users who left, or only from those who stayed?',
      'Do our analytics capture users who reject cookies or block trackers?',
      'Are voluntary feedback channels our only source of user voice?',
      'Have we recruited participants with disabilities for usability testing?',
      'Do we report response rates and non-response characteristics?',
      'Are we confusing a large sample with a representative sample?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in research methodology, survey sampling, and UX research design, specializing in detecting and correcting sampling bias.

Analyze the provided research plan, analytics setup, or data interpretation for sampling bias. Identify:

1. **Coverage Gaps**: Which user segments are excluded from data collection
2. **Self-Selection**: Where voluntary participation skews the sample
3. **Convenience Sampling**: Where ease of recruitment has replaced representativeness
4. **Survivorship Bias**: Where churned or lost users are excluded from analysis
5. **Platform Filtering**: Where technical limitations exclude user segments

For each bias found:
- Identify the affected population segments
- Estimate the direction and magnitude of distortion
- Assess the risk to downstream design decisions
- Propose specific corrections (stratification, multi-channel collection, coverage audits)

Consider:
- Does the sample match the population on key dimensions (device, ability, experience, geography)?
- Are voluntary channels being treated as representative?
- Are analytics coverage gaps acknowledged in reporting?
- Is sample size being confused with sample quality?
- Are A/B test results validated for cohort balance?

Provide actionable recommendations for achieving representative data collection.`,

    outputSchema: {
      type: 'object',
      properties: {
        samplingIssues: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              affectedSegments: { type: 'string' },
              estimatedDistortion: { type: 'string' },
              riskLevel: { type: 'string' },
              correction: { type: 'string' },
            },
            required: [
              'type',
              'affectedSegments',
              'estimatedDistortion',
              'riskLevel',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            coverageScore: { type: 'number' },
            representativenessScore: { type: 'number' },
            methodologicalRigor: { type: 'number' },
            biasRisk: { type: 'number' },
          },
          required: [
            'coverageScore',
            'representativenessScore',
            'methodologicalRigor',
            'biasRisk',
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
        'samplingIssues',
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
        title: 'Audit Your Current Sample',
        description:
          'Before any new research, audit who your current data represents and who it excludes',
        example:
          'Compare analytics demographics to census data or market research for your target audience. Identify gaps.',
        tips: [
          'Calculate what percentage of total traffic your analytics actually capture',
          'Map your feedback channels and identify which user segments each one reaches',
          'Review past research participant lists for demographic gaps',
        ],
      },
      {
        step: 2,
        title: 'Define Your Target Population',
        description:
          'Explicitly define the full population you want to generalize to, not just the users you can easily reach',
        example:
          'Target population: All people who might use our product, including non-tech-savvy users, users with disabilities, and users in low-bandwidth regions',
        tips: [
          'Include users you don\'t currently serve but should',
          'Consider accessibility, language, geography, and technical proficiency',
          'Document exclusion criteria and justify each one',
        ],
      },
      {
        step: 3,
        title: 'Design Stratified Recruitment',
        description:
          'Create recruitment quotas that match your target population\'s key dimensions',
        example:
          'If 60% of users are mobile: recruit 60% mobile participants. If 8% use assistive technology: recruit at least 1-2 AT users per study.',
        tips: [
          'Use production analytics to set quota proportions',
          'Over-sample underrepresented groups for sufficient statistical power',
          'Partner with accessibility organizations for inclusive recruitment',
        ],
      },
      {
        step: 4,
        title: 'Diversify Collection Channels',
        description:
          'Use multiple feedback and data collection channels to counteract each channel\'s inherent bias',
        example:
          'Combine random in-app surveys + exit surveys + voluntary feedback + moderated interviews for a complete picture',
        tips: [
          'No single channel is representative; triangulate across multiple sources',
          'Label each data source with its known biases',
          'Weight channels by representativeness, not by volume',
        ],
      },
      {
        step: 5,
        title: 'Validate and Report Coverage',
        description:
          'Always report sample characteristics, response rates, and known coverage gaps alongside your findings',
        example:
          'Report: "These findings are based on 15 participants matched to production demographics. Limitations: no participants over age 65 were recruited."',
        tips: [
          'Include a "limitations" section in every research report',
          'Report response rates for surveys and note non-response characteristics',
          'Flag when findings may not generalize to excluded segments',
        ],
      },
    ],

    dos: [
      'Use stratified sampling matched to production user demographics',
      'Audit analytics coverage and report what percentage of users are tracked',
      'Recruit research participants with disabilities for every major study',
      'Track and analyze churned users separately from active users',
      'Use multiple feedback channels to triangulate user sentiment',
      'Report sample characteristics and limitations alongside findings',
      'Validate A/B test cohort balance before analyzing results',
      'Include exit surveys to hear from users who leave',
      'Over-sample underrepresented groups for sufficient statistical power',
      'Question any data source that relies solely on voluntary participation',
    ],

    donts: [
      'Don\'t treat social media polls as representative user research',
      'Don\'t confuse large sample size with representative sample quality',
      'Don\'t ignore non-respondents in survey analysis',
      'Don\'t make product decisions based solely on app store reviews',
      'Don\'t assume beta tester feedback generalizes to all users',
      'Don\'t present analytics without disclosing coverage gaps',
      'Don\'t recruit only from your own network or community',
      'Don\'t exclude users with disabilities from research recruitment',
      'Don\'t treat survivorship-biased metrics as unbiased',
      'Don\'t skip cohort validation before A/B test analysis',
    ],

    bestPractices: [
      {
        title: 'Stratified Sampling as Default',
        description:
          'Make stratified sampling the default research method, not convenience sampling',
        rationale:
          'Convenience sampling is faster but produces systematically biased results that compound over time',
        example:
          'Maintain a standing recruitment panel pre-stratified by device, age, ability, and experience level',
      },
      {
        title: 'Coverage Dashboards',
        description:
          'Build analytics dashboards that show both metrics AND their coverage (what % of users the data represents)',
        rationale:
          'Metrics without coverage context create false confidence in incomplete data',
        example:
          'Every analytics dashboard includes a "Data Coverage" panel showing tracked vs total users, consent rates, and excluded segments',
      },
      {
        title: 'Triangulate Across Sources',
        description:
          'Never rely on a single data source; cross-validate findings across multiple collection methods',
        rationale:
          'Each data source has its own sampling bias; triangulation reveals where they agree and disagree',
        example:
          'Compare in-app survey results with analytics data, support tickets, and moderated interview findings before making decisions',
      },
      {
        title: 'Include Churn Cohort Analysis',
        description:
          'Systematically study users who left, not just those who stayed',
        rationale:
          'Churned users hold the most valuable product improvement insights but are invisible in standard analytics',
        example:
          'Monthly churn cohort report comparing demographics, last actions, and exit survey responses against retained-user baselines',
      },
      {
        title: 'Pre-Registration for A/B Tests',
        description:
          'Define hypotheses, metrics, and cohort validation criteria before running experiments',
        rationale:
          'Post-hoc analysis of biased cohorts produces false positives; pre-registration enforces methodological rigor',
        example:
          'Document expected cohort balance, minimum sample size, and primary metric before experiment launch. Auto-flag imbalanced cohorts.',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships - Ensure feedback mechanisms are accessible to all users',
        implementation:
          'All surveys, feedback forms, and research participation channels must be fully accessible via keyboard, screen reader, and other assistive technologies. Inaccessible feedback channels are a sampling bias vector.',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.1.1',
        guideline:
          'Keyboard Accessible - Ensure research tools and surveys are keyboard navigable',
        implementation:
          'All interactive research instruments (surveys, card sorts, tree tests) must be operable via keyboard alone so that motor-impaired users can participate.',
      },
      {
        wcagLevel: 'AA',
        criterion: '3.1.1',
        guideline:
          'Language of Page - Provide surveys in users\' languages',
        implementation:
          'Offer research materials in the languages your product supports. English-only research excludes non-English-speaking user segments.',
      },
    ],

    ethics: [
      {
        concern: 'Exclusion of Marginalized Groups',
        severity: 'critical',
        explanation:
          'Consistently excluding users with disabilities, non-English speakers, or low-income users from research produces products that don\'t serve them',
        mitigation:
          'Mandate inclusive recruitment criteria. Budget for accessibility-focused recruitment partners. Set minimum representation quotas for underserved groups.',
      },
      {
        concern: 'False Confidence from Biased Data',
        severity: 'high',
        explanation:
          'Presenting biased sample results as representative findings misleads stakeholders and produces misallocated resources',
        mitigation:
          'Always disclose sample characteristics, coverage gaps, and known biases. Never present convenience-sampled data as representative without qualification.',
      },
      {
        concern: 'Amplifying Power-User Voices',
        severity: 'high',
        explanation:
          'Building product roadmaps based on power-user feedback creates increasingly complex products that alienate mainstream users',
        mitigation:
          'Weight feedback by segment representativeness, not volume. Actively seek input from casual and new users.',
      },
      {
        concern: 'Privacy-Representativeness Tradeoff',
        severity: 'medium',
        explanation:
          'Aggressive tracking improves data coverage but violates user privacy; respecting privacy creates coverage gaps',
        mitigation:
          'Use privacy-preserving measurement techniques (aggregated analytics, on-device processing). Accept some coverage limitations as the cost of ethical data practices.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'Sampling Techniques',
        author: 'Cochran, W. G.',
        year: 1977,
        description:
          'The definitive textbook on survey sampling methodology, covering stratified, cluster, and systematic sampling designs',
        type: 'foundational',
      },
      {
        title: 'Survey Methodology',
        author: 'Groves, R. M., Fowler, F. J., Couper, M. P., Lepkowski, J. M., Singer, E., & Tourangeau, R.',
        year: 2009,
        description:
          'Comprehensive treatment of survey errors including coverage, sampling, nonresponse, and measurement bias',
        type: 'foundational',
      },
      {
        title: 'Nonresponse in Social Science Surveys: A Research Agenda',
        author: 'National Research Council',
        year: 2013,
        description:
          'Analysis of how non-response bias affects survey validity and strategies for mitigation',
        type: 'advanced',
      },
      {
        title: 'The Challenges of Online Panels for Research on Non-Internet Populations',
        author: 'Couper, M. P.',
        year: 2000,
        doi: '10.1093/poq/nfh062',
        description:
          'Examines how internet-based sampling excludes offline populations, directly relevant to digital product research',
        type: 'practical',
      },
    ],

    books: [
      {
        title: 'Sampling Techniques',
        author: 'Cochran, William G.',
        year: 1977,
        isbn: '9780471162407',
        description:
          'The foundational reference for designing representative samples in research',
        type: 'foundational',
      },
      {
        title: 'Survey Methodology',
        author: 'Groves, Robert M. et al.',
        year: 2009,
        isbn: '9780470465462',
        description:
          'Comprehensive guide to sources of error in surveys, including sampling bias, nonresponse, and coverage',
        type: 'foundational',
      },
      {
        title: 'Just Enough Research',
        author: 'Hall, Erika',
        year: 2013,
        isbn: '9781937557102',
        description:
          'Practical guide to UX research that addresses common sampling pitfalls in product design contexts',
        type: 'practical',
      },
    ],

    articles: [
      {
        title: 'The Perils of Relying on App Store Reviews for Product Decisions',
        author: 'Nielsen Norman Group',
        url: 'https://www.nngroup.com/articles/app-store-reviews/',
        description:
          'How app store review demographics create sampling bias in product feedback',
        type: 'practical',
      },
      {
        title: 'Survivorship Bias in Product Analytics',
        author: 'Reforge',
        url: 'https://www.reforge.com/blog/survivorship-bias',
        description:
          'How analyzing only retained users creates systematically biased product insights',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'Survivorship Bias: The Hidden Flaw in Data',
        author: 'Veritasium',
        url: 'https://www.youtube.com/watch?v=P9WFpVsRtQg',
        description:
          'Visual explanation of survivorship bias using the famous WWII aircraft armor example',
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
      'confirmation-bias',     // Biased samples confirm existing beliefs
      'survivorship-bias',     // A specific form of sampling bias
      'availability-heuristic', // Available examples feel representative
      'base-rate-neglect',     // Biased samples distort base rate perception
    ],

    conflicts: [
      'law-of-large-numbers',  // Large samples don't fix non-random selection
    ],

    confusedWith: [
      'selection-bias',        // Broader category; sampling bias is a type
      'survivorship-bias',     // Specific subtype often conflated with the general case
      'response-bias',         // Different error: how people answer vs who answers
    ],

    hierarchy: {
      parent: 'selection-bias',
      children: [
        'survivorship-bias',
        'self-selection-bias',
        'non-response-bias',
      ],
    },
  },
};
