/**
 * ULTIMATE ATTRIBUTION ERROR
 *
 * We attribute out-group negative behavior to disposition and positive to situation
 */


import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const ultimateAttributionError: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'ultimate-attribution-error',
    name: 'Ultimate Attribution Error',
    aliases: [],
    category: BiasCategory.SOCIAL,
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
    simple: 'We attribute out-group negative behavior to disposition and positive to situation',

    detailed: `The ultimate attribution error is a group-level extension of the fundamental attribution error. When members of an outgroup behave negatively, observers attribute it to inherent group characteristics ("they're all like that"). When outgroup members behave positively, observers dismiss it as luck, special circumstances, or an exception to the rule.

The reverse pattern applies to the ingroup: positive behaviors are attributed to inherent group qualities, while negative behaviors are explained away as situational. This asymmetric attribution pattern reinforces stereotypes and intergroup prejudice.

In product design, this bias affects content moderation systems, review platforms, hiring tools, community features, recommendation algorithms, and social media. Designers must actively counteract this bias to prevent platforms from amplifying group-based stereotypes and discrimination.`,

    psychologyBasis: {
      discoveredBy: 'Thomas Pettigrew',
      year: 1979,
      theory: 'Intergroup Attribution Theory',
      mechanism: `The ultimate attribution error extends the fundamental attribution error from individuals to groups. This happens because:

1. **Dispositional Attribution for Outgroup Negatives**: Negative behaviors by outgroup members are attributed to inherent, stable group characteristics ("that's just how they are")
2. **Situational Dismissal of Outgroup Positives**: Positive behaviors by outgroup members are explained away as luck, exceptional circumstances, high motivation, or being "one of the good ones"
3. **Ingroup Favoritism Reversal**: The pattern reverses for ingroup members — positive behavior is seen as inherent, negative behavior as situational
4. **Stereotype Reinforcement Loop**: Each attribution strengthens existing stereotypes, making future biased attributions more likely
5. **Category Salience**: When group membership is made salient, attribution errors intensify because individuals are seen as representatives of their group rather than as individuals`,
    },

    realWorldExample: `When a hiring manager reviews candidates, they may unconsciously attribute a strong portfolio from an underrepresented candidate to "diversity programs" or "luck" (situational), while attributing the same quality work from an ingroup candidate to "talent" and "dedication" (dispositional). Conversely, a weak interview from an outgroup candidate confirms stereotypes (dispositional), while the same performance from an ingroup candidate is dismissed as "having a bad day" (situational).`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `The ultimate attribution error affects how users perceive, evaluate, and interact with other users and content across group lines in digital platforms. Designers must consider how their systems may amplify or mitigate group-based attribution biases:

- Content moderation systems that profile users by group membership rather than individual behavior
- Review and rating systems that aggregate feedback in ways that reinforce group stereotypes
- Hiring platforms that fail to blind reviewers to group-identifying information
- Community features that label, sort, or surface users by group affiliation
- Recommendation algorithms that cluster users by demographic rather than behavior
- Social media feeds that amplify outgroup negativity and ingroup positivity`,

    whenToUse: [
      {
        title: 'Blind Review Systems',
        scenario:
          'When designing evaluation, hiring, or assessment platforms',
        example:
          'Remove group-identifying information (name, photo, school, location) during initial review stages to force evaluation on individual merit',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Balanced Contributor Profiles',
        scenario: 'When displaying user profiles in review or community platforms',
        example:
          'Show individual contribution history, context, and track record rather than group-level labels or affiliations',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Individualized Content Moderation',
        scenario: 'When building moderation or trust & safety systems',
        example:
          'Evaluate each piece of content and each user action individually with full context, rather than applying group-level risk profiles',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Contextual Attribution Prompts',
        scenario: 'When users are rating, reviewing, or evaluating others',
        example:
          'Prompt reviewers to consider situational factors: "What circumstances might have contributed to this outcome?"',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Cross-Group Interaction Design',
        scenario: 'When designing community or collaboration features',
        example:
          'Surface shared interests and goals between users rather than group differences to reduce category salience',
        impact: ImpactLevel.MEDIUM,
      },
    ],

    whenToAvoid: [
      {
        title: 'Group-Based Risk Scoring',
        reason:
          'Profiling users by demographic or group membership bakes attribution error into the system',
        consequence:
          'Systematically unfair treatment of outgroup members, legal liability, discriminatory outcomes',
        alternative:
          'Use individual behavioral signals and per-user history for trust and safety assessments',
      },
      {
        title: 'Stereotype-Reinforcing Aggregations',
        reason:
          'Aggregating reviews, ratings, or feedback by group membership amplifies biased attributions',
        consequence:
          'Platform becomes a vehicle for confirming and spreading group stereotypes',
        alternative:
          'Aggregate and display feedback at the individual level with contextual detail',
      },
      {
        title: 'Group Labels in Competitive Contexts',
        reason:
          'Making group membership salient in competitive or evaluative contexts intensifies attribution errors',
        consequence:
          'Outgroup members are judged more harshly, ingroup members receive unearned advantages',
        alternative:
          'De-emphasize group identity in evaluative contexts; highlight individual qualifications and actions',
      },
      {
        title: 'Automated Categorization by Demographics',
        reason:
          'Algorithms that cluster or recommend based on demographic grouping perpetuate attribution errors at scale',
        consequence:
          'Algorithmic discrimination, filter bubbles, and reinforcement of prejudice',
        alternative:
          'Use interest-based, behavior-based, or preference-based signals for personalization',
      },
    ],

    commonMistakes: [
      {
        title: 'Surfacing Group Membership Unnecessarily',
        description:
          'Displaying nationality, ethnicity, gender, or other group identifiers in contexts where they are irrelevant to the task',
        why: 'Making group identity salient triggers categorical thinking and attribution errors',
        fix: 'Only display group-identifying information when it is directly relevant and requested by the user',
      },
      {
        title: 'Aggregate Ratings by Group',
        description:
          'Allowing or displaying ratings, reviews, or trust scores aggregated by neighborhood, country, or demographic group',
        why: 'Group-level aggregations invite dispositional attributions for negative outcomes ("that whole group is untrustworthy")',
        fix: 'Always attribute ratings and feedback to individual users and specific interactions',
      },
      {
        title: 'Uncontextualized Negative Reports',
        description:
          'Displaying incident reports or complaints without situational context',
        why: 'Without context, viewers default to dispositional attributions, especially for outgroup members',
        fix: 'Require and display contextual information alongside any negative report or flag',
      },
      {
        title: 'One-Size-Fits-All Moderation Rules',
        description:
          'Applying identical moderation thresholds without accounting for context, language differences, or cultural norms',
        why: 'Disproportionately flags outgroup communication styles, reinforcing the perception that outgroup members are "problematic"',
        fix: 'Develop culturally aware moderation that considers context, intent, and linguistic diversity',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.HIGH,
        description:
          'Layout determines whether group identity or individual identity is most prominent',
        examples: [
          'Profiles that lead with group affiliations prime categorical thinking',
          'Placing individual achievements and context above group labels reduces attribution error',
          'Side-by-side comparisons that highlight group differences trigger intergroup bias',
          'Layout that emphasizes shared attributes across groups reduces category salience',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Text emphasis can amplify or reduce the salience of group identity',
        examples: [
          'Bold group labels in headers make group membership highly salient',
          'De-emphasizing group identifiers in small, secondary text reduces priming',
          'Using individual names prominently over group descriptors shifts attribution to individuals',
          'Consistent typography across groups prevents visual "othering"',
        ],
      },
      color: {
        level: ImpactLevel.MEDIUM,
        description:
          'Color coding by group creates visual ingroup/outgroup boundaries',
        examples: [
          'Color-coding users by group membership reinforces categorical thinking',
          'Neutral, consistent color treatment across all users reduces group salience',
          'Using color to highlight individual actions rather than group identity shifts focus',
          'Warm vs cool color assignments for different groups can convey implicit hierarchy',
        ],
      },
      interaction: {
        level: ImpactLevel.CRITICAL,
        description:
          'Interaction patterns determine whether users evaluate others as individuals or group representatives',
        examples: [
          'Filtering or sorting by demographic group invites group-level attribution',
          'Interaction flows that reveal group identity before individual merit trigger the bias',
          'Blind evaluation workflows force individual assessment',
          'Prompts asking "what circumstances contributed?" interrupt automatic dispositional attribution',
        ],
      },
      content: {
        level: ImpactLevel.CRITICAL,
        description:
          'Content framing determines whether users attribute behavior to individuals or groups',
        examples: [
          'Headlines like "Members of X group did Y" trigger group dispositional attribution',
          'Individual stories with situational context reduce attribution error',
          'Content that highlights within-group variability breaks stereotypic attributions',
          'Balanced reporting showing similar behaviors across groups normalizes individual variation',
        ],
      },
      accessibility: {
        level: ImpactLevel.HIGH,
        description:
          'Accessible design must avoid making group identity the primary organizing principle',
        examples: [
          'Screen reader navigation that announces group membership before individual identity primes bias',
          'ARIA labels should prioritize individual attributes over group labels',
          'Reading order should present individual qualifications before group affiliations',
          'Alt text for profile images should focus on individual context, not group stereotypes',
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
        title: 'Balanced Contributor Profiles with Context',
        description:
          'Community platform showing individual contribution history and context alongside reviews',
        code: `<div class="contributor-profile">
  <div class="individual-identity">
    <h3>Maria R.</h3>
    <p class="tagline">Host since 2019 · 47 stays · 4.8 avg rating</p>
  </div>

  <div class="track-record">
    <h4>Recent Activity</h4>
    <div class="review-item">
      <p class="review-text">"Wonderful stay, very attentive host"</p>
      <p class="context">Weekend getaway · Family of 4 · July 2025</p>
    </div>
    <div class="review-item">
      <p class="review-text">"Late check-in was inconvenient"</p>
      <p class="context">Guest arrived 3 hours early · Holiday weekend · Dec 2024</p>
    </div>
  </div>

  <div class="response-context">
    <p class="host-response">Maria responded: "I was at work during the early arrival but arranged a lockbox. I've since updated my listing with flexible check-in options."</p>
  </div>
</div>`,
        explanation:
          'Each review includes situational context so viewers evaluate the individual and their specific circumstances rather than making group-level attributions. The host response provides further context.',
        principle:
          'Contextual, individual-level information interrupts dispositional group attribution',
        metrics: {
          before: '38% of hosts from underrepresented groups had lower booking rates despite equal ratings',
          after: '12% gap after adding contextual profiles — 68% reduction in disparity',
          improvement: '68% reduction in booking rate disparity across groups',
        },
      },
      {
        title: 'Blind Review Hiring Platform',
        description:
          'Hiring tool that removes group-identifying information during initial screening',
        code: `<div class="candidate-review blind-mode">
  <div class="candidate-header">
    <h3>Candidate #2847</h3>
    <span class="badge">Skills Match: 92%</span>
  </div>

  <div class="qualifications">
    <h4>Experience</h4>
    <ul>
      <li>5 years frontend development</li>
      <li>Led team of 8 on enterprise SaaS product</li>
      <li>Reduced page load time by 60%</li>
    </ul>
  </div>

  <div class="work-sample">
    <h4>Code Review Score</h4>
    <div class="score">87/100</div>
    <p class="note">Evaluated by 3 independent reviewers</p>
  </div>

  <div class="evaluation-prompt">
    <label>Your Assessment</label>
    <p class="guidance">Evaluate based on demonstrated skills, experience relevance, and work sample quality.</p>
    <textarea placeholder="What specific qualifications make this candidate strong or weak for this role?"></textarea>
  </div>
</div>`,
        explanation:
          'By removing name, photo, school, and location, the platform forces reviewers to evaluate individual qualifications rather than triggering group-level attribution patterns.',
        principle:
          'Removing group cues eliminates the precondition for ultimate attribution error',
        metrics: {
          before: 'Underrepresented candidates advanced past screening at 22% vs 41% for majority candidates',
          after: 'Advancement rates equalized to 34% vs 37% after blinding',
          improvement: '73% reduction in screening disparity',
        },
      },
      {
        title: 'Contextualized Content Moderation',
        description:
          'Moderation system that evaluates individual content with full context rather than user profiles',
        code: `<div class="moderation-queue">
  <div class="content-item">
    <div class="content-body">
      <p class="flagged-text">"This policy is completely broken and hurts everyone in our district"</p>
    </div>

    <div class="context-panel">
      <h4>Context</h4>
      <p><strong>Thread:</strong> Local policy discussion about school zoning changes</p>
      <p><strong>Tone analysis:</strong> Frustrated but not hostile · No personal attacks</p>
      <p><strong>User history:</strong> 142 posts · 2 prior flags (both overturned) · Active contributor for 3 years</p>
    </div>

    <div class="moderation-guidance">
      <p class="reminder">Evaluate this specific content in its context. Consider tone, intent, and the discussion topic.</p>
    </div>

    <div class="actions">
      <button class="approve">Approve — Protected Speech</button>
      <button class="escalate">Escalate for Review</button>
      <button class="remove">Remove — Violates Policy</button>
    </div>
  </div>
</div>`,
        explanation:
          'The moderation interface presents individual content with rich context, user history, and explicit reminders to evaluate the specific content rather than making assumptions based on the user\'s identity or group.',
        principle:
          'Individual-level evaluation with context prevents group-based profiling in moderation',
      },
    ],

    bad: [
      {
        title: 'Rating Systems That Amplify Group Stereotypes',
        description:
          'Neighborhood reporting app that aggregates incident reports by area demographics',
        code: `<!-- DON'T DO THIS -->
<div class="neighborhood-report">
  <h3>Safety Report: Eastside District</h3>
  <div class="demographic-label">
    <span class="tag">Predominantly Group X</span>
  </div>
  <div class="incidents">
    <p class="stat danger">47 incidents reported this month</p>
    <p class="stat warning">Crime rate: 3.2x city average</p>
  </div>
  <div class="user-reviews">
    <p>"I never feel safe walking there" — verified resident</p>
    <p>"Avoid this area at night" — visitor</p>
  </div>
</div>`,
        explanation:
          'Labeling neighborhoods by demographic composition alongside crime statistics invites users to make dispositional attributions about the group ("they make the area dangerous") rather than considering systemic, economic, or situational factors.',
        principle:
          'Never pair group demographic labels with negative aggregate statistics',
      },
      {
        title: 'Community Features That Label by Group Membership',
        description:
          'Forum that prominently badges users by country, ethnicity, or other group identifiers in every post',
        code: `<!-- DON'T DO THIS -->
<div class="forum-post">
  <div class="user-badge">
    <img src="flag.png" alt="Country flag">
    <span class="username">User_7291</span>
    <span class="group-badge prominent">Region: Southeast Asia</span>
    <span class="trust-score low">Trust Score: 2.1/5</span>
  </div>
  <div class="post-content">
    <p>I disagree with the proposed changes because...</p>
  </div>
</div>`,
        explanation:
          'Making group identity the most prominent element in every interaction primes readers to evaluate the post through a group lens rather than on its content merits. Low trust scores paired with group badges compound the attribution error.',
        principle:
          'Making group identity salient in evaluative contexts triggers dispositional attribution',
      },
      {
        title: 'Content Moderation That Profiles by Group',
        description:
          'Automated moderation system that applies stricter thresholds based on user demographics',
        code: `<!-- DON'T DO THIS -->
<div class="moderation-config">
  <h3>Auto-Moderation Rules</h3>
  <div class="rule">
    <p><strong>New users from Region A:</strong></p>
    <p>Flag threshold: 1 report → auto-suspend</p>
  </div>
  <div class="rule">
    <p><strong>Established users from Region B:</strong></p>
    <p>Flag threshold: 5 reports → manual review</p>
  </div>
  <p class="note">Based on historical group violation rates</p>
</div>`,
        explanation:
          'Applying different moderation rules based on demographic grouping codifies the ultimate attribution error into the system. New members of "high risk" groups are treated as guilty by association, while established ingroup members receive the benefit of the doubt.',
        principle:
          'Algorithmic group profiling institutionalizes attribution error at scale',
      },
    ],

    realWorld: [
      {
        company: 'Glassdoor',
        product: 'Company Reviews',
        description: 'Glassdoor aggregates employee reviews by company but individual reviewers are anonymized. However, when reviews cluster around themes like "culture fit," they can reflect ultimate attribution error — attributing problems to types of people rather than systemic issues. Glassdoor has added structured review categories to encourage specific, situational feedback.',
        effectiveness: 'effective',
        analysis: 'Structured review prompts reduce vague dispositional language. However, anonymous reviews can still carry group-level attributions without accountability.',
      },
      {
        company: 'Nextdoor',
        product: 'Neighborhood Reporting',
        description: 'Nextdoor initially allowed "suspicious activity" reports that frequently included racial descriptions, leading to racial profiling amplified by ultimate attribution error. After backlash, Nextdoor removed the ability to include race in descriptions and added friction requiring specific behavioral descriptions rather than group characteristics.',
        effectiveness: 'effective',
        analysis: 'Removing group identifiers and requiring behavioral descriptions directly addresses the ultimate attribution error by forcing users to describe individual actions rather than group membership.',
      },
      {
        company: 'LinkedIn',
        product: 'Hiring Tools',
        description: 'LinkedIn has experimented with hiding profile photos and names during candidate screening to reduce bias. Research showed that when reviewers could see demographic cues, they attributed identical qualifications differently depending on perceived group membership — the hallmark of ultimate attribution error.',
        effectiveness: 'effective',
        analysis: 'Blind screening directly counteracts ultimate attribution error by removing the group cues that trigger asymmetric attribution patterns.',
      },
      {
        company: 'Reddit',
        product: 'Subreddit Culture and Moderation',
        description: 'Reddit subreddits can develop strong ingroup identities that lead to ultimate attribution error: outgroup posts are immediately attributed to trolling or bad faith (dispositional), while identical ingroup posts are read charitably (situational). Some subreddits have adopted rules requiring charitable interpretation of all posts.',
        effectiveness: 'somewhat-effective',
        analysis: 'Community norms requiring charitable interpretation address the bias at the social layer, but enforcement is inconsistent and the platform architecture still promotes ingroup/outgroup dynamics.',
      },
    ],

    abTests: [
      {
        title: 'Blind vs Non-Blind Candidate Review',
        hypothesis:
          'Removing group-identifying information will equalize evaluation scores across demographic groups',
        controlVersion: {
          description:
            'Standard candidate profiles with name, photo, university, and location visible during review',
          metrics: {
            conversionRate: '41% advancement for majority group, 22% for underrepresented groups',
            timeOnPage: '1:45 average review time',
            scrollDepth: '60%',
          },
        },
        treatmentVersion: {
          description:
            'Blind candidate profiles showing only skills, experience, and anonymized work samples — no name, photo, school, or location',
          metrics: {
            conversionRate: '37% advancement for majority group, 34% for underrepresented groups',
            timeOnPage: '2:30 average review time',
            scrollDepth: '85%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Blinding reduced the advancement gap from 19 percentage points to 3 points. Reviewers spent 48% more time evaluating qualifications when group cues were absent, suggesting they defaulted to individual assessment rather than group-based shortcuts.',
          learnings: [
            'Group cues trigger fast, biased attributions — removing them forces deliberate evaluation',
            'Reviewers engaged more deeply with actual qualifications when group identity was hidden',
            'The effect was strongest for reviewers with limited cross-group contact',
            'Combining blind review with structured rubrics further reduced disparity',
          ],
        },
      },
      {
        title: 'Contextualized vs Bare Incident Reports',
        hypothesis:
          'Adding situational context to incident reports will reduce group-level attributions in user responses',
        controlVersion: {
          description:
            'Neighborhood incident reports showing: event description, location, and reporter demographic tags',
          metrics: {
            conversionRate: '62% of comments contained group-level language',
            clickThroughRate: '45% flagged as potentially discriminatory',
          },
        },
        treatmentVersion: {
          description:
            'Incident reports showing: specific behavioral description, situational context (time, weather, event), and a prompt asking "What circumstances might explain this?"',
          metrics: {
            conversionRate: '23% of comments contained group-level language',
            clickThroughRate: '12% flagged as potentially discriminatory',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Adding situational context and attribution prompts reduced group-level language by 63% and discriminatory flags by 73%. Users shifted from "those people always..." to specific, behavioral descriptions.',
          learnings: [
            'Situational context prompts interrupt automatic dispositional attribution',
            'Removing demographic tags eliminates the trigger for group-level thinking',
            'Structured reporting templates that require behavioral descriptions reduce bias',
            'The effect was durable — users who experienced the contextual format carried the habit forward',
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
        name: 'Group Identity Labels',
        description: 'Prominent display of demographic, geographic, or group membership badges on user profiles or content',
        howToSpot: 'Look for country flags, group badges, demographic labels, or region tags displayed prominently alongside user content or reviews',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Asymmetric Trust Indicators',
        description: 'Different trust, verification, or reputation indicators applied disproportionately across user groups',
        howToSpot: 'Check whether trust scores, verification badges, or reputation indicators correlate with group membership rather than individual behavior',
        severity: ImpactLevel.CRITICAL,
      },
      {
        name: 'Group-Level Aggregations',
        description: 'Statistics, ratings, or incident counts aggregated and displayed by demographic group or geographic region with demographic labels',
        howToSpot: 'Look for charts, statistics, or reports that pair negative metrics with group demographic information',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Missing Situational Context',
        description: 'Negative reports, reviews, or flags presented without contextual information about circumstances',
        howToSpot: 'Check whether incident reports, reviews, or flags include situational details or only dispositional descriptions',
        severity: ImpactLevel.MEDIUM,
      },
    ],

    patterns: [
      {
        name: 'Group Profiling Pattern',
        description: 'System applies different rules, thresholds, or treatment based on group membership rather than individual behavior',
        indicators: ['Different moderation thresholds by demographic', 'Group-based risk scoring', 'Automated categorization by demographic signals', 'Different verification requirements by group'],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Salient Identity Pattern',
        description: 'Group identity is made the most prominent feature in evaluative or social contexts',
        indicators: ['Large group badges on profiles', 'Group membership in post headers', 'Demographic filters in search/browse', 'Color-coded group markers'],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Decontextualized Reporting Pattern',
        description: 'Negative events or behaviors are reported without situational context, inviting dispositional attribution',
        indicators: ['Incident reports without context fields', 'Reviews without structured prompts', 'Complaint systems that only capture "what" not "why"', 'Aggregate negative stats without situational breakdown'],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Ingroup Favoritism Pattern',
        description: 'Platform features or defaults that systematically advantage established or majority group members',
        indicators: ['Longer grace periods for established users', 'Benefit-of-doubt moderation for ingroup', 'Legacy features that advantage early adopters', 'Community norms that favor dominant communication styles'],
        severity: ImpactLevel.MEDIUM,
        confidence: 'medium',
      },
    ],

    checklistQuestions: [
      'Is group membership visible during evaluative tasks (hiring, reviewing, rating)?',
      'Are trust or reputation scores correlated with demographic group rather than individual behavior?',
      'Do moderation rules apply equally regardless of user group membership?',
      'Are negative reports presented with sufficient situational context?',
      'Do aggregate statistics pair demographic labels with positive or negative outcomes?',
      'Are users prompted to consider situational factors when evaluating others?',
      'Does the system allow or encourage filtering, sorting, or grouping by demographic?',
      'Are there different verification, onboarding, or trust thresholds for different groups?',
      'Does the platform design make group identity more salient than individual identity?',
      'Have we tested for disparate outcomes across demographic groups in moderation, ratings, and advancement?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in the ultimate attribution error and intergroup bias.

Analyze the provided design for ultimate attribution error patterns. Identify:

1. **Group Identity Salience**: How prominently group membership is displayed in profiles, posts, and interactions
2. **Attribution Asymmetry**: Whether the system treats positive and negative behaviors differently based on group membership
3. **Contextual Information**: Whether situational context is available when users evaluate others
4. **Moderation Equity**: Whether content moderation rules and enforcement apply equally across groups
5. **Aggregation Patterns**: Whether statistics or metrics are aggregated in ways that reinforce group stereotypes

For each pattern found:
- Identify how it might trigger or amplify group-level attribution errors
- Assess whether group identity is made unnecessarily salient
- Determine if situational context is sufficient to prevent dispositional attribution
- Evaluate whether the system applies rules equitably across groups
- Suggest specific design changes to reduce attribution error

Consider:
- Does the design force individual-level evaluation or allow group-level shortcuts?
- Are there blind review or anonymization opportunities?
- Do reporting and moderation tools require situational context?
- Are recommendation algorithms clustering by demographics rather than behavior?
- Have disparate outcomes been measured across groups?

Provide actionable recommendations for reducing ultimate attribution error in the design.`,

    outputSchema: {
      type: 'object',
      properties: {
        attributionPatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              groupSalience: { type: 'string' },
              attributionRisk: { type: 'string' },
              contextAvailable: { type: 'boolean' },
              equityAssessment: { type: 'string' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'groupSalience',
              'attributionRisk',
              'contextAvailable',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            groupSalienceScore: { type: 'number' },
            contextualInformationScore: { type: 'number' },
            moderationEquityScore: { type: 'number' },
            ethicalScore: { type: 'number' },
          },
          required: [
            'groupSalienceScore',
            'contextualInformationScore',
            'moderationEquityScore',
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
        'attributionPatterns',
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
        title: 'Audit Group Identity Salience',
        description:
          'Map every place in your product where group membership (demographic, geographic, organizational) is displayed or inferred',
        example:
          'Catalog all profile badges, flags, location labels, and demographic indicators across the product',
        tips: [
          'Include both explicit labels and implicit cues (names, photos, schools)',
          'Check automated systems that may infer group membership',
          'Review search, filter, and sort options for demographic grouping',
        ],
      },
      {
        step: 2,
        title: 'Implement Blind Evaluation Where Possible',
        description:
          'Remove group-identifying information from contexts where users evaluate, rate, or judge others',
        example:
          'In a hiring platform, hide candidate name, photo, and school during initial resume screening',
        tips: [
          'Blind evaluation is most impactful during first impressions and initial screening',
          'Use candidate numbers or anonymized identifiers',
          'Reveal identity only after merit-based evaluation is recorded',
        ],
      },
      {
        step: 3,
        title: 'Add Situational Context to Reports and Reviews',
        description:
          'Require and display contextual information alongside any evaluation, report, or review',
        example:
          'Incident reports must include: specific behavior observed, time, location, circumstances, and a prompt asking "What situational factors might have contributed?"',
        tips: [
          'Structured forms with required context fields are more effective than free-text',
          'Displaying context alongside negative reports interrupts automatic dispositional attribution',
          'Prompt users explicitly to consider situational explanations',
        ],
      },
      {
        step: 4,
        title: 'Ensure Moderation and Trust Equity',
        description:
          'Audit moderation rules and trust systems for disparate impact across demographic groups',
        example:
          'Compare moderation action rates, appeal success rates, and trust scores across groups to identify disparities',
        tips: [
          'Run regular disparity audits on moderation outcomes',
          'Ensure thresholds and rules are based on individual behavior, not group statistics',
          'Provide equal appeal processes and benefit-of-the-doubt across all groups',
        ],
      },
      {
        step: 5,
        title: 'Test for Disparate Outcomes',
        description:
          'Measure whether your platform produces different outcomes for equivalent behavior across demographic groups',
        example:
          'Create matched profiles across groups with identical qualifications and measure response rates, ratings, and advancement',
        tips: [
          'Use audit studies with matched profiles to detect bias',
          'Monitor key metrics disaggregated by group over time',
          'Set equity targets and track progress',
        ],
      },
    ],

    dos: [
      'Implement blind review in evaluative contexts to remove group cues',
      'Require situational context in all reporting and review systems',
      'Audit moderation and trust systems for disparate impact across groups',
      'Surface individual track records rather than group-level statistics',
      'Prompt users to consider situational factors when evaluating others',
      'Design for individual identity salience over group identity salience',
      'Use structured evaluation rubrics that focus on specific behaviors and qualifications',
      'Run regular equity audits with matched-profile testing',
    ],

    donts: [
      'Don\'t display demographic group labels in evaluative or competitive contexts',
      'Don\'t aggregate negative statistics by demographic group',
      'Don\'t apply different moderation thresholds based on group membership',
      'Don\'t use group-level historical data to profile individual users',
      'Don\'t make group identity the most prominent element in user profiles',
      'Don\'t allow filtering or sorting by demographic in evaluative contexts',
      'Don\'t present negative reports without situational context',
      'Don\'t assume group-level patterns apply to individual group members',
    ],

    bestPractices: [
      {
        title: 'Blind-First, Reveal-Later',
        description:
          'Hide group-identifying information during initial evaluation, reveal only after merit assessment is recorded',
        rationale:
          'First impressions drive attribution patterns — removing group cues during this critical window prevents the bias from activating',
        example:
          'Hiring platform shows anonymized profiles for screening, reveals identity only at interview stage after written evaluation is locked',
      },
      {
        title: 'Structured Context Requirements',
        description:
          'Replace free-text reporting with structured forms that require specific behavioral descriptions and situational context',
        rationale:
          'Unstructured reporting invites vague dispositional language; structured forms force specific, behavioral descriptions',
        example:
          'Incident report requires: "Describe the specific behavior" + "What was happening at the time?" + "What outcome did you observe?"',
      },
      {
        title: 'Individual Attribution Design',
        description:
          'Always attribute ratings, reviews, and trust scores to individual users and specific interactions, never to groups',
        rationale:
          'Group-level aggregation invites dispositional attribution to the group; individual-level attribution keeps evaluation fair',
        example:
          'Show "Maria: 4.8 stars across 47 stays" rather than "Hosts from Region X: 3.9 average"',
      },
      {
        title: 'Cross-Group Commonality Surfacing',
        description:
          'Actively surface shared interests, goals, and experiences between users from different groups',
        rationale:
          'Highlighting commonalities reduces category salience and promotes individual-level perception',
        example:
          'Community platform shows "You and this user both follow: JavaScript, Hiking, Film Photography" rather than demographic differences',
      },
      {
        title: 'Regular Equity Audits',
        description:
          'Run quarterly disparity audits on all evaluative, moderation, and trust systems',
        rationale:
          'Attribution errors compound over time — regular measurement catches drift before it becomes systemic',
        example:
          'Compare moderation action rates, average ratings, and advancement rates across demographic groups with matched-behavior controls',
      },
    ],

    accessibility: [{
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships - Ensure group identity is not the primary organizing semantic',
        implementation:
          'Use semantic HTML that prioritizes individual identity and qualifications over group membership. Heading structure should lead with individual attributes.',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.3.2',
        guideline:
          'Meaningful Sequence - Present individual qualifications before group affiliations in reading order',
        implementation:
          'DOM order should place individual name, track record, and qualifications before any group labels so screen readers encounter individual identity first.',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.4.6',
        guideline:
          'Headings and Labels - Use headings that emphasize individual identity over group',
        implementation:
          'Profile headings should use individual names and roles, not group membership. Avoid heading text like "Group X Members" in evaluative contexts.',
      },
    ],

    ethics: [
      {
        concern: 'Algorithmic Group Profiling',
        severity: 'critical',
        explanation:
          'Using group membership as a signal in automated risk scoring, moderation, or recommendation systems institutionalizes the ultimate attribution error at scale',
        mitigation:
          'Base all automated decisions on individual behavioral history. Audit algorithms for disparate impact. Remove demographic features from model inputs.',
      },
      {
        concern: 'Stereotype Amplification',
        severity: 'critical',
        explanation:
          'Platforms that aggregate and display negative outcomes by group create feedback loops that amplify existing stereotypes',
        mitigation:
          'Never aggregate negative statistics by demographic group. Display individual-level data with context. Monitor for and interrupt stereotype-amplifying patterns.',
      },
      {
        concern: 'Unequal Moderation',
        severity: 'high',
        explanation:
          'Moderation systems that apply different standards based on perceived group membership perpetuate discrimination',
        mitigation:
          'Apply identical moderation rules and thresholds regardless of group membership. Audit outcomes for equity. Provide equal appeal processes.',
      },
      {
        concern: 'Dehumanization Through Categorization',
        severity: 'high',
        explanation:
          'Reducing individuals to their group membership strips them of individuality and makes dispositional attribution more likely',
        mitigation:
          'Design for individual identity. Show personal history, context, and nuance. Avoid designs that treat users primarily as members of categories.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'The Ultimate Attribution Error: Extending Allport\'s Cognitive Analysis of Prejudice',
        author: 'Pettigrew, T. F.',
        year: 1979,
        doi: '10.1177/014616727900500407',
        description:
          'The foundational paper introducing the ultimate attribution error as a group-level extension of fundamental attribution error',
        type: 'foundational',
      },
      {
        title: 'Causal Attribution and the Perception of Social Events',
        author: 'Hewstone, M.',
        year: 1990,
        description:
          'Comprehensive review of intergroup attribution research extending Pettigrew\'s framework with experimental evidence',
        type: 'advanced',
      },
      {
        title: 'Intergroup Attributions: An Integrative Review',
        author: 'Hewstone, M., & Ward, C.',
        year: 1985,
        description:
          'Cross-cultural evidence for the ultimate attribution error in intergroup contexts across multiple societies',
        type: 'advanced',
      },
      {
        title: 'The Nature of Prejudice',
        author: 'Allport, G. W.',
        year: 1954,
        description:
          'The foundational work on prejudice that established the theoretical basis Pettigrew later extended',
        type: 'foundational',
      },
    ],

    books: [
      {
        title: 'The Nature of Prejudice',
        author: 'Allport, Gordon W.',
        year: 1954,
        isbn: '9780201001792',
        description:
          'Classic text on prejudice and intergroup relations that provides the theoretical foundation for the ultimate attribution error',
        type: 'foundational',
      },
      {
        title: 'Social Psychology',
        author: 'Aronson, Elliot',
        year: 2018,
        isbn: '9780134641287',
        description:
          'Comprehensive coverage of attribution theory, intergroup bias, and the ultimate attribution error with modern research',
        type: 'practical',
      },
    ],

    articles: [
      {
        title: 'Racial Bias in Algorithmic Decision Making',
        author: 'ProPublica',
        url: 'https://www.propublica.org/article/machine-bias-risk-assessments-in-criminal-sentencing',
        description:
          'Investigation into how algorithmic systems can institutionalize group-level attribution errors at scale',
        type: 'practical',
      },
      {
        title: 'Designing Against Discrimination',
        author: 'Edelman, B., Luca, M., & Svirsky, D.',
        url: 'https://hbr.org/2017/02/how-airbnb-is-trying-to-fight-discrimination',
        description:
          'How platform design choices can amplify or reduce intergroup bias in sharing economy platforms',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'The Psychology of Prejudice and Discrimination',
        author: 'Crash Course Psychology',
        url: 'https://www.youtube.com/watch?v=7P0iP2Zm6a4',
        description:
          'Accessible overview of attribution errors in intergroup contexts',
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
