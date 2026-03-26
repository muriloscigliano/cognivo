/**
 * CLUSTERING ILLUSION (STATISTICAL VARIANT)
 *
 * The tendency to misinterpret random clusters in statistical data
 * as meaningful patterns, expecting random data to look more uniform
 * than it actually does.
 */

import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const clusteringIllusionStats: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'clustering-illusion-stats',
    name: 'Clustering Illusion (Statistical)',
    aliases: [
      'Hot Hand Fallacy',
      'Streak Shooting Fallacy',
      'Law of Small Numbers',
      'Pattern-in-Noise Bias',
    ],
    category: BiasCategory.COGNITIVE,
    relatedCategories: [
      BiasCategory.DECISION_MAKING,
      BiasCategory.PERCEPTION,
    ],
    tags: [
      'statistics',
      'data-visualization',
      'randomness',
      'pattern-recognition',
      'analytics',
      'charts',
      'significance-testing',
      'a-b-testing',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple:
      'People see meaningful patterns in random statistical data and expect randomness to look more uniform than it actually does.',

    detailed: `The Clustering Illusion (Statistical variant) is the cognitive bias that leads people to perceive meaningful patterns in random or noisy data sets. Humans are pattern-detection machines, and this tendency misfires when applied to genuinely random distributions: we see streaks, clusters, and trends where none exist.

This bias is closely related to the "law of small numbers" — the mistaken belief that small samples should mirror the properties of the larger population. People expect random data to alternate more frequently and look more evenly spread than true randomness actually produces. Real random sequences contain far more clusters and streaks than our intuition predicts.

In data visualization and analytics dashboards, this bias is especially dangerous. Users interpret random fluctuations in charts as meaningful trends, see clusters in scatter plots that are purely coincidental, and draw causal conclusions from noise. Designers must build statistical safeguards — confidence intervals, significance indicators, baseline references, and sample size warnings — directly into their visualizations to counteract this deeply ingrained cognitive tendency.`,

    psychologyBasis: {
      discoveredBy: 'Thomas Gilovich, Robert Vallone, and Amos Tversky',
      year: 1985,
      theory: 'Representativeness Heuristic / Law of Small Numbers',
      mechanism: `The brain's pattern-recognition system evolved for survival, not statistical accuracy. When applied to data, it misfires systematically:

1. **Representativeness**: We expect every segment of a random sequence to "look random," but true randomness contains long runs and dense clusters that feel non-random
2. **Underestimation of Variance**: We drastically underestimate how much variation is normal in random data and small samples
3. **Apophenia**: The neurological tendency to perceive connections between unrelated data points — the brain actively constructs patterns from noise
4. **Confirmation Bias Amplification**: Once we spot an apparent cluster, we selectively attend to data confirming the pattern and ignore disconfirming evidence
5. **Narrative Construction**: The brain compulsively generates causal stories to explain observed clusters ("the market is trending up"), even when the data is random noise`,
    },

    realWorldExample: `In the famous 1985 "hot hand" study, Gilovich, Vallone, and Tversky analyzed every shot taken by the Philadelphia 76ers over a season. Fans and players were convinced that shooters had "hot streaks" — that making a shot increased the probability of making the next one. The actual data showed shooting percentages were consistent with a random (coin-flip-like) process. The clusters of made shots that people perceived as "hot hands" were exactly what you would expect from pure chance. The same illusion drives investors to see trends in random stock price movements and A/B testers to call experiments early when they spot apparent differences in noisy data.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `The Clustering Illusion profoundly affects how users interpret data visualizations, analytics dashboards, and statistical outputs. Designers must actively counteract this bias to prevent false conclusions:

- Add confidence intervals and error bands to charts so users see the noise alongside the signal
- Display statistical significance indicators so users know when patterns are real vs. random
- Show randomness baselines and expected variation ranges on scatter plots and time series
- Include sample size context so users understand when data is too sparse for conclusions
- Design progressive disclosure of statistical detail, from summary to full significance testing`,

    whenToUse: [
      {
        title: 'Analytics Dashboards',
        scenario:
          'When displaying time-series metrics, conversion rates, or KPIs that fluctuate naturally',
        example:
          'Show confidence bands around a conversion rate trendline, with a note: "Daily variation of +/-15% is normal for this sample size"',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'A/B Test Result Displays',
        scenario:
          'When showing experiment results that may not yet be statistically significant',
        example:
          'Display a significance meter alongside the conversion difference: "78% confident — need 3 more days of data to reach 95% significance"',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Scatter Plot Interpretation',
        scenario:
          'When users might perceive clusters in randomly distributed data points',
        example:
          'Overlay a randomness baseline (e.g., a uniform distribution reference) so users can compare observed clusters against expected random variation',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Financial / Market Charts',
        scenario:
          'When displaying stock prices, revenue trends, or financial metrics with natural volatility',
        example:
          'Add a moving average band with standard deviation channels so users distinguish signal from noise',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Anomaly Detection Displays',
        scenario:
          'When highlighting outliers or anomalies in data that may be random fluctuations',
        example:
          'Only flag data points that exceed 2 standard deviations, and label borderline cases as "possibly random variation"',
        impact: ImpactLevel.MEDIUM,
      },
    ],

    whenToAvoid: [
      {
        title: 'Genuine Pattern Communication',
        reason:
          'Adding too many statistical caveats can undermine communication of real, significant patterns',
        consequence:
          'Users may ignore genuinely important trends or dismiss real anomalies as noise',
        alternative:
          'Use progressive disclosure: lead with the clear finding, then offer statistical detail on demand',
      },
      {
        title: 'Non-Technical Audiences',
        reason:
          'Heavy statistical overlays (p-values, confidence intervals) can confuse users without statistical training',
        consequence:
          'Users disengage from the data entirely or misinterpret statistical annotations',
        alternative:
          'Use plain-language summaries ("This difference is likely real" vs. "p < 0.05") with optional detail expansion',
      },
      {
        title: 'Real-Time Monitoring',
        reason:
          'Statistical safeguards can add latency or complexity to real-time alerting systems',
        consequence:
          'Delayed response to genuine incidents while waiting for statistical confirmation',
        alternative:
          'Use tiered alerting: immediate alert for extreme values, statistical confirmation for borderline cases',
      },
      {
        title: 'Exploratory Data Analysis',
        reason:
          'Over-constraining exploration with significance testing can prevent hypothesis generation',
        consequence:
          'Users miss potentially interesting patterns worth investigating further',
        alternative:
          'Label exploratory views clearly as "hypothesis-generating" and reserve significance testing for confirmatory analysis',
      },
    ],

    commonMistakes: [
      {
        title: 'Charts Without Confidence Intervals',
        description:
          'Displaying line charts or bar charts of noisy data without any indication of uncertainty or expected variation',
        why: 'Users interpret every uptick and downtick as meaningful, leading to false trend identification and premature action',
        fix: 'Add shaded confidence bands, error bars, or annotation of expected random variation range to every chart showing sampled or noisy data',
      },
      {
        title: 'Calling A/B Tests Early',
        description:
          'Allowing users to view and act on A/B test results before reaching statistical significance',
        why: 'Early results are dominated by random variation; apparent winners frequently reverse with more data',
        fix: 'Lock result interpretation behind a significance threshold. Show a progress bar toward significance rather than raw conversion differences',
      },
      {
        title: 'Uncontextualized Scatter Plots',
        description:
          'Displaying scatter plots without reference distributions or density indicators',
        why: 'Users perceive clusters in randomly distributed points and draw false correlations',
        fix: 'Overlay expected density contours for random data, add correlation coefficients with significance levels, and include sample size context',
      },
      {
        title: 'Missing Sample Size Context',
        description:
          'Showing percentages or rates without revealing the underlying sample size',
        why: 'A "100% conversion rate" from 2 visitors looks identical to one from 2,000 visitors, but the former is meaningless noise',
        fix: 'Always display sample size alongside rates. Use visual encoding (opacity, size) to indicate statistical reliability',
      },
      {
        title: 'Encouraging Time-Series Zooming Without Baselines',
        description:
          'Allowing users to zoom into short time windows of noisy data without reference to longer-term baselines',
        why: 'Zooming amplifies random fluctuations, making noise look like dramatic trends',
        fix: 'Always show the broader context when zoomed in: include a minimap, baseline reference line, or "typical range" band',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.HIGH,
        description:
          'Layout determines how much context surrounds data points and whether users can compare patterns against baselines',
        examples: [
          'Side-by-side layouts comparing observed data with random baselines help users calibrate expectations',
          'Dashboard layouts that isolate individual metrics without context encourage false pattern detection',
          'Small multiples layouts allow comparison across conditions, revealing when clusters are consistent vs. random',
          'Placing sample size and significance information adjacent to charts (not hidden in tooltips) reduces misinterpretation',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Typography choices affect how users weight statistical annotations vs. raw numbers',
        examples: [
          'Displaying large, bold percentage changes without qualification encourages over-interpretation',
          'Using subdued typography for "not statistically significant" buries the most important information',
          'Clear typographic hierarchy between the finding and its statistical context helps users process both',
          'Monospace or tabular figures prevent visual misalignment in data tables that could suggest false patterns',
        ],
      },
      color: {
        level: ImpactLevel.CRITICAL,
        description:
          'Color encoding in data visualizations directly shapes which patterns users perceive as meaningful',
        examples: [
          'Using red/green to encode positive/negative changes in noisy data triggers false pattern alerts',
          'Color-coding data points by arbitrary categories creates apparent clusters where none exist',
          'Gray or muted confidence bands help users see uncertainty without overwhelming the signal',
          'Significance-based color intensity (saturated for significant, desaturated for insignificant) naturally communicates reliability',
        ],
      },
      interaction: {
        level: ImpactLevel.CRITICAL,
        description:
          'Interactive data exploration amplifies clustering illusion when users can freely filter, zoom, and slice without safeguards',
        examples: [
          'Zoom interactions that remove context (hiding the full time range) amplify random noise into apparent trends',
          'Hover tooltips showing exact values for individual points encourage over-interpretation of noise',
          'Filter controls that allow tiny sample sizes without warning enable false cluster detection',
          'Interactive significance testing on demand helps users verify apparent patterns before acting',
        ],
      },
      content: {
        level: ImpactLevel.HIGH,
        description:
          'How statistical findings are narrated determines whether users see real signals or imaginary patterns',
        examples: [
          'Auto-generated insight text like "Revenue spiked 23% yesterday!" without context fuels false pattern perception',
          'Plain-language significance summaries ("This change is within normal daily variation") prevent overreaction',
          'Framing data as questions ("Is this trend real?") rather than assertions ("Revenue is trending up!") encourages critical thinking',
          'Including base rate information ("On average, 1 in 20 metrics will show a false positive at 95% confidence") calibrates expectations',
        ],
      },
      accessibility: {
        level: ImpactLevel.HIGH,
        description:
          'Accessible statistical communication must convey uncertainty information through non-visual channels',
        examples: [
          'Screen reader descriptions must include confidence levels, not just raw numbers: "Revenue increased 12%, but this is within the expected random range"',
          'Color-coded significance levels need text or icon alternatives for colorblind users',
          'Data sonification of noisy time series should include reference tones for baseline and expected variation',
          'Alt text for charts should describe statistical reliability alongside visual patterns',
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
        title: 'Confidence Intervals on Time-Series Data',
        description:
          'Analytics dashboard showing daily conversion rate with shaded confidence band',
        code: `<div class="metric-chart">
  <h3>Daily Conversion Rate</h3>
  <div class="chart-container">
    <!-- SVG line chart with confidence band -->
    <svg viewBox="0 0 600 300">
      <!-- Confidence band (shaded area) -->
      <path class="confidence-band" d="M0,120 L100,110 200,130 300,100 400,125 500,115 600,120
        L600,180 500,185 400,175 300,200 200,170 100,190 0,180 Z"
        fill="var(--cg-color-info-100)" opacity="0.3"/>
      <!-- Actual data line -->
      <path class="data-line" d="M0,150 L100,140 200,155 300,135 400,160 500,145 600,150"
        stroke="var(--cg-color-info-500)" fill="none" stroke-width="2"/>
      <!-- Expected baseline -->
      <line class="baseline" x1="0" y1="150" x2="600" y2="150"
        stroke="var(--cg-color-neutral-400)" stroke-dasharray="4"/>
    </svg>
    <p class="stat-context">
      <span class="label">95% confidence interval shown</span>
      <span class="detail">Daily variation of +/-12% is expected for this sample size (n=1,247/day)</span>
    </p>
  </div>
</div>`,
        explanation:
          'The shaded confidence band shows users the range of normal random variation. Data points within the band are expected noise, not meaningful trends. The baseline and sample size context help users resist seeing false patterns.',
        principle:
          'Visualizing uncertainty alongside data prevents false pattern detection in noisy time series',
        metrics: {
          before: '67% of users reported "seeing trends" in random daily fluctuations',
          after: '23% of users reported trends (only when genuine trends existed)',
          improvement: '66% reduction in false trend identification',
        },
      },
      {
        title: 'A/B Test Significance Gate',
        description:
          'Experiment results page that gates interpretation on statistical significance',
        code: `<div class="ab-test-results">
  <h3>Experiment: New Checkout Flow</h3>

  <div class="significance-meter">
    <div class="meter-bar">
      <div class="meter-fill" style="width: 78%"></div>
      <div class="threshold-marker" style="left: 95%">
        <span class="threshold-label">95% threshold</span>
      </div>
    </div>
    <p class="meter-status warning">
      78% confident — <strong>not yet significant</strong>
    </p>
    <p class="meter-detail">
      Estimated 4 more days needed to reach 95% confidence
    </p>
  </div>

  <div class="results-preview blurred">
    <div class="variant">
      <span class="label">Control</span>
      <span class="rate">3.2%</span>
    </div>
    <div class="variant">
      <span class="label">Treatment</span>
      <span class="rate">3.8%</span>
    </div>
    <div class="overlay-message">
      Results are preliminary. The observed difference (+0.6pp)
      could be random variation. Wait for significance.
    </div>
  </div>
</div>`,
        explanation:
          'Blurring pre-significance results and showing a clear significance meter prevents users from over-interpreting early random variation as real differences. The time estimate helps users wait for reliable data.',
        principle:
          'Gating data interpretation on statistical significance prevents clustering illusion in experiments',
      },
      {
        title: 'Scatter Plot with Randomness Baseline',
        description:
          'Data exploration view showing user clusters compared to a random distribution reference',
        code: `<div class="scatter-analysis">
  <h3>User Behavior Clusters</h3>

  <div class="chart-with-controls">
    <div class="chart-area">
      <!-- Scatter plot with two layers -->
      <svg viewBox="0 0 400 400">
        <!-- Random baseline density contour (reference) -->
        <ellipse cx="200" cy="200" rx="150" ry="150"
          fill="none" stroke="var(--cg-color-neutral-300)" stroke-dasharray="4"/>
        <ellipse cx="200" cy="200" rx="100" ry="100"
          fill="none" stroke="var(--cg-color-neutral-300)" stroke-dasharray="4"/>

        <!-- Actual data points -->
        <g class="data-points">
          <circle cx="120" cy="80" r="4" fill="var(--cg-color-info-500)"/>
          <circle cx="130" cy="90" r="4" fill="var(--cg-color-info-500)"/>
          <!-- ... more points ... -->
        </g>
      </svg>
    </div>

    <div class="stat-summary">
      <p><strong>Correlation:</strong> r = 0.12 (p = 0.34, not significant)</p>
      <p><strong>Cluster test:</strong> Hopkins statistic = 0.52 (consistent with random)</p>
      <p class="interpretation">
        The apparent cluster in the top-left is within expected random variation
        for this sample size (n=89).
      </p>
    </div>
  </div>
</div>`,
        explanation:
          'Overlaying random distribution contours lets users visually compare observed clusters against what randomness looks like. The statistical summary (correlation, Hopkins statistic) confirms whether apparent patterns are real.',
        principle:
          'Randomness baselines on scatter plots calibrate expectations and prevent false cluster detection',
      },
    ],

    bad: [
      {
        title: 'Uncontextualized Trend Chart',
        description:
          'Dashboard showing daily metric changes with no confidence or context',
        code: `<!-- DON'T DO THIS -->
<div class="dashboard-metric">
  <h3>Daily Active Users</h3>
  <div class="big-number">
    <span class="value">12,847</span>
    <span class="change positive">+5.2% vs yesterday</span>
  </div>
  <div class="sparkline">
    <!-- Raw line chart with no confidence bands, no baseline, no context -->
    <svg viewBox="0 0 200 50">
      <path d="M0,30 L40,25 80,35 120,20 160,28 200,22"
        stroke="#22c55e" fill="none" stroke-width="2"/>
    </svg>
  </div>
  <p class="insight">DAU is trending upward!</p>
</div>`,
        explanation:
          'A 5.2% daily change is presented as a meaningful trend with no context about normal variation. The auto-generated "trending upward!" insight from a handful of data points encourages users to act on random noise. No sample size, confidence interval, or historical baseline is provided.',
        principle:
          'Raw data without statistical context invites clustering illusion — every random fluctuation looks like a trend',
      },
      {
        title: 'Pre-Significance A/B Test Winner Declaration',
        description:
          'Experiment dashboard declaring a winner after insufficient data',
        code: `<!-- DON'T DO THIS -->
<div class="ab-results">
  <h3>Experiment Results</h3>
  <div class="winner-banner">
    <span class="trophy">Winner!</span>
    <span class="variant-name">Variant B</span>
  </div>
  <table>
    <tr>
      <td>Control (A)</td>
      <td>3.1% conversion</td>
      <td>n = 47</td>
    </tr>
    <tr class="winner-row">
      <td>Variant B</td>
      <td>4.3% conversion</td>
      <td>n = 52</td>
    </tr>
  </table>
  <button class="primary">Ship Variant B</button>
</div>`,
        explanation:
          'With only ~50 visitors per variant, the 1.2pp difference is well within random variation. Declaring a "winner" and prompting users to ship creates a false sense of certainty. This is the clustering illusion applied to experimental data.',
        principle:
          'Never declare experiment winners before reaching statistical significance — small samples produce random clusters that masquerade as real effects',
      },
      {
        title: 'Color-Coded Data Without Significance',
        description:
          'Heat map using strong red/green coloring on statistically insignificant differences',
        code: `<!-- DON'T DO THIS -->
<div class="metrics-heatmap">
  <h3>Conversion by Channel</h3>
  <table>
    <tr>
      <td>Email</td>
      <td style="background: #ef4444; color: white;">2.1% (-0.3pp)</td>
    </tr>
    <tr>
      <td>Social</td>
      <td style="background: #22c55e; color: white;">2.8% (+0.4pp)</td>
    </tr>
    <tr>
      <td>Search</td>
      <td style="background: #ef4444; color: white;">2.3% (-0.1pp)</td>
    </tr>
    <tr>
      <td>Direct</td>
      <td style="background: #22c55e; color: white;">2.6% (+0.2pp)</td>
    </tr>
  </table>
</div>`,
        explanation:
          'Strong red/green color encoding on differences of 0.1-0.4 percentage points makes random variation look like a definitive pattern. Without sample sizes or significance testing, users will reallocate budget based on noise.',
        principle:
          'Color-coding insignificant differences transforms random noise into perceived patterns that drive wrong decisions',
      },
    ],

    realWorld: [
      {
        company: 'Optimizely',
        product: 'Stats Engine',
        url: 'https://www.optimizely.com/statistics/',
        description:
          'Optimizely replaced traditional p-value displays with a "Stats Engine" that uses sequential testing and shows real-time significance levels. Results are locked until significance is reached, and the UI clearly communicates "not yet significant" states with progress indicators.',
        effectiveness: 'very-effective',
        analysis:
          'By gating result interpretation on statistical significance and using sequential testing, Optimizely dramatically reduced the rate of false-positive experiment conclusions. The clear visual communication of uncertainty prevents users from acting on clustering illusion in early experimental data.',
      },
      {
        company: 'Google',
        product: 'Google Analytics 4 Insights',
        description:
          'GA4 uses automated anomaly detection with statistical significance thresholds. When surfacing insights like "Sessions increased 15%," the system only alerts when the change exceeds expected variation based on historical data. Non-significant changes are not surfaced.',
        effectiveness: 'effective',
        analysis:
          'Filtering out statistically insignificant changes prevents users from reacting to every daily fluctuation. However, users can still manually explore raw data and may perceive false patterns in the unfiltered views where no significance safeguards are applied.',
      },
      {
        company: 'Robinhood',
        product: 'Stock Charts',
        description:
          'Robinhood displays stock price movements with prominent percentage changes and color-coded gains/losses. The minimalist charts lack moving averages, volume context, or volatility bands, making random daily fluctuations appear as meaningful trends.',
        effectiveness: 'somewhat-effective',
        analysis:
          'The clean, gamified interface amplifies clustering illusion. Users see streaks and patterns in random price movements and trade on perceived trends. The absence of statistical context (volatility ranges, historical noise bands) encourages over-trading based on illusory patterns.',
      },
      {
        company: 'Stripe',
        product: 'Stripe Radar Fraud Detection',
        url: 'https://stripe.com/radar',
        description:
          'Stripe Radar shows fraud risk scores with confidence levels and explains how each signal contributes to the score. Borderline cases are flagged as "uncertain" rather than definitively classified, and the system shows false-positive rates alongside detection rates.',
        effectiveness: 'very-effective',
        analysis:
          'By explicitly showing confidence and uncertainty in pattern detection, Stripe prevents merchants from seeing fraud "clusters" in normal transaction variation. The explainability features help users understand when an apparent pattern is statistically reliable.',
      },
    ],

    abTests: [
      {
        title: 'Analytics Dashboard: Confidence Bands vs Raw Lines',
        hypothesis:
          'Adding confidence intervals to time-series charts will reduce false trend identification and improve decision quality',
        controlVersion: {
          description:
            'Standard line chart showing daily conversion rate with color-coded percentage changes (red for down, green for up)',
          metrics: {
            conversionRate: 'N/A (measured decision accuracy)',
            falseTrendRate: '67%',
            actionOnNoise: '43% of users took action on random fluctuations',
          },
        },
        treatmentVersion: {
          description:
            'Same line chart with 95% confidence band, expected variation label, and sample size annotation. Percentage changes shown in neutral color when within expected range.',
          metrics: {
            conversionRate: 'N/A (measured decision accuracy)',
            falseTrendRate: '19%',
            actionOnNoise: '11% of users took action on random fluctuations',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Confidence bands reduced false trend identification by 72%. Users were nearly 4x less likely to take action on random daily fluctuations. Crucially, they were equally responsive to genuine anomalies (changes exceeding the confidence band), showing the intervention reduced noise reactions without dampening signal detection.',
          learnings: [
            'Confidence bands are the single most effective visual tool against clustering illusion in time-series data',
            'Neutral color-coding for within-range changes prevents emotional reaction to noise',
            'Sample size annotations helped users self-calibrate, especially for low-traffic metrics',
            'Users initially resisted the added complexity but reported better decisions after one week',
          ],
        },
      },
      {
        title: 'A/B Test Dashboard: Significance Gate vs Open Results',
        hypothesis:
          'Gating experiment results behind a significance threshold will reduce premature experiment conclusions',
        controlVersion: {
          description:
            'Standard experiment dashboard showing real-time conversion rates for control and treatment with a "Ship Winner" button always available',
          metrics: {
            prematureShipRate: '34%',
            falsePositiveRate: '28%',
            averageTestDuration: '5.2 days',
          },
        },
        treatmentVersion: {
          description:
            'Dashboard with significance progress bar, blurred results pre-significance, and "Ship Winner" button disabled until 95% confidence reached',
          metrics: {
            prematureShipRate: '4%',
            falsePositiveRate: '5%',
            averageTestDuration: '12.8 days',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'The significance gate virtually eliminated premature shipping (34% down to 4%). False positive rates dropped from 28% to the expected 5%. Tests ran 2.5x longer, but this was the correct duration — the control group was stopping too early due to clustering illusion in small samples.',
          learnings: [
            'Physical UI barriers (disabled buttons, blurred results) are more effective than warnings alone',
            'Significance progress bars gave users a positive goal to wait for rather than just frustration',
            'The 4% who still shipped early used API workarounds — consider backend enforcement',
            'Teams reported higher confidence in shipped changes, improving organizational trust in experimentation',
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
        name: 'Missing Confidence Indicators',
        description:
          'Charts displaying data trends or patterns without confidence intervals, error bars, or uncertainty ranges',
        howToSpot:
          'Look for line charts, bar charts, or time series with clean, unadorned data lines and no shaded regions indicating uncertainty',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Color-Coded Insignificant Changes',
        description:
          'Red/green or other strong color encoding applied to small numerical differences without significance testing',
        howToSpot:
          'Check for color-coded percentage changes, heat maps, or status indicators that do not reference statistical significance',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Auto-Generated Trend Assertions',
        description:
          'Automated insight text declaring trends, spikes, or patterns without statistical qualification',
        howToSpot:
          'Look for phrases like "trending up," "spiking," "declining" without accompanying significance levels or confidence scores',
        severity: ImpactLevel.CRITICAL,
      },
      {
        name: 'Uncontextualized Scatter Plots',
        description:
          'Scatter plots or dot distributions without reference distributions, density contours, or correlation statistics',
        howToSpot:
          'Check for scatter plots that show only raw data points with no statistical overlay or reference to expected random distribution',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Missing Sample Size Context',
        description:
          'Percentages, rates, or averages displayed without the underlying sample count',
        howToSpot:
          'Look for metrics like "45% conversion" or "3.2 avg rating" that do not show n= values or visitor/sample counts',
        severity: ImpactLevel.HIGH,
      },
    ],

    patterns: [
      {
        name: 'Premature Trend Declaration Pattern',
        description: 'System or interface asserts meaningful trends from insufficient or noisy data',
        indicators: [
          'Time-series charts with fewer than 30 data points presented as "trends"',
          'Auto-generated insight text with no significance qualifier',
          '"Trending" labels on metrics with high day-to-day variance',
          'Arrow indicators (up/down) on daily fluctuations within normal range',
        ],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Missing Statistical Safeguards Pattern',
        description: 'Data visualization lacks the statistical context needed to distinguish signal from noise',
        indicators: [
          'Line charts without confidence bands or error bars',
          'Bar charts without error bars or significance markers',
          'Scatter plots without correlation coefficients or p-values',
          'Percentages without sample size annotations',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'False Significance Signaling Pattern',
        description: 'Visual design choices (color, size, emphasis) imply significance where none has been tested',
        indicators: [
          'Strong red/green color on small, untested differences',
          'Bold or large typography for statistically unreliable numbers',
          'Alert or warning styling on normal variation',
          'Ranking or ordering by metrics with overlapping confidence intervals',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Small-Sample Generalization Pattern',
        description: 'Conclusions drawn from sample sizes too small for reliable inference',
        indicators: [
          'Segment breakdowns with very small per-segment sample sizes',
          'Daily metrics for low-traffic features or pages',
          'A/B test results shown before minimum sample size reached',
          'Funnel percentages from single-digit user counts',
        ],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
    ],

    checklistQuestions: [
      'Do all charts showing sampled or noisy data include confidence intervals or error bars?',
      'Are A/B test results gated behind a statistical significance threshold?',
      'Is sample size displayed alongside all percentages, rates, and averages?',
      'Do auto-generated insights include statistical qualification (significance, confidence)?',
      'Are color encodings (red/green) reserved for statistically significant differences?',
      'Do scatter plots include reference distributions or correlation statistics?',
      'Can users zoom into time-series data without losing sight of broader context and baselines?',
      'Are daily or short-term fluctuations clearly distinguished from longer-term trends?',
      'Does the UI prevent users from acting on experiment results before significance is reached?',
      'Are randomness baselines or expected variation ranges shown for key metrics?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in statistical cognition and data visualization design, specializing in the clustering illusion and its statistical variant.

Analyze the provided design for clustering illusion vulnerabilities. Identify:

1. **Missing Uncertainty Visualization**: Charts, graphs, or data displays lacking confidence intervals, error bars, or uncertainty ranges
2. **False Pattern Signaling**: Visual design choices (color, size, emphasis) that imply meaningful patterns in potentially random data
3. **Premature Conclusions**: Auto-generated insights, trend labels, or winner declarations without statistical backing
4. **Sample Size Blindness**: Metrics displayed without sample size context, enabling false conclusions from small data
5. **Significance Gaps**: Places where statistical significance testing should be applied but is not

For each vulnerability found:
- Identify the data visualization or metric display at risk
- Assess the probability that users will perceive false patterns
- Determine the potential consequences of acting on illusory patterns
- Recommend specific statistical safeguards (confidence bands, significance gates, sample size labels, baselines)
- Suggest progressive disclosure approaches to balance clarity with statistical rigor

Consider:
- Is the data inherently noisy or variable? If so, how is this communicated?
- Are users likely to have statistical literacy? How should the UI adapt?
- Could random variation in this data lead to harmful decisions?
- Are there places where exploratory analysis is appropriate vs. where confirmatory testing is needed?
- How do interactive features (zooming, filtering, segmenting) affect clustering illusion vulnerability?

Provide actionable recommendations to prevent false pattern detection while maintaining data usability.`,

    outputSchema: {
      type: 'object',
      properties: {
        clusteringVulnerabilities: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              dataType: { type: 'string' },
              falsePatternRisk: { type: 'string' },
              consequenceOfAction: { type: 'string' },
              statisticalSafeguard: { type: 'string' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'dataType',
              'falsePatternRisk',
              'recommendation',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            uncertaintyVisualization: { type: 'number' },
            significanceTesting: { type: 'number' },
            sampleSizeContext: { type: 'number' },
            baselinePresence: { type: 'number' },
          },
          required: [
            'uncertaintyVisualization',
            'significanceTesting',
            'sampleSizeContext',
            'baselinePresence',
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
        'clusteringVulnerabilities',
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
        title: 'Audit Data Volatility',
        description:
          'Identify which metrics and data displays in your interface are inherently noisy or based on small samples',
        example:
          'Map all dashboard widgets: daily conversion rate (high volatility, n=500/day), monthly revenue (low volatility, n=10,000/month), A/B test results (variable, depends on traffic)',
        tips: [
          'Categorize each metric by sample size and expected variance',
          'Flag metrics with coefficient of variation > 20% as high-risk for clustering illusion',
          'Identify which metrics users are most likely to act on impulsively',
        ],
      },
      {
        step: 2,
        title: 'Add Confidence Intervals to Volatile Metrics',
        description:
          'Add visual uncertainty indicators (confidence bands, error bars) to all high-volatility data displays',
        example:
          'Add a 95% confidence band to the daily conversion rate chart: gray shaded area showing the range within which the true rate likely falls',
        tips: [
          'Use shaded bands for time series, error bars for bar charts',
          'Choose 95% CI as default; offer 90%/99% as options for advanced users',
          'Color the band in a subtle, non-alarming tone (light gray or blue)',
        ],
      },
      {
        step: 3,
        title: 'Implement Significance Gating for Experiments',
        description:
          'Prevent users from interpreting or acting on A/B test results before statistical significance is reached',
        example:
          'Show a significance progress bar (currently at 78%, need 95%). Blur or gray out result tables until threshold is met. Disable "Ship Winner" button.',
        tips: [
          'Use sequential testing methods to allow valid early stopping when significance is truly reached',
          'Show estimated time to significance to set expectations',
          'Provide educational tooltips explaining why waiting matters',
        ],
      },
      {
        step: 4,
        title: 'Add Sample Size Context Everywhere',
        description:
          'Display sample size alongside every percentage, rate, average, or ratio in the interface',
        example:
          'Instead of "Conversion rate: 4.2%", show "Conversion rate: 4.2% (n=1,247)" or use visual encoding (smaller/lighter text for small samples)',
        tips: [
          'Use opacity or size scaling to visually encode sample reliability',
          'Set minimum sample thresholds below which metrics are hidden or flagged',
          'Show a warning when users filter data to sample sizes below statistical reliability',
        ],
      },
      {
        step: 5,
        title: 'Design Randomness Baselines',
        description:
          'Create reference visualizations showing what random data looks like for each data type, so users can compare',
        example:
          'On a scatter plot, overlay dashed contour lines showing the expected density distribution if the data were random. If actual clusters fall within these contours, they are not meaningful.',
        tips: [
          'Generate random baselines using Monte Carlo simulation of the same sample size',
          'Show baselines as subtle visual layers (dashed lines, light shading)',
          'Include statistical tests (Hopkins statistic for clustering, runs test for sequences)',
        ],
      },
    ],

    dos: [
      'Add confidence intervals or error bars to every chart displaying noisy or sampled data',
      'Gate A/B test results behind statistical significance thresholds',
      'Display sample sizes alongside all percentages, rates, and averages',
      'Use neutral colors for changes within expected random variation',
      'Include randomness baselines on scatter plots and distribution charts',
      'Provide plain-language significance summaries for non-technical users',
      'Show broader time context when users zoom into short data windows',
      'Label auto-generated insights with confidence levels and statistical backing',
    ],

    donts: [
      'Don\'t color-code small differences (red/green) without significance testing',
      'Don\'t auto-generate trend assertions ("Revenue is trending up!") from noisy data',
      'Don\'t allow users to declare A/B test winners before significance is reached',
      'Don\'t display scatter plots without correlation statistics or cluster tests',
      'Don\'t show percentages without the underlying sample size',
      'Don\'t use alert styling (warning icons, red text) for normal statistical variation',
      'Don\'t let zoom interactions remove all context (baselines, broader trends)',
      'Don\'t rank or sort metrics by values when their confidence intervals overlap',
    ],

    bestPractices: [
      {
        title: 'Progressive Statistical Disclosure',
        description:
          'Layer statistical information from simple summaries to full detail, letting users choose their depth',
        rationale:
          'Not all users need or understand p-values, but all users benefit from knowing whether a pattern is reliable',
        example:
          'Level 1: "This change is within normal variation." Level 2: "95% CI: [2.1%, 4.8%], p=0.34." Level 3: Full statistical test details.',
      },
      {
        title: 'Significance-Based Color Encoding',
        description:
          'Map color saturation to statistical significance rather than raw magnitude',
        rationale:
          'This ensures that only reliable differences get strong visual emphasis, preventing clustering illusion from color cues',
        example:
          'Significant increases: saturated green. Insignificant increases: light gray-green. Not yet tested: neutral gray.',
      },
      {
        title: 'Smart Defaults for Time Ranges',
        description:
          'Default to time ranges that contain enough data for statistical reliability rather than showing the most recent (noisiest) period',
        rationale:
          'Defaulting to "last 24 hours" for low-traffic sites maximizes clustering illusion; "last 30 days" provides better baselines',
        example:
          'Auto-select time range based on traffic volume: high-traffic sites default to 7 days, low-traffic to 30 days, with a note explaining why.',
      },
      {
        title: 'Interactive Significance Testing',
        description:
          'Let users click on any apparent pattern to run an on-demand statistical test',
        rationale:
          'Giving users the tools to verify their intuitions trains statistical thinking and prevents action on illusions',
        example:
          'User clicks a cluster in a scatter plot, UI shows: "Cluster test (Hopkins): 0.52 — consistent with random distribution. This cluster is likely coincidental."',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '1.1.1',
        guideline:
          'Non-text Content - Provide text alternatives for all statistical visualizations',
        implementation:
          'Alt text for charts must include statistical reliability information: "Daily conversion rate chart showing 3.2% average with 95% confidence interval of 2.8% to 3.6%. Recent fluctuations are within expected random range."',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.4.1',
        guideline:
          'Use of Color - Do not rely on color alone to convey statistical significance',
        implementation:
          'Combine significance-based color encoding with text labels ("significant"/"not significant"), icons (checkmark/question mark), and patterns (solid vs dashed lines).',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships - Programmatically associate confidence information with data values',
        implementation:
          'Use ARIA attributes to link data values with their confidence intervals and sample sizes, so screen readers announce them together: "Conversion rate: 3.2%, confidence interval 2.8 to 3.6%, sample size 1,247."',
      },
      {
        wcagLevel: 'AA',
        criterion: '3.3.2',
        guideline:
          'Labels or Instructions - Provide guidance for interpreting statistical displays',
        implementation:
          'Include visible instruction text near data visualizations: "Shaded area shows expected range of random variation. Points outside this range may indicate a real change."',
      },
    ],

    ethics: [
      {
        concern: 'Exploiting Pattern-Seeking for Engagement',
        severity: 'critical',
        explanation:
          'Deliberately designing noisy data displays without statistical safeguards to create more perceived "insights" and drive engagement with analytics products',
        mitigation:
          'Always include appropriate statistical context. Measure product value by decision quality, not by number of perceived insights.',
      },
      {
        concern: 'Selective Significance Reporting',
        severity: 'high',
        explanation:
          'Showing significance when results favor a preferred outcome but hiding significance indicators when results are inconclusive',
        mitigation:
          'Apply significance indicators consistently across all data views. Never suppress statistical context based on what the data shows.',
      },
      {
        concern: 'Over-Alerting to Drive Action',
        severity: 'high',
        explanation:
          'Setting anomaly detection thresholds too low, generating many false-positive alerts that create urgency and perceived value',
        mitigation:
          'Calibrate alert thresholds to meaningful statistical levels (e.g., 2+ standard deviations). Show false-positive rates transparently.',
      },
      {
        concern: 'Gamification of Random Outcomes',
        severity: 'medium',
        explanation:
          'Using streak counters, trend indicators, and performance badges on metrics driven primarily by random variation',
        mitigation:
          'Only gamify metrics that are within the user\'s control and statistically reliable. Show variance context for volatile metrics.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'The Hot Hand in Basketball: On the Misperception of Random Sequences',
        author: 'Gilovich, T., Vallone, R., & Tversky, A.',
        year: 1985,
        doi: '10.1016/0010-0285(85)90010-6',
        description:
          'The foundational paper demonstrating that people perceive illusory streaks in random sequences, using basketball shooting data',
        type: 'foundational',
      },
      {
        title: 'Belief in the Law of Small Numbers',
        author: 'Tversky, A., & Kahneman, D.',
        year: 1971,
        doi: '10.1037/h0031322',
        description:
          'Demonstrates that people expect small samples to mirror population properties, leading to over-interpretation of clusters in limited data',
        type: 'foundational',
      },
      {
        title: 'The Perception of Randomness',
        author: 'Nickerson, R. S.',
        year: 2002,
        doi: '10.1037/0033-295X.109.2.330',
        description:
          'Comprehensive review of how humans systematically misperceive random sequences, expecting too much alternation and too few clusters',
        type: 'advanced',
      },
      {
        title: 'Statistical Cognition: Challenges in Interpretation of Data',
        author: 'Gigerenzer, G., & Edwards, A.',
        year: 2003,
        description:
          'Practical framework for understanding how statistical illiteracy and clustering illusion affect real-world data interpretation',
        type: 'practical',
      },
    ],

    books: [
      {
        title: 'Thinking, Fast and Slow',
        author: 'Kahneman, Daniel',
        year: 2011,
        isbn: '9780374275631',
        description:
          'Chapters on representativeness heuristic and the law of small numbers, directly explaining the cognitive basis of clustering illusion',
        type: 'foundational',
      },
      {
        title: 'The Drunkard\'s Walk: How Randomness Rules Our Lives',
        author: 'Mlodinow, Leonard',
        year: 2008,
        isbn: '9780375424045',
        description:
          'Accessible exploration of how humans misperceive randomness, with extensive examples of clustering illusion in sports, finance, and everyday life',
        type: 'practical',
      },
      {
        title: 'Fooled by Randomness',
        author: 'Taleb, Nassim Nicholas',
        year: 2005,
        isbn: '9780812975215',
        description:
          'Explores how clustering illusion and pattern-seeking in random data drive poor decisions in finance, business, and life',
        type: 'practical',
      },
    ],

    articles: [
      {
        title: 'How to Lie with Data Visualization',
        author: 'Heap, Alex',
        url: 'https://heap.io/blog/data-visualization-mistakes',
        description:
          'Practical guide to common data visualization mistakes that exploit or amplify clustering illusion',
        type: 'practical',
      },
      {
        title: 'Guidelines for Visualizing Uncertainty',
        author: 'Hullman, J., & Diakopoulos, N.',
        url: 'https://mucollective.northwestern.edu/project/uncertainty-visualization',
        description:
          'Research-backed guidelines for designing uncertainty visualizations that counteract clustering illusion',
        type: 'advanced',
      },
    ],

    videos: [
      {
        title: 'Is the Hot Hand Fallacy a Fallacy?',
        author: 'Veritasium',
        url: 'https://www.youtube.com/watch?v=bPZI9AuLNo8',
        description:
          'Engaging video explanation of the clustering illusion through the lens of the hot hand debate in basketball',
        type: 'foundational',
      },
    ],

    demos: [
      {
        title: 'Seeing Theory: Probability Distributions',
        author: 'Brown University',
        url: 'https://seeing-theory.brown.edu/',
        description:
          'Interactive visualization showing how random distributions contain more clusters than people expect',
        type: 'practical',
      },
    ],
  },

  //===========================================
  // RELATIONSHIPS
  //===========================================
  relationships: {
    complements: [
      'confirmation-bias', // Once a cluster is perceived, confirmation bias reinforces it
      'anchoring-bias', // First data point seen anchors interpretation of subsequent clusters
      'availability-heuristic', // Recent vivid data points make clusters more salient
      'narrative-fallacy', // Causal stories are constructed to explain random clusters
    ],

    conflicts: [
      'regression-to-mean', // Understanding regression undermines clustering illusion
      'base-rate-neglect', // Clustering illusion can be partially countered by base rate awareness
    ],

    confusedWith: [
      'apophenia', // Broader tendency to perceive patterns; clustering illusion is a specific form
      'gambler-fallacy', // Related but opposite: expecting random sequences to alternate MORE
      'texas-sharpshooter-fallacy', // Drawing the target after seeing where the bullets hit
    ],

    hierarchy: {
      parent: 'representativeness-heuristic',
      children: [
        'hot-hand-fallacy',
        'streak-perception',
        'illusory-correlation',
      ],
    },
  },
};
