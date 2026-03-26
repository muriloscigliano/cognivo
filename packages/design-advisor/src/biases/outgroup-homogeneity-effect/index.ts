/**
 * OUTGROUP HOMOGENEITY EFFECT
 *
 * We perceive members of outgroups as more similar to each other
 * than members of our own ingroup — "they're all the same."
 */

import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const outgroupHomogeneityEffect: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'outgroup-homogeneity-effect',
    name: 'Outgroup Homogeneity Effect',
    aliases: ['Out-Group Homogeneity Bias', 'They All Look Alike Effect', 'Outgroup Uniformity Bias'],
    category: BiasCategory.SOCIAL,
    relatedCategories: [
      BiasCategory.DECISION_MAKING,
      BiasCategory.PERCEPTION,
      BiasCategory.MEMORY,
    ],
    tags: [
      'segmentation',
      'personalization',
      'stereotyping',
      'group-perception',
      'diversity',
      'user-research',
      'personas',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple: 'We perceive members of outgroups as more similar to each other than members of our own ingroup.',

    detailed: `The outgroup homogeneity effect is a social cognitive bias in which people perceive members of groups they do not belong to ("outgroups") as more alike than members of their own group ("ingroup"). We see rich individuality among "us" but flatten "them" into a uniform mass — "they're all the same."

This bias arises because we have far more exposure to and interaction with ingroup members, giving us a nuanced model of individual differences within our group. With outgroups, we rely on category-level stereotypes and limited exemplars, collapsing variation into a single prototype.

In product design, this bias directly affects user segmentation, persona development, recommendation engines, and content personalization. Teams that fall prey to it build coarse-grained segments for users unlike themselves — lumping diverse populations into monolithic categories — while creating finely differentiated experiences for users who resemble the team. The result is products that feel deeply personal to some and generically "one size fits all" to everyone else.`,

    psychologyBasis: {
      discoveredBy: 'George Quattrone and Edward Jones',
      year: 1980,
      theory: 'Social Identity and Intergroup Perception',
      mechanism: `The brain encodes outgroup members at a category level rather than an individual level. This happens because:

1. **Differential Exposure**: We interact more frequently and deeply with ingroup members, building richer mental models of individual variation
2. **Category-Level Encoding**: Outgroup members are stored in memory as exemplars of their group rather than as distinct individuals
3. **Stereotype Assimilation**: When recalling outgroup members, we fill in gaps with stereotypical attributes rather than individuating details
4. **Cross-Race / Cross-Group Recognition Deficit**: Reduced perceptual expertise with outgroup faces and behaviors leads to poorer differentiation
5. **Motivated Reasoning**: Perceiving outgroup homogeneity can serve social identity needs — maintaining a clear boundary between "us" and "them"

The effect is robust across many group boundaries: race, age, nationality, profession, fandom, and even arbitrary laboratory-assigned groups.`,
    },

    realWorldExample: `Quattrone and Jones (1980) had students from Princeton and Rutgers watch a peer from the other university make a choice. When asked to predict what percentage of that university's students would make the same choice, participants assumed far greater consensus for the outgroup university than for their own. Princeton students saw Rutgers students as a monolith (and vice versa), while recognizing diverse opinions within their own campus.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `The outgroup homogeneity effect distorts how product teams segment, model, and serve users who are different from the team itself. It leads to:

- Coarse user segments for demographics unlike the design team (e.g., "seniors," "emerging markets")
- Overly generic personas that stereotype rather than individuate
- Recommendation engines that under-personalize for minority segments
- Content and marketing that treats diverse populations as monolithic
- Accessibility and localization treated as checkbox afterthoughts rather than deeply personalized experiences`,

    whenToUse: [
      {
        title: 'Segment Granularity Audits',
        scenario:
          'When reviewing user segmentation models for balance and depth',
        example:
          'Audit whether your "enterprise" segment has 12 sub-segments while your "small business" segment is a single bucket — then equalize granularity',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Persona Diversification',
        scenario: 'When developing user personas for product planning',
        example:
          'Create multiple distinct personas within each demographic group, capturing individual goals, pain points, and contexts rather than a single "representative"',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Recommendation Personalization',
        scenario: 'When building or evaluating recommendation algorithms',
        example:
          'Measure recommendation diversity and accuracy per user segment; ensure minority segments get equally personalized suggestions rather than category-level defaults',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Content Localization',
        scenario: 'When adapting content and experiences for different markets or cultures',
        example:
          'Treat "Asia-Pacific" not as one audience but as dozens of distinct cultural contexts with unique needs, preferences, and idioms',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Inclusive Research Recruitment',
        scenario: 'When planning user research studies',
        example:
          'Recruit diverse participants within each segment, not just one or two "representative" users from underrepresented groups',
        impact: ImpactLevel.MEDIUM,
      },
    ],

    whenToAvoid: [
      {
        title: 'Over-Segmentation Without Data',
        reason:
          'Creating many micro-segments without sufficient behavioral data leads to unreliable personalization',
        consequence:
          'Noisy recommendations, incorrect assumptions, and wasted engineering effort',
        alternative:
          'Start with behavioral clusters supported by data, then refine granularity as sample sizes grow',
      },
      {
        title: 'Performative Diversity',
        reason:
          'Superficially splitting groups to appear inclusive without actually changing the underlying experience',
        consequence:
          'Users see through tokenism, eroding trust and brand credibility',
        alternative:
          'Invest in genuine understanding through research, co-design, and community partnership',
      },
      {
        title: 'Privacy-Sensitive Contexts',
        reason:
          'Highly granular segmentation on sensitive attributes (race, health, religion) can feel invasive',
        consequence:
          'Users feel surveilled or profiled, leading to distrust and potential legal exposure',
        alternative:
          'Use behavioral and preference-based segmentation rather than demographic identity attributes',
      },
      {
        title: 'Small Sample Stereotyping',
        reason:
          'Individualizing from very few data points can create new, equally flawed stereotypes',
        consequence:
          'False precision gives unwarranted confidence in inaccurate models',
        alternative:
          'Acknowledge uncertainty and use progressive personalization as more data becomes available',
      },
    ],

    commonMistakes: [
      {
        title: 'Monolithic Personas',
        description:
          'Creating a single persona to represent an entire demographic group (e.g., "The Senior User")',
        why: 'The team lacks deep exposure to this group and defaults to category-level thinking',
        fix: 'Develop 3-5 distinct personas within each demographic, based on behavioral research, capturing divergent goals and contexts',
      },
      {
        title: 'Unequal Segment Depth',
        description:
          'Having 10 segments for users like the team but only 2 for everyone else',
        why: 'Teams naturally see more variation in groups they belong to and interact with daily',
        fix: 'Mandate equal segmentation depth across all user groups; use quantitative clustering to reveal hidden variation',
      },
      {
        title: 'Default-Culture Design',
        description:
          'Designing for one cultural context and then "translating" for others as an afterthought',
        why: 'The dominant culture is seen as varied and nuanced; other cultures are treated as a uniform "other"',
        fix: 'Design for multiple cultural contexts from the start; involve local designers and researchers in each market',
      },
      {
        title: 'Aggregate Metrics Masking Disparity',
        description:
          'Reporting overall satisfaction or conversion without breaking down by user segment',
        why: 'Aggregate numbers hide whether the product works well for all groups or only the majority',
        fix: 'Always disaggregate metrics by segment; flag significant variance as a product quality issue',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.MEDIUM,
        description:
          'Layout decisions reflect assumptions about what different user groups need and value',
        examples: [
          'Dashboard layouts that assume all "enterprise" users want the same widgets',
          'Mobile-first vs desktop-first choices driven by stereotypes about user segments',
          'Navigation structures that assume uniform mental models across diverse user groups',
          'Adaptive layouts that differentiate based on behavior rather than demographic assumptions',
        ],
      },
      typography: {
        level: ImpactLevel.LOW,
        description:
          'Typography choices can reinforce or challenge assumptions about user groups',
        examples: [
          'Choosing larger fonts for "senior" users without testing actual needs',
          'Using a single reading level across all segments without considering literacy diversity',
          'Assuming non-native speakers need simplified text rather than well-structured content',
          'Font choices that work well for one script but poorly for others in multilingual products',
        ],
      },
      color: {
        level: ImpactLevel.MEDIUM,
        description:
          'Color choices and symbolism vary across cultures and should not be treated uniformly',
        examples: [
          'Red meaning "danger" in Western contexts but "prosperity" in Chinese contexts',
          'Assuming universal color associations when designing for global audiences',
          'Using culturally specific imagery and color palettes for "international" user segments',
          'Testing color accessibility across diverse user populations, not just majority group',
        ],
      },
      interaction: {
        level: ImpactLevel.HIGH,
        description:
          'Interaction patterns must account for individual variation within every user segment',
        examples: [
          'Recommendation engines that under-personalize for minority user segments',
          'Onboarding flows that assume uniform prior knowledge within a user group',
          'Search and filtering that reflects the vocabulary of the dominant user group',
          'Gesture and input patterns that assume uniform physical abilities within age groups',
        ],
      },
      content: {
        level: ImpactLevel.CRITICAL,
        description:
          'Content strategy is the area most susceptible to outgroup homogeneity — treating diverse audiences as monolithic',
        examples: [
          'Marketing copy that speaks to "millennials" or "Gen Z" as a single voice',
          'Help documentation written for one skill level and labeled for an entire segment',
          'Notification strategies that treat all users in a segment identically',
          'Content recommendations that default to segment-level popularity rather than individual taste',
        ],
      },
      accessibility: {
        level: ImpactLevel.HIGH,
        description:
          'Accessibility is especially vulnerable to outgroup homogeneity — treating "users with disabilities" as one group',
        examples: [
          'A single "accessible mode" toggle that attempts to serve all disability types identically',
          'Assuming all screen reader users have the same navigation preferences',
          'Treating "low vision" as a uniform condition rather than a spectrum of needs',
          'Failing to recognize the intersection of disability with culture, age, and tech literacy',
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
        title: 'Granular User Segments Within Demographics',
        description:
          'Analytics platform replacing broad demographic buckets with behavioral micro-segments',
        code: `<div class="segment-dashboard">
  <h3>User Segments — Small Business</h3>
  <div class="segment-grid">
    <div class="segment-card">
      <h4>Growth Sprinters</h4>
      <p class="count">2,340 users</p>
      <p>Scaling fast, need automation and integrations.
      Primarily use API and bulk operations.</p>
      <div class="traits">
        <span class="trait">High API usage</span>
        <span class="trait">Weekly imports</span>
        <span class="trait">Team seats growing</span>
      </div>
    </div>
    <div class="segment-card">
      <h4>Steady Operators</h4>
      <p class="count">5,120 users</p>
      <p>Stable businesses, value reliability over new features.
      Primarily use core reporting and invoicing.</p>
      <div class="traits">
        <span class="trait">Low feature adoption</span>
        <span class="trait">High retention</span>
        <span class="trait">Support-averse</span>
      </div>
    </div>
    <div class="segment-card">
      <h4>Side-Project Builders</h4>
      <p class="count">8,900 users</p>
      <p>Part-time entrepreneurs, price-sensitive,
      need simplicity and mobile access.</p>
      <div class="traits">
        <span class="trait">Mobile-heavy</span>
        <span class="trait">Evening usage</span>
        <span class="trait">Free tier</span>
      </div>
    </div>
  </div>
</div>`,
        explanation:
          'Instead of treating "small business" as a monolithic segment, this approach reveals three distinct behavioral clusters with different needs, usage patterns, and value drivers. Each sub-segment gets a tailored experience.',
        principle:
          'Counteract outgroup homogeneity by revealing individual variation within every segment',
        metrics: {
          before: '1 "Small Business" segment with generic onboarding — 23% activation rate',
          after: '3 behavioral sub-segments with tailored onboarding — 41% activation rate',
          improvement: '78% increase in activation through segment-specific experiences',
        },
      },
      {
        title: 'Personalized Recommendations Within Segments',
        description:
          'Music streaming service providing individualized suggestions within demographic groups instead of segment-level defaults',
        code: `<section class="recommendations">
  <h2>Made for You</h2>
  <p class="subtitle">Based on your listening, not your demographic</p>

  <div class="recommendation-row">
    <h3>Because you played Mdou Moctar</h3>
    <div class="track-list">
      <div class="track">Tinariwen — Chet Boghassa</div>
      <div class="track">Bombino — Tar Hani</div>
      <div class="track">Ali Farka Toure — Savane</div>
    </div>
  </div>

  <div class="recommendation-row">
    <h3>Your Thursday evening wind-down</h3>
    <div class="track-list">
      <div class="track">Nils Frahm — Says</div>
      <div class="track">Brian Eno — Music for Airports</div>
      <div class="track">Ryuichi Sakamoto — Aqua</div>
    </div>
  </div>

  <!-- NOT: "Popular with 25-34 year olds in your area" -->
</section>`,
        explanation:
          'Recommendations are driven by individual listening behavior and temporal context, not by what is popular with the user\'s age group or location. This respects individual taste within any demographic.',
        principle:
          'Individual behavior is a better predictor than group membership — personalize accordingly',
      },
      {
        title: 'Diverse Persona Library',
        description:
          'Design team maintaining multiple personas per user group to prevent stereotyping',
        code: `<div class="persona-library">
  <h3>Personas — "Older Adults" (65+)</h3>
  <p class="note">5 distinct personas. No single persona represents this group.</p>

  <div class="persona-grid">
    <article class="persona-card">
      <h4>Margaret, 72 — Tech-Savvy Retiree</h4>
      <p>Former software engineer. Uses multiple devices,
      prefers keyboard shortcuts, frustrated by oversimplified interfaces.</p>
      <span class="tag">Power user</span>
    </article>
    <article class="persona-card">
      <h4>James, 68 — Reluctant Digital Adopter</h4>
      <p>Retired teacher. Uses tablet primarily.
      Values clear instructions and undo capability.</p>
      <span class="tag">Guided experience</span>
    </article>
    <article class="persona-card">
      <h4>Priya, 74 — Social Connector</h4>
      <p>Active in community groups. Primary use is video calls
      and group messaging. Comfortable with mobile.</p>
      <span class="tag">Social features</span>
    </article>
    <article class="persona-card">
      <h4>Robert, 80 — Accessibility-First</h4>
      <p>Low vision and mild tremor. Relies on screen magnification,
      voice input, and large touch targets.</p>
      <span class="tag">Assistive tech</span>
    </article>
    <article class="persona-card">
      <h4>Yuki, 66 — Creative Professional</h4>
      <p>Still working as a photographer. Needs color-accurate displays,
      file management, and cloud sync.</p>
      <span class="tag">Professional workflow</span>
    </article>
  </div>
</div>`,
        explanation:
          'Five distinct personas prevent the team from collapsing "older adults" into a single stereotype. Each persona has unique goals, abilities, and product needs that demand different design responses.',
        principle:
          'Multiple personas per group force individuation and prevent stereotypical design decisions',
      },
    ],

    bad: [
      {
        title: 'Monolithic "International" User Segment',
        description:
          'Product team treating all non-domestic users as a single group',
        code: `<!-- DON'T DO THIS -->
<div class="segment-overview">
  <h3>User Segments</h3>
  <div class="segments">
    <div class="segment detailed">
      <h4>US — East Coast Tech</h4>
      <p>12 sub-segments, 47 behavioral clusters</p>
    </div>
    <div class="segment detailed">
      <h4>US — West Coast Startup</h4>
      <p>9 sub-segments, 38 behavioral clusters</p>
    </div>
    <div class="segment detailed">
      <h4>US — Enterprise Midwest</h4>
      <p>6 sub-segments, 22 behavioral clusters</p>
    </div>
    <div class="segment monolithic">
      <h4>International</h4>
      <p>1 segment. 200+ countries.</p>
    </div>
  </div>
</div>`,
        explanation:
          'The team sees rich variation in their own market (US) but flattens 200+ countries into a single "International" bucket. Users in Tokyo, Lagos, and Berlin have radically different needs, but the outgroup homogeneity effect makes them all look the same from the team\'s perspective.',
        principle: 'Unequal segmentation depth is a diagnostic sign of outgroup homogeneity bias at work',
      },
      {
        title: 'One-Size-Fits-All Accessibility Mode',
        description:
          'Single accessibility toggle attempting to serve all disability types',
        code: `<!-- DON'T DO THIS -->
<div class="settings">
  <label class="toggle">
    <input type="checkbox" id="accessible-mode">
    <span>Enable Accessible Mode</span>
  </label>
  <p class="description">
    Turns on larger text, higher contrast, and simplified layout
    for users with disabilities.
  </p>
</div>`,
        explanation:
          'Treating "users with disabilities" as a homogeneous group ignores that a blind user, a user with motor impairment, a user with ADHD, and a user with low vision need fundamentally different accommodations. A single toggle cannot serve them all — and its existence signals that the team has not individuated this outgroup.',
        principle: 'Never collapse diverse needs into a single "other" category',
      },
      {
        title: 'Stereotypical Generational Marketing',
        description:
          'Marketing copy treating an entire generation as a monolith',
        code: `<!-- DON'T DO THIS -->
<section class="campaign">
  <h2>Built for Gen Z</h2>
  <p>You want everything fast, mobile, and social.
  You care about sustainability and authenticity.
  You don't read emails. You live on TikTok.</p>
  <button class="cta">Start Your Vibe Check</button>
</section>`,
        explanation:
          'This copy reduces an entire generation (roughly 2 billion people) to a handful of stereotypes. Many Gen Z users read email, prefer desktop, or have no interest in TikTok. The outgroup homogeneity effect leads the (presumably non-Gen-Z) marketing team to flatten this audience into a caricature.',
        principle: 'Demographic labels describe age ranges, not personality types — do not conflate them',
      },
    ],

    realWorld: [
      {
        company: 'Netflix',
        product: 'Personalization Engine',
        description: 'Netflix famously moved beyond demographic segments to individualized taste clusters. Rather than recommending "popular with women 25-34," the system identifies micro-taste communities (e.g., "cerebral foreign-language dramas") and personalizes artwork, descriptions, and row ordering per user. This counteracts outgroup homogeneity by refusing to treat any demographic as uniform.',
        effectiveness: 'very-effective',
        analysis: 'Netflix discovered that demographic-level recommendations performed poorly because variation within any demographic far exceeds variation between demographics. Individual behavior is the better signal, and treating any group as monolithic leaves accuracy on the table.',
      },
      {
        company: 'Spotify',
        product: 'Discover Weekly',
        description: 'Spotify generates a unique playlist for each of its hundreds of millions of users, based on individual listening behavior and the behavior of taste-similar users — not age, location, or declared genre preferences. Two users in the same demographic can receive completely different playlists.',
        effectiveness: 'very-effective',
        analysis: 'By personalizing at the individual level, Spotify avoids the trap of assuming that all users within a segment want the same music. This drives higher engagement and reduces churn among users who would be poorly served by group-level defaults.',
      },
      {
        company: 'Airbnb',
        product: 'Inclusive Guest & Host Experiences',
        description: 'After research revealed that hosts sometimes treated guests from certain backgrounds uniformly (outgroup homogeneity leading to discrimination), Airbnb reduced the prominence of guest photos, introduced Instant Book, and invested in anti-bias training. The platform was redesigned to individuate guests rather than allowing category-level judgments.',
        effectiveness: 'effective',
        analysis: 'Airbnb recognized that its marketplace design could amplify outgroup homogeneity effects — hosts applying group-level stereotypes rather than evaluating individuals. Design interventions that reduce category salience and increase individuation measurably reduced discrimination on the platform.',
      },
      {
        company: 'IBM',
        product: 'AI Fairness 360 Toolkit',
        description: 'IBM released an open-source toolkit that helps teams detect when ML models treat subgroups as more homogeneous than they actually are — for example, when a hiring algorithm produces uniform scores for an entire demographic group while producing differentiated scores for the majority group.',
        effectiveness: 'effective',
        analysis: 'This addresses outgroup homogeneity at the algorithmic level. When training data is dominated by one group, models learn fine-grained patterns for that group but coarse patterns for others — a direct computational analog of the cognitive bias.',
      },
    ],

    abTests: [
      {
        title: 'Segment-Level vs Individual-Level Recommendations',
        hypothesis:
          'Individualizing recommendations within segments will outperform segment-level defaults',
        controlVersion: {
          description:
            'E-commerce homepage showing "Popular in your age group" product recommendations based on broad demographic segment',
          metrics: {
            conversionRate: '3.1%',
            clickThroughRate: '8.4%',
            scrollDepth: '42%',
          },
        },
        treatmentVersion: {
          description:
            'E-commerce homepage showing "Based on your browsing" product recommendations using individual behavioral data within the same segments',
          metrics: {
            conversionRate: '5.7%',
            clickThroughRate: '14.2%',
            scrollDepth: '61%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Individual-level recommendations increased conversions by 84%. The effect was strongest for users in minority segments, where segment-level defaults were least representative. Users in majority segments also benefited but by a smaller margin (32% improvement) since segment-level defaults were already closer to their individual tastes.',
          learnings: [
            'Segment-level recommendations disproportionately underserve minority users',
            'Individual behavior is a better predictor than group membership across all segments',
            'The gap between segment-level and individual-level performance is largest for underrepresented groups',
            'Investing in individual personalization is an equity intervention, not just a performance optimization',
          ],
        },
      },
      {
        title: 'Multiple Personas vs Single Persona in Design Sprint',
        hypothesis:
          'Design teams using multiple personas per segment will produce more inclusive solutions',
        controlVersion: {
          description:
            'Design sprint using 1 persona per user segment (5 segments, 5 personas) — each persona representing the "average" user in the segment',
          metrics: {
            conversionRate: '—',
            usabilityScore: '72/100 overall; 58/100 for minority segments',
          },
        },
        treatmentVersion: {
          description:
            'Design sprint using 3 personas per user segment (5 segments, 15 personas) — each segment represented by divergent individuals',
          metrics: {
            conversionRate: '—',
            usabilityScore: '78/100 overall; 74/100 for minority segments',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Multiple personas raised overall usability by 8%, but the dramatic improvement was in minority segment satisfaction (+28%). Teams using multiple personas generated 2.4x more edge-case solutions and caught accessibility issues 3x more frequently during design reviews.',
          learnings: [
            'Single personas per segment reinforce stereotypical design thinking',
            'Multiple personas force designers to confront within-group variation',
            'The biggest quality gains are for groups most unlike the design team',
            'Persona diversification is cheap relative to its impact on inclusive outcomes',
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
        name: 'Unequal Segment Granularity',
        description:
          'Some user segments are broken into many sub-groups while others are treated as a single block',
        howToSpot:
          'Compare the number of sub-segments, personas, or behavioral clusters across different user groups in your analytics or design artifacts',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Monolithic Labels',
        description:
          'User groups described with broad, undifferentiated labels like "International," "Seniors," "Mobile Users," or "Non-English Speakers"',
        howToSpot:
          'Look for segment names that describe hundreds of millions of people with a single word or phrase',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Uniform Content for Diverse Groups',
        description:
          'The same marketing copy, onboarding flow, or recommendation set served to all users within a non-majority segment',
        howToSpot:
          'Check whether personalization depth varies by segment — majority segments get tailored experiences while minority segments get generic ones',
        severity: ImpactLevel.CRITICAL,
      },
      {
        name: 'Single Accessibility Toggle',
        description:
          'One "accessible mode" attempting to serve all disability types uniformly',
        howToSpot:
          'Look for binary accessibility settings rather than granular preference controls (text size, contrast, motion, audio descriptions, etc.)',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Stereotypical Visual Representation',
        description:
          'Stock imagery or illustrations that depict outgroup members in stereotypical roles or uniform appearance',
        howToSpot:
          'Review imagery for diversity within depicted groups, not just between them',
        severity: ImpactLevel.MEDIUM,
      },
    ],

    patterns: [
      {
        name: 'Asymmetric Segmentation Pattern',
        description: 'Rich sub-segmentation for ingroup-resembling users, coarse segmentation for others',
        indicators: [
          'Analytics dashboards with unequal segment depth',
          'Persona libraries with more detail for some demographics than others',
          'A/B tests run only on majority segments',
          'Feature flags and gradual rollouts that skip minority segments',
        ],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Default-to-Majority Pattern',
        description: 'Minority user segments receive the majority group\'s experience as a default rather than a tailored one',
        indicators: [
          'Localization that is translation-only, not cultural adaptation',
          'One onboarding flow for all user types',
          'Recommendation algorithms trained primarily on majority-group behavior',
          'Support documentation written for a single user archetype',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Aggregate Metrics Masking Pattern',
        description: 'Overall satisfaction or performance metrics hiding disparate experiences across groups',
        indicators: [
          'NPS reported as a single number without segment breakdown',
          'Conversion funnel analysis without demographic disaggregation',
          'Error rates averaged across all users rather than per-segment',
          'Support ticket volume not broken down by user group',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Stereotype-Driven Personalization Pattern',
        description: 'Recommendations or content driven by demographic stereotypes rather than individual behavior',
        indicators: [
          '"Popular with [demographic]" as primary recommendation signal',
          'Content categories aligned to demographic assumptions',
          'Marketing campaigns using generational or cultural stereotypes',
          'Default preferences set by demographic group rather than individual onboarding',
        ],
        severity: ImpactLevel.MEDIUM,
        confidence: 'medium',
      },
    ],

    checklistQuestions: [
      'Do all user segments receive equal depth of sub-segmentation?',
      'Are personas for underrepresented groups as individually detailed as those for the team\'s own demographic?',
      'Does the recommendation engine personalize equally well for minority and majority user segments?',
      'Are metrics disaggregated by user group to reveal disparate experiences?',
      'Is localization treated as cultural adaptation, not just translation?',
      'Are accessibility features granular enough to serve diverse needs, or is there a single "accessible mode"?',
      'Do user research panels include diverse participants within each segment, not just between segments?',
      'Are marketing messages individuated rather than relying on demographic stereotypes?',
      'Has the team tested the product with users who are demographically unlike the team itself?',
      'Are there processes to challenge assumptions about outgroup uniformity during design reviews?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in the outgroup homogeneity effect.

Analyze the provided design for outgroup homogeneity patterns. Identify:

1. **Segmentation Asymmetry**: Whether some user groups are modeled with more granularity than others
2. **Persona Depth**: Whether personas for all groups are equally individuated or some are stereotypical
3. **Personalization Equity**: Whether recommendation and content systems serve all segments equally well
4. **Content Stereotyping**: Whether marketing, onboarding, or help content treats any group as monolithic
5. **Metric Disaggregation**: Whether performance metrics reveal disparate experiences across groups

For each pattern found:
- Identify which group is being homogenized
- Assess the impact on user experience for that group
- Determine whether the design perpetuates or counteracts stereotyping
- Evaluate equity implications
- Suggest concrete improvements for individuation

Consider:
- Which user groups resemble the design team and which do not?
- Is the personalization depth equal across all segments?
- Are accessibility features treating "users with disabilities" as a monolith?
- Do aggregate metrics mask poor experiences for minority segments?
- Has the team conducted research with diverse participants within each segment?

Provide actionable recommendations for counteracting outgroup homogeneity in the design.`,

    outputSchema: {
      type: 'object',
      properties: {
        homogeneityPatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              affectedGroup: { type: 'string' },
              location: { type: 'string' },
              homogenizationLevel: { type: 'string' },
              impactOnUsers: { type: 'string' },
              equityImplication: { type: 'string' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'affectedGroup',
              'location',
              'homogenizationLevel',
              'recommendation',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            segmentationEquity: { type: 'number' },
            personaDepth: { type: 'number' },
            personalizationEquity: { type: 'number' },
            inclusivityScore: { type: 'number' },
          },
          required: [
            'segmentationEquity',
            'personaDepth',
            'personalizationEquity',
            'inclusivityScore',
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
        'homogeneityPatterns',
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
        title: 'Audit Segment Granularity',
        description:
          'Compare the depth of sub-segmentation across all user groups and identify asymmetries',
        example:
          'Map every user segment to its number of sub-segments, personas, and behavioral clusters — flag groups with fewer than 3 sub-segments',
        tips: [
          'Pay special attention to groups that are demographically unlike your team',
          'Include geographic, cultural, ability, and age dimensions',
          'Use quantitative clustering to reveal variation the team may not see intuitively',
        ],
      },
      {
        step: 2,
        title: 'Develop Multiple Personas Per Group',
        description:
          'Create at least 3 distinct personas for every major user segment, emphasizing within-group diversity',
        example:
          'Replace single "Senior User" persona with 4 individuated personas (tech-savvy retiree, accessibility-first user, social connector, reluctant adopter)',
        tips: [
          'Base personas on behavioral research, not demographic stereotypes',
          'Include goals, contexts, and pain points that differ within the group',
          'Involve members of each group in persona creation and validation',
        ],
      },
      {
        step: 3,
        title: 'Equalize Personalization Depth',
        description:
          'Ensure recommendation engines, content systems, and onboarding flows personalize equally well for all segments',
        example:
          'Measure recommendation accuracy per segment; if minority segments score lower, invest in more training data or alternative signals for those groups',
        tips: [
          'Use individual behavioral signals rather than demographic defaults',
          'Monitor personalization quality metrics per segment continuously',
          'Treat personalization disparity as a product quality bug, not a feature request',
        ],
      },
      {
        step: 4,
        title: 'Disaggregate Metrics',
        description:
          'Break down all key metrics (satisfaction, conversion, retention, error rates) by user segment',
        example:
          'Dashboard showing NPS by segment: Power users: 72, Casual users: 65, Senior users: 41 — the aggregate 63 hides a problem',
        tips: [
          'Set alerts for significant variance between segments',
          'Treat large gaps as P1 issues requiring investigation',
          'Report disaggregated metrics in design reviews, not just engineering dashboards',
        ],
      },
      {
        step: 5,
        title: 'Conduct Cross-Group Research',
        description:
          'Run user research with diverse participants within each segment, not just between segments',
        example:
          'For a study on "enterprise users," recruit from different industries, company sizes, geographies, and roles — not just the type of enterprise customer the team knows best',
        tips: [
          'Budget for ongoing research with underrepresented segments',
          'Involve researchers who are themselves members of diverse groups',
          'Use co-design methods that give users agency in shaping the product',
        ],
      },
    ],

    dos: [
      'Create multiple distinct personas within every user segment',
      'Equalize segmentation granularity across all user groups',
      'Personalize based on individual behavior rather than group membership',
      'Disaggregate all key metrics by user segment to reveal hidden disparities',
      'Test with diverse participants within each segment, not just between segments',
      'Design accessibility as a spectrum of granular preferences, not a single toggle',
      'Involve members of each user group in design and research processes',
      'Treat localization as cultural adaptation, not just translation',
    ],

    donts: [
      'Don\'t treat any demographic group as a monolith ("seniors," "Gen Z," "international")',
      'Don\'t create unequal segmentation depth — more detail for familiar groups, less for unfamiliar ones',
      'Don\'t use demographic stereotypes as the primary signal for personalization',
      'Don\'t report aggregate metrics without segment-level breakdowns',
      'Don\'t ship a single "accessible mode" that attempts to serve all disability types',
      'Don\'t assume your team\'s intuition about unfamiliar groups is accurate without research',
      'Don\'t conflate translation with localization or inclusion with tokenism',
      'Don\'t rely on a single "representative" user from any underrepresented group',
    ],

    bestPractices: [
      {
        title: 'Behavioral Clustering Over Demographic Bucketing',
        description:
          'Use behavioral data to form segments rather than relying on demographic categories',
        rationale:
          'Behavioral clusters capture actual variation in needs and goals; demographic categories impose the team\'s assumptions',
        example:
          'Cluster users by feature usage patterns, support interactions, and engagement cadence — then examine how these clusters cross-cut demographics',
      },
      {
        title: 'Persona Diversity Mandates',
        description:
          'Require a minimum of 3 personas per segment in every design sprint and PRD',
        rationale:
          'Forces teams to confront within-group variation and prevents stereotypical design decisions',
        example:
          'Design review checklist item: "Does every user segment have at least 3 distinct personas with divergent needs?"',
      },
      {
        title: 'Equity Dashboards',
        description:
          'Build dashboards that compare personalization accuracy, satisfaction, and error rates across segments',
        rationale:
          'Aggregate metrics hide disparate experiences; segment-level dashboards make inequality visible and actionable',
        example:
          'Weekly equity report: recommendation click-through by segment, support ticket resolution time by segment, NPS by segment',
      },
      {
        title: 'Cross-Group Design Reviews',
        description:
          'Include reviewers from different demographics and backgrounds in design critiques',
        rationale:
          'People detect outgroup homogeneity applied to their own group more readily than others do',
        example:
          'Rotate design review participants to include people who represent the user groups being designed for',
      },
      {
        title: 'Progressive Personalization',
        description:
          'Start with behavioral defaults and progressively refine based on individual interaction rather than starting with demographic assumptions',
        rationale:
          'Avoids encoding stereotypes into the first experience while building toward genuine personalization',
        example:
          'Onboarding asks about goals and preferences rather than demographics; recommendations improve with each interaction',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships — Provide granular accessibility settings, not a single mode',
        implementation:
          'Offer separate controls for text size, contrast, motion reduction, screen reader optimization, and input method rather than a binary "accessible mode" toggle',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.4.1',
        guideline:
          'Use of Color — Recognize that "color blind" is not a single condition',
        implementation:
          'Support multiple color vision deficiency modes (protanopia, deuteranopia, tritanopia) rather than a single "color blind mode" that assumes all color vision differences are identical',
      },
      {
        wcagLevel: 'AA',
        criterion: '3.2.3',
        guideline:
          'Consistent Navigation — Provide consistent but adaptable navigation across diverse user groups',
        implementation:
          'Allow users to customize navigation patterns (sidebar vs top nav, icon vs text labels) rather than assuming a single layout works for all users within a segment',
      },
    ],

    ethics: [
      {
        concern: 'Algorithmic Stereotyping',
        severity: 'critical',
        explanation:
          'Recommendation and personalization systems trained on majority-group data produce uniform, stereotypical outputs for minority groups',
        mitigation:
          'Audit algorithm performance per segment. Invest in diverse training data. Measure and close personalization accuracy gaps across groups.',
      },
      {
        concern: 'Persona Stereotyping',
        severity: 'high',
        explanation:
          'Single personas per demographic group encode and propagate stereotypes through the design process',
        mitigation:
          'Mandate multiple personas per group. Base personas on research, not assumptions. Involve group members in persona creation.',
      },
      {
        concern: 'Exclusionary Defaults',
        severity: 'high',
        explanation:
          'Default experiences designed for the majority group may be unusable or offensive for minority groups',
        mitigation:
          'Test defaults with diverse users. Provide meaningful customization. Avoid encoding cultural assumptions into default states.',
      },
      {
        concern: 'Research Tokenism',
        severity: 'medium',
        explanation:
          'Including 1-2 users from an underrepresented group and treating their input as representative of the entire group',
        mitigation:
          'Recruit sufficient participants from each segment to capture within-group variation. Do not generalize from tokenistic samples.',
      },
      {
        concern: 'Demographic Profiling',
        severity: 'high',
        explanation:
          'Using demographic attributes to make assumptions about individual users reinforces stereotyping',
        mitigation:
          'Personalize based on behavior and expressed preferences rather than inferred demographic attributes. Give users control over how they are categorized.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'The Perception of Out-Group Homogeneity: The Perception of In-Group and Out-Group Members',
        author: 'Quattrone, G. A., & Jones, E. E.',
        year: 1980,
        doi: '10.1037/0022-3514.38.1.141',
        description:
          'The foundational study demonstrating that people perceive greater homogeneity in outgroups than ingroups',
        type: 'foundational',
      },
      {
        title: 'Perception of In-Group and Out-Group Variability: A Look at the Mechanism Underlying the Out-Group Homogeneity Effect',
        author: 'Park, B., & Rothbart, M.',
        year: 1982,
        doi: '10.1016/0022-1031(82)90040-6',
        description:
          'Explores the cognitive mechanisms — differential familiarity and category-level encoding — underlying the outgroup homogeneity effect',
        type: 'foundational',
      },
      {
        title: 'The Out-Group Homogeneity Effect in Natural and Minimal Groups',
        author: 'Linville, P. W., Fischer, G. W., & Salovey, P.',
        year: 1989,
        doi: '10.1037/0022-3514.57.2.165',
        description:
          'Demonstrates that the effect occurs even in arbitrarily assigned groups, ruling out purely experiential explanations',
        type: 'advanced',
      },
      {
        title: 'Outgroup Homogeneity Effects in Natural and Minimal Groups',
        author: 'Judd, C. M., & Park, B.',
        year: 1988,
        doi: '10.1037/0033-2909.103.1.109',
        description:
          'Meta-analytic review establishing the robustness of the effect across many group boundaries',
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
          'Comprehensive textbook covering outgroup homogeneity within the broader context of intergroup perception and stereotyping',
        type: 'foundational',
      },
      {
        title: 'Blindspot: Hidden Biases of Good People',
        author: 'Banaji, Mahzarin R., & Greenwald, Anthony G.',
        year: 2013,
        isbn: '9780345528438',
        description:
          'Explores implicit biases including outgroup homogeneity and their effects on real-world judgment and decision-making',
        type: 'practical',
      },
    ],

    articles: [
      {
        title: 'Avoiding Bias in User Research',
        author: 'Nielsen Norman Group',
        url: 'https://www.nngroup.com/articles/bias-in-research/',
        description:
          'Practical guide to avoiding stereotyping and outgroup homogeneity in user research methodology',
        type: 'practical',
      },
      {
        title: 'Designing for Diversity and Inclusion',
        author: 'Microsoft Inclusive Design',
        url: 'https://www.microsoft.com/design/inclusive/',
        description:
          'Framework for designing products that recognize within-group variation rather than treating demographic groups as monolithic',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'The Danger of a Single Story',
        author: 'Chimamanda Ngozi Adichie (TED)',
        url: 'https://www.ted.com/talks/chimamanda_ngozi_adichie_the_danger_of_a_single_story',
        description:
          'Powerful talk on how reducing groups to a single narrative — the essence of outgroup homogeneity — distorts understanding and produces stereotypical outcomes',
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
      'stereotyping', // Outgroup homogeneity feeds stereotypical thinking
      'in-group-bias', // Seeing ingroup as diverse while outgroup is uniform
      'cross-race-effect', // Difficulty distinguishing outgroup faces is a manifestation
      'confirmation-bias', // We seek evidence confirming outgroup uniformity
    ],

    conflicts: [
      'individuation', // Actively individuating outgroup members counteracts the effect
      'contact-hypothesis', // Meaningful intergroup contact reduces perceived homogeneity
    ],

    confusedWith: [
      'in-group-bias', // Related but distinct: ingroup bias favors the ingroup; outgroup homogeneity flattens the outgroup
      'stereotyping', // Stereotyping is a broader phenomenon; outgroup homogeneity is one mechanism feeding it
      'cross-race-effect', // Face recognition deficit is one manifestation, not the whole bias
    ],

    hierarchy: {
      parent: 'intergroup-bias',
      children: [
        'cross-race-effect',
        'they-all-look-alike-effect',
      ],
    },
  },
};
