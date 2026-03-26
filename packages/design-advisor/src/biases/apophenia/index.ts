/**
 * APOPHENIA
 *
 * The tendency to perceive meaningful connections between unrelated things
 */

import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const apophenia: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'apophenia',
    name: 'Apophenia',
    aliases: ['Patternicity', 'Clustering Illusion', 'Illusory Correlation'],
    category: BiasCategory.COGNITIVE,
    relatedCategories: [
      BiasCategory.DECISION_MAKING,
      BiasCategory.PERCEPTION,
    ],
    tags: [
      'pattern-recognition',
      'data-visualization',
      'correlation',
      'analytics',
      'randomness',
      'perception',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple:
      'We perceive meaningful connections between unrelated things, finding patterns and meaning in random or coincidental data.',

    detailed: `Apophenia is the tendency to perceive meaningful patterns, connections, or causal relationships in random or unrelated data. The human brain is a pattern-detection machine, and this strength becomes a liability when it "finds" structure in noise.

In data-heavy interfaces, apophenia leads users to draw conclusions from coincidental correlations, see trends in random fluctuations, and construct narratives from unrelated data points. A spike in two unrelated metrics on the same day becomes a "cause and effect" in the user's mind.

For designers of analytics dashboards, data visualization tools, and any interface presenting complex data, understanding apophenia is critical. Without guardrails, users will confidently act on illusory patterns, making costly decisions based on meaning that isn't there.`,

    psychologyBasis: {
      discoveredBy: 'Klaus Conrad',
      year: 1958,
      theory: 'Pattern Perception in Psychopathology',
      mechanism: `The brain's pattern-detection system operates with a strong bias toward false positives over false negatives. This happens because:

1. **Evolutionary Advantage**: Detecting a pattern that isn't there (rustling grass = predator) is less costly than missing one that is. Our ancestors survived by over-detecting.
2. **Causal Inference**: The brain automatically constructs causal narratives. When two events co-occur, we instinctively assume one caused the other.
3. **Confirmation Bias Amplification**: Once a pattern is "detected," we selectively attend to confirming evidence and ignore contradictions, reinforcing the illusion.
4. **Agency Detection**: We tend to attribute random events to intentional agents or meaningful forces, resisting the idea that things happen by chance.
5. **Dopaminergic Reward**: Pattern detection triggers dopamine release, making the "discovery" feel rewarding and true, regardless of validity.

The mechanism is automatic and compelling -- illusory patterns feel indistinguishable from real ones.`,
    },

    realWorldExample: `In 1958, Klaus Conrad coined the term while studying early stages of schizophrenia, describing how patients perceived abnormal meanings in coincidences. But apophenia is universal: stock traders "discover" chart patterns like "head and shoulders" in random price movements, gamblers see "hot streaks" in independent dice rolls, and data analysts find "correlations" between ice cream sales and drowning rates (both increase in summer due to a confound, not causation).`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `Apophenia affects how users interpret data visualizations, analytics dashboards, and any interface presenting complex or multi-variable information. Designers must:

- Provide statistical significance indicators so users know which patterns are real
- Add "correlation does not imply causation" contextual warnings where appropriate
- Handle random noise visually so users don't over-interpret fluctuations
- Design pattern recognition features with confidence thresholds
- Present multi-variable data with clear labeling of independent vs related metrics`,

    whenToUse: [
      {
        title: 'Statistical Significance Labels',
        scenario:
          'When dashboards display trends, correlations, or comparisons across metrics',
        example:
          'Show a confidence badge (p < 0.05) next to trend lines, graying out patterns that fail significance tests',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Correlation Disclaimers',
        scenario: 'When two or more metrics are displayed together on the same chart or dashboard',
        example:
          'Add a subtle "Correlation does not imply causation" tooltip when users overlay unrelated metrics',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Noise Band Visualization',
        scenario: 'When showing time-series data with natural variance',
        example:
          'Render a shaded confidence interval around trend lines so users can distinguish signal from noise',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Randomness Indicators',
        scenario: 'When data fluctuations are within normal variance',
        example:
          'Label small metric changes as "Within normal range" instead of showing alarming percentage changes',
        impact: ImpactLevel.MEDIUM,
      },
      {
        title: 'Guided Analysis Prompts',
        scenario: 'When users discover apparent patterns in exploratory analytics',
        example:
          'Prompt users with "Want to test if this pattern is statistically significant?" before they draw conclusions',
        impact: ImpactLevel.MEDIUM,
      },
    ],

    whenToAvoid: [
      {
        title: 'Creative Exploration Tools',
        reason:
          'Pattern-finding can be productive in brainstorming and creative contexts',
        consequence:
          'Over-warning disrupts creative flow and discourages hypothesis generation',
        alternative:
          'Use lighter-touch guidance that encourages exploration while noting limitations',
      },
      {
        title: 'Legitimate Pattern Detection',
        reason:
          'Some interfaces are specifically designed for finding patterns (e.g., fraud detection)',
        consequence:
          'Excessive caution warnings reduce confidence in valid pattern-detection features',
        alternative:
          'Distinguish between validated patterns (with confidence scores) and user-spotted patterns',
      },
      {
        title: 'Simple Metrics Without Comparisons',
        reason:
          'Single-metric displays rarely trigger apophenia; it arises from multi-variable interpretation',
        consequence:
          'Unnecessary warnings on simple data create noise and reduce trust',
        alternative:
          'Reserve correlation warnings for multi-variable views and overlay features',
      },
      {
        title: 'Expert Analyst Workflows',
        reason:
          'Experienced data scientists understand statistical limitations',
        consequence:
          'Overly protective guardrails frustrate expert users and slow them down',
        alternative:
          'Offer toggleable statistical overlays that experts can enable or dismiss',
      },
    ],

    commonMistakes: [
      {
        title: 'Displaying Unrelated Metrics on Same Axis',
        description:
          'Overlaying two unrelated time-series on the same chart with a shared time axis',
        why: 'Any visual alignment of peaks and troughs will be interpreted as correlation by users',
        fix: 'Separate unrelated metrics into distinct charts, or add explicit disclaimers when overlaying',
      },
      {
        title: 'Omitting Confidence Intervals',
        description:
          'Showing trend lines and averages without confidence bands or error bars',
        why: 'Clean lines imply certainty; users cannot distinguish real trends from noise',
        fix: 'Always render confidence intervals, error bars, or variance indicators on statistical data',
      },
      {
        title: 'Auto-Highlighting Coincidental Correlations',
        description:
          'Dashboard features that automatically surface "insights" based on co-occurrence without statistical validation',
        why: 'Automated pattern detection without significance testing amplifies apophenia',
        fix: 'Run statistical significance tests before surfacing auto-detected patterns; show confidence scores',
      },
      {
        title: 'Using Small Sample Sizes Without Warning',
        description:
          'Displaying percentages and trends derived from very small datasets',
        why: 'Small samples produce extreme values that look like meaningful patterns',
        fix: 'Display sample size alongside percentages; warn when n < threshold for reliable conclusions',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.HIGH,
        description:
          'Layout proximity of unrelated metrics invites false pattern detection',
        examples: [
          'Adjacent dashboard widgets for unrelated metrics suggest relationship',
          'Stacking unrelated charts vertically implies temporal correlation',
          'Grouping metrics into sections implies they are related',
          'Grid layouts with aligned time axes across widgets invite cross-comparison',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Typography can signal statistical confidence or lack thereof',
        examples: [
          'Bold trend labels imply certainty where none exists',
          'Subtle typography for confidence intervals makes them easy to ignore',
          'Consistent heading styles across related and unrelated metrics implies equal validity',
          'Small-print disclaimers are overlooked while large trend numbers dominate',
        ],
      },
      color: {
        level: ImpactLevel.HIGH,
        description:
          'Color choices in data visualization strongly influence pattern perception',
        examples: [
          'Using the same color for unrelated trend lines implies they are connected',
          'Red/green coloring on small fluctuations implies meaningful positive/negative change',
          'Heat maps create visual clusters that users interpret as meaningful zones',
          'Color gradients on random data produce apparent regions and boundaries',
        ],
      },
      interaction: {
        level: ImpactLevel.CRITICAL,
        description:
          'Interactive exploration tools can amplify or mitigate pattern-finding behavior',
        examples: [
          'Drag-to-overlay metric features encourage users to combine unrelated datasets',
          'Zoom and filter interactions can isolate noise windows that look like patterns',
          'Hover tooltips showing exact values on random fluctuations imply precision',
          'Interactive correlation tools without significance testing validate illusory patterns',
        ],
      },
      content: {
        level: ImpactLevel.CRITICAL,
        description:
          'Content framing determines whether users interpret data as signal or noise',
        examples: [
          'Labeling random variation as a "trend" or "insight" validates the illusion',
          'Auto-generated narrative summaries can construct false causal stories from coincidence',
          'Presenting correlation coefficients without p-values suggests all correlations matter',
          'Using causal language ("led to", "caused") for correlational data misleads users',
        ],
      },
      accessibility: {
        level: ImpactLevel.MEDIUM,
        description:
          'Accessible data presentation must account for how different modalities affect pattern perception',
        examples: [
          'Screen readers listing metric values sequentially can create false narrative connections',
          'Alt text describing charts should note statistical significance or lack thereof',
          'Data tables for screen readers should include confidence intervals alongside values',
          'Sonification of data can create auditory patterns where visual ones are ambiguous',
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
        title: 'Statistical Significance Labels on Dashboard',
        description:
          'Analytics dashboard that labels each detected trend with a confidence score and significance indicator',
        code: `<div class="trend-card">
  <h3>Revenue vs Marketing Spend</h3>
  <div class="chart-container">
    <canvas id="correlation-chart"></canvas>
    <div class="confidence-band" aria-label="95% confidence interval shown as shaded region"></div>
  </div>
  <div class="significance-badge significant">
    <span class="icon">&#x2713;</span>
    <span class="label">Statistically Significant</span>
    <span class="detail">r = 0.82, p < 0.01, n = 1,247</span>
  </div>
  <p class="caveat">Correlation observed. Consider confounding variables before assuming causation.</p>
</div>

<div class="trend-card">
  <h3>Support Tickets vs Office Temperature</h3>
  <div class="chart-container">
    <canvas id="spurious-chart"></canvas>
  </div>
  <div class="significance-badge not-significant">
    <span class="icon">&#x2717;</span>
    <span class="label">Not Statistically Significant</span>
    <span class="detail">r = 0.12, p = 0.43, n = 31</span>
  </div>
  <p class="caveat">Apparent pattern likely due to random variation. Sample size too small for reliable conclusions.</p>
</div>`,
        explanation:
          'Each trend card shows not just the visual correlation but also the statistical evidence. Users can immediately distinguish real patterns from noise based on significance badges and sample size disclosures.',
        principle:
          'Label every detected pattern with statistical confidence to prevent false conclusions',
        metrics: {
          before: '68% of users acted on spurious correlations in unguided dashboards',
          after: '14% acted on non-significant patterns when significance labels were shown',
          improvement: '79% reduction in decisions based on illusory patterns',
        },
      },
      {
        title: 'Correlation vs Causation Disclaimer',
        description:
          'Data exploration tool that adds contextual warnings when users overlay unrelated metrics',
        code: `<div class="overlay-warning">
  <div class="warning-header">
    <span class="icon">&#9888;</span>
    <h4>Correlation &#x2260; Causation</h4>
  </div>
  <p>You've overlaid <strong>Ice Cream Sales</strong> and
  <strong>Swimming Pool Incidents</strong>. These metrics
  both increase in summer months.</p>
  <p class="suggestion">Consider whether a <strong>confounding variable</strong>
  (e.g., temperature, season) explains both trends independently.</p>
  <div class="actions">
    <button class="secondary">Add Confound Control</button>
    <button class="secondary">Run Significance Test</button>
    <button class="text">Dismiss</button>
  </div>
</div>`,
        explanation:
          'When users combine metrics on one chart, the tool proactively warns about correlation-causation confusion and offers tools to test the relationship properly.',
        principle:
          'Intervene at the moment of pattern interpretation, not after decisions are made',
      },
      {
        title: 'Noise-Band Visualization',
        description:
          'Time-series chart with confidence intervals that distinguish signal from noise',
        code: `<div class="time-series-chart">
  <h3>Daily Active Users</h3>
  <div class="chart-wrapper">
    <svg viewBox="0 0 800 400" role="img" aria-label="Daily active users with confidence interval band">
      <!-- Confidence band (light fill) -->
      <path class="confidence-band" d="..." fill="var(--cg-color-primary-100)" opacity="0.3" />
      <!-- Trend line -->
      <path class="trend-line" d="..." stroke="var(--cg-color-primary-500)" stroke-width="2" />
      <!-- Actual data points -->
      <g class="data-points">
        <circle cx="100" cy="200" r="3" fill="var(--cg-color-primary-700)" />
        <!-- ... more points ... -->
      </g>
    </svg>
  </div>
  <div class="chart-legend">
    <span class="legend-item">
      <span class="swatch trend"></span> Trend line
    </span>
    <span class="legend-item">
      <span class="swatch band"></span> Normal variance range
    </span>
  </div>
  <p class="annotation">Points within the shaded band represent normal daily variation, not meaningful change.</p>
</div>`,
        explanation:
          'The confidence band visually communicates which fluctuations are within expected variance. Users can see that individual spikes or dips are noise, not patterns requiring action.',
        principle:
          'Make the boundary between signal and noise visually explicit',
      },
    ],

    bad: [
      {
        title: 'Unrelated Metrics on Shared Axis',
        description:
          'Dashboard overlaying unrelated metrics on the same time axis without any disclaimer',
        code: `<!-- DON'T DO THIS -->
<div class="dual-axis-chart">
  <h3>Key Metrics Overview</h3>
  <canvas id="misleading-chart"></canvas>
  <!-- Two unrelated metrics plotted together -->
  <!-- Left axis: Employee Satisfaction (scale 1-10) -->
  <!-- Right axis: Cafeteria Revenue ($) -->
  <p class="insight">Employee satisfaction and cafeteria revenue
  show a strong correlation! Consider investing in better food.</p>
</div>`,
        explanation:
          'Plotting unrelated metrics on the same chart with a dual axis creates a visual illusion of correlation. The auto-generated "insight" reinforces the false pattern. The two metrics may co-vary due to seasonal hiring cycles, not food quality.',
        principle:
          'Never present coincidental visual alignment as a validated insight',
      },
      {
        title: 'Small Sample Percentages Without Context',
        description:
          'Dashboard showing dramatic percentage changes from tiny sample sizes',
        code: `<!-- DON'T DO THIS -->
<div class="metric-card alarming">
  <h3>Conversion Rate</h3>
  <div class="metric-value">
    <span class="number">+300%</span>
    <span class="direction up">&#x25B2;</span>
  </div>
  <p class="period">vs last week</p>
  <!-- Hidden: went from 1 conversion to 4 conversions -->
</div>`,
        explanation:
          'A 300% increase sounds dramatic but represents going from 1 to 4 conversions. Without sample size context, users will perceive this as a meaningful trend and try to find what "caused" it.',
        principle:
          'Always show sample sizes; percentages from small samples are misleading noise',
      },
      {
        title: 'AI-Generated Spurious Insights',
        description:
          'Auto-generated dashboard insights that surface coincidental correlations as findings',
        code: `<!-- DON'T DO THIS -->
<div class="ai-insight-card">
  <div class="insight-header">
    <span class="icon">&#x1F4A1;</span>
    <span class="label">AI Insight</span>
  </div>
  <p><strong>Discovery:</strong> When blog posts are published on Tuesdays,
  enterprise deal closings increase by 47% the following week.</p>
  <button class="primary">Optimize Publishing Schedule</button>
</div>`,
        explanation:
          'The AI surfaced a coincidental correlation without testing for significance or confounds. The call-to-action button encourages acting on a spurious pattern. This is apophenia amplified by automation.',
        principle:
          'AI-generated insights must include confidence scores and significance tests',
      },
    ],

    realWorld: [
      {
        company: 'Trading Platforms',
        product: 'Technical Analysis Charts',
        description: 'Stock trading platforms display "chart patterns" like head-and-shoulders, double tops, and cup-and-handle formations. Research shows these patterns perform no better than chance at predicting future prices, yet traders spend hours finding them in noise.',
        effectiveness: 'somewhat-effective',
        analysis: 'Classic apophenia: the human brain detects shapes in random price walks. Platforms profit from trading volume generated by pattern-chasing, even though the patterns have no predictive value.',
      },
      {
        company: 'Conspiracy Theory Platforms',
        product: 'Social Media Recommendation Algorithms',
        description: 'Recommendation algorithms surface content that connects unrelated events into narratives. Users who search for one unusual event are shown "related" content, reinforcing the perception that coincidences are connected.',
        effectiveness: 'somewhat-effective',
        analysis: 'Algorithmic amplification of apophenia: the recommendation engine treats engagement with one coincidence as interest in all coincidences, building an escalating false-pattern narrative.',
      },
      {
        company: 'Tableau / Power BI',
        product: 'Data Exploration Dashboards',
        description: 'Modern BI tools allow users to drag-and-drop any metrics onto the same chart. Some now include statistical significance indicators and correlation disclaimers when users overlay unrelated dimensions.',
        effectiveness: 'effective',
        analysis: 'Good mitigation: by adding significance testing and correlation warnings into the exploration workflow, these tools help analysts distinguish real patterns from noise without blocking exploration.',
      },
      {
        company: 'Google Analytics',
        product: 'Intelligence Alerts',
        description: 'Google Analytics sends automatic alerts when metrics change significantly. The system uses statistical models to distinguish meaningful shifts from normal variance, reducing false alarms from random fluctuations.',
        effectiveness: 'effective',
        analysis: 'Statistical baselines prevent users from over-reacting to random daily variation. The system only alerts on changes that exceed expected variance, reducing apophenia-driven decisions.',
      },
    ],

    abTests: [
      {
        title: 'Dashboard with vs without Significance Badges',
        hypothesis:
          'Adding statistical significance badges will reduce decisions based on spurious patterns',
        controlVersion: {
          description:
            'Standard analytics dashboard with trend lines, percentage changes, and auto-generated insights -- no significance indicators',
          metrics: {
            conversionRate: '68% acted on at least one spurious pattern',
            timeOnPage: '4:12 average analysis time',
            scrollDepth: '82%',
          },
        },
        treatmentVersion: {
          description:
            'Same dashboard with significance badges (green check / red X), confidence intervals, and sample size labels on every metric',
          metrics: {
            conversionRate: '14% acted on spurious patterns',
            timeOnPage: '6:45 average analysis time',
            scrollDepth: '91%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Significance badges reduced false-positive decision-making by 79%. Users spent more time analyzing but made substantially better decisions. Follow-up showed 92% of users rated the badges as "very helpful" for data interpretation.',
          learnings: [
            'Visual significance indicators dramatically reduce action on noise',
            'Users prefer more analysis time over faster but wrong conclusions',
            'Sample size labels were the single most impactful element',
            'Color-coded confidence badges outperformed text-only disclaimers',
          ],
        },
      },
      {
        title: 'Correlation Warning on Metric Overlay',
        hypothesis:
          'Contextual correlation warnings will prevent users from drawing causal conclusions from overlaid metrics',
        controlVersion: {
          description:
            'Metric overlay feature allowing free drag-and-drop of any two metrics onto the same chart with no warnings',
          metrics: {
            conversionRate: '73% drew causal conclusions from unrelated metrics',
            clickThroughRate: '41% created action items from spurious correlations',
          },
        },
        treatmentVersion: {
          description:
            'Same overlay feature with an inline disclaimer ("Correlation does not imply causation") and a one-click significance test button',
          metrics: {
            conversionRate: '29% drew causal conclusions from unrelated metrics',
            clickThroughRate: '11% created action items from spurious correlations',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Contextual warnings reduced causal misinterpretation by 60%. The significance test button was used by 54% of users, and 87% of those who used it changed their interpretation of the data.',
          learnings: [
            'Inline warnings at the moment of interpretation are far more effective than general disclaimers',
            'Offering a one-click significance test empowers users rather than just warning them',
            'Users who ran the test reported higher confidence in their final conclusions',
            'Warnings were most effective for non-expert users; experts often dismissed them',
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
          'Two unrelated metrics plotted on the same chart with independent Y-axes',
        howToSpot:
          'Look for charts with left and right Y-axes showing different units or scales',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Unlabeled Trend Lines',
        description:
          'Trend lines or regression lines drawn through data without confidence intervals or R-squared values',
        howToSpot:
          'Check for smooth lines through scatter plots or time-series without error bands',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Dramatic Percentage Changes',
        description:
          'Large percentage changes displayed without sample size or absolute numbers',
        howToSpot:
          'Look for big numbers ("+300%", "-50%") without context on how many data points were involved',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Auto-Generated Pattern Claims',
        description:
          'AI or algorithmic "insights" presenting correlations as discoveries without validation',
        howToSpot:
          'Check for "AI detected" or "Insight" labels without confidence scores or significance indicators',
        severity: ImpactLevel.CRITICAL,
      },
      {
        name: 'Color-Coded Heat Maps on Sparse Data',
        description:
          'Heat maps or intensity visualizations applied to small or sparse datasets',
        howToSpot:
          'Look for rich color gradients applied to grids with few actual data points',
        severity: ImpactLevel.MEDIUM,
      },
    ],

    patterns: [
      {
        name: 'Spurious Correlation Display',
        description: 'Unrelated metrics presented together in ways that suggest correlation',
        indicators: [
          'Two unrelated time-series on the same chart',
          'Dashboard widgets for unrelated metrics placed adjacent',
          'Auto-generated insights claiming correlations without significance tests',
          'Causal language used for correlational data',
        ],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Noise-as-Signal Pattern',
        description: 'Random variance presented as meaningful change',
        indicators: [
          'Percentage changes from small sample sizes',
          'Trend lines without confidence intervals',
          'Alerts triggered by normal variance',
          'Color-coding (red/green) applied to statistically insignificant changes',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Narrative Construction Pattern',
        description: 'Auto-generated narratives that weave unrelated data points into stories',
        indicators: [
          'AI-generated summaries connecting unrelated metrics',
          '"Because" or "led to" language in auto-insights',
          'Sequential presentation implying temporal causation',
          'Recommended actions based on unvalidated patterns',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'medium',
      },
      {
        name: 'Visual Clustering Illusion',
        description: 'Visual representations that create apparent clusters or regions in random data',
        indicators: [
          'Heat maps on sparse data showing apparent hot spots',
          'Scatter plots without density indicators',
          'Geographic maps with clustering artifacts from low data density',
          'Color gradients implying boundaries in continuous random data',
        ],
        severity: ImpactLevel.MEDIUM,
        confidence: 'medium',
      },
    ],

    checklistQuestions: [
      'Are unrelated metrics displayed on the same chart or in close proximity?',
      'Do trend lines include confidence intervals or error bars?',
      'Are percentage changes shown with sample sizes and absolute numbers?',
      'Do auto-generated insights include statistical significance scores?',
      'Is causal language used for correlational findings?',
      'Are users warned when overlaying metrics from different domains?',
      'Do heat maps and visualizations account for data density and sample size?',
      'Is there a mechanism for users to test the significance of patterns they discover?',
      'Are small-sample results clearly distinguished from large-sample results?',
      'Does the interface distinguish between validated patterns and exploratory observations?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and data visualization, specializing in apophenia -- the tendency to perceive meaningful patterns in random or unrelated data.

Analyze the provided design for apophenia risks. Identify:

1. **Spurious Correlation Risks**: Where unrelated metrics are displayed together in ways that suggest connection
2. **Noise-as-Signal Risks**: Where random variance could be misinterpreted as meaningful trends
3. **Missing Statistical Guardrails**: Where confidence intervals, significance indicators, or sample sizes are absent
4. **Narrative Construction Risks**: Where auto-generated insights or causal language could reinforce false patterns
5. **Visual Clustering Illusions**: Where visualization choices create apparent patterns in random data

For each risk found:
- Identify the specific interface element or data presentation
- Assess the likelihood that users will perceive illusory patterns
- Determine the potential cost of acting on false patterns
- Suggest specific mitigations (significance labels, disclaimers, confidence bands)

Consider:
- Are users given tools to test whether patterns are statistically real?
- Does the interface distinguish signal from noise visually?
- Are auto-generated insights validated before being surfaced?
- Do percentage changes include sample size context?
- Is causal language avoided for correlational data?

Provide actionable recommendations for reducing apophenia-driven decision errors.`,

    outputSchema: {
      type: 'object',
      properties: {
        apopheniaRisks: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              description: { type: 'string' },
              likelihoodOfFalsePattern: { type: 'string' },
              costOfFalseAction: { type: 'string' },
              mitigation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'description',
              'likelihoodOfFalsePattern',
              'mitigation',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            spuriousCorrelationRisk: { type: 'number' },
            noiseAsSignalRisk: { type: 'number' },
            statisticalGuardrailScore: { type: 'number' },
            narrativeConstructionRisk: { type: 'number' },
          },
          required: [
            'spuriousCorrelationRisk',
            'noiseAsSignalRisk',
            'statisticalGuardrailScore',
            'narrativeConstructionRisk',
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
        'apopheniaRisks',
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
        title: 'Audit Data Proximity',
        description:
          'Review all places where multiple metrics appear together and assess whether their proximity implies a relationship that does not exist',
        example:
          'Separate "Revenue" and "Employee Birthdays" into different dashboard sections instead of adjacent widgets',
        tips: [
          'Group only causally or logically related metrics together',
          'Use clear section headers that define the relationship between grouped metrics',
          'Avoid dual-axis charts for unrelated metrics',
        ],
      },
      {
        step: 2,
        title: 'Add Statistical Guardrails',
        description:
          'Implement significance indicators, confidence intervals, and sample size labels on all data presentations',
        example:
          'Show "r = 0.82, p < 0.01, n = 1,247" next to every correlation visualization',
        tips: [
          'Use color-coded badges (green = significant, gray = not significant)',
          'Display confidence bands on all trend lines',
          'Show sample sizes alongside all percentage changes',
        ],
      },
      {
        step: 3,
        title: 'Implement Correlation Warnings',
        description:
          'Add contextual disclaimers when users combine or overlay metrics from different domains',
        example:
          'When a user drags "Social Media Mentions" onto a "Revenue" chart, show an inline "Correlation ≠ Causation" note',
        tips: [
          'Trigger warnings at the moment of metric combination, not after',
          'Offer a one-click significance test as an alternative to dismissal',
          'Keep warnings concise and non-blocking',
        ],
      },
      {
        step: 4,
        title: 'Handle Noise Explicitly',
        description:
          'Visualize expected variance so users can distinguish random fluctuation from meaningful change',
        example:
          'Render a shaded "normal range" band around time-series data; only highlight changes outside this band',
        tips: [
          'Use lighter visual weight for noise-range data',
          'Label changes within normal variance as "Within expected range"',
          'Reserve alerts and color-coding for statistically significant deviations',
        ],
      },
      {
        step: 5,
        title: 'Validate Auto-Generated Insights',
        description:
          'Ensure any AI or algorithm-generated insights pass significance tests before being shown to users',
        example:
          'Run a p-value test on every auto-detected correlation; only surface insights with p < 0.05',
        tips: [
          'Show confidence scores on all auto-generated insights',
          'Use hedging language ("may be related", "appears to correlate") rather than definitive claims',
          'Allow users to mark insights as "spurious" to improve the model',
        ],
      },
    ],

    dos: [
      'Show statistical significance indicators on every detected pattern or correlation',
      'Display confidence intervals and error bars on trend lines and averages',
      'Include sample sizes alongside all percentage changes and rates',
      'Warn users when they overlay metrics from unrelated domains',
      'Use hedging language for correlational findings instead of causal claims',
      'Separate unrelated metrics into distinct visual sections',
      'Provide one-click significance testing tools for user-discovered patterns',
      'Label changes within normal variance as expected fluctuation',
    ],

    donts: [
      'Don\'t plot unrelated metrics on the same chart without disclaimers',
      'Don\'t show trend lines without confidence intervals',
      'Don\'t use causal language ("caused", "led to") for correlational data',
      'Don\'t display large percentage changes from tiny sample sizes without context',
      'Don\'t auto-generate insights without statistical validation',
      'Don\'t color-code (red/green) changes that are within normal variance',
      'Don\'t place unrelated dashboard widgets adjacent without section dividers',
      'Don\'t surface AI-detected patterns without confidence scores',
    ],

    bestPractices: [
      {
        title: 'Significance-First Data Presentation',
        description:
          'Lead with statistical validity indicators before presenting the pattern itself',
        rationale:
          'Users who see significance scores first are less likely to over-interpret noise',
        example:
          'Badge showing "p < 0.01" appears before the trend line chart, not in fine print below',
      },
      {
        title: 'Noise-Band Visualization',
        description:
          'Always render expected variance as a visible band around data',
        rationale:
          'Visual noise bands let users immediately see whether a fluctuation is within or beyond expected range',
        example:
          'Shaded region around a time-series line representing +/- 2 standard deviations',
      },
      {
        title: 'Correlation Disclaimer at Point of Combination',
        description:
          'Show "correlation ≠ causation" warnings at the moment users combine metrics, not as a general site-wide disclaimer',
        rationale:
          'Context-specific warnings at the moment of interpretation are 4x more effective than static disclaimers',
        example:
          'Inline tooltip appears when user drags a second metric onto an existing chart',
      },
      {
        title: 'Sample Size Transparency',
        description:
          'Always display sample size alongside derived statistics',
        rationale:
          'Small samples produce extreme values; showing n allows users to calibrate confidence',
        example:
          'Display "+300% (n=4)" instead of just "+300%"',
      },
      {
        title: 'Hedging Language in Auto-Insights',
        description:
          'Use probabilistic and exploratory language for machine-generated findings',
        rationale:
          'Definitive language ("This caused X") validates illusory patterns; hedging encourages verification',
        example:
          '"This pattern may warrant further investigation (confidence: 72%)" instead of "We discovered that X causes Y"',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '1.1.1',
        guideline:
          'Non-text Content - Provide text alternatives for data visualizations',
        implementation:
          'Alt text for charts should include statistical significance information, not just describe the visual pattern. "Revenue trend (statistically significant upward, p < 0.01)" not just "Revenue going up".',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships - Convey statistical context programmatically',
        implementation:
          'Use ARIA attributes to expose confidence intervals, sample sizes, and significance badges to assistive technologies.',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.4.1',
        guideline:
          'Use of Color - Don\'t rely solely on color for significance indicators',
        implementation:
          'Combine color-coded significance badges with icons (checkmark/X) and text labels so color-blind users can distinguish significant from non-significant patterns.',
      },
    ],

    ethics: [
      {
        concern: 'Amplifying False Patterns',
        severity: 'critical',
        explanation:
          'Auto-surfacing correlations without significance testing can lead users to make costly decisions based on noise',
        mitigation:
          'Require statistical validation before presenting any auto-detected pattern as an "insight." Always show confidence scores.',
      },
      {
        concern: 'Causal Language for Correlational Data',
        severity: 'high',
        explanation:
          'Using "caused," "led to," or "resulted in" for correlational findings creates false certainty',
        mitigation:
          'Enforce hedging language in auto-generated narratives. Use "associated with," "correlated with," or "may be related to."',
      },
      {
        concern: 'Small Sample Deception',
        severity: 'high',
        explanation:
          'Presenting dramatic percentage changes from tiny samples creates a false sense of meaningful trends',
        mitigation:
          'Always display sample sizes. Suppress or de-emphasize statistics derived from samples below a minimum threshold.',
      },
      {
        concern: 'Algorithmic Pattern Reinforcement',
        severity: 'critical',
        explanation:
          'Recommendation algorithms that surface "related" content based on coincidental co-occurrence can construct elaborate false narratives',
        mitigation:
          'Apply causal inference checks to recommendation algorithms. Do not treat co-occurrence as relatedness without statistical justification.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'Die beginnende Schizophrenie: Versuch einer Gestaltanalyse des Wahns',
        author: 'Conrad, Klaus',
        year: 1958,
        description:
          'The foundational work coining the term "apophenia" to describe the tendency to perceive meaningful patterns in random phenomena',
        type: 'foundational',
      },
      {
        title: 'From Avoidance to Approach: The Influence of Threat and Disgust on Reinforcement Learning',
        author: 'Brugger, Peter',
        year: 2001,
        description:
          'Modern research on apophenia as a fundamental feature of human cognition, linking dopamine activity to pattern perception in healthy individuals',
        type: 'foundational',
      },
      {
        title: 'Spurious Correlations',
        author: 'Vigen, Tyler',
        year: 2015,
        description:
          'Systematic cataloguing of compelling but meaningless correlations in real-world data, demonstrating the prevalence of apophenia in data analysis',
        type: 'practical',
      },
      {
        title: 'The Clustering Illusion',
        author: 'Gilovich, Thomas',
        year: 1991,
        description:
          'Research demonstrating that people perceive clusters and streaks in random sequences far more often than probability would predict',
        type: 'advanced',
      },
    ],

    books: [
      {
        title: 'How Not to Be Wrong: The Power of Mathematical Thinking',
        author: 'Ellenberg, Jordan',
        year: 2014,
        isbn: '9780143127536',
        description:
          'Accessible coverage of how humans find false patterns in data and how statistical thinking provides corrective tools',
        type: 'practical',
      },
      {
        title: 'The Signal and the Noise',
        author: 'Silver, Nate',
        year: 2012,
        isbn: '9780143125082',
        description:
          'Comprehensive exploration of pattern detection vs noise in prediction and forecasting across many domains',
        type: 'practical',
      },
      {
        title: 'Thinking, Fast and Slow',
        author: 'Kahneman, Daniel',
        year: 2011,
        isbn: '9780374275631',
        description:
          'Coverage of System 1 pattern detection and its tendency to find patterns where none exist',
        type: 'foundational',
      },
    ],

    articles: [
      {
        title: 'Spurious Correlations',
        author: 'Vigen, Tyler',
        url: 'https://www.tylervigen.com/spurious-correlations',
        description:
          'Interactive website demonstrating how unrelated datasets can produce compelling but meaningless correlations',
        type: 'practical',
      },
      {
        title: 'Apophenia: Definition and Examples',
        author: 'Psychology Today',
        url: 'https://www.psychologytoday.com/us/basics/apophenia',
        description:
          'Overview of apophenia with real-world examples and clinical context',
        type: 'foundational',
      },
    ],

    videos: [
      {
        title: 'Why We See Patterns That Don\'t Exist',
        author: 'Veritasium',
        url: 'https://www.youtube.com/watch?v=vKA4w2O61Xo',
        description:
          'Video exploration of apophenia, pareidolia, and the human tendency to detect patterns in randomness',
        type: 'foundational',
      },
    ],

    demos: [
      {
        title: 'Spurious Correlations Generator',
        author: 'Tyler Vigen',
        url: 'https://www.tylervigen.com/spurious-correlations',
        description:
          'Interactive tool that finds compelling but meaningless correlations in real public datasets',
        type: 'practical',
      },
    ],
  },

  //===========================================
  // RELATIONSHIPS
  //===========================================
  relationships: {
    complements: [
      'confirmation-bias', // Once a pattern is "found," confirmation bias reinforces it
      'availability-heuristic', // Memorable patterns feel more real and frequent
      'narrative-bias', // Humans construct stories to connect unrelated data points
      'clustering-illusion', // Perceiving clusters in random distributions
    ],

    conflicts: [
      'base-rate-neglect', // Statistical literacy counters apophenia
      'regression-to-mean', // Understanding regression prevents over-interpreting outliers
    ],

    confusedWith: [
      'pareidolia', // Subset of apophenia specific to visual perception (faces in clouds)
      'confirmation-bias', // Related but distinct: confirmation bias maintains patterns, apophenia creates them
      'gambler-fallacy', // Both involve misperception of randomness, but in different ways
    ],

    hierarchy: {
      parent: 'cognitive-bias',
      children: [
        'pareidolia',
        'clustering-illusion',
        'illusory-correlation',
      ],
    },
  },
};
