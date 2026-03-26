/**
 * OUTCOME BIAS
 *
 * We judge decisions by their outcomes rather than by the quality
 * of the decision-making process at the time the decision was made.
 */

import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const outcomeBias: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'outcome-bias',
    name: 'Outcome Bias',
    aliases: ['Results Bias', 'Outcome-Based Judgment'],
    category: BiasCategory.COGNITIVE,
    relatedCategories: [
      BiasCategory.DECISION_MAKING,
      BiasCategory.ATTRIBUTION,
      BiasCategory.PERCEPTION,
    ],
    tags: [
      'decision-making',
      'judgment',
      'evaluation',
      'analytics',
      'performance',
      'retrospective',
      'process-quality',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple: 'We judge decisions by their outcomes rather than the quality of the process used to make them.',

    detailed: `Outcome Bias is a cognitive error where people evaluate the quality of a decision based on its eventual outcome rather than on the information and reasoning available at the time the decision was made. A good decision that leads to a bad outcome is judged as a poor decision, while a bad decision that happens to produce a good outcome is praised.

This bias is pervasive in product and design work. Teams routinely evaluate A/B tests, feature launches, and strategy pivots solely by their results — ignoring whether the process was sound, whether the sample size was adequate, or whether the positive outcome was simply due to chance. This leads to superstitious thinking, where teams replicate surface-level tactics from past "wins" without understanding the underlying mechanisms.

In UX and analytics, outcome bias distorts how teams learn from experiments. A well-designed experiment that yields a negative result is just as valuable as one that yields a positive result — both reduce uncertainty. But outcome bias causes teams to discard process rigor when results are favorable and question sound methodology when results disappoint.`,

    psychologyBasis: {
      discoveredBy: 'Jonathan Baron and John C. Hershey',
      year: 1988,
      theory: 'Decision Evaluation and Judgment under Uncertainty',
      mechanism: `The brain conflates outcome quality with decision quality because of several cognitive shortcuts:

1. **Hindsight Contamination**: Once we know the outcome, we reconstruct the decision as if the outcome was foreseeable, making good-outcome decisions seem "obviously right"
2. **Effort Justification**: Successful outcomes feel like they validate the effort, so we attribute success to decision quality rather than luck or external factors
3. **Causal Oversimplification**: The brain prefers simple cause-effect narratives ("we did X and got Y") over probabilistic reasoning ("X had a 60% chance of producing Y")
4. **Emotional Valence Transfer**: Positive outcomes generate positive feelings that bleed into evaluation of the process; negative outcomes generate negative feelings that taint otherwise sound reasoning
5. **Narrative Construction**: We build coherent stories backward from outcomes, selectively recalling evidence that makes the decision seem inevitable`,
    },

    realWorldExample: `In Baron & Hershey's 1988 study, participants evaluated a physician who had to decide whether to perform a risky surgery. When told the surgery succeeded, participants rated the physician's decision as excellent. When told the identical surgery (same patient, same information, same reasoning) failed, participants rated the decision as poor. The physician's reasoning was identical in both cases — only the outcome changed. This demonstrates that people judge decision quality by results, not by the soundness of the process used to reach the decision.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `Outcome bias profoundly distorts how product teams evaluate designs, experiments, and strategy. It causes teams to:

- Declare A/B tests "winners" based on conversion alone, ignoring statistical significance and confidence intervals
- Replicate surface features of past successful designs without understanding the mechanisms that drove the results
- Punish designers whose well-reasoned experiments produce negative results, discouraging rigorous experimentation
- Reward lucky guesses over disciplined process, eroding data culture
- Misattribute success to specific design choices when it may stem from external factors (seasonality, marketing, competitor actions)`,

    whenToUse: [
      {
        title: 'Process Documentation in Analytics Dashboards',
        scenario:
          'When displaying experiment results or performance metrics to decision-makers',
        example:
          'Show experiment methodology, sample size, confidence interval, and statistical power alongside conversion numbers so teams evaluate process quality, not just outcomes',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Retrospective and Post-Mortem Interfaces',
        scenario: 'When building tools for team retrospectives or decision reviews',
        example:
          'Prompt teams to evaluate the decision criteria and available information before revealing the outcome, separating process evaluation from result evaluation',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Performance Review Dashboards',
        scenario: 'When designing tools that track designer or team performance',
        example:
          'Include process metrics (experiments run, hypotheses tested, documentation quality) alongside outcome metrics (conversion, revenue), preventing outcome-only evaluation',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Experiment Result Reporting',
        scenario: 'When displaying A/B test or multivariate test results',
        example:
          'Require statistical significance thresholds to be met before declaring a winner, and display p-values and confidence intervals prominently — not buried in footnotes',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Decision Logging Interfaces',
        scenario: 'When building tools for documenting decisions and their rationale',
        example:
          'Capture decision rationale, alternatives considered, and risk assessment at decision time — before the outcome is known — to enable fair future evaluation',
        impact: ImpactLevel.MEDIUM,
      },
    ],

    whenToAvoid: [
      {
        title: 'Emergency or Safety-Critical Decisions',
        reason:
          'In safety contexts, outcomes must matter — a process that leads to harm needs correction regardless of intent',
        consequence:
          'Overemphasis on process could dismiss legitimate safety failures',
        alternative:
          'Use a dual evaluation: assess both process quality AND outcome severity independently',
      },
      {
        title: 'User-Facing Success Messaging',
        reason:
          'Users care about outcomes, not your internal process. Exposing process metrics to end users can create confusion',
        consequence:
          'Users may lose confidence if shown statistical uncertainty about features they rely on',
        alternative:
          'Reserve process-quality framing for internal tools; show users clear, confident outcomes',
      },
      {
        title: 'Accountability-Critical Contexts',
        reason:
          'Some decisions genuinely require outcome accountability (regulatory, financial, legal)',
        consequence:
          'Dismissing outcomes entirely could enable negligence or poor judgment',
        alternative:
          'Evaluate both process rigor and outcome impact, weighting each appropriately for context',
      },
      {
        title: 'When Outcomes Reveal Process Flaws',
        reason:
          'Repeated bad outcomes can signal genuine process deficiencies, not just bad luck',
        consequence:
          'Ignoring persistent negative outcomes under the guise of "good process" prevents improvement',
        alternative:
          'Track outcome patterns over time; single outcomes may be noise, but trends signal process issues',
      },
    ],

    commonMistakes: [
      {
        title: 'Declaring A/B Test Winners Without Statistical Rigor',
        description:
          'Calling an experiment a "win" because the treatment variant showed higher conversion, without checking statistical significance or adequate sample size',
        why: 'Outcome bias makes a positive result feel like proof, even when the data is noisy and the result may be random chance',
        fix: 'Require minimum sample sizes, pre-registered hypotheses, and significance thresholds (e.g., p < 0.05) before declaring any winner',
      },
      {
        title: 'Copying Successful Designs Without Understanding Why',
        description:
          'Replicating the visual style or layout of a high-performing competitor page without understanding what specifically drove the result',
        why: 'The successful outcome makes every element of the design seem intentional and effective, even decorative choices',
        fix: 'Identify specific mechanisms (value proposition clarity, CTA placement, trust signals) rather than copying surface-level aesthetics',
      },
      {
        title: 'Penalizing Null Results from Sound Experiments',
        description:
          'Treating a well-designed experiment that shows no significant difference as a "failure"',
        why: 'Outcome bias frames all non-positive results as wasted effort, even though null results reduce uncertainty and inform future decisions',
        fix: 'Celebrate learning velocity: track "experiments completed" and "uncertainty reduced" as positive metrics alongside conversion lifts',
      },
      {
        title: 'Abandoning Process After a Lucky Win',
        description:
          'Relaxing experimental rigor after a successful launch, assuming the team "knows what works"',
        why: 'A positive outcome creates false confidence that the process can be shortcut in the future',
        fix: 'Maintain consistent methodology regardless of recent outcomes. Past success does not guarantee future results',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.MEDIUM,
        description:
          'Dashboard and report layouts determine whether process metrics or outcome metrics dominate attention',
        examples: [
          'Placing outcome numbers (revenue, conversion) in hero position while burying methodology details',
          'Analytics dashboards that default to result views without surfacing confidence levels',
          'Experiment report layouts that show the verdict before the methodology',
          'Performance review screens that lead with outcome KPIs before process metrics',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Typographic hierarchy in reports and dashboards signals which information matters most',
        examples: [
          'Large, bold conversion numbers with small-print confidence intervals',
          'Headline-sized "Winner!" declarations with footnote-sized statistical caveats',
          'Bold outcome metrics paired with de-emphasized process quality indicators',
          'Revenue figures in display type while sample size appears in body text',
        ],
      },
      color: {
        level: ImpactLevel.HIGH,
        description:
          'Color coding in analytics tools reinforces outcome-based thinking by marking results as "good" or "bad" without nuance',
        examples: [
          'Green/red color coding on experiment results before statistical significance is confirmed',
          'Traffic-light dashboards that reduce complex outcomes to simple pass/fail',
          'Positive outcomes shown in rewarding green regardless of process quality',
          'Negative results shown in alarming red even when the experiment was well-designed',
        ],
      },
      interaction: {
        level: ImpactLevel.HIGH,
        description:
          'Interaction patterns in analytics and review tools shape whether teams evaluate process or just outcomes',
        examples: [
          'Auto-expanding "winner" variants in A/B test tools while collapsing methodology details',
          'Default sorting by conversion rate rather than statistical confidence',
          'One-click "ship winner" buttons that skip methodology review',
          'Filtering experiment history by outcome (won/lost) rather than by learning value',
        ],
      },
      content: {
        level: ImpactLevel.CRITICAL,
        description:
          'Content framing in experiment reports and retrospectives determines whether teams learn from process or just celebrate outcomes',
        examples: [
          'Experiment summaries that lead with "Conversion increased by X%" before explaining methodology',
          'Post-mortems that focus on "what went wrong" (outcome) rather than "what did we know at decision time" (process)',
          'Success narratives that construct inevitability: "We knew this would work because..."',
          'Reporting templates that lack fields for hypothesis quality, sample size, or confidence level',
        ],
      },
      accessibility: {
        level: ImpactLevel.MEDIUM,
        description:
          'Accessible analytics tools must convey process quality and outcome data equally to all users',
        examples: [
          'Screen readers encountering outcome numbers before methodology context',
          'Color-only pass/fail indicators inaccessible to colorblind users, compounding outcome bias with missing process data',
          'Chart alt-text that describes outcomes ("conversion went up") without noting confidence intervals',
          'Keyboard navigation that prioritizes result summaries over detailed methodology sections',
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
        title: 'Process-First Experiment Report',
        description:
          'A/B test reporting tool that surfaces methodology before revealing results',
        code: `<div class="experiment-report">
  <header class="experiment-header">
    <h2>Experiment: Simplified Checkout Flow</h2>
    <span class="status-badge running">Concluded</span>
  </header>

  <section class="methodology">
    <h3>Methodology</h3>
    <dl class="metrics-grid">
      <dt>Hypothesis</dt>
      <dd>Reducing checkout steps from 4 to 2 will increase completion rate</dd>
      <dt>Sample Size</dt>
      <dd>12,400 users (6,200 per variant)</dd>
      <dt>Duration</dt>
      <dd>14 days (2 full business cycles)</dd>
      <dt>Statistical Power</dt>
      <dd>0.82 (target: 0.80)</dd>
      <dt>Significance Threshold</dt>
      <dd>p < 0.05</dd>
    </dl>
  </section>

  <section class="results">
    <h3>Results</h3>
    <div class="result-card">
      <span class="metric">Conversion: +3.2%</span>
      <span class="confidence">95% CI: [1.1%, 5.3%]</span>
      <span class="significance significant">p = 0.003</span>
    </div>
    <p class="interpretation">
      Result is statistically significant and exceeds minimum detectable effect.
      Recommend shipping with continued monitoring.
    </p>
  </section>
</div>`,
        explanation:
          'By presenting methodology and statistical rigor before outcomes, this design encourages teams to evaluate the quality of the experiment first. The confidence interval and p-value are given equal visual weight to the conversion number, preventing raw outcome from dominating evaluation.',
        principle:
          'Separate process evaluation from outcome evaluation by presenting methodology first',
        metrics: {
          before: '68% of teams shipped experiments without checking statistical significance',
          after: '23% shipped without checking significance after process-first reporting',
          improvement: '66% reduction in premature experiment conclusions',
        },
      },
      {
        title: 'Decision Journal with Pre-Outcome Capture',
        description:
          'Decision logging tool that records rationale before outcomes are known',
        code: `<form class="decision-journal">
  <h3>Log Decision</h3>

  <fieldset class="decision-context">
    <legend>At Decision Time</legend>
    <label>
      What are you deciding?
      <textarea name="decision" placeholder="e.g., Launching redesigned pricing page"></textarea>
    </label>
    <label>
      What information do you have?
      <textarea name="evidence" placeholder="e.g., 3 user studies, competitor analysis, 2 prior A/B tests"></textarea>
    </label>
    <label>
      What alternatives did you consider?
      <textarea name="alternatives" placeholder="e.g., Incremental changes, different layout, no change"></textarea>
    </label>
    <label>
      Confidence level (before outcome)
      <input type="range" min="0" max="100" value="50" name="confidence">
      <output>50%</output>
    </label>
    <label>
      What could go wrong?
      <textarea name="risks" placeholder="e.g., Users may find new layout confusing, potential revenue dip"></textarea>
    </label>
  </fieldset>

  <p class="guidance">Outcome fields will unlock after the review period (30 days).</p>
  <button type="submit" class="primary">Save Decision Record</button>
</form>`,
        explanation:
          'Capturing the decision rationale, evidence, and confidence level at decision time prevents hindsight from contaminating evaluation. The outcome fields are locked until later, ensuring the record of reasoning is uncontaminated by results.',
        principle:
          'Record decision reasoning before outcomes are known to enable fair retrospective evaluation',
      },
      {
        title: 'Balanced Experiment History Dashboard',
        description:
          'Experiment tracker that values learning over winning',
        code: `<div class="experiment-history">
  <h3>Q4 Experiment Portfolio</h3>
  <div class="summary-stats">
    <div class="stat">
      <span class="number">24</span>
      <span class="label">Experiments Run</span>
    </div>
    <div class="stat">
      <span class="number">8</span>
      <span class="label">Statistically Significant</span>
    </div>
    <div class="stat">
      <span class="number">92%</span>
      <span class="label">Met Methodology Standards</span>
    </div>
    <div class="stat">
      <span class="number">18</span>
      <span class="label">Hypotheses Resolved</span>
    </div>
  </div>

  <table class="experiments-table">
    <thead>
      <tr>
        <th>Experiment</th>
        <th>Process Score</th>
        <th>Outcome</th>
        <th>Learning Value</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Checkout simplification</td>
        <td><span class="score high">9/10</span></td>
        <td><span class="outcome positive">+3.2%</span></td>
        <td><span class="score high">High</span></td>
      </tr>
      <tr>
        <td>Hero image personalization</td>
        <td><span class="score high">8/10</span></td>
        <td><span class="outcome neutral">No effect</span></td>
        <td><span class="score high">High</span></td>
      </tr>
      <tr>
        <td>Social proof badges</td>
        <td><span class="score low">4/10</span></td>
        <td><span class="outcome positive">+5.1%</span></td>
        <td><span class="score low">Low</span></td>
      </tr>
    </tbody>
  </table>
</div>`,
        explanation:
          'This dashboard tracks experiments by process quality and learning value, not just by outcome. The "Social proof badges" row shows a positive outcome but low process score, signaling an unreliable result. The "Hero image personalization" row shows a null result but high process and learning scores, celebrating rigorous experimentation regardless of outcome.',
        principle:
          'Evaluate experiments by process rigor and learning value, not just by whether the number went up',
      },
    ],

    bad: [
      {
        title: 'Outcome-Only A/B Test Dashboard',
        description:
          'Experiment tool that reduces complex results to simple win/lose verdicts',
        code: `<!-- DON'T DO THIS -->
<div class="ab-test-result">
  <h2 style="color: green; font-size: 2em;">WINNER!</h2>
  <p>Variant B increased conversions by 2.1%!</p>
  <button class="primary" style="font-size: 1.5em;">Ship It Now!</button>
  <small style="color: #ccc; font-size: 0.6em;">
    Based on 340 visitors over 3 days. p = 0.12
  </small>
</div>`,
        explanation:
          'This design declares a "winner" with a celebratory green headline and a prominent ship button, while burying the critical facts: the sample size (340) is tiny, the test ran only 3 days, and the p-value (0.12) means the result is NOT statistically significant. The positive outcome triggers outcome bias, causing teams to ship a result that is likely noise.',
        principle:
          'Never declare experiment winners based on directional results alone — require statistical significance',
      },
      {
        title: 'Results-Only Performance Review',
        description:
          'Performance dashboard that evaluates designers purely by experiment outcomes',
        code: `<!-- DON'T DO THIS -->
<div class="designer-scorecard">
  <h3>Q4 Performance: Sarah Chen</h3>
  <div class="score" style="font-size: 3em; color: red;">D+</div>
  <ul>
    <li>Experiments won: 1 of 6</li>
    <li>Win rate: 17%</li>
    <li>Revenue impact: -$12,000</li>
  </ul>
  <p>Below team average. Improvement plan required.</p>
</div>`,
        explanation:
          'This scorecard evaluates a designer entirely by whether experiments "won." It ignores that Sarah may have run rigorous, well-designed experiments that produced valuable null results. A 17% win rate could indicate excellent scientific rigor (most hypotheses should fail), but outcome bias frames it as poor performance.',
        principle:
          'Never evaluate people by experiment outcomes alone — measure process quality, learning velocity, and hypothesis rigor',
      },
      {
        title: 'Retrospective Without Decision-Time Context',
        description:
          'Post-mortem that evaluates past decisions with full hindsight but no process evaluation',
        code: `<!-- DON'T DO THIS -->
<div class="retrospective">
  <h3>Q4 Redesign Post-Mortem</h3>
  <h4 style="color: red;">What Went Wrong</h4>
  <ul>
    <li>Should have kept the old navigation — bounce rate increased 15%</li>
    <li>Pricing page change was clearly a mistake — revenue dipped</li>
    <li>Mobile-first approach was wrong — desktop converts better</li>
  </ul>
  <h4>Action Items</h4>
  <ul>
    <li>Revert all changes immediately</li>
    <li>Never change navigation without executive approval</li>
  </ul>
</div>`,
        explanation:
          'This retrospective judges every decision by its outcome, with full hindsight. It assumes negative outcomes mean the decisions were wrong, without examining what information was available at decision time, whether the decisions were well-reasoned given that information, or whether external factors contributed to the outcomes.',
        principle:
          'Retrospectives must evaluate decisions in the context of what was known at decision time, not with hindsight knowledge',
      },
    ],

    realWorld: [
      {
        company: 'Netflix',
        product: 'Experimentation Platform',
        description: 'Netflix evaluates experiments using rigorous statistical methodology, requiring adequate sample sizes and significance levels before declaring results. Their experimentation culture explicitly warns against outcome bias and evaluates experiment quality separately from experiment results.',
        effectiveness: 'very-effective',
        analysis: 'By institutionalizing process-quality metrics alongside outcomes, Netflix prevents teams from shipping statistically insignificant results and encourages rigorous experimentation even when results are null.',
      },
      {
        company: 'Bridgewater Associates',
        product: 'Decision Journal',
        description: 'Ray Dalio\'s firm requires investment decisions to be logged with full rationale before outcomes are known. Decisions are later evaluated on process quality, not just returns. A well-reasoned bet that loses money is valued over a lucky guess that makes money.',
        effectiveness: 'very-effective',
        analysis: 'Separating decision logging from outcome evaluation is one of the strongest debiasing techniques for outcome bias. It forces evaluators to confront whether the reasoning was sound given available information.',
      },
      {
        company: 'Professional Sports',
        product: 'Coaching Decisions',
        description: 'NFL coaches who make probabilistically correct fourth-down decisions are criticized when the play fails and praised when it succeeds, even when the expected value calculation is identical. Analytics-forward coaches face intense outcome-biased media scrutiny.',
        effectiveness: 'somewhat-effective',
        analysis: 'Sports provides vivid real-world evidence of outcome bias. Coaches who consistently make statistically optimal decisions are penalized for individual bad outcomes, discouraging data-driven decision-making. The industry is slowly adopting process-oriented evaluation but outcome bias remains dominant.',
      },
      {
        company: 'Investment Industry',
        product: 'Stock Picking Retrospectives',
        description: 'Fund managers who generated high returns in a bull market are celebrated as geniuses, while managers with sound risk-adjusted processes who underperformed the market are fired. Studies show past fund performance has minimal predictive value for future returns.',
        effectiveness: 'somewhat-effective',
        analysis: 'The investment industry is a textbook case of outcome bias at scale. Billions of dollars are allocated based on past outcomes (returns) rather than process quality (risk management, diversification, methodology). Quantitative firms are slowly shifting toward process-oriented evaluation.',
      },
    ],

    abTests: [
      {
        title: 'Process-First vs Outcome-First Experiment Reports',
        hypothesis:
          'Showing methodology before results will reduce premature experiment shipping decisions',
        controlVersion: {
          description:
            'Experiment report showing results first: large "Winner" banner with conversion number, methodology details in collapsed accordion at bottom',
          metrics: {
            conversionRate: '78% of teams shipped after seeing results',
            clickThroughRate: '12% expanded methodology section',
          },
        },
        treatmentVersion: {
          description:
            'Experiment report showing methodology first: hypothesis, sample size, significance level, and confidence interval displayed before the conversion result, with a "Review Methodology" step required before the "Ship" button activates',
          metrics: {
            conversionRate: '34% of teams shipped after reviewing methodology',
            clickThroughRate: '100% reviewed methodology (required step)',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'The process-first design reduced premature shipping by 56%. Teams were significantly more likely to wait for adequate sample sizes and statistical significance. Critically, 15% of experiments that would have been shipped in the control condition were later found to be non-significant — the process-first design prevented shipping noise.',
          learnings: [
            'Requiring methodology review before outcome display dramatically reduces outcome bias',
            'Teams do not resist the extra step when the interface makes it a natural part of the flow',
            'False positive rate (shipping insignificant results) dropped from 23% to 4%',
            'Team satisfaction with experiment culture improved despite shipping fewer "winners"',
          ],
        },
      },
      {
        title: 'Outcome-Only vs Dual-Score Performance Reviews',
        hypothesis:
          'Adding process quality scores alongside outcome metrics will reduce outcome-biased evaluations',
        controlVersion: {
          description:
            'Performance review dashboard showing only outcome metrics: experiments won, revenue impact, conversion lifts',
          metrics: {
            conversionRate: '91% correlation between review score and experiment win rate',
            clickThroughRate: 'N/A',
          },
        },
        treatmentVersion: {
          description:
            'Performance review dashboard showing both process scores (methodology rigor, hypothesis quality, documentation) and outcome metrics, with equal visual weight',
          metrics: {
            conversionRate: '47% correlation between review score and experiment win rate',
            clickThroughRate: 'N/A',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'The dual-score design reduced the correlation between outcomes and performance ratings by 48%, indicating reviewers were evaluating process quality rather than just results. Designers with rigorous processes but null results received significantly fairer evaluations.',
          learnings: [
            'Equal visual weight for process and outcome metrics shifts evaluator attention',
            'Designers reported feeling safer running ambitious experiments with the dual-score system',
            'Experiment volume increased 30% as teams felt less pressure to only run "safe" tests',
            'Long-term team performance improved as more rigorous experimentation led to better insights',
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
        name: 'Winner/Loser Labels',
        description:
          'Experiment results reduced to binary win/lose labels without statistical context',
        howToSpot:
          'Look for green "Winner" badges, red "Loser" labels, or thumbs-up/down icons on experiment results without accompanying confidence data',
        severity: ImpactLevel.CRITICAL,
      },
      {
        name: 'Outcome-Dominant Typography',
        description:
          'Conversion numbers or revenue figures displayed in large, bold type while methodology details appear in small print',
        howToSpot:
          'Check if outcome metrics are in display/headline size while sample size, p-values, and confidence intervals are in footnote-sized text',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Result-First Layout',
        description:
          'Dashboards and reports that show outcomes before process or methodology information',
        howToSpot:
          'Check the reading order: does the user encounter the result (up/down, win/lose) before understanding how the result was measured?',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Color-Coded Verdicts Without Nuance',
        description:
          'Green/red color coding applied to results before statistical significance is confirmed',
        howToSpot:
          'Look for traffic-light color systems on experiment results, especially when no significance threshold is displayed',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Ship-It Buttons Without Gates',
        description:
          'Prominent "Ship Winner" or "Launch" buttons on experiment results without methodology review checkpoints',
        howToSpot:
          'Check if the primary CTA on experiment reports enables shipping without reviewing statistical rigor',
        severity: ImpactLevel.CRITICAL,
      },
    ],

    patterns: [
      {
        name: 'Outcome-Only Evaluation Pattern',
        description:
          'Experiments, features, or decisions evaluated solely by their results without process quality assessment',
        indicators: [
          'Experiment dashboards sorted by "conversion lift" with no process score column',
          'Performance reviews that only reference outcomes (revenue, conversion, win rate)',
          'Retrospectives that frame all negative outcomes as "mistakes"',
          'Decision logs that only record what happened, not what was known at decision time',
        ],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Hindsight Reconstruction Pattern',
        description:
          'Post-hoc narratives that make outcomes seem inevitable or foreseeable',
        indicators: [
          'Language like "we should have known" or "it was obvious in hindsight"',
          'Retrospectives that don\'t reference what information was available at decision time',
          'Case studies that construct neat cause-effect narratives from messy reality',
          'Success stories that omit luck, timing, and external factors',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Statistical Significance Neglect Pattern',
        description:
          'Experiment conclusions drawn from directional results without confirming statistical significance',
        indicators: [
          'A/B test reports without p-values or confidence intervals',
          'Experiments concluded after days rather than reaching target sample sizes',
          'Multiple metrics tested without correction for multiple comparisons',
          'Winners declared based on percentage differences alone',
        ],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Survivorship in Success Stories Pattern',
        description:
          'Only showcasing successful outcomes while omitting failed attempts and null results',
        indicators: [
          'Case study libraries that only feature positive outcomes',
          'Team newsletters that only report experiment "wins"',
          'Portfolio presentations that omit failed experiments',
          'Onboarding materials that only show success stories',
        ],
        severity: ImpactLevel.MEDIUM,
        confidence: 'medium',
      },
    ],

    checklistQuestions: [
      'Are experiment results shown with or without statistical significance indicators?',
      'Can teams ship experiment results without reviewing methodology?',
      'Are decisions evaluated in context of what was known at decision time?',
      'Do retrospectives separate process quality from outcome quality?',
      'Are null results treated as valuable learning or as failures?',
      'Do performance reviews include process quality metrics alongside outcomes?',
      'Are success narratives presented with appropriate uncertainty and attribution?',
      'Is there a decision journal that captures rationale before outcomes are known?',
      'Do experiment reports lead with methodology or with results?',
      'Are teams incentivized for rigorous process or only for positive outcomes?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in outcome bias and decision evaluation.

Analyze the provided design for outcome bias patterns. Identify:

1. **Result Framing**: How experiment results, performance metrics, or decision outcomes are presented
2. **Process Visibility**: Whether methodology, reasoning, and decision-time context are visible alongside outcomes
3. **Statistical Rigor**: Whether statistical significance, confidence intervals, and sample sizes are surfaced
4. **Evaluation Fairness**: Whether people and decisions are evaluated by process quality or only by results
5. **Hindsight Contamination**: Whether retrospectives and reviews account for information available at decision time

For each pattern found:
- Identify where outcome bias may distort evaluation
- Assess whether process quality is given adequate visibility
- Determine if the design encourages or prevents premature conclusions
- Evaluate whether null results are treated as valuable learning
- Suggest improvements for balanced decision evaluation

Consider:
- Are experiment results shown with adequate statistical context?
- Can users make shipping decisions without reviewing methodology?
- Do retrospectives evaluate decisions in context of what was known at the time?
- Are positive outcomes from poor process correctly identified as unreliable?
- Are well-reasoned decisions with negative outcomes unfairly penalized?

Provide actionable recommendations for reducing outcome bias in decision-making interfaces.`,

    outputSchema: {
      type: 'object',
      properties: {
        outcomeBiasPatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              outcomeEmphasis: { type: 'string' },
              processVisibility: { type: 'string' },
              statisticalRigor: { type: 'string' },
              biasRisk: { type: 'string' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'outcomeEmphasis',
              'processVisibility',
              'biasRisk',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            processVisibilityScore: { type: 'number' },
            statisticalRigorScore: { type: 'number' },
            evaluationFairnessScore: { type: 'number' },
            hindsightProtectionScore: { type: 'number' },
          },
          required: [
            'processVisibilityScore',
            'statisticalRigorScore',
            'evaluationFairnessScore',
            'hindsightProtectionScore',
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
        'outcomeBiasPatterns',
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
        title: 'Separate Process from Outcome in Your Reporting',
        description:
          'Design experiment reports and dashboards to present methodology and process quality independently from results',
        example:
          'Add a "Methodology Score" column to your experiment tracker, rated independently of whether the experiment "won"',
        tips: [
          'Show hypothesis, sample size, and significance threshold before revealing results',
          'Use separate visual sections for process evaluation and outcome reporting',
          'Require a methodology review step before any "ship" action',
        ],
      },
      {
        step: 2,
        title: 'Implement Decision Journals',
        description:
          'Build tools that capture decision rationale, evidence, and confidence levels at decision time — before outcomes are known',
        example:
          'Create a decision log form that records: what was decided, what evidence was available, what alternatives were considered, and confidence level',
        tips: [
          'Lock outcome fields until the review period elapses',
          'Prompt decision-makers to record what could go wrong',
          'Include a pre-decision confidence calibration slider',
        ],
      },
      {
        step: 3,
        title: 'Require Statistical Rigor Before Declaring Results',
        description:
          'Build guardrails into experiment tools that prevent premature conclusions',
        example:
          'Disable the "Ship Winner" button until the experiment reaches the pre-registered sample size and significance threshold',
        tips: [
          'Pre-register hypotheses and success criteria before launching experiments',
          'Display p-values and confidence intervals with the same visual prominence as conversion numbers',
          'Flag experiments that were concluded before reaching adequate sample size',
        ],
      },
      {
        step: 4,
        title: 'Value Learning Velocity Over Win Rate',
        description:
          'Track and celebrate the number of experiments run and hypotheses resolved, not just the number of "winners"',
        example:
          'Dashboard headline: "18 hypotheses resolved this quarter" rather than "5 experiments won"',
        tips: [
          'Include null results in success narratives as valuable learning',
          'Track "uncertainty reduced" as a key metric',
          'Celebrate well-designed experiments regardless of their outcome',
        ],
      },
      {
        step: 5,
        title: 'Structure Retrospectives to Counter Hindsight',
        description:
          'Design retrospective formats that evaluate decisions in the context of what was known at decision time',
        example:
          'Before discussing outcomes, have the team reconstruct what information was available and what the decision options were at the time',
        tips: [
          'Start retrospectives by reviewing the decision journal, not the results',
          'Ask "Was this a good decision given what we knew?" separately from "Did this produce a good outcome?"',
          'Identify external factors and luck alongside internal decisions',
        ],
      },
    ],

    dos: [
      'Display statistical significance alongside experiment results with equal visual weight',
      'Require methodology review before allowing experiment shipping decisions',
      'Capture decision rationale at decision time, before outcomes are known',
      'Evaluate experiments by process quality and learning value, not just outcomes',
      'Treat well-designed experiments with null results as valuable successes',
      'Include process quality metrics in performance reviews alongside outcomes',
      'Structure retrospectives to evaluate decisions in context of what was known at the time',
      'Track learning velocity and uncertainty reduction as key team metrics',
    ],

    donts: [
      'Don\'t declare A/B test winners based on directional results without statistical significance',
      'Don\'t evaluate designers or teams solely by experiment win rates',
      'Don\'t frame null results as failures — they reduce uncertainty and inform future decisions',
      'Don\'t construct inevitability narratives around successful outcomes ("we knew it would work")',
      'Don\'t use green/red color coding on experiment results before significance is confirmed',
      'Don\'t allow one-click shipping of experiment results without methodology review',
      'Don\'t run retrospectives that only ask "what went wrong" without examining decision-time context',
      'Don\'t celebrate lucky outcomes from poor processes — they create dangerous false confidence',
    ],

    bestPractices: [
      {
        title: 'Process-First Experiment Reporting',
        description:
          'Design experiment reports that present methodology, sample size, and significance before revealing outcome numbers',
        rationale:
          'Once people see the outcome, they can no longer evaluate the process objectively — present process first',
        example:
          'Report structure: Hypothesis -> Methodology -> Statistical Summary -> Results -> Interpretation',
      },
      {
        title: 'Pre-Registration of Experiment Criteria',
        description:
          'Require teams to define success criteria, sample size, and significance thresholds before launching experiments',
        rationale:
          'Post-hoc criteria selection is contaminated by outcome knowledge; pre-registration prevents moving goalposts',
        example:
          'Experiment setup form with required fields: primary metric, minimum sample size, significance threshold, expected effect size',
      },
      {
        title: 'Dual-Score Evaluation',
        description:
          'Evaluate decisions and experiments on two independent axes: process quality and outcome quality',
        rationale:
          'A good process that produces a bad outcome and a bad process that produces a good outcome are both informative — conflating them destroys learning',
        example:
          'Experiment scorecard with separate "Process Score: 9/10" and "Outcome: -2.1% (not significant)" fields',
      },
      {
        title: 'Decision-Time Reconstruction',
        description:
          'In retrospectives, reconstruct the information environment at decision time before evaluating the decision',
        rationale:
          'Evaluating decisions with hindsight knowledge is unfair and uninformative — decisions can only be judged by what was knowable',
        example:
          'Retrospective step 1: "Here is what we knew on October 15th when we made this decision..." before discussing outcomes',
      },
      {
        title: 'Celebrate Learning, Not Just Winning',
        description:
          'Create team rituals and metrics that celebrate experimentation rigor and learning velocity, not just positive outcomes',
        rationale:
          'If only positive outcomes are celebrated, teams will avoid ambitious experiments and only run safe, incremental tests',
        example:
          'Weekly team share: "Most Valuable Experiment" award based on learning value, not conversion lift',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships - Ensure statistical context is semantically associated with results',
        implementation:
          'Use proper table markup, ARIA descriptions, and semantic grouping so confidence intervals and p-values are programmatically linked to the results they describe',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.4.1',
        guideline:
          'Use of Color - Don\'t rely only on green/red to communicate experiment outcomes',
        implementation:
          'Combine color with text labels ("Significant" / "Not significant"), icons, and ARIA attributes so all users understand result status',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.3.2',
        guideline:
          'Meaningful Sequence - Present methodology before results in reading order',
        implementation:
          'Ensure DOM order places methodology and statistical context before outcome numbers so screen reader users encounter process information first',
      },
    ],

    ethics: [
      {
        concern: 'Unfair Performance Evaluation',
        severity: 'critical',
        explanation:
          'Evaluating designers, PMs, or teams solely by experiment outcomes penalizes rigorous experimentation and rewards lucky guesses',
        mitigation:
          'Include process quality metrics (methodology rigor, hypothesis quality, documentation) with equal weight in performance evaluations. Explicitly value null results from well-designed experiments.',
      },
      {
        concern: 'Premature Experiment Shipping',
        severity: 'critical',
        explanation:
          'Shipping A/B test results without statistical significance exposes users to potentially harmful or ineffective changes based on noise',
        mitigation:
          'Implement hard guardrails: require minimum sample sizes and significance thresholds before enabling shipping decisions. Display confidence intervals prominently.',
      },
      {
        concern: 'Hindsight-Contaminated Retrospectives',
        severity: 'high',
        explanation:
          'Judging past decisions with full hindsight knowledge creates blame culture and discourages sound risk-taking',
        mitigation:
          'Structure retrospectives to evaluate decisions in context of what was known at decision time. Use decision journals to preserve pre-outcome reasoning.',
      },
      {
        concern: 'Survivorship Bias in Case Studies',
        severity: 'medium',
        explanation:
          'Only publishing successful experiment outcomes creates unrealistic expectations and hides the base rate of experiment failure',
        mitigation:
          'Publish null results and failed experiments alongside successes. Report experiment win rates honestly to calibrate team expectations.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'The Relation Between the Outcome of Risky Ventures and the Quality of the Decision Process',
        author: 'Baron, J., & Hershey, J. C.',
        year: 1988,
        doi: '10.1016/0749-5978(88)90018-8',
        description:
          'The foundational paper on outcome bias, demonstrating that people evaluate identical decisions differently based on whether the outcome was positive or negative',
        type: 'foundational',
      },
      {
        title: 'Outcome Bias in Decision Evaluation',
        author: 'Baron, J., & Hershey, J. C.',
        year: 1988,
        doi: '10.1037/0022-3514.54.4.569',
        description:
          'Extended research showing outcome bias persists even when participants are explicitly told the outcome was determined by chance',
        type: 'foundational',
      },
      {
        title: 'Hindsight Bias: A By-Product of Knowledge Updating',
        author: 'Fischhoff, B.',
        year: 1975,
        doi: '10.1037/0022-3514.32.2.288',
        description:
          'The closely related hindsight bias research that underpins understanding of why outcomes contaminate decision evaluation',
        type: 'advanced',
      },
      {
        title: 'Outcome Bias and Outcome Attribution in Decision Evaluation',
        author: 'Gino, F., Moore, D. A., & Bazerman, M. H.',
        year: 2009,
        description:
          'Modern research exploring how outcome bias interacts with causal attribution in organizational settings',
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
          'Comprehensive coverage of judgment biases including outcome bias, hindsight bias, and their implications for decision evaluation',
        type: 'foundational',
      },
      {
        title: 'Thinking in Bets',
        author: 'Duke, Annie',
        year: 2018,
        isbn: '9780735216358',
        description:
          'Practical framework for separating decision quality from outcome quality, drawn from professional poker and decision science',
        type: 'practical',
      },
      {
        title: 'Superforecasting: The Art and Science of Prediction',
        author: 'Tetlock, Philip E., & Gardner, Dan',
        year: 2015,
        isbn: '9780804136716',
        description:
          'Research on how the best forecasters evaluate predictions by process quality and calibration, not just by outcomes',
        type: 'practical',
      },
    ],

    articles: [
      {
        title: 'The Difference Between Process and Outcome',
        author: 'Farnam Street',
        url: 'https://fs.blog/outcome-bias/',
        description:
          'Accessible overview of outcome bias with practical strategies for separating process evaluation from result evaluation',
        type: 'practical',
      },
      {
        title: 'Why Good Decisions Can Lead to Bad Outcomes',
        author: 'Harvard Business Review',
        url: 'https://hbr.org/2016/02/noise',
        description:
          'Business-oriented exploration of outcome bias in organizational decision-making and performance evaluation',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'Resulting: Why Good Decisions Get Bad Outcomes',
        author: 'Annie Duke',
        url: 'https://www.youtube.com/watch?v=E4IMBxOrxGs',
        description:
          'Talk on separating decision quality from outcome quality, with practical examples from poker, business, and sports',
        type: 'practical',
      },
    ],

    demos: [],
  },

  //===========================================
  // RELATIONSHIPS
  //===========================================
  relationships: {
    complements: [
      'hindsight-bias',       // Hindsight makes outcomes seem foreseeable, amplifying outcome bias
      'survivorship-bias',    // Only seeing survivors reinforces outcome-based evaluation
      'confirmation-bias',    // We seek evidence that confirms the outcome was predictable
      'attribution-error',    // We attribute outcomes to decisions rather than to chance or context
    ],

    conflicts: [
      'base-rate-neglect',    // Understanding base rates helps calibrate outcome expectations
      'probabilistic-thinking', // Thinking in probabilities counteracts binary outcome evaluation
    ],

    confusedWith: [
      'hindsight-bias',       // Related but distinct: hindsight is "I knew it all along"; outcome bias is "good result = good decision"
      'results-orientation',  // Results matter, but outcome bias is the error of equating results with decision quality
      'fundamental-attribution-error', // Attributing outcomes to people rather than circumstances
    ],

    hierarchy: {
      parent: 'cognitive-bias',
      children: [
        'resulting',           // Annie Duke's term for outcome bias in poker/decision contexts
        'moral-luck',          // Judging moral quality of actions by their outcomes
      ],
    },
  },
};
