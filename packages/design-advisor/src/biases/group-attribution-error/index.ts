/**
 * GROUP ATTRIBUTION ERROR
 *
 * We assume a group member's views reflect the entire group,
 * or that a group's decision reflects each individual member's preference.
 */

import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const groupAttributionError: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'group-attribution-error',
    name: 'Group Attribution Error',
    aliases: ['Group-Serving Bias', 'Ultimate Attribution Error'],
    category: BiasCategory.SOCIAL,
    relatedCategories: [
      BiasCategory.DECISION_MAKING,
      BiasCategory.PERCEPTION,
    ],
    tags: [
      'group-dynamics',
      'attribution',
      'social-judgment',
      'team-behavior',
      'stereotyping',
      'decision-making',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple:
      'We assume a group member\'s views reflect the entire group, or that a group decision reflects each individual member\'s preference.',

    detailed: `The Group Attribution Error is a cognitive bias in which people incorrectly assume that the characteristics or decisions of a group reflect the attitudes of each individual member, or conversely, that a single member's behavior is representative of the group as a whole.

This bias operates in two directions:
1. **Group-to-individual**: Assuming a group's collective decision (e.g., a vote, a policy) reflects what every individual in that group actually wants.
2. **Individual-to-group**: Assuming one person's behavior or opinion is representative of the entire group they belong to.

In UX and product design, this bias surfaces when users interpret aggregated ratings as universal opinion, when team collaboration tools obscure individual dissent, or when user research generalizes findings from a segment to all users within it.`,

    psychologyBasis: {
      discoveredBy: 'Scott T. Allison and David M. Messick',
      year: 1985,
      theory: 'Group Attribution Research',
      mechanism: `The brain treats groups as unified agents with coherent intentions, rather than collections of individuals with diverse views. This happens because:

1. **Entity Perception**: People perceive groups as single entities with unified goals, making it cognitively simpler to assign one attitude to all members
2. **Insufficient Individuation**: The perceiver lacks information about individual members and defaults to the group-level signal
3. **Stereotyping Shortcut**: Attributing group traits to individuals is faster than evaluating each person separately
4. **Consensus Overestimation**: When a group makes a decision, observers overestimate the degree of agreement among members
5. **Outgroup Homogeneity**: Members of other groups are perceived as more similar to each other than they actually are

The mechanism is automatic -- people default to group-level attributions unless prompted to consider individual variation.`,
    },

    realWorldExample: `A company receives a 4.2-star average rating from 10,000 reviews. A potential customer assumes "most users love this product," not realizing that the distribution may be bimodal -- many 5-star and many 1-star reviews -- with very few users actually rating it 4 stars. The group average masks significant individual disagreement.

Similarly, when a team votes 7-3 to adopt a new tool, stakeholders assume the entire team supports the decision and are surprised when three members actively resist the rollout. The group decision was attributed to all individuals equally.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `The Group Attribution Error affects how users interpret aggregated data, team decisions, community sentiment, and review summaries. Designers can address this to:

- Prevent misinterpretation of aggregated ratings and scores
- Show individual variation within group-level summaries
- Represent team decisions with appropriate nuance
- Avoid reinforcing stereotypes in user segmentation displays
- Help users make better decisions by revealing opinion distributions`,

    whenToUse: [
      {
        title: 'Review & Rating Systems',
        scenario:
          'When displaying aggregated user ratings or feedback scores',
        example:
          'Show rating distribution histograms alongside the average score so users see the spread of opinions, not just a single number',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Team Decision Displays',
        scenario: 'When showing outcomes of group votes, polls, or consensus processes',
        example:
          'Display individual vote breakdowns alongside the final decision, e.g., "Approved 7-3" rather than just "Team Approved"',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Community Representation',
        scenario: 'When representing the views or characteristics of a user community or segment',
        example:
          'Show diverse testimonials within a segment rather than a single "representative" quote to prevent overgeneralization',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'User Research Presentation',
        scenario: 'When presenting research findings about user groups or personas',
        example:
          'Highlight variance and outliers in research data, not just averages, to prevent stakeholders from treating personas as monoliths',
        impact: ImpactLevel.MEDIUM,
      },
      {
        title: 'Recommendation Engines',
        scenario: 'When using collaborative filtering or "people like you" recommendations',
        example:
          'Frame recommendations as "popular among similar users" rather than "users like you all chose this" to avoid false consensus implication',
        impact: ImpactLevel.MEDIUM,
      },
    ],

    whenToAvoid: [
      {
        title: 'Simplification for Quick Decisions',
        reason:
          'Sometimes users need a single aggregated signal to make fast, low-stakes choices',
        consequence:
          'Over-disaggregating data can create information overload for trivial decisions',
        alternative:
          'For low-stakes contexts, show the aggregate with an option to drill into distribution details',
      },
      {
        title: 'Privacy-Sensitive Contexts',
        reason:
          'Showing individual-level data within a group can expose private opinions',
        consequence:
          'Members who dissented may face social pressure or retaliation',
        alternative:
          'Show anonymized distributions or ranges without identifying individuals',
      },
      {
        title: 'Small Sample Sizes',
        reason:
          'Breaking down opinions from very small groups may not be meaningful',
        consequence:
          'Users may over-interpret individual data points as statistically significant patterns',
        alternative:
          'Indicate sample size and confidence level alongside any breakdown',
      },
      {
        title: 'Consensus-Building Contexts',
        reason:
          'In some team scenarios, highlighting dissent after a decision can undermine commitment',
        consequence:
          'Team fragmentation and reduced buy-in for agreed-upon decisions',
        alternative:
          'Show dissent during the decision process but present the outcome as a unified commitment',
      },
    ],

    commonMistakes: [
      {
        title: 'Single-Number Summaries',
        description:
          'Reducing diverse opinions to a single average score without showing distribution',
        why: 'Users assume the average represents the typical experience, missing bimodal or highly variable distributions',
        fix: 'Always pair aggregate scores with distribution visualizations (histograms, rating breakdowns)',
      },
      {
        title: 'Homogeneous Testimonial Selection',
        description:
          'Showing only testimonials from one type of user to represent an entire customer base',
        why: 'Creates a false impression that all users share the same experience and opinion',
        fix: 'Curate testimonials that represent the genuine diversity of user experiences and backgrounds',
      },
      {
        title: 'Unanimous Decision Language',
        description:
          'Using language like "the team decided" or "users agree" when the decision was not unanimous',
        why: 'Masks legitimate disagreement and makes dissenters feel unheard',
        fix: 'Use precise language: "the team voted 8-2 in favor" or "78% of users preferred option A"',
      },
      {
        title: 'Segment-as-Individual Personas',
        description:
          'Treating user segments as if every member has identical needs and behaviors',
        why: 'Leads to design decisions that serve the modal user but fail edge cases within the segment',
        fix: 'Include variance ranges and minority sub-patterns within persona descriptions',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.HIGH,
        description:
          'Layout determines whether individual variation is visible or hidden behind aggregates',
        examples: [
          'Rating distribution bars alongside star averages reveal opinion spread',
          'Vote breakdown panels next to decision summaries show dissent',
          'Expandable sections let users drill from group summary to individual detail',
          'Side-by-side individual vs. group views prevent attribution errors',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Typography hierarchy can either emphasize the aggregate or reveal the individual',
        examples: [
          'Large bold averages with small-text distributions reinforce group attribution',
          'Equal visual weight on score and distribution encourages nuanced reading',
          'Labeling like "Average of 10,000 reviews" contextualizes the aggregate',
          'Minority opinion callouts in distinct type prevent erasure',
        ],
      },
      color: {
        level: ImpactLevel.MEDIUM,
        description:
          'Color can distinguish individual variation from group-level data',
        examples: [
          'Gradient fills in rating bars show distribution density',
          'Distinct colors for agree/disagree/neutral in vote breakdowns',
          'Heatmaps showing opinion variance across a user segment',
          'Color-coded diversity indicators in testimonial sections',
        ],
      },
      interaction: {
        level: ImpactLevel.HIGH,
        description:
          'Interactions that allow drilling into group data help users see individual variation',
        examples: [
          'Clicking an average score reveals the full rating distribution',
          'Hovering over a team decision shows individual votes',
          'Filtering reviews by rating level lets users read minority opinions',
          'Toggle between "group summary" and "individual breakdown" views',
        ],
      },
      content: {
        level: ImpactLevel.CRITICAL,
        description:
          'Content framing determines whether users attribute group data to individuals',
        examples: [
          '"4.2 average across diverse opinions" vs. "users love this product"',
          'Showing range of experiences rather than a single representative story',
          'Explicit disclaimers like "individual results vary significantly"',
          'Balanced testimonials representing different user experiences within a segment',
        ],
      },
      accessibility: {
        level: ImpactLevel.MEDIUM,
        description:
          'Accessible designs must convey both group and individual data to all users',
        examples: [
          'Screen reader text that describes distribution, not just the average',
          'Alt text for rating charts that includes variance information',
          'Keyboard-accessible drill-down from group summary to individual data',
          'ARIA labels distinguishing "group average" from "individual rating"',
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
        title: 'Rating Distribution Alongside Average',
        description:
          'Product review section showing both the average rating and the full distribution of scores',
        code: `<div class="review-summary">
  <div class="average-score">
    <span class="score">4.2</span>
    <span class="stars">★★★★☆</span>
    <span class="count">Based on 10,247 reviews</span>
  </div>
  <div class="distribution">
    <div class="bar"><span class="label">5★</span><div class="fill" style="width:45%"></div><span>45%</span></div>
    <div class="bar"><span class="label">4★</span><div class="fill" style="width:20%"></div><span>20%</span></div>
    <div class="bar"><span class="label">3★</span><div class="fill" style="width:10%"></div><span>10%</span></div>
    <div class="bar"><span class="label">2★</span><div class="fill" style="width:8%"></div><span>8%</span></div>
    <div class="bar"><span class="label">1★</span><div class="fill" style="width:17%"></div><span>17%</span></div>
  </div>
  <p class="note">Opinions vary — click any bar to read reviews at that rating.</p>
</div>`,
        explanation:
          'The distribution histogram reveals that this 4.2-star product actually has a bimodal pattern: many 5-star and many 1-star reviews. Users can see that the "average" does not represent the typical experience and can explore minority opinions.',
        principle:
          'Showing distribution alongside aggregates prevents group attribution error by revealing individual variation',
        metrics: {
          before: '62% of users said the average score "represents most users"',
          after: '28% said the same after seeing distribution — 89% found distribution helpful',
          improvement: '55% reduction in false consensus assumption',
        },
      },
      {
        title: 'Team Vote Breakdown',
        description:
          'Decision log showing how individual team members voted, not just the outcome',
        code: `<div class="decision-card">
  <h3>Feature Priority: Dark Mode</h3>
  <div class="outcome">
    <span class="status approved">Approved</span>
    <span class="vote-count">7 of 10 voted in favor</span>
  </div>
  <details>
    <summary>View individual votes</summary>
    <ul class="votes">
      <li class="vote-for">Sarah — In favor: "High user demand"</li>
      <li class="vote-for">James — In favor: "Reduces eye strain"</li>
      <li class="vote-against">Priya — Against: "Maintenance burden outweighs benefit"</li>
      <li class="vote-against">Carlos — Against: "Accessibility contrast issues"</li>
      <li class="vote-against">Lin — Against: "Should prioritize performance first"</li>
    </ul>
  </details>
  <p class="context">Dissenting concerns will be addressed in implementation plan.</p>
</div>`,
        explanation:
          'Instead of just "Team Approved Dark Mode," this shows the 7-3 split and surfaces dissenting rationale. Stakeholders understand the decision was not unanimous and can anticipate implementation challenges raised by dissenters.',
        principle:
          'Revealing individual positions within group decisions prevents false consensus attribution',
      },
      {
        title: 'Diverse Testimonials Within a Segment',
        description:
          'Customer testimonials showing varied experiences within the same user segment',
        code: `<section class="testimonials">
  <h2>What Small Business Owners Say</h2>
  <p class="segment-note">Our SMB customers have diverse experiences — here's a representative sample:</p>

  <article class="testimonial positive">
    <blockquote>"Cut our invoicing time by 80%. Game-changer for my 5-person team."</blockquote>
    <cite>— Maria, Bakery Owner, using since 2024</cite>
  </article>

  <article class="testimonial mixed">
    <blockquote>"Great for invoicing, but the reporting features don't fit our restaurant workflows."</blockquote>
    <cite>— David, Restaurant Owner, using since 2023</cite>
  </article>

  <article class="testimonial positive">
    <blockquote>"Onboarding was rough, but support helped us through. Now we can't imagine going back."</blockquote>
    <cite>— Aisha, Salon Owner, using since 2024</cite>
  </article>

  <p class="summary">NPS across SMB segment: 42 (range: -20 to +80 by sub-industry)</p>
</section>`,
        explanation:
          'Instead of one glowing testimonial implying all small businesses love the product, this shows genuine variation: positive, mixed, and initially-negative-turned-positive experiences. The NPS range further communicates within-segment diversity.',
        principle:
          'Representing diverse individual experiences prevents group attribution by showing that segments are not monolithic',
      },
    ],

    bad: [
      {
        title: 'Single Average Masking Disagreement',
        description:
          'Showing only an average rating with no distribution information',
        code: `<!-- DON'T DO THIS -->
<div class="review-summary">
  <span class="big-score">4.2 ★</span>
  <p>Our users love this product!</p>
  <button>Read reviews</button>
</div>`,
        explanation:
          'The 4.2 average with "users love this product" implies universal satisfaction. In reality, 17% of users gave 1 star. The aggregate masks significant dissatisfaction and misleads potential customers.',
        principle:
          'Single-number summaries invite group attribution error by hiding individual variation',
      },
      {
        title: 'Unanimous Decision Framing',
        description:
          'Presenting a majority decision as if it were unanimous',
        code: `<!-- DON'T DO THIS -->
<div class="team-update">
  <h3>Team Decision</h3>
  <p>The engineering team has decided to migrate to Kubernetes.</p>
  <p>Everyone is aligned and excited about this direction!</p>
</div>`,
        explanation:
          'If the vote was 6-4, saying "the team decided" and "everyone is aligned" erases 40% of the team who disagreed. Those members feel dismissed, and stakeholders are blindsided when resistance emerges during implementation.',
        principle:
          'Framing non-unanimous decisions as unanimous creates false consensus and erodes trust',
      },
      {
        title: 'Monolithic Segment Representation',
        description:
          'Using one testimonial to represent an entire user segment',
        code: `<!-- DON'T DO THIS -->
<section class="enterprise-users">
  <h2>What Enterprise Customers Think</h2>
  <blockquote>
    "This tool transformed our entire organization's workflow.
    Every department uses it daily."
    <cite>— VP of Operations, Fortune 500 Company</cite>
  </blockquote>
  <p>Trusted by 500+ enterprise customers.</p>
</section>`,
        explanation:
          'One enthusiastic VP does not represent all 500 enterprise customers. Some may use the tool reluctantly, partially, or only for specific tasks. This framing invites readers to attribute one individual\'s enthusiasm to the entire customer base.',
        principle:
          'Never let a single voice represent an entire group — it invites attribution error',
      },
    ],

    realWorld: [
      {
        company: 'Amazon',
        product: 'Product Reviews',
        description: 'Amazon shows rating distribution histograms alongside average star ratings. Users can click any bar to filter reviews by that rating, making minority opinions accessible and preventing the average from masking disagreement.',
        effectiveness: 'very-effective',
        analysis: 'The distribution bars directly counter group attribution error by showing that a 4.0 average could mean very different things depending on the spread. Users make more informed purchase decisions.',
      },
      {
        company: 'Wikipedia',
        product: 'Talk Pages & Edit History',
        description: 'Wikipedia articles appear as consensus, but Talk pages reveal fierce individual disagreements. Edit history shows how the "group product" is actually the result of individual contributions and conflicts.',
        effectiveness: 'effective',
        analysis: 'By making individual contributions and disagreements transparent (even if most users never visit Talk pages), Wikipedia avoids presenting articles as monolithic group opinions.',
      },
      {
        company: 'Glassdoor',
        product: 'Company Reviews',
        description: 'Glassdoor shows overall company ratings but also breaks them down by department, role, and tenure. Pros and cons are listed separately, preventing the overall score from representing all employees equally.',
        effectiveness: 'effective',
        analysis: 'Disaggregation by role and department helps job seekers avoid assuming the company experience is uniform across all positions.',
      },
      {
        company: 'Slack',
        product: 'Emoji Reactions & Polls',
        description: 'Slack allows individual emoji reactions on messages, showing exactly who reacted and how. Polls display individual vote counts. This makes it clear when "the team" agrees vs. when a few vocal members set the tone.',
        effectiveness: 'effective',
        analysis: 'Individual attribution on reactions prevents observers from assuming silence equals agreement, a common group attribution failure in team communication tools.',
      },
    ],

    abTests: [
      {
        title: 'Rating Display: Average Only vs. Distribution',
        hypothesis:
          'Showing rating distributions alongside averages will improve purchase confidence and reduce returns',
        controlVersion: {
          description:
            'Product page showing only "4.2 stars from 10,247 reviews" with a single star widget',
          metrics: {
            conversionRate: '5.1%',
            returnRate: '12.3%',
            perceivedValue: '7.2/10',
          },
        },
        treatmentVersion: {
          description:
            'Product page showing 4.2-star average alongside a rating distribution histogram with clickable bars to filter reviews',
          metrics: {
            conversionRate: '5.4%',
            returnRate: '8.1%',
            perceivedValue: '7.8/10',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'While conversion rate improved only slightly (+6%), the return rate dropped by 34%. Users who saw the distribution had more accurate expectations. Post-purchase surveys showed users felt "well informed" at 2x the rate of the control group.',
          learnings: [
            'Distribution displays reduce group attribution error, leading to more accurate expectations',
            'Users who see bimodal distributions spend more time reading negative reviews, resulting in better purchase fit',
            'The slight conversion dip for polarizing products was offset by dramatically lower return rates',
            'Power users and high-intent buyers strongly preferred the distribution view',
          ],
        },
      },
      {
        title: 'Team Decisions: Unanimous vs. Vote Breakdown',
        hypothesis:
          'Showing vote breakdowns for team decisions will improve implementation success',
        controlVersion: {
          description:
            'Decision log entry: "The product team has decided to deprecate the legacy API."',
          metrics: {
            implementationDelay: '3.2 weeks average',
            teamSatisfaction: '6.1/10',
          },
        },
        treatmentVersion: {
          description:
            'Decision log entry: "Legacy API deprecation approved 8-2. Dissenting concerns: migration support timeline, partner impact. Action items added for both."',
          metrics: {
            implementationDelay: '1.8 weeks average',
            teamSatisfaction: '7.9/10',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Surfacing individual votes and dissenting concerns led to 44% faster implementation. Teams addressed objections proactively rather than encountering unexpected resistance. Satisfaction improved because dissenters felt heard.',
          learnings: [
            'Acknowledging dissent upfront prevents it from surfacing as resistance later',
            'Stakeholders plan better when they know the decision was not unanimous',
            'Dissenters reported higher satisfaction even though their position did not prevail',
            'Transparency about vote splits increased overall trust in the decision process',
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
        name: 'Aggregate-Only Displays',
        description:
          'Single numbers (averages, scores, percentages) representing group opinions without distribution data',
        howToSpot:
          'Look for standalone average scores, single NPS numbers, or "X% of users" without breakdowns',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Unanimous Decision Language',
        description:
          'Phrases like "the team decided," "users agree," or "our customers love" implying full consensus',
        howToSpot:
          'Look for collective nouns treated as single agents: "the team," "our users," "the market"',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Single-Voice Representation',
        description:
          'One testimonial, quote, or example used to represent an entire user group or segment',
        howToSpot:
          'Look for a single customer story labeled as representative of a segment (e.g., "What enterprise customers say")',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Homogeneous Group Portrayal',
        description:
          'Visual or content treatment showing a group as uniform in opinion or behavior',
        howToSpot:
          'Check for stock imagery of uniform groups, identical persona cards, or "all users want" language',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Missing Minority Opinions',
        description:
          'Review or feedback displays that filter out or de-emphasize dissenting views',
        howToSpot:
          'Check if negative reviews are hidden by default, if filtering defaults to "most helpful" (often positive), or if dissent is absent',
        severity: ImpactLevel.HIGH,
      },
    ],

    patterns: [
      {
        name: 'Aggregate Masking Pattern',
        description:
          'Group-level summary hides meaningful variation among individuals',
        indicators: [
          'Single average score without distribution',
          'NPS displayed without promoter/detractor breakdown',
          'Team velocity shown without individual contribution variance',
          '"Overall satisfaction: 85%" without segment differences',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'False Consensus Pattern',
        description:
          'Group decisions or outcomes presented as if all members agreed',
        indicators: [
          '"The team decided" without vote counts',
          '"Users prefer" without showing preference distribution',
          'Policy changes attributed to "the company" without decision-maker identification',
          'Roadmap items marked "team priority" without individual input visibility',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Segment Monolith Pattern',
        description:
          'An entire user segment treated as if all members share the same needs and preferences',
        indicators: [
          'Persona cards with no variance ranges',
          '"Enterprise customers need X" without acknowledging sub-segments',
          'One testimonial standing for an entire demographic',
          'Recommendation engines assuming segment-level preferences apply to all individuals',
        ],
        severity: ImpactLevel.MEDIUM,
        confidence: 'medium',
      },
      {
        name: 'Outgroup Homogeneity Pattern',
        description:
          'Groups the user does not belong to are portrayed as more uniform than they are',
        indicators: [
          'Competitor users described with a single characterization',
          'Demographic segments described with stereotypical attributes',
          '"Millennials want," "Boomers prefer," "Developers think" generalizations',
          'Political or cultural groups described as monolithic in marketing copy',
        ],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
    ],

    checklistQuestions: [
      'Are aggregated scores shown without distribution or variance information?',
      'Does the language imply unanimous agreement where there was actually a majority decision?',
      'Is a single individual\'s view being used to represent an entire group?',
      'Are user segments treated as monolithic, or is within-segment variation acknowledged?',
      'Can users drill into group-level data to see individual-level detail?',
      'Are dissenting or minority opinions accessible, or are they hidden?',
      'Does the design acknowledge that group decisions may not reflect individual preferences?',
      'Are testimonials diverse enough to represent the actual range of user experiences?',
      'Is "the team" or "our users" used as a subject when individual attribution would be more accurate?',
      'Are outgroups (competitors\' users, other segments) described with more nuance than stereotypes?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in the group attribution error.

Analyze the provided design for group attribution error patterns. Identify:

1. **Aggregate Masking**: Places where group-level summaries hide meaningful individual variation
2. **False Consensus**: Language or displays implying unanimous agreement where decisions were actually divided
3. **Segment Monolith**: User groups treated as if all members share identical preferences or experiences
4. **Outgroup Homogeneity**: Groups the user does not belong to portrayed as more uniform than they are
5. **Missing Dissent**: Minority opinions or dissenting views that are hidden, filtered, or de-emphasized

For each pattern found:
- Identify what individual variation is being masked
- Assess whether the group-level representation is misleading
- Determine the impact on user decision-making
- Evaluate whether dissent or diversity is accessible
- Suggest improvements for balanced representation

Consider:
- Do aggregated scores provide distribution information?
- Are team or group decisions shown with vote breakdowns?
- Do testimonials represent genuine diversity of experience?
- Can users access minority opinions and dissenting views?
- Is within-segment variation acknowledged in research and personas?

Provide actionable recommendations for revealing individual variation within group data.`,

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
              groupRepresented: { type: 'string' },
              individualVariationMasked: { type: 'string' },
              severity: { type: 'string' },
              misleading: { type: 'boolean' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'groupRepresented',
              'severity',
              'misleading',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            aggregateMaskingScore: { type: 'number' },
            falseConsensusScore: { type: 'number' },
            diversityRepresentation: { type: 'number' },
            dissentAccessibility: { type: 'number' },
          },
          required: [
            'aggregateMaskingScore',
            'falseConsensusScore',
            'diversityRepresentation',
            'dissentAccessibility',
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
        title: 'Audit Group-Level Representations',
        description:
          'Identify every place in your interface where a group is represented by a single metric, quote, or decision',
        example:
          'Map all aggregate scores, team decision logs, segment descriptions, and testimonial sections',
        tips: [
          'Check ratings, NPS scores, satisfaction metrics, and team decisions',
          'Look for collective nouns used as decision-makers ("the team," "our users")',
          'Identify testimonials that claim to represent segments',
        ],
      },
      {
        step: 2,
        title: 'Add Distribution Data',
        description:
          'For every aggregate metric, provide distribution or variance information',
        example:
          'Add a rating histogram next to every average star rating; show vote splits for every team decision',
        tips: [
          'Rating distributions (histograms or bar charts) are the most impactful addition',
          'For team decisions, show vote counts and key dissenting rationales',
          'For NPS, show promoter/passive/detractor breakdowns',
        ],
      },
      {
        step: 3,
        title: 'Diversify Representation',
        description:
          'Ensure testimonials, examples, and case studies represent genuine within-group variation',
        example:
          'Show 3-5 testimonials per segment with different sentiment levels and use cases',
        tips: [
          'Include positive, mixed, and critical voices from each segment',
          'Show different use cases and outcomes within the same group',
          'Add explicit notes about within-segment diversity',
        ],
      },
      {
        step: 4,
        title: 'Make Individual Data Accessible',
        description:
          'Provide drill-down paths from group summaries to individual detail',
        example:
          'Make rating bars clickable to filter reviews; add "View individual votes" expandable sections',
        tips: [
          'Progressive disclosure: show aggregate first, individual on interaction',
          'Allow filtering and sorting to surface minority views',
          'Ensure drill-down paths are keyboard accessible',
        ],
      },
      {
        step: 5,
        title: 'Use Precise Language',
        description:
          'Replace collective attributions with precise language that acknowledges variation',
        example:
          'Change "users love this feature" to "78% of users rated this feature 4+ stars"',
        tips: [
          'Avoid "the team decided" — use "the team voted 7-3 in favor"',
          'Avoid "customers say" — use "in a survey of 500 customers, 62% reported..."',
          'Always quantify when making group-level claims',
        ],
      },
    ],

    dos: [
      'Show rating distributions alongside average scores',
      'Display vote breakdowns for team and group decisions',
      'Include diverse testimonials representing within-group variation',
      'Use precise language: "72% of users" instead of "users agree"',
      'Provide drill-down from group summaries to individual-level data',
      'Acknowledge dissent and minority opinions explicitly',
      'Show variance ranges in persona and segment descriptions',
      'Label aggregates with sample sizes and confidence levels',
    ],

    donts: [
      'Don\'t let a single average score stand for all users\' experiences',
      'Don\'t present majority decisions as unanimous consensus',
      'Don\'t use one testimonial to represent an entire user segment',
      'Don\'t describe user segments as monolithic ("developers want X")',
      'Don\'t hide or filter out minority opinions by default',
      'Don\'t use collective nouns as decision-makers without showing who actually decided',
      'Don\'t generalize from one group member\'s behavior to the entire group',
      'Don\'t treat outgroups as more homogeneous than ingroups',
    ],

    bestPractices: [
      {
        title: 'Distribution-First Display',
        description:
          'Always show data distributions before or alongside aggregate numbers',
        rationale:
          'Distributions reveal the shape of opinion, preventing users from assuming the average is universal',
        example:
          'Rating histogram with clickable bars, shown at the same visual level as the average star count',
      },
      {
        title: 'Decision Transparency',
        description:
          'Document and display the vote breakdown for every significant group decision',
        rationale:
          'Transparency about dissent improves implementation outcomes and builds trust',
        example:
          'Decision cards showing "Approved 7-3" with expandable dissenting rationales and action items',
      },
      {
        title: 'Within-Segment Variance',
        description:
          'Always communicate that user segments contain individuals with diverse needs',
        rationale:
          'Personas that feel monolithic lead to designs that serve the average user but fail many',
        example:
          'Persona cards with "Typical range" indicators showing how behaviors vary within the segment',
      },
      {
        title: 'Minority Opinion Access',
        description:
          'Design review and feedback systems to make minority opinions easy to find',
        rationale:
          'Minority opinions often contain the most actionable feedback for product improvement',
        example:
          'Filter controls that let users view 1-star reviews, dissenting votes, or edge-case use reports',
      },
      {
        title: 'Precise Attribution Language',
        description:
          'Use quantified, specific language instead of collective generalizations',
        rationale:
          'Precise language forces accuracy and prevents readers from assuming false consensus',
        example:
          '"78% of surveyed users (n=2,400) preferred dark mode" instead of "users want dark mode"',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '1.1.1',
        guideline:
          'Non-text Content - Provide text alternatives for distribution charts and visualizations',
        implementation:
          'Add descriptive alt text for rating histograms that includes the distribution shape, not just the average. E.g., "Rating distribution: 45% five-star, 17% one-star, bimodal pattern"',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships - Programmatically convey both group and individual data relationships',
        implementation:
          'Use proper table markup or ARIA to convey that distribution data relates to the aggregate score. Screen readers should encounter both the average and the spread.',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.1.1',
        guideline:
          'Keyboard - Ensure drill-down from aggregate to individual data is keyboard accessible',
        implementation:
          'Make distribution bars, vote breakdowns, and "view individual data" controls focusable and operable with keyboard.',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.4.6',
        guideline:
          'Headings and Labels - Clearly label group-level vs. individual-level data',
        implementation:
          'Use distinct headings like "Overall Rating" and "Rating Distribution" to help users understand which data represents the group and which shows individual variation.',
      },
    ],

    ethics: [
      {
        concern: 'False Consensus Manufacturing',
        severity: 'critical',
        explanation:
          'Deliberately hiding dissent or minority opinions to create an appearance of unanimous agreement',
        mitigation:
          'Always show vote breakdowns for decisions. Never filter out negative feedback by default. Make dissenting views equally accessible.',
      },
      {
        concern: 'Stereotype Reinforcement',
        severity: 'high',
        explanation:
          'Using group attribution error to reinforce stereotypes about user segments, demographics, or communities',
        mitigation:
          'Show within-group variation. Avoid describing segments with single characterizations. Include diverse voices from every group.',
      },
      {
        concern: 'Selective Testimonial Curation',
        severity: 'high',
        explanation:
          'Cherry-picking testimonials that all share one sentiment, creating a false impression of universal experience',
        mitigation:
          'Curate testimonials representing the genuine distribution of experiences, including mixed and critical voices.',
      },
      {
        concern: 'Dissent Suppression',
        severity: 'critical',
        explanation:
          'Designing systems that make it socially costly or practically difficult to express minority opinions',
        mitigation:
          'Support anonymous feedback. Show that dissent is valued by surfacing dissenting concerns alongside decisions. Protect minority voice visibility.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'The Group Attribution Error',
        author: 'Allison, S. T., & Messick, D. M.',
        year: 1985,
        doi: '10.1016/0022-1031(85)90025-3',
        description:
          'The foundational paper identifying and naming the group attribution error, demonstrating that people attribute group decisions to individual members\' attitudes',
        type: 'foundational',
      },
      {
        title: 'Group Attribution and the Illusory Correlation',
        author: 'Allison, S. T., & Messick, D. M.',
        year: 1987,
        description:
          'Follow-up research exploring how group attribution interacts with illusory correlations in social judgment',
        type: 'advanced',
      },
      {
        title: 'The Ultimate Attribution Error: Extending Allport\'s Cognitive Analysis of Prejudice',
        author: 'Pettigrew, T. F.',
        year: 1979,
        doi: '10.1177/014616727900500307',
        description:
          'Explores how group-level attributions extend into systematic prejudice and intergroup perception biases',
        type: 'foundational',
      },
      {
        title: 'Out-Group Homogeneity Effects in Natural and Minimal Groups',
        author: 'Judd, C. M., & Park, B.',
        year: 1988,
        description:
          'Research on how people perceive outgroups as more homogeneous than ingroups, a key mechanism in group attribution error',
        type: 'advanced',
      },
    ],

    books: [
      {
        title: 'Social Psychology',
        author: 'Aronson, Elliot',
        year: 2018,
        isbn: '9780134641287',
        description:
          'Comprehensive coverage of group attribution, outgroup homogeneity, and intergroup perception biases',
        type: 'foundational',
      },
      {
        title: 'Thinking, Fast and Slow',
        author: 'Kahneman, Daniel',
        year: 2011,
        isbn: '9780374275631',
        description:
          'Covers attribution biases including group-level reasoning errors within the broader heuristics framework',
        type: 'foundational',
      },
      {
        title: 'The Art of Thinking Clearly',
        author: 'Dobelli, Rolf',
        year: 2013,
        isbn: '9780062219695',
        description:
          'Accessible exploration of group attribution and related cognitive biases with practical examples',
        type: 'practical',
      },
    ],

    articles: [
      {
        title: 'Why We Assume Groups Are Unanimous',
        author: 'Psychology Today',
        url: 'https://www.psychologytoday.com/us/basics/group-dynamics',
        description:
          'Accessible overview of group attribution error and its effects on everyday judgment',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'Group Attribution Error Explained',
        author: 'Practical Psychology',
        url: 'https://www.youtube.com/results?search_query=group+attribution+error',
        description:
          'Video explanations of how group-level judgments distort perceptions of individual members',
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
      'outgroup-homogeneity-bias', // Perceiving outgroups as more uniform reinforces group attribution
      'fundamental-attribution-error', // Individual-level counterpart to group-level attribution
      'false-consensus-effect', // Overestimating how much others agree with the group position
      'stereotyping', // Group-level trait attribution is the mechanism behind stereotyping
    ],

    conflicts: [
      'individuation', // Focusing on individual traits reduces group attribution
      'perspective-taking', // Considering individual viewpoints counteracts group generalization
    ],

    confusedWith: [
      'fundamental-attribution-error', // Individual attribution vs. group attribution
      'false-consensus-effect', // Assuming others agree with you vs. assuming group = individual
      'outgroup-homogeneity-bias', // Related but focuses specifically on outgroups
    ],

    hierarchy: {
      parent: 'attribution-bias',
      children: [
        'outgroup-homogeneity-bias',
        'ultimate-attribution-error',
      ],
    },
  },
};
