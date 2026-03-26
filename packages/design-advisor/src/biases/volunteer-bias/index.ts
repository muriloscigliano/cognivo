/**
 * VOLUNTEER BIAS
 *
 * People who volunteer for studies, surveys, or beta programs differ
 * systematically from non-volunteers, creating skewed data.
 */

import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const volunteerBias: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'volunteer-bias',
    name: 'Volunteer Bias',
    aliases: ['Self-Selection Bias', 'Volunteer Effect', 'Participation Bias'],
    category: BiasCategory.COGNITIVE,
    relatedCategories: [
      BiasCategory.DECISION_MAKING,
      BiasCategory.SOCIAL,
    ],
    tags: [
      'user-research',
      'sampling',
      'feedback',
      'beta-testing',
      'surveys',
      'data-quality',
      'recruitment',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple:
      'People who volunteer for studies or surveys differ systematically from those who do not.',

    detailed: `Volunteer bias occurs when the participants who self-select into a study, survey, beta program, or feedback channel are not representative of the broader population. Volunteers tend to be more motivated, more opinionated, more technically confident, and more invested in the topic than the average user.

This creates a systematic distortion in the data collected. Feedback from volunteers skews toward power users and enthusiasts, while the silent majority -- casual users, struggling users, and disengaged users -- go unheard. Decisions based solely on volunteer-sourced data can lead to products optimized for a vocal minority rather than the actual user base.

In UX and product design, volunteer bias is pervasive. It affects user research recruitment, NPS survey responses, beta tester feedback, app store reviews, support forum participation, and feature request boards. Recognizing and correcting for this bias is essential for building products that truly serve all users.`,

    psychologyBasis: {
      discoveredBy: 'Robert Rosenthal and Ralph Rosnow',
      year: 1975,
      theory: 'Volunteer Subject Research',
      mechanism: `Volunteers systematically differ from non-volunteers across several dimensions:

1. **Motivation Asymmetry**: People who opt in are driven by stronger opinions, curiosity, or investment in the outcome -- they care more than the average user
2. **Competence Skew**: Volunteers tend to be more educated, more tech-savvy, and more confident in their abilities than non-participants
3. **Opinion Extremity**: People with moderate opinions rarely volunteer; those with strong positive or negative feelings are overrepresented
4. **Social Desirability**: Volunteers are more likely to seek approval and provide socially desirable responses
5. **Availability Confound**: People with more free time or flexibility are overrepresented, skewing demographic profiles

These differences are not random -- they are systematic and predictable, making the bias consistent and correctable once recognized.`,
    },

    realWorldExample: `Rosenthal and Rosnow (1975) documented that psychology study volunteers scored higher on intelligence tests, had higher need for social approval, and were more sociable than non-volunteers. In product contexts, this explains why beta testers love features that mainstream users find confusing -- the testers who signed up are fundamentally different from the users who did not.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `Volunteer bias affects the validity of every user insight gathered through opt-in methods. It distorts the picture of who your users are and what they need. Designers and researchers must:

- Recognize that opt-in feedback channels overrepresent power users and enthusiasts
- Use proactive, randomized outreach to capture the silent majority
- Weight and contextualize volunteer feedback against behavioral analytics
- Design research recruitment strategies that minimize self-selection effects
- Triangulate findings across multiple data sources to compensate for skew`,

    whenToUse: [
      {
        title: 'Proactive Feedback Collection',
        scenario:
          'When gathering user feedback on features, flows, or satisfaction',
        example:
          'Trigger short, contextual surveys at random to a sample of users mid-task, rather than relying on a persistent feedback button only motivated users click',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Randomized Research Recruitment',
        scenario: 'When recruiting participants for usability studies or interviews',
        example:
          'Randomly select and personally invite users from different segments instead of posting an open call that only enthusiasts respond to',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Incentivized Participation',
        scenario: 'When you need a representative sample for surveys or testing',
        example:
          'Offer meaningful incentives (gift cards, account credits) to reduce the motivation gap between volunteers and non-volunteers',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Beta Program Diversification',
        scenario: 'When launching a beta program for new features or products',
        example:
          'Instead of open beta sign-ups, stratify invitations across user segments: new users, casual users, power users, churned users',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Behavioral Data Triangulation',
        scenario: 'When interpreting qualitative feedback or survey results',
        example:
          'Cross-reference NPS scores and feature requests against actual usage analytics to validate whether volunteer feedback represents real behavior',
        impact: ImpactLevel.MEDIUM,
      },
    ],

    whenToAvoid: [
      {
        title: 'Dismissing All Volunteer Feedback',
        reason:
          'Volunteer feedback still contains valid signal, especially about pain points and edge cases',
        consequence:
          'Ignoring volunteers entirely means losing early warnings about bugs, usability issues, and unmet needs',
        alternative:
          'Use volunteer feedback as one input alongside behavioral data and proactively-sourced research',
      },
      {
        title: 'Over-Correcting with Forced Participation',
        reason:
          'Mandatory surveys or research participation creates resentment and low-quality responses',
        consequence:
          'Users rush through, provide random answers, or develop negative brand associations',
        alternative:
          'Use lightweight, contextual micro-surveys and respect user time with clear opt-out',
      },
      {
        title: 'Assuming All Users Are Equally Reachable',
        reason:
          'Some user segments are inherently harder to reach (churned users, infrequent users)',
        consequence:
          'Research still skews toward active users even with proactive recruitment',
        alternative:
          'Use intercept methods, exit surveys, and behavioral analytics to capture hard-to-reach segments',
      },
      {
        title: 'Ignoring Cultural and Demographic Factors',
        reason:
          'Volunteer rates differ across cultures, age groups, and socioeconomic backgrounds',
        consequence:
          'Global products designed primarily from feedback of culturally WEIRD (Western, Educated, Industrialized, Rich, Democratic) volunteers',
        alternative:
          'Actively recruit across demographics and use local research partners for diverse perspectives',
      },
    ],

    commonMistakes: [
      {
        title: 'Treating Beta Feedback as Universal',
        description:
          'Assuming beta tester preferences represent all users when beta testers self-selected into the program',
        why: 'Beta testers are typically power users who tolerate complexity and value novelty -- the opposite of mainstream users',
        fix: 'Label beta feedback as "enthusiast perspective" and validate findings with broader user segments before shipping',
      },
      {
        title: 'Relying on NPS from Opt-In Surveys',
        description:
          'Calculating NPS only from users who chose to respond to the survey',
        why: 'Satisfied and dissatisfied users are overrepresented; the moderate majority does not respond',
        fix: 'Track response rates, weight results by segment, and supplement with behavioral indicators of satisfaction',
      },
      {
        title: 'Feature Prioritization from Request Boards',
        description:
          'Building the roadmap based on feature upvotes from a public request board',
        why: 'Only the most engaged users vote; their priorities diverge from the majority who never visit the board',
        fix: 'Combine request board data with usage analytics, support ticket analysis, and proactive research with non-power-users',
      },
      {
        title: 'App Store Review Bias',
        description:
          'Treating app store ratings as representative of overall user satisfaction',
        why: 'Reviewers are a tiny, biased fraction: those who love the app or hate it enough to write a review',
        fix: 'Use in-app satisfaction metrics alongside store ratings; analyze behavioral signals like retention and engagement',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.MEDIUM,
        description:
          'Feedback mechanisms and research recruitment touchpoints must be positioned to reach diverse users',
        examples: [
          'Feedback buttons buried in settings only reached by power users',
          'Survey prompts shown only after long sessions miss casual users',
          'Research recruitment banners on landing pages miss logged-in users',
          'Contextual feedback prompts during task flows reach a broader audience',
        ],
      },
      typography: {
        level: ImpactLevel.LOW,
        description:
          'Survey and feedback language complexity affects who responds',
        examples: [
          'Technical jargon in surveys filters out non-expert users',
          'Simple, plain-language questions increase response diversity',
          'Reading level of consent forms affects who agrees to participate',
          'Clear, concise survey copy reduces response fatigue across all segments',
        ],
      },
      color: {
        level: ImpactLevel.LOW,
        description:
          'Visual prominence of feedback mechanisms affects self-selection',
        examples: [
          'High-contrast feedback buttons attract attention-seeking users',
          'Subtle feedback prompts may only be noticed by detail-oriented users',
          'Color-coding survey urgency affects which user types respond',
          'Neutral visual treatment of surveys reduces emotional self-selection',
        ],
      },
      interaction: {
        level: ImpactLevel.HIGH,
        description:
          'How feedback is requested determines who participates',
        examples: [
          'Pop-up surveys reach more users than opt-in feedback forms',
          'In-context micro-surveys during task completion capture broader perspectives',
          'Email surveys overrepresent users who read and engage with email',
          'Randomized intercept methods provide more representative samples',
        ],
      },
      content: {
        level: ImpactLevel.HIGH,
        description:
          'How research is framed and communicated affects volunteer demographics',
        examples: [
          'Describing research as "helping shape the future" attracts enthusiasts',
          'Emphasizing time commitment filters out busy professionals',
          'Promising early access attracts power users, not mainstream users',
          'Neutral framing ("brief questions about your experience") broadens participation',
        ],
      },
      accessibility: {
        level: ImpactLevel.HIGH,
        description:
          'Inaccessible research tools systematically exclude disabled users',
        examples: [
          'Screen-reader-incompatible surveys exclude visually impaired users',
          'Time-limited surveys exclude users with cognitive disabilities',
          'Video-only research excludes deaf and hard-of-hearing users',
          'Accessible, multimodal research methods capture more diverse perspectives',
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
        title: 'Randomized In-Context Micro-Survey',
        description:
          'Product triggers a short survey to a random sample of users during natural task flow',
        code: `<div class="micro-survey" role="complementary" aria-label="Quick feedback">
  <p class="survey-prompt">Quick question (15 sec):</p>
  <p class="survey-question">How easy was it to find what you needed today?</p>
  <div class="rating-scale" role="radiogroup" aria-label="Ease rating">
    <button class="rating" aria-label="Very difficult">1</button>
    <button class="rating" aria-label="Difficult">2</button>
    <button class="rating" aria-label="Neutral">3</button>
    <button class="rating" aria-label="Easy">4</button>
    <button class="rating" aria-label="Very easy">5</button>
  </div>
  <button class="dismiss" aria-label="Dismiss survey">Not now</button>
  <p class="context">Shown to 5% of users at random after task completion</p>
</div>`,
        explanation:
          'By randomly selecting users and triggering the survey during natural task flow, this approach captures feedback from users who would never seek out a feedback button. The short format and easy dismiss respect user time.',
        principle:
          'Random sampling during natural flows captures the silent majority that opt-in methods miss',
        metrics: {
          before: '2% of users provided feedback via opt-in button (92% power users)',
          after: '18% response rate from random sample (representative distribution)',
          improvement: '9x more diverse feedback with demographic representation matching actual user base',
        },
      },
      {
        title: 'Stratified Beta Program Recruitment',
        description:
          'Beta invitations distributed proportionally across user segments',
        code: `<div class="beta-invite">
  <h3>You're Invited to Try Our New Dashboard</h3>
  <p>We selected you because we value feedback from
     <strong>users like you</strong> — people who use the product
     occasionally for quick tasks.</p>
  <p>Your perspective helps us build something that works
     for everyone, not just power users.</p>
  <div class="incentive">
    <span class="reward">$25 account credit</span>
    <span class="time">~20 minutes of your time</span>
  </div>
  <button class="primary">Join the Beta</button>
  <button class="secondary">Maybe Later</button>
</div>`,
        explanation:
          'Personal, targeted invitations to underrepresented segments (casual users) with clear incentives and time expectations reduce self-selection effects. Explaining why they were chosen increases participation from non-typical volunteers.',
        principle:
          'Targeted recruitment with incentives reaches users who would never self-select into research',
      },
      {
        title: 'Behavioral + Attitudinal Data Triangulation',
        description:
          'Dashboard showing survey results contextualized against behavioral data',
        code: `<div class="research-dashboard">
  <h3>Feature Satisfaction Analysis</h3>

  <div class="data-source volunteer">
    <h4>Survey Respondents (n=340, self-selected)</h4>
    <div class="metric">Satisfaction: 4.2/5</div>
    <div class="caveat">⚠️ 78% are weekly+ users (vs 23% of total base)</div>
  </div>

  <div class="data-source behavioral">
    <h4>All Users Behavioral Data (n=12,400)</h4>
    <div class="metric">Task completion: 61%</div>
    <div class="metric">Feature adoption: 34%</div>
    <div class="metric">Error rate: 18%</div>
  </div>

  <div class="insight">
    <p><strong>Volunteer bias detected:</strong> Survey respondents report
    high satisfaction, but behavioral data shows most users struggle.
    Prioritize usability improvements over new feature requests.</p>
  </div>
</div>`,
        explanation:
          'By displaying volunteer-sourced data alongside behavioral analytics, the team can see where volunteer feedback diverges from actual user behavior. The explicit caveat about respondent skew prevents misinterpretation.',
        principle:
          'Triangulating self-reported and behavioral data reveals volunteer bias and guides better decisions',
      },
    ],

    bad: [
      {
        title: 'Open-Call Beta with No Stratification',
        description:
          'Public beta sign-up that attracts only enthusiasts and power users',
        code: `<!-- DON'T DO THIS -->
<div class="beta-signup">
  <h2>Join Our Beta Program!</h2>
  <p>Be the first to try our new features!
     Help shape the future of our product!</p>
  <form>
    <input type="email" placeholder="Your email">
    <button type="submit">Sign Me Up!</button>
  </form>
  <p class="count">2,847 beta testers and counting!</p>
</div>`,
        explanation:
          'This open call attracts only the most enthusiastic, tech-savvy users. The "shape the future" framing and "be first" language specifically appeals to early adopters. Feedback from this group will not represent mainstream users.',
        principle:
          'Open-call recruitment with enthusiasm-oriented messaging maximizes volunteer bias',
      },
      {
        title: 'NPS Survey with No Response Rate Tracking',
        description:
          'Reporting NPS score without accounting for who responded',
        code: `<!-- DON'T DO THIS -->
<div class="nps-report">
  <h3>Customer Satisfaction</h3>
  <div class="nps-score">
    <span class="number">72</span>
    <span class="label">NPS Score</span>
  </div>
  <p>Based on 340 responses</p>
  <p class="conclusion">Our customers love us!</p>
  <!-- Missing: response rate, respondent demographics,
       comparison to behavioral data, segment breakdown -->
</div>`,
        explanation:
          'With 12,400 total users and only 340 responses (2.7% response rate), this NPS score reflects the opinions of a self-selected minority. Without response rate context and demographic breakdown, the score is misleading.',
        principle:
          'Survey metrics without response rate and demographic context mask volunteer bias',
      },
      {
        title: 'Feature Roadmap from Request Board',
        description:
          'Prioritizing features based solely on community upvotes',
        code: `<!-- DON'T DO THIS -->
<div class="roadmap">
  <h3>What We're Building Next</h3>
  <p>You asked, we listened! Top voted features:</p>
  <ol>
    <li>Advanced API webhooks (847 votes)</li>
    <li>Custom scripting engine (623 votes)</li>
    <li>CLI tool integration (512 votes)</li>
    <li>Dark mode for code editor (498 votes)</li>
  </ol>
  <!-- All top requests from power users / developers.
       Mainstream user needs (simpler onboarding, better docs,
       mobile support) are buried or absent. -->
</div>`,
        explanation:
          'Feature request boards are dominated by power users and developers. The top-voted features serve the most vocal minority while fundamental usability and accessibility needs of the broader user base go unaddressed.',
        principle:
          'Community voting boards amplify power user voices and suppress mainstream user needs',
      },
    ],

    realWorld: [
      {
        company: 'Apple',
        product: 'AppleSeed Beta Program',
        description: 'Apple invites specific customer segments to beta test new OS releases rather than relying solely on open developer beta. They stratify invitations across device types, usage patterns, and demographics to get more representative feedback than developer-only testing would provide.',
        effectiveness: 'effective',
        analysis: 'By controlling beta recruitment, Apple gets feedback from non-developers who represent actual customer behavior, complementing the enthusiast developer beta channel.',
      },
      {
        company: 'Slack',
        product: 'Customer Experience Surveys',
        description: 'Slack uses randomized in-app surveys triggered during natural workflows rather than relying solely on opt-in feedback. They track response rates by segment and weight results to account for differential response rates across user types.',
        effectiveness: 'effective',
        analysis: 'Random intercept methodology captures casual and occasional users who would never proactively submit feedback, providing a more representative picture of satisfaction.',
      },
      {
        company: 'Spotify',
        product: 'Spotify Research Panels',
        description: 'Spotify maintains diverse research panels with stratified recruitment across listening habits, demographics, and engagement levels. They actively recruit light listeners and non-premium users, not just power users and subscribers.',
        effectiveness: 'effective',
        analysis: 'Deliberate inclusion of low-engagement users prevents the research from being dominated by music enthusiasts who are unrepresentative of the broader free-tier user base.',
      },
      {
        company: 'Various',
        product: 'App Store Reviews',
        description: 'App store review populations are heavily biased: only users with extreme opinions (very satisfied or very frustrated) take the time to write reviews. Most apps have review rates under 1%, making star ratings a poor proxy for overall satisfaction.',
        effectiveness: 'somewhat-effective',
        analysis: 'App store reviews are a textbook case of volunteer bias. The bimodal distribution (mostly 1-star and 5-star reviews) reflects who volunteers to review, not the actual distribution of user satisfaction.',
      },
    ],

    abTests: [
      {
        title: 'Opt-In Feedback vs Random Intercept Survey',
        hypothesis:
          'Randomly triggered surveys will produce more representative feedback than a persistent opt-in feedback button',
        controlVersion: {
          description:
            'Persistent "Give Feedback" button in the footer, available to all users at all times',
          metrics: {
            conversionRate: '1.8%',
            timeOnPage: 'N/A',
            scrollDepth: 'N/A',
          },
        },
        treatmentVersion: {
          description:
            'Contextual micro-survey shown to 5% of users at random after task completion, with easy dismiss option',
          metrics: {
            conversionRate: '22%',
            timeOnPage: 'N/A',
            scrollDepth: 'N/A',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Random intercept surveys achieved 12x higher response rates. More importantly, respondent demographics closely matched the actual user base (32% new users vs 8% from opt-in). Feature satisfaction scores were 0.8 points lower in the representative sample, revealing usability issues hidden by volunteer bias in the opt-in channel.',
          learnings: [
            'Opt-in feedback dramatically overrepresents power users (92% weekly+ users vs 23% of actual base)',
            'Representative sampling revealed usability issues masked by enthusiast satisfaction',
            'Short, contextual format respected user time while achieving high response rates',
            'Combining both channels provides the most complete picture: representative data + detailed enthusiast insights',
          ],
        },
      },
      {
        title: 'Open Beta vs Stratified Beta Recruitment',
        hypothesis:
          'Stratified beta recruitment will surface more usability issues than open sign-up',
        controlVersion: {
          description:
            'Open beta sign-up page: "Join our beta! Be the first to try new features"',
          metrics: {
            conversionRate: '4.1%',
            clickThroughRate: '12%',
          },
        },
        treatmentVersion: {
          description:
            'Targeted beta invitations to stratified user segments with personalized messaging and $25 incentive',
          metrics: {
            conversionRate: '31%',
            clickThroughRate: '48%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Stratified recruitment surfaced 3.2x more usability issues, particularly around onboarding and basic task flows. Open beta participants reported 89% satisfaction; stratified participants reported 64% -- revealing a satisfaction gap hidden by volunteer bias.',
          learnings: [
            'Open beta missed critical onboarding issues because beta volunteers skip onboarding',
            'Casual users found 3x more navigation and discoverability problems',
            'Incentivized participation from non-enthusiasts revealed the true learning curve',
            'Targeted messaging explaining why their specific perspective matters increased acceptance rates',
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
        name: 'Opt-In Only Feedback',
        description:
          'Feedback collection relies entirely on user-initiated channels (feedback buttons, support tickets, forums)',
        howToSpot:
          'Check if all feedback mechanisms require users to seek them out. Look for absence of proactive, randomized outreach.',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Uncontextualized Survey Metrics',
        description:
          'Survey results presented without response rates, respondent demographics, or behavioral cross-reference',
        howToSpot:
          'Look for NPS scores, satisfaction ratings, or survey results without mentions of response rate or respondent profile',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Enthusiast-Oriented Recruitment',
        description:
          'Research recruitment language that appeals specifically to power users and enthusiasts',
        howToSpot:
          'Watch for "shape the future", "be the first", "join our community" framing in research invitations',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Community-Driven Roadmaps',
        description:
          'Product roadmaps built primarily from community voting or feature request boards',
        howToSpot:
          'Check if feature prioritization comes from upvote boards, forum requests, or community polls without behavioral data validation',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Homogeneous Tester Profiles',
        description:
          'Beta programs or research panels composed primarily of one user type',
        howToSpot:
          'Review participant demographics against actual user base demographics; look for overrepresentation of power users',
        severity: ImpactLevel.MEDIUM,
      },
    ],

    patterns: [
      {
        name: 'Self-Selection Feedback Loop',
        description: 'Feedback mechanisms that only enthusiasts discover and use, creating a reinforcing cycle where the product serves enthusiasts better, attracting more enthusiast feedback',
        indicators: ['Feedback button in settings or footer', 'Community forum as primary feedback channel', 'Feature request boards with upvoting', 'Open beta sign-up forms'],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Satisfaction Inflation Pattern',
        description: 'Reported satisfaction scores higher than behavioral metrics suggest, indicating volunteer feedback skew',
        indicators: ['High NPS but low retention', 'High satisfaction but high support ticket volume', 'Positive survey results but poor task completion rates', 'Good ratings but declining engagement'],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Power User Roadmap Pattern',
        description: 'Feature roadmap dominated by advanced capabilities while fundamental usability issues persist',
        indicators: ['Top requests are all power-user features', 'Basic usability issues not on the roadmap', 'New user onboarding issues ignored', 'Accessibility improvements deprioritized'],
        severity: ImpactLevel.HIGH,
        confidence: 'medium',
      },
      {
        name: 'Bimodal Review Distribution',
        description: 'Ratings cluster at extremes (1-star and 5-star) with few moderate reviews, indicating only polarized users volunteer feedback',
        indicators: ['U-shaped rating distribution', 'Average rating does not match mode', 'High variance in scores', 'Low overall review rate'],
        severity: ImpactLevel.MEDIUM,
        confidence: 'high',
      },
    ],

    checklistQuestions: [
      'What percentage of our user base actually provides feedback through our current channels?',
      'Do our survey respondents demographically match our actual user base?',
      'Are we using any randomized or proactive methods to gather feedback?',
      'How are our beta testers recruited, and do they represent all user segments?',
      'Do our behavioral metrics (retention, task completion) align with reported satisfaction?',
      'Are feature requests validated against actual usage data from the broader user base?',
      'Have we heard from new users, casual users, and churned users -- not just power users?',
      'Do we track and report survey response rates alongside results?',
      'Are our research participants incentivized to reduce self-selection effects?',
      'Are we triangulating self-reported data with behavioral analytics?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in research methodology and UX design, specializing in volunteer bias and sampling validity.

Analyze the provided design, research methodology, or feedback strategy for volunteer bias patterns. Identify:

1. **Self-Selection Channels**: Feedback mechanisms that only motivated users engage with
2. **Recruitment Methods**: How research participants or beta testers are sourced
3. **Sample Representativeness**: Whether participants match the actual user population
4. **Data Triangulation**: Whether self-reported data is validated against behavioral data
5. **Reporting Context**: Whether survey results include response rates and demographic breakdowns

For each pattern found:
- Identify which user segments are overrepresented and underrepresented
- Assess the degree of bias in the data
- Determine how the bias might distort product decisions
- Suggest specific corrective strategies
- Recommend complementary data sources

Consider:
- Are feedback channels accessible to all user types, or only power users?
- Is the research recruitment strategy producing a representative sample?
- Are survey results presented with appropriate caveats about response bias?
- Does the product roadmap reflect all users or just the vocal minority?
- Are there systematic exclusions in research participation (accessibility, language, time)?

Provide actionable recommendations for reducing volunteer bias in research and feedback.`,

    outputSchema: {
      type: 'object',
      properties: {
        volunteerBiasPatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              overrepresentedSegment: { type: 'string' },
              underrepresentedSegment: { type: 'string' },
              biasLevel: { type: 'string' },
              dataImpact: { type: 'string' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'overrepresentedSegment',
              'underrepresentedSegment',
              'biasLevel',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            sampleRepresentativeness: { type: 'number' },
            feedbackChannelDiversity: { type: 'number' },
            dataTriangulation: { type: 'number' },
            reportingTransparency: { type: 'number' },
          },
          required: [
            'sampleRepresentativeness',
            'feedbackChannelDiversity',
            'dataTriangulation',
            'reportingTransparency',
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
        'volunteerBiasPatterns',
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
          'Map all existing feedback and research channels and assess which user segments they reach',
        example:
          'List: feedback button (power users), NPS email (email-engaged users), beta program (enthusiasts), support tickets (frustrated users). Identify gaps: new users, casual users, mobile-only users.',
        tips: [
          'Compare respondent demographics to actual user base demographics',
          'Calculate response rates for each channel',
          'Identify which segments are systematically excluded',
        ],
      },
      {
        step: 2,
        title: 'Implement Randomized Intercept Methods',
        description:
          'Add proactive, randomized feedback collection that reaches users who would never opt in',
        example:
          'Trigger 1-question micro-surveys to 5% of users at random after key task completion points',
        tips: [
          'Keep surveys short (1-3 questions maximum)',
          'Trigger during natural pauses in the user flow',
          'Always provide an easy, no-guilt dismiss option',
          'Rotate questions to cover different topics over time',
        ],
      },
      {
        step: 3,
        title: 'Stratify Research Recruitment',
        description:
          'When recruiting for studies, intentionally sample from underrepresented segments',
        example:
          'For a usability study of 12 participants: 4 new users (<30 days), 4 casual users (monthly), 4 power users (daily)',
        tips: [
          'Use behavioral data to define segments before recruiting',
          'Offer higher incentives for harder-to-reach segments',
          'Personalize outreach to explain why their perspective matters',
        ],
      },
      {
        step: 4,
        title: 'Triangulate Data Sources',
        description:
          'Cross-reference self-reported feedback with behavioral analytics to detect and correct for volunteer bias',
        example:
          'Compare NPS survey satisfaction (4.2/5 from volunteers) against actual retention rate (62%) and task completion rate (58%) to reveal the true experience',
        tips: [
          'Build dashboards that show attitudinal and behavioral data side-by-side',
          'Flag when survey results diverge significantly from behavioral metrics',
          'Use behavioral data as the ground truth, not survey data',
        ],
      },
      {
        step: 5,
        title: 'Report with Transparency',
        description:
          'Always present research findings with caveats about sample composition and potential volunteer bias',
        example:
          'Report: "NPS of 72 (n=340, 2.7% response rate, 78% weekly+ users). Behavioral satisfaction indicators suggest actual NPS may be 15-20 points lower."',
        tips: [
          'Always include response rate alongside results',
          'Show respondent segment breakdown vs actual user base',
          'Qualify conclusions based on sample representativeness',
        ],
      },
    ],

    dos: [
      'Use randomized, proactive feedback methods alongside opt-in channels',
      'Stratify research recruitment to include underrepresented user segments',
      'Track and report response rates for all surveys and feedback channels',
      'Offer incentives to reduce the motivation gap between volunteers and non-volunteers',
      'Triangulate self-reported data with behavioral analytics',
      'Label feedback source (volunteer vs proactive) in research reports',
      'Actively recruit from hard-to-reach segments (new users, churned users, casual users)',
      'Present survey results with demographic breakdowns and representativeness assessments',
    ],

    donts: [
      'Don\'t treat beta tester feedback as representative of all users',
      'Don\'t report NPS or satisfaction scores without response rate context',
      'Don\'t build roadmaps solely from feature request boards or community votes',
      'Don\'t assume app store reviews represent overall user sentiment',
      'Don\'t use enthusiasm-oriented language in research recruitment (unless targeting enthusiasts)',
      'Don\'t ignore the silent majority who never provide feedback through opt-in channels',
      'Don\'t force participation -- it creates resentment and low-quality data',
      'Don\'t conflate "no feedback" with "no problems"',
    ],

    bestPractices: [
      {
        title: 'Random Intercept Surveys',
        description:
          'Trigger short contextual surveys to random user samples during natural workflows',
        rationale:
          'Randomization eliminates self-selection; contextual timing captures in-the-moment reactions',
        example:
          'After task completion, show a 1-question survey to 5% of users: "How easy was this?"',
      },
      {
        title: 'Stratified Beta Programs',
        description:
          'Distribute beta invitations proportionally across user segments rather than using open sign-ups',
        rationale:
          'Ensures feedback includes perspectives from casual, new, and struggling users -- not just enthusiasts',
        example:
          'Invite 30% power users, 30% regular users, 20% casual users, 20% new users',
      },
      {
        title: 'Behavioral-Attitudinal Dashboards',
        description:
          'Display survey and feedback data alongside behavioral metrics to reveal bias-driven discrepancies',
        rationale:
          'When self-reported satisfaction is high but retention is low, volunteer bias is likely at play',
        example:
          'Side-by-side: NPS 72 (survey) vs 38% 90-day retention vs 61% task completion',
      },
      {
        title: 'Response Rate Reporting',
        description:
          'Always report survey response rates and respondent demographics alongside results',
        rationale:
          'A 3% response rate means 97% of users are unheard; that context changes interpretation',
        example:
          'NPS: 72 | Response rate: 2.7% | Respondent profile: 78% weekly+ users (vs 23% of base)',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships - Ensure survey and feedback forms are semantically structured',
        implementation:
          'Use proper form labels, fieldsets, and ARIA attributes so screen reader users can participate equally in surveys and feedback collection',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.2.1',
        guideline:
          'Timing Adjustable - Do not impose strict time limits on surveys',
        implementation:
          'Allow users with cognitive or motor disabilities sufficient time to complete surveys. Avoid countdown timers on feedback forms.',
      },
      {
        wcagLevel: 'AA',
        criterion: '3.2.2',
        guideline:
          'On Input - Ensure survey interactions are predictable',
        implementation:
          'Do not auto-submit survey responses on selection. Provide clear submit and dismiss actions so all users maintain control.',
      },
    ],

    ethics: [
      {
        concern: 'Silent Majority Neglect',
        severity: 'critical',
        explanation:
          'Building products based on volunteer feedback alone systematically ignores the needs of most users, particularly less tech-savvy, less confident, or less engaged users',
        mitigation:
          'Implement proactive, randomized feedback collection and validate all volunteer insights against behavioral data from the full user base.',
      },
      {
        concern: 'Accessibility Exclusion in Research',
        severity: 'critical',
        explanation:
          'Inaccessible research tools and methods systematically exclude disabled users from providing feedback, creating products that ignore their needs',
        mitigation:
          'Ensure all surveys, feedback forms, and research tools meet WCAG AA standards. Offer multiple participation modalities (text, audio, video).',
      },
      {
        concern: 'Demographic Skew in Decisions',
        severity: 'high',
        explanation:
          'Volunteer pools tend to overrepresent privileged demographics (educated, affluent, English-speaking), skewing product decisions against underserved populations',
        mitigation:
          'Actively recruit from underrepresented demographics. Translate surveys. Use local research partners for global products.',
      },
      {
        concern: 'False Confidence from Biased Data',
        severity: 'high',
        explanation:
          'Presenting biased volunteer data without caveats creates false confidence in decisions that may harm the broader user base',
        mitigation:
          'Always report sample composition, response rates, and representativeness assessments alongside research findings.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'The Volunteer Subject',
        author: 'Rosenthal, R., & Rosnow, R. L.',
        year: 1975,
        description:
          'The foundational work documenting how volunteers differ systematically from non-volunteers across multiple dimensions',
        type: 'foundational',
      },
      {
        title: 'Volunteer Bias in Research: A Meta-Analysis',
        author: 'Heiman, G. W.',
        year: 2002,
        description:
          'Meta-analytic review quantifying the magnitude and consistency of volunteer bias across research domains',
        type: 'advanced',
      },
      {
        title: 'Who Responds to Customer Surveys? New Evidence from a Large-Scale Study',
        author: 'Whitman, J., & Woodruff, R. B.',
        year: 2006,
        description:
          'Empirical study of self-selection in customer satisfaction surveys and the resulting data distortions',
        type: 'practical',
      },
    ],

    books: [
      {
        title: 'The Volunteer Subject',
        author: 'Rosenthal, Robert & Rosnow, Ralph L.',
        year: 1975,
        isbn: '9780471735090',
        description:
          'Comprehensive examination of how volunteer subjects differ from non-volunteers, with implications for research validity',
        type: 'foundational',
      },
      {
        title: 'Just Enough Research',
        author: 'Hall, Erika',
        year: 2013,
        isbn: '9781937557102',
        description:
          'Practical guide to user research methods that addresses sampling bias and recruitment strategies',
        type: 'practical',
      },
    ],

    articles: [
      {
        title: 'Survivorship Bias and User Research',
        author: 'Nielsen Norman Group',
        url: 'https://www.nngroup.com/articles/survivorship-bias/',
        description:
          'How self-selection in user research creates blind spots, and practical strategies for more representative sampling',
        type: 'practical',
      },
      {
        title: 'The Silent Majority: Why Most Users Never Give Feedback',
        author: 'Intercom Blog',
        url: 'https://www.intercom.com/blog/the-silent-majority/',
        description:
          'Analysis of feedback channel self-selection and strategies for hearing from non-vocal users',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'Selection Bias and User Research',
        author: 'NNGroup',
        url: 'https://www.youtube.com/watch?v=p0O4VFhvKBU',
        description:
          'Overview of how self-selection affects user research validity and what to do about it',
        type: 'practical',
      },
    ],

    demos: [],
  },

  //===========================================
  // RELATIONSHIPS
  //===========================================
  relationships: {
    complements: [
      'survivorship-bias',
      'confirmation-bias',
      'selection-bias',
      'false-consensus-effect',
    ],

    conflicts: [
      'base-rate-neglect',
    ],

    confusedWith: [
      'selection-bias',
      'survivorship-bias',
      'response-bias',
    ],

    hierarchy: {
      parent: 'selection-bias',
      children: [
        'non-response-bias',
        'self-selection-bias',
      ],
    },
  },
};
