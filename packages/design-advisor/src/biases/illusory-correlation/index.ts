/**
 * ILLUSORY CORRELATION
 *
 * We perceive relationships between variables that don't actually exist,
 * seeing meaningful patterns in random or unrelated data.
 */

import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const illusoryCorrelation: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'illusory-correlation',
    name: 'Illusory Correlation',
    aliases: ['Spurious Correlation', 'False Association', 'Phantom Correlation'],
    category: BiasCategory.COGNITIVE,
    relatedCategories: [
      BiasCategory.DECISION_MAKING,
      BiasCategory.PERCEPTION,
      BiasCategory.MEMORY,
    ],
    tags: [
      'data-visualization',
      'analytics',
      'correlation',
      'causation',
      'statistics',
      'pattern-recognition',
      'decision-making',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple: 'We perceive relationships between variables that don\'t actually exist, seeing meaningful patterns in random data.',

    detailed: `Illusory correlation is a cognitive bias in which people perceive a relationship between two variables (events, actions, traits) even when no such relationship exists, or they greatly overestimate the strength of a weak relationship. The brain is a pattern-recognition engine that actively seeks connections -- and frequently finds them where there are none.

This bias is especially dangerous in data-driven environments. When users look at dashboards, analytics tools, scatter plots, or A/B test results, they instinctively draw connections between co-occurring variables. A spike in sales and a marketing campaign that happened the same week feel causally linked, even when the spike was seasonal. Two metrics trending in the same direction feel correlated, even when statistical tests show no significant relationship.

In UX and product design, illusory correlation manifests whenever users interpret data, compare metrics, evaluate experiments, or draw conclusions from visualizations. Designers must actively counteract this bias by surfacing statistical rigor: correlation coefficients, confidence intervals, significance indicators, and explicit "correlation does not imply causation" guardrails.`,

    psychologyBasis: {
      discoveredBy: 'Loren Chapman',
      year: 1967,
      theory: 'Associative Memory and Distinctiveness-Based Illusory Correlation',
      mechanism: `The brain perceives correlations where none exist through several interacting mechanisms:

1. **Paired Distinctiveness**: When two distinctive or infrequent events co-occur, the pairing is especially memorable, leading to overestimation of their association
2. **Expectancy-Based Processing**: Prior beliefs and stereotypes cause people to notice and remember belief-confirming co-occurrences while ignoring disconfirming ones
3. **Selective Attention**: People attend more to data that fits a narrative they already hold, reinforcing perceived patterns
4. **Frequency Misjudgment**: People overestimate how often two things co-occur because joint occurrences are more salient than non-occurrences
5. **Narrative Construction**: The brain prefers causal stories over randomness, so it constructs explanations for coincidental co-occurrences

Chapman (1967) demonstrated that participants reported correlations between word pairs that were actually randomly paired, simply because certain pairings were more semantically associated. Hamilton and Gifford (1976) extended this to show how illusory correlations form the basis of stereotyping -- minority groups paired with infrequent negative behaviors are disproportionately remembered.`,
    },

    realWorldExample: `A product manager notices that user churn increased the same month a new onboarding flow was launched. They conclude the new onboarding is causing churn and roll it back. In reality, churn was driven by a competitor's promotional campaign and a seasonal pattern -- the onboarding flow was actually improving activation rates. The co-occurrence of two events (new onboarding + churn spike) created a perceived causal link where none existed.

Similarly, a data analyst sees that countries with higher chocolate consumption have more Nobel Prize winners. The correlation is real statistically, but the causal inference (chocolate makes you smarter) is illusory -- both are confounded by national wealth and research funding.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `Illusory correlation profoundly affects how users interpret data in dashboards, analytics tools, and any interface presenting multiple metrics. Designers must actively prevent false pattern detection by:

- Displaying statistical significance and correlation coefficients alongside visualizations
- Adding explicit "correlation does not imply causation" labels where relevant
- Providing proper statistical context (confidence intervals, p-values, sample sizes)
- Designing scatter plots and charts that make the strength of relationships visually honest
- Offering confounding variable analysis and multi-variate views
- Preventing users from drawing causal conclusions from observational data`,

    whenToUse: [
      {
        title: 'Dashboard Metric Displays',
        scenario:
          'When showing multiple metrics side-by-side that users might falsely correlate',
        example:
          'Display correlation coefficient (r) and p-value when two metrics are shown together, with a label: "No statistically significant relationship detected"',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'A/B Test Result Interpretation',
        scenario: 'When presenting experiment results where users might see patterns in noise',
        example:
          'Show confidence intervals, statistical significance indicators, and minimum detectable effect alongside test results to prevent reading signal from noise',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Analytics Correlation Views',
        scenario: 'When users explore relationships between variables in analytics tools',
        example:
          'Scatter plots with correlation coefficient, R-squared value, regression line, and an explicit note: "Correlation strength: weak (r=0.12). This does not imply causation."',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Trend Comparison Charts',
        scenario: 'When overlaying multiple time-series that might appear to move together',
        example:
          'When two metrics share a time axis, display a statistical correlation test result and flag when trends merely co-occur without meaningful relationship',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Health and Fitness Data',
        scenario: 'When health apps show correlations between behaviors and outcomes',
        example:
          'Sleep tracker showing "Your sleep improved when you exercised" should include sample size, effect size, and note that other factors may contribute',
        impact: ImpactLevel.MEDIUM,
      },
    ],

    whenToAvoid: [
      {
        title: 'Confirmed Causal Relationships',
        reason:
          'Adding skepticism warnings to well-established causal relationships undermines trust',
        consequence:
          'Users may dismiss legitimate insights if every correlation is flagged as potentially illusory',
        alternative:
          'Reserve "correlation != causation" warnings for observational data; label confirmed causal findings clearly as "established causal relationship"',
      },
      {
        title: 'Simple Binary Decisions',
        reason:
          'Overloading simple decisions with statistical complexity increases cognitive load',
        consequence:
          'Users become paralyzed by statistical caveats and fail to act on clear signals',
        alternative:
          'For well-established relationships, present clear recommendations with supporting evidence',
      },
      {
        title: 'Expert Statistical Users',
        reason:
          'Experienced data scientists and statisticians may find basic warnings patronizing',
        consequence:
          'Expert users may disengage from tools that over-explain basic statistical concepts',
        alternative:
          'Offer configurable statistical rigor levels; let advanced users toggle detailed warnings',
      },
      {
        title: 'Exploratory Data Discovery',
        reason:
          'Too many warnings during exploratory analysis can stifle hypothesis generation',
        consequence:
          'Users may miss genuine patterns if every correlation is aggressively disclaimed',
        alternative:
          'Flag correlations for further investigation rather than dismissing them; use language like "interesting -- worth testing" rather than "probably meaningless"',
      },
    ],

    commonMistakes: [
      {
        title: 'Dual-Axis Charts Without Correlation Context',
        description:
          'Overlaying two metrics on a dual-axis chart that implies a relationship through visual alignment',
        why: 'Dual-axis charts can make any two trends appear correlated by manipulating axis scales',
        fix: 'Avoid dual-axis charts when possible; if used, include correlation coefficient and a note about axis scale independence',
      },
      {
        title: 'Presenting Correlation as Causation',
        description:
          'Using language like "X drives Y" or "X causes Y" for observational correlations',
        why: 'Causal language leads users to make incorrect assumptions about interventions',
        fix: 'Use precise language: "X is associated with Y" or "X and Y tend to co-occur" for observational data',
      },
      {
        title: 'Omitting Confounding Variables',
        description:
          'Showing a correlation between two variables without mentioning potential confounders',
        why: 'Most real-world correlations have confounding variables that explain the relationship',
        fix: 'Display known confounders, offer multi-variate views, and note "other factors may explain this relationship"',
      },
      {
        title: 'Cherry-Picking Time Windows',
        description:
          'Selecting a specific date range that makes a spurious correlation appear strong',
        why: 'Any two variables will appear correlated in some cherry-picked time window',
        fix: 'Show full available time range by default; if users zoom in, display how the correlation changes across different windows',
      },
      {
        title: 'Ignoring Sample Size',
        description:
          'Showing correlations from small datasets without noting low statistical power',
        why: 'Small samples produce volatile correlations that are likely to be noise',
        fix: 'Always display sample size; flag correlations from small samples with "Low confidence: small sample size (n=X)"',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.HIGH,
        description:
          'Spatial proximity of metrics implies relationship; layout determines which variables users mentally connect',
        examples: [
          'Metrics placed side-by-side are perceived as related, even if they are independent',
          'Dashboard widgets in the same row or section imply a shared context',
          'Separating unrelated metrics into distinct sections reduces false correlation',
          'Grouping genuinely related metrics together supports accurate interpretation',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Text labels, annotations, and statistical context shape how users interpret data relationships',
        examples: [
          'Correlation coefficient labels (r=0.85) provide objective relationship context',
          '"Correlation != Causation" annotations prevent causal misinterpretation',
          'Clear axis labels prevent misreading of chart relationships',
          'Statistical significance indicators (p<0.05) guide confidence in patterns',
        ],
      },
      color: {
        level: ImpactLevel.HIGH,
        description:
          'Color coding can create false associations between unrelated data series',
        examples: [
          'Using the same color for unrelated metrics implies a connection',
          'Color gradients in heatmaps can make random noise appear as patterns',
          'Distinct colors for independent variables reduce false association',
          'Red/green color coding for up/down trends can make coincidental movements seem correlated',
        ],
      },
      interaction: {
        level: ImpactLevel.CRITICAL,
        description:
          'Interactive exploration of data makes illusory correlations easy to find and hard to disprove',
        examples: [
          'Brushing and linking across charts can make any two variables appear related',
          'Hover tooltips showing co-occurring values reinforce perceived connections',
          'Filter interactions that simultaneously affect multiple charts imply shared causation',
          'Zoom and pan can cherry-pick time windows where spurious correlations appear strong',
        ],
      },
      content: {
        level: ImpactLevel.CRITICAL,
        description:
          'How data relationships are described in text fundamentally shapes user interpretation',
        examples: [
          '"X drives Y" implies causation; "X is associated with Y" correctly describes correlation',
          'Insight summaries like "Revenue increased because of campaign" assert false causation',
          'Auto-generated insights should always use hedging language for observational data',
          'Narrative descriptions of trends should note sample sizes and confidence levels',
        ],
      },
      accessibility: {
        level: ImpactLevel.HIGH,
        description:
          'Statistical context must be accessible to all users, including those using screen readers',
        examples: [
          'Correlation coefficients and significance indicators must have text alternatives',
          'Screen reader users need verbal descriptions of chart relationships, not just data points',
          'Color-coded correlation strength must also be communicated via text labels',
          'Alt text for scatter plots should describe the strength and direction of the relationship',
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
        title: 'Scatter Plot with Correlation Coefficient',
        description:
          'Analytics dashboard showing two metrics with proper statistical context',
        code: `<div class="correlation-view">
  <h3>Revenue vs. Social Media Posts</h3>
  <div class="scatter-plot" role="img" aria-label="Scatter plot showing weak correlation (r=0.12) between social media posts and revenue">
    <!-- SVG scatter plot with regression line -->
    <svg viewBox="0 0 400 300">
      <!-- Data points scattered with no clear pattern -->
      <!-- Dashed regression line with shallow slope -->
    </svg>
  </div>
  <div class="stats-context">
    <span class="correlation">
      <strong>Correlation:</strong> r = 0.12 (very weak)
    </span>
    <span class="significance">
      <strong>p-value:</strong> 0.43 (not significant)
    </span>
    <span class="sample">
      <strong>Sample:</strong> n = 48 data points
    </span>
  </div>
  <div class="causation-warning" role="note">
    <svg class="icon-info" aria-hidden="true"><!-- info icon --></svg>
    <p>No statistically significant relationship detected.
    Correlation does not imply causation.</p>
  </div>
</div>`,
        explanation:
          'The scatter plot shows the actual data distribution honestly. The correlation coefficient (r=0.12), p-value, and sample size give users the statistical tools to correctly assess the relationship. The explicit warning prevents causal misinterpretation.',
        principle:
          'Always surface statistical context alongside visual correlations to prevent illusory pattern detection',
        metrics: {
          before: '67% of users reported "strong relationship" from chart alone',
          after: '12% reported "strong relationship" with statistical context added',
          improvement: '82% reduction in false correlation identification',
        },
      },
      {
        title: 'A/B Test Results with Confidence Intervals',
        description:
          'Experiment dashboard preventing false pattern interpretation in test results',
        code: `<div class="ab-test-result">
  <h3>Experiment: New Checkout Flow</h3>

  <div class="result-summary">
    <div class="variant control">
      <h4>Control</h4>
      <span class="rate">3.2%</span>
      <span class="ci">CI: [2.8%, 3.6%]</span>
      <span class="sample">n = 12,450</span>
    </div>
    <div class="variant treatment">
      <h4>Treatment</h4>
      <span class="rate">3.5%</span>
      <span class="ci">CI: [3.1%, 3.9%]</span>
      <span class="sample">n = 12,380</span>
    </div>
  </div>

  <div class="significance-banner not-significant">
    <svg class="icon-warning" aria-hidden="true"><!-- warning icon --></svg>
    <p><strong>Not statistically significant</strong> (p = 0.18).
    The observed difference (+0.3pp) is within the range of
    normal variation. We cannot conclude the treatment had an effect.</p>
  </div>

  <div class="recommendation">
    <p>Continue running the experiment for ~2 more weeks to reach
    95% confidence, or accept that the effect is likely smaller
    than the minimum detectable effect (0.5pp).</p>
  </div>
</div>`,
        explanation:
          'Confidence intervals show overlapping ranges, making it visually clear that the difference could be noise. The significance banner uses plain language to explain that the pattern is not reliable. Actionable next steps prevent premature conclusions.',
        principle:
          'Prevent illusory correlation in experiments by making statistical uncertainty visually obvious and linguistically explicit',
      },
      {
        title: 'Multi-Metric Dashboard with Relationship Disclaimers',
        description:
          'Dashboard showing independent metrics with explicit independence labels',
        code: `<div class="dashboard-grid">
  <div class="metric-card">
    <h4>Monthly Active Users</h4>
    <span class="value">24,350</span>
    <span class="trend up">+12% vs last month</span>
  </div>

  <div class="metric-card">
    <h4>Support Tickets</h4>
    <span class="value">342</span>
    <span class="trend up">+8% vs last month</span>
  </div>

  <div class="relationship-note" role="note">
    <p>Both metrics increased this month. This does not mean
    they are related. MAU growth is seasonal; support ticket
    increase is driven by a known billing system bug
    (JIRA-4521).</p>
  </div>
</div>`,
        explanation:
          'When two metrics move in the same direction, users naturally assume a causal link. The relationship note proactively explains that the co-occurrence is coincidental, providing specific independent causes for each trend.',
        principle:
          'When co-occurring trends might be misinterpreted as correlated, proactively explain their independent causes',
      },
    ],

    bad: [
      {
        title: 'Dual-Axis Chart Implying False Correlation',
        description:
          'Dashboard overlaying unrelated metrics on a dual-axis chart with manipulated scales',
        code: `<!-- DON'T DO THIS -->
<div class="chart-widget">
  <h3>Marketing Spend vs. Revenue</h3>
  <div class="dual-axis-chart">
    <!-- Left axis: Marketing spend ($0 - $50,000) -->
    <!-- Right axis: Revenue ($0 - $5,000,000), scaled to visually align -->
    <!-- Both lines appear to move together due to axis manipulation -->
  </div>
  <p class="insight">Marketing spend directly drives revenue growth!</p>
</div>`,
        explanation:
          'The dual-axis chart manipulates scales to make two independent trends appear correlated. The causal language ("directly drives") asserts causation from observational data. No correlation coefficient, p-value, or confounders are mentioned.',
        principle:
          'Never use dual-axis scale manipulation to imply correlations, and never use causal language for observational data',
      },
      {
        title: 'Auto-Generated Insight Asserting Causation',
        description:
          'Analytics tool generating causal claims from simple co-occurrence',
        code: `<!-- DON'T DO THIS -->
<div class="ai-insight">
  <h4>AI Insight</h4>
  <p>Users who viewed the pricing page are
  <strong>3x more likely to churn</strong>.
  The pricing page is causing users to leave.</p>
  <button class="action">Fix Pricing Page</button>
</div>`,
        explanation:
          'The insight confuses correlation with causation. Users who view the pricing page before churning may be comparison-shopping (a symptom of intent to leave, not a cause). The causal claim and action button could lead to wasted effort on the wrong problem.',
        principle:
          'Auto-generated insights must use associative language and suggest investigation, not assert causation',
      },
      {
        title: 'Cherry-Picked Time Window Correlation',
        description:
          'Report selecting a specific date range to make a spurious correlation look strong',
        code: `<!-- DON'T DO THIS -->
<div class="correlation-report">
  <h3>Blog Posts and Signups (March 2-9)</h3>
  <p>During this week, blog posts and signups were
  <strong>perfectly correlated (r=0.97)</strong>!</p>
  <p class="conclusion">Publish more blog posts to increase signups.</p>
  <!-- Note: across the full year, r=0.04 (no correlation) -->
</div>`,
        explanation:
          'A one-week window with 7 data points can produce high correlations by chance. The full-year data shows no relationship (r=0.04). Cherry-picking time windows to find correlations is a form of p-hacking that produces unreliable, misleading conclusions.',
        principle:
          'Always show correlations across the full available time range; flag cherry-picked windows as unreliable',
      },
    ],

    realWorld: [
      {
        company: 'Google',
        product: 'Google Analytics',
        description: 'Google Analytics presents many metrics side-by-side (sessions, bounce rate, conversion rate) without correlation analysis. Users frequently draw false causal conclusions, such as "bounce rate went up so conversions went down" when the two may be driven by entirely different factors.',
        effectiveness: 'somewhat-effective',
        analysis: 'Lack of statistical context in GA dashboards is a major source of illusory correlation in the marketing industry. Teams make budget decisions based on perceived correlations between metrics that are actually independent.',
      },
      {
        company: 'Robinhood',
        product: 'Stock Charts',
        description: 'Retail investors on Robinhood overlay stock price charts and perceive correlated movements between unrelated stocks. The app does not provide correlation coefficients or warn about spurious correlations in short time windows.',
        effectiveness: 'somewhat-effective',
        analysis: 'The simplicity that makes Robinhood accessible also makes it a breeding ground for illusory correlations. Users see two stocks rise together for a week and assume a lasting relationship, leading to correlated portfolio risk they don\'t understand.',
      },
      {
        company: 'Apple',
        product: 'Apple Health',
        description: 'Apple Health shows correlations between health metrics (sleep, exercise, heart rate) with trend lines that can make coincidental co-occurrences appear meaningful. Users may conclude "I sleep better when I drink coffee after 3pm" from a few data points.',
        effectiveness: 'somewhat-effective',
        analysis: 'Health apps face a tension: users want actionable insights, but small personal datasets produce unreliable correlations. Apple Health\'s "Trends" feature is improving by requiring longer time periods before surfacing correlations.',
      },
      {
        company: 'Optimizely',
        product: 'Experiment Platform',
        description: 'Optimizely\'s Stats Engine displays confidence intervals, statistical significance, and warns users when results are not yet conclusive. The platform prevents premature pattern detection by requiring minimum sample sizes before showing results.',
        effectiveness: 'effective',
        analysis: 'By building statistical rigor into the interface, Optimizely actively combats illusory correlation in A/B testing. The "not yet significant" state prevents users from acting on noise, and the confidence interval visualization makes uncertainty tangible.',
      },
    ],

    abTests: [
      {
        title: 'Statistical Context in Dashboard Metrics',
        hypothesis:
          'Adding correlation coefficients and significance indicators will reduce false pattern identification',
        controlVersion: {
          description:
            'Dashboard showing two metrics (ad spend and revenue) on a dual-axis chart with no statistical context',
          metrics: {
            conversionRate: 'N/A',
            timeOnPage: '2:10',
            scrollDepth: '55%',
          },
        },
        treatmentVersion: {
          description:
            'Same metrics displayed as a scatter plot with correlation coefficient (r=0.15, p=0.38), "not significant" label, and list of confounding variables',
          metrics: {
            conversionRate: 'N/A',
            timeOnPage: '3:45',
            scrollDepth: '82%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'In follow-up surveys, 72% of control users believed the two metrics were causally related. Only 15% of treatment users made the same claim. Treatment users spent more time on the page, indicating deeper engagement with the data rather than snap judgments.',
          learnings: [
            'Statistical context dramatically reduces false correlation identification',
            'Scatter plots are more honest than dual-axis line charts for showing relationships',
            'Users engage more deeply when given analytical tools rather than pre-digested insights',
            'Even a simple "not significant" label cuts false correlation beliefs by half',
          ],
        },
      },
      {
        title: 'Causal vs. Associative Language in Auto-Insights',
        hypothesis:
          'Using associative language ("associated with") instead of causal language ("drives") will improve decision quality',
        controlVersion: {
          description:
            'Auto-generated insight: "Feature X usage drives 40% higher retention. Invest in Feature X promotion."',
          metrics: {
            conversionRate: '34%',
            clickThroughRate: '45%',
          },
        },
        treatmentVersion: {
          description:
            'Auto-generated insight: "Feature X usage is associated with 40% higher retention. This may indicate engaged users prefer Feature X, not that Feature X causes retention. Consider an experiment to test causation."',
          metrics: {
            conversionRate: '28%',
            clickThroughRate: '38%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'While the treatment version had lower click-through (users were more cautious), the decisions made from treatment insights were rated 2.3x more accurate by senior analysts. Control users launched 4 misdirected campaigns based on false causal assumptions.',
          learnings: [
            'Causal language produces faster but less accurate decisions',
            'Associative language with suggested next steps (experiments) improves decision quality',
            'Lower immediate engagement is acceptable when it prevents costly mistakes',
            'Teams using associative insights requested 3x more experiments, building a culture of rigor',
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
        name: 'Dual-Axis Charts',
        description:
          'Two metrics overlaid on a chart with independent Y-axes that can be scaled to align trends',
        howToSpot:
          'Look for charts with two Y-axes; check if the scales have been adjusted to make trends appear correlated',
        severity: ImpactLevel.CRITICAL,
      },
      {
        name: 'Parallel Trend Lines',
        description:
          'Multiple line charts moving in similar directions without statistical correlation analysis',
        howToSpot:
          'Check if overlaid trend lines include correlation coefficients or if the visual similarity is coincidental',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Causal Language in Labels',
        description:
          'Chart titles or annotations using "drives", "causes", "leads to" for observational data',
        howToSpot:
          'Look for causal claims in chart titles, insight boxes, or automated summaries that are not backed by experimental evidence',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Missing Statistical Context',
        description:
          'Visualizations showing relationships between variables without correlation coefficients, p-values, or confidence intervals',
        howToSpot:
          'Check if scatter plots, overlaid charts, or comparison views include any statistical measures of relationship strength',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Co-Located Independent Metrics',
        description:
          'Unrelated metrics placed adjacent on a dashboard, implying a shared context',
        howToSpot:
          'Look for metric cards, widgets, or chart panels placed side-by-side without explicit labels indicating they are independent',
        severity: ImpactLevel.MEDIUM,
      },
    ],

    patterns: [
      {
        name: 'Visual Correlation Fabrication',
        description: 'Chart design that makes unrelated data appear correlated through axis manipulation, color matching, or trend line alignment',
        indicators: ['Dual Y-axes with independently scaled ranges', 'Same color used for unrelated data series', 'Trend lines overlaid without correlation statistics', 'Time axes aligned to maximize visual similarity'],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Causal Inference from Observational Data',
        description: 'Language or design that implies causation from correlational data',
        indicators: ['"X drives Y" or "X causes Y" labels', 'Action buttons suggesting interventions based on correlations', 'Auto-generated insights asserting causal mechanisms', 'Arrow or flow diagrams from correlated to outcome variables'],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Cherry-Picked Window Pattern',
        description: 'Selecting specific time periods or data subsets where spurious correlations appear strong',
        indicators: ['Unusually narrow date ranges in reports', 'Correlations that weaken when the time window is expanded', 'Small sample sizes with high reported correlations', 'Missing "full range" comparison views'],
        severity: ImpactLevel.HIGH,
        confidence: 'medium',
      },
      {
        name: 'Confounding Variable Omission',
        description: 'Showing two-variable relationships without acknowledging potential confounders',
        indicators: ['Bivariate scatter plots without multivariate context', 'Correlations presented without controlling for known confounders', 'Missing "other factors" disclaimers', 'No option to add control variables to the analysis'],
        severity: ImpactLevel.MEDIUM,
        confidence: 'high',
      },
    ],

    checklistQuestions: [
      'Are any two metrics displayed together without a statistical measure of their relationship?',
      'Does the visualization use dual axes that could make unrelated trends look correlated?',
      'Are auto-generated insights using causal language for observational data?',
      'Is there a correlation coefficient, R-squared, or p-value displayed?',
      'Could a confounding variable explain the apparent relationship?',
      'Is the sample size large enough for the correlation to be meaningful?',
      'Has the time window been selected to maximize a particular correlation?',
      'Are users given tools to test whether a correlation holds across different segments or time periods?',
      'Does the design distinguish between correlation and causation in its language?',
      'Are "correlation does not imply causation" warnings present where appropriate?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and data visualization design, specializing in illusory correlation.

Analyze the provided design for illusory correlation patterns. Identify:

1. **Visual Correlation Fabrication**: Charts, graphs, or layouts that make unrelated data appear correlated
2. **Causal Language**: Text that asserts causation from observational/correlational data
3. **Missing Statistical Context**: Absent correlation coefficients, p-values, confidence intervals, or sample sizes
4. **Confounding Variable Blindness**: Relationships shown without acknowledging potential confounders
5. **Cherry-Picked Windows**: Selectively chosen data ranges that maximize apparent correlations

For each pattern found:
- Identify what false relationship users might perceive
- Assess the statistical validity of any implied correlation
- Determine the risk of users making incorrect decisions based on illusory correlations
- Evaluate whether the design helps or hinders accurate data interpretation
- Suggest specific improvements (statistical annotations, language changes, alternative visualizations)

Consider:
- Are dual-axis charts making unrelated metrics appear correlated?
- Does the dashboard layout imply relationships through spatial proximity?
- Are auto-generated insights asserting causation from correlation?
- Is the sample size sufficient for the correlations shown?
- Are users given tools to distinguish correlation from causation?
- Are confounding variables acknowledged or hidden?

Provide actionable recommendations for reducing illusory correlation risk while preserving useful data exploration.`,

    outputSchema: {
      type: 'object',
      properties: {
        illusoryCorrelationPatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              impliedRelationship: { type: 'string' },
              statisticalValidity: { type: 'string' },
              riskLevel: { type: 'string' },
              decisionRisk: { type: 'string' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'impliedRelationship',
              'statisticalValidity',
              'riskLevel',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            statisticalRigor: { type: 'number' },
            causalLanguageRisk: { type: 'number' },
            confoundingAwareness: { type: 'number' },
            visualHonesty: { type: 'number' },
          },
          required: [
            'statisticalRigor',
            'causalLanguageRisk',
            'confoundingAwareness',
            'visualHonesty',
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
        'illusoryCorrelationPatterns',
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
        title: 'Audit Data Relationships in Your Interface',
        description:
          'Identify every place where two or more metrics are displayed together and users might infer a relationship',
        example:
          'Dashboard showing revenue and NPS side-by-side -- users might assume higher NPS drives revenue',
        tips: [
          'Map all metric pairings in your dashboards and reports',
          'Interview users to learn what relationships they currently believe exist',
          'Document which relationships are statistically validated vs. assumed',
        ],
      },
      {
        step: 2,
        title: 'Add Statistical Context to Visualizations',
        description:
          'For every chart or view showing multiple variables, include correlation coefficients, p-values, and sample sizes',
        example:
          'Scatter plot with "r = 0.72, p < 0.001, n = 2,450" label and regression line',
        tips: [
          'Use plain-language descriptions alongside statistical notation (e.g., "strong positive correlation")',
          'Color-code correlation strength: green (strong), yellow (moderate), red (weak/none)',
          'Make statistical context visible without overwhelming the primary visualization',
        ],
      },
      {
        step: 3,
        title: 'Use Precise Language',
        description:
          'Replace causal language with associative language in all auto-generated insights, labels, and documentation',
        example:
          'Change "Email campaigns drive retention" to "Email engagement is associated with higher retention"',
        tips: [
          'Create a style guide distinguishing causal vs. associative terms',
          'Audit auto-generated insight templates for causal language',
          'Train content writers on the correlation/causation distinction',
        ],
      },
      {
        step: 4,
        title: 'Surface Confounding Variables',
        description:
          'When showing a correlation, always offer the ability to view potential confounders',
        example:
          'Correlation between ad spend and sales, with a note: "Seasonal trends may explain both increases"',
        tips: [
          'Maintain a registry of known confounding variables for common metric pairs',
          'Offer "control for" options that let users add covariates',
          'Auto-suggest confounders based on domain knowledge',
        ],
      },
      {
        step: 5,
        title: 'Design for Honest Visualization',
        description:
          'Choose chart types and axis configurations that do not fabricate visual correlations',
        example:
          'Replace dual-axis line chart with side-by-side single-axis charts or a scatter plot',
        tips: [
          'Avoid dual Y-axes; if unavoidable, normalize both axes to the same scale or percentage',
          'Use scatter plots instead of overlaid line charts for relationship visualization',
          'Default to showing the full available time range to prevent cherry-picking',
        ],
      },
    ],

    dos: [
      'Display correlation coefficients (r) and p-values alongside any chart showing multiple variables',
      'Use associative language ("associated with", "co-occurs with") for observational data',
      'Show confidence intervals and sample sizes for all statistical claims',
      'Offer confounding variable analysis and multi-variate views',
      'Use scatter plots with regression lines for showing variable relationships',
      'Label chart axes clearly and honestly, without scale manipulation',
      'Provide full time-range defaults to prevent cherry-picked correlations',
      'Add "correlation does not imply causation" warnings where appropriate',
      'Suggest experiments (A/B tests) as the path to establishing causation',
      'Let users toggle statistical annotations on/off based on expertise level',
    ],

    donts: [
      'Don\'t use dual-axis charts that manipulate scales to imply false correlations',
      'Don\'t use causal language ("drives", "causes", "leads to") for observational correlations',
      'Don\'t show correlations without sample sizes and significance levels',
      'Don\'t place unrelated metrics side-by-side without explicit independence labels',
      'Don\'t cherry-pick time windows to maximize apparent correlations',
      'Don\'t generate automated insights that assert causation from correlation',
      'Don\'t ignore confounding variables when presenting bivariate relationships',
      'Don\'t use the same color for unrelated data series on the same chart',
      'Don\'t present small-sample correlations without low-confidence warnings',
      'Don\'t remove outliers without disclosure to make correlations appear stronger',
    ],

    bestPractices: [
      {
        title: 'Scatter Plots Over Dual-Axis Line Charts',
        description:
          'Use scatter plots to show relationships between variables instead of overlaid line charts with dual axes',
        rationale:
          'Scatter plots honestly display the strength and pattern of a relationship; dual-axis charts can fabricate visual correlations through scale manipulation',
        example:
          'Replace "Revenue and Ad Spend over Time" dual-axis chart with a scatter plot of (Ad Spend, Revenue) pairs with regression line and r-value',
      },
      {
        title: 'Correlation Strength Color Coding',
        description:
          'Use a consistent color scheme to indicate correlation strength across all data views',
        rationale:
          'Gives users an immediate visual indicator of relationship reliability, reducing the chance of overinterpreting weak correlations',
        example:
          'Green (|r| > 0.7, strong), Yellow (0.3 < |r| < 0.7, moderate), Red (|r| < 0.3, weak/none)',
      },
      {
        title: 'Experiment Suggestion Engine',
        description:
          'When users find an interesting correlation, suggest a controlled experiment to test causation',
        rationale:
          'Channels natural curiosity about correlations into rigorous causal testing rather than premature action',
        example:
          '"Interesting correlation found. Want to set up an A/B test to determine if this relationship is causal?"',
      },
      {
        title: 'Confounding Variable Sidebar',
        description:
          'For every correlation view, display a sidebar listing known potential confounders',
        rationale:
          'Makes users aware that apparent relationships may be driven by hidden third variables',
        example:
          'Correlation: "Ice cream sales and drowning deaths." Confounders: "Temperature, season, outdoor activity levels"',
      },
      {
        title: 'Time Window Sensitivity Analysis',
        description:
          'Show how a correlation changes across different time windows to expose cherry-picking',
        rationale:
          'Robust correlations persist across time windows; spurious ones are unstable',
        example:
          'Slider showing r-value as the time window changes: 1 week (r=0.92), 1 month (r=0.34), 1 year (r=0.08)',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '1.1.1',
        guideline:
          'Non-text Content - Provide text alternatives for chart-based correlation indicators',
        implementation:
          'Scatter plots and correlation visualizations must have alt text describing relationship strength, direction, sample size, and significance level',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships - Ensure statistical context is programmatically associated with its visualization',
        implementation:
          'Use aria-describedby to link correlation coefficients, p-values, and warnings to their respective charts',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.4.1',
        guideline:
          'Use of Color - Don\'t rely solely on color to indicate correlation strength',
        implementation:
          'Combine color coding (green/yellow/red) with text labels ("strong", "moderate", "weak") and patterns for correlation strength indicators',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.4.3',
        guideline:
          'Contrast - Statistical annotations must meet contrast requirements',
        implementation:
          'Correlation coefficients, p-values, and "not significant" labels must have at least 4.5:1 contrast ratio against their background',
      },
    ],

    ethics: [
      {
        concern: 'Fabricating Visual Correlations',
        severity: 'critical',
        explanation:
          'Using axis manipulation, scale tricks, or selective visualization to make unrelated data appear correlated',
        mitigation:
          'Use consistent, honest axis scales. Default to single-axis charts. When dual axes are necessary, normalize to percentages and include correlation statistics.',
      },
      {
        concern: 'Causal Claims from Correlational Data',
        severity: 'critical',
        explanation:
          'Asserting that one variable causes another based solely on observational correlation, especially in auto-generated insights',
        mitigation:
          'Enforce associative language in all auto-generated content. Reserve causal claims for experimentally validated relationships only.',
      },
      {
        concern: 'Cherry-Picking Data Windows',
        severity: 'high',
        explanation:
          'Selecting specific time periods or data subsets to manufacture correlations that don\'t exist in the full dataset',
        mitigation:
          'Default to full time range. When users zoom in, show how the correlation changes with window size. Flag correlations that are unstable across windows.',
      },
      {
        concern: 'Hiding Confounding Variables',
        severity: 'high',
        explanation:
          'Presenting bivariate correlations without acknowledging known confounders, leading to incorrect causal reasoning',
        mitigation:
          'Maintain a confounder registry. Auto-surface relevant confounders whenever correlations are displayed. Offer multi-variate analysis tools.',
      },
      {
        concern: 'Algorithmic Correlation Flooding',
        severity: 'medium',
        explanation:
          'Auto-discovery tools that surface hundreds of correlations, most of which are spurious, overwhelming users with false patterns',
        mitigation:
          'Apply Bonferroni correction or false discovery rate controls. Only surface correlations that pass multiple testing correction. Label exploratory findings as "hypothesis-generating, not conclusive."',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'Illusory Correlation in Interpersonal Perception: A Cognitive Basis of Stereotypic Judgments',
        author: 'Hamilton, D. L., & Gifford, R. K.',
        year: 1976,
        doi: '10.1016/0022-1031(76)90048-6',
        description:
          'Demonstrated how illusory correlations between minority groups and infrequent behaviors form the cognitive basis of stereotyping',
        type: 'foundational',
      },
      {
        title: 'Illusory Correlation as an Obstacle to the Use of Valid Psychodiagnostic Signs',
        author: 'Chapman, L. J.',
        year: 1967,
        doi: '10.1037/h0025158',
        description:
          'The original paper demonstrating illusory correlation, showing clinicians perceived relationships between symptoms and diagnoses that did not exist in the data',
        type: 'foundational',
      },
      {
        title: 'Illusory Correlation in Observational Report',
        author: 'Chapman, L. J., & Chapman, J. P.',
        year: 1969,
        doi: '10.1037/h0027868',
        description:
          'Extended illusory correlation research to clinical observation, showing that prior expectations override actual data patterns',
        type: 'foundational',
      },
      {
        title: 'Spurious Correlations: Marginals, Residuals, and Relationships',
        author: 'Vigen, T.',
        year: 2015,
        description:
          'Popular compendium of spurious correlations demonstrating how unrelated variables can appear strongly correlated',
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
          'Covers illusory correlation as part of the broader heuristics and biases research program, with chapters on how humans find patterns in noise',
        type: 'foundational',
      },
      {
        title: 'The Art of Statistics: Learning from Data',
        author: 'Spiegelhalter, David',
        year: 2019,
        isbn: '9781541618510',
        description:
          'Excellent treatment of correlation vs. causation with real-world examples and guidance on avoiding illusory correlations in data analysis',
        type: 'practical',
      },
      {
        title: 'How Not to Be Wrong: The Power of Mathematical Thinking',
        author: 'Ellenberg, Jordan',
        year: 2014,
        isbn: '9780143127536',
        description:
          'Accessible coverage of statistical reasoning errors including illusory correlation, with engaging real-world examples',
        type: 'practical',
      },
    ],

    articles: [
      {
        title: 'Spurious Correlations',
        author: 'Vigen, Tyler',
        url: 'https://www.tylervigen.com/spurious-correlations',
        description:
          'Interactive website showcasing absurd but statistically real correlations (e.g., per-capita cheese consumption and death by bedsheet tangling), illustrating how correlation does not imply causation',
        type: 'practical',
      },
      {
        title: 'Correlation vs Causation: A Guide for Data Visualization',
        author: 'Storytelling with Data',
        url: 'https://www.storytellingwithdata.com/',
        description:
          'Practical guide on designing visualizations that honestly represent data relationships',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'Correlation vs. Causation',
        author: 'Crash Course Statistics',
        url: 'https://www.youtube.com/watch?v=GtV-VYdNt_g',
        description:
          'Clear, accessible video explanation of correlation vs. causation with real-world examples',
        type: 'foundational',
      },
    ],

    demos: [
      {
        title: 'Spurious Correlations Generator',
        author: 'Tyler Vigen',
        url: 'https://www.tylervigen.com/spurious-correlations',
        description:
          'Interactive tool that finds real but meaningless correlations between random datasets, demonstrating the ubiquity of spurious correlations',
        type: 'practical',
      },
    ],
  },

  //===========================================
  // RELATIONSHIPS
  //===========================================
  relationships: {
    complements: [
      'confirmation-bias',     // Users see correlations that confirm existing beliefs
      'clustering-illusion',   // Perceiving patterns in random clusters reinforces false correlations
      'narrative-fallacy',     // Building causal stories around coincidental correlations
      'base-rate-neglect',     // Ignoring base rates when evaluating apparent correlations
    ],

    conflicts: [
      'statistical-literacy',  // Statistical training directly counteracts illusory correlation
    ],

    confusedWith: [
      'confirmation-bias',     // Both involve seeing what you expect, but illusory correlation is specifically about perceived variable relationships
      'availability-heuristic', // Memorable co-occurrences increase illusory correlation, but they are distinct mechanisms
      'clustering-illusion',   // Clustering is about spatial/temporal patterns; illusory correlation is about variable relationships
    ],

    hierarchy: {
      parent: 'cognitive-bias',
      children: [
        'spurious-correlation',
        'stereotype-formation',
      ],
    },
  },
};
