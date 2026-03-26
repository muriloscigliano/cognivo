/**
 * LAW OF SMALL NUMBERS
 *
 * We believe small samples are representative of the population,
 * drawing sweeping conclusions from insufficient data.
 */

import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const lawSmallNumbers: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'law-small-numbers',
    name: 'Law of Small Numbers',
    aliases: ['Hasty Generalization', 'Small Sample Fallacy', 'Insensitivity to Sample Size'],
    category: BiasCategory.COGNITIVE,
    relatedCategories: [
      BiasCategory.DECISION_MAKING,
      BiasCategory.PERCEPTION,
    ],
    tags: [
      'sample-size',
      'statistics',
      'data-interpretation',
      'ratings',
      'reviews',
      'decision-making',
      'generalization',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple: 'We believe small samples are representative of the population, drawing conclusions from insufficient data.',

    detailed: `The Law of Small Numbers is a cognitive bias where people expect small samples to mirror the properties of the larger population from which they are drawn. We intuitively believe that a handful of observations is enough to reveal a reliable pattern, when in reality small samples are highly variable and often misleading.

This bias leads people to overinterpret streaks, trust ratings based on very few reviews, draw conclusions from a single A/B test with low traffic, and treat preliminary survey results as definitive. The "law" is actually a fallacy: only large samples reliably approximate population characteristics.

In UX and product design, this bias is critical when displaying ratings, reviews, analytics, test results, or any data-driven insight. Designers must help users understand when data is insufficient and prevent premature conclusions that lead to bad decisions.`,

    psychologyBasis: {
      discoveredBy: 'Amos Tversky and Daniel Kahneman',
      year: 1971,
      theory: 'Belief in the Law of Small Numbers',
      mechanism: `People have a flawed intuition about statistical sampling. They believe small samples should be as representative as large ones. This happens because:

1. **Representativeness Heuristic**: People expect any sample, regardless of size, to closely resemble the population it was drawn from
2. **Pattern Detection Overdrive**: The brain is wired to detect patterns, even in random noise from small datasets
3. **Insensitivity to Sample Size**: People fail to appreciate that variability decreases as sample size increases
4. **Gambler's Fallacy Connection**: Expecting local sequences to self-correct, as if a small sample "should" be balanced
5. **Confidence Miscalibration**: People feel as confident about conclusions from 5 data points as from 5,000

The mechanism operates automatically -- people do not intuitively compute statistical power or confidence intervals.`,
    },

    realWorldExample: `Tversky and Kahneman (1971) showed that even trained researchers believed small samples should closely resemble the population. They asked scientists to estimate sample sizes needed for experiments, and the researchers consistently recommended samples far too small to detect the effects they were looking for. A restaurant with a 5-star rating from 3 reviews is treated as reliably excellent, while a 4.2-star rating from 1,200 reviews is seen as "not quite as good" -- despite the latter being far more trustworthy.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `The Law of Small Numbers affects how users interpret ratings, reviews, analytics data, test results, and any quantitative information displayed in interfaces. Designers must:

- Show sample sizes prominently alongside ratings and scores
- Indicate when data is insufficient to draw reliable conclusions
- Set minimum thresholds before displaying aggregate metrics
- Warn users when A/B test or survey results lack statistical significance
- Help users distinguish between reliable patterns and random noise`,

    whenToUse: [
      {
        title: 'Review Count Display',
        scenario:
          'When showing product or service ratings based on user reviews',
        example:
          'Display "4.8 (3 reviews)" with a note: "Not enough reviews for a reliable rating" versus "4.2 (1,247 reviews)" shown with full confidence',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'A/B Test Sample Warnings',
        scenario: 'When presenting experiment results to product teams',
        example:
          'Show confidence level and minimum sample size needed: "Results based on 47 visitors -- need 1,200+ for 95% confidence"',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Survey Result Interpretation',
        scenario: 'When displaying survey or poll results with low response counts',
        example:
          'Show "Based on 12 responses out of 500 invited (2.4% response rate) -- interpret with caution"',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Analytics Dashboard Caveats',
        scenario: 'When showing metrics derived from limited data',
        example:
          'Display a "low data" indicator on metrics computed from fewer than a statistically meaningful number of events',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'New Product Listings',
        scenario: 'When items have very few ratings or transactions',
        example:
          'Show "New listing -- not enough data to rate reliably" instead of displaying a potentially misleading average score',
        impact: ImpactLevel.MEDIUM,
      },
    ],

    whenToAvoid: [
      {
        title: 'Discouraging Early Engagement',
        reason:
          'Over-emphasizing data insufficiency can discourage users from engaging with new products or features',
        consequence:
          'New listings or features never gain traction because users avoid anything flagged as "insufficient data"',
        alternative:
          'Balance transparency about sample size with positive framing: "Be one of the first to review" or show individual reviews instead of an aggregate score',
      },
      {
        title: 'Overwhelming Users with Statistics',
        reason:
          'Showing confidence intervals and p-values to general consumers can confuse rather than help',
        consequence:
          'Users disengage from the product or lose trust due to perceived complexity',
        alternative:
          'Use simple visual indicators (progress bars, badges) to communicate data reliability without statistical jargon',
      },
      {
        title: 'Blocking Decisions Entirely',
        reason:
          'Requiring large sample sizes before showing any data can prevent users from acting when they need to',
        consequence:
          'Decision paralysis when users need directional guidance even from imperfect data',
        alternative:
          'Show available data with clear caveats rather than withholding it entirely',
      },
      {
        title: 'Low-Stakes Contexts',
        reason:
          'For trivial decisions (e.g., choosing a wallpaper), sample size warnings add unnecessary friction',
        consequence:
          'Users feel the interface is overly cautious and pedantic',
        alternative:
          'Reserve strong sample size warnings for high-stakes decisions (purchases, medical, financial)',
      },
    ],

    commonMistakes: [
      {
        title: 'Displaying Ratings Without Review Counts',
        description:
          'Showing a star rating (e.g., 5.0 stars) without indicating how many reviews it is based on',
        why: 'A 5.0 from 2 reviews is far less reliable than a 4.3 from 2,000 reviews, but users treat both as definitive',
        fix: 'Always show review count alongside the rating. Use visual weight or badges to indicate data maturity',
      },
      {
        title: 'Declaring A/B Test Winners Too Early',
        description:
          'Ending experiments and shipping changes after a few hundred visitors show a positive trend',
        why: 'Small samples produce extreme results that regress to the mean with more data',
        fix: 'Display required sample size, current confidence level, and prevent early stopping without statistical significance',
      },
      {
        title: 'Treating Early Trends as Patterns',
        description:
          'Showing "trending up 200%!" based on going from 1 event to 3 events',
        why: 'Percentage changes from tiny baselines are meaningless but look dramatic',
        fix: 'Set minimum thresholds for trend calculations. Show absolute numbers alongside percentages',
      },
      {
        title: 'Sorting by Rating Without Sample Size Weighting',
        description:
          'Ranking items by average rating alone, causing items with 1-2 perfect reviews to outrank well-reviewed items',
        why: 'Pure average sorting rewards low-sample items with lucky high ratings',
        fix: 'Use Bayesian averaging or Wilson score intervals that account for sample size in ranking algorithms',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.HIGH,
        description:
          'Layout determines how prominently sample size information is displayed alongside metrics',
        examples: [
          'Review count placed directly next to star rating, not hidden below the fold',
          'Confidence indicators integrated into dashboard metric cards',
          'Data maturity badges visible at the same hierarchy level as the metric itself',
          'Minimum sample warnings placed inline, not in tooltips users might miss',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Text sizing and weight signal whether data is reliable or preliminary',
        examples: [
          'Full-size, bold ratings for well-sampled data; lighter, smaller text for low-sample data',
          'Italic or muted text for preliminary results',
          'Clear labeling: "Based on 3 reviews" in readable font size, not tiny footnotes',
          'Typography hierarchy that puts sample size at the same reading level as the rating',
        ],
      },
      color: {
        level: ImpactLevel.HIGH,
        description:
          'Color signals data confidence and reliability',
        examples: [
          'Muted or desaturated rating stars when review count is below threshold',
          'Amber/yellow indicators for low-confidence data vs green for high-confidence',
          'Gray or outline-only badges for preliminary metrics',
          'Color-coded confidence bands in charts (wider = less certain)',
        ],
      },
      interaction: {
        level: ImpactLevel.HIGH,
        description:
          'Interactive elements can reveal sample size context on demand',
        examples: [
          'Hover/tap on a rating to see review count distribution and confidence level',
          'Expandable section showing "Why this rating may not be reliable yet"',
          'Filter controls that let users set minimum review thresholds',
          'Progressive disclosure of statistical details for power users',
        ],
      },
      content: {
        level: ImpactLevel.CRITICAL,
        description:
          'Content framing determines whether users correctly interpret data reliability',
        examples: [
          '"Not enough reviews yet" messaging for low-sample items',
          'Contextual explanations: "Ratings become reliable after 30+ reviews"',
          'Comparison framing: showing how the rating might change with more data',
          'Educational microcopy explaining why sample size matters for this decision',
        ],
      },
      accessibility: {
        level: ImpactLevel.HIGH,
        description:
          'Screen readers and assistive technology must convey sample size context',
        examples: [
          'ARIA labels include review count: "4.8 stars based on 3 reviews"',
          'Screen reader text conveys confidence level, not just the rating number',
          'Color-coded confidence has text alternatives',
          'Keyboard-accessible tooltips reveal sample size details',
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
        title: 'Sample Size Alongside Ratings',
        description:
          'Product listing showing rating with review count and confidence indicator',
        code: `<div class="product-rating">
  <div class="rating-primary">
    <span class="stars" aria-label="4.8 out of 5 stars">★★★★★</span>
    <span class="score">4.8</span>
    <span class="review-count">(3 reviews)</span>
    <span class="confidence-badge low" aria-label="Low confidence rating">
      Low data
    </span>
  </div>
  <p class="rating-caveat">
    This rating may change significantly as more reviews come in.
    Ratings stabilize after 30+ reviews.
  </p>
</div>

<div class="product-rating">
  <div class="rating-primary">
    <span class="stars" aria-label="4.2 out of 5 stars">★★★★☆</span>
    <span class="score">4.2</span>
    <span class="review-count">(1,247 reviews)</span>
    <span class="confidence-badge high" aria-label="High confidence rating">
      Reliable
    </span>
  </div>
</div>`,
        explanation:
          'By showing review count and a confidence badge, users can correctly weigh how trustworthy each rating is. The caveat text educates users about why sample size matters.',
        principle:
          'Always pair aggregate metrics with their sample size to prevent false confidence from small samples',
        metrics: {
          before: '68% of users chose the 4.8-rated item with 3 reviews over the 4.2-rated item with 1,247 reviews',
          after: '23% chose the low-review item after confidence indicators were added',
          improvement: '66% reduction in users making choices based on unreliable small-sample ratings',
        },
      },
      {
        title: 'Minimum Review Threshold',
        description:
          'Marketplace that requires minimum reviews before showing aggregate ratings',
        code: `<div class="listing-card new-listing">
  <h3>Artisan Coffee Beans</h3>
  <div class="rating-placeholder">
    <span class="stars empty" aria-label="Not yet rated">☆☆☆☆☆</span>
    <span class="status">New -- not enough reviews to rate</span>
    <a href="#reviews" class="cta">Be the first to review</a>
  </div>
  <p class="policy">
    Aggregate ratings appear after 10+ verified reviews.
  </p>
</div>

<div class="listing-card established">
  <h3>Organic Tea Collection</h3>
  <div class="rating-display">
    <span class="stars" aria-label="4.5 out of 5 stars">★★★★½</span>
    <span class="score">4.5</span>
    <span class="review-count">(87 reviews)</span>
  </div>
</div>`,
        explanation:
          'By withholding aggregate ratings until a meaningful threshold is reached, the platform prevents users from over-trusting scores based on 1-2 reviews. New listings invite engagement instead.',
        principle:
          'Set minimum sample size thresholds before presenting aggregate metrics as reliable',
      },
      {
        title: 'A/B Test Confidence Display',
        description:
          'Experimentation dashboard showing statistical confidence alongside results',
        code: `<div class="experiment-results">
  <h3>Experiment: New Checkout Flow</h3>

  <div class="result-card warning">
    <div class="metric">
      <span class="label">Conversion lift</span>
      <span class="value">+12.4%</span>
    </div>
    <div class="confidence">
      <div class="confidence-bar" style="width: 72%">
        <span>72% confidence</span>
      </div>
      <span class="target">Target: 95%</span>
    </div>
    <div class="sample-info">
      <p>Based on 340 visitors (need ~1,200 for significance)</p>
      <progress value="340" max="1200">28% of required sample</progress>
    </div>
    <div class="warning-message">
      <strong>Do not ship yet.</strong> Results are likely to change
      substantially as more data is collected. Current sample is too
      small for reliable conclusions.
    </div>
  </div>
</div>`,
        explanation:
          'The dashboard prevents premature decisions by clearly showing that 340 visitors is insufficient. The progress bar toward required sample size and explicit "do not ship" warning guard against the law of small numbers.',
        principle:
          'Make statistical confidence and required sample size as prominent as the result itself',
        metrics: {
          before: '41% of teams shipped experiments before reaching significance',
          after: '8% shipped early after confidence displays were added',
          improvement: '80% reduction in premature experiment decisions',
        },
      },
    ],

    bad: [
      {
        title: 'Rating Without Context',
        description:
          'Product page showing a perfect rating with no indication of sample size',
        code: `<!-- DON'T DO THIS -->
<div class="product-rating">
  <span class="stars">★★★★★</span>
  <span class="score">5.0</span>
  <span class="label">Perfect rating!</span>
</div>
<!-- No review count shown. Could be 1 review or 10,000. -->`,
        explanation:
          'Without showing review count, a 5.0 from a single review is indistinguishable from a 5.0 from thousands. Users assume the rating is reliable, but one reviewer could have been the seller\'s friend.',
        principle:
          'Never display aggregate ratings without their sample size -- it enables the law of small numbers',
      },
      {
        title: 'Sorting Purely by Average Rating',
        description:
          'Search results ranked by average score without accounting for review volume',
        code: `<!-- DON'T DO THIS -->
<ol class="search-results">
  <li>
    <span class="name">Joe's Plumbing</span>
    <span class="rating">★★★★★ 5.0</span>
    <!-- 1 review from Joe's mom -->
  </li>
  <li>
    <span class="name">Reliable Plumbing Co.</span>
    <span class="rating">★★★★☆ 4.6</span>
    <!-- 890 verified reviews -->
  </li>
  <li>
    <span class="name">City Plumbers</span>
    <span class="rating">★★★★☆ 4.5</span>
    <!-- 2,341 verified reviews -->
  </li>
</ol>`,
        explanation:
          'Sorting by pure average lets businesses with one or two favorable reviews outrank established businesses with hundreds of genuine reviews. This exploits the law of small numbers.',
        principle:
          'Ranking algorithms must weight sample size, not just average score',
      },
      {
        title: 'Celebrating Premature A/B Test Results',
        description:
          'Dashboard declaring a winner from insufficient data',
        code: `<!-- DON'T DO THIS -->
<div class="experiment-result winner">
  <h3>Winner: Variant B!</h3>
  <p>Conversion rate: 18.2% vs 12.1%</p>
  <p class="improvement">+50% improvement!</p>
  <button class="primary">Ship to 100% of Users</button>
  <!-- Based on only 38 conversions total -->
</div>`,
        explanation:
          'With only 38 total conversions, the difference could easily be random chance. The interface encourages shipping based on noise, not signal. No confidence interval, no sample size, no warning.',
        principle:
          'Never declare experiment winners without sufficient sample size and statistical significance',
      },
    ],

    realWorld: [
      {
        company: 'Yelp',
        product: 'Review Platform',
        url: 'https://www.yelp.com',
        description:
          'Yelp does not display a star rating until a business has received multiple reviews, and shows review count prominently. Their recommendation algorithm filters suspicious reviews and weights established reviewers more heavily.',
        effectiveness: 'very-effective',
        analysis:
          'By requiring a minimum number of reviews and showing count prominently, Yelp helps users calibrate trust. Their algorithm uses Bayesian techniques to avoid small-sample distortions in rankings.',
      },
      {
        company: 'Amazon',
        product: 'Product Ratings',
        url: 'https://www.amazon.com',
        description:
          'Amazon displays review count alongside star ratings and uses a weighted rating system that accounts for review volume, recency, and verified purchase status. Products with few reviews show "Not enough ratings" instead of a score.',
        effectiveness: 'very-effective',
        analysis:
          'Amazon\'s approach combats the law of small numbers by making review count as prominent as the star rating itself. Their "Amazon\'s Choice" and ranking algorithms factor in statistical reliability, not just raw averages.',
      },
      {
        company: 'Google',
        product: 'Google Maps Ratings',
        url: 'https://maps.google.com',
        description:
          'Google Maps shows both the star rating and review count for every business. Businesses with very few reviews are deprioritized in search rankings, and Google surfaces review count in search results.',
        effectiveness: 'effective',
        analysis:
          'By showing "(4.9) 7 reviews" versus "(4.3) 2,847 reviews" side by side, Google helps users intuitively grasp that more reviews means more reliable data. However, many users still choose higher-rated low-review options.',
      },
      {
        company: 'Optimizely',
        product: 'Experimentation Platform',
        url: 'https://www.optimizely.com',
        description:
          'Optimizely displays statistical significance alongside experiment results, requires minimum sample sizes before declaring winners, and shows confidence intervals. The platform prevents teams from stopping experiments prematurely.',
        effectiveness: 'very-effective',
        analysis:
          'By making statistical power and confidence levels first-class UI elements, Optimizely directly combats the law of small numbers in product experimentation. Teams cannot ship results without reaching predetermined significance thresholds.',
      },
    ],

    abTests: [
      {
        title: 'Review Count Visibility: Prominent vs Hidden',
        hypothesis:
          'Making review count more prominent will improve user decision quality',
        controlVersion: {
          description:
            'Product listing showing star rating with review count in small gray text below',
          metrics: {
            conversionRate: '5.1%',
            timeOnPage: '1:45',
            scrollDepth: '52%',
          },
        },
        treatmentVersion: {
          description:
            'Product listing showing star rating with review count in same-size text inline, plus a "data confidence" badge (Low/Medium/High)',
          metrics: {
            conversionRate: '4.8%',
            timeOnPage: '2:32',
            scrollDepth: '71%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'While raw conversion dipped slightly, return rate dropped 34% and customer satisfaction increased 22%. Users spent more time evaluating but made better choices. Products with high review counts saw 28% higher conversion, while low-review products saw reduced impulse purchases.',
          learnings: [
            'Prominent review counts shift purchases toward better-reviewed items',
            'Confidence badges help users self-calibrate data reliability',
            'Short-term conversion may dip, but long-term satisfaction improves',
            'Power users especially valued the transparency of sample size information',
          ],
        },
      },
      {
        title: 'Minimum Rating Threshold: Show All vs Require Minimum Reviews',
        hypothesis:
          'Requiring a minimum number of reviews before showing aggregate ratings will improve marketplace trust',
        controlVersion: {
          description:
            'All products show star ratings regardless of review count (even 1 review)',
          metrics: {
            conversionRate: '6.2%',
            returnRate: '14.1%',
            customerSatisfaction: '3.6/5',
          },
        },
        treatmentVersion: {
          description:
            'Products with fewer than 10 reviews show "New -- be one of the first to review" instead of a star rating',
          metrics: {
            conversionRate: '5.7%',
            returnRate: '8.9%',
            customerSatisfaction: '4.2/5',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Although conversion dipped by 8%, return rate dropped 37% and customer satisfaction increased by 17%. Users made more informed purchases. New products still received engagement through the "be the first" call to action.',
          learnings: [
            'Withholding unreliable ratings reduces buyer remorse and returns',
            'Users appreciate transparency even when it slows decision-making',
            '"Be the first to review" maintains engagement with new products',
            'Net revenue impact was positive due to fewer returns and higher lifetime value',
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
        name: 'Missing Review Counts',
        description:
          'Star ratings displayed without showing how many reviews they are based on',
        howToSpot:
          'Look for star ratings or score numbers that lack a "(N reviews)" indicator nearby',
        severity: ImpactLevel.CRITICAL,
      },
      {
        name: 'Prominent Small-Sample Metrics',
        description:
          'Dashboard metrics, KPIs, or trend lines derived from very few data points displayed with full visual confidence',
        howToSpot:
          'Check data sources -- are percentages, trends, or averages computed from fewer than 30 data points?',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Ranking by Pure Average',
        description:
          'Search results or leaderboards sorted by average score without factoring in sample size',
        howToSpot:
          'Look for items with very few reviews appearing above items with many reviews in sorted lists',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'No Confidence Indicators',
        description:
          'Experiment results, survey data, or analytics shown without confidence levels or significance markers',
        howToSpot:
          'Check if A/B test results, survey summaries, or analytics show only the metric without sample size or confidence',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Dramatic Percentages from Small Baselines',
        description:
          'Large percentage changes highlighted when absolute numbers are tiny (e.g., "+200%" when going from 1 to 3)',
        howToSpot:
          'Look for impressive percentage changes -- then check the absolute numbers behind them',
        severity: ImpactLevel.MEDIUM,
      },
    ],

    patterns: [
      {
        name: 'Unweighted Rating Display',
        description: 'Aggregate ratings shown without sample size context or confidence weighting',
        indicators: [
          'Star ratings without review count',
          'Scores displayed identically regardless of data volume',
          'No visual distinction between well-sampled and poorly-sampled metrics',
        ],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Premature Conclusion Pattern',
        description: 'Results or insights presented as definitive when sample size is insufficient',
        indicators: [
          'A/B test "winners" declared without significance thresholds',
          'Trend arrows on metrics with only a few data points',
          '"Best performing" labels on items with minimal data',
          'Survey results treated as conclusive with low response rates',
        ],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Small-Baseline Amplification',
        description: 'Percentage changes computed from tiny baselines, making random variation look dramatic',
        indicators: [
          'Large percentage changes (100%+) from single-digit baselines',
          'Trend charts that start from near-zero',
          'Growth metrics from early-stage products with minimal users',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Anecdote-as-Data Pattern',
        description: 'Individual user stories or single data points treated as representative of the whole',
        indicators: [
          'Single customer quote used as evidence of product quality',
          'One support ticket driving product decisions',
          'Individual user session treated as typical behavior',
        ],
        severity: ImpactLevel.MEDIUM,
        confidence: 'medium',
      },
    ],

    checklistQuestions: [
      'Are ratings and scores shown with their sample sizes?',
      'Is there a minimum data threshold before displaying aggregate metrics?',
      'Do ranking algorithms account for sample size, not just averages?',
      'Are A/B test results gated behind statistical significance checks?',
      'Do percentage changes show absolute numbers alongside them?',
      'Are trend indicators suppressed when data points are too few?',
      'Do dashboards visually distinguish between high-confidence and low-confidence metrics?',
      'Are survey results presented with response rate and sample size context?',
      'Can users filter or sort by review count or data maturity?',
      'Are there safeguards against making decisions from insufficient data?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in the law of small numbers (insensitivity to sample size).

Analyze the provided design for law of small numbers vulnerabilities. Identify:

1. **Ratings Without Context**: Star ratings, scores, or averages shown without sample size
2. **Premature Conclusions**: Results, trends, or insights drawn from insufficient data
3. **Ranking Distortions**: Sorting or ranking that favors small-sample items
4. **Missing Confidence**: Experiment or survey results without significance indicators
5. **Percentage Inflation**: Dramatic percentages computed from tiny absolute numbers

For each vulnerability found:
- Identify how users might over-trust small-sample data
- Assess the risk of poor decisions resulting from insufficient data
- Determine what minimum sample size would be appropriate
- Suggest specific UI changes to communicate data reliability
- Evaluate whether the design helps or hinders informed decision-making

Consider:
- Do users know how much data underlies each metric?
- Can users distinguish between reliable and unreliable data?
- Are there safeguards against premature decisions?
- Is the ranking or sorting algorithm sample-size-aware?
- Do screen readers and assistive technologies convey sample size context?

Provide actionable recommendations for transparent, sample-size-aware data presentation.`,

    outputSchema: {
      type: 'object',
      properties: {
        smallSampleVulnerabilities: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              currentSampleSize: { type: 'string' },
              minimumRecommended: { type: 'string' },
              riskLevel: { type: 'string' },
              userImpact: { type: 'string' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'riskLevel',
              'recommendation',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            sampleSizeTransparency: { type: 'number' },
            confidenceDisplay: { type: 'number' },
            rankingFairness: { type: 'number' },
            decisionSafeguards: { type: 'number' },
          },
          required: [
            'sampleSizeTransparency',
            'confidenceDisplay',
            'rankingFairness',
            'decisionSafeguards',
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
        'smallSampleVulnerabilities',
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
        title: 'Audit All Displayed Metrics for Sample Size',
        description:
          'Identify every rating, score, percentage, or trend in your interface and determine its underlying sample size',
        example:
          'Map: product ratings (review count), dashboard KPIs (event count), A/B results (visitor count), survey data (response count)',
        tips: [
          'Create a spreadsheet of every metric and its data source',
          'Identify which metrics are most vulnerable to small-sample distortion',
          'Prioritize high-stakes metrics (purchase decisions, experiment shipping)',
        ],
      },
      {
        step: 2,
        title: 'Define Minimum Sample Thresholds',
        description:
          'Set minimum data requirements before displaying aggregate metrics with full confidence',
        example:
          'Ratings: require 10+ reviews. A/B tests: require 95% confidence. Trends: require 30+ data points.',
        tips: [
          'Consult statistical guidelines for your domain',
          'Different metrics may need different thresholds',
          'Document thresholds and their rationale for the team',
        ],
      },
      {
        step: 3,
        title: 'Design Confidence Indicators',
        description:
          'Create visual indicators that communicate data reliability at a glance',
        example:
          'Use badges (Low/Medium/High confidence), progress bars toward required sample, or muted styling for preliminary data',
        tips: [
          'Keep it simple -- avoid statistical jargon for consumer audiences',
          'Use color, opacity, or badges rather than numbers for general users',
          'Provide detailed statistics on hover/tap for power users',
        ],
      },
      {
        step: 4,
        title: 'Update Ranking Algorithms',
        description:
          'Modify sorting and ranking to account for sample size, not just raw averages',
        example:
          'Implement Wilson score confidence interval or Bayesian averaging for product rankings',
        tips: [
          'Wilson score works well for binary (thumbs up/down) ratings',
          'Bayesian averaging works well for star ratings',
          'Test ranking changes with real users to validate improvements',
        ],
      },
      {
        step: 5,
        title: 'Add Decision Safeguards',
        description:
          'Build guardrails that prevent users and teams from acting on insufficient data',
        example:
          'Disable "Ship to all users" button until experiment reaches significance. Show "Not enough data" for low-review items.',
        tips: [
          'Make safeguards firm for high-stakes decisions (experiments, purchases)',
          'Use softer warnings for lower-stakes contexts',
          'Allow override with explicit acknowledgment for edge cases',
        ],
      },
    ],

    dos: [
      'Always show sample size alongside aggregate ratings and scores',
      'Set minimum thresholds before displaying aggregate metrics',
      'Use Bayesian averaging or Wilson scores for ranking algorithms',
      'Show confidence levels alongside A/B test and survey results',
      'Display absolute numbers alongside percentages',
      'Visually distinguish between high-confidence and low-confidence data',
      'Provide educational context about why sample size matters',
      'Make review count as prominent as the rating itself',
      'Gate experiment decisions behind statistical significance checks',
      'Design "not enough data yet" states as first-class UI patterns',
    ],

    donts: [
      'Don\'t display ratings without review counts',
      'Don\'t sort or rank by raw average without weighting for sample size',
      'Don\'t declare A/B test winners before reaching statistical significance',
      'Don\'t show dramatic percentage changes from tiny baselines without context',
      'Don\'t treat a single user story as representative of all users',
      'Don\'t hide sample size in tooltips or footnotes',
      'Don\'t use the same visual treatment for low-data and high-data metrics',
      'Don\'t allow teams to ship experiments that haven\'t reached significance',
      'Don\'t compute trend lines from fewer than a meaningful number of data points',
      'Don\'t present survey results without response rate context',
    ],

    bestPractices: [
      {
        title: 'Show Review Count at Equal Prominence',
        description:
          'Display the number of reviews at the same visual hierarchy level as the star rating',
        rationale:
          'When review count is de-emphasized, users ignore it and trust the rating regardless of sample size',
        example:
          '"4.8 ★ (3 reviews)" vs "4.2 ★ (1,247 reviews)" -- both numbers equally readable',
      },
      {
        title: 'Use Bayesian Averaging for Rankings',
        description:
          'Weight ratings by sample size using Bayesian methods rather than raw averages',
        rationale:
          'Prevents items with 1-2 lucky reviews from outranking well-established items',
        example:
          'A product with 5.0 from 2 reviews ranks below a product with 4.6 from 500 reviews',
      },
      {
        title: 'Design "Not Enough Data" States',
        description:
          'Create explicit UI states for when data is insufficient to draw conclusions',
        rationale:
          'Absence of a "no data" state implies all displayed data is equally trustworthy',
        example:
          'Show empty stars with "New listing -- reviews coming soon" instead of showing a rating from 1 review',
      },
      {
        title: 'Gate Experiments Behind Significance',
        description:
          'Require statistical significance before allowing experiment results to be acted upon',
        rationale:
          'Teams naturally want to ship positive results quickly, even when sample size is insufficient',
        example:
          'Disable the "Ship" button with message: "Need 800 more visitors for 95% confidence"',
      },
      {
        title: 'Show Absolute Numbers with Percentages',
        description:
          'Always display absolute counts alongside percentage changes, especially for small baselines',
        rationale:
          'A "+200% increase" sounds impressive but could mean going from 1 to 3',
        example:
          '"Sign-ups increased 200% (from 1 to 3)" vs simply "+200% growth!"',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships - Ensure sample size information is programmatically associated with its metric',
        implementation:
          'Use ARIA labels that include both the rating and review count: aria-label="4.8 out of 5 stars, based on 3 reviews, low confidence"',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.4.1',
        guideline:
          'Use of Color - Don\'t rely only on color to indicate data confidence',
        implementation:
          'Combine color-coded confidence indicators with text labels (e.g., "Low data" badge alongside muted colors) so color-blind users also understand reliability',
      },
      {
        wcagLevel: 'AA',
        criterion: '4.1.2',
        guideline:
          'Name, Role, Value - Ensure confidence indicators have accessible names',
        implementation:
          'Confidence badges, progress bars, and data maturity indicators must have descriptive ARIA labels that screen readers can announce',
      },
    ],

    ethics: [
      {
        concern: 'Displaying Unreliable Ratings as Trustworthy',
        severity: 'critical',
        explanation:
          'Showing a 5-star rating based on 1 review with the same visual treatment as one based on 1,000 reviews misleads users into trusting unreliable data',
        mitigation:
          'Always show review count. Use confidence indicators. Set minimum thresholds before displaying aggregate ratings.',
      },
      {
        concern: 'Manipulating Rankings with Fake Reviews',
        severity: 'critical',
        explanation:
          'When rankings use pure averages, it only takes a few fake reviews to catapult a product to the top',
        mitigation:
          'Use sample-size-weighted ranking algorithms. Require verified purchases. Implement review fraud detection.',
      },
      {
        concern: 'Shipping Untested Changes',
        severity: 'high',
        explanation:
          'Declaring A/B test winners from insufficient data leads to shipping changes that may harm the user experience',
        mitigation:
          'Enforce minimum sample sizes and significance thresholds in experimentation tools. Educate teams about statistical power.',
      },
      {
        concern: 'Misleading Percentage Claims',
        severity: 'high',
        explanation:
          'Using dramatic percentages from small baselines in marketing or reporting creates false impressions of growth or impact',
        mitigation:
          'Always show absolute numbers alongside percentages. Flag when baselines are below a meaningful threshold.',
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
          'The foundational paper identifying the tendency to believe small samples are representative of the population',
        type: 'foundational',
      },
      {
        title: 'Judgment under Uncertainty: Heuristics and Biases',
        author: 'Tversky, A., & Kahneman, D.',
        year: 1974,
        doi: '10.1126/science.185.4157.1124',
        description:
          'Broader paper covering the representativeness heuristic and insensitivity to sample size',
        type: 'foundational',
      },
      {
        title: 'Sample Size and the Accuracy of Predictions Made from Multiple Regression',
        author: 'Schmidt, F. L.',
        year: 1971,
        description:
          'Demonstrates how small samples lead to overfitting and unreliable predictions',
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
          'Chapter 10 "The Law of Small Numbers" provides an accessible deep dive into this bias by its co-discoverer',
        type: 'foundational',
      },
      {
        title: 'The Art of Statistics: Learning from Data',
        author: 'Spiegelhalter, David',
        year: 2019,
        isbn: '9781541618510',
        description:
          'Practical guide to understanding sample size, variability, and statistical thinking for non-statisticians',
        type: 'practical',
      },
      {
        title: 'Naked Statistics: Stripping the Dread from the Data',
        author: 'Wheelan, Charles',
        year: 2013,
        isbn: '9780393347777',
        description:
          'Engaging explanation of why small samples mislead and how to think about data correctly',
        type: 'practical',
      },
    ],

    articles: [
      {
        title: 'How Not to Be Misled by the Rule of Small Numbers',
        author: 'Nielsen Norman Group',
        url: 'https://www.nngroup.com/articles/law-of-small-numbers/',
        description:
          'Practical guide to avoiding small-sample fallacies in UX research and data-driven design',
        type: 'practical',
      },
      {
        title: 'The Problem with Small Sample Sizes in A/B Testing',
        author: 'Optimizely Blog',
        url: 'https://www.optimizely.com/optimization-glossary/sample-size/',
        description:
          'Detailed explanation of sample size requirements for valid A/B test results',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'The Law of Small Numbers',
        author: 'Veritasium',
        url: 'https://www.youtube.com/watch?v=bDQHKQ8s7Gw',
        description:
          'Visual explanation of why small samples produce extreme and misleading results',
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
      'base-rate-neglect', // Both involve misunderstanding statistical evidence
      'confirmation-bias', // Small samples are easily cherry-picked to confirm beliefs
      'clustering-illusion', // Seeing patterns in random small-sample data
      'overconfidence-bias', // Excessive confidence in conclusions from little data
    ],

    conflicts: [
      'information-bias', // Desire for more information counteracts small-sample reliance
      'ambiguity-aversion', // Discomfort with uncertainty may drive demand for more data
    ],

    confusedWith: [
      'gambler-fallacy', // Related but distinct: expecting sequences to self-correct
      'availability-heuristic', // Both affect judgment, but through different mechanisms
      'representativeness-heuristic', // Parent heuristic that drives the law of small numbers
    ],

    hierarchy: {
      parent: 'representativeness-heuristic',
      children: [
        'gambler-fallacy',
        'clustering-illusion',
      ],
    },
  },
};
