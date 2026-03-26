/**
 * OWN-RACE BIAS
 *
 * We're better at recognizing faces from our own racial group
 */

import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const ownRaceBias: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'own-race-bias',
    name: 'Own-Race Bias',
    aliases: ['Other-Race Effect', 'Cross-Race Recognition Deficit', 'In-Group Face Recognition Advantage'],
    category: BiasCategory.SOCIAL,
    relatedCategories: [
      BiasCategory.PERCEPTION,
      BiasCategory.MEMORY,
      BiasCategory.COGNITIVE,
    ],
    tags: [
      'face-recognition',
      'in-group',
      'identity',
      'diversity',
      'inclusion',
      'representation',
      'perception',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple: 'We are better at recognizing and distinguishing faces from our own racial group.',

    detailed: `Own-Race Bias (ORB) is the well-documented tendency for people to more accurately recognize and differentiate faces of their own racial or ethnic group compared to faces from other groups. This is closely related to the Cross-Race Effect but specifically emphasizes the in-group recognition advantage rather than the out-group deficit.

The bias is not a reflection of prejudice but stems from differential perceptual expertise. People develop stronger face-processing skills for the racial groups they encounter most frequently during development and daily life. This leads to a measurable asymmetry: own-race faces are encoded with greater individuation (unique feature processing), while other-race faces are often encoded more categorically (processed as members of a group rather than as individuals).

In design and technology, own-race bias has profound implications for avatar systems, AI-powered facial recognition, image selection, emoji representation, and any interface that displays or processes human faces. Ignoring this bias leads to products that work well for some users and poorly for others, reinforcing systemic inequity.`,

    psychologyBasis: {
      discoveredBy: 'Malpass & Kravitz',
      year: 1969,
      theory: 'Perceptual Expertise and Contact Hypothesis',
      mechanism: `The brain develops face-processing expertise based on exposure frequency during critical developmental periods and ongoing experience. This produces an in-group recognition advantage through several mechanisms:

1. **Perceptual Expertise**: Frequent exposure to own-race faces builds a finely tuned perceptual template, enabling detection of subtle individual differences (eye spacing, nose shape, jaw line)
2. **Feature-Based vs. Holistic Processing**: Own-race faces are processed holistically (as integrated wholes), while other-race faces are processed more feature-by-feature, reducing recognition accuracy
3. **Social Categorization**: Upon encountering an other-race face, the brain rapidly categorizes the person by group membership, which suppresses individuation and impairs later recognition
4. **Contact Hypothesis**: Greater interpersonal contact with members of other racial groups reduces the bias, supporting the perceptual expertise explanation
5. **Memory Encoding Asymmetry**: Own-race faces are encoded with richer, more distinctive memory traces, making them easier to retrieve and distinguish from similar faces`,
    },

    realWorldExample: `In eyewitness identification research, witnesses are significantly more accurate when identifying suspects of their own race. A meta-analysis by Meissner & Brigham (2001) across 39 studies found that own-race faces were identified 1.4 times more accurately than other-race faces, and false identifications of other-race faces were 1.56 times more likely. This has contributed to wrongful convictions where cross-race eyewitness testimony was the primary evidence. The Innocence Project reports that mistaken eyewitness identification is the leading cause of wrongful convictions, and cross-race misidentification is disproportionately represented in these cases.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `Own-Race Bias affects how users perceive, recognize, and connect with visual representations of people in interfaces. Designers must account for this bias to build inclusive products that:

- Represent diverse racial and ethnic groups authentically in avatars, illustrations, and stock imagery
- Ensure AI-powered facial recognition systems perform equitably across all racial groups
- Design avatar and profile systems that allow meaningful self-representation for all users
- Avoid defaulting to a single racial group in illustrations, placeholders, or onboarding
- Test visual recognition and recall tasks across diverse user populations`,

    whenToUse: [
      {
        title: 'Diverse Avatar and Illustration Systems',
        scenario:
          'When designing avatar creators, profile images, or illustrations featuring people',
        example:
          'Offer a wide range of skin tones, facial features, and hairstyles so every user can create an avatar that reflects their identity',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Inclusive Stock Photography',
        scenario: 'When selecting photos for marketing, onboarding, or product interfaces',
        example:
          'Use stock photography that represents multiple racial and ethnic groups rather than defaulting to a single demographic',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Bias-Aware AI and Facial Recognition',
        scenario: 'When building or integrating facial recognition, photo tagging, or identity verification',
        example:
          'Audit facial recognition models for accuracy parity across racial groups, and disclose known disparities to users',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Emoji and Reaction Systems',
        scenario: 'When designing emoji pickers or reaction systems with human representations',
        example:
          'Default to a neutral (non-skin-toned) emoji and allow users to set a preferred skin tone that persists across the platform',
        impact: ImpactLevel.MEDIUM,
      },
      {
        title: 'User Onboarding and Personalization',
        scenario: 'When first-time users encounter human imagery in onboarding flows',
        example:
          'Rotate diverse representation across onboarding screens or dynamically match imagery to user locale and demographics',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Content Moderation and Safety',
        scenario: 'When moderating user-generated content with human faces',
        example:
          'Ensure content moderation AI does not disproportionately flag or misclassify faces of certain racial groups',
        impact: ImpactLevel.CRITICAL,
      },
    ],

    whenToAvoid: [
      {
        title: 'Racial Profiling or Targeting',
        reason:
          'Using awareness of own-race bias to target or profile users by race is discriminatory',
        consequence:
          'Legal liability, ethical violations, user harm, and erosion of trust',
        alternative:
          'Use demographic awareness only to ensure equitable representation, never for targeting or exclusion',
      },
      {
        title: 'Forced Racial Self-Identification',
        reason:
          'Requiring users to declare their race to receive better representation can feel invasive',
        consequence:
          'Users feel surveilled, uncomfortable, or that their race is being commodified',
        alternative:
          'Provide diverse defaults and let users self-customize without requiring explicit racial identification',
      },
      {
        title: 'Stereotypical Associations',
        reason:
          'Pairing racial groups with specific roles, contexts, or emotions reinforces stereotypes',
        consequence:
          'Perpetuates harmful stereotypes and alienates users from underrepresented groups',
        alternative:
          'Ensure diverse faces appear across all roles, contexts, and emotional states without stereotypical patterns',
      },
      {
        title: 'Tokenistic Diversity',
        reason:
          'Adding a single diverse face to otherwise homogeneous imagery feels performative',
        consequence:
          'Users from underrepresented groups recognize tokenism and lose trust in the product',
        alternative:
          'Build genuinely diverse representation throughout the entire product, not just in visible marketing materials',
      },
    ],

    commonMistakes: [
      {
        title: 'Default to One Racial Group',
        description:
          'Using avatars, illustrations, or placeholders that default to a single racial appearance',
        why: 'Users from other groups feel unseen and excluded, reducing engagement and trust',
        fix: 'Use abstract or neutral defaults, or rotate diverse representations; let users customize early',
      },
      {
        title: 'Untested AI on Diverse Populations',
        description:
          'Deploying facial recognition or photo features without testing across racial groups',
        why: 'Training data imbalances cause dramatically worse performance for underrepresented groups',
        fix: 'Audit accuracy metrics disaggregated by race; use balanced training datasets; publish performance parity reports',
      },
      {
        title: 'Assuming Universal Recognition',
        description:
          'Designing face-selection tasks (e.g., CAPTCHA, photo verification) without accounting for recognition asymmetry',
        why: 'Own-race bias means users will find it harder to distinguish faces from unfamiliar racial groups',
        fix: 'Avoid using face-matching as a verification method, or ensure test faces are from the user\'s own racial group',
      },
      {
        title: 'Homogeneous Design Teams',
        description:
          'Allowing a non-diverse design team to select all imagery and representation without external review',
        why: 'Teams unconsciously favor own-race representation, missing gaps they cannot perceive',
        fix: 'Include diverse voices in design reviews; conduct representation audits with external evaluators',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.MEDIUM,
        description:
          'Layout affects which faces users see first and most frequently, shaping familiarity',
        examples: [
          'Hero images set representational tone for the entire product',
          'Grid layouts that always place the same racial group first create implicit bias',
          'Randomizing or rotating diverse faces across prominent positions increases equity',
          'Team pages and about sections shape users\' perception of who the product is for',
        ],
      },
      typography: {
        level: ImpactLevel.LOW,
        description:
          'Typography has minimal direct impact on own-race bias but affects name readability',
        examples: [
          'Proper rendering of diacritical marks and non-Latin scripts signals respect for diverse names',
          'Name truncation disproportionately affects longer names from certain cultures',
          'Font choices that support multilingual names improve inclusivity',
          'Clear label hierarchy helps users focus on individual identity rather than group category',
        ],
      },
      color: {
        level: ImpactLevel.HIGH,
        description:
          'Color choices in skin tone palettes and avatar systems are central to inclusive representation',
        examples: [
          'Skin tone palettes must span a realistic and respectful range',
          'Default avatar colors should be neutral, not skewed toward any skin tone',
          'Background colors that create poor contrast with certain skin tones cause visibility issues',
          'Color-coding people by group membership reinforces categorical thinking',
        ],
      },
      interaction: {
        level: ImpactLevel.HIGH,
        description:
          'Interactive face-related features are directly affected by recognition asymmetry',
        examples: [
          'Photo tagging suggestions may be less accurate for underrepresented racial groups',
          'Face-based authentication systems may have higher failure rates for some users',
          'Avatar customization flows shape whether users feel represented',
          'Contact and people-search features rely on face recognition that may be biased',
        ],
      },
      content: {
        level: ImpactLevel.CRITICAL,
        description:
          'Content imagery defines who feels welcome and represented in the product',
        examples: [
          'Marketing pages that show only one racial group signal exclusion to others',
          'Help documentation and tutorial imagery should feature diverse faces',
          'User testimonials and case studies should represent the full user base',
          'Empty states and placeholder illustrations set representational norms',
        ],
      },
      accessibility: {
        level: ImpactLevel.HIGH,
        description:
          'Accessibility intersects with own-race bias in image descriptions and alternative representations',
        examples: [
          'Alt text should describe people without unnecessary racial categorization unless contextually relevant',
          'Screen readers convey avatar descriptions that should be respectful and inclusive',
          'Users with low vision rely on high-contrast representations that work across skin tones',
          'Cognitive accessibility considerations for face-based verification tasks',
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
        title: 'Inclusive Avatar Builder with Full Skin Tone Range',
        description:
          'A profile customization system offering a broad spectrum of skin tones, facial features, and hairstyles',
        code: `<div class="avatar-builder">
  <h3>Create Your Avatar</h3>
  <div class="skin-tone-selector">
    <label>Skin Tone</label>
    <div class="tone-options" role="radiogroup" aria-label="Select skin tone">
      <button class="tone" style="--tone: #f9dcc4" role="radio" aria-label="Light skin tone 1"></button>
      <button class="tone" style="--tone: #f0c8a0" role="radio" aria-label="Light skin tone 2"></button>
      <button class="tone" style="--tone: #d4a574" role="radio" aria-label="Medium skin tone 1"></button>
      <button class="tone" style="--tone: #b07d4f" role="radio" aria-label="Medium skin tone 2"></button>
      <button class="tone" style="--tone: #8b5e34" role="radio" aria-label="Medium-dark skin tone"></button>
      <button class="tone" style="--tone: #5c3a1e" role="radio" aria-label="Dark skin tone 1"></button>
      <button class="tone" style="--tone: #3b2210" role="radio" aria-label="Dark skin tone 2"></button>
    </div>
  </div>
  <div class="feature-selectors">
    <div class="selector" aria-label="Hair style"><!-- diverse hairstyle options --></div>
    <div class="selector" aria-label="Face shape"><!-- diverse face shapes --></div>
    <div class="selector" aria-label="Eye shape"><!-- diverse eye shapes --></div>
    <div class="selector" aria-label="Nose shape"><!-- diverse nose shapes --></div>
  </div>
</div>`,
        explanation:
          'Providing a comprehensive range of skin tones, hairstyles, and facial features ensures every user can create an avatar that feels authentic. Separate selectors for face shape, eye shape, and nose shape allow individuation beyond skin color alone.',
        principle:
          'Inclusive representation systems let every user see themselves, countering own-race bias in default imagery',
        metrics: {
          before: '42% of non-white users completed avatar setup',
          after: '78% of non-white users completed avatar setup with expanded options',
          improvement: '86% increase in avatar completion among underrepresented users',
        },
      },
      {
        title: 'Diverse Rotating Hero Imagery',
        description:
          'Marketing landing page that rotates hero images across diverse racial groups',
        code: `<section class="hero" aria-label="Welcome">
  <div class="hero-carousel" role="region" aria-roledescription="carousel">
    <div class="hero-slide active">
      <img src="hero-diverse-team-1.jpg"
           alt="A diverse team of four colleagues collaborating at a whiteboard">
      <h1>Build Together, Across Every Background</h1>
    </div>
    <div class="hero-slide">
      <img src="hero-diverse-team-2.jpg"
           alt="Two engineers pair-programming, showing collaborative work">
      <h1>Tools That Work for Everyone</h1>
    </div>
    <div class="hero-slide">
      <img src="hero-diverse-team-3.jpg"
           alt="A product designer presenting to a diverse group of stakeholders">
      <h1>Design Without Boundaries</h1>
    </div>
  </div>
</section>`,
        explanation:
          'Rotating hero images featuring diverse teams ensures that no single racial group dominates the first impression. Users from all backgrounds see people who look like them in aspirational contexts.',
        principle:
          'Diverse first-contact imagery counters the tendency to default to in-group representation',
      },
      {
        title: 'Equitable Facial Recognition with Parity Reporting',
        description:
          'A photo service that audits and publishes its facial recognition accuracy across demographic groups',
        code: `<div class="ai-transparency-panel">
  <h3>Face Detection Accuracy Report</h3>
  <p>We audit our AI for fairness across demographic groups.</p>
  <table class="accuracy-table" aria-label="Accuracy by demographic group">
    <thead>
      <tr>
        <th scope="col">Demographic Group</th>
        <th scope="col">Detection Rate</th>
        <th scope="col">False Match Rate</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>Light-skinned women</td><td>98.2%</td><td>0.3%</td></tr>
      <tr><td>Light-skinned men</td><td>98.7%</td><td>0.2%</td></tr>
      <tr><td>Medium-skinned women</td><td>97.8%</td><td>0.4%</td></tr>
      <tr><td>Medium-skinned men</td><td>97.9%</td><td>0.3%</td></tr>
      <tr><td>Dark-skinned women</td><td>97.1%</td><td>0.5%</td></tr>
      <tr><td>Dark-skinned men</td><td>97.4%</td><td>0.4%</td></tr>
    </tbody>
  </table>
  <p class="note">We continuously retrain on balanced datasets to minimize disparities.
     <a href="/ai-fairness">Read our full fairness report</a></p>
</div>`,
        explanation:
          'Publishing disaggregated accuracy metrics builds trust and accountability. It shows the company is aware of own-race bias in AI systems and actively working to achieve equitable performance.',
        principle:
          'Transparency about AI performance disparities is an ethical obligation when facial recognition is involved',
      },
    ],

    bad: [
      {
        title: 'Homogeneous Default Avatars',
        description:
          'Avatar system that defaults to light-skinned appearance with limited customization',
        code: `<!-- DON'T DO THIS -->
<div class="avatar-setup">
  <img src="default-avatar-light.png" alt="Default avatar">
  <p>Your avatar is ready!</p>
  <button class="secondary">Customize later</button>
</div>`,
        explanation:
          'Defaulting to a single-race appearance tells users from other groups that they are not the expected audience. "Customize later" makes it optional, so most users keep the default, producing a homogeneous user base appearance.',
        principle:
          'Defaults that favor one racial group exclude all others and reinforce own-race bias at scale',
      },
      {
        title: 'Face-Matching CAPTCHA Without Racial Consideration',
        description:
          'A verification system that asks users to match unfamiliar faces across photos',
        code: `<!-- DON'T DO THIS -->
<div class="face-captcha">
  <h3>Verify you are human</h3>
  <p>Select all photos that show the same person:</p>
  <div class="face-grid">
    <img src="face-1a.jpg" alt="Person photo 1">
    <img src="face-1b.jpg" alt="Person photo 2">
    <img src="face-2a.jpg" alt="Person photo 3">
    <img src="face-1c.jpg" alt="Person photo 4">
    <img src="face-3a.jpg" alt="Person photo 5">
    <img src="face-2b.jpg" alt="Person photo 6">
  </div>
</div>`,
        explanation:
          'Face-matching tasks are directly affected by own-race bias. Users will perform significantly worse when asked to match faces from a racial group different from their own, creating an inequitable verification barrier.',
        principle:
          'Never use cross-race face recognition tasks as verification; they are inherently biased against diverse users',
      },
      {
        title: 'Tokenistic Diversity in Marketing',
        description:
          'A product page with one person of color placed among an otherwise homogeneous group',
        code: `<!-- DON'T DO THIS -->
<section class="team-section">
  <h2>Meet Our Team</h2>
  <div class="team-grid">
    <div class="member"><img src="person-white-1.jpg"><p>CEO</p></div>
    <div class="member"><img src="person-white-2.jpg"><p>CTO</p></div>
    <div class="member"><img src="person-white-3.jpg"><p>CFO</p></div>
    <div class="member"><img src="person-poc-1.jpg"><p>Community Manager</p></div>
    <div class="member"><img src="person-white-4.jpg"><p>VP Engineering</p></div>
    <div class="member"><img src="person-white-5.jpg"><p>VP Design</p></div>
  </div>
</section>`,
        explanation:
          'One person of color in a minor role among an otherwise homogeneous leadership team is textbook tokenism. Users notice the pattern: diverse faces in junior roles, homogeneous faces in leadership. This reinforces rather than counters bias.',
        principle:
          'Tokenistic representation is worse than no attempt because it signals awareness without genuine commitment',
      },
    ],

    realWorld: [
      {
        company: 'Apple',
        product: 'Emoji Skin Tone Modifiers',
        url: 'https://support.apple.com/en-us/HT204394',
        description: 'Apple introduced skin tone modifiers for human emoji across iOS, providing five Fitzpatrick-scale skin tones plus a default yellow. Users can set their preferred skin tone, and it persists across the system. This normalized diverse representation in everyday digital communication.',
        effectiveness: 'very-effective',
        analysis: 'By defaulting to a non-realistic yellow and offering the full Fitzpatrick scale, Apple sidestepped the problem of a single racial default. The persistent preference means users express their identity naturally without repeated selection effort.',
      },
      {
        company: 'Getty Images',
        product: 'Diverse Stock Photography Initiative',
        url: 'https://www.gettyimages.com',
        description: 'Getty Images launched initiatives to increase representation in stock photography, partnering with organizations like the Disability:IN and AARP to produce authentic, diverse imagery rather than stereotypical portrayals.',
        effectiveness: 'effective',
        analysis: 'By expanding who is photographed and in what contexts, Getty addresses the upstream supply problem. Designers who source from diverse libraries naturally produce more inclusive products, reducing downstream own-race bias in visual design.',
      },
      {
        company: 'Google',
        product: 'Inclusive Camera and Photos AI',
        url: 'https://blog.google/technology/research/inclusive-images/',
        description: 'Google retrained its camera auto-exposure and white-balance algorithms to perform equitably across skin tones, and audited Google Photos\' face-grouping feature for racial accuracy parity. They published disaggregated performance metrics.',
        effectiveness: 'effective',
        analysis: 'Camera hardware and software that works poorly for dark skin tones is a direct product manifestation of own-race bias in engineering teams. Google\'s audit-and-retrain approach is a model for addressing this systematically.',
      },
      {
        company: 'NIST',
        product: 'Face Recognition Vendor Test (FRVT)',
        url: 'https://www.nist.gov/programs-projects/face-recognition-vendor-test-frvt',
        description: 'NIST published a landmark study in 2019 testing 189 facial recognition algorithms from 99 vendors, finding demographic differentials in accuracy. False positive rates were highest for African-American and Asian faces compared to Caucasian faces, by factors of 10 to 100 times.',
        effectiveness: 'effective',
        analysis: 'The NIST study quantified the real-world consequences of own-race bias in AI training data and development teams. It created accountability pressure on vendors and informed regulatory discussions about facial recognition technology.',
      },
    ],

    abTests: [
      {
        title: 'Diverse vs Homogeneous Hero Imagery on Signup Rate',
        hypothesis:
          'Diverse hero imagery will increase signup rates among users from underrepresented groups without decreasing rates for majority users',
        controlVersion: {
          description:
            'Landing page with single-race hero imagery showing a homogeneous team',
          metrics: {
            conversionRate: '5.1%',
            timeOnPage: '1:42',
            scrollDepth: '52%',
          },
        },
        treatmentVersion: {
          description:
            'Landing page with rotating diverse hero imagery showing teams of varied racial backgrounds in leadership contexts',
          metrics: {
            conversionRate: '6.3%',
            timeOnPage: '2:05',
            scrollDepth: '61%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Diverse imagery increased overall conversion by 24%. Among users from underrepresented groups, conversion increased by 47%. Majority-group conversion was unchanged, disproving the concern that diverse imagery would reduce appeal for existing audiences.',
          learnings: [
            'Diverse representation expands the audience without alienating existing users',
            'Users from underrepresented groups spent 38% more time on page with diverse imagery',
            'Authentic diversity (varied roles and contexts) outperformed tokenistic diversity',
            'The effect was strongest on first visit, suggesting representation matters most at first contact',
          ],
        },
      },
      {
        title: 'Avatar System: Inclusive Default vs Standard Default',
        hypothesis:
          'An avatar system with an abstract/neutral default and prominent customization will increase profile completion across all demographics',
        controlVersion: {
          description:
            'Default light-skinned avatar with small "edit" link below the avatar',
          metrics: {
            conversionRate: '31%',
            clickThroughRate: '18%',
          },
        },
        treatmentVersion: {
          description:
            'Abstract geometric default avatar with prominent "Make it yours" button and skin tone selector immediately visible',
          metrics: {
            conversionRate: '54%',
            clickThroughRate: '42%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'The neutral default with prominent customization nearly doubled profile completion. Non-white users showed a 3x increase in avatar customization. The abstract default removed the implicit message that one racial appearance was "normal."',
          learnings: [
            'Neutral defaults signal inclusivity better than any single racial default',
            'Prominent customization CTAs increase engagement across all demographics',
            'Users who customize avatars show 28% higher 30-day retention',
            'The cost of a biased default is invisible until you measure disaggregated metrics',
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
        name: 'Homogeneous Face Representation',
        description:
          'All or most human faces in the interface belong to a single racial group',
        howToSpot:
          'Scan hero images, team pages, testimonials, and illustrations for racial diversity. Count faces by perceived racial group.',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Default Avatar Skin Tone',
        description:
          'Default or placeholder avatars that present a specific skin tone rather than a neutral abstraction',
        howToSpot:
          'Check default profile images, placeholder illustrations, and onboarding screens for skin-tone defaults',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Limited Customization Options',
        description:
          'Avatar or profile builders with narrow skin tone ranges or limited facial feature diversity',
        howToSpot:
          'Count available skin tones, hairstyle types, and facial feature options. Compare to the Fitzpatrick scale.',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Stereotypical Role Assignment',
        description:
          'People of certain races consistently shown in specific roles (e.g., leadership vs. service roles)',
        howToSpot:
          'Map which racial groups appear in which professional roles across all imagery. Look for patterns.',
        severity: ImpactLevel.CRITICAL,
      },
      {
        name: 'AI Accuracy Disparities',
        description:
          'Facial recognition, auto-tagging, or photo features that perform differently by race',
        howToSpot:
          'Test face detection, grouping, and recognition features with diverse test sets. Check disaggregated error rates.',
        severity: ImpactLevel.CRITICAL,
      },
    ],

    patterns: [
      {
        name: 'Monoracial Default Pattern',
        description: 'Product defaults (avatars, illustrations, stock photos) consistently represent one racial group',
        indicators: [
          'Default avatars with a specific skin tone',
          'Onboarding illustrations showing only one racial group',
          'Hero images featuring homogeneous faces',
          'Sample data and placeholder content with single-race names and photos',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'AI Training Data Imbalance Pattern',
        description: 'AI features trained on datasets that overrepresent certain racial groups',
        indicators: [
          'Higher error rates on dark-skinned faces',
          'Face grouping that merges different people of the same non-majority race',
          'Auto-exposure or white balance that fails on dark skin tones',
          'Beauty filters that lighten skin or narrow features',
        ],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Tokenistic Diversity Pattern',
        description: 'A single person from an underrepresented group placed among an otherwise homogeneous cast',
        indicators: [
          'One diverse face among many homogeneous faces',
          'Diverse faces only in junior or service roles',
          'Diversity present in marketing but absent in product UI',
          'Same diverse stock photo reused across multiple contexts',
        ],
        severity: ImpactLevel.MEDIUM,
        confidence: 'medium',
      },
      {
        name: 'Face-Based Verification Bias Pattern',
        description: 'Face-matching or recognition tasks used for verification that disadvantage cross-race recognition',
        indicators: [
          'Face-matching CAPTCHAs',
          'Photo ID verification with AI comparison',
          'Face-based authentication with unequal error rates',
          'Identity verification that requires matching a photo to a live face',
        ],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
    ],

    checklistQuestions: [
      'Do the human faces in our product represent a diverse range of racial and ethnic groups?',
      'What racial appearance does our default avatar or placeholder convey?',
      'Does our avatar builder offer a full Fitzpatrick-scale range of skin tones?',
      'Have we tested our facial recognition or AI features across diverse racial groups?',
      'Are people of all racial groups shown in varied professional and social roles?',
      'Do our marketing and product imagery match in diversity level?',
      'Have we published disaggregated accuracy metrics for face-related AI features?',
      'Are diverse stock photos authentic or tokenistic?',
      'Does our design team include diverse perspectives in image selection reviews?',
      'Have we audited for stereotypical role-to-race associations in our imagery?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology, inclusive design, and AI fairness, specializing in own-race bias and the cross-race effect.

Analyze the provided design for own-race bias patterns. Identify:

1. **Representation Audit**: Which racial groups are visually represented and in what contexts/roles?
2. **Default Analysis**: What skin tones, facial features, and appearances do defaults convey?
3. **AI Equity**: If facial recognition or face-related AI exists, are there accuracy disparities?
4. **Avatar/Customization**: How inclusive are avatar or profile customization systems?
5. **Content Imagery**: Are stock photos, illustrations, and examples racially diverse and authentic?

For each finding:
- Assess whether representation is genuinely diverse or tokenistic
- Identify implicit messages about who the product is "for"
- Evaluate facial recognition equity if applicable
- Determine whether defaults exclude or include
- Suggest specific improvements for inclusive design

Consider:
- Is the product designed and tested for users of all racial backgrounds?
- Do AI systems perform equitably across racial groups?
- Are defaults neutral or biased toward a particular racial appearance?
- Is diversity authentic (varied roles, contexts) or performative?
- Are there accessibility implications for users with different skin tones?

Provide actionable recommendations for genuinely inclusive representation.`,

    outputSchema: {
      type: 'object',
      properties: {
        representationFindings: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              area: { type: 'string' },
              racialDiversity: { type: 'string' },
              roleDistribution: { type: 'string' },
              authenticity: { type: 'string' },
              severity: { type: 'string' },
              recommendation: { type: 'string' },
            },
            required: [
              'area',
              'racialDiversity',
              'authenticity',
              'severity',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            diversityScore: { type: 'number' },
            authenticityScore: { type: 'number' },
            aiEquityScore: { type: 'number' },
            defaultInclusivityScore: { type: 'number' },
          },
          required: [
            'diversityScore',
            'authenticityScore',
            'aiEquityScore',
            'defaultInclusivityScore',
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
        'representationFindings',
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
          'Catalog every human face, avatar, illustration, and emoji in your product. Count representation by perceived racial group and role.',
        example:
          'Create a spreadsheet: Location | Image | Perceived Race | Role/Context | Notes',
        tips: [
          'Include marketing pages, product UI, documentation, and error states',
          'Note which racial groups appear in leadership vs. service roles',
          'Identify defaults and placeholders that convey a specific racial appearance',
        ],
      },
      {
        step: 2,
        title: 'Establish Inclusive Defaults',
        description:
          'Replace racially specific defaults with neutral or abstract alternatives that invite customization',
        example:
          'Switch from a light-skinned default avatar to an abstract geometric shape with a prominent "Personalize" button',
        tips: [
          'Abstract defaults (geometric, silhouette, initials) are more inclusive than any skin tone',
          'Make customization prominent and easy, not buried in settings',
          'Persist user customization choices across sessions and devices',
        ],
      },
      {
        step: 3,
        title: 'Diversify Content Imagery',
        description:
          'Replace homogeneous stock photos and illustrations with authentically diverse ones',
        example:
          'Use photo libraries like Getty\'s diverse collections, Nappy, or TONL for authentic representation',
        tips: [
          'Diversity should span roles, contexts, and emotional states, not just skin color',
          'Avoid pairing specific races with stereotypical roles',
          'Rotate diverse imagery across prominent positions rather than a fixed hierarchy',
        ],
      },
      {
        step: 4,
        title: 'Audit AI Systems for Equity',
        description:
          'Test all face-related AI features with diverse test sets and publish disaggregated accuracy metrics',
        example:
          'Run facial recognition benchmarks against balanced datasets like Fitzpatrick-17k and publish results by demographic group',
        tips: [
          'Test across the full Fitzpatrick skin tone scale',
          'Measure both false positive and false negative rates by group',
          'Retrain on balanced datasets when disparities are found',
          'Consider whether face-based features are necessary or can be replaced',
        ],
      },
      {
        step: 5,
        title: 'Build Diverse Review Processes',
        description:
          'Include people from diverse racial backgrounds in design reviews, usability testing, and image selection',
        example:
          'Establish a diverse representation review panel that approves all new human imagery before deployment',
        tips: [
          'Homogeneous teams have blind spots they cannot see by definition',
          'External review panels provide perspectives internal teams may lack',
          'Compensate reviewers fairly for their expertise',
        ],
      },
    ],

    dos: [
      'Use abstract or neutral defaults for avatars and placeholders',
      'Offer a full Fitzpatrick-scale range of skin tones in avatar builders',
      'Represent diverse racial groups across all roles and contexts',
      'Audit AI systems for accuracy parity across racial groups',
      'Publish disaggregated performance metrics for face-related AI features',
      'Include diverse perspectives in design review and image selection',
      'Test with diverse user populations during usability testing',
      'Rotate diverse imagery across prominent product positions',
    ],

    donts: [
      'Don\'t default to a single racial appearance in avatars or illustrations',
      'Don\'t use face-matching tasks for verification without accounting for cross-race recognition difficulty',
      'Don\'t deploy facial recognition without testing across diverse racial groups',
      'Don\'t rely on tokenistic diversity (one diverse face among many homogeneous ones)',
      'Don\'t pair specific racial groups with stereotypical roles in imagery',
      'Don\'t assume your team\'s racial composition doesn\'t affect design decisions',
      'Don\'t use beauty filters that lighten skin or narrow facial features',
      'Don\'t ignore disaggregated metrics in favor of aggregate accuracy numbers',
    ],

    bestPractices: [
      {
        title: 'Neutral Defaults, Rich Customization',
        description:
          'Default to abstract or neutral representations and provide extensive customization options',
        rationale:
          'No single racial default is inclusive; abstraction combined with customization serves everyone',
        example:
          'Geometric avatar default with a prominent "Make it yours" flow offering skin tones, hairstyles, and facial features',
      },
      {
        title: 'Authentic Diversity, Not Tokenism',
        description:
          'Ensure diverse faces appear in varied roles, contexts, and emotional states throughout the product',
        rationale:
          'Tokenistic single-face diversity signals awareness without commitment, which users from underrepresented groups recognize immediately',
        example:
          'Diverse faces in leadership, creative, technical, and social contexts across all product pages',
      },
      {
        title: 'Disaggregated AI Metrics',
        description:
          'Always measure and report AI accuracy broken down by demographic group, not just overall',
        rationale:
          'Aggregate accuracy can hide severe disparities; a system that is 98% accurate overall may be 85% accurate for dark-skinned women',
        example:
          'Quarterly fairness reports showing detection rate and false match rate by skin tone and gender',
      },
      {
        title: 'Diverse Design Review Panels',
        description:
          'Include people from diverse racial backgrounds in every design review that involves human imagery',
        rationale:
          'Own-race bias affects designers too; diverse reviewers catch representation gaps that homogeneous teams miss',
        example:
          'A cross-functional representation review that includes team members or external advisors from varied backgrounds',
      },
      {
        title: 'Continuous Representation Monitoring',
        description:
          'Track representation metrics over time and set goals for diversity across all product surfaces',
        rationale:
          'Without measurement, representation drifts toward the majority group over time',
        example:
          'Dashboard tracking racial diversity in product imagery, with quarterly targets and accountability',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '1.1.1',
        guideline:
          'Non-text Content - Provide alt text for all human images that is respectful and avoids unnecessary racial categorization',
        implementation:
          'Describe people by role, action, or context rather than race unless race is specifically relevant. Example: "A software engineer presenting at a team meeting" rather than "An Asian woman at a meeting."',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.4.3',
        guideline:
          'Contrast - Ensure interface elements are visible against all skin tones in avatar and profile displays',
        implementation:
          'Test avatar frames, borders, and overlaid text against the full range of skin tones to ensure minimum 4.5:1 contrast ratio.',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.4.1',
        guideline:
          'Use of Color - Don\'t rely solely on skin tone to convey identity information',
        implementation:
          'Supplement visual representation with text names, roles, and labels so non-sighted users receive equivalent identity cues.',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.4.6',
        guideline:
          'Headings and Labels - Label avatar customization controls clearly for screen reader users',
        implementation:
          'Use descriptive ARIA labels for skin tone selectors, feature pickers, and customization controls (e.g., aria-label="Select skin tone").',
      },
    ],

    ethics: [
      {
        concern: 'AI Facial Recognition Disparity',
        severity: 'critical',
        explanation:
          'Facial recognition systems trained primarily on light-skinned faces produce dramatically higher error rates for dark-skinned individuals, with real-world consequences including wrongful arrests',
        mitigation:
          'Audit with diverse test sets, retrain on balanced datasets, publish disaggregated metrics, and consider whether facial recognition is necessary for the use case.',
      },
      {
        concern: 'Exclusionary Defaults',
        severity: 'high',
        explanation:
          'Default avatars and illustrations that represent a single racial group send an implicit message about who the product is designed for',
        mitigation:
          'Use abstract, neutral defaults. Provide diverse customization options. Rotate diverse imagery across prominent positions.',
      },
      {
        concern: 'Tokenistic Representation',
        severity: 'high',
        explanation:
          'Adding a single diverse face among homogeneous imagery is performative diversity that can cause more harm than no attempt',
        mitigation:
          'Build genuine diversity into all product surfaces. Audit for role distribution. Avoid stereotypical associations.',
      },
      {
        concern: 'Beauty Standard Bias',
        severity: 'high',
        explanation:
          'Filters and enhancement features that lighten skin, narrow noses, or modify features toward Eurocentric ideals perpetuate racial beauty hierarchies',
        mitigation:
          'Audit enhancement features for racial bias. Avoid default filters that modify racial features. Celebrate diverse beauty standards in feature design.',
      },
      {
        concern: 'Surveillance and Racial Profiling',
        severity: 'critical',
        explanation:
          'Facial recognition in security contexts disproportionately affects people of color through higher false positive rates',
        mitigation:
          'Do not deploy facial recognition in security contexts without achieving accuracy parity. Advocate for regulation. Provide alternative identification methods.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'Thirty Years of Investigating the Own-Race Bias in Memory for Faces: A Meta-Analytic Review',
        author: 'Meissner, C. A., & Brigham, J. C.',
        year: 2001,
        doi: '10.1037/1076-8971.7.1.3',
        description:
          'Landmark meta-analysis across 39 studies establishing the magnitude and consistency of own-race bias in face recognition',
        type: 'foundational',
      },
      {
        title: 'The Other-Race Effect: A Meta-Analysis Examining the Role of Contact and Racial Attitudes',
        author: 'Meissner, C. A., & Brigham, J. C.',
        year: 2001,
        description:
          'Examines how interracial contact and racial attitudes moderate the own-race recognition advantage',
        type: 'foundational',
      },
      {
        title: 'Gender Shades: Intersectional Accuracy Disparities in Commercial Gender Classification',
        author: 'Buolamwini, J., & Gebru, T.',
        year: 2018,
        doi: '10.1145/3287560.3287596',
        description:
          'Groundbreaking study demonstrating racial and gender disparities in commercial facial recognition systems',
        type: 'foundational',
      },
      {
        title: 'Face Recognition Performance: Role of Demographic Information',
        author: 'Grother, P., Ngan, M., & Hanaoka, K.',
        year: 2019,
        description:
          'NIST study of 189 facial recognition algorithms showing significant demographic differentials in accuracy',
        type: 'case-study',
      },
    ],

    books: [
      {
        title: 'Algorithms of Oppression',
        author: 'Noble, Safiya Umoja',
        year: 2018,
        isbn: '9781479837243',
        description:
          'Examines how algorithmic systems perpetuate racial bias, including facial recognition disparities',
        type: 'foundational',
      },
      {
        title: 'Race After Technology',
        author: 'Benjamin, Ruha',
        year: 2019,
        isbn: '9781509526437',
        description:
          'Explores how technology encodes racial inequity, with implications for design and AI systems',
        type: 'foundational',
      },
      {
        title: 'Technically Wrong',
        author: 'Wachter-Boettcher, Sara',
        year: 2017,
        isbn: '9780393634631',
        description:
          'Practical guide to how design defaults and assumptions exclude diverse users, with actionable solutions',
        type: 'practical',
      },
    ],

    articles: [
      {
        title: 'Inclusive Design at Microsoft',
        author: 'Microsoft Design',
        url: 'https://inclusive.microsoft.design/',
        description:
          'Microsoft\'s framework for inclusive design, including representation and diverse defaults',
        type: 'practical',
      },
      {
        title: 'Designing for Diversity: The Role of Representation in UX',
        author: 'Nielsen Norman Group',
        url: 'https://www.nngroup.com/articles/diversity-representation/',
        description:
          'UX research on how visual representation affects user engagement and trust across demographics',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'How I\'m Fighting Bias in Algorithms',
        author: 'Joy Buolamwini (TED)',
        url: 'https://www.ted.com/talks/joy_buolamwini_how_i_m_fighting_bias_in_algorithms',
        description:
          'TED talk on racial bias in facial recognition technology and the Algorithmic Justice League',
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
      'implicit-bias',
      'stereotype-bias',
      'mere-exposure-effect',
    ],

    conflicts: [
      'contact-hypothesis',
    ],

    confusedWith: [
      'cross-race-effect',
      'in-group-favoritism',
      'implicit-association',
    ],

    hierarchy: {
      parent: 'social-bias',
      children: [
        'cross-race-effect',
        'other-race-effect',
      ],
    },
  },
};
