/**
 * REGRESSION TOWARD THE MEAN
 *
 * Extreme outcomes tend to be followed by more moderate ones;
 * we mistake natural variation for meaningful change.
 */

import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const regressionTowardMean: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'regression-toward-mean',
    name: 'Regression Toward the Mean',
    aliases: ['Regression to the Mean', 'Regression Fallacy', 'Mean Reversion'],
    category: BiasCategory.COGNITIVE,
    relatedCategories: [
      BiasCategory.DECISION_MAKING,
      BiasCategory.PERCEPTION,
    ],
    tags: [
      'statistics',
      'trend-analysis',
      'performance',
      'data-visualization',
      'decision-making',
      'analytics',
      'variation',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple:
      'We expect extreme outcomes to continue rather than recognizing they will naturally drift back toward the average.',

    detailed: `Regression toward the mean is the statistical phenomenon where extreme measurements tend to be followed by more moderate ones, simply because extreme values are less likely to recur. When people fail to account for this, they attribute natural variation to meaningful causes -- punishing employees after a bad quarter or celebrating a new strategy after a good one, when both outcomes may simply reflect normal fluctuation.

This bias is especially dangerous in data-driven environments: dashboards, analytics platforms, A/B testing tools, and performance reviews. A single-day traffic spike is not a trend; a record-breaking sales week is not proof that a new campaign works. Without understanding regression, teams overreact to noise, attribute random outcomes to interventions, and make costly decisions based on statistical artifacts.

In UX and product design, regression toward the mean affects how users interpret charts, trends, and performance metrics. Designers must help users distinguish signal from noise by providing context -- moving averages, confidence intervals, historical baselines -- so that natural variation is not mistaken for meaningful change.`,

    psychologyBasis: {
      discoveredBy: 'Sir Francis Galton',
      year: 1886,
      theory: 'Regression to Mediocrity in Hereditary Stature',
      mechanism: `Regression toward the mean is a statistical inevitability, not a causal force. It occurs because:

1. **Extreme values are partly luck**: Any measurement combines true ability/signal with random variation. An extreme result typically has an unusually large random component.
2. **Random variation is unlikely to repeat**: The lucky (or unlucky) random component is unlikely to be equally extreme on the next measurement.
3. **True value persists, noise does not**: The underlying signal stays roughly the same, but the noise regresses, pulling the total measurement toward the average.
4. **Causal illusion**: People invent causal explanations for what is simply statistical regression -- praising a coach after a rebound, blaming a manager after a dip.
5. **Asymmetric attribution**: When performance improves after criticism, we credit the criticism; when it declines after praise, we blame the praise. Both may simply be regression.

Kahneman describes this as one of the most fundamental and least intuitive statistical facts, responsible for widespread errors in medicine, education, sports, and business.`,
    },

    realWorldExample: `The "Sports Illustrated Cover Jinx" is a classic example: athletes who appear on the cover after an exceptional season tend to perform worse the following year. Fans attribute the decline to a "curse," but the real explanation is regression toward the mean -- the athlete's peak performance included an unusually favorable random component that is unlikely to repeat.

Similarly, in business, a sales team that has a record-breaking quarter will almost certainly have a more typical quarter next -- regardless of whether management changes strategy. If leadership introduced a new process after the great quarter, they'll blame the new process for the decline. If they changed nothing, they'll still see decline and search for a cause. The cause is simply mathematics.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `Regression toward the mean fundamentally affects how users interpret data in dashboards, analytics tools, and performance tracking interfaces. Designers must:

- Present trend lines and moving averages alongside raw data to show the underlying signal
- Provide historical context so users can distinguish anomalies from trends
- Add confidence intervals and expected ranges to set realistic expectations
- Design alerts that account for natural variation rather than firing on every spike
- Frame performance changes with statistical context to prevent overreaction`,

    whenToUse: [
      {
        title: 'Performance Dashboards',
        scenario:
          'When displaying KPIs, metrics, or performance data over time',
        example:
          'Show a 7-day moving average alongside daily values so users see the trend, not the noise',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'A/B Test Interpretation',
        scenario: 'When displaying experiment results and statistical significance',
        example:
          'Show confidence intervals and required sample sizes to prevent premature conclusions from early extreme results',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Anomaly Detection Alerts',
        scenario: 'When alerting users to unusual values in metrics or system health',
        example:
          'Set alert thresholds based on standard deviations from the mean rather than absolute values, reducing false positives from natural variation',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Employee Performance Reviews',
        scenario: 'When designing tools for performance evaluation and tracking',
        example:
          'Show performance over multiple periods with trend bands rather than comparing individual quarters',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Health and Fitness Tracking',
        scenario: 'When displaying weight, blood pressure, or exercise metrics',
        example:
          'Display rolling averages and normal ranges so users do not panic over single-day fluctuations in weight or blood pressure',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Financial Dashboards',
        scenario: 'When showing investment returns, revenue, or financial metrics',
        example:
          'Present returns alongside historical averages and show that an exceptional month is likely to be followed by a more typical one',
        impact: ImpactLevel.CRITICAL,
      },
    ],

    whenToAvoid: [
      {
        title: 'Genuine Trend Changes',
        reason:
          'Not every change is regression -- some shifts reflect real structural changes',
        consequence:
          'Dismissing real signals as noise if regression framing is applied too aggressively',
        alternative:
          'Provide both regression context and trend-change indicators (e.g., breakpoint detection) so users can distinguish',
      },
      {
        title: 'Crisis Communication',
        reason:
          'Telling users a spike in errors is "just regression" undermines trust when there is a real problem',
        consequence:
          'Users lose confidence in the system and may ignore future alerts',
        alternative:
          'Investigate anomalies before labeling them as regression; use regression context only when confirmed',
      },
      {
        title: 'Motivation and Gamification',
        reason:
          'Over-emphasizing regression can demotivate users by framing personal bests as "just luck"',
        consequence:
          'Reduced engagement and a sense that effort does not matter',
        alternative:
          'Acknowledge improvement trends while providing context about variation; celebrate sustained above-average performance',
      },
      {
        title: 'Low-Frequency Events',
        reason:
          'Regression toward the mean requires a pattern of repeated measurement; single rare events are different',
        consequence:
          'Misapplying regression logic to one-time events can cause dismissal of important signals',
        alternative:
          'Apply regression context only to repeated, measurable processes with enough data points',
      },
    ],

    commonMistakes: [
      {
        title: 'Showing Only Raw Data',
        description:
          'Displaying only daily or hourly data points without smoothing, averages, or trend lines',
        why: 'Raw data amplifies noise and makes natural variation look like meaningful change',
        fix: 'Overlay moving averages, trend lines, or confidence bands on raw data charts',
      },
      {
        title: 'Alerting on Single-Point Spikes',
        description:
          'Firing alerts or notifications based on a single extreme value',
        why: 'Most single-point spikes are natural variation and will regress; excessive alerts cause alert fatigue',
        fix: 'Require sustained deviation over multiple data points or use z-score thresholds before alerting',
      },
      {
        title: 'Comparing Peaks to Troughs',
        description:
          'Cherry-picking the best and worst periods for comparison, ignoring the regression context',
        why: 'This guarantees dramatic but misleading deltas -- the peak was above average and the trough below',
        fix: 'Compare to the baseline mean or median; show where each data point falls within the normal distribution',
      },
      {
        title: 'Attributing Regression to Interventions',
        description:
          'Crediting (or blaming) a change in strategy for what is simply regression to the mean',
        why: 'If you intervene after an extreme value, the next value will likely regress regardless of the intervention',
        fix: 'Use control groups, show pre-intervention trends, and require statistical significance before attributing causation',
      },
      {
        title: 'Missing Historical Context',
        description:
          'Displaying current performance without showing historical baseline or normal range',
        why: 'Without context, users cannot tell if a value is extreme or typical',
        fix: 'Always show current value relative to historical mean, range, and standard deviation',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.HIGH,
        description:
          'Layout determines whether users see raw data in isolation or with contextual information',
        examples: [
          'Side-by-side placement of current value and historical average',
          'Sparklines in dashboards showing trend alongside single numbers',
          'Inline context showing normal range next to each metric',
          'Dashboard cards with both current and rolling average values',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Text size and emphasis can either amplify overreaction or provide calming context',
        examples: [
          'Large type on a single metric without context encourages overreaction',
          'Smaller contextual text like "within normal range" tempers extreme values',
          'Consistent type hierarchy between current values and averages signals equal importance',
          'Annotation text on charts explaining expected variation',
        ],
      },
      color: {
        level: ImpactLevel.HIGH,
        description:
          'Color coding affects whether users perceive a value as alarming or normal',
        examples: [
          'Green/red coloring on daily changes exaggerates the significance of normal variation',
          'Muted colors for values within expected range, vivid colors only for true outliers',
          'Gradient shading showing confidence intervals and expected ranges',
          'Consistent neutral colors for values within one standard deviation of the mean',
        ],
      },
      interaction: {
        level: ImpactLevel.HIGH,
        description:
          'Interactive elements can help users explore context or reinforce overreaction',
        examples: [
          'Hover tooltips showing where a value falls in the historical distribution',
          'Toggle between raw data and smoothed/averaged views',
          'Drill-down interactions that show whether a spike is sustained or isolated',
          'Time-range selectors that allow users to zoom out and see broader trends',
        ],
      },
      content: {
        level: ImpactLevel.CRITICAL,
        description:
          'How data is narrated and explained determines whether users understand or misinterpret variation',
        examples: [
          'Narrative summaries like "This week\'s numbers are within the typical range for your account"',
          'Contextual labels such as "Expected range: 450-580" next to a metric showing 470',
          'Explanatory text for anomalies: "This spike is 2.1 standard deviations above your 30-day average"',
          'Comparative framing: "Performance returned to average after last week\'s unusually high result"',
        ],
      },
      accessibility: {
        level: ImpactLevel.HIGH,
        description:
          'Regression context must be available to all users, not just those who can see visual trends',
        examples: [
          'Screen reader text that announces both the current value and its relationship to the average',
          'Alt text on charts that describes the trend, not just individual data points',
          'ARIA descriptions for confidence intervals and expected ranges',
          'Keyboard-accessible tooltips with historical context for each data point',
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
        title: 'Analytics Dashboard with Moving Average',
        description:
          'Website traffic dashboard showing raw daily data with a 7-day moving average overlay',
        code: `<div class="metric-card">
  <h3>Daily Active Users</h3>
  <div class="metric-value">
    <span class="current">12,847</span>
    <span class="context">7-day avg: 11,230</span>
  </div>
  <div class="chart-container">
    <svg class="line-chart" aria-label="Daily active users over 30 days with 7-day moving average">
      <!-- Raw daily data (thin, muted line) -->
      <path class="raw-data" d="..." stroke="var(--cg-color-neutral-300)" />
      <!-- 7-day moving average (bold, primary line) -->
      <path class="moving-avg" d="..." stroke="var(--cg-color-primary-500)" />
      <!-- Expected range band (shaded area) -->
      <rect class="expected-range" fill="var(--cg-color-primary-100)" opacity="0.3" />
    </svg>
  </div>
  <p class="insight">
    Today's value is within normal variation.
    The 7-day trend is stable.
  </p>
</div>`,
        explanation:
          'The moving average smooths natural day-to-day variation, showing the real trend. The expected range band gives users a visual sense of what constitutes normal fluctuation. The contextual text prevents overreaction to a single-day number.',
        principle:
          'Smoothed trend lines and expected ranges prevent mistaking noise for signal',
        metrics: {
          before: '67% of users flagged normal daily variation as "concerning"',
          after: '18% flagged normal variation after adding moving average and range context',
          improvement: '73% reduction in false concern from natural variation',
        },
      },
      {
        title: 'A/B Test Results with Confidence Context',
        description:
          'Experiment results page showing statistical significance and expected variation',
        code: `<div class="experiment-results">
  <h3>Experiment: New Checkout Flow</h3>
  <div class="result-summary">
    <div class="variant">
      <h4>Control</h4>
      <span class="rate">3.2%</span>
      <span class="ci">CI: 2.8% - 3.6%</span>
    </div>
    <div class="variant treatment">
      <h4>Treatment</h4>
      <span class="rate">3.5%</span>
      <span class="ci">CI: 3.0% - 4.0%</span>
    </div>
  </div>
  <div class="significance">
    <span class="badge caution">Not Yet Significant</span>
    <p>Confidence intervals overlap. The observed difference (+0.3pp)
       is within expected variation. Collect 2,400 more samples
       before drawing conclusions.</p>
  </div>
  <div class="context-note">
    <p>Early results often show extreme differences that
       regress as sample size grows. Wait for statistical
       significance before acting.</p>
  </div>
</div>`,
        explanation:
          'Showing confidence intervals, significance status, and an explicit warning about early-result regression prevents teams from prematurely declaring winners based on small samples where extreme results are likely to regress.',
        principle:
          'Confidence intervals and significance thresholds prevent premature conclusions from noisy early data',
      },
      {
        title: 'Performance Review with Trend Context',
        description:
          'Employee performance dashboard showing multi-quarter trends with baseline',
        code: `<div class="performance-review">
  <h3>Sales Performance: Q1-Q4</h3>
  <div class="chart-with-baseline">
    <svg aria-label="Quarterly sales with team average baseline">
      <!-- Team average baseline -->
      <line class="baseline" y1="50%" y2="50%"
            stroke="var(--cg-color-neutral-400)" stroke-dasharray="4" />
      <text class="baseline-label">Team Average: $142K</text>
      <!-- Quarterly bars -->
      <rect class="q1" height="60%" /> <!-- $165K - above average -->
      <rect class="q2" height="38%" /> <!-- $118K - below average -->
      <rect class="q3" height="52%" /> <!-- $148K - near average -->
      <rect class="q4" height="55%" /> <!-- $155K - near average -->
    </svg>
  </div>
  <div class="context">
    <p>Q1 was an unusually strong quarter. The dip in Q2 is consistent
       with regression toward the mean rather than declining performance.
       Q3 and Q4 confirm a stable performance around the team average.</p>
  </div>
</div>`,
        explanation:
          'The baseline, multi-quarter view, and explanatory text help managers understand that Q2\'s dip after Q1\'s peak is expected regression, not a performance problem requiring intervention.',
        principle:
          'Multi-period views with baselines prevent overreacting to natural performance variation',
      },
    ],

    bad: [
      {
        title: 'Single-Day Panic Dashboard',
        description:
          'Analytics dashboard showing only today\'s numbers with no context',
        code: `<!-- DON'T DO THIS -->
<div class="dashboard">
  <div class="metric alert-red">
    <h3>Daily Revenue</h3>
    <span class="value">$8,247</span>
    <span class="change negative">-23% vs yesterday</span>
    <span class="status">CRITICAL</span>
  </div>
  <div class="action-prompt">
    <p>Revenue has dropped significantly! Take immediate action.</p>
    <button class="urgent">Investigate Now</button>
  </div>
</div>`,
        explanation:
          'Comparing to a single previous day with no historical context causes panic over normal variation. If yesterday was unusually high, today\'s "drop" is simply regression. Without a baseline, moving average, or expected range, every natural fluctuation looks like a crisis.',
        principle:
          'Never compare to a single data point without showing historical context and expected variation',
      },
      {
        title: 'Celebrating One Good Week',
        description:
          'Marketing dashboard attributing a traffic spike to a campaign without statistical context',
        code: `<!-- DON'T DO THIS -->
<div class="campaign-results">
  <h2>Campaign Results: Incredible Success!</h2>
  <div class="metric">
    <span class="value">+47% traffic</span>
    <span class="period">This week vs last week</span>
  </div>
  <p class="conclusion">The new campaign is driving massive growth!
     Recommend increasing budget by 3x.</p>
</div>`,
        explanation:
          'Comparing one week to one week and attributing the difference to a campaign ignores regression. If last week was below average, any normal week would look like a massive improvement. Without longer trend data, confidence intervals, or a control group, the attribution is baseless.',
        principle:
          'Never attribute improvement to an intervention without controlling for regression to the mean',
      },
      {
        title: 'Overreacting to Health Metrics',
        description:
          'Fitness app alarming users about normal day-to-day weight fluctuation',
        code: `<!-- DON'T DO THIS -->
<div class="health-alert">
  <h3 style="color: red;">Weight Gain Alert!</h3>
  <p>You gained 1.2 kg since yesterday!</p>
  <p>At this rate, you will gain 8.4 kg this month.</p>
  <button class="danger">Adjust Diet Plan</button>
</div>`,
        explanation:
          'Daily weight fluctuates 1-2 kg due to hydration, food intake, and other factors. Extrapolating a single day\'s change linearly is a textbook failure to account for regression. This creates unnecessary anxiety and may drive unhealthy behavior.',
        principle:
          'Never extrapolate a single extreme measurement as a trend; show rolling averages and normal ranges',
      },
    ],

    realWorld: [
      {
        company: 'Fitbit',
        product: 'Health Metrics Dashboard',
        description: 'Fitbit displays resting heart rate and weight as rolling 30-day averages with a trend line, de-emphasizing day-to-day variation. Single days are visible but the average is the primary metric.',
        effectiveness: 'very-effective',
        analysis: 'By presenting the moving average as the primary number, Fitbit helps users focus on genuine trends rather than panicking about normal daily fluctuations. The design implicitly teaches users about regression without requiring statistical literacy.',
      },
      {
        company: 'Google Analytics',
        product: 'Trend Comparison',
        description: 'Google Analytics defaults to showing data over 28 days with comparison periods and trend lines. Hovering on any data point shows the value relative to the period average.',
        effectiveness: 'effective',
        analysis: 'The default 28-day window and comparison periods help users see whether a spike is part of a larger trend or an isolated fluctuation. However, the daily view still lacks explicit regression context.',
      },
      {
        company: 'Stripe',
        product: 'Revenue Dashboard',
        description: 'Stripe\'s revenue dashboard shows daily, weekly, and monthly views with clear period-over-period comparisons and smoothed trend lines. Seasonal patterns are overlaid for context.',
        effectiveness: 'effective',
        analysis: 'Multiple time-scale views help users zoom out from daily noise. Seasonal overlays are particularly valuable because they show that a "decline" may simply be a normal seasonal pattern followed by regression to the annual mean.',
      },
      {
        company: 'Optimizely',
        product: 'Experiment Results',
        description: 'Optimizely shows A/B test results with confidence intervals, statistical significance indicators, and a chart of how the estimated effect size changes over time as more data is collected -- typically narrowing and regressing from early extreme estimates.',
        effectiveness: 'very-effective',
        analysis: 'The effect-size-over-time chart is a masterclass in regression communication. Teams can literally see how early extreme results regress toward the true effect as sample size grows, building statistical intuition.',
      },
      {
        company: 'Strava',
        product: 'Training Log',
        description: 'Strava displays running pace and power as rolling averages with personal range bands. Individual workout results are shown in context of the user\'s typical range and long-term trend.',
        effectiveness: 'effective',
        analysis: 'By showing where each workout falls within the user\'s personal distribution, Strava helps athletes understand that a slow day after a fast day is normal variation, not a sign of declining fitness.',
      },
    ],

    abTests: [
      {
        title: 'Dashboard: Raw Data vs Moving Average Overlay',
        hypothesis:
          'Adding a moving average overlay will reduce false escalations and improve decision quality',
        controlVersion: {
          description:
            'Daily metrics dashboard showing only raw daily values with day-over-day change percentages',
          metrics: {
            conversionRate: 'N/A',
            escalationRate: '34%',
            decisionAccuracy: '52%',
          },
        },
        treatmentVersion: {
          description:
            'Same dashboard with 7-day moving average overlay, expected range band, and contextual labels ("within normal range" / "unusual")',
          metrics: {
            conversionRate: 'N/A',
            escalationRate: '11%',
            decisionAccuracy: '81%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'The moving average overlay reduced false escalations by 68% and improved decision accuracy by 56%. Teams spent less time investigating normal variation and more time on genuine anomalies.',
          learnings: [
            'Visual context (moving average + range band) is more effective than numerical context alone',
            'Labeling values as "within normal range" significantly reduced anxiety-driven escalations',
            'Decision accuracy improved because teams focused on sustained deviations rather than single-point spikes',
            'Users reported higher confidence in their data interpretation',
          ],
        },
      },
      {
        title: 'A/B Test Results: Early Access vs Gated by Sample Size',
        hypothesis:
          'Preventing access to experiment results before minimum sample size will improve decision quality',
        controlVersion: {
          description:
            'Experiment results visible immediately with live-updating conversion rates',
          metrics: {
            conversionRate: 'N/A',
            prematureDecisions: '43%',
            correctWinnerIdentification: '61%',
          },
        },
        treatmentVersion: {
          description:
            'Results gated behind minimum sample size threshold; before threshold, shows "collecting data" with progress bar and educational note about regression in early results',
          metrics: {
            conversionRate: 'N/A',
            prematureDecisions: '8%',
            correctWinnerIdentification: '89%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Gating results until sufficient sample size reduced premature decisions by 81% and increased correct winner identification by 46%. The educational note about regression helped teams understand why early results are unreliable.',
          learnings: [
            'Showing live-updating results before significance is reached encourages premature action',
            'Brief educational context about regression in early data built lasting statistical intuition',
            'Teams initially resisted the gate but overwhelmingly preferred it after experiencing better outcomes',
            'The progress bar maintained engagement without exposing unreliable early results',
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
        name: 'Single-Point Comparisons',
        description:
          'Metrics compared to a single previous period (yesterday, last week) without broader context',
        howToSpot:
          'Look for "vs yesterday" or "vs last week" labels with no historical baseline or average shown',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Missing Trend Lines',
        description:
          'Time-series charts showing only raw data points without moving averages or trend lines',
        howToSpot:
          'Check if line charts or bar charts display individual values without any smoothing or trend overlay',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Alarmist Color Coding',
        description:
          'Red/green coloring on day-over-day changes that may be within normal variation',
        howToSpot:
          'Look for red/green arrows or colors on percentage changes without context about what constitutes normal variation',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'No Expected Range Indicators',
        description:
          'Metrics displayed without confidence intervals, normal ranges, or standard deviation bands',
        howToSpot:
          'Check if dashboards show single numbers or charts without any indication of expected variation',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Linear Extrapolation',
        description:
          'Projections or forecasts based on a single recent data point or very short period',
        howToSpot:
          'Look for "at this rate" language or projection lines based on one or two data points',
        severity: ImpactLevel.CRITICAL,
      },
    ],

    patterns: [
      {
        name: 'No-Context Metric Pattern',
        description: 'A single metric value displayed prominently with no historical baseline, average, or range',
        indicators: [
          'Large number with only day-over-day comparison',
          'Missing rolling average or baseline reference',
          'No indication of what constitutes normal variation',
          '"Current value" shown without historical distribution',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Spike-Reaction Pattern',
        description: 'Alerts, notifications, or call-to-action buttons triggered by a single extreme value',
        indicators: [
          'Red alerts on single-day changes',
          'Automated recommendations based on one data point',
          'Urgent language ("act now", "critical") for normal variation',
          'Action buttons on metric cards without regression context',
        ],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Attribution-Without-Control Pattern',
        description: 'Claiming an intervention caused a change without controlling for regression',
        indicators: [
          '"Campaign drove +X% growth" without baseline comparison',
          'Before/after comparisons without control group',
          'Correlation presented as causation for sequential events',
          'Success/failure narratives around naturally regressing values',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Cherry-Pick Comparison Pattern',
        description: 'Comparing a peak period to a trough period (or vice versa) to exaggerate change',
        indicators: [
          'Best quarter compared to worst quarter',
          'Peak day used as baseline for measuring "decline"',
          'Selective date ranges that maximize apparent change',
          'Missing context about which periods were typical vs extreme',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'medium',
      },
    ],

    checklistQuestions: [
      'Does the dashboard show moving averages or trend lines alongside raw data?',
      'Are metrics compared to a historical baseline or only to the previous period?',
      'Do charts include expected range bands or confidence intervals?',
      'Are alerts based on sustained deviation or single-point spikes?',
      'Is there context about what constitutes normal variation for each metric?',
      'Do A/B test results show confidence intervals and significance thresholds?',
      'Are users warned about regression when viewing early experiment results?',
      'Do performance comparisons span multiple periods rather than cherry-picking extremes?',
      'Is there language distinguishing signal (sustained change) from noise (single-point variation)?',
      'Does the design help users understand that extreme values naturally regress?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology, statistics, and UX design, specializing in regression toward the mean.

Analyze the provided design for regression-toward-the-mean vulnerabilities. Identify:

1. **Missing Context**: Metrics shown without historical baselines, moving averages, or expected ranges
2. **Single-Point Comparisons**: Values compared only to the previous period without broader trend context
3. **Overreaction Triggers**: Alerts, colors, or language that encourage overreacting to natural variation
4. **Attribution Errors**: Claims that interventions caused changes that may simply be regression
5. **Extrapolation Risks**: Projections or forecasts based on extreme or insufficient data

For each pattern found:
- Identify what statistical context is missing
- Assess how likely users are to mistake variation for meaningful change
- Determine whether the design encourages overreaction or sound judgment
- Suggest specific improvements (moving averages, confidence intervals, contextual labels)

Consider:
- Does the user have enough context to distinguish signal from noise?
- Are alerts calibrated to fire on genuine anomalies, not normal variation?
- Do A/B test interfaces prevent premature conclusions?
- Are performance reviews designed to account for regression?
- Is the design teaching or undermining statistical thinking?

Provide actionable recommendations for helping users understand and account for regression toward the mean.`,

    outputSchema: {
      type: 'object',
      properties: {
        regressionVulnerabilities: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              missingContext: { type: 'string' },
              overreactionRisk: { type: 'string' },
              severity: { type: 'string' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'missingContext',
              'severity',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            trendContextScore: { type: 'number' },
            variationAwareness: { type: 'number' },
            alertCalibration: { type: 'number' },
            statisticalLiteracySupport: { type: 'number' },
          },
          required: [
            'trendContextScore',
            'variationAwareness',
            'alertCalibration',
            'statisticalLiteracySupport',
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
        'regressionVulnerabilities',
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
        title: 'Identify Regression-Prone Metrics',
        description:
          'Determine which metrics in your interface are susceptible to natural variation that users might misinterpret',
        example:
          'Daily active users, daily revenue, page load times, conversion rates -- any metric measured repeatedly over time',
        tips: [
          'Any metric with day-to-day or period-to-period variation is susceptible',
          'Metrics with high variance relative to their mean are most at risk',
          'User-facing KPIs that drive decisions are highest priority',
        ],
      },
      {
        step: 2,
        title: 'Add Moving Averages and Trend Lines',
        description:
          'Overlay smoothed trend lines on raw data to show the underlying signal',
        example:
          'Add a 7-day rolling average line on a daily traffic chart, with the raw data shown as a thinner, muted line',
        tips: [
          'Choose averaging window based on the natural cycle of your data (7 days for weekly patterns, 30 for monthly)',
          'Make the smoothed line visually dominant and the raw data secondary',
          'Label both lines clearly for accessibility',
        ],
      },
      {
        step: 3,
        title: 'Display Expected Ranges',
        description:
          'Show confidence intervals or standard deviation bands so users can see what is normal',
        example:
          'Add a shaded band showing +/- 1 standard deviation from the moving average',
        tips: [
          'Use muted, semi-transparent fills for range bands',
          'Label the range (e.g., "Expected range based on past 90 days")',
          'Color-code values inside vs outside the expected range differently',
        ],
      },
      {
        step: 4,
        title: 'Calibrate Alerts and Notifications',
        description:
          'Set alert thresholds based on statistical significance, not absolute values',
        example:
          'Alert only when a metric is more than 2 standard deviations from its 30-day average for 3+ consecutive periods',
        tips: [
          'Require sustained deviation, not single-point spikes',
          'Use z-scores or statistical process control limits',
          'Provide context in alert messages about how unusual the value actually is',
        ],
      },
      {
        step: 5,
        title: 'Add Contextual Labels',
        description:
          'Label values with their relationship to historical norms',
        example:
          'Next to "12,847 DAU", show "Within normal range (avg: 11,230, range: 9,800-13,100)"',
        tips: [
          'Use plain language, not statistical jargon',
          'Make context visible by default, not hidden behind tooltips',
          'Use consistent labeling across all metrics',
        ],
      },
      {
        step: 6,
        title: 'Educate Through Design',
        description:
          'Build micro-education about regression into the interface itself',
        example:
          'When a metric regresses after a spike, show a brief note: "This value has returned closer to its average, which is expected after an unusually high result"',
        tips: [
          'Keep educational content brief and contextual',
          'Use progressive disclosure for deeper statistical explanations',
          'Frame regression as normal, not as failure',
        ],
      },
    ],

    dos: [
      'Show moving averages and trend lines alongside raw data',
      'Display expected ranges and confidence intervals',
      'Compare metrics to historical baselines, not just the previous period',
      'Calibrate alerts to fire on sustained deviations, not single-point spikes',
      'Label values with their relationship to the historical mean and normal range',
      'Require statistical significance before attributing changes to interventions',
      'Show A/B test confidence intervals and minimum sample size requirements',
      'Provide multi-period views for performance evaluations',
      'Use contextual language that helps users interpret variation ("within normal range")',
      'Design drill-down paths that reveal whether a change is sustained or isolated',
    ],

    donts: [
      'Don\'t show only day-over-day or week-over-week changes without broader context',
      'Don\'t use red/green coloring for changes that are within normal variation',
      'Don\'t fire alerts on single-point spikes without checking for sustained deviation',
      'Don\'t extrapolate short-term extremes into long-term projections',
      'Don\'t compare peak periods to trough periods without noting both are extreme',
      'Don\'t attribute regression to interventions without control groups',
      'Don\'t display A/B test results before minimum sample sizes are reached',
      'Don\'t frame normal regression as failure ("performance is declining!")',
      'Don\'t design dashboards that encourage checking metrics compulsively',
      'Don\'t strip statistical context from executive summaries or reports',
    ],

    bestPractices: [
      {
        title: 'Moving Average as Primary, Raw Data as Secondary',
        description:
          'Make the smoothed trend the visual focus and raw data points supplementary',
        rationale:
          'The moving average represents the true signal; raw data includes noise that triggers overreaction',
        example:
          'Bold, colored moving average line with thin, muted raw data points underneath',
      },
      {
        title: 'Expected Range Bands on All Time-Series Charts',
        description:
          'Show shaded bands representing normal variation on every time-series visualization',
        rationale:
          'Users need visual anchoring to understand what is normal vs exceptional',
        example:
          'Light-shaded band showing +/- 1 SD from the 30-day average on all metric charts',
      },
      {
        title: 'Gate A/B Test Results Behind Significance',
        description:
          'Do not show experiment results until minimum sample size and statistical significance are reached',
        rationale:
          'Early results are dominated by noise and extreme initial values that will regress',
        example:
          'Progress bar showing "72% of required samples collected" with note about why early results are unreliable',
      },
      {
        title: 'Multi-Period Performance Comparisons',
        description:
          'Always show performance across multiple periods with baseline, not single-period comparisons',
        rationale:
          'Single-period comparisons are maximally vulnerable to regression effects',
        example:
          'Quarterly performance bar chart with team/personal average baseline line across all quarters',
      },
      {
        title: 'Regression-Aware Alert Thresholds',
        description:
          'Set alert thresholds using statistical process control methods, not arbitrary values',
        rationale:
          'Fixed thresholds generate false positives from normal variation; statistical thresholds adapt to actual data patterns',
        example:
          'Alerts triggered only when values exceed 2 standard deviations for 3+ consecutive measurements',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '1.1.1',
        guideline:
          'Non-text Content - Provide text alternatives for trend lines and range bands',
        implementation:
          'Include alt text on charts describing the trend, average, and whether current values are within normal range. Example: "Daily active users trending stable at 11,200 average; today\'s value of 12,847 is within normal variation."',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships - Ensure statistical context is programmatically associated with metrics',
        implementation:
          'Use aria-describedby to link metric values to their contextual information (average, range, status). Screen readers should announce both the value and its context.',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.4.1',
        guideline:
          'Use of Color - Do not rely solely on color to indicate normal vs abnormal values',
        implementation:
          'Supplement red/green coloring with text labels ("within normal range" / "unusual"), icons, and patterns so color-blind users receive the same information.',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.4.6',
        guideline:
          'Headings and Labels - Use clear headings that include statistical context',
        implementation:
          'Label dashboard sections with descriptive headings: "Revenue: Trending Stable" rather than just "Revenue".',
      },
    ],

    ethics: [
      {
        concern: 'Hiding Regression to Inflate Success',
        severity: 'critical',
        explanation:
          'Presenting post-intervention regression as proof of success, or deliberately comparing extreme periods to make results look better',
        mitigation:
          'Always show control groups, pre-intervention trend lines, and confidence intervals. Disclose when improvement may be regression rather than causation.',
      },
      {
        concern: 'Alert Fatigue from False Positives',
        severity: 'high',
        explanation:
          'Alerting on every natural fluctuation desensitizes users, causing them to miss genuine anomalies',
        mitigation:
          'Calibrate alerts using statistical thresholds. Track and minimize false positive rates. Allow users to configure sensitivity.',
      },
      {
        concern: 'Inducing Anxiety with Normal Variation',
        severity: 'high',
        explanation:
          'Health apps, financial tools, or performance trackers that alarm users about normal day-to-day variation',
        mitigation:
          'Default to smoothed views (moving averages). Label normal variation clearly. Do not use alarmist language or red coloring for values within expected ranges.',
      },
      {
        concern: 'Punishing Regression in Performance Reviews',
        severity: 'high',
        explanation:
          'HR and performance tools that enable managers to penalize employees for natural regression after a strong period',
        mitigation:
          'Show multi-period trends with baselines. Include regression context in performance review templates. Train managers on regression toward the mean.',
      },
      {
        concern: 'Manipulating A/B Test Timing',
        severity: 'critical',
        explanation:
          'Stopping experiments early when results look favorable (before regression occurs) or continuing until a desired result appears',
        mitigation:
          'Pre-register sample sizes and stopping criteria. Gate results behind significance thresholds. Show how effect size estimates evolve over time.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'Regression Towards Mediocrity in Hereditary Stature',
        author: 'Galton, F.',
        year: 1886,
        doi: '10.2307/2841583',
        description:
          'The foundational paper where Galton first described regression toward the mean, observing that tall parents tend to have shorter children and vice versa',
        type: 'foundational',
      },
      {
        title: 'Judgment under Uncertainty: Heuristics and Biases',
        author: 'Tversky, A., & Kahneman, D.',
        year: 1974,
        doi: '10.1126/science.185.4157.1124',
        description:
          'Landmark paper covering how people fail to account for regression in their predictions and judgments',
        type: 'foundational',
      },
      {
        title: 'The Hot Hand in Basketball: On the Misperception of Random Sequences',
        author: 'Gilovich, T., Vallone, R., & Tversky, A.',
        year: 1985,
        doi: '10.1016/0010-0285(85)90010-6',
        description:
          'Classic study showing that perceived "hot streaks" in basketball are consistent with regression to the mean from random sequences',
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
          'Chapter 17 ("Regression to the Mean") provides an accessible and thorough explanation of the phenomenon, including Kahneman\'s own difficulty teaching it to flight instructors',
        type: 'foundational',
      },
      {
        title: 'The Signal and the Noise',
        author: 'Silver, Nate',
        year: 2012,
        isbn: '9780143125082',
        description:
          'Practical exploration of distinguishing signal from noise in predictions, with extensive discussion of regression effects in sports, economics, and weather',
        type: 'practical',
      },
      {
        title: 'Fooled by Randomness',
        author: 'Taleb, Nassim Nicholas',
        year: 2005,
        isbn: '9780812975215',
        description:
          'Explores how people mistake luck for skill and fail to account for regression in financial markets and everyday life',
        type: 'practical',
      },
    ],

    articles: [
      {
        title: 'Understanding Regression to the Mean',
        author: 'Barnett, A. G., van der Pols, J. C., & Dobson, A. J.',
        url: 'https://doi.org/10.1136/bmj.330.7490.541',
        description:
          'BMJ article explaining regression to the mean in clinical research, with practical guidance on avoiding the fallacy in study design',
        type: 'practical',
      },
      {
        title: 'Designing Better Data Tables',
        author: 'Schwabish, Jonathan',
        url: 'https://policyviz.com/2020/11/19/designing-better-data-tables/',
        description:
          'Practical guide to data presentation that includes techniques for showing context and variation in tabular data',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'Regression to the Mean',
        author: 'Khan Academy',
        url: 'https://www.khanacademy.org/math/statistics-probability/describing-relationships-quantitative-data/regression-library/v/regression-to-the-mean',
        description:
          'Clear visual explanation of regression toward the mean with worked examples',
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
      'base-rate-neglect',
      'clustering-illusion',
      'gambler-fallacy',
      'hot-hand-fallacy',
    ],

    conflicts: [
      'trend-continuation-bias',
    ],

    confusedWith: [
      'gambler-fallacy',
      'hot-hand-fallacy',
      'mean-reversion-trading',
    ],

    hierarchy: {
      parent: 'cognitive-bias',
      children: [
        'sports-illustrated-jinx',
        'sophomore-slump',
      ],
    },
  },
};
