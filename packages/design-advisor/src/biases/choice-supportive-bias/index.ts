/**
 * CHOICE SUPPORTIVE BIAS
 */


import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const choiceSupportiveBias: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'choice-supportive-bias',
    name: 'Choice Supportive Bias',
    aliases: [],
    category: BiasCategory.MEMORY,
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
    simple: 'After making a choice, we tend to remember it as being better than it actually was, convincing ourselves we made the right decision even when evidence suggests otherwise.',

    detailed: `Choice-Supportive Bias is a cognitive distortion in which we retroactively attribute positive attributes to the option we chose while simultaneously downplaying or forgetting the positive attributes of rejected options. Essentially, once we've made a decision, our memory rewrites history to make that decision seem smarter than it was at the time.

This bias operates through several psychological mechanisms:

1. **Cognitive Dissonance Reduction**: After choosing, we experience discomfort (cognitive dissonance) if we notice flaws in our choice or virtues in rejected alternatives. To reduce this discomfort, our memory selectively emphasizes the good aspects of what we chose and the bad aspects of what we didn't.

2. **Commitment & Consistency**: Once we've publicly committed to a choice, we're motivated to maintain consistency with that choice. This means convincing ourselves (and others) that we made the right decision, even in the face of contradictory evidence.

3. **Memory Reconstruction**: Our memories aren't recordings; they're reconstructions. Each time we recall a decision, we reconstruct it in light of our current beliefs—including the belief that we're smart decision-makers who made the right choice.

4. **Regret Avoidance**: Acknowledging that we made a suboptimal choice creates painful regret. Choice-supportive bias protects us from this pain by rewriting our memories to minimize regret.

5. **Self-Image Protection**: Our self-concept depends on believing we're competent decision-makers. Admitting mistakes threatens this self-image, so we distort memories to maintain our positive self-view.

**In Product Design & UX**:

Choice-Supportive Bias has profound implications:

**For Users**:
- After choosing a product/service, users remember it more favorably than objective reality
- They forget or minimize the pros of rejected alternatives
- This can prevent switching even when better options emerge
- Users become loyal to suboptimal choices
- Retrospective surveys show inflated satisfaction compared to real-time feedback

**For Designers & Product Teams**:
- Customer satisfaction surveys overestimate actual satisfaction (users justify their choice to use your product)
- Retention metrics look good even if product is mediocre (users convinced themselves they made the right choice)
- Users don't complain about issues they initially found important (memory rewrites)
- Comparative assessments become distorted ("our product is better because users say so" - but they're biased)

**Dark Pattern Potential**:
Choice-Supportive Bias can be exploited:
- Force users to make irreversible commitments, then they'll rationalize them
- Make switching costs high, users will convince themselves they don't want to switch
- Use post-purchase messaging to trigger rationalization
- Exploit the bias to keep users in suboptimal subscriptions

The ethical challenge is: Should we design to prevent choice-supportive bias (help users make accurate assessments) or leverage it (increase satisfaction and loyalty)?`,

    psychologyBasis: {
      discoveredBy: 'Various Researchers',
      year: 1970,
      theory: 'Cognitive Bias Research',
      mechanism: `The brain retroactively attributes more positive features to a chosen option and more negative features to rejected options. This happens because:

1. **Post-Decision Dissonance Reduction**: After committing to a choice, the brain resolves cognitive dissonance by inflating the perceived value of the chosen option and deflating the value of alternatives
2. **Selective Memory Encoding**: Positive attributes of the chosen option are encoded more strongly into long-term memory, while negative attributes are suppressed or reframed
3. **Attribution Shifting**: The reasons we recall for making a decision shift over time—original motivations fade and are replaced by post-hoc rationalizations that make the choice seem more deliberate and wise
4. **Ownership Effect**: Once we own a decision (or product), mere ownership increases its perceived value, reinforcing the belief that the choice was correct
5. **Social Reinforcement**: We seek out information and communities that validate our choice, creating a feedback loop that strengthens the bias over time

The mechanism is largely automatic—we genuinely believe our revised, more favorable memory of the decision is accurate.`,
    },

    realWorldExample: `Consider someone choosing between two smartphones:

**At Decision Time**: They carefully compare iPhone vs. Android, noting:
- iPhone: Better ecosystem integration, smoother UX, more expensive, less customizable
- Android: More customizable, cheaper, more varied hardware, less polished UX

They choose iPhone, primarily because they already have a Mac.

**Six Months Later**, if you ask them about their choice:
- "Why did you choose iPhone?" → "Because iPhones are just better—more reliable, better quality, easier to use"
- "What about Android?" → "Android phones are laggy and confusing, I'd never use one"
- "But wasn't customization important to you?" → "I don't remember caring about that. I value simplicity."

Their memory has rewritten history:
- Exaggerated iPhone's advantages beyond what they thought during decision
- Minimized/forgot iPhone's disadvantages (price, lack of customization)
- Minimized/forgot Android's advantages that once seemed important
- Exaggerated Android's disadvantages

This isn't lying—they genuinely remember it this way. Their brain rewrote the memory to justify the choice and avoid regret.

The same bias appears everywhere:
- After choosing a job, remembering it as more appealing than you initially thought
- After buying a house, forgetting the appealing features of homes you didn't buy
- After committing to a relationship, minimizing the attractive qualities of other potential partners
- After choosing a product plan, convincing yourself the other plans weren't as good anyway

This bias makes customer satisfaction surveys unreliable: users who chose your product will rate it more favorably than objective measurements would suggest, not because you're great, but because they're biased to justify their choice.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `Choice-Supportive Bias affects how users perceive their past decisions within interfaces, shaping loyalty, satisfaction, and switching behavior. Designers can leverage this to:

- Reinforce user choices with post-selection confirmation messaging ("Great choice!")
- Build loyalty features that validate past decisions (owner communities, exclusive perks)
- Suppress competitor comparisons after purchase to avoid triggering doubt
- Design post-purchase experiences that emphasize the positive aspects of the chosen option
- Create onboarding flows that celebrate the user's decision to sign up`,

    whenToUse: [
      {
        title: 'Post-Purchase Confirmation',
        scenario:
          'Immediately after a user makes a purchase, subscribes, or commits to a plan',
        example:
          'Show "You chose our most popular plan!" with a summary of key benefits the user will enjoy',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Onboarding Reinforcement',
        scenario: 'When onboarding new users who just chose your product over competitors',
        example:
          'Welcome screen highlighting "Here\'s why thousands of teams chose us" with benefits aligned to the user\'s decision',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Loyalty and Retention Programs',
        scenario: 'When encouraging continued engagement and reducing churn',
        example:
          'Monthly "Your Impact" reports showing what the user has accomplished since choosing the product',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Upgrade Paths',
        scenario: 'When encouraging users to move to a higher tier',
        example:
          'Frame upgrades as an extension of a smart original choice: "You made a great call starting with Pro—Premium takes it further"',
        impact: ImpactLevel.MEDIUM,
      },
      {
        title: 'Renewal and Re-Subscription',
        scenario: 'When a subscription is up for renewal',
        example:
          'Show a retrospective of value delivered: "In the past year, you\'ve saved 240 hours with your plan"',
        impact: ImpactLevel.HIGH,
      },
    ],

    whenToAvoid: [
      {
        title: 'When Users Need to Re-Evaluate',
        reason:
          'Reinforcing a past choice can prevent users from recognizing a better option is now available',
        consequence:
          'Users stay in suboptimal plans or products because they\'ve been conditioned to feel their original choice was perfect',
        alternative:
          'Provide honest comparisons and let users make informed decisions about whether to switch or upgrade',
      },
      {
        title: 'Hiding Product Shortcomings',
        reason:
          'Using choice reinforcement to mask genuine product deficiencies erodes long-term trust',
        consequence:
          'Users eventually discover the gap between their inflated perception and reality, leading to sudden churn and negative word-of-mouth',
        alternative:
          'Acknowledge limitations transparently and show how you\'re addressing them',
      },
      {
        title: 'Locking Users Into Bad Decisions',
        reason:
          'Exploiting the bias to keep users in expensive plans they don\'t need is manipulative',
        consequence:
          'Regulatory scrutiny, class-action risk, and reputational damage when exposed',
        alternative:
          'Proactively suggest downgrades when usage patterns indicate a lower tier would serve the user better',
      },
      {
        title: 'Suppressing Legitimate Complaints',
        reason:
          'Using "You chose this!" framing to deflect valid support issues is gaslighting',
        consequence:
          'Increased frustration, negative reviews, and support escalations',
        alternative:
          'Acknowledge issues and focus on resolution rather than reminding users they chose the product',
      },
    ],

    commonMistakes: [
      {
        title: 'Over-the-Top Congratulations',
        description:
          'Excessive celebration of every minor choice ("AMAZING CHOICE!" for selecting a font size)',
        why: 'Users perceive hollow praise as patronizing and manipulative, undermining trust',
        fix: 'Reserve choice reinforcement for significant decisions (plan selection, major features) and keep the tone genuine',
      },
      {
        title: 'Hiding Comparison Tools Post-Purchase',
        description:
          'Removing or burying feature comparison pages after a user has subscribed',
        why: 'Users who discover the suppression feel deceived; transparency builds stronger loyalty than concealment',
        fix: 'Keep comparison tools available but naturally emphasize the strengths of the chosen plan in context',
      },
      {
        title: 'Ignoring Buyer\'s Remorse Signals',
        description:
          'Not detecting when users are second-guessing their choice (checking cancellation pages, comparing competitors)',
        why: 'Choice-supportive bias is not permanent; ignoring doubt lets it escalate to churn',
        fix: 'Detect remorse signals early and proactively show value delivered, offer support, or suggest plan adjustments',
      },
      {
        title: 'Generic Reinforcement',
        description:
          'Sending the same "great choice" message regardless of what the user actually chose or why',
        why: 'Personalized reinforcement aligned to the user\'s stated reasons is far more effective than generic praise',
        fix: 'Track the user\'s decision context and tailor reinforcement to their specific motivations',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.MEDIUM,
        description:
          'Layout determines how prominently post-decision reinforcement appears',
        examples: [
          'Confirmation pages with prominent "Great choice" messaging above the fold',
          'Dashboard layouts that highlight the benefits of the user\'s chosen plan',
          'Settings pages that show the chosen plan\'s advantages relative to alternatives',
          'Onboarding flows that celebrate the decision to sign up at each step',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Typography emphasis signals which aspects of the choice to remember positively',
        examples: [
          'Bold plan names on confirmation screens reinforce identity with the choice',
          'Large, prominent benefit statements on post-purchase pages',
          'Subtle de-emphasis of limitations in the chosen plan\'s description',
          'Celebratory heading styles on welcome and confirmation screens',
        ],
      },
      color: {
        level: ImpactLevel.MEDIUM,
        description:
          'Color reinforces positive emotional associations with the chosen option',
        examples: [
          'Green success colors on confirmation and welcome screens',
          'Brand-aligned colors on the user\'s chosen plan, neutral on alternatives',
          'Warm, positive color palettes in post-purchase communications',
          'Subtle color coding that makes the chosen option feel premium',
        ],
      },
      interaction: {
        level: ImpactLevel.HIGH,
        description:
          'Post-decision interactions shape how the choice is remembered over time',
        examples: [
          'Celebratory micro-animations after plan selection (confetti, checkmarks)',
          'Progressive disclosure of benefits that unfold over days and weeks',
          'Milestone celebrations that connect achievements to the original choice',
          '"You chose well" moments triggered by feature usage milestones',
        ],
      },
      content: {
        level: ImpactLevel.CRITICAL,
        description:
          'Content framing is the primary vehicle for reinforcing or challenging past choices',
        examples: [
          '"You chose our most popular plan" messaging on dashboards',
          'Monthly value reports showing ROI of the user\'s decision',
          'Testimonials from other users who made the same choice',
          'Feature announcements framed as rewards for the user\'s plan choice',
        ],
      },
      accessibility: {
        level: ImpactLevel.MEDIUM,
        description:
          'Choice reinforcement must be perceivable by all users, including those using assistive technology',
        examples: [
          'Screen reader announcements for confirmation and celebration states',
          'Non-visual indicators of positive reinforcement (not just color or animation)',
          'Accessible alternatives to micro-animations for users with motion sensitivity',
          'Clear, descriptive text for choice confirmations rather than relying on visual cues alone',
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
        title: 'Post-Selection Plan Confirmation',
        description:
          'SaaS product confirming the user\'s plan choice with personalized reinforcement',
        code: `<div class="confirmation-panel">
  <div class="success-icon" aria-hidden="true">&#10003;</div>
  <h2>Welcome to the Pro Plan!</h2>
  <p class="social-proof">You chose our most popular plan — used by 12,000+ teams.</p>
  <div class="benefits-summary">
    <h3>Here's what you unlocked:</h3>
    <ul>
      <li><strong>Unlimited projects</strong> — no caps, ever</li>
      <li><strong>Priority support</strong> — avg. response in 2 hours</li>
      <li><strong>Advanced analytics</strong> — insights other plans don't include</li>
    </ul>
  </div>
  <p class="next-step">Let's set up your first project and put your plan to work.</p>
  <button class="primary">Get Started</button>
</div>`,
        explanation:
          'The confirmation validates the choice with social proof ("most popular") and immediately connects the decision to tangible benefits. It transitions the user from deciding to acting, reinforcing the choice through engagement.',
        principle:
          'Reinforce the choice with concrete benefits and social validation, then channel momentum into action',
        metrics: {
          before: '58% completed onboarding after generic "Thank you" page',
          after: '79% completed onboarding after choice-reinforcing confirmation',
          improvement: '36% increase in onboarding completion',
        },
      },
      {
        title: 'Monthly Value Retrospective',
        description:
          'Email or dashboard report showing the value delivered since the user chose the product',
        code: `<section class="value-report">
  <h2>Your Month with Pro</h2>
  <p class="intro">Here's what you accomplished in March:</p>
  <div class="metrics-grid">
    <div class="metric">
      <span class="number">47</span>
      <span class="label">Hours saved</span>
    </div>
    <div class="metric">
      <span class="number">12</span>
      <span class="label">Reports generated</span>
    </div>
    <div class="metric">
      <span class="number">3</span>
      <span class="label">Team members onboarded</span>
    </div>
  </div>
  <p class="reinforcement">Since choosing Pro, you've saved a total of
    <strong>312 hours</strong> across your team.</p>
  <a href="/dashboard" class="cta">See Your Full Dashboard</a>
</section>`,
        explanation:
          'Periodic value reports tie concrete accomplishments back to the original decision, strengthening the user\'s belief that they made the right choice. Cumulative metrics ("312 hours since choosing Pro") create a growing sense of vindication.',
        principle:
          'Connect ongoing value back to the original decision to build durable loyalty',
      },
      {
        title: 'Owner Community and Identity',
        description:
          'Building a sense of belonging among users who made the same choice',
        code: `<section class="community-panel">
  <h3>You're Part of the Pro Community</h3>
  <div class="member-avatars">
    <img src="avatar1.jpg" alt="Team member" class="avatar">
    <img src="avatar2.jpg" alt="Team member" class="avatar">
    <img src="avatar3.jpg" alt="Team member" class="avatar">
    <span class="count">+12,847 Pro members</span>
  </div>
  <div class="community-highlight">
    <blockquote>
      "Switching to Pro was the best decision our team made this year."
      <cite>— Sarah K., Engineering Lead at Acme Corp</cite>
    </blockquote>
  </div>
  <a href="/community">Join the Conversation</a>
</section>`,
        explanation:
          'Community features create an identity around the choice. When users see others who made the same decision celebrating it, their own choice-supportive bias is reinforced through social validation. The testimonial models the exact rationalization the bias produces.',
        principle:
          'Social identity around a shared choice amplifies individual choice-supportive bias',
      },
    ],

    bad: [
      {
        title: 'Hiding Cancellation and Comparison Options',
        description:
          'Burying plan comparison and cancellation deep in settings after purchase',
        code: `<!-- DON'T DO THIS -->
<nav class="account-settings">
  <a href="/settings/profile">Profile</a>
  <a href="/settings/notifications">Notifications</a>
  <a href="/settings/security">Security</a>
  <a href="/settings/billing">Billing</a>
  <!-- Cancellation buried 4 levels deep -->
  <a href="/settings/billing/subscription/manage/cancel"
     style="font-size: 0.7em; color: #ccc;">
    Change or cancel plan
  </a>
</nav>`,
        explanation:
          'Suppressing the ability to re-evaluate exploits choice-supportive bias rather than leveraging it ethically. Users who discover the intentional obstruction lose trust immediately, and regulators increasingly penalize this pattern.',
        principle:
          'Never exploit the bias by making it structurally difficult to reconsider a choice',
      },
      {
        title: 'Guilt-Tripping on Cancellation',
        description:
          'Using emotional manipulation when a user tries to leave',
        code: `<!-- DON'T DO THIS -->
<dialog class="cancel-modal">
  <h2>Are you sure you want to leave?</h2>
  <p class="guilt">You chose Pro because you wanted to grow your business.
  Cancelling means giving up on that dream.</p>
  <p class="loss">You'll lose access to:</p>
  <ul class="loss-list" style="color: red;">
    <li>247 saved reports</li>
    <li>Your team's 18 months of data</li>
    <li>Priority support access</li>
  </ul>
  <button class="primary">Keep My Smart Choice</button>
  <a href="#" style="font-size: 0.7em; color: #999;">I still want to cancel</a>
</dialog>`,
        explanation:
          'Weaponizing the user\'s original decision against them ("you chose this because you wanted to grow") is manipulative. The pattern conflates choice reinforcement with guilt, creating a hostile experience that damages brand perception.',
        principle:
          'Choice reinforcement must serve the user, never guilt them into staying',
      },
      {
        title: 'False "Great Choice" on Every Action',
        description:
          'Applying choice-supportive messaging to trivial decisions',
        code: `<!-- DON'T DO THIS -->
<div class="toast success">Great choice selecting dark mode!</div>
<div class="toast success">Excellent decision to sort by date!</div>
<div class="toast success">Smart move enabling notifications!</div>
<div class="toast success">You chose wisely with 12px font size!</div>`,
        explanation:
          'Overusing choice reinforcement on trivial decisions dilutes its effectiveness and feels patronizing. Users quickly learn to ignore the messaging, and it loses its power for the decisions that actually matter.',
        principle:
          'Reserve choice reinforcement for meaningful, consequential decisions',
      },
    ],

    realWorld: [
      {
        company: 'Apple',
        product: 'Ecosystem Reinforcement',
        url: 'https://www.apple.com',
        description: 'Apple continuously reinforces the choice to buy Apple products through deep ecosystem integration (iMessage, AirDrop, Handoff, iCloud). Each new device purchase makes previous purchases feel smarter. "It just works together" is a choice-supportive narrative.',
        effectiveness: 'very-effective',
        analysis: 'Apple\'s ecosystem is the ultimate choice-supportive reinforcement loop. Each additional Apple product validates all previous Apple purchases, making the original choice feel increasingly wise. Users who switch away must overcome years of accumulated choice-supportive memory.',
      },
      {
        company: 'Subaru',
        product: 'Owner Community & Events',
        url: 'https://www.subaru.com',
        description: 'Subaru cultivates an intense owner community with events, forums, and identity-driven marketing ("Love. It\'s what makes a Subaru, a Subaru"). Owners become brand evangelists who can\'t imagine having chosen differently.',
        effectiveness: 'very-effective',
        analysis: 'By building community and identity around the brand, Subaru transforms a car purchase into a lifestyle identity. Owner events and shared culture amplify choice-supportive bias through social reinforcement, making the original purchase decision feel definitional.',
      },
      {
        company: 'Spotify',
        product: 'Wrapped Annual Review',
        url: 'https://www.spotify.com/wrapped/',
        description: 'Spotify Wrapped turns a year of listening into a celebratory retrospective. By showing users their unique listening stats, it reinforces the choice to use Spotify and creates shareable social content that publicly commits users to the platform.',
        effectiveness: 'very-effective',
        analysis: 'Wrapped is a masterclass in choice-supportive design. It reframes passive consumption as personal identity, creates public commitment (sharing on social media), and generates annual renewal of the original choice to subscribe. Competitors cannot replicate a user\'s personal history.',
      },
      {
        company: 'University Alumni Networks',
        product: 'Alumni Associations',
        description: 'Universities maintain alumni networks, magazines, and events that continuously reinforce the choice to attend. Class reunions, donor campaigns, and career services all tie current success back to the original admissions decision.',
        effectiveness: 'effective',
        analysis: 'Alumni networks exploit choice-supportive bias at scale. By connecting graduates\' current achievements to their university choice, they reinforce the belief that the school was the right decision—regardless of actual educational quality relative to alternatives.',
      },
    ],

    abTests: [
      {
        title: 'Post-Purchase Confirmation: Generic vs Choice-Reinforcing',
        hypothesis:
          'Personalized choice reinforcement on confirmation pages will increase onboarding completion and 30-day retention',
        controlVersion: {
          description:
            'Standard confirmation page: "Thank you for subscribing! Your account is ready."',
          metrics: {
            conversionRate: '58%',
            timeOnPage: '0:22',
            onboardingCompletion: '58%',
          },
        },
        treatmentVersion: {
          description:
            'Choice-reinforcing confirmation: "You chose our most popular plan! Here\'s what you unlocked..." with personalized benefit summary and social proof',
          metrics: {
            conversionRate: '79%',
            timeOnPage: '1:45',
            onboardingCompletion: '79%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Choice-reinforcing confirmation increased onboarding completion by 36%. Users spent 4.8x more time on the page, engaging with the benefit summary. 30-day retention was 18% higher for the treatment group, suggesting the initial reinforcement had lasting effects.',
          learnings: [
            'Social proof ("most popular plan") was the strongest individual signal',
            'Listing specific unlocked benefits made the choice feel more consequential',
            'Users who engaged with the confirmation page had 2.3x higher feature adoption in week 1',
            'The effect was strongest for users who deliberated longest before choosing',
          ],
        },
      },
      {
        title: 'Monthly Value Report: With vs Without Choice-Linking',
        hypothesis:
          'Tying monthly achievements back to the original choice will reduce churn',
        controlVersion: {
          description:
            'Monthly report showing usage stats: "This month you created 12 reports and saved 47 hours"',
          metrics: {
            openRate: '34%',
            churnRate: '5.2%',
          },
        },
        treatmentVersion: {
          description:
            'Monthly report linking stats to original choice: "Since choosing Pro, you\'ve saved 312 total hours. This month alone: 47 hours saved, 12 reports created"',
          metrics: {
            openRate: '41%',
            churnRate: '3.1%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Linking monthly value back to the original decision reduced churn by 40%. The cumulative framing ("312 total hours since choosing Pro") was particularly effective because it made the choice feel increasingly validated over time.',
          learnings: [
            'Cumulative metrics are more powerful than monthly snapshots for reinforcement',
            'The phrase "since choosing" explicitly activates choice-supportive memory',
            'Effect was strongest at 3-6 month mark, when initial excitement has faded but loyalty hasn\'t solidified',
            'Users who opened these reports were 60% less likely to visit cancellation pages',
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
        name: 'Post-Decision Confirmation Messaging',
        description:
          'Messages like "Great choice!", "You picked our best plan", or "Welcome to the family" after user commits',
        howToSpot:
          'Look for celebratory or validating language on confirmation, welcome, and post-purchase screens',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Benefit Summaries After Selection',
        description:
          'Lists of benefits or features shown specifically after a choice is made, emphasizing what the user gained',
        howToSpot:
          'Check confirmation pages, onboarding flows, and post-purchase emails for benefit-focused content',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Comparison Suppression',
        description:
          'Competitor or alternative plan comparisons that are hidden, removed, or de-emphasized after purchase',
        howToSpot:
          'Compare the visibility of comparison tools before and after the user commits to a plan',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Social Proof Tied to Choice',
        description:
          'Messaging like "Join 10,000+ teams who chose Pro" that validates the specific decision made',
        howToSpot:
          'Look for social proof that references the specific plan, product, or option the user selected',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Value Retrospectives',
        description:
          'Periodic reports or dashboards showing cumulative value delivered since the user\'s decision',
        howToSpot:
          'Check for emails, dashboard widgets, or reports that tie metrics to the original choice date',
        severity: ImpactLevel.MEDIUM,
      },
    ],

    patterns: [
      {
        name: 'Post-Purchase Reinforcement Pattern',
        description: 'Systematic validation of the user\'s choice immediately after and periodically following a decision',
        indicators: ['"Great choice" or "Smart decision" messaging on confirmation pages', 'Onboarding flows that celebrate the decision before teaching the product', 'Welcome emails that reinforce the value of the chosen option', 'Confetti or celebratory animations after plan selection'],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Comparison Suppression Pattern',
        description: 'Reducing or eliminating competitor/alternative visibility after the user has committed',
        indicators: ['Plan comparison pages accessible pre-purchase but hidden post-purchase', 'Competitor mentions removed from post-purchase communications', 'Feature tables that only show the user\'s plan after selection', 'Difficulty finding "change plan" or "compare plans" in account settings'],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Cumulative Value Attribution Pattern',
        description: 'Periodically reminding users of accumulated value since their choice',
        indicators: ['Monthly/annual reports with "since you joined" metrics', 'Dashboard counters showing lifetime value delivered', 'Anniversary or milestone celebrations tied to signup date', 'Renewal reminders that list cumulative achievements'],
        severity: ImpactLevel.MEDIUM,
        confidence: 'high',
      },
      {
        name: 'Owner Identity Pattern',
        description: 'Building community and identity around the shared choice',
        indicators: ['Exclusive communities or forums for plan holders', 'Plan-specific badges, labels, or status indicators', '"Pro member" or "Premium user" identity labels', 'Testimonials from users who chose the same option'],
        severity: ImpactLevel.MEDIUM,
        confidence: 'medium',
      },
    ],

    checklistQuestions: [
      'Is there explicit messaging that validates the user\'s choice after they commit?',
      'Are competitor comparisons or alternative plan information equally accessible before and after purchase?',
      'Does the product periodically remind users of value delivered since their decision?',
      'Is the reinforcement personalized to the user\'s specific choice and motivations?',
      'Are there community or identity features that tie users to their plan or product choice?',
      'Is the cancellation or plan-change flow as accessible as the signup flow?',
      'Does the "great choice" messaging feel genuine, or forced and patronizing?',
      'Are users encouraged to re-evaluate their choice periodically, or is doubt discouraged?',
      'Is the choice reinforcement backed by real value data, or is it hollow praise?',
      'Could any of the reinforcement patterns be perceived as guilt-tripping or manipulation?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in choice-supportive bias.

Analyze the provided design for choice-supportive bias patterns. Identify:

1. **Post-Decision Reinforcement**: How the interface validates or celebrates user choices after they're made
2. **Comparison Suppression**: Whether competitor or alternative visibility changes before vs after commitment
3. **Value Attribution**: How ongoing value is tied back to the original decision
4. **Identity Building**: Community features or branding that ties users to their choice
5. **Cancellation Friction**: Whether leaving is disproportionately harder than joining

For each pattern found:
- Identify whether it serves the user (genuine value reinforcement) or exploits them (manipulation)
- Assess whether the reinforcement is backed by real value or is hollow praise
- Determine if comparison tools remain accessible after commitment
- Evaluate whether cancellation and plan changes are straightforward
- Suggest improvements for ethical choice reinforcement

Consider:
- Is the design reinforcing genuine value, or masking product shortcomings?
- Are users able to re-evaluate their choice with accurate information?
- Does the reinforcement feel authentic or patronizing?
- Is there a healthy balance between loyalty-building and user autonomy?
- Could any pattern be perceived as guilt-tripping or dark pattern?

Provide actionable recommendations for ethical, effective choice reinforcement.`,

    outputSchema: {
      type: 'object',
      properties: {
        choiceReinforcementPatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              reinforcementMethod: { type: 'string' },
              backedByRealValue: { type: 'boolean' },
              userServing: { type: 'boolean' },
              ethical: { type: 'boolean' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'reinforcementMethod',
              'userServing',
              'ethical',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            reinforcementQuality: { type: 'number' },
            comparisonAccessibility: { type: 'number' },
            cancellationFairness: { type: 'number' },
            ethicalScore: { type: 'number' },
          },
          required: [
            'reinforcementQuality',
            'comparisonAccessibility',
            'cancellationFairness',
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
        'choiceReinforcementPatterns',
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
        title: 'Map the Decision Points',
        description:
          'Identify every significant decision a user makes in your product (plan selection, feature choices, onboarding paths)',
        example:
          'Decision map: Sign up → Choose plan → Select features → Invite team → Configure workflow',
        tips: [
          'Focus on decisions with alternatives the user considered and rejected',
          'Include implicit choices (choosing to stay, choosing not to upgrade)',
          'Rank decisions by emotional weight and switching cost',
        ],
      },
      {
        step: 2,
        title: 'Design Post-Decision Confirmation',
        description:
          'Create confirmation experiences that validate the choice with concrete, personalized benefits',
        example:
          'After plan selection: "You chose Pro — here are the 5 features you just unlocked that 80% of teams use daily"',
        tips: [
          'Reference the specific choice, not generic praise',
          'Include social proof tied to the exact option chosen',
          'Transition quickly from celebration to action (onboarding, first task)',
        ],
      },
      {
        step: 3,
        title: 'Build Ongoing Value Attribution',
        description:
          'Create periodic touchpoints that connect current value back to the original decision',
        example:
          'Monthly email: "Since choosing Pro 4 months ago, your team has saved 189 hours and completed 47 projects"',
        tips: [
          'Use cumulative metrics, not just periodic snapshots',
          'Tie metrics to outcomes the user cares about (time saved, revenue generated)',
          'Time these touchpoints to coincide with renewal or potential churn windows',
        ],
      },
      {
        step: 4,
        title: 'Foster Community and Identity',
        description:
          'Create belonging around the shared choice to amplify social reinforcement',
        example:
          'Exclusive Pro community forum, plan-specific badges, "Pro member since 2024" labels',
        tips: [
          'Make community membership feel earned, not imposed',
          'Feature testimonials from users who made the same choice',
          'Create shared rituals or events (annual retrospectives, community calls)',
        ],
      },
      {
        step: 5,
        title: 'Maintain Ethical Boundaries',
        description:
          'Ensure reinforcement is backed by real value and that users retain autonomy to re-evaluate',
        example:
          'Keep plan comparison pages accessible, make cancellation straightforward, proactively suggest downgrades when appropriate',
        tips: [
          'Test whether users can find cancellation in under 3 clicks',
          'Regularly audit whether "great choice" messaging is backed by actual value delivery',
          'Never use the user\'s original decision against them in retention flows',
        ],
      },
    ],

    dos: [
      'Reinforce choices with concrete, personalized value data',
      'Use social proof tied to the specific option the user chose',
      'Build cumulative value narratives that grow over time',
      'Create genuine community around shared product choices',
      'Keep comparison and plan-change tools accessible at all times',
      'Time reinforcement to coincide with natural doubt moments (renewal, competitor launches)',
      'Back all "great choice" messaging with measurable value delivery',
      'Make cancellation and downgrade paths clear and respectful',
    ],

    donts: [
      'Don\'t hide or bury comparison tools after the user commits',
      'Don\'t use the user\'s original decision to guilt them during cancellation',
      'Don\'t apply "great choice" messaging to trivial, inconsequential decisions',
      'Don\'t use hollow praise without backing it with real value data',
      'Don\'t make cancellation disproportionately harder than signup',
      'Don\'t suppress information about product limitations or competitor advantages',
      'Don\'t use choice reinforcement to mask genuine product deficiencies',
      'Don\'t create lock-in that prevents users from making better choices when they emerge',
    ],

    bestPractices: [
      {
        title: 'Personalize Reinforcement to Decision Context',
        description:
          'Track why the user made their choice and reinforce those specific reasons over time',
        rationale:
          'Generic praise feels hollow; reinforcement aligned to original motivations resonates deeply',
        example:
          'If user chose Pro for "team collaboration," monthly reports emphasize team metrics, not solo features',
      },
      {
        title: 'Use Cumulative Framing',
        description:
          'Show total value since the decision, not just recent value',
        rationale:
          'Cumulative numbers grow over time, making the original choice feel increasingly validated',
        example:
          '"Since choosing Pro: 312 hours saved, 1,247 tasks completed, 89 team members onboarded"',
      },
      {
        title: 'Balance Reinforcement with Honesty',
        description:
          'Acknowledge limitations and suggest plan changes when usage patterns warrant it',
        rationale:
          'Users who are proactively helped to downgrade become advocates; users who feel trapped become detractors',
        example:
          '"Your usage suggests the Starter plan might be a better fit. Want to save $30/month?"',
      },
      {
        title: 'Create Re-Evaluation Windows',
        description:
          'Periodically invite users to honestly assess whether their choice still serves them',
        rationale:
          'Controlled re-evaluation builds trust and prevents sudden churn when doubts accumulate',
        example:
          'Annual "Plan Check-Up" that honestly compares the user\'s usage to plan features',
      },
    ],

    accessibility: [{
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships - Ensure choice confirmation messaging is semantically structured',
        implementation:
          'Use proper headings, ARIA live regions for confirmations, and semantic HTML so screen reader users receive the same choice reinforcement as visual users',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.4.6',
        guideline:
          'Headings and Labels - Label confirmation and value report sections clearly',
        implementation:
          'Use descriptive headings like "Your Plan Benefits" and "Monthly Value Report" so all users can navigate to reinforcement content',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.1.1',
        guideline:
          'Keyboard - Ensure all plan change, comparison, and cancellation flows are fully keyboard accessible',
        implementation:
          'Test that users can navigate to plan comparison, change, and cancellation options using only a keyboard, without visual-only cues',
      },
    ],

    ethics: [
      {
        concern: 'Comparison Suppression',
        severity: 'critical',
        explanation:
          'Hiding or de-emphasizing competitor comparisons and alternative plans after purchase to prevent re-evaluation',
        mitigation:
          'Keep all comparison tools, plan change options, and competitor information equally accessible before and after purchase. Trust that real value retains users.',
      },
      {
        concern: 'Cancellation Dark Patterns',
        severity: 'critical',
        explanation:
          'Using choice-supportive framing to guilt users during cancellation ("You chose this because you believed in your business")',
        mitigation:
          'Make cancellation straightforward and respectful. Offer retention incentives, not guilt. Let users leave gracefully—many will return.',
      },
      {
        concern: 'Hollow Reinforcement',
        severity: 'high',
        explanation:
          'Sending "great choice" messaging when the product is not actually delivering value to the specific user',
        mitigation:
          'Only send reinforcement backed by measurable value data. If the user isn\'t getting value, focus on helping them succeed rather than praising their choice.',
      },
      {
        concern: 'Lock-In Exploitation',
        severity: 'high',
        explanation:
          'Combining choice reinforcement with high switching costs to trap users in suboptimal choices',
        mitigation:
          'Reduce switching costs (data export, API access). Let the product\'s value retain users, not the difficulty of leaving.',
      },
      {
        concern: 'Survey Distortion',
        severity: 'medium',
        explanation:
          'Relying on satisfaction surveys that are inflated by choice-supportive bias without calibrating for the effect',
        mitigation:
          'Supplement satisfaction surveys with behavioral metrics (actual usage, churn signals). Compare self-reported satisfaction to objective engagement data.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'Aging and the Positivity Effect in Memory for Choice',
        author: 'Mather, M., & Johnson, M. K.',
        year: 2000,
        description:
          'Foundational research demonstrating that people remember chosen options more favorably and rejected options less favorably over time',
        type: 'foundational',
      },
      {
        title: 'Memory Distortions of Past Choice Quality: How Focusing on Attributes Reduces Choice-Supportive Source Monitoring',
        author: 'Henkel, L. A., & Mather, M.',
        year: 2007,
        description:
          'Explores how choice-supportive bias distorts source monitoring in memory, attributing positive features to chosen options',
        type: 'advanced',
      },
      {
        title: 'Choice-Supportive Source Monitoring: Do Our Decisions Seem Better to Us as We Age?',
        author: 'Mather, M., Shafir, E., & Johnson, M. K.',
        year: 2003,
        doi: '10.1037/0882-7974.18.4.638',
        description:
          'Demonstrates that choice-supportive bias strengthens with age, with older adults showing stronger memory distortions favoring chosen options',
        type: 'advanced',
      },
      {
        title: 'The Spreading of Alternatives: Is It the Perceived Choice or Change in Affect?',
        author: 'Risen, J. L., & Gilovich, T.',
        year: 2008,
        description:
          'Investigates the relationship between choice-supportive bias and the free-choice paradigm in cognitive dissonance research',
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
          'Covers choice-supportive bias in the context of memory distortion and decision-making heuristics',
        type: 'foundational',
      },
      {
        title: 'Stumbling on Happiness',
        author: 'Gilbert, Daniel',
        year: 2006,
        isbn: '9781400077427',
        description:
          'Explores how we rationalize past decisions and misremember our preferences, directly relevant to choice-supportive bias',
        type: 'practical',
      },
      {
        title: 'Mistakes Were Made (But Not by Me)',
        author: 'Tavris, C., & Aronson, E.',
        year: 2007,
        isbn: '9780156033909',
        description:
          'Examines self-justification and cognitive dissonance, the core mechanisms behind choice-supportive bias',
        type: 'practical',
      },
    ],

    articles: [
      {
        title: 'Choice-Supportive Bias',
        author: 'The Decision Lab',
        url: 'https://thedecisionlab.com/biases/choice-supportive-bias',
        description:
          'Accessible overview of choice-supportive bias with practical examples and design implications',
        type: 'practical',
      },
      {
        title: 'Post-Purchase Rationalization in UX Design',
        author: 'Nielsen Norman Group',
        url: 'https://www.nngroup.com/',
        description:
          'How post-purchase rationalization shapes user satisfaction and retention in digital products',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'Why You Think You Made the Right Choice',
        author: 'Veritasium',
        url: 'https://www.youtube.com/watch?v=vBkey_L9YJU',
        description:
          'Engaging video explanation of how our memory distorts past choices to support our self-image',
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
