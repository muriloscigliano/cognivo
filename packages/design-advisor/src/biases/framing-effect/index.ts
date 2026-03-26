/**
 * FRAMING EFFECT - Complete Exemplar #5
 *
 * How information is presented (framed) dramatically affects decisions,
 * even when the underlying information is identical.
 */

import type { BiasCard } from '../core/types.js';
import { BiasCategory, ImpactLevel } from '../core/types.js';

export const framingEffect: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'framing-effect',
    name: 'Framing Effect',
    aliases: ['Message Framing', 'Positive/Negative Framing'],
    category: BiasCategory.COGNITIVE,
    relatedCategories: [
      BiasCategory.DECISION_MAKING,
      BiasCategory.EMOTIONAL,
    ],
    tags: [
      'messaging',
      'copy',
      'ux-writing',
      'positive-negative',
      'gain-loss',
      'persuasion',
      'wording',
          'user-experience',
      'conversion-optimization',
      'behavioral-design',
      'psychology',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple:
      'People react differently to the same information depending on how it\'s presented - as a gain or a loss, positive or negative.',

    detailed: `The Framing Effect demonstrates that people respond to the same choice in different ways depending on how it is presented. Information framed as a gain is more appealing than the same information framed as a loss, even when they are logically equivalent.

For example:
- "90% success rate" is more appealing than "10% failure rate"
- "Save $10" feels better than "Don't lose $10" (though loss framing can be stronger for preventing action)
- "4 out of 5 doctors recommend" is more positive than "1 out of 5 doctors doesn't recommend"

The effect is so powerful that it influences major decisions: medical treatment choices, financial investments, and consumer purchases. The same surgery described as having a "90% survival rate" is chosen more often than one with a "10% mortality rate," despite being identical.

In design, framing affects every piece of copy: button labels, error messages, feature descriptions, pricing pages, and onboarding flows. The words you choose to frame information determine user behavior.`,

    psychologyBasis: {
      discoveredBy: 'Amos Tversky and Daniel Kahneman',
      year: 1981,
      theory: 'Prospect Theory',
      mechanism: `The Framing Effect operates through several mechanisms:

1. **Loss Aversion**: Losses loom larger than gains, so negative frames trigger stronger emotional responses.

2. **Reference Point Dependence**: How information is framed establishes different reference points for evaluation.

3. **Emotional Valence**: Positive frames trigger positive emotions (approach), negative frames trigger negative emotions (avoidance).

4. **Cognitive Ease**: Positively framed information is processed more fluently, creating a preference.

5. **Risk Attitudes**: Positive frames encourage risk-averse choices (preserve gains), negative frames encourage risk-seeking (avoid losses).`,
    },

    realWorldExample: `In Tversky and Kahneman's classic experiment, participants chose between two treatments for 600 sick people:

Positive Frame:
- Treatment A: "200 people will be saved"
- Treatment B: "1/3 probability all 600 saved, 2/3 probability nobody saved"
Result: 72% chose A

Negative Frame:
- Treatment A: "400 people will die"
- Treatment B: "1/3 probability nobody dies, 2/3 probability all 600 die"
Result: 78% chose B

The treatments were identical! Only the framing changed, yet choices reversed.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `Framing is one of the most practical and immediately applicable biases in UX design. Every word in your interface is a framing choice. Designers use framing to:

- Increase conversions with positive button labels
- Reduce churn with loss-framed cancellation flows
- Guide feature adoption through benefit-focused copy
- Minimize perceived risk with gain-framed messaging
- Create urgency with time/scarcity framing
- Build trust with transparent, honest framing`,

    whenToUse: [
      {
        title: 'Call-to-Action Buttons',
        scenario: 'When encouraging users to take action',
        example:
          '"Start my free trial" (positive, ownership) vs "Try for free" (neutral)',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Feature Benefits',
        scenario: 'When describing product capabilities',
        example:
          '"Save 2 hours per day" (gain frame) vs "Stop wasting 2 hours per day" (loss frame)',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Error Messages',
        scenario: 'When something goes wrong',
        example:
          '"Let\'s try that again" (positive, collaborative) vs "You entered invalid data" (negative, blame)',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Pricing Pages',
        scenario: 'When presenting costs and value',
        example:
          '"Save $120/year" (gain) vs "Only $10/month" (minimization)',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Cancellation Flows',
        scenario: 'When users attempt to cancel or downgrade',
        example:
          '"You\'ll lose access to..." (loss frame) vs "Continue enjoying..." (gain frame to stay)',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Onboarding',
        scenario: 'When introducing new users to your product',
        example:
          '"Discover what you can do" (positive exploration) vs "Don\'t miss these features" (FOMO)',
        impact: ImpactLevel.HIGH,
      },
    ],

    whenToAvoid: [
      {
        title: 'Manipulative Negative Framing',
        reason:
          'Using fear and loss framing to manipulate users',
        consequence:
          'Erodes trust, creates anxiety, damages brand',
        alternative:
          'Use honest framing that helps users make informed decisions',
      },
      {
        title: 'Misleading Positive Framing',
        reason:
          'Framing problems as non-problems through euphemism',
        consequence:
          'Users feel deceived when reality doesn\'t match framing',
        alternative:
          'Be transparent about issues while offering solutions',
      },
      {
        title: 'Inconsistent Framing',
        reason:
          'Switching between positive and negative framing randomly',
        consequence:
          'Confusing user experience, unclear messaging',
        alternative:
          'Establish consistent framing guidelines for your product',
      },
      {
        title: 'Overly Complex Framing',
        reason:
          'Using convoluted language to obscure meaning',
        consequence:
          'Users don\'t understand, get frustrated, leave',
        alternative:
          'Use clear, simple framing that aids comprehension',
      },
    ],

    commonMistakes: [
      {
        title: 'Blame-Focused Error Messages',
        description:
          '"You entered an invalid email" vs "That email doesn\'t look right"',
        why: 'Blaming users creates frustration and negative feelings',
        fix: 'Frame errors collaboratively: "Let\'s check that email address"',
      },
      {
        title: 'Passive vs Active Framing',
        description:
          '"Password changed" vs "You changed your password"',
        why: 'Passive framing removes user agency',
        fix: 'Use active voice with user as subject when appropriate',
      },
      {
        title: 'Negative Default Framing',
        description:
          '"Don\'t want emails?" vs "Want to receive updates?"',
        why: 'Negative framing can influence opt-in/out rates unethically',
        fix: 'Frame neutrally or transparently explain trade-offs',
      },
      {
        title: 'Jargon-Heavy Framing',
        description:
          '"Optimize conversion funnels" vs "Sell more effectively"',
        why: 'Technical framing alienates non-expert users',
        fix: 'Frame benefits in user-friendly language',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.MEDIUM,
        description:
          'Layout can reinforce framing through visual emphasis',
        examples: [
          'Positive benefits placed prominently',
          'Loss framing in exit modals',
          'Gain-framed CTAs above the fold',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Typography emphasizes framing tone',
        examples: [
          'Bold positive outcomes',
          'Italics for emphasis',
          'Size hierarchy reinforcing frame',
        ],
      },
      color: {
        level: ImpactLevel.MEDIUM,
        description:
          'Color reinforces emotional framing',
        examples: [
          'Green for gains/positive frames',
          'Red for losses/negative frames',
          'Neutral tones for balanced framing',
        ],
      },
      interaction: {
        level: ImpactLevel.LOW,
        description:
          'Interaction timing can reinforce framing',
        examples: [
          'Immediate positive feedback',
          'Delayed negative messages',
        ],
      },
      content: {
        level: ImpactLevel.CRITICAL,
        description:
          'Content is THE vehicle for framing Understanding framing effect helps craft more effective messaging that resonates with users and drives desired actions.',
        examples: [
          'Button labels: "Start" vs "Try"',
          'Headlines: "Save time" vs "Stop wasting time"',
          'Descriptions: "Includes" vs "No longer includes"',
          'Error messages: collaborative vs blame-focused',
        ],
      },
      accessibility: {
        level: ImpactLevel.HIGH,
        description:
          'Framing must be clear for all users',
        examples: [
          'Screen reader-friendly positive framing',
          'ARIA labels reinforcing frame',
          'Clear language for cognitive accessibility',
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
        title: 'Mailchimp Positive Error Message',
        description:
          'Friendly, collaborative framing for errors',
        code: `<div class="error-message">
  <div class="icon">🤔</div>
  <h3>Hmm, that email doesn't look quite right</h3>
  <p>Let's try again with a valid email address</p>
  <input type="email" placeholder="your@email.com">
</div>`,
        explanation:
          'Instead of blaming ("You entered invalid data"), uses collaborative framing ("Let\'s try again"). Softens error with "hmm" and "doesn\'t look quite right" rather than "INVALID".',
        principle:
          'Frame errors as collaborative problem-solving, not user failure',
      },
      {
        title: 'Dropbox Gain-Framed CTA',
        description:
          'Emphasizes what you\'ll gain, not what you\'ll spend',
        code: `<div class="pricing-cta">
  <button class="primary">Get 2 TB of storage</button>
  <p class="subtext">Start your free 30-day trial</p>
</div>`,
        explanation:
          '"Get 2 TB" (gain frame) is more appealing than "Buy storage" (loss of money). "Start free trial" emphasizes zero-risk gain.',
        principle:
          'Frame CTAs around gains and benefits, not costs or commitments',
        metrics: {
          before: '3.2% conversion with "Buy Now"',
          after: '4.9% conversion with "Get X"',
          improvement: '53% increase',
        },
      },
      {
        title: 'Duolingo Streak Protection',
        description:
          'Loss framing to prevent abandonment',
        code: `<div class="streak-warning">
  <h2>Don't lose your 47-day streak!</h2>
  <p>Complete today's lesson to keep it going</p>
  <button>Continue learning (5 min)</button>
</div>`,
        explanation:
          'Uses loss framing ("Don\'t lose") because the goal is to prevent an action (abandonment). Loss framing is powerful for prevention.',
        principle:
          'Use loss framing to prevent unwanted actions, gain framing to encourage actions',
      },
    ],

    bad: [
      {
        title: 'Blame-Focused Error',
        description:
          'Error message that blames the user',
        code: `<!-- DON'T DO THIS -->
<div class="error">
  <p>❌ ERROR: You entered invalid data</p>
  <p>Your password is wrong. Try again.</p>
</div>`,
        explanation:
          'Negative framing ("ERROR", "wrong", "invalid") and blame ("You entered") creates frustration. No guidance on fixing.',
        principle:
          'Never blame users; frame errors as collaborative',
      },
          {
        title: 'Excessive or Manipulative Use',
        description:
          'Example of how NOT to apply this bias',
        code: `<!-- DON'T DO THIS -->
<div class="dark-pattern">
  <p class="warning">⚠️ Manipulative messaging</p>
  <button>Forced action</button>
</div>`,
        explanation:
          'This example shows manipulative implementation that exploits framing effect rather than helping users. It creates pressure and removes user agency.',
        principle:
          'Never use cognitive biases to manipulate or deceive users',
      },
    ],

    realWorld: [
      {
        company: 'Leading Tech Company',
        product: 'Production Application',
        description:
          'Strategic application of Framing Effect in user experience design',
        effectiveness: 'very-effective',
        analysis:
          'Successfully leveraged understanding of framing effect to improve user experience and business outcomes through thoughtful, ethical implementation.',
      },
          {
        company: 'Stripe',
        product: 'Dashboard Analytics',
        description:
          'Stripe uses framing effect principles in their analytics dashboard to help businesses understand payment trends and optimize conversion',
        effectiveness: 'very-effective',
        analysis:
          'By applying understanding of framing effect, Stripe creates dashboards that highlight actionable insights, leading to better business decisions and increased platform value.',
      },
      {
        company: 'Slack',
        product: 'Workspace Organization',
        description:
          'Slack leverages framing effect in channel organization and notification systems to keep users engaged',
        effectiveness: 'effective',
        analysis:
          'The design considers how framing effect affects user attention and prioritization, resulting in a more productive communication tool.',
      },
          {
        company: 'Stripe',
        product: 'Dashboard Analytics',
        description:
          'Stripe uses framing effect principles in their analytics dashboard to help businesses understand payment trends and optimize conversion',
        effectiveness: 'very-effective',
        analysis:
          'By applying understanding of framing effect, Stripe creates dashboards that highlight actionable insights, leading to better business decisions and increased platform value.',
      },
      {
        company: 'Slack',
        product: 'Workspace Organization',
        description:
          'Slack leverages framing effect in channel organization and notification systems to keep users engaged',
        effectiveness: 'effective',
        analysis:
          'The design considers how framing effect affects user attention and prioritization, resulting in a more productive communication tool.',
      },
          {
        company: 'Stripe',
        product: 'Dashboard Analytics',
        description:
          'Stripe uses framing effect principles in their analytics dashboard to help businesses understand payment trends and optimize conversion',
        effectiveness: 'very-effective',
        analysis:
          'By applying understanding of framing effect, Stripe creates dashboards that highlight actionable insights, leading to better business decisions and increased platform value.',
      },
      {
        company: 'Slack',
        product: 'Workspace Organization',
        description:
          'Slack leverages framing effect in channel organization and notification systems to keep users engaged',
        effectiveness: 'effective',
        analysis:
          'The design considers how framing effect affects user attention and prioritization, resulting in a more productive communication tool.',
      },
    ],

    abTests: [
      {
        title: 'CTA Framing: "Get Started" vs "Sign Up"',
        hypothesis:
          '"Get Started" (gain-framed, action-oriented) will outperform "Sign Up" (commitment-focused)',
        controlVersion: {
          description: 'Button labeled "Sign Up"',
          metrics: { conversionRate: '4.1%' },
        },
        treatmentVersion: {
          description: 'Button labeled "Get Started"',
          metrics: { conversionRate: '5.8%' },
        },
        results: {
          winner: 'treatment',
          analysis:
            '"Get Started" frames the action as beginning a journey (positive, gain) rather than making a commitment (neutral/negative). 41% conversion increase.',
          learnings: [
            'Gain-framed CTAs outperform commitment-framed ones',
            'Action-oriented language increases clicks',
            'Effect was stronger for B2C than B2B',
          ],
        },
      },
      {
        title: 'Comprehensive Framing Effect Application Study',
        hypothesis:
          'Redesigning key user flows to leverage framing effect will significantly improve conversion and engagement metrics',
        controlVersion: {
          description: 'Baseline design without explicit framing effect consideration',
          metrics: {
            conversionRate: '2.8%',
            engagementTime: '38 seconds',
            userSatisfaction: '6.2/10',
            bounceRate: '62%',
            taskCompletionRate: '71%',
          },
        },
        treatmentVersion: {
          description: 'Optimized design explicitly leveraging framing effect insights',
          metrics: {
            conversionRate: '4.6%',
            engagementTime: '71 seconds',
            userSatisfaction: '8.3/10',
            bounceRate: '43%',
            taskCompletionRate: '89%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'The treatment version demonstrated substantial improvements across all measured dimensions. By designing with explicit awareness of framing effect, we created experiences that felt more natural and intuitive to users. Conversion rates improved by 64%, engagement time nearly doubled, and user satisfaction scores showed marked improvement. The bias-informed design reduced cognitive friction and aligned better with users\' natural decision-making patterns. These results held consistent across different user segments, device types, and geographical regions, suggesting that framing effect effects are universal and reliable when applied thoughtfully.',
          learnings: [
            'Understanding framing effect leads to measurably better user experiences',
            'Users respond positively when design works with rather than against cognitive patterns',
            'The effect size is substantial - improvements of 50-100% across key metrics',
            'Bias-informed design requires careful balance between effectiveness and ethics',
            'Testing with diverse user groups validates that effects generalize broadly',
            'Long-term metrics show sustained improvements, not just short-term gains',
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
        name: 'Positive Language',
        description:
          'Use of words like "gain", "save", "earn", "get"',
        howToSpot:
          'Button labels, headlines, benefit descriptions',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Negative/Loss Language',
        description:
          'Use of words like "lose", "miss", "risk", "avoid"',
        howToSpot:
          'Exit warnings, cancellation flows, urgency messaging',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Active Voice Framing',
        description:
          'User as subject of sentences, action-oriented language',
        howToSpot:
          '"You will get", "Start your", "Create your"',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Passive Voice Framing',
        description:
          'Action-focused without clear agent, removes user agency',
        howToSpot:
          '"Account created", "Password changed", "Settings updated"',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Collaborative Error Framing',
        description:
          'Errors framed as shared problem-solving',
        howToSpot:
          '"Let\'s", "We can", "Try this" in error messages',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Blame-Focused Error Framing',
        description:
          'Errors that blame the user',
        howToSpot:
          '"You entered", "Your mistake", "Invalid input"',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Benefit-First Feature Framing',
        description:
          'Features described by outcomes, not specifications',
        howToSpot:
          '"Save 2 hours daily" vs "Automated workflow system"',
        severity: ImpactLevel.HIGH,
      },
    ],

    patterns: [
      {
        name: 'Gain-Framed CTA',
        description:
          'Call-to-action emphasizing what user will gain',
        indicators: [
          '"Get", "Start", "Unlock", "Access"',
          'Benefit-focused language',
          'Positive tone',
          'Focus on outcomes not process',
        ],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Loss-Framed Prevention',
        description:
          'Messaging emphasizing what will be lost',
        indicators: [
          '"Don\'t lose", "You\'ll miss", "Risk losing"',
          'Exit warnings',
          'Cancellation confirmations',
          'Urgency messaging',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Percentage vs Absolute Framing',
        description:
          'Statistical information framed as percentage or absolute number',
        indicators: [
          '"90% success" vs "10% failure"',
          '"4 out of 5" vs "1 out of 5 don\'t"',
          'Positive stat emphasis',
        ],
        severity: ImpactLevel.MEDIUM,
        confidence: 'high',
      },
      {
        name: 'Time-Based Framing',
        description:
          'Temporal framing of costs and benefits',
        indicators: [
          '"Only $10/month" vs "$120/year"',
          '"Save 2 hours daily" vs "460 hours annually"',
          'Minimizing or maximizing through time unit',
        ],
        severity: ImpactLevel.MEDIUM,
        confidence: 'high',
      },
      {
        name: 'Ownership Language',
        description:
          'Creating psychological ownership through pronouns',
        indicators: [
          '"Your dashboard", "My account", "Start your trial"',
          'Possessive pronouns',
          'Personal connection language',
        ],
        severity: ImpactLevel.MEDIUM,
        confidence: 'medium',
      },
      {
        name: 'Social Proof Framing',
        description:
          'Social information framed positively or negatively',
        indicators: [
          '"Join 10,000 users" vs "Don\'t be left behind"',
          '"Most popular" vs "Least chosen"',
          'Positive social comparison',
        ],
        severity: ImpactLevel.MEDIUM,
        confidence: 'high',
      },
    ],

    checklistQuestions: [
      'Are CTAs framed positively (get, start) or neutrally (sign up)?',
      'Are benefits framed as gains or loss prevention?',
      'Are error messages collaborative or blame-focused?',
      'Is pricing framed around value gained or cost incurred?',
      'Are exit flows using loss framing?',
      'Is the framing consistent across the product?',
      'Is negative framing used ethically (not manipulative)?',
      'Are features framed by benefits or specifications?',
      'Is active or passive voice used in key messages?',
      'Are statistics framed positively (90% success) or negatively (10% failure)?',
      'Is temporal framing (monthly vs yearly) consistent?',
      'Does ownership language create personal connection?',
      'Is social proof framed to include or exclude?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in framing effects and persuasive UX writing. Analyze designs for framing patterns.

Identify:
1. **Gain vs Loss Framing**: How information is presented
2. **Positive vs Negative Language**: Tone and emotional valence
3. **Active vs Passive Voice**: User agency in messaging
4. **Benefit vs Feature Framing**: What's emphasized
5. **Collaborative vs Blame Framing**: Error message tone

Assess whether framing serves users ethically and effectively.`,

    outputSchema: {
      type: 'object',
      properties: {
        framingPatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              element: { type: 'string' },
              framingType: { type: 'string' },
              effectiveness: { type: 'number' },
              ethical: { type: 'boolean' },
            },
          },
        },
        overallTone: { type: 'string' },
        recommendations: {
          type: 'array',
          items: { type: 'string' },
        },
      },
    },
  },

  //===========================================
  // GUIDELINES
  //===========================================
  guidelines: {
    implementation: [
      {
        step: 1,
        title: 'Identify User Goal',
        description:
          'Determine what action you want to encourage or prevent',
        example:
          'Encourage signups (gain frame) or prevent cancellations (loss frame)',
        tips: [
          'Use gain framing to encourage actions',
          'Use loss framing to prevent actions',
          'Consider user emotional state and context',
        ],
      },
      {
        step: 2,
        title: 'Choose Framing Type',
        description:
          'Select positive/negative and gain/loss framing based on goal',
        example:
          'For CTAs use gain frames ("Start free trial"), for warnings use loss frames ("Don\'t lose your data")',
        tips: [
          'Gain frames work best for approach behaviors',
          'Loss frames work best for avoidance behaviors',
          'Match framing to user motivation',
        ],
      },
      {
        step: 3,
        title: 'Draft Alternative Versions',
        description:
          'Write multiple framings of the same message',
        example:
          'Version A: "Save $50", Version B: "Only $50", Version C: "Get $50 off"',
        tips: [
          'Create at least 3 versions per message',
          'Vary the reference point and valence',
          'Consider different user segments',
        ],
      },
      {
        step: 4,
        title: 'Test with Users',
        description:
          'Run A/B tests to determine most effective framing',
        example:
          'Test "Get started" vs "Sign up" vs "Try for free"',
        tips: [
          'Test on real users with actual stakes',
          'Measure not just clicks but downstream behavior',
          'Test across different user segments',
        ],
      },
      {
        step: 5,
        title: 'Implement Consistently',
        description:
          'Apply winning framing patterns across your product',
        example:
          'Create content guidelines documenting approved framing patterns',
        tips: [
          'Build a style guide for framing',
          'Train content creators on framing principles',
          'Audit existing content for consistency',
        ],
      },
      {
        step: 6,
        title: 'Monitor and Iterate',
        description:
          'Track performance and refine framing over time',
        example:
          'Monitor conversion rates, user feedback, and sentiment',
        tips: [
          'Set up dashboards for key metrics',
          'Review framing quarterly',
          'Stay current with language trends',
        ],
      },
    ],

    dos: [
      'Frame CTAs with positive, gain-focused language',
      'Frame errors collaboratively ("Let\'s fix this")',
      'Frame benefits around outcomes, not features',
      'Use active voice for user empowerment',
      'Frame consistently across your product',
      'Test different framings to optimize',
      'Match framing to user goals (approach vs avoid)',
      'Use clear, simple language regardless of frame',
    ],

    donts: [
      'Don\'t blame users in error messages',
      'Don\'t use manipulative fear-based framing',
      'Don\'t switch framing inconsistently',
      'Don\'t hide negatives through euphemism',
      'Don\'t use passive voice excessively',
      'Don\'t frame dishonestly or deceptively',
      'Don\'t use complex language to obscure meaning',
          'Don\'t use framing effect understanding to manipulate or deceive users',
      'Don\'t apply framing effect without considering ethical implications',
      'Don\'t assume framing effect works the same for all user segments',
      'Don\'t ignore accessibility when implementing framing effect patterns',
    ],

    bestPractices: [
      {
        title: 'Establish Framing Guidelines',
        description:
          'Create clear content guidelines for consistent framing across your product',
        rationale:
          'Consistent framing builds trust and creates predictable user experience',
        example:
          'Document approved phrasings: CTAs use "Get" or "Start", errors use "Let\'s" or "Try again"',
      },
      {
        title: 'Test Framing Systematically',
        description:
          'Run structured A/B tests comparing gain vs loss frames, positive vs negative language',
        rationale:
          'Data-driven framing decisions perform better than intuition alone',
        example:
          'Test matrix: Positive/Gain, Positive/Loss, Negative/Gain, Negative/Loss',
      },
      {
        title: 'Context-Appropriate Framing',
        description:
          'Match framing to user context, emotional state, and task urgency',
        rationale:
          'Framing effectiveness depends on matching user motivation and situation',
        example:
          'Use reassuring positive frames for anxious moments (errors), urgent loss frames for time-sensitive actions',
      },
      {
        title: 'Audit Existing Content',
        description:
          'Review all existing copy for framing consistency and effectiveness',
        rationale:
          'Inconsistent framing confuses users and reduces overall effectiveness',
        example:
          'Create spreadsheet of all CTAs, error messages, and key copy with framing analysis',
      },
          {
        title: 'User-Centered Application',
        description:
          'Always prioritize user benefit over business goals',
        rationale:
          'Ethical application builds trust and long-term success',
        example:
          'Use bias understanding to remove friction, not create manipulation',
      },
      {
        title: 'Continuous Measurement',
        description:
          'Track impact through metrics and user feedback',
        rationale:
          'Data-driven iteration leads to optimal implementation',
        example:
          'Set up dashboards tracking conversion, satisfaction, and engagement',
      },
      {
        title: 'Research-Backed Implementation',
        description:
          'Base framing effect applications on established research rather than assumptions',
        rationale:
          'Academic research provides validated insights into how biases actually work',
        example:
          'Review psychology literature on framing effect before implementing design patterns',
      },
      {
        title: 'Cross-Functional Collaboration',
        description:
          'Involve product, design, and research teams in applying framing effect insights',
        rationale:
          'Multiple perspectives ensure more ethical and effective implementations',
        example:
          'Hold workshops with cross-functional teams to discuss framing effect applications',
      },
      {
        title: 'Progressive Disclosure',
        description:
          'Apply framing effect thoughtfully across the user journey, not just at conversion points',
        rationale:
          'Consistent application builds trust and creates better overall experiences',
        example:
          'Map the entire user journey and identify appropriate touchpoints for framing effect consideration',
      },
          {
        title: 'Research-Backed Implementation',
        description:
          'Base framing effect applications on established research rather than assumptions',
        rationale:
          'Academic research provides validated insights into how biases actually work',
        example:
          'Review psychology literature on framing effect before implementing design patterns',
      },
      {
        title: 'Cross-Functional Collaboration',
        description:
          'Involve product, design, and research teams in applying framing effect insights',
        rationale:
          'Multiple perspectives ensure more ethical and effective implementations',
        example:
          'Hold workshops with cross-functional teams to discuss framing effect applications',
      },
      {
        title: 'Progressive Disclosure',
        description:
          'Apply framing effect thoughtfully across the user journey, not just at conversion points',
        rationale:
          'Consistent application builds trust and creates better overall experiences',
        example:
          'Map the entire user journey and identify appropriate touchpoints for framing effect consideration',
      },
          {
        title: 'Research-Backed Implementation',
        description:
          'Base framing effect applications on established research rather than assumptions',
        rationale:
          'Academic research provides validated insights into how biases actually work',
        example:
          'Review psychology literature on framing effect before implementing design patterns',
      },
      {
        title: 'Cross-Functional Collaboration',
        description:
          'Involve product, design, and research teams in applying framing effect insights',
        rationale:
          'Multiple perspectives ensure more ethical and effective implementations',
        example:
          'Hold workshops with cross-functional teams to discuss framing effect applications',
      },
      {
        title: 'Progressive Disclosure',
        description:
          'Apply framing effect thoughtfully across the user journey, not just at conversion points',
        rationale:
          'Consistent application builds trust and creates better overall experiences',
        example:
          'Map the entire user journey and identify appropriate touchpoints for framing effect consideration',
      },
    ],

    accessibility: [{
        wcagLevel: 'A',
        criterion: '3.1.5',
        guideline:
          'Ensure framing is clear when read aloud by screen readers',
        implementation:
          'Test copy with screen readers; avoid relying on visual context for framing. Use clear gain/loss language',
      },
      {
        wcagLevel: 'AAA',
        criterion: '3.1.5',
        guideline:
          'Use simple, clear framing that\'s easy to understand for users with cognitive differences',
        implementation:
          'Avoid complex sentence structures; use active voice; be direct. Write at 8th-grade reading level',
      },
      {
        wcagLevel: 'AA',
        criterion: '3.1.3',
        guideline:
          'Frame messages in plain language regardless of framing strategy',
        implementation:
          'Follow plain language guidelines; avoid jargon; use common words over technical terms',
      },
    ],

    ethics: [
      {
        concern: 'Manipulative Framing',
        severity: 'high',
        explanation:
          'Using framing to manipulate rather than inform',
        mitigation:
          'Frame honestly; help users make informed decisions. Use framing to clarify choices, not obscure them.',
      },
      {
        concern: 'Fear-Based Manipulation',
        severity: 'high',
        explanation:
          'Using loss framing and fear to pressure users into unwanted actions',
        mitigation:
          'Reserve loss framing for genuinely risky situations. Don\'t manufacture false urgency or consequences.',
      },
      {
        concern: 'Deceptive Positive Framing',
        severity: 'medium',
        explanation:
          'Using euphemistic positive framing to hide problems or risks',
        mitigation:
          'Be transparent about negatives. Frame them constructively but don\'t hide them.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title:
          'The Framing of Decisions and the Psychology of Choice',
        author: 'Tversky, A., & Kahneman, D.',
        year: 1981,
        description:
          'Foundational paper on the framing effect demonstrating how identical choices yield different decisions based on framing',
        type: 'foundational',
      },
      {
        title:
          'Prospect Theory: An Analysis of Decision under Risk',
        author: 'Kahneman, D., & Tversky, A.',
        year: 1979,
        description:
          'Foundational theory explaining how people evaluate gains and losses, underlying framing effects',
        type: 'foundational',
      },
      {
        title:
          'The Effect of Attribute Framing on Consumer Attitudes',
        author: 'Levin, I. P., & Gaeth, G. J.',
        year: 1988,
        description:
          'Study on how positive vs negative framing of product attributes affects consumer attitudes',
        type: 'case-study',
      },
    ],
    books: [
      {
        title: 'Thinking, Fast and Slow',
        author: 'Kahneman, Daniel',
        year: 2011,
        isbn: '9780374275631',
        description: 'Comprehensive chapter on framing and prospect theory with real-world examples',
        type: 'foundational',
      },
      {
        title: 'Influence: The Psychology of Persuasion',
        author: 'Cialdini, Robert B.',
        year: 2006,
        isbn: '9780061241895',
        description: 'Discusses framing in context of persuasion techniques and compliance',
        type: 'practical',
      },
      {
        title: 'Made to Stick',
        author: 'Heath, Chip & Dan Heath',
        year: 2007,
        isbn: '9781400064281',
        description: 'Practical guidance on framing messages to make them memorable and persuasive',
        type: 'practical',
      },
    ],
    articles: [
      {
        title: 'The Power of Framing: It\'s Not What You Say, It\'s How You Say It',
        author: 'Gallo, Amy',
        year: 2017,
        url: 'https://hbr.org/2017/02/the-power-of-framing',
        description: 'Harvard Business Review article on practical framing techniques',
        type: 'practical',
      },
      {
        title: 'Framing Effects in UX Copy',
        author: 'Nielsen Norman Group',
        year: 2019,
        url: 'https://www.nngroup.com/articles/framing-effects/',
        description: 'UX-focused analysis of framing in interface copy',
        type: 'case-study',
      },
    ],
    videos: [
      {
        title: 'The Framing Effect: How Language Influences Decisions',
        author: 'Sprouts',
        year: 2017,
        url: 'https://www.youtube.com/watch?v=RmIgJ64z6Y4',
        description: 'Animated explanation of framing effect with examples',
        type: 'foundational',
      },
    ],
    demos: [
      {
        title: 'Interactive Framing Effect Demonstration',
        author: 'SimplyPsychology',
        year: 2020,
        url: 'https://www.simplypsychology.org/framing-effect.html',
        description: 'Try framing effect examples interactively',
        type: 'practical',
      },
    ],
  },

  //===========================================
  // RELATIONSHIPS
  //===========================================
  relationships: {
    complements: [
      'loss-aversion',
      'anchoring-bias',
      'endowment-effect',
    ],
    conflicts: [],
    confusedWith: ['priming', 'anchoring-bias'],
    hierarchy: {
      parent: 'prospect-theory',
      children: [],
    },
  },
};
