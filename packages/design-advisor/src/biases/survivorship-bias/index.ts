/**
 * SURVIVORSHIP BIAS
 *
 * We focus on survivors and ignore those who didn't make it
 */


import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const survivorshipBias: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'survivorship-bias',
    name: 'Survivorship Bias',
    aliases: [],
    category: BiasCategory.COGNITIVE,
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
    simple: 'We focus on survivors and ignore those who didn\'t make it',

    detailed: `Survivorship bias is the logical error of concentrating on entities that passed a selection process while overlooking those that did not. This creates a distorted view of reality because the "silent evidence" -- the failures, dropouts, and non-survivors -- is invisible.

In design and product contexts, survivorship bias manifests when teams only study successful users, showcase winning outcomes, and build metrics around people who stayed. The users who churned, the startups that failed, the features nobody used -- all vanish from the dataset, leading to dangerously optimistic conclusions.

This bias is particularly insidious because the missing data is, by definition, absent. You cannot see what isn't there. Teams build entire strategies on the visible survivors without realizing the foundation is incomplete.`,

    psychologyBasis: {
      discoveredBy: 'Various Researchers',
      year: 1970,
      theory: 'Cognitive Bias Research',
      mechanism: `The brain defaults to processing visible, available evidence and fails to account for missing data. This happens because:

1. **Invisible Absence**: The brain cannot easily reason about things that are not present -- missing data generates no signal
2. **Selection Filter Blindness**: We forget that what we observe has already passed through a filter that eliminated non-survivors
3. **Narrative Coherence**: Success stories form coherent narratives; failures are fragmented and harder to retrieve
4. **Confirmation Seeking**: We naturally seek patterns in what exists rather than questioning what is absent
5. **Base Rate Neglect**: Without seeing failures, we cannot estimate the true probability of success

The mechanism is structural, not just cognitive -- the data itself is pre-filtered before we ever encounter it.`,
    },

    realWorldExample: `During World War II, the US military examined bombers returning from missions and found bullet holes concentrated on the fuselage and wings. Engineers proposed reinforcing those areas. Statistician Abraham Wald realized this was survivorship bias: the planes they were examining had survived. The missing data -- planes that were shot down -- likely had damage in the areas with NO bullet holes on survivors (engines, cockpit). Reinforcing the undamaged areas of survivors saved countless lives. The visible evidence pointed in exactly the wrong direction.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `Survivorship bias profoundly distorts how teams understand their users, measure success, and present outcomes. When only survivors are visible, every metric looks better than reality:

- Testimonials show only customers who stayed and succeeded
- Case studies feature winners, never the companies that failed using your product
- Analytics dashboards track active users while churned users vanish from reports
- A/B tests ignore users who dropped out before completing the flow
- "Average user" metrics are skewed because they only include people who didn't quit`,

    whenToUse: [
      {
        title: 'Balanced Outcome Portfolios',
        scenario:
          'When presenting case studies or customer outcomes to prospects',
        example:
          'Show a range of outcomes including partial successes and challenges alongside wins, building credibility through honesty',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Churn-Aware Analytics',
        scenario: 'When building dashboards and reporting for product decisions',
        example:
          'Include churned user cohorts in funnel analysis so teams see the full picture, not just survivors',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Failure-Inclusive Onboarding',
        scenario: 'When designing onboarding flows and success metrics',
        example:
          'Track and display drop-off rates at each onboarding step, not just completion rates of those who finish',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Transparent Social Proof',
        scenario: 'When using reviews and ratings to build trust',
        example:
          'Show the full distribution of ratings (1-5 stars) rather than only featuring 5-star reviews',
        impact: ImpactLevel.MEDIUM,
      },
      {
        title: 'Honest Expectation Setting',
        scenario: 'When setting expectations for new users or customers',
        example:
          'Present realistic timelines and success rates: "68% of users achieve X within 3 months" rather than cherry-picking fast successes',
        impact: ImpactLevel.HIGH,
      },
    ],

    whenToAvoid: [
      {
        title: 'Success-Only Testimonials',
        reason:
          'Showing only glowing success stories creates unrealistic expectations and erodes trust when reality doesn\'t match',
        consequence:
          'Users feel deceived when their experience doesn\'t mirror the curated success stories, leading to churn and negative word-of-mouth',
        alternative:
          'Include a mix of outcomes: major wins, moderate successes, and honest accounts of challenges overcome',
      },
      {
        title: 'Survivor-Only Metrics',
        reason:
          'Reporting metrics only for users who completed a flow ignores everyone who dropped out',
        consequence:
          'Teams optimize for the wrong things because the full funnel is invisible; real problems go unaddressed',
        alternative:
          'Always include drop-off and churn data alongside success metrics; report on the full cohort',
      },
      {
        title: 'Curated Showcase Without Context',
        reason:
          'Featuring only top performers or featured items hides the typical experience',
        consequence:
          'New users expect to achieve outlier results, leading to disappointment and attrition',
        alternative:
          'Show "featured" alongside "typical results" or "median outcome" for honest framing',
      },
      {
        title: 'Ignoring Failed Experiments',
        reason:
          'Only publishing successful A/B tests hides the learning from failures',
        consequence:
          'Teams repeat failed experiments, waste resources, and develop false confidence in their intuition',
        alternative:
          'Maintain a log of all experiments including failures, with learnings documented',
      },
    ],

    commonMistakes: [
      {
        title: 'Only Showing 5-Star Reviews',
        description:
          'Filtering testimonials to show only the most positive feedback',
        why: 'Creates an unrealistically positive picture; users who discover the filter lose all trust',
        fix: 'Show the full rating distribution. Feature detailed reviews across the spectrum. Let users filter by rating themselves.',
      },
      {
        title: 'Reporting "Average" Without Churn',
        description:
          'Calculating averages like "users earn $X/month" using only active, successful users',
        why: 'The denominator excludes everyone who tried and failed or quit, inflating the metric dramatically',
        fix: 'Include all users who started (including churned) in the denominator. Report median instead of mean. Show the full distribution.',
      },
      {
        title: 'Case Studies Without Failure Rates',
        description:
          'Publishing case studies of successful customers without mentioning how many customers didn\'t succeed',
        why: 'Readers assume the case study is representative when it may be an extreme outlier',
        fix: 'Add context: "Company X achieved Y results. Across all customers, median outcome is Z." Include lessons from challenging implementations.',
      },
      {
        title: 'Ignoring Drop-Off in A/B Tests',
        description:
          'Analyzing A/B test results only for users who completed the flow, ignoring those who abandoned',
        why: 'A variant might have higher conversion among completers but drive away more users at the top of funnel',
        fix: 'Run intent-to-treat analysis: include all users assigned to each variant, regardless of completion',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.HIGH,
        description:
          'Layout choices determine which outcomes and data points are visible vs hidden',
        examples: [
          'Testimonial sections that only allocate space for positive stories',
          'Dashboard layouts that show active users prominently but hide churn metrics',
          'Case study grids that feature only successful outcomes',
          'Leaderboards that show top performers while hiding the long tail',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Text hierarchy can emphasize survivor outcomes while minimizing failure data',
        examples: [
          'Large, bold success metrics with tiny disclaimer text about atypical results',
          'Headline numbers from top performers with footnote-sized caveats',
          'Prominent "X users achieved Y" without visible base rate',
          'Fine print disclaimers that effectively hide the non-survivor data',
        ],
      },
      color: {
        level: ImpactLevel.MEDIUM,
        description:
          'Color choices can make success data salient while failure data fades',
        examples: [
          'Green success metrics displayed prominently with grey or absent failure data',
          'Vibrant testimonial cards with no visual representation of negative feedback',
          'Heatmaps of active users with no indication of churned user patterns',
          'Charts using bright colors for growth while suppressing decline data',
        ],
      },
      interaction: {
        level: ImpactLevel.HIGH,
        description:
          'Interactive elements can filter out non-survivor data by default',
        examples: [
          'Dashboards defaulting to "active users" with churn data requiring extra clicks',
          'Review systems that sort by "most positive" by default',
          'Analytics that require manual toggling to include dropped-off users',
          'Search results that surface only successful/popular items',
        ],
      },
      content: {
        level: ImpactLevel.CRITICAL,
        description:
          'Content strategy is the primary vector for survivorship bias -- what stories get told, and whose outcomes are shared',
        examples: [
          'Blog posts featuring only successful customer implementations',
          'Marketing copy built from outlier success metrics',
          'Help documentation based on power users, not struggling users',
          'ROI calculators using survivor-only data',
        ],
      },
      accessibility: {
        level: ImpactLevel.MEDIUM,
        description:
          'Survivorship bias in accessibility means building for users who can already use your product, ignoring those who couldn\'t',
        examples: [
          'Usability testing only with users who completed onboarding (survivors)',
          'Feedback mechanisms that require proficiency to access',
          'Analytics that miss users who bounced due to accessibility barriers',
          'Support documentation assuming user has already succeeded at setup',
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
        title: 'Full Rating Distribution Display',
        description:
          'Product review section showing the complete distribution of ratings, not just highlights',
        code: `<div class="reviews-summary">
  <h3>Customer Reviews</h3>
  <div class="rating-distribution">
    <div class="rating-row">
      <span class="stars">5 stars</span>
      <div class="bar" style="width: 45%"></div>
      <span class="count">1,247</span>
    </div>
    <div class="rating-row">
      <span class="stars">4 stars</span>
      <div class="bar" style="width: 25%"></div>
      <span class="count">694</span>
    </div>
    <div class="rating-row">
      <span class="stars">3 stars</span>
      <div class="bar" style="width: 15%"></div>
      <span class="count">416</span>
    </div>
    <div class="rating-row">
      <span class="stars">2 stars</span>
      <div class="bar" style="width: 10%"></div>
      <span class="count">277</span>
    </div>
    <div class="rating-row">
      <span class="stars">1 star</span>
      <div class="bar" style="width: 5%"></div>
      <span class="count">139</span>
    </div>
  </div>
  <p class="total">2,773 total reviews</p>
</div>`,
        explanation:
          'Showing the full distribution lets users assess the product honestly. They can see that while most reviews are positive, some users had poor experiences. This builds more trust than cherry-picked 5-star reviews.',
        principle:
          'Transparent outcome distributions counter survivorship bias and build trust',
        metrics: {
          before: '3.2% conversion with only 5-star reviews shown',
          after: '4.8% conversion with full distribution shown',
          improvement: '50% increase in conversion through honest presentation',
        },
      },
      {
        title: 'Case Study with Failure Context',
        description:
          'SaaS case study page that includes success rates and challenges alongside the featured story',
        code: `<section class="case-study">
  <article class="featured-story">
    <h2>How Acme Corp Reduced Churn by 40%</h2>
    <blockquote>
      "The implementation took 3 months and required significant
      effort from our team, but the results were worth it."
    </blockquote>
    <div class="results">
      <span class="metric">40% churn reduction</span>
      <span class="metric">8 months to full ROI</span>
    </div>
  </article>

  <aside class="context-panel">
    <h4>Across All Customers</h4>
    <ul>
      <li>Median churn reduction: <strong>18%</strong></li>
      <li>Average implementation time: <strong>4.5 months</strong></li>
      <li>22% of customers see results within 3 months</li>
      <li>12% of implementations face significant challenges</li>
    </ul>
    <p class="note">Acme Corp's results are above median.
    Results vary based on team size, data quality, and commitment.</p>
  </aside>
</section>`,
        explanation:
          'The featured case study inspires, but the context panel prevents survivorship bias by showing median outcomes and the range of experiences. Users can calibrate expectations against reality.',
        principle:
          'Pair aspirational examples with honest base rates to set realistic expectations',
      },
      {
        title: 'Churn-Inclusive Analytics Dashboard',
        description:
          'Product analytics dashboard that includes churned users in its metrics by default',
        code: `<div class="analytics-dashboard">
  <div class="metric-card">
    <h4>User Outcomes (All Cohorts)</h4>
    <div class="funnel">
      <div class="stage">
        <span class="label">Signed up</span>
        <span class="value">10,000</span>
        <span class="pct">100%</span>
      </div>
      <div class="stage">
        <span class="label">Completed onboarding</span>
        <span class="value">6,200</span>
        <span class="pct">62%</span>
      </div>
      <div class="stage">
        <span class="label">Active at 30 days</span>
        <span class="value">3,100</span>
        <span class="pct">31%</span>
      </div>
      <div class="stage">
        <span class="label">Achieved target outcome</span>
        <span class="value">1,860</span>
        <span class="pct">18.6%</span>
      </div>
    </div>
    <p class="insight">Note: "Average revenue per user" metrics
    often only count the 1,860 who achieved outcomes.
    Including all sign-ups changes the picture significantly.</p>
  </div>
</div>`,
        explanation:
          'This dashboard forces teams to see the full funnel. Instead of reporting "users who succeed earn X," it shows what fraction of all users actually reach success. The 18.6% vs 100% framing prevents survivorship-biased conclusions.',
        principle:
          'Include the full denominator in all metrics to prevent survivorship-biased decision making',
      },
    ],

    bad: [
      {
        title: 'Cherry-Picked Success Testimonials',
        description:
          'Landing page showing only the most extreme success stories',
        code: `<!-- DON'T DO THIS -->
<section class="testimonials">
  <h2>Our Users Are Thriving!</h2>
  <div class="story">
    <p>"I earn $10,000/month using this platform!" - Jake, 24</p>
  </div>
  <div class="story">
    <p>"Grew my business 500% in 6 months!" - Maria, 31</p>
  </div>
  <div class="story">
    <p>"Quit my day job after 3 weeks!" - Tyler, 29</p>
  </div>
  <button class="cta">Start Your Success Story</button>
</section>`,
        explanation:
          'These are extreme outliers presented as typical outcomes. The thousands of users who earned little or nothing are invisible. This is textbook survivorship bias used to deceive. Users who sign up expecting similar results will feel betrayed.',
        principle:
          'Showing only outlier success stories without base rates is survivorship bias weaponized as marketing',
      },
      {
        title: 'Survivor-Only Satisfaction Metrics',
        description:
          'Dashboard reporting satisfaction scores only from current active users',
        code: `<!-- DON'T DO THIS -->
<div class="satisfaction-dashboard">
  <h3>Customer Satisfaction</h3>
  <div class="score">
    <span class="big-number">94%</span>
    <span class="label">Customer Satisfaction Score</span>
  </div>
  <p class="footnote" style="color: #ccc; font-size: 0.7em;">
    *Based on responses from active subscribers
  </p>
</div>`,
        explanation:
          'By surveying only active subscribers, the most dissatisfied users (who already churned) are excluded. The 94% score is meaningless because it doesn\'t include the people who were unhappy enough to leave. The tiny footnote doesn\'t fix the deception.',
        principle:
          'Satisfaction metrics that exclude churned users are survivorship bias baked into your data infrastructure',
      },
      {
        title: 'App Store Featured-Only Showcase',
        description:
          'Platform showcasing only top-performing apps built with their tools',
        code: `<!-- DON'T DO THIS -->
<section class="showcase">
  <h2>Apps Built With Our Platform</h2>
  <div class="grid">
    <div class="app-card">
      <h4>FitTracker Pro</h4>
      <p>2M+ downloads</p>
      <span class="badge">Featured by Apple</span>
    </div>
    <div class="app-card">
      <h4>BudgetMaster</h4>
      <p>500K+ users</p>
      <span class="badge">Top 10 Finance</span>
    </div>
    <div class="app-card">
      <h4>RecipeHub</h4>
      <p>1M+ downloads</p>
      <span class="badge">Editor's Choice</span>
    </div>
  </div>
  <p>Join 50,000 developers building amazing apps!</p>
</section>`,
        explanation:
          'Of the 50,000 developers on the platform, only 3 ultra-successful apps are shown. The other 49,997 apps -- many of which likely have few or zero downloads -- are invisible. New developers will massively overestimate their odds of similar success.',
        principle:
          'Showcasing only top performers from a large pool is pure survivorship bias',
      },
    ],

    realWorld: [
      {
        company: 'Y Combinator',
        product: 'Demo Day / Alumni Page',
        url: 'https://www.ycombinator.com/companies',
        description: 'YC prominently features successes like Airbnb, Stripe, and Dropbox. The hundreds of YC-funded startups that failed are rarely mentioned, creating an impression that YC acceptance nearly guarantees success.',
        effectiveness: 'effective',
        analysis: 'Classic survivorship bias in startup ecosystem marketing. The survival rate of YC companies is much higher than average startups, but still far from the impression created by showcasing only unicorns. Aspirational but potentially misleading about base rates.',
      },
      {
        company: 'Apple',
        product: 'App Store Featured Section',
        url: 'https://apps.apple.com',
        description: 'The App Store features a curated selection of successful, well-designed apps. The millions of apps with few downloads, poor reviews, or abandoned by developers are invisible in the featured experience.',
        effectiveness: 'effective',
        analysis: 'Platform curation creates survivorship bias for developers: seeing only featured apps creates unrealistic expectations. For users, the curation is beneficial (quality filter), but for aspiring developers, it hides the reality that most apps fail to gain traction.',
      },
      {
        company: 'Amazon',
        product: 'Bestseller Lists',
        url: 'https://www.amazon.com/best-sellers',
        description: 'Amazon\'s bestseller lists showcase top-selling products, creating an impression of what "good products" look like. The vast majority of products with zero or few sales are invisible, distorting sellers\' expectations.',
        effectiveness: 'effective',
        analysis: 'Survivorship bias affects both buyers and sellers. Buyers see a curated reality of successful products. Sellers see bestsellers and assume similar success is achievable, without visibility into the millions of products that never sell.',
      },
      {
        company: 'LinkedIn',
        product: 'Career Highlights / Feed',
        url: 'https://www.linkedin.com',
        description: 'LinkedIn feeds are dominated by promotions, new roles, achievements, and success stories. Job rejections, layoffs, failed ventures, and career struggles are rarely posted, creating a survivorship-biased view of professional life.',
        effectiveness: 'somewhat-effective',
        analysis: 'The platform\'s social incentives naturally create survivorship bias: users share wins, not losses. This can harm users\' mental health and create unrealistic career expectations. Some users have begun counter-posting about failures, partially correcting the bias.',
      },
    ],

    abTests: [
      {
        title: 'Testimonials: Success-Only vs Balanced Outcomes',
        hypothesis:
          'Showing balanced outcomes (including challenges) will increase long-term trust and reduce post-purchase regret',
        controlVersion: {
          description:
            'Landing page with 3 glowing 5-star testimonials, all featuring extreme success stories',
          metrics: {
            conversionRate: '5.8%',
            timeOnPage: '1:45',
            thirtyDayRetention: '34%',
          },
        },
        treatmentVersion: {
          description:
            'Landing page with full rating distribution, mix of testimonials (5-star, 4-star, 3-star), and median outcome data alongside featured success story',
          metrics: {
            conversionRate: '4.9%',
            timeOnPage: '3:20',
            thirtyDayRetention: '56%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'While initial conversion dropped by 15%, 30-day retention improved by 65%. Users who converted with balanced information had realistic expectations and were far less likely to churn. Net revenue at 90 days was 28% higher for the balanced treatment.',
          learnings: [
            'Survivorship-biased testimonials inflate initial conversion but damage retention',
            'Users who convert with realistic expectations are dramatically more loyal',
            'Full rating distributions increased trust scores by 40% in follow-up surveys',
            'The "honesty penalty" in initial conversion is more than offset by retention gains',
          ],
        },
      },
      {
        title: 'Analytics Dashboard: Survivor-Only vs Full-Cohort Metrics',
        hypothesis:
          'Showing full-cohort metrics (including churned users) will lead to better product decisions',
        controlVersion: {
          description:
            'Dashboard showing "Average revenue per user: $127/mo" based on active users only',
          metrics: {
            decisionQuality: '4.1/10',
            featurePrioritization: 'Focused on power user features',
          },
        },
        treatmentVersion: {
          description:
            'Dashboard showing full funnel: "Of 10,000 sign-ups, 3,100 active at 30 days. Revenue per active user: $127/mo. Revenue per sign-up: $39/mo." with churn reasons visible',
          metrics: {
            decisionQuality: '7.8/10',
            featurePrioritization: 'Balanced between acquisition, onboarding, and retention',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Product teams using full-cohort dashboards made significantly better prioritization decisions. They invested in onboarding improvements that reduced churn by 23%, whereas the control team kept building features for existing power users.',
          learnings: [
            'Survivor-only metrics blind teams to their biggest opportunities (reducing churn)',
            'Showing the full funnel changes where teams invest their effort',
            'Teams with full-cohort data found and fixed onboarding issues 3x faster',
            'Revenue per sign-up is a more honest metric than revenue per active user',
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
        name: 'Success-Only Testimonials',
        description:
          'Testimonial sections featuring exclusively positive, extreme success stories with no range of outcomes',
        howToSpot:
          'Look for testimonial sections where every quote is glowing, every metric is exceptional, and no challenges are mentioned',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Top Performers Lists',
        description:
          'Showcases, leaderboards, or featured sections that only display the most successful items or users',
        howToSpot:
          'Look for "Featured", "Top", "Best of" sections with no indication of what the typical or median outcome looks like',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Curated Showcases Without Base Rates',
        description:
          'Portfolio or gallery pages showing only the best outcomes from a large pool',
        howToSpot:
          'Check if the showcase mentions how many total entries exist vs how many are featured. Look for missing denominators.',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Survivor-Only Metrics',
        description:
          'Dashboards or reports that calculate metrics only for active/successful users',
        howToSpot:
          'Check metric definitions: does "average user" include churned users? Does the funnel show all stages including drop-off?',
        severity: ImpactLevel.CRITICAL,
      },
      {
        name: 'Missing Failure Context',
        description:
          'Case studies and success stories with no mention of failure rates, challenges, or atypical results disclaimers',
        howToSpot:
          'Look for case studies that lack context like "Results above median" or "X% of customers see similar results"',
        severity: ImpactLevel.HIGH,
      },
    ],

    patterns: [
      {
        name: 'Success-Only Showcase Pattern',
        description: 'Interface shows only successful outcomes, hiding failures and typical results',
        indicators: [
          'Testimonials are exclusively positive',
          'Case studies feature only exceptional results',
          'Portfolio shows only best work from a large pool',
          'No mention of failure rates or typical outcomes',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Denominator Suppression Pattern',
        description: 'Metrics are presented without the full denominator, hiding the non-survivors',
        indicators: [
          '"Average" calculations exclude churned or inactive users',
          'Percentages without absolute numbers',
          'Success rates without total attempt counts',
          'Revenue metrics based only on paying customers',
        ],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Curated Reality Pattern',
        description: 'Platform or page presents a curated subset as representative of the whole',
        indicators: [
          'Featured or "Editor\'s Pick" sections dominate the experience',
          'Default sorting shows "Top Rated" or "Most Popular" first',
          'Search results prioritize successful or popular items',
          'No way to browse the full, unfiltered catalog',
        ],
        severity: ImpactLevel.MEDIUM,
        confidence: 'medium',
      },
      {
        name: 'Invisible Churn Pattern',
        description: 'User analytics and reporting systematically exclude users who left',
        indicators: [
          'Dashboards default to "active users" without churn visibility',
          'Satisfaction surveys only sent to current subscribers',
          'NPS scores exclude users who cancelled',
          'Feature usage metrics ignore users who tried and abandoned',
        ],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
    ],

    checklistQuestions: [
      'Do the testimonials represent the full range of customer outcomes, or only the best?',
      'Are metrics calculated using all users who started, or only those who survived/stayed?',
      'Is there context about what typical (median) results look like alongside featured success stories?',
      'Do case studies mention failure rates or challenges encountered?',
      'Can users see the full rating distribution, not just highlighted positive reviews?',
      'Do dashboards include churned users in their calculations by default?',
      'Is there a denominator visible? (e.g., "3 of 50,000 developers built apps with 1M+ downloads")',
      'Are A/B test results analyzed for all assigned users, including those who dropped out?',
      'Does the showcase or portfolio indicate how many entries were considered vs featured?',
      'Are satisfaction metrics collected from all users, including those who cancelled?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in survivorship bias.

Analyze the provided design for survivorship bias patterns. Identify:

1. **Success-Only Framing**: Testimonials, case studies, or showcases that only feature positive outcomes
2. **Missing Denominators**: Metrics that exclude churned, failed, or dropped-out users
3. **Curated Samples**: Featured or "best of" lists presented as representative of typical outcomes
4. **Invisible Churn**: Analytics, dashboards, or reports that systematically exclude non-survivors
5. **Absent Failure Context**: Success stories without base rates, median outcomes, or failure rate context

For each pattern found:
- Identify what non-survivor data is missing (the "silent evidence")
- Assess how the missing data distorts the conclusions users will draw
- Determine if the bias is being used to deceive or is an honest oversight
- Evaluate the ethical implications of the missing data
- Suggest specific ways to include non-survivor data without undermining the message

Consider:
- Are success metrics calculated on the full cohort or only survivors?
- Do testimonials represent the range of outcomes or only outliers?
- Is there visibility into failure rates, churn, and drop-off?
- Would including non-survivor data change the conclusion a user would reach?
- Are there structural reasons the missing data is absent (not just intentional omission)?

Provide actionable recommendations for honest, balanced presentation that counters survivorship bias.`,

    outputSchema: {
      type: 'object',
      properties: {
        survivorshipPatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              visibleSurvivors: { type: 'string' },
              missingNonSurvivors: { type: 'string' },
              distortionLevel: { type: 'string' },
              ethical: { type: 'boolean' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'visibleSurvivors',
              'missingNonSurvivors',
              'ethical',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            survivorshipSeverity: { type: 'number' },
            dataCompleteness: { type: 'number' },
            transparencyScore: { type: 'number' },
            ethicalScore: { type: 'number' },
          },
          required: [
            'survivorshipSeverity',
            'dataCompleteness',
            'transparencyScore',
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
        'survivorshipPatterns',
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
        title: 'Audit for Missing Non-Survivors',
        description:
          'Identify everywhere in your product, marketing, and analytics where only survivors are represented',
        example:
          'Audit: testimonials page shows 12 success stories, 0 challenges. Dashboard reports "avg revenue per user" using only active accounts.',
        tips: [
          'Check every metric for its denominator -- does it include churned/failed users?',
          'Review all testimonials and case studies for outcome diversity',
          'Examine dashboards for default filters that hide non-survivor data',
        ],
      },
      {
        step: 2,
        title: 'Include Failure Rates and Base Rates',
        description:
          'Add context to success stories by showing what typical outcomes look like and how common success is',
        example:
          'Add "Acme Corp\'s results are above our median. 68% of customers see 10-20% improvement; 12% see results above 30%."',
        tips: [
          'Calculate and display median outcomes, not just mean',
          'Show the full distribution of outcomes when possible',
          'Add base rate context to every featured case study',
        ],
      },
      {
        step: 3,
        title: 'Track and Display the Full Funnel',
        description:
          'Ensure analytics include all users from sign-up through churn, not just active survivors',
        example:
          'Change "Average revenue: $127/user" to "Revenue per sign-up: $39. Revenue per active user (31% of sign-ups): $127."',
        tips: [
          'Include churn stages in all funnel visualizations',
          'Report metrics with both survivor-only and full-cohort denominators',
          'Make drop-off data visible by default, not hidden behind toggles',
        ],
      },
      {
        step: 4,
        title: 'Present Balanced Testimonials',
        description:
          'Show the range of customer experiences, including challenges and moderate successes',
        example:
          'Feature mix: 2 exceptional results, 3 typical results, 1 "overcame challenges" story',
        tips: [
          'Include testimonials that mention difficulties alongside successes',
          'Show the full star rating distribution',
          'Let users filter reviews rather than pre-filtering for them',
        ],
      },
      {
        step: 5,
        title: 'Test for Survivorship Bias Impact',
        description:
          'Measure whether balanced presentation changes user expectations, satisfaction, and retention',
        example:
          'A/B test: survivor-only testimonials vs balanced outcomes. Track 30-day retention, not just initial conversion.',
        tips: [
          'Measure long-term retention and satisfaction, not just initial conversion',
          'Survey users about their expectations before and after purchase',
          'Track post-purchase regret and refund rates across test groups',
        ],
      },
    ],

    dos: [
      'Show the full distribution of outcomes, not just the highlights',
      'Include failure rates and challenges alongside success stories',
      'Calculate metrics using all users (including churned) as the denominator',
      'Add base rate context to every featured case study or testimonial',
      'Display the full star rating distribution for reviews',
      'Make churn and drop-off data visible by default in dashboards',
      'Present median outcomes alongside exceptional ones',
      'Include "results not typical" context with specific data, not just disclaimers',
    ],

    donts: [
      'Don\'t show only 5-star reviews or top-performer testimonials',
      'Don\'t calculate "average user" metrics using only active survivors',
      'Don\'t present curated showcases as representative of typical outcomes',
      'Don\'t hide churn data behind extra clicks or toggles in dashboards',
      'Don\'t use outlier success stories without disclosing they\'re outliers',
      'Don\'t survey only current subscribers for satisfaction scores',
      'Don\'t analyze A/B tests using only users who completed the flow',
      'Don\'t build case studies exclusively from your best customers',
    ],

    bestPractices: [
      {
        title: 'Full-Cohort Metrics by Default',
        description:
          'Always calculate and display metrics using the full cohort (including churned/failed users) as the primary view',
        rationale:
          'Survivor-only metrics systematically inflate every positive number. Full-cohort metrics force honest assessment.',
        example:
          'Primary metric: "Revenue per sign-up: $39/mo." Secondary: "Revenue per active user: $127/mo (31% of sign-ups remain active)."',
      },
      {
        title: 'Outcome Distribution Over Highlights',
        description:
          'Show the full range and distribution of outcomes, not just the best cases',
        rationale:
          'Distributions reveal what is typical vs exceptional. Highlights alone create false expectations.',
        example:
          'Show histogram of customer outcomes: "10% see >50% improvement, 45% see 10-30%, 30% see <10%, 15% see no change or decline."',
      },
      {
        title: 'Denominator Transparency',
        description:
          'Always show the denominator alongside any success metric or featured subset',
        rationale:
          'Without the denominator, users cannot assess how representative the featured examples are',
        example:
          '"3 of our 50,000 developers have built apps with 1M+ downloads. Median app has 237 downloads."',
      },
      {
        title: 'Include Failure Narratives',
        description:
          'Actively document and share stories of challenges, failures, and lessons learned',
        rationale:
          'Failure narratives provide the missing half of the data and build trust through honesty',
        example:
          'Publish "What we learned from implementations that struggled" alongside success case studies',
      },
      {
        title: 'Ethical Data Presentation',
        description:
          'Commit to presenting data in ways that lead to accurate conclusions, even when honest data is less flattering',
        rationale:
          'Short-term conversion gains from survivorship-biased data are offset by churn, distrust, and reputational damage',
        example:
          'Internal policy: all public metrics must include full-cohort denominators and median outcomes',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships - Ensure rating distributions and outcome ranges are conveyed through structure, not just visuals',
        implementation:
          'Use semantic HTML for rating distribution bars. Provide text alternatives for visual charts showing outcome distributions. Ensure screen readers convey the full range of outcomes, not just highlighted successes.',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.1.1',
        guideline:
          'Non-text Content - Provide text descriptions for visual outcome distributions',
        implementation:
          'Add alt text to charts and graphs that summarizes the distribution: "Rating distribution: 45% 5-star, 25% 4-star, 15% 3-star, 10% 2-star, 5% 1-star."',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.4.6',
        guideline:
          'Headings and Labels - Clearly label sections that provide context for survivorship bias',
        implementation:
          'Use clear headings like "Typical Results" and "Featured Success Story" to distinguish representative data from curated highlights.',
      },
    ],

    ethics: [
      {
        concern: 'Deceptive Success Framing',
        severity: 'critical',
        explanation:
          'Presenting only extreme success stories as representative outcomes, causing users to make decisions based on false expectations',
        mitigation:
          'Always pair featured success stories with base rates and median outcomes. Disclose how representative the featured examples are.',
      },
      {
        concern: 'Survivor-Only Metrics',
        severity: 'high',
        explanation:
          'Calculating and reporting metrics that exclude churned or failed users, systematically inflating all positive numbers',
        mitigation:
          'Report full-cohort metrics as the primary view. If survivor-only metrics are shown, clearly label them and show the survival rate.',
      },
      {
        concern: 'Invisible Churn',
        severity: 'high',
        explanation:
          'Building products and making decisions based on feedback only from users who stayed, ignoring the needs and experiences of those who left',
        mitigation:
          'Actively collect exit feedback. Include churn data in all product decisions. Conduct "failure autopsies" as standard practice.',
      },
      {
        concern: 'False Hope in High-Stakes Contexts',
        severity: 'critical',
        explanation:
          'Using survivorship-biased success stories in contexts where users make significant financial, career, or life decisions',
        mitigation:
          'In high-stakes contexts (investment platforms, career services, health products), prominently display failure rates and typical outcomes. Never rely solely on success stories.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'A Mathematician\'s Plea for Survivorship Bias Awareness',
        author: 'Wald, Abraham',
        year: 1943,
        description:
          'Wald\'s foundational WWII analysis of aircraft damage, demonstrating that visible bullet holes on returning planes indicated where armor was NOT needed -- the planes hit elsewhere never returned',
        type: 'foundational',
      },
      {
        title: 'Survivorship Bias in Performance Studies',
        author: 'Brown, S. J., Goetzmann, W., Ibbotson, R. G., & Ross, S. A.',
        year: 1992,
        doi: '10.1093/rfs/5.4.553',
        description:
          'Landmark study showing that mutual fund performance data is severely distorted by survivorship bias, as failed funds are removed from databases',
        type: 'foundational',
      },
    ],

    books: [
      {
        title: 'The Black Swan: The Impact of the Highly Improbable',
        author: 'Taleb, Nassim Nicholas',
        year: 2007,
        isbn: '9781400063512',
        description:
          'Taleb\'s exploration of "silent evidence" -- the critical role of unseen failures in distorting our understanding of success, risk, and probability',
        type: 'foundational',
      },
      {
        title: 'Fooled by Randomness',
        author: 'Taleb, Nassim Nicholas',
        year: 2001,
        isbn: '9780812975215',
        description:
          'Deep examination of how survivorship bias causes us to attribute skill to what is often luck, with extensive examples from finance and life',
        type: 'foundational',
      },
      {
        title: 'How Not to Be Wrong: The Power of Mathematical Thinking',
        author: 'Ellenberg, Jordan',
        year: 2014,
        isbn: '9780143127536',
        description:
          'Includes an excellent chapter on Wald\'s WWII airplane analysis and how survivorship bias affects everyday reasoning',
        type: 'practical',
      },
    ],

    articles: [
      {
        title: 'Survivorship Bias: The Tale of Forgotten Failures',
        author: 'Farnam Street',
        url: 'https://fs.blog/survivorship-bias/',
        description:
          'Accessible overview of survivorship bias with the Wald airplane story and modern examples',
        type: 'practical',
      },
      {
        title: 'How Survivorship Bias Tricks Entrepreneurs',
        author: 'Kaplan, David A.',
        url: 'https://www.inc.com/magazine/201306/david-kaplan/survivorship-bias.html',
        description:
          'How survivorship bias in startup media creates unrealistic expectations for entrepreneurs',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'Survivorship Bias: How It Distorts Reality',
        author: 'Veritasium',
        url: 'https://www.youtube.com/watch?v=_Qd3erAPI9w',
        description:
          'Engaging video explanation covering the Wald story and modern applications of survivorship bias',
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
