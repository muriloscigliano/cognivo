/**
 * CONJUNCTION FALLACY
 *
 * We think specific conditions are more probable than general ones
 */


import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const conjunctionFallacy: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'conjunction-fallacy',
    name: 'Conjunction Fallacy',
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
    simple: 'We think specific conditions are more probable than general ones',

    detailed: `The Conjunction Fallacy is a cognitive bias where people judge the probability of two events occurring together (a conjunction) as more likely than either event alone. This directly violates the laws of probability — a specific scenario can never be more probable than any of its individual components.

The classic demonstration is the "Linda problem" by Tversky and Kahneman (1983). Participants were told Linda is 31, single, outspoken, and deeply concerned with social justice. When asked which is more probable — (A) Linda is a bank teller, or (B) Linda is a bank teller and active in the feminist movement — most chose (B), even though (B) is a strict subset of (A) and therefore cannot be more probable.

In UX and product design, this bias manifests whenever adding specific detail to a description, scenario, or offer makes it feel more believable, plausible, or attractive — even when the added specificity actually reduces the objective probability. Designers can leverage this by crafting specific, narrative-rich descriptions that resonate with users' mental models, while staying mindful that specificity can also mislead.`,

    psychologyBasis: {
      discoveredBy: 'Various Researchers',
      year: 1970,
      theory: 'Cognitive Bias Research',
      mechanism: `The brain judges probability by representativeness rather than by logical set inclusion. This happens because:

1. **Representativeness Heuristic**: A detailed scenario that "sounds like" a person or situation feels more probable, even when the added detail mathematically reduces likelihood
2. **Narrative Coherence**: Specific, story-like descriptions activate causal reasoning — the mind builds a plausible narrative and confuses coherence with probability
3. **Prototype Matching**: People compare scenarios against mental prototypes; the more details match the prototype, the more probable it seems
4. **Neglect of Extension**: People fail to recognize that a conjunction (A AND B) is always a subset of either component (A alone or B alone), ignoring the basic extension rule of probability
5. **Detail as Evidence**: Additional specific details feel like supporting evidence, creating an illusion of increased likelihood when they actually constrain the probability space`,
    },

    realWorldExample: `In the famous "Linda problem," Tversky and Kahneman described Linda as a 31-year-old, single, outspoken philosophy major concerned with social justice. When asked to rank probabilities, 85% of participants rated "Linda is a bank teller and is active in the feminist movement" as more likely than "Linda is a bank teller" — a logical impossibility. The rich, specific description made the conjunction feel more representative of Linda, overriding basic probability logic.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `The Conjunction Fallacy affects how users evaluate the believability of product descriptions, scenarios, and value propositions. More specific and detailed claims feel more credible than general ones, even when the specificity adds no real evidence. Designers can leverage this to:

- Craft product descriptions that feel more believable through specific, concrete details
- Build more compelling user personas by adding rich, specific attributes
- Frame feature bundles so the combination feels more valuable than individual features
- Communicate scenarios and use cases with enough detail to feel realistic and relatable
- Write marketing copy where specific claims resonate more deeply than vague promises`,

    whenToUse: [
      {
        title: 'Product Descriptions',
        scenario:
          'When writing copy for products, features, or services',
        example:
          'Instead of "Great for teams," write "Built for 5–15 person design teams collaborating on Figma files across time zones"',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'User Persona Communication',
        scenario: 'When presenting user personas or ideal customer profiles to stakeholders',
        example:
          'A detailed persona ("Sara, 34, product manager at a Series B startup who juggles 3 squads") feels more believable and actionable than "mid-career PM"',
        impact: ImpactLevel.MEDIUM,
      },
      {
        title: 'Feature Bundle Framing',
        scenario: 'When presenting feature bundles or plan comparisons',
        example:
          'Describe the Pro plan as "Unlimited dashboards + real-time alerts + Slack integration for fast-moving ops teams" rather than just listing features',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Use Case Scenarios',
        scenario: 'When onboarding users or explaining what a product can do',
        example:
          'Show a specific scenario: "Import your Q3 pipeline CSV → auto-generate a forecast chart → share with your VP in one click" instead of "Powerful analytics tools"',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Testimonial Specificity',
        scenario: 'When displaying social proof and customer quotes',
        example:
          '"We cut onboarding time from 3 weeks to 4 days for our 200-person engineering org" is far more compelling than "Saved us time"',
        impact: ImpactLevel.CRITICAL,
      },
    ],

    whenToAvoid: [
      {
        title: 'Risk Communication',
        reason:
          'Specific risk scenarios feel more probable than they are, potentially distorting users\' actual risk assessment',
        consequence:
          'Users may overestimate the likelihood of a detailed negative scenario and make fear-driven decisions',
        alternative:
          'Present risk information with base rates and objective probabilities, not just vivid scenarios',
      },
      {
        title: 'Medical or Legal Contexts',
        reason:
          'Detailed medical or legal scenarios trigger conjunction fallacy, causing patients or users to misjudge probabilities',
        consequence:
          'Patients might believe a specific diagnosis is more likely just because the description is more detailed',
        alternative:
          'Use plain language with explicit probability data; separate narrative from statistical information',
      },
      {
        title: 'Misleading Specificity in Advertising',
        reason:
          'Adding false or unverifiable specific details to make claims feel more credible is deceptive',
        consequence:
          'Erodes trust when users discover the specifics were fabricated or cherry-picked',
        alternative:
          'Use real, verifiable details. Specificity should come from actual data, not invention',
      },
      {
        title: 'Data-Driven Decision Interfaces',
        reason:
          'Detailed scenarios in analytics dashboards can lead users to overweight specific patterns over base rates',
        consequence:
          'Analysts might pursue a highly specific but improbable hypothesis over more likely general explanations',
        alternative:
          'Present data with statistical context and confidence intervals, not just narrative scenarios',
      },
    ],

    commonMistakes: [
      {
        title: 'Vague Value Propositions',
        description:
          'Using generic language like "powerful," "flexible," or "best-in-class" without specific details',
        why: 'Generic claims lack the narrative specificity that triggers believability — users mentally dismiss them as marketing fluff',
        fix: 'Replace vague adjectives with specific, concrete details: who, how many, what outcome, in what timeframe',
      },
      {
        title: 'Over-Specifying to the Point of Exclusion',
        description:
          'Making descriptions so specific that they only resonate with a tiny audience',
        why: 'Conjunction fallacy increases believability but the specifics must match the reader\'s prototype to work',
        fix: 'Use details that are specific enough to feel real but broad enough to match your target audience\'s self-image',
      },
      {
        title: 'Fabricating Specifics',
        description:
          'Inventing detailed scenarios or statistics to exploit the bias',
        why: 'Users trust specific claims more, so fabricated details feel more credible — but discovery of falsehood causes severe trust damage',
        fix: 'Source all specific claims from real data, customer interviews, or documented use cases',
      },
      {
        title: 'Ignoring the Bias in User Research',
        description:
          'Presenting detailed scenarios in surveys or interviews without realizing respondents rate them as more probable',
        why: 'Conjunction fallacy affects research participants too — detailed hypothetical scenarios get inflated probability ratings',
        fix: 'When testing scenarios with users, include both specific and general versions to calibrate for the bias',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.MEDIUM,
        description:
          'Layout affects whether users encounter specific details or general summaries first',
        examples: [
          'Detailed scenario cards feel more credible than single-line bullet points',
          'Expanding sections that reveal specifics increase perceived plausibility',
          'Side-by-side comparisons with detailed vs. generic descriptions highlight the bias',
          'Progressive disclosure of details can build narrative coherence',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Typographic hierarchy affects how specific details are perceived and retained',
        examples: [
          'Pull quotes with specific metrics feel more believable than generic headlines',
          'Small, detailed body text alongside bold claims adds credibility through specificity',
          'Numbered lists with concrete details feel more evidence-based',
          'Italic context lines (e.g., "Based on 2,847 teams") anchor specificity',
        ],
      },
      color: {
        level: ImpactLevel.LOW,
        description:
          'Color plays a minor role in conjunction fallacy compared to content specificity',
        examples: [
          'Highlight colors on specific data points draw attention to concrete details',
          'Muted tones on generic claims and bright tones on specific claims reinforce the bias',
          'Color-coded categories make specific feature combinations feel more cohesive',
          'Badge colors on specific plan attributes add visual weight to detailed descriptions',
        ],
      },
      interaction: {
        level: ImpactLevel.HIGH,
        description:
          'Interactive elements that reveal specific details amplify the conjunction fallacy effect',
        examples: [
          'Hover tooltips showing specific use cases make features feel more relevant',
          'Interactive calculators with specific inputs produce outputs that feel highly credible',
          'Configurators that let users build specific bundles increase perceived value of the combination',
          'Scenario walkthroughs with specific steps feel more achievable than feature lists',
        ],
      },
      content: {
        level: ImpactLevel.CRITICAL,
        description:
          'Content specificity is the primary driver of conjunction fallacy in interfaces',
        examples: [
          'Specific customer quotes with names, roles, and metrics outperform generic testimonials',
          'Detailed use case scenarios feel more probable and achievable than abstract benefits',
          'Feature descriptions with specific numbers ("up to 12 integrations") beat vague promises ("many integrations")',
          'Persona-driven copy ("Built for ops managers who...") resonates more than generic positioning',
        ],
      },
      accessibility: {
        level: ImpactLevel.MEDIUM,
        description:
          'Specific details must be equally available to all users regardless of access method',
        examples: [
          'Screen reader users should encounter the same specific details, not just generic summaries',
          'Alt text on infographics should include the specific data points, not just "chart showing results"',
          'ARIA descriptions on interactive elements should convey specific scenario details',
          'Keyboard-navigable tooltips must expose the same specific content as hover states',
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
        title: 'Specific Product Description Over Generic Claims',
        description:
          'SaaS landing page using specific, scenario-rich copy instead of vague benefits',
        code: `<section class="value-prop">
  <h2>Built for Growing Engineering Teams</h2>

  <div class="scenario-card">
    <h3>Before</h3>
    <p class="generic">A powerful project management tool for teams.</p>
  </div>

  <div class="scenario-card highlighted">
    <h3>After (Conjunction Fallacy Applied)</h3>
    <p class="specific">
      Built for 10–50 person engineering teams shipping weekly,
      who need to track sprint velocity across 3+ squads
      while keeping their VP of Engineering updated with
      auto-generated status reports every Friday at 5pm.
    </p>
  </div>

  <p class="note">
    The specific version feels more believable and relevant,
    even though it describes a narrower (less probable) scenario.
  </p>
</section>`,
        explanation:
          'The detailed description triggers conjunction fallacy — readers who match even part of the profile find the entire product more credible because the specificity creates narrative coherence.',
        principle:
          'Specific, scenario-rich descriptions feel more probable and credible than general claims',
        metrics: {
          before: '2.1% click-through rate with generic value proposition',
          after: '4.7% click-through rate with specific scenario copy',
          improvement: '124% increase in engagement from specificity',
        },
      },
      {
        title: 'Detailed Testimonial With Concrete Outcomes',
        description:
          'Customer testimonial with specific role, company context, and measurable results',
        code: `<article class="testimonial">
  <div class="customer-info">
    <img src="maria.jpg" alt="Maria Chen, Head of Ops at Cloudline">
    <div>
      <strong>Maria Chen</strong>
      <span>Head of Ops, Cloudline (Series B, 120 employees)</span>
    </div>
  </div>

  <blockquote>
    "We were spending 6 hours every Monday pulling data from
    Salesforce, HubSpot, and Stripe into a single pipeline report.
    Now it auto-generates by 8am and my team reviews it over coffee.
    We saved 24 hours per month — that's a full analyst's week back."
  </blockquote>

  <div class="metrics">
    <span class="metric">6 hrs → 0 hrs manual work</span>
    <span class="metric">24 hrs/month saved</span>
    <span class="metric">3 data sources unified</span>
  </div>
</article>`,
        explanation:
          'The rich detail — specific tools (Salesforce, HubSpot, Stripe), specific time (Monday morning, 8am), specific outcome (24 hours/month) — makes the testimonial feel far more believable than "Saved us a lot of time." Readers unconsciously rate the detailed scenario as more probable.',
        principle:
          'Concrete details in testimonials exploit conjunction fallacy to increase credibility',
      },
      {
        title: 'Scenario-Based Feature Walkthrough',
        description:
          'Onboarding flow using a specific, step-by-step scenario instead of abstract feature tour',
        code: `<div class="onboarding-scenario">
  <h3>See it in action: Q4 Pipeline Review</h3>

  <ol class="scenario-steps">
    <li>
      <span class="step-label">Step 1</span>
      <p>Import your Salesforce opportunities from the last 90 days</p>
      <span class="time">~10 seconds</span>
    </li>
    <li>
      <span class="step-label">Step 2</span>
      <p>Auto-categorize by deal stage, owner, and expected close date</p>
      <span class="time">Instant</span>
    </li>
    <li>
      <span class="step-label">Step 3</span>
      <p>Generate a forecast chart comparing Q3 actuals vs Q4 pipeline</p>
      <span class="time">One click</span>
    </li>
    <li>
      <span class="step-label">Step 4</span>
      <p>Share the live dashboard with your CRO before Monday's meeting</p>
      <span class="time">Share link</span>
    </li>
  </ol>

  <button class="cta-primary">Try This Scenario Now</button>
</div>`,
        explanation:
          'The specific scenario ("Q4 Pipeline Review" with Salesforce, CRO, Monday meeting) feels achievable and real. Users rate this as more likely to work for them than a generic "Import data, analyze, share" feature tour, even though the specific scenario is objectively less probable to match their exact situation.',
        principle:
          'Specific scenarios feel more achievable than abstract capabilities',
      },
    ],

    bad: [
      {
        title: 'Fabricated Specifics for Credibility',
        description:
          'Landing page inventing detailed but unverifiable claims to seem credible',
        code: `<!-- DON'T DO THIS -->
<section class="social-proof">
  <h2>Trusted by Teams Like Yours</h2>
  <div class="fake-testimonial">
    <p>"Our 47-person design team at a Fortune 500 company
    reduced review cycles from 12 days to 3 days, saving
    $340,000 annually in productivity costs."</p>
    <span class="attribution">— Senior Design Director</span>
  </div>
  <p class="disclaimer" style="color: #ccc; font-size: 0.6em;">
    *Composite testimonial based on typical results
  </p>
</section>`,
        explanation:
          'The highly specific details ($340,000, 47-person team, 12 to 3 days) trigger conjunction fallacy and feel very credible. But the tiny disclaimer reveals these are fabricated composites. When users discover this, trust is destroyed. The specificity that made it believable makes the deception feel worse.',
        principle:
          'Never fabricate specific details to exploit conjunction fallacy — the betrayal is proportional to the specificity',
      },
      {
        title: 'Over-Specific Risk Warnings',
        description:
          'Security prompt using overly detailed scary scenarios that distort risk perception',
        code: `<!-- DON'T DO THIS -->
<div class="security-warning">
  <h3>Your Account Is At Risk!</h3>
  <p>Last Tuesday, a 34-year-old marketing manager in Chicago
  had her account accessed by an attacker in Belarus who used
  her reused LinkedIn password to drain her connected Stripe
  account of $12,847 in 23 minutes while she was in a meeting.</p>
  <button class="urgent">Change Your Password NOW</button>
</div>`,
        explanation:
          'The hyper-specific scenario (age, city, attacker country, exact dollar amount, time frame) makes this particular conjunction feel extremely probable due to the fallacy. But this specific conjunction is extremely unlikely. The vivid detail distorts users\' risk assessment and creates anxiety-driven decisions rather than informed ones.',
        principle:
          'Hyper-specific threat scenarios exploit conjunction fallacy to inflate perceived risk',
      },
      {
        title: 'Misleading Specificity in Pricing',
        description:
          'Pricing page using specific but misleading comparisons',
        code: `<!-- DON'T DO THIS -->
<div class="pricing-comparison">
  <h3>Why Teams Switch</h3>
  <div class="comparison">
    <p>A typical 25-person sales team using Competitor X
    spends $2,340/month on licenses, plus $500/month on
    the integration add-on, plus 8 hours/week in manual
    data entry at $45/hour = <strong>$4,280/month total cost</strong></p>
    <p>With us: <strong>$299/month, all-in</strong></p>
  </div>
</div>`,
        explanation:
          'The specific breakdown ($2,340 + $500 + 8hrs x $45) feels highly credible due to conjunction fallacy, but the numbers are cherry-picked to represent the worst case for the competitor. The conjunction of all these costs is far less probable than any individual cost. This uses the bias to deceive.',
        principle:
          'Specific cost breakdowns feel more credible but can be manipulated to distort comparisons',
      },
    ],

    realWorld: [
      {
        company: 'Apple',
        product: 'Product Pages',
        description: 'Apple uses highly specific use case scenarios on product pages: "Shoot a 4K Cinematic mode video of your daughter\'s first steps, then edit it on the train to work." The conjunction of specific details (4K, Cinematic mode, daughter, first steps, train, commute) makes the scenario feel real and achievable, even though this exact conjunction is unlikely for most buyers.',
        effectiveness: 'very-effective',
        analysis: 'Apple\'s specificity creates aspirational but believable scenarios. Users don\'t need to match every detail — the conjunction fallacy makes the overall capability feel more credible because the specific scenario is so vivid.',
      },
      {
        company: 'Basecamp',
        product: 'Marketing Copy',
        description: 'Basecamp writes landing page copy like "Before Basecamp: scattered emails, missed deadlines, confused clients. After: Your 6-person agency ships every project on time, clients check progress themselves, and Fridays end at 4pm." The specific post-Basecamp scenario (6-person agency, on-time delivery, client self-service, early Fridays) is a conjunction that feels highly probable despite being very specific.',
        effectiveness: 'effective',
        analysis: 'The specificity creates a mental image that feels achievable. The conjunction of all these benefits is less likely than any single benefit, but the fallacy makes the total package feel more credible.',
      },
      {
        company: 'Calm',
        product: 'Insurance Product Marketing',
        description: 'Insurance companies describe specific covered scenarios in vivid detail: "If a pipe bursts in your basement on Christmas Eve, flooding your home office and destroying your work laptop..." The detailed conjunction feels common and probable, motivating purchase — even though this specific conjunction is extremely rare.',
        effectiveness: 'effective',
        analysis: 'Insurance marketing heavily exploits conjunction fallacy. Specific disaster scenarios feel more probable than general risk statements, driving policy purchases for highly specific coverage.',
      },
      {
        company: 'Notion',
        product: 'Template Gallery',
        description: 'Notion\'s template descriptions use specific personas and workflows: "A weekly sprint planning template for product managers who run dual-track discovery with a 4-person squad." The specific conjunction (weekly sprint + PM + dual-track + 4-person squad) makes each template feel purpose-built and more trustworthy than a generic "Project management template."',
        effectiveness: 'very-effective',
        analysis: 'The specificity creates a strong representativeness match for users who identify with even part of the description, driving higher template adoption rates compared to generic alternatives.',
      },
    ],

    abTests: [
      {
        title: 'Product Descriptions: Specific vs Generic Copy',
        hypothesis:
          'Specific, scenario-rich product descriptions will outperform generic benefit statements in conversion',
        controlVersion: {
          description:
            'Landing page with generic copy: "A powerful analytics platform for modern teams. Fast, flexible, and easy to use."',
          metrics: {
            conversionRate: '2.1%',
            timeOnPage: '0:47',
            scrollDepth: '32%',
          },
        },
        treatmentVersion: {
          description:
            'Landing page with specific copy: "Built for 10-50 person data teams who need to unify Snowflake, BigQuery, and Redshift into a single dashboard their CEO actually reads."',
          metrics: {
            conversionRate: '4.7%',
            timeOnPage: '2:03',
            scrollDepth: '67%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'The specific copy more than doubled conversions. Users spent 160% more time on page and scrolled twice as deep. Post-signup surveys showed users remembered specific details ("Snowflake integration," "CEO dashboard") and cited them as reasons for signing up, even when those weren\'t their primary tools.',
          learnings: [
            'Specificity triggers conjunction fallacy, making the product feel more relevant',
            'Users who matched only 2 of 4 specific details still converted at higher rates',
            'The specific copy attracted more qualified leads (higher activation rate)',
            'Effect was strongest for users who self-identified with at least one specific detail',
          ],
        },
      },
      {
        title: 'Testimonials: Specific Detail vs Summary Metrics',
        hypothesis:
          'Testimonials with specific narrative details will increase trust more than those with summary metrics alone',
        controlVersion: {
          description:
            'Testimonial showing: "Increased efficiency by 40%. Highly recommended." — Operations Director',
          metrics: {
            conversionRate: '3.8%',
            trustScore: '6.2/10',
          },
        },
        treatmentVersion: {
          description:
            'Testimonial showing: "Our 12-person ops team was spending every Monday morning in a 2-hour meeting reconciling data from 4 systems. Now the report auto-generates before anyone arrives. We got Mondays back." — Maria Chen, Head of Ops, Cloudline (120 employees)',
          metrics: {
            conversionRate: '6.4%',
            trustScore: '8.7/10',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'The narrative testimonial with specific conjunctive details (12-person team + Monday mornings + 2-hour meeting + 4 systems + auto-generation) increased trust score by 40% and conversions by 68%. The conjunction of details made the story feel authentic, triggering believability despite describing a less probable specific scenario.',
          learnings: [
            'Specific conjunctions in testimonials feel more authentic than summary statistics',
            'Named individuals with company context dramatically increase credibility',
            'Readers project themselves into specific scenarios even when details don\'t match exactly',
            'The "Monday morning meeting" detail was cited most often in follow-up surveys as the element that made the story relatable',
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
        name: 'Hyper-Specific Scenarios',
        description:
          'Detailed, multi-condition descriptions of use cases, customer stories, or product capabilities',
        howToSpot:
          'Look for descriptions that combine 3+ specific details (role, team size, tools, outcomes, timeframes) into a single narrative',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Persona-Driven Copy',
        description:
          'Marketing copy targeting a specific conjunction of user attributes rather than a broad audience',
        howToSpot:
          'Check for phrases like "Built for [specific role] at [specific company type] who need [specific outcome]"',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Detailed Testimonial Cards',
        description:
          'Customer quotes that include specific names, companies, team sizes, tool names, and measurable outcomes',
        howToSpot:
          'Look for testimonials with 4+ specific details — the more conjunctive detail, the stronger the fallacy effect',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Scenario Walkthroughs',
        description:
          'Step-by-step flows describing a specific use case with concrete tools, people, and timelines',
        howToSpot:
          'Check for numbered steps with specific actions, tool names, and outcomes rather than abstract feature descriptions',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Specific Risk or Threat Scenarios',
        description:
          'Warnings or security prompts that describe a detailed, multi-condition negative scenario',
        howToSpot:
          'Look for threat descriptions with specific locations, dates, dollar amounts, and causal chains',
        severity: ImpactLevel.HIGH,
      },
    ],

    patterns: [
      {
        name: 'Narrative Specificity Pattern',
        description: 'Product or feature descriptions that combine multiple specific conditions into a single believable narrative',
        indicators: ['Multi-condition use case descriptions', 'Persona + context + outcome conjunctions', 'Specific tool names, team sizes, or timeframes in copy', '"Built for X who do Y and need Z" phrasing'],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Testimonial Detail Loading Pattern',
        description: 'Customer testimonials packed with specific conjunctive details that increase credibility',
        indicators: ['Named individuals with titles and companies', 'Specific metrics (hours, dollars, percentages)', 'Before/after narratives with concrete details', 'Multiple specific tools or workflows mentioned'],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Scenario Walkthrough Pattern',
        description: 'Onboarding or marketing flows that demonstrate value through a specific multi-step scenario',
        indicators: ['Step-by-step scenario with concrete actions', 'Named data sources, integrations, or outputs', 'Specific timeframes or effort estimates', 'Scenario culminating in a specific shareable outcome'],
        severity: ImpactLevel.MEDIUM,
        confidence: 'high',
      },
      {
        name: 'Risk Specificity Pattern',
        description: 'Security or risk communications using detailed threat scenarios to increase perceived probability',
        indicators: ['Specific attacker descriptions or locations', 'Exact dollar amounts of potential losses', 'Detailed causal chains leading to negative outcomes', 'Named dates, times, or recent events in warnings'],
        severity: ImpactLevel.CRITICAL,
        confidence: 'medium',
      },
    ],

    checklistQuestions: [
      'Are product descriptions using specific multi-condition scenarios instead of general benefits?',
      'Do testimonials combine multiple specific details (name, role, company, metrics) into a narrative?',
      'Are use case scenarios presented with enough conjunctive detail to feel more probable than they are?',
      'Is the specificity in the copy based on real data, or is it fabricated for credibility?',
      'Are risk or warning messages using detailed scenarios that might inflate perceived probability?',
      'Do feature descriptions use specific persona + context combinations?',
      'Are specific claims verifiable, or are they "composite" scenarios?',
      'Does the design balance specific scenarios with general capability statements?',
      'Have you tested whether the specific details match your actual target audience\'s self-image?',
      'Are there any conjunctions presented as more likely than their individual components?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in the conjunction fallacy.

Analyze the provided design for conjunction fallacy patterns. Identify:

1. **Narrative Specificity**: Where descriptions combine multiple specific conditions to feel more believable
2. **Testimonial Detail Loading**: How customer quotes use conjunctive detail to increase credibility
3. **Scenario Plausibility**: Whether specific use case scenarios feel more probable than general capabilities
4. **Risk Inflation**: Whether specific threat scenarios make low-probability events feel common
5. **Persona Conjunctions**: How specific user profiles create representativeness matches

For each pattern found:
- Identify the specific details combined in the conjunction
- Assess whether the conjunction increases perceived probability beyond reality
- Determine if the specifics are based on real data or fabricated
- Evaluate whether the conjunction helps users or misleads them
- Suggest improvements for honest, effective use of specificity

Consider:
- Are specific scenarios presented as more probable than their general counterparts?
- Do testimonials use real, verifiable details or composite narratives?
- Is the specificity helping users envision real value, or inflating perceived likelihood?
- Are risk scenarios proportionate to actual probability?
- Does the design acknowledge uncertainty alongside specific scenarios?

Provide actionable recommendations for ethical, effective use of specificity.`,

    outputSchema: {
      type: 'object',
      properties: {
        conjunctionPatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              specificDetails: { type: 'string' },
              perceivedProbability: { type: 'string' },
              actualProbability: { type: 'string' },
              basedOnRealData: { type: 'boolean' },
              ethical: { type: 'boolean' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'specificDetails',
              'perceivedProbability',
              'ethical',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            specificityLevel: { type: 'number' },
            dataVerifiability: { type: 'number' },
            audienceAlignment: { type: 'number' },
            ethicalScore: { type: 'number' },
          },
          required: [
            'specificityLevel',
            'dataVerifiability',
            'audienceAlignment',
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
        'conjunctionPatterns',
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
        title: 'Identify Key Claims That Need Credibility',
        description:
          'Determine which product claims, value propositions, or scenarios would benefit from increased believability through specificity',
        example:
          'Goal: Make the analytics feature feel real and achievable for mid-market ops teams',
        tips: [
          'Focus on claims where users are skeptical or where generic language falls flat',
          'Prioritize high-impact conversion points (landing page hero, testimonials, onboarding)',
          'List out the specific details you can truthfully include',
        ],
      },
      {
        step: 2,
        title: 'Gather Real, Verifiable Details',
        description:
          'Source specific details from real customer data, interviews, usage analytics, and case studies',
        example:
          'Interview 5 customers to get specific team sizes, tools used, time saved, and workflow descriptions',
        tips: [
          'Never fabricate specifics — the fallacy works with real data too',
          'Collect the exact numbers, tool names, and role titles customers use',
          'Get permission to use names, companies, and specific outcomes',
        ],
      },
      {
        step: 3,
        title: 'Craft Specific, Conjunctive Descriptions',
        description:
          'Combine 3-5 specific details into a coherent narrative that triggers conjunction fallacy',
        example:
          'Instead of "Great for teams," write "Built for 10-30 person data teams running dbt pipelines who need Snowflake + Looker dashboards their CFO can self-serve"',
        tips: [
          'Aim for 3-5 specific details per description — fewer feels generic, more feels overwhelming',
          'Ensure details match your target audience\'s self-image',
          'Build narrative coherence — details should feel like they belong together',
        ],
      },
      {
        step: 4,
        title: 'Balance Specificity with Inclusivity',
        description:
          'Provide multiple specific scenarios so different user segments can find a match',
        example:
          'Show 3 different use case scenarios: one for ops teams, one for data teams, one for engineering',
        tips: [
          'Don\'t rely on a single specific scenario to serve all users',
          'Each scenario should feel specific but represent a real segment',
          'Allow users to self-select into the scenario that matches them',
        ],
      },
      {
        step: 5,
        title: 'Test Specificity Against Generality',
        description:
          'A/B test specific conjunctive copy against generic alternatives to measure the impact',
        example:
          'A/B test: Generic hero copy vs specific scenario copy, measuring click-through and conversion',
        tips: [
          'Test both conversion and qualification — specificity should attract the right users',
          'Monitor whether specific copy excludes viable user segments',
          'Iterate on which details resonate most with your audience',
        ],
      },
    ],

    dos: [
      'Use real, verifiable details sourced from actual customer data and interviews',
      'Combine 3-5 specific details into coherent narratives for maximum credibility',
      'Provide multiple specific scenarios for different user segments',
      'Include specific names, roles, team sizes, and measurable outcomes in testimonials',
      'Write scenario-based onboarding that walks through a concrete, relatable use case',
      'Test specific vs generic copy to measure conjunction fallacy impact',
      'Ensure specific details match your actual target audience\'s self-image',
      'Use specificity to help users envision real value, not to inflate improbable claims',
    ],

    donts: [
      'Don\'t fabricate specific details to exploit the conjunction fallacy',
      'Don\'t use over-specific threat scenarios to inflate perceived risk',
      'Don\'t present composite or fictional testimonials as real customer stories',
      'Don\'t make specific scenarios so narrow that they exclude your actual audience',
      'Don\'t rely solely on specificity — back it up with general capability statements',
      'Don\'t use conjunction fallacy in contexts where accurate probability matters (medical, legal, financial)',
      'Don\'t ignore the bias in user research — specific scenarios get inflated probability ratings from respondents',
      'Don\'t assume one specific scenario serves all user segments',
    ],

    bestPractices: [
      {
        title: 'Ground Specificity in Real Data',
        description:
          'Every specific detail in your copy should be traceable to real customer data, usage analytics, or verified case studies',
        rationale:
          'Conjunction fallacy makes specific claims more believable — which makes fabricated specifics particularly harmful when discovered',
        example:
          'Use actual customer quotes with verified metrics rather than "composite testimonials based on typical results"',
      },
      {
        title: 'Match Specificity to Audience Prototypes',
        description:
          'Craft specific descriptions that match the mental prototypes of your target users',
        rationale:
          'Conjunction fallacy is strongest when details match the reader\'s representativeness heuristic — details must feel like "someone like me"',
        example:
          'If targeting startup PMs, use details like "Slack notifications, sprint reviews, Series B" rather than "enterprise workflows, quarterly business reviews"',
      },
      {
        title: 'Provide Multiple Specific Scenarios',
        description:
          'Offer 2-4 specific use case scenarios rather than one hyper-specific description',
        rationale:
          'A single specific conjunction excludes users who don\'t match; multiple scenarios let different segments find their match',
        example:
          'Show separate scenario cards for "Data Teams," "Ops Teams," and "Engineering Teams," each with specific details for that persona',
      },
      {
        title: 'Pair Specific Scenarios with General Capabilities',
        description:
          'Show specific use cases alongside general feature statements to serve both System 1 and System 2 thinking',
        rationale:
          'Specificity convinces intuitively (System 1), but analytical users also need general capability information (System 2)',
        example:
          'Lead with a specific scenario ("Import your Q3 pipeline from Salesforce..."), follow with a general statement ("Connects to 50+ data sources")',
      },
      {
        title: 'Audit Specificity in Risk Communication',
        description:
          'Review all risk, security, and warning messages for conjunction fallacy inflation',
        rationale:
          'Specific threat scenarios feel far more probable than they are, which can cause disproportionate anxiety and poor decisions',
        example:
          'Replace "A hacker in Belarus accessed a Chicago marketer\'s Stripe account for $12,847" with "Account breaches can lead to financial loss — 2FA blocks 99% of unauthorized access attempts"',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships - Ensure specific scenario details are conveyed through structure, not just visual presentation',
        implementation:
          'Use semantic HTML (lists, headings, blockquotes) to structure specific details so screen readers convey the same level of specificity as visual presentation',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.1.1',
        guideline:
          'Non-text Content - Provide text equivalents for specific visual scenarios',
        implementation:
          'If specific scenarios are conveyed through images, infographics, or interactive demos, provide alt text or descriptions that include the same specific details',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.4.6',
        guideline:
          'Headings and Labels - Label specific scenarios clearly',
        implementation:
          'Give each specific use case scenario a clear heading so users of all access methods can identify and navigate to relevant scenarios',
      },
    ],

    ethics: [
      {
        concern: 'Fabricated Specificity',
        severity: 'critical',
        explanation:
          'Inventing specific details (fake names, fabricated metrics, composite testimonials) to exploit the conjunction fallacy\'s credibility boost',
        mitigation:
          'Source all specific details from real, verifiable data. Clearly disclose if testimonials are composites. Never present fiction as fact.',
      },
      {
        concern: 'Risk Inflation Through Specificity',
        severity: 'high',
        explanation:
          'Using detailed threat scenarios to make low-probability events feel common, driving anxiety-based decisions',
        mitigation:
          'Present risks with base rate information. Use specific scenarios only when they accurately represent typical risks, not worst-case conjunctions.',
      },
      {
        concern: 'Exclusionary Specificity',
        severity: 'medium',
        explanation:
          'Overly specific descriptions that make non-matching users feel the product isn\'t for them, even when it is',
        mitigation:
          'Provide multiple specific scenarios for different user segments. Include a general capability statement alongside specific use cases.',
      },
      {
        concern: 'Probability Distortion in Decision Contexts',
        severity: 'high',
        explanation:
          'Using specific scenarios in contexts where users need accurate probability assessment (insurance, investment, medical)',
        mitigation:
          'In decision-critical contexts, always present specific scenarios alongside base rates and probability data. Label scenarios as illustrative, not representative.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'Extensional Versus Intuitive Reasoning: The Conjunction Fallacy in Probability Judgment',
        author: 'Tversky, A., & Kahneman, D.',
        year: 1983,
        doi: '10.1037/0033-295X.90.4.293',
        description:
          'The foundational paper introducing the conjunction fallacy through the famous "Linda problem" experiment',
        type: 'foundational',
      },
      {
        title: 'On the Conjunction Fallacy and the Meaning of And',
        author: 'Hertwig, R., Benz, B., & Krauss, S.',
        year: 2008,
        description:
          'Explores how natural language interpretation of "and" contributes to the conjunction fallacy',
        type: 'advanced',
      },
      {
        title: 'The Conjunction Fallacy: A Misunderstanding About Conjunction?',
        author: 'Gigerenzer, G.',
        year: 1991,
        description:
          'An alternative frequency-based perspective on why the conjunction fallacy occurs and when it can be reduced',
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
          'Comprehensive coverage of the conjunction fallacy and representativeness heuristic by its co-discoverer',
        type: 'foundational',
      },
      {
        title: 'Judgment Under Uncertainty: Heuristics and Biases',
        author: 'Kahneman, D., Slovic, P., & Tversky, A.',
        year: 1982,
        isbn: '9780521284141',
        description:
          'The definitive edited volume on heuristics and biases, including early conjunction fallacy research',
        type: 'foundational',
      },
    ],

    articles: [
      {
        title: 'The Conjunction Fallacy in User Research',
        author: 'Nielsen Norman Group',
        url: 'https://www.nngroup.com/articles/conjunction-fallacy/',
        description:
          'How the conjunction fallacy affects UX research findings and user interview responses',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'The Linda Problem — Conjunction Fallacy Explained',
        author: 'Veritasium',
        url: 'https://www.youtube.com/watch?v=cpwSGsb-rTs',
        description:
          'Engaging video explanation of the Linda problem and conjunction fallacy with real-world examples',
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
