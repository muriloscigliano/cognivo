/**
 * PREJUDICE BIAS
 *
 * Preconceived opinions or attitudes formed without adequate basis,
 * leading to biased judgments about people or groups.
 */

import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const prejudiceBias: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'prejudice-bias',
    name: 'Prejudice Bias',
    aliases: ['Implicit Bias', 'Unconscious Bias', 'In-group Bias'],
    category: BiasCategory.SOCIAL,
    relatedCategories: [
      BiasCategory.DECISION_MAKING,
      BiasCategory.PERCEPTION,
      BiasCategory.MEMORY,
    ],
    tags: [
      'stereotyping',
      'discrimination',
      'in-group-favoritism',
      'out-group-bias',
      'inclusive-design',
      'fairness',
      'equity',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple:
      'We form opinions about people or groups without adequate evidence, leading to biased judgments and unfair treatment.',

    detailed: `Prejudice bias refers to preconceived opinions, attitudes, or judgments formed about individuals or groups without sufficient knowledge, experience, or reason. These attitudes often stem from stereotypes, cultural conditioning, or in-group favoritism, and operate both consciously and unconsciously.

In product design and technology, prejudice bias manifests in algorithms that reinforce existing inequities, interfaces that assume a narrow range of users, content moderation systems that disproportionately flag certain groups, and imagery or language that excludes or stereotypes. Biased training data, homogeneous design teams, and unchallenged assumptions all contribute to prejudice being embedded in digital products.

Designers and engineers have a responsibility to actively identify and mitigate prejudice bias. This means conducting bias audits, using inclusive language, ensuring diverse representation, and building equitable user experiences that serve all people fairly regardless of race, gender, age, ability, culture, or identity.`,

    psychologyBasis: {
      discoveredBy: 'Gordon Allport',
      year: 1954,
      theory: 'The Nature of Prejudice',
      mechanism: `Prejudice arises from deeply ingrained cognitive and social processes that categorize people into groups:

1. **Social Categorization**: The brain automatically classifies people into in-groups ("us") and out-groups ("them"), forming the basis for differential treatment
2. **Stereotype Activation**: Learned associations between groups and traits are activated automatically upon encountering group members, even when consciously rejected
3. **Implicit Association**: Unconscious mental links between social groups and evaluative attributes (positive/negative) influence snap judgments and behavior (Greenwald et al. 1998 IAT)
4. **Confirmation Bias Feedback**: Once prejudice is formed, individuals selectively notice and remember information that confirms existing stereotypes while ignoring disconfirming evidence
5. **Cultural Transmission**: Prejudice is transmitted through socialization, media exposure, and institutional norms, becoming deeply embedded in individual cognition and collective systems`,
    },

    realWorldExample: `The Implicit Association Test (IAT), developed by Greenwald, McGhee, and Schwartz in 1998, revealed that the vast majority of people hold unconscious biases even when they consciously endorse egalitarian values. For example, participants consistently show faster reaction times pairing white faces with positive words and Black faces with negative words. This implicit prejudice influences real-world decisions: studies show that identical resumes with "white-sounding" names receive 50% more callbacks than those with "Black-sounding" names (Bertrand & Mullainathan, 2004). In design, this same bias appears when AI systems trained on biased data perpetuate discriminatory outcomes at scale.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `Prejudice bias affects every layer of product design, from who is represented in imagery to how algorithms score and rank users. Designers must actively counter it to build equitable products:

- Ensure inclusive representation in imagery, icons, avatars, and content
- Audit algorithms for disparate impact across demographic groups
- Use bias-free language in copy, labels, error messages, and onboarding
- Design content moderation systems that apply rules equitably
- Build accessibility as a first-class requirement, not an afterthought
- Create user research practices that include diverse participants`,

    whenToUse: [
      {
        title: 'Algorithmic Bias Audits',
        scenario:
          'When deploying ML models, recommendation engines, or scoring systems that affect users',
        example:
          'Run disparate impact analysis on a hiring platform\'s resume-ranking algorithm across gender, race, and age dimensions before launch',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Inclusive Language Review',
        scenario: 'When writing UI copy, error messages, onboarding flows, or documentation',
        example:
          'Replace "whitelist/blacklist" with "allowlist/blocklist"; use gender-neutral pronouns; avoid culturally loaded metaphors',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Diverse Representation in Imagery',
        scenario: 'When selecting stock photos, illustrations, avatars, or icons for a product',
        example:
          'Ensure marketing imagery and default avatars represent diverse skin tones, body types, ages, abilities, and cultural backgrounds',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Equitable Content Moderation',
        scenario: 'When building or tuning automated content moderation systems',
        example:
          'Audit false positive rates across demographic groups to ensure moderation does not disproportionately silence marginalized voices',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Accessibility-First Design',
        scenario: 'When designing new features or redesigning existing interfaces',
        example:
          'Start with keyboard navigation, screen reader support, and sufficient color contrast as baseline requirements rather than bolt-on features',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Inclusive User Research',
        scenario: 'When conducting user research, usability testing, or surveys',
        example:
          'Recruit participants across a range of demographics, abilities, and contexts; avoid convenience sampling that over-represents majority groups',
        impact: ImpactLevel.HIGH,
      },
    ],

    whenToAvoid: [
      {
        title: 'Tokenistic Representation',
        reason:
          'Superficial diversity in imagery without substantive inclusion in product design reinforces stereotypes',
        consequence:
          'Users see through performative inclusion, eroding trust and alienating the very groups you claim to represent',
        alternative:
          'Invest in genuine inclusion: diverse design teams, inclusive user research, and systemic audits rather than surface-level imagery swaps',
      },
      {
        title: 'Over-Correction Without Data',
        reason:
          'Applying blanket "fairness" rules without measuring actual disparate impact can introduce new biases',
        consequence:
          'Well-intentioned but unvalidated corrections may disadvantage other groups or reduce product quality',
        alternative:
          'Use quantitative bias audits to identify specific disparities, then apply targeted, measurable corrections',
      },
      {
        title: 'Bias Labels Without Context',
        reason:
          'Flagging content as "potentially biased" without explaining why or providing recourse frustrates users',
        consequence:
          'Users lose trust in the system, feel unfairly targeted, or ignore all warnings',
        alternative:
          'Provide clear explanations for bias flags, easy appeal processes, and transparent moderation criteria',
      },
      {
        title: 'Demographic Assumptions in Personalization',
        reason:
          'Using inferred demographic data to personalize experiences can reinforce stereotypes and exclude users',
        consequence:
          'Users receive stereotyped recommendations; marginalized users see narrowed options based on group assumptions',
        alternative:
          'Personalize based on individual behavior and explicit preferences rather than inferred demographic categories',
      },
    ],

    commonMistakes: [
      {
        title: 'Homogeneous Default Avatars',
        description:
          'Using default avatars, illustrations, or placeholder images that represent only one demographic group',
        why: 'Signals that the product was designed for a narrow audience and others are afterthoughts',
        fix: 'Use abstract or diverse default representations; offer inclusive customization options from the start',
      },
      {
        title: 'Biased Training Data',
        description:
          'Training ML models on datasets that underrepresent or misrepresent certain groups',
        why: 'Models learn and amplify existing societal biases present in historical data',
        fix: 'Audit training data for representation gaps; use debiasing techniques; test model outputs across demographic groups',
      },
      {
        title: 'Culturally Narrow Design Patterns',
        description:
          'Designing forms, flows, and interactions based on Western or dominant-culture assumptions',
        why: 'Name fields that don\'t support non-Latin characters, address formats that assume US structure, or date formats that assume MM/DD/YYYY exclude global users',
        fix: 'Research and support diverse naming conventions, address formats, date/time standards, and reading directions',
      },
      {
        title: 'Ignoring Intersectionality',
        description:
          'Addressing bias along a single dimension (e.g., gender) while ignoring how multiple identities compound',
        why: 'A Black woman faces different biases than a white woman or a Black man; single-axis analysis misses compound effects',
        fix: 'Analyze bias at intersections of identity dimensions; include intersectional perspectives in research and testing',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.HIGH,
        description:
          'Layout choices determine whose needs are centered and whose are marginalized',
        examples: [
          'Placing accessibility options in hidden settings menus signals they are secondary concerns',
          'Designing mobile-first can exclude users who primarily access via desktop in certain regions',
          'Layout assumptions about reading direction exclude RTL language users',
          'Dashboard layouts that prioritize certain metrics can embed biased value judgments',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Font choices and text rendering affect readability across cultures and abilities',
        examples: [
          'Fonts that lack Unicode support exclude users writing in non-Latin scripts',
          'Small or decorative fonts disproportionately affect users with visual impairments',
          'Gendered language in headings and labels reinforces binary assumptions',
          'Culturally specific idioms in UI copy exclude non-native speakers',
        ],
      },
      color: {
        level: ImpactLevel.HIGH,
        description:
          'Color choices carry cultural meanings and affect perception across abilities',
        examples: [
          'Red/green for positive/negative is inaccessible to colorblind users and culturally variable',
          'Skin tone representation in emoji, avatars, and illustrations affects sense of belonging',
          'Color associations (e.g., dark = negative, light = positive) can reinforce racial prejudice',
          'Insufficient contrast ratios disproportionately affect users with low vision',
        ],
      },
      interaction: {
        level: ImpactLevel.CRITICAL,
        description:
          'Interaction patterns can embed prejudice through assumptions about user capabilities and behavior',
        examples: [
          'Voice interfaces that fail to recognize non-standard accents or dialects exclude users',
          'Gesture-based interactions assume full motor ability',
          'CAPTCHA systems with cultural knowledge assumptions disadvantage certain populations',
          'Auto-complete and suggestion systems trained on biased data surface prejudiced recommendations',
        ],
      },
      content: {
        level: ImpactLevel.CRITICAL,
        description:
          'Content decisions determine who sees themselves represented and who is erased',
        examples: [
          'Stock photo selections that default to young, white, able-bodied people exclude many users',
          'Help documentation that assumes technical proficiency gatekeeps access',
          'Marketing copy that uses gendered language narrows the perceived audience',
          'Error messages that blame the user ("invalid name") instead of the system ("we don\'t support this format yet") embed prejudice',
        ],
      },
      accessibility: {
        level: ImpactLevel.CRITICAL,
        description:
          'Accessibility failures are a form of ableist prejudice embedded in design',
        examples: [
          'Missing alt text excludes screen reader users from visual content and context',
          'Lack of keyboard navigation assumes all users can operate a mouse or touch screen',
          'Auto-playing video without captions excludes deaf and hard-of-hearing users',
          'Complex interactions without alternative input methods exclude users with motor disabilities',
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
        title: 'Inclusive Avatar System',
        description:
          'User profile system offering diverse, customizable avatars as defaults',
        code: `<div class="avatar-picker">
  <h3>Choose Your Avatar</h3>
  <div class="avatar-grid" role="radiogroup" aria-label="Avatar selection">
    <button role="radio" aria-checked="false" class="avatar-option">
      <img src="avatar-abstract-1.svg" alt="Abstract geometric avatar in blue">
    </button>
    <button role="radio" aria-checked="false" class="avatar-option">
      <img src="avatar-abstract-2.svg" alt="Abstract geometric avatar in green">
    </button>
    <button role="radio" aria-checked="false" class="avatar-option">
      <img src="avatar-person-diverse-1.svg" alt="Illustrated person with dark skin and natural hair">
    </button>
    <button role="radio" aria-checked="false" class="avatar-option">
      <img src="avatar-person-diverse-2.svg" alt="Illustrated person wearing hijab">
    </button>
    <button role="radio" aria-checked="false" class="avatar-option">
      <img src="avatar-person-diverse-3.svg" alt="Illustrated person using wheelchair">
    </button>
    <button role="radio" aria-checked="false" class="avatar-option">
      <img src="avatar-person-diverse-4.svg" alt="Illustrated older person with gray hair">
    </button>
  </div>
  <button class="secondary">Upload Custom Photo</button>
  <p class="helper-text">You can change your avatar anytime in settings.</p>
</div>`,
        explanation:
          'Offering diverse avatars from the start signals that the product is designed for everyone. Abstract options provide a neutral default while human illustrations represent a range of identities.',
        principle:
          'Inclusive defaults signal belonging and reduce prejudice-driven exclusion',
        metrics: {
          before: '23% of users from underrepresented groups completed onboarding',
          after: '41% of users from underrepresented groups completed onboarding',
          improvement: '78% increase in onboarding completion among underrepresented users',
        },
      },
      {
        title: 'Bias-Aware Name Input',
        description:
          'Form field that supports diverse naming conventions without marking any as invalid',
        code: `<div class="name-input">
  <label for="full-name">Full name</label>
  <input
    id="full-name"
    type="text"
    placeholder="Enter your name as you'd like to be addressed"
    aria-describedby="name-help"
    autocomplete="name"
  >
  <p id="name-help" class="helper-text">
    We support names in any script or format.
    Single names, multiple names, and names with
    special characters are all welcome.
  </p>
</div>

<!-- Instead of separate "First Name" / "Last Name" fields that
     assume Western naming conventions -->`,
        explanation:
          'A single flexible name field avoids assumptions about naming conventions. Many cultures use single names, patronymics, or name orderings that don\'t fit the Western first/last model. Validation that rejects "unusual" names is a form of prejudice.',
        principle:
          'Flexible input design respects cultural diversity rather than enforcing dominant-culture norms',
      },
      {
        title: 'Algorithmic Fairness Dashboard',
        description:
          'Internal tool for monitoring ML model outputs across demographic groups',
        code: `<div class="fairness-dashboard">
  <h2>Model Fairness Report — Resume Screener v2.4</h2>

  <div class="metrics-grid">
    <div class="metric-card status-pass">
      <h4>Selection Rate Parity</h4>
      <p class="value">0.92</p>
      <p class="threshold">Threshold: > 0.80</p>
      <p class="detail">Female-to-male selection ratio within acceptable range</p>
    </div>
    <div class="metric-card status-fail">
      <h4>Equal Opportunity</h4>
      <p class="value">0.71</p>
      <p class="threshold">Threshold: > 0.80</p>
      <p class="detail">True positive rate disparity detected across racial groups</p>
    </div>
    <div class="metric-card status-warn">
      <h4>Calibration</h4>
      <p class="value">0.82</p>
      <p class="threshold">Threshold: > 0.80</p>
      <p class="detail">Prediction accuracy comparable across age groups (marginal)</p>
    </div>
  </div>

  <div class="action-items">
    <h3>Required Actions Before Deployment</h3>
    <ul>
      <li class="blocker">Investigate and resolve racial group TPR disparity</li>
      <li class="warning">Monitor age calibration in next training cycle</li>
      <li class="info">Document fairness metrics in model card</li>
    </ul>
  </div>
</div>`,
        explanation:
          'A fairness dashboard makes bias visible and actionable. By setting quantitative thresholds and blocking deployment until fairness criteria are met, teams institutionalize equity rather than leaving it to good intentions.',
        principle:
          'Systematic bias measurement converts abstract fairness goals into concrete, enforceable requirements',
        metrics: {
          before: '3 biased model deployments per quarter (caught post-launch)',
          after: '0 biased model deployments per quarter (caught pre-launch)',
          improvement: '100% reduction in biased model deployments through pre-launch audits',
        },
      },
    ],

    bad: [
      {
        title: 'Biased Name Validation',
        description:
          'Form that rejects legitimate names as "invalid"',
        code: `<!-- DON'T DO THIS -->
<div class="name-fields">
  <label>First Name *</label>
  <input type="text" pattern="[A-Za-z]+" required>
  <span class="error">Name must contain only letters A-Z</span>

  <label>Last Name *</label>
  <input type="text" pattern="[A-Za-z]+" required>
  <span class="error">Please enter a valid last name</span>
</div>`,
        explanation:
          'This pattern rejects names with hyphens (Mary-Jane), apostrophes (O\'Brien), spaces (Van der Berg), diacritics (Jose), non-Latin scripts, and single-word names. Telling users their real name is "invalid" is a direct expression of prejudice in code.',
        principle:
          'Validation rules that assume one cultural norm invalidate users from other cultures',
      },
      {
        title: 'Homogeneous Stock Photography',
        description:
          'Landing page using only images of young, white, able-bodied professionals',
        code: `<!-- DON'T DO THIS -->
<section class="team-showcase">
  <h2>Built for Professionals Like You</h2>
  <div class="hero-images">
    <img src="young-white-man-laptop.jpg" alt="Professional using our product">
    <img src="young-white-woman-office.jpg" alt="Professional in meeting">
    <img src="white-team-highfive.jpg" alt="Team celebrating success">
  </div>
  <p>Join thousands of professionals who trust us</p>
</section>`,
        explanation:
          'When all imagery represents a single demographic, users who don\'t match that profile receive a clear signal: this product is not for you. This narrows the addressable market while reinforcing harmful stereotypes about who is a "professional."',
        principle:
          'Homogeneous representation signals exclusion and reinforces stereotypical associations',
      },
      {
        title: 'Biased Content Moderation',
        description:
          'Automated moderation system with unaudited disparate impact',
        code: `<!-- DON'T DO THIS -->
<div class="moderation-result">
  <div class="flagged-content">
    <p class="warning">Your post has been flagged for review.</p>
    <p class="reason">Reason: Potentially inappropriate content</p>
    <p class="action">Your post will not be visible until reviewed by a moderator.</p>
    <!-- No appeal mechanism -->
    <!-- No transparency about why -->
    <!-- No data on disparate flagging rates -->
  </div>
</div>`,
        explanation:
          'Content moderation systems trained on biased data disproportionately flag content from marginalized groups. African American Vernacular English (AAVE) is flagged as "toxic" at higher rates than standard American English. Without transparency, appeals, or bias audits, the system silences the very voices it claims to protect.',
        principle:
          'Unaudited automation scales human prejudice to millions of users at machine speed',
      },
    ],

    realWorld: [
      {
        company: 'Google',
        product: 'Inclusive Marketing Guidelines',
        description: 'Google developed comprehensive inclusive marketing guidelines requiring diverse representation in all advertising materials. Their "All In" initiative mandates that imagery, language, and narratives reflect the diversity of their global user base, including race, gender, age, ability, and body type.',
        effectiveness: 'very-effective',
        analysis: 'By institutionalizing inclusive representation guidelines, Google moved from ad-hoc diversity to systematic inclusion. Their marketing research showed that inclusive ads were 1.5x more likely to generate brand favorability among all audiences, not just underrepresented groups.',
      },
      {
        company: 'IBM',
        product: 'AI Fairness 360 Toolkit',
        url: 'https://aif360.mybluemix.net/',
        description: 'IBM released AI Fairness 360, an open-source toolkit containing 70+ fairness metrics and 10+ bias mitigation algorithms. It enables teams to detect and mitigate prejudice bias in machine learning models across the entire ML pipeline, from training data to model output.',
        effectiveness: 'very-effective',
        analysis: 'By providing concrete, measurable tools for bias detection rather than abstract guidelines, IBM made fairness actionable. The toolkit has been adopted by enterprises, governments, and researchers worldwide, establishing quantitative fairness as an engineering requirement rather than an aspirational goal.',
      },
      {
        company: 'Meta',
        product: 'Content Moderation Bias Audits',
        description: 'After research revealed that automated content moderation disproportionately flagged posts in African American Vernacular English (AAVE) as hate speech, Meta commissioned external audits and invested in linguistic diversity in training data. They also expanded appeal mechanisms and added transparency reports on moderation outcomes by demographic group.',
        effectiveness: 'effective',
        analysis: 'The audit process exposed how prejudice embedded in training data scaled to billions of moderation decisions. While improvements were meaningful, ongoing disparities highlight the difficulty of fully eliminating bias from automated systems trained on historically biased human judgments.',
      },
      {
        company: 'Applied',
        product: 'Bias-Free Hiring Platform',
        url: 'https://www.beapplied.com/',
        description: 'Applied redesigned the hiring process to remove prejudice bias: applications are anonymized (no names, photos, or demographic identifiers), evaluated against structured criteria, and reviewed by multiple independent assessors. Candidates are scored on work-relevant tasks rather than credentials that correlate with privilege.',
        effectiveness: 'very-effective',
        analysis: 'Applied\'s approach demonstrates that redesigning systems is more effective than training individuals to overcome bias. Their clients report significantly more diverse shortlists without any reduction in hire quality, proving that equity and merit are complementary, not competing, goals.',
      },
    ],

    abTests: [
      {
        title: 'Inclusive vs Homogeneous Imagery on Landing Page',
        hypothesis:
          'Diverse, inclusive imagery will increase sign-up rates across all demographic groups',
        controlVersion: {
          description:
            'Landing page with stock photography showing only young, white, able-bodied professionals in corporate settings',
          metrics: {
            conversionRate: '3.8%',
            timeOnPage: '1:45',
            scrollDepth: '52%',
          },
        },
        treatmentVersion: {
          description:
            'Landing page with professionally shot imagery representing diverse ages, ethnicities, abilities, and contexts (home office, mobile, collaborative spaces)',
          metrics: {
            conversionRate: '5.2%',
            timeOnPage: '2:30',
            scrollDepth: '68%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Inclusive imagery increased overall conversion by 37%. Sign-ups from underrepresented groups increased by 62%. Notably, conversion among the previously-represented demographic (young, white) did not decrease, disproving the fear that inclusive imagery alienates majority audiences.',
          learnings: [
            'Inclusive representation expands the audience without alienating existing users',
            'Users from underrepresented groups respond strongly to seeing themselves reflected',
            'Authenticity matters: diverse stock photos felt less genuine than custom inclusive photography',
            'Inclusive imagery improved brand perception scores across all demographic groups',
          ],
        },
      },
      {
        title: 'Bias-Aware vs Standard Resume Screening Algorithm',
        hypothesis:
          'A debiased resume screening algorithm will produce more equitable outcomes without sacrificing candidate quality',
        controlVersion: {
          description:
            'Standard ML resume screener trained on historical hiring data (which reflected past demographic biases in the industry)',
          metrics: {
            conversionRate: '4.1%',
            clickThroughRate: '18%',
          },
        },
        treatmentVersion: {
          description:
            'Debiased resume screener using anonymized features, counterfactual fairness constraints, and demographic parity targets',
          metrics: {
            conversionRate: '4.3%',
            clickThroughRate: '22%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'The debiased algorithm produced 34% more diverse shortlists while maintaining equivalent or better hire quality (measured by 6-month performance reviews). Hiring managers reported higher satisfaction with candidate pools.',
          learnings: [
            'Removing bias does not reduce quality; historical data conflated privilege with merit',
            'Anonymized features prevented proxy discrimination (zip code, university name)',
            'Fairness constraints acted as regularization, reducing overfitting to biased patterns',
            'Transparent fairness metrics increased stakeholder trust in the system',
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
        name: 'Homogeneous Representation',
        description:
          'Imagery, avatars, or illustrations that represent only a single demographic group',
        howToSpot:
          'Scan all images on the page: do they represent diverse ages, ethnicities, abilities, and genders? Or do they default to one group?',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Exclusive Language Patterns',
        description:
          'UI copy that uses gendered, ableist, or culturally exclusive language',
        howToSpot:
          'Look for "guys", "he/she" binaries, idioms that don\'t translate, ableist metaphors ("blind spot", "crippled"), or racialized terms ("blacklist")',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Restrictive Input Validation',
        description:
          'Form fields that reject valid names, addresses, or identifiers from non-dominant cultures',
        howToSpot:
          'Test with names containing apostrophes, hyphens, spaces, diacritics, non-Latin characters, and single-word names',
        severity: ImpactLevel.CRITICAL,
      },
      {
        name: 'Narrow Default Assumptions',
        description:
          'Defaults that assume a narrow user profile (e.g., English-only, binary gender, Western address format)',
        howToSpot:
          'Check default language, gender options, date formats, and whether non-default options require extra effort',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Unaudited Algorithmic Outputs',
        description:
          'ML-driven features (recommendations, moderation, scoring) with no visible fairness metrics or audit trail',
        howToSpot:
          'Look for absence of fairness documentation, model cards, or disparate impact disclosures in algorithmic features',
        severity: ImpactLevel.CRITICAL,
      },
    ],

    patterns: [
      {
        name: 'Demographic Proxy Pattern',
        description: 'Using data features that correlate with protected characteristics as inputs to algorithmic decisions',
        indicators: ['Zip code used in credit scoring', 'University name in resume screening', 'Browser language for content quality assessment', 'Profile photo required for account verification'],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Default Majority Pattern',
        description: 'Designing for the majority demographic and treating everyone else as edge cases',
        indicators: ['Accessibility features labeled "special needs"', 'Translations marked as "other languages"', 'Non-Western name formats requiring special handling', 'Skin tone options added as an afterthought'],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Stereotype Reinforcement Pattern',
        description: 'Content, recommendations, or UI elements that reinforce stereotypical associations',
        indicators: ['Job recommendations that steer by gender', 'Image search results reinforcing stereotypes', 'Auto-complete suggestions with biased associations', 'Marketing segmentation based on demographic assumptions'],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Exclusionary Gatekeeping Pattern',
        description: 'Requirements or validations that disproportionately exclude certain groups',
        indicators: ['ID verification that fails on darker skin tones', 'Knowledge-based authentication with culturally specific questions', 'CAPTCHA requiring cultural literacy', 'Mandatory phone number in regions with low phone penetration'],
        severity: ImpactLevel.HIGH,
        confidence: 'medium',
      },
    ],

    checklistQuestions: [
      'Does the imagery represent diverse ages, ethnicities, abilities, genders, and body types?',
      'Does the UI copy use inclusive, non-gendered, and culturally neutral language?',
      'Can users with names from any culture successfully complete all forms?',
      'Have algorithmic features been audited for disparate impact across demographic groups?',
      'Are accessibility features integrated as core functionality, not add-ons?',
      'Does content moderation apply rules equitably across languages and dialects?',
      'Are default settings inclusive or do they assume a narrow user profile?',
      'Has the product been tested with users from diverse backgrounds and abilities?',
      'Are there transparent appeal mechanisms for algorithmic decisions that affect users?',
      'Does the design team itself represent diverse perspectives?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology, inclusive design, and algorithmic fairness, specializing in prejudice bias.

Analyze the provided design for prejudice bias patterns. Identify:

1. **Representation**: Who is visible in imagery, illustrations, and content? Who is absent?
2. **Language**: Is copy inclusive, or does it use gendered, ableist, or culturally exclusive terms?
3. **Algorithmic Fairness**: Are automated features audited for disparate impact?
4. **Input Assumptions**: Do forms and interactions accommodate diverse naming conventions, scripts, and cultural norms?
5. **Accessibility**: Are accessibility features treated as core requirements or afterthoughts?

For each pattern found:
- Identify the specific prejudice or assumption embedded in the design
- Assess which user groups are excluded or disadvantaged
- Determine the severity of the impact (cosmetic vs. functional exclusion)
- Evaluate whether the bias is explicit or implicit
- Suggest concrete, actionable improvements

Consider:
- Does the design assume a narrow "default" user and treat everyone else as an edge case?
- Are there algorithmic features that could amplify existing societal biases?
- Would users from marginalized groups feel represented and welcomed by this design?
- Are there barriers to access that disproportionately affect certain groups?
- Does the team have processes for ongoing bias detection and mitigation?

Provide actionable recommendations prioritized by impact and feasibility.`,

    outputSchema: {
      type: 'object',
      properties: {
        prejudicePatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              affectedGroups: { type: 'string' },
              severity: { type: 'string' },
              implicit: { type: 'boolean' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'affectedGroups',
              'severity',
              'implicit',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            representationScore: { type: 'number' },
            languageInclusivity: { type: 'number' },
            algorithmicFairness: { type: 'number' },
            accessibilityScore: { type: 'number' },
            overallEquityScore: { type: 'number' },
          },
          required: [
            'representationScore',
            'languageInclusivity',
            'algorithmicFairness',
            'accessibilityScore',
            'overallEquityScore',
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
        'prejudicePatterns',
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
        title: 'Audit Existing Representation',
        description:
          'Catalog all imagery, language, and defaults in the product to identify gaps and biases',
        example:
          'Create a spreadsheet documenting every image, its demographic representation, and every form field with its validation rules',
        tips: [
          'Include marketing materials, error states, and empty states in the audit',
          'Check both explicit content and implicit assumptions (defaults, placeholders)',
          'Involve team members from diverse backgrounds in the audit process',
        ],
      },
      {
        step: 2,
        title: 'Implement Inclusive Language Standards',
        description:
          'Establish and enforce guidelines for bias-free language across all UI copy and documentation',
        example:
          'Create a style guide that bans gendered defaults, racialized terms, and ableist metaphors; integrate linting tools to enforce it',
        tips: [
          'Replace "whitelist/blacklist" with "allowlist/blocklist"',
          'Use "they" as singular pronoun or offer pronoun selection',
          'Avoid idioms that don\'t translate across cultures',
        ],
      },
      {
        step: 3,
        title: 'Design for Diverse Inputs',
        description:
          'Ensure all input fields, forms, and validation accommodate global diversity',
        example:
          'Use a single flexible name field instead of first/last; support Unicode; allow single-character names',
        tips: [
          'Test with names from 10+ cultures and scripts',
          'Support addresses from multiple countries and formats',
          'Offer non-binary and customizable gender options',
        ],
      },
      {
        step: 4,
        title: 'Audit Algorithms for Fairness',
        description:
          'Measure and mitigate disparate impact in all ML-driven features',
        example:
          'Run demographic parity, equalized odds, and calibration tests on every model before deployment',
        tips: [
          'Use tools like IBM AI Fairness 360 or Google What-If Tool',
          'Set quantitative fairness thresholds as deployment gates',
          'Document fairness metrics in model cards',
        ],
      },
      {
        step: 5,
        title: 'Conduct Inclusive User Research',
        description:
          'Recruit and test with participants who represent the full diversity of your user base',
        example:
          'Ensure usability testing includes participants across age, ethnicity, ability, language, and socioeconomic status',
        tips: [
          'Use screening criteria that ensure diverse representation',
          'Compensate participants fairly and accommodate different needs',
          'Analyze results for disparate usability across groups',
        ],
      },
      {
        step: 6,
        title: 'Establish Ongoing Monitoring',
        description:
          'Build processes for continuous bias detection and mitigation, not one-time audits',
        example:
          'Set up automated fairness dashboards, regular content audits, and feedback channels for users to report bias',
        tips: [
          'Schedule quarterly bias audits for content and algorithms',
          'Create easy-to-use reporting mechanisms for users who encounter bias',
          'Track diversity metrics in user satisfaction and retention data',
        ],
      },
    ],

    dos: [
      'Represent diverse ages, ethnicities, abilities, genders, and body types in all imagery',
      'Use inclusive, gender-neutral language throughout all UI copy',
      'Support diverse naming conventions, scripts, and cultural formats in forms',
      'Audit ML models for disparate impact before and after deployment',
      'Build accessibility as a core requirement from day one',
      'Include diverse perspectives in design teams and user research',
      'Provide transparent appeal mechanisms for algorithmic decisions',
      'Test products with users from underrepresented groups',
      'Document and share fairness metrics publicly',
      'Create feedback channels for users to report bias',
    ],

    donts: [
      'Don\'t use imagery that represents only one demographic as the default',
      'Don\'t validate names, addresses, or identifiers based on Western-only patterns',
      'Don\'t deploy ML models without fairness audits across demographic groups',
      'Don\'t use gendered language, racialized terms, or ableist metaphors in UI copy',
      'Don\'t treat accessibility as an afterthought or "nice to have"',
      'Don\'t assume your team\'s demographic represents your user base',
      'Don\'t personalize based on inferred demographic categories',
      'Don\'t use color associations that reinforce racial prejudice (dark=bad, light=good)',
      'Don\'t require unnecessary personal information that enables discrimination',
      'Don\'t silence user feedback about bias in the product',
    ],

    bestPractices: [
      {
        title: 'Bias-Free by Design',
        description:
          'Build anti-bias measures into the design process from the start, not as retrospective fixes',
        rationale:
          'Retrofitting inclusion is more expensive and less effective than designing for it',
        example:
          'Include a "bias impact assessment" step in every design sprint, similar to a security review',
      },
      {
        title: 'Quantitative Fairness Gates',
        description:
          'Set measurable fairness thresholds that must be met before features ship',
        rationale:
          'Subjective "seems fair" assessments are insufficient; quantitative metrics are actionable and auditable',
        example:
          'Block deployment if selection rate parity falls below 0.80 across any demographic group',
      },
      {
        title: 'Intersectional Analysis',
        description:
          'Analyze bias at the intersection of multiple identity dimensions, not just one at a time',
        rationale:
          'A system that is fair by gender and fair by race may still be unfair for Black women specifically',
        example:
          'Break down fairness metrics by gender x race x age intersections, not just individual dimensions',
      },
      {
        title: 'Community-Informed Design',
        description:
          'Involve affected communities in the design process, not just as test subjects',
        rationale:
          'People from marginalized communities have expertise in their own experiences that design teams lack',
        example:
          'Establish advisory panels from diverse communities; compensate their time and expertise',
      },
      {
        title: 'Transparent Model Documentation',
        description:
          'Publish model cards and fairness reports for all algorithmic features',
        rationale:
          'Transparency enables external scrutiny, builds trust, and creates accountability',
        example:
          'Include intended use, training data demographics, fairness metrics, and known limitations in model cards',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '1.1.1',
        guideline:
          'Non-text Content - Provide inclusive alt text that represents diverse subjects accurately',
        implementation:
          'Describe people in images with relevant context without stereotyping. Mention visible disabilities, cultural elements, or assistive devices when contextually relevant.',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships - Ensure form structures accommodate diverse inputs',
        implementation:
          'Use flexible form patterns that don\'t enforce Western naming conventions. Support screen readers in conveying inclusive form labels and instructions.',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.1.1',
        guideline:
          'Keyboard Accessible - Ensure all functionality is available without assuming specific physical abilities',
        implementation:
          'Design interactions that work with keyboard, switch devices, voice control, and eye tracking. Don\'t assume mouse or touch capability.',
      },
      {
        wcagLevel: 'AA',
        criterion: '3.3.2',
        guideline:
          'Labels or Instructions - Provide clear, inclusive labels that don\'t assume cultural knowledge',
        implementation:
          'Write form labels and instructions that are understandable across cultures and literacy levels. Avoid jargon, idioms, and culturally specific references.',
      },
    ],

    ethics: [
      {
        concern: 'Algorithmic Discrimination',
        severity: 'critical',
        explanation:
          'ML models trained on biased historical data can automate and scale discrimination against marginalized groups',
        mitigation:
          'Conduct pre-deployment fairness audits, set quantitative equity thresholds, monitor post-deployment outcomes, and establish rapid response procedures for detected bias.',
      },
      {
        concern: 'Exclusionary Design',
        severity: 'critical',
        explanation:
          'Products designed around a narrow "default" user systematically exclude people who don\'t match that profile',
        mitigation:
          'Design for the margins first: if a product works well for users with disabilities, non-dominant-language speakers, and non-Western name formats, it works for everyone.',
      },
      {
        concern: 'Stereotypical Representation',
        severity: 'high',
        explanation:
          'Imagery, content, and recommendations that reinforce stereotypes cause representational harm even without functional exclusion',
        mitigation:
          'Audit all visual and textual content for stereotypical associations. Represent people in counter-stereotypical roles and contexts.',
      },
      {
        concern: 'Data Collection Bias',
        severity: 'high',
        explanation:
          'Collecting unnecessary demographic data enables discrimination; failing to collect it prevents bias detection',
        mitigation:
          'Collect demographic data only when needed for equity analysis. Protect it rigorously. Never use it for personalization without explicit consent.',
      },
      {
        concern: 'Performative Inclusion',
        severity: 'medium',
        explanation:
          'Surface-level diversity (e.g., diverse stock photos) without substantive inclusion in product design and team composition',
        mitigation:
          'Pair visible representation with structural changes: diverse hiring, inclusive design processes, algorithmic audits, and community accountability.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'The Nature of Prejudice',
        author: 'Allport, G. W.',
        year: 1954,
        description:
          'The foundational work on prejudice psychology, introducing contact theory and categorizing prejudice from antilocution to extermination',
        type: 'foundational',
      },
      {
        title: 'Measuring Individual Differences in Implicit Cognition: The Implicit Association Test',
        author: 'Greenwald, A. G., McGhee, D. E., & Schwartz, J. L. K.',
        year: 1998,
        doi: '10.1037/0022-3514.74.6.1464',
        description:
          'Introduced the IAT methodology for measuring implicit prejudice, demonstrating that unconscious biases exist even in people who consciously reject stereotypes',
        type: 'foundational',
      },
      {
        title: 'Are Emily and Greg More Employable Than Lakisha and Jamal?',
        author: 'Bertrand, M., & Mullainathan, S.',
        year: 2004,
        doi: '10.1257/0002828042002561',
        description:
          'Field experiment demonstrating that identical resumes with white-sounding names received 50% more callbacks than those with Black-sounding names',
        type: 'case-study',
      },
      {
        title: 'Gender Shades: Intersectional Accuracy Disparities in Commercial Gender Classification',
        author: 'Buolamwini, J., & Gebru, T.',
        year: 2018,
        description:
          'Demonstrated that commercial facial recognition systems had error rates of up to 34.7% for dark-skinned women compared to 0.8% for light-skinned men',
        type: 'case-study',
      },
    ],

    books: [
      {
        title: 'The Nature of Prejudice',
        author: 'Allport, Gordon W.',
        year: 1954,
        isbn: '9780201001792',
        description:
          'The seminal text on prejudice psychology, establishing the foundational framework for understanding how prejudice forms, operates, and can be reduced',
        type: 'foundational',
      },
      {
        title: 'Blindspot: Hidden Biases of Good People',
        author: 'Banaji, Mahzarin R., & Greenwald, Anthony G.',
        year: 2013,
        isbn: '9780345528438',
        description:
          'Accessible introduction to implicit bias by the creators of the IAT, with practical strategies for recognizing and mitigating unconscious prejudice',
        type: 'practical',
      },
      {
        title: 'Algorithms of Oppression',
        author: 'Noble, Safiya Umoja',
        year: 2018,
        isbn: '9781479837243',
        description:
          'Examines how search engines and algorithms reinforce racism and sexism, with implications for all algorithmic design',
        type: 'practical',
      },
      {
        title: 'Race After Technology',
        author: 'Benjamin, Ruha',
        year: 2019,
        isbn: '9781509526406',
        description:
          'Explores how technology can perpetuate racial discrimination even when designed with good intentions',
        type: 'practical',
      },
    ],

    articles: [
      {
        title: 'Inclusive Design at Microsoft',
        author: 'Microsoft Design',
        url: 'https://inclusive.microsoft.design/',
        description:
          'Microsoft\'s comprehensive inclusive design methodology and toolkit for building products that work for everyone',
        type: 'practical',
      },
      {
        title: 'Fairness Indicators: Scalable Infrastructure for Fair ML Systems',
        author: 'Google AI',
        url: 'https://ai.google/responsibilities/responsible-ai-practices/',
        description:
          'Google\'s responsible AI practices including tools and frameworks for detecting and mitigating bias in ML systems',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'The Coded Gaze: Algorithmic Bias',
        author: 'Joy Buolamwini',
        url: 'https://www.ted.com/talks/joy_buolamwini_how_i_m_fighting_bias_in_algorithms',
        description:
          'TED talk by the researcher who exposed racial bias in facial recognition, demonstrating how prejudice is encoded in AI systems',
        type: 'foundational',
      },
    ],

    demos: [
      {
        title: 'Project Implicit - Implicit Association Test',
        author: 'Harvard University',
        url: 'https://implicit.harvard.edu/implicit/',
        description:
          'Take the IAT yourself to discover your own implicit biases across race, gender, age, and other dimensions',
        type: 'foundational',
      },
    ],
  },

  //===========================================
  // RELATIONSHIPS
  //===========================================
  relationships: {
    complements: [
      'in-group-bias',
      'confirmation-bias',
      'stereotyping',
      'halo-effect',
      'attribution-error',
    ],

    conflicts: [
      'empathy-gap',
      'contact-hypothesis',
    ],

    confusedWith: [
      'stereotyping',
      'discrimination',
      'in-group-bias',
    ],

    hierarchy: {
      parent: 'social-bias',
      children: [
        'racial-prejudice',
        'gender-prejudice',
        'age-prejudice',
        'ableism',
      ],
    },
  },
};
