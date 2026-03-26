/**
 * ZERO RISK BIAS
 *
 * We prefer eliminating small risks over reducing larger ones
 */


import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const zeroRiskBias: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'zero-risk-bias',
    name: 'Zero Risk Bias',
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
    simple: 'We prefer eliminating small risks over reducing larger ones',

    detailed: `Zero Risk Bias is the tendency to prefer the complete elimination of one risk — even a small one — over a larger overall reduction in risk. People are disproportionately attracted to outcomes described as "100% safe," "zero defects," or "guaranteed," even when an alternative option would objectively reduce total harm or danger by a greater amount.

This bias stems from the psychological comfort of certainty. Reducing a risk from 5% to 0% feels categorically different from reducing a risk from 50% to 25%, even though the latter saves far more lives or resources. The allure of "zero" is not rational — it is emotional.

In UX and product design, Zero Risk Bias manifests powerfully in security messaging, guarantee badges, "risk-free trial" language, money-back promises, and trust seals. Users gravitate toward products and services that promise the elimination of a specific risk, even when competing offerings provide greater overall protection. Designers can harness this to build trust, but must be careful not to make impossible promises that erode credibility.`,

    psychologyBasis: {
      discoveredBy: 'Various Researchers',
      year: 1970,
      theory: 'Cognitive Bias Research',
      mechanism: `The brain processes the elimination of a risk as categorically different from merely reducing it. This happens because:

1. **Certainty Effect**: Outcomes that are certain (0% risk) are psychologically weighted far more than proportional improvements in probability (Kahneman & Tversky's Prospect Theory)
2. **Categorical Thinking**: The jump from "some risk" to "no risk" crosses a psychological category boundary, producing outsized relief and satisfaction
3. **Worry Elimination**: Removing a risk entirely eliminates the cognitive burden of monitoring and worrying about it, freeing mental resources
4. **Simplification Heuristic**: "Zero risk" is easy to evaluate and compare — it reduces decision complexity to a binary safe/not-safe judgment
5. **Loss Aversion Amplification**: The possibility of total safety triggers loss aversion in reverse — any remaining risk feels like an unacceptable potential loss

The mechanism is largely automatic: people gravitate toward "100%" and "guaranteed" claims without consciously evaluating whether the total risk reduction is optimal.`,
    },

    realWorldExample: `In a well-known study by Baron et al. (2001), participants chose between two policies: one that completely eliminated a small risk (e.g., a chemical causing 4 cancer deaths per year) versus one that greatly reduced a much larger risk (e.g., a chemical causing 40 cancer deaths, reduced to 20). Most participants preferred complete elimination of the small risk — saving 4 lives — over the policy that would save 20 lives. The appeal of "zero deaths from chemical A" outweighed the numerically superior outcome.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `Zero Risk Bias profoundly affects how users perceive safety, trust, and reliability in digital products. The desire for complete risk elimination shapes how users respond to:

- Security badges and trust seals ("100% Secure Checkout")
- Money-back guarantees ("100% satisfaction or your money back")
- Risk-free trial messaging ("Try free — no credit card required")
- Data safety claims ("Zero data breaches" or "We never sell your data")
- Compliance and certification badges (SSL, SOC 2, GDPR)

Designers can leverage this to build confidence and reduce purchase anxiety, but must balance it against making impossible or misleading absolute claims.`,

    whenToUse: [
      {
        title: 'Money-Back Guarantees',
        scenario:
          'When reducing purchase anxiety for high-consideration products',
        example:
          'Display "100% Money-Back Guarantee — No Questions Asked" prominently near the purchase button to eliminate perceived financial risk',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Security and Trust Seals',
        scenario: 'When users are entering sensitive information (payment, personal data)',
        example:
          'Show SSL lock icon, "256-bit encryption" badge, and "Secure Checkout" label near payment forms to signal zero risk of data interception',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Risk-Free Trial Messaging',
        scenario: 'When onboarding users who are hesitant to commit',
        example:
          '"Start your free trial — no credit card required, cancel anytime" removes all perceived risk of trying the product',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Data Privacy Assurance',
        scenario: 'When collecting user data or requesting permissions',
        example:
          '"We will never sell your data. Zero third-party sharing." displayed at the point of data collection',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Uptime and Reliability Claims',
        scenario: 'When selling to enterprise or reliability-conscious users',
        example:
          '"99.99% uptime SLA with guaranteed credits" — while not literally zero risk, the near-certainty and financial backstop exploit the same desire for elimination',
        impact: ImpactLevel.MEDIUM,
      },
    ],

    whenToAvoid: [
      {
        title: 'Impossible Guarantees',
        reason:
          'Claiming "100% safe" or "zero risk" when no system can truly guarantee it',
        consequence:
          'When the promise inevitably fails (a breach, a bug, a downtime event), users feel betrayed and trust is permanently damaged',
        alternative:
          'Use honest language like "industry-leading security" or "99.9% uptime" instead of absolute zero-risk claims',
      },
      {
        title: 'Security Theater Over Real Security',
        reason:
          'Displaying trust badges and seals without genuine security practices behind them',
        consequence:
          'Creates a false sense of safety; if exploited, the damage is catastrophic to brand reputation',
        alternative:
          'Invest in real security infrastructure first, then communicate achievements honestly',
      },
      {
        title: 'Medical or Health Claims',
        reason:
          '"100% effective" or "zero side effects" claims in health contexts are dangerous and often illegal',
        consequence:
          'Users may make harmful health decisions based on impossible promises; regulatory and legal liability',
        alternative:
          'Present accurate efficacy data with clear confidence intervals and known limitations',
      },
      {
        title: 'Distracting From Larger Risks',
        reason:
          'Eliminating a trivial risk while ignoring a much larger one misleads users',
        consequence:
          'Users feel safe in one narrow area but are exposed to far greater unaddressed risks',
        alternative:
          'Address the largest risks first; communicate overall risk reduction rather than fixating on one small elimination',
      },
    ],

    commonMistakes: [
      {
        title: 'Absolute Claims That Cannot Be Kept',
        description:
          'Promising "100% uptime," "zero breaches," or "guaranteed results" when these are impossible to deliver',
        why: 'Users anchor to the absolute promise; any failure — no matter how minor — feels like a fundamental betrayal',
        fix: 'Use near-absolute language with honest caveats: "99.99% uptime backed by SLA credits" or "no breaches in 5+ years of operation"',
      },
      {
        title: 'Trust Badge Overload',
        description:
          'Plastering dozens of security badges, certifications, and trust seals across the page',
        why: 'Too many badges create visual noise and paradoxically signal insecurity — "why do they need so many assurances?"',
        fix: 'Select 2-3 most relevant and recognized trust indicators. Place them contextually (SSL near payment, guarantee near checkout)',
      },
      {
        title: 'Ignoring the Larger Risk Picture',
        description:
          'Highlighting "zero risk" on a minor concern while ignoring the user\'s primary anxiety',
        why: 'Users\' real worry might be "will this product actually work?" not "is my payment secure?"',
        fix: 'Research which risks actually concern your users and address those first, rather than adding generic trust signals',
      },
      {
        title: 'Undisclosed Conditions on Guarantees',
        description:
          'Offering "100% money-back guarantee" with hidden restrictions (30-day limit, restocking fees, approval required)',
        why: 'Hidden conditions make the guarantee feel like a bait-and-switch when users try to use it',
        fix: 'State guarantee terms clearly and prominently. A transparent 30-day guarantee builds more trust than a vague "100% guaranteed" with fine print',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.HIGH,
        description:
          'Placement of trust signals and guarantee badges determines their effectiveness in reducing perceived risk',
        examples: [
          'Trust seals placed near payment forms reduce checkout abandonment',
          'Money-back guarantee badges positioned near CTA buttons boost conversion',
          'Security messaging above the fold establishes trust before users scroll',
          'Footer-only trust signals are missed by most users',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Text treatment of guarantees and safety claims affects perceived credibility',
        examples: [
          'Bold "100% Guarantee" text draws attention to the zero-risk promise',
          'Fine-print disclaimers undermine the guarantee they qualify',
          'Clear, readable guarantee terms build more trust than oversized "GUARANTEED!" text',
          'Consistent typography between claim and terms signals honesty',
        ],
      },
      color: {
        level: ImpactLevel.HIGH,
        description:
          'Color signals safety, danger, and trustworthiness in risk communication',
        examples: [
          'Green checkmarks and shields signal safety and "all clear"',
          'Blue tones associated with trust and security (common in banking/tech)',
          'Gold/yellow for guarantee badges creates premium trust signals',
          'Red for "100% SAFE!" paradoxically signals danger — use green or blue instead',
        ],
      },
      interaction: {
        level: ImpactLevel.HIGH,
        description:
          'Interactive elements that reveal or confirm safety reduce perceived risk at key decision points',
        examples: [
          'Hover tooltips on trust badges explaining what the certification means',
          'Click-to-verify SSL certificates increase perceived legitimacy',
          'Progressive disclosure of guarantee terms (summary first, details on request)',
          'Real-time security indicators during checkout (lock animations, progress bars)',
        ],
      },
      content: {
        level: ImpactLevel.CRITICAL,
        description:
          'The specific language used in risk and safety messaging is the primary driver of zero risk bias in interfaces',
        examples: [
          '"100% money-back guarantee" outperforms "satisfaction guarantee" in conversion',
          '"Zero data breaches since 2019" is more compelling than "strong security practices"',
          '"Risk-free trial" converts better than "free trial" — the word "risk-free" directly addresses the bias',
          '"Cancel anytime — no penalties" eliminates lock-in risk perception',
        ],
      },
      accessibility: {
        level: ImpactLevel.HIGH,
        description:
          'Trust and safety messaging must be perceivable by all users, including those using assistive technology',
        examples: [
          'Trust badge images must have descriptive alt text ("SSL Secured — 256-bit encryption")',
          'Screen readers must announce guarantee terms, not just decorative badge icons',
          'Color-coded safety indicators need text or icon alternatives for color-blind users',
          'Keyboard-navigable trust details ensure all users can verify security claims',
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
        title: '100% Money-Back Guarantee Badge',
        description:
          'E-commerce checkout with clear, honest money-back guarantee prominently displayed',
        code: `<div class="checkout-trust">
  <div class="guarantee-badge">
    <span class="shield-icon" aria-hidden="true">&#x1f6e1;</span>
    <div class="guarantee-text">
      <strong>100% Money-Back Guarantee</strong>
      <p>Not satisfied? Full refund within 30 days. No questions asked.</p>
    </div>
  </div>
  <button class="primary-cta">Complete Purchase</button>
  <p class="guarantee-terms">
    <a href="/guarantee-policy">See full guarantee terms</a>
  </p>
</div>`,
        explanation:
          'The "100%" language triggers zero risk bias — users feel the financial risk of purchase has been completely eliminated. Placing it directly above the purchase button addresses anxiety at the decision point. Linking to full terms maintains honesty.',
        principle:
          'Complete risk elimination at the moment of commitment maximizes conversion',
        metrics: {
          before: '3.2% checkout conversion with generic "Satisfaction Guaranteed" text',
          after: '5.1% checkout conversion with "100% Money-Back Guarantee" badge',
          improvement: '59% increase in checkout completion',
        },
      },
      {
        title: 'Zero Data Breaches Security Messaging',
        description:
          'SaaS product security page highlighting an unblemished track record',
        code: `<section class="security-record">
  <h2>Your Data Is Safe With Us</h2>
  <div class="stats-grid">
    <div class="stat">
      <span class="stat-number">0</span>
      <span class="stat-label">Data breaches since founding (2018)</span>
    </div>
    <div class="stat">
      <span class="stat-number">SOC 2</span>
      <span class="stat-label">Type II certified</span>
    </div>
    <div class="stat">
      <span class="stat-number">256-bit</span>
      <span class="stat-label">AES encryption at rest and in transit</span>
    </div>
  </div>
  <p class="context">Independently audited annually by Deloitte.
    <a href="/security">View our security whitepaper</a>
  </p>
</section>`,
        explanation:
          'The prominent "0 data breaches" directly triggers zero risk bias. Users perceive complete safety. Supporting with SOC 2 certification and encryption details provides substance behind the zero-risk claim. Annual audit disclosure adds credibility.',
        principle:
          'A verifiable zero-risk track record is the strongest trust signal possible',
      },
      {
        title: 'Risk-Free Trial With No Credit Card',
        description:
          'SaaS onboarding removing all barriers and risks from trying the product',
        code: `<div class="trial-cta">
  <h2>Try It Risk-Free</h2>
  <ul class="risk-eliminators">
    <li>
      <span class="check" aria-hidden="true">&#x2705;</span>
      <span>No credit card required</span>
    </li>
    <li>
      <span class="check" aria-hidden="true">&#x2705;</span>
      <span>Full features for 14 days</span>
    </li>
    <li>
      <span class="check" aria-hidden="true">&#x2705;</span>
      <span>Cancel anytime — zero penalties</span>
    </li>
    <li>
      <span class="check" aria-hidden="true">&#x2705;</span>
      <span>Your data exportable at any time</span>
    </li>
  </ul>
  <button class="primary-cta">Start Free Trial</button>
</div>`,
        explanation:
          'Each bullet eliminates a specific risk: financial (no card), commitment (cancel anytime), lock-in (data export). The word "risk-free" in the heading and "zero penalties" in the list directly exploit zero risk bias. Users perceive no downside to trying.',
        principle:
          'Systematically eliminating every perceived risk removes all barriers to action',
        metrics: {
          before: '8% trial sign-up with "Start Free Trial" button only',
          after: '14% trial sign-up with risk-elimination checklist',
          improvement: '75% increase in trial starts',
        },
      },
    ],

    bad: [
      {
        title: 'False "100% Safe" Claims',
        description:
          'Software product claiming absolute safety that cannot be guaranteed',
        code: `<!-- DON'T DO THIS -->
<div class="security-hero">
  <h1>100% HACK-PROOF SECURITY</h1>
  <p>Our platform is completely immune to cyberattacks.
  Your data is 100% safe — guaranteed.</p>
  <div class="badges">
    <span class="badge">100% Secure</span>
    <span class="badge">Unhackable</span>
    <span class="badge">Zero Vulnerability</span>
  </div>
</div>`,
        explanation:
          'No system is "100% hack-proof" or "unhackable." These are impossible claims that exploit zero risk bias dishonestly. When the inevitable breach or vulnerability occurs, user trust is destroyed completely. Knowledgeable users will see these claims as red flags indicating incompetence.',
        principle:
          'Impossible zero-risk claims backfire catastrophically when reality intervenes',
      },
      {
        title: 'Security Theater Without Substance',
        description:
          'Website covered in meaningless trust badges with no real security behind them',
        code: `<!-- DON'T DO THIS -->
<div class="trust-overload">
  <img src="fake-ssl-badge.png" alt="SSL Secure">
  <img src="self-made-badge.png" alt="Certified Safe">
  <img src="generic-shield.png" alt="Protected">
  <img src="made-up-cert.png" alt="Security Verified">
  <img src="another-badge.png" alt="Trust Seal">
  <p>Protected by 7 layers of security!</p>
</div>`,
        explanation:
          'Fabricated or unrecognized trust badges are security theater — they create a false sense of zero risk without any real protection. Savvy users recognize fake badges and lose trust. The overload of badges paradoxically signals insecurity ("why do they need to try so hard?").',
        principle:
          'Security theater exploits zero risk bias without delivering real safety — users eventually discover the gap',
      },
      {
        title: 'Guarantee With Hidden Conditions',
        description:
          'Money-back guarantee with undisclosed restrictions that make it unusable',
        code: `<!-- DON'T DO THIS -->
<div class="guarantee">
  <h2>100% MONEY-BACK GUARANTEE!</h2>
  <p>Not happy? We'll refund every penny!</p>
  <button>Buy Now — Zero Risk!</button>
  <small style="color: #ccc; font-size: 0.6em;">
    *Refund requires written request within 7 days,
    $49 processing fee applies, approval at company discretion,
    digital products excluded, limit one refund per customer.
  </small>
</div>`,
        explanation:
          'The bold "100%" claim triggers zero risk bias, but the nearly invisible fine print reveals the guarantee is effectively useless. This is a bait-and-switch that destroys trust when users discover the conditions. The contrast between the large promise and tiny disclaimers is a classic dark pattern.',
        principle:
          'A fake zero-risk promise is worse than no promise at all — it creates active distrust',
      },
    ],

    realWorld: [
      {
        company: 'Norton',
        product: 'Norton 360 Virus Protection Promise',
        description: 'Norton offers a "Virus Protection Promise" — if your device gets a virus while using Norton 360, their experts will help remove it or you get a full refund. The "100% money back" framing leverages zero risk bias to make users feel fully protected against malware.',
        effectiveness: 'very-effective',
        analysis: 'Norton transforms a probabilistic protection (antivirus software is not 100% effective) into a perceived zero-risk proposition through the guarantee. Users feel they have nothing to lose — either they are protected, or they get their money back. This directly exploits zero risk bias.',
      },
      {
        company: 'Zappos',
        product: '365-Day Return Policy',
        description: 'Zappos offers a 365-day return policy with free shipping both ways. The generous, nearly unconditional guarantee eliminates purchase risk for shoes bought online — a category with high return anxiety.',
        effectiveness: 'very-effective',
        analysis: 'By making returns essentially zero-risk (free, easy, extended window), Zappos eliminates the primary barrier to online shoe purchasing. The policy became their most powerful differentiator and brand asset, driving word-of-mouth and repeat purchases.',
      },
      {
        company: 'Coca-Cola',
        product: 'Coca-Cola Zero / Zero Sugar Branding',
        description: 'Coca-Cola\'s "Zero Sugar" branding leverages the power of "zero" in the product name itself. The word "zero" implies complete elimination of sugar — no compromise, no "reduced," just zero.',
        effectiveness: 'effective',
        analysis: 'The "Zero" branding is more appealing than "Diet" or "Low Sugar" because it triggers zero risk bias around health concerns. Users perceive complete elimination of the sugar risk rather than a mere reduction. This rebranding significantly outperformed the "Diet" label with younger demographics.',
      },
      {
        company: 'TSA',
        product: 'Airport Security Theater',
        description: 'TSA security checkpoints involve visible, elaborate screening procedures (removing shoes, liquid restrictions, full-body scanners). Security experts note these measures catch few actual threats but create a feeling of complete safety.',
        effectiveness: 'somewhat-effective',
        analysis: 'This is a textbook example of zero risk bias exploitation at scale. The visible, zero-tolerance procedures make travelers feel "100% safe" even when security researchers demonstrate significant gaps. The bias toward visible risk elimination over statistical risk reduction drives public support for theatrical measures over more effective but invisible intelligence work.',
      },
    ],

    abTests: [
      {
        title: '"Risk-Free" vs "Free" Trial Messaging',
        hypothesis:
          'Adding "risk-free" language to trial offers will increase sign-ups by addressing zero risk bias',
        controlVersion: {
          description:
            'Trial CTA reading "Start Your Free 14-Day Trial" with a simple sign-up form',
          metrics: {
            conversionRate: '7.8%',
            timeOnPage: '1:45',
            scrollDepth: '52%',
          },
        },
        treatmentVersion: {
          description:
            'Trial CTA reading "Start Your Risk-Free Trial" with a checklist: no credit card, cancel anytime, zero penalties, data exportable',
          metrics: {
            conversionRate: '12.4%',
            timeOnPage: '2:30',
            scrollDepth: '68%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'The "risk-free" framing with explicit risk-elimination checklist increased trial conversions by 59%. Users spent more time reading the risk-elimination bullets, suggesting they were actively evaluating and dismissing perceived risks.',
          learnings: [
            '"Risk-free" outperforms "free" because it directly addresses the fear, not just the cost',
            'Enumerating specific eliminated risks (no card, cancel anytime) is more effective than a single guarantee statement',
            'Users who converted via risk-free messaging had 23% higher activation rates, suggesting reduced anxiety in the product too',
            'Effect was strongest for higher-priced plans where perceived risk was greatest',
          ],
        },
      },
      {
        title: 'Guarantee Badge Placement: Near CTA vs Page Footer',
        hypothesis:
          'Placing the money-back guarantee badge near the purchase button will increase conversions',
        controlVersion: {
          description:
            'Money-back guarantee mentioned in page footer, standard checkout flow',
          metrics: {
            conversionRate: '3.1%',
            clickThroughRate: '18%',
          },
        },
        treatmentVersion: {
          description:
            '"100% Money-Back Guarantee" badge placed directly below the "Buy Now" button with a one-line explanation',
          metrics: {
            conversionRate: '4.9%',
            clickThroughRate: '26%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Moving the guarantee badge to the point of decision (next to CTA) increased conversions by 58%. Zero risk bias is most effective when the risk-elimination message appears at the exact moment of commitment anxiety.',
          learnings: [
            'Trust signals must appear at the decision point, not in the footer',
            'A single prominent guarantee badge outperforms multiple scattered ones',
            'The "100%" language was critical — "Satisfaction Guarantee" alone did not perform as well',
            'Adding a brief explanation ("Full refund within 30 days, no questions") increased trust more than the badge alone',
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
        name: 'Absolute Safety Claims',
        description:
          'Language using "100%", "zero", "guaranteed", "completely", or "absolute" in relation to safety or risk',
        howToSpot:
          'Search for words like "100%", "zero risk", "guaranteed", "unhackable", "completely safe" in headings, badges, and CTAs',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Trust Badge Clusters',
        description:
          'Groups of security seals, certifications, or guarantee badges displayed together',
        howToSpot:
          'Look for rows or clusters of shield icons, lock icons, certification logos, or "verified" badges near checkout or sign-up flows',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Money-Back Guarantee Badges',
        description:
          'Visual badges or seals promising full refunds with zero-risk language',
        howToSpot:
          'Look for circular or shield-shaped badges with "100% Money Back", "Risk-Free", or guarantee language near purchase buttons',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Risk-Elimination Checklists',
        description:
          'Bulleted lists that systematically address and dismiss individual risks (no card, cancel anytime, etc.)',
        howToSpot:
          'Look for checkmark lists near trial or purchase CTAs that each negate a specific concern',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Zero-Metric Displays',
        description:
          'Prominent display of "0" as a metric — zero breaches, zero downtime, zero complaints',
        howToSpot:
          'Look for large "0" numbers displayed as achievement metrics, often on security or trust pages',
        severity: ImpactLevel.HIGH,
      },
    ],

    patterns: [
      {
        name: 'Complete Elimination Promise',
        description: 'Claims that a specific risk has been entirely removed rather than reduced',
        indicators: [
          '"100% money-back guarantee" language',
          '"Zero data breaches" metrics',
          '"Risk-free trial" offers',
          '"No credit card required" statements',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Trust Signal Clustering',
        description: 'Multiple trust badges, certifications, and guarantee seals grouped together to create a sense of total safety',
        indicators: [
          'SSL + SOC 2 + GDPR badges in a row',
          'Multiple payment security logos',
          'Certification + guarantee + review badges combined',
          'Shield and lock iconography',
        ],
        severity: ImpactLevel.MEDIUM,
        confidence: 'high',
      },
      {
        name: 'Anxiety-Point Intervention',
        description: 'Safety messaging positioned exactly where users experience commitment anxiety',
        indicators: [
          'Guarantee badge next to "Buy Now" button',
          'Security message on payment form',
          '"Cancel anytime" near subscription commitment',
          'Privacy assurance at data collection point',
        ],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Security Theater Pattern',
        description: 'Visible but superficial security measures designed to create a feeling of total safety without proportional real security',
        indicators: [
          'Self-created or unrecognized trust badges',
          'Excessive badge quantity (5+ badges)',
          'Vague security claims without specifics',
          'Dramatic language ("UNHACKABLE", "FORTRESS-LEVEL")',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'medium',
      },
    ],

    checklistQuestions: [
      'Are there claims using "100%", "zero", or "guaranteed" in the interface?',
      'Are trust badges from recognized, verifiable organizations or self-created?',
      'Is the guarantee messaging honest and achievable, or does it promise the impossible?',
      'Are guarantee conditions disclosed clearly or buried in fine print?',
      'Is the zero-risk messaging placed at decision/commitment points?',
      'Does the security messaging address users\' actual top concerns?',
      'Are multiple small risks addressed while a larger risk is ignored?',
      'Could a failure of the zero-risk promise destroy user trust?',
      'Is the design prioritizing risk elimination theater over genuine risk reduction?',
      'Are there accessibility alternatives for trust badge imagery (alt text, ARIA labels)?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in zero risk bias.

Analyze the provided design for zero risk bias patterns. Identify:

1. **Absolute Claims**: Language using "100%", "zero", "guaranteed", "completely safe", or similar
2. **Trust Signals**: Security badges, certifications, guarantee seals, and their placement
3. **Risk Elimination**: How specific risks are addressed — eliminated vs merely reduced
4. **Promise Credibility**: Whether zero-risk claims are honest and achievable
5. **Anxiety-Point Timing**: Whether risk-elimination messaging appears at decision points

For each pattern found:
- Identify the specific risk being addressed and the zero-risk claim
- Assess whether the claim is honest, achievable, and verifiable
- Determine if it addresses users' actual concerns or creates false comfort
- Evaluate whether genuine security measures back up the messaging
- Check for security theater vs real risk reduction

Consider:
- Is the design promising more safety than it can deliver?
- Are small risks being eliminated while larger risks go unaddressed?
- Do trust badges come from recognized, verifiable organizations?
- Are guarantee conditions transparent or hidden in fine print?
- Is the risk-elimination messaging accessible to all users?

Provide actionable recommendations for honest, effective use of zero risk bias in building user trust.`,

    outputSchema: {
      type: 'object',
      properties: {
        zeroRiskPatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              claim: { type: 'string' },
              achievable: { type: 'boolean' },
              credibilityScore: { type: 'number' },
              riskAddressed: { type: 'string' },
              ethical: { type: 'boolean' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'claim',
              'achievable',
              'ethical',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            claimHonesty: { type: 'number' },
            trustSignalQuality: { type: 'number' },
            riskCoverageBalance: { type: 'number' },
            ethicalScore: { type: 'number' },
          },
          required: [
            'claimHonesty',
            'trustSignalQuality',
            'riskCoverageBalance',
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
        'zeroRiskPatterns',
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
        title: 'Identify Users\' Primary Risk Concerns',
        description:
          'Research which specific risks prevent users from converting: financial loss, data exposure, commitment lock-in, product failure, etc.',
        example:
          'User research reveals that 68% of trial abandoners cite "fear of being charged after trial ends" as the primary concern',
        tips: [
          'Survey users who abandoned at key decision points',
          'Analyze support tickets for recurring safety and risk questions',
          'Prioritize risks by frequency and severity of concern',
        ],
      },
      {
        step: 2,
        title: 'Craft Honest Zero-Risk Promises',
        description:
          'For each identified risk, create a specific, truthful elimination statement that you can actually deliver on',
        example:
          '"No credit card required for trial" — a fully achievable zero-risk promise that eliminates the #1 concern',
        tips: [
          'Only promise what you can absolutely deliver',
          'Use specific language ("30-day full refund") not vague ("satisfaction guaranteed")',
          'If you cannot eliminate a risk, reduce it and say so honestly',
        ],
      },
      {
        step: 3,
        title: 'Position at Decision Points',
        description:
          'Place zero-risk messaging at the exact moments users experience commitment anxiety',
        example:
          'Money-back guarantee badge directly below the "Complete Purchase" button, not buried in the footer',
        tips: [
          'Map the user journey to identify anxiety peaks (checkout, sign-up, data entry)',
          'A/B test placement: near CTA vs sidebar vs above fold',
          'Ensure the message is visible without scrolling at the decision point',
        ],
      },
      {
        step: 4,
        title: 'Back Claims With Verifiable Evidence',
        description:
          'Support zero-risk claims with real certifications, audit results, and transparent terms',
        example:
          '"Zero breaches since 2018" backed by link to annual SOC 2 audit report',
        tips: [
          'Use recognized third-party certifications (SOC 2, ISO 27001, PCI DSS)',
          'Link to full guarantee terms — transparency builds trust',
          'Display verifiable metrics with time periods, not just "zero"',
        ],
      },
      {
        step: 5,
        title: 'Test and Measure Impact',
        description:
          'A/B test zero-risk messaging to measure conversion impact and monitor for promise failures',
        example:
          'Test "100% Money-Back Guarantee" vs "30-Day Refund Policy" vs no guarantee messaging',
        tips: [
          'Track conversion lift at each decision point',
          'Monitor refund/return rates to ensure promises are sustainable',
          'Measure long-term trust metrics, not just immediate conversion',
        ],
      },
    ],

    dos: [
      'Use zero-risk language only for promises you can genuinely keep',
      'Place trust signals and guarantees at decision/commitment points',
      'Be specific about what is guaranteed: amount, timeframe, conditions',
      'Use recognized, third-party certifications over self-created badges',
      'Address users\' actual top concerns, not generic safety messaging',
      'Provide transparent guarantee terms — clarity builds more trust than bold claims',
      'Combine zero-risk messaging with social proof (reviews, case studies)',
      'Test different zero-risk framings to find what resonates with your audience',
    ],

    donts: [
      'Don\'t claim "100% safe" or "unhackable" — no system can guarantee this',
      'Don\'t use fabricated or unrecognized trust badges',
      'Don\'t bury guarantee conditions in fine print while advertising "100% guaranteed"',
      'Don\'t use excessive trust badges — 2-3 strong ones outperform 10 weak ones',
      'Don\'t focus on eliminating trivial risks while ignoring users\' primary concerns',
      'Don\'t use zero-risk messaging for medical, health, or safety claims where absolutes are dangerous',
      'Don\'t copy competitors\' trust badges without earning the actual certifications',
      'Don\'t let zero-risk marketing outpace actual security and reliability investment',
    ],

    bestPractices: [
      {
        title: 'Achievable Absolutes Only',
        description:
          'Only use "100%" or "zero" language for promises that are structurally guaranteed — like "no credit card required" or "30-day full refund"',
        rationale:
          'A broken absolute promise causes more damage than never making one. Users remember betrayed guarantees forever.',
        example:
          '"No credit card required" is structurally guaranteed. "100% uptime" is not. Use the former freely; avoid the latter.',
      },
      {
        title: 'Contextual Trust Signals',
        description:
          'Place the right trust signal at the right moment: SSL near payment, guarantee near purchase, privacy near data collection',
        rationale:
          'Trust signals are most effective when they directly address the specific anxiety the user is feeling at that moment',
        example:
          'SSL badge on the payment form, "Cancel anytime" on the subscription page, "We never share your data" on the permissions dialog',
      },
      {
        title: 'Transparent Guarantee Terms',
        description:
          'State guarantee conditions clearly and prominently, not hidden in fine print',
        rationale:
          'A transparent 30-day guarantee builds more trust than a vague "100% guaranteed" with asterisks',
        example:
          '"Full refund within 30 days of purchase. Email support@example.com — refund processed in 3-5 business days. No questions asked."',
      },
      {
        title: 'Real Security Before Messaging',
        description:
          'Invest in genuine security measures before communicating safety claims',
        rationale:
          'Trust messaging without substance is security theater; one breach destroys years of badge-building',
        example:
          'Achieve SOC 2 Type II certification first, then display the badge. Not the other way around.',
      },
      {
        title: 'Balance Elimination With Reduction',
        description:
          'Where complete elimination is impossible, communicate meaningful risk reduction honestly',
        rationale:
          'Users respect honesty. "99.99% uptime SLA with financial credits" is credible; "100% uptime guaranteed" is not.',
        example:
          '"99.99% uptime over the last 12 months. If we miss our SLA, you receive automatic service credits."',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '1.1.1',
        guideline:
          'Non-text Content - Trust badges and security icons must have meaningful alt text',
        implementation:
          'Every trust badge image must have descriptive alt text: alt="SOC 2 Type II Certified" not alt="badge" or alt=""',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.4.1',
        guideline:
          'Use of Color - Don\'t rely only on green/blue color to signal safety',
        implementation:
          'Combine safety colors with text labels, icons, and semantic HTML so all users perceive the trust signal regardless of color vision',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships - Guarantee terms must be programmatically associated with the guarantee claim',
        implementation:
          'Use ARIA attributes to connect guarantee badges with their terms. Screen readers should announce both the claim and conditions together.',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.4.6',
        guideline:
          'Headings and Labels - Security and guarantee sections need clear, descriptive headings',
        implementation:
          'Use semantic headings for trust sections so screen reader users can navigate directly to security information',
      },
    ],

    ethics: [
      {
        concern: 'Impossible Guarantees',
        severity: 'critical',
        explanation:
          'Claiming "100% safe," "unhackable," or "zero risk" when no system can truly guarantee this',
        mitigation:
          'Only use absolute language for structurally guaranteed promises (e.g., "no credit card required"). For security, use honest language like "SOC 2 certified" or "zero breaches in N years."',
      },
      {
        concern: 'Hidden Guarantee Conditions',
        severity: 'critical',
        explanation:
          'Advertising "100% money-back guarantee" while burying restrictive conditions in fine print',
        mitigation:
          'State guarantee terms clearly and prominently. If there are conditions (timeframe, processing fee), disclose them at the same visual prominence as the guarantee itself.',
      },
      {
        concern: 'Security Theater',
        severity: 'high',
        explanation:
          'Displaying trust badges and safety claims without genuine security measures behind them',
        mitigation:
          'Earn certifications before displaying them. Only use badges from recognized organizations. Invest in real security proportional to your claims.',
      },
      {
        concern: 'Trivial Risk Elimination',
        severity: 'medium',
        explanation:
          'Loudly eliminating a minor risk to distract from a major unaddressed risk',
        mitigation:
          'Address users\' primary risk concerns first. Be transparent about known limitations. Don\'t use minor guarantees to deflect from major shortcomings.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'Biases in Allocation of Protective Action and the Zero-Risk Controversy',
        author: 'Baron, J., Gowda, R., & Kunreuther, H.',
        year: 2001,
        description:
          'Key study demonstrating that people prefer complete elimination of small risks over larger overall risk reduction',
        type: 'foundational',
      },
      {
        title: 'Risk Assessment When the Subject is Human',
        author: 'Viscusi, W. K., Magat, W. A., & Huber, J.',
        year: 1987,
        doi: '10.1007/BF00058498',
        description:
          'Foundational research on how people evaluate risk tradeoffs, showing disproportionate preference for risk elimination',
        type: 'foundational',
      },
      {
        title: 'The Zero-Risk Bias in the Selection of Protective Actions',
        author: 'Baron, J.',
        year: 1995,
        description:
          'Demonstrates that zero-risk preference persists even when alternatives provide greater expected utility',
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
          'Covers the certainty effect and related biases that underpin zero risk bias — the disproportionate weight given to certain outcomes',
        type: 'foundational',
      },
      {
        title: 'Against the Gods: The Remarkable Story of Risk',
        author: 'Bernstein, Peter L.',
        year: 1998,
        isbn: '9780471295631',
        description:
          'Comprehensive history of risk perception and decision-making, providing context for why humans crave certainty',
        type: 'foundational',
      },
    ],

    articles: [
      {
        title: 'The Psychology Behind Trust Badges and How They Affect Conversions',
        author: 'Baymard Institute',
        url: 'https://baymard.com/blog/trust-seal-placement',
        description:
          'Research-backed analysis of how trust badges exploit zero risk bias to increase e-commerce conversions',
        type: 'practical',
      },
      {
        title: 'Zero Risk Bias in Product Design',
        author: 'Growth.Design',
        url: 'https://growth.design/case-studies/zero-risk-bias',
        description:
          'Visual case study of zero risk bias patterns in real product interfaces',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'Zero Risk Bias Explained',
        author: 'Decision Lab',
        url: 'https://thedecisionlab.com/biases/zero-risk-bias',
        description:
          'Clear explanation of zero risk bias with real-world examples and implications for design',
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
