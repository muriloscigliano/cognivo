/**
 * CROSS-RACE EFFECT
 *
 * Difficulty recognizing faces of people from racial groups other than one's own.
 * Also known as the Other-Race Effect or Cross-Race Bias.
 */

import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const crossRaceEffect: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'cross-race-effect',
    name: 'Cross-Race Effect',
    aliases: ['Other-Race Effect', 'Own-Race Bias', 'Cross-Race Bias', 'Other-Race Bias'],
    category: BiasCategory.SOCIAL,
    relatedCategories: [
      BiasCategory.PERCEPTION,
      BiasCategory.MEMORY,
    ],
    tags: [
      'face-recognition',
      'diversity',
      'inclusion',
      'representation',
      'perception',
      'identity',
      'avatars',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple: 'People are better at recognizing faces from their own racial group than faces from other racial groups.',

    detailed: `The cross-race effect (CRE) is a well-documented perceptual bias in which individuals demonstrate superior recognition accuracy for faces of their own racial group compared to faces of other racial groups. This asymmetry arises from differential expertise: people typically have more exposure to and experience with own-race faces, leading to more refined perceptual encoding for those faces.

In product design and technology, the cross-race effect has critical implications for facial recognition systems, avatar and emoji design, stock photography selection, user testing practices, and any interface that relies on face-based identification or representation. Systems trained predominantly on one racial group's faces will underperform for others, and design teams lacking diversity may create representations that feel exclusionary.

Designers must proactively counteract this bias by ensuring diverse representation in visual assets, testing with racially diverse user groups, auditing facial recognition systems for cross-race accuracy disparities, and building inclusive default experiences that reflect the full breadth of their user base.`,

    psychologyBasis: {
      discoveredBy: 'Roy Malpass and Jerome Kravitz',
      year: 1969,
      theory: 'Perceptual Expertise and Contact Hypothesis',
      mechanism: `The brain develops specialized perceptual expertise for face categories encountered most frequently. This happens because:

1. **Perceptual Narrowing**: During development, face processing systems tune to the most frequently encountered face types, becoming less sensitive to distinguishing features in less-familiar face categories
2. **Feature Encoding Differences**: For own-race faces, people encode individuating features (subtle differences in eye shape, nose bridge, jawline). For other-race faces, they tend to encode category-level features (race, skin tone) rather than individuating details
3. **Contact Hypothesis**: Greater interpersonal contact with members of other racial groups reduces the effect, suggesting experience drives perceptual expertise
4. **Cognitive Categorization**: When a face is categorized as "other-race," the brain allocates fewer resources to encoding individuating features, leading to an "they all look alike" perception
5. **Holistic vs. Featural Processing**: Own-race faces are processed more holistically (as integrated wholes), while other-race faces are processed more featurally (as collections of parts), resulting in poorer recognition`,
    },

    realWorldExample: `In a landmark 1969 study, Malpass and Kravitz showed Black and White participants a series of faces from both racial groups and later tested recognition. Both groups were significantly better at recognizing faces of their own race. This effect has been replicated in over 30 years of research across multiple racial groups and cultures, with a meta-analysis by Meissner and Brigham (2001) confirming a robust effect across 39 studies involving nearly 5,000 participants. The real-world consequences are severe: cross-race misidentification is a leading factor in wrongful eyewitness convictions.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `The cross-race effect has profound implications for how digital products represent, identify, and serve diverse user populations. Designers must account for this bias to:

- Ensure avatar and emoji systems offer genuine diversity, not tokenistic additions
- Select stock photography that authentically represents diverse users
- Audit facial recognition and verification systems for cross-race accuracy gaps
- Build diverse user testing panels that catch representation blind spots
- Design profile and identity systems that respect individual uniqueness across racial groups`,

    whenToUse: [
      {
        title: 'Avatar and Emoji Systems',
        scenario:
          'When designing customizable avatars, emoji pickers, or profile representations',
        example:
          'Offer a wide range of skin tones, facial features, hair textures, and styles that authentically represent diverse racial groups, not just recolored versions of one template',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Stock Photography Selection',
        scenario: 'When choosing images for marketing, onboarding, or help content',
        example:
          'Audit your image library for genuine racial diversity; ensure people from different racial backgrounds appear in leadership, technical, and aspirational contexts, not just diversity-specific pages',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Facial Recognition Audit',
        scenario: 'When building or integrating face-based authentication, tagging, or identification',
        example:
          'Test recognition accuracy across racial groups and document disparities. Set minimum accuracy thresholds that must be met for all groups before deployment',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'User Testing Diversity',
        scenario: 'When recruiting participants for usability testing or user research',
        example:
          'Ensure test panels include participants from multiple racial backgrounds so that representation issues, bias in facial features, and cultural assumptions are caught early',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Profile and Identity Design',
        scenario: 'When designing user profile creation, verification, or display flows',
        example:
          'Avoid relying on face-matching alone for identity verification; provide alternative methods that do not disadvantage users from underrepresented racial groups',
        impact: ImpactLevel.HIGH,
      },
    ],

    whenToAvoid: [
      {
        title: 'Racial Categorization',
        reason:
          'Never use cross-race effect knowledge to categorize or sort users by race',
        consequence:
          'Algorithmic discrimination, legal liability, severe harm to users',
        alternative:
          'Focus on individual representation and preference rather than racial categorization',
      },
      {
        title: 'Tokenistic Diversity',
        reason:
          'Superficial diversity (recoloring a single face template) can feel performative and exclusionary',
        consequence:
          'Users from underrepresented groups feel unseen, reducing trust and engagement',
        alternative:
          'Invest in authentic representation with distinct facial features, hair types, and cultural elements for each group',
      },
      {
        title: 'Assumptions About User Race',
        reason:
          'Inferring or assuming a user\'s racial identity to customize their experience is invasive',
        consequence:
          'Privacy violations, stereotyping, user alienation',
        alternative:
          'Let users self-select preferences; default to inclusive, diverse representation for all users',
      },
      {
        title: 'Single-Demographic Optimization',
        reason:
          'Optimizing facial recognition or representation for one racial majority degrades experience for minorities',
        consequence:
          'Systematic exclusion, biased error rates, potential legal and ethical violations',
        alternative:
          'Set equal performance benchmarks across all demographic groups',
      },
    ],

    commonMistakes: [
      {
        title: 'Recolor-Only Diversity',
        description:
          'Creating diverse avatars by changing skin color on a single face template without varying facial features, hair textures, or face shapes',
        why: 'This reduces diversity to skin color alone, ignoring the rich variation in facial structures across racial groups',
        fix: 'Design distinct base models with authentic feature variation for each racial group, consulting with members of those communities',
      },
      {
        title: 'Homogeneous Design Teams',
        description:
          'Allowing a racially homogeneous team to make all representation decisions without outside input',
        why: 'The cross-race effect means team members may not perceive inadequacies in representing groups unlike their own',
        fix: 'Include diverse voices in design reviews, hire diverse teams, and engage external consultants from underrepresented communities',
      },
      {
        title: 'Unaudited Facial Recognition',
        description:
          'Deploying face-based systems without testing accuracy across racial groups',
        why: 'Training data biases cause dramatically higher error rates for underrepresented racial groups',
        fix: 'Conduct demographic parity audits before deployment, publish accuracy metrics by group, and set minimum thresholds for all groups',
      },
      {
        title: 'Diversity Only on Diversity Pages',
        description:
          'Showing racial diversity only on "About Us" or DEI pages while using homogeneous imagery elsewhere',
        why: 'Signals that diversity is a marketing checkbox rather than a genuine value',
        fix: 'Distribute diverse representation throughout the entire product: onboarding, help docs, marketing, error states, and hero images',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.MEDIUM,
        description:
          'Layout determines which faces and representations users encounter first and most frequently',
        examples: [
          'Hero images featuring diverse individuals establish inclusive first impressions',
          'Team photo grids that lead with diverse representation signal belonging',
          'Avatar selection grids should not relegate non-White options to secondary rows or pages',
          'Profile photo placement should accommodate diverse face shapes and hair styles without cropping',
        ],
      },
      typography: {
        level: ImpactLevel.LOW,
        description:
          'Typography has minimal direct impact on cross-race effect but supports inclusive naming',
        examples: [
          'Support for diacritics and non-Latin characters in name display',
          'Adequate line height for names from different cultural naming conventions',
          'Culturally aware name field labels (avoid assuming first/last name structure)',
          'Font choices that render diverse Unicode character sets clearly',
        ],
      },
      color: {
        level: ImpactLevel.HIGH,
        description:
          'Color choices directly affect how well diverse skin tones are represented and displayed',
        examples: [
          'Skin tone palettes should cover the full Fitzpatrick scale authentically',
          'Background colors should provide sufficient contrast with all skin tones',
          'Avoid default "flesh" colors that only represent one racial group',
          'Profile rings, badges, and overlays must be visible against diverse skin tones',
        ],
      },
      interaction: {
        level: ImpactLevel.HIGH,
        description:
          'Interactions involving faces must perform equitably across racial groups',
        examples: [
          'Face unlock and verification must work equally well for all racial groups',
          'Photo auto-tagging should be tested for cross-race accuracy',
          'Avatar customization flows should make diverse options equally accessible',
          'Camera filters and effects must work correctly across diverse skin tones',
        ],
      },
      content: {
        level: ImpactLevel.CRITICAL,
        description:
          'Visual content is the primary vehicle for inclusive or exclusionary representation',
        examples: [
          'Stock photography libraries should reflect genuine racial diversity',
          'Illustration styles should depict distinct features rather than recoloring one template',
          'User testimonials and case studies should feature diverse individuals',
          'Help documentation imagery should represent diverse users performing tasks',
        ],
      },
      accessibility: {
        level: ImpactLevel.HIGH,
        description:
          'Accessibility intersects with cross-race representation in alt text and assistive technology',
        examples: [
          'Alt text for diverse imagery should be descriptive without over-emphasizing race',
          'Screen reader descriptions of avatar options should convey meaningful differences',
          'Facial recognition alternatives must be available for users whom the system disadvantages',
          'Voice-based identity verification provides an alternative that avoids facial bias',
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
        title: 'Inclusive Emoji and Avatar System',
        description:
          'Emoji picker offering authentic skin tone, hair texture, and facial feature variations',
        code: `<div class="emoji-picker">
  <h3>Choose Your Emoji</h3>
  <div class="skin-tone-selector" role="radiogroup" aria-label="Skin tone">
    <button role="radio" aria-label="Light skin tone" class="tone" style="--tone: #FFDBB4;"></button>
    <button role="radio" aria-label="Medium-light skin tone" class="tone" style="--tone: #EDB98A;"></button>
    <button role="radio" aria-label="Medium skin tone" class="tone" style="--tone: #D08B5B;"></button>
    <button role="radio" aria-label="Medium-dark skin tone" class="tone" style="--tone: #AE5D29;"></button>
    <button role="radio" aria-label="Dark skin tone" class="tone" style="--tone: #614335;"></button>
  </div>
  <div class="hair-options" role="radiogroup" aria-label="Hair style">
    <button role="radio" aria-label="Straight hair">Straight</button>
    <button role="radio" aria-label="Wavy hair">Wavy</button>
    <button role="radio" aria-label="Curly hair">Curly</button>
    <button role="radio" aria-label="Coily hair">Coily</button>
    <button role="radio" aria-label="Locs">Locs</button>
    <button role="radio" aria-label="Braids">Braids</button>
    <button role="radio" aria-label="Hijab">Hijab</button>
  </div>
  <div class="feature-options" role="radiogroup" aria-label="Face shape">
    <button role="radio">Round</button>
    <button role="radio">Oval</button>
    <button role="radio">Heart</button>
    <button role="radio">Square</button>
  </div>
</div>`,
        explanation:
          'Goes beyond simple skin tone selection to offer authentic variation in hair textures, face shapes, and cultural elements. Each option is independently selectable, allowing genuinely diverse self-representation.',
        principle:
          'Authentic diversity requires varying multiple dimensions of appearance, not just skin color',
        metrics: {
          before: '47% of non-White users customized their avatar (skin tone only system)',
          after: '81% of non-White users customized their avatar (multi-dimensional system)',
          improvement: '72% increase in avatar customization among non-White users',
        },
      },
      {
        title: 'Diverse Stock Photography with Contextual Inclusion',
        description:
          'Landing page imagery showing diverse individuals in leadership and technical roles throughout the site',
        code: `<section class="hero">
  <div class="hero-content">
    <h1>Build Your Future with Us</h1>
    <p>Join 10,000+ teams transforming their workflow</p>
  </div>
  <div class="hero-images">
    <img src="/images/hero-team-diverse.jpg"
         alt="Team of five professionals collaborating around a screen,
              including people of varied racial backgrounds and ages"
    >
  </div>
</section>

<section class="testimonials">
  <article class="testimonial">
    <img src="/images/testimonial-aisha.jpg"
         alt="Aisha Johnson, VP of Engineering">
    <blockquote>"Reduced our deployment time by 60%."</blockquote>
    <cite>Aisha Johnson, VP of Engineering at TechCorp</cite>
  </article>
  <article class="testimonial">
    <img src="/images/testimonial-chen.jpg"
         alt="Wei Chen, Product Director">
    <blockquote>"Our team collaboration improved overnight."</blockquote>
    <cite>Wei Chen, Product Director at DataFlow</cite>
  </article>
  <article class="testimonial">
    <img src="/images/testimonial-garcia.jpg"
         alt="Maria Garcia, CTO">
    <blockquote>"The best investment we made this year."</blockquote>
    <cite>Maria Garcia, CTO at InnovateLabs</cite>
  </article>
</section>`,
        explanation:
          'Diverse representation appears throughout the product in leadership and technical roles, not just on a dedicated diversity page. Alt text describes people without over-emphasizing race. Testimonials feature real names and senior titles across racial backgrounds.',
        principle:
          'Inclusive representation must be systemic and contextual, not confined to diversity-specific content',
      },
      {
        title: 'Facial Recognition Accuracy Dashboard',
        description:
          'Internal audit tool showing recognition accuracy broken down by demographic group',
        code: `<div class="accuracy-dashboard">
  <h3>Face Verification Accuracy by Demographic Group</h3>
  <p class="threshold">Minimum threshold: 99.0% for all groups</p>

  <table class="accuracy-table" role="grid">
    <thead>
      <tr>
        <th>Demographic Group</th>
        <th>True Positive Rate</th>
        <th>False Positive Rate</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Light-skinned female</td>
        <td>99.7%</td>
        <td>0.1%</td>
        <td><span class="status pass">Pass</span></td>
      </tr>
      <tr>
        <td>Light-skinned male</td>
        <td>99.8%</td>
        <td>0.08%</td>
        <td><span class="status pass">Pass</span></td>
      </tr>
      <tr>
        <td>Dark-skinned female</td>
        <td>98.1%</td>
        <td>0.9%</td>
        <td><span class="status fail">Below threshold</span></td>
      </tr>
      <tr>
        <td>Dark-skinned male</td>
        <td>98.6%</td>
        <td>0.7%</td>
        <td><span class="status fail">Below threshold</span></td>
      </tr>
    </tbody>
  </table>

  <div class="action-required">
    <p><strong>Action Required:</strong> Dark-skinned groups below 99.0% threshold.
    System must not deploy until parity is achieved.</p>
    <button class="primary">View Remediation Plan</button>
  </div>
</div>`,
        explanation:
          'Proactively audits facial recognition accuracy across demographic groups and blocks deployment when any group falls below the minimum threshold. Makes cross-race accuracy gaps visible and actionable.',
        principle:
          'Equitable performance across racial groups must be measured and enforced, not assumed',
      },
    ],

    bad: [
      {
        title: 'Recolor-Only Avatar System',
        description:
          'Avatar system that only changes skin color on a single face template',
        code: `<!-- DON'T DO THIS -->
<div class="avatar-picker">
  <h3>Choose Your Avatar</h3>
  <!-- Same face template, just different colors -->
  <div class="avatars">
    <img src="/avatar-base-light.png" alt="Avatar light">
    <img src="/avatar-base-medium.png" alt="Avatar medium">
    <img src="/avatar-base-dark.png" alt="Avatar dark">
  </div>
  <!-- All three use identical facial features, hair, and face shape -->
</div>`,
        explanation:
          'Using a single face template with different skin colors reduces racial diversity to skin color alone. It ignores the wide variation in facial structures, hair textures, eye shapes, nose shapes, and lip shapes across racial groups. Users from non-default groups feel that the avatar does not represent them.',
        principle:
          'Diversity is multidimensional; skin color variation alone is tokenistic and insufficient',
      },
      {
        title: 'Biased Auto-Cropping',
        description:
          'Image auto-crop algorithm that centers on lighter skin tones',
        code: `<!-- DON'T DO THIS -->
<div class="profile-card">
  <!-- Algorithm auto-crops to "most prominent" face -->
  <!-- Trained primarily on light-skinned faces -->
  <img src="/team-photo.jpg"
       alt="Team photo"
       style="object-fit: cover; object-position: center;"
  >
  <!-- Result: darker-skinned team members are frequently cropped out -->
</div>`,
        explanation:
          'Auto-cropping algorithms trained on biased datasets will systematically center lighter-skinned individuals and crop out darker-skinned individuals. This was a documented issue at major social media platforms.',
        principle:
          'Biased training data produces biased algorithmic outputs that harm underrepresented groups',
      },
      {
        title: 'Homogeneous Default Imagery',
        description:
          'Product using exclusively one racial group in all imagery except the diversity page',
        code: `<!-- DON'T DO THIS -->
<!-- Homepage, features, pricing: all White models -->
<section class="hero">
  <img src="/hero-white-team.jpg" alt="Happy team">
</section>
<section class="features">
  <img src="/feature-white-user.jpg" alt="User enjoying product">
</section>

<!-- Only on "About Us" page: diversity appears -->
<section class="diversity">
  <h2>We Celebrate Diversity</h2>
  <img src="/diverse-team-stock.jpg" alt="Diverse team">
</section>`,
        explanation:
          'Confining diversity to a single page while all other imagery is homogeneous signals that diversity is performative. Users from underrepresented groups immediately notice the inconsistency and feel excluded from the core product experience.',
        principle:
          'Representation must be consistent throughout the entire product, not isolated to diversity statements',
      },
    ],

    realWorld: [
      {
        company: 'Apple',
        product: 'Diverse Emoji System',
        description: 'Apple introduced skin tone modifiers for emoji in 2015, followed by diverse hair types, gender-neutral options, and culturally specific emoji (hijab, afro, various hair textures). The system goes beyond recoloring to offer authentic representation across racial and cultural groups.',
        effectiveness: 'very-effective',
        analysis: 'Apple set the industry standard for emoji diversity by implementing the Fitzpatrick scale for skin tones and continuously expanding hair, cultural, and feature options. This normalized diverse digital self-expression across billions of devices.',
      },
      {
        company: 'Google',
        product: 'Inclusive Camera and Photos',
        description: 'After research revealed that Google Photos auto-tagging produced offensive misclassifications for Black users, Google invested in retraining models with more diverse datasets, hired diverse ML teams, and implemented fairness testing frameworks for all image-related AI.',
        effectiveness: 'effective',
        analysis: 'The incident demonstrated how cross-race bias in training data leads to harmful algorithmic outcomes. Google\'s response set a precedent for demographic parity testing in AI systems.',
      },
      {
        company: 'Unsplash & Pexels',
        product: 'Diverse Stock Photography',
        description: 'Stock photography platforms like Unsplash and Pexels launched dedicated collections for diverse representation, actively recruiting photographers from underrepresented backgrounds to contribute images of their communities in authentic, non-stereotypical contexts.',
        effectiveness: 'effective',
        analysis: 'By expanding their contributor base rather than just curating existing homogeneous collections, these platforms addressed the root cause: the photographer pool itself lacked diversity, leading to imagery that did not reflect global user bases.',
      },
      {
        company: 'Slack',
        product: 'Diverse Default Avatars and Illustrations',
        description: 'Slack designed a system of default avatars and product illustrations that feature diverse skin tones, hair types, body shapes, and abilities. These appear throughout the product in onboarding, empty states, help docs, and marketing.',
        effectiveness: 'effective',
        analysis: 'By making diversity the default rather than an opt-in, Slack ensures every user encounters inclusive representation from their first interaction, reinforcing belonging regardless of racial background.',
      },
    ],

    abTests: [
      {
        title: 'Diverse vs Homogeneous Hero Imagery',
        hypothesis:
          'Diverse hero imagery will increase sign-up rates among users from underrepresented racial groups without reducing sign-ups from majority groups',
        controlVersion: {
          description:
            'Landing page with hero image showing a homogeneous team of five people from the same racial background',
          metrics: {
            conversionRate: '5.2%',
            timeOnPage: '1:45',
            scrollDepth: '52%',
          },
        },
        treatmentVersion: {
          description:
            'Landing page with hero image showing a racially diverse team of five people in the same professional context',
          metrics: {
            conversionRate: '6.1%',
            timeOnPage: '2:10',
            scrollDepth: '61%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Diverse hero imagery increased overall conversions by 17%. Sign-ups from underrepresented groups increased by 28%, while majority group sign-ups remained stable. Time on page and scroll depth both increased, suggesting higher engagement across all groups.',
          learnings: [
            'Diverse imagery increases engagement broadly, not just among underrepresented groups',
            'Users from underrepresented groups showed significantly higher trust scores',
            'Authentic diversity (varied features, not just skin tone) outperformed tokenistic diversity',
            'The effect was strongest for new visitors with no prior brand familiarity',
          ],
        },
      },
      {
        title: 'Multi-Dimensional vs Skin-Tone-Only Avatar Customization',
        hypothesis:
          'Offering hair texture, face shape, and feature options alongside skin tone will increase avatar adoption among non-White users',
        controlVersion: {
          description:
            'Avatar customization with 5 skin tones applied to a single face/hair template',
          metrics: {
            conversionRate: '52%',
            timeOnPage: '0:35',
          },
        },
        treatmentVersion: {
          description:
            'Avatar customization with 5 skin tones, 7 hair textures, 4 face shapes, and varied feature options',
          metrics: {
            conversionRate: '79%',
            timeOnPage: '1:50',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Multi-dimensional avatar customization increased adoption from 52% to 79%. Non-White users showed the largest increase (from 38% to 81%). Users spent significantly more time customizing, indicating genuine engagement rather than settling for a "close enough" option.',
          learnings: [
            'Skin tone alone is insufficient for users to feel represented',
            'Hair texture was the second most important customization dimension after skin tone',
            'Users who created avatars they identified with had 23% higher retention at 30 days',
            'Offering more options did not create decision paralysis; completion rates increased',
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
          'All or nearly all human imagery represents a single racial group',
        howToSpot:
          'Scan hero images, testimonials, team photos, and illustrations for racial diversity across the entire product',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Template-Based Diversity',
        description:
          'Diverse avatars or emoji that are clearly the same template with different skin colors applied',
        howToSpot:
          'Compare "diverse" avatar options for identical facial features, hair, and face shape with only color varying',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Segregated Diversity',
        description:
          'Diverse imagery appears only on specific pages (About Us, DEI) but not throughout the product',
        howToSpot:
          'Compare representation on homepage, features, pricing, and help pages against diversity-specific pages',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Biased Auto-Crop or Focus',
        description:
          'Image cropping, auto-focus, or thumbnail generation that systematically favors lighter-skinned subjects',
        howToSpot:
          'Test auto-crop with group photos containing diverse subjects; check which faces are centered or cropped out',
        severity: ImpactLevel.CRITICAL,
      },
      {
        name: 'Uneven Recognition Performance',
        description:
          'Face-based features (unlock, tagging, filters) that work noticeably better for some racial groups',
        howToSpot:
          'Test face detection, recognition, and filter features with users from multiple racial backgrounds',
        severity: ImpactLevel.CRITICAL,
      },
    ],

    patterns: [
      {
        name: 'Monoracial Default Pattern',
        description: 'Default images, avatars, and illustrations represent a single racial group as the assumed user',
        indicators: ['Default avatar with light skin tone', 'Help documentation showing only one racial group', 'Onboarding illustrations with homogeneous characters', 'Error state and empty state images lacking diversity'],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Biased Training Data Pattern',
        description: 'AI and ML features trained predominantly on data from one racial group, producing unequal outcomes',
        indicators: ['Higher face recognition error rates for certain racial groups', 'Beauty filters that lighten skin or narrow features', 'Photo enhancement that works poorly on darker skin tones', 'Auto-tagging that misclassifies people of certain races'],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Tokenistic Diversity Pattern',
        description: 'Surface-level diversity that does not extend to authentic representation',
        indicators: ['Same face template recolored for different skin tones', 'Diversity confined to marketing materials only', 'Stock photos of diverse groups in generic poses disconnected from product context', 'Single diverse photo used repeatedly across the site'],
        severity: ImpactLevel.MEDIUM,
        confidence: 'medium',
      },
      {
        name: 'Homogeneous Testing Pattern',
        description: 'User testing and research conducted with participants from a single racial demographic',
        indicators: ['Test participant demographics not tracked or reported', 'Usability studies conducted in a single geographic/racial context', 'No demographic breakdown in user research findings', 'Face-based features released without cross-demographic testing'],
        severity: ImpactLevel.HIGH,
        confidence: 'medium',
      },
    ],

    checklistQuestions: [
      'Do the images throughout the product represent multiple racial groups authentically?',
      'Are avatar and emoji options multidimensional (skin tone, hair, features) or just recolored?',
      'Has facial recognition or detection been tested for accuracy across racial groups?',
      'Are diverse images distributed throughout the product or confined to specific pages?',
      'Does the design team include members from diverse racial backgrounds?',
      'Have user tests been conducted with participants from multiple racial groups?',
      'Do auto-crop and thumbnail features perform equitably across skin tones?',
      'Are default avatars and placeholders racially neutral or diverse?',
      'Do camera filters and image effects work correctly on all skin tones?',
      'Is there a process for auditing representation in new content and features?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology, inclusive design, and the cross-race effect.

Analyze the provided design for cross-race effect patterns and diversity/inclusion issues. Identify:

1. **Representation Audit**: How racially diverse are the human images, avatars, and illustrations throughout the product?
2. **Avatar/Emoji Inclusivity**: Do customization options go beyond skin tone to include diverse hair textures, face shapes, and cultural elements?
3. **Algorithmic Fairness**: Are face-based features (recognition, filters, cropping) tested for equitable performance across racial groups?
4. **Distributed vs Segregated Diversity**: Is diverse representation consistent throughout the product or confined to specific pages?
5. **Testing Inclusivity**: Has the design been tested with racially diverse user groups?

For each issue found:
- Identify the specific representation gap or bias
- Assess severity (how many users are affected and how deeply)
- Determine whether the issue is systemic or localized
- Evaluate intent vs impact (well-meaning design can still cause harm)
- Suggest concrete, actionable improvements

Consider:
- Does the product's visual language signal belonging to users of all racial backgrounds?
- Are AI/ML features performing equitably across demographic groups?
- Is diversity authentic (varied features) or tokenistic (recolored templates)?
- Are there alternative interaction paths for users disadvantaged by face-based features?
- Does the team have the diversity needed to catch these issues internally?

Provide prioritized recommendations for improving cross-race inclusivity.`,

    outputSchema: {
      type: 'object',
      properties: {
        representationAudit: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              area: { type: 'string' },
              currentState: { type: 'string' },
              diversityScore: { type: 'number' },
              gaps: { type: 'string' },
              recommendation: { type: 'string' },
            },
            required: [
              'area',
              'currentState',
              'diversityScore',
              'recommendation',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            representationScore: { type: 'number' },
            authenticityScore: { type: 'number' },
            algorithmicFairnessScore: { type: 'number' },
            inclusivityScore: { type: 'number' },
          },
          required: [
            'representationScore',
            'authenticityScore',
            'algorithmicFairnessScore',
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
        'representationAudit',
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
          'Systematically review all human imagery, avatars, and illustrations across the product for racial diversity',
        example:
          'Create a spreadsheet cataloging every human image by page, context (hero, testimonial, help), and racial representation',
        tips: [
          'Include marketing, help docs, error states, and empty states in the audit',
          'Note whether diverse individuals appear in leadership and technical roles',
          'Check if diversity is distributed or confined to specific pages',
        ],
      },
      {
        step: 2,
        title: 'Design Multi-Dimensional Representation',
        description:
          'Create avatar, emoji, and illustration systems that vary across multiple dimensions of appearance',
        example:
          'Design avatar options with independent selectors for skin tone, hair texture, face shape, eye shape, nose shape, and cultural accessories',
        tips: [
          'Consult with members of each racial community on authentic representation',
          'Avoid stereotypical depictions; show people in varied contexts and roles',
          'Test with diverse users to ensure options feel authentic, not caricatured',
        ],
      },
      {
        step: 3,
        title: 'Audit AI/ML Systems for Demographic Parity',
        description:
          'Test all face-based features for accuracy and fairness across racial groups',
        example:
          'Run face recognition benchmarks on datasets balanced across skin tones, genders, and age groups; require 99%+ accuracy for all groups before deployment',
        tips: [
          'Use established fairness benchmarks (Fitzpatrick scale, Pilot Parliaments Benchmark)',
          'Set minimum accuracy thresholds that must be met for every group',
          'Document and publish demographic accuracy metrics',
        ],
      },
      {
        step: 4,
        title: 'Diversify Design and Testing Teams',
        description:
          'Ensure the teams designing, building, and testing representations include members from diverse racial backgrounds',
        example:
          'Recruit usability test participants to match the racial demographics of your actual user base, not just local demographics',
        tips: [
          'Include diverse perspectives in design review sessions',
          'Engage external consultants if the team lacks internal diversity',
          'Track and report diversity of test participant pools',
        ],
      },
      {
        step: 5,
        title: 'Implement Ongoing Monitoring',
        description:
          'Establish processes to maintain inclusive representation as the product evolves',
        example:
          'Add a representation checklist to design review and QA processes; re-audit quarterly',
        tips: [
          'Create a style guide with diversity requirements for imagery',
          'Set up automated checks for face-based AI performance by demographic',
          'Include representation in accessibility audits',
        ],
      },
    ],

    dos: [
      'Offer avatar and emoji options with diverse skin tones, hair textures, face shapes, and cultural elements',
      'Distribute diverse representation throughout the entire product, not just on diversity pages',
      'Test facial recognition and detection systems for accuracy across racial groups before deployment',
      'Include racially diverse participants in user testing and research',
      'Design default imagery and illustrations to be racially diverse or neutral',
      'Provide alternative interaction paths for users disadvantaged by face-based features',
      'Consult with members of represented communities to ensure authenticity',
      'Audit image auto-cropping and thumbnail generation for skin tone bias',
    ],

    donts: [
      'Don\'t create diverse avatars by only recoloring a single face template',
      'Don\'t confine diverse imagery to "About Us" or diversity-specific pages',
      'Don\'t deploy facial recognition without cross-demographic accuracy testing',
      'Don\'t assume your team can assess representation adequacy without diverse perspectives',
      'Don\'t use a single "flesh" color as the default skin tone',
      'Don\'t rely solely on face-based identification without providing alternatives',
      'Don\'t use stereotypical imagery when representing different racial groups',
      'Don\'t ignore cross-race performance gaps in AI/ML systems as acceptable tradeoffs',
    ],

    bestPractices: [
      {
        title: 'Authentic Multi-Dimensional Diversity',
        description:
          'Vary skin tone, hair texture, face shape, and cultural elements independently rather than recoloring one template',
        rationale:
          'Racial diversity encompasses far more than skin color; users need to see their actual features represented',
        example:
          'Avatar system with separate selectors for skin tone (Fitzpatrick 1-6), 8+ hair textures, 5+ face shapes, and cultural head coverings',
      },
      {
        title: 'Systemic Representation Distribution',
        description:
          'Ensure diverse representation appears consistently across all product touchpoints',
        rationale:
          'Users who see diversity only on specific pages perceive it as performative marketing, not genuine inclusion',
        example:
          'Diversity checklist for every new page: hero image, testimonials, illustrations, help content, and empty states',
      },
      {
        title: 'Demographic Parity Testing',
        description:
          'Set and enforce equal performance thresholds for face-based features across all racial groups',
        rationale:
          'Unequal accuracy rates in facial recognition cause real harm: false rejections, wrongful identifications, exclusion from services',
        example:
          'Automated CI pipeline that blocks deployment if face recognition accuracy drops below 99% for any demographic group',
      },
      {
        title: 'Diverse Design Review Panels',
        description:
          'Include reviewers from multiple racial backgrounds in design critiques and content reviews',
        rationale:
          'The cross-race effect means homogeneous teams have blind spots for representing unfamiliar groups',
        example:
          'Quarterly external review panel with participants from 5+ racial/ethnic backgrounds evaluating new content and features',
      },
      {
        title: 'Graceful Degradation for Face-Based Features',
        description:
          'Provide non-facial alternatives for any feature that relies on face recognition or detection',
        rationale:
          'Cross-race accuracy gaps in facial recognition mean some users will always be disadvantaged; alternatives ensure equitable access',
        example:
          'Face unlock accompanied by PIN, fingerprint, and password options with equal prominence and ease of setup',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '1.1.1',
        guideline:
          'Non-text Content - Provide meaningful alt text for diverse imagery without over-emphasizing race',
        implementation:
          'Describe people by role and action rather than race unless race is contextually relevant. "Team lead presenting quarterly results" rather than "Black woman presenting."',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.4.1',
        guideline:
          'Use of Color - Ensure skin tone selection in avatars is not communicated by color alone',
        implementation:
          'Label skin tone options with descriptive names or Fitzpatrick scale numbers in addition to color swatches. Provide sufficient contrast between adjacent tone options.',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.4.3',
        guideline:
          'Contrast - Ensure UI elements are visible against all skin tone backgrounds in avatars and profiles',
        implementation:
          'Test profile badges, status indicators, and text overlays against the full range of avatar skin tones to ensure 4.5:1 contrast ratio.',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.4.6',
        guideline:
          'Headings and Labels - Clearly label avatar customization categories for screen readers',
        implementation:
          'Use descriptive labels for each customization dimension: "Skin Tone," "Hair Texture," "Face Shape" with clear option names.',
      },
    ],

    ethics: [
      {
        concern: 'Algorithmic Discrimination',
        severity: 'critical',
        explanation:
          'Facial recognition systems with higher error rates for certain racial groups cause real-world harm: wrongful arrests, service denial, and exclusion',
        mitigation:
          'Mandate demographic parity testing with published accuracy metrics. Do not deploy systems with significant cross-race accuracy gaps. Provide non-facial alternatives.',
      },
      {
        concern: 'Tokenistic Representation',
        severity: 'high',
        explanation:
          'Surface-level diversity (recolored templates, stock diversity photos) can feel patronizing and signals that inclusion is a marketing exercise rather than a genuine value',
        mitigation:
          'Invest in authentic, multi-dimensional representation. Consult with members of represented communities. Distribute diversity throughout the product.',
      },
      {
        concern: 'Racial Profiling via Design',
        severity: 'critical',
        explanation:
          'Using inferred or detected race to customize experiences, target content, or make decisions about users',
        mitigation:
          'Never infer or store racial identity without explicit consent. Allow users to self-identify if they choose. Do not use race for algorithmic decision-making.',
      },
      {
        concern: 'Stereotypical Representation',
        severity: 'high',
        explanation:
          'Depicting racial groups in stereotypical roles, contexts, or imagery reinforces harmful biases',
        mitigation:
          'Show people from all racial backgrounds in varied roles (leadership, technical, creative, everyday). Consult with community members to avoid stereotypes.',
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
          'Comprehensive meta-analysis of 39 studies confirming the robustness of the cross-race effect across nearly 5,000 participants',
        type: 'foundational',
      },
      {
        title: 'Recognition of Other-Race Faces: An Analysis of the Contact Hypothesis',
        author: 'Malpass, R. S., & Kravitz, J.',
        year: 1969,
        doi: '10.1037/h0027474',
        description:
          'The original study establishing the cross-race effect in face recognition and proposing the contact hypothesis',
        type: 'foundational',
      },
      {
        title: 'Gender Shades: Intersectional Accuracy Disparities in Commercial Gender Classification',
        author: 'Buolamwini, J., & Gebru, T.',
        year: 2018,
        description:
          'Landmark study demonstrating significant accuracy disparities in commercial facial recognition systems across race and gender, with error rates up to 34.7% for dark-skinned women vs 0.8% for light-skinned men',
        type: 'practical',
      },
      {
        title: 'The Other-Race Effect: A Meta-Analysis of the Role of Experience and Attention',
        author: 'Hugenberg, K., Young, S. G., Bernstein, M. J., & Sacco, D. F.',
        year: 2010,
        doi: '10.1037/a0020951',
        description:
          'Meta-analysis examining how social categorization and motivated attention contribute to the cross-race effect',
        type: 'advanced',
      },
    ],

    books: [
      {
        title: 'Race After Technology: Abolitionist Tools for the New Jim Code',
        author: 'Benjamin, Ruha',
        year: 2019,
        isbn: '9781509526406',
        description:
          'Explores how technology design can perpetuate racial bias, with direct implications for inclusive design practices',
        type: 'practical',
      },
      {
        title: 'Algorithms of Oppression: How Search Engines Reinforce Racism',
        author: 'Noble, Safiya Umoja',
        year: 2018,
        isbn: '9781479837243',
        description:
          'Documents how algorithmic systems can encode and amplify racial biases in search, imagery, and representation',
        type: 'practical',
      },
    ],

    articles: [
      {
        title: 'The Cross-Race Effect and Its Implications for UX Design',
        author: 'Nielsen Norman Group',
        url: 'https://www.nngroup.com/',
        description:
          'Practical guidance on designing for diverse user populations with awareness of perceptual biases',
        type: 'practical',
      },
      {
        title: 'Racial Bias in AI and Facial Recognition',
        author: 'MIT Media Lab',
        url: 'https://www.media.mit.edu/',
        description:
          'Research and resources on measuring and mitigating racial bias in facial analysis systems',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'How I\'m Fighting Bias in Algorithms',
        author: 'Joy Buolamwini (TED)',
        url: 'https://www.ted.com/talks/joy_buolamwini_how_i_m_fighting_bias_in_algorithms',
        description:
          'TED talk by the researcher who exposed cross-race accuracy gaps in commercial facial recognition systems',
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
      'mere-exposure-effect',
      'outgroup-homogeneity-bias',
    ],

    conflicts: [
      'contact-hypothesis',
    ],

    confusedWith: [
      'implicit-bias',
      'stereotyping',
      'outgroup-homogeneity-bias',
    ],

    hierarchy: {
      parent: 'social-bias',
      children: [
        'own-race-bias',
        'other-race-effect',
      ],
    },
  },
};
