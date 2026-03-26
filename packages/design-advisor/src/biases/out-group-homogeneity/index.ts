/**
 * OUT-GROUP HOMOGENEITY
 *
 * We perceive outgroup members as more similar to each other
 * than they really are, while seeing our own group as diverse.
 */

import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const outGroupHomogeneity: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'out-group-homogeneity',
    name: 'Out-Group Homogeneity',
    aliases: ['Out-Group Homogeneity Effect', 'They All Look Alike Effect', 'Cross-Race Effect'],
    category: BiasCategory.SOCIAL,
    relatedCategories: [
      BiasCategory.DECISION_MAKING,
      BiasCategory.PERCEPTION,
      BiasCategory.MEMORY,
    ],
    tags: [
      'social-perception',
      'stereotyping',
      'group-dynamics',
      'segmentation',
      'diversity',
      'personalization',
      'inclusive-design',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple:
      'We perceive members of other groups as more similar to each other than members of our own group.',

    detailed: `Out-group homogeneity is a perceptual bias in which individuals see members of groups they do not belong to ("outgroups") as more alike than they actually are, while perceiving their own group ("ingroup") as richly diverse. A sports fan might say "all fans of the rival team are aggressive," while recognizing wide personality differences among their own supporters.

This asymmetry arises because we have more frequent and varied contact with ingroup members, building nuanced mental models, whereas outgroup exposure is typically limited, shallow, or filtered through stereotypes. The effect is robust across cultures and group types — nationality, age, profession, platform preference, and more.

In product design, out-group homogeneity poses a serious risk: teams may collapse diverse user segments into monolithic personas ("enterprise users want X"), leading to one-size-fits-all features that satisfy no one. Combating this bias requires granular segmentation, inclusive research practices, and personalization strategies that honor real within-group variation.`,

    psychologyBasis: {
      discoveredBy: 'George Quattrone and Edward Jones',
      year: 1980,
      theory: 'Social Categorization and Intergroup Perception',
      mechanism: `The brain categorizes people into ingroups and outgroups, then processes them with different levels of detail. This happens because:

1. **Differential Exposure**: We interact with ingroup members in diverse settings, encoding individuating information; outgroup contact is rarer and more superficial
2. **Category-Based Processing**: When group membership is salient, the brain shifts from person-based to category-based encoding, compressing individual differences
3. **Exemplar Storage**: We store many distinct exemplars of ingroup members but fewer, more stereotypical exemplars of outgroup members
4. **Motivated Perception**: Perceiving ingroup diversity supports self-distinctiveness needs, while outgroup homogeneity simplifies social prediction
5. **Confirmation Bias Feedback**: Stereotypic expectations guide attention, so we notice outgroup behaviors that confirm "they're all alike" and ignore contradictory evidence`,
    },

    realWorldExample: `Quattrone and Jones (1980) asked students from Princeton and Rutgers to watch a person from the rival university make a choice. When asked what percentage of that university's students would make the same choice, participants predicted far higher agreement for the outgroup university than for their own. They literally assumed "they're all alike" while recognizing diversity among their own peers — even though the two student bodies were demographically similar.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `Out-group homogeneity directly undermines user-centered design when teams treat unfamiliar user segments as monolithic blocks. Designers can combat and leverage awareness of this bias to:

- Build genuinely diverse user personas grounded in real behavioral variation
- Implement granular segmentation that avoids collapsing distinct needs into one bucket
- Create personalization engines that serve within-group diversity rather than group-level stereotypes
- Design recommendation systems that surface diverse content, not just category-confirming items
- Ensure inclusive research recruitment that captures the full spectrum within every user group`,

    whenToUse: [
      {
        title: 'User Research & Persona Development',
        scenario:
          'When defining target user segments or building personas for a product',
        example:
          'Interview 8-12 people per segment to surface within-group variation; create spectrum personas instead of single archetypes',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Recommendation Diversity',
        scenario:
          'When designing content or product recommendation algorithms',
        example:
          'Inject exploratory diversity into recommendations so users from the same demographic are not funneled into identical content silos',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Marketing Segmentation',
        scenario:
          'When creating targeted campaigns or segment-specific messaging',
        example:
          'Split a broad "enterprise" segment into sub-segments by industry, team size, and workflow to avoid generic messaging',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Inclusive Interface Design',
        scenario:
          'When designing for audiences that differ from the core team demographically or culturally',
        example:
          'Conduct contextual inquiry with multiple subgroups within an underserved audience rather than relying on a single representative user',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Community & Social Features',
        scenario:
          'When designing forums, groups, or social interactions that involve multiple user communities',
        example:
          'Expose individual profiles and varied perspectives within groups rather than showing only aggregate group labels',
        impact: ImpactLevel.MEDIUM,
      },
    ],

    whenToAvoid: [
      {
        title: 'Privacy-Sensitive Contexts',
        reason:
          'Hyper-personalization to counter homogeneity assumptions can require invasive data collection',
        consequence:
          'Users feel surveilled; trust erodes; regulatory violations may occur',
        alternative:
          'Use behavioral signals and preference settings rather than demographic profiling',
      },
      {
        title: 'Small Data Sets',
        reason:
          'Creating granular sub-segments from too few data points introduces noise, not signal',
        consequence:
          'Spurious segments lead to worse personalization than a broader approach',
        alternative:
          'Start with broader segments and refine as data grows; acknowledge uncertainty',
      },
      {
        title: 'High-Stakes Decisions',
        reason:
          'Segmentation that drives credit, hiring, or healthcare must avoid reinforcing stereotypes',
        consequence:
          'Algorithmic discrimination and legal liability',
        alternative:
          'Use fairness-aware modeling; audit segments for disparate impact',
      },
      {
        title: 'Reinforcing Group Boundaries',
        reason:
          'Over-emphasizing group differences can deepen in-group/out-group divides',
        consequence:
          'Echo chambers, polarization, and exclusion of cross-group users',
        alternative:
          'Design for shared goals and interests alongside group-specific needs',
      },
    ],

    commonMistakes: [
      {
        title: 'Monolithic Personas',
        description:
          'Creating a single persona to represent an entire demographic (e.g., "The Enterprise User")',
        why: 'Teams outside the target group default to category-level thinking, flattening real diversity',
        fix: 'Create 2-3 variant personas per segment showing different goals, technical comfort, and contexts',
      },
      {
        title: 'Stereotype-Driven Defaults',
        description:
          'Setting default preferences based on group membership rather than individual behavior',
        why: 'Outgroup homogeneity leads designers to assume all members of a group want the same thing',
        fix: 'Use progressive profiling and behavioral signals to learn individual preferences over time',
      },
      {
        title: 'Homogeneous Test Panels',
        description:
          'Testing with one or two members of a target group and generalizing to the whole segment',
        why: 'Small samples reinforce the illusion that "they all think alike"',
        fix: 'Recruit diverse participants within each segment; vary age, experience, context, and use case',
      },
      {
        title: 'Filter Bubble Algorithms',
        description:
          'Recommendation engines that pigeonhole users by segment, serving identical content to all members',
        why: 'Category-based logic assumes within-group uniformity in preferences',
        fix: 'Add exploration and serendipity mechanisms; weight individual history over group averages',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.MEDIUM,
        description:
          'Layout decisions driven by outgroup assumptions may not serve actual user needs',
        examples: [
          'Dashboard layouts designed for "the average enterprise user" ignore power-user vs casual-user variation',
          'Mobile-first for one segment vs desktop-first for another may miss cross-segment overlap',
          'One-size-fits-all information architecture fails when subgroups have different mental models',
          'Configurable layouts let users self-differentiate rather than relying on imposed segments',
        ],
      },
      typography: {
        level: ImpactLevel.LOW,
        description:
          'Typography choices are less directly affected, but assumptions about reading level can be homogenizing',
        examples: [
          'Assuming an entire user group needs "simple" language can be patronizing',
          'Offering adjustable text size and density respects within-group variation',
          'Localization that treats an entire language group as monolithic ignores regional dialects and reading habits',
          'Content complexity should be a user setting, not a segment default',
        ],
      },
      color: {
        level: ImpactLevel.MEDIUM,
        description:
          'Color assumptions about cultural groups can reflect outgroup homogeneity',
        examples: [
          'Assuming "red means danger" universally ignores cultural variation within regions',
          'Theming options let users express individual preference regardless of group norms',
          'Accessibility color needs vary within any demographic, not just across groups',
          'Color symbolism research should sample within-group variation, not just group averages',
        ],
      },
      interaction: {
        level: ImpactLevel.HIGH,
        description:
          'Interaction patterns designed for a stereotypical outgroup member will miss real behavioral diversity',
        examples: [
          'Assuming "older users" all need large tap targets ignores tech-savvy seniors',
          'Assuming "developers" all prefer CLI over GUI ignores preference diversity',
          'Onboarding flows should adapt to demonstrated skill, not assumed group ability',
          'Feature gating by segment label rather than individual usage creates frustration',
        ],
      },
      content: {
        level: ImpactLevel.CRITICAL,
        description:
          'Content strategy is the area most vulnerable to outgroup homogeneity — generic messaging fails when groups are internally diverse',
        examples: [
          'Marketing copy targeting "millennials" as a uniform block misses massive within-cohort differences',
          'Help content calibrated for one skill level alienates both beginners and experts in the same segment',
          'Localized content that uses one dialect for an entire country can feel foreign to many users',
          'Personalized content recommendations based on individual behavior outperform segment-level defaults',
        ],
      },
      accessibility: {
        level: ImpactLevel.HIGH,
        description:
          'Accessibility needs vary enormously within any group; treating disabled users as a monolith is itself outgroup homogeneity',
        examples: [
          'Blind users have diverse preferences: some use screen readers, others use magnification, others use braille displays',
          'Motor impairments span a wide spectrum; one switch-access solution does not fit all',
          'Cognitive accessibility needs differ by individual, not by diagnosis label',
          'Inclusive design should offer multiple interaction modes rather than one "accessible version"',
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
        title: 'Spectrum Personas Over Single Archetypes',
        description:
          'Product team creates three variant personas within the "small business owner" segment to capture real diversity',
        code: `<div class="persona-spectrum">
  <h2>Small Business Owners — Persona Spectrum</h2>

  <article class="persona variant-a">
    <img src="persona-tech-savvy.jpg" alt="Priya, tech-forward owner">
    <h3>Priya — The Integrator</h3>
    <p class="context">Runs a 12-person agency. Uses 8+ SaaS tools daily.
    Wants API access and automation.</p>
    <ul class="needs">
      <li>API documentation and webhooks</li>
      <li>Bulk operations and scripting</li>
      <li>Advanced analytics dashboards</li>
    </ul>
  </article>

  <article class="persona variant-b">
    <img src="persona-hands-on.jpg" alt="Marcus, hands-on owner">
    <h3>Marcus — The Operator</h3>
    <p class="context">Solo bakery owner. Uses phone for everything.
    Needs simple, visual tools.</p>
    <ul class="needs">
      <li>Mobile-first interface</li>
      <li>Visual drag-and-drop workflows</li>
      <li>Quick-start templates</li>
    </ul>
  </article>

  <article class="persona variant-c">
    <img src="persona-delegator.jpg" alt="Fatima, delegating owner">
    <h3>Fatima — The Delegator</h3>
    <p class="context">Owns 3 retail locations. Delegates tech to staff.
    Needs role-based permissions and reports.</p>
    <ul class="needs">
      <li>Role-based access control</li>
      <li>Automated weekly reports</li>
      <li>Staff onboarding flows</li>
    </ul>
  </article>
</div>`,
        explanation:
          'Instead of one "small business owner" persona, three variants reveal that this single segment contains users with radically different technical abilities, workflows, and needs. This prevents the team from designing only for the stereotype.',
        principle:
          'Within-group diversity must be made visible to prevent homogeneity assumptions',
        metrics: {
          before: 'Feature adoption 34% across SMB segment with single-persona design',
          after: 'Feature adoption 58% after designing for three persona variants',
          improvement: '71% increase in feature adoption by honoring within-segment diversity',
        },
      },
      {
        title: 'Behavioral Personalization Over Demographic Defaults',
        description:
          'Recommendation engine weights individual behavior over segment membership',
        code: `<div class="recommendation-engine">
  <h3>Recommended for You</h3>
  <p class="explanation">Based on your recent activity, not just your profile</p>

  <div class="rec-cards">
    <article class="rec-card">
      <span class="rec-reason">You read 3 articles on TypeScript</span>
      <h4>Advanced TypeScript Patterns</h4>
    </article>
    <article class="rec-card explore">
      <span class="rec-reason">Something different you might enjoy</span>
      <h4>Designing for Accessibility</h4>
    </article>
    <article class="rec-card">
      <span class="rec-reason">Popular with people who share your interests</span>
      <h4>State Management Comparison</h4>
    </article>
  </div>

  <details class="transparency">
    <summary>How we choose recommendations</summary>
    <p>70% your individual history, 20% similar users, 10% exploration.
    We never assume preferences from demographics alone.</p>
  </details>
</div>`,
        explanation:
          'The system explains that recommendations are driven by individual behavior (70%), collaborative filtering from similar users (20%), and deliberate exploration (10%). It explicitly avoids demographic-based assumptions, countering outgroup homogeneity at the algorithmic level.',
        principle:
          'Individual behavioral signals produce better personalization than group-level stereotypes',
      },
      {
        title: 'Inclusive Research Recruitment Grid',
        description:
          'Research plan that ensures within-group diversity in participant recruitment',
        code: `<table class="recruitment-grid">
  <caption>Participant Matrix — "Enterprise Users" Segment</caption>
  <thead>
    <tr>
      <th>Dimension</th>
      <th>Variant A</th>
      <th>Variant B</th>
      <th>Variant C</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Company Size</td>
      <td>50-200 employees</td>
      <td>200-1000 employees</td>
      <td>1000+ employees</td>
    </tr>
    <tr>
      <td>Role</td>
      <td>End user / IC</td>
      <td>Team lead / Manager</td>
      <td>Admin / IT</td>
    </tr>
    <tr>
      <td>Tech Comfort</td>
      <td>Low (guided UI)</td>
      <td>Medium (power features)</td>
      <td>High (API / CLI)</td>
    </tr>
    <tr>
      <td>Industry</td>
      <td>Healthcare</td>
      <td>Finance</td>
      <td>Education</td>
    </tr>
  </tbody>
</table>`,
        explanation:
          'The recruitment grid forces the team to sample across multiple dimensions within "enterprise users," preventing the common mistake of interviewing three similar people and concluding "enterprise users want X." Each cell combination produces a different user profile.',
        principle:
          'Structured variation in research recruitment defeats homogeneity bias',
      },
    ],

    bad: [
      {
        title: 'Monolithic Segment Targeting',
        description:
          'Marketing campaign treats an entire generation as a single behavioral unit',
        code: `<!-- DON'T DO THIS -->
<section class="campaign-gen-z">
  <h2>Built for Gen Z</h2>
  <p>We know your generation. You want everything fast,
  mobile, and social. That's why we built this app
  with TikTok-style scrolling and emoji reactions.</p>
  <div class="features">
    <span>Short-form video only</span>
    <span>Social sharing built in</span>
    <span>No desktop version needed</span>
  </div>
</section>`,
        explanation:
          'This assumes all Gen Z users want the same thing: short video, mobile-only, social features. In reality, Gen Z includes bookworms, spreadsheet enthusiasts, desktop gamers, and privacy-focused individuals. The monolithic framing alienates large portions of the target segment.',
        principle:
          'Never collapse a diverse demographic into a single behavioral stereotype',
      },
      {
        title: 'Demographic-Only Recommendations',
        description:
          'Content algorithm that determines feed based solely on profile demographics',
        code: `<!-- DON'T DO THIS -->
<div class="feed">
  <p class="feed-note">Showing content for: Female, 25-34, Urban</p>
  <article>10 Must-Have Fashion Trends This Season</article>
  <article>Best Brunch Spots in Your City</article>
  <article>Skincare Routine for Your 20s</article>
  <article>Wedding Planning Checklist</article>
</div>`,
        explanation:
          'The algorithm assumes all women aged 25-34 in urban areas share identical interests in fashion, brunch, skincare, and weddings. This is outgroup homogeneity encoded into software — it ignores individual interests, career focus, hobbies, and life circumstances.',
        principle:
          'Demographic profiling without behavioral data encodes stereotypes into algorithms',
      },
      {
        title: 'One "Accessible Version" for All',
        description:
          'A single alternative interface meant to serve all users with disabilities',
        code: `<!-- DON'T DO THIS -->
<div class="accessible-mode">
  <h2>Accessible Version</h2>
  <p>This simplified version is designed for users with disabilities.</p>
  <ul>
    <li>Extra large text</li>
    <li>High contrast only</li>
    <li>No images</li>
    <li>Keyboard only</li>
    <li>Linear layout</li>
  </ul>
  <a href="/accessible">Switch to Accessible Version</a>
</div>`,
        explanation:
          'This treats "users with disabilities" as a homogeneous group with identical needs. A blind user, a user with limited dexterity, and a user with ADHD have completely different requirements. One stripped-down version serves none of them well and stigmatizes all of them.',
        principle:
          'Disability is not a monolith — provide multiple accessibility options, not one "special" mode',
      },
    ],

    realWorld: [
      {
        company: 'Spotify',
        product: 'Discover Weekly & Daily Mixes',
        description: 'Spotify generates individualized playlists using listening history and micro-taste patterns rather than broad genre or demographic segments. Two users in the same age group and city receive entirely different recommendations based on their unique behavior.',
        effectiveness: 'very-effective',
        analysis: 'By prioritizing individual behavioral signals over demographic segments, Spotify avoids collapsing diverse listeners into uniform taste profiles. The result is recommendation quality that scales with engagement rather than stereotyping.',
      },
      {
        company: 'Airbnb',
        product: 'Inclusive Design & Anti-Discrimination',
        description: 'After research revealed hosts treating certain guest demographics as homogeneous (and discriminating accordingly), Airbnb reduced profile photo prominence, added instant book, and implemented anti-discrimination policies to encourage individual evaluation.',
        effectiveness: 'effective',
        analysis: 'Airbnb recognized that outgroup homogeneity drove discriminatory host behavior — perceiving all members of a racial group as similar. Design changes forced individuating attention: reviews, verified identity, and booking guarantees shift focus from group to person.',
      },
      {
        company: 'Netflix',
        product: 'Personalized Artwork',
        description: 'Netflix serves different thumbnail artwork for the same title to different users based on individual viewing patterns. A comedy fan and an action fan see different frames from the same movie. This combats the assumption that all users in a region or demographic respond to the same imagery.',
        effectiveness: 'very-effective',
        analysis: 'Personalized thumbnails are a direct counter to outgroup homogeneity in content marketing. Instead of one poster per title (assuming all viewers respond the same way), Netflix treats each user as an individual with unique visual preferences.',
      },
      {
        company: 'Microsoft',
        product: 'Inclusive Design Toolkit',
        description: 'Microsoft\'s toolkit reframes disability along a spectrum (permanent, temporary, situational) and refuses to treat "disabled users" as a monolithic segment. Design patterns serve individual capability contexts rather than diagnostic labels.',
        effectiveness: 'very-effective',
        analysis: 'The toolkit explicitly fights outgroup homogeneity by showing that a "disability" segment actually contains enormous variation. One-armed, broken-armed, and carrying-a-baby users all benefit from one-handed design but for different reasons.',
      },
    ],

    abTests: [
      {
        title: 'Segment Granularity: Monolithic vs Multi-Variant Personas',
        hypothesis:
          'Designing for 3 persona variants within a segment will increase overall satisfaction vs designing for 1 average persona',
        controlVersion: {
          description:
            'Dashboard designed for single "data analyst" persona: medium complexity, standard chart types, desktop layout',
          metrics: {
            conversionRate: '41%',
            timeOnPage: '4:12',
            scrollDepth: '55%',
          },
        },
        treatmentVersion: {
          description:
            'Dashboard with role-based presets: "Explorer" (visual/simple), "Analyst" (tables/filters), "Executive" (KPIs/summaries) — user chooses on first visit',
          metrics: {
            conversionRate: '63%',
            timeOnPage: '6:45',
            scrollDepth: '82%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Allowing users to self-identify into subtypes increased feature adoption by 54% and time-on-page by 60%. Post-study interviews revealed users felt "the product understood them" rather than forcing a one-size-fits-all experience.',
          learnings: [
            'Even simple 3-way segmentation dramatically outperforms monolithic design',
            'Self-selection into subtypes is more effective than algorithmic assignment',
            'Users who felt personally served had 3x higher retention at 30 days',
            'The team discovered use cases they had never anticipated from the "Explorer" subtype',
          ],
        },
      },
      {
        title: 'Recommendation Diversity: Group Average vs Individual Behavior',
        hypothesis:
          'Recommendations based on individual history will outperform group-demographic averages',
        controlVersion: {
          description:
            'Content feed populated by "most popular with your demographic" — age, role, and industry drive ranking',
          metrics: {
            conversionRate: '18%',
            clickThroughRate: '9%',
          },
        },
        treatmentVersion: {
          description:
            'Content feed weighted 70% individual history, 20% collaborative filtering (similar behavior, not demographics), 10% exploration',
          metrics: {
            conversionRate: '31%',
            clickThroughRate: '22%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Individual behavioral signals outperformed demographic averages by 72% in conversion and 144% in click-through. The demographic-based feed suffered because within-group variation was larger than between-group variation for most content preferences.',
          learnings: [
            'Within-group variation in content preference exceeded between-group variation',
            'Demographic-only recommendations felt "generic" in user feedback',
            'The 10% exploration component surfaced content that broke stereotype expectations',
            'Collaborative filtering by behavior (not demographics) found non-obvious affinity groups',
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
        name: 'Monolithic Segment Labels',
        description:
          'Broad group labels used without sub-segmentation (e.g., "enterprise users", "millennials", "disabled users")',
        howToSpot:
          'Look for personas, marketing copy, or feature specs that reference a group as a single entity without acknowledging internal variation',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Uniform Defaults by Group',
        description:
          'Default settings, layouts, or content that vary by demographic group but not by individual behavior',
        howToSpot:
          'Check if onboarding, dashboards, or recommendations change based on profile demographics rather than usage patterns',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Single "Alternative" Version',
        description:
          'One stripped-down or modified version intended for an entire group (e.g., "simplified mode for seniors")',
        howToSpot:
          'Look for a binary switch between "standard" and "accessible/simplified/basic" modes',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Homogeneous Imagery',
        description:
          'Marketing or UI imagery that shows all members of a group in the same context, activity, or appearance',
        howToSpot:
          'Review stock photos and illustrations for variety within depicted groups — same poses, settings, or activities suggest homogeneity assumptions',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Generic Segment Messaging',
        description:
          'Copy that addresses an entire segment with a single tone, value proposition, or use case',
        howToSpot:
          'Look for marketing pages targeting a segment with one narrative (e.g., "Developers love our API" without acknowledging non-API users in the developer segment)',
        severity: ImpactLevel.HIGH,
      },
    ],

    patterns: [
      {
        name: 'Monolithic Persona Pattern',
        description: 'Product decisions referencing a single persona per user segment',
        indicators: [
          'One persona document per demographic or role',
          'Feature specs that say "the user wants X" for an entire segment',
          'Stakeholder language like "our enterprise customers need..."',
          'Research studies with 1-2 participants representing an entire group',
        ],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Demographic Pigeonholing Pattern',
        description: 'Algorithms or flows that route users based on demographic rather than behavioral data',
        indicators: [
          'Content feeds driven by age, gender, or location alone',
          'Onboarding paths determined by job title without skill assessment',
          'Marketing automation using demographic-only triggers',
          'A/B test segments defined by demographics rather than behavior',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Uniform Outgroup Treatment Pattern',
        description: 'Interfaces that offer one experience for the "other" group while providing rich options for the primary group',
        indicators: [
          'Admin interfaces with many options vs end-user interfaces with few',
          'Detailed internal tools vs "simple" external customer tools',
          'Granular settings for primary market, basic settings for secondary markets',
          'Localization that deeply adapts for one region but uses generic translation for all others',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'medium',
      },
    ],

    checklistQuestions: [
      'Do our personas represent within-segment diversity or just segment averages?',
      'Are we designing features based on stereotypes about a user group, or on observed behavioral data?',
      'Do our recommendation or personalization systems use individual signals or demographic defaults?',
      'Have we recruited diverse participants within each target segment for usability testing?',
      'Are there user groups we treat as monolithic because we have limited contact with them?',
      'Do we offer flexible interfaces that let users self-configure, or rigid presets per segment?',
      'Are our accessibility solutions diverse enough to serve different disability types individually?',
      'Does our marketing messaging acknowledge variation within target segments?',
      'Have we audited our algorithms for demographic stereotyping vs behavioral personalization?',
      'Do team members from non-target demographics have a voice in design decisions for those segments?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in social psychology and inclusive UX design, specializing in out-group homogeneity bias.

Analyze the provided design for out-group homogeneity patterns. Identify:

1. **Monolithic Segmentation**: Where diverse user groups are treated as uniform blocks
2. **Stereotype-Driven Defaults**: Where group-level assumptions replace individual behavioral data
3. **Homogeneous Representation**: Where imagery, copy, or personas flatten within-group diversity
4. **Algorithmic Pigeonholing**: Where recommendations or personalization rely on demographic labels over behavior
5. **Unequal Granularity**: Where the primary user group gets rich options while secondary groups get one-size-fits-all treatment

For each pattern found:
- Identify which user group is being homogenized
- Assess the real within-group variation being ignored
- Determine the design and business impact of the assumption
- Evaluate whether the design reinforces stereotypes
- Suggest specific improvements for honoring individual variation

Consider:
- Does the team have direct contact with the user groups being designed for?
- Are personas built from diverse research or from assumptions?
- Do algorithms personalize by individual behavior or by group membership?
- Are accessibility solutions diverse enough, or do they treat disability as monolithic?
- Is marketing segmentation granular enough to avoid stereotyping?

Provide actionable recommendations for inclusive, diversity-honoring design.`,

    outputSchema: {
      type: 'object',
      properties: {
        homogeneityPatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              affectedGroup: { type: 'string' },
              assumedUniformity: { type: 'string' },
              realVariation: { type: 'string' },
              designImpact: { type: 'string' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'affectedGroup',
              'assumedUniformity',
              'recommendation',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            segmentGranularity: { type: 'number' },
            personaDiversity: { type: 'number' },
            algorithmicFairness: { type: 'number' },
            inclusionScore: { type: 'number' },
          },
          required: [
            'segmentGranularity',
            'personaDiversity',
            'algorithmicFairness',
            'inclusionScore',
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
        title: 'Audit Existing Segments for Homogeneity',
        description:
          'Review all current personas, segments, and user group definitions for monolithic assumptions',
        example:
          'List every segment label in your product specs and identify which ones treat diverse groups as uniform',
        tips: [
          'Flag any persona that is a single archetype for a large group',
          'Look for phrases like "enterprise users want" or "young users prefer"',
          'Ask: do we have direct, varied contact with this group?',
        ],
      },
      {
        step: 2,
        title: 'Conduct Within-Group Research',
        description:
          'For each segment at risk of homogeneity bias, recruit diverse participants and document variation',
        example:
          'Interview 10 "enterprise users" spanning 3 industries, 3 roles, and 3 company sizes',
        tips: [
          'Use a recruitment grid to force variation',
          'Document disagreements between participants, not just consensus',
          'Create spectrum personas that show the range, not just the center',
        ],
      },
      {
        step: 3,
        title: 'Build Multi-Variant Personas',
        description:
          'Replace monolithic personas with 2-3 variants per segment that capture key axes of variation',
        example:
          'Replace "The Developer" with "The API-First Developer", "The Visual Builder", and "The Occasional Scripter"',
        tips: [
          'Identify 2-3 dimensions that drive the most behavioral variation',
          'Name variants to make differences memorable for the team',
          'Include edge cases that challenge team assumptions',
        ],
      },
      {
        step: 4,
        title: 'Design for Self-Configuration',
        description:
          'Create interfaces that let users customize their experience rather than imposing segment-based defaults',
        example:
          'Offer dashboard presets ("Explorer", "Analyst", "Executive") that users choose, not auto-assigned',
        tips: [
          'Preference learning is better than demographic assignment',
          'Progressive disclosure lets users reveal complexity at their own pace',
          'Default to the middle path, then adapt based on behavior',
        ],
      },
      {
        step: 5,
        title: 'Audit Algorithms for Stereotyping',
        description:
          'Review recommendation, personalization, and segmentation algorithms for demographic-over-behavioral weighting',
        example:
          'Measure: what percentage of recommendation signal comes from demographics vs individual behavior?',
        tips: [
          'Target 70%+ weight on individual behavioral signals',
          'Add exploration/serendipity to break filter bubbles',
          'Test recommendations across within-segment subgroups',
        ],
      },
    ],

    dos: [
      'Create multiple variant personas per user segment',
      'Recruit diverse participants within each research segment',
      'Prioritize individual behavioral data over demographic labels in personalization',
      'Offer customizable interfaces that let users self-configure',
      'Document within-group variation as prominently as between-group differences',
      'Add serendipity and exploration to recommendation engines',
      'Test with edge-case users who defy segment stereotypes',
      'Acknowledge that accessibility needs vary widely within disability categories',
    ],

    donts: [
      'Don\'t use a single persona to represent an entire demographic or role',
      'Don\'t base recommendations solely on age, gender, location, or job title',
      'Don\'t create one "simplified" or "accessible" version for an entire group',
      'Don\'t generalize from 1-2 research participants to an entire segment',
      'Don\'t assume cultural uniformity within a country, language, or region',
      'Don\'t let your team\'s distance from a user group substitute for research',
      'Don\'t conflate group averages with individual preferences',
      'Don\'t design secondary markets or user groups with less granularity than your primary market',
    ],

    bestPractices: [
      {
        title: 'Spectrum Personas',
        description:
          'Create 2-3 variant personas per segment showing the range of real user needs and behaviors',
        rationale:
          'Prevents teams from designing for an imaginary "average" that represents no one',
        example:
          'Instead of "The Enterprise User," create "The Power Admin," "The Casual Viewer," and "The Integration Builder"',
      },
      {
        title: 'Behavioral Over Demographic Personalization',
        description:
          'Weight individual usage patterns at least 3x more than demographic attributes in recommendation systems',
        rationale:
          'Within-group behavioral variation typically exceeds between-group variation for most product decisions',
        example:
          'Recommendation model: 70% individual history, 20% behavioral cohort, 10% exploration',
      },
      {
        title: 'Within-Group Recruitment Grids',
        description:
          'Use structured matrices to ensure research participants span key variation dimensions within each segment',
        rationale:
          'Unstructured recruitment naturally gravitates toward prototypical members, reinforcing homogeneity bias',
        example:
          'For "developer" segment, cross role (frontend/backend/full-stack) with experience (junior/senior) and context (startup/enterprise)',
      },
      {
        title: 'Self-Selection Over Assignment',
        description:
          'Let users choose their experience level, workflow preference, or interface mode rather than auto-assigning by demographic',
        rationale:
          'Self-selection honors individual variation; assignment imposes stereotypes',
        example:
          'Onboarding asks "Which best describes your workflow?" not "What is your job title?"',
      },
      {
        title: 'Continuous Diversity Audits',
        description:
          'Regularly review personas, algorithms, and content for creeping homogeneity assumptions',
        rationale:
          'Outgroup homogeneity is a persistent default; without active countering, it returns over time',
        example:
          'Quarterly review: "Are any of our segments being treated as monolithic? Where has diversity been flattened?"',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships — Ensure interface adaptations serve individual needs, not group-level assumptions',
        implementation:
          'Provide multiple accessibility options (text size, contrast, input mode) rather than one binary "accessible mode" toggle',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.4.1',
        guideline:
          'Use of Color — Recognize that color perception varies within disability categories',
        implementation:
          'Offer multiple contrast themes (high contrast, dark mode, custom) rather than one "accessible" palette',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.1.1',
        guideline:
          'Keyboard — Provide multiple input modalities recognizing motor ability variation',
        implementation:
          'Support keyboard, switch access, voice, and pointer input simultaneously rather than assuming one modality per group',
      },
      {
        wcagLevel: 'AAA',
        criterion: '3.1.5',
        guideline:
          'Reading Level — Recognize literacy and cognitive diversity within user groups',
        implementation:
          'Offer content complexity controls (simplified, standard, detailed) as user preferences, not segment defaults',
      },
    ],

    ethics: [
      {
        concern: 'Algorithmic Stereotyping',
        severity: 'critical',
        explanation:
          'Personalizing by demographic group rather than individual behavior can encode and scale stereotypes',
        mitigation:
          'Audit recommendation and personalization algorithms for demographic-over-behavioral weighting. Target 70%+ individual signal weight. Test for disparate impact across subgroups.',
      },
      {
        concern: 'Research Tokenism',
        severity: 'high',
        explanation:
          'Including 1-2 members of an underrepresented group and treating their views as representative of the whole group',
        mitigation:
          'Recruit diverse participants within each group. Document disagreements. Never say "users in group X want Y" from 1-2 interviews.',
      },
      {
        concern: 'Differential Design Investment',
        severity: 'high',
        explanation:
          'Investing deeply in primary user group experience while giving secondary groups a generic, one-size-fits-all treatment',
        mitigation:
          'Ensure secondary markets and user groups receive comparable granularity in research, design, and personalization.',
      },
      {
        concern: 'Reinforcing Social Categories',
        severity: 'medium',
        explanation:
          'Over-emphasizing group boundaries can deepen us-vs-them thinking in product communities',
        mitigation:
          'Design for shared goals and interests alongside group-specific needs. Create cross-group interaction opportunities.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'The Perception of Out-Group Homogeneity: Differential Judgments of Variability at the Individual and Group Levels',
        author: 'Quattrone, G. A., & Jones, E. E.',
        year: 1980,
        doi: '10.1037/0022-3514.38.1.141',
        description:
          'The foundational paper demonstrating that people perceive outgroup members as more similar to each other than ingroup members',
        type: 'foundational',
      },
      {
        title: 'Perceived Variability of Personal Characteristics in In-Groups and Out-Groups',
        author: 'Park, B., & Rothbart, M.',
        year: 1982,
        doi: '10.1016/0022-1031(82)90040-9',
        description:
          'Extended outgroup homogeneity research showing the effect across multiple trait dimensions',
        type: 'foundational',
      },
      {
        title: 'The Out-Group Homogeneity Effect in Natural and Minimal Groups',
        author: 'Judd, C. M., & Park, B.',
        year: 1988,
        doi: '10.1037/0022-3514.54.5.778',
        description:
          'Demonstrated the effect occurs even in minimal group paradigms, suggesting deep cognitive roots',
        type: 'advanced',
      },
      {
        title: 'Perceiving Out-Group Members as Unresponsive: Implications for Approach-Related Emotions, Intentions, and Behavior',
        author: 'Paolini, S., Hewstone, M., & Cairns, E.',
        year: 2007,
        description:
          'Explored behavioral consequences of outgroup homogeneity perception in real-world intergroup contexts',
        type: 'case-study',
      },
    ],

    books: [
      {
        title: 'Social Psychology',
        author: 'Aronson, Elliot, Wilson, Timothy D., & Akert, Robin M.',
        year: 2018,
        isbn: '9780134641287',
        description:
          'Comprehensive textbook with detailed coverage of outgroup homogeneity and intergroup perception',
        type: 'foundational',
      },
      {
        title: 'Blindspot: Hidden Biases of Good People',
        author: 'Banaji, Mahzarin R., & Greenwald, Anthony G.',
        year: 2013,
        isbn: '9780345528438',
        description:
          'Accessible exploration of implicit biases including outgroup homogeneity and its consequences',
        type: 'practical',
      },
      {
        title: 'Mismatch: How Inclusion Shapes Design',
        author: 'Holmes, Kat',
        year: 2018,
        isbn: '9780262539487',
        description:
          'Design-focused book on how homogeneity assumptions create exclusion and how inclusive methods counter them',
        type: 'practical',
      },
    ],

    articles: [
      {
        title: 'Inclusive Design at Microsoft',
        author: 'Microsoft Design',
        url: 'https://inclusive.microsoft.design/',
        description:
          'Practical inclusive design methodology that explicitly counters outgroup homogeneity in product design',
        type: 'practical',
      },
      {
        title: 'Designing for Diversity: Why Homogeneous Teams Build Exclusionary Products',
        author: 'Nielsen Norman Group',
        url: 'https://www.nngroup.com/articles/inclusive-design/',
        description:
          'Research-backed article on how team composition affects design assumptions about user groups',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'The Danger of a Single Story',
        author: 'Chimamanda Ngozi Adichie (TED)',
        url: 'https://www.ted.com/talks/chimamanda_ngozi_adichie_the_danger_of_a_single_story',
        description:
          'Powerful talk on how single narratives about groups create outgroup homogeneity, with direct relevance to design and storytelling',
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
      'stereotyping', // Outgroup homogeneity fuels and is fueled by stereotypes
      'in-group-bias', // Seeing ingroup as diverse while favoring them creates compound bias
      'confirmation-bias', // Seeking evidence that confirms "they're all alike"
      'fundamental-attribution-error', // Attributing outgroup behavior to disposition rather than situation
    ],

    conflicts: [
      'individuation', // Direct contact and individuating information breaks homogeneity
      'perspective-taking', // Actively imagining individual outgroup experiences counters the effect
    ],

    confusedWith: [
      'in-group-bias', // Related but distinct: ingroup bias is preference, outgroup homogeneity is perception
      'stereotyping', // Outgroup homogeneity is one mechanism that enables stereotyping
      'cross-race-effect', // A specific manifestation of outgroup homogeneity in face recognition
    ],

    hierarchy: {
      parent: 'intergroup-bias',
      children: [
        'cross-race-effect',
        'occupational-stereotyping',
        'cultural-homogeneity-assumption',
      ],
    },
  },
};
