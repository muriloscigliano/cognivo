import type { BiasCard } from '../core/types.js';
import { BiasCategory, ImpactLevel } from '../core/types.js';

/**
 * BANDWAGON EFFECT
 *
 * The tendency to do (or believe) things because many other people do (or believe) the same.
 * A powerful form of groupthink also known as "herd mentality."
 *
 * Category: Social
 * Impact: Critical
 *
 * This is one of the most powerful social biases in design, driving viral growth,
 * social proof mechanics, and collective behavior patterns.
 */

export const bandwagonEffect: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'bandwagon-effect',
    name: 'Bandwagon Effect',
    aliases: [
      'Herd Mentality',
      'Herd Behavior',
      'Groupthink',
      'Follow the Crowd',
      'Conformity Bias',
      'Social Momentum',
    ],
    category: BiasCategory.SOCIAL,
    relatedCategories: [
      BiasCategory.DECISION_MAKING,
      BiasCategory.EMOTIONAL,
      BiasCategory.COGNITIVE,
    ],
    tags: [
      'social-proof',
      'conformity',
      'viral',
      'popularity',
      'trends',
      'group-dynamics',
      'peer-pressure',
      'social-validation',
      'crowd-wisdom',
      'network-effects',
      'momentum',
      'mass-behavior',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple:
      'People tend to adopt beliefs, behaviors, and choices simply because many others have done so, regardless of their own analysis or preferences.',

    detailed: `The Bandwagon Effect describes how the rate of adoption of beliefs, ideas, trends, and behaviors accelerates as more people adopt them. People "jump on the bandwagon" not because they have independently evaluated the merits, but because the sheer number of adopters serves as a powerful social signal that something must be worthwhile.

This effect operates through two primary channels: conformity pressure and information cascades. Conformity pressure arises from our deep evolutionary need to belong -- deviating from the group feels socially risky. Information cascades occur when people abandon their private judgment and follow the crowd, reasoning that so many people cannot all be wrong. Together, these channels create positive feedback loops where initial popularity breeds further popularity, sometimes exponentially.

In digital product design, the Bandwagon Effect explains why user counts, trending labels, "most popular" badges, and viral sharing mechanics are so persuasive. It powers adoption curves, viral loops, and network effects. A product with "10 million users" feels inherently safer and more valuable than a superior product with 500 users. However, this effect can also be exploited through manufactured virality, inflated metrics, and fake trending indicators -- making ethical application a critical design consideration.`,

    psychologyBasis: {
      discoveredBy: 'Solomon Asch',
      year: 1951,
      theory: 'Conformity Experiments',
      mechanism: `People adopt beliefs and behaviors because many others do, driven by two core mechanisms:

1. **Conformity Pressure**: Asch's experiments showed that 75% of participants conformed to obviously wrong group answers at least once. The discomfort of disagreeing with a group activates the anterior cingulate cortex (conflict detection), creating psychological pain that motivates alignment. We are wired to belong, and standing apart from the crowd triggers social threat responses.

2. **Information Cascades**: When individuals observe many others making a choice, they rationally infer that the crowd possesses information they lack. Each new adopter adds to the signal, causing subsequent people to disregard their private information and follow the majority. Once started, cascades are self-reinforcing: the more people join, the stronger the signal, the more people join.

3. **Reduced Cognitive Load**: Independent evaluation is mentally expensive. Following what everyone else does is a low-effort heuristic that works well enough in most situations. Under uncertainty or information overload, defaulting to the majority choice is an efficient cognitive shortcut.

4. **Self-Fulfilling Prophecy**: Through network effects, popular things often become genuinely more valuable as more people adopt them (messaging apps, social platforms, marketplaces). This retroactively validates the bandwagon behavior and accelerates the cycle further.

The evolutionary basis is clear: in ancestral environments, following group behavior was adaptive for survival. Deviating from the group risked ostracism, which in small tribal societies could be fatal. Modern digital environments exploit this ancient mechanism at unprecedented scale and speed.`,
    },

    realWorldExample: `Consider how you choose a restaurant in an unfamiliar city. You walk down a street and see two restaurants side by side, both with similar menus and prices. One is nearly empty; the other has a 20-minute wait with people lined up outside. Most people intuitively assume the busy restaurant is better, even with no other information.

This assumption persists even if you later learn the empty restaurant just opened yesterday (explaining low traffic) and actually has a Michelin-starred chef, while the busy one is popular mainly because it was featured on social media. The visual cue of the crowd overrides logical analysis.

The same effect explains why:
- Products labeled "bestseller" outsell objectively superior alternatives
- News articles with high share counts get shared even more (exponential spread)
- Apps with "10M+ downloads" get downloaded more than better apps with fewer users
- Social media posts with many likes receive more likes (rich get richer)
- Fashion trends sweep through populations regardless of objective aesthetics
- Investment bubbles inflate as more people buy, attracting even more buyers

The Bandwagon Effect can create winner-take-all dynamics where initial small advantages compound into dominant market positions.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `The Bandwagon Effect is one of the most powerful forces in digital product design. It drives viral growth, shapes adoption curves, and determines which products achieve critical mass. Every trending feature, popular choice indicator, user counter, and viral loop mechanism leverages this bias.

When applied ethically, bandwagon mechanics can:
- Help users discover genuinely valuable content through aggregated wisdom
- Reduce decision paralysis by highlighting what peers have chosen
- Create network effects that make products more valuable for everyone
- Accelerate adoption of beneficial innovations
- Build vibrant communities through visible collective participation

When misused, it becomes a dark pattern:
- Inflated popularity metrics deceive users into false confidence
- Manufactured trending creates artificial demand
- Fake social proof (bot activity, purchased reviews) constitutes fraud
- Stacking pressure tactics (scarcity + urgency + popularity) manipulates decisions
- Popularity cascades can amplify misinformation and suppress minority voices`,

    whenToUse: [
      {
        title: 'Trending Features and Content',
        scenario:
          'When surfacing content or features gaining rapid momentum among users',
        example:
          'TikTok-style "trending sounds" section showing audio clips with exponential adoption curves',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Popular Choice Indicators',
        scenario:
          'When helping users navigate large catalogs by highlighting what others chose',
        example:
          '"Most Popular" badge on subscription plans, with "chosen by 73% of users" specificity',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'User Adoption Counters',
        scenario:
          'When demonstrating product viability and community size to prospective users',
        example:
          '"Join 2.8M developers" on a SaaS signup page, using real-time authenticated counts',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Viral Sharing Loops',
        scenario:
          'When the product genuinely becomes more valuable as more people join',
        example:
          '"15 of your contacts are already here" in a messaging app where network size = value',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Adoption Curve Visualization',
        scenario:
          'When showing growth momentum to build confidence in a product or movement',
        example:
          'A live dashboard showing "500 new users in the last hour" with an upward trend line',
        impact: ImpactLevel.MEDIUM,
      },
      {
        title: 'Community Activity Indicators',
        scenario:
          'When creating a vibrant, active community feeling that motivates participation',
        example:
          '"2,847 people learning Python right now" with a green pulse indicator for real-time presence',
        impact: ImpactLevel.MEDIUM,
      },
      {
        title: 'Social Validation for Purchases',
        scenario:
          'When authentic popularity signals help users assess product quality',
        example:
          '"4.7 stars from 23,841 reviews" next to a "Bestseller" badge based on actual category sales',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Peer Behavior Motivation',
        scenario:
          'When social motivation drives beneficial behaviors (learning, fitness, sustainability)',
        example:
          '"12 friends completed this 30-day challenge" to motivate participation in a fitness app',
        impact: ImpactLevel.MEDIUM,
      },
    ],

    whenToAvoid: [
      {
        title: 'Independent Judgment Required',
        reason:
          'Medical, financial, and legal decisions require independent analysis, not conformity',
        consequence:
          'Users might choose a popular treatment over the medically correct one for their condition',
        alternative:
          'Provide expert guidance and personalized recommendations without social pressure',
      },
      {
        title: 'Quality Not Correlated with Popularity',
        reason:
          'In specialized or niche domains, the best option is rarely the most popular',
        consequence:
          'Expert users miss specialized tools that better fit their advanced needs',
        alternative:
          'Use expert recommendations, detailed comparisons, and feature matching instead',
      },
      {
        title: 'Metrics Are Not Genuine',
        reason:
          'Inflated, fabricated, or decontextualized popularity numbers are unethical and often illegal',
        consequence:
          'Destroys trust permanently when discovered; potential FTC violations and legal liability',
        alternative:
          'Show only genuine, verifiable metrics or omit social proof entirely',
      },
      {
        title: 'Minority Voices at Risk',
        reason:
          'Pure popularity ranking can suppress valuable minority perspectives and innovation',
        consequence:
          'Echo chambers form; diverse viewpoints are silenced; innovation stagnates',
        alternative:
          'Actively surface diverse viewpoints alongside popular ones; blend popularity with diversity signals',
      },
      {
        title: 'Manufactured Virality',
        reason:
          'Creating artificial trending through bots, paid engagement, or algorithmic manipulation is deceptive',
        consequence:
          'Legal issues, user backlash, destroyed brand credibility when exposed',
        alternative:
          'Let organic engagement drive trending; be transparent about how trending is calculated',
      },
      {
        title: 'Stacked Pressure Tactics',
        reason:
          'Combining countdown timers + scarcity + social proof creates manipulative psychological pressure',
        consequence:
          'Purchase regret, chargebacks, negative reviews, regulatory scrutiny',
        alternative:
          'Use a single honest signal; let product value speak for itself',
      },
    ],

    commonMistakes: [
      {
        title: 'Inflated Popularity Metrics',
        description:
          'Showing total historical signups instead of active users, or rounding up aggressively',
        why: '"10 million users" means nothing if 9.5 million are inactive; users feel deceived when context is missing',
        fix: 'Show active user counts with timeframes: "850,000 active users this month" is more honest and still impressive',
      },
      {
        title: 'Fake Trending Indicators',
        description:
          'Manually promoting content as "trending" when it is not organically gaining momentum',
        why: 'Manufactured trending destroys the meaning of the label and erodes trust in all platform signals',
        fix: 'Use transparent, algorithmic trending based on velocity of genuine engagement; disclose methodology',
      },
      {
        title: 'Manufactured Virality',
        description:
          'Using bots, purchased engagement, or astroturfing to create the appearance of organic popularity',
        why: 'Fraudulent and potentially illegal; modern users and journalists are skilled at detecting inauthentic activity',
        fix: 'Invest in genuine product quality and organic growth mechanics; manufactured popularity always collapses',
      },
      {
        title: 'Context-Free Popularity Numbers',
        description:
          'Displaying user counts without timeframe, segment, or category context',
        why: '"10,000 users" means very different things for a 1-week-old vs 10-year-old product',
        fix: 'Provide temporal context: "10,000 users this month" or "joined by 500 users yesterday"',
      },
      {
        title: 'Unfiltered Popularity Amplification',
        description:
          'Promoting content solely based on engagement volume without quality moderation',
        why: 'Viral does not mean good; popularity cascades can amplify misinformation, outrage, and harmful content',
        fix: 'Combine popularity signals with quality checks, fact-checking, and content moderation',
      },
      {
        title: 'Bot-Driven Activity Notifications',
        description:
          'Showing scripted "Sarah from Austin just purchased this!" notifications on rotation',
        why: 'Users recognize fake notification patterns quickly; destroys trust and may violate FTC guidelines',
        fix: 'Show only authentic, server-verified user activity or remove activity notifications entirely',
      },
      {
        title: '"Everyone Is Using" Without Substance',
        description:
          'Vague claims like "everyone loves it" or "the world is switching" without supporting data',
        why: 'Unsubstantiated popularity claims feel hollow and can backfire, especially with skeptical audiences',
        fix: 'Replace vague claims with specific, verifiable metrics: "chosen by 12,847 engineering teams this quarter"',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.CRITICAL,
        description:
          'Layout determines the visibility and influence of popularity signals on user decisions',
        examples: [
          'Trending sections positioned above-the-fold drive significantly higher engagement',
          'Popularity badges adjacent to call-to-action buttons amplify conversion',
          'User count displays in hero sections establish immediate social proof',
          'Leaderboards and rankings create competitive bandwagon dynamics',
          'Social activity feeds create ambient awareness of community presence',
          '"Most popular" highlighting within pricing tables steers plan selection',
        ],
      },
      typography: {
        level: ImpactLevel.HIGH,
        description:
          'Typography emphasis on popularity metrics affects perceived credibility and memorability',
        examples: [
          'Large, bold user counts ("2.8M users") create stronger bandwagon signals than small text',
          'Labels like "Trending", "Most Popular", and "#1" need high visual weight',
          'Specific numbers ("15,847") in tabular-nums font feel more credible than rounded figures',
          'Timestamp formatting on activity feeds affects perceived recency and urgency',
          'Testimonial attribution typography must be readable and clearly tied to real people',
        ],
      },
      color: {
        level: ImpactLevel.MEDIUM,
        description:
          'Color reinforces emotional associations with popularity signals and trending indicators',
        examples: [
          'Gold and orange badges for "Bestseller" create premium popularity signals',
          'Red/hot colors for trending indicators signal high activity and urgency',
          'Green pulse indicators for live user counts suggest active, healthy community',
          'Subtle color differences can distinguish trending-now vs all-time-popular',
          'Avoid aggressive colors (flashing red) that make social proof feel manipulative',
        ],
      },
      interaction: {
        level: ImpactLevel.CRITICAL,
        description:
          'Interactive elements amplify bandwagon dynamics through real-time feedback, sharing, and social mechanics',
        examples: [
          'Real-time rolling counters showing user growth create momentum perception',
          'One-click sharing mechanics lower the friction of joining and spreading the bandwagon',
          'Upvote/like animations provide dopamine feedback that reinforces participation',
          'Sorting by "Most Popular" as default steers users toward crowd favorites',
          'Notification of "X friends also use this" creates personal social pressure',
          'Viral referral flows ("invite friends, unlock rewards") harness network effects',
          'Hover states revealing popularity details (growth charts, adoption rate) add depth',
        ],
      },
      content: {
        level: ImpactLevel.CRITICAL,
        description:
          'Content accuracy and framing determine whether bandwagon signals inform or manipulate',
        examples: [
          'Specific numbers are more credible: "15,847 users" > "thousands of users"',
          'Temporal framing matters: "fastest growing" vs "most used" vs "trending today"',
          'Localized social proof ("popular in your city") increases personal relevance',
          'Trending topics should reflect genuine user interest, not editorial manipulation',
          'Activity descriptions must be honest: "John purchased X" not "John loves X"',
          'Comparative framing: "join 10M users" vs "growing faster than [competitor]"',
        ],
      },
      accessibility: {
        level: ImpactLevel.HIGH,
        description:
          'Social proof elements must be perceivable by all users without creating overwhelming cognitive load',
        examples: [
          'Popularity badges need text alternatives: "Bestseller in Electronics" not just a decorative icon',
          'Live activity feeds require aria-live="polite" regions (not assertive) to avoid overwhelming screen readers',
          'Visual-only indicators (trending icons, pulse dots) need descriptive text alternatives',
          'Animated counters and activity feeds must respect prefers-reduced-motion settings',
          'Users should be able to dismiss or hide social proof elements if they are distracting',
          'Do not rely solely on color to indicate popularity levels (trending vs not)',
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
        title: '"Most Popular" Plan Badge with Real Data',
        description:
          'Pricing table highlighting the most-chosen plan based on authentic conversion data',
        code: `<div class="pricing-table">
  <div class="plan">
    <h3>Starter</h3>
    <div class="price">$9<span>/mo</span></div>
  </div>

  <div class="plan popular">
    <span class="badge"
          aria-label="Most popular plan, chosen by 73% of teams">
      Most Popular
    </span>
    <h3>Pro</h3>
    <div class="price">$29<span>/mo</span></div>
    <p class="social-proof">Chosen by 73% of teams</p>
  </div>

  <div class="plan">
    <h3>Enterprise</h3>
    <div class="price">$99<span>/mo</span></div>
  </div>
</div>

<style>
.pricing-table {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--cg-space-4);
}

.plan.popular {
  border: 2px solid var(--cg-color-primary);
  transform: scale(1.05);
  position: relative;
}

.badge {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--cg-color-primary);
  color: white;
  padding: 4px 16px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
}

.social-proof {
  color: var(--cg-color-text-secondary);
  font-size: 13px;
}
</style>`,
        explanation:
          'The "73% of teams" is a specific, verifiable statistic from real conversion data. It helps users identify the most common choice without pressure or fabrication. The badge is accessible with a descriptive aria-label.',
        principle:
          'Authentic popularity indicators help users make informed decisions when backed by real data',
        metrics: {
          before: 'Pro plan conversion: 48%',
          after: 'Pro plan conversion: 67%',
          improvement:
            '40% increase in Pro plan selection after adding specific percentage',
        },
      },
      {
        title: 'Trending Section with Velocity Indicators',
        description:
          'Content platform showing genuinely trending items based on engagement velocity',
        code: `<section class="trending" aria-labelledby="trending-heading">
  <h2 id="trending-heading">
    <svg class="icon-trending" aria-hidden="true">
      <use href="#icon-trending-up"></use>
    </svg>
    Trending Now
  </h2>

  <ul class="trending-list">
    <li class="trending-item">
      <span class="rank">#1</span>
      <div class="item-info">
        <h3>Building with Web Components</h3>
        <p class="velocity">
          <span class="arrow-up" aria-hidden="true"></span>
          <span>2,340 views in the last hour</span>
        </p>
      </div>
    </li>
    <li class="trending-item">
      <span class="rank">#2</span>
      <div class="item-info">
        <h3>Design Tokens at Scale</h3>
        <p class="velocity">
          <span class="arrow-up" aria-hidden="true"></span>
          <span>1,820 views in the last hour</span>
        </p>
      </div>
    </li>
  </ul>

  <p class="methodology">
    Based on engagement velocity over the last 4 hours.
    <a href="/how-trending-works">How trending works</a>
  </p>
</section>

<style>
.trending {
  padding: var(--cg-space-6);
  background: var(--cg-color-surface-elevated);
  border-radius: var(--cg-radius-lg);
}

.trending-item {
  display: flex;
  align-items: center;
  gap: var(--cg-space-3);
  padding: var(--cg-space-3) 0;
  border-bottom: 1px solid var(--cg-color-border);
}

.rank {
  font-size: var(--cg-font-size-xl);
  font-weight: 700;
  color: var(--cg-color-primary);
  min-width: 36px;
}

.velocity {
  font-size: var(--cg-font-size-sm);
  color: var(--cg-color-success);
  display: flex;
  align-items: center;
  gap: var(--cg-space-1);
}

.methodology {
  font-size: var(--cg-font-size-xs);
  color: var(--cg-color-text-tertiary);
  margin-top: var(--cg-space-4);
}
</style>`,
        explanation:
          'Trending is based on genuine engagement velocity, not editorial picks. The methodology is disclosed and linked. Temporal context ("in the last hour") prevents stale signals from appearing fresh.',
        principle:
          'Transparent trending algorithms with disclosed methodology build trust and genuine discovery',
      },
      {
        title: 'Real-Time Active User Counter',
        description:
          'Live user count from authenticated server data creating community presence',
        code: `<div class="community-presence" role="status" aria-live="polite">
  <div class="pulse-dot" aria-hidden="true"></div>
  <span class="user-count" id="active-count">14,392</span>
  <span class="label">people online right now</span>
</div>

<style>
.community-presence {
  display: inline-flex;
  align-items: center;
  gap: var(--cg-space-2);
  padding: var(--cg-space-2) var(--cg-space-4);
  background: var(--cg-color-success-subtle);
  border-radius: var(--cg-radius-full);
  border: 1px solid var(--cg-color-success-border);
}

.pulse-dot {
  width: 8px;
  height: 8px;
  background: var(--cg-color-success);
  border-radius: 50%;
  animation: pulse 2s ease-in-out infinite;
}

@media (prefers-reduced-motion: reduce) {
  .pulse-dot { animation: none; }
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

.user-count {
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  color: var(--cg-color-success-emphasis);
}
</style>`,
        explanation:
          'The counter displays authenticated server data, not fabricated numbers. The pulse animation respects prefers-reduced-motion. The aria-live region announces updates without overwhelming screen readers.',
        principle:
          'Genuine real-time indicators create social presence and community feeling without deception',
      },
      {
        title: 'Viral Sharing with Transparent Counters',
        description:
          'Share buttons showing authentic engagement counts to enable social spread',
        code: `<div class="share-bar" role="group" aria-label="Share this article">
  <button class="share-btn" aria-label="Share on Twitter, shared 2,341 times">
    <svg aria-hidden="true"><use href="#icon-twitter"></use></svg>
    <span class="count">2,341</span>
  </button>
  <button class="share-btn" aria-label="Share on LinkedIn, shared 891 times">
    <svg aria-hidden="true"><use href="#icon-linkedin"></use></svg>
    <span class="count">891</span>
  </button>
  <button class="share-btn" aria-label="Copy link, copied 456 times">
    <svg aria-hidden="true"><use href="#icon-link"></use></svg>
    <span class="count">456</span>
  </button>
</div>

<style>
.share-bar {
  display: flex;
  gap: var(--cg-space-2);
}

.share-btn {
  display: flex;
  align-items: center;
  gap: var(--cg-space-1);
  padding: var(--cg-space-2) var(--cg-space-3);
  border: 1px solid var(--cg-color-border);
  border-radius: var(--cg-radius-md);
  background: var(--cg-color-surface);
  cursor: pointer;
  transition: background 0.2s;
}

.share-btn:hover {
  background: var(--cg-color-surface-hover);
}

.count {
  font-size: var(--cg-font-size-sm);
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}
</style>`,
        explanation:
          'Share counts are pulled from real platform APIs. Each button has a descriptive aria-label. The visible counts create bandwagon appeal -- articles with high share counts receive more shares -- but the numbers are authentic.',
        principle:
          'Visible engagement counts create virtuous viral loops when the underlying data is genuine',
      },
    ],

    bad: [
      {
        title: 'Inflated Popularity Metrics with Hidden Asterisk',
        description:
          'Using a massive number that sounds impressive but is misleading with nearly invisible fine print',
        code: `<!-- MANIPULATIVE: Deceptive user count -->
<div class="signup-hero">
  <h1>Join Over 10 Million Users!</h1>
  <button class="cta">Get Started Free</button>
  <p class="fine-print">
    *Total accounts created since 2012, including
    inactive and deleted accounts
  </p>
</div>

<style>
.fine-print {
  font-size: 8px;
  color: #ccc;
  margin-top: 24px;
  /* Intentionally nearly invisible */
}
</style>`,
        explanation:
          '10 million total historical signups (including inactive and deleted accounts) is vastly different from 10 million active users. The fine print is intentionally made hard to read. When users discover the real active count is 200,000, trust is destroyed.',
        principle:
          'Decontextualized popularity numbers are a form of deception',
      },
      {
        title: 'Fake Trending and Manufactured Virality',
        description:
          'Manually marking items as "trending" or using bots to inflate engagement metrics',
        code: `<!-- FRAUDULENT: Fake trending -->
<section class="trending">
  <h2>Trending Now</h2>
  <!-- Editorially chosen, not algorithmically trending -->
  <div class="trending-item">
    <span class="badge-hot">HOT</span>
    <h3>Our New Product Launch</h3>
    <p class="fake-stats">
      Viewed by 50,000 people today
    </p>
  </div>
</section>

<script>
// Bot-inflated view counter
let fakeViews = 50000;
setInterval(() => {
  fakeViews += Math.floor(Math.random() * 50) + 10;
  document.querySelector('.fake-stats').textContent =
    'Viewed by ' + fakeViews.toLocaleString() + ' people today';
}, 3000);
</script>`,
        explanation:
          'The "trending" label is editorial, not algorithmic. The view count is bot-inflated with a random incrementer. This manufactures false virality for a product the company wants to push, not content users are genuinely engaging with.',
        principle:
          'Manufactured trending destroys the meaning and trustworthiness of all platform signals',
      },
      {
        title: 'Fake Activity Notification Loop',
        description:
          'Scripted notifications pretending to show real user activity on a continuous rotation',
        code: `<!-- FRAUDULENT: Bot-generated "activity" -->
<div class="activity-toast" id="fake-toast"></div>

<script>
const fakeNames = [
  'Sarah K.', 'Michael T.', 'Jennifer L.',
  'David R.', 'Emma W.', 'James P.'
];
const fakeCities = [
  'Austin', 'Seattle', 'Boston',
  'Denver', 'Portland', 'Chicago'
];
const fakeActions = [
  'just signed up', 'upgraded to Pro',
  'invited 3 friends', 'completed onboarding'
];

let idx = 0;

function showFakeNotification() {
  const name = fakeNames[idx % fakeNames.length];
  const city = fakeCities[idx % fakeCities.length];
  const action = fakeActions[idx % fakeActions.length];

  const toast = document.getElementById('fake-toast');
  toast.innerHTML =
    '<strong>' + name + '</strong> from ' + city +
    ' ' + action + ' <em>just now</em>';
  toast.style.display = 'block';

  setTimeout(() => toast.style.display = 'none', 4000);
  idx++;
}

// Rotate every 12 seconds forever
setInterval(showFakeNotification, 12000);
</script>`,
        explanation:
          'These are not real people -- they are scripted names on a rotation. The "just now" timestamp is always fake. Users quickly recognize the pattern when "Sarah K. from Austin" appears repeatedly. This is fraudulent and may violate consumer protection laws.',
        principle:
          'Simulated user activity is fraud -- only show verified, genuine actions',
      },
      {
        title: 'Stacked Pressure: Scarcity + Social Proof + Urgency',
        description:
          'Combining multiple manipulative tactics to overwhelm rational decision-making',
        code: `<!-- MANIPULATIVE: Layered dark patterns -->
<div class="product-pressure">
  <div class="alert-red">
    37 people are viewing this right now!
  </div>
  <div class="alert-red">
    Only 2 left in stock!
  </div>
  <div class="alert-red">
    Last purchased 3 minutes ago in your area
  </div>
  <div class="countdown">
    Deal ends in: <span class="timer">04:59:32</span>
  </div>
  <button class="cta-danger pulse">
    BUY NOW BEFORE IT'S GONE
  </button>
</div>

<style>
.alert-red {
  background: #fee;
  border: 2px solid #f00;
  color: #c00;
  padding: 8px 12px;
  font-weight: 700;
  margin-bottom: 4px;
  animation: shake 0.5s infinite;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-3px); }
  75% { transform: translateX(3px); }
}

.cta-danger {
  background: #dc2626;
  color: white;
  font-size: 20px;
  font-weight: 800;
  padding: 16px 32px;
  width: 100%;
  animation: pulse 1s infinite;
}
</style>`,
        explanation:
          'Stacking viewer counts, scarcity, recent purchase activity, countdown timers, and aggressive CTAs creates an anxiety-driven pressure cooker. Each tactic alone might be acceptable with real data, but layering them constitutes manipulation that overrides rational decision-making.',
        principle:
          'Multiple stacked pressure tactics compound into dark patterns that harm users',
      },
    ],

    realWorld: [
      {
        company: 'TikTok',
        product: 'Trending Sounds',
        url: 'https://www.tiktok.com',
        description:
          'Trending sounds section shows audio clips gaining rapid adoption. Creators see which sounds are blowing up and adopt them, creating exponential growth curves where popular sounds become even more popular.',
        effectiveness: 'very-effective',
        analysis:
          'TikTok\'s trending sounds are the purest modern example of the bandwagon effect in action. When a sound trends, thousands of creators adopt it within hours, creating a cascade effect. The algorithmic amplification of trending content creates self-reinforcing loops that can make a sound go from 100 uses to 10 million in days. This mechanism is responsible for launching music careers and driving the majority of platform engagement.',
      },
      {
        company: 'Twitter/X',
        product: 'Trending Topics',
        url: 'https://twitter.com/explore',
        description:
          'Real-time trending hashtags and topics based on tweet velocity and engagement. Trending topics receive exponentially more engagement as users pile on to participate in the conversation.',
        effectiveness: 'very-effective',
        analysis:
          'Trending topics create massive information cascades: a topic that trends receives 100-1000x more engagement than it would organically. This drives news cycles, viral moments, and collective attention. The bandwagon effect is so powerful that "getting something to trend" has become a deliberate PR and marketing strategy. However, this also amplifies misinformation and outrage at scale.',
      },
      {
        company: 'Spotify',
        product: 'Viral Charts',
        url: 'https://charts.spotify.com/charts/viral',
        description:
          'Viral charts surface songs gaining rapid listener momentum separate from traditional popularity charts. Shows share-driven growth rather than absolute play counts.',
        effectiveness: 'very-effective',
        analysis:
          'Spotify\'s viral charts leverage the bandwagon effect by separating "gaining momentum" from "already popular." A song appearing on the viral chart signals to listeners that something new is catching on, triggering FOMO and social discovery. This chart has launched numerous breakthrough artists by making early adoption visible and creating a self-reinforcing loop of discovery and sharing.',
      },
      {
        company: 'ProductHunt',
        product: 'Daily Upvote Rankings',
        url: 'https://www.producthunt.com',
        description:
          'Community upvote system where products compete for daily rankings. Top-ranked products receive dramatically more visibility, creating strong upvote momentum.',
        effectiveness: 'very-effective',
        analysis:
          'ProductHunt demonstrates bandwagon dynamics in their purest competitive form. Products that gain early upvote momentum attract more visitors, who upvote, attracting more visitors. The top 5 products on any given day receive 10x more traffic than products ranked 20-30. This creates a winner-take-all dynamic where early momentum is decisive.',
      },
      {
        company: 'Apple',
        product: 'App Store Top Charts',
        url: 'https://apps.apple.com',
        description:
          'Ranking apps by downloads, ratings, and revenue creates authoritative popularity lists. Being in top charts drives exponentially more organic installs.',
        effectiveness: 'very-effective',
        analysis:
          'Apps in the top 10 receive 5-10x more organic installs than apps ranked 50-100. This creates a feedback loop: popular apps get more downloads because they are popular, maintaining their ranking. The bandwagon effect is so strong that "charting" has become a primary App Store optimization goal.',
      },
      {
        company: 'LinkedIn',
        product: 'User Count in Signup',
        url: 'https://www.linkedin.com',
        description:
          'Prominent messaging in signup flows: "Join 1B+ professionals." Network size is both the product and the social proof.',
        effectiveness: 'very-effective',
        analysis:
          'LinkedIn exploits the bandwagon effect combined with genuine network effects: "everyone is already here" reduces friction to join. User growth accelerated as the count crossed major psychological thresholds (100M, 500M, 1B). For a professional network, large user count signals both viability and necessity.',
      },
    ],

    abTests: [
      {
        title: 'Bestseller Badge Impact on E-commerce Conversion',
        hypothesis:
          'Adding a "Bestseller" badge to products will increase conversions through bandwagon appeal',
        controlVersion: {
          description:
            'Product listing without popularity badges or social indicators',
          metrics: {
            conversionRate: '2.3%',
            clickThroughRate: '8.1%',
          },
        },
        treatmentVersion: {
          description:
            'Product listing with "#1 Bestseller in Category" badge and review count',
          metrics: {
            conversionRate: '3.1%',
            clickThroughRate: '11.4%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'The bestseller badge provided immediate social validation, increasing both click-through (+41%) and conversion (+35%). The bandwagon signal -- "this is what others chose" -- reduced evaluation effort and increased purchase confidence.',
          learnings: [
            'Even minimal popularity indicators have measurable impact on conversion',
            'Bestseller badges work across product categories but are strongest for mid-priced items',
            'Effect is strongest when users are unfamiliar with the product and seek validation',
            'Category-specific badges ("in Electronics") are more credible than generic "Popular" labels',
          ],
        },
      },
      {
        title: 'User Count in Signup CTA: Specific vs Vague',
        hypothesis:
          'Including a specific user count in the signup button will increase registrations versus a vague claim',
        controlVersion: {
          description:
            '"Start Your Free Trial" button with feature list below',
          metrics: {
            conversionRate: '12.0%',
          },
        },
        treatmentVersion: {
          description:
            '"Join 2,847,392 Users - Start Free Trial" with real-time authenticated count',
          metrics: {
            conversionRate: '16.8%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'The specific, odd-numbered count (2,847,392 vs "millions") felt more authentic and created stronger bandwagon appeal. Users reported the specificity made them believe the number was real, while rounded claims felt like marketing.',
          learnings: [
            'Specific numbers ("2,847,392") outperform rounded claims ("3 million users") in credibility',
            'Real-time updating of the counter further increased perceived authenticity',
            'Effect is strongest when crossing major psychological thresholds (1M, 10M, 100M)',
            'For B2B products, showing company logos alongside counts was even more effective',
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
        name: 'Popularity Metrics Display',
        description:
          'User counts, follower numbers, downloads, or rating counts prominently shown in interface',
        howToSpot:
          'Look for large numbers with labels like "users", "downloads", "members", or "followers"',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Trend and Popularity Labels',
        description:
          'Badges indicating social momentum: "Trending", "Most Popular", "#1", "Bestseller", "Viral"',
        howToSpot:
          'Check for badges, ribbons, or labels that call attention to popularity or ranking position',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'User Count in CTAs',
        description:
          'Call-to-action buttons or signup forms incorporating user counts or popularity messaging',
        howToSpot:
          'Look for "Join X users", "Trusted by X companies", or user counts embedded in buttons',
        severity: ImpactLevel.CRITICAL,
      },
      {
        name: 'Real-Time Activity Indicators',
        description:
          'Live counters showing current viewers, recent purchases, or active users with pulse animations',
        howToSpot:
          'Check for "X people viewing", "Recently purchased by", live user counters, or green pulse dots',
        severity: ImpactLevel.HIGH,
      },
      {
        name: '"Everyone Is Using" Messaging',
        description:
          'Copy patterns that create conformity pressure: "The world is switching", "Don\'t be left behind"',
        howToSpot:
          'Look for language implying universal adoption, FOMO-driven urgency, or "you\'re the last one" framing',
        severity: ImpactLevel.CRITICAL,
      },
    ],

    patterns: [
      {
        name: 'Popularity-Based Default Sorting',
        description:
          'Default sort order emphasizing popular, bestselling, or trending items over newest or most relevant',
        indicators: [
          'Sort dropdown with "Most Popular" pre-selected as default',
          'Trending/Popular tabs given visual prominence over other tabs',
          'Bestseller sections positioned above other content categories',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Social Activity Feed Pattern',
        description:
          'Streams of user actions creating ambient social presence and conformity pressure',
        indicators: [
          'Real-time purchase or signup notifications (toast-style)',
          'Activity timeline or feed showing recent user actions',
          '"X people are looking at this" live viewer counts',
          'Recent review or rating activity streams',
        ],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Viral Loop Mechanics',
        description:
          'Features designed to create self-reinforcing adoption cycles through sharing and referrals',
        indicators: [
          'Share buttons with visible engagement counts',
          'Referral programs with tiered rewards',
          '"Invite friends" prompts during onboarding',
          'Content designed for easy resharing (embed codes, quote cards)',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'medium',
      },
      {
        name: 'Adoption Curve Display',
        description:
          'Visual representations of growth momentum to signal that adoption is accelerating',
        indicators: [
          'Growth charts or adoption curves in marketing materials',
          '"Fastest growing" or "X% growth this quarter" messaging',
          'Milestone announcements ("We just hit 1 million users!")',
          'Countdown to next milestone with live counter',
        ],
        severity: ImpactLevel.MEDIUM,
        confidence: 'high',
      },
    ],

    checklistQuestions: [
      'Are all popularity metrics (user counts, downloads, reviews) completely honest and verifiable?',
      'Do we provide temporal context for popularity numbers (timeframe, active vs total)?',
      'Is "trending" based on genuine algorithmic detection of engagement velocity, not editorial picks?',
      'Are activity notifications showing real, server-verified events (not scripted loops)?',
      'Are we avoiding stacking multiple pressure tactics (scarcity + urgency + social proof)?',
      'Is social proof one input among many, not the sole factor driving user decisions?',
      'Can users opt out of or hide social proof elements if they find them distracting?',
      'Are we disclosing how popularity/trending is calculated?',
      'Do our bandwagon mechanics serve user goals or primarily business goals?',
      'Are we protecting minority voices and diverse perspectives despite popularity-driven ranking?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in social psychology and UX analysis, specializing in how bandwagon effects influence user behavior in digital interfaces.

When analyzing designs for bandwagon effects, evaluate:

1. **Popularity Indicators**: User counts, follower numbers, download statistics, "Most Popular" badges, trending labels, viral indicators
2. **Social Activity Signals**: Real-time activity feeds, purchase notifications, viewer counts, engagement counters
3. **Viral Mechanics**: Share buttons with counts, referral loops, adoption curve displays, "invite friends" flows
4. **Conformity Pressure**: "Everyone is using" messaging, FOMO language, "don't miss out" framing

For each bandwagon element found, assess:
- **Authenticity**: Are the numbers genuine and verifiable, or inflated/fabricated?
- **Context**: Is temporal and categorical context provided (active vs total, timeframe, segment)?
- **Pressure Level**: Is it informative social proof or manipulative conformity pressure?
- **Stacking**: Are multiple pressure tactics layered together?
- **Appropriateness**: Is bandwagon appeal suitable for this decision type and stakes level?

Ethical red flags to watch for:
- Fake or bot-driven activity notifications
- Inflated user counts with hidden disclaimers
- Manufactured trending that doesn't reflect genuine engagement
- Stacked pressure (scarcity + urgency + social proof + countdown)
- Bandwagon pressure on high-stakes decisions (medical, financial)

Provide specific, actionable feedback on both strengths and potential issues.`,

    outputSchema: {
      type: 'object',
      properties: {
        bandwagonElements: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              element: { type: 'string' },
              type: { type: 'string' },
              authenticity: { type: 'string' },
              impact: { type: 'string' },
              appropriateness: { type: 'string' },
              recommendation: { type: 'string' },
            },
            required: ['element', 'type', 'authenticity', 'impact'],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            presenceLevel: { type: 'string' },
            ethicalAlignment: { type: 'string' },
            effectiveness: { type: 'string' },
            risks: { type: 'array', items: { type: 'string' } },
          },
          required: ['presenceLevel', 'ethicalAlignment', 'effectiveness'],
        },
        recommendations: {
          type: 'array',
          items: { type: 'string' },
        },
      },
      required: ['bandwagonElements', 'overallAssessment', 'recommendations'],
    },
  },

  //===========================================
  // GUIDELINES
  //===========================================
  guidelines: {
    implementation: [
      {
        step: 1,
        title: 'Establish Authentic Data Sources',
        description:
          'Connect popularity indicators directly to verified backend data -- never hardcode or estimate',
        example:
          'Pull active user count from authenticated sessions table, not from total signups. Show "14,392 online now" from real WebSocket connections.',
        tips: [
          'Use real-time database queries for all displayed counts',
          'Separate active users from total historical signups',
          'Log and audit all displayed metrics for accuracy',
        ],
      },
      {
        step: 2,
        title: 'Add Temporal and Categorical Context',
        description:
          'Always scope popularity metrics with timeframes and categories so users understand what numbers represent',
        example:
          '"15,847 active users this month" or "#1 Bestseller in Developer Tools (last 30 days)" instead of bare numbers',
        tips: [
          'Include time period for all counts (daily, weekly, monthly)',
          'Specify active vs total vs cumulative clearly',
          'Indicate category or segment when using rankings',
        ],
      },
      {
        step: 3,
        title: 'Use Specific Numbers for Credibility',
        description:
          'Exact, odd-looking numbers feel authentic; rounded numbers feel like marketing estimates',
        example:
          '"2,847,392 developers" feels measured and real; "3 million developers" feels like a marketing claim',
        tips: [
          'Display actual counts, not rounded approximations',
          'Use tabular-nums font variant for number stability during updates',
          'Update in real-time if possible to reinforce authenticity',
        ],
      },
      {
        step: 4,
        title: 'Layer Popularity with Quality Signals',
        description:
          'Combine bandwagon metrics with quality indicators so popular does not automatically mean recommended',
        example:
          '"4.7 stars (23,841 reviews) - Bestseller" combines social proof (count) with quality signal (rating)',
        tips: [
          'Show ratings alongside review counts',
          'Include expert endorsements with user counts',
          'Offer quality-based sorting alongside popularity sorting',
        ],
      },
      {
        step: 5,
        title: 'Disclose Trending Methodology',
        description:
          'Be transparent about how trending/popular is calculated so users can assess validity',
        example:
          'Link to "How trending works" page explaining that trending is based on engagement velocity over the last 4 hours',
        tips: [
          'Explain the algorithm in plain language',
          'Distinguish editorial picks from algorithmic trending',
          'Allow users to report suspected manipulation',
        ],
      },
      {
        step: 6,
        title: 'Preserve User Autonomy',
        description:
          'Offer multiple sorting, filtering, and discovery options beyond just popularity',
        example:
          'Provide sorting by newest, highest-rated, most relevant, price, and "most popular" as equals, not with popularity forced as default',
        tips: [
          'Make popularity one sort option among several',
          'Allow users to dismiss or hide social proof elements',
          'Provide objective information alongside social signals',
          'Never make popularity the sole decision input',
        ],
      },
    ],

    dos: [
      'Show specific, accurate numbers from verified data sources ("15,847 active users this month")',
      'Provide temporal and categorical context for all popularity metrics',
      'Use genuine algorithmic trending based on real engagement velocity',
      'Combine popularity with quality signals (ratings, expert reviews)',
      'Make metrics verifiable (link to public directories, reviews, methodology)',
      'Respect prefers-reduced-motion for animated counters and activity feeds',
      'Disclose how trending and popularity are calculated',
      'Allow users to sort and filter by criteria other than popularity',
      'Use bandwagon mechanics for low-stakes, preference-based decisions',
      'Create genuine viral value (referrals that benefit recipients, not just senders)',
      'Show growth trends and adoption curves to demonstrate authentic momentum',
      'Protect minority viewpoints even in popularity-driven ranking systems',
    ],

    donts: [
      'Don\'t fabricate, inflate, or manipulate popularity metrics',
      'Don\'t show user counts without temporal context (active vs total, timeframe)',
      'Don\'t use bots, scripts, or purchased engagement to simulate activity',
      'Don\'t stack multiple pressure tactics (scarcity + urgency + social proof + countdown)',
      'Don\'t apply bandwagon pressure to high-stakes decisions (medical, financial, legal)',
      'Don\'t manually label content as "trending" when it is not organically gaining momentum',
      'Don\'t create fake activity notifications with scripted names on rotation',
      'Don\'t hide decontextualizing information in tiny fine print',
      'Don\'t force popularity-based sorting as the only option',
      'Don\'t amplify harmful or misleading content solely because it is popular',
      'Don\'t use "everyone is using" language without substantiation',
      'Don\'t suppress diverse perspectives in favor of majority-driven uniformity',
    ],

    bestPractices: [
      {
        title: 'Authentic Metrics Only',
        description:
          'Every number displayed must come from verified, auditable data sources',
        rationale:
          'Fabricated or inflated metrics are fraudulent and destroy trust permanently when exposed',
        example:
          'Pull "14,392 online now" from real authenticated WebSocket connections, not from an estimated multiplier',
      },
      {
        title: 'Specific Numbers Over Round Claims',
        description:
          'Display exact counts rather than rounded marketing approximations',
        rationale:
          'Specificity implies real measurement and builds trust; round numbers feel like estimates',
        example:
          '"2,847,392 developers" is more credible than "nearly 3 million developers"',
      },
      {
        title: 'Transparent Trending Algorithms',
        description:
          'Disclose how trending is calculated and distinguish editorial from algorithmic',
        rationale:
          'Transparency builds trust and prevents accusations of manufactured virality',
        example:
          '"Trending is based on engagement velocity over the last 4 hours" with a link to methodology',
      },
      {
        title: 'Temporal Context for All Counts',
        description:
          'Always scope popularity metrics with timeframes and active/total distinction',
        rationale:
          'Context prevents misinterpretation and distinguishes genuine popularity from historical accumulation',
        example:
          '"850,000 active users this month" is honest even if total signups exceed 5 million',
      },
      {
        title: 'Quality + Popularity, Not Just Popularity',
        description:
          'Layer social proof with quality indicators to prevent popular-but-bad outcomes',
        rationale:
          'Popular does not always mean good; users need both signals to make informed choices',
        example:
          'Show "Most Popular + 4.8 stars" not just "Most Popular"',
      },
      {
        title: 'Avoid Pressure Stacking',
        description:
          'Use a single social proof signal per context; never layer multiple urgency tactics',
        rationale:
          'Stacking scarcity + social proof + countdown + urgency crosses from informing into manipulation',
        example:
          'Show "Most Popular" OR "23 people viewing" -- not both alongside a countdown timer',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'A',
        criterion: '1.1.1',
        guideline:
          'Non-text Content - Provide text alternatives for visual popularity indicators',
        implementation:
          'Add descriptive alt text to badges, trending icons, and pulse indicators. Example: aria-label="Bestseller in Electronics category" not just a decorative badge icon.',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.4.1',
        guideline:
          'Use of Color - Don\'t rely solely on color for popularity indicators',
        implementation:
          'Combine color with text labels, icons, or patterns. Don\'t use only red/green to indicate trending up/down.',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.4.3',
        guideline:
          'Contrast - Ensure sufficient contrast for popularity badges and labels',
        implementation:
          'All popularity text, badges, and trending indicators must meet 4.5:1 contrast ratio.',
      },
      {
        wcagLevel: 'A',
        criterion: '2.1.1',
        guideline:
          'Keyboard - Make interactive social proof elements keyboard-accessible',
        implementation:
          'Ensure clickable popularity elements (share buttons, expandable reviews, sorting controls) are fully operable with keyboard.',
      },
      {
        wcagLevel: 'AA',
        criterion: '4.1.3',
        guideline:
          'Status Messages - Use appropriate ARIA live regions for activity updates',
        implementation:
          'Use aria-live="polite" for real-time counters and activity feeds. Never use "assertive" for social proof updates -- they should inform, not interrupt.',
      },
    ],

    ethics: [
      {
        concern: 'Fabricated or Inflated Metrics',
        severity: 'critical',
        explanation:
          'Fake user counts, purchased reviews, bot activity, or inflated numbers constitute fraud and violate user trust',
        mitigation:
          'Display only authenticated, auditable metrics from real systems. Subject all displayed counts to regular accuracy audits.',
      },
      {
        concern: 'Manufactured Trending',
        severity: 'critical',
        explanation:
          'Manually labeling content as "trending" or using bots to inflate engagement undermines platform integrity',
        mitigation:
          'Use transparent, algorithmic trending based on genuine engagement velocity. Disclose methodology publicly.',
      },
      {
        concern: 'Misleading Context',
        severity: 'high',
        explanation:
          'Decontextualized numbers (total historical signups presented as active users) mislead users about actual popularity',
        mitigation:
          'Always provide timeframe and scope: "850,000 active users this month" not just "10 million users."',
      },
      {
        concern: 'Stacked Pressure Tactics',
        severity: 'high',
        explanation:
          'Layering scarcity + urgency + social proof + countdown creates manipulative psychological pressure',
        mitigation:
          'Use social proof as a single, honest signal. Never combine with artificial scarcity or countdown timers.',
      },
      {
        concern: 'High-Stakes Social Pressure',
        severity: 'critical',
        explanation:
          'Using bandwagon pressure for medical, financial, or legal decisions undermines informed consent and autonomous judgment',
        mitigation:
          'Avoid popularity-based persuasion for high-stakes decisions. Provide objective information and expert guidance instead.',
      },
      {
        concern: 'Suppression of Diverse Perspectives',
        severity: 'medium',
        explanation:
          'Pure popularity ranking can silence minority voices, suppress innovation, and create echo chambers',
        mitigation:
          'Actively surface diverse viewpoints alongside popular content. Blend popularity with diversity signals in ranking algorithms.',
      },
      {
        concern: 'FOMO and Anxiety Creation',
        severity: 'high',
        explanation:
          'Excessive social pressure through "everyone is doing it" messaging can create anxiety and harm mental health',
        mitigation:
          'Use social proof to inform, not create panic. Allow users to dismiss or opt out of social proof elements.',
      },
      {
        concern: 'Amplification of Harmful Content',
        severity: 'critical',
        explanation:
          'Trending algorithms can amplify misinformation, hate speech, or harmful content through pure popularity cascades',
        mitigation:
          'Combine popularity signals with quality moderation, fact-checking, and content safety filters.',
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
          'Studies in the Principles of Judgments and Attitudes: II. Determination of Judgments by Group and by Ego Standards',
        author: 'M. Sherif',
        year: 1936,
        doi: '10.1080/00224545.1936.9919891',
        description:
          'Foundational work demonstrating how group norms influence individual judgments, establishing the basis for understanding conformity and the bandwagon effect.',
        type: 'foundational',
      },
      {
        title: 'Opinions and Social Pressure',
        author: 'S. E. Asch',
        year: 1955,
        doi: '10.1038/scientificamerican1155-31',
        description:
          'Classic conformity experiments showing that people conform to obviously incorrect group judgments ~37% of the time, demonstrating the power of social pressure.',
        type: 'foundational',
      },
      {
        title: 'The Bandwagon Effect',
        author: 'H. Leibenstein',
        year: 1950,
        doi: '10.2307/1882692',
        description:
          'Economic analysis of how demand for a commodity increases because others are consuming it, introducing the term "bandwagon effect" in economics.',
        type: 'foundational',
      },
      {
        title:
          'Social Proof in the Supermarket: The Effect of Others\' Choices on the Choices of Unfamiliar Products',
        author: 'J. J. Argo, K. D. Dahl, A. C. Morales',
        year: 2008,
        doi: '10.1509/jmkg.72.2.1',
        description:
          'Demonstrates that people select unfamiliar products based on evidence of others\' choices, validating social proof in consumer contexts.',
        type: 'foundational',
      },
      {
        title: 'The Spread of Behavior in an Online Social Network Experiment',
        author: 'D. Centola',
        year: 2010,
        doi: '10.1126/science.1185231',
        description:
          'Shows how behaviors spread through social networks via social influence, documenting modern bandwagon effects in digital contexts.',
        type: 'advanced',
      },
      {
        title:
          'Popularity of Brand Posts on Brand Fan Pages: An Investigation of the Effects of Social Media Marketing',
        author: 'C. V. D. Vries, S. Gensler, P. S. H. Leeflang',
        year: 2012,
        doi: '10.1016/j.intmar.2012.01.003',
        description:
          'Analyzes how the popularity of social media content (likes, shares) creates positive feedback loops that drive further engagement.',
        type: 'practical',
      },
    ],

    books: [
      {
        title: 'Influence: The Psychology of Persuasion',
        author: 'Robert B. Cialdini',
        year: 2006,
        isbn: '978-0061241895',
        description:
          'Definitive work on persuasion principles including "Social Proof" -- the tendency to follow what others are doing, especially under uncertainty.',
        type: 'foundational',
      },
      {
        title: 'The Wisdom of Crowds',
        author: 'James Surowiecki',
        year: 2005,
        isbn: '978-0385721707',
        description:
          'Explores when and why groups make good decisions (aggregated wisdom) vs poor ones (groupthink, bandwagon failures), providing nuanced view of social influence.',
        type: 'foundational',
      },
      {
        title: 'Contagious: Why Things Catch On',
        author: 'Jonah Berger',
        year: 2013,
        isbn: '978-1451686579',
        description:
          'Analyzes the science of viral transmission, including the role of social proof and bandwagon dynamics in making ideas, products, and behaviors spread.',
        type: 'foundational',
      },
      {
        title: 'Hooked: How to Build Habit-Forming Products',
        author: 'Nir Eyal',
        year: 2014,
        isbn: '978-1591847786',
        description:
          'Discusses how social triggers and network effects (bandwagon mechanics) can be used to create habit-forming products, with ethical considerations.',
        type: 'practical',
      },
    ],

    articles: [
      {
        title: 'The Science of Social Proof',
        author: 'Cialdini, R. B.',
        year: 2016,
        url: 'https://hbr.org/2016/12/the-science-of-social-proof',
        description:
          'Practical overview of how social proof influences decisions and how businesses can leverage it ethically.',
        type: 'practical',
      },
      {
        title:
          'Dark Patterns: Fighting Back Against Manipulative Website Design',
        author: 'Brignull, H.',
        year: 2013,
        url: 'https://alistapart.com/article/dark-patterns-fighting-back/',
        description:
          'Critical examination of how bandwagon effects and social proof are used manipulatively in dark patterns.',
        type: 'practical',
      },
      {
        title: 'The Network Effects Manual: 13 Different Network Effects',
        author: 'Chen, J.',
        year: 2018,
        url: 'https://www.nfx.com/post/network-effects-manual',
        description:
          'Detailed analysis of network effects including bandwagon effects and viral growth loops in digital products.',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'The Asch Conformity Experiments',
        author: 'Scientific American',
        year: 2012,
        url: 'https://www.youtube.com/watch?v=TYIh4MkcfJA',
        description:
          'Video demonstration of Asch\'s famous experiments showing how people conform to group pressure even when the group is obviously wrong.',
        type: 'practical',
      },
      {
        title: 'Robert Cialdini Explains the Psychology of Social Proof',
        author: 'Cialdini, R.',
        year: 2017,
        url: 'https://www.youtube.com/watch?v=IdK2WsAp9YE',
        description:
          'Leading expert explains how and why social proof works, with practical examples and ethical considerations.',
        type: 'practical',
      },
    ],

    demos: [
      {
        title: 'Booking.com Social Proof Examples',
        author: 'Booking.com',
        url: 'https://www.booking.com',
        description:
          'Real-world example of extensive (sometimes excessive) use of social proof: user reviews, booking activity, scarcity indicators, popularity badges.',
        type: 'practical',
      },
      {
        title: 'ProductHunt Daily Rankings',
        author: 'ProductHunt',
        url: 'https://www.producthunt.com',
        description:
          'Community-driven upvoting system demonstrating bandwagon dynamics: popular products receive more votes, becoming even more popular.',
        type: 'practical',
      },
      {
        title: 'Amazon Bestseller Lists',
        author: 'Amazon',
        url: 'https://www.amazon.com/bestsellers',
        description:
          'Category-based bestseller rankings showing how social proof helps users discover popular products.',
        type: 'practical',
      },
      {
        title: 'App Store Top Charts',
        author: 'Apple',
        url: 'https://apps.apple.com/charts',
        description:
          'Popularity-based rankings that create strong bandwagon effects, with top apps receiving exponentially more downloads.',
        type: 'practical',
      },
    ],
  },

  //===========================================
  // RELATIONSHIPS
  //===========================================
  relationships: {
    complements: [
      'social-proof', // Direct mechanism for bandwagon appeal
      'scarcity-bias', // Limited availability + popularity = powerful combination
      'authority-bias', // Expert endorsement + crowd wisdom reinforce each other
      'consensus-bias', // Group agreement amplifies bandwagon dynamics
      'halo-effect', // Popular products perceived as better in all dimensions
      'fomo', // Fear of missing out drives bandwagon adoption
    ],

    conflicts: [
      'uniqueness-bias', // Desire to be different opposes conformity
      'reactance', // Feeling pressured to conform triggers resistance
      'contrarian-bias', // Some people deliberately oppose popular choices
    ],

    confusedWith: [
      'social-proof', // Overlapping but social proof is the mechanism, bandwagon is the effect
      'wisdom-of-crowds', // Crowd accuracy vs crowd conformity are distinct phenomena
      'network-effects', // Technical value growth vs psychological conformity pressure
    ],

    hierarchy: {
      parent: 'social-influence',
      children: [
        'viral-growth-patterns',
        'trending-amplification',
      ],
    },
  },
};
