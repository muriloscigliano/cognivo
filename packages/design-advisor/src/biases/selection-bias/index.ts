/**
 * SELECTION BIAS
 *
 * Systematic error from non-representative sample selection
 */

import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const selectionBias: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'selection-bias',
    name: 'Selection Bias',
    aliases: ['Sampling Bias', 'Sample Selection Bias', 'Ascertainment Bias'],
    category: BiasCategory.COGNITIVE,
    relatedCategories: [
      BiasCategory.DECISION_MAKING,
      BiasCategory.PERCEPTION,
    ],
    tags: [
      'research',
      'sampling',
      'methodology',
      'user-research',
      'analytics',
      'feedback',
      'representation',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple:
      'A systematic error in choosing study or survey participants that results in a non-representative sample.',

    detailed: `Selection bias occurs when the individuals or data points included in a study, survey, or analysis are not representative of the larger population they are meant to describe. This distortion arises from the method of participant recruitment, voluntary participation patterns, or systematic exclusion of certain groups.

In product design and UX research, selection bias is pervasive and dangerous. Beta testers are often power users, not typical ones. Survey respondents are those with time and motivation to respond. App store reviewers skew toward extreme satisfaction or frustration. Support tickets reflect only the problems vocal users report, not the silent majority who churn.

When teams make design decisions based on biased samples, they build products optimized for a non-representative subset of their users, leading to features that miss the mark for the broader audience and blind spots in the user experience.`,

    psychologyBasis: {
      discoveredBy: 'Joseph Berkson and James Heckman',
      year: 1946,
      theory: 'Statistical Sampling Theory and Econometric Selection Models',
      mechanism: `Selection bias distorts conclusions because the observed sample systematically differs from the target population. This happens through several mechanisms:

1. **Self-Selection**: Participants who volunteer differ systematically from those who do not (e.g., more engaged, more opinionated, more tech-savvy)
2. **Survivorship Bias**: Only analyzing subjects that passed a selection process while overlooking those that did not (e.g., studying only active users, ignoring churned ones)
3. **Non-Response Bias**: People who decline surveys or ignore outreach differ from those who respond
4. **Exclusion Bias**: Systematic exclusion of certain groups through recruitment channels, language barriers, accessibility issues, or platform requirements
5. **Berkson\'s Bias**: Hospital admission rates create spurious associations because hospital populations are not representative of the general population

The core problem is that researchers draw conclusions about a whole population from a sample that does not faithfully represent it.`,
    },

    realWorldExample: `During World War II, the US military examined bomber planes returning from missions and considered adding armor where the most bullet holes were found. Statistician Abraham Wald pointed out the critical selection bias: they were only examining planes that survived. The missing bullet holes — on the planes that didn't return — showed where armor was actually needed most.

In product design, this mirrors the problem of only studying active users. The users who churned, the ones who never completed onboarding, the people who uninstalled after one session — they represent the missing planes. Their feedback is absent from your data precisely because your data collection method selected them out.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `Selection bias affects the validity of every insight derived from user data. When the sample is skewed, the conclusions are skewed. This impacts:

- User research quality: interviews, surveys, and usability tests may reflect only a subset of users
- Beta program insights: early adopters are not representative of mainstream users
- Feedback channels: app reviews, support tickets, and NPS surveys capture extreme voices
- A/B test validity: uneven population splits or opt-in experiments yield unreliable results
- Analytics interpretation: dashboard metrics reflect only users who reached that point in the funnel`,

    whenToUse: [
      {
        title: 'Diverse User Recruitment',
        scenario:
          'When planning user research studies or usability testing sessions',
        example:
          'Recruit participants through multiple channels (not just existing users) and include demographic quotas to ensure representation across age, ability, tech literacy, and use-case profiles',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Avoiding Self-Selection in Surveys',
        scenario: 'When collecting feedback through optional surveys or forms',
        example:
          'Use stratified random sampling instead of open opt-in. Send targeted survey invitations to random subsets and track non-response rates to understand who is missing',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Representative Beta Groups',
        scenario: 'When selecting participants for beta programs or early access',
        example:
          'Instead of accepting only enthusiastic volunteers, create beta cohorts that mirror your user base demographics: include less technical users, infrequent users, and users from underrepresented markets',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Balanced A/B Test Cohorts',
        scenario: 'When running experiments to validate design or feature changes',
        example:
          'Use randomized assignment with stratification by key attributes (account age, usage frequency, platform) to ensure treatment and control groups are comparable',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Churned User Analysis',
        scenario: 'When trying to understand why users leave or fail to adopt',
        example:
          'Proactively reach out to users who dropped off during onboarding or who have become inactive, rather than only analyzing feedback from active users',
        impact: ImpactLevel.HIGH,
      },
    ],

    whenToAvoid: [
      {
        title: 'Over-Correcting Small Samples',
        reason:
          'Applying heavy statistical corrections to tiny sample sizes can produce misleading pseudo-precision',
        consequence:
          'Teams may trust corrected numbers that are still unreliable, leading to false confidence in flawed data',
        alternative:
          'Acknowledge small sample limitations directly and gather more data before making high-stakes decisions',
      },
      {
        title: 'Paralysis by Representativeness',
        reason:
          'Insisting on perfect representativeness before any research can block all learning',
        consequence:
          'No user research happens because the team can never recruit a perfectly representative sample',
        alternative:
          'Conduct research with available participants while clearly documenting sample limitations and who is not represented',
      },
      {
        title: 'Ignoring Domain-Specific Needs',
        reason:
          'Some products intentionally serve niche populations where "general population" representativeness is irrelevant',
        consequence:
          'Diluting niche research with irrelevant demographics wastes resources and muddies insights',
        alternative:
          'Define the target population precisely and ensure representativeness within that defined group',
      },
    ],

    commonMistakes: [
      {
        title: 'Treating App Store Reviews as User Voice',
        description:
          'Basing product decisions on app store reviews, which are dominated by extremely satisfied or extremely frustrated users',
        why: 'The silent majority — users with moderate opinions — rarely leave reviews, creating a bimodal sample that misrepresents typical experience',
        fix: 'Supplement review analysis with in-app micro-surveys delivered to random user segments at meaningful moments',
      },
      {
        title: 'Beta Tester Echo Chamber',
        description:
          'Drawing all beta testers from power users, early adopters, or community forums',
        why: 'These users have higher technical skill, stronger motivation, and different needs than mainstream users who will encounter the feature at GA',
        fix: 'Reserve at least 30% of beta slots for users who match your median engagement profile and recruit through non-community channels',
      },
      {
        title: 'Support Ticket Extrapolation',
        description:
          'Assuming support ticket frequency reflects the actual distribution of user problems',
        why: 'Users who contact support are a self-selected minority; many users with the same problem silently leave or work around it',
        fix: 'Cross-reference support data with funnel analytics, session recordings, and proactive outreach to users who encountered the same conditions but did not contact support',
      },
      {
        title: 'Opt-In Survey Bias',
        description:
          'Sending an optional survey and treating responses as representative of all users',
        why: 'Response rates of 5-15% mean 85-95% of users are unrepresented, and responders differ systematically from non-responders',
        fix: 'Track and report response rates, compare respondent demographics to overall user base, and weight results accordingly',
      },
      {
        title: 'Survivorship in Funnel Analysis',
        description:
          'Optimizing later funnel stages based only on users who reached them',
        why: 'Users who survived early steps are a filtered, non-representative subset; the biggest opportunities may be in the drop-off population',
        fix: 'Analyze each funnel stage independently, paying equal attention to who exits and why, not just who advances',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.MEDIUM,
        description:
          'Layout choices determined by biased user research may not serve the actual user population',
        examples: [
          'Power-user feedback may drive complex layouts that overwhelm casual users',
          'Mobile-first research with young participants may underserve older desktop users',
          'Accessibility needs are missed when participants with disabilities are excluded from testing',
          'Information architecture validated only with domain experts fails for novices',
        ],
      },
      typography: {
        level: ImpactLevel.LOW,
        description:
          'Typography choices are less directly affected but can reflect biased assumptions about user context',
        examples: [
          'Font sizes tested only with young users may be too small for older demographics',
          'Readability testing in controlled labs misses real-world reading conditions',
        ],
      },
      color: {
        level: ImpactLevel.LOW,
        description:
          'Color choices can reflect biased testing populations',
        examples: [
          'Testing without color-blind participants misses accessibility issues',
          'Cultural color associations vary across markets not included in research',
        ],
      },
      interaction: {
        level: ImpactLevel.HIGH,
        description:
          'Interaction patterns are heavily shaped by who participates in usability testing',
        examples: [
          'Gesture-based interactions tested only with tech-savvy users may confuse mainstream users',
          'Task completion times from expert participants set unrealistic benchmarks',
          'Accessibility-critical interactions missed when testing excludes assistive technology users',
          'Power-user workflows prioritized over first-time user needs',
        ],
      },
      content: {
        level: ImpactLevel.HIGH,
        description:
          'Content strategy based on biased feedback will not resonate with the full audience',
        examples: [
          'Terminology validated with domain experts may confuse mainstream users',
          'Help content addressing only support-ticket issues misses silent struggles',
          'Onboarding copy optimized for tech-savvy beta testers alienates non-technical users',
          'Localization priorities driven by vocal community rather than actual market size',
        ],
      },
      accessibility: {
        level: ImpactLevel.CRITICAL,
        description:
          'Selection bias in research is one of the primary causes of accessibility failures',
        examples: [
          'Excluding users with disabilities from research guarantees accessibility gaps',
          'Recruiting only via visual social media excludes screen reader users',
          'Usability testing without diverse motor abilities misses interaction barriers',
          'Cognitive accessibility is overlooked when participants are exclusively neurotypical',
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
        title: 'Stratified User Research Panel',
        description:
          'Research recruitment that mirrors the actual user base across key dimensions',
        code: `<div class="research-plan">
  <h3>User Research Recruitment Plan</h3>
  <div class="quotas">
    <div class="quota-group">
      <h4>Usage Frequency</h4>
      <div class="quota"><span>Daily users</span><span>30%</span></div>
      <div class="quota"><span>Weekly users</span><span>40%</span></div>
      <div class="quota"><span>Monthly/infrequent</span><span>20%</span></div>
      <div class="quota"><span>Churned (last 90 days)</span><span>10%</span></div>
    </div>
    <div class="quota-group">
      <h4>Technical Proficiency</h4>
      <div class="quota"><span>Advanced/power users</span><span>25%</span></div>
      <div class="quota"><span>Intermediate</span><span>50%</span></div>
      <div class="quota"><span>Beginner/non-technical</span><span>25%</span></div>
    </div>
    <div class="quota-group">
      <h4>Accessibility Needs</h4>
      <div class="quota"><span>Screen reader users</span><span>8%</span></div>
      <div class="quota"><span>Motor impairments</span><span>5%</span></div>
      <div class="quota"><span>Cognitive differences</span><span>7%</span></div>
    </div>
  </div>
  <p class="note">Recruitment channels: in-app random selection, external panels,
  accessibility organizations, non-English community partners</p>
</div>`,
        explanation:
          'By setting explicit quotas that mirror the user base and recruiting through diverse channels, this plan prevents the common self-selection trap of only hearing from power users and enthusiasts.',
        principle:
          'Stratified recruitment with explicit quotas counteracts self-selection bias',
        metrics: {
          before: 'Usability issues found: 12 (mostly advanced workflow gaps)',
          after: 'Usability issues found: 34 (including 15 onboarding and accessibility issues)',
          improvement: '183% increase in issues identified, with critical accessibility gaps surfaced',
        },
      },
      {
        title: 'In-App Random Micro-Survey',
        description:
          'Randomly triggered feedback collection that avoids opt-in self-selection',
        code: `<div class="micro-survey" role="dialog" aria-label="Quick feedback">
  <p>Quick question (takes 10 seconds):</p>
  <p class="question">How easy was it to complete your task today?</p>
  <div class="rating-scale" role="radiogroup" aria-label="Ease rating">
    <button aria-label="Very difficult">1</button>
    <button aria-label="Difficult">2</button>
    <button aria-label="Neutral">3</button>
    <button aria-label="Easy">4</button>
    <button aria-label="Very easy">5</button>
  </div>
  <p class="context">
    Shown to 5% of users randomly after task completion.
    Response rate: 62%. Non-response demographics tracked.
  </p>
  <button class="dismiss" aria-label="Dismiss survey">Not now</button>
</div>`,
        explanation:
          'Random triggering ensures the sample is not self-selected. Short format maximizes response rate. Tracking non-response demographics lets the team identify and correct for any remaining bias.',
        principle:
          'Random sampling with high response rates produces more representative feedback than voluntary surveys',
      },
      {
        title: 'Beta Program Diversity Dashboard',
        description:
          'Monitoring tool that tracks beta cohort representativeness against the full user base',
        code: `<div class="beta-dashboard">
  <h3>Beta Cohort Representativeness</h3>
  <table>
    <thead>
      <tr>
        <th>Dimension</th>
        <th>Full User Base</th>
        <th>Beta Cohort</th>
        <th>Gap</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Mobile-only users</td>
        <td>45%</td>
        <td>18%</td>
        <td class="gap-warning">-27% (under-represented)</td>
      </tr>
      <tr>
        <td>Free tier users</td>
        <td>72%</td>
        <td>31%</td>
        <td class="gap-warning">-41% (under-represented)</td>
      </tr>
      <tr>
        <td>Non-English speakers</td>
        <td>38%</td>
        <td>12%</td>
        <td class="gap-warning">-26% (under-represented)</td>
      </tr>
      <tr>
        <td>Power users (daily)</td>
        <td>15%</td>
        <td>67%</td>
        <td class="gap-warning">+52% (over-represented)</td>
      </tr>
    </tbody>
  </table>
  <div class="actions">
    <button class="primary">Recruit Under-Represented Groups</button>
    <button class="secondary">Adjust Cohort Weights</button>
  </div>
</div>`,
        explanation:
          'Making representativeness gaps visible and actionable prevents teams from unknowingly building on biased feedback. The dashboard turns an abstract statistical concept into a concrete design tool.',
        principle:
          'Monitoring and surfacing sample composition gaps enables proactive correction of selection bias',
      },
    ],

    bad: [
      {
        title: 'Volunteer-Only Beta Program',
        description:
          'Beta program that accepts only users who actively sign up from a blog post',
        code: `<!-- DON'T DO THIS -->
<div class="beta-signup">
  <h2>Join Our Beta Program!</h2>
  <p>Be the first to try our new features!</p>
  <p>Sign up on our blog and join our Discord to get access.</p>
  <form>
    <input type="email" placeholder="Your email">
    <button>Sign Up for Beta</button>
  </form>
  <p class="small">We'll select participants from sign-ups</p>
</div>

<!-- Result: 95% power users, 0% accessibility users,
     0% churned users, 0% non-English speakers -->`,
        explanation:
          'Recruiting only from blog readers and Discord members guarantees a sample of engaged, tech-savvy, English-speaking power users. Feedback from this group will not reflect the experience of the broader user base.',
        principle:
          'Self-selected volunteers are systematically different from the general user population',
      },
      {
        title: 'Post-Purchase-Only NPS',
        description:
          'Sending NPS surveys only to users who completed a purchase',
        code: `<!-- DON'T DO THIS -->
<div class="nps-survey">
  <h3>How likely are you to recommend us?</h3>
  <p>Sent to: Users who completed checkout</p>
  <p>Not sent to: Users who abandoned cart,
     users who browsed but didn't buy,
     users who couldn't find what they needed</p>
  <div class="result">
    <span class="nps-score">NPS: +72</span>
    <p>"Our customers love us!"</p>
  </div>
</div>`,
        explanation:
          'By surveying only successful purchasers, the NPS score systematically excludes everyone who had a bad experience. The high score is an artifact of selection, not a reflection of overall user satisfaction.',
        principle:
          'Surveying only successful users guarantees inflated satisfaction scores',
      },
      {
        title: 'English-Only Usability Testing',
        description:
          'Running usability tests exclusively with English-speaking participants in one geographic market',
        code: `<!-- DON'T DO THIS -->
<div class="test-plan">
  <h3>Usability Test Plan</h3>
  <p>Participants: 8 users from San Francisco Bay Area</p>
  <p>Recruitment: UserTesting.com panel</p>
  <p>Language: English only</p>
  <p>Devices: Latest iPhone and MacBook</p>

  <div class="conclusion">
    <p>"All 8 participants completed tasks successfully.
     Usability score: 94/100. Ship it!"</p>
  </div>
</div>

<!-- Missing: Non-English speakers (38% of users),
     Android users (52%), older devices, rural connectivity -->`,
        explanation:
          'Testing only with affluent, tech-savvy, English-speaking users on premium devices in a tech hub provides a misleadingly positive picture. Real-world conditions for the majority of users are absent.',
        principle:
          'Homogeneous test populations produce artificially positive results that do not generalize',
      },
    ],

    realWorld: [
      {
        company: 'Spotify',
        product: 'Spotify Beta Programs',
        description: 'Spotify structures beta releases with stratified cohorts that include users across free and premium tiers, multiple device types, diverse geographic markets, and varying usage frequencies to ensure feature feedback represents the full listener population.',
        effectiveness: 'very-effective',
        analysis: 'By deliberately including free-tier and low-engagement users in betas, Spotify catches usability issues that power users would never encounter, such as confusing upgrade prompts or features that assume high bandwidth.',
      },
      {
        company: 'Google',
        product: 'Google UX Research',
        description: 'Google\'s UX research teams use Next Billion Users (NBU) research programs that recruit participants in emerging markets with lower connectivity and different device profiles, counteracting the Silicon Valley selection bias.',
        effectiveness: 'very-effective',
        analysis: 'NBU research revealed that features designed for high-speed connections failed for the majority of global users, leading to offline-first features in Maps, Translate, and YouTube Go.',
      },
      {
        company: 'Apple',
        product: 'App Store Review Analysis',
        description: 'Apple provides developers with app analytics that separate review data from usage data, making it clear that 1-star and 5-star reviewers are not representative of the user base. Crash reports and usage metrics provide the unbiased signal.',
        effectiveness: 'effective',
        analysis: 'By surfacing crash data and retention metrics alongside reviews, Apple helps developers see past the vocal minority and identify issues affecting the silent majority.',
      },
      {
        company: 'Microsoft',
        product: 'Windows Insider Program',
        description: 'Microsoft segments Windows Insiders into Dev, Beta, and Release Preview channels with progressively broader audiences. Feedback from the Dev channel (enthusiasts) is weighted differently from the Release Preview channel (mainstream-adjacent users).',
        effectiveness: 'effective',
        analysis: 'Channel segmentation acknowledges that early adopter feedback is valuable but non-representative. Features that test well in Dev but poorly in Release Preview are reworked before general availability.',
      },
    ],

    abTests: [
      {
        title: 'Recruitment Channel Comparison: Community vs Random In-App',
        hypothesis:
          'Random in-app recruitment will yield more representative feedback than community forum recruitment',
        controlVersion: {
          description:
            'Recruited 200 beta testers from community forums and social media. 89% were daily users, 94% were on premium plans, 97% English-speaking.',
          metrics: {
            conversionRate: '78% task completion',
            timeOnPage: '2:10 average task time',
            scrollDepth: '92% feature satisfaction',
          },
        },
        treatmentVersion: {
          description:
            'Recruited 200 beta testers via random in-app selection with demographic quotas. 35% daily, 28% weekly, 22% monthly, 15% at-risk. Mix of plan tiers and languages.',
          metrics: {
            conversionRate: '51% task completion',
            timeOnPage: '4:45 average task time',
            scrollDepth: '64% feature satisfaction',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'The community-recruited group painted a falsely rosy picture. The representative sample revealed that mainstream users struggled significantly with the new feature. 23 usability issues were found in the representative sample that were invisible to power users.',
          learnings: [
            'Power-user beta programs dramatically overestimate feature readiness',
            'Non-daily users encountered 3x more confusion points',
            'Non-English users found 8 localization issues the community group never saw',
            'The "lower" satisfaction score from representative testing was more actionable and led to a better GA launch',
          ],
        },
      },
      {
        title: 'Survey Delivery: Opt-In Email vs Random In-App Trigger',
        hypothesis:
          'Random in-app triggered surveys will better represent user sentiment than emailed opt-in surveys',
        controlVersion: {
          description:
            'Emailed survey to all users with opt-in link. 7% response rate. Respondents were 80% power users, NPS +68.',
          metrics: {
            conversionRate: '7% response rate',
            clickThroughRate: 'NPS: +68',
          },
        },
        treatmentVersion: {
          description:
            'Random in-app micro-survey shown to 10% of active users at session end. 58% response rate. Respondents mirrored user base demographics, NPS +31.',
          metrics: {
            conversionRate: '58% response rate',
            clickThroughRate: 'NPS: +31',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'The opt-in survey inflated NPS by 37 points due to self-selection of satisfied power users. The in-app survey revealed that casual users had significantly lower satisfaction, particularly around onboarding and discoverability — issues invisible in the opt-in sample.',
          learnings: [
            'Opt-in survey NPS was 119% higher than representative NPS — dangerously misleading',
            'High response rates reduce non-response bias more than any statistical correction',
            'Short, contextual surveys outperform long emailed surveys for representativeness',
            'The "real" NPS was lower but far more useful for identifying improvement areas',
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
        name: 'Homogeneous Testimonials',
        description:
          'All testimonials or case studies come from the same type of user (enterprise, tech-savvy, single geography)',
        howToSpot:
          'Check if featured users share similar roles, company sizes, industries, or demographics — lack of diversity signals selection bias in feedback collection',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Missing User Segments in Data',
        description:
          'Analytics dashboards or reports show data only for active or successful users, with no visibility into churned or struggling users',
        howToSpot:
          'Look for funnel analyses that start mid-funnel, charts that exclude inactive users, or retention data that only counts "qualified" users',
        severity: ImpactLevel.CRITICAL,
      },
      {
        name: 'Suspiciously High Satisfaction',
        description:
          'NPS, CSAT, or satisfaction scores that seem too good to be true',
        howToSpot:
          'Check the survey methodology: who was surveyed, response rate, and whether dissatisfied users had equal opportunity to respond',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Narrow Research Demographics',
        description:
          'Research findings based on participants from a single demographic, geography, or platform',
        howToSpot:
          'Review participant screener criteria, recruitment channels, and demographic breakdowns in research reports',
        severity: ImpactLevel.HIGH,
      },
    ],

    patterns: [
      {
        name: 'Survivorship Pattern',
        description: 'Analysis that only examines users who made it past a selection point, ignoring those who dropped off',
        indicators: [
          'Metrics calculated only for "activated" or "qualified" users',
          'Funnel analysis that starts at step 3 instead of step 1',
          'Feature usage data that excludes users who never found the feature',
          'Satisfaction scores from post-purchase surveys only',
        ],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Vocal Minority Pattern',
        description: 'Decisions driven by the loudest feedback channels rather than representative data',
        indicators: [
          'Product roadmap shaped primarily by support tickets',
          'Feature priorities based on forum votes or social media mentions',
          'App store review sentiment treated as overall user sentiment',
          'Enterprise client requests dominating consumer product direction',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Convenience Sampling Pattern',
        description: 'Research conducted with the most accessible participants rather than representative ones',
        indicators: [
          'All usability testers are employees, friends, or local professionals',
          'Beta testing limited to users who follow the company blog',
          'Interviews conducted only with users who responded to a Twitter call',
          'Testing exclusively on latest-generation devices',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'medium',
      },
      {
        name: 'Confirmation Sampling Pattern',
        description: 'Selectively including or highlighting data that confirms a pre-existing hypothesis',
        indicators: [
          'Cherry-picked positive metrics while ignoring negative ones',
          'Filtering cohorts until a desired result appears',
          'Reporting only on user segments where the feature performed well',
          'Excluding "outlier" responses that contradict the narrative',
        ],
        severity: ImpactLevel.CRITICAL,
        confidence: 'medium',
      },
    ],

    checklistQuestions: [
      'Who is represented in this sample, and more importantly, who is missing?',
      'What was the recruitment method, and does it systematically exclude certain users?',
      'What is the response rate, and how do non-respondents differ from respondents?',
      'Are churned or inactive users included in the analysis?',
      'Do beta testers or research participants match the demographic profile of the broader user base?',
      'Are feedback channels (reviews, support, forums) treated as representative of all users?',
      'Is the A/B test population properly randomized, or is there systematic assignment bias?',
      'Are analytics metrics calculated for all users or only "qualified" subsets?',
      'Have we sought feedback from users who struggle with the product, not just those who succeed?',
      'Are our research participants diverse in ability, language, geography, and technical proficiency?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in research methodology, statistical sampling, and UX research design, specializing in selection bias.

Analyze the provided design, research plan, or data collection methodology for selection bias risks. Identify:

1. **Sampling Method**: How participants or data points are selected — random, convenience, volunteer, quota-based
2. **Exclusion Risks**: Who is systematically excluded by the recruitment channels, platform requirements, or eligibility criteria
3. **Self-Selection**: Where voluntary participation introduces bias toward engaged, opinionated, or technically proficient users
4. **Survivorship Bias**: Where analysis only considers users who reached a certain point, ignoring those who dropped off
5. **Representativeness Gaps**: How the sample differs from the target population across key dimensions

For each bias risk found:
- Identify the specific mechanism creating the bias
- Assess the severity and direction of the distortion
- Determine which user segments are over-represented and under-represented
- Estimate the impact on conclusions drawn from this data
- Suggest concrete corrective actions

Consider:
- Are the users providing feedback representative of all users?
- What population is actually represented by this data vs the intended population?
- Would conclusions change if the missing segments were included?
- Are there survivorship effects in the funnel or feature adoption data?
- How can the sampling strategy be improved for better representativeness?

Provide actionable recommendations for reducing selection bias in research and data collection.`,

    outputSchema: {
      type: 'object',
      properties: {
        selectionBiasRisks: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              mechanism: { type: 'string' },
              overRepresented: { type: 'string' },
              underRepresented: { type: 'string' },
              severityLevel: { type: 'string' },
              impactOnConclusions: { type: 'string' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'mechanism',
              'severityLevel',
              'recommendation',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            representativenessScore: { type: 'number' },
            selfSelectionRisk: { type: 'number' },
            survivorshipRisk: { type: 'number' },
            samplingMethodQuality: { type: 'number' },
          },
          required: [
            'representativenessScore',
            'selfSelectionRisk',
            'survivorshipRisk',
            'samplingMethodQuality',
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
        'selectionBiasRisks',
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
        title: 'Define the Target Population',
        description:
          'Clearly specify who your intended user population is and document their key demographic and behavioral dimensions',
        example:
          'Target: All users of our SaaS product, segmented by plan tier (free/paid), usage frequency (daily/weekly/monthly), platform (web/iOS/Android), and primary language',
        tips: [
          'Be explicit about who counts as a "user" — registered, active, paying, or all?',
          'Document the known distribution across key dimensions from analytics',
          'Identify dimensions where you have limited visibility (e.g., disability status, tech literacy)',
        ],
      },
      {
        step: 2,
        title: 'Audit Current Sampling Methods',
        description:
          'Review how participants are currently recruited for research, beta programs, and feedback collection',
        example:
          'Audit reveals: 90% of usability test participants come from UserTesting.com (skews tech-savvy, US-based); NPS sent only post-purchase (misses browsers and cart abandoners)',
        tips: [
          'Map every feedback channel and identify its inherent selection biases',
          'Compare the demographics of each channel\'s respondents to the overall user base',
          'Calculate response rates and characterize non-respondents where possible',
        ],
      },
      {
        step: 3,
        title: 'Design Representative Sampling',
        description:
          'Create recruitment plans with explicit quotas and diverse channels to match your target population',
        example:
          'Recruit 40% from in-app random selection, 25% from external panels with demographic quotas, 20% from accessibility organizations, 15% from international markets',
        tips: [
          'Use stratified random sampling within each channel',
          'Set minimum quotas for historically under-represented groups',
          'Offer appropriate incentives that do not further bias the sample (e.g., avoid rewarding only power-user behaviors)',
        ],
      },
      {
        step: 4,
        title: 'Monitor and Correct',
        description:
          'Track sample composition in real time and apply corrections when representativeness gaps emerge',
        example:
          'Beta dashboard shows mobile-only users at 18% vs 45% of user base — trigger targeted mobile recruitment campaign',
        tips: [
          'Build representativeness dashboards into research operations',
          'Apply statistical weighting when perfect representativeness is impractical',
          'Document remaining biases so stakeholders can interpret results correctly',
        ],
      },
      {
        step: 5,
        title: 'Report with Transparency',
        description:
          'Always document sample composition, known biases, and limitations alongside findings',
        example:
          'Research report includes: "N=24, 62% power users (vs 15% of user base). Findings likely overestimate ease of use for mainstream users."',
        tips: [
          'Never present biased samples as representative without disclosure',
          'Use confidence intervals that account for sampling bias',
          'Recommend follow-up research with under-represented groups when gaps are significant',
        ],
      },
    ],

    dos: [
      'Use multiple recruitment channels to reach diverse user segments',
      'Set explicit demographic and behavioral quotas for research participants',
      'Track and report response rates and non-respondent characteristics',
      'Include churned and inactive users in your research when studying retention or satisfaction',
      'Randomize A/B test assignment with stratification by key attributes',
      'Build representativeness monitoring into beta programs and research operations',
      'Weight survey results by population proportions when perfect sampling is impractical',
      'Document sample composition and known biases in every research report',
      'Seek feedback from users who struggle, not just those who succeed',
      'Include participants with disabilities, diverse languages, and varied technical proficiency',
    ],

    donts: [
      'Don\'t treat app store reviews or support tickets as representative user feedback',
      'Don\'t recruit all research participants from a single channel (community, social media, or employee network)',
      'Don\'t exclude churned or inactive users from satisfaction or experience research',
      'Don\'t present opt-in survey results as representative without disclosing response rate and sample composition',
      'Don\'t run A/B tests with non-random assignment or unbalanced cohorts',
      'Don\'t assume beta tester feedback represents mainstream user experience',
      'Don\'t calculate metrics only for "qualified" or "activated" users without disclosing the filter',
      'Don\'t ignore survivorship bias in funnel analysis and feature adoption data',
      'Don\'t generalize findings from a homogeneous sample to a heterogeneous population',
      'Don\'t let the loudest voices in feedback channels set product priorities',
    ],

    bestPractices: [
      {
        title: 'Stratified Random Sampling',
        description:
          'Divide the user population into meaningful strata and randomly sample within each stratum proportionally',
        rationale:
          'Ensures every meaningful subgroup is represented, preventing self-selection from skewing results',
        example:
          'Stratify by plan tier, usage frequency, and platform; randomly select proportionally within each stratum for survey delivery',
      },
      {
        title: 'Non-Response Analysis',
        description:
          'Systematically compare respondents to non-respondents on available dimensions to quantify response bias',
        rationale:
          'Even with random sampling, low response rates reintroduce self-selection; understanding who does not respond is as important as analyzing who does',
        example:
          'Compare survey respondents vs non-respondents on account age, last login date, plan tier, and geographic region; report and adjust for differences',
      },
      {
        title: 'Include the "Missing Planes"',
        description:
          'Actively seek data from users who churned, abandoned, or failed — the equivalent of Wald\'s missing bombers',
        rationale:
          'The most important insights often come from users whose absence from your data is itself the signal of a problem',
        example:
          'Monthly outreach to recently churned users with a short exit survey; funnel analysis that starts at first visit, not first conversion',
      },
      {
        title: 'Representativeness Dashboards',
        description:
          'Build real-time monitoring of sample composition against known population distributions',
        rationale:
          'Making selection bias visible and quantifiable transforms it from an abstract concern into an actionable operational metric',
        example:
          'Dashboard comparing beta cohort demographics to overall user base, with alerts when any dimension deviates more than 10 percentage points',
      },
      {
        title: 'Triangulate Across Sources',
        description:
          'Cross-reference findings from multiple data sources with different selection biases to identify where conclusions converge',
        rationale:
          'No single source is unbiased; triangulation reveals where biases cancel out and where they compound',
        example:
          'Compare insights from support tickets (vocal, frustrated), NPS surveys (engaged), session recordings (behavioral), and exit surveys (churned) to build a complete picture',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships - Ensure research recruitment is accessible to users of all assistive technologies',
        implementation:
          'Make survey forms, screener questionnaires, and beta signup flows fully accessible with proper form labels, keyboard navigation, and screen reader compatibility',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.1.1',
        guideline:
          'Keyboard - Research participation must not require mouse-only interaction',
        implementation:
          'All survey instruments, feedback forms, and beta participation flows must be fully keyboard operable to avoid excluding users with motor disabilities',
      },
      {
        wcagLevel: 'AA',
        criterion: '3.1.2',
        guideline:
          'Language of Parts - Research instruments should be available in languages matching the user base',
        implementation:
          'Translate surveys and research materials into languages spoken by significant user segments to avoid excluding non-English speakers from feedback channels',
      },
    ],

    ethics: [
      {
        concern: 'Systematic Exclusion of Marginalized Users',
        severity: 'critical',
        explanation:
          'When research and feedback channels systematically exclude users with disabilities, users from developing markets, or non-English speakers, the resulting product serves only the privileged majority',
        mitigation:
          'Mandate diverse recruitment quotas, partner with accessibility and localization organizations, and audit recruitment channels for exclusionary patterns quarterly.',
      },
      {
        concern: 'Survivorship Bias in Success Metrics',
        severity: 'high',
        explanation:
          'Reporting success metrics calculated only from users who survived the full funnel creates a misleadingly positive picture that hides real problems',
        mitigation:
          'Always report metrics for the full population (all who started) alongside filtered metrics. Label filtered metrics clearly as conditional.',
      },
      {
        concern: 'Confirmation Bias in Sample Selection',
        severity: 'high',
        explanation:
          'Teams may unconsciously select participants or filter data to confirm a desired conclusion, especially when under pressure to validate a decision already made',
        mitigation:
          'Pre-register research plans with sample criteria before data collection. Have an independent reviewer audit sample composition against the plan.',
      },
      {
        concern: 'Power User Capture',
        severity: 'medium',
        explanation:
          'When the most vocal and engaged users disproportionately influence the product roadmap, the product evolves to serve a shrinking niche rather than growing the user base',
        mitigation:
          'Weight feedback by segment size, not volume. Actively seek and amplify the voice of quiet, mainstream users through random sampling and contextual research.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'Sample Selection Bias as a Specification Error',
        author: 'Heckman, J. J.',
        year: 1979,
        doi: '10.2307/1912352',
        description:
          'Nobel Prize-winning work on correcting for selection bias in non-random samples. Introduced the Heckman correction method used across economics and social sciences.',
        type: 'foundational',
      },
      {
        title: 'Limitations of the Application of Fourfold Table Analysis to Hospital Data',
        author: 'Berkson, J.',
        year: 1946,
        doi: '10.2307/3002000',
        description:
          'Identified Berkson\'s bias: the systematic distortion that occurs when sampling from selected populations (e.g., hospital patients) rather than the general population.',
        type: 'foundational',
      },
      {
        title: 'Selection Bias in Web Surveys',
        author: 'Bethlehem, J.',
        year: 2010,
        doi: '10.1111/j.1751-5823.2010.00112.x',
        description:
          'Analysis of how web-based survey methods introduce selection bias and strategies for mitigation in digital research.',
        type: 'practical',
      },
      {
        title: 'Survivorship Bias in Research and Practice',
        author: 'Brown, S. J., Goetzmann, W., Ibbotson, R., & Ross, S.',
        year: 1992,
        doi: '10.1093/rfs/5.4.553',
        description:
          'Demonstrates how survivorship bias distorts performance metrics, with implications for any analysis that excludes "failures".',
        type: 'advanced',
      },
    ],

    books: [
      {
        title: 'Thinking, Fast and Slow',
        author: 'Kahneman, Daniel',
        year: 2011,
        isbn: '9780374275631',
        description:
          'Comprehensive coverage of cognitive biases including sampling errors, base-rate neglect, and how statistical intuitions fail',
        type: 'foundational',
      },
      {
        title: 'How Not to Be Wrong: The Power of Mathematical Thinking',
        author: 'Ellenberg, Jordan',
        year: 2014,
        isbn: '9780143127536',
        description:
          'Accessible treatment of survivorship bias (including the Wald bomber story) and other statistical reasoning errors',
        type: 'practical',
      },
      {
        title: 'Calling Bullshit: The Art of Skepticism in a Data-Driven World',
        author: 'Bergstrom, Carl T., & West, Jevin D.',
        year: 2020,
        isbn: '9780525509189',
        description:
          'Practical guide to identifying selection bias and other distortions in data analysis and reporting',
        type: 'practical',
      },
    ],

    articles: [
      {
        title: 'Survivorship Bias: Why We Focus on Winners and Forget the Losers',
        author: 'Farnam Street',
        url: 'https://fs.blog/survivorship-bias/',
        description:
          'Accessible introduction to survivorship bias with product design and business examples',
        type: 'practical',
      },
      {
        title: 'The Bias in User Research',
        author: 'Nielsen Norman Group',
        url: 'https://www.nngroup.com/articles/bias-in-research/',
        description:
          'UX-focused guide to identifying and mitigating selection bias in user research studies',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'Survivorship Bias: The Silent Killer of Data Analysis',
        author: 'Veritasium',
        url: 'https://www.youtube.com/watch?v=_Qd3erAPI9w',
        description:
          'Visual explanation of survivorship bias using the WWII bomber story and modern examples',
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
      'confirmation-bias',
      'survivorship-bias',
      'availability-heuristic',
      'base-rate-neglect',
    ],

    conflicts: [
      'law-of-large-numbers',
    ],

    confusedWith: [
      'survivorship-bias',
      'sampling-error',
      'observation-bias',
    ],

    hierarchy: {
      parent: 'cognitive-bias',
      children: [
        'survivorship-bias',
        'self-selection-bias',
        'non-response-bias',
      ],
    },
  },
};
