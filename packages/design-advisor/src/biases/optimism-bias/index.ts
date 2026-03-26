/**
 * OPTIMISM BIAS
 */


import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const optimismBias: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'optimism-bias',
    name: 'Optimism Bias',
    aliases: ['Unrealistic Optimism', 'Comparative Optimism', 'Positive Illusion'],
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
      'risk-assessment',
      'planning',
      'overconfidence',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple: 'We systematically overestimate the probability of positive events happening to us and underestimate the probability of negative events, thinking "bad things happen to others, not me."',

    detailed: `Optimism Bias is the tendency to believe that we are less likely to experience negative events and more likely to experience positive outcomes compared to others. This isn't just being hopeful—it's a systematic distortion in probability judgment that affects risk assessment, planning, and decision-making.

The bias manifests in several ways:

1. **Comparative Optimism**: We believe we're more likely than average to experience good things (career success, happy marriage, good health) and less likely than average to experience bad things (accidents, disease, divorce). Statistically, we can't all be above average.

2. **Personal Invulnerability**: When hearing about risks, we think "that won't happen to me" even when we have no special protection. Smokers know smoking causes cancer but think they personally won't get it. Entrepreneurs know most startups fail but think theirs won't.

3. **Positive Outcome Overestimation**: We overestimate the probability and magnitude of positive outcomes. We think projects will finish early, products will be wildly successful, and users will love our designs—more than objective evidence supports.

4. **Negative Outcome Underestimation**: We underestimate the probability and severity of negative outcomes. We ignore risks of failure, security breaches, user frustration, and technical problems.

**Cognitive Mechanisms**:

- **Motivational**: We're motivated to believe in positive futures to reduce anxiety and maintain well-being
- **Informational**: We pay more attention to and better remember positive information about ourselves
- **Egocentric**: We think we have more control over outcomes than we actually do
- **Comparative**: We compare ourselves favorably to others' risk levels

**In Product Design & Development**:

**For Product Teams**:
- **Roadmap Planning**: Underestimate development time, overestimate launch success
- **Risk Assessment**: Ignore potential failure modes, security issues, edge cases
- **Market Assumptions**: "Our product will be different/better/succeed where others failed"
- **User Research**: Hear what we want to hear, ignore warning signs
- **Technical Debt**: "We'll fix that later" (we won't)
- **Scale Planning**: Under-prepare for growth or failure scenarios

**For Users**:
- **Privacy/Security**: "I won't get hacked," leading to weak passwords, ignoring warnings
- **Financial Decisions**: Overestimate investment returns, underestimate risks
- **Health Choices**: Ignore risks of unhealthy behaviors
- **Contract/ToS**: "Nothing bad will happen, I don't need to read this"

**For Designers**:
- **Usability**: "Users will figure this out" (they won't)
- **Error States**: Under-design error handling ("users won't make this mistake")
- **Edge Cases**: Ignore low-probability but high-impact scenarios
- **A/B Tests**: Overconfidence in preferred variant before data

The paradox: Optimism Bias is psychologically beneficial (reduces anxiety, enables action) but practically harmful (leads to poor planning, inadequate risk mitigation). The design challenge is helping users make realistic assessments without inducing paralyzing pessimism.`,

    psychologyBasis: {
      discoveredBy: 'Neil Weinstein',
      year: 1980,
      theory: 'Unrealistic Optimism Research',
      mechanism: `People systematically believe they are less likely to experience negative events and more likely to experience positive ones compared to their peers. This happens because:

1. **Self-Enhancement Motivation**: The brain is motivated to maintain a positive self-image and reduce anxiety about the future, so it skews probability assessments in our favor
2. **Illusion of Control**: We overestimate the degree to which we can influence outcomes, believing our actions provide more protection than they actually do
3. **Selective Updating**: When presented with new information, we update our beliefs asymmetrically—incorporating good news more readily than bad news (Sharot 2011)
4. **Egocentric Comparison**: We compare our risk to a vague, abstract "average person" rather than to someone similar to us, making our risk seem lower
5. **Lack of Direct Experience**: We more easily imagine positive outcomes because negative ones are psychologically distant until personally experienced

The mechanism is deeply embedded in neural processing—the brain's left inferior frontal gyrus shows reduced activity when processing undesirable information about future risks, effectively filtering out bad news.`,
    },

    realWorldExample: `Consider a designer launching a major redesign:

**Optimistic Expectations** (unrealistic):
- "Users will immediately understand and love the new interface"
- "Adoption will be smooth and quick"
- "Support tickets will decrease"
- "Metrics will improve within the first week"
- "We've tested thoroughly, there won't be major bugs"

**Reality**:
- Many users are confused and frustrated
- Adoption is slow and contentious
- Support tickets spike 300%
- Key metrics drop for the first month
- Critical bugs appear in production that weren't caught in testing

**Why the Gap?**:
- Optimism bias made them underweight negative possibilities
- "Our redesign is better than past failures" (comparative optimism)
- "Our testing was thorough, we won't have issues" (overconfidence)
- Focused on positive outcomes (improved UX) while discounting risks

**Same Bias, Different Contexts**:

**Users**:
- "I don't need two-factor authentication, I won't get hacked"
- "I'll read the privacy policy later" (never do)
- "I'll remember my password without writing it down" (forget it)
- "I can click this sketchy link, I won't get a virus"

**Product Managers**:
- "We'll ship on time" (historically never do)
- "This feature will increase retention by 20%" (based on hope)
- "Users will use this exactly as we intend" (they won't)
- "We don't need to plan for that edge case" (it happens)

**Engineers**:
- "This code is fine, it won't break" (it breaks)
- "We'll refactor later" (never happens)
- "This will scale" (it won't)
- "I don't need to write tests for this" (should have)

**Investors**:
- "This startup will be the exception to the 90% failure rate"
- "We're getting in early on the next big thing"
- "The market will continue growing forever"

The bias isn't about being positive—it's about systematically misjudging probabilities in our favor.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `Optimism Bias affects how users assess risk, set expectations, and plan for the future within interfaces. It causes users to underestimate threats, skip protective measures, and set unrealistic goals. Designers must account for this by:

- Building realistic timeline and estimation tools that counteract over-optimism
- Making risks tangible and personally relevant without inducing fear
- Designing prompts and safeguards that activate before risky actions
- Calibrating expectations through honest progress indicators and historical data
- Balancing motivation with realism in goal-setting and planning features`,

    whenToUse: [
      {
        title: 'Project Timeline Estimation',
        scenario:
          'When helping users plan projects or set deadlines',
        example:
          'Show historical completion data: "Similar projects took 2-3x longer than initially estimated. Would you like to add a buffer?"',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Risk Communication',
        scenario: 'When users need to understand potential negative outcomes',
        example:
          'Display personalized risk indicators: "Based on your usage patterns, here are the most likely issues to plan for"',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Backup and Recovery Prompts',
        scenario: 'When users are about to perform risky or irreversible actions',
        example:
          'Prompt backup before destructive actions: "You haven\'t backed up in 14 days. Would you like to save a snapshot before continuing?"',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Security Feature Adoption',
        scenario: 'When encouraging users to enable protective measures',
        example:
          'Make security personal: "Accounts like yours are targeted 3x more often. Enable 2FA to stay protected."',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Error Prevention Design',
        scenario: 'When designing for scenarios users believe won\'t happen to them',
        example:
          'Pre-fill recovery options during calm setup rather than relying on users to prepare for emergencies later',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Financial Planning Interfaces',
        scenario: 'When users are making investment or spending projections',
        example:
          'Show range of outcomes (best/likely/worst case) instead of a single optimistic projection',
        impact: ImpactLevel.CRITICAL,
      },
    ],

    whenToAvoid: [
      {
        title: 'Motivation-Critical Contexts',
        reason:
          'Over-correcting optimism can kill motivation when users need encouragement to start',
        consequence:
          'Users abandon tasks or never begin due to overwhelming pessimism',
        alternative:
          'Balance realism with actionable next steps and achievable milestones',
      },
      {
        title: 'Creative or Exploratory Tasks',
        reason:
          'Some optimism is necessary for creativity, brainstorming, and exploration',
        consequence:
          'Users self-censor ideas or avoid creative risks',
        alternative:
          'Save reality checks for planning/execution phases, not ideation phases',
      },
      {
        title: 'Recovery and Wellness Contexts',
        reason:
          'Optimism is therapeutically valuable for people recovering from setbacks or illness',
        consequence:
          'Undermining hope can harm mental health and recovery outcomes',
        alternative:
          'Support healthy optimism while providing practical planning tools',
      },
      {
        title: 'Early Onboarding',
        reason:
          'Hitting new users with worst-case scenarios during first use creates negative associations',
        consequence:
          'High abandonment rates and negative first impressions',
        alternative:
          'Introduce risk calibration gradually as users become more invested',
      },
    ],

    commonMistakes: [
      {
        title: 'Enabling Unrealistic Expectations',
        description:
          'Designing interfaces that reinforce users\' optimistic delusions instead of calibrating them',
        why: 'Users set impossible deadlines or ignore risks, then blame the tool when things go wrong',
        fix: 'Show historical data, base rates, and reference class information alongside user estimates',
      },
      {
        title: 'Hiding Risks to Increase Conversion',
        description:
          'Burying security warnings, risk disclosures, or failure rates to avoid scaring users away',
        why: 'Users make uninformed decisions they later regret, destroying trust',
        fix: 'Present risks clearly but pair them with mitigation actions users can take',
      },
      {
        title: 'Minimizing Security Warnings',
        description:
          'Making security prompts easy to dismiss because "users find them annoying"',
        why: 'Users\' optimism bias already makes them want to skip security; easy dismissal compounds the problem',
        fix: 'Design security prompts that are brief but require deliberate acknowledgment, not auto-dismissible',
      },
      {
        title: 'Overcorrecting into Pessimism',
        description:
          'Showing so many warnings and risk indicators that users become anxious or disengaged',
        why: 'Excessive doom-and-gloom triggers learned helplessness rather than productive caution',
        fix: 'Focus on the 2-3 most relevant risks with clear, actionable mitigations',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.HIGH,
        description:
          'Layout determines whether risk information and reality checks are visible or buried',
        examples: [
          'Placing risk indicators alongside optimistic projections for balanced view',
          'Positioning backup/safety prompts in the natural workflow, not hidden in settings',
          'Showing historical data charts near estimation inputs',
          'Using progressive disclosure to reveal risk details without overwhelming',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Typography affects whether warnings and calibration information feel important or ignorable',
        examples: [
          'Risk information in same weight as positive projections (not smaller/lighter)',
          'Timeline warnings using same prominence as timeline estimates',
          'Security recommendations at readable size, not fine print',
          'Using clear, direct language rather than euphemistic small text',
        ],
      },
      color: {
        level: ImpactLevel.HIGH,
        description:
          'Color signals whether information is positive, neutral, or cautionary',
        examples: [
          'Using amber/yellow for "likely risk" alongside green "on track" indicators',
          'Risk ranges shown in gradient (green-amber-red) for intuitive understanding',
          'Avoiding all-green dashboards that reinforce unrealistic optimism',
          'Security prompts using attention-getting but not alarming color treatment',
        ],
      },
      interaction: {
        level: ImpactLevel.CRITICAL,
        description:
          'Interaction design determines when and how reality checks reach users',
        examples: [
          'Pre-action confirmation dialogs for irreversible operations',
          'Inline timeline validation that flags unrealistic estimates in real-time',
          'Requiring backup confirmation before destructive actions',
          'Friction for risky actions proportional to the actual risk level',
        ],
      },
      content: {
        level: ImpactLevel.CRITICAL,
        description:
          'Content framing determines whether users calibrate or reinforce their optimism',
        examples: [
          'Showing "projects like this typically take X" alongside user estimates',
          'Risk communication using concrete scenarios, not abstract percentages',
          'Pre-mortem prompts: "What could go wrong?" before committing to plans',
          'Success stories paired with honest accounts of challenges overcome',
        ],
      },
      accessibility: {
        level: ImpactLevel.HIGH,
        description:
          'Warnings and risk information must be perceivable by all users regardless of ability',
        examples: [
          'Screen reader announcements for risk indicators and warnings',
          'Risk information not conveyed by color alone',
          'Keyboard-accessible confirmation dialogs for risky actions',
          'Alternative text for risk visualization charts and gauges',
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
        title: 'Realistic Project Timeline with Historical Reference',
        description:
          'Project management tool showing user estimate alongside historical data for similar projects',
        code: `<div class="timeline-estimate">
  <h3>Sprint Planning: Feature X</h3>

  <div class="user-estimate">
    <label>Your estimate</label>
    <input type="text" value="2 weeks" />
  </div>

  <div class="reality-check">
    <h4>Historical Context</h4>
    <div class="comparison">
      <div class="stat">
        <span class="label">Similar features averaged</span>
        <span class="value">4.2 weeks</span>
      </div>
      <div class="stat">
        <span class="label">Range</span>
        <span class="value">2.5 - 7 weeks</span>
      </div>
      <div class="stat">
        <span class="label">On-time delivery rate</span>
        <span class="value">23% of initial estimates</span>
      </div>
    </div>
    <p class="suggestion">Consider adding a 50-100% buffer
    to your estimate for a realistic timeline.</p>
  </div>

  <button class="primary">Set Timeline with Buffer</button>
  <button class="secondary">Keep Original Estimate</button>
</div>`,
        explanation:
          'By showing historical completion data for similar tasks, users can calibrate their naturally optimistic estimates. The tool respects user autonomy (they can keep their estimate) while making the realistic option the primary action.',
        principle:
          'Reference class forecasting counteracts individual optimism by showing base rates',
        metrics: {
          before: '23% of projects completed on time with user estimates alone',
          after: '61% of projects completed on time with calibrated estimates',
          improvement: '165% increase in on-time delivery',
        },
      },
      {
        title: 'Pre-Action Backup Prompt',
        description:
          'Cloud storage prompting backup before a bulk operation users assume will go fine',
        code: `<dialog class="backup-prompt">
  <h3>Before You Reorganize 1,247 Files...</h3>

  <div class="risk-context">
    <div class="stat-row">
      <span class="icon">&#128200;</span>
      <p><strong>12% of bulk reorganizations</strong> result in
      at least one misplaced file</p>
    </div>
    <div class="stat-row">
      <span class="icon">&#9200;</span>
      <p>Your last backup was <strong>23 days ago</strong></p>
    </div>
  </div>

  <div class="actions">
    <button class="primary">Create Snapshot, Then Reorganize</button>
    <button class="secondary">Reorganize Without Backup</button>
  </div>

  <p class="note">Snapshots take ~30 seconds and can be
  restored anytime within 30 days.</p>
</dialog>`,
        explanation:
          'Users assume reorganization will go perfectly. This prompt surfaces the actual failure rate and makes the safe option (snapshot first) the easiest choice, without blocking the optimistic path entirely.',
        principle:
          'Surface real risk data at the moment of decision when optimism bias is highest',
        metrics: {
          before: '8% of users created backups before bulk operations',
          after: '67% created snapshots when prompted at point of action',
          improvement: '738% increase in pre-action backup rate',
        },
      },
      {
        title: 'Balanced Risk Communication in Health App',
        description:
          'Health app showing personalized risk alongside positive health metrics',
        code: `<section class="health-dashboard">
  <h2>Your Health Overview</h2>

  <div class="positive-metrics">
    <div class="metric good">
      <span class="label">Steps this week</span>
      <span class="value">52,340</span>
      <span class="trend up">+12% vs last week</span>
    </div>
  </div>

  <div class="risk-calibration">
    <h3>Worth Your Attention</h3>
    <div class="risk-item">
      <span class="severity moderate">Moderate</span>
      <p><strong>Blood pressure trend</strong>: Your readings have
      increased 8% over 3 months.</p>
      <p class="context">1 in 3 adults develops hypertension.
      Early awareness improves outcomes significantly.</p>
      <button class="action">Schedule Check-up</button>
    </div>
  </div>
</section>`,
        explanation:
          'Rather than only showing positive health metrics (which reinforces "I\'m fine" optimism), the app surfaces trends that deserve attention alongside actionable steps. The framing is factual, not alarming.',
        principle:
          'Pair positive feedback with calibrated risk awareness and clear action paths',
      },
    ],

    bad: [
      {
        title: 'Enabling Unrealistic Project Expectations',
        description:
          'Project tool that accepts any timeline without reality-checking',
        code: `<!-- DON'T DO THIS -->
<div class="project-setup">
  <h3>New Project Timeline</h3>
  <label>Estimated completion</label>
  <input type="date" value="2026-04-03" />
  <p class="encouragement">Great! You're on track for an
  ambitious launch!</p>
  <button class="primary">Create Project</button>
</div>`,
        explanation:
          'The tool reinforces the user\'s optimistic estimate with encouraging language instead of providing any calibration. When the project inevitably runs late, users blame the tool for not warning them.',
        principle:
          'Never reinforce unrealistic optimism without providing calibration data',
      },
      {
        title: 'Hiding Risk Disclosures to Boost Conversion',
        description:
          'Investment platform minimizing risk information to encourage sign-ups',
        code: `<!-- DON'T DO THIS -->
<section class="investment-cta">
  <h2>Start Growing Your Wealth Today!</h2>
  <div class="projected-returns">
    <p class="big-number">+18.5% average annual returns</p>
    <p>Join 500,000+ investors building their future</p>
  </div>
  <button class="primary large">Start Investing Now</button>
  <small style="color: #ccc; font-size: 0.6em;">
    Past performance does not guarantee future results.
    Your capital is at risk. See terms for details.
  </small>
</section>`,
        explanation:
          'The prominent return figure exploits optimism bias ("I\'ll get 18.5% too!") while risk disclosures are visually minimized. Users\' natural optimism already downweights risk—making it nearly invisible compounds the problem.',
        principle:
          'Risk information must be proportionally visible to the claims being made',
      },
      {
        title: 'Dismissible Security Warnings',
        description:
          'Security prompt designed to be easily skipped because users "don\'t like interruptions"',
        code: `<!-- DON'T DO THIS -->
<div class="security-toast" style="opacity: 0.7;">
  <p>Consider enabling two-factor authentication</p>
  <button class="dismiss" style="font-size: 1.2em;">✕</button>
  <button class="enable" style="font-size: 0.8em;">Maybe Later</button>
</div>`,
        explanation:
          'The dismiss button is larger than the action button, the toast is semi-transparent, and the CTA says "Maybe Later" instead of presenting a clear value. This accommodates users\' "it won\'t happen to me" bias instead of helping them overcome it.',
        principle:
          'Security prompts should counter optimism bias, not accommodate it',
      },
    ],

    realWorld: [
      {
        company: 'Kickstarter',
        product: 'Delivery Estimates',
        url: 'https://www.kickstarter.com',
        description:
          'Kickstarter projects historically deliver late (average 1.35x estimated timeline). The platform now shows estimated delivery dates alongside historical on-time rates for similar categories, helping backers calibrate expectations.',
        effectiveness: 'effective',
        analysis:
          'By surfacing base rates for delivery timelines in each category, Kickstarter helps both creators (who set deadlines) and backers (who evaluate them) account for the optimism bias inherent in project planning.',
      },
      {
        company: 'Jira / Atlassian',
        product: 'Velocity Charts',
        url: 'https://www.atlassian.com/software/jira',
        description:
          'Jira\'s velocity charts show teams their actual completion rates over past sprints, providing objective data to counter optimistic sprint planning. Teams can see the gap between committed and completed story points.',
        effectiveness: 'very-effective',
        analysis:
          'Velocity tracking is one of the most effective anti-optimism-bias tools in software development. By making the historical gap between plans and reality visible, teams gradually learn to plan more realistically.',
      },
      {
        company: 'Apple Health',
        product: 'Health Risk Indicators',
        url: 'https://www.apple.com/health/',
        description:
          'Apple Health surfaces trend alerts when health metrics show concerning patterns, cutting through users\' "I\'m fine" optimism with personalized, data-driven notifications.',
        effectiveness: 'effective',
        analysis:
          'By using personal data rather than generic warnings, Apple makes risks feel relevant and specific. This counters the "that won\'t happen to me" aspect of optimism bias while maintaining a supportive, non-alarming tone.',
      },
      {
        company: 'Lemonade',
        product: 'Insurance Onboarding',
        url: 'https://www.lemonade.com',
        description:
          'Lemonade uses behavioral economics in their insurance onboarding, showing personalized risk scenarios ("renters in your area filed 47 claims last year") to make abstract risks concrete and overcome "I don\'t need insurance" optimism.',
        effectiveness: 'very-effective',
        analysis:
          'Making risks local and specific counters the abstractness that optimism bias thrives on. Rather than generic statistics, geographic and demographic personalization makes the risk feel real and personally relevant.',
      },
    ],

    abTests: [
      {
        title: 'Project Estimation: With vs Without Historical Calibration',
        hypothesis:
          'Showing historical completion data will lead to more realistic project timelines',
        controlVersion: {
          description:
            'Standard project creation form with free-text timeline input and no reference data',
          metrics: {
            conversionRate: '95%',
            averageEstimateAccuracy: '42%',
            onTimeDelivery: '23%',
          },
        },
        treatmentVersion: {
          description:
            'Project creation form showing historical data: "Similar projects averaged 4.2 weeks (range: 2.5-7 weeks). Only 23% of initial estimates were accurate."',
          metrics: {
            conversionRate: '89%',
            averageEstimateAccuracy: '71%',
            onTimeDelivery: '61%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'While project creation dropped slightly (6%), on-time delivery nearly tripled. Users initially added 40-80% more buffer time. Over 3 months, teams reported higher stakeholder satisfaction due to more reliable timelines.',
          learnings: [
            'Reference class data is the most effective optimism bias intervention',
            'Small drop in project starts is offset by dramatically better outcomes',
            'Teams that saw calibration data improved estimates even without the tool later',
            'Showing ranges (best/worst/likely) was more effective than single averages',
          ],
        },
      },
      {
        title: 'Security Adoption: Generic Warning vs Personalized Risk',
        hypothesis:
          'Personalized risk information will increase security feature adoption more than generic warnings',
        controlVersion: {
          description:
            'Generic security prompt: "Enable two-factor authentication to protect your account"',
          metrics: {
            conversionRate: '7.2%',
            clickThroughRate: '11%',
          },
        },
        treatmentVersion: {
          description:
            'Personalized prompt: "Your account type is targeted 3x more than average. 12 similar accounts in your region were compromised last month. Enable 2FA now."',
          metrics: {
            conversionRate: '28.4%',
            clickThroughRate: '39%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Personalized risk data nearly quadrupled 2FA adoption. The key was making the abstract risk personally relevant, countering "it won\'t happen to me" thinking with evidence that it happens to people like the user.',
          learnings: [
            'Generic warnings are easily dismissed by optimism bias',
            'Personalized, specific risk information breaks through optimistic defaults',
            'Geographic and demographic similarity increases perceived relevance',
            'Combining personal relevance with easy action yields best results',
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
        name: 'Overly Positive Projections',
        description:
          'Dashboards or projections showing only best-case scenarios without ranges or historical context',
        howToSpot:
          'Look for single-point estimates, upward-only trend lines, or projections without confidence intervals',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Minimized Risk Displays',
        description:
          'Risk information shown in smaller text, muted colors, or collapsed sections compared to positive metrics',
        howToSpot:
          'Compare visual prominence of positive data (returns, growth, success) vs risk data (warnings, failure rates, caveats)',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Hidden or Dismissible Warnings',
        description:
          'Security, backup, or risk warnings that are easy to auto-dismiss or never surface prominently',
        howToSpot:
          'Check if warnings can be dismissed with a single click, auto-close after seconds, or are buried in settings',
        severity: ImpactLevel.CRITICAL,
      },
      {
        name: 'Unrealistic Default Estimates',
        description:
          'Pre-filled timeline, budget, or outcome estimates that reflect best-case rather than typical scenarios',
        howToSpot:
          'Compare default values with historical actuals; look for "aggressive" defaults that feel good but aren\'t realistic',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Encouraging Language Without Calibration',
        description:
          'Motivational or encouraging copy that reinforces optimistic assumptions without grounding data',
        howToSpot:
          'Look for phrases like "You\'re on track!", "Great choice!", or "Almost there!" without supporting evidence',
        severity: ImpactLevel.MEDIUM,
      },
    ],

    patterns: [
      {
        name: 'Best-Case-Only Planning',
        description: 'Planning tools or projections that only show optimistic outcomes without ranges or historical calibration',
        indicators: ['Single-point timeline estimates without ranges', 'Upward-only projection curves', 'No reference to historical completion rates', 'Missing worst-case or likely-case scenarios'],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Risk Minimization Pattern',
        description: 'Risk information systematically de-emphasized relative to positive information',
        indicators: ['Risk disclaimers in smaller font than benefit claims', 'Warnings in low-contrast or muted colors', 'Risk details behind "Learn more" links', 'Security prompts with larger dismiss than action buttons'],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Frictionless Risk-Taking Pattern',
        description: 'Dangerous or irreversible actions made as easy as routine actions',
        indicators: ['Delete/destroy actions with single-click confirmation', 'No backup prompts before destructive operations', 'Auto-skip of security setup during onboarding', 'No pre-action risk summary for significant decisions'],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Uncalibrated Estimation Pattern',
        description: 'User inputs for estimates or projections with no reference data or validation',
        indicators: ['Free-text deadline inputs with no historical context', 'Budget fields with no comparable project data', 'Goal-setting without base rate information', 'Forecasting tools without confidence intervals'],
        severity: ImpactLevel.HIGH,
        confidence: 'medium',
      },
    ],

    checklistQuestions: [
      'Are projections and estimates shown with ranges or only as single optimistic points?',
      'Is historical performance data visible alongside future projections?',
      'Are risk warnings given the same visual prominence as positive metrics?',
      'Can security or backup prompts be dismissed without deliberate action?',
      'Are default estimates based on typical outcomes or best-case scenarios?',
      'Does encouraging copy have supporting data, or is it empty motivation?',
      'Are irreversible actions gated by appropriate friction and confirmation?',
      'Do planning tools show base rates for similar projects or tasks?',
      'Is failure information (error rates, typical problems) accessible before action?',
      'Are users shown what "similar users" actually experienced, not just what they hoped for?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in optimism bias.

Analyze the provided design for optimism bias patterns. Identify:

1. **Unrealistic Projections**: How estimates, timelines, and projections are presented—are they calibrated or purely optimistic?
2. **Risk Minimization**: How risk information is displayed relative to positive information—is it proportionally visible?
3. **Planning Interfaces**: Whether planning and estimation tools provide historical calibration data
4. **Security & Safety**: How protective features are prompted—do they counter or accommodate "it won't happen to me" thinking?
5. **Expectation Setting**: Whether the design helps users form realistic expectations or reinforces wishful thinking

For each pattern found:
- Identify where optimism bias is being exploited or reinforced
- Assess whether users can make calibrated, realistic decisions
- Determine if risk information is proportionally visible
- Evaluate whether protective features are prompted effectively
- Suggest improvements for balanced optimism

Consider:
- Are projections shown with ranges and historical context?
- Is risk information as visually prominent as positive metrics?
- Do planning tools provide base rates and reference classes?
- Are security prompts designed to overcome "it won't happen to me" thinking?
- Does the design balance motivation with realistic calibration?

Provide actionable recommendations for honest, calibrated UX that respects both user optimism and realistic outcomes.`,

    outputSchema: {
      type: 'object',
      properties: {
        optimismPatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              optimismReinforced: { type: 'string' },
              riskVisibility: { type: 'string' },
              calibrationPresent: { type: 'boolean' },
              userImpact: { type: 'string' },
              ethical: { type: 'boolean' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'optimismReinforced',
              'riskVisibility',
              'ethical',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            projectionRealism: { type: 'number' },
            riskVisibilityScore: { type: 'number' },
            calibrationScore: { type: 'number' },
            ethicalScore: { type: 'number' },
          },
          required: [
            'projectionRealism',
            'riskVisibilityScore',
            'calibrationScore',
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
        'optimismPatterns',
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
        title: 'Identify Where Users Are Overly Optimistic',
        description:
          'Map the key decision points where users\' natural optimism leads to poor outcomes—timeline estimates, risk assessments, security decisions',
        example:
          'Audit: Users skip 2FA setup 93% of the time; project estimates are off by 2-3x; only 8% create backups before bulk operations',
        tips: [
          'Look at historical data to find gaps between user expectations and actual outcomes',
          'Survey users about perceived vs actual risk levels',
          'Track where optimistic assumptions lead to support tickets or complaints',
        ],
      },
      {
        step: 2,
        title: 'Gather Calibration Data',
        description:
          'Collect the historical data needed to help users make realistic assessments',
        example:
          'Aggregate completion times for similar projects, actual failure rates, typical timeline overruns',
        tips: [
          'Reference class forecasting: group similar past events to establish base rates',
          'Track outcomes that users predicted vs what actually happened',
          'Build data pipelines that can provide real-time calibration',
        ],
      },
      {
        step: 3,
        title: 'Design Calibration Touchpoints',
        description:
          'Insert reality-check information at the moments when optimism bias is strongest—right before commitments',
        example:
          'Show "Similar projects averaged 4.2 weeks" right next to the timeline input field, not in a separate report',
        tips: [
          'Timing matters: show calibration data at the decision point, not before or after',
          'Make data contextual and specific, not generic warnings',
          'Use inline presentation, not modal interruptions when possible',
        ],
      },
      {
        step: 4,
        title: 'Balance Optimism with Realism',
        description:
          'Help users see realistic ranges without killing motivation or creating anxiety',
        example:
          'Show best case, likely case, and worst case scenarios: "Your project could take 2-7 weeks, with 4 weeks being most likely"',
        tips: [
          'Ranges are more effective than single numbers',
          'Lead with the realistic case, not worst case',
          'Always pair risk information with actionable mitigations',
        ],
      },
      {
        step: 5,
        title: 'Make Protective Actions the Easy Path',
        description:
          'Design flows so the cautious choice (backup, security, buffer time) is the default or easiest option',
        example:
          'Pre-select "Create snapshot before reorganizing" with a single-click option to skip',
        tips: [
          'Default to the safer option rather than the optimistic one',
          'Reduce friction for protective actions (auto-backup, one-click 2FA)',
          'Make the optimistic path possible but require deliberate choice',
        ],
      },
    ],

    dos: [
      'Show historical base rates alongside user estimates and projections',
      'Present risk information with the same visual prominence as positive metrics',
      'Design security and backup prompts that counter "it won\'t happen to me" thinking',
      'Use ranges (best/likely/worst case) instead of single-point estimates',
      'Make the cautious or realistic option the default or easiest path',
      'Provide personalized risk data to make abstract threats feel relevant',
      'Time calibration information to appear at decision points, not after',
      'Balance realism with actionable next steps to maintain motivation',
    ],

    donts: [
      'Don\'t reinforce unrealistic expectations with encouraging copy that lacks data support',
      'Don\'t hide risk disclosures in fine print, collapsed sections, or behind clicks',
      'Don\'t make security warnings auto-dismissible or easy to accidentally skip',
      'Don\'t use only best-case projections in planning and forecasting tools',
      'Don\'t exploit optimism bias to increase conversion at the expense of informed consent',
      'Don\'t overcorrect into pessimism—paralyzing users is as bad as misleading them',
      'Don\'t present risks without accompanying mitigations and action paths',
      'Don\'t assume users will seek out risk information on their own—surface it proactively',
    ],

    bestPractices: [
      {
        title: 'Reference Class Forecasting',
        description:
          'Show users what actually happened for similar projects, tasks, or decisions rather than relying on individual estimates',
        rationale:
          'Individual estimates are systematically biased; group base rates are much more accurate',
        example:
          '"Features of this complexity have taken your team an average of 3.8 sprints (range: 2-6)"',
      },
      {
        title: 'Pre-Mortem Prompts',
        description:
          'Ask users "What could go wrong?" before they commit to plans, forcing consideration of failure modes',
        rationale:
          'Imagining failure in advance activates more realistic thinking than simply warning about it',
        example:
          'Before project kickoff: "Take 2 minutes to list what could cause this project to miss its deadline"',
      },
      {
        title: 'Progressive Risk Disclosure',
        description:
          'Introduce risk calibration gradually as users become more invested, rather than front-loading all warnings',
        rationale:
          'Early overwhelming warnings cause abandonment; well-timed calibration reaches engaged users',
        example:
          'Show basic risk overview during setup, detailed calibration during planning, specific warnings before irreversible actions',
      },
      {
        title: 'Personalize Risk Communication',
        description:
          'Use user-specific data (their history, their region, their account type) to make risks feel personally relevant',
        rationale:
          'Generic risk statistics are easily dismissed as "not about me"; personalized data is harder to ignore',
        example:
          '"Accounts with your access level are 3x more likely to be targeted. 12 similar accounts were compromised in your region last month."',
      },
    ],

    accessibility: [{
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships - Ensure risk information has semantic equivalents',
        implementation:
          'Use proper heading levels, ARIA labels, and semantic HTML so screen reader users encounter risk and calibration information, not just positive metrics',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.4.1',
        guideline:
          'Use of Color - Don\'t rely only on color to convey risk levels',
        implementation:
          'Combine color with text labels, icons, and patterns to indicate risk severity (e.g., "Moderate Risk" text + amber color + warning icon)',
      },
      {
        wcagLevel: 'AA',
        criterion: '3.3.4',
        guideline:
          'Error Prevention - For irreversible actions, provide confirmation with risk context',
        implementation:
          'Before destructive or irreversible actions, show confirmation dialogs that include relevant risk data and offer reversible alternatives',
      },
    ],

    ethics: [
      {
        concern: 'Exploiting Optimism for Conversion',
        severity: 'critical',
        explanation:
          'Deliberately hiding risks, failure rates, or negative outcomes to make users more likely to sign up, purchase, or commit',
        mitigation:
          'Present risk information proportionally to benefit claims. If you show "+18.5% returns", show risk of loss with equal prominence.',
      },
      {
        concern: 'Unrealistic Expectation Setting',
        severity: 'high',
        explanation:
          'Designing tools that accept and reinforce unrealistic estimates without calibration, leading to predictable failures',
        mitigation:
          'Provide historical base rates and calibration data at estimation points. Let users override but make realistic data easily available.',
      },
      {
        concern: 'Security Theater vs Real Protection',
        severity: 'high',
        explanation:
          'Making security prompts easy to dismiss to reduce "user friction" while claiming to offer security features',
        mitigation:
          'Design security prompts that require deliberate acknowledgment. Make the secure path the easiest path, not just an available option.',
      },
      {
        concern: 'Weaponizing Pessimism',
        severity: 'medium',
        explanation:
          'Over-correcting optimism bias by using fear-based tactics to drive purchases (insurance, security products)',
        mitigation:
          'Present risks factually and proportionally. Pair risk information with actionable steps. Never exaggerate to sell.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'Unrealistic Optimism About Future Life Events',
        author: 'Weinstein, N. D.',
        year: 1980,
        doi: '10.1037/0022-3514.39.5.806',
        description:
          'The foundational paper establishing that people systematically underestimate their likelihood of negative events and overestimate positive ones',
        type: 'foundational',
      },
      {
        title: 'The Optimism Bias',
        author: 'Sharot, T.',
        year: 2011,
        doi: '10.1016/j.cub.2011.10.030',
        description:
          'Comprehensive review of optimism bias mechanisms, neural basis, and implications for decision-making',
        type: 'foundational',
      },
      {
        title: 'How Unrealistic Optimism Is Maintained in the Face of Reality',
        author: 'Sharot, T., Korn, C. W., & Dolan, R. J.',
        year: 2011,
        doi: '10.1038/nn.2949',
        description:
          'Demonstrates that people selectively update beliefs based on desirability—incorporating good news more readily than bad news',
        type: 'advanced',
      },
      {
        title: 'The Planning Fallacy: Cognitive, Motivational, and Social Origins',
        author: 'Buehler, R., Griffin, D., & Peetz, J.',
        year: 2010,
        description:
          'Explores how optimism bias specifically affects project planning and time estimation',
        type: 'practical',
      },
    ],

    books: [
      {
        title: 'The Optimism Bias: A Tour of the Irrationally Positive Brain',
        author: 'Sharot, Tali',
        year: 2011,
        isbn: '9780307473516',
        description:
          'Comprehensive exploration of optimism bias by the leading researcher, covering neural mechanisms and real-world implications',
        type: 'foundational',
      },
      {
        title: 'Thinking, Fast and Slow',
        author: 'Kahneman, Daniel',
        year: 2011,
        isbn: '9780374275631',
        description:
          'Chapters on planning fallacy and optimistic overconfidence, connecting optimism bias to broader cognitive bias research',
        type: 'foundational',
      },
      {
        title: 'Superforecasting: The Art and Science of Prediction',
        author: 'Tetlock, Philip E., & Gardner, Dan',
        year: 2015,
        isbn: '9780804136716',
        description:
          'Practical techniques for overcoming optimism bias in predictions and forecasts through calibration training',
        type: 'practical',
      },
    ],

    articles: [
      {
        title: 'Reference Class Forecasting: A Better Way to Plan',
        author: 'Flyvbjerg, Bent',
        url: 'https://arxiv.org/abs/1508.05694',
        description:
          'Practical framework for using historical base rates to counteract optimism bias in project planning',
        type: 'practical',
      },
      {
        title: 'The Planning Fallacy in UX',
        author: 'Nielsen Norman Group',
        url: 'https://www.nngroup.com/articles/planning-fallacy/',
        description:
          'How optimism bias affects UX project timelines and design decisions',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'The Optimism Bias',
        author: 'Tali Sharot - TED',
        url: 'https://www.ted.com/talks/tali_sharot_the_optimism_bias',
        description:
          'TED talk by the leading optimism bias researcher explaining the phenomenon and its neural basis',
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
      'planning-fallacy',     // Optimism bias is a key driver of planning fallacy
      'overconfidence-bias',  // Overconfidence and optimism reinforce each other
      'illusion-of-control',  // Believing we control outcomes feeds optimistic projections
      'confirmation-bias',    // We seek information that confirms our optimistic expectations
    ],

    conflicts: [
      'loss-aversion',        // Loss aversion can counterbalance optimistic risk-taking
      'pessimism-bias',       // Direct opposite tendency in some individuals/contexts
    ],

    confusedWith: [
      'overconfidence-bias',  // Related but distinct: overconfidence is about ability, optimism is about outcomes
      'planning-fallacy',     // Planning fallacy is a specific manifestation of optimism bias
      'dunning-kruger',       // Both involve miscalibration but through different mechanisms
    ],

    hierarchy: {
      parent: 'cognitive-bias',
      children: [
        'planning-fallacy',
        'comparative-optimism',
      ],
    },
  },
};
