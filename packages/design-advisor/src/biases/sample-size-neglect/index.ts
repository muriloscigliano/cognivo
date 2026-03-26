/**
 * SAMPLE SIZE NEGLECT
 *
 * We fail to account for sample size when evaluating statistics,
 * treating small and large samples as equally reliable.
 */

import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const sampleSizeNeglect: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'sample-size-neglect',
    name: 'Sample Size Neglect',
    aliases: ['Insensitivity to Sample Size', 'Law of Small Numbers', 'Small Sample Fallacy'],
    category: BiasCategory.COGNITIVE,
    relatedCategories: [
      BiasCategory.DECISION_MAKING,
      BiasCategory.PERCEPTION,
    ],
    tags: [
      'statistics',
      'data-reliability',
      'decision-making',
      'judgment',
      'ratings',
      'confidence',
      'sample-size',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple:
      'People treat small and large samples as equally reliable when evaluating statistics and drawing conclusions.',

    detailed: `Sample Size Neglect is a cognitive bias where people fail to account for the size of a sample when evaluating statistical information. A restaurant with a 5-star rating from 3 reviews is treated as equivalent to one with 4.8 stars from 2,000 reviews, even though the larger sample is far more reliable.

This bias stems from the "law of small numbers" -- the mistaken belief that small samples are just as representative of a population as large ones. People expect even tiny samples to reflect the true distribution, leading to overconfidence in conclusions drawn from insufficient data.

In UX and product design, this bias is critical when displaying ratings, reviews, analytics, A/B test results, survey data, or any statistical information. Designers must help users understand data reliability by making sample size visible, communicating confidence levels, and providing appropriate "not enough data" states.`,

    psychologyBasis: {
      discoveredBy: 'Amos Tversky and Daniel Kahneman',
      year: 1971,
      theory: 'Belief in the Law of Small Numbers',
      mechanism: `People intuitively expect small samples to mirror the properties of the population they are drawn from. This happens because:

1. **Representativeness Heuristic**: People judge the likelihood of a sample by how well it represents the population, ignoring sample size entirely
2. **Intuitive Statistics Failure**: Human intuition about variance is poor -- we underestimate how much small samples can deviate from the true mean
3. **Pattern Over-Detection**: The brain is wired to detect patterns, even in random noise from small datasets
4. **Confidence Insensitivity**: People's confidence in a statistic does not scale appropriately with the amount of evidence supporting it
5. **Anchoring to the Number**: The statistic itself (e.g., a 5-star rating) captures attention while the sample size (3 reviews) is ignored or discounted`,
    },

    realWorldExample: `In Tversky and Kahneman's classic 1971 study, even trained statisticians fell prey to this bias. When told a hospital had 45 births per day and another had 15, both groups of researchers estimated similar probabilities of seeing 60% or more boys on a given day -- failing to recognize that the smaller hospital would show much greater day-to-day variance. The correct answer is that the smaller hospital is far more likely to see extreme deviations from the 50/50 ratio.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `Sample Size Neglect profoundly affects how users interpret data displayed in interfaces. When ratings, statistics, survey results, or analytics are presented without adequate sample size context, users draw unreliable conclusions. Designers can counteract this by:

- Displaying sample size prominently alongside all aggregate statistics
- Using confidence intervals and error bars on charts and metrics
- Designing clear "not enough data" empty states for small samples
- Providing data reliability indicators scaled to sample size
- Warning users when drawing conclusions from insufficient data`,

    whenToUse: [
      {
        title: 'Review and Rating Displays',
        scenario:
          'When showing aggregate ratings, scores, or rankings based on user input',
        example:
          'Display "4.8 stars (2,147 reviews)" rather than just "4.8 stars" -- scale the visual prominence of the rating based on review count',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'A/B Testing and Experimentation Dashboards',
        scenario:
          'When presenting experiment results to decision-makers',
        example:
          'Show statistical significance indicators, confidence intervals, and minimum sample size thresholds before declaring a winner',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Analytics and Reporting',
        scenario:
          'When displaying metrics, trends, or comparisons derived from data',
        example:
          'Add confidence bands to trend lines and flag metrics based on fewer than N data points with a "low confidence" indicator',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Survey Results and Feedback',
        scenario:
          'When presenting survey or feedback data to users or stakeholders',
        example:
          'Show "Based on 12 responses (23% response rate)" with a note that results may not be representative',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Search and Discovery',
        scenario:
          'When ranking or sorting items by user-generated metrics',
        example:
          'Use Bayesian averaging or Wilson score intervals for ranking so that items with few ratings do not dominate leaderboards',
        impact: ImpactLevel.MEDIUM,
      },
    ],

    whenToAvoid: [
      {
        title: 'Overwhelming Casual Users',
        reason:
          'Statistical details like confidence intervals can confuse non-technical audiences',
        consequence:
          'Users feel overwhelmed, ignore the data entirely, or lose trust in the interface',
        alternative:
          'Use progressive disclosure: show simple reliability indicators (e.g., "Not enough reviews yet") with detailed stats available on demand',
      },
      {
        title: 'Marketing and Promotional Contexts',
        reason:
          'Prominently flagging low sample sizes on your own product ratings can undermine new products',
        consequence:
          'New products with few reviews appear untrustworthy, creating a cold-start problem',
        alternative:
          'Use "New" or "Just launched" badges instead of harsh "insufficient data" warnings for your own new offerings',
      },
      {
        title: 'Real-Time Dashboards',
        reason:
          'Constantly showing low-confidence warnings on streaming data creates alert fatigue',
        consequence:
          'Users stop paying attention to confidence indicators when every metric is flagged',
        alternative:
          'Set reasonable time windows for aggregation so metrics have meaningful sample sizes before displaying',
      },
      {
        title: 'Vanity Metric Contexts',
        reason:
          'Adding sample size context to vanity metrics can reduce engagement without improving decisions',
        consequence:
          'Lower engagement without decision-quality improvement',
        alternative:
          'Focus sample size communication on metrics that drive consequential decisions',
      },
    ],

    commonMistakes: [
      {
        title: 'Hiding Sample Size',
        description:
          'Displaying aggregate statistics (averages, ratings, percentages) without showing how many data points they are based on',
        why: 'Users cannot assess reliability without sample size, leading to overconfidence in small-sample statistics',
        fix: 'Always show sample size adjacent to aggregate statistics: "4.2 avg (n=47)" or "87% satisfaction (23 responses)"',
      },
      {
        title: 'Treating All Ratings Equally in Rankings',
        description:
          'Sorting items by average rating without accounting for review count, causing items with 1 five-star review to rank above items with thousands of 4.8-star reviews',
        why: 'Naive averaging treats a single data point as equally reliable as thousands',
        fix: 'Use Bayesian averaging, Wilson score intervals, or weighted scoring that accounts for sample size',
      },
      {
        title: 'Calling A/B Tests Too Early',
        description:
          'Declaring experiment winners before reaching statistical significance',
        why: 'Small samples produce dramatic but unreliable differences; early results regress to the mean',
        fix: 'Enforce minimum sample size requirements, show confidence levels, and lock "winner" declarations behind significance thresholds',
      },
      {
        title: 'Missing "Not Enough Data" States',
        description:
          'Showing charts, trends, or comparisons when there are too few data points to be meaningful',
        why: 'A trend line through 3 data points suggests a reliable pattern where none exists',
        fix: 'Design explicit empty or insufficient-data states: "We need at least 30 data points to show a reliable trend"',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.HIGH,
        description:
          'Layout determines whether sample size information is visible alongside statistics',
        examples: [
          'Place review count directly next to star rating, not hidden below the fold',
          'Position confidence indicators adjacent to the metrics they qualify',
          'Use card layouts that pair the statistic with its reliability context',
          'Reserve space for "insufficient data" empty states in data-driven layouts',
        ],
      },
      typography: {
        level: ImpactLevel.HIGH,
        description:
          'Typography hierarchy determines whether users notice sample size or only the headline number',
        examples: [
          'Avoid making the rating huge and the review count tiny -- use proportional sizing',
          'Use consistent text weight for both the metric and its sample size',
          'Style confidence qualifiers (e.g., "preliminary") with enough emphasis to be noticed',
          'Use secondary text styles for sample context, but never make them invisible',
        ],
      },
      color: {
        level: ImpactLevel.MEDIUM,
        description:
          'Color can communicate data reliability levels at a glance',
        examples: [
          'Use muted or desaturated colors for low-confidence metrics',
          'Apply confidence-scaled color intensity: bolder colors for higher sample sizes',
          'Use amber or gray for "not enough data" states rather than the standard metric colors',
          'Add subtle background shading to distinguish high-confidence from low-confidence data regions',
        ],
      },
      interaction: {
        level: ImpactLevel.HIGH,
        description:
          'Interactions can reveal sample size context and prevent premature conclusions',
        examples: [
          'Hover/tap on a rating to see the full review count and distribution histogram',
          'Disable sorting by rating until items have a minimum number of reviews',
          'Show a tooltip on charts explaining confidence bands',
          'Gate "export" or "share" actions on reports until data reaches significance thresholds',
        ],
      },
      content: {
        level: ImpactLevel.CRITICAL,
        description:
          'Content framing determines whether users calibrate trust to data reliability',
        examples: [
          'Label statistics with explicit sample size: "Based on 2,147 responses"',
          'Use qualifying language for small samples: "Early results from 12 users suggest..."',
          'Provide context for significance: "This difference is not yet statistically significant"',
          'Explain what the number means: "87% of the 23 people who responded rated this positively"',
        ],
      },
      accessibility: {
        level: ImpactLevel.HIGH,
        description:
          'Sample size context must be available to all users, including those using assistive technologies',
        examples: [
          'Include sample size in ARIA labels: aria-label="4.8 out of 5 stars based on 2,147 reviews"',
          'Provide text alternatives for visual confidence indicators (color, opacity)',
          'Ensure screen readers announce both the metric and its reliability context',
          'Do not rely solely on color to communicate data confidence levels',
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
        title: 'Rating with Prominent Review Count',
        description:
          'Product rating display that pairs star rating with review count and distribution',
        code: `<div class="rating-display">
  <div class="rating-summary">
    <span class="stars" aria-label="4.8 out of 5 stars">★★★★★</span>
    <span class="rating-number">4.8</span>
    <span class="review-count">Based on 2,147 reviews</span>
  </div>
  <div class="rating-distribution">
    <div class="bar"><span class="label">5★</span><div class="fill" style="width:78%"></div><span>78%</span></div>
    <div class="bar"><span class="label">4★</span><div class="fill" style="width:14%"></div><span>14%</span></div>
    <div class="bar"><span class="label">3★</span><div class="fill" style="width:5%"></div><span>5%</span></div>
    <div class="bar"><span class="label">2★</span><div class="fill" style="width:2%"></div><span>2%</span></div>
    <div class="bar"><span class="label">1★</span><div class="fill" style="width:1%"></div><span>1%</span></div>
  </div>
</div>`,
        explanation:
          'Showing 2,147 reviews alongside the 4.8 rating gives users confidence this is a reliable score. The distribution histogram provides even more context, showing the rating is not an artifact of a few extreme votes.',
        principle:
          'Sample size displayed prominently lets users calibrate trust appropriately',
        metrics: {
          before: '62% of users clicked "Buy" regardless of review count',
          after: '71% conversion on high-count products, 34% on low-count (appropriate calibration)',
          improvement: 'Users made better-informed purchasing decisions',
        },
      },
      {
        title: 'A/B Test Dashboard with Significance Indicator',
        description:
          'Experimentation platform showing results with statistical confidence',
        code: `<div class="experiment-result">
  <h3>Experiment: New Checkout Flow</h3>
  <div class="variants">
    <div class="variant control">
      <h4>Control</h4>
      <span class="metric">3.2% conversion</span>
      <span class="sample">n = 14,230</span>
    </div>
    <div class="variant treatment">
      <h4>Treatment</h4>
      <span class="metric">3.8% conversion</span>
      <span class="sample">n = 14,185</span>
    </div>
  </div>
  <div class="significance">
    <span class="badge significant">Statistically Significant (p = 0.003)</span>
    <span class="confidence">95% CI: [+0.3%, +0.9%]</span>
    <span class="power">Statistical power: 92%</span>
  </div>
  <p class="recommendation">Sufficient data to make a decision. Treatment shows a reliable improvement.</p>
</div>`,
        explanation:
          'The dashboard prevents premature conclusions by showing sample sizes per variant, statistical significance, confidence intervals, and power. Decision-makers can see both the effect size and the reliability of the measurement.',
        principle:
          'Statistical context prevents premature decisions based on insufficient sample sizes',
      },
      {
        title: 'Not Enough Data Empty State',
        description:
          'Analytics chart showing an explicit insufficient-data state',
        code: `<div class="chart-container insufficient-data">
  <h4>Customer Satisfaction Trend</h4>
  <div class="empty-state">
    <svg class="icon" aria-hidden="true"><!-- chart icon with question mark --></svg>
    <p class="message">Not enough data to show a reliable trend</p>
    <p class="detail">We have 8 responses so far. We need at least 30 to display a meaningful trend line.</p>
    <div class="progress">
      <div class="progress-bar" style="width: 27%"></div>
      <span class="progress-label">8 / 30 responses</span>
    </div>
    <p class="action">Share the survey to collect more responses</p>
  </div>
</div>`,
        explanation:
          'Rather than drawing a misleading trend line through 8 data points, the interface explicitly communicates that the sample is too small. The progress bar shows how close the user is to having enough data, turning a limitation into motivation.',
        principle:
          'Explicit "not enough data" states prevent false confidence from small samples',
      },
    ],

    bad: [
      {
        title: 'Rating Without Context',
        description:
          'Product listing showing only the star rating with no review count',
        code: `<!-- DON'T DO THIS -->
<div class="product-card">
  <h3>Premium Widget Pro</h3>
  <div class="rating">
    <span class="stars">★★★★★</span>
    <span class="score">5.0</span>
  </div>
  <p class="price">$299</p>
  <button>Buy Now</button>
</div>
<!-- This product has only 2 reviews! -->`,
        explanation:
          'A perfect 5.0 rating looks impressive but could be based on just 2 reviews. Without showing the review count, users cannot assess reliability. This product might rank above a 4.7-star product with 5,000 reviews.',
        principle:
          'Ratings without sample size create false confidence and misleading rankings',
      },
      {
        title: 'Premature A/B Test Winner',
        description:
          'Experimentation dashboard declaring a winner after too few conversions',
        code: `<!-- DON'T DO THIS -->
<div class="experiment-result">
  <h3>Experiment: Hero Banner</h3>
  <div class="winner-banner">
    <span class="trophy">🏆</span>
    <p>WINNER: Variant B!</p>
    <p>+47% improvement in conversion!</p>
  </div>
  <div class="details" style="font-size: 0.7rem; color: #999;">
    <p>Control: 3 conversions / 89 visitors (3.4%)</p>
    <p>Treatment: 5 conversions / 91 visitors (5.5%)</p>
  </div>
</div>`,
        explanation:
          'With only 3 and 5 conversions respectively, this "47% improvement" is meaningless noise. The dramatic winner declaration with a trophy icon creates false confidence. The tiny, muted detail text hides the dangerously small sample.',
        principle:
          'Declaring winners from small samples leads to implementing changes that regress to the mean',
      },
      {
        title: 'Trend Line from Insufficient Data',
        description:
          'Chart drawing a confident trend line through very few data points',
        code: `<!-- DON'T DO THIS -->
<div class="chart">
  <h4>Revenue Growth Trend</h4>
  <!-- Draws a bold upward trend line through 4 weekly data points -->
  <svg viewBox="0 0 400 200">
    <polyline points="50,180 150,120 250,90 350,40"
      stroke="#22c55e" stroke-width="3" fill="none"/>
    <text x="200" y="30" fill="#22c55e" font-weight="bold">
      +350% growth trajectory!
    </text>
  </svg>
  <p>Based on the last 4 weeks</p>
</div>`,
        explanation:
          'A bold trend line through 4 data points with a "350% growth trajectory" claim is deeply misleading. Four weeks of data have enormous variance and cannot reliably predict a trajectory. The confident visual treatment masks the fragility of the conclusion.',
        principle:
          'Visual confidence (bold lines, growth claims) should match data reliability',
      },
    ],

    realWorld: [
      {
        company: 'Yelp',
        product: 'Restaurant Listings',
        url: 'https://www.yelp.com',
        description:
          'Yelp prominently displays both star rating and review count (e.g., "4.5 stars, 1,247 reviews"). Their ranking algorithm weights review count alongside rating, preventing restaurants with one 5-star review from topping search results. They also label new businesses with "New" badges.',
        effectiveness: 'very-effective',
        analysis:
          'Yelp addresses sample size neglect at both the display level (showing counts) and the algorithmic level (weighted ranking). Users can see at a glance whether a rating is based on substantial evidence.',
      },
      {
        company: 'Amazon',
        product: 'Product Reviews',
        url: 'https://www.amazon.com',
        description:
          'Amazon shows review count alongside ratings, provides a histogram of rating distribution, and uses a "verified purchase" label. Their ranking considers review velocity and count, not just average. Products with few reviews show "Be the first to review" rather than a misleading aggregate.',
        effectiveness: 'very-effective',
        analysis:
          'Amazon combats sample size neglect through multiple mechanisms: visible review counts, distribution histograms, and algorithmic weighting. The "verified purchase" filter further helps users assess data quality.',
      },
      {
        company: 'Optimizely',
        product: 'Experimentation Platform',
        url: 'https://www.optimizely.com',
        description:
          'Optimizely requires experiments to reach statistical significance before declaring winners. The dashboard shows real-time confidence levels, sample sizes per variant, and estimated time remaining to reach significance. Results are explicitly labeled as "inconclusive" until thresholds are met.',
        effectiveness: 'very-effective',
        analysis:
          'By gating conclusions behind statistical significance requirements, Optimizely prevents teams from making product decisions based on noise from small samples. The visual design reinforces patience and rigor.',
      },
      {
        company: 'FiveThirtyEight',
        product: 'Election Forecasts & Poll Analysis',
        url: 'https://fivethirtyeight.com',
        description:
          'FiveThirtyEight weights polls by sample size and methodology quality. Polls with larger, more representative samples receive higher weights in their models. They prominently display sample sizes and margins of error for individual polls.',
        effectiveness: 'very-effective',
        analysis:
          'FiveThirtyEight explicitly models sample size effects, showing readers that a poll of 2,000 likely voters carries more weight than one of 200 registered voters. Their transparency about methodology educates users about statistical reliability.',
      },
    ],

    abTests: [
      {
        title: 'Review Count Visibility: Hidden vs Prominent',
        hypothesis:
          'Showing review count prominently will help users make better purchasing decisions and increase trust in highly-reviewed products',
        controlVersion: {
          description:
            'Product listing showing only star rating (e.g., "4.7 stars") without any review count',
          metrics: {
            conversionRate: '5.1%',
            returnRate: '12.3%',
            trustScore: '6.2/10',
          },
        },
        treatmentVersion: {
          description:
            'Product listing showing star rating with prominent review count and reliability indicator (e.g., "4.7 stars (1,834 reviews) -- Highly Reliable")',
          metrics: {
            conversionRate: '4.8%',
            returnRate: '7.1%',
            trustScore: '8.4/10',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'While raw conversion dipped slightly (-5.9%), return rate dropped 42% and trust scores increased 35%. Users made better-informed decisions, converting on reliable products and avoiding poorly-reviewed ones. Net revenue increased due to fewer returns.',
          learnings: [
            'Sample size context reduces impulse purchases of poorly-reviewed products',
            'Return rates are a better success metric than raw conversion for this pattern',
            'Trust scores improved significantly, indicating long-term brand benefits',
            'Users spent more time on high-count products and less on low-count ones',
          ],
        },
      },
      {
        title: 'A/B Test Dashboard: Early Results vs Significance-Gated',
        hypothesis:
          'Requiring statistical significance before showing winner status will improve decision quality',
        controlVersion: {
          description:
            'Dashboard showing real-time percentage differences with green/red coloring from the first visitor, allowing users to call winners at any time',
          metrics: {
            conversionRate: '89% of teams called winners within 48 hours',
            timeOnPage: '0:45',
          },
        },
        treatmentVersion: {
          description:
            'Dashboard showing "Collecting data..." state until reaching 95% significance, with progress indicators showing percent of required sample collected',
          metrics: {
            conversionRate: '23% of teams called winners within 48 hours',
            timeOnPage: '2:15',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Teams using the significance-gated dashboard made dramatically better decisions. Follow-up analysis showed 67% of "winners" called within 48 hours on the control dashboard failed to replicate, compared to only 8% of significance-gated decisions.',
          learnings: [
            'Without guardrails, most teams call winners far too early',
            'Visual progress indicators ("67% of required sample collected") reduced frustration with waiting',
            'Showing the "Collecting data..." state normalized patience as expected behavior',
            'Teams spent more time analyzing results when they could not jump to conclusions',
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
        name: 'Missing Sample Size',
        description:
          'Aggregate statistics (averages, ratings, percentages) displayed without showing how many data points they represent',
        howToSpot:
          'Look for star ratings, percentages, or averages that lack an "n=" or review count',
        severity: ImpactLevel.CRITICAL,
      },
      {
        name: 'Unqualified Rankings',
        description:
          'Items sorted or ranked by average score without weighting for sample size',
        howToSpot:
          'Check if top-ranked items have suspiciously few reviews compared to lower-ranked ones',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Premature Trend Lines',
        description:
          'Charts drawing trend lines or trajectories through very few data points',
        howToSpot:
          'Count the data points on the chart -- fewer than ~30 makes trend claims unreliable',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Missing Confidence Indicators',
        description:
          'Metrics and experiment results presented without confidence intervals, error bars, or significance levels',
        howToSpot:
          'Look for bold claims ("47% improvement!") without any uncertainty quantification',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Absent Empty States',
        description:
          'Data visualizations that display metrics even when sample size is too small to be meaningful',
        howToSpot:
          'Check what happens when a chart or metric has fewer than 5-10 data points -- does it still render confidently?',
        severity: ImpactLevel.MEDIUM,
      },
    ],

    patterns: [
      {
        name: 'Naked Statistic Pattern',
        description: 'Aggregate metrics shown without any sample size context',
        indicators: [
          'Star ratings without review counts',
          'Percentages without denominator ("87% positive!")',
          'Averages without "based on N responses"',
          'NPS scores without respondent counts',
        ],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Naive Ranking Pattern',
        description: 'Items ranked by simple average without sample size weighting',
        indicators: [
          'Perfect 5.0 ratings at the top of sorted lists',
          'New items with few reviews outranking established ones',
          'High variance in review counts among top-ranked items',
          'No Bayesian or Wilson score adjustment visible',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Premature Conclusion Pattern',
        description: 'Definitive conclusions drawn from small or early data',
        indicators: [
          'A/B test "winners" with fewer than 100 conversions per variant',
          'Trend projections from fewer than 10 data points',
          'Dashboards showing results in real-time without significance gates',
          '"47% improvement!" banners after a day of testing',
        ],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Missing Uncertainty Pattern',
        description: 'Data presented as certain when it carries significant uncertainty',
        indicators: [
          'Charts without error bars or confidence bands',
          'Single-number summaries without ranges',
          'Forecasts without uncertainty intervals',
          'Segment comparisons without significance testing',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'medium',
      },
    ],

    checklistQuestions: [
      'Is the sample size displayed alongside every aggregate statistic?',
      'Are ratings and rankings weighted by sample size or review count?',
      'Do charts include confidence bands or error bars?',
      'Is there an explicit "not enough data" state for insufficient samples?',
      'Are A/B test results gated behind statistical significance thresholds?',
      'Do trend lines require a minimum number of data points before rendering?',
      'Are percentages shown with their denominators?',
      'Do survey results disclose response count and response rate?',
      'Is the visual prominence of a statistic proportional to its reliability?',
      'Can users distinguish high-confidence metrics from low-confidence ones at a glance?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in sample size neglect and statistical reasoning in interfaces.

Analyze the provided design for sample size neglect patterns. Identify:

1. **Naked Statistics**: Aggregate metrics shown without sample size context
2. **Ranking Reliability**: Whether rankings account for sample size differences
3. **Confidence Communication**: How uncertainty and reliability are conveyed
4. **Empty States**: Whether insufficient-data states exist for small samples
5. **Premature Conclusions**: Whether the interface enables conclusions from insufficient data

For each pattern found:
- Identify what statistic is shown and what sample size context is missing
- Assess the risk of users drawing unreliable conclusions
- Determine if the visual treatment matches the data reliability
- Suggest specific improvements for communicating data confidence

Consider:
- Are users shown enough context to calibrate trust in displayed statistics?
- Could someone make a bad decision because sample size is hidden?
- Do charts and trends reflect appropriate uncertainty?
- Are there minimum thresholds before data is displayed?
- Is the design accessible to users who may not understand statistical concepts?

Provide actionable recommendations for making sample size and data reliability visible.`,

    outputSchema: {
      type: 'object',
      properties: {
        sampleSizePatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              statistic: { type: 'string' },
              sampleSizeVisible: { type: 'boolean' },
              reliabilityRisk: { type: 'string' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'statistic',
              'sampleSizeVisible',
              'reliabilityRisk',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            sampleSizeVisibility: { type: 'number' },
            confidenceCommunication: { type: 'number' },
            emptyStateQuality: { type: 'number' },
            rankingReliability: { type: 'number' },
          },
          required: [
            'sampleSizeVisibility',
            'confidenceCommunication',
            'emptyStateQuality',
            'rankingReliability',
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
        'sampleSizePatterns',
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
        title: 'Audit All Aggregate Statistics',
        description:
          'Identify every place in the interface where an aggregate statistic is displayed (ratings, averages, percentages, scores)',
        example:
          'Map all instances: product ratings, NPS scores, survey results, conversion rates, satisfaction percentages',
        tips: [
          'Check both user-facing and internal dashboards',
          'Include charts, cards, tables, and inline metrics',
          'Do not forget dynamically generated statistics from APIs',
        ],
      },
      {
        step: 2,
        title: 'Add Sample Size to Every Statistic',
        description:
          'Display the number of data points alongside every aggregate metric',
        example:
          'Change "4.7 stars" to "4.7 stars (1,834 reviews)" and "87% satisfaction" to "87% satisfaction (n=423)"',
        tips: [
          'Use natural language for consumer contexts: "1,834 reviews"',
          'Use "n=" notation for analytical and professional contexts',
          'Scale the visual prominence -- do not bury sample size in tiny text',
        ],
      },
      {
        step: 3,
        title: 'Design Insufficient Data States',
        description:
          'Create explicit empty states for when sample sizes are below reliability thresholds',
        example:
          'Show "Not enough reviews yet (3 of 10 needed)" instead of a misleading 5.0 star rating',
        tips: [
          'Define minimum sample thresholds for each metric type',
          'Make empty states informative, not just blank',
          'Show progress toward the threshold to motivate data collection',
        ],
      },
      {
        step: 4,
        title: 'Add Confidence Indicators',
        description:
          'Provide visual cues that scale with data reliability',
        example:
          'Use a "confidence meter" next to ratings: low (gray), medium (amber), high (green) based on review count',
        tips: [
          'Use color, opacity, or icon states to communicate confidence',
          'Add confidence bands to chart trend lines',
          'Show error bars on bar and column charts',
        ],
      },
      {
        step: 5,
        title: 'Fix Ranking Algorithms',
        description:
          'Ensure rankings and sorting account for sample size, not just average score',
        example:
          'Replace naive average-based sorting with Wilson score intervals or Bayesian averaging',
        tips: [
          'Wilson lower bound is ideal for binary (thumbs up/down) ratings',
          'Bayesian averaging works well for star ratings',
          'Consider a minimum review count before items appear in ranked lists',
        ],
      },
      {
        step: 6,
        title: 'Gate Conclusions Behind Significance',
        description:
          'For A/B tests and experiments, require statistical significance before showing winners',
        example:
          'Display "Collecting data... 67% of required sample reached" instead of premature winner banners',
        tips: [
          'Set significance thresholds (typically p < 0.05 or 95% confidence)',
          'Show progress toward required sample size',
          'Prevent teams from ending experiments prematurely',
        ],
      },
    ],

    dos: [
      'Show sample size adjacent to every aggregate statistic',
      'Use Bayesian averaging or Wilson scores for rankings based on ratings',
      'Design explicit "not enough data" states with progress indicators',
      'Add confidence bands and error bars to charts',
      'Gate A/B test conclusions behind statistical significance thresholds',
      'Use progressive disclosure to layer statistical detail for different audiences',
      'Make the visual prominence of a metric proportional to its reliability',
      'Explain what the numbers mean in plain language for non-technical users',
    ],

    donts: [
      'Don\'t display ratings or averages without showing the underlying sample size',
      'Don\'t rank items by naive average score without sample size weighting',
      'Don\'t draw trend lines through fewer than ~30 data points',
      'Don\'t declare A/B test winners before reaching statistical significance',
      'Don\'t use the same visual treatment for high-confidence and low-confidence metrics',
      'Don\'t hide sample size in tiny text, footnotes, or tooltips-only',
      'Don\'t show percentages without denominators (e.g., "87% positive" without "of 23 responses")',
      'Don\'t allow users to sort by average rating without a minimum review count',
    ],

    bestPractices: [
      {
        title: 'Pair Every Number with Its Evidence',
        description:
          'Every aggregate statistic should be accompanied by the sample size that produced it',
        rationale:
          'Without sample size context, users cannot assess whether a statistic is reliable or noise',
        example:
          '"4.8 stars (2,147 reviews)" not just "4.8 stars"',
      },
      {
        title: 'Use Bayesian Averaging for Rankings',
        description:
          'Weight ratings toward a global average based on review count, preventing small-sample outliers from dominating',
        rationale:
          'A 5-star rating from 2 reviews is less reliable than a 4.7 from 5,000 -- rankings should reflect this',
        example:
          'Weighted score = (global_avg * prior_weight + item_avg * review_count) / (prior_weight + review_count)',
      },
      {
        title: 'Progressive Disclosure of Statistical Detail',
        description:
          'Show simple reliability indicators by default, with detailed statistics available on interaction',
        rationale:
          'Non-technical users need confidence cues; power users need raw numbers. Serve both.',
        example:
          'Default: "Highly Reliable" badge. On hover: "Based on 2,147 reviews, 95% CI: [4.72, 4.88]"',
      },
      {
        title: 'Design Meaningful Empty States',
        description:
          'When data is insufficient, show an informative state rather than a misleading metric',
        rationale:
          'Showing a metric with tiny sample size is worse than showing no metric at all',
        example:
          '"We need 22 more reviews to show a reliable rating. Be the first to contribute!"',
      },
      {
        title: 'Communicate Uncertainty Visually',
        description:
          'Use visual treatments (opacity, color saturation, dashed lines) to signal data reliability',
        rationale:
          'Users process visual cues faster than reading sample size numbers',
        example:
          'Solid trend lines for high-confidence data, dashed lines for projections or low-sample regions',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships - Sample size context must be programmatically associated with its statistic',
        implementation:
          'Include sample size in ARIA labels: aria-label="4.8 out of 5 stars based on 2,147 reviews". Use aria-describedby for confidence indicators.',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.4.1',
        guideline:
          'Use of Color - Don\'t rely solely on color to communicate data reliability',
        implementation:
          'Pair color-based confidence indicators with text labels (e.g., "Low Confidence"), icons, or patterns so color-blind users can assess reliability.',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.1.1',
        guideline:
          'Non-text Content - Charts with confidence bands need text alternatives',
        implementation:
          'Provide alt text or data tables that describe both the metric and its confidence interval for screen reader users.',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.4.6',
        guideline:
          'Headings and Labels - Insufficient data states must be clearly labeled',
        implementation:
          'Use clear headings like "Not Enough Data" rather than just hiding the chart. Screen reader users should encounter the same "insufficient data" messaging.',
      },
    ],

    ethics: [
      {
        concern: 'Hiding Low Sample Sizes to Inflate Perceived Quality',
        severity: 'critical',
        explanation:
          'Deliberately hiding review counts or sample sizes to make products appear more reliable than they are',
        mitigation:
          'Always display sample sizes. If a product has few reviews, use a "New" badge rather than hiding the count.',
      },
      {
        concern: 'Premature A/B Test Decisions',
        severity: 'high',
        explanation:
          'Allowing or encouraging teams to call experiment winners before reaching statistical significance, leading to shipping ineffective or harmful changes',
        mitigation:
          'Gate winner declarations behind significance thresholds. Show "Collecting data..." states until thresholds are met.',
      },
      {
        concern: 'Cherry-Picking Small Samples',
        severity: 'high',
        explanation:
          'Selecting small, favorable subsamples to present a misleading picture (e.g., "100% of surveyed customers recommend us" based on 5 hand-picked respondents)',
        mitigation:
          'Disclose total sample size, selection methodology, and response rate alongside any reported statistics.',
      },
      {
        concern: 'Medical or Safety Decisions from Small Studies',
        severity: 'critical',
        explanation:
          'Presenting small-study results with the same visual authority as large, replicated studies in health or safety contexts',
        mitigation:
          'Clearly label study size and replication status. Use explicit warnings: "Based on a single study of 47 participants."',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'Belief in the Law of Small Numbers',
        author: 'Tversky, A., & Kahneman, D.',
        year: 1971,
        doi: '10.1037/h0031322',
        description:
          'The foundational paper demonstrating that people -- including trained statisticians -- expect small samples to be representative of populations',
        type: 'foundational',
      },
      {
        title: 'Judgment under Uncertainty: Heuristics and Biases',
        author: 'Tversky, A., & Kahneman, D.',
        year: 1974,
        doi: '10.1126/science.185.4157.1124',
        description:
          'Landmark paper covering sample size neglect as part of the representativeness heuristic framework',
        type: 'foundational',
      },
      {
        title: 'Sample Size and the Accuracy of Predictions Made from Multiple Regression',
        author: 'Schmidt, F. L.',
        year: 1971,
        description:
          'Demonstrates how small samples lead to overfitting and unreliable predictions in regression models',
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
          'Chapters 10-11 cover the law of small numbers and sample size neglect extensively, with the hospital births example and practical implications',
        type: 'foundational',
      },
      {
        title: 'The Art of Statistics: Learning from Data',
        author: 'Spiegelhalter, David',
        year: 2019,
        isbn: '9781541618527',
        description:
          'Accessible guide to understanding statistical reasoning, including why sample size matters for reliability',
        type: 'practical',
      },
      {
        title: 'Naked Statistics: Stripping the Dread from the Data',
        author: 'Wheelan, Charles',
        year: 2013,
        isbn: '9780393347777',
        description:
          'Covers sample size, central limit theorem, and common statistical misunderstandings in an engaging, accessible way',
        type: 'practical',
      },
    ],

    articles: [
      {
        title: 'How Not to Sort by Average Rating',
        author: 'Miller, Evan',
        url: 'https://www.evanmiller.org/how-not-to-sort-by-average-rating.html',
        description:
          'Practical guide to using Wilson score intervals for ranking items by rating while accounting for sample size',
        type: 'practical',
      },
      {
        title: 'Sample Sizes in Usability Studies',
        author: 'Nielsen, Jakob (Nielsen Norman Group)',
        url: 'https://www.nngroup.com/articles/how-many-test-users/',
        description:
          'Guidance on appropriate sample sizes for UX research and how small samples affect findings',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'The Law of Small Numbers',
        author: 'Kahneman, Daniel',
        url: 'https://www.youtube.com/watch?v=PHDr3k2F5F0',
        description:
          'Kahneman explaining why people fail to appreciate the role of sample size in statistical reasoning',
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
      'base-rate-neglect',     // Both involve ignoring statistical context
      'anchoring-bias',        // The first rating seen anchors expectations regardless of sample size
      'confirmation-bias',     // People accept small-sample results that confirm beliefs
      'overconfidence-bias',   // Small samples produce overconfident conclusions
    ],

    conflicts: [
      'information-bias',      // More data awareness can counteract sample size neglect
    ],

    confusedWith: [
      'base-rate-neglect',     // Both involve ignoring statistical context, but base-rate is about priors
      'availability-heuristic', // Vivid small-sample examples can be confused with availability
      'representativeness-heuristic', // Parent heuristic; sample size neglect is a specific manifestation
    ],

    hierarchy: {
      parent: 'representativeness-heuristic',
      children: [
        'regression-to-mean-neglect',
        'clustering-illusion',
      ],
    },
  },
};
