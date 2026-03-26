/**
 * IMPACT BIAS
 *
 * We overestimate the intensity and duration of emotional reactions
 * to future events, both positive and negative.
 */


import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const impactBias: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'impact-bias',
    name: 'Impact Bias',
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
    simple: 'We overestimate the intensity and duration of emotional reactions',

    detailed: `The Impact Bias is a well-documented cognitive bias that significantly impacts how we process information and make decisions.

We overestimate the intensity and duration of emotional reactions. This bias affects how users perceive options, evaluate choices, and interact with digital interfaces. Understanding this pattern is crucial for designing better user experiences that work with human psychology rather than against it.

In UX and product design, this bias manifests in how users make decisions, form preferences, and navigate interfaces. Designers can leverage this understanding to create more intuitive experiences while being mindful of ethical implications.`,

    psychologyBasis: {
      discoveredBy: 'Various Researchers',
      year: 1970,
      theory: 'Cognitive Bias Research',
      mechanism: `The brain overestimates the emotional intensity and duration of future events because of several cognitive mechanisms:

1. **Focalism**: When imagining a future event, we focus narrowly on that event and neglect the many other activities and experiences that will dilute its emotional impact
2. **Immune Neglect**: We underestimate our psychological immune system — our remarkable ability to rationalize, reframe, and adapt to both positive and negative outcomes
3. **Memory Distortion**: We recall past emotional peaks more vividly than the overall duration and fade of those emotions, reinforcing the belief that future events will hit harder
4. **Sense-Making Failure**: We fail to predict how quickly we will make sense of and normalize new circumstances, whether a promotion or a loss
5. **Affective Forecasting Error**: We project our current emotional state onto future scenarios, failing to account for how context, coping, and habituation will moderate the actual experience`,
    },

    realWorldExample: `Studies by Daniel Gilbert and Timothy Wilson found that college professors who were denied tenure predicted they would be devastated for years, yet follow-up research showed they returned to baseline happiness within months. Similarly, lottery winners expected permanent euphoria but adapted surprisingly quickly. In both cases, people dramatically overestimated how long and how intensely they would feel the impact of these major life events.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `Impact Bias affects how users predict their emotional responses to product features, upgrades, downgrades, and changes. This has direct implications for:

- Premium feature previews and upgrade messaging that overpromise emotional payoff
- Error and downgrade communication that exaggerates negative consequences
- Change management UX where users fear transitions more than warranted
- Subscription and pricing pages that inflate the perceived joy of upgrading
- Onboarding flows that set unrealistic emotional expectations for the product experience`,

    whenToUse: [
      {
        title: 'Realistic Feature Previews',
        scenario:
          'When previewing premium features or upcoming product capabilities',
        example:
          'Show concrete, functional benefits of an upgrade ("Save 3 hours per week on reports") rather than exaggerated emotional promises ("You will LOVE this!")',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Honest Upgrade Messaging',
        scenario: 'When encouraging users to upgrade plans or adopt new features',
        example:
          'Frame upgrade benefits in terms of specific workflow improvements and measurable outcomes rather than promising transformative emotional experiences',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Balanced Change Communication',
        scenario: 'When communicating product changes, migrations, or deprecations',
        example:
          'Acknowledge that change feels disruptive but provide evidence that users adapt quickly, showing transition timelines and success stories from early adopters',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Downgrade and Cancellation Flows',
        scenario: 'When users are considering downgrading or cancelling',
        example:
          'Instead of fear-mongering about what they will lose, show factual usage data: "You used Feature X 3 times last month" to help them make an informed decision',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Post-Purchase Expectation Setting',
        scenario: 'When onboarding new paying users after a purchase or upgrade',
        example:
          'Set realistic milestones: "Most users see measurable results within 2 weeks" rather than "Get ready for amazing results immediately!"',
        impact: ImpactLevel.MEDIUM,
      },
    ],

    whenToAvoid: [
      {
        title: 'Genuine Safety Warnings',
        reason:
          'Impact bias correction should not minimize truly critical consequences',
        consequence:
          'Users might underestimate real risks if you always frame consequences as less severe than expected',
        alternative:
          'For genuinely dangerous actions (data deletion, security risks), present consequences accurately without either inflating or deflating them',
      },
      {
        title: 'Emotional Support Contexts',
        reason:
          'Telling users their emotional reaction is "overestimated" can feel dismissive',
        consequence:
          'Users experiencing frustration or loss feel invalidated and lose trust in the product',
        alternative:
          'Acknowledge the emotional experience while providing practical support and clear next steps',
      },
      {
        title: 'High-Stakes Irreversible Decisions',
        reason:
          'Correcting for impact bias on truly irreversible actions could lead to hasty choices',
        consequence:
          'Users might not take sufficient care before permanent data deletion or account closure',
        alternative:
          'Present balanced information about reversibility and consequences without minimizing or exaggerating',
      },
      {
        title: 'Crisis Communication',
        reason:
          'During outages or data breaches, minimizing emotional impact feels tone-deaf',
        consequence:
          'Users lose trust if the company appears to downplay serious incidents',
        alternative:
          'Lead with transparency and concrete remediation steps rather than emotional calibration',
      },
    ],

    commonMistakes: [
      {
        title: 'Overpromising Emotional Payoff',
        description:
          'Marketing upgrade benefits with extreme emotional language: "You will be THRILLED!" or "This will change EVERYTHING!"',
        why: 'Users experience post-purchase disappointment when reality does not match the inflated emotional promise, leading to churn',
        fix: 'Focus on specific, measurable benefits: "Save 5 hours/week" or "Reduce errors by 40%"',
      },
      {
        title: 'Fear-Mongering on Downgrades',
        description:
          'Using dramatic loss language to prevent cancellations: "You will LOSE access to EVERYTHING you have built!"',
        why: 'Exploits impact bias to create exaggerated fear; users who stay feel manipulated, users who leave feel resentful',
        fix: 'Show factual usage data and let users make informed decisions: "You used 3 premium features last month"',
      },
      {
        title: 'Ignoring Adaptation in Onboarding',
        description:
          'Setting expectations that the product will deliver permanent delight without acknowledging the novelty fade',
        why: 'Users expect sustained excitement but experience normal hedonic adaptation, causing unwarranted dissatisfaction',
        fix: 'Build progressive engagement milestones that evolve with the user rather than front-loading all excitement',
      },
      {
        title: 'Exaggerating Change Disruption',
        description:
          'Presenting UI changes or migrations as catastrophic events that will deeply disrupt workflows',
        why: 'Users panic and resist change more than necessary, increasing support burden and slowing adoption',
        fix: 'Share transition data from beta users showing how quickly people adapt, and provide clear migration guides',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.MEDIUM,
        description:
          'Layout choices affect how prominently emotional promises and consequence warnings are displayed',
        examples: [
          'Feature comparison tables that visually exaggerate the gap between tiers',
          'Upgrade modals that use dramatic full-screen takeovers to amplify emotional urgency',
          'Cancellation flows with excessive warning steps that inflate perceived loss',
          'Before/after layouts that exaggerate the transformation narrative',
        ],
      },
      typography: {
        level: ImpactLevel.HIGH,
        description:
          'Text sizing and emphasis directly influence how intense benefits and consequences feel',
        examples: [
          'Oversized benefit headlines that promise outsized emotional rewards',
          'Bold warning text that amplifies the perceived severity of downgrades',
          'Small, understated descriptions of realistic outcomes buried below dramatic claims',
          'Exclamation-heavy copy that inflates emotional intensity artificially',
        ],
      },
      color: {
        level: ImpactLevel.HIGH,
        description:
          'Color palettes trigger emotional responses that amplify or moderate impact bias',
        examples: [
          'Aggressive red in cancellation flows that exaggerates the pain of leaving',
          'Euphoric green and gold on upgrade pages that overpromise emotional rewards',
          'Neutral, calming tones in change communication to counter unnecessary panic',
          'High-contrast before/after color schemes that exaggerate transformation',
        ],
      },
      interaction: {
        level: ImpactLevel.CRITICAL,
        description:
          'Interactive patterns shape how users predict and experience emotional reactions to actions',
        examples: [
          'Multi-step cancellation flows that accumulate dread beyond what the actual loss warrants',
          'Instant gratification animations on upgrade that set unsustainable emotional expectations',
          'Preview modes that show idealized versions of premium features',
          'Confirmation dialogs with emotional language that amplifies anxiety about irreversible actions',
        ],
      },
      content: {
        level: ImpactLevel.CRITICAL,
        description:
          'Content framing is the primary driver of impact bias in product experiences',
        examples: [
          'Upgrade copy that promises life-changing results instead of incremental improvements',
          'Cancellation warnings that list every possible negative outcome without probability context',
          'Testimonials selected for maximum emotional intensity rather than typical outcomes',
          'Change announcements that frame migrations as either disasters or miracles',
        ],
      },
      accessibility: {
        level: ImpactLevel.MEDIUM,
        description:
          'Emotional framing in content must be accessible and not rely solely on visual emotional cues',
        examples: [
          'Screen readers conveying emotional intensity through text alone, which may hit differently than visual cues',
          'Color-based emotional signals (red warnings, green success) needing text equivalents',
          'Animated celebrations or warning effects that are invisible to non-visual users',
          'Alt text that carries emotional weight needs careful calibration to avoid bias amplification',
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
        title: 'Realistic Feature Preview with Measurable Benefits',
        description:
          'SaaS upgrade page showing concrete, quantified benefits instead of emotional promises',
        code: `<div class="upgrade-preview">
  <h3>Pro Plan Benefits</h3>
  <div class="benefit-list">
    <div class="benefit">
      <span class="icon">&#x23F1;</span>
      <div>
        <strong>Save ~5 hours per week</strong>
        <p>Automated reports replace manual data pulling.
        Based on average across 1,200 Pro users.</p>
      </div>
    </div>
    <div class="benefit">
      <span class="icon">&#x1F4CA;</span>
      <div>
        <strong>3 additional dashboard views</strong>
        <p>Funnel analysis, cohort tracking, and custom metrics.
        Most users activate 2 of 3 within the first month.</p>
      </div>
    </div>
  </div>
  <p class="realistic-note">
    Most users see measurable workflow improvement within 2 weeks.
  </p>
  <button class="primary">Start 14-day free trial</button>
</div>`,
        explanation:
          'Instead of promising emotional transformation, this preview focuses on specific, measurable outcomes with realistic timelines. The "based on average" qualifier prevents inflated expectations.',
        principle:
          'Concrete, quantified benefits set realistic expectations that reduce post-purchase disappointment',
        metrics: {
          before: '28% upgrade conversion, 18% churned within 30 days (disappointed)',
          after: '24% upgrade conversion, 8% churned within 30 days (satisfied)',
          improvement: '56% reduction in early churn; higher LTV despite slightly lower initial conversion',
        },
      },
      {
        title: 'Honest Downgrade Communication',
        description:
          'Cancellation flow showing actual usage data instead of emotional loss framing',
        code: `<dialog class="downgrade-review">
  <h3>Your Pro Usage This Month</h3>
  <div class="usage-summary">
    <div class="usage-item">
      <span class="feature">Automated Reports</span>
      <span class="usage">Used 12 times</span>
      <span class="note">Will require manual export on Free plan</span>
    </div>
    <div class="usage-item">
      <span class="feature">Custom Dashboards</span>
      <span class="usage">Used 3 times</span>
      <span class="note">Will be view-only on Free plan</span>
    </div>
    <div class="usage-item inactive">
      <span class="feature">Priority Support</span>
      <span class="usage">Not used</span>
      <span class="note">Standard support (48h response) on Free plan</span>
    </div>
  </div>
  <p class="factual-note">
    You'll keep all your data. You can re-upgrade anytime.
  </p>
  <div class="actions">
    <button class="secondary">Stay on Pro</button>
    <button class="primary">Switch to Free</button>
  </div>
</dialog>`,
        explanation:
          'Shows factual usage data so users can make informed decisions. No emotional manipulation, no exaggerated loss framing. Users who stay do so because they see genuine value, not because of manufactured fear.',
        principle:
          'Factual usage data respects user autonomy and counteracts impact bias in both directions',
      },
      {
        title: 'Balanced Change Announcement',
        description:
          'Product update notification that acknowledges disruption without catastrophizing',
        code: `<div class="change-announcement">
  <h3>New Editor Launching March 15</h3>
  <div class="transition-info">
    <div class="what-changes">
      <h4>What's changing</h4>
      <ul>
        <li>New toolbar layout (shortcuts remain the same)</li>
        <li>Updated color picker with recent colors</li>
        <li>Revised export menu with more options</li>
      </ul>
    </div>
    <div class="adaptation-data">
      <h4>From our beta testers</h4>
      <p><strong>89% felt comfortable within 3 days</strong></p>
      <p>Average adjustment period: 2.5 days</p>
      <blockquote>
        "I was nervous about the change but adapted faster than expected."
        <cite>— Beta tester, 4-year user</cite>
      </blockquote>
    </div>
  </div>
  <div class="actions">
    <button class="primary">Preview new editor</button>
    <button class="secondary">Learn more</button>
  </div>
</div>`,
        explanation:
          'Directly addresses the emotional prediction users make about change disruption. Beta tester data shows rapid adaptation, countering the tendency to overestimate how long adjustment will take.',
        principle:
          'Adaptation evidence from peers directly counters impact bias about change disruption',
        metrics: {
          before: '34% of users delayed migration, citing "too disruptive"',
          after: '12% delayed migration after seeing adaptation data',
          improvement: '65% reduction in migration resistance',
        },
      },
    ],

    bad: [
      {
        title: 'Overpromising Upgrade Emotional Impact',
        description:
          'Upgrade page using extreme emotional language to inflate expected benefit',
        code: `<!-- DON'T DO THIS -->
<div class="upgrade-hero">
  <h2 style="font-size: 3em;">TRANSFORM Your Entire Workflow!</h2>
  <p style="font-size: 1.5em; color: #22c55e;">
    Upgrading to Pro will COMPLETELY CHANGE how you work.
    You'll wonder how you EVER lived without it!
  </p>
  <div class="emotion-badges">
    <span class="badge">&#x1F929; Mind-Blowing</span>
    <span class="badge">&#x1F680; Revolutionary</span>
    <span class="badge">&#x2764; Life-Changing</span>
  </div>
  <button class="mega-cta">UPGRADE NOW AND FEEL AMAZING!</button>
</div>`,
        explanation:
          'Extreme emotional promises exploit impact bias by inflating expected emotional payoff far beyond reality. Users who upgrade expecting a "life-changing" experience will be disappointed by incremental improvements, leading to churn and negative word-of-mouth.',
        principle:
          'Inflating emotional expectations guarantees post-purchase disappointment and destroys trust',
      },
      {
        title: 'Fear-Mongering Cancellation Flow',
        description:
          'Cancellation flow that exaggerates negative emotional consequences of downgrading',
        code: `<!-- DON'T DO THIS -->
<dialog class="cancel-warning">
  <h2 style="color: red; font-size: 2em;">Are You SURE?!</h2>
  <div class="doom-list">
    <p style="color: red;">If you cancel, you will LOSE:</p>
    <ul>
      <li>ALL your custom dashboards (GONE FOREVER!)</li>
      <li>EVERY automation you've built (DESTROYED!)</li>
      <li>Your ENTIRE history of insights (ERASED!)</li>
      <li>Priority support (YOU'LL BE ON YOUR OWN!)</li>
    </ul>
  </div>
  <p>Your team will be DEVASTATED. Projects will FAIL.</p>
  <button class="danger">I understand I'm making a TERRIBLE mistake</button>
</dialog>`,
        explanation:
          'Exploits impact bias by dramatically exaggerating the emotional and practical consequences of cancelling. The inflammatory language is designed to trigger maximum loss aversion rather than help users make an informed decision.',
        principle:
          'Fear-based retention exploits impact bias and destroys trust even with users who stay',
      },
      {
        title: 'Exaggerated Feature Comparison',
        description:
          'Feature comparison table that dramatizes the gap between free and paid',
        code: `<!-- DON'T DO THIS -->
<table class="comparison">
  <tr>
    <th></th>
    <th style="color: #999;">Free (Sad)</th>
    <th style="color: gold; font-size: 1.3em;">Pro (Amazing!)</th>
  </tr>
  <tr>
    <td>Reports</td>
    <td style="color: red;">Basic (boring)</td>
    <td style="color: green;">Advanced (stunning!)</td>
  </tr>
  <tr>
    <td>Support</td>
    <td style="color: red;">Slow (frustrating)</td>
    <td style="color: green;">Instant (delightful!)</td>
  </tr>
  <tr>
    <td>Experience</td>
    <td style="color: red;">Mediocre</td>
    <td style="color: green;">INCREDIBLE!</td>
  </tr>
</table>`,
        explanation:
          'Adding emotional adjectives to factual feature comparisons inflates the predicted emotional difference between tiers. "Basic" becomes "boring", "Advanced" becomes "stunning!" — creating unrealistic emotional expectations for the paid tier and unfair denigration of the free tier.',
        principle:
          'Emotional adjectives in feature comparisons exploit impact bias to create false emotional contrast',
      },
    ],

    realWorld: [
      {
        company: 'Apple',
        product: 'App Store Descriptions',
        description: 'Many App Store descriptions overpromise emotional impact: "This app will transform your life!" or "You\'ll never go back!" These exploit impact bias by inflating expected emotional payoff, leading to high download rates but poor retention when reality falls short.',
        effectiveness: 'somewhat-effective',
        analysis: 'Short-term downloads increase but long-term retention suffers. Apps with realistic descriptions tend to have better ratings and lower uninstall rates, as users\' expectations align with actual experience.',
      },
      {
        company: 'Tesla',
        product: 'Car Buying Experience',
        description: 'Tesla\'s configurator lets buyers build their dream car, visualizing the emotional high of ownership. Research shows buyers overestimate how long the new-car euphoria will last, often experiencing hedonic adaptation within weeks of delivery.',
        effectiveness: 'effective',
        analysis: 'The configurator effectively leverages impact bias to drive purchases, but Tesla\'s ongoing software updates help sustain novelty beyond initial purchase euphoria, partially counteracting hedonic adaptation.',
      },
      {
        company: 'Spotify',
        product: 'Premium Upgrade Page',
        description: 'Spotify\'s upgrade page focuses on concrete, functional benefits: "Download music for offline listening", "No ad interruptions", "Higher audio quality". This factual approach sets realistic expectations rather than promising emotional transformation.',
        effectiveness: 'very-effective',
        analysis: 'By framing premium benefits as specific, tangible capabilities rather than emotional promises, Spotify reduces post-upgrade disappointment. Users get exactly what they expected, leading to strong retention.',
      },
      {
        company: 'Slack',
        product: 'Plan Comparison Page',
        description: 'Slack\'s pricing page uses factual feature comparison (message history limits, integrations, admin controls) without emotional inflation. The comparison table presents facts that let users predict actual utility rather than emotional impact.',
        effectiveness: 'very-effective',
        analysis: 'Slack avoids impact bias exploitation by framing upgrades in functional terms. This results in higher satisfaction among upgraders because expectations match reality.',
      },
    ],

    abTests: [
      {
        title: 'Upgrade Page: Emotional vs Factual Benefit Framing',
        hypothesis:
          'Factual benefit framing will produce lower initial conversion but higher 30-day retention than emotional framing',
        controlVersion: {
          description:
            'Upgrade page with emotional copy: "Transform your workflow! You\'ll LOVE the Pro experience! It changes everything!"',
          metrics: {
            conversionRate: '9.2%',
            thirtyDayRetention: '71%',
            npsScore: '32',
          },
        },
        treatmentVersion: {
          description:
            'Upgrade page with factual copy: "Save ~5 hours/week on reports. 3 new dashboard types. Most users see results within 2 weeks."',
          metrics: {
            conversionRate: '7.8%',
            thirtyDayRetention: '89%',
            npsScore: '58',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Emotional framing converted 18% more initially, but factual framing retained 25% more users at 30 days and scored 81% higher NPS. Lifetime value of factual-framing cohort was 34% higher due to reduced churn.',
          learnings: [
            'Emotional promises inflate expectations beyond what the product delivers',
            'Factual framing attracts users whose needs actually match the product',
            'Post-purchase satisfaction correlates strongly with pre-purchase expectation accuracy',
            'LTV is a better metric than conversion rate for measuring upgrade page effectiveness',
          ],
        },
      },
      {
        title: 'Cancellation Flow: Fear-Based vs Data-Based Retention',
        hypothesis:
          'Showing actual usage data will retain more users than emotional loss warnings',
        controlVersion: {
          description:
            'Cancellation flow with emotional warnings: "You\'ll lose all your work! Your team will be affected! Don\'t make this mistake!"',
          metrics: {
            retentionRate: '41%',
            userSatisfaction: '2.1/5',
            supportTickets: '23 per 100 cancellations',
          },
        },
        treatmentVersion: {
          description:
            'Cancellation flow showing personal usage data: "You used automated reports 12 times, custom dashboards 3 times, priority support 0 times this month"',
          metrics: {
            retentionRate: '38%',
            userSatisfaction: '4.2/5',
            supportTickets: '5 per 100 cancellations',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Fear-based flow retained 3% more users initially, but those retained users had 2x higher churn in the following month and generated 4.6x more support tickets. Data-based flow produced more durable retention and dramatically higher satisfaction.',
          learnings: [
            'Fear-based retention is short-lived; users who stay out of fear leave soon after',
            'Usage data helps users make genuinely informed decisions',
            'Users who choose to stay after seeing data are more committed long-term',
            'Respectful cancellation flows reduce negative word-of-mouth',
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
        name: 'Emotional Intensity in Benefits',
        description: 'Upgrade or feature pages using extreme emotional language ("AMAZING!", "LIFE-CHANGING!", "INCREDIBLE!") to describe benefits',
        howToSpot: 'Look for all-caps words, excessive exclamation marks, superlatives, and emotional adjectives in benefit descriptions',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Exaggerated Consequence Warnings',
        description: 'Cancellation, downgrade, or deletion flows using dramatic loss language beyond what the actual consequences warrant',
        howToSpot: 'Check for red text, dramatic icons, and catastrophizing language in warning dialogs and confirmation steps',
        severity: ImpactLevel.CRITICAL,
      },
      {
        name: 'Over-the-Top Success Imagery',
        description: 'Upgrade and premium pages using euphoric imagery, celebrations, or transformation narratives',
        howToSpot: 'Look for confetti animations, trophy icons, before/after dramatic contrasts, and hero images suggesting transformation',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Emotional Feature Comparisons',
        description: 'Comparison tables that add emotional adjectives to factual feature differences',
        howToSpot: 'Check feature comparison tables for loaded adjectives (e.g., "basic (boring)" vs "advanced (stunning!)")',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Inflated Testimonials',
        description: 'Testimonials selected for maximum emotional intensity rather than representativeness',
        howToSpot: 'Look for testimonials that focus on emotional transformation rather than specific outcomes, especially without context like "results not typical"',
        severity: ImpactLevel.MEDIUM,
      },
    ],

    patterns: [
      {
        name: 'Emotional Inflation Pattern',
        description: 'Benefit messaging that focuses on predicted emotional states rather than functional outcomes',
        indicators: ['Emotional adjectives in feature descriptions', '"You\'ll love/feel/experience" language', 'Transformation narratives without specifics', 'Superlatives without supporting data'],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Fear Amplification Pattern',
        description: 'Loss and downgrade messaging that exaggerates emotional consequences beyond factual impact',
        indicators: ['All-caps loss warnings', 'Multiple confirmation steps with escalating emotional language', 'Dramatic color coding (red) in cancellation flows', 'Catastrophizing copy about consequences'],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Expectation Mismatch Pattern',
        description: 'Pre-purchase promises that do not align with post-purchase reality',
        indicators: ['Dramatic before/after framing', 'Outlier testimonials presented as typical', 'Vague benefit claims without measurable specifics', 'Missing realistic timelines for seeing results'],
        severity: ImpactLevel.HIGH,
        confidence: 'medium',
      },
      {
        name: 'Hedonic Treadmill Neglect Pattern',
        description: 'Product messaging that implies permanent emotional uplift from purchases or upgrades',
        indicators: ['Claims of lasting transformation from single features', 'No mention of learning curves or adaptation periods', 'Upgrade pages with permanence language ("forever", "always")', 'Missing progressive engagement or evolving value'],
        severity: ImpactLevel.MEDIUM,
        confidence: 'medium',
      },
    ],

    checklistQuestions: [
      'Does the benefit messaging promise emotional transformation or functional improvement?',
      'Are upgrade benefits described with measurable, specific outcomes?',
      'Does the cancellation flow use factual usage data or emotional loss language?',
      'Are feature comparison tables factual or emotionally loaded?',
      'Do testimonials represent typical outcomes or cherry-picked emotional peaks?',
      'Is there a realistic timeline for when users will see benefits?',
      'Does the design acknowledge adaptation periods for changes?',
      'Are consequence warnings proportional to actual impact?',
      'Does post-purchase onboarding set realistic expectations?',
      'Is there evidence of emotional inflation in any marketing or upgrade copy?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in impact bias (affective forecasting errors).

Analyze the provided design for impact bias patterns. Identify:

1. **Emotional Inflation**: Where benefit messaging promises outsized emotional payoff
2. **Fear Amplification**: Where loss/downgrade messaging exaggerates negative emotional impact
3. **Expectation Mismatch**: Where pre-action promises likely diverge from post-action reality
4. **Adaptation Neglect**: Where the design ignores hedonic adaptation and adjustment periods
5. **Balanced Framing**: Where the design correctly calibrates emotional expectations

For each pattern found:
- Identify the specific emotional claim or framing
- Assess whether the predicted emotional impact matches likely reality
- Determine if it exploits or corrects for impact bias
- Evaluate whether users will be satisfied or disappointed post-action
- Suggest improvements for honest emotional framing

Consider:
- Are upgrade benefits framed as emotional transformation or functional improvement?
- Do cancellation flows use factual data or emotional manipulation?
- Are testimonials representative or cherry-picked for emotional impact?
- Does onboarding set realistic expectations and timelines?
- Is there a gap between what is promised and what is delivered?

Provide actionable recommendations for honest, effective emotional framing.`,

    outputSchema: {
      type: 'object',
      properties: {
        impactBiasPatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              emotionalClaim: { type: 'string' },
              likelyReality: { type: 'string' },
              mismatchSeverity: { type: 'string' },
              exploitsOrCorrects: { type: 'string' },
              ethical: { type: 'boolean' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'emotionalClaim',
              'likelyReality',
              'ethical',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            emotionalInflationScore: { type: 'number' },
            expectationAccuracy: { type: 'number' },
            postActionSatisfactionRisk: { type: 'number' },
            ethicalScore: { type: 'number' },
          },
          required: [
            'emotionalInflationScore',
            'expectationAccuracy',
            'postActionSatisfactionRisk',
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
        'impactBiasPatterns',
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
        title: 'Audit Emotional Language in Messaging',
        description:
          'Review all upgrade, downgrade, and change messaging for emotional inflation or fear amplification',
        example:
          'Flag copy that uses "transform", "life-changing", "devastating", "terrible mistake" and replace with specific, measurable claims',
        tips: [
          'Search for superlatives, all-caps, and excessive exclamation marks',
          'Check both positive (upgrade) and negative (cancellation) flows',
          'Compare what is promised with what users actually experience',
        ],
      },
      {
        step: 2,
        title: 'Replace Emotional Promises with Measurable Benefits',
        description:
          'Reframe benefit messaging around concrete, quantified outcomes users can verify',
        example:
          'Change "You\'ll LOVE our Pro reports!" to "Pro reports save an average of 5 hours/week based on 1,200 users"',
        tips: [
          'Use real usage data to back up claims',
          'Include realistic timelines for seeing results',
          'Qualify claims with sample sizes and conditions',
        ],
      },
      {
        step: 3,
        title: 'Use Factual Data in Retention Flows',
        description:
          'Replace emotional loss framing in cancellation flows with personal usage data',
        example:
          'Show "You used Feature X 12 times this month" instead of "You\'ll lose access to the feature you LOVE!"',
        tips: [
          'Pull actual usage metrics for each user',
          'Present consequences factually without emotional loading',
          'Allow users to make informed, autonomous decisions',
        ],
      },
      {
        step: 4,
        title: 'Provide Adaptation Evidence for Changes',
        description:
          'When communicating product changes, include data showing how quickly users adapt',
        example:
          'Include beta tester adaptation timelines: "89% felt comfortable within 3 days"',
        tips: [
          'Run beta programs to gather real adaptation data',
          'Feature quotes from long-time users who adapted successfully',
          'Provide preview modes so users can experience changes before commitment',
        ],
      },
      {
        step: 5,
        title: 'Set Progressive Engagement Expectations',
        description:
          'Design onboarding that builds realistic expectations over time rather than front-loading excitement',
        example:
          'Week 1: "Set up your first dashboard." Week 2: "Most users see workflow improvements around now." Week 4: "Time to explore advanced features."',
        tips: [
          'Map realistic milestones to actual user journeys',
          'Celebrate real progress rather than artificial achievements',
          'Acknowledge learning curves honestly',
        ],
      },
    ],

    dos: [
      'Use specific, measurable benefit claims backed by data',
      'Show personal usage data in downgrade and cancellation flows',
      'Include realistic timelines for when users will see results',
      'Provide adaptation evidence from beta testers or early adopters when communicating changes',
      'Set progressive engagement milestones that evolve with user maturity',
      'Frame upgrades in terms of functional improvement, not emotional transformation',
      'Qualify testimonials with representative context',
      'Design post-purchase onboarding that aligns with realistic expectations',
    ],

    donts: [
      'Don\'t use extreme emotional language to inflate upgrade benefits',
      'Don\'t use fear-based messaging to prevent cancellations',
      'Don\'t add emotional adjectives to factual feature comparisons',
      'Don\'t select testimonials solely for emotional intensity',
      'Don\'t promise permanent emotional transformation from product features',
      'Don\'t catastrophize the consequences of downgrades or changes',
      'Don\'t ignore hedonic adaptation when setting expectations',
      'Don\'t use dramatic visual treatments (red, all-caps) to amplify loss aversion in retention flows',
    ],

    bestPractices: [
      {
        title: 'Honest Emotional Framing',
        description:
          'Frame benefits and consequences accurately, matching predicted emotional impact to likely actual experience',
        rationale:
          'Users whose expectations match reality have higher satisfaction, retention, and NPS',
        example:
          '"Most users report a noticeable improvement in workflow efficiency within 2 weeks" instead of "This will TRANSFORM your life!"',
      },
      {
        title: 'Factual Retention over Emotional Retention',
        description:
          'Use personal usage data and factual consequences in cancellation flows instead of emotional manipulation',
        rationale:
          'Users retained through facts are more committed; users retained through fear churn quickly and generate support burden',
        example:
          'Show "You used automated reports 12 times this month" rather than "You\'ll LOSE everything!"',
      },
      {
        title: 'Adaptation Evidence in Change Communication',
        description:
          'Include data from beta testers or early adopters showing how quickly people adapt to changes',
        rationale:
          'Users overestimate how disruptive changes will be; concrete adaptation data counteracts this bias',
        example:
          '"89% of beta testers felt comfortable with the new editor within 3 days" alongside a preview mode',
      },
      {
        title: 'Progressive Expectation Setting',
        description:
          'Build onboarding journeys that set and meet realistic expectations at each stage',
        rationale:
          'Front-loaded excitement leads to disappointment; progressive milestones sustain engagement through real achievement',
        example:
          'Week 1: Setup. Week 2: First results. Month 1: Advanced usage. Each milestone aligns with real user data.',
      },
      {
        title: 'Representative Testimonials',
        description:
          'Select and present testimonials that represent typical outcomes, not just peak emotional experiences',
        rationale:
          'Outlier testimonials set expectations the product cannot meet for most users',
        example:
          'Feature a range of testimonials with specific outcomes and include "Average results across N users" context',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships - Ensure emotional framing in content is conveyed through structure, not just visual styling',
        implementation:
          'Use semantic HTML and ARIA labels so that emotional emphasis (bold, color, size) has text equivalents for screen reader users',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.4.1',
        guideline:
          'Use of Color - Don\'t rely solely on color to convey emotional intensity of warnings or benefits',
        implementation:
          'Pair red warnings and green success indicators with text labels and icons, ensuring color-blind users receive the same emotional calibration',
      },
      {
        wcagLevel: 'AA',
        criterion: '3.3.2',
        guideline:
          'Labels or Instructions - Provide clear, factual descriptions of consequences for user actions',
        implementation:
          'Ensure all confirmation dialogs and warning screens have clear, factual text descriptions of what will happen, not just emotional appeals',
      },
    ],

    ethics: [
      {
        concern: 'Emotional Manipulation in Upgrades',
        severity: 'high',
        explanation:
          'Using inflated emotional promises to drive upgrade conversions exploits impact bias, setting expectations the product cannot meet',
        mitigation:
          'Frame upgrade benefits in specific, measurable terms. Track post-upgrade satisfaction and adjust messaging to match reality.',
      },
      {
        concern: 'Fear-Based Retention',
        severity: 'critical',
        explanation:
          'Using dramatic loss language and catastrophizing in cancellation flows to prevent users from leaving',
        mitigation:
          'Show factual usage data and present consequences accurately. Respect user autonomy and make cancellation straightforward.',
      },
      {
        concern: 'Unrealistic Expectation Setting',
        severity: 'high',
        explanation:
          'Marketing and onboarding that promises emotional transformation leads to disappointment and erodes trust',
        mitigation:
          'Set progressive, realistic expectations. Use actual user data to calibrate claims. Qualify testimonials with representative context.',
      },
      {
        concern: 'Change Resistance Exploitation',
        severity: 'medium',
        explanation:
          'Exploiting users\' tendency to overestimate change disruption to avoid making necessary product improvements',
        mitigation:
          'Provide adaptation evidence, preview modes, and gradual rollouts. Show that most users adapt faster than they expect.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'Miswanting: Some Problems in the Forecasting of Future Affective States',
        author: 'Gilbert, D. T., & Wilson, T. D.',
        year: 2000,
        description:
          'Foundational paper on affective forecasting errors including impact bias, demonstrating systematic misprediction of emotional reactions',
        type: 'foundational',
      },
      {
        title: 'Immune Neglect: A Source of Durability Bias in Affective Forecasting',
        author: 'Gilbert, D. T., Pinel, E. C., Wilson, T. D., Blumberg, S. J., & Wheatley, T. P.',
        year: 1998,
        doi: '10.1037/0022-3514.75.3.617',
        description:
          'Demonstrates that people fail to account for their psychological immune system when predicting emotional reactions to future events',
        type: 'foundational',
      },
      {
        title: 'Focalism: A Source of Durability Bias in Affective Forecasting',
        author: 'Wilson, T. D., Wheatley, T., Meyers, J. M., Gilbert, D. T., & Axsom, D.',
        year: 2000,
        doi: '10.1037/0022-3514.78.5.821',
        description:
          'Shows that focalism (focusing too narrowly on a future event) is a key mechanism driving impact bias',
        type: 'advanced',
      },
      {
        title: 'Affective Forecasting: Knowing What to Want',
        author: 'Wilson, T. D., & Gilbert, D. T.',
        year: 2005,
        doi: '10.1111/j.0963-7214.2005.00355.x',
        description:
          'Comprehensive review of affective forecasting research, including impact bias and its implications for decision-making',
        type: 'foundational',
      },
    ],

    books: [
      {
        title: 'Stumbling on Happiness',
        author: 'Gilbert, Daniel',
        year: 2006,
        isbn: '9781400077427',
        description:
          'Accessible exploration of how humans mispredict what will make them happy, with extensive coverage of impact bias',
        type: 'foundational',
      },
      {
        title: 'Thinking, Fast and Slow',
        author: 'Kahneman, Daniel',
        year: 2011,
        isbn: '9780374275631',
        description:
          'Chapter on affective forecasting errors and how they influence decision-making and well-being predictions',
        type: 'foundational',
      },
    ],

    articles: [
      {
        title: 'The Surprising Science of Happiness',
        author: 'Gilbert, Daniel',
        url: 'https://www.ted.com/talks/dan_gilbert_the_surprising_science_of_happiness',
        description:
          'TED talk covering impact bias, the psychological immune system, and why we systematically mispredirect emotional futures',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'Dan Gilbert: Why We Make Bad Decisions',
        author: 'TED',
        url: 'https://www.ted.com/talks/dan_gilbert_why_we_make_bad_decisions',
        description:
          'Explores how impact bias and other forecasting errors lead to poor decision-making',
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
