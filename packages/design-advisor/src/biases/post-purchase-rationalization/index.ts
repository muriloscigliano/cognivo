/**
 * POST-PURCHASE RATIONALIZATION
 *
 * We rationalize purchases to justify our decisions
 */


import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const postPurchaseRationalization: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'post-purchase-rationalization',
    name: 'Post-Purchase Rationalization',
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
    simple: 'We rationalize purchases to justify our decisions',

    detailed: `Post-purchase rationalization is a cognitive bias where individuals convince themselves that a purchase they made was a good decision, even when evidence may suggest otherwise. After committing resources (money, time, effort) to a choice, people selectively focus on the positives of what they chose and downplay or ignore the negatives. This is closely related to cognitive dissonance — the uncomfortable tension between "I made this choice" and "this choice may not have been ideal."

In product and UX design, this bias is critical to understand because it shapes the entire post-purchase experience: how users feel about their decision, whether they become advocates or detractors, how they respond to review prompts, and whether they stay loyal or seek alternatives. The window immediately after purchase is when rationalization is strongest.

Designers can ethically reinforce post-purchase rationalization by genuinely helping users get value from their purchase, surfacing usage data, and celebrating milestones. However, exploiting this bias to prevent legitimate returns, hide product flaws, or create artificial lock-in is manipulative and erodes long-term trust.`,

    psychologyBasis: {
      discoveredBy: 'Various Researchers',
      year: 1970,
      theory: 'Cognitive Bias Research',
      mechanism: `After making a purchase, the brain works to reduce cognitive dissonance — the gap between "I spent money on this" and any doubts about the decision. This happens through several mechanisms:

1. **Selective Attention**: The buyer focuses on positive attributes of the chosen product and ignores or minimizes negatives
2. **Confirmation Seeking**: The buyer actively seeks information that validates the purchase (reading positive reviews, joining owner communities)
3. **Memory Distortion**: Over time, the buyer remembers the decision-making process as more rational and deliberate than it actually was
4. **Social Reinforcement**: The buyer tells others about the purchase in positive terms, which reinforces their own positive feelings
5. **Sunk Cost Integration**: The more invested (financially, emotionally, or in time), the stronger the rationalization becomes

This process is largely automatic — buyers are not consciously aware they are rationalizing. The effect intensifies with the size of the commitment and the irreversibility of the decision.`,
    },

    realWorldExample: `A person buys an expensive car that turns out to get worse gas mileage than expected. Rather than admitting the purchase was a mistake, they emphasize the comfort, safety features, and driving experience. They join an online owners club, read positive reviews, and tell friends how much they love the car. When someone points out the poor fuel economy, they respond "it's worth it for the quality." Over time, they genuinely believe the purchase was the right call — their memory of the decision process shifts to highlight how carefully they researched and how many factors led to this "ideal" choice.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `Post-purchase rationalization directly affects how users experience a product after buying it. Designers can ethically leverage this to:

- Reinforce purchase confidence through value reminders and usage dashboards
- Prompt reviews and referrals during peak satisfaction moments
- Build loyalty by celebrating user milestones and progress
- Reduce buyer's remorse through effective onboarding and quick wins
- Create community belonging that validates the user's choice`,

    whenToUse: [
      {
        title: 'Post-Purchase Onboarding',
        scenario:
          'When a user has just completed a purchase or subscription sign-up',
        example:
          'Show a welcome screen highlighting the key benefits they just unlocked: "You now have access to AI analytics, unlimited exports, and priority support"',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Value Reinforcement Dashboards',
        scenario: 'When users are actively using the product over time',
        example:
          'Display usage stats and value metrics: "You saved 12 hours this month" or "Your ROI this quarter: $4,200"',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Review and Referral Prompts',
        scenario: 'When users have just achieved a milestone or success moment',
        example:
          'After a user completes their first successful project, prompt: "You just shipped your first campaign! Share your experience?"',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Renewal and Upgrade Moments',
        scenario: 'When approaching subscription renewal or presenting upgrade options',
        example:
          'Show a summary of value received before renewal: "In the past year, you created 47 projects, collaborated with 12 teammates, and saved an estimated 156 hours"',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Loyalty and Achievement Systems',
        scenario: 'When building long-term engagement and retention',
        example:
          'Award badges and milestones: "Power User: 100 days streak" or "You are in the top 10% of active users"',
        impact: ImpactLevel.MEDIUM,
      },
    ],

    whenToAvoid: [
      {
        title: 'Preventing Legitimate Returns',
        reason:
          'Using rationalization cues to guilt users out of valid return requests',
        consequence:
          'Users feel trapped, leading to negative reviews, chargebacks, and regulatory issues',
        alternative:
          'Make return processes easy and transparent; confident products earn loyalty through quality',
      },
      {
        title: 'Hiding Product Defects',
        reason:
          'Burying known issues under positive messaging to exploit rationalization',
        consequence:
          'When users discover the deception, trust is permanently destroyed',
        alternative:
          'Acknowledge issues openly and communicate fix timelines',
      },
      {
        title: 'Artificial Lock-In',
        reason:
          'Making switching costs feel insurmountable to exploit sunk cost rationalization',
        consequence:
          'Users feel hostage rather than loyal; they leave at the first viable alternative',
        alternative:
          'Earn retention through genuine value, not switching friction',
      },
      {
        title: 'Inflated Value Metrics',
        reason:
          'Showing exaggerated or misleading usage statistics to manufacture satisfaction',
        consequence:
          'When users realize the numbers are inflated, they question everything',
        alternative:
          'Use honest, verifiable metrics that reflect real value delivered',
      },
    ],

    commonMistakes: [
      {
        title: 'Asking for Reviews Too Early',
        description:
          'Prompting users for reviews before they have meaningful experience with the product',
        why: 'Users have not yet formed genuine positive feelings and may leave shallow or negative reviews',
        fix: 'Wait for a meaningful milestone or success event before prompting for a review',
      },
      {
        title: 'Ignoring the Post-Purchase Window',
        description:
          'Neglecting the crucial period right after purchase when rationalization is strongest',
        why: 'This is when users are most receptive to value reinforcement and most vulnerable to buyer\'s remorse',
        fix: 'Design a deliberate post-purchase experience: welcome emails, onboarding, quick wins, and early value demonstration',
      },
      {
        title: 'One-Size-Fits-All Messaging',
        description:
          'Sending the same value reinforcement to all users regardless of their usage',
        why: 'Light users may feel mocked by "you\'ve been so productive!" messages, heavy users may feel undersold',
        fix: 'Personalize value messaging based on actual usage data and user segment',
      },
      {
        title: 'Over-Engineering Loyalty Programs',
        description:
          'Creating complex points and rewards systems that feel manipulative rather than rewarding',
        why: 'Transparent manipulation triggers reactance and undermines genuine rationalization',
        fix: 'Focus on authentic achievements and real value milestones rather than gamification tricks',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.HIGH,
        description:
          'Layout determines how prominently value reinforcement and usage data are displayed post-purchase',
        examples: [
          'Dashboard layouts that foreground value metrics and usage stats',
          'Post-purchase confirmation pages that highlight what the user just unlocked',
          'Account pages that surface total value received over time',
          'Prominent placement of achievements and milestones in navigation',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Text emphasis affects how value messaging and milestones are perceived',
        examples: [
          'Bold value metrics ("You saved $340") create strong positive anchors',
          'Celebratory headlines at milestones reinforce good feelings',
          'Personalized messages with the user\'s name increase ownership feeling',
          'Clear, confident typography in confirmation screens reduces buyer\'s remorse',
        ],
      },
      color: {
        level: ImpactLevel.MEDIUM,
        description:
          'Color reinforces positive emotions and celebration of purchase decisions',
        examples: [
          'Green success states after purchase reinforce positive feelings',
          'Warm, celebratory colors at milestone moments',
          'Brand-consistent colors in value dashboards build familiarity and trust',
          'Avoiding red or warning colors in post-purchase contexts unless necessary',
        ],
      },
      interaction: {
        level: ImpactLevel.CRITICAL,
        description:
          'Post-purchase interactions shape how users feel about their decision over time',
        examples: [
          'Smooth onboarding flows that deliver quick wins reinforce purchase confidence',
          'Usage tracking that shows progress and value accumulation',
          'Social sharing interactions that let users tell others about their purchase',
          'Community features that connect users with other satisfied customers',
        ],
      },
      content: {
        level: ImpactLevel.CRITICAL,
        description:
          'Content directly shapes the narrative users build around their purchase decision',
        examples: [
          'Value summaries ("This month you processed 1,200 orders") validate the decision',
          'Success stories from similar users reinforce community belonging',
          'Personalized tips that help users get more value from their purchase',
          'Comparison content showing what they would miss without the product',
        ],
      },
      accessibility: {
        level: ImpactLevel.MEDIUM,
        description:
          'All users must be able to access value reinforcement and post-purchase content equally',
        examples: [
          'Screen reader announcements for milestone achievements and celebrations',
          'Value metrics accessible through keyboard navigation',
          'Usage dashboards that work with assistive technology',
          'Confirmation and welcome messages available in multiple formats',
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
        title: 'Monthly Value Summary Email',
        description:
          'SaaS product sending a personalized value summary highlighting what the user achieved',
        code: `<div class="value-summary">
  <h2>Your Month in Review</h2>
  <p class="greeting">Hey Sarah, here's what you accomplished with Acme Pro this month:</p>

  <div class="metrics-grid">
    <div class="metric">
      <span class="number">$2,340</span>
      <span class="label">Estimated time savings</span>
    </div>
    <div class="metric">
      <span class="number">47</span>
      <span class="label">Reports auto-generated</span>
    </div>
    <div class="metric">
      <span class="number">12.5 hrs</span>
      <span class="label">Hours saved vs manual work</span>
    </div>
  </div>

  <div class="milestone">
    <span class="badge">New Milestone!</span>
    <p>You've now created over <strong>200 reports</strong> since joining. You're in the top 15% of active users.</p>
  </div>

  <p class="cta">Keep up the great work — or <a href="#">explore advanced features</a> to save even more.</p>
</div>`,
        explanation:
          'Personalized value metrics validate the purchase by showing concrete, real outcomes. Users see exactly what their subscription is worth, reinforcing that the decision to buy was smart.',
        principle:
          'Concrete value evidence strengthens post-purchase rationalization authentically',
        metrics: {
          before: '68% renewal rate with generic renewal reminder',
          after: '84% renewal rate with personalized value summary',
          improvement: '24% increase in renewal rate',
        },
      },
      {
        title: 'Post-Purchase Achievement System',
        description:
          'Fitness app celebrating usage milestones to reinforce the subscription value',
        code: `<div class="achievement-card">
  <div class="achievement-icon">
    <img src="streak-badge.svg" alt="30-day streak badge">
  </div>
  <h3>30-Day Streak!</h3>
  <p>You've worked out every day for a month. Only 8% of members hit this milestone.</p>

  <div class="progress-summary">
    <div class="stat">
      <span class="value">30</span>
      <span class="label">Workouts completed</span>
    </div>
    <div class="stat">
      <span class="value">4,200</span>
      <span class="label">Calories burned</span>
    </div>
    <div class="stat">
      <span class="value">16 hrs</span>
      <span class="label">Total active time</span>
    </div>
  </div>

  <div class="actions">
    <button class="primary">Share Your Achievement</button>
    <button class="secondary">View Your Journey</button>
  </div>
</div>`,
        explanation:
          'Celebrating real achievements helps users see tangible proof of value from their purchase. The share button enables social reinforcement, where telling others strengthens their own conviction.',
        principle:
          'Real milestone celebrations create authentic satisfaction and advocacy',
      },
      {
        title: 'Savings Tracker Dashboard',
        description:
          'Subscription service showing cumulative value over time',
        code: `<div class="savings-dashboard">
  <h3>Your Savings with Premium</h3>

  <div class="total-savings">
    <span class="amount">$1,847</span>
    <span class="label">Total saved since you joined (14 months ago)</span>
  </div>

  <div class="savings-breakdown">
    <div class="line-item">
      <span>Free shipping on 23 orders</span>
      <span class="saved">$287</span>
    </div>
    <div class="line-item">
      <span>Member-only discounts</span>
      <span class="saved">$1,340</span>
    </div>
    <div class="line-item">
      <span>Exclusive early access deals</span>
      <span class="saved">$220</span>
    </div>
  </div>

  <p class="subscription-cost">Your annual membership: $119</p>
  <p class="net-value"><strong>Net value: $1,728</strong></p>
</div>`,
        explanation:
          'Breaking down savings line by line makes the value concrete and undeniable. Showing net value (savings minus cost) directly addresses any lingering doubt about whether the subscription is worth it.',
        principle:
          'Transparent value accounting turns rationalization into rational confidence',
        metrics: {
          before: '71% renewal rate without savings dashboard',
          after: '89% renewal rate with savings dashboard visible',
          improvement: '25% increase in renewal rate',
        },
      },
    ],

    bad: [
      {
        title: 'Guilt-Tripping Return Requests',
        description:
          'E-commerce site making users feel bad about wanting to return an item',
        code: `<!-- DON'T DO THIS -->
<div class="return-request">
  <h2>Are you sure you want to return this?</h2>

  <div class="guilt-message">
    <img src="sad-box.svg" alt="Sad package">
    <p>This item was handcrafted just for you by our artisan team.</p>
    <p>Returning it means it can't be resold and may be destroyed.</p>
  </div>

  <div class="sunk-cost">
    <p>You've already spent <strong>3 hours</strong> setting this up.</p>
    <p>Are you really willing to lose all that progress?</p>
  </div>

  <button class="primary">Keep It (Recommended)</button>
  <a href="#" class="small-link">I still want to return (processing takes 4-6 weeks)</a>
</div>`,
        explanation:
          'This design exploits rationalization by making users feel guilty about a legitimate return. The emotional manipulation, sunk cost framing, and friction-heavy return process erode trust and may violate consumer protection regulations.',
        principle:
          'Never weaponize post-purchase rationalization to prevent legitimate returns',
      },
      {
        title: 'Fabricated Usage Statistics',
        description:
          'App showing inflated or misleading value metrics to manufacture satisfaction',
        code: `<!-- DON'T DO THIS -->
<div class="value-report">
  <h2>Look How Much Value You're Getting!</h2>
  <div class="metric huge">
    <span class="number">$12,450</span>
    <span class="label">Value delivered this month</span>
  </div>
  <p class="asterisk">*Based on estimated market rate of $150/hr
  for tasks that would take a professional</p>
</div>`,
        explanation:
          'Inflating value metrics with dubious calculations insults user intelligence. When users realize the "$12,450 in value" is based on unrealistic assumptions, they lose trust in all metrics and the product itself.',
        principle:
          'Dishonest value metrics backfire when users see through the inflation',
      },
      {
        title: 'Artificial Switching Barriers',
        description:
          'SaaS product making it nearly impossible to export data or cancel',
        code: `<!-- DON'T DO THIS -->
<div class="cancel-flow">
  <h2>You'll lose everything if you cancel</h2>

  <div class="loss-list">
    <p>If you cancel, you will permanently lose:</p>
    <ul>
      <li>3 years of project history</li>
      <li>1,247 files and documents</li>
      <li>All team collaboration data</li>
      <li>Your custom workflows and automations</li>
    </ul>
    <p class="warning">This data CANNOT be recovered after cancellation.</p>
  </div>

  <button class="primary">Stay Subscribed</button>
  <p class="tiny-text">To cancel, email support@example.com
  with your account ID and a written reason for cancellation.</p>
</div>`,
        explanation:
          'Exploiting sunk cost rationalization by threatening data loss and adding friction to cancellation is a dark pattern. It creates hostage users, not loyal ones, and invites regulatory scrutiny.',
        principle:
          'Lock-in through fear and friction destroys the trust rationalization is built on',
      },
    ],

    realWorld: [
      {
        company: 'Apple',
        product: 'Apple Ecosystem',
        url: 'https://www.apple.com',
        description: 'Apple reinforces purchase decisions through seamless ecosystem integration. After buying an iPhone, users discover how well it works with AirPods, Mac, iPad, and Apple Watch. Each new device makes previous purchases feel smarter, creating a self-reinforcing rationalization loop.',
        effectiveness: 'very-effective',
        analysis: 'Apple\'s ecosystem strategy is the gold standard for ethical post-purchase rationalization. Each product genuinely adds value to others, so the rationalization is based on real benefits. Users become advocates not because they\'re trapped, but because the interconnected experience genuinely improves over time.',
      },
      {
        company: 'Tesla',
        product: 'Tesla Owner Community',
        url: 'https://www.tesla.com',
        description: 'Tesla cultivates a strong owner community through forums, referral programs, and over-the-air updates that add features after purchase. Owners frequently cite new features as proof their purchase was smart, and the referral program turns rationalization into advocacy.',
        effectiveness: 'very-effective',
        analysis: 'Tesla leverages post-purchase rationalization through continuous improvement — the car literally gets better after purchase via software updates. This turns rationalization from self-deception into a factually grounded experience: the product really did improve.',
      },
      {
        company: 'Peloton',
        product: 'Peloton Usage Stats',
        url: 'https://www.onepeloton.com',
        description: 'Peloton prominently displays workout streaks, total rides, calories burned, and personal records. Annual summaries show cumulative value, and milestone celebrations (100th ride, yearly anniversary) reinforce the subscription\'s worth.',
        effectiveness: 'effective',
        analysis: 'Peloton uses authentic usage data to reinforce rationalization. By showing real metrics (not inflated estimates), users can genuinely assess whether the subscription is worth it. The community features add social reinforcement from other committed users.',
      },
      {
        company: 'Amazon',
        product: 'Post-Purchase Review Prompts',
        url: 'https://www.amazon.com',
        description: 'Amazon sends review prompts timed to when users have had enough time to use the product but are still in the rationalization window. The prompt arrives when satisfaction is likely highest, generating more positive reviews that then serve as social proof for other buyers.',
        effectiveness: 'effective',
        analysis: 'Amazon\'s review timing is strategically aligned with peak rationalization. By prompting when users are most likely to feel good about their purchase, they get more positive reviews. This is ethically gray — the timing is strategic, but users are sharing genuine experiences.',
      },
    ],

    abTests: [
      {
        title: 'Renewal Email: Generic vs Personalized Value Summary',
        hypothesis:
          'Personalized value summaries will increase renewal rates by reinforcing purchase rationalization',
        controlVersion: {
          description:
            'Generic renewal email: "Your subscription is expiring soon. Renew now to keep your access."',
          metrics: {
            conversionRate: '52%',
            clickThroughRate: '18%',
          },
        },
        treatmentVersion: {
          description:
            'Personalized value email: "In the past year, you created 89 projects, collaborated with 7 teammates, and saved an estimated 234 hours. Renew to keep building."',
          metrics: {
            conversionRate: '71%',
            clickThroughRate: '34%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Personalized value summaries increased renewal by 37%. Users who saw their actual usage data were significantly more likely to renew. Follow-up surveys showed these users rated their satisfaction higher than control, suggesting the value summary actually improved how they felt about the product.',
          learnings: [
            'Concrete usage data is more persuasive than generic messaging',
            'Users often underestimate how much they use a product until shown data',
            'Personalized metrics trigger positive rationalization of the subscription',
            'The effect was strongest for moderate users who might otherwise have churned',
          ],
        },
      },
      {
        title: 'Post-Purchase Review Timing: Immediate vs Milestone-Based',
        hypothesis:
          'Prompting reviews after a meaningful milestone will generate higher-quality reviews than immediate post-purchase prompts',
        controlVersion: {
          description:
            'Review prompt sent 3 days after purchase: "How would you rate your recent purchase?"',
          metrics: {
            conversionRate: '8%',
            averageRating: '3.9',
          },
        },
        treatmentVersion: {
          description:
            'Review prompt sent after first successful use or milestone: "You just completed your first project with Acme Pro! How has your experience been?"',
          metrics: {
            conversionRate: '19%',
            averageRating: '4.4',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Milestone-triggered review prompts more than doubled response rate and increased average rating by 0.5 stars. Users who reviewed after a success event wrote longer, more detailed reviews and were 3x more likely to mention specific features by name.',
          learnings: [
            'Timing reviews to success moments captures peak rationalization',
            'Users who have achieved something are more willing to share their experience',
            'Milestone-triggered reviews are more authentic because they reflect actual use',
            'Higher-quality reviews serve as better social proof for prospective buyers',
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
        name: 'Value Reinforcement Metrics',
        description:
          'Dashboards or summaries showing cumulative value, savings, or usage statistics to the user',
        howToSpot:
          'Look for "You saved $X", "Hours saved", "ROI" displays, or usage counters on dashboards and account pages',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Post-Purchase Celebration',
        description:
          'Congratulatory messaging, animations, or badges immediately after purchase or at milestones',
        howToSpot:
          'Look for confetti animations, "Welcome to the club" messages, badge awards, or milestone celebrations',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Community and Social Proof',
        description:
          'Owner communities, user forums, or "others like you" content designed to validate the purchase',
        howToSpot:
          'Look for "Join X thousand members", owner testimonials, or community features prominently placed in post-purchase flows',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Switching Cost Emphasis',
        description:
          'Messaging that highlights what would be lost if the user cancels or switches',
        howToSpot:
          'Look for "You\'ll lose X" warnings on cancellation pages, data loss warnings, or sunk cost reminders',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Strategically Timed Review Prompts',
        description:
          'Review or rating requests timed to moments of peak satisfaction',
        howToSpot:
          'Look for review prompts appearing after successful task completion, milestones, or positive interactions',
        severity: ImpactLevel.MEDIUM,
      },
    ],

    patterns: [
      {
        name: 'Value Accumulation Pattern',
        description: 'Progressive display of cumulative value received from a product or subscription over time',
        indicators: ['Savings trackers or ROI dashboards', 'Usage statistics and activity summaries', '"You saved $X this month" notifications', 'Year-in-review or monthly summary reports'],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Milestone Celebration Pattern',
        description: 'Recognizing and celebrating user achievements tied to product usage',
        indicators: ['Badge or achievement systems', 'Streak counters', '"You\'re in the top X%" comparisons', 'Anniversary or usage milestone notifications'],
        severity: ImpactLevel.MEDIUM,
        confidence: 'high',
      },
      {
        name: 'Community Belonging Pattern',
        description: 'Creating a sense of group identity among purchasers to reinforce the decision',
        indicators: ['Owner forums or community spaces', 'Referral programs with social incentives', '"Welcome to the family" post-purchase messaging', 'User stories and testimonials from existing customers'],
        severity: ImpactLevel.MEDIUM,
        confidence: 'medium',
      },
      {
        name: 'Cancellation Friction Pattern',
        description: 'Adding emotional or practical barriers to cancellation that exploit sunk cost rationalization',
        indicators: ['Data loss warnings on cancellation screens', 'Multi-step cancellation flows with guilt messaging', '"Are you sure?" prompts listing what will be lost', 'Requiring phone calls or emails to cancel'],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
    ],

    checklistQuestions: [
      'Does the post-purchase experience reinforce the value of the user\'s decision?',
      'Are usage metrics and value summaries based on real, verifiable data?',
      'When are review or referral prompts triggered — randomly or at success moments?',
      'Does the cancellation flow use guilt or fear to prevent legitimate cancellations?',
      'Are switching costs natural (data portability) or artificially inflated?',
      'Do milestone celebrations reflect real user achievements?',
      'Is community building creating genuine belonging or manufactured dependency?',
      'Are value metrics honestly calculated or inflated to manufacture satisfaction?',
      'Does the onboarding experience deliver quick wins to reduce buyer\'s remorse?',
      'Is the design helping users get genuine value, or just feel like they are?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in post-purchase rationalization.

Analyze the provided design for post-purchase rationalization patterns. Identify:

1. **Value Reinforcement**: How the design reminds users of the value they're getting
2. **Milestone Celebrations**: How user achievements and progress are recognized
3. **Community Building**: How the design creates belonging and social validation
4. **Cancellation Friction**: Whether leaving is made artificially difficult or guilt-laden
5. **Review Timing**: When and how users are prompted to review or refer

For each pattern found:
- Identify whether it reinforces genuine value or manufactures artificial satisfaction
- Assess whether value metrics are honest and verifiable
- Determine if cancellation or return flows are fair and transparent
- Evaluate whether community features create genuine belonging or lock-in
- Suggest improvements for ethical, user-centered design

Consider:
- Is the post-purchase experience helping users get real value from their decision?
- Are value metrics based on genuine data or inflated calculations?
- Does the cancellation flow respect user autonomy?
- Are review prompts timed to capture authentic experiences or peak manipulation?
- Is the overall approach building sustainable loyalty or exploitative dependency?

Provide actionable recommendations for ethical post-purchase experience design.`,

    outputSchema: {
      type: 'object',
      properties: {
        rationalizationPatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              valueReinforcement: { type: 'string' },
              authenticity: { type: 'string' },
              userImpact: { type: 'string' },
              ethical: { type: 'boolean' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'valueReinforcement',
              'authenticity',
              'ethical',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            valueAuthenticity: { type: 'number' },
            cancellationFairness: { type: 'number' },
            communityGenuineness: { type: 'number' },
            ethicalScore: { type: 'number' },
          },
          required: [
            'valueAuthenticity',
            'cancellationFairness',
            'communityGenuineness',
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
        'rationalizationPatterns',
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
        title: 'Map the Post-Purchase Journey',
        description:
          'Identify every touchpoint between purchase and renewal/repurchase where rationalization is active',
        example:
          'Map: Purchase confirmation -> Onboarding -> First use -> Milestone -> Review prompt -> Renewal',
        tips: [
          'Focus on the first 48 hours after purchase when rationalization peaks',
          'Identify natural success moments that validate the purchase',
          'Plan value reinforcement cadence (weekly, monthly, at milestones)',
        ],
      },
      {
        step: 2,
        title: 'Design Quick Wins in Onboarding',
        description:
          'Help users achieve a meaningful outcome quickly to reinforce their purchase decision',
        example:
          'Guide users to complete their first task within 5 minutes of signing up, then celebrate it',
        tips: [
          'Remove all friction from first-use experience',
          'Show immediate value, even if small',
          'Congratulate completion without being patronizing',
        ],
      },
      {
        step: 3,
        title: 'Build Honest Value Tracking',
        description:
          'Create dashboards and summaries that reflect genuine, verifiable value delivered',
        example:
          'Track actual time saved, reports generated, or tasks completed and present them monthly',
        tips: [
          'Use real usage data, not estimated or inflated metrics',
          'Show methodology for any calculated savings',
          'Let users verify the numbers against their own experience',
        ],
      },
      {
        step: 4,
        title: 'Time Engagement Prompts to Success',
        description:
          'Trigger review, referral, and sharing prompts when users have just achieved something meaningful',
        example:
          'After a user successfully completes a project, prompt: "Share your experience?"',
        tips: [
          'Never prompt during frustration or failure moments',
          'Make prompts dismissible and non-intrusive',
          'Vary the ask: sometimes review, sometimes referral, sometimes share',
        ],
      },
      {
        step: 5,
        title: 'Ensure Fair Exit Paths',
        description:
          'Make cancellation, returns, and switching straightforward to maintain trust',
        example:
          'One-click cancellation with a value summary (not guilt trip): "Here\'s what you used. We\'re sorry to see you go."',
        tips: [
          'Offer data export before cancellation',
          'Show a factual usage summary, not emotional manipulation',
          'Make re-subscribing easy if they change their mind',
        ],
      },
    ],

    dos: [
      'Show real, verifiable value metrics based on actual usage data',
      'Celebrate genuine milestones and achievements',
      'Time review prompts to moments of natural satisfaction',
      'Build community features that create authentic belonging',
      'Design post-purchase onboarding that delivers quick wins',
      'Provide personalized value summaries at renewal time',
      'Make cancellation and returns easy and transparent',
      'Help users discover features they are not yet using',
    ],

    donts: [
      'Don\'t use guilt or emotional manipulation to prevent returns',
      'Don\'t inflate or fabricate usage statistics or value metrics',
      'Don\'t add artificial friction to cancellation flows',
      'Don\'t exploit sunk cost feelings to trap users',
      'Don\'t prompt reviews during negative experiences',
      'Don\'t hide product defects behind positive messaging',
      'Don\'t make data export difficult to prevent switching',
      'Don\'t create artificial lock-in disguised as loyalty features',
    ],

    bestPractices: [
      {
        title: 'Honest Value Accounting',
        description:
          'Show users exactly what value they received with transparent methodology',
        rationale:
          'Honest metrics build real confidence; inflated metrics create fragile satisfaction that shatters',
        example:
          '"You saved 12 hours this month (based on average task time of 15 min x 48 tasks automated)"',
      },
      {
        title: 'Milestone-Triggered Engagement',
        description:
          'Time reviews, referrals, and sharing to natural success moments',
        rationale:
          'Users who just succeeded are genuinely happy and provide more authentic feedback',
        example:
          'Prompt a review after the user\'s 10th successful project, not 3 days after sign-up',
      },
      {
        title: 'Continuous Value Discovery',
        description:
          'Help users find new ways to get value from their purchase over time',
        rationale:
          'Preventing stagnation keeps rationalization grounded in growing real value',
        example:
          '"You haven\'t tried Team Dashboards yet — users who do save an extra 3 hours/week"',
      },
      {
        title: 'Respectful Off-Ramp Design',
        description:
          'Make leaving easy while showing what will be missed (without guilt)',
        rationale:
          'Fair exit paths paradoxically increase retention by building trust and reducing reactance',
        example:
          'Cancellation page shows factual summary: "You\'ve used X features Y times" with one-click cancel button',
      },
      {
        title: 'Community as Value, Not Lock-In',
        description:
          'Build community features that add genuine value rather than creating switching costs',
        rationale:
          'Users who stay for the community stay longer and advocate more than users who stay because leaving is hard',
        example:
          'Owner forums, user meetups, and shared templates that genuinely help users succeed',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships - Value metrics and milestones must be semantically structured',
        implementation:
          'Use proper heading levels, ARIA labels, and semantic HTML so screen reader users can access value summaries and achievement notifications',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.4.1',
        guideline:
          'Use of Color - Don\'t rely only on color for celebration or value indicators',
        implementation:
          'Combine color with icons, text labels, and semantic HTML so all users perceive milestone celebrations and value metrics',
      },
      {
        wcagLevel: 'AA',
        criterion: '4.1.3',
        guideline:
          'Status Messages - Achievement and milestone notifications must be announced to assistive technology',
        implementation:
          'Use ARIA live regions or role="status" for milestone celebrations and value updates so screen reader users are informed without focus disruption',
      },
    ],

    ethics: [
      {
        concern: 'Return Prevention',
        severity: 'critical',
        explanation:
          'Using emotional manipulation or excessive friction to prevent legitimate returns or cancellations',
        mitigation:
          'Make returns and cancellations straightforward. Show factual summaries, not guilt messages. Comply with consumer protection regulations.',
      },
      {
        concern: 'Inflated Value Metrics',
        severity: 'high',
        explanation:
          'Showing exaggerated or fabricated usage statistics to manufacture satisfaction',
        mitigation:
          'Base all value metrics on real, verifiable usage data. Show calculation methodology. Let users cross-reference with their own experience.',
      },
      {
        concern: 'Artificial Lock-In',
        severity: 'high',
        explanation:
          'Making data export, account portability, or cancellation artificially difficult to exploit sunk cost rationalization',
        mitigation:
          'Provide easy data export. Allow one-click cancellation. Earn retention through value, not friction.',
      },
      {
        concern: 'Exploiting Buyer\'s Remorse',
        severity: 'medium',
        explanation:
          'Overwhelming users with positive messaging immediately after purchase to suppress legitimate doubts',
        mitigation:
          'Provide balanced information. Allow easy returns during cooling-off periods. Focus on helping users succeed, not suppressing doubt.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'Post-Decision Dissonance at Post Time',
        author: 'Knox, R. E., & Inkster, J. A.',
        year: 1968,
        description:
          'Classic study showing that bettors become more confident in their horse after placing a bet, demonstrating post-decision rationalization',
        type: 'foundational',
      },
      {
        title: 'A Theory of Cognitive Dissonance',
        author: 'Festinger, L.',
        year: 1957,
        description:
          'The foundational theory of cognitive dissonance that underlies post-purchase rationalization',
        type: 'foundational',
      },
      {
        title: 'Post-Decision Changes in the Desirability of Alternatives',
        author: 'Brehm, J. W.',
        year: 1956,
        description:
          'Early experimental evidence that people increase their preference for chosen alternatives and decrease preference for rejected ones after deciding',
        type: 'foundational',
      },
      {
        title: 'Consumer Behavior and Post-Purchase Dissonance',
        author: 'Cohen, J. B., & Goldberg, M. E.',
        year: 1970,
        description:
          'Examines how consumers reduce dissonance after purchases through selective information processing and attitude change',
        type: 'advanced',
      },
    ],

    books: [
      {
        title: 'Influence: The Psychology of Persuasion',
        author: 'Cialdini, Robert',
        year: 2006,
        isbn: '9780061241895',
        description:
          'Covers commitment and consistency principles that drive post-purchase rationalization',
        type: 'practical',
      },
      {
        title: 'Thinking, Fast and Slow',
        author: 'Kahneman, Daniel',
        year: 2011,
        isbn: '9780374275631',
        description:
          'Comprehensive coverage of decision-making biases including post-decision effects',
        type: 'foundational',
      },
      {
        title: 'Hooked: How to Build Habit-Forming Products',
        author: 'Eyal, Nir',
        year: 2014,
        isbn: '9781591847786',
        description:
          'Practical guide on using psychological principles including rationalization in product design',
        type: 'practical',
      },
    ],

    articles: [
      {
        title: 'Post-Purchase Rationalization in UX Design',
        author: 'Nielsen Norman Group',
        url: 'https://www.nngroup.com/articles/',
        description:
          'Practical guide to leveraging post-purchase psychology in user experience design',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'The Psychology of Post-Purchase Behavior',
        author: 'Behavioral Economics',
        url: 'https://www.youtube.com/watch?v=cognitive-dissonance',
        description:
          'Video explanation of how cognitive dissonance drives post-purchase rationalization',
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
