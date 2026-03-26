/**
 * FRAMING BIAS
 *
 * How information is presented affects our decisions
 */


import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const framingBias: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'framing-bias',
    name: 'Framing Bias',
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
    simple: 'How information is presented affects our decisions',

    detailed: `Framing bias is the tendency to draw different conclusions from the same information depending on how that information is presented or contextualized. Unlike the closely related framing effect (which focuses specifically on gain/loss framing), framing bias encompasses the broader phenomenon of how any contextual frame — visual, linguistic, numerical, or structural — systematically distorts interpretation.

In data-rich environments like dashboards, reports, and analytics tools, framing bias is pervasive. The same dataset can tell dramatically different stories depending on chart type, axis scaling, time range selection, and whether values are shown as percentages or absolute numbers. A 2% increase sounds modest, but "20,000 new users" from the same data feels substantial.

For UX and product design, framing bias affects every layer of information architecture. How metrics are labeled, how options are ordered, which comparison baseline is chosen, and what contextual information surrounds a data point all create frames that shape user interpretation. Designers must understand these frames to present information honestly and help users make well-informed decisions.`,

    psychologyBasis: {
      discoveredBy: 'Various Researchers',
      year: 1970,
      theory: 'Cognitive Bias Research',
      mechanism: `The brain does not process information in isolation — it interprets data relative to surrounding context and presentation format. This happens because:

1. **Reference Dependence**: The brain evaluates information relative to a reference point rather than in absolute terms. The frame sets that reference point.
2. **Selective Emphasis**: Different presentations highlight different attributes of the same information, directing attention and weighting judgments accordingly.
3. **Contextual Contrast**: Surrounding information creates contrast effects — the same number looks large or small depending on what it's compared against.
4. **Narrative Construction**: Humans naturally construct causal narratives from presented information. The frame determines which narrative feels most natural.
5. **Cognitive Ease**: The brain prefers the interpretation that requires the least effort. A well-constructed frame makes one interpretation effortless while alternatives require active reasoning.

The mechanism operates largely outside conscious awareness — people rarely notice that their interpretation is shaped by presentation rather than content.`,
    },

    realWorldExample: `Consider a surgical procedure with an 90% survival rate. When framed as "90 out of 100 patients survive," most people consent readily. When the same statistic is framed as "10 out of 100 patients die," consent rates drop significantly. The underlying information is identical, but the contextual frame (survival vs. mortality) shifts the reference point and emotional response, leading to different decisions. Tversky and Kahneman demonstrated this across numerous domains, from medical decisions to policy preferences.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `Framing bias profoundly affects how users interpret data, evaluate options, and form judgments in interfaces. Every design choice about how information is presented creates a frame. Designers can leverage this understanding to:

- Present data transparently by offering multiple views (percentage + absolute numbers)
- Use honest axis scaling that accurately represents trends and proportions
- Choose neutral baselines and comparison points that don't bias interpretation
- Frame metrics in context with appropriate benchmarks and historical trends
- Ensure chart types match the story the data actually tells, not a distorted narrative`,

    whenToUse: [
      {
        title: 'Multi-View Data Presentation',
        scenario:
          'When displaying metrics that could be misinterpreted in a single format',
        example:
          'Show both "Revenue up 3%" and "Revenue up $2.4M" so users get the full picture regardless of which frame resonates',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Transparent Comparisons',
        scenario: 'When users need to compare options, plans, or time periods',
        example:
          'Provide consistent scales, aligned axes, and identical time ranges when showing side-by-side comparisons',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Contextual Benchmarks',
        scenario: 'When a metric needs context to be meaningful',
        example:
          'Show "Your page load time: 2.3s" alongside "Industry average: 3.1s" and "Top 10%: 1.2s" to frame performance accurately',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Balanced Outcome Presentation',
        scenario: 'When displaying results that have both positive and negative dimensions',
        example:
          'Show both "93% uptime this quarter" and "Total downtime: 50.4 hours" so users can evaluate from multiple angles',
        impact: ImpactLevel.MEDIUM,
      },
      {
        title: 'Data Storytelling Integrity',
        scenario: 'When crafting narrative around data for reports or dashboards',
        example:
          'Let users toggle between absolute and relative views, and between different time ranges, so the frame doesn\'t lock in one interpretation',
        impact: ImpactLevel.HIGH,
      },
    ],

    whenToAvoid: [
      {
        title: 'Manipulative Positive Framing',
        reason:
          'Cherry-picking the most favorable frame to hide problems or inflate success',
        consequence:
          'Users make decisions based on distorted information; trust erodes when reality surfaces',
        alternative:
          'Present balanced views showing both favorable and unfavorable frames of the same data',
      },
      {
        title: 'Dashboard Vanity Metrics',
        reason:
          'Framing metrics to always look positive (e.g., showing cumulative totals instead of declining daily rates)',
        consequence:
          'Stakeholders miss declining trends and fail to act on real problems',
        alternative:
          'Show rate-based metrics alongside cumulative ones; include trend indicators and comparison periods',
      },
      {
        title: 'Fear-Inducing Negative Frames',
        reason:
          'Framing information negatively to scare users into action (e.g., "You\'re losing $X every day you don\'t upgrade")',
        consequence:
          'Anxiety-driven decisions that may not serve the user\'s actual interests',
        alternative:
          'Present objective information and let users evaluate the tradeoffs themselves',
      },
      {
        title: 'Misleading Chart Scales',
        reason:
          'Truncating Y-axes or manipulating scales to exaggerate small differences',
        consequence:
          'Users perceive dramatic changes where only minor fluctuations exist',
        alternative:
          'Start Y-axes at zero for bar charts; clearly label any truncated axes with break indicators',
      },
    ],

    commonMistakes: [
      {
        title: 'Truncated Y-Axis Without Indication',
        description:
          'Starting a bar chart Y-axis at a value other than zero without a visible break indicator',
        why: 'A bar that appears 5x taller than another may represent only a 2% difference, grossly distorting perception',
        fix: 'Start bar charts at zero. If truncation is necessary for detail, add a clear axis break indicator and label the actual values',
      },
      {
        title: 'Cherry-Picked Time Ranges',
        description:
          'Selecting a time range that makes a metric look favorable (e.g., showing growth from a trough)',
        why: 'Users assume the visible range is representative; they can\'t see the data you excluded',
        fix: 'Default to standard time ranges (30/90/365 days) and let users adjust. Show the full trend, not a curated slice',
      },
      {
        title: 'Percentage Without Base Numbers',
        description:
          'Showing "200% increase!" without revealing the base was 3 users becoming 9',
        why: 'Percentages on small bases are misleading; users assume large absolute changes',
        fix: 'Always show both percentage and absolute values, especially when base numbers are small',
      },
      {
        title: 'Single-Frame Data Display',
        description:
          'Presenting a metric in only one format without alternative views',
        why: 'Each format creates its own frame; a single view locks users into one interpretation',
        fix: 'Offer toggle between views: percentage/absolute, daily/cumulative, per-user/total, relative/absolute scale',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.HIGH,
        description:
          'Layout determines which data is seen first and how comparisons are structured',
        examples: [
          'Side-by-side chart placement creates implicit comparison frames',
          'Placing positive metrics above the fold and burying negative ones creates a positivity frame',
          'Dashboard grid arrangement determines which metrics are perceived as primary vs secondary',
          'Proximity of data points to benchmarks or targets frames their interpretation',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Text size, formatting, and labeling frame how numbers and metrics are interpreted',
        examples: [
          'Large, bold percentage changes draw attention while small absolute values go unnoticed',
          'Chart axis labels and titles frame what story the data tells',
          'Caption text providing context can reframe an entire visualization',
          'Number formatting (2,000,000 vs 2M) frames magnitude perception',
        ],
      },
      color: {
        level: ImpactLevel.HIGH,
        description:
          'Color choices create strong evaluative frames (good/bad, high/low, safe/dangerous)',
        examples: [
          'Green/red color coding frames metrics as positive/negative before users read the values',
          'Gradient color scales frame data distribution and emphasis midpoint choices',
          'Muted vs saturated colors frame which data series is "important"',
          'Color choices in choropleth maps can frame geographic data as alarming or benign',
        ],
      },
      interaction: {
        level: ImpactLevel.CRITICAL,
        description:
          'Interactive controls determine which frames users encounter and which they can access',
        examples: [
          'Default date range selection frames the initial data interpretation',
          'Chart type toggles (bar vs line vs area) reframe the same data dramatically',
          'Zoom and pan defaults frame which portion of data users explore first',
          'Filter presets determine which subset of data frames the user\'s understanding',
        ],
      },
      content: {
        level: ImpactLevel.CRITICAL,
        description:
          'How data is described, labeled, and contextualized is the primary vehicle for framing',
        examples: [
          '"Revenue grew 12%" vs "Revenue grew $140K" frame the same change differently',
          'Survival rate vs mortality rate framing changes medical decision-making',
          'Describing a glass as "half full" vs "half empty" is the canonical content frame',
          'Metric labels ("cost" vs "investment") frame user attitude toward the same number',
        ],
      },
      accessibility: {
        level: ImpactLevel.HIGH,
        description:
          'Accessible alternatives must preserve frame-neutral presentation, not introduce new biases',
        examples: [
          'Alt text for charts must describe data accurately without injecting evaluative framing',
          'Screen reader order determines which frame blind users encounter first',
          'Data tables as chart alternatives must preserve the same neutral framing as the visual',
          'ARIA labels should describe metrics objectively rather than using loaded language',
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
        title: 'Multi-Format Metric Display',
        description:
          'Dashboard metric card showing both percentage and absolute values with trend context',
        code: `<div class="metric-card">
  <h3>Monthly Active Users</h3>
  <div class="metric-primary">
    <span class="value">847,200</span>
    <span class="trend positive">+3.2%</span>
  </div>
  <div class="metric-context">
    <p class="absolute-change">+26,200 users vs last month</p>
    <p class="benchmark">Industry avg growth: 2.1%</p>
  </div>
  <div class="metric-toggle">
    <button class="active">Percentage</button>
    <button>Absolute</button>
    <button>Per-segment</button>
  </div>
</div>`,
        explanation:
          'Showing percentage change, absolute change, and industry benchmark together prevents any single frame from dominating interpretation. The toggle lets users choose their preferred lens.',
        principle:
          'Multiple simultaneous frames reduce bias by letting users triangulate',
        metrics: {
          before: '62% of stakeholders misinterpreted growth significance with percentage-only display',
          after: '89% accurately assessed growth significance with multi-format display',
          improvement: '44% improvement in decision accuracy',
        },
      },
      {
        title: 'Honest Chart Axis Scaling',
        description:
          'Revenue chart with Y-axis starting at zero and clear scale indicators',
        code: `<div class="chart-container">
  <h3>Quarterly Revenue</h3>
  <div class="chart-wrapper">
    <!-- Y-axis starts at $0, not $900K -->
    <svg class="bar-chart" viewBox="0 0 400 300">
      <!-- Y-axis labels -->
      <text x="40" y="280">$0</text>
      <text x="40" y="210">$250K</text>
      <text x="40" y="140">$500K</text>
      <text x="40" y="70">$750K</text>
      <text x="40" y="10">$1M</text>
      <!-- Bars with proportional heights from zero -->
      <rect class="bar q1" x="80" y="60" width="60" height="220" />
      <rect class="bar q2" x="160" y="50" width="60" height="230" />
      <rect class="bar q3" x="240" y="40" width="60" height="240" />
      <rect class="bar q4" x="320" y="30" width="60" height="250" />
    </svg>
  </div>
  <p class="chart-note">Y-axis starts at $0. Actual range: $940K - $980K.
    <a href="#detail-view">View zoomed detail</a>
  </p>
</div>`,
        explanation:
          'Starting the Y-axis at zero shows proportional representation. The note acknowledges the actual narrow range and links to a zoomed view for detail, giving users both the honest big-picture frame and the ability to examine detail.',
        principle:
          'Honest scaling prevents visual exaggeration; detail views serve users who need granularity',
      },
      {
        title: 'Balanced Data Presentation with User-Controlled Framing',
        description:
          'Analytics dashboard letting users toggle between different data views',
        code: `<div class="data-view-controls">
  <div class="view-toggle" role="radiogroup" aria-label="Data format">
    <button role="radio" aria-checked="true">Percentage</button>
    <button role="radio" aria-checked="false">Absolute Numbers</button>
    <button role="radio" aria-checked="false">Per Capita</button>
  </div>
  <div class="time-range" role="radiogroup" aria-label="Time range">
    <button role="radio" aria-checked="false">7 days</button>
    <button role="radio" aria-checked="true">30 days</button>
    <button role="radio" aria-checked="false">90 days</button>
    <button role="radio" aria-checked="false">1 year</button>
    <button role="radio" aria-checked="false">All time</button>
  </div>
</div>
<div class="data-display">
  <table>
    <thead>
      <tr>
        <th>Region</th>
        <th>Conversion Rate</th>
        <th>Total Conversions</th>
        <th>Total Visitors</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>North America</td><td>4.2%</td><td>12,600</td><td>300,000</td></tr>
      <tr><td>Europe</td><td>5.1%</td><td>7,650</td><td>150,000</td></tr>
      <tr><td>Asia</td><td>3.8%</td><td>19,000</td><td>500,000</td></tr>
    </tbody>
  </table>
</div>`,
        explanation:
          'Showing percentage rate AND absolute numbers together prevents misleading interpretations. Asia has the lowest conversion rate but the most total conversions. Neither frame alone tells the full story.',
        principle:
          'Presenting multiple data facets simultaneously counteracts single-frame bias',
      },
    ],

    bad: [
      {
        title: 'Truncated Y-Axis Exaggerating Trends',
        description:
          'Bar chart with Y-axis starting at 95% to make 2% difference look dramatic',
        code: `<!-- DON'T DO THIS -->
<div class="chart-container">
  <h3>Customer Satisfaction Scores</h3>
  <svg class="bar-chart" viewBox="0 0 400 300">
    <!-- Y-axis starts at 95%, not 0% -->
    <text x="40" y="280">95%</text>
    <text x="40" y="210">96%</text>
    <text x="40" y="140">97%</text>
    <text x="40" y="70">98%</text>
    <text x="40" y="10">99%</text>
    <!-- Bars look wildly different but represent 96.1% vs 98.3% -->
    <rect class="bar competitor" x="100" y="200" width="80" height="80" />
    <rect class="bar us" x="220" y="30" width="80" height="250" />
  </svg>
  <p class="caption">We're CRUSHING the competition!</p>
</div>`,
        explanation:
          'By starting the Y-axis at 95%, a 2.2 percentage point difference (96.1% vs 98.3%) is made to look like a 3x difference visually. This grossly distorts the actual competitive gap and misleads viewers.',
        principle:
          'Truncated axes on bar charts create visual lies that exaggerate minor differences',
      },
      {
        title: 'Cherry-Picked Time Range Hiding Decline',
        description:
          'Growth chart showing only the last 2 weeks of a long-term decline',
        code: `<!-- DON'T DO THIS -->
<div class="dashboard-widget">
  <h3>User Growth</h3>
  <div class="date-range">Mar 6 - Mar 20</div>
  <div class="chart">
    <!-- Shows uptick in last 2 weeks, hiding 6-month decline -->
    <svg class="line-chart">
      <!-- Line goes up from 12,400 to 13,100 -->
      <polyline points="0,200 100,180 200,150 300,120 400,80" />
    </svg>
  </div>
  <p class="highlight positive">+5.6% growth!</p>
  <!-- Hidden context: Users were at 25,000 six months ago -->
</div>`,
        explanation:
          'The 2-week window shows a small uptick, but zooming out would reveal users declined from 25,000 to 13,100 over 6 months. The selected time range frames a declining product as a growing one.',
        principle:
          'Cherry-picked time ranges are one of the most common and deceptive forms of framing bias',
      },
      {
        title: 'Percentage-Only Display on Tiny Base Numbers',
        description:
          'Marketing report using percentages without revealing small sample sizes',
        code: `<!-- DON'T DO THIS -->
<div class="metrics-report">
  <div class="metric success">
    <h4>Email Campaign Results</h4>
    <span class="big-number">300%</span>
    <span class="label">increase in click-through rate!</span>
  </div>
  <div class="metric success">
    <h4>New Feature Adoption</h4>
    <span class="big-number">500%</span>
    <span class="label">growth in first week!</span>
  </div>
  <!-- Reality: CTR went from 1 click to 4 clicks.
       Feature went from 2 users to 12 users. -->
</div>`,
        explanation:
          'A "300% increase" sounds impressive but represents going from 1 to 4 clicks. Without base numbers, percentages on tiny samples create a wildly misleading frame of success.',
        principle:
          'Percentages without base numbers exploit framing bias to inflate perceived significance',
      },
    ],

    realWorld: [
      {
        company: 'News Media',
        product: 'Election Coverage',
        description: 'The same election result is framed as "Party A wins 52% of the vote" (emphasizing majority) or "Nearly half the country voted against Party A" (emphasizing opposition). Different outlets frame identical data to support different narratives, demonstrating how presentation context shapes public interpretation.',
        effectiveness: 'very-effective',
        analysis: 'News framing of identical data is one of the most studied and pervasive real-world examples of framing bias. The choice of reference point (majority vs minority, gain vs loss) systematically shifts audience interpretation.',
      },
      {
        company: 'Tableau',
        product: 'Data Visualization Platform',
        description: 'Tableau provides multiple chart types and encourages best practices for axis scaling, offering built-in warnings when chart configurations might mislead. Users can toggle between views and the platform defaults to zero-based axes for bar charts.',
        effectiveness: 'effective',
        analysis: 'By building frame-awareness into the tool itself, Tableau helps counteract framing bias at the creation stage rather than relying on viewer skepticism.',
      },
      {
        company: 'Spotify Wrapped',
        product: 'Year in Review',
        description: 'Spotify Wrapped frames listening data with superlatives ("You were in the top 1% of listeners for this artist") rather than raw numbers ("You listened 47 times"). The percentage-rank frame makes modest listening feel extraordinary and highly shareable.',
        effectiveness: 'very-effective',
        analysis: 'Spotify deliberately chooses the most flattering frame for each data point, leveraging framing bias to make users feel special and drive social sharing. Effective for engagement, though it obscures the raw data.',
      },
      {
        company: 'Financial Dashboards',
        product: 'Trading Platforms',
        description: 'Trading platforms like Robinhood show portfolio performance in both dollars and percentages, but default to the view that looks more favorable. A $5 gain on a $100 portfolio shows as "+5.00%" (impressive), while a $5 gain on a $10,000 portfolio shows as "+$5.00" rather than "+0.05%".',
        effectiveness: 'somewhat-effective',
        analysis: 'Dynamic frame selection based on which looks better is a subtle but impactful form of framing bias. More transparent platforms let users choose and remember their preferred view.',
      },
    ],

    abTests: [
      {
        title: 'Chart Axis: Zero-Based vs Truncated Y-Axis',
        hypothesis:
          'A truncated Y-axis will cause users to significantly overestimate the magnitude of data differences',
        controlVersion: {
          description:
            'Bar chart showing quarterly performance with Y-axis starting at zero. Bars show values of 96%, 97%, 96.5%, 98%.',
          metrics: {
            perceivedDifference: '3-5% (accurate)',
            decisionAccuracy: '84%',
            confidenceLevel: 'Moderate',
          },
        },
        treatmentVersion: {
          description:
            'Same data displayed with Y-axis starting at 95%. Bars appear to show dramatic differences.',
          metrics: {
            perceivedDifference: '25-40% (inaccurate)',
            decisionAccuracy: '41%',
            confidenceLevel: 'Very High',
          },
        },
        results: {
          winner: 'control',
          analysis:
            'Users viewing the truncated axis overestimated differences by 8-10x and were MORE confident in their (wrong) interpretation. The zero-based axis led to accurate assessments. Crucially, confidence was inversely correlated with accuracy in the truncated condition.',
          learnings: [
            'Truncated axes don\'t just mislead — they increase false confidence',
            'Users rarely check axis labels; they rely on visual proportions',
            'Zero-based axes reduce "wow factor" but dramatically improve decision quality',
            'Offering both views (overview + zoomed detail) satisfies both accuracy and engagement',
          ],
        },
      },
      {
        title: 'Metric Framing: Percentage vs Absolute Numbers',
        hypothesis:
          'Users will assess the same performance data differently depending on whether it is shown as a percentage or as an absolute number',
        controlVersion: {
          description:
            'Dashboard showing conversion rate as "3.2% conversion rate" for an e-commerce site.',
          metrics: {
            perceivedPerformance: '4.1/10 (below average)',
            actionTaken: '73% flagged for improvement',
          },
        },
        treatmentVersion: {
          description:
            'Same data shown as "32,000 purchases from 1,000,000 visitors" with monthly comparison.',
          metrics: {
            perceivedPerformance: '6.8/10 (above average)',
            actionTaken: '31% flagged for improvement',
          },
        },
        results: {
          winner: 'inconclusive',
          analysis:
            'Neither frame alone led to optimal decisions. The percentage frame made users overly pessimistic while the absolute number frame made them overly optimistic. Combining both frames ("3.2% conversion rate — 32,000 purchases") produced the most balanced and accurate assessment.',
          learnings: [
            'Percentages feel small and trigger improvement impulses even when performance is adequate',
            'Absolute numbers feel large and can mask poor rates',
            'Dual framing (percentage + absolute) led to the most accurate assessments',
            'Adding industry benchmarks alongside either frame significantly improved decision quality',
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
        name: 'Truncated Chart Axes',
        description:
          'Y-axis that does not start at zero on bar charts, or axes with non-linear scaling',
        howToSpot:
          'Check if the lowest value on the Y-axis is significantly above zero. Look for missing axis break indicators.',
        severity: ImpactLevel.CRITICAL,
      },
      {
        name: 'Single-Format Metrics',
        description:
          'Metrics displayed in only one format (percentage only, or absolute only) without alternatives',
        howToSpot:
          'Look for large percentage numbers without base values, or absolute numbers without rates or context',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Selective Time Ranges',
        description:
          'Charts or metrics locked to specific time ranges without user control or historical context',
        howToSpot:
          'Check if the default date range coincides with a favorable period. Look for missing date range controls.',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Evaluative Color Coding',
        description:
          'Green/red or other evaluative colors applied to metrics that frame values as good/bad before user interpretation',
        howToSpot:
          'Look for color-coded metrics, especially where the threshold for green vs red is arbitrary or self-serving',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Asymmetric Comparisons',
        description:
          'Comparison views where one option is presented with more detail, better formatting, or favorable framing',
        howToSpot:
          'Check if compared items use the same scale, same level of detail, and same visual treatment',
        severity: ImpactLevel.HIGH,
      },
    ],

    patterns: [
      {
        name: 'Axis Manipulation Pattern',
        description: 'Chart axes configured to exaggerate or minimize data differences',
        indicators: ['Y-axis not starting at zero on bar charts', 'Non-linear axis scaling without clear labeling', 'Dual Y-axes with mismatched scales', 'Aspect ratio distortion stretching or compressing trends'],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Selective Presentation Pattern',
        description: 'Information presented in whichever format looks most favorable',
        indicators: ['Percentages used for small-base metrics', 'Absolute numbers used for small-rate metrics', 'Cumulative charts hiding declining daily rates', 'Moving averages smoothing over important volatility'],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Context Stripping Pattern',
        description: 'Metrics shown without benchmarks, baselines, or historical context',
        indicators: ['No industry benchmarks or comparison points', 'Missing historical trends', 'No indication of sample size or statistical significance', 'Isolated numbers without rate, base, or context'],
        severity: ImpactLevel.HIGH,
        confidence: 'medium',
      },
      {
        name: 'Narrative Framing Pattern',
        description: 'Labels, titles, and descriptions that frame data interpretation before the user can assess it',
        indicators: ['Evaluative chart titles ("Impressive Growth" vs neutral "Revenue Q1-Q4")', 'Captions that interpret rather than describe', 'Selective highlighting of favorable data points', 'Use of loaded language in metric labels'],
        severity: ImpactLevel.MEDIUM,
        confidence: 'medium',
      },
    ],

    checklistQuestions: [
      'Do bar charts start their Y-axes at zero? If not, is a break indicator shown?',
      'Are metrics shown in multiple formats (percentage AND absolute)?',
      'Is the default time range representative, or does it cherry-pick a favorable window?',
      'Can users change the time range, chart type, and data format?',
      'Are comparisons using the same scales, time ranges, and level of detail?',
      'Do chart titles describe data neutrally or interpret it evaluatively?',
      'Are base numbers / sample sizes shown alongside percentages?',
      'Is color coding creating an evaluative frame before users interpret the data?',
      'Are benchmarks or historical context provided for standalone metrics?',
      'Could the same data be presented in a different frame that tells a very different story?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and data visualization, specializing in framing bias.

Analyze the provided design for framing bias patterns. Identify:

1. **Data Framing**: How metrics, charts, and numbers are presented — percentage vs absolute, cumulative vs rate-based
2. **Visual Framing**: Axis scaling, chart type selection, color coding, and visual emphasis choices
3. **Temporal Framing**: Time range defaults, trend windows, and historical context (or lack thereof)
4. **Contextual Framing**: Benchmarks, baselines, comparisons, and surrounding information
5. **Linguistic Framing**: Labels, titles, captions, and descriptions that bias interpretation

For each framing pattern found:
- Identify what interpretation the current frame encourages
- Assess what alternative frames would show
- Determine if the frame honestly represents the underlying data
- Evaluate whether users can access alternative frames
- Suggest improvements for balanced, multi-frame presentation

Consider:
- Are chart axes honestly scaled?
- Do metrics show both percentage and absolute values?
- Are time ranges representative or cherry-picked?
- Do labels describe neutrally or interpret evaluatively?
- Can users toggle between different data views?
- Are comparisons using consistent scales and formats?

Provide actionable recommendations for reducing framing bias and improving data integrity.`,

    outputSchema: {
      type: 'object',
      properties: {
        framingPatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              currentFrame: { type: 'string' },
              alternativeFrame: { type: 'string' },
              distortionLevel: { type: 'string' },
              userCanReframe: { type: 'boolean' },
              ethical: { type: 'boolean' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'currentFrame',
              'alternativeFrame',
              'ethical',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            dataIntegrity: { type: 'number' },
            frameBalance: { type: 'number' },
            userControl: { type: 'number' },
            ethicalScore: { type: 'number' },
          },
          required: [
            'dataIntegrity',
            'frameBalance',
            'userControl',
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
        'framingPatterns',
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
        title: 'Audit Existing Data Frames',
        description:
          'Review every chart, metric, and data display to identify which frame is currently applied and what alternatives exist',
        example:
          'Find that the revenue dashboard shows only percentage growth, hiding that the base is shrinking. Note that bar charts use truncated axes.',
        tips: [
          'Ask "What story would this data tell in a different format?" for every metric',
          'Check all chart axes — do they start at zero for bar charts?',
          'Identify which time ranges are defaulted and whether they are representative',
        ],
      },
      {
        step: 2,
        title: 'Add Multi-Format Data Views',
        description:
          'For every key metric, provide at least two formats: percentage and absolute, or rate and total',
        example:
          'Convert "Conversion rate: 3.2%" to "Conversion rate: 3.2% (32,000 purchases from 1M visitors)"',
        tips: [
          'Show both formats simultaneously rather than requiring a toggle when space allows',
          'Always include base numbers alongside percentages',
          'Add industry benchmarks or historical averages for context',
        ],
      },
      {
        step: 3,
        title: 'Fix Chart Scaling',
        description:
          'Ensure all chart axes are honestly scaled and clearly labeled',
        example:
          'Set all bar chart Y-axes to start at zero. Add axis break indicators if truncation is necessary for detail views.',
        tips: [
          'Bar charts should always start at zero — height encodes magnitude',
          'Line charts can start at non-zero if clearly labeled, since they encode slope',
          'Dual Y-axes should be avoided; if necessary, clearly label both scales',
        ],
      },
      {
        step: 4,
        title: 'Provide User-Controlled Framing',
        description:
          'Give users controls to adjust time ranges, data formats, chart types, and comparison baselines',
        example:
          'Add date range selector, percentage/absolute toggle, and chart type switcher to dashboard widgets',
        tips: [
          'Default to the most neutral or balanced view',
          'Preserve user preferences across sessions',
          'Offer preset time ranges (7d, 30d, 90d, 1y, All) rather than only custom',
        ],
      },
      {
        step: 5,
        title: 'Use Neutral Labels and Titles',
        description:
          'Ensure chart titles, axis labels, and metric descriptions are descriptive rather than evaluative',
        example:
          'Change "Impressive Revenue Growth" to "Revenue by Quarter (FY2025)" — let the data speak for itself',
        tips: [
          'Avoid superlatives, evaluative adjectives, or loaded language in data labels',
          'Use factual descriptions: dates, units, and measurement names',
          'If interpretation is needed, separate it clearly from the data visualization',
        ],
      },
    ],

    dos: [
      'Show both percentage and absolute values for all key metrics',
      'Start bar chart Y-axes at zero or include clear axis break indicators',
      'Provide user controls for time range, data format, and chart type',
      'Include benchmarks and historical context alongside standalone metrics',
      'Use neutral, descriptive labels for charts and metrics',
      'Show sample sizes and base numbers alongside percentage changes',
      'Default to representative time ranges rather than flattering ones',
      'Present comparison data using consistent scales and formats',
    ],

    donts: [
      'Don\'t truncate bar chart Y-axes to exaggerate small differences',
      'Don\'t show percentages without base numbers, especially on small samples',
      'Don\'t cherry-pick time ranges that hide unfavorable trends',
      'Don\'t use evaluative chart titles that interpret data before users can',
      'Don\'t apply green/red color coding with arbitrary or self-serving thresholds',
      'Don\'t show cumulative totals to hide declining daily rates',
      'Don\'t use dual Y-axes to make unrelated metrics appear correlated',
      'Don\'t lock users into a single data view without alternative frames',
    ],

    bestPractices: [
      {
        title: 'Dual-Format Metric Display',
        description:
          'Always show at least two representations of the same metric (e.g., percentage + absolute)',
        rationale:
          'Each format creates its own frame; showing both lets users triangulate toward accurate understanding',
        example:
          'Display "Churn: 2.3% (1,150 users) | Industry avg: 3.1%"',
      },
      {
        title: 'Zero-Based Bar Charts',
        description:
          'Always start bar chart Y-axes at zero; provide a separate detail view for close comparisons',
        rationale:
          'Bar height encodes magnitude — a bar that looks 5x taller should represent 5x the value',
        example:
          'Main chart shows full scale (0-100%); clicking "zoom" shows the 94-98% range with clear labeling',
      },
      {
        title: 'Representative Default Time Ranges',
        description:
          'Default to standard time ranges (30 days, quarter, year) rather than cherry-picked windows',
        rationale:
          'The default view is the frame most users will accept without question',
        example:
          'Dashboard defaults to 30-day view with clear controls for 7d, 90d, 1y, and custom ranges',
      },
      {
        title: 'Context-Rich Standalone Metrics',
        description:
          'Never show a number in isolation — always include at least one comparison point',
        rationale:
          'A metric without context invites the user to supply their own (often inaccurate) frame',
        example:
          '"Response time: 240ms (target: <200ms, last month: 310ms, industry: 280ms)"',
      },
      {
        title: 'Neutral Chart Labeling',
        description:
          'Use descriptive, factual labels rather than evaluative or interpretive ones',
        rationale:
          'Evaluative labels ("Strong Performance") frame interpretation before the user has seen the data',
        example:
          'Title: "Monthly Revenue — Jan to Dec 2025" instead of "Record-Breaking Revenue Year"',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '1.1.1',
        guideline:
          'Non-text Content — Chart alt text must describe data accurately without evaluative framing',
        implementation:
          'Write alt text that states what the chart shows factually ("Bar chart showing revenue from $940K to $980K across 4 quarters") rather than interpreting it ("Chart showing strong growth")',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.4.1',
        guideline:
          'Use of Color — Don\'t rely solely on green/red color coding to frame data as good/bad',
        implementation:
          'Combine color with icons, text labels ("above target" / "below target"), and patterns so the evaluative frame is accessible to color-blind users',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships — Data tables must present the same multi-frame information as visual charts',
        implementation:
          'Provide accessible data tables as chart alternatives that include both percentage and absolute values, not just one format',
      },
    ],

    ethics: [
      {
        concern: 'Axis Manipulation',
        severity: 'critical',
        explanation:
          'Truncating chart axes to visually exaggerate differences that are statistically minor',
        mitigation:
          'Start bar chart Y-axes at zero. If detail views are needed, provide them separately with clear axis labeling and break indicators.',
      },
      {
        concern: 'Cherry-Picked Time Ranges',
        severity: 'high',
        explanation:
          'Selecting time ranges that frame data favorably while hiding longer-term unfavorable trends',
        mitigation:
          'Default to standard time ranges. Provide user controls for adjustment. Always show the full date range in use.',
      },
      {
        concern: 'Percentage Inflation',
        severity: 'high',
        explanation:
          'Using percentages on small base numbers to make trivial changes appear dramatic',
        mitigation:
          'Always show base numbers alongside percentages. Flag when sample sizes are too small for reliable percentage calculations.',
      },
      {
        concern: 'Narrative Data Manipulation',
        severity: 'medium',
        explanation:
          'Using chart titles, captions, and labels to frame data interpretation before users can assess it independently',
        mitigation:
          'Use neutral, descriptive labels. Separate data presentation from data interpretation. Let users draw their own conclusions first.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'The Framing of Decisions and the Psychology of Choice',
        author: 'Tversky, A., & Kahneman, D.',
        year: 1981,
        doi: '10.1126/science.7455683',
        description:
          'The foundational paper demonstrating how framing of identical options leads to different decisions, introducing the Asian Disease Problem',
        type: 'foundational',
      },
      {
        title: 'All Frames Are Not Created Equal: A Typology and Critical Analysis of Framing Effects',
        author: 'Levin, I. P., Schneider, S. L., & Gaeth, G. J.',
        year: 1998,
        doi: '10.1006/obhd.1998.2804',
        description:
          'Comprehensive taxonomy distinguishing risky choice framing, attribute framing, and goal framing — essential for understanding framing bias beyond gain/loss',
        type: 'advanced',
      },
      {
        title: 'Framing Effects in Survey Experiments: Consistency and Potential Solutions',
        author: 'Druckman, J. N.',
        year: 2001,
        doi: '10.1093/poq/65.2.225',
        description:
          'How framing effects manifest in real-world surveys and data collection, with implications for dashboard and report design',
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
          'Extensive coverage of framing effects by the Nobel laureate who discovered them, with practical examples from medicine, law, and policy',
        type: 'foundational',
      },
      {
        title: 'How Charts Lie: Getting Smarter about Visual Information',
        author: 'Cairo, Alberto',
        year: 2019,
        isbn: '9781324001560',
        description:
          'Practical guide to recognizing and avoiding visual framing bias in data visualization, with before/after examples',
        type: 'practical',
      },
    ],

    articles: [
      {
        title: 'How to Spot Visualization Lies',
        author: 'Flowing Data',
        url: 'https://flowingdata.com/2017/02/09/how-to-spot-visualization-lies/',
        description:
          'Practical guide to identifying truncated axes, misleading scales, and other visual framing tricks',
        type: 'practical',
      },
      {
        title: 'Framing Effect in UX',
        author: 'Nielsen Norman Group',
        url: 'https://www.nngroup.com/articles/framing-effect/',
        description:
          'UX-focused guide to understanding and ethically applying framing in interface design',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'How Statistics Can Be Misleading',
        author: 'TED-Ed (Mark Liddell)',
        url: 'https://www.youtube.com/watch?v=sxYrzzy3cq8',
        description:
          'Accessible video on how the same data can be framed to tell different stories through chart manipulation',
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
