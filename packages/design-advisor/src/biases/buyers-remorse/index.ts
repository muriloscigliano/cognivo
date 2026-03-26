/**
 * BUYER'S REMORSE
 *
 * We regret purchases after the excitement fades
 */


import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const buyersRemorse: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'buyers-remorse',
    name: 'Buyer\'s Remorse',
    aliases: ['Post-Purchase Regret', 'Buyer\'s Remorse'],
    category: BiasCategory.DECISION_MAKING,
    relatedCategories: [
      BiasCategory.DECISION_MAKING,
      BiasCategory.PERCEPTION,
      BiasCategory.MEMORY,
    ],
    tags: [
      'regret',
      'purchase',
      'decision-anxiety',
      'post-purchase',
      'commitment',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple: 'We regret purchases after the excitement fades',

    detailed: `Buyer's remorse is the sense of regret, anxiety, or doubt that occurs after making a purchase, especially one that is expensive, irreversible, or high-stakes. It stems from cognitive dissonance: the uncomfortable tension between having committed resources and wondering whether the decision was correct.

The intensity of remorse scales with the magnitude of the commitment. Large purchases (homes, cars, enterprise software), subscriptions with lock-in periods, and decisions that are difficult to reverse trigger the strongest post-purchase doubt. The gap between pre-purchase excitement and post-purchase reality creates fertile ground for regret.

In UX and product design, buyer's remorse is a critical retention and satisfaction variable. The post-purchase experience — confirmation screens, welcome emails, onboarding flows, return policies, and ongoing reassurance — determines whether the initial doubt resolves into satisfaction or escalates into churn, refund requests, and negative reviews.`,

    psychologyBasis: {
      discoveredBy: 'Leon Festinger',
      year: 1957,
      theory: 'Cognitive Dissonance Theory',
      mechanism: `After committing to a purchase, the brain experiences dissonance between the decision made and the alternatives foregone. This happens because:

1. **Post-Decisional Dissonance**: Once a choice is made, the attractive features of rejected alternatives and the drawbacks of the chosen option become salient, creating internal conflict
2. **Loss of Optionality**: The act of purchasing eliminates other possibilities, triggering a sense of loss for paths not taken
3. **Escalating Doubt**: Without external reassurance, the mind replays the decision and amplifies uncertainties about whether it was correct
4. **Expectation-Reality Gap**: Pre-purchase marketing creates high expectations; any gap between the promise and the initial experience amplifies regret
5. **Social Comparison**: Seeing others with different choices or better deals intensifies doubt about one's own decision

The mechanism is strongest immediately after purchase and typically fades as the buyer begins experiencing value from their decision — but only if value delivery is timely and visible.`,
    },

    realWorldExample: `A customer buys a $2,000 laptop online. Immediately after clicking "Place Order," doubt creeps in: Was this the right model? Could I have found it cheaper? Do I really need this? They search for reviews and competitor prices, finding confirming and disconfirming evidence that feeds anxiety.

Amazon counters this with an immediate confirmation email, detailed order tracking, estimated delivery date, and easy return policy. Apple goes further: the unboxing experience itself is designed to make buyers feel they made a premium, worthy choice. These post-purchase touchpoints resolve dissonance by reinforcing the decision's value before doubt can escalate into a return or negative review.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `Buyer's remorse affects retention, refund rates, customer satisfaction, and lifetime value. The post-purchase experience is the critical window where doubt either resolves into confidence or escalates into regret. Designers can address this by:

- Providing immediate confirmation and reassurance after purchase
- Delivering visible value quickly to close the expectation-reality gap
- Making return and support processes transparent and easy to find
- Sending well-timed post-purchase communications that reinforce the decision
- Creating unboxing and onboarding experiences that reward the commitment`,

    whenToUse: [
      {
        title: 'Post-Purchase Confirmation',
        scenario:
          'Immediately after a user completes a purchase or signs up for a paid plan',
        example:
          'Show a "Great choice!" confirmation screen with order summary, next steps, and what to expect',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Onboarding and Welcome Flows',
        scenario: 'When a new paying customer first enters the product',
        example:
          'Deliver a welcome email sequence that highlights key features and quick wins to demonstrate immediate value',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Order Tracking and Updates',
        scenario: 'Between purchase and delivery for physical or digital products',
        example:
          'Provide real-time order tracking with status updates, estimated arrival, and preparation milestones',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Return Policy Visibility',
        scenario: 'During and after the purchase flow to reduce commitment anxiety',
        example:
          'Display a clear, generous return policy prominently on confirmation pages and post-purchase emails',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Subscription Renewal Reassurance',
        scenario: 'Before and during subscription renewal cycles',
        example:
          'Send a value summary showing what the user accomplished with the product before renewal',
        impact: ImpactLevel.MEDIUM,
      },
      {
        title: 'High-Stakes Purchase Decisions',
        scenario: 'When users are buying expensive items, signing contracts, or making irreversible commitments',
        example:
          'Provide comparison summaries, buyer guides, and post-purchase support contacts to ease commitment anxiety',
        impact: ImpactLevel.HIGH,
      },
    ],

    whenToAvoid: [
      {
        title: 'Pre-Purchase Manipulation',
        reason:
          'Using buyer\'s remorse awareness to pressure users into purchasing before they\'re ready',
        consequence:
          'Higher refund rates, lower satisfaction, and damaged trust',
        alternative:
          'Let users make informed decisions at their own pace; address remorse after, not by preventing deliberation before',
      },
      {
        title: 'Over-Reassurance That Feels Hollow',
        reason:
          'Excessive "you made a great choice" messaging without substance feels patronizing',
        consequence:
          'Users see through empty reassurance, which increases rather than decreases doubt',
        alternative:
          'Back up reassurance with concrete value: delivery timelines, feature access, quick-start guides',
      },
      {
        title: 'Hiding Return Processes',
        reason:
          'Making returns difficult to prevent refunds amplifies remorse and destroys trust',
        consequence:
          'Negative reviews, chargebacks, and permanent customer loss',
        alternative:
          'Make returns easy and visible; paradoxically, easy returns reduce return rates by lowering purchase anxiety',
      },
      {
        title: 'Spam-Level Post-Purchase Communication',
        reason:
          'Flooding users with excessive emails or notifications after purchase creates fatigue',
        consequence:
          'Users unsubscribe, mark as spam, and associate the brand with annoyance',
        alternative:
          'Send timely, relevant, and spaced-out communications that each deliver genuine value',
      },
    ],

    commonMistakes: [
      {
        title: 'Silent Post-Purchase Experience',
        description:
          'No communication or guidance after the user pays — they\'re left alone with their doubt',
        why: 'The absence of reassurance lets cognitive dissonance run unchecked, escalating into regret',
        fix: 'Implement a post-purchase communication sequence: confirmation, tracking, welcome, quick-win guide',
      },
      {
        title: 'Delayed Value Delivery',
        description:
          'The gap between paying and experiencing value is too long',
        why: 'The longer the wait, the more time doubt has to build and the higher the expectation-reality gap becomes',
        fix: 'Deliver something valuable immediately: instant access, a quick tutorial, a downloadable resource, or a preview',
      },
      {
        title: 'Burying the Return Policy',
        description:
          'Return or cancellation information is hidden in fine print or hard to find',
        why: 'Users who feel trapped become anxious buyers who leave negative reviews even if they keep the product',
        fix: 'Display return policy on confirmation screen, in confirmation email, and in account settings',
      },
      {
        title: 'Generic Confirmation Pages',
        description:
          'A bland "Thank you for your order" page with no personality or next steps',
        why: 'This is the moment of highest doubt; a generic page does nothing to resolve dissonance',
        fix: 'Create a rich confirmation experience: celebrate the decision, show next steps, set expectations, provide support access',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.HIGH,
        description:
          'Post-purchase page layout determines how quickly users find reassurance and next steps',
        examples: [
          'Confirmation pages that lead with celebration and order details above the fold',
          'Clear visual hierarchy: order summary, then next steps, then support options',
          'Return policy and support links visible without scrolling',
          'Progress indicators showing order status and delivery timeline',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Text tone and hierarchy shape the emotional experience after purchase',
        examples: [
          'Warm, congratulatory headlines that validate the decision',
          'Clear, readable order details that reduce uncertainty',
          'Prominent next-step instructions that give the buyer agency',
          'Friendly, conversational tone in post-purchase emails',
        ],
      },
      color: {
        level: ImpactLevel.MEDIUM,
        description:
          'Color reinforces emotional state in the critical post-purchase window',
        examples: [
          'Success green on confirmation screens signals positive outcome',
          'Warm, inviting colors in welcome emails create positive associations',
          'Avoid alarming red or warning colors near post-purchase content',
          'Brand-consistent colors that reinforce identity and trust',
        ],
      },
      interaction: {
        level: ImpactLevel.CRITICAL,
        description:
          'Post-purchase interactions are the primary mechanism for resolving or amplifying doubt',
        examples: [
          'Interactive order tracking that lets users check status anytime',
          'Easy one-click access to support or cancellation without friction',
          'Onboarding checklists that guide users to first value quickly',
          'Proactive notifications at key milestones (shipped, delivered, first-use)',
        ],
      },
      content: {
        level: ImpactLevel.CRITICAL,
        description:
          'Post-purchase content is the primary tool for transforming doubt into satisfaction',
        examples: [
          'Confirmation emails with clear order details and expected timelines',
          'Welcome sequences that highlight quick wins and key features',
          'Social proof in post-purchase context: "Join 50,000 customers who love this"',
          'Value reinforcement: showing what the product will help them achieve',
        ],
      },
      accessibility: {
        level: ImpactLevel.HIGH,
        description:
          'All users must have equal access to post-purchase reassurance and support',
        examples: [
          'Screen reader-accessible order confirmations with clear status information',
          'Keyboard-navigable order tracking and support interfaces',
          'Plain-text email alternatives alongside HTML for assistive technology',
          'Clear, simple language in post-purchase communications for cognitive accessibility',
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
        title: 'Celebratory Confirmation Screen',
        description:
          'E-commerce confirmation page that validates the purchase and sets expectations',
        code: `<div class="confirmation-page">
  <div class="celebration">
    <h2>Great choice! Your order is confirmed.</h2>
    <p class="order-number">Order #A7291 &middot; Confirmation sent to you@email.com</p>
  </div>

  <div class="order-summary">
    <h3>What you're getting</h3>
    <div class="item">
      <img src="product.jpg" alt="Premium Wireless Headphones">
      <div class="details">
        <p class="name">Premium Wireless Headphones</p>
        <p class="highlight">Rated 4.8/5 by 12,000+ customers</p>
      </div>
    </div>
  </div>

  <div class="next-steps">
    <h3>What happens next</h3>
    <ol class="timeline">
      <li class="complete">Order confirmed</li>
      <li class="pending">Preparing your order (1-2 days)</li>
      <li class="pending">Shipped &mdash; tracking email sent</li>
      <li class="pending">Delivered by March 25</li>
    </ol>
  </div>

  <div class="reassurance">
    <p>Free returns within 30 days &middot; <a href="/returns">Easy return process</a></p>
    <p>Questions? <a href="/support">Contact support</a> anytime.</p>
  </div>
</div>`,
        explanation:
          'The page immediately validates the decision ("Great choice!"), reinforces social proof (4.8/5 from 12,000+ customers), sets clear delivery expectations, and prominently shows the easy return policy — all of which resolve post-purchase dissonance.',
        principle:
          'Immediate confirmation, social proof, clear timeline, and visible safety net reduce post-purchase doubt',
        metrics: {
          before: '8.2% return rate with generic confirmation page',
          after: '5.1% return rate with rich confirmation experience',
          improvement: '38% reduction in returns',
        },
      },
      {
        title: 'Post-Purchase Welcome Email Sequence',
        description:
          'SaaS welcome email that delivers immediate value and reassurance',
        code: `<div class="welcome-email">
  <h1>Welcome to ProAnalytics, Sarah!</h1>
  <p class="subtitle">You just unlocked insights that 8,000+ teams rely on daily.</p>

  <div class="quick-win">
    <h2>Get your first insight in 3 minutes</h2>
    <ol>
      <li>Connect your data source (we support 40+ integrations)</li>
      <li>Choose a template dashboard</li>
      <li>See your first automated insight</li>
    </ol>
    <a href="/onboarding" class="cta-button">Start now</a>
  </div>

  <div class="value-summary">
    <h3>What your Pro plan includes</h3>
    <ul>
      <li>Unlimited dashboards &amp; reports</li>
      <li>AI-powered anomaly detection</li>
      <li>Priority support (avg. response: 2 hours)</li>
    </ul>
  </div>

  <div class="safety-net">
    <p>Not sure yet? Your plan includes a 14-day money-back guarantee.
    Cancel anytime from <a href="/settings">Settings</a>.</p>
    <p>Reply to this email anytime &mdash; a real person will help you.</p>
  </div>
</div>`,
        explanation:
          'The email personalizes with the user\'s name, reinforces social proof, provides a 3-minute quick-win path to value, summarizes what they\'re getting, and offers a clear safety net. Every element is designed to resolve dissonance before it becomes regret.',
        principle:
          'Immediate value delivery and visible safety nets close the expectation-reality gap',
        metrics: {
          before: '22% of new subscribers cancelled within 7 days',
          after: '11% cancellation rate with welcome sequence',
          improvement: '50% reduction in early churn',
        },
      },
      {
        title: 'Easy Returns Experience',
        description:
          'Return process designed to be frictionless, paradoxically reducing return rates',
        code: `<div class="returns-page">
  <h2>Easy Returns</h2>
  <p class="policy">Return any item within 30 days, no questions asked.</p>

  <div class="return-steps">
    <div class="step">
      <span class="step-number">1</span>
      <h3>Select items to return</h3>
      <p>Choose from your recent orders below</p>
    </div>
    <div class="step">
      <span class="step-number">2</span>
      <h3>Print your free label</h3>
      <p>We cover return shipping &mdash; always</p>
    </div>
    <div class="step">
      <span class="step-number">3</span>
      <h3>Drop off or schedule pickup</h3>
      <p>Refund processed within 2 business days</p>
    </div>
  </div>

  <div class="alternative">
    <h3>Not quite right? We can help.</h3>
    <button class="secondary">Exchange for different size/color</button>
    <button class="secondary">Chat with a product expert</button>
  </div>
</div>`,
        explanation:
          'The return process is transparent, simple, and free. Paradoxically, making returns easy reduces buyer\'s remorse because customers feel less trapped. Offering alternatives (exchange, expert help) resolves issues without losing the sale.',
        principle:
          'Easy returns reduce purchase anxiety and paradoxically lower actual return rates',
      },
    ],

    bad: [
      {
        title: 'Silent Post-Purchase Void',
        description:
          'No confirmation, no tracking, no communication after purchase',
        code: `<!-- DON'T DO THIS -->
<div class="confirmation">
  <p>Thank you for your order.</p>
  <p>Order #7291</p>
</div>
<!-- No email. No tracking. No next steps. No support link. -->
<!-- User is left alone with their doubt. -->`,
        explanation:
          'A bare-minimum confirmation with no follow-up leaves users in a post-purchase vacuum. With no reassurance, no timeline, and no easy way to get help, doubt escalates unchecked into regret and refund requests.',
        principle:
          'Absence of post-purchase communication amplifies cognitive dissonance',
      },
      {
        title: 'Hostile Return Process',
        description:
          'Returns are technically possible but designed to be as difficult as possible',
        code: `<!-- DON'T DO THIS -->
<div class="return-policy">
  <p style="font-size: 0.7em; color: #999;">
    Returns accepted within 14 days with original packaging
    and receipt. Customer pays return shipping. Restocking
    fee of 15% applies. Allow 4-6 weeks for refund processing.
    Contact support@company.com to initiate (response time: 3-5 business days).
  </p>
</div>`,
        explanation:
          'A restrictive, hard-to-find return policy with fees, slow processing, and friction makes buyers feel trapped. This intensifies remorse rather than preventing returns, leading to chargebacks, negative reviews, and permanent customer loss.',
        principle:
          'Difficult returns amplify buyer\'s remorse and destroy trust',
      },
      {
        title: 'No Value Delivery After SaaS Purchase',
        description:
          'User pays for a subscription but gets dumped into an empty product with no guidance',
        code: `<!-- DON'T DO THIS -->
<div class="dashboard-empty">
  <h2>Welcome to YourApp</h2>
  <p>Your account is active.</p>
  <div class="empty-state">
    <p>No data yet. Get started by configuring your settings.</p>
    <a href="/settings">Go to settings</a>
  </div>
</div>
<!-- No onboarding. No quick wins. No guidance.
     User just paid $49/mo and sees... nothing. -->`,
        explanation:
          'After paying, the user sees an empty dashboard with no guidance. The gap between the marketing promise and this empty reality maximizes dissonance. Without immediate value delivery, the user questions their decision and may cancel.',
        principle:
          'Empty post-purchase experiences widen the expectation-reality gap',
      },
    ],

    realWorld: [
      {
        company: 'Amazon',
        product: 'Order Confirmation & Tracking',
        description: 'Amazon sends immediate order confirmation, provides real-time tracking with map visualization, sends delivery notifications, and makes returns effortless through pre-paid labels and drop-off locations. The entire post-purchase experience is designed to eliminate uncertainty.',
        effectiveness: 'very-effective',
        analysis: 'Amazon\'s post-purchase system is a gold standard for remorse prevention. Immediate confirmation, granular tracking, and frictionless returns create a safety net so robust that purchase anxiety is nearly eliminated. This contributes directly to high repeat purchase rates.',
      },
      {
        company: 'Apple',
        product: 'Unboxing Experience',
        description: 'Apple designs the unboxing experience as a premium ritual: magnetic closures, perfectly fitted packaging, the product presented face-up and ready to use. The tactile experience reinforces that the buyer made a worthy, premium choice the moment they open the box.',
        effectiveness: 'very-effective',
        analysis: 'The unboxing experience resolves cognitive dissonance through sensory reinforcement. The premium feel confirms the premium price. Apple users frequently share unboxing experiences, turning remorse resolution into social marketing.',
      },
      {
        company: 'Warby Parker',
        product: 'Home Try-On & Easy Returns',
        description: 'Warby Parker offers free home try-on for 5 frames before purchase, and free returns after purchase. By removing commitment risk, they dramatically reduce the anxiety that leads to buyer\'s remorse for a product that is hard to choose online.',
        effectiveness: 'very-effective',
        analysis: 'The try-before-you-buy model eliminates the primary source of eyewear buyer\'s remorse: "Will these look good on me?" By frontloading the experience and making returns free, Warby Parker collapses the dissonance window to near-zero.',
      },
      {
        company: 'Slack',
        product: 'SaaS Welcome & Onboarding',
        description: 'After a team subscribes to Slack Pro, they receive a personalized welcome email, an onboarding checklist in-app, and proactive tips that guide them to quick wins (connecting integrations, creating channels). The time-to-value is measured in minutes, not days.',
        effectiveness: 'effective',
        analysis: 'Slack\'s onboarding collapses the gap between purchase and value delivery. By guiding teams to immediate utility (messaging, integrations, channels), the product justifies its cost before doubt has time to build. Proactive tips prevent the empty-dashboard problem.',
      },
      {
        company: 'Zappos',
        product: '365-Day Return Policy',
        description: 'Zappos offers a 365-day return policy with free return shipping. This extreme generosity eliminates purchase anxiety for online shoe buying, where fit uncertainty is the primary source of buyer\'s remorse.',
        effectiveness: 'very-effective',
        analysis: 'Counter-intuitively, Zappos\' generous return policy reduces return rates by lowering purchase anxiety. Customers buy with confidence, feel less trapped, and experience less dissonance. The policy also generates word-of-mouth and repeat purchases.',
      },
    ],

    abTests: [
      {
        title: 'Post-Purchase Email: Rich Reassurance vs Basic Confirmation',
        hypothesis:
          'A rich post-purchase email with value reinforcement and next steps will reduce early cancellations compared to a basic order confirmation',
        controlVersion: {
          description:
            'Basic confirmation email: "Thank you for your purchase. Order #12345. You will receive a shipping notification."',
          metrics: {
            conversionRate: 'N/A',
            timeOnPage: 'N/A',
            scrollDepth: 'N/A',
          },
        },
        treatmentVersion: {
          description:
            'Rich welcome email: personalized greeting, social proof ("Join 50,000+ happy customers"), 3-step quick-start guide, value summary of what\'s included, visible return policy, and direct support contact',
          metrics: {
            conversionRate: 'N/A',
            timeOnPage: 'N/A',
            scrollDepth: 'N/A',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'The rich welcome email reduced 7-day cancellation rates by 41% and reduced support tickets by 28%. Users who engaged with the quick-start guide had 3x higher 30-day retention. The visible return policy, paradoxically, correlated with fewer actual returns.',
          learnings: [
            'Post-purchase reassurance directly reduces early churn',
            'Quick-win guidance accelerates value delivery and resolves dissonance',
            'Visible return policies reduce anxiety without increasing returns',
            'Personalization (name, plan details) increases engagement with reassurance content',
          ],
        },
      },
      {
        title: 'Confirmation Page: Minimal vs Celebration Design',
        hypothesis:
          'A celebratory confirmation page with social proof and next steps will reduce return/refund rates compared to a minimal confirmation',
        controlVersion: {
          description:
            'Minimal confirmation: "Order confirmed. Order #12345. You will receive a confirmation email."',
          metrics: {
            conversionRate: 'N/A',
            timeOnPage: '0:08',
            scrollDepth: '10%',
          },
        },
        treatmentVersion: {
          description:
            'Celebratory confirmation: "Great choice!" headline, product image with star rating, delivery timeline, customer quote, visible return policy, and recommended next steps',
          metrics: {
            conversionRate: 'N/A',
            timeOnPage: '0:34',
            scrollDepth: '72%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'The celebratory confirmation page correlated with a 31% reduction in return requests within 48 hours. Users spent 4x longer on the page, engaged with next steps, and were 23% more likely to make a second purchase within 30 days.',
          learnings: [
            'The confirmation page is a high-leverage moment for resolving buyer doubt',
            'Social proof on confirmation pages reinforces the decision after it\'s made',
            'Delivery timelines reduce uncertainty and the impulse to cancel',
            'Users who engage with post-purchase content have higher lifetime value',
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
        name: 'Post-Purchase Void',
        description:
          'Minimal or absent confirmation screen with no follow-up communication',
        howToSpot:
          'Check if the confirmation page has only a generic "thank you" with no next steps, timeline, or support links',
        severity: ImpactLevel.CRITICAL,
      },
      {
        name: 'Hidden Return Information',
        description:
          'Return or cancellation policies buried in fine print or hard-to-find pages',
        howToSpot:
          'Look for return policy links — if they require more than one click from the confirmation page, they\'re too hidden',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Empty Onboarding State',
        description:
          'New paying users land on an empty dashboard or product with no guidance',
        howToSpot:
          'Sign up as a new user and check if the first screen after payment delivers value or shows emptiness',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Absence of Social Proof Post-Purchase',
        description:
          'No reinforcement that others have made the same choice and are happy with it',
        howToSpot:
          'Check post-purchase screens and emails for customer counts, ratings, or testimonials',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'No Delivery Timeline',
        description:
          'No indication of when the user will receive their product or access their service',
        howToSpot:
          'Look for delivery estimates, shipping timelines, or onboarding milestones on confirmation pages',
        severity: ImpactLevel.HIGH,
      },
    ],

    patterns: [
      {
        name: 'Post-Purchase Reassurance Pattern',
        description: 'Systematic confirmation, tracking, and welcome communications after purchase',
        indicators: ['Celebratory confirmation page with order details', 'Post-purchase email sequence', 'Order tracking with status updates', 'Visible return policy and support access'],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Time-to-Value Pattern',
        description: 'How quickly the buyer experiences concrete value after committing',
        indicators: ['Quick-start guides or onboarding checklists', 'Immediate access to core features', 'Template or sample content pre-loaded', 'First-use tutorials or walkthroughs'],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Safety Net Pattern',
        description: 'Visible escape routes that reduce commitment anxiety',
        indicators: ['Prominent return policy on confirmation pages', 'Easy cancellation flow in account settings', 'Money-back guarantee messaging', 'Free trial or try-before-buy options'],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Value Reinforcement Pattern',
        description: 'Ongoing reminders of the value the buyer is receiving',
        indicators: ['Usage summaries or progress reports', 'Feature highlight emails', '"You saved X hours" or "You achieved Y" notifications', 'Renewal summaries showing value delivered'],
        severity: ImpactLevel.MEDIUM,
        confidence: 'medium',
      },
    ],

    checklistQuestions: [
      'What does the user see immediately after completing a purchase?',
      'Is there a post-purchase email sequence that reinforces the decision?',
      'How quickly does the buyer experience concrete value from their purchase?',
      'Is the return or cancellation policy easy to find and understand?',
      'Does the confirmation page celebrate the decision or just acknowledge it?',
      'Is there social proof on post-purchase screens (reviews, customer counts)?',
      'Are delivery timelines or access instructions clearly communicated?',
      'Is there an onboarding flow that guides new buyers to quick wins?',
      'Does the post-purchase experience match the pre-purchase marketing promise?',
      'Are there proactive support touchpoints during the first week after purchase?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in buyer's remorse and post-purchase experience design.

Analyze the provided design for buyer's remorse patterns. Identify:

1. **Post-Purchase Confirmation**: Quality of confirmation screens, emails, and immediate feedback
2. **Value Delivery Speed**: How quickly the buyer experiences tangible value after purchase
3. **Safety Net Visibility**: How easy it is to find return policies, cancellation, and support
4. **Expectation Management**: Whether pre-purchase promises align with post-purchase reality
5. **Ongoing Reassurance**: Whether there are value reinforcement touchpoints over time

For each pattern found:
- Identify what it does well or poorly for resolving post-purchase doubt
- Assess the time gap between purchase and first value experience
- Determine if return/cancellation policies are transparent and accessible
- Evaluate whether the experience reduces or amplifies cognitive dissonance
- Suggest improvements for reducing buyer's remorse

Consider:
- Is the confirmation page celebratory or merely transactional?
- How long until the buyer gets concrete value from their purchase?
- Would a first-time buyer feel reassured or abandoned after purchasing?
- Are return policies visible and easy, or hidden and hostile?
- Is there social proof reinforcing the decision after it's made?

Provide actionable recommendations for improving the post-purchase experience.`,

    outputSchema: {
      type: 'object',
      properties: {
        remorseRiskFactors: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              severity: { type: 'string' },
              description: { type: 'string' },
              currentExperience: { type: 'string' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'severity',
              'description',
              'recommendation',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            confirmationQuality: { type: 'number' },
            timeToValue: { type: 'number' },
            safetyNetVisibility: { type: 'number' },
            reassuranceScore: { type: 'number' },
          },
          required: [
            'confirmationQuality',
            'timeToValue',
            'safetyNetVisibility',
            'reassuranceScore',
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
        'remorseRiskFactors',
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
        title: 'Design the Confirmation Moment',
        description:
          'Create a confirmation page that celebrates the decision, summarizes the purchase, and sets clear expectations',
        example:
          'Show "Great choice!" with order details, delivery timeline, and social proof (e.g., "Rated 4.8/5 by 12,000 customers")',
        tips: [
          'Lead with celebration, not just transactional acknowledgment',
          'Include the product image and key details so the buyer sees what they\'re getting',
          'Show the next step clearly so the buyer knows what to expect',
        ],
      },
      {
        step: 2,
        title: 'Deliver Value Immediately',
        description:
          'Close the gap between purchase and first value experience as quickly as possible',
        example:
          'For SaaS: provide a quick-start guide that gets users to their first insight in under 5 minutes. For e-commerce: offer immediate access to a digital resource or loyalty reward',
        tips: [
          'Identify the fastest possible "aha moment" for your product',
          'Pre-load templates, samples, or content so the product doesn\'t feel empty',
          'Track time-to-first-value as a key metric',
        ],
      },
      {
        step: 3,
        title: 'Make Safety Nets Visible',
        description:
          'Display return policies, cancellation options, and support access prominently in post-purchase touchpoints',
        example:
          'Add "Free returns within 30 days" to the confirmation page, confirmation email, and account dashboard',
        tips: [
          'Easy returns reduce purchase anxiety and paradoxically lower return rates',
          'Place return policy within one click of any post-purchase screen',
          'Offer live chat or easy support access during the first 48 hours',
        ],
      },
      {
        step: 4,
        title: 'Build a Post-Purchase Communication Sequence',
        description:
          'Send a series of timely, value-adding emails that reinforce the decision and guide the buyer to success',
        example:
          'Day 0: Confirmation email. Day 1: Quick-start guide. Day 3: Feature highlight. Day 7: "How\'s it going?" check-in with support link',
        tips: [
          'Each email should deliver genuine value, not just marketing',
          'Personalize with the buyer\'s name, product, and plan details',
          'Space emails to avoid fatigue but maintain presence during the doubt window',
        ],
      },
      {
        step: 5,
        title: 'Reinforce Value Over Time',
        description:
          'Provide ongoing proof that the purchase was worthwhile through usage summaries, achievements, and renewal communications',
        example:
          'Monthly summary: "This month you saved 14 hours with ProAnalytics" sent before renewal',
        tips: [
          'Track and surface the buyer\'s actual value gained',
          'Send value summaries before renewal periods',
          'Celebrate milestones and achievements to create positive associations',
        ],
      },
    ],

    dos: [
      'Celebrate the purchase decision on confirmation screens',
      'Deliver concrete value within minutes of purchase, not days',
      'Display return and cancellation policies prominently and make them easy',
      'Send a post-purchase email sequence that reinforces value and provides guidance',
      'Include social proof on post-purchase screens to validate the decision',
      'Provide clear delivery timelines or access instructions',
      'Offer proactive support during the first week after purchase',
      'Track time-to-first-value as a key retention metric',
    ],

    donts: [
      'Don\'t leave buyers alone after payment with no follow-up communication',
      'Don\'t bury return policies in fine print or make returns deliberately difficult',
      'Don\'t show an empty product state after a paid signup — pre-load value',
      'Don\'t send excessive post-purchase emails that create fatigue and annoyance',
      'Don\'t use buyer\'s remorse awareness to pressure pre-purchase decisions',
      'Don\'t promise features or experiences in marketing that the product can\'t deliver',
      'Don\'t make cancellation harder than signup — it destroys trust permanently',
      'Don\'t ignore the post-purchase experience in favor of acquisition-only design',
    ],

    bestPractices: [
      {
        title: 'Collapse the Value Gap',
        description:
          'Minimize the time between payment and first concrete value experience',
        rationale:
          'The longer the gap between paying and receiving value, the more time doubt has to build into regret',
        example:
          'SaaS: guided onboarding to first insight in 3 minutes. E-commerce: instant digital bonus with physical order',
      },
      {
        title: 'Make Returns Generous and Visible',
        description:
          'Offer easy, clearly communicated return policies that reduce commitment anxiety',
        rationale:
          'Paradoxically, generous return policies reduce both purchase anxiety and actual return rates',
        example:
          'Zappos\' 365-day return policy with free shipping generates loyalty and reduces remorse',
      },
      {
        title: 'Design the Unboxing Moment',
        description:
          'Whether physical or digital, make the first experience after purchase feel premium and intentional',
        rationale:
          'The unboxing moment is where dissonance either resolves ("This was worth it") or escalates ("This doesn\'t match what I expected")',
        example:
          'Apple\'s packaging design or Notion\'s onboarding templates — both make first contact feel valuable',
      },
      {
        title: 'Use Social Proof Post-Purchase',
        description:
          'Reinforce the decision by showing that many others made the same choice and are satisfied',
        rationale:
          'Post-purchase social proof addresses the "Did I make the right choice?" question directly',
        example:
          'Show "Join 50,000+ happy customers" on the confirmation page, or include a customer testimonial in the welcome email',
      },
      {
        title: 'Measure and Optimize the Doubt Window',
        description:
          'Track the critical period between purchase and value delivery for signs of regret',
        rationale:
          'Data-driven understanding of when and why buyers experience remorse enables targeted intervention',
        example:
          'Monitor cancellation/return timing, support ticket themes in first 7 days, and email engagement rates',
      },
    ],

    accessibility: [{
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships - Post-purchase information must be semantically structured',
        implementation:
          'Use proper heading levels, ordered lists for timelines, and semantic HTML so screen reader users get the same reassurance as visual users',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.4.4',
        guideline:
          'Link Purpose - Return policy and support links must have clear, descriptive text',
        implementation:
          'Use descriptive link text like "View return policy" and "Contact support" instead of "Click here" so all users can find safety nets',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.4.3',
        guideline:
          'Contrast - Post-purchase content must be readable, not de-emphasized',
        implementation:
          'Return policy text, delivery timelines, and support links must meet 4.5:1 contrast ratio — never use light gray for important post-purchase information',
      },
    ],

    ethics: [
      {
        concern: 'Hostile Return Processes',
        severity: 'critical',
        explanation:
          'Deliberately making returns difficult to prevent refunds traps users and amplifies remorse',
        mitigation:
          'Design returns to be as easy as purchase. Easy returns build trust, reduce anxiety, and paradoxically lower return rates.',
      },
      {
        concern: 'False Urgency to Prevent Deliberation',
        severity: 'high',
        explanation:
          'Using fake countdown timers or scarcity to rush purchases before buyers can think clearly',
        mitigation:
          'Let buyers make informed decisions at their own pace. Address remorse after purchase through great experience, not by preventing deliberation before.',
      },
      {
        concern: 'Misleading Pre-Purchase Promises',
        severity: 'critical',
        explanation:
          'Marketing promises that the product cannot deliver create an expectation-reality gap that maximizes remorse',
        mitigation:
          'Ensure marketing accurately represents the product experience. Set honest expectations that the product can exceed.',
      },
      {
        concern: 'Dark Pattern Cancellation',
        severity: 'critical',
        explanation:
          'Making cancellation deliberately difficult (phone-only, hidden settings, guilt trips) to prevent churn',
        mitigation:
          'Make cancellation as easy as signup. Offer a clear off-ramp with optional feedback. Forced retention creates resentment and negative reviews.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'A Theory of Cognitive Dissonance',
        author: 'Festinger, L.',
        year: 1957,
        description:
          'The foundational work on cognitive dissonance theory, which explains the psychological mechanism behind buyer\'s remorse',
        type: 'foundational',
      },
      {
        title: 'Cognitive Dissonance and Consumer Behavior: A Review of the Evidence',
        author: 'Sweeney, J. C., Hausknecht, D., & Soutar, G. N.',
        year: 2000,
        doi: '10.1002/cb.169',
        description:
          'Comprehensive review of how cognitive dissonance manifests in consumer purchase behavior and post-purchase regret',
        type: 'foundational',
      },
      {
        title: 'Post-Decision Dissonance at Post Time',
        author: 'Knox, R. E., & Inkster, J. A.',
        year: 1968,
        doi: '10.1037/h0025528',
        description:
          'Classic study showing that people become more confident in their choice immediately after committing to it, demonstrating dissonance reduction',
        type: 'foundational',
      },
      {
        title: 'The Role of Post-Purchase Communication in Reducing Consumer Regret',
        author: 'Tsiros, M., & Mittal, V.',
        year: 2000,
        doi: '10.1509/jmkr.37.3.385.18771',
        description:
          'Research on how post-purchase communication strategies reduce consumer regret and increase satisfaction',
        type: 'practical',
      },
    ],

    books: [
      {
        title: 'A Theory of Cognitive Dissonance',
        author: 'Festinger, Leon',
        year: 1957,
        isbn: '9780804709118',
        description:
          'The original text introducing cognitive dissonance theory, the psychological basis of buyer\'s remorse',
        type: 'foundational',
      },
      {
        title: 'Predictably Irrational',
        author: 'Ariely, Dan',
        year: 2008,
        isbn: '9780061353246',
        description:
          'Covers commitment, decision regret, and the psychology of ownership that drives buyer\'s remorse',
        type: 'practical',
      },
      {
        title: 'The Paradox of Choice',
        author: 'Schwartz, Barry',
        year: 2004,
        isbn: '9780060005696',
        description:
          'How excess choice amplifies post-decision regret and buyer\'s remorse',
        type: 'practical',
      },
    ],

    articles: [
      {
        title: 'Reducing Buyer\'s Remorse in E-Commerce',
        author: 'Baymard Institute',
        url: 'https://baymard.com/blog/post-purchase-experience',
        description:
          'Research-backed recommendations for post-purchase UX that reduces remorse and returns',
        type: 'practical',
      },
      {
        title: 'The Post-Purchase Experience',
        author: 'Nielsen Norman Group',
        url: 'https://www.nngroup.com/articles/post-purchase/',
        description:
          'UX best practices for confirmation pages, order tracking, and post-purchase communication',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'The Paradox of Choice',
        author: 'Barry Schwartz (TED)',
        url: 'https://www.ted.com/talks/barry_schwartz_the_paradox_of_choice',
        description:
          'TED talk on how too many options lead to decision paralysis and post-purchase regret',
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
