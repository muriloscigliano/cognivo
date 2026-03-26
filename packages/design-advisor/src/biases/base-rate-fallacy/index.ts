/**
 * BASE RATE FALLACY
 *
 * We ignore general statistics in favor of specific information
 */


import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const baseRateFallacy: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'base-rate-fallacy',
    name: 'Base Rate Fallacy',
    aliases: ['Base Rate Neglect', 'Base Rate Bias', 'Prosecutor\'s Fallacy'],
    category: BiasCategory.COGNITIVE,
    relatedCategories: [
      BiasCategory.DECISION_MAKING,
      BiasCategory.PERCEPTION,
      BiasCategory.MEMORY,
    ],
    tags: [
      'statistics',
      'probability',
      'judgment',
      'data-visualization',
      'risk-communication',
      'decision-making',
      'medical',
      'false-positive',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple: 'We ignore general statistics in favor of specific information',

    detailed: `The Base Rate Fallacy is a cognitive bias where people ignore or underweight general statistical information (base rates) in favor of specific, individuating information when making probability judgments.

When presented with both statistical base rates and vivid case-specific details, people systematically neglect the base rates. For example, if a medical test is 99% accurate but only 1 in 10,000 people have the disease, a positive result is far more likely to be a false positive than a true positive. Yet most people — including doctors — dramatically overestimate the probability of actually having the disease after a positive test.

In UX and product design, this bias surfaces wherever interfaces display probabilities, test results, accuracy metrics, risk assessments, or statistical summaries. Dashboards showing alert accuracy without false positive rates, security tools displaying threat detection percentages without population context, and medical calculators presenting risk scores without base rates all trigger this fallacy. Designers who understand base rate neglect can build interfaces that help users reason statistically rather than intuitively.`,

    psychologyBasis: {
      discoveredBy: 'Daniel Kahneman and Amos Tversky',
      year: 1973,
      theory: 'Heuristics and Biases Research Program',
      mechanism: `The brain ignores statistical base rates in favor of specific, individual information because of several interacting cognitive mechanisms:

1. **Representativeness Heuristic**: People judge probability by how well a case matches a prototype, ignoring how common the category is in the population
2. **Narrative Dominance**: Specific, vivid case information activates storytelling circuits that override abstract statistical reasoning
3. **Denominator Neglect**: People focus on the numerator (hits, positives) while ignoring the denominator (total population, total tests)
4. **Conjunction Fallacy**: Detailed descriptions feel more probable than general ones, even when probability theory says otherwise
5. **Cognitive Effort Asymmetry**: Processing base rates requires effortful Bayesian reasoning, while matching to specific information is automatic and intuitive

The mechanism is deeply rooted: even trained statisticians fall prey to base rate neglect when problems are framed in terms of percentages rather than natural frequencies.`,
    },

    realWorldExample: `In Kahneman and Tversky's famous 1973 "engineer-lawyer" experiment, participants were told a group contained 70 lawyers and 30 engineers (or vice versa). They were given personality descriptions of individuals and asked to estimate the probability each person was an engineer. Participants almost entirely ignored the base rate (70/30 split) and judged solely based on whether the description "sounded like" an engineer. Even when given a completely uninformative description, participants estimated 50/50 rather than using the known base rate. The base rate — the single most informative piece of data — was treated as irrelevant.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `The Base Rate Fallacy critically affects how users interpret data, assess risk, and make decisions in interfaces that present statistical information. Designers must account for this bias to:

- Contextualize accuracy metrics with population base rates so users understand false positive rates
- Display risk and probability information using natural frequencies ("1 in 1,000") rather than percentages ("0.1%")
- Ensure dashboards and data visualizations show both individual data points and population-level context
- Prevent alarm fatigue by helping users understand the true predictive value of alerts and notifications
- Support medical, financial, and security decision-making with properly contextualized statistics`,

    whenToUse: [
      {
        title: 'Medical Screening Results',
        scenario:
          'When displaying test results, diagnostic accuracy, or risk scores to patients or clinicians',
        example:
          'Show "Of 1,000 people tested, 10 have the condition. Of those 10, the test catches 9. Of the 990 without it, 50 get false positives. So a positive result means ~15% chance of truly having the condition."',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Security Alert Dashboards',
        scenario: 'When displaying threat detection results, intrusion alerts, or anomaly scores',
        example:
          'Show "This alert type has a 2% true positive rate — 98 of every 100 alerts of this type are false positives" alongside each alert category',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Data Visualization and Analytics',
        scenario: 'When presenting statistical summaries, accuracy metrics, or performance data',
        example:
          'Pair "99.5% model accuracy" with "At this base rate, that means 1 correct prediction for every 4 flagged items"',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Financial Risk Calculators',
        scenario: 'When showing investment risk, fraud detection, or credit scoring results',
        example:
          'Display fraud alert context: "This transaction matched fraud patterns, but only 1 in 500 flagged transactions is actually fraudulent"',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Search and Filter Results',
        scenario: 'When displaying relevance scores or match quality in search interfaces',
        example:
          'Show "95% match" alongside "Based on 12,000 profiles, ~600 match at this level — here are the 3 strongest differentiators"',
        impact: ImpactLevel.MEDIUM,
      },
    ],

    whenToAvoid: [
      {
        title: 'Simple Binary Outcomes',
        reason:
          'When outcomes are truly 50/50 or base rates are close to equal, adding base rate context adds noise without helping',
        consequence:
          'Users become confused by unnecessary statistical context on straightforward choices',
        alternative:
          'Only add base rate context when base rates are significantly skewed or when false positive/negative rates matter',
      },
      {
        title: 'Expert Statistical Audiences',
        reason:
          'Trained statisticians and data scientists already account for base rates',
        consequence:
          'Over-explaining base rates to expert users feels patronizing and slows their workflow',
        alternative:
          'Provide base rate context on demand or in progressive disclosure for expert interfaces',
      },
      {
        title: 'Situations Requiring Urgent Action',
        reason:
          'When immediate action is needed (fire alarms, critical system alerts), statistical context can delay response',
        consequence:
          'Users spend time evaluating probabilities when they should be acting',
        alternative:
          'For genuinely urgent alerts, present base rate context after the immediate response, not during it',
      },
      {
        title: 'Marketing and Persuasion',
        reason:
          'Intentionally hiding base rates to make statistics seem more impressive is manipulative',
        consequence:
          'Users make decisions based on misleading data, eroding trust when they discover the full picture',
        alternative:
          'Always present base rate context honestly, even when it makes metrics look less impressive',
      },
    ],

    commonMistakes: [
      {
        title: 'Showing Accuracy Without Base Rates',
        description:
          'Displaying "99% accurate" for a test or model without showing the base rate of the condition being tested for',
        why: 'A 99% accurate test for a 1-in-10,000 condition produces mostly false positives, but users assume 99% of positive results are correct',
        fix: 'Always pair accuracy metrics with base rates, and show the positive predictive value (PPV) directly',
      },
      {
        title: 'Percentage-Only Displays',
        description:
          'Presenting probabilities as percentages (0.1%) rather than natural frequencies (1 in 1,000)',
        why: 'Research by Gigerenzer shows people reason much better with natural frequencies than with percentages or conditional probabilities',
        fix: 'Use natural frequency formats: "X out of Y" or "1 in Z" instead of abstract percentages',
      },
      {
        title: 'Alarming Numbers Without Population Context',
        description:
          'Showing "500 threats detected!" without noting this is out of 10 million events (0.005%)',
        why: 'Large absolute numbers feel alarming even when the rate is negligible, causing unnecessary anxiety or alert fatigue',
        fix: 'Always show both the absolute number and the rate relative to the total population or event count',
      },
      {
        title: 'Ignoring False Positive Communication',
        description:
          'Highlighting true positives (catches, detections) while burying or omitting false positive rates',
        why: 'Users cannot assess the real meaning of a positive result without knowing how many false positives accompany it',
        fix: 'Display false positive rates prominently alongside detection/accuracy rates, using visual aids like icon arrays or frequency trees',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.HIGH,
        description:
          'Layout determines whether base rate information is visible alongside specific results',
        examples: [
          'Placing population context directly adjacent to individual test results prevents neglect',
          'Dashboard layouts that separate summary statistics from individual alerts encourage base rate neglect',
          'Side-by-side layouts comparing individual cases to population averages support calibration',
          'Progressive disclosure that hides base rates behind clicks ensures most users never see them',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Typography hierarchy determines whether base rates or specific results are perceived as primary',
        examples: [
          'Making "99% accurate" large and bold while base rate context is small and grey buries critical context',
          'Equal visual weight for accuracy and base rate information supports balanced judgment',
          'Using clear, readable formats for natural frequencies improves comprehension',
          'Typographic emphasis on population denominators helps counter denominator neglect',
        ],
      },
      color: {
        level: ImpactLevel.HIGH,
        description:
          'Color coding for alerts, risk levels, and results can reinforce or counteract base rate neglect',
        examples: [
          'Red "positive result" badges without context amplify alarm regardless of base rate',
          'Color-coded probability gradients that reflect true positive predictive value help calibration',
          'Using neutral colors for raw test results and reserving alarm colors for true risk levels',
          'Heat maps that encode base-rate-adjusted probabilities rather than raw scores',
        ],
      },
      interaction: {
        level: ImpactLevel.CRITICAL,
        description:
          'Interactive elements can either expose or hide base rate context at the moment of decision',
        examples: [
          'Tooltips on accuracy percentages that show base-rate-adjusted interpretation on hover',
          'Interactive Bayesian calculators that let users input base rates and see how results change',
          'Drill-down interactions from alert counts to false positive breakdowns',
          'Slider controls showing how changing base rate assumptions affects result interpretation',
        ],
      },
      content: {
        level: ImpactLevel.CRITICAL,
        description:
          'Content framing determines whether users receive information in formats that support or undermine statistical reasoning',
        examples: [
          'Natural frequency statements ("1 in 1,000") are understood 3-5x better than percentages ("0.1%")',
          'Frequency trees and icon arrays make base rates visually intuitive',
          'Narrative explanations of what a positive result means in context prevent misinterpretation',
          'Comparative framing ("Out of 100 people like you...") activates proper statistical reasoning',
        ],
      },
      accessibility: {
        level: ImpactLevel.HIGH,
        description:
          'Statistical information must be accessible to all users, including those using assistive technology',
        examples: [
          'Screen readers must convey base rate context alongside results, not separately',
          'Visual frequency displays (icon arrays) need text alternatives that convey the same proportional information',
          'Color-coded risk indicators need non-color alternatives for colorblind users',
          'Complex probability information needs plain-language explanations for cognitive accessibility',
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
        title: 'Natural Frequency Medical Test Display',
        description:
          'Medical screening result shown with full Bayesian context using natural frequencies',
        code: `<div class="test-result">
  <h3>Your Screening Result: Positive</h3>

  <div class="context-panel">
    <h4>What does this mean?</h4>
    <div class="frequency-tree">
      <p>Imagine <strong>1,000 people</strong> like you take this test:</p>
      <ul>
        <li><strong>5</strong> actually have the condition</li>
        <li>Of those 5, the test correctly identifies <strong>4</strong></li>
        <li>Of the 995 without it, <strong>50</strong> get false positives</li>
      </ul>
      <p class="result-context">
        So out of <strong>54 positive results</strong>, only
        <strong>4 are true positives</strong>.
      </p>
      <p class="probability">
        Your chance of actually having the condition:
        <strong>about 7%</strong>, not 99%.
      </p>
    </div>
    <p class="next-step">A follow-up test will clarify. Your doctor
    will discuss next steps with you.</p>
  </div>
</div>`,
        explanation:
          'By presenting the result using natural frequencies and a frequency tree, users can intuitively understand that a positive result on a rare condition mostly produces false positives. This prevents the common misinterpretation that a "99% accurate" test means a 99% chance of having the disease.',
        principle:
          'Natural frequency formats make Bayesian reasoning intuitive even for non-statisticians',
        metrics: {
          before: '85% of patients overestimated disease probability after positive test',
          after: '28% overestimated when shown natural frequency display',
          improvement: '67% reduction in probability overestimation',
        },
      },
      {
        title: 'Security Alert Dashboard with Base Rate Context',
        description:
          'Security operations dashboard that contextualizes alerts with false positive rates',
        code: `<div class="alert-dashboard">
  <div class="alert-category">
    <h4>Malware Detection Alerts</h4>
    <div class="alert-stats">
      <span class="count">127 alerts today</span>
      <span class="context">out of 2.4M scanned files</span>
    </div>
    <div class="base-rate-context">
      <div class="accuracy-bar">
        <div class="true-positive" style="width: 8%">
          <span>~10 true threats</span>
        </div>
        <div class="false-positive" style="width: 92%">
          <span>~117 false positives</span>
        </div>
      </div>
      <p class="historical">Historical true positive rate for this
      alert type: <strong>8.2%</strong></p>
    </div>
    <p class="guidance">Prioritize alerts with confidence score > 0.9
    (historically 62% true positive rate)</p>
  </div>
</div>`,
        explanation:
          'Instead of just showing "127 alerts!" which triggers alarm, this dashboard shows the base rate context: most alerts are false positives. It also provides historical true positive rates and prioritization guidance, helping analysts focus their time effectively.',
        principle:
          'Contextualizing alert counts with base rates reduces alarm fatigue and improves triage accuracy',
        metrics: {
          before: 'Analysts spent equal time on all alerts; 23% burnout rate',
          after: 'Analysts prioritized high-confidence alerts; true threat response time improved 40%',
          improvement: '40% faster response to real threats, 35% reduction in analyst burnout',
        },
      },
      {
        title: 'Icon Array for Risk Communication',
        description:
          'Visual icon array showing population-level risk for a screening recommendation',
        code: `<div class="risk-display">
  <h3>Should you get screened?</h3>
  <div class="icon-array" role="img"
       aria-label="Out of 1000 people, 3 will have the condition.
       Screening catches 2 of those 3 but creates 50 false alarms.">
    <!-- 1000 person icons: 2 green (caught), 1 red (missed),
         50 yellow (false positive), 947 grey (true negative) -->
    <div class="legend">
      <span class="caught">■ 2 caught early (true positive)</span>
      <span class="missed">■ 1 missed (false negative)</span>
      <span class="false-alarm">■ 50 false alarms requiring follow-up</span>
      <span class="clear">■ 947 correctly cleared</span>
    </div>
  </div>
  <p class="summary">For every 1,000 people screened, 2 benefit from
  early detection, but 50 undergo unnecessary follow-up procedures.</p>
</div>`,
        explanation:
          'Icon arrays are one of the most effective ways to communicate base rates visually. By showing the full population of 1,000 people with color-coded outcomes, users can immediately see that false positives vastly outnumber true positives, even with an "accurate" test.',
        principle:
          'Visual frequency displays make base rates concrete and proportionally intuitive',
      },
    ],

    bad: [
      {
        title: 'Test Accuracy Without Base Rate',
        description:
          'Medical test result showing only accuracy percentage without population context',
        code: `<!-- DON'T DO THIS -->
<div class="test-result">
  <h2 style="color: red;">⚠️ POSITIVE RESULT</h2>
  <p>This test is <strong>99% accurate</strong>.</p>
  <p>Please consult your doctor immediately.</p>
</div>`,
        explanation:
          'This display leads users to believe there is a 99% chance they have the disease. In reality, for a rare condition (base rate 0.1%), a positive result with 99% accuracy still means only about a 9% chance of truly having it. Without base rate context, users experience severe unnecessary anxiety.',
        principle:
          'Accuracy percentages without base rates are functionally misleading, even when technically true',
      },
      {
        title: 'Alert Count Without False Positive Context',
        description:
          'Security dashboard showing alarming numbers without population or false positive context',
        code: `<!-- DON'T DO THIS -->
<div class="security-dashboard">
  <div class="threat-counter">
    <h2 style="color: red; font-size: 3em;">847</h2>
    <p>THREATS DETECTED TODAY</p>
  </div>
  <div class="detection-rate">
    <p>Our AI detects threats with <strong>99.9% accuracy</strong></p>
  </div>
  <button class="urgent">UPGRADE TO PREMIUM PROTECTION NOW</button>
</div>`,
        explanation:
          'Showing "847 threats" in giant red text without mentioning these are out of millions of events (most being false positives) creates panic. The "99.9% accuracy" claim without base rate context is misleading — if 1 in 100,000 events is a real threat, the vast majority of detections are false positives regardless of accuracy.',
        principle:
          'Large absolute numbers without denominators exploit base rate neglect to create false urgency',
      },
      {
        title: 'Percentage Risk Without Population Context',
        description:
          'Financial dashboard showing percentage changes without base rate context',
        code: `<!-- DON'T DO THIS -->
<div class="risk-alert">
  <h3>⚠️ Fraud Risk Elevated</h3>
  <p>Your account shows a <strong>300% increase</strong>
  in suspicious activity patterns.</p>
  <p>Fraud detection accuracy: <strong>97%</strong></p>
  <p style="color: red;">Immediate action recommended.</p>
</div>`,
        explanation:
          'A "300% increase" could mean going from 1 flagged event to 3 — statistically meaningless. And "97% accuracy" on a rare event like fraud (base rate ~0.1%) means the vast majority of flags are false positives. Without base rates, users panic over noise.',
        principle:
          'Relative changes and accuracy rates without base rates create disproportionate alarm',
      },
    ],

    realWorld: [
      {
        company: 'Gerd Gigerenzer / Harding Center',
        product: 'Fact Boxes for Medical Screening',
        url: 'https://www.hardingcenter.de/en/transfer-and-impact/fact-boxes',
        description: 'The Harding Center for Risk Literacy creates "fact boxes" that present medical screening data using natural frequencies and icon arrays. Instead of "mammography is 90% sensitive," they show: "Out of 1,000 women, 10 have breast cancer. Of those 10, mammography detects 9. Of the 990 without cancer, 90 get false positives." This format dramatically improves patient understanding.',
        effectiveness: 'very-effective',
        analysis: 'Natural frequency fact boxes reduced probability misinterpretation from 80% to under 20% in clinical studies. This is the gold standard for base-rate-aware medical communication.',
      },
      {
        company: 'Google',
        product: 'COVID-19 Exposure Notifications',
        url: 'https://www.google.com/covid19/exposurenotifications/',
        description: 'Google and Apple\'s exposure notification system carefully communicated that a notification meant "possible exposure" and provided context about the base rate of actual transmission from a contact event, helping users calibrate their response rather than panic.',
        effectiveness: 'effective',
        analysis: 'By framing notifications as informational rather than alarming, and providing context about actual transmission probabilities, the system avoided the mass false-alarm panic that could have undermined public trust.',
      },
      {
        company: 'Stripe',
        product: 'Radar Fraud Detection Dashboard',
        url: 'https://stripe.com/radar',
        description: 'Stripe Radar shows fraud detection metrics alongside false positive rates and review queue statistics. Merchants can see not just "blocked transactions" but the proportion of legitimate transactions incorrectly flagged, helping them tune their fraud rules effectively.',
        effectiveness: 'very-effective',
        analysis: 'By showing both fraud catch rate AND false positive rate side by side, merchants can make informed trade-off decisions. This prevents the common mistake of maximizing detection at the cost of blocking legitimate customers.',
      },
      {
        company: 'Splunk',
        product: 'Security Operations Dashboard',
        url: 'https://www.splunk.com/en_us/products/enterprise-security.html',
        description: 'Splunk\'s SIEM dashboards show alert volumes alongside historical true positive rates per alert category. Security analysts can see that "Brute Force" alerts have a 2% true positive rate while "Data Exfiltration" alerts have a 45% rate, allowing prioritized triage.',
        effectiveness: 'effective',
        analysis: 'Providing per-category base rates for alert accuracy transforms raw alert counts into actionable intelligence, reducing analyst fatigue and improving response to genuine threats.',
      },
    ],

    abTests: [
      {
        title: 'Medical Results: Percentage vs Natural Frequency Display',
        hypothesis:
          'Natural frequency format will produce more accurate patient understanding of positive test results',
        controlVersion: {
          description:
            'Test result page showing: "This test is 95% sensitive and 90% specific. Your result is POSITIVE."',
          metrics: {
            conversionRate: '15% correctly estimated their actual risk',
            timeOnPage: '0:45',
            anxietyScore: '8.2/10',
          },
        },
        treatmentVersion: {
          description:
            'Test result page showing frequency tree: "Out of 1,000 people like you, 5 have this condition. The test correctly identifies 4 of those 5. Of the 995 without it, 100 receive false positives. So out of 104 positive results, 4 are true. Your chance: about 4%."',
          metrics: {
            conversionRate: '62% correctly estimated their actual risk',
            timeOnPage: '2:10',
            anxietyScore: '4.7/10',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Natural frequency display improved correct risk estimation from 15% to 62% — a 4x improvement. Patient anxiety scores dropped by 43%, and follow-up compliance actually improved because patients understood the process rather than panicking.',
          learnings: [
            'Natural frequencies are dramatically more effective than percentages for communicating base rates',
            'Reduced anxiety did not reduce follow-up compliance — it actually improved it',
            'Patients who understood the statistics were more likely to trust their doctor\'s recommendations',
            'Even brief natural frequency explanations outperformed detailed percentage-based explanations',
          ],
        },
      },
      {
        title: 'Security Dashboard: Raw Alerts vs Base-Rate-Contextualized Alerts',
        hypothesis:
          'Adding base rate context to alert counts will improve analyst triage efficiency',
        controlVersion: {
          description:
            'Security dashboard showing raw alert counts by category with color-coded severity',
          metrics: {
            conversionRate: '12% of analyst time spent on true positives',
            clickThroughRate: '85% of alerts investigated',
            timeOnPage: '6:30 average per alert',
          },
        },
        treatmentVersion: {
          description:
            'Security dashboard showing alert counts with historical true positive rates per category and recommended priority ordering',
          metrics: {
            conversionRate: '41% of analyst time spent on true positives',
            clickThroughRate: '45% of alerts investigated (high-priority first)',
            timeOnPage: '3:15 average per alert',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Adding base rate context tripled the proportion of analyst time spent on genuine threats. Analysts investigated fewer alerts overall but caught more real issues by prioritizing categories with high true positive rates.',
          learnings: [
            'Base rate context transforms alert fatigue into strategic triage',
            'Analysts naturally prioritize high-base-rate categories when given the information',
            'Fewer but better-targeted investigations outperform exhaustive review',
            'Historical true positive rates are the single most valuable piece of alert metadata',
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
        name: 'Percentage Without Denominator',
        description:
          'Accuracy, detection, or probability percentages displayed without base rate or population context',
        howToSpot:
          'Look for standalone metrics like "99% accurate", "97% detection rate", or "95% confidence" without any mention of population size or base rate',
        severity: ImpactLevel.CRITICAL,
      },
      {
        name: 'Large Absolute Counts Without Context',
        description:
          'Alert counts, threat numbers, or event totals shown prominently without the total population they came from',
        howToSpot:
          'Look for large numbers ("847 threats", "1,200 anomalies") without corresponding total ("out of 5 million events")',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Alarm Colors on Uncontextualized Results',
        description:
          'Red, orange, or other alarm colors applied to positive results or alerts without false positive rate context',
        howToSpot:
          'Check for red or warning styling on test results or alerts that lack information about false positive rates',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Relative Changes Without Baseline',
        description:
          'Percentage increases ("300% more") without absolute baseline numbers to assess significance',
        howToSpot:
          'Look for relative change metrics (percentage increase/decrease) without the absolute numbers they are calculated from',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Individual Result Without Population Distribution',
        description:
          'A single score, rating, or result shown without context of where it falls in the population distribution',
        howToSpot:
          'Look for individual metrics, risk scores, or results displayed in isolation without histograms, percentile rankings, or comparison to population norms',
        severity: ImpactLevel.MEDIUM,
      },
    ],

    patterns: [
      {
        name: 'Missing Denominator Pattern',
        description: 'Numerators (hits, positives, detections) displayed without denominators (total population, total tests)',
        indicators: ['Alert counts without total event counts', 'Detection numbers without scan totals', '"X positives found" without "out of Y tested"', 'Accuracy percentages without base rate of condition'],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Percentage-Only Probability Pattern',
        description: 'Probabilities and risks expressed only as percentages rather than natural frequencies',
        indicators: ['Risk displayed as "0.1%" rather than "1 in 1,000"', 'Sensitivity/specificity without frequency breakdown', 'Conditional probabilities without frequency trees', 'Abstract percentage labels on risk indicators'],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'False Positive Omission Pattern',
        description: 'True positive or detection rates shown without accompanying false positive rates',
        indicators: ['Detection rate without false positive rate', 'Sensitivity without specificity', 'Catch rate without false alarm rate', 'Precision without recall (or vice versa)'],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Isolated Individual Result Pattern',
        description: 'Individual test results or scores presented without population-level context or comparison',
        indicators: ['Single risk score without population distribution', 'Test result without prevalence context', 'Individual prediction without confidence interval', 'Single data point without trend or baseline'],
        severity: ImpactLevel.HIGH,
        confidence: 'medium',
      },
    ],

    checklistQuestions: [
      'Are accuracy or detection percentages shown without base rates?',
      'Are alert or event counts shown without total population denominators?',
      'Is there a false positive rate displayed alongside the detection rate?',
      'Are probabilities shown as natural frequencies or only as abstract percentages?',
      'Do individual results include population-level context for comparison?',
      'Are relative changes (percentage increase) accompanied by absolute numbers?',
      'Is alarm-level styling applied to results that may have high false positive rates?',
      'Can users see both sensitivity AND specificity (or precision AND recall)?',
      'Does the interface help users understand what a positive/negative result actually means?',
      'Are there frequency trees, icon arrays, or other visual aids for base rate communication?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology, statistical reasoning, and UX design, specializing in the base rate fallacy (base rate neglect).

Analyze the provided design for base rate fallacy patterns. Identify:

1. **Missing Base Rates**: Accuracy, detection, or probability metrics shown without population base rate context
2. **Denominator Neglect**: Counts or totals displayed without the denominators needed to interpret them
3. **Percentage vs Frequency**: Whether probabilities are presented as abstract percentages or intuitive natural frequencies
4. **False Positive Blindness**: Whether true positive rates are shown without false positive rate context
5. **Individual vs Population**: Whether individual results lack population-level comparison or distribution context

For each pattern found:
- Identify what statistical context is missing
- Assess the severity of potential misinterpretation
- Determine whether users are likely to overestimate or underestimate probabilities
- Evaluate whether the display supports or undermines Bayesian reasoning
- Suggest specific improvements using natural frequency formats, frequency trees, or icon arrays

Consider:
- Would showing natural frequencies instead of percentages improve understanding?
- Are false positive rates communicated alongside detection rates?
- Do alarm colors or urgency cues match the actual base-rate-adjusted risk level?
- Are there opportunities for interactive base rate exploration (e.g., Bayesian calculators)?
- Does the interface design support informed decision-making or panic?

Provide actionable recommendations for base-rate-aware information design.`,

    outputSchema: {
      type: 'object',
      properties: {
        baseRatePatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              missingContext: { type: 'string' },
              misinterpretationRisk: { type: 'string' },
              severityLevel: { type: 'string' },
              suggestedFormat: { type: 'string' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'missingContext',
              'misinterpretationRisk',
              'severityLevel',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            baseRateVisibility: { type: 'number' },
            naturalFrequencyUse: { type: 'number' },
            falsePositiveClarity: { type: 'number' },
            populationContextScore: { type: 'number' },
          },
          required: [
            'baseRateVisibility',
            'naturalFrequencyUse',
            'falsePositiveClarity',
            'populationContextScore',
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
        'baseRatePatterns',
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
        title: 'Identify Where Base Rates Matter',
        description:
          'Audit your interface for any display of accuracy, probability, risk, detection rate, or statistical results where users must make decisions',
        example:
          'Map all screens showing test results, alert counts, accuracy metrics, risk scores, or detection rates',
        tips: [
          'Focus on decision points where misinterpreting probability has consequences',
          'Include dashboards, result screens, alert notifications, and summary reports',
          'Consider downstream actions users take based on these numbers',
        ],
      },
      {
        step: 2,
        title: 'Calculate and Display Base Rates',
        description:
          'For each identified display, determine the relevant base rate (prevalence, frequency, population proportion) and present it alongside the specific result',
        example:
          'For a malware scanner showing "99.5% accuracy," add: "Base rate of malware in scanned files: 0.01%. This means ~98% of flagged files are false positives."',
        tips: [
          'Use historical data to compute real base rates for your context',
          'Update base rates regularly as conditions change',
          'When exact base rates are unknown, provide reasonable ranges',
        ],
      },
      {
        step: 3,
        title: 'Convert to Natural Frequencies',
        description:
          'Transform percentage-based probability displays into natural frequency formats that the human brain processes more accurately',
        example:
          'Instead of "0.1% prevalence with 95% sensitivity," show: "Out of 10,000 people, 10 have the condition. The test catches 9 of those 10. Of the 9,990 without it, 500 get false positives."',
        tips: [
          'Use round numbers (1,000 or 10,000) as your reference population',
          'Walk through the full frequency tree: population -> condition -> test result',
          'Gigerenzer\'s research shows this format alone can improve understanding from ~15% to ~65%',
        ],
      },
      {
        step: 4,
        title: 'Add Visual Base Rate Displays',
        description:
          'Supplement numerical information with visual aids like icon arrays, frequency trees, or stacked bars that make proportions intuitive',
        example:
          'Show an icon array of 100 person icons: 2 green (true positive), 8 yellow (false positive), 90 grey (true negative) to represent a screening outcome',
        tips: [
          'Icon arrays are one of the most effective formats for base rate communication',
          'Frequency trees work well for multi-step conditional probabilities',
          'Stacked or segmented bars can show true/false positive proportions at a glance',
        ],
      },
      {
        step: 5,
        title: 'Test User Understanding',
        description:
          'Validate that your redesigned displays actually improve users\' probability judgments by measuring comprehension',
        example:
          'Ask users: "Given this positive result, what is the approximate probability you actually have the condition?" Compare answers between old and new designs.',
        tips: [
          'Use calibration tests: ask users to estimate probabilities and compare to correct answers',
          'Measure both understanding accuracy and decision quality (what users decide to do)',
          'Test with both statistically literate and general audiences',
        ],
      },
    ],

    dos: [
      'Always show base rates alongside accuracy, detection, or probability metrics',
      'Use natural frequency formats ("1 in 1,000") instead of percentages ("0.1%") for probability communication',
      'Display false positive rates alongside true positive/detection rates',
      'Show denominators with all counts (e.g., "127 alerts out of 2.4 million events")',
      'Use icon arrays or frequency trees to make base rates visually intuitive',
      'Provide population-level context for individual results and risk scores',
      'Calculate and display positive predictive value (PPV) when showing test results',
      'Update base rate context as underlying conditions change over time',
    ],

    donts: [
      'Don\'t show accuracy percentages without base rate context',
      'Don\'t present alert counts without total population denominators',
      'Don\'t use alarm styling on results that may have high false positive rates',
      'Don\'t rely solely on percentages for probability communication',
      'Don\'t hide false positive rates while highlighting detection rates',
      'Don\'t show relative changes without absolute baseline numbers',
      'Don\'t assume users will intuitively account for base rates — they won\'t',
      'Don\'t intentionally omit base rates to make metrics appear more impressive',
    ],

    bestPractices: [
      {
        title: 'Natural Frequency First',
        description:
          'Present all probability information using natural frequencies as the primary format, with percentages as secondary',
        rationale:
          'Gigerenzer\'s extensive research demonstrates that natural frequencies improve Bayesian reasoning from ~15% accuracy to ~65%, across all education levels',
        example:
          '"Out of 1,000 people tested, 50 will test positive. Of those 50, only 5 actually have the condition." instead of "Sensitivity: 95%, Specificity: 95%, Prevalence: 0.5%"',
      },
      {
        title: 'Show the Full Frequency Tree',
        description:
          'Walk users through the complete decision tree from population to final outcome, not just the endpoint',
        rationale:
          'Frequency trees make each step of conditional probability visible, preventing the shortcut reasoning that causes base rate neglect',
        example:
          'Population (10,000) -> With condition (100) -> Test positive (95) / Test negative (5) | Without condition (9,900) -> Test positive (495) / Test negative (9,405)',
      },
      {
        title: 'Pair Sensitivity with Specificity',
        description:
          'Never show detection rate, sensitivity, or recall without also showing false positive rate, specificity, or precision',
        rationale:
          'A single accuracy metric without its complement is inherently misleading — users cannot assess result quality with only half the picture',
        example:
          'Show "Detects 95% of fraud (catches 95 of 100 fraud cases) | False alarm rate: 5% (flags 495 legitimate transactions per 10,000)"',
      },
      {
        title: 'Use Icon Arrays for Risk Communication',
        description:
          'Display population-level outcomes using grids of person icons where color represents different outcomes',
        rationale:
          'Icon arrays leverage the brain\'s pattern recognition to make proportions intuitive without requiring mathematical reasoning',
        example:
          '100 person icons: 2 green (true positives), 8 yellow (false positives), 1 red (missed), 89 grey (true negatives)',
      },
      {
        title: 'Base-Rate-Adjusted Alert Severity',
        description:
          'Set visual alarm levels based on positive predictive value, not raw detection confidence',
        rationale:
          'A "99% confidence" alert on a 0.001% base rate event is overwhelmingly likely to be a false positive and should not display as critical',
        example:
          'Color-code alerts by historical true positive rate: green (>50% TPR), yellow (10-50% TPR), grey (<10% TPR)',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '1.1.1',
        guideline:
          'Non-text Content - Provide text alternatives for visual base rate displays',
        implementation:
          'Icon arrays, frequency trees, and stacked bar charts showing base rates must have comprehensive alt text or aria-labels that convey the same proportional information (e.g., "Out of 100 people, 2 are true positives and 8 are false positives")',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships - Ensure base rate context is programmatically associated with results',
        implementation:
          'Use aria-describedby to link test results or alert counts to their base rate context, so screen readers present both together rather than separately',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.4.1',
        guideline:
          'Use of Color - Don\'t rely on color alone for risk or probability communication',
        implementation:
          'Supplement color-coded risk levels with text labels, icons, and patterns. Ensure colorblind users can distinguish true positives from false positives in icon arrays',
      },
      {
        wcagLevel: 'AAA',
        criterion: '3.1.5',
        guideline:
          'Reading Level - Provide plain-language explanations of statistical concepts',
        implementation:
          'Offer simple, jargon-free explanations of what base rates, false positives, and probability mean, especially in medical and financial contexts where statistical literacy varies widely',
      },
    ],

    ethics: [
      {
        concern: 'Intentional Base Rate Omission',
        severity: 'critical',
        explanation:
          'Deliberately hiding base rates to make accuracy metrics or detection rates seem more impressive than they are',
        mitigation:
          'Always display base rates alongside accuracy metrics. If base rates would reduce perceived impressiveness, that is exactly why they must be shown.',
      },
      {
        concern: 'Medical Misinformation Through Omission',
        severity: 'critical',
        explanation:
          'Presenting medical test results without base rate context, causing patients to dramatically overestimate or underestimate disease probability',
        mitigation:
          'Use natural frequency displays and frequency trees for all medical test results. Partner with medical professionals to validate information design.',
      },
      {
        concern: 'Fear-Based Upselling',
        severity: 'high',
        explanation:
          'Exploiting base rate neglect to sell security, insurance, or protection products by making threats seem more probable than they are',
        mitigation:
          'Show honest base rates for threats and risks. Let users make informed decisions rather than panic-driven purchases.',
      },
      {
        concern: 'Alert Fatigue from False Positive Flooding',
        severity: 'high',
        explanation:
          'Displaying high volumes of low-base-rate alerts without context, leading to analyst burnout and eventual desensitization to real threats',
        mitigation:
          'Show historical true positive rates per alert category. Implement base-rate-aware alert prioritization and display.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'On the Psychology of Prediction',
        author: 'Kahneman, D., & Tversky, A.',
        year: 1973,
        doi: '10.1037/h0034747',
        description:
          'The foundational paper demonstrating base rate neglect in the engineer-lawyer problem, showing that people ignore prior probabilities in favor of representativeness',
        type: 'foundational',
      },
      {
        title: 'Evidential Impact of Base Rates',
        author: 'Tversky, A., & Kahneman, D.',
        year: 1982,
        description:
          'Extended analysis of base rate neglect across multiple experimental paradigms, establishing it as a robust and general cognitive bias',
        type: 'foundational',
      },
      {
        title: 'How to Improve Bayesian Reasoning Without Instruction: Frequency Formats',
        author: 'Gigerenzer, G., & Hoffrage, U.',
        year: 1995,
        doi: '10.1037/0033-295X.102.4.684',
        description:
          'Landmark paper showing that presenting information as natural frequencies rather than percentages dramatically improves Bayesian reasoning accuracy',
        type: 'foundational',
      },
      {
        title: 'Natural Frequencies Improve Bayesian Reasoning in Simple and Complex Inference Tasks',
        author: 'Hoffrage, U., Gigerenzer, G., Krauss, S., & Martignon, L.',
        year: 2002,
        doi: '10.3389/fpsyg.2015.01473',
        description:
          'Follow-up research confirming that natural frequency formats improve reasoning across diverse contexts including medical diagnosis and legal judgment',
        type: 'advanced',
      },
    ],

    books: [
      {
        title: 'Reckoning with Risk: Learning to Live with Uncertainty',
        author: 'Gigerenzer, Gerd',
        year: 2002,
        isbn: '9780140297867',
        description:
          'Comprehensive guide to communicating risk and probability effectively, with extensive coverage of base rate neglect and natural frequency solutions',
        type: 'foundational',
      },
      {
        title: 'Thinking, Fast and Slow',
        author: 'Kahneman, Daniel',
        year: 2011,
        isbn: '9780374275631',
        description:
          'Chapter on base rate neglect and representativeness heuristic by Nobel Prize winner who discovered the bias',
        type: 'foundational',
      },
      {
        title: 'Risk Savvy: How to Make Good Decisions',
        author: 'Gigerenzer, Gerd',
        year: 2014,
        isbn: '9780143127109',
        description:
          'Practical guide to understanding and communicating risk, with extensive examples of base rate neglect in medicine, law, and everyday life',
        type: 'practical',
      },
    ],

    articles: [
      {
        title: 'Natural Frequencies and Human Cognition',
        author: 'Gigerenzer, Gerd',
        url: 'https://pure.mpg.de/rest/items/item_2549240/component/file_2549239/content',
        description:
          'Accessible overview of why natural frequencies improve statistical reasoning and how to apply them in practice',
        type: 'practical',
      },
      {
        title: 'Visualizing Bayesian Statistics With Icon Arrays',
        author: 'Galesic, M., & Garcia-Retamero, R.',
        url: 'https://doi.org/10.1177/0272989X10369006',
        description:
          'Research on using icon arrays to communicate base rates and conditional probabilities visually',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'The Bayesian Trap',
        author: 'Veritasium',
        url: 'https://www.youtube.com/watch?v=R13BD8qKeTg',
        description:
          'Highly accessible video explanation of base rate neglect using medical testing as a primary example',
        type: 'foundational',
      },
      {
        title: 'Risk Literacy — Gerd Gigerenzer',
        author: 'RSA',
        url: 'https://www.youtube.com/watch?v=vVq8ray0yYg',
        description:
          'Talk by the leading researcher on natural frequency formats and their role in overcoming base rate neglect',
        type: 'practical',
      },
    ],

    demos: [
      {
        title: 'Bayesian Reasoning Interactive',
        author: 'Seeing Theory (Brown University)',
        url: 'https://seeing-theory.brown.edu/bayesian-inference/',
        description:
          'Interactive visualization demonstrating how base rates affect the interpretation of test results',
        type: 'practical',
      },
    ],
  },

  //===========================================
  // RELATIONSHIPS
  //===========================================
  relationships: {
    complements: [
      'representativeness-heuristic', // Drives base rate neglect via prototype matching
      'conjunction-fallacy', // Detailed descriptions feel more probable, ignoring base rates
      'framing-effect', // How stats are framed (percentage vs frequency) changes understanding
      'neglect-of-probability', // Broader pattern of ignoring probability information
      'anchoring-bias', // Specific numbers anchor interpretation away from base rates
    ],

    conflicts: [
      'availability-heuristic', // When base rates are made vivid, they can override specific info
      'information-bias', // Seeking more specific info can counteract base rate awareness
    ],

    confusedWith: [
      'availability-heuristic', // Both affect probability judgment but through different mechanisms
      'representativeness-heuristic', // Representativeness is the mechanism that causes base rate neglect
      'gambler-fallacy', // Both involve misunderstanding probability, but differently
    ],

    hierarchy: {
      parent: 'cognitive-bias',
      children: [
        'prosecutors-fallacy',
        'false-positive-paradox',
        'denominator-neglect',
      ],
    },
  },
};
