/**
 * REGRET AVERSION
 *
 * We avoid decisions that might cause regret
 */


import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const regretAversion: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'regret-aversion',
    name: 'Regret Aversion',
    aliases: [],
    category: BiasCategory.DECISION_MAKING,
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
    simple: 'We avoid decisions that might cause regret',

    detailed: `Regret aversion is a decision-making bias where people anticipate the regret they might feel after making a choice and adjust their decisions to minimize that anticipated regret, even when doing so leads to objectively suboptimal outcomes. The fear of making the "wrong" choice can cause inaction, excessive caution, or preference for reversible options over irreversible ones.

In product and UX design, regret aversion directly influences how users interact with purchases, subscriptions, account changes, and destructive actions. Users are more likely to commit to a decision when they feel it can be undone, when guarantees reduce perceived risk, or when they can "try before they buy." Understanding this bias helps designers reduce friction and build trust.

Designers can ethically leverage regret aversion by offering generous return policies, undo functionality, free trials, and preview features. However, exploiting anticipated regret through false urgency, manufactured scarcity, or irreversible actions without warning crosses into dark pattern territory.`,

    psychologyBasis: {
      discoveredBy: 'Various Researchers',
      year: 1970,
      theory: 'Cognitive Bias Research',
      mechanism: `People mentally simulate future outcomes and weigh the emotional pain of potential regret before committing to a decision. This happens because:

1. **Anticipated Regret**: The brain projects forward to imagine how it would feel if a choice turns out badly, and this anticipated emotion influences the present decision
2. **Omission Bias**: People tend to feel stronger regret for actions taken (commission) than for inactions (omission), leading to a preference for the status quo
3. **Counterfactual Thinking**: After a decision, people compare what happened to what could have happened, and the easier it is to imagine a better alternative, the stronger the regret
4. **Loss Amplification**: Regret amplifies perceived losses—a bad outcome feels worse when you can imagine having avoided it
5. **Reversibility Preference**: The brain strongly prefers options that can be undone, because reversibility eliminates the possibility of lasting regret

The mechanism is both conscious and unconscious—people actively worry about future regret but also unconsciously gravitate toward safer, more reversible choices.`,
    },

    realWorldExample: `A shopper at an electronics store hesitates to buy a new laptop, even though it meets all their needs and is well-priced, because they worry a better model might come out next month. They leave without buying and continue using their slow, outdated machine for months. The anticipated regret of "buying too soon" caused a worse outcome than the purchase would have. Stores like Costco counter this with generous return policies—knowing you can return the laptop within 90 days eliminates the regret barrier entirely.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `Regret aversion affects how users perceive risk, commit to decisions, and interact with irreversible actions in interfaces. Designers can leverage this to:

- Reduce purchase anxiety through money-back guarantees and easy return policies
- Increase conversion by offering free trials and "try before you buy" experiences
- Build trust with prominent undo functionality and reversible actions
- Lower friction by providing previews so users can see outcomes before committing
- Encourage action by reducing the perceived finality and risk of decisions`,

    whenToUse: [
      {
        title: 'Purchase Decisions',
        scenario:
          'When users hesitate to buy due to fear of making the wrong choice',
        example:
          'Display a prominent "30-day money-back guarantee" badge next to the buy button, reducing anticipated regret',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Subscription Sign-Ups',
        scenario: 'When users are reluctant to commit to a recurring payment',
        example:
          'Offer a free trial with no credit card required, letting users experience value before any commitment',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Destructive Actions',
        scenario: 'When users need to delete, remove, or permanently change data',
        example:
          'Provide an "undo" option or soft-delete with a grace period rather than immediate permanent deletion',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Configuration Changes',
        scenario: 'When users are modifying settings or preferences',
        example:
          'Show a live preview of changes before applying them, with a "revert to previous" option always available',
        impact: ImpactLevel.MEDIUM,
      },
      {
        title: 'E-commerce Checkout',
        scenario: 'When users abandon carts due to commitment anxiety',
        example:
          'Show return policy, satisfaction guarantee, and order modification options prominently during checkout',
        impact: ImpactLevel.HIGH,
      },
    ],

    whenToAvoid: [
      {
        title: 'Security-Critical Actions',
        reason:
          'Making security actions too easily reversible can compromise account safety',
        consequence:
          'Users or attackers could undo critical security measures like password changes or two-factor setup',
        alternative:
          'Provide clear confirmation flows with cooling-off periods rather than full reversibility',
      },
      {
        title: 'False Urgency Tactics',
        reason:
          'Exploiting regret aversion through manufactured scarcity or countdown timers is manipulative',
        consequence:
          'Users make pressured decisions they later regret, eroding trust and increasing returns',
        alternative:
          'Provide genuine information about availability without artificial time pressure',
      },
      {
        title: 'Legal or Contractual Commitments',
        reason:
          'Some actions genuinely cannot be undone and should not imply reversibility',
        consequence:
          'Users may commit to binding agreements thinking they can reverse them',
        alternative:
          'Be transparent about irreversibility and provide thorough preview and confirmation steps',
      },
      {
        title: 'Habitual Low-Stakes Actions',
        reason:
          'Adding undo or confirmation to every minor action creates friction without benefit',
        consequence:
          'Over-protecting trivial actions slows users down and creates "warning fatigue"',
        alternative:
          'Reserve regret-reduction patterns for high-impact, hard-to-reverse decisions',
      },
    ],

    commonMistakes: [
      {
        title: 'Irreversible Actions Without Warning',
        description:
          'Allowing permanent deletions or changes with a single click and no recovery path',
        why: 'Users who experience regret from irreversible actions lose trust in the product entirely',
        fix: 'Implement soft-delete, grace periods, or multi-step confirmation for destructive actions',
      },
      {
        title: 'Hidden Return or Cancellation Policies',
        description:
          'Burying guarantees and return policies in fine print or separate pages',
        why: 'If users cannot find the safety net, it does not reduce their anticipated regret',
        fix: 'Display guarantees, return policies, and cancellation options prominently at the point of decision',
      },
      {
        title: 'Fake Scarcity to Exploit Regret',
        description:
          'Using "Only 2 left!" or countdown timers when there is no real scarcity',
        why: 'Manufactured urgency exploits the fear of regretting a missed opportunity (FOMO)',
        fix: 'Only display genuine scarcity information; build urgency through real value rather than fear',
      },
      {
        title: 'No Preview Before Commitment',
        description:
          'Requiring users to commit before they can see the outcome of their choice',
        why: 'Uncertainty about outcomes maximizes anticipated regret and causes abandonment',
        fix: 'Provide live previews, demos, screenshots, or trial experiences before requiring commitment',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.HIGH,
        description:
          'Layout determines how prominently guarantees, undo options, and safety nets are displayed',
        examples: [
          'Guarantee badges placed near CTAs reduce decision anxiety at the moment of action',
          'Undo bars positioned at the top of the viewport catch attention immediately after an action',
          'Return policy summaries in checkout sidebar provide reassurance without interrupting flow',
          'Preview panels alongside configuration forms let users see outcomes before committing',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Typography affects how reassuring or anxiety-inducing decision interfaces feel',
        examples: [
          'Clear, confident typography on guarantees conveys trustworthiness',
          'Calm, neutral language in confirmation dialogs reduces anxiety',
          'Bold "Free returns" text near the price builds purchase confidence',
          'Small, faded warning text increases rather than decreases regret anxiety',
        ],
      },
      color: {
        level: ImpactLevel.MEDIUM,
        description:
          'Color communicates safety, risk, and reversibility of actions',
        examples: [
          'Green badges for guarantees and return policies signal safety',
          'Red for destructive actions warns users about irreversibility',
          'Calm blue tones in trial sign-up flows reduce perceived commitment risk',
          'Yellow/amber for "are you sure?" dialogs signals caution without panic',
        ],
      },
      interaction: {
        level: ImpactLevel.CRITICAL,
        description:
          'Interaction patterns directly determine whether actions feel reversible or permanent',
        examples: [
          'Undo functionality after deletion is the primary regret-reduction interaction pattern',
          'Drag-to-archive instead of tap-to-delete makes actions feel more reversible',
          'Confirmation dialogs with preview give users a last chance to reconsider',
          'Progressive commitment (free trial -> paid) reduces per-step regret potential',
        ],
      },
      content: {
        level: ImpactLevel.CRITICAL,
        description:
          'Content framing directly shapes how much regret users anticipate from a decision',
        examples: [
          '"Cancel anytime" messaging reduces subscription commitment anxiety',
          '"Try risk-free for 30 days" reframes purchase as a reversible trial',
          'Listing what happens when you cancel (data preserved, can rejoin) reduces churn anxiety',
          '"No questions asked returns" eliminates worry about justifying a reversal',
        ],
      },
      accessibility: {
        level: ImpactLevel.HIGH,
        description:
          'Accessible undo and recovery options are essential for users who may make errors due to assistive technology limitations',
        examples: [
          'Undo actions must be keyboard-accessible and announced to screen readers',
          'Confirmation dialogs must be properly focused and navigable',
          'Guarantee information must be programmatically associated with the related action',
          'Time-limited undo windows must accommodate users who navigate more slowly',
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
        title: 'Prominent Money-Back Guarantee',
        description:
          'E-commerce checkout with visible guarantee badge next to the purchase button',
        code: `<div class="checkout-actions">
  <div class="guarantee-badge">
    <span class="icon">&#x2705;</span>
    <div class="guarantee-text">
      <strong>30-Day Money-Back Guarantee</strong>
      <p>Not satisfied? Full refund, no questions asked.</p>
    </div>
  </div>
  <button class="primary purchase-btn">Complete Purchase</button>
  <p class="fine-print">
    Free returns within 30 days. We'll even cover return shipping.
  </p>
</div>`,
        explanation:
          'Placing the guarantee badge directly next to the purchase button addresses regret aversion at the exact moment of decision. Users see the safety net before they commit, reducing anticipated regret to near zero.',
        principle:
          'Visible reversibility at the point of commitment reduces anticipated regret and increases conversion',
        metrics: {
          before: '3.2% checkout conversion with guarantee on separate page',
          after: '5.1% checkout conversion with guarantee badge at checkout',
          improvement: '59% increase in completed purchases',
        },
      },
      {
        title: 'Undo After Destructive Action',
        description:
          'Email client providing undo option immediately after sending or deleting',
        code: `<div class="undo-bar" role="alert" aria-live="assertive">
  <span class="message">Message sent.</span>
  <button class="undo-btn" aria-label="Undo send">Undo</button>
  <div class="timer-bar" style="animation: shrink 10s linear"></div>
</div>

<style>
.undo-bar {
  position: fixed;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  background: var(--cg-surface-inverse);
  color: var(--cg-text-inverse);
  padding: 0.75rem 1.5rem;
  border-radius: var(--cg-radius-md);
  display: flex;
  align-items: center;
  gap: 1rem;
}
.undo-btn {
  color: var(--cg-accent);
  font-weight: 600;
  background: none;
  border: none;
  cursor: pointer;
}
@keyframes shrink {
  from { width: 100%; }
  to { width: 0%; }
}
</style>`,
        explanation:
          'The undo bar transforms a potentially regrettable action into a safely reversible one. The visual countdown timer creates gentle urgency while the undo button provides an easy escape hatch. This pattern virtually eliminates regret from send and delete actions.',
        principle:
          'Post-action undo windows eliminate regret by making actions temporarily reversible',
        metrics: {
          before: '8% of users reported regret after accidental sends',
          after: '0.3% reported regret with undo-send enabled',
          improvement: '96% reduction in user-reported regret incidents',
        },
      },
      {
        title: 'Free Trial with No Credit Card',
        description:
          'SaaS sign-up offering a zero-commitment trial experience',
        code: `<section class="trial-signup">
  <h2>Try It Free for 14 Days</h2>
  <ul class="reassurance-list">
    <li>No credit card required</li>
    <li>Full access to all features</li>
    <li>Your data exports if you leave</li>
    <li>Cancel with one click, anytime</li>
  </ul>
  <form>
    <input type="email" placeholder="Enter your work email" />
    <button class="primary">Start Free Trial</button>
  </form>
  <p class="social-proof">
    Join 12,000+ teams. No commitment, no regrets.
  </p>
</section>`,
        explanation:
          'Every element addresses a specific source of anticipated regret: no credit card (no financial risk), full access (no regret about limited features), data export (no lock-in regret), one-click cancel (no hassle regret). The design systematically eliminates each regret vector.',
        principle:
          'Systematically eliminating every source of anticipated regret maximizes trial conversion',
      },
      {
        title: 'Live Preview Before Applying Changes',
        description:
          'Design tool showing a real-time preview of theme changes before committing',
        code: `<div class="settings-panel">
  <h3>Theme Settings</h3>
  <div class="preview-container">
    <div class="preview-label">Preview</div>
    <div class="live-preview" aria-live="polite">
      <!-- Real-time preview of changes -->
    </div>
  </div>
  <div class="controls">
    <select id="theme">
      <option>Light</option>
      <option>Dark</option>
      <option>High Contrast</option>
    </select>
  </div>
  <div class="actions">
    <button class="secondary">Reset to Default</button>
    <button class="primary">Apply Changes</button>
  </div>
  <p class="revert-note">You can revert to your previous theme anytime.</p>
</div>`,
        explanation:
          'The live preview lets users see exactly what their choice will look like before committing. Combined with the "Reset to Default" and revert messaging, users can explore freely without fear of making a bad, permanent choice.',
        principle:
          'Previews transform uncertain decisions into informed, low-regret choices',
      },
    ],

    bad: [
      {
        title: 'False Urgency Exploiting FOMO',
        description:
          'E-commerce site using fake countdown timers and scarcity to pressure purchases',
        code: `<!-- DON'T DO THIS -->
<div class="urgency-panel">
  <h2 style="color: red;">LAST CHANCE! Sale ends in:</h2>
  <div class="countdown" style="font-size: 2em; color: red;">
    02:14:33
  </div>
  <p style="color: red;">Only 1 left in stock!</p>
  <p>23 people are looking at this right now!</p>
  <p style="font-weight: bold;">
    Don't miss out — you'll regret it!
  </p>
  <button class="urgent-buy">BUY NOW BEFORE IT'S GONE!</button>
</div>`,
        explanation:
          'This design weaponizes regret aversion by manufacturing false scarcity and urgency. The countdown timer resets, the "1 left" claim is fabricated, and "you\'ll regret it" directly exploits anticipated regret. Users who buy under this pressure often experience actual regret.',
        principle:
          'Never manufacture false urgency to exploit the fear of future regret',
      },
      {
        title: 'Irreversible Action Without Warning',
        description:
          'Account settings allowing permanent data deletion with a single click',
        code: `<!-- DON'T DO THIS -->
<div class="settings">
  <h3>Data Management</h3>
  <button class="danger" onclick="deleteAllData()">
    Delete All My Data
  </button>
  <!-- No confirmation, no preview, no undo, no warning -->
</div>`,
        explanation:
          'A single button that permanently deletes all user data with no confirmation dialog, no preview of what will be lost, no grace period, and no undo option. This maximizes potential regret and represents a serious trust violation.',
        principle:
          'Irreversible destructive actions without safeguards guarantee user regret and trust loss',
      },
      {
        title: 'Hidden Cancellation Process',
        description:
          'Subscription service making it intentionally difficult to cancel',
        code: `<!-- DON'T DO THIS -->
<div class="cancel-flow">
  <p>To cancel your subscription, please call our team
  at 1-800-555-0199 (Mon-Fri 9am-5pm EST).</p>
  <p>Please have your account number, billing address,
  and reason for cancellation ready.</p>
  <p>Cancellation takes 3-5 business days to process.
  You will be billed until cancellation is confirmed.</p>
</div>`,
        explanation:
          'Making cancellation difficult does not reduce regret—it creates it. Users who signed up trusting they could "cancel anytime" now feel trapped, validating their worst anticipated regret about committing. This generates negative reviews, chargebacks, and regulatory scrutiny.',
        principle:
          'Promising easy reversal but delivering friction destroys trust and amplifies regret',
      },
    ],

    realWorld: [
      {
        company: 'Zappos',
        product: '365-Day Return Policy',
        url: 'https://www.zappos.com',
        description: 'Zappos offers a 365-day return policy with free shipping both ways. This extraordinarily generous window virtually eliminates purchase regret—customers know they have an entire year to change their mind.',
        effectiveness: 'very-effective',
        analysis: 'Zappos built their brand around eliminating regret. The 365-day window is so long that most customers never use it, but knowing it exists makes the purchase feel completely risk-free. This has become a key competitive advantage and driver of customer loyalty.',
      },
      {
        company: 'Google',
        product: 'Gmail Undo Send',
        url: 'https://mail.google.com',
        description: 'Gmail provides an "Undo Send" feature with a configurable window (5-30 seconds) after sending an email. Users can immediately recall a message they regret sending.',
        effectiveness: 'very-effective',
        analysis: 'This feature directly addresses one of the most common digital regrets—sending an email too hastily. The brief delay is imperceptible to recipients but provides enormous peace of mind to senders. It has become an expected feature across email clients.',
      },
      {
        company: 'Amazon',
        product: 'Easy Returns Program',
        url: 'https://www.amazon.com',
        description: 'Amazon provides hassle-free returns with prepaid labels, drop-off locations, and instant refunds. The return process is often easier than the original purchase.',
        effectiveness: 'very-effective',
        analysis: 'By making returns effortless, Amazon removes the primary barrier to online purchasing: the fear of being stuck with something you do not want. Paradoxically, easier returns lead to more purchases and lower actual return rates, because confidence in reversibility reduces purchase hesitation.',
      },
      {
        company: 'Costco',
        product: 'Satisfaction Guarantee',
        url: 'https://www.costco.com',
        description: 'Costco offers a nearly unconditional return policy on most products with no time limit. Electronics have a 90-day window. Members can return almost anything if unsatisfied.',
        effectiveness: 'very-effective',
        analysis: 'Costco\'s legendary return policy is a masterclass in regret aversion. Members feel confident buying in bulk or trying new products because the safety net is absolute. This policy drives membership loyalty and higher basket sizes, far outweighing the cost of returns.',
      },
    ],

    abTests: [
      {
        title: 'Checkout Guarantee Placement: Visible vs Hidden',
        hypothesis:
          'Displaying the money-back guarantee prominently at checkout will increase purchase completion',
        controlVersion: {
          description:
            'Checkout page with guarantee information on a separate "Policies" page linked in the footer',
          metrics: {
            conversionRate: '3.2%',
            cartAbandonmentRate: '68%',
          },
        },
        treatmentVersion: {
          description:
            'Checkout page with a green guarantee badge directly next to the purchase button: "30-Day Money-Back Guarantee — No Questions Asked"',
          metrics: {
            conversionRate: '5.1%',
            cartAbandonmentRate: '52%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Making the guarantee visible at the exact point of decision reduced cart abandonment by 24% and increased conversions by 59%. Post-purchase surveys showed treatment users reported significantly less purchase anxiety.',
          learnings: [
            'Guarantees only reduce regret if users see them at the moment of decision',
            'Placement matters more than policy generosity—a visible 30-day guarantee outperformed a hidden 60-day guarantee',
            'Green color and checkmark icon increased perceived trustworthiness of the guarantee',
            'Adding "no questions asked" further reduced anticipated regret about the return process itself',
          ],
        },
      },
      {
        title: 'Free Trial: Credit Card Required vs No Credit Card',
        hypothesis:
          'Removing the credit card requirement for free trials will increase sign-ups by reducing commitment anxiety',
        controlVersion: {
          description:
            'Free trial sign-up requiring credit card entry with text: "You won\'t be charged during your 14-day trial"',
          metrics: {
            conversionRate: '2.8%',
            trialToPayRate: '42%',
          },
        },
        treatmentVersion: {
          description:
            'Free trial sign-up with email only, no credit card: "No credit card required. Start your 14-day free trial."',
          metrics: {
            conversionRate: '11.4%',
            trialToPayRate: '18%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'No-credit-card trials generated 4x more sign-ups. Although trial-to-paid conversion was lower (18% vs 42%), the absolute number of paying customers was 74% higher due to the much larger trial base. Users reported feeling "no pressure" and "nothing to lose."',
          learnings: [
            'Credit card requirement triggers strong regret aversion about future unwanted charges',
            'Even with "you won\'t be charged" messaging, the card field itself signals commitment',
            'Lower individual conversion rates can be offset by dramatically higher sign-up volume',
            'Users who convert without initial card pressure report higher satisfaction and lower churn',
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
        name: 'Guarantee Badges',
        description:
          'Money-back guarantee, satisfaction guarantee, or return policy badges near CTAs',
        howToSpot:
          'Look for shield icons, checkmark badges, or trust seals positioned near purchase or sign-up buttons',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Undo Controls',
        description:
          'Undo buttons, "revert" options, or toast notifications with reversal actions after state changes',
        howToSpot:
          'Look for undo bars appearing after destructive actions, "Ctrl+Z" affordances, or "revert to previous" links',
        severity: ImpactLevel.CRITICAL,
      },
      {
        name: 'Return Policy Prominence',
        description:
          'Return, refund, or exchange policy information displayed near the point of purchase',
        howToSpot:
          'Check for return policy text in checkout flows, product pages, or cart summaries—note whether it is prominent or buried',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Free Trial Indicators',
        description:
          'Free trial offers, "try before you buy" messaging, or "no commitment" language',
        howToSpot:
          'Look for trial CTAs, "no credit card required" text, or progressive commitment flows (free -> paid)',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Preview Functionality',
        description:
          'Live previews, "see how it looks" features, or before/after comparisons before committing',
        howToSpot:
          'Check for preview panels, live-updating UI based on uncommitted settings, or demo modes',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Urgency and Scarcity Signals',
        description:
          'Countdown timers, "limited stock" warnings, or "last chance" messaging that may exploit regret aversion',
        howToSpot:
          'Look for red countdown timers, low-stock warnings, or "you\'ll miss out" language—assess whether scarcity is genuine',
        severity: ImpactLevel.CRITICAL,
      },
    ],

    patterns: [
      {
        name: 'Safety Net Pattern',
        description: 'Guarantees, return policies, or undo functionality displayed at the point of decision to reduce anticipated regret',
        indicators: ['Money-back guarantee badges near CTAs', 'Return policy summaries in checkout', 'Undo bars after destructive actions', '"Cancel anytime" messaging near subscription buttons'],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Progressive Commitment Pattern',
        description: 'Multi-step commitment flow that starts with low-risk actions and gradually increases commitment',
        indicators: ['Free trial before paid subscription', 'Guest checkout before account creation', 'Preview or demo before purchase', 'Freemium model with upgrade prompts'],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Reversibility Pattern',
        description: 'Design patterns that make actions feel impermanent and safely reversible',
        indicators: ['Soft-delete with recovery period', 'Undo send or undo delete', 'Draft/save states before publishing', 'Version history with rollback'],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'FOMO Exploitation Pattern',
        description: 'Dark pattern using manufactured urgency to exploit fear of regretting inaction',
        indicators: ['Fake countdown timers that reset', '"Only X left" with inflated scarcity', '"You\'ll regret missing this" language', 'Disappearing discount offers that return'],
        severity: ImpactLevel.CRITICAL,
        confidence: 'medium',
      },
    ],

    checklistQuestions: [
      'Are guarantees, return policies, or undo options visible at the point of decision?',
      'Can users reverse or undo destructive actions (delete, send, publish)?',
      'Is there a free trial or preview experience before requiring commitment?',
      'Are irreversible actions clearly marked and confirmed before execution?',
      'Does the design use genuine or manufactured urgency/scarcity?',
      'Is the cancellation process as easy as the sign-up process?',
      'Do confirmation dialogs clearly explain what will happen and whether it can be undone?',
      'Are there "save as draft" or "preview" options before final submission?',
      'Is the return/refund policy displayed prominently or buried in fine print?',
      'Does the checkout flow address common purchase anxieties with reassurance elements?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in regret aversion.

Analyze the provided design for regret aversion patterns. Identify:

1. **Safety Nets**: Guarantees, return policies, undo features, and reversibility mechanisms
2. **Commitment Friction**: How the design handles irreversible actions and high-stakes decisions
3. **Progressive Commitment**: Whether the design uses graduated commitment to reduce per-step regret
4. **Preview Mechanisms**: Ability for users to see outcomes before committing
5. **FOMO Exploitation**: False urgency, manufactured scarcity, or fear-based manipulation

For each pattern found:
- Identify whether it ethically reduces anticipated regret or exploits it
- Assess visibility and placement of regret-reduction elements
- Determine if irreversible actions have appropriate safeguards
- Evaluate whether the design builds trust through reversibility
- Suggest improvements for reducing unnecessary decision anxiety

Consider:
- Can users undo mistakes easily?
- Are guarantees visible at the point of decision, not buried?
- Is urgency genuine or manufactured?
- Are destructive actions protected by confirmation and recovery?
- Is the cancellation process as simple as sign-up?

Provide actionable recommendations for ethical regret-reduction design.`,

    outputSchema: {
      type: 'object',
      properties: {
        regretPatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              mechanism: { type: 'string' },
              reducesOrExploits: { type: 'string' },
              visibility: { type: 'string' },
              ethical: { type: 'boolean' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'mechanism',
              'reducesOrExploits',
              'ethical',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            reversibilityScore: { type: 'number' },
            guaranteeVisibility: { type: 'number' },
            commitmentGraduation: { type: 'number' },
            ethicalScore: { type: 'number' },
          },
          required: [
            'reversibilityScore',
            'guaranteeVisibility',
            'commitmentGraduation',
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
        'regretPatterns',
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
        title: 'Identify High-Regret Decision Points',
        description:
          'Map your user journey to find moments where users face irreversible, high-stakes, or anxiety-inducing decisions',
        example:
          'Audit the checkout flow, account deletion, subscription sign-up, and data export paths for regret-prone moments',
        tips: [
          'Focus on actions that are irreversible or expensive to reverse',
          'Interview users about moments of hesitation or abandonment',
          'Track where users pause, abandon, or seek reassurance',
        ],
      },
      {
        step: 2,
        title: 'Add Reversibility Mechanisms',
        description:
          'For each high-regret decision point, add an appropriate undo, revert, or recovery mechanism',
        example:
          'Implement soft-delete with 30-day recovery for file deletion instead of permanent delete',
        tips: [
          'Prefer undo over confirmation dialogs—undo is less disruptive',
          'Set appropriate time windows for undo based on action severity',
          'Ensure undo is clearly communicated and easily accessible',
        ],
      },
      {
        step: 3,
        title: 'Surface Guarantees at Decision Points',
        description:
          'Display return policies, satisfaction guarantees, and safety nets at the exact moment users make decisions',
        example:
          'Place a "30-day money-back guarantee" badge directly next to the "Buy Now" button',
        tips: [
          'Guarantees seen at the wrong time do not reduce regret',
          'Use trust signals (badges, icons) for quick visual reassurance',
          'Test placement and wording to maximize impact',
        ],
      },
      {
        step: 4,
        title: 'Implement Progressive Commitment',
        description:
          'Break large commitments into smaller, reversible steps that gradually increase investment',
        example:
          'Offer: browse freely -> create free account -> start trial -> add payment -> subscribe',
        tips: [
          'Each step should deliver value before asking for more commitment',
          'Make it clear users can stop at any step without penalty',
          'Avoid requiring payment information until absolutely necessary',
        ],
      },
      {
        step: 5,
        title: 'Provide Previews and Try-Before-You-Buy',
        description:
          'Let users experience or preview outcomes before committing to a decision',
        example:
          'Show a live preview of theme changes, or offer a 14-day free trial with full feature access',
        tips: [
          'Previews should be accurate representations of the final outcome',
          'Free trials should include enough features to demonstrate real value',
          'Make it easy to exit previews and return to the previous state',
        ],
      },
    ],

    dos: [
      'Display guarantees and return policies prominently at the point of decision',
      'Provide undo functionality for destructive or significant actions',
      'Offer free trials or previews to let users experience before committing',
      'Use progressive commitment to break large decisions into smaller steps',
      'Make cancellation and return processes as simple as sign-up and purchase',
      'Show live previews of changes before requiring users to apply them',
      'Implement soft-delete with grace periods instead of permanent deletion',
      'Use calm, reassuring language in confirmation and commitment dialogs',
    ],

    donts: [
      'Don\'t exploit fear of missing out with fake countdown timers or false scarcity',
      'Don\'t allow permanent, irreversible actions without clear warnings and confirmation',
      'Don\'t bury return policies, cancellation options, or guarantees in fine print',
      'Don\'t require credit card information for free trials when it is not necessary',
      'Don\'t make cancellation deliberately difficult when sign-up was easy',
      'Don\'t use "you\'ll regret it" or shame-based language to pressure decisions',
      'Don\'t remove the ability to undo or revert after committing to a change',
      'Don\'t promise easy reversal and then deliver a difficult or impossible process',
    ],

    bestPractices: [
      {
        title: 'Make Actions Reversible by Default',
        description:
          'Design every significant action to be reversible unless there is a strong technical or legal reason it cannot be',
        rationale:
          'Reversible actions eliminate the primary source of anticipated regret and encourage exploration',
        example:
          'Gmail\'s "Undo Send" and Google Docs\' version history make almost every action safely reversible',
      },
      {
        title: 'Guarantee Visibility at the Point of Decision',
        description:
          'Place trust badges, return policies, and guarantees where users are making their commitment decision',
        rationale:
          'A guarantee on a policies page does not reduce regret at checkout; placement is everything',
        example:
          'Show "30-day money-back guarantee" badge directly next to the purchase button, not just in the footer',
      },
      {
        title: 'Progressive Commitment Over Big-Bang Decisions',
        description:
          'Break large commitments into a series of smaller, lower-stakes steps',
        rationale:
          'Each small step carries less potential regret, making the overall journey feel safer',
        example:
          'Free trial -> basic plan -> upgrade prompt based on usage, rather than requiring annual commitment upfront',
      },
      {
        title: 'Symmetry Between Commitment and Exit',
        description:
          'Make the effort to leave, cancel, or return proportional to the effort to join, subscribe, or purchase',
        rationale:
          'Asymmetric effort (easy sign-up, hard cancellation) creates the exact regret users feared',
        example:
          'If users can subscribe in 2 clicks, they should be able to cancel in 2 clicks',
      },
      {
        title: 'Honest Scarcity Over Manufactured Urgency',
        description:
          'Only display scarcity or urgency signals when they reflect genuine conditions',
        rationale:
          'False urgency exploits regret aversion for short-term gain but destroys trust long-term',
        example:
          'Show actual remaining inventory counts, not fake "only 2 left" when there are 200 in stock',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '3.3.4',
        guideline:
          'Error Prevention - Provide the ability to reverse, check, or confirm submissions for legal, financial, or data-related actions',
        implementation:
          'Implement undo functionality, confirmation dialogs, and review screens for all irreversible actions. Ensure these are keyboard-navigable and screen-reader-announced.',
      },
      {
        wcagLevel: 'AA',
        criterion: '3.3.6',
        guideline:
          'Error Prevention (All) - Allow users to reverse any submission, not just legal/financial ones',
        implementation:
          'Provide undo or revert functionality for all significant actions. Ensure undo controls are accessible via keyboard and have proper ARIA labels.',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.2.1',
        guideline:
          'Timing Adjustable - Users must be able to extend time-limited undo windows',
        implementation:
          'If undo has a time limit (e.g., 10-second undo bar), allow users to extend or adjust the window, especially for users of assistive technology who may navigate more slowly.',
      },
    ],

    ethics: [
      {
        concern: 'FOMO Exploitation',
        severity: 'critical',
        explanation:
          'Using fake countdown timers, manufactured scarcity, or "you\'ll regret missing this" messaging to pressure users into hasty decisions',
        mitigation:
          'Only display genuine scarcity information. Remove countdown timers that reset. Never use shame or fear language to drive conversions.',
      },
      {
        concern: 'Roach Motel Pattern',
        severity: 'critical',
        explanation:
          'Making it easy to sign up or purchase but deliberately difficult to cancel, return, or exit',
        mitigation:
          'Ensure cancellation and return processes are proportional in effort to sign-up and purchase. One-click subscribe should mean one-click cancel.',
      },
      {
        concern: 'False Guarantee Claims',
        severity: 'high',
        explanation:
          'Displaying "money-back guarantee" or "easy returns" but then making the actual process burdensome or full of exceptions',
        mitigation:
          'Honor all stated guarantees without friction. If there are conditions, state them clearly upfront at the same prominence as the guarantee.',
      },
      {
        concern: 'Preying on Anxiety',
        severity: 'high',
        explanation:
          'Deliberately increasing decision anxiety to make users more susceptible to urgency and scarcity tactics',
        mitigation:
          'Design for calm, informed decision-making. Provide clear information, adequate time, and easy comparison tools rather than pressure.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'Regret Theory: An Alternative Theory of Rational Choice Under Uncertainty',
        author: 'Loomes, G., & Sugden, R.',
        year: 1982,
        doi: '10.2307/2232669',
        description:
          'The foundational paper introducing regret theory as an alternative to expected utility theory, showing that anticipated regret systematically influences decisions',
        type: 'foundational',
      },
      {
        title: 'Consequences of Regret Aversion: Effects of Expected Feedback on Risky Decision Making',
        author: 'Zeelenberg, M.',
        year: 1999,
        doi: '10.1006/obhd.1999.2821',
        description:
          'Demonstrates how anticipated regret affects risky decisions, particularly when people expect to learn the outcome of unchosen alternatives',
        type: 'foundational',
      },
      {
        title: 'The Experience of Regret: What, When, and Why',
        author: 'Zeelenberg, M., & Pieters, R.',
        year: 2007,
        doi: '10.1146/annurev.psych.56.091103.070145',
        description:
          'Comprehensive review of regret research covering the antecedents, experience, and consequences of regret in decision-making',
        type: 'advanced',
      },
      {
        title: 'Regret in Decision Making Under Uncertainty',
        author: 'Bell, D. E.',
        year: 1982,
        doi: '10.1287/opre.30.5.961',
        description:
          'Early formal model of how anticipated regret modifies decision behavior under uncertainty',
        type: 'foundational',
      },
    ],

    books: [
      {
        title: 'The Paradox of Choice: Why More Is Less',
        author: 'Schwartz, Barry',
        year: 2004,
        isbn: '9780060005696',
        description:
          'Explores how excessive choice leads to anticipated regret and decision paralysis, with implications for product and UX design',
        type: 'practical',
      },
      {
        title: 'Stumbling on Happiness',
        author: 'Gilbert, Daniel',
        year: 2006,
        isbn: '9781400077427',
        description:
          'Examines how humans poorly predict their future emotional states, including the intensity and duration of anticipated regret',
        type: 'foundational',
      },
    ],

    articles: [
      {
        title: 'Reducing User Regret in UX Design',
        author: 'Nielsen Norman Group',
        url: 'https://www.nngroup.com/articles/undo/',
        description:
          'Practical guide to implementing undo and reversibility patterns in user interfaces',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'The Paradox of Choice',
        author: 'Barry Schwartz (TED Talk)',
        url: 'https://www.ted.com/talks/barry_schwartz_the_paradox_of_choice',
        description:
          'Influential talk on how choice overload leads to anticipated regret and reduced satisfaction',
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
