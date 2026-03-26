/**
 * HINDSIGHT BIAS
 *
 * After an event, we believe we predicted it would happen
 */


import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const hindsightBias: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'hindsight-bias',
    name: 'Hindsight Bias',
    aliases: ['Knew-It-All-Along Effect', 'Creeping Determinism'],
    category: BiasCategory.MEMORY,
    relatedCategories: [
      BiasCategory.DECISION_MAKING,
      BiasCategory.PERCEPTION,
      BiasCategory.MEMORY,
    ],
    tags: [
      'decision-making',
      'judgment',
      'perception',
      'retrospection',
      'post-mortem',
      'prediction',
      'memory-distortion',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple: 'After an event, we believe we predicted it would happen',

    detailed: `Hindsight bias is the tendency, after an outcome is known, to see that outcome as having been inevitable or predictable all along. People reconstruct their prior beliefs to align with what actually happened, genuinely believing they "knew it all along." This is not conscious dishonesty -- the memory of the original prediction is overwritten by knowledge of the outcome.

This bias has profound implications for learning and accountability. When people believe past outcomes were predictable, they fail to learn from mistakes ("it was obvious"), unfairly blame decision-makers for unpredictable failures, and become overconfident in their ability to predict future events.

In UX and product design, hindsight bias distorts post-mortem analysis, corrupts A/B test interpretation, undermines decision logging, and makes analytics dashboards misleading when they only show outcomes without the predictions and uncertainties that preceded them. Designers must build systems that preserve the context of decisions as they were made, not as they appear in retrospect.`,

    psychologyBasis: {
      discoveredBy: 'Baruch Fischhoff',
      year: 1975,
      theory: 'Cognitive Reconstruction Theory',
      mechanism: `After learning an outcome, the brain retroactively reconstructs memory of prior predictions to align with what actually happened. This occurs through three distinct processes:

1. **Memory Distortion**: Knowledge of the outcome literally overwrites the original memory of what was predicted, making the prior state unrecoverable without external records
2. **Sense-Making**: The brain constructs causal narratives that make the outcome feel inevitable, selectively weighting evidence that pointed toward what happened and discounting evidence that pointed elsewhere
3. **Metacognitive Illusion**: People confuse the current ease of understanding an outcome (which is easy because it already happened) with the ease of having predicted it (which was much harder before the fact)
4. **Anchoring to Outcome**: The known outcome becomes an anchor, and attempts to reconstruct prior beliefs result in insufficient adjustment away from it
5. **Foreseeability Illusion**: As causal chains become clear after the fact, each link seems obvious, creating the illusion that the entire chain was foreseeable

The bias is automatic and resistant to debiasing -- even when warned about hindsight bias, people still exhibit it.`,
    },

    realWorldExample: `After the 2008 financial crisis, many analysts and commentators claimed the crash was "obvious" and "inevitable." Yet before the crisis, the vast majority of economists, regulators, and investors failed to predict it. Fischhoff's research shows this pattern repeats after every major event: elections, disasters, product failures, and stock market moves all seem predictable in retrospect. In a classic study, participants who learned the outcome of a historical battle rated it as significantly more likely than participants who didn't know the outcome -- even when explicitly told to ignore the outcome information.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `Hindsight bias profoundly affects how teams evaluate past decisions, interpret analytics, and learn from outcomes. It distorts post-mortem analysis, corrupts retrospective evaluations, and makes it difficult to improve decision-making processes. Designers must actively counteract it by:

- Building decision journals and prediction logs that capture beliefs before outcomes are known
- Designing analytics dashboards that show predictions alongside actual results
- Creating A/B testing tools that require hypotheses before revealing results
- Structuring post-mortem workflows that separate process evaluation from outcome evaluation
- Presenting historical data with the uncertainty that existed at the time of each decision`,

    whenToUse: [
      {
        title: 'Decision Journals',
        scenario:
          'When building tools for tracking decisions and their outcomes over time',
        example:
          'Require users to log their prediction, confidence level, and reasoning before an outcome is revealed, creating an immutable record for later review',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'A/B Test Hypothesis Recording',
        scenario: 'When designing experiment management platforms',
        example:
          'Force teams to record their hypothesis and expected outcome before showing test results, preventing post-hoc narrative fitting',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Post-Mortem Analysis Tools',
        scenario: 'When building incident review or retrospective workflows',
        example:
          'Structure retrospectives to evaluate decision quality separate from outcome quality, showing what was knowable at the time',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Analytics Dashboard Context',
        scenario: 'When displaying metrics and KPIs with historical data',
        example:
          'Show forecasts, targets, and confidence intervals alongside actual results so users see the uncertainty that existed before outcomes materialized',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Prediction Tracking',
        scenario: 'When users make forecasts or set expectations about future outcomes',
        example:
          'Lock in user predictions with timestamps before outcomes are known, then display prediction accuracy over time to calibrate confidence',
        impact: ImpactLevel.MEDIUM,
      },
    ],

    whenToAvoid: [
      {
        title: 'Quick Decision Contexts',
        reason:
          'Adding prediction-logging overhead to rapid, low-stakes decisions creates friction without proportional learning value',
        consequence:
          'Users abandon the tool due to excessive process requirements',
        alternative:
          'Reserve formal prediction logging for high-stakes or repeated decisions where calibration matters',
      },
      {
        title: 'Demotivating Feedback',
        reason:
          'Constantly showing users how wrong their predictions were can be demoralizing',
        consequence:
          'Users avoid making predictions or using the tool entirely',
        alternative:
          'Frame prediction accuracy as a learning tool, celebrate improvement in calibration over time, not just accuracy',
      },
      {
        title: 'Blame-Oriented Cultures',
        reason:
          'In punitive environments, preserved prediction records can be weaponized against individuals',
        consequence:
          'People stop making honest predictions or game the system',
        alternative:
          'Ensure prediction records are used for learning and calibration, not for blame or performance evaluation',
      },
      {
        title: 'Simple Information Displays',
        reason:
          'Adding historical prediction context to straightforward dashboards can create unnecessary complexity',
        consequence:
          'Information overload and reduced usability for basic monitoring tasks',
        alternative:
          'Offer prediction context as an optional drill-down or advanced view, not the default',
      },
    ],

    commonMistakes: [
      {
        title: 'Outcome-Only Dashboards',
        description:
          'Showing only what happened without what was expected, predicted, or targeted',
        why: 'Without prediction context, every outcome looks inevitable in retrospect, preventing learning about forecasting quality',
        fix: 'Always display predictions, forecasts, or targets alongside actual results with timestamps showing when each was recorded',
      },
      {
        title: 'Retrospective Narrative Fitting',
        description:
          'Allowing post-mortem narratives to be written after outcomes are known without referencing prior documentation',
        why: 'Teams construct "obvious in hindsight" stories that prevent genuine learning about decision processes',
        fix: 'Structure retrospectives to first review what was known and decided at the time, then compare to outcomes',
      },
      {
        title: 'Missing Confidence Intervals',
        description:
          'Presenting single-point forecasts or targets without uncertainty ranges',
        why: 'Single numbers create false precision; when outcomes differ, the forecast seems "wrong" rather than reflecting inherent uncertainty',
        fix: 'Show confidence intervals, probability distributions, or scenario ranges alongside point estimates',
      },
      {
        title: 'Editable Prediction Records',
        description:
          'Allowing users to modify past predictions or decisions after outcomes are known',
        why: 'People unconsciously edit predictions to match outcomes, destroying the learning value of the record',
        fix: 'Make prediction records immutable once submitted, with append-only updates that preserve the original entry',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.HIGH,
        description:
          'Layout determines whether prediction context is visible alongside outcomes',
        examples: [
          'Side-by-side layouts showing predictions vs actuals enable honest comparison',
          'Timeline layouts that preserve temporal context of when decisions were made',
          'Collapsible panels that reveal the state of knowledge at each decision point',
          'Dashboard layouts that default to showing targets alongside actuals, not just actuals alone',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Typography can distinguish between predictions, decisions, and outcomes',
        examples: [
          'Distinct text styles for predictions (italic, lighter weight) vs outcomes (bold, full weight)',
          'Timestamp typography that clearly marks when each piece of information was recorded',
          'Strikethrough or diff-style formatting showing how assessments changed over time',
          'Clear labels distinguishing "predicted" from "actual" values',
        ],
      },
      color: {
        level: ImpactLevel.HIGH,
        description:
          'Color coding helps users distinguish between predictions, uncertainty, and outcomes',
        examples: [
          'Confidence interval shading showing ranges of expected outcomes',
          'Color-coded prediction accuracy (not just right/wrong, but calibration quality)',
          'Distinct hues for forecasted vs actual data series in charts',
          'Graduated opacity representing certainty levels at time of prediction',
        ],
      },
      interaction: {
        level: ImpactLevel.CRITICAL,
        description:
          'Interaction patterns determine whether predictions are captured before outcomes are revealed',
        examples: [
          'Forced prediction entry before showing A/B test results',
          'Progressive disclosure that reveals outcomes only after users commit their expectations',
          'Decision journal interactions that lock entries with timestamps',
          'Retrospective workflows that surface prior documentation before allowing new analysis',
        ],
      },
      content: {
        level: ImpactLevel.CRITICAL,
        description:
          'Content framing determines whether outcomes are presented as inevitable or as one of many possibilities',
        examples: [
          'Copy that says "Result: X (predicted: Y with 70% confidence)" instead of just "Result: X"',
          'Post-mortem templates that ask "What did we know at the time?" before "What happened?"',
          'Microcopy reminding users of the uncertainty that existed before outcomes were known',
          'Warning labels on retrospective analysis: "This analysis was written after the outcome was known"',
        ],
      },
      accessibility: {
        level: ImpactLevel.MEDIUM,
        description:
          'Accessible design ensures prediction context is available to all users, not just visual ones',
        examples: [
          'ARIA labels that convey prediction vs outcome status to screen readers',
          'Programmatic relationships between predictions and their outcomes for assistive technology',
          'Text alternatives for visual confidence intervals and prediction ranges',
          'Keyboard-navigable timeline controls for exploring decision history',
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
        title: 'Decision Journal with Locked Predictions',
        description:
          'A product team decision journal that records predictions before outcomes are known',
        code: `<div class="decision-journal">
  <h3>Decision #47: Launch Feature X</h3>

  <div class="prediction-record locked">
    <span class="lock-icon">Locked Mar 1, 2025</span>
    <h4>Pre-Launch Predictions</h4>
    <div class="prediction">
      <label>Expected adoption (30 days):</label>
      <span class="value">12-18%</span>
      <span class="confidence">Confidence: 65%</span>
    </div>
    <div class="prediction">
      <label>Expected churn impact:</label>
      <span class="value">Neutral to slightly positive</span>
      <span class="confidence">Confidence: 50%</span>
    </div>
    <p class="reasoning">Based on beta feedback from 40 users and
    competitor benchmarks. Main risk: onboarding complexity.</p>
  </div>

  <div class="actual-outcome">
    <h4>Actual Results (30 days)</h4>
    <div class="result">
      <label>Actual adoption:</label>
      <span class="value">8.3%</span>
      <span class="delta negative">Below predicted range</span>
    </div>
    <div class="result">
      <label>Churn impact:</label>
      <span class="value">+0.4% churn increase</span>
      <span class="delta negative">Worse than predicted</span>
    </div>
  </div>

  <div class="retrospective">
    <h4>What We Learned</h4>
    <p class="process-note">Our onboarding concern was correct but
    we underestimated its severity. Prediction was overconfident.</p>
  </div>
</div>`,
        explanation:
          'Locked, timestamped predictions prevent retroactive editing. Showing predictions alongside outcomes makes forecast accuracy visible, enabling genuine learning about calibration and decision quality.',
        principle:
          'Immutable prediction records prevent hindsight bias from corrupting learning',
        metrics: {
          before: 'Teams rated 78% of past decisions as "correct at the time" in unstructured retrospectives',
          after: 'With prediction journals, teams identified actionable process improvements in 62% of reviews',
          improvement: 'Decision quality (measured by prediction calibration) improved 34% over 6 months',
        },
      },
      {
        title: 'A/B Test Hypothesis-First Workflow',
        description:
          'An experimentation platform that requires hypotheses before revealing results',
        code: `<div class="experiment-review">
  <h3>Experiment: Checkout Redesign</h3>

  <div class="hypothesis-record">
    <span class="badge">Hypothesis recorded before results</span>
    <h4>Team Predictions (recorded Feb 15)</h4>
    <div class="team-predictions">
      <div class="person">
        <span>PM (Sarah):</span>
        <span>+8% conversion</span>
        <span class="conf">80% confident</span>
      </div>
      <div class="person">
        <span>Designer (Alex):</span>
        <span>+3% conversion</span>
        <span class="conf">60% confident</span>
      </div>
      <div class="person">
        <span>Engineer (Raj):</span>
        <span>No significant change</span>
        <span class="conf">70% confident</span>
      </div>
    </div>
  </div>

  <div class="results-panel">
    <h4>Actual Results</h4>
    <div class="result">
      <span class="metric">Conversion change: +2.1%</span>
      <span class="stat-sig">p=0.04, 95% CI: [0.3%, 3.9%]</span>
    </div>
    <p class="closest">Closest prediction: Alex (+3%, 60% confident)</p>
  </div>
</div>`,
        explanation:
          'Requiring individual predictions before results prevents the common pattern of teams claiming they "expected that" regardless of outcome. Individual predictions surface diverse perspectives and track calibration over time.',
        principle:
          'Pre-registered hypotheses from each team member create accountability and prevent collective hindsight bias',
      },
      {
        title: 'Analytics Dashboard with Forecast Context',
        description:
          'A metrics dashboard showing forecasts alongside actual performance',
        code: `<div class="metrics-dashboard">
  <div class="metric-card">
    <h4>Monthly Revenue</h4>
    <div class="chart-area">
      <!-- Line chart with forecast band -->
      <div class="forecast-band" title="Forecast range (recorded Jan 1)">
        <span class="forecast-label">Forecast: $420K-$480K</span>
        <span class="forecast-confidence">75% confidence</span>
      </div>
      <div class="actual-line">
        <span class="actual-label">Actual: $395K</span>
        <span class="delta">Below forecast range</span>
      </div>
    </div>
    <p class="context">Forecast was made before Q1 market downturn
    was apparent. 3 of last 12 months fell below forecast range.</p>
  </div>
</div>`,
        explanation:
          'Showing the forecast range that was set before the outcome prevents the "we should have known" reaction. The historical hit rate (3 of 12 months below range) helps calibrate whether the miss is unusual or expected given the confidence level.',
        principle:
          'Forecasts with confidence intervals preserve the uncertainty context that hindsight erases',
      },
    ],

    bad: [
      {
        title: 'Outcome-Only Post-Mortem',
        description:
          'A retrospective tool that only shows what happened, not what was predicted',
        code: `<!-- DON'T DO THIS -->
<div class="post-mortem">
  <h3>Incident Post-Mortem: API Outage</h3>
  <div class="timeline">
    <div class="event">2:00 PM - CPU spike detected</div>
    <div class="event">2:15 PM - Alerts triggered</div>
    <div class="event">2:45 PM - Service degraded</div>
    <div class="event">3:30 PM - Full outage</div>
    <div class="event">5:00 PM - Service restored</div>
  </div>
  <div class="analysis">
    <h4>Root Cause</h4>
    <p>The deployment included an N+1 query that was
    <strong>obviously problematic</strong> in retrospect.</p>
    <h4>Action Items</h4>
    <p>Review all queries before deployment (should have been caught).</p>
  </div>
</div>`,
        explanation:
          'This post-mortem presents the timeline as a clear chain of causation, making the failure seem obvious and preventable. It uses "obviously problematic" and "should have been caught" language that is classic hindsight bias. It never shows what was known at deployment time, what other issues were being monitored, or why the query passed review.',
        principle:
          'Outcome-only narratives make every failure seem preventable, creating blame rather than learning',
      },
      {
        title: 'Editable Prediction Records',
        description:
          'A planning tool that lets users update their forecasts after outcomes are known',
        code: `<!-- DON'T DO THIS -->
<div class="forecast-tracker">
  <h3>Q1 Revenue Forecast</h3>
  <div class="forecast-entry">
    <label>Your forecast:</label>
    <input type="text" value="$450K" />
    <button class="edit-btn">Update Forecast</button>
    <span class="last-edited">Last edited: March 31</span>
    <!-- March 31 is AFTER the quarter ended! -->
  </div>
  <div class="actual">
    <label>Actual Q1 revenue:</label>
    <span>$382K</span>
  </div>
</div>`,
        explanation:
          'Allowing forecast edits after outcomes are known is an invitation for unconscious (or conscious) hindsight bias. The "Last edited: March 31" timestamp shows this forecast was modified after the quarter ended, destroying its value as a prediction record.',
        principle:
          'Editable predictions after outcomes are known guarantee hindsight bias corruption',
      },
      {
        title: 'Results-First A/B Test Display',
        description:
          'An experimentation tool that shows results before asking what was expected',
        code: `<!-- DON'T DO THIS -->
<div class="experiment-results">
  <h3>Experiment Complete!</h3>
  <div class="winner-banner">
    <span class="trophy">Winner: Variant B (+12.4% conversion)</span>
  </div>
  <div class="details">
    <p>Variant B's simplified form reduced friction significantly.</p>
  </div>
  <div class="post-hoc-survey">
    <h4>Team Reflection</h4>
    <label>Did this match your expectations?</label>
    <select>
      <option>Yes, I expected this</option>
      <option>Somewhat expected</option>
      <option>Surprising result</option>
    </select>
  </div>
</div>`,
        explanation:
          'Showing the winner with a trophy banner before asking about expectations guarantees that most team members will claim they "expected this." The survey after results is meaningless because hindsight bias has already corrupted their memory of their original beliefs.',
        principle:
          'Asking "did you expect this?" after showing results always produces "yes" due to hindsight bias',
      },
    ],

    realWorld: [
      {
        company: 'Atlassian',
        product: 'Jira Decision Log Templates',
        description: 'Atlassian promotes decision log templates in Confluence that capture the context, options considered, and expected outcomes at the time a decision is made. When teams revisit decisions, the log preserves what was known and predicted, counteracting hindsight bias in retrospectives.',
        effectiveness: 'effective',
        analysis: 'Decision logs that capture predictions and reasoning at decision time create institutional memory that resists hindsight distortion. Most effective when entries are locked after submission and reviewed systematically.',
      },
      {
        company: 'Optimizely',
        product: 'Hypothesis-First Experimentation',
        description: 'Optimizely requires teams to record a hypothesis before launching an experiment. The hypothesis is displayed alongside results, making it clear whether the outcome was predicted or surprising. This prevents post-hoc narrative fitting.',
        effectiveness: 'very-effective',
        analysis: 'Pre-registered hypotheses are one of the strongest defenses against hindsight bias in experimentation. By forcing explicit predictions, the platform creates an honest record that makes learning from surprises possible.',
      },
      {
        company: 'Robinhood',
        product: 'Stock Price Prediction Features',
        description: 'Some trading platforms let users record price predictions before market events. Comparing predicted vs actual outcomes over time helps users see their actual forecasting ability rather than their reconstructed "I knew it" memory.',
        effectiveness: 'effective',
        analysis: 'Prediction tracking in financial contexts directly counters the overconfidence that hindsight bias creates. Users who track predictions become better calibrated over time and make more measured investment decisions.',
      },
      {
        company: 'PagerDuty',
        product: 'Blameless Post-Mortem Templates',
        description: 'PagerDuty\'s post-mortem templates explicitly ask teams to document what information was available at each decision point during an incident, separating "what we knew then" from "what we know now." This structure counters the "should have been obvious" narrative.',
        effectiveness: 'very-effective',
        analysis: 'Blameless post-mortems that explicitly reconstruct the information state at each decision point are the gold standard for counteracting hindsight bias in incident review. They transform blame into learning.',
      },
    ],

    abTests: [
      {
        title: 'Pre-Registered Hypotheses vs Post-Hoc Reflection',
        hypothesis:
          'Teams that record hypotheses before seeing results will identify more genuine learnings than teams reflecting after results',
        controlVersion: {
          description:
            'Experimentation platform shows results first, then asks team to reflect on whether the outcome was expected and what they learned',
          metrics: {
            conversionRate: '23% of retrospectives produced actionable insights',
            timeOnPage: '4:30 average retrospective duration',
          },
        },
        treatmentVersion: {
          description:
            'Platform requires each team member to record their individual prediction and confidence before revealing results, then shows predictions alongside outcomes',
          metrics: {
            conversionRate: '61% of retrospectives produced actionable insights',
            timeOnPage: '8:15 average retrospective duration',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Pre-registered hypotheses nearly tripled actionable insights. Teams spent more time in retrospectives but the time was productive -- they focused on understanding why predictions diverged from outcomes rather than constructing post-hoc narratives.',
          learnings: [
            'Individual predictions prevented groupthink and hindsight consensus',
            'Showing confidence levels helped teams calibrate over time',
            'The biggest learning came from high-confidence wrong predictions',
            'Teams initially resisted the extra step but valued it after seeing calibration data',
          ],
        },
      },
      {
        title: 'Dashboard Forecast Context vs Outcome Only',
        hypothesis:
          'Showing forecast ranges alongside actuals will improve decision quality in weekly reviews',
        controlVersion: {
          description:
            'Analytics dashboard showing only actual metrics: revenue, conversion rate, churn, with week-over-week change',
          metrics: {
            conversionRate: '15% of review meetings led to strategy changes',
            scrollDepth: '34% engagement with historical data',
          },
        },
        treatmentVersion: {
          description:
            'Same dashboard but each metric shows the forecast range (set at start of period) alongside actuals, with hit rate for forecast accuracy over time',
          metrics: {
            conversionRate: '38% of review meetings led to strategy changes',
            scrollDepth: '67% engagement with historical data',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Forecast context more than doubled the rate of meaningful strategy changes. Teams stopped saying "we knew revenue would dip" and started asking "why did our forecast miss?" -- a much more productive question.',
          learnings: [
            'Forecast ranges prevented the "we expected that" dismissal of concerning metrics',
            'Historical forecast accuracy data improved team calibration over quarters',
            'Teams began investing more effort in forecasting quality',
            'The biggest value came when actuals fell outside forecast ranges -- these triggered real investigation',
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
        name: 'Outcome-Only Displays',
        description:
          'Dashboards, reports, or post-mortems that show only what happened without what was predicted or expected',
        howToSpot:
          'Look for metrics, timelines, or results displayed without corresponding forecasts, targets, or hypotheses',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Missing Timestamps on Assessments',
        description:
          'Analysis or evaluations without clear indication of when they were written relative to outcomes',
        howToSpot:
          'Check if post-mortem analyses, decision evaluations, or strategy reviews have timestamps, and whether those timestamps are before or after outcomes were known',
        severity: ImpactLevel.HIGH,
      },
      {
        name: '"Obviously" Language',
        description:
          'Retrospective content using language like "obviously," "should have known," "clearly predictable," or "inevitable"',
        howToSpot:
          'Search for deterministic language in post-mortems, reviews, or retrospective analyses that implies outcomes were foreseeable',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Editable Prediction Fields',
        description:
          'Forms or records that allow past predictions or forecasts to be modified after outcomes are known',
        howToSpot:
          'Look for edit buttons on past forecasts, missing version history, or "last edited" dates that fall after the predicted event',
        severity: ImpactLevel.CRITICAL,
      },
      {
        name: 'Results-First Experiment Reviews',
        description:
          'A/B test or experiment tools that show results before asking for or displaying original hypotheses',
        howToSpot:
          'Check the experiment review flow -- if results are visible before hypotheses are recalled or recorded, hindsight bias is enabled',
        severity: ImpactLevel.HIGH,
      },
    ],

    patterns: [
      {
        name: 'Narrative Causality Pattern',
        description: 'Post-hoc narratives that present a chain of events as an inevitable causal sequence, when in reality the outcome was uncertain',
        indicators: ['Linear timelines without decision branch points', 'Root cause analysis without alternative explanations', '"This led to that" language without acknowledging uncertainty', 'Missing counterfactual analysis'],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Prediction Erasure Pattern',
        description: 'Systems that fail to preserve or display what was predicted, expected, or planned before outcomes were known',
        indicators: ['No hypothesis field in experiment tools', 'No forecast range on dashboards', 'Decision logs without expected outcomes', 'Retrospectives without prior prediction review'],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Outcome-Anchored Evaluation Pattern',
        description: 'Evaluation frameworks that judge decision quality by outcome quality rather than process quality',
        indicators: ['Performance reviews based on results without process assessment', 'Post-mortems that jump to "what went wrong" without "what was known"', 'Success metrics that only measure outcomes, not prediction accuracy', 'Blame assignment based on outcomes rather than available information'],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Retrospective Consensus Pattern',
        description: 'Group retrospectives where the team converges on a shared narrative that the outcome was expected, without checking individual predictions',
        indicators: ['Group discussion before individual reflection', 'No record of individual predictions', '"We all knew this would happen" language', 'Unanimous agreement in retrospective analysis'],
        severity: ImpactLevel.MEDIUM,
        confidence: 'medium',
      },
    ],

    checklistQuestions: [
      'Are predictions or hypotheses recorded before outcomes are known?',
      'Are prediction records immutable once submitted?',
      'Do dashboards show forecasts or targets alongside actual results?',
      'Do post-mortem templates ask "what was known at the time?" before "what happened?"',
      'Are A/B test hypotheses required before results are revealed?',
      'Is there language like "obviously," "should have known," or "inevitable" in retrospective content?',
      'Can users edit past predictions or assessments after outcomes are known?',
      'Do retrospectives collect individual predictions before group discussion?',
      'Are confidence intervals or uncertainty ranges shown with forecasts?',
      'Is forecast accuracy tracked over time to enable calibration?',
      'Does the design separate decision quality evaluation from outcome quality evaluation?',
      'Are decision records timestamped to show when assessments were made relative to outcomes?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in hindsight bias (the "knew-it-all-along" effect).

Analyze the provided design for hindsight bias vulnerabilities and mitigations. Identify:

1. **Prediction Preservation**: Whether predictions, hypotheses, or expectations are recorded before outcomes are known
2. **Temporal Context**: Whether the design preserves what was known vs what is known now
3. **Outcome Framing**: Whether outcomes are presented as inevitable or as one of many possibilities
4. **Retrospective Integrity**: Whether post-mortem or review processes account for hindsight distortion
5. **Calibration Support**: Whether the design helps users track and improve their prediction accuracy

For each pattern found:
- Identify whether hindsight bias is being enabled or mitigated
- Assess the severity of the vulnerability or effectiveness of the mitigation
- Determine the impact on learning and decision quality
- Evaluate whether the design supports honest retrospective analysis
- Suggest improvements for preserving pre-outcome context

Consider:
- Are predictions captured before outcomes are revealed?
- Do retrospectives reconstruct the information state at decision time?
- Are forecast ranges and confidence intervals shown alongside actuals?
- Is the design enabling post-hoc narrative fitting?
- Does the system evaluate decision quality separately from outcome quality?

Provide actionable recommendations for counteracting hindsight bias in the design.`,

    outputSchema: {
      type: 'object',
      properties: {
        hindsightPatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              direction: { type: 'string' },
              severity: { type: 'string' },
              predictionPreserved: { type: 'boolean' },
              temporalContext: { type: 'string' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'direction',
              'severity',
              'predictionPreserved',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            predictionCapture: { type: 'number' },
            temporalIntegrity: { type: 'number' },
            retrospectiveQuality: { type: 'number' },
            calibrationSupport: { type: 'number' },
          },
          required: [
            'predictionCapture',
            'temporalIntegrity',
            'retrospectiveQuality',
            'calibrationSupport',
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
        'hindsightPatterns',
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
        title: 'Record Predictions Before Outcomes',
        description:
          'Build systems that capture predictions, hypotheses, and expectations before outcomes are known',
        example:
          'A/B test tool that requires each team member to submit their predicted winner and effect size before results are calculated',
        tips: [
          'Make prediction entry a required step in the workflow, not optional',
          'Capture individual predictions, not just team consensus',
          'Include confidence levels with every prediction',
        ],
      },
      {
        step: 2,
        title: 'Make Records Immutable',
        description:
          'Ensure prediction records cannot be modified after outcomes are known',
        example:
          'Decision journal entries are locked with timestamps once submitted; updates are append-only and clearly marked',
        tips: [
          'Use append-only data structures for prediction logs',
          'Show clear timestamps on all entries',
          'Allow addendums but never edits to original predictions',
        ],
      },
      {
        step: 3,
        title: 'Show Predictions Alongside Outcomes',
        description:
          'Display predictions and actuals together so users can see their forecasting accuracy',
        example:
          'Dashboard metric card showing: "Forecast: $420K-$480K (75% confidence) | Actual: $395K | Below range"',
        tips: [
          'Use visual formats that make comparison easy (side-by-side, overlay)',
          'Show confidence intervals, not just point estimates',
          'Include historical forecast accuracy rates',
        ],
      },
      {
        step: 4,
        title: 'Structure Retrospectives to Counter Hindsight',
        description:
          'Design post-mortem and review processes that explicitly address hindsight bias',
        example:
          'Retrospective template that starts with "What information was available at decision time?" before "What actually happened?"',
        tips: [
          'Review prior documentation before discussing outcomes',
          'Ask "was this a good decision given what was known?" not "was this the right decision?"',
          'Separate process evaluation from outcome evaluation',
        ],
      },
      {
        step: 5,
        title: 'Track Calibration Over Time',
        description:
          'Build dashboards that show prediction accuracy trends, helping users improve their forecasting',
        example:
          'Personal calibration chart showing: "When you say 80% confident, you are right 62% of the time"',
        tips: [
          'Track calibration curves, not just hit rates',
          'Show improvement over time to motivate continued prediction logging',
          'Compare individual calibration to team averages',
        ],
      },
    ],

    dos: [
      'Record predictions with confidence levels before outcomes are known',
      'Make prediction records immutable once submitted',
      'Show forecasts alongside actual results in dashboards and reports',
      'Structure retrospectives to review prior state of knowledge first',
      'Track prediction accuracy and calibration over time',
      'Separate evaluation of decision quality from outcome quality',
      'Use confidence intervals and ranges, not just point estimates',
      'Collect individual predictions before group discussion in retrospectives',
    ],

    donts: [
      'Don\'t show experiment results before recording team hypotheses',
      'Don\'t allow editing of past predictions or forecasts after outcomes are known',
      'Don\'t use "obviously" or "should have known" language in retrospective templates',
      'Don\'t present outcomes without the predictions and uncertainty that preceded them',
      'Don\'t evaluate decisions solely by their outcomes without considering process quality',
      'Don\'t let group discussion happen before individual prediction recording',
      'Don\'t design post-mortems that jump to "what went wrong" without "what was known"',
      'Don\'t present historical events as inevitable causal chains without acknowledging uncertainty',
    ],

    bestPractices: [
      {
        title: 'Hypothesis-First Experiment Design',
        description:
          'Require explicit, recorded hypotheses before any experiment results are revealed',
        rationale:
          'Pre-registered hypotheses are the single strongest defense against hindsight bias in experimentation',
        example:
          'Experiment tool that gates result access behind hypothesis submission for each team member',
      },
      {
        title: 'Decision Journals with Locked Entries',
        description:
          'Implement append-only decision journals that preserve the reasoning and predictions at the time of each decision',
        rationale:
          'Immutable records create an honest baseline for retrospective analysis that hindsight cannot corrupt',
        example:
          'Decision log entry: prediction, confidence, reasoning, alternatives considered -- all locked at submission time',
      },
      {
        title: 'Forecast Ranges on All Dashboards',
        description:
          'Always display forecast ranges or targets alongside actual metrics in dashboards',
        rationale:
          'Forecast context prevents the "we expected that" dismissal and triggers investigation when actuals fall outside ranges',
        example:
          'Revenue dashboard showing actual line with shaded forecast band and historical hit rate',
      },
      {
        title: 'Process-Outcome Separation in Reviews',
        description:
          'Structure performance and decision reviews to evaluate process quality independently of outcome quality',
        rationale:
          'Good processes can produce bad outcomes (and vice versa); conflating them creates hindsight-biased evaluations',
        example:
          'Review template with separate sections: "Decision Process Quality" and "Outcome Analysis"',
      },
      {
        title: 'Calibration Tracking',
        description:
          'Build personal and team calibration dashboards that track prediction accuracy over time',
        rationale:
          'Calibration feedback is the primary mechanism for improving forecasting and reducing overconfidence fueled by hindsight bias',
        example:
          'Monthly calibration report showing: "When you said 90% confident, you were right 71% of the time"',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships - Ensure prediction/outcome relationships are programmatically determinable',
        implementation:
          'Use semantic HTML and ARIA to convey the relationship between predictions and outcomes, so screen reader users understand which forecast corresponds to which result',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.4.1',
        guideline:
          'Use of Color - Don\'t rely only on color to distinguish predictions from actuals',
        implementation:
          'Combine color coding with text labels, patterns, or icons to distinguish forecast ranges from actual data in charts and dashboards',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.4.6',
        guideline:
          'Headings and Labels - Clearly label prediction vs outcome sections',
        implementation:
          'Use descriptive headings like "Prediction (recorded March 1)" and "Actual Result (March 31)" so all users can distinguish temporal context',
      },
    ],

    ethics: [
      {
        concern: 'Weaponizing Prediction Records',
        severity: 'critical',
        explanation:
          'Prediction records can be used to blame individuals for wrong predictions rather than for learning and calibration',
        mitigation:
          'Establish clear norms that prediction records are for learning, not evaluation. Consider anonymizing individual predictions in blame-prone cultures. Focus on calibration improvement, not accuracy shaming.',
      },
      {
        concern: 'False Precision in Retrospection',
        severity: 'high',
        explanation:
          'Designing tools that imply post-mortem analysis is objective when it is still subject to hindsight distortion',
        mitigation:
          'Label all retrospective analysis with warnings about hindsight bias. Include prompts like "Remember: this analysis was written after the outcome was known."',
      },
      {
        concern: 'Overconfidence from Calibration Data',
        severity: 'medium',
        explanation:
          'Users who see their calibration improve may become overconfident in domains where past accuracy does not predict future accuracy',
        mitigation:
          'Show calibration data in context. Distinguish between domains with stable base rates (where calibration transfers) and novel domains (where it may not).',
      },
      {
        concern: 'Prediction Fatigue',
        severity: 'medium',
        explanation:
          'Requiring predictions for every decision can create fatigue, leading to low-effort predictions that undermine the system',
        mitigation:
          'Reserve mandatory prediction logging for high-stakes or repeated decisions. Make the process lightweight. Show users the value of their prediction data.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'Hindsight Is Not Equal to Foresight: The Effect of Outcome Knowledge on Judgment Under Uncertainty',
        author: 'Fischhoff, B.',
        year: 1975,
        doi: '10.1037/h0078520',
        description:
          'The foundational paper that identified and named hindsight bias, demonstrating that knowledge of outcomes distorts recalled predictions',
        type: 'foundational',
      },
      {
        title: 'Hindsight Bias',
        author: 'Roese, N. J., & Vohs, K. D.',
        year: 2012,
        doi: '10.1177/1745691612454303',
        description:
          'Comprehensive review proposing a three-component model of hindsight bias: memory distortion, inevitability, and foreseeability',
        type: 'advanced',
      },
      {
        title: 'The Knew-It-All-Along Effect',
        author: 'Fischhoff, B., & Beyth, R.',
        year: 1975,
        description:
          'Demonstrated that people not only distort their predictions after learning outcomes but are unaware they are doing so',
        type: 'foundational',
      },
      {
        title: 'Hindsight Bias: A Primer for Motivational Researchers',
        author: 'Nestler, S., & von Collani, G.',
        year: 2008,
        description:
          'Practical overview of hindsight bias research with implications for organizational decision-making and performance evaluation',
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
          'Extensive coverage of hindsight bias as part of the broader heuristics and biases framework, with practical implications',
        type: 'foundational',
      },
      {
        title: 'Superforecasting: The Art and Science of Prediction',
        author: 'Tetlock, Philip E., & Gardner, Dan',
        year: 2015,
        isbn: '9780804136693',
        description:
          'Demonstrates how rigorous prediction tracking and calibration can counteract hindsight bias and improve forecasting',
        type: 'practical',
      },
      {
        title: 'The Black Swan',
        author: 'Taleb, Nassim Nicholas',
        year: 2007,
        isbn: '9780812973815',
        description:
          'Explores how hindsight bias creates "narrative fallacy" -- the human tendency to construct stories that make unpredictable events seem inevitable',
        type: 'practical',
      },
    ],

    articles: [
      {
        title: 'Hindsight Bias in UX Research',
        author: 'Nielsen Norman Group',
        url: 'https://www.nngroup.com/articles/hindsight-bias/',
        description:
          'Practical guide to identifying and mitigating hindsight bias in user research and product retrospectives',
        type: 'practical',
      },
      {
        title: 'Blameless PostMortems and a Just Culture',
        author: 'Allspaw, John',
        url: 'https://www.etsy.com/codeascraft/blameless-postmortems/',
        description:
          'Influential article on how blameless post-mortems at Etsy counteract hindsight bias in incident analysis',
        type: 'case-study',
      },
    ],

    videos: [
      {
        title: 'Hindsight Bias: The I Knew It All Along Phenomenon',
        author: 'Behavioral Economics',
        url: 'https://www.youtube.com/watch?v=N5m9Dlv5Yjw',
        description:
          'Clear explanation of hindsight bias with everyday examples and debiasing strategies',
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
      'overconfidence-bias',
      'narrative-fallacy',
      'outcome-bias',
    ],

    conflicts: [
      'base-rate-neglect',
    ],

    confusedWith: [
      'recency-bias',
      'outcome-bias',
      'confirmation-bias',
    ],

    hierarchy: {
      parent: 'cognitive-bias',
      children: [
        'recency-bias',
        'outcome-bias',
      ],
    },
  },
};
