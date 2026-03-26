/**
 * PHYSICAL ATTRACTIVENESS STEREOTYPE
 *
 * We assume attractive people have other positive qualities — "what is beautiful is good"
 */

import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const physicalAttractivenessStereotype: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'physical-attractiveness-stereotype',
    name: 'Physical Attractiveness Stereotype',
    aliases: ['What Is Beautiful Is Good', 'Halo Effect of Attractiveness', 'Beauty Bias', 'Attractiveness Halo'],
    category: BiasCategory.SOCIAL,
    relatedCategories: [
      BiasCategory.DECISION_MAKING,
      BiasCategory.PERCEPTION,
    ],
    tags: [
      'appearance',
      'trust',
      'credibility',
      'first-impression',
      'visual-design',
      'social-judgment',
      'halo-effect',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple: 'We assume attractive people have other positive qualities like intelligence, competence, and trustworthiness.',

    detailed: `The Physical Attractiveness Stereotype is a cognitive bias in which people attribute positive personality traits — such as intelligence, competence, kindness, and trustworthiness — to individuals they perceive as physically attractive. Often summarized as "what is beautiful is good," this bias operates automatically and influences judgments in hiring, credibility assessment, persuasion, and interpersonal trust.

In product design, this bias extends beyond people to interfaces themselves. Visually polished, aesthetically pleasing designs are perceived as more usable, trustworthy, and competent — even when functionality is identical to a less attractive alternative. This is sometimes called the "aesthetic-usability effect." The choice of photos, avatars, spokesperson imagery, and overall visual refinement all trigger attractiveness-based judgments that shape user perception and behavior.

Designers must be aware that leveraging this bias can reinforce harmful beauty standards, exclude underrepresented groups, and create shallow trust signals that substitute for genuine quality. Ethical application requires balancing visual appeal with substance, diversity, and authenticity.`,

    psychologyBasis: {
      discoveredBy: 'Karen Dion, Ellen Berscheid, and Elaine Walster',
      year: 1972,
      theory: 'What Is Beautiful Is Good Hypothesis',
      mechanism: `The brain automatically associates physical attractiveness with other positive qualities through a halo effect. This happens because:

1. **Implicit Association**: Attractive individuals activate positive schemas in memory, leading observers to assume they also possess unrelated positive traits like intelligence, honesty, and social competence
2. **Cognitive Shortcut**: Evaluating character is complex; attractiveness serves as a quick, effortless proxy for overall quality
3. **Cultural Reinforcement**: Media, fairy tales, and advertising consistently pair beauty with virtue and ugliness with villainy, strengthening the association over a lifetime
4. **Self-Fulfilling Prophecy**: Because attractive people are treated more favorably, they may develop greater social confidence and interpersonal skills, partially confirming the stereotype
5. **Generalization to Objects**: The same mechanism extends to products and interfaces — visual polish is read as a signal of quality, care, and competence behind the scenes`,
    },

    realWorldExample: `In the original 1972 study by Dion, Berscheid, and Walster, participants viewed photographs of attractive, average, and unattractive individuals and rated them on personality traits and life outcomes. Attractive individuals were consistently judged as more socially desirable, likely to have better jobs, happier marriages, and more fulfilling lives — purely based on a photograph. This effect has been replicated across cultures, age groups, and contexts, from courtroom sentencing to job interviews to online dating.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `The Physical Attractiveness Stereotype affects how users perceive trustworthiness, competence, and quality in interfaces. Visual polish, photo selection, and avatar design all trigger attractiveness-based judgments. Designers can leverage this to:

- Increase perceived trustworthiness through polished, well-crafted visual design
- Strengthen credibility of testimonials and team pages with professional photography
- Build confidence in products through aesthetic refinement and attention to detail
- Signal competence and care through consistent, high-quality visual presentation
- Create positive first impressions that carry through the entire user experience`,

    whenToUse: [
      {
        title: 'Team and About Pages',
        scenario:
          'When presenting team members, founders, or leadership to build credibility',
        example:
          'Use professional, well-lit photography with consistent styling to signal competence and approachability',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Testimonials and Case Studies',
        scenario: 'When featuring customer quotes, reviews, or success stories',
        example:
          'Include professional headshots alongside testimonials to increase perceived credibility of the quoted person',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Visual Polish and Trust',
        scenario: 'When establishing first impressions for landing pages or onboarding',
        example:
          'Invest in refined typography, spacing, and visual consistency — users equate aesthetic quality with product quality',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Avatar and Profile Design',
        scenario: 'When designing user profile systems, social features, or community platforms',
        example:
          'Provide flattering default avatars and easy-to-use profile photo tools, as profile attractiveness influences how others perceive user contributions',
        impact: ImpactLevel.MEDIUM,
      },
      {
        title: 'Marketing and Spokesperson Selection',
        scenario: 'When choosing imagery for advertising, hero sections, or promotional materials',
        example:
          'Select relatable, diverse, and professional-looking imagery that builds trust without reinforcing narrow beauty standards',
        impact: ImpactLevel.HIGH,
      },
    ],

    whenToAvoid: [
      {
        title: 'Hiring and Evaluation Platforms',
        reason:
          'Attractiveness bias in hiring leads to discrimination against equally or more qualified candidates',
        consequence:
          'Unfair hiring outcomes, legal liability, reduced diversity',
        alternative:
          'Use blind review processes, structured evaluations, and skill-based assessments that minimize appearance influence',
      },
      {
        title: 'Medical or Clinical Interfaces',
        reason:
          'Attractiveness bias can cause patients to trust attractive practitioners more regardless of competence',
        consequence:
          'Users may choose less qualified providers or dismiss warnings from less photogenic sources',
        alternative:
          'Emphasize credentials, outcomes data, and verified qualifications rather than photos',
      },
      {
        title: 'Reinforcing Harmful Beauty Standards',
        reason:
          'Using only conventionally attractive models or imagery excludes and marginalizes users who do not match those standards',
        consequence:
          'Alienated user segments, negative brand perception, reinforcement of societal harm',
        alternative:
          'Use diverse, authentic representation that reflects your actual user base',
      },
      {
        title: 'Substituting Substance for Style',
        reason:
          'Over-polished visuals can mask poor functionality, misleading users into trusting a broken product',
        consequence:
          'Users discover the gap between appearance and quality, leading to trust collapse and churn',
        alternative:
          'Ensure visual polish is backed by genuine product quality and usability',
      },
    ],

    commonMistakes: [
      {
        title: 'Stock Photo Syndrome',
        description:
          'Using generic, overly polished stock photos of models instead of real team members or customers',
        why: 'Users increasingly recognize and distrust stock photography; it signals inauthenticity',
        fix: 'Use real photos of real people. If stock photos are necessary, choose natural, diverse, and contextually appropriate imagery',
      },
      {
        title: 'Homogeneous Beauty Standards',
        description:
          'Only featuring people who match narrow, culturally specific beauty ideals',
        why: 'Excludes most of your user base and signals that the product is not for them',
        fix: 'Represent diverse ages, ethnicities, body types, and abilities. Authenticity builds broader trust than conventional attractiveness',
      },
      {
        title: 'Over-Designed Empty States',
        description:
          'Investing heavily in visual polish while neglecting usability, error handling, and core functionality',
        why: 'The aesthetic-usability effect creates initial trust, but users quickly discover when substance is missing',
        fix: 'Balance aesthetic investment with functional quality. Polish should reflect genuine care, not compensate for poor UX',
      },
      {
        title: 'Inconsistent Visual Quality',
        description:
          'Having beautifully designed marketing pages but rough, unpolished product interfaces',
        why: 'The contrast between polished marketing and rough product creates a trust gap — the initial halo reverses into disappointment',
        fix: 'Maintain consistent visual quality across marketing and product. Users expect the product to match the promise',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.HIGH,
        description:
          'Layout quality signals professionalism and competence, triggering attractiveness judgments about the organization',
        examples: [
          'Clean, well-structured layouts are perceived as more trustworthy',
          'Generous whitespace signals confidence and premium quality',
          'Aligned grids and consistent spacing communicate attention to detail',
          'Cluttered layouts are judged as less competent regardless of content quality',
        ],
      },
      typography: {
        level: ImpactLevel.HIGH,
        description:
          'Typography quality strongly influences perceived professionalism and credibility',
        examples: [
          'Well-chosen typefaces signal design competence and brand quality',
          'Consistent type hierarchy communicates organizational clarity',
          'Poor typography (Comic Sans in professional contexts) triggers negative judgments about competence',
          'Refined letter-spacing and line-height signal care and attention to detail',
        ],
      },
      color: {
        level: ImpactLevel.HIGH,
        description:
          'Color sophistication and harmony influence perceived quality and trustworthiness',
        examples: [
          'Harmonious color palettes signal design competence',
          'Clashing or garish colors trigger negative quality judgments',
          'Muted, sophisticated palettes are associated with premium products',
          'Consistent color usage across interface builds perception of reliability',
        ],
      },
      interaction: {
        level: ImpactLevel.MEDIUM,
        description:
          'Smooth, polished interactions create an impression of quality that extends to the entire product',
        examples: [
          'Smooth animations and transitions signal engineering quality',
          'Responsive, immediate feedback creates impressions of competence',
          'Janky or laggy interactions undermine visual trust signals',
          'Micro-interactions communicate care and attention to detail',
        ],
      },
      content: {
        level: ImpactLevel.CRITICAL,
        description:
          'Photo selection, avatar design, and visual content directly trigger attractiveness-based judgments',
        examples: [
          'Professional team photos increase perceived company competence',
          'Customer testimonial photos influence credibility of the quote',
          'Product screenshots quality affects perceived product quality',
          'Diverse, authentic imagery builds broader trust than model-perfect stock photos',
        ],
      },
      accessibility: {
        level: ImpactLevel.HIGH,
        description:
          'Accessibility quality itself signals care and competence — inclusive design triggers positive judgments about the organization',
        examples: [
          'Accessible interfaces signal that the organization cares about all users',
          'Alt text quality for photos affects how screen reader users perceive people and products',
          'High contrast and readable text serve both accessibility and aesthetic quality',
          'Focus states and keyboard navigation polish signal engineering competence',
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
        title: 'Professional Team Page with Diverse Representation',
        description:
          'Company about page featuring real team photos with consistent, professional styling and diverse representation',
        code: `<section class="team-grid">
  <h2>Meet Our Team</h2>
  <div class="members">
    <article class="member">
      <img src="team/maria.jpg" alt="Maria Chen, VP of Engineering"
           class="headshot" loading="lazy">
      <h3>Maria Chen</h3>
      <p class="role">VP of Engineering</p>
      <p class="bio">15 years building distributed systems at scale.
      Previously led infrastructure at Stripe.</p>
    </article>
    <article class="member">
      <img src="team/james.jpg" alt="James Okafor, Head of Design"
           class="headshot" loading="lazy">
      <h3>James Okafor</h3>
      <p class="role">Head of Design</p>
      <p class="bio">Former design lead at Figma. Passionate about
      accessible, inclusive design systems.</p>
    </article>
    <article class="member">
      <img src="team/priya.jpg" alt="Priya Sharma, CTO"
           class="headshot" loading="lazy">
      <h3>Priya Sharma</h3>
      <p class="role">CTO</p>
      <p class="bio">PhD in Machine Learning. Built AI systems
      processing 10B+ daily events.</p>
    </article>
  </div>
</section>

<style>
.headshot {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  object-fit: cover;
  filter: none; /* No artificial filters */
}
</style>`,
        explanation:
          'Real team photos with consistent professional styling build trust and credibility. Diverse representation signals inclusivity. Pairing photos with concrete credentials ensures attractiveness works alongside substance.',
        principle:
          'Professional photography combined with substantive credentials creates credibility through both appearance and evidence',
        metrics: {
          before: 'Contact form submissions: 2.1% conversion with stock photos',
          after: 'Contact form submissions: 4.7% conversion with real team photos',
          improvement: '124% increase in lead conversion with authentic team photography',
        },
      },
      {
        title: 'Polished UI Signaling Product Quality',
        description:
          'SaaS dashboard with refined visual design that signals engineering and design competence',
        code: `<div class="dashboard">
  <header class="dash-header">
    <h1>Analytics Overview</h1>
    <p class="subtitle">Last 30 days</p>
  </header>

  <div class="metrics-row">
    <div class="metric-card">
      <span class="metric-label">Revenue</span>
      <span class="metric-value">$142,389</span>
      <span class="metric-delta positive">+12.4%</span>
    </div>
    <div class="metric-card">
      <span class="metric-label">Active Users</span>
      <span class="metric-value">8,291</span>
      <span class="metric-delta positive">+5.2%</span>
    </div>
  </div>
</div>

<style>
.dashboard {
  font-family: var(--cg-font-sans);
  background: var(--cg-surface-primary);
  border-radius: var(--cg-radius-lg);
  padding: var(--cg-space-6);
}
.metric-card {
  background: var(--cg-surface-secondary);
  border-radius: var(--cg-radius-md);
  padding: var(--cg-space-4);
  box-shadow: var(--cg-shadow-sm);
  transition: box-shadow 0.2s ease;
}
.metric-card:hover {
  box-shadow: var(--cg-shadow-md);
}
</style>`,
        explanation:
          'Refined spacing, consistent tokens, subtle shadows, and smooth transitions create an impression of competence and care. Users unconsciously judge the product as more reliable because it looks well-crafted.',
        principle:
          'Visual polish triggers the aesthetic-usability effect — users perceive attractive interfaces as more functional and trustworthy',
      },
      {
        title: 'Testimonials with Authentic Photography',
        description:
          'Customer testimonials using real customer photos rather than stock imagery',
        code: `<section class="testimonials">
  <h2>What Our Customers Say</h2>

  <blockquote class="testimonial">
    <div class="quote-content">
      <p>"This tool cut our reporting time from 3 days to 20 minutes.
      Our CFO couldn't believe the quarterly reports were ready
      on the first day of the month."</p>
    </div>
    <footer class="attribution">
      <img src="customers/diana-real.jpg"
           alt="Diana Reeves, Finance Director at Meridian Health"
           class="customer-photo">
      <div class="customer-info">
        <cite>Diana Reeves</cite>
        <span class="title">Finance Director, Meridian Health</span>
        <span class="verified">Verified Customer</span>
      </div>
    </footer>
  </blockquote>
</section>`,
        explanation:
          'A real customer photo paired with specific, verifiable details (name, title, company) creates compound credibility. The photo makes the testimonial feel human and trustworthy, while the concrete details provide substance.',
        principle:
          'Authentic photos amplify testimonial credibility through the attractiveness halo, but substance prevents it from being hollow',
      },
    ],

    bad: [
      {
        title: 'Generic Stock Photo Trust Signals',
        description:
          'Using obviously fake stock photos to create false impressions of team quality',
        code: `<!-- DON'T DO THIS -->
<section class="team">
  <h2>Our World-Class Team</h2>
  <div class="member">
    <img src="stock/smiling-businessman-123.jpg"
         alt="Team member">
    <h3>John Smith</h3>
    <p>Senior Developer</p>
  </div>
  <div class="member">
    <img src="stock/professional-woman-456.jpg"
         alt="Team member">
    <h3>Jane Doe</h3>
    <p>Head of Design</p>
  </div>
</section>`,
        explanation:
          'Users recognize stock photos and generic names immediately. This destroys trust rather than building it. The gap between the polished imagery and obvious inauthenticity triggers skepticism about the entire company.',
        principle:
          'Fake attractiveness signals backfire — inauthenticity is worse than no photos at all',
      },
      {
        title: 'Homogeneous Model Selection',
        description:
          'Using only conventionally attractive models of a single demographic',
        code: `<!-- DON'T DO THIS -->
<section class="hero">
  <img src="models/young-attractive-white-woman.jpg"
       alt="Happy customer" class="hero-image">
  <h1>Built for Everyone</h1>
  <p>The platform trusted by thousands worldwide</p>
</section>

<section class="testimonials">
  <img src="models/young-attractive-man-1.jpg" alt="User">
  <img src="models/young-attractive-woman-2.jpg" alt="User">
  <img src="models/young-attractive-man-3.jpg" alt="User">
</section>`,
        explanation:
          'Claiming "built for everyone" while showing only young, conventionally attractive people from one demographic contradicts the message. Users who do not see themselves represented feel excluded, undermining both trust and conversion.',
        principle:
          'Narrow beauty standards in imagery contradict inclusive messaging and alienate most of your audience',
      },
      {
        title: 'Style Over Substance — Polished but Broken',
        description:
          'Investing in visual polish while neglecting core functionality',
        code: `<!-- DON'T DO THIS -->
<div class="beautiful-form">
  <h2 style="font-family: 'Playfair Display'; letter-spacing: 2px;">
    Create Your Account
  </h2>
  <input type="email" placeholder="Email"
         style="border: none; border-bottom: 1px solid #ccc;
                font-size: 1.2rem; padding: 16px 0;">
  <!-- No validation, no error states, no loading state,
       no password requirements shown, no accessibility labels -->
  <input type="password" placeholder="Password">
  <button style="background: linear-gradient(135deg, #667eea, #764ba2);
                 border: none; color: white; padding: 16px 48px;
                 border-radius: 30px; font-size: 1.1rem;">
    Get Started
  </button>
</div>`,
        explanation:
          'The form looks beautiful but lacks validation, error handling, accessibility labels, and loading states. Users will be initially impressed but quickly frustrated. The attractiveness halo collapses when the product fails to deliver.',
        principle:
          'Visual attractiveness without functional substance creates a trust deficit that is harder to recover from than a plain-but-functional design',
      },
    ],

    realWorld: [
      {
        company: 'LinkedIn',
        product: 'Profile Photos and Hiring',
        description: 'LinkedIn profiles with professional headshots receive significantly more views and connection requests. Studies show profile photo quality influences hiring decisions, with professionally photographed candidates receiving more interview callbacks regardless of qualification differences.',
        effectiveness: 'very-effective',
        analysis: 'LinkedIn leverages the attractiveness stereotype by encouraging professional photos and offering premium features like professional headshot guidance. This benefits users who invest in professional photography while creating a bias against those who cannot.',
      },
      {
        company: 'Tinder / Hinge',
        product: 'Dating App Photo Design',
        description: 'Dating apps have evolved their photo systems to maximize attractiveness signals — smart photo ordering, photo prompts, and algorithmic photo selection all optimize for attractiveness-driven first impressions that determine swipe behavior.',
        effectiveness: 'very-effective',
        analysis: 'Dating apps explicitly design around the attractiveness stereotype. Smart Photo features reorder images to lead with the most attractive photo. This maximizes engagement but reinforces appearance-first evaluation patterns.',
      },
      {
        company: 'Glossier',
        product: 'E-commerce Model Selection',
        description: 'Glossier pioneered using real customers of diverse backgrounds as models instead of professional models. Their approach combines authentic, relatable imagery with high production quality, creating trust through representation rather than conventional attractiveness.',
        effectiveness: 'effective',
        analysis: 'By redefining "attractiveness" to include authenticity and diversity, Glossier created stronger brand trust. Users saw themselves in the imagery, which increased both emotional connection and conversion rates compared to competitors using traditional model selection.',
      },
      {
        company: 'Apple',
        product: 'Product Design and Packaging',
        description: 'Apple extends the attractiveness stereotype to products themselves. The extreme visual polish of hardware, software, packaging, and retail environments creates a halo effect where users perceive Apple products as more reliable, intuitive, and valuable.',
        effectiveness: 'very-effective',
        analysis: 'Apple demonstrates the aesthetic-usability effect at scale. Users rate Apple products as easier to use than functionally equivalent alternatives, partly because the visual refinement creates a competence halo that extends to perceived usability.',
      },
    ],

    abTests: [
      {
        title: 'Real Team Photos vs Stock Photos on About Page',
        hypothesis:
          'Real team photos will increase trust and lead conversion compared to stock photography',
        controlVersion: {
          description:
            'About page with polished stock photos of diverse professionals and generic team descriptions',
          metrics: {
            conversionRate: '2.1%',
            timeOnPage: '0:45',
            scrollDepth: '35%',
          },
        },
        treatmentVersion: {
          description:
            'About page with real team photos (professionally shot but authentic), individual bios with credentials, and real names',
          metrics: {
            conversionRate: '4.7%',
            timeOnPage: '2:10',
            scrollDepth: '72%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Real photos more than doubled conversion rates. Users spent 3x longer on the page and scrolled significantly deeper. Post-survey data showed users rated the company as "more trustworthy" and "more transparent" in the real photo condition.',
          learnings: [
            'Authentic photos build more trust than polished stock imagery',
            'Users can detect stock photos and it reduces credibility',
            'Professional quality matters, but authenticity matters more',
            'Pairing real photos with substantive credentials compounds the trust effect',
          ],
        },
      },
      {
        title: 'Visual Polish Level and Perceived Product Quality',
        hypothesis:
          'Higher visual polish will increase perceived product quality and trial sign-ups',
        controlVersion: {
          description:
            'Functional landing page with basic styling, system fonts, minimal whitespace, and no visual refinement',
          metrics: {
            conversionRate: '3.4%',
            perceivedQuality: '5.8/10',
            trustRating: '5.2/10',
          },
        },
        treatmentVersion: {
          description:
            'Same content and functionality but with refined typography, generous whitespace, subtle shadows, smooth animations, and cohesive color palette',
          metrics: {
            conversionRate: '5.9%',
            perceivedQuality: '8.1/10',
            trustRating: '7.9/10',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Identical content with higher visual polish increased conversions by 74%. Perceived quality jumped by 40% and trust ratings by 52%. Users in the polished condition also reported higher confidence in the product\'s security.',
          learnings: [
            'Visual polish directly affects perceived product quality even with identical functionality',
            'The aesthetic-usability effect extends to trust and security perceptions',
            'Investment in visual refinement has measurable ROI in conversion',
            'The effect is strongest for first-time visitors who have no prior experience with the product',
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
        name: 'Photo Selection Patterns',
        description:
          'Team photos, testimonial images, or hero imagery that favor conventionally attractive individuals',
        howToSpot:
          'Look for whether photo subjects represent narrow demographics or diverse user populations',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Visual Polish Disparity',
        description:
          'Significant quality gap between marketing visuals and actual product interface',
        howToSpot:
          'Compare landing page / marketing design quality against in-product experience',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Stock Photo Usage',
        description:
          'Generic, obviously staged photos of models in artificial poses',
        howToSpot:
          'Look for watermark artifacts, unnaturally perfect lighting, or recognizable stock photo subjects',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Aesthetic-Usability Mismatch',
        description:
          'Beautiful interface that is actually difficult to use or lacks core functionality',
        howToSpot:
          'Test whether the interface delivers on the quality its appearance promises',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Avatar and Profile Design Bias',
        description:
          'Default avatars or profile systems that favor certain appearances',
        howToSpot:
          'Check whether default avatars are inclusive and whether profile systems advantage photogenic users',
        severity: ImpactLevel.MEDIUM,
      },
    ],

    patterns: [
      {
        name: 'Beauty Premium Pattern',
        description: 'Design elements that grant higher visibility or credibility to attractive individuals',
        indicators: [
          'Profile photos prominently displayed in evaluation contexts',
          'Testimonial credibility linked to photo attractiveness',
          'Team pages emphasizing visual appeal over credentials',
          'Influencer marketing relying on appearance over expertise',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Aesthetic Trust Pattern',
        description: 'Visual polish used as a proxy for product quality and trustworthiness',
        indicators: [
          'Highly refined landing pages with minimal product substance',
          'Premium visual branding that exceeds product maturity',
          'Beautiful empty states with unfinished features behind them',
          'Disproportionate design investment in first impressions vs core flows',
        ],
        severity: ImpactLevel.MEDIUM,
        confidence: 'high',
      },
      {
        name: 'Representation Bias Pattern',
        description: 'Visual content that represents only narrow demographics or beauty standards',
        indicators: [
          'All imagery features young, conventionally attractive individuals',
          'No representation of older adults, disabled users, or diverse body types',
          'Photo style emphasizes appearance over context or expertise',
          'User-generated content systems that algorithmically favor attractive users',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
    ],

    checklistQuestions: [
      'Do team and testimonial photos represent the diversity of your actual user base?',
      'Are you using real photos or stock photography?',
      'Does visual polish accurately reflect product quality, or does it overstate it?',
      'Would users from underrepresented groups see themselves reflected in your imagery?',
      'Are profile systems designed to avoid bias based on photo attractiveness?',
      'Is the design quality consistent across marketing and product interfaces?',
      'Do you rely on visual attractiveness to substitute for substantive trust signals (credentials, data, reviews)?',
      'Have you tested how users with different demographics respond to your imagery choices?',
      'Are avatar and profile designs inclusive of diverse appearances?',
      'Does your photo selection reinforce or challenge narrow beauty standards?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in the Physical Attractiveness Stereotype and the aesthetic-usability effect.

Analyze the provided design for attractiveness bias patterns. Identify:

1. **Photo and Imagery Selection**: Who is represented, how, and whether it reflects narrow beauty standards or diverse populations
2. **Visual Polish Level**: Whether aesthetic quality accurately reflects product quality or creates misleading trust signals
3. **Aesthetic-Usability Effect**: Whether visual refinement is being used to mask poor functionality
4. **Avatar and Profile Design**: Whether profile systems create bias based on photo attractiveness
5. **Representation and Inclusivity**: Whether imagery excludes or marginalizes user groups

For each pattern found:
- Identify the specific attractiveness-based judgment it triggers
- Assess whether it accurately represents quality or creates false impressions
- Evaluate inclusivity and representation
- Determine ethical implications
- Suggest improvements for authentic, inclusive visual design

Consider:
- Is visual polish backed by genuine product quality?
- Does imagery represent the actual user base?
- Are trust signals based on substance or appearance alone?
- Could the design reinforce harmful beauty standards?
- Are there accessibility implications?

Provide actionable recommendations for ethical, inclusive use of visual design.`,

    outputSchema: {
      type: 'object',
      properties: {
        attractivenessPatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              biasTriggered: { type: 'string' },
              representationAssessment: { type: 'string' },
              authenticityLevel: { type: 'string' },
              ethical: { type: 'boolean' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'biasTriggered',
              'authenticityLevel',
              'ethical',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            visualPolishScore: { type: 'number' },
            representationScore: { type: 'number' },
            authenticityScore: { type: 'number' },
            ethicalScore: { type: 'number' },
          },
          required: [
            'visualPolishScore',
            'representationScore',
            'authenticityScore',
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
        'attractivenessPatterns',
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
        title: 'Audit Current Imagery',
        description:
          'Review all photos, avatars, and visual representations of people across your product and marketing',
        example:
          'Catalog every photo on marketing site: 80% young white professionals, 0% disabled users, 0% over-50 users',
        tips: [
          'Create a spreadsheet of all human imagery with demographic attributes',
          'Compare representation to your actual user demographics',
          'Flag stock photos that could be replaced with authentic imagery',
        ],
      },
      {
        step: 2,
        title: 'Invest in Authentic Photography',
        description:
          'Replace stock photos with real team members, real customers, and authentic imagery',
        example:
          'Schedule professional photo shoots with real team and willing customers; maintain consistent quality',
        tips: [
          'Professional quality matters — invest in good lighting and composition',
          'Let subjects look natural, not overly posed or filtered',
          'Get proper model releases and permission',
        ],
      },
      {
        step: 3,
        title: 'Ensure Visual Polish Matches Substance',
        description:
          'Align visual refinement with actual product quality so the attractiveness halo is earned',
        example:
          'If marketing page is beautifully designed, the product dashboard should be equally refined',
        tips: [
          'Conduct side-by-side quality comparisons of marketing vs product',
          'Ensure core functionality works before investing in animation and polish',
          'Visual quality should reflect genuine engineering and design care',
        ],
      },
      {
        step: 4,
        title: 'Design Inclusive Representation',
        description:
          'Ensure imagery represents diverse demographics, abilities, and appearances',
        example:
          'Update hero images to rotate through diverse subjects; ensure testimonial photos reflect user diversity',
        tips: [
          'Represent your actual user base, not an idealized version',
          'Include older adults, people with disabilities, diverse ethnicities',
          'Avoid tokenism — diversity should feel natural, not performative',
        ],
      },
      {
        step: 5,
        title: 'Test and Measure',
        description:
          'Validate that visual design choices build genuine trust across diverse user segments',
        example:
          'A/B test stock vs real photos; survey diverse user groups on perceived trustworthiness',
        tips: [
          'Segment test results by user demographics',
          'Measure both conversion and trust/satisfaction metrics',
          'Watch for segments where current imagery performs poorly',
        ],
      },
    ],

    dos: [
      'Use real photos of real team members and customers with their permission',
      'Invest in professional photography that is authentic, not artificially glamorous',
      'Represent the diversity of your actual user base in imagery',
      'Ensure visual polish is backed by genuine product quality',
      'Pair photos with substantive credentials and evidence',
      'Maintain consistent visual quality across marketing and product',
      'Design avatar systems that are inclusive and do not privilege attractiveness',
      'Use the aesthetic-usability effect ethically to build genuine trust',
    ],

    donts: [
      'Don\'t use obviously generic stock photos for team or testimonial pages',
      'Don\'t feature only conventionally attractive, young, able-bodied people',
      'Don\'t over-polish marketing to mask poor product quality',
      'Don\'t rely on photos alone for trust — always pair with substantive evidence',
      'Don\'t use attractiveness as a proxy for competence in evaluation contexts',
      'Don\'t apply heavy filters or retouching that creates unrealistic representations',
      'Don\'t assume one demographic\'s beauty standards are universal',
      'Don\'t create profile or rating systems that algorithmically reward attractiveness',
    ],

    bestPractices: [
      {
        title: 'Authenticity Over Perfection',
        description:
          'Prioritize genuine, authentic imagery over artificially polished or stock photography',
        rationale:
          'Users increasingly value authenticity. Real photos build deeper trust than model-perfect stock imagery, even if they are less "polished"',
        example:
          'Use professionally shot but natural team photos instead of glamour shots or stock images',
      },
      {
        title: 'Substance Behind Style',
        description:
          'Ensure every visual polish investment is matched by genuine quality in functionality and content',
        rationale:
          'The attractiveness halo creates expectations. Failing to meet those expectations creates a trust deficit worse than if the polish were never there',
        example:
          'Before polishing the landing page, ensure the product\'s core flow is solid, error states are handled, and performance is good',
      },
      {
        title: 'Diverse Representation',
        description:
          'Reflect your actual user base in all human imagery across the product',
        rationale:
          'Users trust products where they see people like themselves. Narrow representation actively excludes potential users',
        example:
          'Conduct a representation audit quarterly. Ensure imagery includes diverse ages, ethnicities, abilities, and body types',
      },
      {
        title: 'Consistent Quality Across Touchpoints',
        description:
          'Maintain the same level of visual refinement from marketing through onboarding, product, and support',
        rationale:
          'A quality drop between marketing and product creates a jarring trust gap that the initial halo cannot recover from',
        example:
          'Use the same design system, tokens, and quality standards for marketing site, product app, and documentation',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '1.1.1',
        guideline:
          'Non-text Content — All images of people must have meaningful alt text',
        implementation:
          'Write alt text that describes the person\'s role and context, not their appearance. "Maria Chen, VP of Engineering" rather than "smiling woman in blue shirt"',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.4.3',
        guideline:
          'Contrast — Visual polish must not sacrifice readability',
        implementation:
          'Ensure that refined typography, subtle colors, and sophisticated palettes still meet 4.5:1 contrast ratios. Aesthetic quality and accessibility are not trade-offs',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships — Credibility signals must be available to all users, not just visual ones',
        implementation:
          'Ensure credentials, titles, and trust indicators are in semantic HTML, not just visually styled photo captions',
      },
    ],

    ethics: [
      {
        concern: 'Reinforcing Beauty Standards',
        severity: 'high',
        explanation:
          'Using only conventionally attractive imagery reinforces narrow beauty standards and marginalizes users who do not match them',
        mitigation:
          'Represent diverse appearances authentically. Choose imagery based on relevance and representation, not conventional attractiveness alone.',
      },
      {
        concern: 'Appearance-Based Discrimination',
        severity: 'critical',
        explanation:
          'In hiring, evaluation, or community platforms, attractiveness bias can lead to discrimination against equally qualified individuals',
        mitigation:
          'Design systems that minimize photo influence in evaluation contexts. Use blind review, structured rubrics, and skill-based assessments.',
      },
      {
        concern: 'False Trust Signals',
        severity: 'high',
        explanation:
          'High visual polish can create trust where substance is lacking, misleading users into purchasing or sharing data with unreliable products',
        mitigation:
          'Ensure visual quality honestly reflects product quality. Pair aesthetic polish with genuine security, reliability, and user-centered design.',
      },
      {
        concern: 'Algorithmic Amplification of Beauty Bias',
        severity: 'high',
        explanation:
          'Social and content platforms can algorithmically reward attractive users with more visibility, amplifying real-world appearance-based inequality',
        mitigation:
          'Audit recommendation algorithms for appearance bias. Design systems that surface content based on quality and relevance, not user attractiveness.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'What Is Beautiful Is Good',
        author: 'Dion, K., Berscheid, E., & Walster, E.',
        year: 1972,
        doi: '10.1037/h0033731',
        description:
          'The foundational paper establishing that attractive individuals are assumed to possess more socially desirable personality traits and expected to lead better lives',
        type: 'foundational',
      },
      {
        title: 'What Is Beautiful Is Good, But...: A Meta-Analytic Review of Research on the Physical Attractiveness Stereotype',
        author: 'Eagly, A. H., Ashmore, R. D., Makhijani, M. G., & Longo, L. C.',
        year: 1991,
        doi: '10.1037/0033-2909.110.1.109',
        description:
          'Comprehensive meta-analysis confirming the attractiveness stereotype while identifying its boundaries and moderators — the effect is strong for social competence but weak for integrity and concern for others',
        type: 'foundational',
      },
      {
        title: 'Attractive Faces Are Not All Created Equal: Joint Effects of Facial Attractiveness and Social Category on Evaluation',
        author: 'Carpinella, C. M., & Johnson, K. L.',
        year: 2016,
        description:
          'Examines how the attractiveness stereotype interacts with social category membership (race, gender), showing the bias does not operate uniformly across all groups',
        type: 'advanced',
      },
    ],

    books: [
      {
        title: 'Beauty Pays: Why Attractive People Are More Successful',
        author: 'Hamermesh, Daniel S.',
        year: 2011,
        isbn: '9780691158174',
        description:
          'Economic analysis of the "beauty premium" — how attractiveness affects earnings, hiring, and career outcomes across industries',
        type: 'practical',
      },
      {
        title: 'Survival of the Prettiest: The Science of Beauty',
        author: 'Etcoff, Nancy',
        year: 1999,
        isbn: '9780385479424',
        description:
          'Exploration of the evolutionary and psychological origins of beauty perception and the attractiveness stereotype',
        type: 'foundational',
      },
    ],

    articles: [
      {
        title: 'Aesthetic-Usability Effect',
        author: 'Nielsen Norman Group',
        url: 'https://www.nngroup.com/articles/aesthetic-usability-effect/',
        description:
          'Practical guide to how visual attractiveness in interfaces affects perceived usability and user trust — the design-side manifestation of the physical attractiveness stereotype',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'The Halo Effect: How Beauty Shapes Our Perception',
        author: 'Psych2Go',
        url: 'https://www.youtube.com/watch?v=pYCSMZzHI0M',
        description:
          'Accessible explanation of the attractiveness halo effect with real-world examples',
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
      'halo-effect', // Attractiveness stereotype is a specific instance of the halo effect
      'social-proof', // Attractive spokespeople amplify social proof credibility
      'authority-bias', // Visual polish signals authority and competence
      'aesthetic-usability-effect', // Design-side manifestation of the same underlying bias
    ],

    conflicts: [
      'mere-exposure-effect', // Familiarity can override initial attractiveness judgments
      'pratfall-effect', // Small imperfections can increase likability and trust
    ],

    confusedWith: [
      'halo-effect', // The attractiveness stereotype is a subset of the halo effect, but they are often conflated
      'aesthetic-usability-effect', // Related but distinct: one is about people, the other about interfaces
      'horn-effect', // The inverse — assuming unattractive people have negative qualities
    ],

    hierarchy: {
      parent: 'halo-effect',
      children: [
        'aesthetic-usability-effect',
        'beauty-premium',
      ],
    },
  },
};
