/**
 * STEREOTYPING
 *
 * We apply generalized beliefs about a group to individual members,
 * ignoring their unique characteristics.
 */

import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const stereotyping: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'stereotyping',
    name: 'Stereotyping',
    aliases: ['Social Stereotyping', 'Group Attribution Error', 'Categorical Thinking'],
    category: BiasCategory.SOCIAL,
    relatedCategories: [
      BiasCategory.DECISION_MAKING,
      BiasCategory.PERCEPTION,
      BiasCategory.MEMORY,
    ],
    tags: [
      'inclusion',
      'diversity',
      'personas',
      'user-segmentation',
      'representation',
      'accessibility',
      'ethics',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple:
      'We apply generalized beliefs about a group to individual members, ignoring their unique characteristics.',

    detailed: `Stereotyping is a social-cognitive bias in which people apply generalized beliefs, expectations, or assumptions about a group to an individual member of that group, overlooking the person's unique traits, behaviors, and context. These mental shortcuts evolved to help the brain rapidly categorize complex social information, but they frequently produce inaccurate judgments and reinforce systemic inequality.

In product design, stereotyping manifests when designers build personas, segmentation models, stock imagery, form fields, or default settings that assume users fit a particular demographic profile. For example, defaulting a "title" field to "Mr.", using only light-skinned hand models in product photos, or creating personas that map age to technical competence all embed stereotypes into the product experience.

Designers must actively audit their work for stereotypical assumptions, ensure inclusive representation, and create flexible interfaces that accommodate the full spectrum of human identity rather than forcing users into predefined categories.`,

    psychologyBasis: {
      discoveredBy: 'Henri Tajfel',
      year: 1969,
      theory: 'Social Identity Theory & Social Categorization',
      mechanism: `The brain categorizes people into groups and applies generalized attributes to simplify social processing. This happens because:

1. **Cognitive Economy**: Categorizing individuals into groups reduces the mental effort needed to process complex social information
2. **In-Group / Out-Group Differentiation**: People perceive members of out-groups as more similar to each other than members of in-groups (out-group homogeneity effect)
3. **Schema Activation**: Once a category is activated (e.g., "elderly user"), associated stereotypical traits (e.g., "not tech-savvy") are automatically retrieved from memory
4. **Confirmation Bias Loop**: People selectively attend to and remember information that confirms stereotypes while ignoring contradictory evidence
5. **Cultural Transmission**: Stereotypes are learned through socialization, media exposure, and repeated cultural narratives, making them feel like "common knowledge"

The process is largely automatic and unconscious — even people who explicitly reject stereotypes can exhibit implicit stereotyping in their design decisions.`,
    },

    realWorldExample: `In 2015, Google Photos' image recognition system tagged photos of Black people as "gorillas." This was not a deliberate act of racism but rather the result of training data that stereotypically under-represented dark-skinned faces. The system had learned patterns from biased datasets that reflected societal stereotypes. The incident illustrates how unconscious stereotyping embedded in design processes — from data collection to model training — can produce deeply harmful outcomes even when no individual designer intended harm.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `Stereotyping affects every stage of the design process, from user research and persona creation to visual design, form fields, and default settings. Designers can combat this bias to:

- Create inclusive personas that reflect the true diversity of their user base
- Design flexible forms that don't force users into stereotypical categories
- Select imagery and illustrations that represent diverse identities authentically
- Build segmentation models based on behaviors rather than demographic assumptions
- Set accessible, neutral defaults that don't privilege one group over another`,

    whenToUse: [
      {
        title: 'Inclusive Avatar and Profile Systems',
        scenario:
          'When designing identity representation features for users',
        example:
          'Offer a wide spectrum of skin tones, hairstyles, body types, and accessories in avatar builders rather than defaulting to a narrow representation',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Gender-Neutral Form Design',
        scenario:
          'When collecting personal information through forms',
        example:
          'Replace binary "Male/Female" radio buttons with an open text field or inclusive options including non-binary and prefer-not-to-say',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Diverse Stock Photography',
        scenario:
          'When selecting imagery for marketing, product, or onboarding screens',
        example:
          'Use photos that represent diverse ages, ethnicities, abilities, and family structures rather than defaulting to homogeneous models',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Behavior-Based Personas',
        scenario:
          'When creating user personas for design and product decisions',
        example:
          'Define personas by goals, pain points, and behavioral patterns rather than by age, gender, or ethnicity',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Accessible Defaults',
        scenario:
          'When setting default configurations for new users',
        example:
          'Default to high-contrast mode availability, adjustable text sizes, and keyboard navigation rather than assuming all users are fully sighted mouse users',
        impact: ImpactLevel.HIGH,
      },
    ],

    whenToAvoid: [
      {
        title: 'Demographic Targeting Without Behavioral Data',
        reason:
          'Targeting users solely by demographic group applies stereotypical assumptions about their needs',
        consequence:
          'Users receive irrelevant content; excluded groups feel alienated or invisible',
        alternative:
          'Segment by observed behavior, stated preferences, and actual usage patterns',
      },
      {
        title: 'Persona Design Based on Demographics Alone',
        reason:
          'Creating personas defined primarily by age, gender, or ethnicity embeds stereotypes into design decisions',
        consequence:
          'Products are designed for a fictional "typical" user that excludes real people',
        alternative:
          'Build behavioral personas grounded in research data, user interviews, and observed patterns',
      },
      {
        title: 'Assumptions About Technical Competence',
        reason:
          'Mapping age or gender to technical skill level is a common stereotype',
        consequence:
          'Condescending interfaces for older users; overly complex defaults for younger users',
        alternative:
          'Offer progressive disclosure and let users self-select their experience level',
      },
      {
        title: 'Cultural Assumptions in Localization',
        reason:
          'Assuming cultural preferences based on language or region oversimplifies diverse populations',
        consequence:
          'Insensitive imagery, tone, or layout that alienates users within a region',
        alternative:
          'Conduct local user research and offer customization options rather than assuming regional homogeneity',
      },
    ],

    commonMistakes: [
      {
        title: 'Homogeneous Stock Photos',
        description:
          'Using only young, able-bodied, light-skinned models in product imagery',
        why: 'Signals to underrepresented users that the product is "not for them" and reinforces narrow beauty/success standards',
        fix: 'Audit imagery for diversity across age, ethnicity, ability, body type, and gender presentation; use inclusive illustration systems',
      },
      {
        title: 'Binary Gender Fields',
        description:
          'Forcing users into "Male" or "Female" without alternatives',
        why: 'Excludes non-binary, genderqueer, and intersex individuals; collects inaccurate data for many users',
        fix: 'Use open text fields, add "Non-binary", "Prefer not to say", and "Prefer to self-describe" options, or remove the field if not essential',
      },
      {
        title: 'Age-Based Feature Gating',
        description:
          'Hiding advanced features from older users or simplifying interfaces based on assumed age',
        why: 'Many older adults are highly technical; many younger users prefer simple interfaces',
        fix: 'Let users choose their complexity level; offer progressive disclosure for all age groups',
      },
      {
        title: 'Stereotypical Persona Names and Photos',
        description:
          'Using personas like "Tech-Savvy Tom (25, male)" and "Cautious Carol (65, female)"',
        why: 'Embeds age and gender stereotypes directly into design decisions, biasing the entire team',
        fix: 'Name personas by behavior ("Power User", "Casual Browser") and avoid demographic photos that trigger stereotyping',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.MEDIUM,
        description:
          'Layout assumptions can embed stereotypical expectations about how different users navigate',
        examples: [
          'Assuming left-to-right reading order excludes RTL language users',
          'Designing only for desktop embeds assumptions about user access and affluence',
          'Fixed layouts assume consistent screen sizes and input methods',
          'Navigation patterns may assume familiarity with Western web conventions',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Typography choices can embed cultural and accessibility assumptions',
        examples: [
          'Small default font sizes assume young, fully sighted users',
          'Latin-only font stacks exclude users of non-Latin scripts',
          'Decorative fonts may assume cultural familiarity with certain aesthetics',
          'Fixed line-heights may not accommodate scripts with tall ascenders or descenders',
        ],
      },
      color: {
        level: ImpactLevel.HIGH,
        description:
          'Color choices can carry cultural stereotypes and exclude users with color vision differences',
        examples: [
          'Pink for women, blue for men reinforces gender stereotypes',
          'Red for danger is not universal across cultures',
          'Skin tone palettes in illustration systems must represent full diversity',
          'Relying on color alone for meaning excludes colorblind users',
        ],
      },
      interaction: {
        level: ImpactLevel.HIGH,
        description:
          'Interaction patterns can assume stereotypical user capabilities and behaviors',
        examples: [
          'Gesture-heavy interfaces assume full motor dexterity',
          'Voice interfaces may not recognize accents or speech patterns from diverse populations',
          'Hover-dependent interactions assume mouse users and exclude touch/keyboard users',
          'Timed interactions assume consistent cognitive processing speed',
        ],
      },
      content: {
        level: ImpactLevel.CRITICAL,
        description:
          'Content is the most visible carrier of stereotypes in product design',
        examples: [
          'Gendered language in UI copy ("Hey guys!", "businessman") excludes non-male users',
          'Default example names (John Smith) signal cultural assumptions',
          'Error messages that say "ask your husband/IT guy" embed gender stereotypes',
          'Help content that assumes a single level of expertise patronizes or confuses users',
        ],
      },
      accessibility: {
        level: ImpactLevel.CRITICAL,
        description:
          'Accessibility is directly affected when designs stereotype disabled users or assume ability',
        examples: [
          'Treating accessibility as an edge case rather than a core requirement',
          'Assuming screen reader users don\'t need rich visual experiences',
          'Designing "simplified" interfaces for disabled users that remove functionality',
          'Failing to test with diverse assistive technologies and user populations',
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
        title: 'Inclusive Avatar Builder',
        description:
          'Profile system offering diverse representation options across skin tone, hair, accessories, and body type',
        code: `<div class="avatar-builder">
  <h3>Create Your Avatar</h3>

  <div class="skin-tone-picker">
    <label>Skin Tone</label>
    <div class="tone-options" role="radiogroup" aria-label="Skin tone">
      <button class="tone" style="background: #f5d6b4;" aria-label="Light"></button>
      <button class="tone" style="background: #d4a574;" aria-label="Medium light"></button>
      <button class="tone" style="background: #a67c52;" aria-label="Medium"></button>
      <button class="tone" style="background: #8b5e3c;" aria-label="Medium dark"></button>
      <button class="tone" style="background: #5c3a1e;" aria-label="Dark"></button>
      <button class="tone" style="background: #3b2410;" aria-label="Very dark"></button>
    </div>
  </div>

  <div class="hairstyle-picker">
    <label>Hairstyle</label>
    <!-- Includes straight, curly, coily, braided, hijab, turban, bald, etc. -->
  </div>

  <div class="accessory-picker">
    <label>Accessories</label>
    <!-- Includes glasses, hearing aids, wheelchairs, prosthetics, head coverings -->
  </div>

  <div class="body-type-picker">
    <label>Body Type</label>
    <!-- Range of body shapes without judgment labels -->
  </div>
</div>`,
        explanation:
          'By offering a wide spectrum of representation options, the avatar builder allows users to see themselves reflected in the product. No default is privileged, and options span the full range of human diversity without categorizing or stereotyping.',
        principle:
          'Inclusive representation lets users define themselves rather than being defined by the system',
        metrics: {
          before: '34% of users customized their avatar with limited options',
          after: '78% of users customized their avatar with inclusive options',
          improvement: '129% increase in avatar customization, plus 23% increase in profile completion',
        },
      },
      {
        title: 'Gender-Inclusive Form Design',
        description:
          'Registration form that avoids binary gender assumptions and collects only necessary information',
        code: `<form class="registration-form">
  <fieldset>
    <legend>Personal Information</legend>

    <div class="field">
      <label for="display-name">Display Name</label>
      <input type="text" id="display-name" required>
    </div>

    <div class="field">
      <label for="pronouns">Pronouns (optional)</label>
      <select id="pronouns">
        <option value="">Prefer not to say</option>
        <option value="she-her">She/Her</option>
        <option value="he-him">He/Him</option>
        <option value="they-them">They/Them</option>
        <option value="ze-zir">Ze/Zir</option>
        <option value="custom">Custom...</option>
      </select>
    </div>

    <!-- No "Title" field (Mr/Mrs/Ms) unless legally required -->
    <!-- No "Gender" field unless medically necessary -->
    <!-- Pronouns are optional and inclusive -->
  </fieldset>
</form>`,
        explanation:
          'The form collects what it needs (display name) without forcing users into gendered categories. Pronouns are optional and inclusive. The absence of "Title" and "Gender" fields removes common points where stereotyping is embedded in data collection.',
        principle:
          'Collect only what you need; make identity fields optional, inclusive, and flexible',
      },
      {
        title: 'Behavior-Based Persona Cards',
        description:
          'Persona documentation that centers behaviors and goals rather than demographics',
        code: `<div class="persona-card">
  <div class="persona-header">
    <!-- Abstract icon instead of demographic photo -->
    <div class="persona-icon" aria-hidden="true">
      <svg><!-- abstract geometric avatar --></svg>
    </div>
    <h3>The Power Analyst</h3>
    <p class="persona-tagline">Needs speed, keyboard shortcuts, and bulk operations</p>
  </div>

  <div class="persona-behaviors">
    <h4>Key Behaviors</h4>
    <ul>
      <li>Processes 200+ records per session</li>
      <li>Uses keyboard shortcuts for 80% of actions</li>
      <li>Exports data to external tools frequently</li>
      <li>Customizes views and saved filters</li>
    </ul>
  </div>

  <div class="persona-goals">
    <h4>Goals</h4>
    <ul>
      <li>Minimize clicks per task</li>
      <li>Maintain flow state during analysis</li>
      <li>Integrate with existing workflow tools</li>
    </ul>
  </div>

  <div class="persona-frustrations">
    <h4>Frustrations</h4>
    <ul>
      <li>Mandatory mouse interactions</li>
      <li>Modal dialogs that interrupt flow</li>
      <li>Limited export options</li>
    </ul>
  </div>
</div>`,
        explanation:
          'This persona is defined entirely by behaviors, goals, and frustrations. No age, gender, ethnicity, or photo is used — eliminating the risk of the team designing for stereotypical assumptions about who "The Power Analyst" is.',
        principle:
          'Behavioral personas prevent demographic stereotyping from entering design decisions',
      },
    ],

    bad: [
      {
        title: 'Stereotypical Persona Design',
        description:
          'Personas built on demographic stereotypes rather than research',
        code: `<!-- DON'T DO THIS -->
<div class="persona-card">
  <img src="young-man-hoodie.jpg" alt="Tech-savvy millennial">
  <h3>Tech-Savvy Tom, 24</h3>
  <p>Male, single, lives in San Francisco</p>
  <p>Always has the latest gadgets. Loves dark mode.
  Skips tutorials because he figures things out instantly.</p>
</div>

<div class="persona-card">
  <img src="older-woman-glasses.jpg" alt="Cautious older woman">
  <h3>Careful Carol, 67</h3>
  <p>Female, grandmother, lives in suburbs</p>
  <p>Afraid of technology. Needs big buttons and simple words.
  Calls her grandson for help with her phone.</p>
</div>`,
        explanation:
          'These personas are pure stereotypes: young men are tech-savvy, older women are technophobic. They embed age, gender, and cultural assumptions that will bias every design decision made using them. Many 67-year-olds are power users; many 24-year-olds struggle with complex interfaces.',
        principle:
          'Demographic personas encode and amplify stereotypes into design decisions',
      },
      {
        title: 'Gendered Color and Content Defaults',
        description:
          'Product that assigns colors and content based on assumed gender',
        code: `<!-- DON'T DO THIS -->
<div class="onboarding">
  <h2>Welcome! Tell us about yourself</h2>
  <div class="gender-select">
    <button class="gender-option" style="background: pink;">
      <span>I'm a Woman</span>
      <!-- Automatically shows: shopping, recipes, beauty content -->
    </button>
    <button class="gender-option" style="background: blue;">
      <span>I'm a Man</span>
      <!-- Automatically shows: sports, tech, finance content -->
    </button>
  </div>
</div>`,
        explanation:
          'Pink/blue gender coding combined with stereotypical content categories assumes women want shopping and recipes while men want sports and finance. This excludes non-binary users entirely and stereotypes the interests of everyone.',
        principle:
          'Never use gender to determine content, color, or feature access',
      },
      {
        title: 'Homogeneous Stock Photography',
        description:
          'Marketing page using only one demographic in all imagery',
        code: `<!-- DON'T DO THIS -->
<section class="team-page">
  <h2>Built for Modern Professionals</h2>
  <div class="hero-grid">
    <img src="young-white-man-laptop.jpg" alt="Professional working">
    <img src="young-white-man-meeting.jpg" alt="Team meeting">
    <img src="young-white-man-coffee.jpg" alt="Working at cafe">
    <img src="young-white-woman-smiling.jpg" alt="Happy customer">
  </div>
</section>`,
        explanation:
          'All imagery represents the same narrow demographic, signaling that the product is designed for and by that group. Users who don\'t see themselves represented are less likely to trust or adopt the product.',
        principle:
          'Homogeneous imagery signals exclusion to underrepresented users',
      },
    ],

    realWorld: [
      {
        company: 'Google',
        product: 'Inclusive Design Guidelines',
        url: 'https://design.google/library/designing-global-accessibility/',
        description: 'Google developed comprehensive inclusive design guidelines after incidents like the Google Photos mislabeling scandal. Their guidelines mandate diverse representation in imagery, gender-neutral language in UI copy, and bias audits in AI training data.',
        effectiveness: 'very-effective',
        analysis: 'By institutionalizing anti-stereotyping practices into their design system, Google reduced bias incidents and improved product inclusivity at scale. Their Material Design guidelines now include specific representation and language recommendations.',
      },
      {
        company: 'Apple',
        product: 'Memoji Diversity',
        url: 'https://www.apple.com/memoji/',
        description: 'Apple\'s Memoji system offers extensive customization across skin tones, hairstyles (including Afro, braids, and hijab), facial features, accessories (hearing aids, oxygen tubes), and head coverings. No default or "standard" appearance is privileged.',
        effectiveness: 'very-effective',
        analysis: 'By offering deep customization without a stereotypical default, Apple allows users of all backgrounds to create authentic representations. The inclusion of disability-related accessories was particularly praised by the disability community.',
      },
      {
        company: 'Figma',
        product: 'Inclusive Component Libraries',
        url: 'https://www.figma.com/community/file/903303571898472063',
        description: 'Figma\'s community includes inclusive design component libraries with diverse avatar sets, gender-neutral form patterns, and illustration systems that represent people of varied abilities, ages, ethnicities, and body types.',
        effectiveness: 'effective',
        analysis: 'By providing inclusive components as first-class resources, Figma makes it easier for designers to avoid stereotyping by default. The ready-made inclusive assets reduce friction in adopting anti-bias practices.',
      },
      {
        company: 'Slack',
        product: 'Custom Emoji and Status Options',
        url: 'https://slack.com',
        description: 'Slack uses diverse default emoji skin tones (yellow neutral default), supports custom status with any emoji, and uses gender-neutral language throughout the UI. Their marketing imagery consistently represents diverse teams.',
        effectiveness: 'effective',
        analysis: 'By choosing a non-racialized yellow default for emoji and offering easy skin tone customization, Slack avoids privileging any single racial group. Their consistent inclusive imagery reinforces that the product is for everyone.',
      },
    ],

    abTests: [
      {
        title: 'Diverse vs Homogeneous Stock Photography on Landing Page',
        hypothesis:
          'Diverse imagery will increase sign-up rates across all demographic groups',
        controlVersion: {
          description:
            'Landing page with homogeneous stock photos (young, light-skinned, able-bodied professionals)',
          metrics: {
            conversionRate: '3.8%',
            timeOnPage: '1:45',
            scrollDepth: '52%',
          },
        },
        treatmentVersion: {
          description:
            'Landing page with diverse stock photos representing varied ages, ethnicities, abilities, and body types',
          metrics: {
            conversionRate: '5.2%',
            timeOnPage: '2:10',
            scrollDepth: '64%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Diverse imagery increased overall conversion by 37%. The effect was strongest among underrepresented groups (+58%) but also improved conversion among the previously-represented group (+12%), suggesting inclusive imagery signals a more trustworthy and professional brand.',
          learnings: [
            'Inclusive imagery improves conversion across all demographic groups',
            'Users spent more time engaging with diverse visual content',
            'Representation signals product quality and brand trustworthiness',
            'No demographic group responded negatively to diverse imagery',
          ],
        },
      },
      {
        title: 'Binary vs Inclusive Gender Field on Registration',
        hypothesis:
          'An inclusive gender field will increase form completion rates and user satisfaction',
        controlVersion: {
          description:
            'Registration form with required binary "Gender: Male / Female" radio buttons',
          metrics: {
            conversionRate: '71%',
            formAbandonment: '14%',
            satisfactionScore: '3.6/5',
          },
        },
        treatmentVersion: {
          description:
            'Registration form with optional "Pronouns" dropdown including She/Her, He/Him, They/Them, Custom, and Prefer not to say',
          metrics: {
            conversionRate: '82%',
            formAbandonment: '6%',
            satisfactionScore: '4.3/5',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Making the gender field optional and inclusive increased form completion by 15% and reduced abandonment by 57%. Satisfaction improved across all groups, not just non-binary users, suggesting that fewer required fields and more respectful data collection benefits everyone.',
          learnings: [
            'Optional inclusive fields outperform required binary fields',
            'Form abandonment drops when users aren\'t forced into categories',
            'All demographic groups rated the inclusive form higher',
            'Removing unnecessary required fields improves conversion universally',
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
        name: 'Homogeneous Imagery',
        description:
          'All people depicted in photos, illustrations, or avatars share similar demographics',
        howToSpot:
          'Audit all human imagery: count representation across skin tone, age, ability, body type, and gender presentation',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Gendered Color Coding',
        description:
          'Pink/blue or other color schemes assigned based on assumed gender',
        howToSpot:
          'Check if colors change based on gender selection or if gendered colors are used for categories',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Binary-Only Options',
        description:
          'Form fields that only offer two options for gender, title, or other identity attributes',
        howToSpot:
          'Review all identity-related form fields for binary-only constraints (Male/Female, Mr/Mrs)',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Stereotypical Personas',
        description:
          'User personas defined primarily by demographic traits with stereotypical behaviors attached',
        howToSpot:
          'Check if persona documents map demographics to behaviors (e.g., age to tech skill, gender to interests)',
        severity: ImpactLevel.CRITICAL,
      },
      {
        name: 'Assumption-Based Defaults',
        description:
          'Default settings that assume a "standard" user profile (e.g., English-speaking, fully sighted, mouse user)',
        howToSpot:
          'Review default states: language, accessibility settings, input assumptions, content recommendations',
        severity: ImpactLevel.HIGH,
      },
    ],

    patterns: [
      {
        name: 'Demographic Gating Pattern',
        description: 'Features, content, or experiences that change based on demographic category rather than stated preference',
        indicators: ['Content filtered by gender selection', 'Pricing or features that vary by age group', 'Recommendations based on demographic profile rather than behavior', 'Onboarding paths determined by identity rather than goals'],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Representation Gap Pattern',
        description: 'Certain demographic groups are absent or underrepresented in imagery, examples, or content',
        indicators: ['All example names are from one cultural background', 'Stock photos show only one body type or age group', 'Illustrations lack diversity in skin tone or ability', 'Case studies feature only one type of company or user'],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Forced Categorization Pattern',
        description: 'Users must select from a limited set of identity categories that don\'t accommodate their reality',
        indicators: ['Binary gender fields', 'Limited title options (Mr/Mrs/Ms only)', 'Ethnicity checkboxes without "Other" or self-describe', 'Required demographic fields with no opt-out'],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Competence Assumption Pattern',
        description: 'Interface complexity or help content that varies based on assumed user capability tied to demographics',
        indicators: ['Simplified interfaces for "non-technical" demographics', 'Extra help tooltips triggered by demographic rather than behavior', 'Feature restrictions based on assumed skill level', 'Condescending copy aimed at particular groups'],
        severity: ImpactLevel.MEDIUM,
        confidence: 'medium',
      },
    ],

    checklistQuestions: [
      'Do all images and illustrations represent diverse ages, ethnicities, abilities, and body types?',
      'Are form fields for gender, title, or identity inclusive and optional where possible?',
      'Are user personas defined by behaviors and goals rather than demographics?',
      'Do default settings assume a particular type of user (able-bodied, English-speaking, mouse-using)?',
      'Is the language in UI copy gender-neutral and culturally inclusive?',
      'Are content recommendations based on behavior rather than demographic assumptions?',
      'Have you tested the product with users from diverse backgrounds?',
      'Are there any features or flows that change based on demographic selection?',
      'Does the design accommodate users across the full spectrum of ability and identity?',
      'Have you audited AI/ML features for bias in training data and outputs?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology, inclusive design, and UX strategy, specializing in stereotyping bias.

Analyze the provided design for stereotyping patterns. Identify:

1. **Representation**: Diversity in imagery, illustrations, avatars, and examples
2. **Categorization**: How the design categorizes users (forms, segmentation, personalization)
3. **Assumptions**: What the design assumes about users based on group membership
4. **Language**: Gendered, ageist, ableist, or culturally biased language in UI copy
5. **Defaults**: Whether default settings privilege a particular demographic

For each pattern found:
- Identify what stereotype is being applied
- Assess the harm potential (exclusion, offense, reduced usability)
- Determine which user groups are negatively affected
- Evaluate whether the design allows users to self-identify or forces categorization
- Suggest specific, actionable improvements

Consider:
- Are personas and user models based on behavioral data or demographic assumptions?
- Does the imagery represent the actual diversity of the user base?
- Are form fields collecting information that embeds stereotypical categories?
- Do AI/ML features have potential for bias amplification?
- Is the design accessible to users across the full spectrum of ability?

Provide actionable recommendations for eliminating stereotyping and increasing inclusivity.`,

    outputSchema: {
      type: 'object',
      properties: {
        stereotypingPatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              stereotypeApplied: { type: 'string' },
              affectedGroups: { type: 'array', items: { type: 'string' } },
              harmPotential: { type: 'string' },
              currentState: { type: 'string' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'stereotypeApplied',
              'affectedGroups',
              'harmPotential',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            representationScore: { type: 'number' },
            inclusivityScore: { type: 'number' },
            languageScore: { type: 'number' },
            accessibilityScore: { type: 'number' },
          },
          required: [
            'representationScore',
            'inclusivityScore',
            'languageScore',
            'accessibilityScore',
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
        'stereotypingPatterns',
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
        title: 'Audit Current Representation',
        description:
          'Review all imagery, personas, form fields, and content for stereotypical patterns',
        example:
          'Create a spreadsheet cataloging every human image by age, ethnicity, ability, gender, and body type',
        tips: [
          'Include illustrations and icons, not just photos',
          'Audit form fields for binary or forced categorization',
          'Review persona documents for demographic stereotyping',
        ],
      },
      {
        step: 2,
        title: 'Diversify Imagery and Representation',
        description:
          'Replace homogeneous imagery with authentic, diverse representation',
        example:
          'Source stock photos from inclusive libraries like The Gender Spectrum Collection, Disabled And Here, or Nappy',
        tips: [
          'Avoid tokenism — ensure diversity is natural, not performative',
          'Represent intersectional identities, not just single diversity dimensions',
          'Use illustration systems with customizable skin tones and features',
        ],
      },
      {
        step: 3,
        title: 'Redesign Forms for Inclusion',
        description:
          'Make identity-related fields optional, inclusive, and flexible',
        example:
          'Replace "Gender: Male/Female" with optional "Pronouns: She/Her, He/Him, They/Them, Custom"',
        tips: [
          'Remove fields that aren\'t strictly necessary for the product function',
          'Add "Prefer not to say" and self-describe options',
          'Separate biological sex (medical) from gender identity (social)',
        ],
      },
      {
        step: 4,
        title: 'Build Behavioral Personas',
        description:
          'Recreate personas around goals, behaviors, and pain points rather than demographics',
        example:
          'Replace "Carol, 67, grandmother" with "The Careful Reviewer: reads all options, compares before committing, values clear explanations"',
        tips: [
          'Use abstract icons instead of demographic photos',
          'Name personas by behavior pattern, not personal name',
          'Validate personas with diverse user research participants',
        ],
      },
      {
        step: 5,
        title: 'Test with Diverse Users',
        description:
          'Recruit research participants who represent the full diversity of your user base',
        example:
          'Ensure usability testing includes participants across age, ability, ethnicity, and tech comfort level',
        tips: [
          'Partner with community organizations for participant recruitment',
          'Pay attention to which users struggle and why',
          'Look for patterns that affect specific groups disproportionately',
        ],
      },
    ],

    dos: [
      'Use diverse, authentic imagery representing varied ages, ethnicities, abilities, and body types',
      'Make identity fields (gender, pronouns, title) optional and inclusive',
      'Build personas around behaviors and goals, not demographics',
      'Use gender-neutral language in UI copy (e.g., "they" instead of "he/she")',
      'Set accessible, neutral defaults that don\'t assume a "standard" user',
      'Test with diverse user populations to surface hidden assumptions',
      'Audit AI/ML systems for bias in training data and outputs',
      'Provide self-identification options rather than forcing categorization',
    ],

    donts: [
      'Don\'t use demographic proxies (age, gender) to determine features or content',
      'Don\'t default to binary gender fields when they aren\'t required',
      'Don\'t use homogeneous stock photography that represents only one group',
      'Don\'t create personas that map demographics to stereotypical behaviors',
      'Don\'t assume user technical competence based on age or gender',
      'Don\'t use gendered colors (pink/blue) to differentiate categories or products',
      'Don\'t ignore representation in illustrations, icons, and avatar systems',
      'Don\'t treat accessibility as an afterthought or "edge case"',
    ],

    bestPractices: [
      {
        title: 'Representation Audits',
        description:
          'Conduct regular audits of all human imagery across the product for diversity and authenticity',
        rationale:
          'Systematic audits catch blind spots that individual designers miss',
        example:
          'Quarterly audit scoring imagery across 5 dimensions: age, ethnicity, ability, body type, gender presentation',
      },
      {
        title: 'Inclusive Component Libraries',
        description:
          'Build design system components with inclusivity built in (diverse avatar defaults, flexible form patterns)',
        rationale:
          'Making inclusion the default reduces the effort and chance of error for individual designers',
        example:
          'Avatar component with 12 skin tones, 20+ hairstyles, and accessibility-related accessories',
      },
      {
        title: 'Bias Review Checkpoints',
        description:
          'Add explicit bias review steps to design review and QA processes',
        rationale:
          'Structured review catches stereotyping that passes unnoticed in informal reviews',
        example:
          'Design review checklist includes "Representation check" and "Assumption audit" items',
      },
      {
        title: 'Behavioral Segmentation Over Demographics',
        description:
          'Segment and personalize based on observed behavior rather than demographic categories',
        rationale:
          'Behavioral data reflects what users actually do; demographics reflect assumptions about what they might do',
        example:
          'Recommend content based on browsing and purchase history, not age or gender profile',
      },
      {
        title: 'Language Linting',
        description:
          'Use automated tools to flag gendered, ableist, or culturally biased language in UI copy',
        rationale:
          'Automated checks catch patterns that manual review misses at scale',
        example:
          'CI pipeline includes a language linter that flags "guys", "mankind", "crazy", "lame" in UI strings',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '1.1.1',
        guideline:
          'Non-text Content - Ensure all imagery has meaningful alt text that describes diverse representation',
        implementation:
          'Write alt text that describes people accurately without stereotyping (e.g., "person using wheelchair at laptop" not "disabled person")',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships - Form fields must programmatically convey their inclusive options',
        implementation:
          'Use proper fieldset/legend for identity fields, ARIA labels for custom controls, and ensure inclusive options are navigable by screen readers',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.4.6',
        guideline:
          'Headings and Labels - Use clear, non-stereotypical labels for form fields and sections',
        implementation:
          'Label fields descriptively ("Your pronouns") rather than assumptively ("Are you male or female?")',
      },
      {
        wcagLevel: 'AA',
        criterion: '3.3.2',
        guideline:
          'Labels or Instructions - Provide clear instructions for inclusive form fields',
        implementation:
          'Add helper text explaining why optional identity fields are collected and how the data will be used',
      },
    ],

    ethics: [
      {
        concern: 'Algorithmic Bias Amplification',
        severity: 'critical',
        explanation:
          'AI/ML systems trained on biased data will amplify stereotypes at scale (e.g., biased hiring algorithms, facial recognition errors for darker skin tones)',
        mitigation:
          'Audit training data for representation balance. Test model outputs across demographic groups. Implement bias detection in CI pipelines. Publish fairness metrics.',
      },
      {
        concern: 'Exclusion Through Forced Categorization',
        severity: 'high',
        explanation:
          'Requiring users to select from limited identity categories (binary gender, narrow ethnicity lists) forces people to misrepresent themselves or abandon the product',
        mitigation:
          'Make identity fields optional. Offer "Prefer not to say" and "Prefer to self-describe" options. Only collect what is strictly necessary.',
      },
      {
        concern: 'Tokenistic Representation',
        severity: 'medium',
        explanation:
          'Adding superficial diversity to imagery without addressing underlying design assumptions creates a false sense of inclusion',
        mitigation:
          'Ensure diversity extends beyond imagery into form design, content, personas, defaults, and user research recruitment.',
      },
      {
        concern: 'Persona-Driven Stereotyping',
        severity: 'high',
        explanation:
          'Demographic personas become a vehicle for embedding and legitimizing stereotypes in design decisions ("Carol, 67, is technophobic")',
        mitigation:
          'Build behavioral personas. Use abstract icons instead of photos. Define personas by goals and frustrations, not demographics.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'Categorization and Social Judgment',
        author: 'Tajfel, H.',
        year: 1969,
        description:
          'Foundational work on how social categorization leads to stereotyping and intergroup discrimination',
        type: 'foundational',
      },
      {
        title: 'Stereotypes and Prejudice: Their Automatic and Controlled Components',
        author: 'Devine, P. G.',
        year: 1989,
        doi: '10.1037/0022-3514.56.1.5',
        description:
          'Landmark study demonstrating that stereotype activation is automatic, even in low-prejudice individuals, but that controlled processing can override stereotypical responses',
        type: 'foundational',
      },
      {
        title: 'Social Identity and Intergroup Relations',
        author: 'Tajfel, H.',
        year: 1982,
        description:
          'Comprehensive framework for understanding how group membership shapes perception and behavior',
        type: 'advanced',
      },
      {
        title: 'Implicit Social Cognition: Attitudes, Self-Esteem, and Stereotypes',
        author: 'Greenwald, A. G., & Banaji, M. R.',
        year: 1995,
        doi: '10.1037/0033-295X.102.1.4',
        description:
          'Foundational work on implicit bias and the Implicit Association Test (IAT)',
        type: 'advanced',
      },
    ],

    books: [
      {
        title: 'Mismatch: How Inclusion Shapes Design',
        author: 'Holmes, Kat',
        year: 2018,
        isbn: '9780262539487',
        description:
          'Practical framework for inclusive design that addresses how stereotyping creates mismatches between products and users',
        type: 'practical',
      },
      {
        title: 'Design Justice: Community-Led Practices to Build the Worlds We Need',
        author: 'Costanza-Chock, Sasha',
        year: 2020,
        isbn: '9780262043458',
        description:
          'How design processes reproduce inequality and how to center marginalized communities in design',
        type: 'practical',
      },
      {
        title: 'Blindspot: Hidden Biases of Good People',
        author: 'Banaji, Mahzarin R., & Greenwald, Anthony G.',
        year: 2013,
        isbn: '9780345528438',
        description:
          'Accessible overview of implicit bias research and its impact on everyday decisions',
        type: 'foundational',
      },
    ],

    articles: [
      {
        title: 'Microsoft Inclusive Design Toolkit',
        author: 'Microsoft Design',
        url: 'https://inclusive.microsoft.design/',
        description:
          'Comprehensive toolkit for recognizing and addressing exclusion in design, including stereotyping',
        type: 'practical',
      },
      {
        title: 'Designing for Diversity and Inclusion',
        author: 'Nielsen Norman Group',
        url: 'https://www.nngroup.com/articles/inclusive-design/',
        description:
          'Research-based guide to inclusive design practices that combat stereotyping in UX',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'The Urgency of Intersectionality',
        author: 'Crenshaw, Kimberle',
        url: 'https://www.ted.com/talks/kimberle_crenshaw_the_urgency_of_intersectionality',
        description:
          'TED talk on how overlapping stereotypes create compounded exclusion for people with intersectional identities',
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
      'in-group-bias',
      'halo-effect',
      'confirmation-bias',
      'implicit-bias',
    ],

    conflicts: [
      'individuation',
      'contact-hypothesis',
    ],

    confusedWith: [
      'prejudice',
      'discrimination',
      'implicit-bias',
    ],

    hierarchy: {
      parent: 'social-bias',
      children: [
        'gender-stereotyping',
        'age-stereotyping',
        'racial-stereotyping',
      ],
    },
  },
};
