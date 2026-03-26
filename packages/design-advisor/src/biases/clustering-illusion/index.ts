/**
 * CLUSTERING ILLUSION
 *
 * We see patterns in random data
 */


import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const clusteringIllusion: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'clustering-illusion',
    name: 'Clustering Illusion',
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
    simple: 'We see patterns in random data',

    detailed: `The Clustering Illusion is the tendency to perceive meaningful patterns in random or noisy data. Humans are pattern-recognition machines, and this strength becomes a liability when we see streaks, clusters, or trends in sequences that are actually the product of chance.

When presented with random data, people expect it to look more "spread out" or "alternating" than true randomness actually produces. Real random sequences frequently contain runs and clusters that people mistake for evidence of an underlying cause or trend. This leads to false beliefs in "hot streaks," causal explanations for noise, and overconfidence in spurious patterns.

In UX and product design, this bias is especially dangerous in data visualization, analytics dashboards, and any interface where users interpret numerical or temporal data. Designers must be vigilant about how data is presented, because users will naturally over-interpret clusters and streaks unless the interface provides proper statistical context.`,

    psychologyBasis: {
      discoveredBy: 'Various Researchers',
      year: 1970,
      theory: 'Cognitive Bias Research',
      mechanism: `The brain is wired to detect patterns as a survival mechanism, but this leads to false positives when encountering random data. This happens because:

1. **Representativeness Heuristic**: People expect small samples to mirror the properties of the larger population, so a random streak feels "non-random"
2. **Underestimating Variance**: People expect random sequences to alternate more than they actually do, so natural clusters feel like signals
3. **Apophenia**: The general tendency to perceive connections and meaning between unrelated things
4. **Confirmation Bias Reinforcement**: Once a pattern is "seen," the brain selectively attends to confirming evidence and ignores disconfirming data
5. **Narrative Construction**: The brain automatically generates causal stories to explain perceived clusters, making them feel even more real

The mechanism is automatic—people see the cluster first and rationalize it second, making it extremely difficult to override through willpower alone.`,
    },

    realWorldExample: `In 1985, Gilovich, Vallone, and Tversky studied the "hot hand" belief in basketball—the widespread conviction that players go on shooting streaks where they're more likely to make the next shot after making several in a row. Analysis of thousands of shots from the Philadelphia 76ers revealed that the sequences were statistically indistinguishable from random coin flips. The "hot hand" was a clustering illusion: fans and players alike were seeing meaningful patterns in random variation.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `The Clustering Illusion affects how users interpret data visualizations, analytics dashboards, trend indicators, and any time-series or sequential data. Designers must account for users' tendency to:

- See trends in noisy data that are actually random fluctuations
- Interpret short-term streaks as evidence of momentum or decline
- Overreact to clusters of events (errors, sales, sign-ups) that are statistically expected
- Draw causal conclusions from coincidental patterns
- Make decisions based on perceived patterns rather than statistical significance`,

    whenToUse: [
      {
        title: 'Statistical Significance Indicators',
        scenario:
          'When displaying data trends that might be random noise',
        example:
          'Add confidence intervals and significance markers to trend lines so users can distinguish real trends from random clusters',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Baseline Comparisons',
        scenario: 'When users are reviewing performance metrics over time',
        example:
          'Show historical baselines and expected ranges alongside current data so users can see whether a cluster is unusual or expected',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Randomness Education',
        scenario: 'When users need to interpret A/B test results or experimental data',
        example:
          'Include "expected by chance" overlays that show what random variation looks like for the given sample size',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Streak Contextualization',
        scenario: 'When displaying sequential outcomes (wins/losses, up/down days, pass/fail)',
        example:
          'Label streaks with their statistical probability: "A run of 5 wins is expected once every ~32 attempts by chance alone"',
        impact: ImpactLevel.MEDIUM,
      },
      {
        title: 'Data Smoothing Controls',
        scenario: 'When presenting time-series data with high variance',
        example:
          'Offer moving averages and smoothing controls so users can see through noise to actual trends',
        impact: ImpactLevel.MEDIUM,
      },
    ],

    whenToAvoid: [
      {
        title: 'Gamification and Engagement Streaks',
        reason:
          'Exploiting clustering illusion to make random reward schedules feel like "hot streaks" is manipulative',
        consequence:
          'Users develop false beliefs about their skill or the system\'s behavior, leading to compulsive engagement',
        alternative:
          'If using streaks for engagement, base them on actual consistent behavior, not random outcomes',
      },
      {
        title: 'Financial or Investment Dashboards',
        reason:
          'Presenting market noise as patterns can lead to harmful trading decisions',
        consequence:
          'Users over-trade or make poor investment choices based on illusory trends',
        alternative:
          'Always show statistical significance, confidence intervals, and appropriate time horizons',
      },
      {
        title: 'Health and Diagnostic Data',
        reason:
          'Clusters in health data can cause unnecessary alarm or false reassurance',
        consequence:
          'Patients or clinicians may over-interpret random symptom clusters as meaningful trends',
        alternative:
          'Present health data with clear context about normal variation and when to be concerned',
      },
      {
        title: 'Performance Reviews and Metrics',
        reason:
          'Short-term performance clusters may not reflect actual capability changes',
        consequence:
          'Unfair evaluations based on random performance variation rather than sustained trends',
        alternative:
          'Use longer time windows, statistical baselines, and rolling averages for performance assessment',
      },
    ],

    commonMistakes: [
      {
        title: 'Trend Lines on Noisy Data',
        description:
          'Drawing trend lines through data with high variance, making random fluctuations look like meaningful trends',
        why: 'Trend lines impose a narrative on data that may be purely random, and users trust the visual',
        fix: 'Show confidence intervals around trend lines and indicate when trends are not statistically significant',
      },
      {
        title: 'Streak Indicators Without Context',
        description:
          'Highlighting winning streaks, error bursts, or consecutive events without indicating whether they are statistically unusual',
        why: 'Users interpret highlighted streaks as meaningful signals rather than expected random variation',
        fix: 'Compare streaks against expected distributions and only highlight statistically anomalous runs',
      },
      {
        title: 'Small Sample Dashboards',
        description:
          'Showing percentages, rates, or trends from tiny sample sizes where variance is naturally high',
        why: 'Small samples produce dramatic clusters that are meaningless but look alarming or exciting',
        fix: 'Display sample sizes prominently and suppress or gray out metrics below a minimum threshold',
      },
      {
        title: 'Heatmaps Without Randomness Baselines',
        description:
          'Showing heatmaps of event locations (clicks, errors, incidents) without comparing to random distribution',
        why: 'Any spatial distribution will have clusters purely by chance; users assume clusters indicate hotspots',
        fix: 'Show expected random distribution alongside actual data, or highlight only statistically significant clusters',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.HIGH,
        description:
          'Layout determines how data is spatially arranged, affecting pattern perception',
        examples: [
          'Grid layouts can make random distributions appear to have spatial patterns',
          'Timeline layouts emphasize temporal clusters that may be random',
          'Dashboard card ordering can create false narrative arcs from unrelated metrics',
          'Proximity of data points affects whether users perceive them as a meaningful cluster',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Text emphasis on numbers and metrics affects how strongly users perceive patterns',
        examples: [
          'Bold or large numbers draw attention to values that may be random fluctuations',
          'Streak counts displayed prominently imply the streak is meaningful',
          'Percentage changes in large text feel more significant than they are',
          'Labels like "trend" or "pattern" prime users to see order in noise',
        ],
      },
      color: {
        level: ImpactLevel.CRITICAL,
        description:
          'Color coding is one of the strongest drivers of pattern perception in data',
        examples: [
          'Red/green coloring on sequential data creates visual streaks that feel meaningful',
          'Heatmap colors make random spatial clusters appear as hotspots',
          'Color gradients on timelines suggest trends that may not exist',
          'Alternating colors that break on cluster boundaries reinforce illusory patterns',
        ],
      },
      interaction: {
        level: ImpactLevel.HIGH,
        description:
          'Interactive data exploration can amplify or mitigate clustering illusion',
        examples: [
          'Zoom controls that focus on short time windows amplify random clusters',
          'Tooltips on individual data points can make clusters feel more "real"',
          'Filtering controls that isolate subsets create small-sample illusions',
          'Animation of sequential data creates momentum perception in random sequences',
        ],
      },
      content: {
        level: ImpactLevel.CRITICAL,
        description:
          'How data is described and narrated directly shapes pattern perception',
        examples: [
          'Descriptions like "3 errors in a row" imply causation where there may be none',
          'Narrative summaries that connect unrelated data points reinforce illusory patterns',
          'Automated insight text that identifies "trends" without statistical backing misleads users',
          'Labels like "streak," "run," or "cluster" prime pattern-seeking behavior',
        ],
      },
      accessibility: {
        level: ImpactLevel.HIGH,
        description:
          'Accessible data presentation must account for pattern perception across modalities',
        examples: [
          'Screen reader users hearing sequential values may perceive streaks differently than visual users',
          'Sonification of data can create auditory clustering illusions',
          'Alternative text for charts should describe statistical significance, not just visual patterns',
          'Tactile displays of data need the same anti-clustering-illusion affordances as visual ones',
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
        title: 'Dashboard with Confidence Intervals',
        description:
          'Analytics dashboard showing metric trends with confidence bands and significance indicators',
        code: `<div class="metric-card">
  <h3>Daily Active Users</h3>
  <div class="chart-container">
    <svg class="trend-chart">
      <!-- Data line -->
      <path class="data-line" d="..." />
      <!-- Confidence interval band (shaded) -->
      <path class="confidence-band" d="..." opacity="0.2" />
      <!-- Expected range markers -->
      <line class="expected-upper" y1="..." y2="..." stroke-dasharray="4" />
      <line class="expected-lower" y1="..." y2="..." stroke-dasharray="4" />
    </svg>
  </div>
  <div class="stat-context">
    <span class="current">1,247 today</span>
    <span class="change neutral">+3.2%</span>
    <span class="significance">Within normal range (p = 0.42)</span>
  </div>
  <p class="helper-text">
    Daily variation of +/-8% is expected. Changes are highlighted
    only when statistically significant (p < 0.05).
  </p>
</div>`,
        explanation:
          'Confidence intervals show users what range of values is expected by chance. The significance indicator prevents users from over-interpreting a normal fluctuation as a meaningful trend.',
        principle:
          'Statistical context prevents users from seeing patterns in random noise',
        metrics: {
          before: '67% of users reported "concerning trends" when shown raw data',
          after: '18% reported "concerning trends" with confidence intervals shown',
          improvement: '73% reduction in false pattern detection',
        },
      },
      {
        title: 'A/B Test Results with Sample Size Warning',
        description:
          'Experiment results page that prevents premature pattern detection',
        code: `<div class="experiment-results">
  <h3>Experiment: New Checkout Flow</h3>

  <div class="results-summary">
    <div class="variant">
      <h4>Control</h4>
      <span class="rate">4.2% conversion</span>
      <span class="sample">(n = 847)</span>
    </div>
    <div class="variant">
      <h4>Treatment</h4>
      <span class="rate">4.8% conversion</span>
      <span class="sample">(n = 823)</span>
    </div>
  </div>

  <div class="significance-banner warning">
    <span class="icon">&#x26A0;</span>
    <p><strong>Not yet significant.</strong> Current difference (+0.6%)
    could easily occur by chance (p = 0.31). Need ~3,200 more
    observations to reach 95% confidence.</p>
  </div>

  <div class="random-comparison">
    <p class="label">What random looks like at this sample size:</p>
    <div class="simulated-runs">
      <!-- Shows 5 simulated random A/B results -->
      <span class="sim-result">+1.1%</span>
      <span class="sim-result">-0.8%</span>
      <span class="sim-result">+0.3%</span>
      <span class="sim-result">-1.4%</span>
      <span class="sim-result">+0.9%</span>
    </div>
    <p class="context">These differences came from random data with
    identical conversion rates.</p>
  </div>
</div>`,
        explanation:
          'By showing what purely random results look like at the same sample size, users can calibrate their intuition and avoid reading signal into noise.',
        principle:
          'Showing simulated random data helps users understand expected variation',
      },
      {
        title: 'Error Log with Statistical Baseline',
        description:
          'System monitoring dashboard that contextualizes error clusters',
        code: `<div class="error-monitor">
  <h3>Error Rate - Last 24 Hours</h3>

  <div class="error-timeline">
    <!-- Timeline showing error occurrences -->
    <div class="timeline-bar">
      <span class="error-dot" style="left: 12%"></span>
      <span class="error-dot" style="left: 14%"></span>
      <span class="error-dot" style="left: 15%"></span>
      <span class="error-dot" style="left: 45%"></span>
      <span class="error-dot" style="left: 78%"></span>
      <span class="error-dot" style="left: 92%"></span>
    </div>
    <div class="expected-range">
      <p>Expected: 4-8 errors per 24h at current traffic</p>
    </div>
  </div>

  <div class="cluster-analysis">
    <p class="finding">3 errors between 2:48-3:12 AM</p>
    <p class="assessment normal">
      <span class="badge">Expected</span>
      Clusters of 3 within a 30-min window occur ~2x per week
      at this error rate. No action needed.
    </p>
  </div>
</div>`,
        explanation:
          'Instead of alarming users about an error "cluster," the dashboard explains that such groupings are statistically expected, preventing unnecessary incident responses.',
        principle:
          'Baseline expectations prevent over-reaction to normal random clusters',
      },
    ],

    bad: [
      {
        title: 'Streak Indicators on Random Metrics',
        description:
          'Dashboard highlighting streaks that are statistically meaningless',
        code: `<!-- DON'T DO THIS -->
<div class="metric-card">
  <h3>Daily Sales</h3>
  <div class="streak-badge fire">&#x1F525; 3-Day Winning Streak!</div>
  <div class="daily-results">
    <span class="day up">Mon +2.1%</span>
    <span class="day up">Tue +0.8%</span>
    <span class="day up">Wed +1.5%</span>
  </div>
  <p class="narrative">Sales are on a roll! Keep the momentum going!</p>
</div>`,
        explanation:
          'Three consecutive up days is completely expected by random chance (12.5% probability). The fire emoji, "streak" language, and momentum narrative all reinforce a false pattern, potentially leading to poor business decisions.',
        principle:
          'Never label statistically expected variation as a meaningful streak',
      },
      {
        title: 'Trend Lines on Insufficient Data',
        description:
          'Chart drawing a confident trend line through sparse, noisy data',
        code: `<!-- DON'T DO THIS -->
<div class="chart-card">
  <h3>User Growth Trend</h3>
  <svg class="chart">
    <!-- Only 5 data points with high variance -->
    <circle cx="50" cy="180" r="4" />   <!-- 100 users -->
    <circle cx="150" cy="120" r="4" />  <!-- 150 users -->
    <circle cx="250" cy="160" r="4" />  <!-- 120 users -->
    <circle cx="350" cy="90" r="4" />   <!-- 180 users -->
    <circle cx="450" cy="70" r="4" />   <!-- 200 users -->
    <!-- Bold trend line suggesting strong growth -->
    <line x1="50" y1="175" x2="450" y2="75"
      stroke="#22c55e" stroke-width="3" />
  </svg>
  <p class="trend-label" style="color: green;">
    &#x2191; Strong upward trend detected!
  </p>
</div>`,
        explanation:
          'Five data points with high variance cannot establish a reliable trend. The bold green line and "strong upward trend" label give users false confidence in what could easily be random fluctuation. An R-squared of ~0.6 on 5 points is not meaningful.',
        principle:
          'Trend lines without confidence intervals and significance tests mislead users',
      },
      {
        title: 'Click Heatmap Without Random Baseline',
        description:
          'Heatmap showing click "hotspots" that may be random clustering',
        code: `<!-- DON'T DO THIS -->
<div class="heatmap-panel">
  <h3>Click Hotspots Detected!</h3>
  <div class="heatmap-overlay">
    <img src="page-screenshot.png" alt="Page with heatmap overlay" />
    <!-- Red "hotspot" circles on random click clusters -->
    <div class="hotspot critical" style="top: 30%; left: 60%;">
      <span class="label">Hotspot! 7 clicks</span>
    </div>
    <div class="hotspot warning" style="top: 65%; left: 25%;">
      <span class="label">Hotspot! 5 clicks</span>
    </div>
  </div>
  <p class="insight">Users are strongly drawn to these areas!</p>
</div>`,
        explanation:
          'With only a handful of clicks, any spatial distribution will have apparent clusters by pure chance. Labeling 5-7 clicks as a "hotspot" with urgent styling leads designers to redesign pages based on random noise. No comparison to expected random distribution is provided.',
        principle:
          'Spatial clusters require comparison to random baselines before drawing conclusions',
      },
    ],

    realWorld: [
      {
        company: 'Robinhood',
        product: 'Stock Charts',
        description: 'Stock trading apps show price charts where users inevitably see patterns in random walks. Short time windows (1D, 1W) make random noise look like trends, encouraging over-trading. Some platforms have added smoothing and longer default time horizons to mitigate this.',
        effectiveness: 'somewhat-effective',
        analysis: 'Financial charts are the canonical example of clustering illusion at scale. The short default time windows amplify perceived patterns in random price movements, driving excess trading that costs users money.',
      },
      {
        company: 'Google Analytics',
        product: 'Real-Time Dashboard',
        description: 'Google Analytics provides real-time visitor counts and page views. The live-updating numbers create a stream where users see "surges" and "drops" that are often normal variation. The annotations and comparison features help contextualize the data.',
        effectiveness: 'effective',
        analysis: 'The comparison to previous periods and the ability to zoom out to longer time horizons helps users distinguish real trends from noise, though the real-time view still triggers clustering illusion.',
      },
      {
        company: 'Optimizely',
        product: 'Experiment Results',
        description: 'Optimizely\'s experiment results page prominently displays statistical significance, confidence intervals, and a "Stats Engine" that prevents premature conclusions. Results are explicitly labeled as significant or inconclusive.',
        effectiveness: 'very-effective',
        analysis: 'By making statistical significance the primary signal and graying out inconclusive results, Optimizely actively combats users\' tendency to see patterns in early, noisy experiment data. This is a gold standard for anti-clustering-illusion design.',
      },
      {
        company: 'Datadog',
        product: 'Anomaly Detection',
        description: 'Datadog\'s monitoring dashboards show expected bounds (gray bands) around metrics, only alerting when values exceed statistical thresholds. Normal clusters within the band are visually de-emphasized.',
        effectiveness: 'very-effective',
        analysis: 'The expected-bounds approach directly addresses clustering illusion by showing users what normal variation looks like. Only statistically anomalous deviations trigger visual alerts, preventing false pattern detection in routine metric fluctuations.',
      },
    ],

    abTests: [
      {
        title: 'Dashboard Trend Display: Raw Data vs Statistical Context',
        hypothesis:
          'Adding confidence intervals and significance markers will reduce false trend identification and improve decision quality',
        controlVersion: {
          description:
            'Analytics dashboard showing raw daily metrics with color-coded up/down arrows and streak counters',
          metrics: {
            conversionRate: '78% reported seeing "clear trends"',
            timeOnPage: '2:15',
            scrollDepth: '55%',
          },
        },
        treatmentVersion: {
          description:
            'Same metrics with confidence intervals, significance indicators, and "expected range" context',
          metrics: {
            conversionRate: '31% reported seeing "clear trends"',
            timeOnPage: '3:45',
            scrollDepth: '82%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'The treatment version reduced false trend identification by 60%. Users spent more time analyzing data and made significantly better decisions in a follow-up task where they had to distinguish real trends from random data.',
          learnings: [
            'Confidence intervals dramatically reduce false pattern perception',
            'Users initially resist the added complexity but quickly learn to value it',
            'Significance markers are most effective when binary (significant/not significant) rather than gradual',
            'Showing "what random looks like" was the single most effective element for calibrating user intuition',
          ],
        },
      },
      {
        title: 'Error Monitoring: Cluster Alerts vs Contextualized Clusters',
        hypothesis:
          'Showing expected cluster frequency will reduce unnecessary incident escalations',
        controlVersion: {
          description:
            'Error monitoring dashboard that highlights all clusters of 3+ errors within 30 minutes with red alerts',
          metrics: {
            conversionRate: '4.2 escalations per week',
            clickThroughRate: '89% alert click-through',
          },
        },
        treatmentVersion: {
          description:
            'Same dashboard but clusters are compared to expected frequency; only statistically unusual clusters get red alerts, expected ones get gray "normal" badges',
          metrics: {
            conversionRate: '1.1 escalations per week',
            clickThroughRate: '95% alert click-through on real anomalies',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'False escalations dropped by 74%. When real anomalies occurred, the response rate was higher because alert fatigue was eliminated. Teams trusted the alerting system more and responded faster to genuine incidents.',
          learnings: [
            'Contextualizing clusters against expected rates is more effective than raw thresholds',
            'Reduced false alerts increased trust in the alerting system overall',
            'Teams saved an estimated 6 hours per week previously spent investigating random clusters',
            'The "expected frequency" label was the key element in changing user behavior',
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
        name: 'Streak Indicators',
        description:
          'Badges, labels, or counters highlighting consecutive outcomes (winning streaks, error runs, growth days)',
        howToSpot: 'Look for fire emojis, streak counters, "X days in a row" labels, or momentum language',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Uncontextualized Trend Lines',
        description:
          'Trend lines drawn through data without confidence intervals or significance indicators',
        howToSpot: 'Check for bold trend lines on charts with few data points or high variance, missing confidence bands',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Heatmaps Without Baselines',
        description:
          'Spatial heatmaps showing "hotspots" without comparison to expected random distribution',
        howToSpot: 'Look for heatmap overlays that label clusters without indicating statistical significance or sample size',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Short Time Window Defaults',
        description:
          'Dashboards defaulting to very short time windows (1 day, 1 hour) where random noise dominates',
        howToSpot: 'Check default date ranges and whether users see high-variance short-term data by default',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Color-Coded Sequential Outcomes',
        description:
          'Red/green coloring applied to each data point in a sequence, creating visual streaks',
        howToSpot: 'Look for color-alternating lists or timelines where each item is colored by up/down or pass/fail',
        severity: ImpactLevel.HIGH,
      },
    ],

    patterns: [
      {
        name: 'Raw Streak Pattern',
        description: 'Consecutive outcomes highlighted without statistical context about expected run lengths',
        indicators: ['Streak counters or badges', '"X in a row" labels', 'Momentum or trend narrative text', 'Fire/rocket/growth emojis on consecutive outcomes'],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Overfit Trend Pattern',
        description: 'Trend lines or forecasts drawn from insufficient data, implying patterns where none may exist',
        indicators: ['Trend lines on fewer than 20 data points', 'Missing confidence intervals', 'No R-squared or significance value displayed', '"Trend detected" labels without statistical backing'],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Small Sample Alarm Pattern',
        description: 'Dramatic percentage changes or alerts triggered from tiny sample sizes where high variance is expected',
        indicators: ['Percentage changes with no sample size shown', 'Red/green alerts on daily metrics with few observations', 'Automated "anomaly" labels without statistical thresholds', 'Comparison to previous period with no significance test'],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Spatial Cluster Alarm Pattern',
        description: 'Heatmaps or spatial visualizations highlighting clusters without comparing to random baselines',
        indicators: ['Click heatmap "hotspot" labels', 'Geographic cluster highlights', 'Spatial density visualizations without expected distribution overlay', 'Small sample spatial data with alarming colors'],
        severity: ImpactLevel.MEDIUM,
        confidence: 'medium',
      },
    ],

    checklistQuestions: [
      'Are trend lines accompanied by confidence intervals and significance indicators?',
      'Do streak or run indicators include context about expected run lengths by chance?',
      'Are sample sizes displayed alongside percentages and rates?',
      'Do heatmaps compare to expected random distributions?',
      'Is the default time window long enough to reduce noise-driven pattern perception?',
      'Are automated "trend" or "pattern" labels backed by statistical tests?',
      'Can users easily zoom out to longer time horizons for context?',
      'Are red/green color codings on sequential data points creating false visual patterns?',
      'Do dashboards show what random variation looks like at the current data volume?',
      'Are users given tools to distinguish signal from noise (smoothing, significance, sample size)?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in the clustering illusion.

Analyze the provided design for clustering illusion patterns. Identify:

1. **Streak/Run Emphasis**: How consecutive outcomes are displayed and whether context is provided
2. **Trend Line Validity**: Whether trend visualizations have proper statistical backing
3. **Sample Size Context**: Whether data volumes are shown alongside derived metrics
4. **Spatial Clustering**: Whether heatmaps or spatial data are compared to random baselines
5. **Time Window Defaults**: Whether default views amplify noise-driven pattern perception

For each pattern found:
- Identify what random variation might be misinterpreted as a meaningful pattern
- Assess whether statistical context is provided to calibrate user interpretation
- Determine if the presentation could lead to poor decisions based on illusory patterns
- Evaluate whether the design helps or hinders accurate data interpretation
- Suggest specific improvements for preventing false pattern perception

Consider:
- Are users likely to see trends in what is actually random noise?
- Are streak indicators or cluster highlights backed by statistical significance?
- Could the time window or sample size create misleading patterns?
- Are there tools for users to distinguish signal from noise?
- Would showing expected random variation improve user decision-making?

Provide actionable recommendations for preventing clustering illusion in data presentation.`,

    outputSchema: {
      type: 'object',
      properties: {
        clusteringPatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              dataPresented: { type: 'string' },
              statisticalContext: { type: 'string' },
              illusionRisk: { type: 'string' },
              potentialConsequence: { type: 'string' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'dataPresented',
              'illusionRisk',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            statisticalContextScore: { type: 'number' },
            noiseVsSignalClarity: { type: 'number' },
            sampleSizeTransparency: { type: 'number' },
            falsePatternRisk: { type: 'number' },
          },
          required: [
            'statisticalContextScore',
            'noiseVsSignalClarity',
            'sampleSizeTransparency',
            'falsePatternRisk',
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
        'clusteringPatterns',
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
        title: 'Identify Pattern-Prone Data Displays',
        description:
          'Audit your interface for any place where sequential, temporal, or spatial data is shown that users might over-interpret',
        example:
          'Map all charts, timelines, heatmaps, streak counters, and trend indicators in the product',
        tips: [
          'Pay special attention to time-series data with high variance',
          'Identify anywhere users make decisions based on data patterns',
          'Check for automated "trend" or "pattern" labels',
        ],
      },
      {
        step: 2,
        title: 'Add Statistical Context',
        description:
          'For every data visualization, add context that helps users distinguish signal from noise',
        example:
          'Add confidence intervals to trend lines, show expected ranges, display sample sizes',
        tips: [
          'Confidence intervals are the single most effective anti-clustering tool',
          'Show what random variation looks like at the current sample size',
          'Display significance indicators (significant/not significant) prominently',
        ],
      },
      {
        step: 3,
        title: 'Set Appropriate Default Time Windows',
        description:
          'Choose default viewing windows that reduce noise-driven pattern perception',
        example:
          'Default to 30-day view instead of 1-day view for daily metrics with high variance',
        tips: [
          'Longer windows smooth out random clusters',
          'Offer multiple time horizons but default to one where real trends are visible',
          'Add moving average overlays for short time windows',
        ],
      },
      {
        step: 4,
        title: 'Contextualize Streaks and Clusters',
        description:
          'When highlighting runs or clusters, always compare to expected frequency by chance',
        example:
          'Instead of "5-day streak!" show "5 consecutive up days (expected ~once per month by chance)"',
        tips: [
          'Calculate expected run lengths for your data\'s parameters',
          'Only use alert-level styling for statistically unusual clusters',
          'Use neutral styling for expected-frequency clusters',
        ],
      },
      {
        step: 5,
        title: 'Test User Interpretation',
        description:
          'Validate that users can distinguish real trends from random noise with your interface',
        example:
          'Show users dashboards with known-random data and measure how many "detect patterns"',
        tips: [
          'High false-pattern detection rate means your design needs more statistical context',
          'A/B test with and without confidence intervals',
          'Ask users to rate their confidence in detected patterns',
        ],
      },
    ],

    dos: [
      'Show confidence intervals on all trend lines and forecasts',
      'Display sample sizes alongside percentages and rates',
      'Compare observed clusters to expected random frequency',
      'Default to time windows long enough to show real trends above noise',
      'Provide smoothing controls (moving averages) for noisy data',
      'Label statistical significance explicitly on all data comparisons',
      'Show simulated random data so users can calibrate their expectations',
      'Use neutral styling for clusters within expected ranges',
    ],

    donts: [
      'Don\'t highlight streaks without indicating whether they\'re statistically unusual',
      'Don\'t draw trend lines through fewer than 20 data points without confidence intervals',
      'Don\'t use red/green sequential coloring that creates false visual patterns',
      'Don\'t show heatmaps without comparison to expected random distribution',
      'Don\'t default to time windows where random noise dominates the signal',
      'Don\'t use excitement language ("hot streak!", "on fire!") for statistically expected runs',
      'Don\'t suppress sample sizes to make percentages look more impressive',
      'Don\'t let automated insights label random variation as "trends" or "patterns"',
    ],

    bestPractices: [
      {
        title: 'Always Show Confidence Intervals',
        description:
          'Every trend line, forecast, or comparison should include confidence bands',
        rationale:
          'Confidence intervals are the most effective visual tool for communicating uncertainty and preventing false pattern detection',
        example:
          'Gray shaded band around trend line showing 95% confidence interval',
      },
      {
        title: 'Provide Random Baselines',
        description:
          'Show users what random data looks like at their current sample size',
        rationale:
          'Users cannot intuitively judge randomness; showing examples calibrates their expectations',
        example:
          '"Here are 5 simulated random results at your sample size" next to actual experiment results',
      },
      {
        title: 'Use Statistical Significance Gates',
        description:
          'Only apply alert styling and trend labels to statistically significant changes',
        rationale:
          'Visual salience implies importance; reserve it for genuinely unusual patterns',
        example:
          'Gray "within normal range" badge for expected clusters, red alert only for p < 0.05 anomalies',
      },
      {
        title: 'Default to Longer Time Windows',
        description:
          'Set default viewing windows where real trends are distinguishable from noise',
        rationale:
          'Short windows amplify clustering illusion; longer windows reveal actual trends',
        example:
          'Default to 30-day view with option to zoom to daily; show moving average on daily view',
      },
      {
        title: 'Display Sample Size Prominently',
        description:
          'Always show the number of observations alongside any derived metric',
        rationale:
          'Small samples produce dramatic but meaningless patterns; showing N helps users calibrate',
        example:
          '"4.8% conversion rate (n = 47)" with a note "Need ~500 observations for reliable rates"',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '1.1.1',
        guideline:
          'Non-text Content - Chart alt text should describe statistical significance, not just visual patterns',
        implementation:
          'Write alt text like "Trend line showing 3% growth, not statistically significant (p=0.4), within normal range" rather than "Upward trending line"',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.4.1',
        guideline:
          'Use of Color - Don\'t rely solely on red/green to indicate trend direction',
        implementation:
          'Combine color with text labels, icons (arrows), and patterns so all users perceive trend indicators regardless of color vision',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships - Statistical context must be programmatically associated with data',
        implementation:
          'Use aria-describedby to link confidence intervals and significance markers to their data points for screen reader users',
      },
    ],

    ethics: [
      {
        concern: 'Exploiting Pattern Perception for Engagement',
        severity: 'critical',
        explanation:
          'Deliberately framing random outcomes as meaningful streaks to drive compulsive engagement (e.g., gambling apps, trading platforms)',
        mitigation:
          'Never apply streak or momentum framing to random outcomes. If outcomes are random, say so clearly.',
      },
      {
        concern: 'Presenting Noise as Signal for Upselling',
        severity: 'high',
        explanation:
          'Showing "trends" or "patterns" in insufficient data to sell premium analytics, reporting, or advisory services',
        mitigation:
          'Only present trends that meet statistical significance thresholds. Clearly label insufficient data as inconclusive.',
      },
      {
        concern: 'Hiding Randomness to Maintain Perceived Value',
        severity: 'high',
        explanation:
          'Suppressing confidence intervals or sample sizes because they would reveal that "insights" are based on noise',
        mitigation:
          'Always show statistical context even when it reduces the perceived impressiveness of results.',
      },
      {
        concern: 'Automated Insights Without Statistical Backing',
        severity: 'medium',
        explanation:
          'AI-generated dashboard narratives that describe random clusters as meaningful trends without statistical tests',
        mitigation:
          'Require all automated insight text to pass significance tests before presenting pattern language to users.',
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
          'The foundational paper demonstrating clustering illusion through analysis of basketball shooting sequences',
        type: 'foundational',
      },
      {
        title: 'Judgment under Uncertainty: Heuristics and Biases',
        author: 'Tversky, A., & Kahneman, D.',
        year: 1974,
        doi: '10.1126/science.185.4157.1124',
        description:
          'Introduced the representativeness heuristic that underlies the clustering illusion',
        type: 'foundational',
      },
      {
        title: 'The Perception of Randomness',
        author: 'Nickerson, R. S.',
        year: 2002,
        doi: '10.1037/0033-295X.109.2.330',
        description:
          'Comprehensive review of how humans perceive and misperceive randomness',
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
          'Covers the representativeness heuristic and pattern perception biases that underlie the clustering illusion',
        type: 'foundational',
      },
      {
        title: 'The Drunkard\'s Walk: How Randomness Rules Our Lives',
        author: 'Mlodinow, Leonard',
        year: 2008,
        isbn: '9780307275172',
        description:
          'Accessible exploration of how humans misperceive random patterns in everyday life',
        type: 'practical',
      },
      {
        title: 'Fooled by Randomness',
        author: 'Taleb, Nassim Nicholas',
        year: 2005,
        isbn: '9780812975215',
        description:
          'Explores how we mistake random patterns for skill in financial markets and life decisions',
        type: 'practical',
      },
    ],

    articles: [
      {
        title: 'The Clustering Illusion',
        author: 'Skeptic\'s Dictionary',
        url: 'https://skepdic.com/clusterillusion.html',
        description:
          'Accessible overview of clustering illusion with examples from cancer clusters, sports, and gambling',
        type: 'practical',
      },
      {
        title: 'Designing Better Data Visualizations for Decision-Making',
        author: 'Nielsen Norman Group',
        url: 'https://www.nngroup.com/articles/data-visualization-guidelines/',
        description:
          'Practical UX guidelines for presenting data without triggering pattern-perception biases',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'The Hot Hand Fallacy',
        author: 'Veritasium',
        url: 'https://www.youtube.com/watch?v=bPZFQ6i759g',
        description:
          'Engaging video explaining the clustering illusion through the hot hand debate in basketball',
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
