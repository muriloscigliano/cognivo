/**
 * HINDSIGHT BIAS (MEMORY)
 *
 * After learning an outcome, people misremember their earlier predictions
 * as having been more accurate than they actually were.
 */

import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const hindsightBiasMemory: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'hindsight-bias-memory',
    name: 'Hindsight Bias (Memory)',
    aliases: ['Knew-It-All-Along Effect', 'Creeping Determinism', 'Memory Distortion Hindsight'],
    category: BiasCategory.MEMORY,
    relatedCategories: [
      BiasCategory.DECISION_MAKING,
      BiasCategory.COGNITIVE,
    ],
    tags: [
      'memory-distortion',
      'prediction',
      'decision-journal',
      'pre-registration',
      'hypothesis-tracking',
      'outcome-knowledge',
      'recall-accuracy',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple: 'After learning an outcome, we misremember our original predictions as having been more accurate.',

    detailed: `Hindsight bias (memory variant) is a cognitive phenomenon in which people, after learning the outcome of an event, genuinely believe they predicted or expected that outcome all along. Unlike the judgmental variant (which distorts foreseeability assessments), the memory variant specifically distorts the recollection of one's own prior predictions and beliefs.

This happens because outcome knowledge contaminates the retrieval process. When we try to recall what we originally predicted, the known outcome acts as an anchor that pulls our memory toward it. The original prediction is effectively overwritten or blended with outcome knowledge, making it nearly impossible to accurately reconstruct what we actually believed before we knew the result.

In UX design, this bias has critical implications for any system that involves predictions, hypotheses, decision-making, or learning from past choices. Without immutable records of original predictions, users will systematically misremember their accuracy, undermining learning, accountability, and calibration. Designers must build systems that preserve and surface original predictions alongside outcomes.`,

    psychologyBasis: {
      discoveredBy: 'Baruch Fischhoff',
      year: 1975,
      theory: 'Hindsight Bias / Creeping Determinism',
      mechanism: `After learning an outcome, people misremember their earlier predictions as having been more accurate than they actually were. This memory distortion occurs through several mechanisms:

1. **Automatic Updating**: The brain automatically integrates new information (the outcome) into existing memory traces, overwriting the original prediction
2. **Reconstruction Bias**: Memory is reconstructive, not reproductive. When recalling a past prediction, the known outcome serves as a schema that biases reconstruction
3. **Anchor Contamination**: The outcome acts as an anchor. When trying to recall the original prediction, retrieval starts from the known outcome and adjusts insufficiently
4. **Source Confusion**: People confuse post-outcome reasoning with pre-outcome predictions, blending what they learned afterward with what they believed before
5. **Narrative Coherence**: The brain prefers coherent stories. A prediction that matches the outcome creates a more coherent narrative, so memory is distorted toward consistency`,
    },

    realWorldExample: `In Fischhoff's classic 1975 study, participants read about historical events and were told different outcomes. When asked to recall what they would have predicted before knowing the outcome, those who learned the actual outcome consistently "remembered" predicting it with higher confidence than those who were not told the outcome. They genuinely believed they had known all along, even though their memory of their original prediction had been distorted by outcome knowledge.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `Hindsight bias (memory variant) fundamentally undermines learning from decisions when original predictions are not preserved. Designers must build systems that:

- Create immutable, timestamped records of predictions and hypotheses before outcomes are known
- Surface original predictions alongside actual outcomes for honest comparison
- Prevent post-hoc rationalization by locking predictions before results arrive
- Support decision journals and pre-registration workflows
- Enable calibration tracking so users can see their actual prediction accuracy over time`,

    whenToUse: [
      {
        title: 'Prediction Logging in A/B Testing Tools',
        scenario:
          'When product teams set up experiments and hypothesize about expected outcomes',
        example:
          'Require teams to log their specific prediction (e.g., "Variant B will increase CTR by 12-18%") before the experiment begins, then show this prediction locked alongside actual results',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Decision Journals',
        scenario: 'When users make important decisions and want to learn from outcomes over time',
        example:
          'Prompt users to record their reasoning, confidence level, and expected outcome at decision time. Lock entries with timestamps so they cannot be edited after the fact.',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Pre-Registration Features',
        scenario: 'When researchers or analysts plan studies or investigations',
        example:
          'Provide a structured pre-registration form that captures hypotheses, methodology, and expected results before data collection begins, with an immutable timestamp',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Investment Thesis Documentation',
        scenario: 'When investors or portfolio managers make buy/sell decisions',
        example:
          'Capture the specific thesis, price targets, timeline, and confidence level at the time of the trade, then display these original predictions when reviewing portfolio performance',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Forecast Reviews',
        scenario: 'When reviewing the accuracy of past forecasts or estimates',
        example:
          'Show the original forecast side-by-side with actual results, highlighting the delta. Prevent users from claiming they "knew it all along" by displaying their locked prediction.',
        impact: ImpactLevel.HIGH,
      },
    ],

    whenToAvoid: [
      {
        title: 'Low-Stakes Casual Predictions',
        reason:
          'Forcing prediction logging for trivial decisions creates unnecessary friction and feels burdensome',
        consequence:
          'Users abandon the tool or feel surveilled by excessive prediction tracking',
        alternative:
          'Reserve prediction logging for decisions the user flags as important or where stakes are high',
      },
      {
        title: 'Sensitive Personal Decisions',
        reason:
          'Recording predictions about personal health outcomes or relationship decisions may cause distress when reviewed',
        consequence:
          'Confronting users with inaccurate past predictions about sensitive matters can feel punitive',
        alternative:
          'Offer opt-in prediction tracking with clear explanations of its purpose. Allow users to control visibility.',
      },
      {
        title: 'Real-Time Decision Contexts',
        reason:
          'Requiring formal prediction capture slows down time-critical decisions',
        consequence:
          'Users bypass the system or make rushed predictions that do not reflect genuine beliefs',
        alternative:
          'Use lightweight capture methods (quick confidence slider, one-tap prediction) for fast-paced contexts',
      },
      {
        title: 'Blame-Oriented Cultures',
        reason:
          'In organizations where prediction records could be weaponized for blame, the tool becomes threatening',
        consequence:
          'Users game the system by hedging all predictions or refusing to commit to specific forecasts',
        alternative:
          'Frame prediction tracking as a calibration and learning tool, not a performance evaluation. Anonymize where appropriate.',
      },
    ],

    commonMistakes: [
      {
        title: 'Allowing Prediction Edits After Outcomes',
        description:
          'Letting users modify their recorded predictions after learning results defeats the entire purpose',
        why: 'Users will unconsciously (or consciously) update predictions to match outcomes, perpetuating the bias',
        fix: 'Make prediction records immutable once submitted. Show a clear lock icon and timestamp. If users want to update their thinking, create a new entry rather than editing the original.',
      },
      {
        title: 'Showing Only Outcomes Without Original Predictions',
        description:
          'Displaying results without surfacing the corresponding original predictions enables hindsight distortion',
        why: 'Without the original prediction visible, users will reconstruct a false memory of having predicted correctly',
        fix: 'Always display the locked original prediction alongside the outcome in review screens and dashboards',
      },
      {
        title: 'No Confidence Calibration Tracking',
        description:
          'Capturing predictions without tracking confidence levels over time misses a key learning opportunity',
        why: 'Users need to see their calibration curve (predicted confidence vs actual accuracy) to improve',
        fix: 'Include a confidence slider (0-100%) with every prediction and show calibration charts over time',
      },
      {
        title: 'Punitive Framing of Prediction Errors',
        description:
          'Highlighting prediction failures in a judgmental way discourages honest future predictions',
        why: 'If being wrong feels punishing, users will hedge excessively or avoid making specific predictions',
        fix: 'Frame prediction accuracy as a learning metric. Celebrate improving calibration, not perfect predictions.',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.HIGH,
        description:
          'Layout determines whether original predictions are visible alongside outcomes',
        examples: [
          'Side-by-side layouts showing locked prediction next to actual outcome',
          'Timeline views that clearly separate prediction timestamp from outcome timestamp',
          'Dashboard cards that surface prediction-vs-outcome deltas prominently',
          'Collapsible sections that reveal original reasoning when reviewing results',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Typography differentiates between original predictions and post-outcome assessments',
        examples: [
          'Distinct visual treatment for locked predictions (monospace, sealed-envelope metaphor)',
          'Clear timestamp formatting to establish temporal ordering',
          'Strikethrough or muted styling for superseded predictions vs current beliefs',
          'Consistent heading hierarchy: Prediction > Outcome > Delta > Reflection',
        ],
      },
      color: {
        level: ImpactLevel.MEDIUM,
        description:
          'Color coding helps users distinguish between prediction-time and outcome-time content',
        examples: [
          'Amber/gold for locked predictions to convey "sealed" status',
          'Green/red delta indicators showing prediction accuracy without judgment',
          'Distinct background colors for prediction cards vs outcome cards',
          'Confidence level gradients from low (cool) to high (warm)',
        ],
      },
      interaction: {
        level: ImpactLevel.CRITICAL,
        description:
          'Interaction design determines whether predictions can be captured cleanly and remain immutable',
        examples: [
          'Lock-and-seal interaction: submit prediction, see lock animation, no further edits',
          'Reveal-on-demand: outcome hidden until user commits their recalled prediction',
          'Calibration game: ask users to recall their prediction before showing it, then compare',
          'Pre-registration workflows that guide structured hypothesis capture',
        ],
      },
      content: {
        level: ImpactLevel.CRITICAL,
        description:
          'Content framing determines whether prediction tracking feels like learning or surveillance',
        examples: [
          'Framing: "Your prediction journal" vs "Your prediction scorecard"',
          'Encouraging language: "Track your calibration over time" vs "See how wrong you were"',
          'Educational microcopy explaining why predictions are locked after submission',
          'Calibration insights: "You predicted with 80% confidence and were right 62% of the time"',
        ],
      },
      accessibility: {
        level: ImpactLevel.HIGH,
        description:
          'Prediction records and comparison views must be accessible to all users',
        examples: [
          'Screen reader announcements for locked prediction status and timestamps',
          'Keyboard-accessible prediction submission and review flows',
          'Clear text alternatives for visual prediction-vs-outcome comparison charts',
          'Sufficient contrast for prediction lock indicators and confidence level displays',
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
        title: 'Immutable Prediction Log in A/B Testing',
        description:
          'Experiment platform that captures and locks hypotheses before results are available',
        code: `<div class="experiment-card">
  <div class="prediction-section locked">
    <div class="lock-badge">
      <span class="icon">🔒</span>
      <span class="label">Locked prediction</span>
      <time datetime="2026-01-15T09:30:00Z">Jan 15, 2026 at 9:30 AM</time>
    </div>
    <h4>Your Hypothesis</h4>
    <p class="prediction-text">
      "Variant B (larger CTA button) will increase sign-up rate by 10-15%"
    </p>
    <div class="confidence">
      <label>Your confidence:</label>
      <meter value="0.75" min="0" max="1">75%</meter>
      <span>75%</span>
    </div>
  </div>

  <div class="outcome-section">
    <h4>Actual Result</h4>
    <p class="outcome-text">Variant B increased sign-up rate by <strong>4.2%</strong></p>
    <div class="delta">
      <span class="delta-label">Delta from prediction:</span>
      <span class="delta-value negative">-7.3 percentage points</span>
    </div>
  </div>

  <div class="reflection-prompt">
    <h4>Reflection</h4>
    <p>Your prediction overestimated the effect. What might explain the smaller lift?</p>
    <textarea placeholder="Record your reflection..."></textarea>
  </div>
</div>`,
        explanation:
          'The prediction is locked with a clear timestamp and cannot be edited after submission. When results arrive, the original prediction is displayed alongside the outcome with a quantified delta, preventing the user from misremembering their prediction as more accurate.',
        principle:
          'Immutable prediction records prevent memory distortion by preserving the original belief',
        metrics: {
          before: 'Teams claimed 78% of hypotheses were "roughly correct" based on memory',
          after: 'Locked records showed only 34% of hypotheses were within predicted range',
          improvement: 'Teams improved prediction calibration by 41% after 6 months of locked logging',
        },
      },
      {
        title: 'Decision Journal with Timestamped Entries',
        description:
          'Personal decision journal that preserves original reasoning and predictions',
        code: `<div class="decision-journal-entry">
  <header class="entry-header">
    <h3>Should we expand into European market?</h3>
    <div class="timestamp sealed">
      <span class="seal-icon">📋</span>
      Recorded: March 3, 2026 — <strong>Before outcome known</strong>
    </div>
  </header>

  <section class="original-assessment">
    <h4>Your Assessment at Decision Time</h4>
    <div class="field">
      <label>Decision:</label>
      <p>Proceed with EU expansion, starting with Germany</p>
    </div>
    <div class="field">
      <label>Expected outcome:</label>
      <p>Break-even within 18 months, €2M revenue by month 24</p>
    </div>
    <div class="field">
      <label>Key assumptions:</label>
      <ul>
        <li>Regulatory approval within 3 months</li>
        <li>Existing product needs minimal localization</li>
        <li>Partner channel will drive 60% of initial sales</li>
      </ul>
    </div>
    <div class="field">
      <label>Confidence:</label>
      <div class="confidence-bar" style="--confidence: 70%">70%</div>
    </div>
  </section>

  <section class="outcome-review" data-status="pending">
    <h4>Outcome Review</h4>
    <p class="pending-label">Scheduled for: September 2027</p>
  </section>
</div>`,
        explanation:
          'The journal entry captures the full decision context — reasoning, assumptions, expected outcomes, and confidence — with a clear timestamp before the outcome is known. This prevents the user from later believing they foresaw challenges they did not actually anticipate.',
        principle:
          'Structured decision capture at prediction time preserves authentic pre-outcome beliefs',
      },
      {
        title: 'Calibration Recall Game',
        description:
          'Interface that asks users to recall their prediction before revealing it, exposing memory distortion',
        code: `<div class="calibration-exercise">
  <h3>Prediction Recall Check</h3>
  <p>Before we show your original prediction, try to remember it:</p>

  <div class="recall-step active">
    <label>What did you predict the Q4 revenue would be?</label>
    <input type="text" placeholder="Type your remembered prediction...">
    <button class="primary">Submit My Recall</button>
  </div>

  <div class="comparison-step hidden">
    <div class="side-by-side">
      <div class="card recalled">
        <h4>What You Just Recalled</h4>
        <p class="value">$4.2M</p>
      </div>
      <div class="card original">
        <h4>Your Actual Prediction (Oct 1)</h4>
        <p class="value">$3.1M</p>
        <span class="lock-icon">🔒</span>
      </div>
      <div class="card actual">
        <h4>Actual Q4 Revenue</h4>
        <p class="value">$4.5M</p>
      </div>
    </div>
    <div class="insight">
      <p><strong>Hindsight bias detected:</strong> You recalled predicting $4.2M,
      but your locked prediction was $3.1M. Knowing the actual result ($4.5M)
      pulled your memory upward by $1.1M.</p>
    </div>
  </div>
</div>`,
        explanation:
          'By asking users to recall their prediction before revealing the locked original, this design makes the memory distortion visible and tangible. Users can directly see how outcome knowledge shifted their memory.',
        principle:
          'Recall-before-reveal exercises make hindsight bias visible and promote self-awareness',
      },
    ],

    bad: [
      {
        title: 'Editable Prediction History',
        description:
          'Experiment tool that allows teams to update hypotheses after seeing results',
        code: `<!-- DON'T DO THIS -->
<div class="experiment-review">
  <h3>Experiment Results</h3>
  <div class="hypothesis">
    <label>Hypothesis:</label>
    <textarea>Variant B will increase CTR by 5%</textarea>
    <button class="edit-btn">Edit Hypothesis</button>
    <small>Last edited: 2 hours after results published</small>
  </div>
  <div class="result">
    <p>Actual result: Variant B increased CTR by 4.8%</p>
  </div>
  <p class="success">Great prediction! You were almost exactly right!</p>
</div>`,
        explanation:
          'Allowing hypothesis edits after results are known is the worst possible design for hindsight bias. The "last edited" timestamp shows this hypothesis was modified after results arrived, but the system congratulates the user on their "accuracy." This perpetuates the delusion of foresight.',
        principle:
          'Editable predictions after outcomes are known guarantee memory distortion and false confidence',
      },
      {
        title: 'Outcome-Only Review Without Original Predictions',
        description:
          'Dashboard showing only results without surfacing original forecasts',
        code: `<!-- DON'T DO THIS -->
<div class="quarterly-review">
  <h3>Q4 Performance Review</h3>
  <div class="metric">
    <span class="label">Revenue</span>
    <span class="value">$4.5M</span>
    <span class="status positive">Above target</span>
  </div>
  <div class="metric">
    <span class="label">Customer Growth</span>
    <span class="value">+23%</span>
    <span class="status positive">Strong</span>
  </div>
  <div class="discussion">
    <h4>Team Discussion</h4>
    <p>"We expected strong Q4 numbers given the market conditions..."</p>
  </div>
</div>`,
        explanation:
          'Without displaying the team\'s original Q4 predictions, everyone in the review meeting will naturally "remember" having predicted these results. The discussion section shows this already happening with "We expected strong Q4 numbers" — but did they really?',
        principle:
          'Outcome-only reviews without original predictions enable unchecked hindsight bias',
      },
      {
        title: 'Vague Prediction Capture',
        description:
          'Prediction system that accepts imprecise, unfalsifiable predictions',
        code: `<!-- DON'T DO THIS -->
<div class="prediction-form">
  <h3>Record Your Prediction</h3>
  <textarea placeholder="What do you think will happen?">
    I think the new feature will probably do well, maybe increase
    engagement somewhat. Could go either way though.
  </textarea>
  <button>Save Prediction</button>
</div>`,
        explanation:
          'This prediction is so vague that any outcome can be retroactively claimed as "what I predicted." Without specific numbers, timelines, or confidence levels, the prediction is unfalsifiable and provides no protection against hindsight bias.',
        principle:
          'Vague, unfalsifiable predictions provide zero protection against memory distortion',
      },
    ],

    realWorld: [
      {
        company: 'Optimizely',
        product: 'Experiment Hypothesis Logging',
        description: 'Optimizely requires teams to document their hypothesis before launching an experiment. The hypothesis is locked at experiment start and displayed alongside results, preventing post-hoc rationalization about what the team "expected."',
        effectiveness: 'very-effective',
        analysis: 'By structuring hypothesis capture into the experiment workflow and locking it before data collection begins, Optimizely creates a natural pre-registration mechanism that combats hindsight bias in product experimentation.',
      },
      {
        company: 'Metaculus',
        product: 'Prediction Platform',
        description: 'Metaculus tracks individual prediction accuracy over time with timestamped, immutable forecasts. Users can update predictions, but all previous predictions are preserved in the version history. Calibration scores show how well-calibrated each forecaster actually is.',
        effectiveness: 'very-effective',
        analysis: 'The immutable prediction history and calibration tracking make it impossible for users to misremember their accuracy. The platform turns prediction from a casual opinion into a tracked, measurable skill.',
      },
      {
        company: 'Betfair',
        product: 'Sports Prediction Markets',
        description: 'Betfair records every bet with exact odds, stake, and timestamp. After events conclude, users can review their complete prediction history, seeing exactly what they predicted at what odds — not what they "remember" predicting.',
        effectiveness: 'effective',
        analysis: 'The financial stakes and immutable bet records naturally combat hindsight bias. Users cannot claim they "knew the underdog would win" when their bet history shows they wagered on the favorite.',
      },
      {
        company: 'Open Science Framework',
        product: 'Pre-Registration',
        url: 'https://osf.io/prereg/',
        description: 'The OSF pre-registration system requires researchers to document hypotheses, methods, and analysis plans before data collection. These registrations are timestamped and immutable, preventing HARKing (Hypothesizing After Results are Known).',
        effectiveness: 'very-effective',
        analysis: 'Pre-registration directly addresses the memory variant of hindsight bias in science. By creating an immutable record of what researchers predicted before seeing data, it prevents the unconscious (and sometimes conscious) distortion of remembering predictions as more accurate than they were.',
      },
    ],

    abTests: [
      {
        title: 'Locked vs Editable Hypothesis in Experiment Tools',
        hypothesis:
          'Locking hypotheses before experiment results will improve team calibration over time',
        controlVersion: {
          description:
            'Experiment tool where hypotheses can be edited at any time, including after results are published',
          metrics: {
            conversionRate: '82% of teams claimed their hypothesis was "roughly correct"',
            timeOnPage: '1:45 average review time',
          },
        },
        treatmentVersion: {
          description:
            'Experiment tool with locked, timestamped hypotheses displayed alongside results with quantified delta',
          metrics: {
            conversionRate: '34% of hypotheses were within predicted range (honest accuracy)',
            timeOnPage: '4:12 average review time',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'The locked hypothesis version revealed that teams were far less accurate than they believed. The 82% vs 34% gap represents pure hindsight bias. After 6 months, teams using locked predictions improved their actual calibration by 41%, while teams with editable hypotheses showed no improvement.',
          learnings: [
            'Editable predictions enable memory distortion that prevents learning',
            'Locked predictions dramatically increase review engagement (2.4x time spent)',
            'Teams initially resisted locked predictions but valued them after seeing calibration improvements',
            'Displaying the prediction-outcome delta was the single most important design element',
          ],
        },
      },
      {
        title: 'Recall-Before-Reveal vs Direct Outcome Display',
        hypothesis:
          'Asking users to recall their prediction before showing it will increase hindsight bias awareness',
        controlVersion: {
          description:
            'Standard results page showing original prediction alongside outcome simultaneously',
          metrics: {
            conversionRate: '45% of users reported learning something new from the comparison',
            clickThroughRate: '22% clicked to view calibration details',
          },
        },
        treatmentVersion: {
          description:
            'Two-step reveal: first ask user to type what they remember predicting, then show locked original alongside their recall and the actual outcome',
          metrics: {
            conversionRate: '78% of users reported learning something new from the comparison',
            clickThroughRate: '61% clicked to view calibration details',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'The recall-before-reveal design nearly doubled self-reported learning and tripled engagement with calibration data. On average, users\' recalled predictions were 31% closer to the actual outcome than their locked original predictions — directly demonstrating the memory distortion.',
          learnings: [
            'Making users commit to a recalled prediction before revealing the locked original creates a powerful "aha moment"',
            'The gap between recalled and actual prediction is the clearest demonstration of hindsight bias',
            'Users who experienced recall-before-reveal were 3.2x more likely to use prediction logging in future',
            'This technique works best for numerical predictions where the distortion is quantifiable',
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
        name: 'Editable Prediction Fields',
        description:
          'Text inputs or editable areas for predictions that can be modified after outcomes are known',
        howToSpot:
          'Look for edit buttons, text areas, or inline editing on prediction records. Check if modification timestamps postdate outcome availability.',
        severity: ImpactLevel.CRITICAL,
      },
      {
        name: 'Missing Prediction Timestamps',
        description:
          'Prediction or hypothesis records without clear timestamps showing when they were created',
        howToSpot:
          'Check prediction records for creation dates, lock indicators, or version history. Absence of timestamps enables undetectable editing.',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Outcome-Only Displays',
        description:
          'Review screens or dashboards showing results without corresponding original predictions',
        howToSpot:
          'Look for results pages, performance reviews, or experiment summaries that display only outcomes without the team\'s original forecast or hypothesis.',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Vague Prediction Formats',
        description:
          'Prediction capture that allows imprecise, unfalsifiable statements rather than requiring specific, measurable predictions',
        howToSpot:
          'Check prediction forms for structured fields (specific numbers, confidence levels, timelines) versus free-text-only capture.',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'No Calibration Feedback',
        description:
          'Systems that capture predictions but never show users their prediction accuracy over time',
        howToSpot:
          'Look for calibration charts, accuracy scores, or prediction-vs-outcome comparisons in the user profile or dashboard.',
        severity: ImpactLevel.MEDIUM,
      },
    ],

    patterns: [
      {
        name: 'Mutable Prediction Pattern',
        description: 'Predictions or hypotheses that can be modified after outcomes are known',
        indicators: [
          'Edit buttons on prediction records',
          'No lock or seal indicators on submitted predictions',
          'Missing version history for prediction changes',
          'No distinction between pre-outcome and post-outcome edits',
        ],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Missing Pre-Registration Pattern',
        description: 'Experiment or study workflows that do not require hypothesis documentation before data collection',
        indicators: [
          'Experiments can be launched without a documented hypothesis',
          'Hypothesis field is optional in experiment setup',
          'No temporal enforcement between hypothesis submission and experiment start',
          'Post-hoc hypothesis addition is indistinguishable from pre-registered',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Uncalibrated Review Pattern',
        description: 'Decision reviews that discuss outcomes without referencing original predictions',
        indicators: [
          'Retrospective meetings without prediction review',
          'Performance dashboards showing only actuals',
          'Post-mortems that skip "what did we predict?" phase',
          'Learning reviews based on outcome knowledge rather than decision quality',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'medium',
      },
      {
        name: 'False Accuracy Pattern',
        description: 'Systems that report prediction accuracy without controlling for hindsight bias',
        indicators: [
          'Self-reported prediction accuracy metrics',
          'Retrospective accuracy assessments without locked records',
          'Team claims of high prediction accuracy without calibration data',
          'Success narratives that emphasize foresight without evidence',
        ],
        severity: ImpactLevel.MEDIUM,
        confidence: 'medium',
      },
    ],

    checklistQuestions: [
      'Are predictions or hypotheses locked and timestamped before outcomes are available?',
      'Can users edit their predictions after learning the results?',
      'Are original predictions displayed alongside outcomes in review screens?',
      'Does the system capture specific, falsifiable predictions (not vague guesses)?',
      'Is there a confidence level captured with each prediction?',
      'Does the system provide calibration tracking over time?',
      'Are users ever asked to recall their prediction before the locked version is shown?',
      'Do experiment tools require hypothesis pre-registration before launch?',
      'Are post-mortems and retrospectives designed to surface original predictions?',
      'Is there any mechanism to detect when predictions were edited after outcomes arrived?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in hindsight bias (memory variant) — the tendency for outcome knowledge to distort memory of original predictions.

Analyze the provided design for hindsight bias (memory variant) vulnerabilities. Identify:

1. **Prediction Capture**: How predictions, hypotheses, and forecasts are recorded
2. **Immutability**: Whether predictions are locked and timestamped before outcomes are known
3. **Comparison Views**: Whether original predictions are surfaced alongside actual outcomes
4. **Calibration Tracking**: Whether prediction accuracy is measured over time
5. **Pre-Registration**: Whether hypotheses are formally documented before data collection

For each vulnerability found:
- Identify where memory distortion could occur
- Assess the severity (how much learning is lost)
- Determine if the system enables or prevents post-hoc rationalization
- Evaluate whether predictions are specific and falsifiable
- Suggest improvements for preserving authentic pre-outcome beliefs

Consider:
- Can users edit predictions after seeing outcomes?
- Are predictions displayed alongside results in review contexts?
- Does the system capture confidence levels alongside predictions?
- Is there a mechanism to make hindsight bias visible to users?
- Are decision journals or experiment logs designed with temporal integrity?

Provide actionable recommendations for building prediction-preserving systems.`,

    outputSchema: {
      type: 'object',
      properties: {
        hindsightVulnerabilities: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              predictionIntegrity: { type: 'string' },
              memoryDistortionRisk: { type: 'string' },
              severity: { type: 'string' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'predictionIntegrity',
              'memoryDistortionRisk',
              'severity',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            predictionImmutability: { type: 'number' },
            calibrationSupport: { type: 'number' },
            comparisonVisibility: { type: 'number' },
            preRegistrationQuality: { type: 'number' },
          },
          required: [
            'predictionImmutability',
            'calibrationSupport',
            'comparisonVisibility',
            'preRegistrationQuality',
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
        'hindsightVulnerabilities',
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
        title: 'Design Structured Prediction Capture',
        description:
          'Create forms that capture specific, falsifiable predictions with confidence levels and timelines',
        example:
          'Prediction form with fields: specific outcome (number/range), confidence level (0-100%), timeline, key assumptions, and reasoning',
        tips: [
          'Require specific, measurable predictions (not vague statements)',
          'Include a confidence slider or scale with every prediction',
          'Capture key assumptions and reasoning, not just the prediction itself',
          'Use structured fields rather than free-text-only to ensure falsifiability',
        ],
      },
      {
        step: 2,
        title: 'Implement Prediction Immutability',
        description:
          'Lock predictions with timestamps once submitted, preventing any modification after submission',
        example:
          'After clicking "Submit Prediction," show a lock animation and timestamp. The prediction becomes read-only with a visible seal indicator.',
        tips: [
          'Use a clear visual metaphor (lock, seal, stamp) to indicate immutability',
          'Store predictions with cryptographic hashes for tamper-evidence if needed',
          'Allow users to add new predictions but never edit locked ones',
          'Display the exact submission timestamp prominently',
        ],
      },
      {
        step: 3,
        title: 'Build Prediction-Outcome Comparison Views',
        description:
          'Design review screens that always display original predictions alongside actual outcomes',
        example:
          'Side-by-side cards: left shows locked prediction (with timestamp), right shows actual outcome, center shows the quantified delta',
        tips: [
          'Make the comparison automatic in all review contexts',
          'Quantify the delta between prediction and outcome',
          'Include the confidence level from the original prediction',
          'Avoid judgmental language; focus on calibration, not blame',
        ],
      },
      {
        step: 4,
        title: 'Add Calibration Tracking',
        description:
          'Track prediction accuracy over time and show users their calibration curve',
        example:
          'Dashboard showing: "When you predict with 80% confidence, you are right 62% of the time. Your calibration is improving — last quarter it was 55%."',
        tips: [
          'Show calibration charts (predicted confidence vs actual accuracy)',
          'Track improvement trends over time to motivate engagement',
          'Compare across categories (e.g., better at predicting revenue than user growth)',
          'Celebrate calibration improvement, not just prediction accuracy',
        ],
      },
      {
        step: 5,
        title: 'Implement Recall-Before-Reveal (Optional)',
        description:
          'Ask users to recall their prediction before showing the locked original, making memory distortion visible',
        example:
          'Before showing results: "What do you remember predicting?" User types recall, then sees: recalled prediction vs locked prediction vs actual outcome',
        tips: [
          'This is the most powerful technique for building hindsight bias awareness',
          'Works best for numerical predictions where distortion is quantifiable',
          'Show the three-way comparison: recalled, original, actual',
          'Use this sparingly for important predictions to avoid fatigue',
        ],
      },
    ],

    dos: [
      'Lock and timestamp all predictions before outcomes are available',
      'Display original predictions alongside outcomes in every review context',
      'Capture specific, falsifiable predictions with confidence levels',
      'Track calibration over time and show users their accuracy trends',
      'Use recall-before-reveal to make memory distortion visible',
      'Frame prediction tracking as a learning tool, not a judgment mechanism',
      'Require hypothesis pre-registration before launching experiments',
      'Preserve prediction version history with immutable timestamps',
      'Design decision journals that capture reasoning, not just conclusions',
      'Celebrate improving calibration, not perfect predictions',
    ],

    donts: [
      'Don\'t allow predictions to be edited after outcomes are known',
      'Don\'t show outcomes without corresponding original predictions',
      'Don\'t accept vague, unfalsifiable predictions as meaningful records',
      'Don\'t use prediction accuracy as a performance evaluation tool',
      'Don\'t shame users for inaccurate predictions — focus on learning',
      'Don\'t let teams skip hypothesis documentation before experiments',
      'Don\'t report self-assessed prediction accuracy without locked records',
      'Don\'t design retrospectives that rely on memory of original plans',
      'Don\'t conflate post-hoc rationalization with genuine foresight',
      'Don\'t skip confidence tracking — it\'s essential for calibration',
    ],

    bestPractices: [
      {
        title: 'Make Predictions Immutable',
        description:
          'Once a prediction is submitted, it should be permanently locked with a visible timestamp and seal',
        rationale:
          'Mutable predictions will always be contaminated by outcome knowledge, either consciously or unconsciously',
        example:
          'Lock icon + timestamp + "This prediction was sealed before results were available"',
      },
      {
        title: 'Always Show the Delta',
        description:
          'In every review context, display the quantified difference between prediction and outcome',
        rationale:
          'The delta is the single most important element for learning. Without it, users default to hindsight-distorted self-assessment.',
        example:
          '"You predicted +15% growth. Actual: +4.2%. Delta: -10.8 percentage points."',
      },
      {
        title: 'Require Specificity',
        description:
          'Design prediction forms that require specific, measurable, time-bound predictions rather than vague guesses',
        rationale:
          'Vague predictions ("it will probably do well") can never be falsified, so hindsight bias is unconstrained',
        example:
          'Structured form: "Metric: [CTR] will [increase] by [10-15%] within [30 days]. Confidence: [75%]"',
      },
      {
        title: 'Track Calibration, Not Just Accuracy',
        description:
          'Measure whether confidence levels match actual accuracy rates, not just whether predictions were right or wrong',
        rationale:
          'A well-calibrated predictor who is right 70% of the time when predicting with 70% confidence is better than one who is right 70% of the time with 95% confidence',
        example:
          'Calibration chart showing: "At 90% confidence you were right 64% of the time. At 60% confidence you were right 58% of the time."',
      },
      {
        title: 'Use Recall-Before-Reveal Strategically',
        description:
          'For important predictions, ask users to recall their prediction before showing the locked version',
        rationale:
          'This creates a direct, visceral experience of hindsight bias that no amount of education can replicate',
        example:
          'Three-column reveal: "You recalled: $4.2M | Your actual prediction: $3.1M | Actual result: $4.5M"',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships - Prediction lock status must be conveyed semantically, not just visually',
        implementation:
          'Use ARIA attributes (aria-readonly, aria-label) to convey that prediction fields are locked. Screen readers should announce "Locked prediction, submitted on [date]."',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.4.1',
        guideline:
          'Use of Color - Don\'t rely on color alone to distinguish predictions from outcomes',
        implementation:
          'Combine color with icons (lock icon for predictions, checkmark for outcomes), labels, and semantic HTML to differentiate prediction records from outcome records.',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.4.6',
        guideline:
          'Headings and Labels - Use clear headings for prediction vs outcome sections',
        implementation:
          'Label sections clearly: "Your Prediction (Locked)", "Actual Outcome", "Delta" with proper heading hierarchy so screen reader users can navigate the comparison.',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.3.2',
        guideline:
          'Meaningful Sequence - Ensure prediction appears before outcome in reading order',
        implementation:
          'DOM order should present prediction first, then outcome, then delta — matching the temporal sequence. This is critical for screen reader users to understand the comparison.',
      },
    ],

    ethics: [
      {
        concern: 'Weaponizing Prediction Records',
        severity: 'critical',
        explanation:
          'Using locked prediction records to blame or punish individuals for inaccurate predictions, rather than as a learning tool',
        mitigation:
          'Frame prediction tracking explicitly as a calibration and learning tool. Consider anonymizing predictions in team contexts. Never tie prediction accuracy to performance reviews.',
      },
      {
        concern: 'Privacy of Decision Records',
        severity: 'high',
        explanation:
          'Immutable decision journals may contain sensitive reasoning or assumptions that users later regret recording',
        mitigation:
          'Allow users to control visibility of their prediction records. Provide clear data retention policies. Allow deletion of entire entries (not selective editing) if needed.',
      },
      {
        concern: 'Discouraging Risk-Taking',
        severity: 'medium',
        explanation:
          'If prediction inaccuracy feels punitive, users may avoid making bold predictions or innovative decisions',
        mitigation:
          'Celebrate the act of making specific predictions regardless of accuracy. Show that improving calibration requires making (and being wrong about) many predictions.',
      },
      {
        concern: 'Overconfidence in the System',
        severity: 'medium',
        explanation:
          'Users might believe that because they use prediction logging, they are immune to hindsight bias — but the bias is automatic and unconscious',
        mitigation:
          'Include recall-before-reveal exercises periodically to demonstrate that the bias persists even with awareness. Education alone is insufficient.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'Hindsight ≠ Foresight: The Effect of Outcome Knowledge on Judgment Under Uncertainty',
        author: 'Fischhoff, B.',
        year: 1975,
        doi: '10.1037/h0078520',
        description:
          'The foundational paper that first demonstrated hindsight bias, showing that outcome knowledge distorts recall of prior predictions',
        type: 'foundational',
      },
      {
        title: 'Hindsight Bias',
        author: 'Roese, N. J., & Vohs, K. D.',
        year: 2012,
        doi: '10.1177/1745691612454303',
        description:
          'Comprehensive review distinguishing three components of hindsight bias: memory distortion, inevitability, and foreseeability. Clarifies the memory variant as a distinct mechanism.',
        type: 'foundational',
      },
      {
        title: 'An Unappreciated Consideration in Hindsight Distortion: Genuine Memory Distortion',
        author: 'Fischhoff, B.',
        year: 1977,
        description:
          'Follow-up study demonstrating that hindsight memory distortion is genuine and not merely a reporting bias — people truly misremember their predictions',
        type: 'advanced',
      },
      {
        title: 'Hindsight Bias: A Meta-Analysis',
        author: 'Christensen-Szalanski, J. J. J., & Willham, C. F.',
        year: 1991,
        doi: '10.1016/0749-5978(91)90010-Q',
        description:
          'Meta-analysis of 122 studies confirming the robustness of hindsight bias across diverse domains and populations',
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
          'Chapter on hindsight bias by Nobel Prize winner, covering how outcome knowledge systematically distorts memory of prior beliefs',
        type: 'foundational',
      },
      {
        title: 'Superforecasting: The Art and Science of Prediction',
        author: 'Tetlock, Philip E., & Gardner, Dan',
        year: 2015,
        isbn: '9780804136716',
        description:
          'Demonstrates how rigorous prediction tracking and calibration training can improve forecasting ability by combating hindsight bias',
        type: 'practical',
      },
      {
        title: 'The Black Swan',
        author: 'Taleb, Nassim Nicholas',
        year: 2007,
        isbn: '9780812973815',
        description:
          'Explores how hindsight bias leads us to construct post-hoc narratives of predictability around unpredictable events',
        type: 'practical',
      },
    ],

    articles: [
      {
        title: 'Pre-registration in Social Psychology',
        author: 'van \'t Veer, A. E., & Giner-Sorolla, R.',
        url: 'https://doi.org/10.1016/j.jesp.2016.03.004',
        description:
          'Practical guide to pre-registration as a tool for preventing hindsight bias and HARKing in research',
        type: 'practical',
      },
      {
        title: 'Decision Journals: A Simple Tool for Better Decision-Making',
        author: 'Farnam Street',
        url: 'https://fs.blog/decision-journal/',
        description:
          'Practical guide to maintaining a decision journal that preserves pre-outcome reasoning and predictions',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'The Hindsight Bias',
        author: 'Veritasium',
        url: 'https://www.youtube.com/watch?v=eN_vqLDU0OA',
        description:
          'Accessible explanation of hindsight bias with demonstrations of memory distortion effects',
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
      'confirmation-bias', // Confirms existing beliefs, hindsight distorts memory of them
      'overconfidence-bias', // Hindsight inflates confidence in prediction ability
      'narrative-fallacy', // Post-hoc narratives reinforce distorted memories
      'outcome-bias', // Judging decisions by outcomes pairs with memory distortion
    ],

    conflicts: [
      'base-rate-neglect', // Calibration tracking forces attention to base rates
    ],

    confusedWith: [
      'hindsight-bias-judgmental', // Judgmental variant: foreseeability, not memory
      'confirmation-bias', // Confirmation selects info; hindsight distorts memory
      'outcome-bias', // Outcome bias judges decisions by results; hindsight distorts memory of predictions
    ],

    hierarchy: {
      parent: 'hindsight-bias',
      children: [
        'prediction-memory-distortion',
        'knew-it-all-along-effect',
      ],
    },
  },
};
