/**
 * CONFIRMATION BIAS
 */


import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const confirmationBias: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'confirmation-bias',
    name: 'Confirmation Bias',
    aliases: ['Confirmatory Bias', 'Myside Bias'],
    category: BiasCategory.COGNITIVE,
    relatedCategories: [
      BiasCategory.DECISION_MAKING,
      BiasCategory.PERCEPTION,
      BiasCategory.MEMORY,
    ],
    tags: [
      'confirmation',
      'belief-persistence',
      'selective-attention',
      'information-filtering',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple: 'People tend to seek out, interpret, and remember information that confirms their existing beliefs while ignoring or dismissing contradictory evidence.',

    detailed: `Confirmation Bias is the tendency to search for, interpret, favor, and recall information in a way that confirms or strengthens one's prior personal beliefs or hypotheses. It's one of the most researched and documented cognitive biases, affecting virtually every aspect of human reasoning and decision-making.

The bias operates through several distinct mechanisms:

1. **Biased Search**: We selectively seek information that supports our beliefs while avoiding information that contradicts them. When researching a topic, we're more likely to click on articles with headlines that align with our existing views.

2. **Biased Interpretation**: When presented with mixed evidence, we interpret ambiguous information as supporting our existing position. The same data can be seen as confirming completely opposite beliefs depending on what we already think.

3. **Biased Memory**: We remember hits (when we were right) better than misses (when we were wrong), and we recall information that supports our beliefs more readily than contradictory information.

4. **Selective Attention**: We pay more attention to information that confirms our beliefs and less to information that challenges them, even when both are present.

In digital products and UX, Confirmation Bias manifests in multiple ways:

**For Users**:
- Search queries biased toward finding supporting evidence
- Selective clicking on articles/results that match existing beliefs
- Interpreting interface ambiguity in ways that match expectations
- Remembering positive experiences with favored products, negative ones with disliked products
- Falling into filter bubbles and echo chambers in social media

**For Designers & Researchers**:
- Seeing what we expect to see in user tests
- Interpreting user feedback to support our design decisions
- Searching for research that validates our approach
- Dismissing usability problems that contradict our assumptions
- Cherry-picking data that supports launching vs not launching

**For Product Teams**:
- Building features we personally want rather than what users need
- Interpreting metrics to support decisions already made
- Selectively attending to feedback from users who agree with us

The danger of Confirmation Bias is that it creates self-reinforcing cycles: the more we believe something, the more evidence we find for it (through biased search), the more convinced we become (through biased interpretation), and the more we remember supporting evidence (through biased recall). This can lead to increasingly polarized, irrational beliefs disconnected from reality.

In design, Confirmation Bias is particularly dangerous because it can cause us to:
- Build echo chambers that radicalize users
- Ignore usability problems in our own work
- Misinterpret user research to fit our assumptions
- Create filter bubbles that limit exposure to diverse perspectives
- Design interfaces that confirm rather than challenge harmful beliefs`,

    psychologyBasis: {
      discoveredBy: 'Peter Wason',
      year: 1960,
      theory: 'Confirmation Bias',
      mechanism: `The brain preferentially processes information that aligns with existing beliefs and schemas. This happens because:

1. **Belief-Congruent Processing**: Information consistent with prior beliefs is processed more fluently, feels more "true," and requires less cognitive effort to integrate into existing mental models.
2. **Disconfirmation Aversion**: Contradictory evidence triggers cognitive dissonance — an uncomfortable psychological tension — which the brain resolves by dismissing, minimizing, or reinterpreting the conflicting information.
3. **Hypothesis-Driven Search**: When testing a belief, people generate queries that would confirm rather than falsify the hypothesis. Wason's 2-4-6 task demonstrated that people test rules by looking for confirming examples rather than trying to disprove them.
4. **Selective Encoding and Retrieval**: Memory systems encode belief-consistent information more deeply and retrieve it more easily, creating a biased evidence base over time.
5. **Motivated Reasoning**: When beliefs are tied to identity, group membership, or emotional investment, the motivation to maintain those beliefs activates stronger confirmation bias as a self-protective mechanism.

The mechanism operates automatically and below conscious awareness — people genuinely believe they are being objective even when their information processing is deeply skewed.`,
    },

    realWorldExample: `Consider a designer who believes that "users don't read, they scan." They're likely to:

1. **Biased Search**: Seek out and share articles like "How Users Read on the Web" by Jakob Nielsen, which supports this view, while ignoring research on when and why users do read carefully.

2. **Biased Interpretation**: In usability tests, when a user skims over text, they think "See! Users don't read." When a user reads carefully, they think "Well, this user is an outlier" or don't notice it at all.

3. **Biased Design Decisions**: Create interfaces with minimal text, lots of visuals, and scannable layouts—which then makes it hard for users to find detailed information when they need it.

4. **Biased Memory**: Six months later, they remember all the times users skimmed and forget the times users carefully read error messages, legal terms, or product specifications.

This creates a self-fulfilling prophecy: by designing for scanning, they make reading difficult, which causes more scanning, which confirms their belief.

The same bias affects users: if you believe iPhones are better than Android phones, you'll:
- Search for "why iPhone is better" not "objective iPhone vs Android comparison"
- Interpret any iPhone advantage as definitive, any disadvantage as minor
- Remember when your iPhone worked great, forget when it crashed
- Attend to news about Android problems, ignore news about iPhone problems

Confirmation bias is why political polarization increases with more information access: people use the abundance of information to find better evidence for what they already believe, not to discover truth.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `Confirmation Bias profoundly affects how users consume, filter, and act on information within interfaces. It shapes which content users engage with, how they interpret data, and what they remember. Designers must understand it both as a force that shapes user behavior and as a trap that distorts their own design decisions:

- Personalization and recommendation algorithms can amplify confirmation bias by creating echo chambers
- Search and filter UIs determine whether users encounter diverse or confirming-only perspectives
- Dashboard and analytics designs affect whether teams see the full picture or cherry-pick metrics
- User research tools and processes can be designed to counteract researcher confirmation bias
- Content presentation order and framing affect which evidence users treat as credible`,

    whenToUse: [
      {
        title: 'Personalized Onboarding',
        scenario:
          'When new users have existing preferences or goals that can inform their initial experience',
        example:
          'After a user selects "I want to save money" as a goal, show them budgeting features first — confirming their self-image as financially responsible motivates continued engagement',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Progressive Skill Building',
        scenario: 'When users need confidence to tackle increasingly complex tasks',
        example:
          'Show users evidence of their own progress ("You completed 12 tasks this week — 40% more than last week") to confirm their belief that they are improving, reinforcing continued learning',
        impact: ImpactLevel.MEDIUM,
      },
      {
        title: 'Search Refinement Guidance',
        scenario: 'When helping users narrow broad search queries to find relevant results',
        example:
          'Suggest related search filters that match the user\'s apparent intent, confirming they\'re on the right track while helping them refine results efficiently',
        impact: ImpactLevel.MEDIUM,
      },
      {
        title: 'Preference-Based Content Curation',
        scenario: 'When users have explicitly stated preferences and want relevant content',
        example:
          'A recipe app showing vegetarian meals to a user who marked "vegetarian" — the confirmation of their dietary identity creates a sense of belonging',
        impact: ImpactLevel.MEDIUM,
      },
      {
        title: 'Decision Reinforcement Post-Purchase',
        scenario: 'When users have already made a purchase and might experience buyer\'s remorse',
        example:
          'Show positive reviews and usage tips after purchase to confirm the user\'s decision was a good one, reducing returns and increasing satisfaction',
        impact: ImpactLevel.HIGH,
      },
    ],

    whenToAvoid: [
      {
        title: 'News and Information Platforms',
        reason:
          'Showing only belief-confirming news creates filter bubbles and contributes to polarization',
        consequence:
          'Users become trapped in echo chambers, lose perspective on complex issues, and may radicalize',
        alternative:
          'Actively surface diverse viewpoints, label opinion vs fact, and provide "perspective broadening" features like "See other viewpoints"',
      },
      {
        title: 'Data Analytics and Dashboards',
        reason:
          'Allowing teams to see only confirming metrics leads to bad business decisions',
        consequence:
          'Teams launch failing features, ignore churn signals, or double down on ineffective strategies because the dashboard only shows what they want to see',
        alternative:
          'Design dashboards with mandatory counter-metrics, pre-registered hypotheses, and devil\'s advocate views that surface disconfirming evidence',
      },
      {
        title: 'Medical or Health Decisions',
        reason:
          'Users searching for health information will selectively consume results that confirm their self-diagnosis',
        consequence:
          'Patients may avoid necessary treatment or pursue harmful alternatives because they found confirming evidence online',
        alternative:
          'Present evidence-based information prominently, show confidence levels, and encourage professional consultation',
      },
      {
        title: 'User Research and Testing Tools',
        reason:
          'Researchers interpreting test results are susceptible to seeing what they expect to see',
        consequence:
          'Usability problems go undetected, wrong features get built, and products fail to meet actual user needs',
        alternative:
          'Build structured analysis frameworks, require pre-registered hypotheses, blind analysis protocols, and mandatory disconfirming evidence review',
      },
    ],

    commonMistakes: [
      {
        title: 'Building Algorithmic Echo Chambers',
        description:
          'Recommendation engines that only show content matching user\'s existing preferences without any diversity',
        why: 'Maximizing engagement by showing confirming content seems to increase metrics short-term but degrades content quality and user trust long-term',
        fix: 'Include a diversity quotient in recommendation algorithms. Actively surface a percentage of content outside the user\'s filter bubble with clear framing',
      },
      {
        title: 'One-Sided Rating Displays',
        description:
          'Showing overall star ratings without surfacing critical or dissenting reviews',
        why: 'Users with a positive first impression will selectively read positive reviews; users with negative impressions will seek out negative ones — both missing the full picture',
        fix: 'Show "Most helpful positive review" alongside "Most helpful critical review." Display rating distributions, not just averages',
      },
      {
        title: 'Vanity Metrics in Dashboards',
        description:
          'Displaying only improving metrics (signups, pageviews) while burying declining ones (churn, bounce rate)',
        why: 'Teams confirm their belief that "things are going well" by looking at favorable numbers while ignoring warning signs',
        fix: 'Require dashboards to show paired metrics (acquisition + retention, signups + activation). Flag declining metrics with equal visual prominence',
      },
      {
        title: 'Unstructured User Research Synthesis',
        description:
          'Allowing researchers to freely select which user quotes and observations to highlight',
        why: 'Researchers unconsciously select evidence that supports the team\'s hypothesis and overlook contradictory signals',
        fix: 'Use affinity mapping with all observations before synthesis. Require documenting disconfirming evidence. Have multiple researchers code independently',
      },
      {
        title: 'Confirmation-Biased Search Defaults',
        description:
          'Search that heavily personalizes results based on history without offering a way to see unfiltered results',
        why: 'Each search reinforces the user\'s existing perspective, making it progressively harder to find diverse information',
        fix: 'Offer a "neutral search" or "explore" mode. Show when results are personalized vs objective. Surface content outside the user\'s usual patterns',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.HIGH,
        description:
          'Layout determines whether users encounter diverse perspectives or only confirming content',
        examples: [
          'Sidebar recommendations showing "More like this" reinforce current beliefs',
          'Feed layouts that prioritize engagement over diversity create echo chambers',
          'Placing opposing viewpoints side-by-side encourages balanced evaluation',
          'Dashboard layouts that pair positive and negative metrics reduce confirmation bias in decision-making',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Typography signals credibility and weight, influencing which information users treat as authoritative',
        examples: [
          'Bold, large quotes from confirming sources look more authoritative than small-text disclaimers',
          'Typography that differentiates fact from opinion helps users evaluate evidence objectively',
          'Consistent text treatment across confirming and disconfirming evidence ensures equal cognitive weight',
          'Source attribution typography affects perceived credibility of different viewpoints',
        ],
      },
      color: {
        level: ImpactLevel.MEDIUM,
        description:
          'Color-coding can inadvertently signal which information is "right" or "wrong," reinforcing existing beliefs',
        examples: [
          'Green/red color coding on metrics implies good/bad, biasing interpretation before analysis',
          'Using neutral colors for data until the user applies their own analysis reduces premature confirmation',
          'Highlighting confirming search results differently from other results creates selection bias',
          'Color consistency across all viewpoints prevents visual bias toward one perspective',
        ],
      },
      interaction: {
        level: ImpactLevel.CRITICAL,
        description:
          'Interaction patterns determine whether users actively seek or passively receive confirming-only information',
        examples: [
          'Filter and sort controls let users narrow to only confirming results',
          'Infinite scroll feeds algorithmically serve confirming content without user awareness',
          'Like/dislike buttons train algorithms to deepen confirmation bias over time',
          'Bookmark and save features create personal libraries of one-sided evidence',
        ],
      },
      content: {
        level: ImpactLevel.CRITICAL,
        description:
          'Content selection, ordering, and framing are the primary mechanisms through which confirmation bias operates in interfaces',
        examples: [
          'Recommendation algorithms selecting only belief-confirming content creates filter bubbles',
          'Search result ordering based on past behavior reinforces existing viewpoints',
          'Review summaries that only highlight positive aspects confirm purchase intent',
          'A/B test result presentations that lead with the expected outcome bias team decisions',
        ],
      },
      accessibility: {
        level: ImpactLevel.MEDIUM,
        description:
          'Accessibility features must ensure all users can access diverse perspectives, not just confirming content',
        examples: [
          'Screen reader order affects which information is encountered first and given more weight',
          'Alternative text should describe data objectively without confirming a particular interpretation',
          'Keyboard navigation should provide equal access to both confirming and challenging viewpoints',
          'ARIA labels on data visualizations should describe the data, not interpret it',
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
        title: 'Balanced Review Display with Opposing Perspectives',
        description:
          'E-commerce product page that surfaces both positive and critical reviews side-by-side to counteract confirmation bias',
        code: `<section class="reviews-balanced">
  <h3>Customer Reviews</h3>
  <div class="rating-distribution">
    <div class="bar" data-stars="5" style="width: 62%">62%</div>
    <div class="bar" data-stars="4" style="width: 18%">18%</div>
    <div class="bar" data-stars="3" style="width: 10%">10%</div>
    <div class="bar" data-stars="2" style="width: 6%">6%</div>
    <div class="bar" data-stars="1" style="width: 4%">4%</div>
  </div>

  <div class="review-pair">
    <article class="review positive">
      <h4>Most Helpful Positive Review</h4>
      <div class="stars">4.5/5</div>
      <p>"Battery life is exceptional — easily lasts 2 full days
      with moderate use. Camera quality in daylight is outstanding."</p>
      <span class="helpful">847 found this helpful</span>
    </article>
    <article class="review critical">
      <h4>Most Helpful Critical Review</h4>
      <div class="stars">2.5/5</div>
      <p>"Night photography is disappointing compared to competitors.
      The phone also gets noticeably warm during video calls."</p>
      <span class="helpful">623 found this helpful</span>
    </article>
  </div>
</section>`,
        explanation:
          'By pairing the most helpful positive and critical reviews, users are exposed to both confirming and disconfirming evidence. The rating distribution chart provides objective context, preventing users from cherry-picking only the reviews that match their existing opinion.',
        principle:
          'Actively surface disconfirming evidence alongside confirming evidence to enable balanced evaluation',
        metrics: {
          before: '23% of users read critical reviews when only shown star average',
          after: '71% of users read critical reviews when shown paired review layout',
          improvement: '209% increase in balanced information consumption; 18% reduction in returns',
        },
      },
      {
        title: 'Dashboard with Mandatory Counter-Metrics',
        description:
          'Analytics dashboard that pairs every positive metric with a related caution metric to prevent cherry-picking',
        code: `<div class="metrics-dashboard">
  <div class="metric-pair">
    <div class="metric primary">
      <h4>New Signups</h4>
      <span class="value positive">+2,340</span>
      <span class="trend">+12% vs last month</span>
    </div>
    <div class="metric counter">
      <h4>Activation Rate</h4>
      <span class="value caution">31%</span>
      <span class="trend">-5% vs last month</span>
      <p class="context">Only 1 in 3 new signups complete onboarding</p>
    </div>
  </div>

  <div class="metric-pair">
    <div class="metric primary">
      <h4>Monthly Revenue</h4>
      <span class="value positive">$142K</span>
      <span class="trend">+8% vs last month</span>
    </div>
    <div class="metric counter">
      <h4>Churn Rate</h4>
      <span class="value caution">6.2%</span>
      <span class="trend">+1.1% vs last month</span>
      <p class="context">Revenue growth is masking accelerating churn</p>
    </div>
  </div>

  <div class="hypothesis-check">
    <h4>Pre-Registered Hypothesis Check</h4>
    <p>Hypothesis: "New onboarding flow will improve activation"</p>
    <p class="result negative">Result: Activation dropped 5%. Hypothesis NOT confirmed.</p>
  </div>
</div>`,
        explanation:
          'Pairing growth metrics with related health metrics prevents teams from selectively viewing only positive numbers. The pre-registered hypothesis check forces comparison of expectations against reality, directly counteracting confirmation bias in data interpretation.',
        principle:
          'Pair every vanity metric with a counter-metric to prevent selective attention to confirming data',
        metrics: {
          before: '78% of teams reported "positive results" when metrics were shown individually',
          after: '45% reported "positive results" with paired counter-metrics — matching actual performance more accurately',
          improvement: '42% improvement in decision accuracy; faster identification of problems',
        },
      },
      {
        title: 'News Feed with Perspective Diversity Indicator',
        description:
          'Content feed that alerts users when their reading is skewed toward one perspective and offers alternative viewpoints',
        code: `<div class="feed-diversity">
  <div class="diversity-alert">
    <div class="indicator">
      <span class="label">Your reading diversity this week</span>
      <div class="spectrum">
        <div class="filled" style="width: 25%"></div>
      </div>
      <span class="score">25% — Mostly one perspective</span>
    </div>
    <button class="expand-perspectives">
      Explore other viewpoints on this topic
    </button>
  </div>

  <article class="feed-item">
    <span class="perspective-tag">Perspective: Pro-regulation</span>
    <h3>New Data Privacy Rules Could Transform Tech Industry</h3>
    <p>Supporters argue stronger regulations will protect consumers...</p>
  </article>

  <div class="alternative-perspective">
    <span class="badge">Different Perspective</span>
    <article class="feed-item alternative">
      <span class="perspective-tag">Perspective: Industry response</span>
      <h3>Tech Leaders Warn Privacy Rules May Slow Innovation</h3>
      <p>Industry groups contend the regulations could stifle startups...</p>
    </article>
  </div>
</div>`,
        explanation:
          'The diversity indicator makes users aware of their reading patterns, while perspective tags help them recognize that articles represent viewpoints rather than objective truth. Surfacing alternative perspectives in-feed reduces the effort required to encounter disconfirming evidence.',
        principle:
          'Make confirmation bias visible to users and reduce friction for accessing diverse viewpoints',
      },
    ],

    bad: [
      {
        title: 'Algorithmic Echo Chamber Feed',
        description:
          'Social media feed that maximizes engagement by showing only content that confirms the user\'s existing beliefs',
        code: `<!-- DON'T DO THIS -->
<div class="feed">
  <div class="feed-item recommended">
    <span class="badge">Based on your interests</span>
    <h3>10 Reasons Why [Your Existing Belief] Is Absolutely Right</h3>
    <p class="engagement">2.4K likes from people who agree with you</p>
  </div>
  <div class="feed-item recommended">
    <span class="badge">People like you love this</span>
    <h3>New Study Proves [Your Existing Belief] Once and For All</h3>
    <p class="engagement">Shared by 847 people in your network</p>
  </div>
  <div class="feed-item recommended">
    <span class="badge">Trending in your circles</span>
    <h3>Why People Who Disagree With [Your Belief] Are Wrong</h3>
  </div>
  <!-- No opposing viewpoints ever shown -->
</div>`,
        explanation:
          'This feed design maximizes short-term engagement by only surfacing content the user already agrees with. It creates an echo chamber that progressively narrows the user\'s worldview, increases polarization, and makes the platform complicit in radicalization. The social proof elements ("people like you") further reinforce that the user\'s existing beliefs are universally shared.',
        principle:
          'Never design algorithms that exclusively serve belief-confirming content — it creates echo chambers and harms users and society',
      },
      {
        title: 'Cherry-Picked A/B Test Results Dashboard',
        description:
          'Analytics tool that makes it easy to find confirming metrics while burying disconfirming ones',
        code: `<!-- DON'T DO THIS -->
<div class="ab-test-results">
  <h2>Experiment Results: New Checkout Flow</h2>
  <div class="headline-metric winner">
    <h3>Conversion Rate</h3>
    <span class="value">+4.2%</span>
    <span class="badge success">WINNER!</span>
  </div>

  <!-- These are buried in a collapsed section -->
  <details class="secondary-metrics collapsed">
    <summary style="color: #999; font-size: 0.8em;">Other metrics</summary>
    <div class="metric negative">Cart abandonment: +12%</div>
    <div class="metric negative">Support tickets: +28%</div>
    <div class="metric negative">Return rate: +9%</div>
    <div class="metric negative">Time to complete: +45 seconds</div>
  </details>

  <button class="primary large">Ship It!</button>
</div>`,
        explanation:
          'This dashboard design makes it easy to confirm the hypothesis that the new checkout flow is better. The one positive metric is displayed prominently with celebration styling, while four negative counter-metrics are hidden in a collapsed section with de-emphasized text. The "Ship It!" button encourages action before reviewing all evidence.',
        principle:
          'Never design data tools that make it easier to find confirming evidence than disconfirming evidence',
      },
      {
        title: 'Personalized Search That Eliminates Diversity',
        description:
          'Search engine that so heavily personalizes results that users can never encounter contradictory information',
        code: `<!-- DON'T DO THIS -->
<div class="search-results">
  <p class="personalized-label" style="color: #999; font-size: 0.7em;">
    Results personalized for you
  </p>
  <!-- User searched "is remote work effective?" -->
  <!-- User previously read pro-remote-work articles -->
  <div class="result">
    <h3>Study: Remote Workers 47% More Productive</h3>
  </div>
  <div class="result">
    <h3>Why Remote Work Is the Future of Employment</h3>
  </div>
  <div class="result">
    <h3>Companies Embracing Remote Work See Record Profits</h3>
  </div>
  <!-- All results confirm existing belief -->
  <!-- No results showing challenges of remote work -->
  <!-- No indication that results are filtered -->
</div>`,
        explanation:
          'Heavy personalization based on browsing history means this user will only see results confirming their existing belief about remote work. The subtle "personalized for you" label does not adequately communicate that the results are filtered. The user believes they are seeing objective search results when they are actually seeing a curated confirmation of their existing views.',
        principle:
          'Search personalization without transparency and diversity controls creates invisible confirmation bias',
      },
    ],

    realWorld: [
      {
        company: 'Google',
        product: 'Google News',
        description: 'Google News includes a "Full Coverage" feature that shows the same news story from multiple sources with different editorial perspectives, including local, national, and international viewpoints. This helps users see beyond their filter bubble.',
        effectiveness: 'effective',
        analysis: 'Full Coverage directly counteracts confirmation bias by reducing the effort required to see diverse perspectives. By aggregating multiple sources for the same story, users can compare how different outlets frame the same facts, building media literacy and reducing echo chamber effects.',
      },
      {
        company: 'Twitter',
        product: 'Community Notes (formerly Birdwatch)',
        description: 'Twitter\'s Community Notes allows users to add context to tweets that might be misleading. Notes are only shown when raters from diverse viewpoints agree the note is helpful, requiring cross-ideological consensus.',
        effectiveness: 'very-effective',
        analysis: 'Community Notes is a sophisticated confirmation bias countermeasure. By requiring agreement from raters who typically disagree with each other, it ensures that corrections are genuinely informative rather than partisan. The crowdsourced approach scales better than top-down fact-checking.',
      },
      {
        company: 'Netflix',
        product: 'Recommendation Algorithm with Exploration',
        description: 'Netflix intentionally includes content outside a user\'s established preferences in recommendations. Their "Because you watched X" rows are interspersed with "Trending Now" and genre-exploration rows to prevent pure echo-chamber viewing.',
        effectiveness: 'effective',
        analysis: 'Netflix balances personalization (confirming user taste) with exploration (expanding user horizons). By mixing recommendation strategies, they prevent the content equivalent of confirmation bias while maintaining relevance. This approach also serves business goals by helping users discover more of the catalog.',
      },
      {
        company: 'Wikipedia',
        product: 'Neutral Point of View Policy',
        description: 'Wikipedia\'s core content policy requires articles to represent all significant viewpoints fairly and without editorial bias. Controversial topics must present multiple perspectives with proper sourcing, and editors are required to engage with opposing views.',
        effectiveness: 'very-effective',
        analysis: 'Wikipedia\'s institutional design directly counters confirmation bias at the content-creation level. The neutral point of view policy, combined with citation requirements and collaborative editing, creates structural barriers against single-perspective content. It demonstrates how platform design can systematically resist confirmation bias.',
      },
    ],

    abTests: [
      {
        title: 'Product Reviews: Star Average vs Paired Positive/Critical Reviews',
        hypothesis:
          'Showing paired positive and critical reviews will lead to more informed purchase decisions and fewer returns',
        controlVersion: {
          description:
            'Product page showing 4.3-star average, with reviews sorted by "Most Recent" — users naturally gravitate to reviews confirming their purchase intent',
          metrics: {
            conversionRate: '8.1%',
            returnRate: '14.2%',
            reviewEngagement: '1.8 reviews read on average',
          },
        },
        treatmentVersion: {
          description:
            'Product page showing rating distribution histogram plus paired "Most Helpful Positive" and "Most Helpful Critical" reviews prominently displayed',
          metrics: {
            conversionRate: '7.4%',
            returnRate: '8.7%',
            reviewEngagement: '4.2 reviews read on average',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'While conversion rate decreased slightly (-8.6%), return rate dropped dramatically (-38.7%), resulting in higher net revenue. Users read 133% more reviews and made significantly more informed purchase decisions. Post-purchase satisfaction scores increased by 22%.',
          learnings: [
            'Counteracting confirmation bias slightly reduces impulse purchases but dramatically improves purchase quality',
            'Users who read both positive and critical reviews have 38% fewer returns',
            'Rating distribution charts are more informative than single star averages',
            'Net revenue increased despite lower conversion rate due to reduced return costs',
          ],
        },
      },
      {
        title: 'Analytics Dashboard: Individual Metrics vs Paired Counter-Metrics',
        hypothesis:
          'Pairing growth metrics with related health metrics will improve decision quality and reduce confirmation-biased "ship it" decisions',
        controlVersion: {
          description:
            'Dashboard showing individual metrics with green/red indicators. Teams can view any metric independently and focus on whichever supports their hypothesis.',
          metrics: {
            decisionAccuracy: '54%',
            timeToDecision: '2.3 days',
            featureRollbackRate: '31%',
          },
        },
        treatmentVersion: {
          description:
            'Dashboard showing mandatory metric pairs (signups + activation, revenue + churn) with a "hypothesis check" section requiring pre-registered predictions.',
          metrics: {
            decisionAccuracy: '78%',
            timeToDecision: '3.1 days',
            featureRollbackRate: '12%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Paired counter-metrics increased decision accuracy by 44% and reduced feature rollbacks by 61%. Teams took slightly longer to decide (+0.8 days) but made dramatically better decisions. The pre-registered hypothesis feature was cited by 89% of teams as "forcing us to be honest about our expectations."',
          learnings: [
            'Mandatory counter-metrics prevent teams from cherry-picking favorable data',
            'Pre-registered hypotheses force teams to commit to success criteria before seeing results',
            'Slightly slower decisions are vastly preferable to fast but wrong decisions',
            'Feature rollback rate is a strong proxy for confirmation bias in product teams',
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
        name: 'Filter Bubble Indicators',
        description: 'Content feeds or search results that appear entirely homogeneous in viewpoint, tone, or source — no dissenting or alternative perspectives visible',
        howToSpot: 'Scroll through a feed or search results and check whether every item supports the same perspective. Look for absence of "other viewpoints" or "related perspectives" links.',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'One-Sided Social Proof',
        description: 'Only positive testimonials, reviews, or ratings displayed; critical feedback hidden, collapsed, or requiring extra clicks to access',
        howToSpot: 'Check whether negative reviews are equally accessible. Look for collapsed sections, tiny text links like "See all reviews," or filtered-out low ratings.',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Selective Metric Display',
        description: 'Dashboards or reports showing only favorable metrics prominently while burying unfavorable ones in secondary views or collapsed panels',
        howToSpot: 'Look for metrics shown in large, colorful displays vs ones hidden in dropdowns, tabs, or small text. Check if any important counter-metrics are missing entirely.',
        severity: ImpactLevel.CRITICAL,
      },
      {
        name: 'Personalization Without Transparency',
        description: 'Content that is algorithmically personalized but presented as if it were objective or universal, with no indication that results are filtered',
        howToSpot: 'Look for missing "personalized for you" labels, absent "see unfiltered results" options, or no way to understand why specific content was shown.',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Celebratory Result Framing',
        description: 'A/B test or experiment results presented with confetti, "Winner!" badges, or green highlighting before all metrics have been reviewed',
        howToSpot: 'Look for premature success indicators on experiment dashboards, "Ship It!" buttons, or result summaries that highlight one metric while downplaying others.',
        severity: ImpactLevel.MEDIUM,
      },
    ],

    patterns: [
      {
        name: 'Echo Chamber Pattern',
        description: 'Algorithmic content selection that progressively narrows the diversity of information users encounter based on engagement history',
        indicators: [
          'Recommendation feeds showing only content from like-minded sources',
          '"People who think like you also read..." suggestions',
          'Decreasing content diversity over time within a user\'s feed',
          'No mechanism to discover opposing viewpoints or outside perspectives',
        ],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Cherry-Picking Dashboard Pattern',
        description: 'Analytics interfaces that make it easy to focus on favorable metrics while ignoring unfavorable ones',
        indicators: [
          'Positive metrics displayed prominently, negative metrics in secondary views',
          'No mandatory counter-metrics or paired indicators',
          'Customizable dashboards that let users hide inconvenient metrics',
          'Default views that emphasize growth over health metrics',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Selective Evidence Pattern',
        description: 'Interfaces that present curated evidence supporting one conclusion while making contradictory evidence difficult to access',
        indicators: [
          'Featured testimonials all supporting one viewpoint',
          'Research citations that are one-sided',
          'Case studies showing only successes, never failures',
          'FAQ pages that only address confirming questions',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Self-Fulfilling Search Pattern',
        description: 'Search interfaces where personalization and autocomplete suggestions reinforce the user\'s existing beliefs',
        indicators: [
          'Autocomplete suggestions that complete searches in a belief-confirming direction',
          'Search results ranked by personal history rather than relevance or accuracy',
          'No option to see "unfiltered" or "diverse" results',
          'Related searches that lead deeper into the same perspective',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'medium',
      },
    ],

    checklistQuestions: [
      'Does the interface present diverse viewpoints, or only belief-confirming content?',
      'Can users easily access disconfirming evidence or opposing perspectives?',
      'Are search results or recommendations transparently labeled as personalized?',
      'Do dashboards pair growth metrics with related health or caution metrics?',
      'Are A/B test results presented with all metrics equally visible, not just the favorable ones?',
      'Is there a mechanism for users to "break out" of their filter bubble?',
      'Do review or testimonial displays include both positive and critical perspectives?',
      'Are user research findings synthesized with structured methods that require documenting disconfirming evidence?',
      'Does the content algorithm include a diversity quotient, or does it purely optimize for engagement?',
      'Are there any "devil\'s advocate" features that challenge the user\'s or team\'s assumptions?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in confirmation bias.

Analyze the provided design for confirmation bias patterns. Identify:

1. **Filter Bubbles**: How content selection and recommendation algorithms may create echo chambers
2. **Selective Evidence**: Where the interface makes it easy to find confirming evidence and hard to find disconfirming evidence
3. **Cherry-Picked Metrics**: How data and analytics displays may encourage selective interpretation
4. **Personalization Transparency**: Whether users are aware that content is filtered or personalized
5. **Balanced Presentation**: Whether opposing viewpoints and counter-evidence are accessible

For each pattern found:
- Identify where confirmation bias is being amplified or mitigated
- Assess whether users can access diverse perspectives
- Determine if the design helps users make balanced decisions
- Evaluate the ethical implications of confirmation bias in this context
- Suggest improvements for balanced, bias-aware design

Consider:
- Is the design creating echo chambers through algorithmic content selection?
- Are dashboards and analytics tools designed to prevent cherry-picking?
- Do search and filter interfaces allow users to encounter disconfirming evidence?
- Are reviews, testimonials, and social proof presented in a balanced way?
- Does the design help users recognize their own confirmation bias?

Provide actionable recommendations for reducing harmful confirmation bias while preserving useful personalization.`,

    outputSchema: {
      type: 'object',
      properties: {
        confirmationBiasPatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              biasDirection: { type: 'string' },
              diversityScore: { type: 'number' },
              userAwareness: { type: 'string' },
              echoChemberRisk: { type: 'string' },
              ethical: { type: 'boolean' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'biasDirection',
              'diversityScore',
              'ethical',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            perspectiveDiversity: { type: 'number' },
            evidenceBalance: { type: 'number' },
            personalizationTransparency: { type: 'number' },
            ethicalScore: { type: 'number' },
          },
          required: [
            'perspectiveDiversity',
            'evidenceBalance',
            'personalizationTransparency',
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
        'confirmationBiasPatterns',
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
        title: 'Audit for Echo Chamber Risk',
        description:
          'Map every point in your product where content is filtered, personalized, or algorithmically selected. Identify where confirmation bias could be amplified.',
        example:
          'Map: search results (personalized), news feed (algorithmic), recommendations ("more like this"), review display (sorted by recent)',
        tips: [
          'List every content-selection mechanism in your product',
          'Identify which ones use engagement history as input',
          'Assess whether any pathway allows users to avoid encountering diverse viewpoints entirely',
        ],
      },
      {
        step: 2,
        title: 'Design Balanced Information Architecture',
        description:
          'Structure content so that disconfirming evidence and alternative perspectives are equally accessible — not hidden behind extra clicks or collapsed sections.',
        example:
          'Place "Most helpful critical review" alongside "Most helpful positive review" at equal visual weight',
        tips: [
          'Pair confirming content with counter-perspectives at the same hierarchy level',
          'Never require more effort to access disconfirming evidence than confirming evidence',
          'Use information architecture to ensure diversity, not just algorithms',
        ],
      },
      {
        step: 3,
        title: 'Add Transparency and Diversity Controls',
        description:
          'Make personalization visible and give users tools to control their exposure to diverse perspectives.',
        example:
          'Add a "perspective diversity" indicator to content feeds, a "see unfiltered results" toggle to search, and a "why am I seeing this?" explainer on recommended content',
        tips: [
          'Label personalized content clearly',
          'Provide an easy way to see unpersonalized or diverse results',
          'Show users their reading or engagement diversity score',
        ],
      },
      {
        step: 4,
        title: 'Design Anti-Bias Data Tools',
        description:
          'For analytics, dashboards, and decision-support tools, build structural safeguards against confirmation-biased interpretation.',
        example:
          'Require pre-registered hypotheses for A/B tests, pair every growth metric with a health counter-metric, and include a "devil\'s advocate" summary in experiment reports',
        tips: [
          'Mandate counter-metrics alongside primary metrics',
          'Require pre-registration of hypotheses and success criteria',
          'Include automated "what could disprove this conclusion?" prompts',
        ],
      },
      {
        step: 5,
        title: 'Test for Bias in Your Own Process',
        description:
          'Apply confirmation bias awareness to your own design and research process. Structure user research, design reviews, and decision-making to resist your own biases.',
        example:
          'Use structured synthesis (affinity mapping all observations before drawing conclusions), require two independent researchers to code qualitative data, and conduct pre-mortems before launches',
        tips: [
          'Have someone on the team explicitly argue the opposing position',
          'Document disconfirming user research findings with equal weight',
          'Conduct pre-mortems: "Assume this feature failed — why?"',
        ],
      },
    ],

    dos: [
      'Surface diverse perspectives and counter-evidence alongside confirming content',
      'Pair positive metrics with related counter-metrics in dashboards',
      'Label personalized or algorithmically selected content transparently',
      'Show rating distributions, not just averages, for reviews',
      'Require pre-registered hypotheses for experiments and A/B tests',
      'Design "perspective diversity" indicators for content feeds',
      'Provide easy access to unfiltered or unpersonalized views',
      'Structure user research synthesis to require documenting disconfirming evidence',
    ],

    donts: [
      'Don\'t build recommendation algorithms that only serve belief-confirming content',
      'Don\'t hide critical reviews or negative feedback behind extra clicks',
      'Don\'t display only favorable metrics while burying unfavorable ones',
      'Don\'t personalize search results without transparency and opt-out controls',
      'Don\'t use celebration UI (confetti, "Winner!") on experiment results before all metrics are reviewed',
      'Don\'t let teams cherry-pick which user research quotes to highlight without structured analysis',
      'Don\'t design autocomplete suggestions that only complete queries in a confirming direction',
      'Don\'t allow dashboards to be customized in ways that hide critical counter-metrics',
    ],

    bestPractices: [
      {
        title: 'Implement Perspective Diversity Quotients',
        description:
          'Include a mandatory percentage of content from outside the user\'s established preference bubble in recommendation algorithms',
        rationale:
          'Pure engagement optimization creates echo chambers. A diversity quotient ensures users encounter different perspectives without eliminating personalization entirely.',
        example:
          'Reserve 15-20% of feed slots for content outside the user\'s usual sources, clearly labeled as "Broaden your perspective"',
      },
      {
        title: 'Design Paired Evidence Displays',
        description:
          'Whenever presenting evidence, reviews, or data points, always pair confirming with disconfirming information at equal visual weight',
        rationale:
          'Users naturally seek confirming evidence. Making disconfirming evidence equally prominent reduces the cognitive effort required for balanced evaluation.',
        example:
          'Display "Pros" and "Cons" columns side-by-side, "Most helpful positive" alongside "Most helpful critical" review',
      },
      {
        title: 'Build Pre-Mortem Features into Decision Tools',
        description:
          'Include "Assume this failed — why?" prompts in any tool used for launch decisions, experiment analysis, or strategic planning',
        rationale:
          'Pre-mortems force teams to actively generate disconfirming scenarios, directly counteracting the tendency to only seek confirming evidence for their preferred conclusion.',
        example:
          'Before "Ship" button in feature flag tools, show: "This feature was rolled back after 2 weeks. What went wrong?" prompt',
      },
      {
        title: 'Use Blind Analysis for User Research',
        description:
          'Structure user research tools so that observation coding happens independently before synthesis, preventing early conclusions from biasing later analysis',
        rationale:
          'When researchers form early hypotheses, they unconsciously seek confirming observations. Independent coding followed by collaborative synthesis reduces this bias.',
        example:
          'Each researcher tags observations independently, then the team uses affinity mapping to find patterns — not the other way around',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships - Ensure balanced perspectives are conveyed in document structure, not just visual layout',
        implementation:
          'Use proper heading levels for both confirming and disconfirming content. Screen reader users should encounter diverse perspectives in the same reading flow as visual users.',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.3.2',
        guideline:
          'Meaningful Sequence - Ensure reading order presents balanced information, not just confirming content first',
        implementation:
          'DOM order should interleave diverse perspectives. Don\'t place all confirming content first and all disconfirming content last in the reading order.',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.4.1',
        guideline:
          'Use of Color - Don\'t use color alone to signal which data is "good" or "bad" in dashboards',
        implementation:
          'Combine green/red color coding with text labels, icons, and ARIA descriptions so that all users can evaluate metrics without color-based bias.',
      },
    ],

    ethics: [
      {
        concern: 'Echo Chamber Creation',
        severity: 'critical',
        explanation:
          'Recommendation algorithms that maximize engagement by serving only belief-confirming content trap users in echo chambers, contributing to polarization and radicalization',
        mitigation:
          'Implement perspective diversity quotients in all content selection algorithms. Provide transparency about personalization and easy access to diverse viewpoints.',
      },
      {
        concern: 'Manipulative Personalization',
        severity: 'high',
        explanation:
          'Using confirmation bias to keep users engaged by only showing them what they already believe, without their awareness or consent',
        mitigation:
          'Always disclose when content is personalized. Provide opt-out controls and "unfiltered" views. Never optimize purely for engagement at the expense of information diversity.',
      },
      {
        concern: 'Decision Manipulation Through Selective Data',
        severity: 'high',
        explanation:
          'Designing dashboards or reports that make it easy to find data supporting a predetermined conclusion while hiding contradictory evidence',
        mitigation:
          'Mandate counter-metrics, pre-registered hypotheses, and complete data visibility. Design tools that make it harder, not easier, to cherry-pick data.',
      },
      {
        concern: 'Research Integrity',
        severity: 'high',
        explanation:
          'User research tools and processes that allow researchers to unconsciously filter observations to match their hypotheses, leading to products that don\'t serve real user needs',
        mitigation:
          'Build structured analysis workflows, independent coding, blind analysis features, and mandatory disconfirming evidence documentation into research tools.',
      },
      {
        concern: 'Exploitation of Vulnerable Beliefs',
        severity: 'critical',
        explanation:
          'Algorithmically amplifying conspiracy theories, health misinformation, or extremist content because users engage with belief-confirming content more',
        mitigation:
          'Implement content quality signals independent of engagement. Flag misinformation regardless of user preference. Prioritize accuracy over engagement for health, safety, and civic topics.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'On the 2-4-6 Problem',
        author: 'Wason, P. C.',
        year: 1960,
        doi: '10.1080/17470216008416717',
        description:
          'The foundational paper demonstrating confirmation bias through the 2-4-6 rule discovery task, showing people test hypotheses by seeking confirming rather than disconfirming evidence',
        type: 'foundational',
      },
      {
        title: 'Biased Assimilation and Attitude Polarization',
        author: 'Lord, C. G., Ross, L., & Lepper, M. R.',
        year: 1979,
        doi: '10.1037/0022-3514.37.11.2098',
        description:
          'Classic study showing that people with opposing views on capital punishment both became more polarized after reading the same mixed evidence — each side found the confirming studies more convincing',
        type: 'foundational',
      },
      {
        title: 'The Case for Motivated Reasoning',
        author: 'Kunda, Z.',
        year: 1990,
        doi: '10.1037/0033-2909.108.3.480',
        description:
          'Influential paper on how motivation shapes reasoning, demonstrating that people arrive at conclusions they want to reach by constructing seemingly rational justifications',
        type: 'advanced',
      },
      {
        title: 'Filter Bubbles, Echo Chambers, and Online News Consumption',
        author: 'Flaxman, S., Goel, S., & Rao, J. M.',
        year: 2016,
        doi: '10.1093/poq/nfw006',
        description:
          'Empirical study of how algorithmic curation and social sharing create ideological segregation in online news consumption',
        type: 'case-study',
      },
    ],

    books: [
      {
        title: 'Thinking, Fast and Slow',
        author: 'Kahneman, Daniel',
        year: 2011,
        isbn: '9780374275631',
        description:
          'Comprehensive coverage of confirmation bias and its relationship to System 1 and System 2 thinking, with practical examples of how it distorts judgment',
        type: 'foundational',
      },
      {
        title: 'The Filter Bubble: What the Internet Is Hiding from You',
        author: 'Pariser, Eli',
        year: 2011,
        isbn: '9780143121237',
        description:
          'Seminal work on how algorithmic personalization creates filter bubbles that amplify confirmation bias at massive scale',
        type: 'practical',
      },
      {
        title: 'The Intelligence Trap',
        author: 'Robson, David',
        year: 2019,
        isbn: '9781473669833',
        description:
          'Explores how intelligent people are often more susceptible to confirmation bias because they are better at constructing justifications for their beliefs',
        type: 'practical',
      },
    ],

    articles: [
      {
        title: 'Confirmation Bias in UX Research',
        author: 'Nielsen Norman Group',
        url: 'https://www.nngroup.com/articles/confirmation-bias-ux/',
        description:
          'Practical guide to recognizing and counteracting confirmation bias in user research, including structured analysis techniques',
        type: 'practical',
      },
      {
        title: 'How to Fight Confirmation Bias in UX',
        author: 'Interaction Design Foundation',
        url: 'https://www.interaction-design.org/literature/article/confirmation-bias-in-ux',
        description:
          'Design-focused strategies for mitigating confirmation bias in both user behavior and designer decision-making',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'The Backfire Effect and Confirmation Bias',
        author: 'Veritasium',
        url: 'https://www.youtube.com/watch?v=Q8NydsXl32s',
        description:
          'Well-produced video explaining how confirmation bias causes people to double down on beliefs when presented with contradictory evidence',
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
