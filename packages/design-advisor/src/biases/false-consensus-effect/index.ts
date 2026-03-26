/**
 * FALSE CONSENSUS EFFECT
 *
 * We overestimate how many people agree with us
 */


import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const falseConsensusEffect: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'false-consensus-effect',
    name: 'False Consensus Effect',
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
    simple: 'We overestimate how many people agree with us',

    detailed: `The false consensus effect is a cognitive bias where people overestimate the extent to which others share their beliefs, preferences, values, and behaviors. We tend to assume that our personal opinions and choices are more common and "normal" than they actually are, projecting our own perspective onto the broader population.

This bias is especially dangerous in product design because design teams routinely make decisions based on their own preferences, assuming users will think, behave, and react the same way they do. When a product manager says "nobody would ever use that feature" or a designer says "this flow is obviously intuitive," they are often falling prey to false consensus.

In UX practice, this manifests as skipping user research because the team "already knows" what users want, designing for power users because the team members are power users, and prioritizing features based on internal enthusiasm rather than validated user needs.`,

    psychologyBasis: {
      discoveredBy: 'Lee Ross, David Greene, and Pamela House',
      year: 1977,
      theory: 'Social Projection and Attribution Theory',
      mechanism: `The brain uses its own beliefs and behaviors as an anchor for estimating the prevalence of those beliefs in others. This happens because:

1. **Selective Exposure**: We surround ourselves with like-minded people, creating a biased sample from which we generalize
2. **Availability of Own Perspective**: Our own thoughts and feelings are the most cognitively accessible data points we have
3. **Motivated Reasoning**: Believing others agree with us validates our choices and reduces cognitive dissonance
4. **Anchoring to Self**: We use our own position as a starting point and insufficiently adjust when estimating others' views
5. **Information Asymmetry**: We have deep access to our own reasoning but only surface-level access to others' reasoning, leading us to assume similarity

The effect is strengthened in homogeneous environments (like tech companies) where real consensus within the group reinforces the illusion of universal consensus.`,
    },

    realWorldExample: `In Ross, Greene, and House's 1977 "sandwich board" experiment, students were asked to walk around campus wearing a sign that said "Eat at Joe's." Those who agreed to wear the sign estimated that 62% of others would also agree. Those who refused estimated only 33% would agree. Each group thought their own choice was the more common one, dramatically overestimating how many others would make the same decision.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `The false consensus effect is one of the most pervasive biases in product design. It causes teams to:

- Assume their own preferences represent all users, leading to self-referential design
- Skip or undervalue user research because the team "already knows" what users want
- Prioritize features based on internal excitement rather than validated demand
- Set defaults and make UX decisions that work for the team but not for diverse users
- Misinterpret user research data through the lens of their own expectations`,

    whenToUse: [
      {
        title: 'Challenging Design Assumptions',
        scenario:
          'When a team is making decisions based on personal preference rather than data',
        example:
          'Before finalizing a navigation structure, run card sorting studies with real users from different segments rather than relying on what "makes sense" to the team',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'User Research Planning',
        scenario: 'When deciding what research to conduct and which user segments to include',
        example:
          'Recruit participants from demographics, technical skill levels, and contexts that differ from the design team to surface blind spots',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Default Setting Selection',
        scenario: 'When choosing default values, settings, or configurations',
        example:
          'Use analytics data from the actual user base to set defaults, rather than what the team prefers (e.g., dark mode vs light mode defaults)',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Feature Prioritization',
        scenario: 'When deciding which features to build, keep, or deprecate',
        example:
          'Validate feature demand through surveys, usage analytics, and customer interviews rather than relying on team enthusiasm or internal dogfooding',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Personalization Design',
        scenario: 'When building systems that adapt to individual users',
        example:
          'Design recommendation engines using actual behavioral data rather than assumptions about what "most people" want',
        impact: ImpactLevel.MEDIUM,
      },
    ],

    whenToAvoid: [
      {
        title: 'Expert Domain Knowledge',
        reason:
          'When the team genuinely has rare domain expertise that users lack',
        consequence:
          'Over-correcting for false consensus can lead to ignoring valid expert judgment about safety, accessibility, or technical constraints',
        alternative:
          'Distinguish between domain expertise (valid) and personal preference (needs validation). Expert knowledge about security requirements is different from preference about button colors.',
      },
      {
        title: 'Universal Design Principles',
        reason:
          'Established usability principles (like Fitts\' Law) don\'t need re-validation for every project',
        consequence:
          'Questioning every decision as potential false consensus can lead to analysis paralysis',
        alternative:
          'Apply established principles confidently but validate novel applications and domain-specific assumptions with research',
      },
      {
        title: 'Rapid Prototyping Phases',
        reason:
          'Early explorations need fast iteration before committing to research',
        consequence:
          'Demanding full user validation at every prototype stage slows exploration unnecessarily',
        alternative:
          'Use informed assumptions for early prototypes but schedule validation before committing to production implementation',
      },
      {
        title: 'Resource-Constrained Decisions',
        reason:
          'Not every small decision warrants user research investment',
        consequence:
          'Spending research budget on low-impact decisions leaves none for critical ones',
        alternative:
          'Prioritize research for high-impact decisions; use heuristics and best practices for low-impact ones while documenting assumptions',
      },
    ],

    commonMistakes: [
      {
        title: 'Designing for Yourself',
        description:
          'Building features and flows that match the team\'s mental model rather than users\' mental models',
        why: 'The team interacts with the product daily and develops expert-level familiarity that new users don\'t have',
        fix: 'Conduct regular usability testing with new users; create beginner personas that the team must design for explicitly',
      },
      {
        title: 'Homogeneous User Research',
        description:
          'Testing only with participants who look, think, and behave like the team',
        why: 'Teams unconsciously recruit from their own networks and demographic, reinforcing rather than challenging assumptions',
        fix: 'Use structured recruitment criteria that explicitly include diverse demographics, technical skill levels, accessibility needs, and use contexts',
      },
      {
        title: 'Dismissing Edge Cases',
        description:
          'Calling uncommon use cases "edge cases" because they are uncommon for the team',
        why: 'When the team doesn\'t personally encounter a use case, they assume it\'s rare for everyone',
        fix: 'Validate frequency of use cases with analytics data; "edge cases" for the team may represent significant user segments',
      },
      {
        title: 'Assuming Universal Technical Literacy',
        description:
          'Assuming users understand technical concepts, jargon, or interaction patterns that the team takes for granted',
        why: 'Tech-savvy teams forget that most users don\'t share their technical background',
        fix: 'Test with users across the full spectrum of technical literacy; use plain language and provide contextual help',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.HIGH,
        description:
          'Layout decisions driven by team preferences rather than user behavior data',
        examples: [
          'Navigation structures that match internal team mental models but not user mental models',
          'Information hierarchy that prioritizes what the team values over what users need',
          'Dashboard layouts reflecting team workflows rather than actual user workflows',
          'Mobile-last design when most users are actually on mobile devices',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Typography choices reflecting team aesthetic preferences over user readability needs',
        examples: [
          'Small font sizes that work for young designers but not for older users',
          'Trendy typefaces that sacrifice legibility for style',
          'Information density that suits power users but overwhelms casual users',
          'Jargon-heavy labels that make sense internally but confuse external users',
        ],
      },
      color: {
        level: ImpactLevel.MEDIUM,
        description:
          'Color choices based on team taste without validating with diverse users',
        examples: [
          'Low-contrast designs that look elegant to the team but fail for users with vision impairments',
          'Color-dependent information that excludes colorblind users',
          'Cultural color associations that differ across user demographics',
          'Dark mode as default because the team prefers it, ignoring majority preference data',
        ],
      },
      interaction: {
        level: ImpactLevel.CRITICAL,
        description:
          'Interaction patterns designed for power users because the team members are power users',
        examples: [
          'Keyboard shortcuts as primary interaction when most users rely on mouse/touch',
          'Complex gesture-based interactions that feel intuitive to designers but confuse general users',
          'Multi-step workflows that assume familiarity with the product\'s logic',
          'Undo/redo patterns that assume users understand non-linear editing',
        ],
      },
      content: {
        level: ImpactLevel.CRITICAL,
        description:
          'Content and messaging written for people who already understand the product',
        examples: [
          'Onboarding copy that assumes users already know why the product is valuable',
          'Error messages using technical language instead of plain explanations',
          'Help documentation written at the team\'s comprehension level',
          'Marketing copy that emphasizes features the team is proud of rather than problems users need solved',
        ],
      },
      accessibility: {
        level: ImpactLevel.CRITICAL,
        description:
          'Accessibility overlooked because no team members personally need accommodations',
        examples: [
          'Missing screen reader support because no team member uses a screen reader',
          'No keyboard navigation because the team uses mice/trackpads',
          'No reduced-motion option because nobody on the team has vestibular disorders',
          'Insufficient color contrast because the team has no members with low vision',
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
        title: 'Diverse User Testing Panel',
        description:
          'Product team running usability tests with participants across demographics, abilities, and technical skill levels',
        code: `<div class="research-plan">
  <h3>Usability Testing Recruitment Criteria</h3>
  <div class="criteria-grid">
    <div class="criterion">
      <h4>Technical Skill</h4>
      <ul>
        <li>4 beginners (rarely use similar tools)</li>
        <li>4 intermediate (use similar tools monthly)</li>
        <li>4 advanced (daily power users)</li>
      </ul>
    </div>
    <div class="criterion">
      <h4>Demographics</h4>
      <ul>
        <li>Age range: 22-68</li>
        <li>Mix of industries and roles</li>
        <li>Geographic diversity (urban, suburban, rural)</li>
      </ul>
    </div>
    <div class="criterion">
      <h4>Accessibility</h4>
      <ul>
        <li>2 screen reader users</li>
        <li>2 keyboard-only users</li>
        <li>2 users with low vision</li>
      </ul>
    </div>
  </div>
  <p class="note">Recruitment explicitly avoids team demographics to counter false consensus.</p>
</div>`,
        explanation:
          'By deliberately recruiting users who differ from the team across multiple dimensions, the research surfaces assumptions the team didn\'t know they had. This directly counteracts false consensus by exposing the gap between team assumptions and real user behavior.',
        principle:
          'Diverse research panels expose false consensus blind spots',
        metrics: {
          before: '73% of usability issues found in testing were layout/visual',
          after: '42% of issues found were interaction model mismatches invisible to the team',
          improvement: 'Discovered 3x more critical usability issues by diversifying the panel',
        },
      },
      {
        title: 'Data-Driven Feature Prioritization',
        description:
          'Product team using analytics and surveys rather than internal opinions to prioritize features',
        code: `<div class="prioritization-dashboard">
  <h3>Feature Prioritization: Data vs Team Assumption</h3>
  <table class="comparison-table">
    <thead>
      <tr>
        <th>Feature</th>
        <th>Team Priority (guess)</th>
        <th>User Demand (validated)</th>
        <th>Delta</th>
      </tr>
    </thead>
    <tbody>
      <tr class="mismatch-high">
        <td>Bulk export to CSV</td>
        <td class="low">Low</td>
        <td class="high">High (68% requested)</td>
        <td class="delta-negative">Team underestimated</td>
      </tr>
      <tr class="mismatch-high">
        <td>AI-powered suggestions</td>
        <td class="high">High</td>
        <td class="low">Low (12% interested)</td>
        <td class="delta-positive">Team overestimated</td>
      </tr>
      <tr class="aligned">
        <td>Mobile app</td>
        <td class="high">High</td>
        <td class="high">High (71% requested)</td>
        <td class="delta-neutral">Aligned</td>
      </tr>
    </tbody>
  </table>
  <p class="insight">Team assumptions matched user demand in only 3 of 10 features.</p>
</div>`,
        explanation:
          'By systematically comparing team assumptions against validated user data, the team discovered that their internal enthusiasm for AI features was not shared by most users, while a "boring" feature like CSV export was in high demand. This process makes false consensus visible and correctable.',
        principle:
          'Validating assumptions against data reveals false consensus gaps',
      },
      {
        title: 'Assumption Documentation Practice',
        description:
          'Team maintaining an explicit "assumptions log" that tracks design decisions requiring validation',
        code: `<div class="assumptions-log">
  <h3>Design Assumptions Log</h3>
  <div class="assumption-entry">
    <div class="assumption">
      <span class="label">Assumption:</span>
      <p>"Users prefer a single-page dashboard over tabbed navigation"</p>
    </div>
    <div class="source">
      <span class="label">Source:</span>
      <span class="tag team-opinion">Team preference</span>
    </div>
    <div class="status">
      <span class="label">Validation:</span>
      <span class="tag needs-validation">Not yet validated</span>
    </div>
    <div class="action">
      <span class="label">Next step:</span>
      <p>Run A/B test with both layouts, measure task completion time</p>
    </div>
  </div>
  <div class="assumption-entry validated">
    <div class="assumption">
      <span class="label">Assumption:</span>
      <p>"Most users will sign up with Google SSO"</p>
    </div>
    <div class="status">
      <span class="label">Validation:</span>
      <span class="tag disproven">Disproven - 61% prefer email/password</span>
    </div>
  </div>
</div>`,
        explanation:
          'Making assumptions explicit forces the team to acknowledge when decisions are based on opinion rather than evidence. The log creates accountability and a clear path to validation, preventing false consensus from becoming embedded in the product.',
        principle:
          'Explicit assumption tracking makes false consensus visible and actionable',
      },
    ],

    bad: [
      {
        title: 'Designing for the Team',
        description:
          'Development team building a developer-centric interface for non-technical users',
        code: `<!-- DON'T DO THIS -->
<div class="settings-panel">
  <h3>Configuration</h3>
  <div class="setting">
    <label>API Rate Limit (req/min)</label>
    <input type="number" value="1000" />
    <small>Set to 0 for unlimited</small>
  </div>
  <div class="setting">
    <label>Cache TTL (ms)</label>
    <input type="number" value="3600000" />
  </div>
  <div class="setting">
    <label>Webhook Retry Policy</label>
    <select>
      <option>Exponential backoff</option>
      <option>Linear retry</option>
      <option>Circuit breaker</option>
    </select>
  </div>
  <div class="setting">
    <label>Log Level</label>
    <select>
      <option>DEBUG</option>
      <option>INFO</option>
      <option>WARN</option>
      <option>ERROR</option>
    </select>
  </div>
</div>`,
        explanation:
          'The team assumed all users understand API rate limits, cache TTL in milliseconds, retry policies, and log levels. This settings panel is built for developers, by developers, with no consideration for the 80% of users who have no technical background. The false consensus effect led the team to believe these terms are universally understood.',
        principle:
          'Never assume users share your technical vocabulary or mental model',
      },
      {
        title: 'Skipping User Research',
        description:
          'Product manager approving a major redesign based solely on team consensus',
        code: `<!-- DON'T DO THIS -->
<div class="meeting-notes">
  <h3>Product Review: Navigation Redesign</h3>
  <p><strong>Decision:</strong> Replace sidebar navigation with gesture-based navigation</p>
  <p><strong>Rationale:</strong> "The whole team agrees this is more intuitive"</p>
  <p><strong>User Research:</strong> None conducted</p>
  <p><strong>Approval:</strong> Approved for production</p>

  <div class="quote">
    <blockquote>
      "We've all been using the prototype for a week and love it.
       I can't imagine anyone would prefer the old sidebar."
      <cite>-- Product Manager</cite>
    </blockquote>
  </div>
</div>`,
        explanation:
          'The team\'s internal agreement created an illusion of universal consensus. A week of use by expert team members is not representative of how new users will experience a radical navigation change. This is textbook false consensus: "we all agree, therefore everyone will agree."',
        principle:
          'Team consensus is not user consensus; internal agreement amplifies false consensus',
      },
      {
        title: 'Ignoring Diverse User Needs',
        description:
          'E-commerce checkout assuming all users share the team\'s context',
        code: `<!-- DON'T DO THIS -->
<form class="checkout">
  <h3>Quick Checkout</h3>
  <!-- Only credit card, no alternatives -->
  <div class="payment">
    <label>Credit Card Number</label>
    <input type="text" placeholder="1234 5678 9012 3456" required />
  </div>
  <!-- US-only address format -->
  <div class="address">
    <label>State</label>
    <select required>
      <option>California</option>
      <option>New York</option>
      <!-- US states only -->
    </select>
    <label>ZIP Code</label>
    <input type="text" pattern="[0-9]{5}" required />
  </div>
  <!-- Assumes fast, stable internet -->
  <button onclick="processPayment()">Pay Now</button>
  <!-- No confirmation, no offline support -->
</form>`,
        explanation:
          'The team assumed all users have credit cards (many use debit, mobile payments, or buy-now-pay-later), live in the US (only US address format), and have reliable internet (no offline handling or confirmation step). Each assumption reflects the team\'s own context projected onto all users.',
        principle:
          'False consensus makes teams blind to contexts outside their own experience',
      },
    ],

    realWorld: [
      {
        company: 'Facebook/Meta',
        product: 'News Feed Algorithm',
        description: 'Facebook\'s News Feed creates filter bubbles by showing users content similar to what they already engage with. This reinforces the false consensus effect: users see mostly agreeing viewpoints and overestimate how many people share their beliefs. Internal teams also exhibited false consensus by assuming their own engagement patterns represented all 3 billion users.',
        effectiveness: 'somewhat-effective',
        analysis: 'The algorithmic amplification of false consensus contributed to political polarization and misinformation spread. Facebook eventually introduced "opposing viewpoints" features, acknowledging that their design was reinforcing rather than countering the bias.',
      },
      {
        company: 'Twitter/X',
        product: 'Timeline and Communities',
        description: 'Twitter\'s follow-based model creates self-selected echo chambers where users primarily see opinions that match their own. This environment dramatically amplifies the false consensus effect, leading users to believe their views represent majority opinion when they may be a small minority.',
        effectiveness: 'somewhat-effective',
        analysis: 'The platform\'s design inadvertently amplifies false consensus. Community Notes was introduced as a counter-measure, using diverse agreement to surface corrections, explicitly designing against the false consensus effect.',
      },
      {
        company: 'Slack',
        product: 'Product Development',
        description: 'Slack\'s team initially built features targeting developer teams (their own context). After expanding research to include diverse industries -- HR, marketing, legal, education -- they discovered their assumptions about how "everyone" uses messaging tools were wrong. Non-technical teams needed very different features (scheduled messages, formal channels, compliance tools).',
        effectiveness: 'effective',
        analysis: 'Slack successfully identified and corrected for false consensus by deliberately expanding their user research beyond their own demographic. This led to features like Slack Connect and workflow automation that addressed needs the engineering-centric team hadn\'t anticipated.',
      },
      {
        company: 'Google',
        product: 'Google+ Launch',
        description: 'Google+ was designed by engineers who assumed all users wanted granular control over social circles ("Circles" feature). The team loved the concept because it matched how they thought about social relationships. Most users found it confusing and unnecessary -- they didn\'t share the team\'s desire for fine-grained audience control.',
        effectiveness: 'somewhat-effective',
        analysis: 'Classic false consensus: Google\'s technical team projected their own preference for structured organization onto a general audience. The product failed to gain traction partly because its core concept reflected engineer thinking, not mainstream user behavior.',
      },
    ],

    abTests: [
      {
        title: 'Team-Designed Defaults vs Data-Driven Defaults',
        hypothesis:
          'Defaults based on actual user data will outperform defaults chosen by the product team',
        controlVersion: {
          description:
            'Dashboard with default settings chosen by the product team: dark mode, advanced metrics visible, compact layout, weekly email digest',
          metrics: {
            conversionRate: '34%',
            timeOnPage: '2:10',
            scrollDepth: '40%',
          },
        },
        treatmentVersion: {
          description:
            'Dashboard with defaults derived from the most common choices of existing users: light mode, simplified metrics, comfortable spacing, daily notification summary',
          metrics: {
            conversionRate: '52%',
            timeOnPage: '4:35',
            scrollDepth: '72%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Data-driven defaults increased new user activation by 53%. The product team had chosen defaults matching their own power-user preferences. The majority of actual users preferred simpler, lighter defaults that the team had dismissed as "too basic."',
          learnings: [
            'Team preferences are poor proxies for user preferences, especially for defaults',
            'New user activation is highly sensitive to initial configuration',
            'The team overestimated preference for dark mode by 3x (team: 80%, users: 28%)',
            'Compact layouts preferred by the team actually increased cognitive load for new users',
          ],
        },
      },
      {
        title: 'Team-Labeled Navigation vs User-Labeled Navigation',
        hypothesis:
          'Navigation labels generated from card sorting with users will improve task completion vs labels chosen by the team',
        controlVersion: {
          description:
            'Navigation using labels the product team agreed on: "Orchestration", "Pipelines", "Observability", "Governance"',
          metrics: {
            conversionRate: '41%',
            clickThroughRate: '23%',
          },
        },
        treatmentVersion: {
          description:
            'Navigation using labels derived from user card sorting studies: "Workflows", "Data Flow", "Monitoring", "Permissions"',
          metrics: {
            conversionRate: '67%',
            clickThroughRate: '54%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'User-derived labels increased task completion by 63% and navigation confidence by 134%. The team\'s labels used industry jargon that felt precise to insiders but was opaque to the majority of users.',
          learnings: [
            'Internal terminology rarely matches user mental models',
            'False consensus about terminology is one of the most common and costly UX mistakes',
            'Card sorting is an inexpensive way to counter false consensus about information architecture',
            'Even experienced users preferred simpler labels over technical ones',
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
        name: 'Jargon-Heavy Labels',
        description:
          'Navigation, buttons, or settings using internal or technical terminology that may not be understood by general users',
        howToSpot:
          'Look for labels that require domain expertise or insider knowledge to understand (e.g., "Orchestration" instead of "Workflows")',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Power-User Default Configuration',
        description:
          'Default settings, layouts, or views configured for advanced usage rather than typical usage',
        howToSpot:
          'Check if defaults match power-user preferences (compact views, advanced panels open, dark mode) rather than data on what most users choose',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Narrow Persona Representation',
        description:
          'Design that only accounts for one type of user, typically matching the team\'s own profile',
        howToSpot:
          'Check if the design assumes a specific age, technical skill level, device, connection speed, or cultural context',
        severity: ImpactLevel.CRITICAL,
      },
      {
        name: 'Missing Accessibility Accommodations',
        description:
          'Lack of keyboard navigation, screen reader support, or reduced motion options',
        howToSpot:
          'Test with assistive technologies; if none work, the team likely assumed all users interact the way they do',
        severity: ImpactLevel.CRITICAL,
      },
      {
        name: 'Single Payment or Locale Assumption',
        description:
          'Forms or flows that only support one payment method, address format, or language',
        howToSpot:
          'Look for US-only address fields, credit-card-only payment, English-only content when serving international users',
        severity: ImpactLevel.HIGH,
      },
    ],

    patterns: [
      {
        name: 'Design-for-Self Pattern',
        description: 'Interface clearly optimized for the preferences and workflow of the design/engineering team rather than end users',
        indicators: ['Developer-oriented settings exposed to non-technical users', 'Complex features given prominence over simple, high-demand features', 'Workflows that assume expert-level product familiarity', 'Aesthetic choices that prioritize team taste over usability data'],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Research Gap Pattern',
        description: 'Major design decisions made without user research or validated data',
        indicators: ['No usability testing documented', 'Feature priorities based on team voting or gut feeling', 'Personas based on assumptions rather than interviews', '"We all agree" as the rationale for decisions'],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Homogeneous Testing Pattern',
        description: 'User testing conducted only with participants who resemble the team',
        indicators: ['Test participants all from same demographic', 'No accessibility testing with assistive technology users', 'Testing only in one language or locale', 'Recruiting from personal networks'],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Assumption-as-Fact Pattern',
        description: 'Unvalidated assumptions treated as established facts in design documents and discussions',
        indicators: ['"Obviously users will..." language in specs', 'No citation of data for behavioral claims', '"Nobody would..." used to dismiss features', 'Unanimous team agreement taken as user validation'],
        severity: ImpactLevel.HIGH,
        confidence: 'medium',
      },
    ],

    checklistQuestions: [
      'Were any design decisions made based on team preference without user validation?',
      'Does the user research panel include participants who differ from the team in age, technical skill, accessibility needs, and cultural background?',
      'Are there features the team dismissed as unnecessary that users might actually need?',
      'Do navigation labels and terminology match user mental models or internal jargon?',
      'Are default settings based on data from actual user behavior or team preferences?',
      'Has the design been tested with users who have accessibility needs?',
      'Are there assumptions about user context (device, connection speed, locale) that haven\'t been validated?',
      'When was the last time a user research finding surprised the team?',
      'Is the team confusing internal consensus with user consensus?',
      'Are "edge cases" truly rare, or are they just rare for the team?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in the false consensus effect.

Analyze the provided design for false consensus effect patterns. Identify:

1. **Self-Referential Design**: Where the interface appears to be designed for the team rather than end users
2. **Assumption-Based Decisions**: Where design choices reflect unvalidated assumptions about user behavior
3. **Narrow User Modeling**: Where the design only accounts for one type of user
4. **Terminology Mismatches**: Where labels, copy, or concepts use insider language
5. **Missing Perspectives**: Where entire user segments or use cases appear unconsidered

For each pattern found:
- Identify what assumption is being projected onto users
- Assess who is likely excluded or confused by this assumption
- Determine the severity of the false consensus (minor preference vs fundamental misunderstanding)
- Evaluate whether data or research was used to validate the decision
- Suggest specific research methods or data sources to challenge the assumption

Consider:
- Does the design work for users with very different technical skill levels?
- Are defaults based on data or team preference?
- Is the terminology accessible to the full target audience?
- Are there cultural, linguistic, or accessibility blind spots?
- What would a user who is nothing like the team experience?

Provide actionable recommendations for identifying and correcting false consensus in the design process.`,

    outputSchema: {
      type: 'object',
      properties: {
        falseConsensusPatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              assumption: { type: 'string' },
              excludedUsers: { type: 'string' },
              severity: { type: 'string' },
              dataValidated: { type: 'boolean' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'assumption',
              'severity',
              'dataValidated',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            selfReferentialScore: { type: 'number' },
            researchCoverage: { type: 'number' },
            userDiversity: { type: 'number' },
            assumptionRisk: { type: 'number' },
          },
          required: [
            'selfReferentialScore',
            'researchCoverage',
            'userDiversity',
            'assumptionRisk',
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
        'falseConsensusPatterns',
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
        title: 'Audit Current Assumptions',
        description:
          'Document every assumption the team is making about users, their preferences, and their behavior',
        example:
          'Create an "assumptions board" where every design decision includes the assumption it\'s based on and whether it has been validated',
        tips: [
          'Ask "how do we know users want this?" for every feature',
          'Distinguish between data-backed decisions and opinion-based ones',
          'Flag assumptions that affect the most users as highest priority for validation',
        ],
      },
      {
        step: 2,
        title: 'Diversify Your Research',
        description:
          'Ensure user research includes participants who are fundamentally different from the team',
        example:
          'If the team is young, tech-savvy, and urban, explicitly recruit older, less technical, rural participants',
        tips: [
          'Use structured recruitment criteria with diversity requirements',
          'Include users with accessibility needs in every study',
          'Test in multiple contexts (devices, connection speeds, environments)',
        ],
      },
      {
        step: 3,
        title: 'Challenge with Data',
        description:
          'Replace "I think users..." with "the data shows users..." by instrumenting key behaviors',
        example:
          'Before choosing defaults, analyze what 80% of users actually select when given the choice',
        tips: [
          'Set up analytics to track actual user behavior patterns',
          'Run surveys to gauge feature demand before building',
          'Compare team predictions against real data to calibrate intuition',
        ],
      },
      {
        step: 4,
        title: 'Implement Assumption Testing',
        description:
          'Build processes that systematically test assumptions before they become production decisions',
        example:
          'Before every major release, run a "pre-mortem" where the team imagines the feature failing because of a wrong assumption',
        tips: [
          'Use card sorting for information architecture decisions',
          'A/B test team-chosen vs data-driven options',
          'Conduct "five-second tests" with external users to check first impressions',
        ],
      },
      {
        step: 5,
        title: 'Build Feedback Loops',
        description:
          'Create ongoing channels for real users to surface where the product doesn\'t match their needs',
        example:
          'Implement in-app feedback, monitor support tickets for patterns, and run quarterly user interviews',
        tips: [
          'Categorize feedback by user segment to spot false consensus patterns',
          'Pay special attention to feedback from users unlike the team',
          'Track "assumption invalidation rate" as a health metric',
        ],
      },
    ],

    dos: [
      'Conduct user research with participants who differ from the team in demographics, skill level, and context',
      'Document assumptions explicitly and mark them for validation',
      'Use analytics data to set defaults rather than team preferences',
      'Test designs with users across the full range of technical literacy',
      'Include accessibility testing with assistive technology users in every research round',
      'Challenge "obvious" design decisions with data',
      'Run card sorting and tree testing to validate information architecture',
      'Track the gap between team predictions and actual user behavior to build awareness',
    ],

    donts: [
      'Don\'t assume users share the team\'s technical expertise',
      'Don\'t use team consensus as a substitute for user research',
      'Don\'t dismiss use cases as "edge cases" without data on their actual frequency',
      'Don\'t design defaults based on what the team prefers',
      'Don\'t use internal jargon in user-facing interfaces without testing comprehension',
      'Don\'t recruit user research participants only from the team\'s networks',
      'Don\'t skip accessibility features because no team member needs them',
      'Don\'t treat "I wouldn\'t use that" as evidence that users won\'t either',
    ],

    bestPractices: [
      {
        title: 'Maintain an Assumptions Log',
        description:
          'Track every design assumption, its source (data vs opinion), and its validation status',
        rationale:
          'Making assumptions explicit is the first step to testing them; invisible assumptions become invisible biases',
        example:
          'Spreadsheet with columns: Assumption, Source, Validated (Y/N), Method, Result',
      },
      {
        title: 'Recruit Against Your Team Profile',
        description:
          'Deliberately recruit research participants who differ from the team along key dimensions',
        rationale:
          'Testing with users like yourself only reinforces false consensus; diversity in testing is the antidote',
        example:
          'If team is 90% engineers, ensure 50%+ of test participants are non-technical',
      },
      {
        title: 'Data-Driven Defaults',
        description:
          'Set all configurable defaults based on actual user behavior data, not team preferences',
        rationale:
          'Defaults have outsized impact on user experience; false consensus in defaults affects every user',
        example:
          'Analyze the most common settings configuration across 10,000 users to determine optimal defaults',
      },
      {
        title: 'Pre-Mortem for False Consensus',
        description:
          'Before launching features, imagine failure scenarios caused by wrong assumptions about users',
        rationale:
          'Pre-mortems surface hidden assumptions by forcing the team to think about how their consensus could be wrong',
        example:
          '"What if most users don\'t understand this term? What if they use this feature completely differently than we expect?"',
      },
      {
        title: 'Cross-Functional Assumption Reviews',
        description:
          'Include customer support, sales, and success teams in design reviews to bring outside perspectives',
        rationale:
          'Support teams interact with struggling users daily and can identify where the design team\'s assumptions fail',
        example:
          'Monthly review of top support tickets to identify features where user expectations don\'t match team assumptions',
      },
    ],

    accessibility: [{
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships - Ensure all interactive elements have proper semantic structure',
        implementation:
          'Don\'t assume users interact visually; provide equivalent structure through semantic HTML, ARIA roles, and proper heading hierarchy for assistive technologies',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.1.1',
        guideline:
          'Keyboard - Ensure all functionality is available via keyboard',
        implementation:
          'Don\'t assume mouse/trackpad interaction; the team likely uses pointing devices, but many users rely solely on keyboard navigation',
      },
      {
        wcagLevel: 'AA',
        criterion: '3.1.1',
        guideline:
          'Language of Page - Use clear, plain language accessible to the broadest audience',
        implementation:
          'Replace jargon and technical terms with plain language that users across all skill levels can understand. Test terminology with non-expert users.',
      },
    ],

    ethics: [
      {
        concern: 'Exclusionary Design',
        severity: 'critical',
        explanation:
          'Designing only for users who look, think, and behave like the team, systematically excluding others',
        mitigation:
          'Mandate diverse user research. Include accessibility, internationalization, and varied skill levels in every design review checklist.',
      },
      {
        concern: 'Assumption-Driven Dark Patterns',
        severity: 'high',
        explanation:
          'Assuming users want to share data, receive notifications, or auto-renew because the team sees no problem with it',
        mitigation:
          'Default to privacy-respecting, user-empowering choices. Test opt-in vs opt-out with real users from diverse backgrounds.',
      },
      {
        concern: 'Filter Bubble Amplification',
        severity: 'high',
        explanation:
          'Algorithms that reinforce false consensus by showing users only content that matches their existing views',
        mitigation:
          'Design recommendation systems that surface diverse perspectives. Provide transparency about why content is shown.',
      },
      {
        concern: 'Cultural Insensitivity',
        severity: 'high',
        explanation:
          'Assuming one cultural context (typically Western, English-speaking, US-based) applies universally',
        mitigation:
          'Include users from target markets in research. Localize beyond translation -- adapt for cultural context, payment methods, and interaction norms.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'The "False Consensus Effect": An Egocentric Bias in Social Perception and Attribution Processes',
        author: 'Ross, L., Greene, D., & House, P.',
        year: 1977,
        doi: '10.1016/0022-1031(77)90049-X',
        description:
          'The foundational paper that identified and named the false consensus effect through the "sandwich board" experiment',
        type: 'foundational',
      },
      {
        title: 'The False Consensus Effect: A Meta-Analysis of Over 115 Hypothesis Tests',
        author: 'Mullen, B., Atkins, J. L., Champion, D. S., et al.',
        year: 1985,
        description:
          'Comprehensive meta-analysis confirming the robustness of the false consensus effect across many contexts',
        type: 'foundational',
      },
      {
        title: 'False Consensus, Social Projection, and the Psychology of Everyday Decision Making',
        author: 'Marks, G., & Miller, N.',
        year: 1987,
        doi: '10.1037/0033-295X.94.3.353',
        description:
          'Explores the mechanisms behind false consensus and its relationship to social projection',
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
          'Covers false consensus as part of the broader landscape of cognitive biases affecting judgment and decision-making',
        type: 'foundational',
      },
      {
        title: 'Just Enough Research',
        author: 'Hall, Erika',
        year: 2013,
        isbn: '9781937557102',
        description:
          'Practical guide to user research that directly addresses the false consensus trap in design teams',
        type: 'practical',
      },
      {
        title: 'Mismatch: How Inclusion Shapes Design',
        author: 'Holmes, Kat',
        year: 2018,
        isbn: '9780262038881',
        description:
          'Explores how exclusionary design results from teams projecting their own abilities onto all users',
        type: 'practical',
      },
    ],

    articles: [
      {
        title: 'The False-Consensus Effect in UX',
        author: 'Nielsen Norman Group',
        url: 'https://www.nngroup.com/articles/false-consensus/',
        description:
          'Practical guide to recognizing and mitigating false consensus effect in UX design processes',
        type: 'practical',
      },
      {
        title: 'You Are Not the User',
        author: 'Nielsen Norman Group',
        url: 'https://www.nngroup.com/articles/false-consensus/',
        description:
          'Classic article on why designers must resist the urge to design for themselves',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'False Consensus Effect Explained',
        author: 'Sprouts',
        url: 'https://www.youtube.com/watch?v=JQk6dmFe1Hc',
        description:
          'Animated explanation of the false consensus effect with everyday examples',
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
      'confirmation-bias',
      'in-group-bias',
      'availability-heuristic',
      'curse-of-knowledge',
    ],

    conflicts: [
      'pluralistic-ignorance',
    ],

    confusedWith: [
      'projection-bias',
      'naive-realism',
      'spotlight-effect',
    ],

    hierarchy: {
      parent: 'cognitive-bias',
      children: [
        'projection-bias',
        'echo-chamber-effect',
      ],
    },
  },
};
