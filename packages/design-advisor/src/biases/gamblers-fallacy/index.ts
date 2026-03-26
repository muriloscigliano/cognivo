/**
 * GAMBLER'S FALLACY
 *
 * We think past random events affect future probabilities
 */


import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const gamblersFallacy: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'gamblers-fallacy',
    name: 'Gambler\'s Fallacy',
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
    simple: 'We think past random events affect future probabilities',

    detailed: `The Gambler's Fallacy is the mistaken belief that if a random event has occurred more frequently than expected in the past, it is less likely to happen in the future (or vice versa). People assume that random sequences must "even out" in the short run, when in reality each independent event has the same probability regardless of prior outcomes.

This fallacy stems from a misunderstanding of the law of large numbers. While large samples do converge toward expected distributions, individual trials remain independent. A coin that has landed heads 10 times in a row still has a 50% chance of landing heads on the next flip.

In UX and product design, the Gambler's Fallacy manifests wherever users encounter random or probabilistic outcomes: trading platforms, gaming interfaces, A/B testing dashboards, lottery apps, and reward systems. Designers who understand this bias can help users make better decisions by accurately communicating probability and independence of events.`,

    psychologyBasis: {
      discoveredBy: 'Various Researchers',
      year: 1970,
      theory: 'Cognitive Bias Research',
      mechanism: `The brain incorrectly applies the law of large numbers to small samples, expecting short random sequences to be representative of overall probabilities. This happens because:

1. **Representativeness Heuristic**: People expect small samples to mirror the characteristics of the overall population, so a run of one outcome feels "unrepresentative" and due for correction
2. **Pattern Detection**: The brain is wired to find patterns, even in truly random data. A streak of identical outcomes triggers the sense that a pattern-break is "overdue"
3. **Belief in a Balancing Force**: People intuitively believe in a self-correcting mechanism in random processes, as if the universe "remembers" past outcomes and compensates
4. **Misunderstanding Independence**: Each coin flip, dice roll, or random event is independent, but people mentally link sequential events into a narrative arc
5. **Recency Weighting**: Recent outcomes are overweighted when predicting the next event, distorting perceived probability away from the true base rate`,
    },

    realWorldExample: `On August 18, 1913, at the Monte Carlo Casino, the roulette ball landed on black 26 times in a row. As the streak continued, gamblers lost millions of francs betting on red, convinced that red was "due" to come up. Each spin was independent with the same probability, but the streak drove increasingly desperate and irrational bets.

Similarly, lottery players frequently avoid numbers that won recently, believing they are less likely to appear again, or they chase "overdue" numbers that haven't appeared in a while. In reality, each draw is completely independent of previous ones.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `The Gambler's Fallacy affects how users perceive probability, randomness, and sequential outcomes in interfaces. Designers must be aware of how their UIs can reinforce or mitigate this bias:

- Random reward systems (loot boxes, gacha) can exploit the fallacy by implying streaks matter
- Streak displays and counters can suggest that outcomes are "due" to change
- Probability communication can be distorted by showing outcome history without context
- Trading and investment platforms can inadvertently encourage fallacious thinking through chart patterns
- A/B testing dashboards can lead analysts to misinterpret short-run variation as meaningful trends`,

    whenToUse: [
      {
        title: 'Debiasing Dashboards',
        scenario:
          'When building analytics tools where users interpret sequential data',
        example:
          'Show statistical significance indicators alongside outcome streaks so analysts don\'t overreact to short-run patterns',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Responsible Gaming Interfaces',
        scenario: 'When designing gambling, lottery, or loot box systems',
        example:
          'Display explicit reminders that each event is independent: "Previous results do not affect future outcomes"',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Trading Platform Safeguards',
        scenario: 'When users make financial decisions based on price history',
        example:
          'Add disclaimers near stock charts: "Past performance does not predict future results" with visual emphasis, not fine print',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'A/B Test Interpretation',
        scenario: 'When presenting experiment results to decision-makers',
        example:
          'Show confidence intervals and required sample sizes rather than real-time win/loss tallies that invite premature conclusions',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Random Reward Communication',
        scenario: 'When explaining drop rates or random reward mechanics',
        example:
          'Clearly state that each attempt has the same probability, and avoid "pity timer" language that implies outcomes are connected',
        impact: ImpactLevel.MEDIUM,
      },
    ],

    whenToAvoid: [
      {
        title: 'Engagement-Driven Streak Mechanics',
        reason:
          'Designing streak counters that imply a "big win" is coming can exploit the fallacy',
        consequence:
          'Users spend more money or time than intended, leading to buyer\'s remorse, addiction, or regulatory issues',
        alternative:
          'If using streaks for engagement, tie them to effort (login streaks) rather than random outcomes',
      },
      {
        title: 'Hot/Cold Number Displays',
        reason:
          'Showing "hot" and "cold" numbers in lottery or gaming UIs implies past draws affect future ones',
        consequence:
          'Users make irrational bets based on false pattern recognition, losing money unnecessarily',
        alternative:
          'Show historical data as factual record without suggestive labels like "hot", "cold", or "overdue"',
      },
      {
        title: 'Misleading Pattern Visualizations',
        reason:
          'Trend lines and pattern overlays on random data can suggest predictability where none exists',
        consequence:
          'Users develop false confidence in their ability to predict random outcomes',
        alternative:
          'Use scatter plots or distribution charts that honestly represent randomness',
      },
      {
        title: 'Pity Timer Exploitation',
        reason:
          'Guaranteed rewards after N failures technically correct the odds but reinforce fallacious thinking',
        consequence:
          'Users develop a persistent belief that probability changes with each attempt, carrying this thinking to contexts without pity timers',
        alternative:
          'If using pity timers, clearly label them as a separate mechanic distinct from the underlying random probability',
      },
    ],

    commonMistakes: [
      {
        title: 'Displaying Streak Counters on Random Events',
        description:
          'Showing "5 losses in a row" or "win streak: 3" on independent random outcomes',
        why: 'Streak displays imply that the sequence matters and that a reversal is "due", reinforcing the Gambler\'s Fallacy',
        fix: 'Show cumulative statistics (total wins/losses, overall rate) rather than sequential streaks',
      },
      {
        title: 'Using "Hot" and "Cold" Labels',
        description:
          'Labeling outcomes as "hot" (frequent) or "cold" (infrequent) in lottery or gaming interfaces',
        why: 'These labels imply that past frequency predicts future outcomes, which is false for independent events',
        fix: 'Present historical data neutrally as "frequency in last N draws" without suggestive temperature metaphors',
      },
      {
        title: 'Trend Lines on Random Data',
        description:
          'Drawing trend lines, moving averages, or pattern indicators over genuinely random outcome sequences',
        why: 'Visual patterns in random data create a false sense of predictability and encourage pattern-based betting',
        fix: 'Use histograms or probability distributions instead of sequential line charts for random outcomes',
      },
      {
        title: 'Omitting Independence Disclaimers',
        description:
          'Failing to remind users that each event in a random sequence is independent',
        why: 'Without explicit reminders, users naturally default to the belief that past events affect future probabilities',
        fix: 'Place clear, prominent independence statements near any display of random outcome history',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.HIGH,
        description:
          'Layout determines how outcome history is presented relative to decision points',
        examples: [
          'Placing recent outcome history directly above a "bet" or "try again" button reinforces fallacious thinking',
          'Separating historical data from action areas reduces impulsive decisions based on streaks',
          'Showing probability information prominently near decision points counteracts the fallacy',
          'Dashboard layouts that emphasize time-series of random events invite pattern-seeking',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Text emphasis on streaks and sequences affects how users weight recent outcomes',
        examples: [
          'Large, bold streak counters ("7 LOSSES IN A ROW!") amplify the sense that a win is due',
          'Fine-print probability disclaimers are easily ignored when streak numbers are prominent',
          'Equal typographic weight on base rates and recent outcomes helps balanced interpretation',
          'Using numerals vs. words affects perceived magnitude of streaks',
        ],
      },
      color: {
        level: ImpactLevel.HIGH,
        description:
          'Color coding of outcomes and streaks shapes emotional response to random sequences',
        examples: [
          'Red/green color coding for losses/wins creates emotional momentum that drives fallacious predictions',
          '"Hot" red and "cold" blue labels on numbers directly reinforce temperature-based fallacy metaphors',
          'Neutral color palettes for outcome history reduce emotional pattern-seeking',
          'Gradient intensities suggesting "warming up" or "cooling down" imply directional trends in random data',
        ],
      },
      interaction: {
        level: ImpactLevel.CRITICAL,
        description:
          'Interactive elements around random events are the primary vector for exploiting or mitigating the fallacy',
        examples: [
          'Auto-spin or rapid-repeat buttons encourage users to act on "streak momentum" without reflection',
          'Confirmation dialogs that show actual odds before each bet interrupt fallacious automatic thinking',
          'Animations that emphasize streaks (growing counters, pulsing effects) reinforce pattern beliefs',
          'Cool-down timers between attempts give users time to reconsider probability rationally',
        ],
      },
      content: {
        level: ImpactLevel.CRITICAL,
        description:
          'Copy and messaging around probability and randomness directly shapes whether users reason correctly or fallaciously',
        examples: [
          '"You\'re due for a win!" directly exploits the Gambler\'s Fallacy',
          '"Each spin has exactly the same odds" educates and counteracts the fallacy',
          'Showing "last 10 results" without base rate context invites pattern-seeking',
          'Probability explainers with coin-flip analogies help users understand independence',
        ],
      },
      accessibility: {
        level: ImpactLevel.HIGH,
        description:
          'Accessible presentation of probability information is essential for informed decision-making by all users',
        examples: [
          'Screen reader users may not perceive visual streak cues, which can be either beneficial (less bias) or harmful (missing context)',
          'Probability information must be conveyed through text, not just visual indicators like color or position',
          'ARIA live regions announcing outcomes can create a temporal sequence bias when outcomes are read aloud rapidly',
          'Cognitive accessibility requires plain-language probability explanations, not just numerical odds',
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
        title: 'Independent Probability Reminder in Gaming UI',
        description:
          'Slot machine interface that clearly communicates odds independence on every spin',
        code: `<div class="slot-result">
  <div class="outcome">
    <span class="result-icon">🍋</span>
    <span class="result-icon">🍒</span>
    <span class="result-icon">🍋</span>
  </div>
  <p class="result-text">No match this spin</p>

  <div class="odds-reminder">
    <p class="odds-label">Your odds on every spin:</p>
    <div class="odds-display">
      <span class="odds-value">1 in 50</span>
      <span class="odds-note">Same odds every time, regardless of previous results</span>
    </div>
  </div>

  <div class="session-stats">
    <p>This session: 12 spins, 0 wins</p>
    <p class="expected">Expected wins in 12 spins: ~0.24</p>
    <p class="context">Your results are within normal range</p>
  </div>

  <button class="primary">Spin Again</button>
</div>`,
        explanation:
          'The interface explicitly reminds users that odds are identical on every spin. Session statistics include expected values so users can see whether their results are unusual or normal, reducing the temptation to chase "due" wins.',
        principle:
          'Displaying true probabilities and expected values counteracts the belief that past outcomes affect future ones',
        metrics: {
          before: '68% of users increased bet size after 5+ losses in a row',
          after: '31% increased bet size after 5+ losses with odds reminder',
          improvement: '54% reduction in fallacy-driven bet escalation',
        },
      },
      {
        title: 'Honest Lottery Number Display',
        description:
          'Lottery app showing draw history without suggestive labels',
        code: `<section class="draw-history">
  <h3>Recent Draw Results</h3>
  <p class="disclaimer">Each draw is completely independent.
  Past numbers have no effect on future draws.</p>

  <table class="results-table">
    <thead>
      <tr>
        <th>Date</th>
        <th>Numbers Drawn</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>Mar 15</td><td>7, 14, 22, 35, 41, 48</td></tr>
      <tr><td>Mar 12</td><td>3, 14, 19, 28, 36, 42</td></tr>
      <tr><td>Mar 8</td><td>11, 14, 25, 33, 39, 47</td></tr>
    </tbody>
  </table>

  <div class="probability-info">
    <h4>Understanding Your Odds</h4>
    <p>Every number combination has exactly the same chance of being drawn: <strong>1 in 13,983,816</strong></p>
    <p>Number 14 appearing 3 times recently does not make it more or less likely next draw.</p>
  </div>
</section>`,
        explanation:
          'The lottery display shows factual history without "hot", "cold", or "overdue" labels. It explicitly addresses the pattern users will notice (14 appearing three times) and explains why this does not affect future probability.',
        principle:
          'Neutral data presentation with explicit independence reminders prevents fallacious number selection strategies',
      },
      {
        title: 'A/B Test Dashboard with Statistical Context',
        description:
          'Analytics dashboard that prevents premature conclusions from short-run variation',
        code: `<div class="ab-test-results">
  <h3>Experiment: New Checkout Flow</h3>

  <div class="status-bar">
    <span class="status warning">Collecting data - not yet significant</span>
    <span class="progress">Day 3 of estimated 14</span>
  </div>

  <div class="current-results">
    <div class="variant">
      <h4>Control</h4>
      <p class="rate">4.2% conversion</p>
      <p class="sample">n = 847</p>
    </div>
    <div class="variant">
      <h4>Treatment</h4>
      <p class="rate">4.8% conversion</p>
      <p class="sample">n = 831</p>
    </div>
  </div>

  <div class="confidence-display">
    <p>Statistical significance: <strong>62%</strong> (need 95%)</p>
    <p class="warning">Early results often reverse. Wait for full sample
    before drawing conclusions.</p>
  </div>

  <div class="daily-variation">
    <p class="note">Daily swings of +/- 2% are normal random variation,
    not meaningful trends.</p>
  </div>
</div>`,
        explanation:
          'The dashboard prominently shows that results are not yet statistically significant and warns against interpreting daily variation as trends. This prevents analysts from falling prey to the Gambler\'s Fallacy (or its inverse, the hot hand fallacy) when reading early experiment data.',
        principle:
          'Statistical significance indicators and sample size context prevent pattern-seeking in random variation',
      },
    ],

    bad: [
      {
        title: 'Hot and Cold Number Display',
        description:
          'Lottery app labeling numbers as "hot" or "cold" based on recent draws',
        code: `<!-- DON'T DO THIS -->
<div class="number-picker">
  <h3>Pick Your Numbers</h3>

  <div class="hot-numbers">
    <h4 style="color: red;">🔥 HOT Numbers</h4>
    <p>These numbers are on fire!</p>
    <div class="numbers">
      <span class="hot">14</span>
      <span class="hot">7</span>
      <span class="hot">33</span>
    </div>
  </div>

  <div class="cold-numbers">
    <h4 style="color: blue;">❄️ COLD Numbers - Due to Hit!</h4>
    <p>These numbers haven't appeared in a while...</p>
    <div class="numbers">
      <span class="cold">2</span>
      <span class="cold">19</span>
      <span class="cold">44</span>
    </div>
  </div>

  <button class="primary">Use Hot Numbers</button>
  <button class="secondary">Use Cold Numbers</button>
</div>`,
        explanation:
          'Labeling numbers as "hot" or "cold" and suggesting cold numbers are "due to hit" directly exploits the Gambler\'s Fallacy. This misleads users into believing past frequency predicts future outcomes in independent random draws.',
        principle:
          'Never use suggestive labels that imply past random outcomes predict future ones',
      },
      {
        title: 'Streak Counter Implying Imminent Win',
        description:
          'Gaming interface showing a loss streak counter with escalating urgency',
        code: `<!-- DON'T DO THIS -->
<div class="streak-display">
  <div class="loss-counter" style="color: red; font-size: 2em;">
    <p>😱 8 Losses in a Row!</p>
  </div>
  <div class="encouragement">
    <p style="font-size: 1.4em; font-weight: bold;">
      You're overdue for a BIG WIN! 🎰
    </p>
    <p>The longer the streak, the closer you are to winning!</p>
    <p class="urgency">Don't stop now - your luck is about to change!</p>
  </div>
  <button class="primary pulse-animation">SPIN NOW - Your Win is Coming!</button>
</div>`,
        explanation:
          'This design directly exploits the Gambler\'s Fallacy by framing a loss streak as evidence that a win is imminent. The escalating emotional language, pulsing animation, and "don\'t stop now" messaging are manipulative and can drive users to gamble beyond their means.',
        principle:
          'Never suggest that a losing streak increases the probability of a future win',
      },
      {
        title: 'Trading Platform Pattern Suggestion',
        description:
          'Stock trading interface drawing predictive patterns on random price movements',
        code: `<!-- DON'T DO THIS -->
<div class="stock-analysis">
  <h3>ACME Corp (ACME)</h3>
  <div class="chart">
    <canvas id="price-chart"></canvas>
    <div class="pattern-overlay">
      <span class="pattern-label">Head & Shoulders Pattern Detected!</span>
      <span class="prediction" style="color: green; font-weight: bold;">
        ↑ 87% chance of reversal based on historical pattern
      </span>
    </div>
  </div>
  <p class="ai-insight">AI Analysis: After 5 consecutive red days,
  stocks historically bounce back 73% of the time. Buy signal detected!</p>
  <button class="buy-now">Buy Now Before the Reversal!</button>
</div>`,
        explanation:
          'Presenting pattern "detection" on price data with specific percentage predictions creates a false sense of predictability. The "5 consecutive red days = bounce" logic is a direct application of the Gambler\'s Fallacy to financial markets, potentially causing significant financial harm.',
        principle:
          'Do not present fallacious pattern analysis as actionable trading signals',
      },
    ],

    realWorld: [
      {
        company: 'Robinhood',
        product: 'Stock Charts',
        description: 'Robinhood displays price history charts with prominent trend lines and percentage changes. While informational, the visual emphasis on recent price direction can lead retail traders to believe that a stock that has fallen must be "due" to rise, or that a rising streak will continue.',
        effectiveness: 'somewhat-effective',
        analysis: 'The clean chart design is informative, but the prominent display of streaks and trend arrows without adequate disclaimers about randomness and market efficiency can reinforce fallacious pattern-seeking in retail traders.',
      },
      {
        company: 'DraftKings',
        product: 'Sports Betting Interface',
        description: 'DraftKings and similar platforms show team win/loss streaks prominently in their betting interfaces. A team on a "5-game losing streak" gets highlighted, implicitly suggesting a reversal may be coming, though each game outcome is influenced by many independent factors.',
        effectiveness: 'somewhat-effective',
        analysis: 'Displaying streaks without context about independent game factors exploits the Gambler\'s Fallacy. While sports outcomes are not purely random, streak displays encourage users to over-weight sequential patterns when placing bets.',
      },
      {
        company: 'Genshin Impact (miHoYo)',
        product: 'Gacha / Wish System',
        description: 'Genshin Impact uses a "pity system" where players are guaranteed a rare drop after a certain number of unsuccessful attempts. While this prevents extreme bad luck, it also reinforces the belief that probability accumulates with each attempt, training players to think in terms of "building pity" rather than independent random events.',
        effectiveness: 'somewhat-effective',
        analysis: 'The pity system is player-friendly in capping bad luck, but its framing encourages Gambler\'s Fallacy thinking. Players discuss "pity counters" and plan spending around accumulated failures, extending engagement and spending.',
      },
      {
        company: 'Various Lottery Apps',
        product: 'Hot/Cold Number Analysis',
        description: 'Many lottery apps and websites feature "hot numbers" (frequently drawn recently) and "cold numbers" (not drawn recently) with suggestions to pick based on these patterns. Some even sell premium "number analysis" features based on historical draw data.',
        effectiveness: 'somewhat-effective',
        analysis: 'This is a textbook exploitation of the Gambler\'s Fallacy. Lottery draws are independent events, and past frequency has zero predictive value. Presenting this analysis as useful information is misleading and can drive additional ticket purchases.',
      },
    ],

    abTests: [
      {
        title: 'Lottery App: Hot/Cold Labels vs Neutral History',
        hypothesis:
          'Removing "hot" and "cold" number labels will reduce irrational number selection patterns',
        controlVersion: {
          description:
            'Lottery number picker showing "Hot Numbers" (red) and "Cold Numbers" (blue) with suggestive labels like "Due to hit!"',
          metrics: {
            conversionRate: '72% selected at least one "hot" or "cold" number',
            timeOnPage: '4:12',
            scrollDepth: '89%',
          },
        },
        treatmentVersion: {
          description:
            'Lottery number picker showing neutral draw history table with disclaimer: "Each number has equal probability in every draw"',
          metrics: {
            conversionRate: '23% referenced history table while picking',
            timeOnPage: '2:45',
            scrollDepth: '62%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'The neutral presentation dramatically reduced fallacy-driven number selection. Users spent less time agonizing over "strategic" number choices. Post-survey showed 61% better understanding of true probability with the neutral design.',
          learnings: [
            'Suggestive labels like "hot" and "cold" directly drive fallacious behavior',
            'Neutral presentation reduces engagement time but improves decision quality',
            'Explicit probability reminders significantly improve understanding',
            'Users reported higher satisfaction with the honest, neutral interface despite lower engagement metrics',
          ],
        },
      },
      {
        title: 'Gaming Interface: Streak Counter vs Session Statistics',
        hypothesis:
          'Replacing streak counters with cumulative session statistics will reduce chasing behavior',
        controlVersion: {
          description:
            'Slot game showing "Current Streak: 7 Losses" with escalating visual urgency and "Your luck must change soon!" messaging',
          metrics: {
            conversionRate: '45% increased bet size after 5+ loss streak',
            clickThroughRate: '78% continued playing after 10+ losses',
          },
        },
        treatmentVersion: {
          description:
            'Slot game showing "Session: 15 spins, 2 wins (13.3%). Expected win rate: 12%. Your results are normal." with probability reminder',
          metrics: {
            conversionRate: '18% increased bet size after equivalent losses',
            clickThroughRate: '52% continued playing after equivalent losses',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Session statistics with expected values reduced fallacy-driven bet escalation by 60%. Users made more rational stop/continue decisions. Responsible gaming metrics improved significantly.',
          learnings: [
            'Streak counters directly drive irrational escalation behavior',
            'Showing expected values helps users evaluate whether their experience is normal',
            'Probability reminders are most effective when personalized to the user\'s actual session',
            'Reduced chasing behavior also improved user satisfaction and reduced complaints',
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
        name: 'Streak Counters',
        description:
          'Numerical displays counting consecutive wins, losses, or repeated outcomes in random events',
        howToSpot:
          'Look for "X in a row", "current streak", or sequential outcome tallies near action buttons',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Hot/Cold Indicators',
        description:
          'Color-coded or labeled elements marking outcomes as "hot" (frequent), "cold" (infrequent), or "overdue"',
        howToSpot:
          'Check for red/blue color coding, fire/ice icons, or temperature metaphors applied to random outcomes',
        severity: ImpactLevel.CRITICAL,
      },
      {
        name: 'Pattern Suggestion Overlays',
        description:
          'Trend lines, moving averages, or pattern labels drawn over genuinely random data sequences',
        howToSpot:
          'Look for line charts with overlaid trend indicators, "pattern detected" labels, or prediction arrows on random outcome histories',
        severity: ImpactLevel.HIGH,
      },
      {
        name: '"Due" Language',
        description:
          'Copy suggesting that an outcome is overdue, imminent, or increasingly likely after a streak',
        howToSpot:
          'Search for phrases like "due for a win", "luck is about to change", "overdue", or "it\'s been X since..."',
        severity: ImpactLevel.CRITICAL,
      },
      {
        name: 'Escalating Visual Urgency on Streaks',
        description:
          'Animations, color changes, or typography changes that intensify as a streak lengthens',
        howToSpot:
          'Check if loss/win streak displays use progressively more dramatic visual treatment (pulsing, growing text, intensifying colors)',
        severity: ImpactLevel.HIGH,
      },
    ],

    patterns: [
      {
        name: 'Streak Momentum Pattern',
        description: 'UI that presents sequential random outcomes as a building narrative with momentum',
        indicators: ['Loss/win streak counters near action buttons', 'Escalating urgency messaging during streaks', '"Don\'t stop now" or "keep going" prompts during streaks', 'Animations that intensify with streak length'],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'False Pattern Recognition Pattern',
        description: 'UI that encourages users to see predictive patterns in random data',
        indicators: ['Trend lines on random outcome sequences', '"Hot" and "cold" labels on random outcomes', 'Pattern detection alerts on random data', 'Historical frequency presented as predictive'],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Missing Independence Disclosure Pattern',
        description: 'Random outcome displays that lack any reminder about event independence',
        indicators: ['Outcome history without probability context', 'No disclaimers about independence near random event displays', 'Sequential outcomes displayed without base rate information', 'Action prompts adjacent to outcome history without odds disclosure'],
        severity: ImpactLevel.HIGH,
        confidence: 'medium',
      },
      {
        name: 'Pity Counter Framing Pattern',
        description: 'Guarantee mechanics framed as accumulating probability rather than separate safety nets',
        indicators: ['"Building pity" or "getting closer" language', 'Progress bars toward guaranteed rewards', 'Counter displays suggesting probability increases with each attempt', 'Mechanics that blur the line between independent probability and guaranteed thresholds'],
        severity: ImpactLevel.MEDIUM,
        confidence: 'medium',
      },
    ],

    checklistQuestions: [
      'Are sequential random outcomes displayed as streaks with emotional framing?',
      'Does the UI use "hot", "cold", "overdue", or "due" language for random events?',
      'Are trend lines or patterns drawn over genuinely random data?',
      'Is there an explicit reminder that each event is independent?',
      'Do streak displays escalate visually, implying momentum or building probability?',
      'Are action buttons (bet, spin, buy) placed directly adjacent to streak information?',
      'Does the interface show expected values alongside actual outcomes?',
      'Are users given accurate probability information at the point of decision?',
      'Could this display encourage users to spend more based on false pattern beliefs?',
      'Is historical outcome data presented neutrally or with suggestive labels?',
      'Does the design help users understand statistical independence?',
      'Are there cool-down mechanisms that interrupt potential fallacy-driven escalation?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in the Gambler's Fallacy (also known as the Monte Carlo Fallacy).

Analyze the provided design for Gambler's Fallacy patterns. Identify:

1. **Streak Displays**: How sequential outcomes are presented and whether they imply momentum or building probability
2. **Pattern Suggestion**: Whether the UI encourages users to see predictive patterns in random data
3. **Independence Communication**: Whether users are reminded that each random event is independent
4. **Probability Accuracy**: Whether actual odds are displayed clearly at decision points
5. **Escalation Mechanics**: Whether the design encourages increased engagement/spending after streaks

For each pattern found:
- Identify what fallacious belief the design element reinforces
- Assess whether it exploits or mitigates the Gambler's Fallacy
- Determine if the probability communication is accurate and prominent
- Evaluate ethical implications, especially in gaming/financial contexts
- Suggest improvements for honest probability communication

Consider:
- Does the design imply that past random outcomes affect future probabilities?
- Are there "hot/cold" indicators or "due" language?
- Is statistical independence clearly communicated?
- Do streak displays escalate emotional urgency?
- Could vulnerable users (problem gamblers, inexperienced traders) be harmed?

Provide actionable recommendations for ethical, debiasing design that helps users reason correctly about probability.`,

    outputSchema: {
      type: 'object',
      properties: {
        fallacyPatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              fallaciousBelief: { type: 'string' },
              exploitsOrMitigates: { type: 'string' },
              probabilityAccuracy: { type: 'string' },
              ethical: { type: 'boolean' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'fallaciousBelief',
              'exploitsOrMitigates',
              'ethical',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            independenceCommunication: { type: 'number' },
            probabilityAccuracy: { type: 'number' },
            streakExploitation: { type: 'number' },
            ethicalScore: { type: 'number' },
          },
          required: [
            'independenceCommunication',
            'probabilityAccuracy',
            'streakExploitation',
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
        'fallacyPatterns',
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
        title: 'Audit Random Event Displays',
        description:
          'Identify every place in your interface where random or probabilistic outcomes are displayed',
        example:
          'Map all lottery draws, loot drops, dice rolls, stock price charts, and A/B test results in your product',
        tips: [
          'Include both explicitly random events (dice, slots) and implicitly random ones (stock prices, user behavior)',
          'Check for streak counters, outcome histories, and pattern visualizations',
          'Identify where action buttons sit relative to outcome history displays',
        ],
      },
      {
        step: 2,
        title: 'Add Independence Reminders',
        description:
          'Place clear, prominent reminders about event independence wherever random outcomes are shown',
        example:
          'Near a roulette history display: "Each spin has the same odds. Previous results do not change future probabilities."',
        tips: [
          'Use plain language, not statistical jargon',
          'Make reminders visually prominent, not fine print',
          'Position reminders between outcome history and action buttons',
        ],
      },
      {
        step: 3,
        title: 'Replace Streaks with Statistics',
        description:
          'Convert sequential streak displays to cumulative statistical summaries with expected values',
        example:
          'Instead of "5 losses in a row", show "Session: 20 plays, 3 wins (15%). Expected: 12%. Your results are within normal range."',
        tips: [
          'Show expected values so users can evaluate their experience rationally',
          'Use confidence intervals for more sophisticated audiences',
          'Label whether observed results are within normal statistical variation',
        ],
      },
      {
        step: 4,
        title: 'Remove Suggestive Labels',
        description:
          'Eliminate "hot", "cold", "overdue", "due", and other labels that imply past outcomes predict future ones',
        example:
          'Replace "Hot Numbers: 7, 14, 33" with "Most frequently drawn in last 30 days: 7, 14, 33. Note: this does not affect future draw probability."',
        tips: [
          'Review all copy for temperature metaphors and momentum language',
          'Replace suggestive adjectives with neutral descriptors',
          'If showing historical frequency, always pair with an independence disclaimer',
        ],
      },
      {
        step: 5,
        title: 'Implement Cool-Down Mechanisms',
        description:
          'Add friction points that interrupt automatic fallacy-driven escalation',
        example:
          'After 10 consecutive plays, show a summary screen: "You\'ve played 10 times. Your odds on the next play are exactly the same as your first: 1 in 50."',
        tips: [
          'Time-based cool-downs give users space to reconsider',
          'Session summaries help users see their actual behavior objectively',
          'Odds reminders at escalation points are more effective than static disclaimers',
        ],
      },
    ],

    dos: [
      'Clearly state that each random event is independent of previous ones',
      'Show actual probability/odds prominently at every decision point',
      'Present outcome history neutrally without suggestive labels or framing',
      'Display expected values alongside actual results for context',
      'Use cumulative statistics rather than sequential streak counters',
      'Implement cool-down mechanisms that interrupt escalation behavior',
      'Test whether your UI inadvertently encourages fallacious thinking',
      'Design for vulnerable users (problem gamblers, inexperienced investors) as the baseline',
    ],

    donts: [
      'Don\'t label random outcomes as "hot", "cold", "due", or "overdue"',
      'Don\'t display streak counters that imply momentum or building probability',
      'Don\'t draw trend lines or patterns over genuinely random data',
      'Don\'t use "you\'re due for a win" or similar fallacy-reinforcing copy',
      'Don\'t place action buttons directly adjacent to streak displays without odds reminders',
      'Don\'t use escalating visual urgency (growing text, pulsing animations) on streaks',
      'Don\'t frame pity timers as "building probability" rather than separate guarantee mechanics',
      'Don\'t present historical frequency as predictive for independent random events',
    ],

    bestPractices: [
      {
        title: 'Show True Odds at Point of Decision',
        description:
          'Display the actual probability immediately before the user takes action on a random event',
        rationale:
          'Users are most susceptible to fallacious reasoning at the moment of decision; odds displayed here are most effective at debiasing',
        example:
          'Directly above the "Spin" button: "Odds of winning: 1 in 50 (same as every spin)"',
      },
      {
        title: 'Use Expected Value Framing',
        description:
          'Show users what they should statistically expect from their session, not just what happened',
        rationale:
          'Expected values help users evaluate whether their experience is unusual or normal, reducing emotional reactions to streaks',
        example:
          '"In 20 spins, you would expect approximately 0.4 wins. You have 0 wins. This is within normal variation."',
      },
      {
        title: 'Separate History from Action',
        description:
          'Create visual and spatial separation between outcome history displays and action buttons',
        rationale:
          'Proximity of streak information to action buttons directly drives fallacy-based decisions',
        example:
          'Place outcome history in a collapsible panel, with odds reminder between history and the action area',
      },
      {
        title: 'Design for Responsible Engagement',
        description:
          'Build interfaces that help users engage responsibly with random-outcome systems',
        rationale:
          'Ethical design protects vulnerable users and builds long-term trust, even if it reduces short-term engagement metrics',
        example:
          'Implement session limits, spending reminders, and odds education for gambling or gacha interfaces',
      },
      {
        title: 'Educate Through Interaction',
        description:
          'Use interactive elements to help users intuitively understand probability and independence',
        rationale:
          'Active learning is more effective than passive disclaimers at changing deeply held probability misconceptions',
        example:
          'Offer an optional "Test Your Intuition" mini-game that demonstrates how streaks naturally occur in random sequences',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships - Probability information must be programmatically determinable',
        implementation:
          'Use semantic HTML and ARIA labels to ensure odds, disclaimers, and independence reminders are conveyed to assistive technology users, not just visually',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.4.1',
        guideline:
          'Use of Color - Do not rely solely on color to convey outcome status',
        implementation:
          'Combine color with text labels and icons when showing win/loss outcomes. Don\'t use red/green alone to indicate streaks.',
      },
      {
        wcagLevel: 'AA',
        criterion: '3.3.2',
        guideline:
          'Labels or Instructions - Provide clear probability information at decision points',
        implementation:
          'Label random event controls with actual odds. Use aria-describedby to link probability information to action buttons.',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.2.1',
        guideline:
          'Timing Adjustable - Allow users adequate time to read probability information',
        implementation:
          'Don\'t auto-dismiss odds reminders or cool-down screens. Let users control pacing of information presentation.',
      },
    ],

    ethics: [
      {
        concern: 'Exploiting Streak Psychology',
        severity: 'critical',
        explanation:
          'Designing streak counters and "due" messaging that encourage users to chase losses or escalate bets',
        mitigation:
          'Replace streak counters with cumulative statistics. Never use language suggesting past outcomes affect future probability. Implement cool-down mechanisms after extended play.',
      },
      {
        concern: 'False Pattern Presentation',
        severity: 'critical',
        explanation:
          'Displaying "hot/cold" numbers, trend lines on random data, or pattern detection on independent events',
        mitigation:
          'Present historical data neutrally without predictive framing. Always include independence disclaimers. Never label random outcomes with suggestive temperature or momentum metaphors.',
      },
      {
        concern: 'Targeting Vulnerable Populations',
        severity: 'critical',
        explanation:
          'Problem gamblers and inexperienced investors are especially susceptible to the Gambler\'s Fallacy and can suffer serious financial harm',
        mitigation:
          'Design for vulnerable users as the baseline. Implement responsible gaming features: session limits, spending alerts, self-exclusion options, and prominent helpline information.',
      },
      {
        concern: 'Pity Timer Framing',
        severity: 'medium',
        explanation:
          'Framing guarantee mechanics as "building probability" rather than separate safety nets, which reinforces fallacious thinking',
        mitigation:
          'Clearly explain that pity timers are a separate guarantee mechanic, not an increase in underlying probability. Label them as "bad luck protection" rather than "building pity".',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'Belief in the Law of Small Numbers',
        author: 'Tversky, A., & Kahneman, D.',
        year: 1971,
        doi: '10.1037/h0031322',
        description:
          'Foundational paper demonstrating how people expect small samples to be representative of population parameters, leading to the Gambler\'s Fallacy',
        type: 'foundational',
      },
      {
        title: 'The Gambler\'s Fallacy and the Hot Hand: Empirical Data from Casinos',
        author: 'Croson, R., & Sundali, J.',
        year: 2005,
        doi: '10.1002/bdm.450',
        description:
          'Field study of actual casino gamblers demonstrating both the Gambler\'s Fallacy and the hot hand fallacy in real betting behavior',
        type: 'advanced',
      },
      {
        title: 'Do Lottery Players Really Suffer from the Gambler\'s Fallacy?',
        author: 'Clotfelter, C. T., & Cook, P. J.',
        year: 1993,
        doi: '10.2307/2234526',
        description:
          'Analysis of Maryland state lottery data showing that numbers that have recently won receive significantly fewer bets, confirming the Gambler\'s Fallacy in real lottery behavior',
        type: 'case-study',
      },
      {
        title: 'The Hot Hand Fallacy and the Gambler\'s Fallacy: Two Faces of Subjective Randomness?',
        author: 'Burns, B. D., & Corpus, B.',
        year: 2004,
        doi: '10.3758/BF03196529',
        description:
          'Research exploring how the Gambler\'s Fallacy and the Hot Hand Fallacy are related cognitive errors in opposite directions',
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
          'Comprehensive treatment of the representativeness heuristic and Gambler\'s Fallacy by the researcher who first identified the underlying mechanism',
        type: 'foundational',
      },
      {
        title: 'The Drunkard\'s Walk: How Randomness Rules Our Lives',
        author: 'Mlodinow, Leonard',
        year: 2008,
        isbn: '9780375424045',
        description:
          'Accessible exploration of how humans misunderstand randomness, including extensive coverage of the Gambler\'s Fallacy and its consequences',
        type: 'practical',
      },
      {
        title: 'Fooled by Randomness',
        author: 'Taleb, Nassim Nicholas',
        year: 2005,
        isbn: '9780812975215',
        description:
          'Examines how people confuse luck with skill and see patterns in random data, directly relevant to the Gambler\'s Fallacy in financial markets',
        type: 'practical',
      },
    ],

    articles: [
      {
        title: 'The Gambler\'s Fallacy in UX Design',
        author: 'Growth.Design',
        url: 'https://growth.design/case-studies',
        description:
          'Case studies examining how digital products exploit or mitigate probability misconceptions',
        type: 'practical',
      },
      {
        title: 'Responsible Gaming Design Patterns',
        author: 'UK Gambling Commission',
        url: 'https://www.gamblingcommission.gov.uk/',
        description:
          'Regulatory guidelines for designing gambling interfaces that mitigate cognitive biases including the Gambler\'s Fallacy',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'The Gambler\'s Fallacy - Why We Think Past Events Affect Future Odds',
        author: 'Veritasium',
        url: 'https://www.youtube.com/watch?v=K8SkCh-n4rw',
        description:
          'Clear visual explanation of why independent events don\'t influence each other, with the Monte Carlo Casino example',
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
