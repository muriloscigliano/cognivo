/**
 * AVAILABILITY HEURISTIC - Complete Implementation
 *
 * Comprehensive bias card following the gold standard structure.
 */

import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const availabilityHeuristic: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'availability-heuristic',
    name: 'Availability Heuristic',
    aliases: ['Availability Bias', 'Recency Bias'],
    category: BiasCategory.COGNITIVE,
    relatedCategories: [
      BiasCategory.DECISION_MAKING,
      BiasCategory.PERCEPTION,
      BiasCategory.MEMORY,
    ],
    tags: [
      'recall',
      'memory',
      'frequency',
      'probability',
      'salience',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple:
      'People judge the likelihood of events based on how easily examples come to mind, not actual probability.',

    detailed: `The Availability Heuristic is a mental shortcut that relies on immediate examples that come to mind when evaluating a topic, concept, method, or decision. People tend to overestimate the likelihood of events that are more memorable or emotionally charged, while underestimating less vivid events—regardless of actual statistical probability.

When something is easy to recall (recent, dramatic, or personally experienced), we judge it as more common, frequent, or likely than it actually is. When something is hard to recall (mundane, statistical, or abstract), we judge it as less common or likely.

This bias profoundly affects design because:
- Users overestimate the frequency of memorable errors they've experienced
- Recent interactions feel more important than they actually are
- Vivid testimonials carry more weight than statistical evidence
- Dramatic edge cases feel more common than typical use cases`,

    psychologyBasis: {
      discoveredBy: 'Tversky & Kahneman',
      year: 1973,
      theory: 'Availability Heuristic',
      mechanism: `The brain uses mental availability as a proxy for frequency and probability. This happens because:

1. **Retrieval Ease**: If examples come to mind easily, the brain assumes the event must be common
2. **Emotional Salience**: Emotionally charged events are encoded more strongly in memory
3. **Recency Effect**: Recent events are more accessible in memory than older ones
4. **Vividness**: Concrete, vivid examples are more memorable than abstract statistics
5. **Personal Experience**: Events we've personally experienced feel more real than reported events

The mechanism is automatic and unconscious—we're not aware we're using recall ease as a proxy for frequency.`,
    },

    realWorldExample: `After seeing news coverage of shark attacks, people overestimate the risk of sharks and avoid ocean swimming—despite the statistical fact that they're more likely to be killed by a falling coconut, bee sting, or lightning strike. The vivid, dramatic shark attack footage makes it mentally available, distorting risk perception.

Similarly, after a plane crash, flight bookings drop even though flying remains statistically safer than the car trip to the airport. The availability of the crash imagery outweighs the statistical reality.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `The Availability Heuristic affects how users perceive frequency, risk, importance, and urgency in interfaces. Designers can leverage this to:

- Make important information more memorable through vividness and repetition
- Shape risk perception through strategic use of examples and testimonials
- Guide attention to frequent issues by making them salient
- Reduce perceived risk by making positive examples highly available
- Create urgency through vivid, recent examples of action or consequence`,

    whenToUse: [
      {
        title: 'Error Prevention',
        scenario:
          'When helping users avoid common mistakes or dangerous actions',
        example:
          'Show vivid examples of what happens when users skip backup, making the risk feel real and immediate',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Security Awareness',
        scenario: 'When educating users about security threats and best practices',
        example:
          'Display recent breach examples and their consequences to make security threats feel concrete',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Testimonials and Social Proof',
        scenario: 'When building trust and credibility for products or services',
        example:
          'Feature vivid, detailed customer success stories rather than aggregate statistics',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Onboarding Examples',
        scenario: 'When teaching users how to use features effectively',
        example:
          'Show concrete, memorable use cases rather than abstract feature descriptions',
        impact: ImpactLevel.MEDIUM,
      },
      {
        title: 'Urgency and Scarcity',
        scenario: 'When encouraging timely action on limited opportunities',
        example:
          'Show recent purchases or sign-ups to make demand feel immediate and real',
        impact: ImpactLevel.MEDIUM,
      },
    ],

    whenToAvoid: [
      {
        title: 'Statistical Decision-Making',
        reason:
          'Vivid examples can distort perception of actual data and probabilities',
        consequence:
          'Users might make poor decisions based on memorable exceptions rather than typical outcomes',
        alternative:
          'Present clear statistical information alongside examples, emphasizing base rates',
      },
      {
        title: 'Medical or Financial Decisions',
        reason:
          'Availability bias can cause users to over-weight rare but vivid risks',
        consequence:
          'Suboptimal health or financial choices driven by fear rather than probability',
        alternative:
          'Provide balanced information with clear probability data and multiple perspectives',
      },
      {
        title: 'Fear-Based Manipulation',
        reason:
          'Using vivid negative examples to manipulate through fear is unethical',
        consequence:
          'User distrust, anxiety, and potential harm from fear-driven decisions',
        alternative:
          'Use positive examples and focus on benefits rather than fear',
      },
      {
        title: 'Edge Case Over-Emphasis',
        reason:
          'Making rare edge cases too salient can distort understanding of typical use',
        consequence:
          'Users might optimize for rare scenarios and miss common use cases',
        alternative:
          'Balance edge case warnings with emphasis on typical, common scenarios',
      },
    ],

    commonMistakes: [
      {
        title: 'Overusing Negative Examples',
        description:
          'Showing only errors, failures, and warnings makes users anxious and risk-averse',
        why: 'Constant exposure to negative examples triggers availability bias for worst-case scenarios',
        fix: 'Balance negative examples with positive ones, emphasize solutions over problems',
      },
      {
        title: 'Ignoring Base Rates',
        description:
          'Providing vivid examples without statistical context distorts probability',
        why: 'Memorable examples feel more common than they actually are without context',
        fix: 'Always provide statistical context and base rates alongside vivid examples',
      },
      {
        title: 'Recency Without Context',
        description:
          'Showing only recent activity creates recency bias without historical perspective',
        why: 'Recent events are more easily recalled and feel more representative than they are',
        fix: 'Show recent activity in context of historical trends and patterns',
      },
      {
        title: 'Emotional Manipulation',
        description:
          'Using highly emotional examples to drive decisions through fear or excitement',
        why: 'Emotional examples are highly memorable but can override rational decision-making',
        fix: 'Use examples that inform rather than manipulate, provide balanced perspectives',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.HIGH,
        description:
          'Layout determines what information is most visible and memorable',
        examples: [
          'Prominent placement of examples makes them more mentally available',
          'Above-the-fold content is more memorable than buried information',
          'Visual hierarchies emphasize certain information as more important',
          'Repeated exposure through scrolling increases availability',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Text emphasis affects memorability and perceived importance',
        examples: [
          'Bold, large text makes information more salient and memorable',
          'Highlighted quotes stand out as more representative',
          'Typography hierarchy signals what to remember',
          'Readable text is more likely to be encoded in memory',
        ],
      },
      color: {
        level: ImpactLevel.HIGH,
        description:
          'Color creates emotional salience and memorability',
        examples: [
          'Red warnings are vivid and memorable, affecting risk perception',
          'Bright colors make information more salient',
          'Color coding can make categories more mentally available',
          'Emotional colors (red, green) enhance memory encoding',
        ],
      },
      interaction: {
        level: ImpactLevel.CRITICAL,
        description:
          'Recent interactions dominate users\' mental models',
        examples: [
          'The last error message is most memorable, shaping error perception',
          'Recent successful workflows feel more representative',
          'Interactive examples are more memorable than static text',
          'User-triggered events are more salient than automated ones',
        ],
      },
      content: {
        level: ImpactLevel.CRITICAL,
        description:
          'Content type and presentation massively affect which examples users can recall when making decisions',
        examples: [
          'Concrete stories are 22x more memorable than statistics',
          'Vivid language makes information more mentally available',
          'Personal testimonials feel more real than aggregate data',
          'Dramatic examples overshadow typical use cases',
        ],
      },
      accessibility: {
        level: ImpactLevel.HIGH,
        description:
          'Accessibility affects which information is available to different users',
        examples: [
          'Screen reader users encode information aurally, affecting availability',
          'Visual emphasis doesn\'t translate to non-visual users',
          'Keyboard navigation order affects what\'s encountered and remembered',
          'Alt text descriptions shape mental availability for screen reader users',
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
        title: 'Security Awareness with Concrete Examples',
        description:
          'Password manager showing recent breach examples affecting similar users',
        code: `<div class="security-prompt">
  <h3>🔒 Strengthen Your Security</h3>
  <div class="recent-breaches">
    <div class="breach-example">
      <span class="date">3 days ago</span>
      <p><strong>Sarah from Seattle</strong> had her account accessed from Russia</p>
      <p class="consequence">Prevented by two-factor authentication</p>
    </div>
    <div class="breach-example">
      <span class="date">Last week</span>
      <p><strong>Designer in Portland</strong> lost access to 5 years of work</p>
      <p class="consequence">Recovered thanks to backup authentication</p>
    </div>
  </div>
  <button class="primary">Enable Two-Factor Authentication</button>
  <p class="stat">73% of attacks prevented by 2FA</p>
</div>`,
        explanation:
          'Concrete, recent examples make the security threat feel real and immediate. Users can imagine themselves in these scenarios, making the risk mentally available.',
        principle:
          'Vivid, recent examples increase perceived frequency and urgency of threat',
        metrics: {
          before: '12% enabled 2FA after generic warning',
          after: '34% enabled 2FA after concrete examples',
          improvement: '183% increase in security feature adoption',
        },
      },
      {
        title: 'Customer Success Stories Over Statistics',
        description:
          'SaaS landing page featuring detailed customer stories',
        code: `<section class="success-stories">
  <h2>Real Results from Real Customers</h2>

  <article class="customer-story featured">
    <img src="headshot.jpg" alt="Jessica Chen, Marketing Director">
    <blockquote>
      "We were spending 15 hours per week on manual reports.
      Now it takes 30 minutes. That's 14.5 hours back for strategy."
    </blockquote>
    <div class="metrics">
      <span class="metric">15 hours → 30 min</span>
      <span class="metric">96% time saved</span>
    </div>
    <p class="story">Jessica's team was drowning in spreadsheets.
    Every Monday meant pulling data from 8 different sources...</p>
  </article>

  <aside class="stat-context">
    <p>Average time saved: 12.3 hours/week across 2,847 customers</p>
  </aside>
</section>`,
        explanation:
          'The vivid, detailed story of Jessica makes success feel concrete and achievable. The aggregate stat provides context but the story is what users remember.',
        principle:
          'Concrete examples are 22x more memorable than abstract statistics',
      },
      {
        title: 'Error Prevention with Memorable Examples',
        description:
          'File deletion warning with concrete consequences',
        code: `<dialog class="delete-warning">
  <h3>⚠️ Permanently Delete 247 Files?</h3>

  <div class="consequence-examples">
    <div class="example">
      <span class="icon">📄</span>
      <p><strong>Client_Proposal_Final_v3.pdf</strong></p>
      <p class="detail">Last week, Alex deleted their client proposal
      and had to recreate 8 hours of work from memory.</p>
    </div>
    <div class="example">
      <span class="icon">🖼️</span>
      <p><strong>Project_Screenshots/</strong> (89 images)</p>
      <p class="detail">These images can't be recovered after deletion.</p>
    </div>
  </div>

  <p class="stat">23% of users restore files within 48 hours of deletion</p>

  <div class="actions">
    <button class="secondary">Archive Instead</button>
    <button class="danger">Yes, Delete Forever</button>
  </div>
</dialog>`,
        explanation:
          'Concrete example of Alex recreating work makes the risk vivid and personal. Users can imagine being in that situation, making the consequence feel real.',
        principle:
          'Memorable failure examples increase perceived risk of action',
      },
    ],

    bad: [
      {
        title: 'Fear-Based Manipulation',
        description:
          'Antivirus software using extreme scare tactics',
        code: `<!-- DON'T DO THIS -->
<div class="threat-warning">
  <h2 style="color: red; font-size: 2em;">⚠️ CRITICAL THREAT DETECTED!</h2>
  <img src="hacker.jpg" alt="Scary hooded hacker">
  <p style="color: red;">Your computer is being ATTACKED right now!
  Hackers could be stealing your passwords, credit cards, and identity!</p>
  <p>Last week, someone like you lost $15,000 to hackers!</p>
  <button class="urgent">FIX NOW OR LOSE EVERYTHING!</button>
</div>`,
        explanation:
          'Extreme fear tactics using vivid threats are manipulative and unethical. The dramatic language and imagery create anxiety without providing accurate risk assessment.',
        principle:
          'Never use availability bias to manipulate through exaggerated fear',
      },
      {
        title: 'Distorting Probability with Cherry-Picked Examples',
        description:
          'Investment platform showing only extreme success stories',
        code: `<!-- DON'T DO THIS -->
<section class="testimonials">
  <h2>Our Users Are Making MILLIONS!</h2>
  <div class="story">
    <p>"I made $50,000 in my first week!" - Brad, 28</p>
  </div>
  <div class="story">
    <p>"Quit my job after 2 months, now making 10x my old salary!" - Sarah, 35</p>
  </div>
  <div class="story">
    <p>"Turned $1,000 into $100,000 in 6 months!" - Mike, 42</p>
  </div>
  <small style="color: #999; font-size: 0.6em;">Results not typical</small>
</section>`,
        explanation:
          'Showing only extreme outliers without statistical context creates false availability. Users will overestimate their chances of similar results. The tiny disclaimer doesn\'t counteract the vivid examples.',
        principle:
          'Vivid outliers without base rates distort probability perception',
      },
      {
        title: 'Recency Bias Without Context',
        description:
          'Analytics dashboard showing only last 24 hours',
        code: `<!-- DON'T DO THIS -->
<div class="dashboard">
  <h3>System Status</h3>
  <div class="alert error">
    <p>17 errors in the last 24 hours</p>
  </div>
  <div class="alert warning">
    <p>Response time 23% slower than yesterday</p>
  </div>
  <p class="conclusion">System performance is degrading!</p>
</div>`,
        explanation:
          'Focusing only on recent data without historical context makes temporary fluctuations feel like trends. Users will overestimate the significance of recent changes.',
        principle:
          'Recent information without historical context creates availability bias',
      },
    ],

    realWorld: [
      {
        company: 'Airbnb',
        product: 'Host Stories',
        description:
          'Airbnb features detailed, vivid stories of hosts earning money, complete with photos, quotes, and specific earnings figures. These memorable stories make hosting success feel achievable and common, even though results vary widely.',
        effectiveness: 'very-effective',
        analysis:
          'By making individual host success stories highly available through detailed narratives with real names and earnings, Airbnb leverages the availability heuristic to make the idea of hosting feel safe and profitable. Users recall these vivid stories when evaluating the risk of listing their home.',
      },
      {
        company: 'Duolingo',
        product: 'Streak Notifications',
        description:
          'Duolingo sends push notifications showing your streak count and recent activity. The constant reminders make your learning progress (and the potential loss of a streak) highly mentally available, encouraging daily practice.',
        effectiveness: 'very-effective',
        analysis:
          'Streak notifications exploit recency and frequency aspects of the availability heuristic. By making your streak count constantly visible and top-of-mind, Duolingo ensures that the thought of breaking the streak is always mentally available, driving consistent engagement.',
      },
      {
        company: 'GitHub',
        product: 'Contribution Graph',
        description:
          'GitHub displays a prominent green heat map of your recent contributions on your profile. Empty gray squares make inactivity vivid and salient, while green squares make productivity feel tangible and rewarding.',
        effectiveness: 'effective',
        analysis:
          'The contribution graph makes coding activity (or lack thereof) visually vivid and immediately available. Users recall the green grid when deciding whether to code today. The visual pattern is more memorable than any statistic about commit frequency.',
      },
      {
        company: 'Stripe',
        product: 'Real-Time Dashboard',
        description:
          'Stripe\'s dashboard shows real-time payment notifications with live-updating revenue counters. Each transaction appears as a concrete event with amount and timestamp, making business activity feel immediate and tangible.',
        effectiveness: 'effective',
        analysis:
          'Real-time transaction feeds leverage the recency component of availability heuristic. Recent payments are more mentally available than historical averages, which can cause merchants to overweight recent trends. Stripe mitigates this by also showing period comparisons.',
      },
    ],

    abTests: [
      {
        title: 'Customer Testimonials: Detailed Stories vs Statistics',
        hypothesis:
          'Detailed customer stories will be more persuasive than aggregate statistics',
        controlVersion: {
          description:
            'Landing page showing statistics: "95% customer satisfaction, average 10x ROI, 50,000+ happy customers"',
          metrics: {
            conversionRate: '4.2%',
            timeOnPage: '1:23',
            scrollDepth: '45%',
          },
        },
        treatmentVersion: {
          description:
            'Landing page featuring 3 detailed customer stories with photos, quotes, specific results, and narrative context',
          metrics: {
            conversionRate: '6.8%',
            timeOnPage: '3:15',
            scrollDepth: '78%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Detailed stories increased conversions by 62%. Users spent 140% more time reading and scrolling. Follow-up surveys showed users remembered specific customer names and outcomes but couldn\'t recall the statistical data from control version.',
          learnings: [
            'Concrete examples are far more memorable than statistics',
            'Users could recall story details days later but forgot statistics immediately',
            'Emotional connection to real people drove trust more than numbers',
            'Best results came from combining stories with supporting statistics',
          ],
        },
      },
      {
        title: 'Security Warnings: Generic vs Concrete Examples',
        hypothesis:
          'Concrete breach examples will increase security feature adoption',
        controlVersion: {
          description:
            'Generic security message: "Enable 2FA to protect your account from unauthorized access"',
          metrics: {
            conversionRate: '8.5%',
            clickThroughRate: '12%',
          },
        },
        treatmentVersion: {
          description:
            'Concrete examples: "Last week, 3 users in your city had accounts accessed from foreign countries. All had weak passwords and no 2FA. Enable 2FA to prevent this."',
          metrics: {
            conversionRate: '23.7%',
            clickThroughRate: '31%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Concrete, recent examples nearly tripled 2FA adoption. Geographic proximity ("in your city") and temporal recency ("last week") made the threat feel immediate and personally relevant.',
          learnings: [
            'Concrete examples make abstract risks feel real',
            'Geographic and temporal proximity increase salience',
            'Specific numbers ("3 users") more impactful than vague warnings',
            'Showing consequence (what happened) more effective than showing possibility',
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
        name: 'Prominent Recent Activity',
        description:
          'Recent events, transactions, or updates displayed prominently with timestamps like "Just now", "3 min ago", or "Today"',
        howToSpot:
          'Look for activity feeds, recent transaction lists, "Latest" or "Recent" sections, and real-time counters at the top of pages or dashboards',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Vivid Visual Examples',
        description:
          'Emotionally charged imagery, dramatic before/after photos, or striking visuals paired with concrete outcomes',
        howToSpot:
          'Check for large hero photos, dramatic headlines with specific numbers, emotionally loaded imagery, or before/after comparisons that make consequences feel tangible',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Testimonials and Personal Stories',
        description:
          'Detailed customer stories featuring real names, headshots, specific outcomes, and narrative arcs that make success or failure feel personal',
        howToSpot:
          'Look for quote blocks with headshots, named individuals with specific metrics ("saved 15 hours/week"), and narrative case studies placed above aggregate data',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'High-Salience Warnings and Alerts',
        description:
          'Red error messages, animated warning banners, or pulsing notification badges that make risks feel immediate and frequent',
        howToSpot:
          'Check for red/orange color treatments on warnings, exclamation icons, bold or large-font error text, and persistent notification badges that keep threats top-of-mind',
        severity: ImpactLevel.CRITICAL,
      },
      {
        name: 'Live Activity Counters',
        description:
          'Real-time displays showing "X people viewing this", "Y sold in the last hour", or live purchase notifications',
        howToSpot:
          'Look for animated counters, toast notifications showing other users\' actions, or dynamic numbers that update without page refresh',
        severity: ImpactLevel.MEDIUM,
      },
    ],

    patterns: [
      {
        name: 'Recency Stream Pattern',
        description: 'Continuous stream of recent activity, updates, or transactions that makes current events dominate user perception',
        indicators: [
          'Real-time activity feeds with timestamps',
          'Recent transaction lists sorted newest-first',
          '"Latest updates" sections placed above historical data',
          'Push notifications about recent events',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Vivid Example Pattern',
        description: 'Detailed, concrete examples prioritized over aggregate statistics to shape perception of likelihood',
        indicators: [
          'Customer success stories with specific names and outcomes',
          'Named individuals with photos and direct quotes',
          'Specific numbers and timelines in testimonials',
          'Narrative storytelling placed above data tables or charts',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Salience Emphasis Pattern',
        description: 'Using color, size, motion, or emotion to make certain information disproportionately memorable',
        indicators: [
          'Red error states or warning banners with dramatic language',
          'Animated notifications or pulsing alert icons',
          'Large, bold numbers or headlines for selected metrics',
          'Emotional imagery paired with calls to action',
        ],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Social Proof Availability Pattern',
        description: 'Showing specific, recent social proof examples rather than aggregate counts to make demand feel immediate',
        indicators: [
          '"John just purchased this" toast notifications',
          'Recent reviews featured above older comprehensive reviews',
          'Live activity counters updating in real time',
          '"X people in your area" geographic proximity indicators',
        ],
        severity: ImpactLevel.MEDIUM,
        confidence: 'medium',
      },
    ],

    checklistQuestions: [
      'What recent events or activities are prominently displayed, and could they distort perception of what is typical?',
      'Are concrete examples used instead of or alongside statistics, and do they accurately represent common outcomes?',
      'What information is made most visually salient through color, size, or position?',
      'Are there vivid, emotional, or dramatic elements that could make rare events seem frequent?',
      'How is recency emphasized—are timestamps, "latest", or "recent" labels creating a skewed sense of trends?',
      'Are customer testimonials detailed and specific enough to be memorable, and do they represent typical results?',
      'Do warning or error states use high-salience treatments that might exaggerate perceived risk?',
      'Is real-time or live updating content making short-term fluctuations feel more significant than they are?',
      'Are individual examples given more prominence than aggregate data, and is that appropriate for the context?',
      'How might the most memorable elements on the page distort users\' perception of frequency, probability, or risk?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in the availability heuristic.

Analyze the provided design for availability heuristic patterns. Identify:

1. **Recency Emphasis**: How recent events, activities, or data are displayed
2. **Vivid Examples**: Use of concrete, emotional, or dramatic examples vs statistics
3. **Salience**: What information is made most visually prominent and memorable
4. **Risk Perception**: How warnings, errors, or threats are presented
5. **Social Proof**: How customer examples and testimonials are used

For each pattern found:
- Identify what information is made most mentally available
- Assess whether it accurately represents frequency/probability
- Determine if it might distort user perception
- Evaluate ethical implications
- Suggest improvements for balanced information presentation

Consider:
- Is the design making rare events seem common through vivid examples?
- Are recent events overemphasized without historical context?
- Do vivid examples provide appropriate context (base rates, probability)?
- Is the availability bias helping or misleading users?
- Are there accessibility implications (what's available to different users)?

Provide actionable recommendations for ethical, balanced use of availability.`,

    outputSchema: {
      type: 'object',
      properties: {
        availabilityPatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              whatsMadeAvailable: { type: 'string' },
              salience: { type: 'string' },
              accuracyAssessment: { type: 'string' },
              potentialDistortion: { type: 'string' },
              ethical: { type: 'boolean' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'whatsMadeAvailable',
              'salience',
              'ethical',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            recencyEmphasis: { type: 'number' },
            vividnessScore: { type: 'number' },
            statisticalBalance: { type: 'number' },
            ethicalScore: { type: 'number' },
          },
          required: [
            'recencyEmphasis',
            'vividnessScore',
            'statisticalBalance',
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
        'availabilityPatterns',
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
        title: 'Identify What Should Be Mentally Available',
        description:
          'Determine what information you want users to remember and consider when making decisions',
        example:
          'Goal: Make security best practices memorable so users adopt them',
        tips: [
          'Choose information that helps users make better decisions',
          'Prioritize safety-critical or high-impact information',
          'Consider what users need to remember long-term',
        ],
      },
      {
        step: 2,
        title: 'Create Concrete, Vivid Examples',
        description:
          'Develop specific, memorable examples that illustrate the concept with real names, outcomes, and narratives',
        example:
          'Instead of "Users lose data", show "Sarah lost 3 years of photos when her hard drive failed last Tuesday"',
        tips: [
          'Use real names, specific details, and concrete outcomes',
          'Include emotional elements but stay truthful',
          'Make examples relatable to your target audience',
        ],
      },
      {
        step: 3,
        title: 'Provide Statistical Context',
        description:
          'Balance vivid examples with base rate information so users calibrate their perception accurately',
        example:
          'After Sarah\'s story, add: "Hard drive failure affects 5% of drives per year—but 100% of those without backups lose everything"',
        tips: [
          'Always include frequency data alongside vivid examples',
          'Make statistics simple, concrete, and understandable',
          'Help users calibrate perceived risk to actual probability',
        ],
      },
      {
        step: 4,
        title: 'Design for Appropriate Salience',
        description:
          'Use visual hierarchy, color, and position to make important information memorable without distorting perception',
        example:
          'Use red warnings for critical errors, but pair with clear explanation and actual frequency data',
        tips: [
          'Use color and size intentionally to match actual importance',
          'Ensure salient elements genuinely deserve the attention they receive',
          'Avoid over-using high salience—it reduces effectiveness and creates anxiety',
        ],
      },
      {
        step: 5,
        title: 'Test Perception Against Reality',
        description:
          'Measure whether users\' perception of frequency and risk matches actual data after interacting with your design',
        example:
          'Survey users: "How often do you think data breaches occur?" Compare answers to actual frequency',
        tips: [
          'Ask users what they remember most after using the interface',
          'Check if memorable examples distort probability perception beyond what is helpful',
          'Adjust salience levels if perception is significantly miscalibrated',
        ],
      },
    ],

    dos: [
      'Use concrete, specific examples to make important information memorable',
      'Balance vivid examples with statistical context and base rates',
      'Make safety-critical information salient and easy to recall',
      'Use recency strategically to show relevant, current information',
      'Provide both individual examples and aggregate data',
      'Test whether memorability matches actual importance',
      'Use emotional salience ethically to help users, not manipulate them',
      'Make positive examples as available as negative ones',
    ],

    donts: [
      'Don\'t use fear-based manipulation with vivid negative examples',
      'Don\'t show only outliers without clarifying they\'re unusual',
      'Don\'t make rare events seem common through dramatic presentation',
      'Don\'t emphasize recency without historical context',
      'Don\'t use vivid examples to distort probability perception',
      'Don\'t make unimportant information salient just for engagement',
      'Don\'t rely only on examples; always include statistical data',
      'Don\'t use availability bias to advantage yourself at user expense',
    ],

    bestPractices: [
      {
        title: 'Pair Examples with Base Rates',
        description:
          'Always show both vivid examples and statistical frequency information',
        rationale:
          'Examples alone distort perception; base rates provide accurate context',
        example:
          'Customer story + "73% of customers see similar results within 90 days"',
      },
      {
        title: 'Balance Positive and Negative Examples',
        description:
          'Make both successes and failures available, not just one side',
        rationale:
          'Only showing negative examples creates fear; only positive creates unrealistic expectations',
        example:
          'Show both "John saved 15 hours/week" and "Sarah faced a learning curve but reached ROI in 3 months"',
      },
      {
        title: 'Use Recency with Historical Context',
        description:
          'Show recent data alongside trends and historical patterns to prevent recency distortion',
        rationale:
          'Recent data without context makes temporary fluctuations seem like trends',
        example:
          'Show last 24 hours activity + 30-day trend line + historical average baseline',
      },
      {
        title: 'Make Statistics Concrete and Vivid',
        description:
          'Present statistics in memorable, understandable formats rather than abstract numbers',
        rationale:
          'Abstract statistics aren\'t mentally available; concrete presentations are memorable and calibrating',
        example:
          'Instead of "5% failure rate", show "5 out of every 100 users experience this—here\'s how to avoid it"',
      },
      {
        title: 'Calibrate Salience to Actual Importance',
        description:
          'Ensure the visual prominence of information matches its actual frequency and importance',
        rationale:
          'High-salience treatment on low-frequency events makes them seem common; low-salience on critical information makes it forgettable',
        example:
          'Reserve red warning treatments for genuinely critical issues; use neutral colors for informational messages',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships - Ensure salient visual elements have semantic equivalents',
        implementation:
          'Use proper heading levels, ARIA labels, and semantic HTML so screen reader users encounter the same emphasized information',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.4.1',
        guideline:
          'Use of Color - Don\'t rely only on color for salience',
        implementation:
          'Combine color with icons, text labels, and semantic HTML to ensure all users perceive emphasized information',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.4.6',
        guideline:
          'Headings and Labels - Use clear headings for salient content',
        implementation:
          'Give important sections clear headings so all users can navigate to emphasized content',
      },
    ],

    ethics: [
      {
        concern: 'Fear Manipulation',
        severity: 'critical',
        explanation:
          'Using vivid negative examples to manipulate through fear rather than inform',
        mitigation:
          'Use memorable examples to inform, not frighten. Always provide actionable solutions and accurate probability information.',
      },
      {
        concern: 'Distorted Probability',
        severity: 'high',
        explanation:
          'Making rare events seem common through vivid examples without base rates',
        mitigation:
          'Always pair examples with frequency data. Clarify when examples are outliers rather than typical outcomes.',
      },
      {
        concern: 'Cherry-Picked Examples',
        severity: 'high',
        explanation:
          'Showing only positive or only negative examples to distort perception of typical outcomes',
        mitigation:
          'Present balanced set of examples. Disclose whether examples are selected highlights or representative of typical results.',
      },
      {
        concern: 'Recency Manipulation',
        severity: 'medium',
        explanation:
          'Overemphasizing recent unusual events to create false urgency or alarm',
        mitigation:
          'Provide historical context alongside recent data. Clarify if recent activity is typical or anomalous.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'Availability: A Heuristic for Judging Frequency and Probability',
        author: 'Tversky, A., & Kahneman, D.',
        year: 1973,
        doi: '10.1016/0010-0285(73)90033-9',
        description:
          'The foundational paper introducing the availability heuristic, demonstrating that ease of recall biases frequency and probability judgments',
        type: 'foundational',
      },
      {
        title: 'Judgment under Uncertainty: Heuristics and Biases',
        author: 'Tversky, A., & Kahneman, D.',
        year: 1974,
        doi: '10.1126/science.185.4157.1124',
        description:
          'Landmark paper covering availability alongside representativeness and anchoring heuristics',
        type: 'foundational',
      },
      {
        title: 'Ease of Retrieval as Information: Another Look at the Availability Heuristic',
        author: 'Schwarz, N., Bless, H., Strack, F., Klumpp, G., Rittenauer-Schatka, H., & Simons, A.',
        year: 1991,
        doi: '10.1037/0022-3514.61.2.195',
        description:
          'Demonstrated that the subjective experience of retrieval ease (not just content recalled) drives availability judgments',
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
          'Comprehensive coverage of availability heuristic and related biases by its co-discoverer',
        type: 'foundational',
      },
      {
        title: 'The Undoing Project',
        author: 'Lewis, Michael',
        year: 2016,
        isbn: '9780393254594',
        description:
          'Narrative account of Kahneman and Tversky\'s collaboration that produced the availability heuristic research',
        type: 'foundational',
      },
      {
        title: 'Risk Savvy: How to Make Good Decisions',
        author: 'Gigerenzer, Gerd',
        year: 2014,
        isbn: '9780143127109',
        description:
          'Practical guide to overcoming availability-driven risk misjudgments in everyday decisions',
        type: 'practical',
      },
    ],

    articles: [
      {
        title: 'The Availability Heuristic',
        author: 'Nielsen Norman Group',
        url: 'https://www.nngroup.com/articles/availability-heuristic/',
        description:
          'Practical guide to understanding and designing for the availability heuristic in user interfaces',
        type: 'practical',
      },
      {
        title: 'Availability Heuristic in UX',
        author: 'Interaction Design Foundation',
        url: 'https://www.interaction-design.org/literature/article/availability-heuristic',
        description:
          'Design-focused overview with examples of how availability heuristic affects user behavior in digital products',
        type: 'practical',
      },
    ],

    videos: [],

    demos: [],
  },

  //===========================================
  // RELATIONSHIPS
  //===========================================
  relationships: {
    complements: [
      'social-proof',       // Social proof examples become mentally available
      'recency-effect',     // Recency increases mental availability
      'von-restorff-effect', // Distinctive items are more available in memory
      'loss-aversion',      // Vivid loss examples are highly available
    ],

    conflicts: [
      'base-rate-neglect',  // Availability causes base rate neglect
    ],

    confusedWith: [
      'recency-bias',       // Recency is one component of availability
      'salience-bias',      // Salience increases availability but is a separate effect
      'vividness-effect',   // Vividness increases availability but is a separate mechanism
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
