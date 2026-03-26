/**
 * AUTHORITY BIAS
 *
 * We trust authority figures even when they're wrong
 */


import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const authorityBias: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'authority-bias',
    name: 'Authority Bias',
    aliases: ['Authority Effect', 'Obedience Bias'],
    category: BiasCategory.SOCIAL,
    relatedCategories: [
      BiasCategory.DECISION_MAKING,
      BiasCategory.PERCEPTION,
      BiasCategory.MEMORY,
    ],
    tags: [
      'authority',
      'expertise',
      'trust',
      'credibility',
      'influence',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple: 'We trust authority figures even when they\'re wrong',

    detailed: `Authority bias is the tendency to attribute greater accuracy, credibility, and trustworthiness to the opinions and directives of authority figures, regardless of whether their expertise is relevant to the domain in question. People defer to perceived authorities—doctors, professors, celebrities, industry leaders—even when those figures lack specific knowledge about the subject at hand.

This bias is deeply rooted in social conditioning. From childhood, we learn to obey parents, teachers, and other authority figures. This heuristic is generally useful—experts usually do know more—but it becomes problematic when we fail to critically evaluate whether the authority's expertise actually applies to the specific claim being made.

In UX and product design, authority bias manifests through expert endorsements, professional certifications, institutional logos, influencer partnerships, and credential displays. When wielded ethically, it builds legitimate trust. When manufactured or misapplied, it manipulates users into false confidence.`,

    psychologyBasis: {
      discoveredBy: 'Stanley Milgram',
      year: 1963,
      theory: 'Obedience to Authority',
      mechanism: `The brain uses perceived authority as a cognitive shortcut for evaluating credibility and making decisions. This happens because:

1. **Social Learning**: From early childhood, obedience to authority is reinforced through rewards and punishments, creating deep automatic deference
2. **Cognitive Offloading**: Evaluating every claim independently is cognitively expensive; deferring to experts reduces mental effort
3. **Halo Effect**: Authority in one domain creates a "halo" that extends perceived competence to unrelated domains (e.g., a physicist endorsing a diet plan)
4. **Status Signaling**: Visible markers of authority (titles, uniforms, credentials) trigger automatic trust responses before content is even evaluated
5. **System Justification**: People are motivated to believe that authorities are legitimate and competent, reinforcing existing power structures

The mechanism is largely automatic—people respond to authority cues (white coats, titles, confident tone) before consciously evaluating the substance of what is being communicated.`,
    },

    realWorldExample: `In Milgram's famous 1963 obedience experiments, 65% of participants administered what they believed were lethal electric shocks to another person simply because an authority figure in a lab coat instructed them to continue. The presence of a perceived scientific authority overrode participants' own moral judgment and the screams of the "victim."

In everyday life, patients rarely question their doctor's prescription even when a second opinion might be warranted. Consumers buy products endorsed by celebrities who have no expertise in the product category. Investors follow the advice of financial pundits on television despite their poor track record of predictions.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `Authority bias profoundly affects how users evaluate credibility, trustworthiness, and quality in interfaces. Designers can leverage this to:

- Build trust through genuine expert endorsements and professional recommendations
- Increase conversion with relevant certification badges and trust marks
- Strengthen brand perception through institutional partnerships and logos
- Guide user decisions with authoritative content and expert reviews
- Reduce perceived risk through doctor-approved, engineer-tested, or professionally-certified labels`,

    whenToUse: [
      {
        title: 'Expert Endorsements',
        scenario:
          'When building trust for health, finance, or safety-critical products',
        example:
          'Display "Recommended by 4 out of 5 dentists" with named professionals and their credentials',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Trust Badges and Certifications',
        scenario: 'When users need assurance about security, quality, or compliance',
        example:
          'Show SOC 2, HIPAA, ISO 27001 certification badges prominently on checkout and signup pages',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Influencer and Expert Partnerships',
        scenario: 'When launching products that benefit from domain-expert credibility',
        example:
          'Feature a well-known developer advocate reviewing your API tool, with their real title and company',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Professional Review Sections',
        scenario: 'When users are evaluating complex or high-stakes purchases',
        example:
          'Include an "Expert Review" section with a named reviewer, credentials, and detailed analysis alongside user reviews',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Institutional Logo Bars',
        scenario: 'When building credibility for B2B or enterprise products',
        example:
          'Display "Trusted by" logos of well-known companies: Google, NASA, Stanford, etc.',
        impact: ImpactLevel.MEDIUM,
      },
      {
        title: 'Doctor/Professional-Approved Labels',
        scenario: 'When products relate to health, wellness, or specialized domains',
        example:
          'Show "Dermatologist Recommended" with the recommending doctor\'s name and practice',
        impact: ImpactLevel.CRITICAL,
      },
    ],

    whenToAvoid: [
      {
        title: 'Irrelevant Celebrity Endorsements',
        reason:
          'Using famous people whose expertise has nothing to do with your product domain',
        consequence:
          'Savvy users see through it, eroding trust; can trigger FTC scrutiny',
        alternative:
          'Use domain-relevant experts whose authority actually applies to the product',
      },
      {
        title: 'Manufactured or Fake Credentials',
        reason:
          'Displaying fake doctor endorsements, invented certifications, or misleading titles',
        consequence:
          'Legal liability, regulatory action, permanent brand damage when exposed',
        alternative:
          'Only display verifiable, genuine credentials and endorsements',
      },
      {
        title: 'Overriding User Autonomy',
        reason:
          'Using authority cues to pressure users into decisions they wouldn\'t otherwise make',
        consequence:
          'Regret, refunds, negative reviews, and erosion of long-term trust',
        alternative:
          'Present expert opinions as one input alongside user reviews, data, and the user\'s own judgment',
      },
      {
        title: 'High-Stakes Decisions Without Balanced Information',
        reason:
          'Relying solely on authority endorsements for medical, legal, or financial decisions',
        consequence:
          'Users may forgo independent research, leading to harmful outcomes',
        alternative:
          'Combine expert endorsements with clear data, multiple perspectives, and encouragement to seek personalized advice',
      },
    ],

    commonMistakes: [
      {
        title: 'Authority Without Relevance',
        description:
          'Using an authority figure whose expertise does not match the product domain',
        why: 'A famous actor endorsing a medical device lacks domain credibility; informed users will reject the endorsement',
        fix: 'Match the authority\'s actual expertise to your product category. A cardiologist for a heart monitor, not a pop star.',
      },
      {
        title: 'Credential Inflation',
        description:
          'Exaggerating titles, cherry-picking impressive-sounding but irrelevant qualifications',
        why: 'Users who investigate will find the mismatch, destroying trust entirely',
        fix: 'Present credentials accurately and only highlight qualifications relevant to the endorsement',
      },
      {
        title: 'Generic Authority Claims',
        description:
          'Using vague claims like "experts agree" or "doctors recommend" without specifics',
        why: 'Unnamed, unverifiable authority claims feel hollow and untrustworthy',
        fix: 'Name specific experts, cite specific studies, and provide verifiable credentials',
      },
      {
        title: 'Authority Overload',
        description:
          'Displaying so many badges, endorsements, and logos that none carry weight',
        why: 'When everything is endorsed by everyone, the signal is diluted to noise',
        fix: 'Curate 3-5 high-quality, highly relevant authority signals rather than plastering dozens',
      },
      {
        title: 'Ignoring Authority Decay',
        description:
          'Continuing to display endorsements from authorities who have become controversial or discredited',
        why: 'Negative association with a fallen authority transfers to your product',
        fix: 'Regularly audit endorsements and certifications for continued credibility and relevance',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.HIGH,
        description:
          'Layout determines where authority signals appear and how prominently they register',
        examples: [
          'Logo bars positioned above the fold establish immediate institutional trust',
          'Expert endorsement sections placed near CTAs reduce decision anxiety',
          'Certification badges in headers or footers provide persistent credibility',
          'Sidebar expert profiles alongside content add contextual authority',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Typography conveys authority through formality, hierarchy, and credential presentation',
        examples: [
          'Professional titles in bold or uppercase (Dr., Prof., CEO) signal authority immediately',
          'Quote blocks with attribution names and titles add weight to endorsements',
          'Serif fonts for expert content can signal tradition and gravitas',
          'Credential abbreviations (MD, PhD, CISSP) in consistent styling build credibility',
        ],
      },
      color: {
        level: ImpactLevel.MEDIUM,
        description:
          'Color reinforces perceptions of professionalism, trust, and institutional authority',
        examples: [
          'Navy blue and dark tones signal professionalism and institutional trust',
          'Gold or premium accents on certification badges convey prestige',
          'Consistent brand colors on partner logos reinforce legitimacy',
          'Medical blue or clinical white in health endorsements trigger professional association',
        ],
      },
      interaction: {
        level: ImpactLevel.HIGH,
        description:
          'Interactive authority elements let users verify and explore credentials, deepening trust',
        examples: [
          'Clickable certification badges that link to verification pages build verifiable trust',
          'Expandable expert bio sections allow users to assess qualifications',
          'Hover tooltips on credentials explaining what they mean educate and reassure',
          'Video testimonials from experts create stronger authority than text alone',
        ],
      },
      content: {
        level: ImpactLevel.CRITICAL,
        description:
          'Content is the primary vehicle for authority signals—who says what, with what credentials, and in what context',
        examples: [
          'Named expert quotes with photo, title, and institution are the strongest authority signal',
          '"As featured in" press mentions leverage media authority',
          'Case studies authored by recognized industry figures carry extra weight',
          'Research citations and peer-reviewed data leverage academic authority',
        ],
      },
      accessibility: {
        level: ImpactLevel.HIGH,
        description:
          'Authority signals must be perceivable by all users, including those using assistive technologies',
        examples: [
          'Logo images need descriptive alt text: "SOC 2 Type II Certified" not just "badge"',
          'Expert credentials should be in semantic HTML, not just visual styling',
          'Screen readers must convey the authority context that sighted users get from layout',
          'Certification verification links must be keyboard accessible',
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
        title: 'Named Expert Endorsement with Credentials',
        description:
          'Healthcare product featuring a specific doctor recommendation with verifiable credentials',
        code: `<section class="expert-endorsement">
  <h2>Recommended by Healthcare Professionals</h2>

  <article class="endorsement featured">
    <img src="dr-chen.jpg" alt="Dr. Sarah Chen, Board-Certified Dermatologist">
    <div class="expert-info">
      <h3>Dr. Sarah Chen, MD, FAAD</h3>
      <p class="credentials">Board-Certified Dermatologist, Stanford Medical</p>
      <p class="experience">18 years of clinical practice</p>
    </div>
    <blockquote>
      "I recommend this sunscreen to my patients because it uses
      zinc oxide at the clinically effective 15% concentration.
      The formulation matches what we see in peer-reviewed studies."
    </blockquote>
    <a href="/verify/dr-chen" class="verify-link">Verify credentials</a>
  </article>

  <aside class="stat-context">
    <p>Recommended by 4 out of 5 dermatologists surveyed (n=312)</p>
    <a href="/study-methodology">View study methodology</a>
  </aside>
</section>`,
        explanation:
          'Named expert with specific, verifiable credentials and relevant domain expertise. The recommendation cites specific product attributes (zinc oxide concentration) rather than vague praise. Study methodology is transparent and verifiable.',
        principle:
          'Authentic, domain-relevant authority with verifiable credentials builds legitimate trust',
        metrics: {
          before: '18% conversion with generic "doctor recommended" label',
          after: '31% conversion with named expert and verifiable credentials',
          improvement: '72% increase in conversion with authentic authority',
        },
      },
      {
        title: 'Professional Certification Badge Display',
        description:
          'SaaS product displaying relevant security certifications with verification links',
        code: `<section class="trust-badges">
  <h3>Enterprise Security You Can Verify</h3>
  <div class="certifications">
    <a href="https://verify.soc2.com/our-company" class="cert-badge">
      <img src="soc2-badge.svg" alt="SOC 2 Type II Certified">
      <span class="cert-name">SOC 2 Type II</span>
      <span class="cert-date">Audited Jan 2026</span>
    </a>
    <a href="https://verify.iso.org/our-company" class="cert-badge">
      <img src="iso27001.svg" alt="ISO 27001 Certified">
      <span class="cert-name">ISO 27001</span>
      <span class="cert-date">Certified through 2027</span>
    </a>
    <a href="/compliance/hipaa" class="cert-badge">
      <img src="hipaa-badge.svg" alt="HIPAA Compliant">
      <span class="cert-name">HIPAA Compliant</span>
      <span class="cert-date">Annual audit</span>
    </a>
  </div>
  <p class="audit-note">All certifications independently audited by Deloitte</p>
</section>`,
        explanation:
          'Each certification is clickable and links to a verification page. Dates show recency and ongoing compliance. The independent auditor is named, adding another layer of authority. This is institutional authority done right.',
        principle:
          'Verifiable institutional authority with transparency builds deep trust for enterprise buyers',
      },
      {
        title: 'Developer-Endorsed API Tool',
        description:
          'Developer tool featuring endorsements from recognized engineers at respected companies',
        code: `<section class="developer-endorsements">
  <h2>Trusted by Engineering Teams</h2>

  <div class="endorsement-grid">
    <article class="endorsement">
      <img src="avatars/jpark.jpg" alt="James Park">
      <h4>James Park</h4>
      <p class="role">Principal Engineer, Stripe</p>
      <blockquote>"Replaced 2,000 lines of custom retry logic with
      a single config file. Our P99 latency dropped 40%."</blockquote>
    </article>

    <article class="endorsement">
      <img src="avatars/amartin.jpg" alt="Ana Martin">
      <h4>Ana Martin</h4>
      <p class="role">Staff SRE, Datadog</p>
      <blockquote>"The observability hooks are exactly what we needed.
      Integrated with our existing Prometheus stack in an afternoon."</blockquote>
    </article>
  </div>

  <div class="logo-bar">
    <p>Used in production at</p>
    <img src="logos/stripe.svg" alt="Stripe">
    <img src="logos/datadog.svg" alt="Datadog">
    <img src="logos/cloudflare.svg" alt="Cloudflare">
    <img src="logos/vercel.svg" alt="Vercel">
  </div>
</section>`,
        explanation:
          'Domain-relevant authority: engineers at respected tech companies endorsing an engineering tool. Endorsements cite specific technical outcomes rather than vague praise. The logo bar reinforces institutional authority.',
        principle:
          'Peer authority from recognized practitioners in the same domain is the strongest form of endorsement',
      },
    ],

    bad: [
      {
        title: 'Fake Expert Endorsement',
        description:
          'Health supplement using a fabricated doctor with stock photo',
        code: `<!-- DON'T DO THIS -->
<div class="doctor-endorsement">
  <img src="stock-photo-doctor.jpg" alt="Doctor">
  <h3>Dr. James Wilson, MD</h3>
  <p>"This is the most effective supplement I've ever seen.
  I recommend it to ALL my patients!"</p>
  <p class="fine-print" style="font-size: 0.5em; color: #ccc;">
    *Dr. Wilson is a paid spokesperson. Claims not evaluated by FDA.
  </p>
</div>`,
        explanation:
          'Stock photo "doctor" with vague superlative claims and buried disclaimers. No verifiable credentials, no specific institution, no explanation of why the product works. This is manufactured authority that exploits trust.',
        principle:
          'Fabricated authority destroys trust when discovered and may violate FTC guidelines',
      },
      {
        title: 'Irrelevant Celebrity Endorsement',
        description:
          'Financial planning app endorsed by a reality TV star',
        code: `<!-- DON'T DO THIS -->
<section class="celebrity-endorsement">
  <img src="celebrity.jpg" alt="Famous Reality TV Star" class="hero-image">
  <h2>"I use MoneyPro for ALL my investing!" — @CelebInfluencer</h2>
  <p class="followers">47M followers trust their judgment</p>
  <button class="cta">Start Investing Like the Stars!</button>
</section>`,
        explanation:
          'A reality TV personality has no financial expertise. Their follower count is irrelevant to investment advice quality. This exploits parasocial relationships and fame rather than domain authority. Users who follow this "advice" may suffer financial harm.',
        principle:
          'Celebrity fame does not equal domain expertise; irrelevant endorsements mislead users',
      },
      {
        title: 'Misleading Credential Display',
        description:
          'Software product inflating team credentials to appear more authoritative',
        code: `<!-- DON'T DO THIS -->
<section class="team-credentials">
  <h2>Built by World-Class Experts</h2>
  <div class="expert">
    <h4>John Smith, PhD</h4>
    <p>Stanford University</p>
    <!-- PhD is in English Literature, not computer science -->
    <!-- "Stanford" was a 2-week online certificate -->
  </div>
  <div class="expert">
    <h4>Jane Doe, Former Google</h4>
    <!-- Was a 3-month intern, not an engineer -->
  </div>
  <div class="badges">
    <img src="stanford-logo.svg" alt="Stanford">
    <img src="google-logo.svg" alt="Google">
    <img src="mit-logo.svg" alt="MIT">
  </div>
</section>`,
        explanation:
          'Technically true but deeply misleading. A PhD in an unrelated field, a brief affiliation presented as institutional authority, and logo usage that implies partnerships that don\'t exist. When users discover the truth, trust is permanently destroyed.',
        principle:
          'Credential inflation is a form of deception that backfires when scrutinized',
      },
    ],

    realWorld: [
      {
        company: 'Stripe',
        product: 'Stripe Homepage',
        url: 'https://stripe.com',
        description:
          'Stripe features endorsements and case studies from recognized engineering leaders at companies like Amazon, Google, and Shopify. Their developer documentation is written with deep technical authority, and they prominently display logos of the world\'s largest companies as customers.',
        effectiveness: 'very-effective',
        analysis:
          'Stripe leverages peer authority (developers endorsing to developers) and institutional authority (Fortune 500 logos) in a way that feels natural rather than manufactured. The technical depth of their docs itself acts as an authority signal.',
      },
      {
        company: 'AWS',
        product: 'AWS Customer Stories',
        url: 'https://aws.amazon.com/solutions/case-studies/',
        description:
          'AWS displays enterprise customer logos prominently (Netflix, NASA, Goldman Sachs) and publishes detailed case studies with named CTOs and VPs describing their architecture decisions.',
        effectiveness: 'very-effective',
        analysis:
          'The combination of institutional logos (brand authority) with named executive endorsements (personal authority) and specific technical outcomes creates a multi-layered authority signal that is particularly effective for enterprise sales.',
      },
      {
        company: 'MasterClass',
        product: 'MasterClass Platform',
        url: 'https://www.masterclass.com',
        description:
          'MasterClass builds its entire product around celebrity authority: Gordon Ramsay teaches cooking, Martin Scorsese teaches filmmaking, Serena Williams teaches tennis. Each instructor\'s authority is directly relevant to their course topic.',
        effectiveness: 'very-effective',
        analysis:
          'This is authority bias done right—each instructor is a genuine world-class expert in the exact domain they teach. The authority is relevant, verifiable, and the instructors\' reputations are directly on the line.',
      },
      {
        company: 'WebMD',
        product: 'WebMD Health Articles',
        url: 'https://www.webmd.com',
        description:
          'WebMD displays "Medically Reviewed by [Doctor Name], MD" on every health article, with the reviewer\'s photo, credentials, specialty, and a link to their professional profile.',
        effectiveness: 'effective',
        analysis:
          'Named medical reviewers with verifiable credentials add legitimate authority to health content. The transparency about who reviewed the content and their qualifications helps users calibrate trust appropriately.',
      },
      {
        company: 'Oral-B',
        product: 'Oral-B Marketing',
        url: 'https://www.oral-b.com',
        description:
          'Oral-B has used the "#1 dentist-recommended brand" claim for decades, backed by surveys of dental professionals. The claim is specific, quantified, and directly relevant to the product domain.',
        effectiveness: 'very-effective',
        analysis:
          'The "dentist-recommended" framing is one of the most successful uses of authority bias in consumer products. The authority (dentist) is directly relevant to the product (toothbrush), the claim is specific and verifiable, and it has become an industry pattern.',
      },
    ],

    abTests: [
      {
        title: 'Expert Endorsement vs User Reviews Only',
        hypothesis:
          'Adding a named expert endorsement alongside user reviews will increase conversion for a health supplement',
        controlVersion: {
          description:
            'Product page with 4.5-star user reviews (2,300+ reviews) and no expert endorsement',
          metrics: {
            conversionRate: '5.2%',
            timeOnPage: '2:10',
            addToCartRate: '11%',
          },
        },
        treatmentVersion: {
          description:
            'Same product page with user reviews plus a named nutritionist endorsement (photo, credentials, specific recommendation)',
          metrics: {
            conversionRate: '8.1%',
            timeOnPage: '3:05',
            addToCartRate: '17%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Adding a single named expert endorsement increased conversions by 56% and add-to-cart by 55%. Users spent 43% more time on the page, primarily engaging with the expert section. Post-purchase surveys showed the expert endorsement was the #1 factor cited for purchase confidence.',
          learnings: [
            'Expert authority complements but does not replace social proof (user reviews)',
            'Named experts with photos outperformed anonymous "expert recommended" labels by 3x',
            'Domain-relevant credentials (nutritionist for supplements) were critical; a generic "PhD" endorsement showed only 12% lift',
            'Verifiable credentials link increased trust further for skeptical segments',
          ],
        },
      },
      {
        title: 'Generic Trust Badges vs Named Certification Details',
        hypothesis:
          'Showing detailed certification information will increase signup conversion for a B2B SaaS product',
        controlVersion: {
          description:
            'Signup page with small SOC 2 and ISO 27001 badge icons in the footer, no additional detail',
          metrics: {
            conversionRate: '14.2%',
            bounceRate: '42%',
          },
        },
        treatmentVersion: {
          description:
            'Signup page with certification badges near the CTA, each linked to verification, showing audit date and auditor name',
          metrics: {
            conversionRate: '19.8%',
            bounceRate: '31%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Moving certifications from footer to near-CTA placement and adding verifiable details increased signups by 39% and reduced bounce rate by 26%. Enterprise leads showed the strongest response (+52% conversion).',
          learnings: [
            'Placement of authority signals near decision points matters enormously',
            'Verifiable details (audit date, auditor name) increased credibility beyond badge display alone',
            'Enterprise buyers are significantly more responsive to institutional authority signals',
            'Too many badges (>5) diluted the effect; curating the most relevant 3 was optimal',
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
        name: 'Expert Quotes and Testimonials',
        description:
          'Quote blocks attributed to named professionals with titles, credentials, or institutional affiliations',
        howToSpot:
          'Look for blockquote elements with attribution lines containing "Dr.", "PhD", "CEO", professional titles, or company names',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Certification and Trust Badges',
        description:
          'Visual badges displaying certifications (SOC 2, ISO, HIPAA), awards, or compliance marks',
        howToSpot:
          'Look for badge/shield imagery, certification logos, or "certified by" / "compliant with" text near CTAs or in footers',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Authority Figure Imagery',
        description:
          'Photos of people in professional attire (lab coats, suits) or in professional settings (labs, offices)',
        howToSpot:
          'Look for headshots with professional clothing, stethoscopes, academic settings, or corporate environments',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Institutional Logo Bars',
        description:
          'Rows of company or institution logos with "Trusted by", "As seen on", or "Used by" labels',
        howToSpot:
          'Look for horizontal logo grids, typically in grayscale, with trust-related headings',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Credential Displays',
        description:
          'Professional titles, degrees, certifications, or years of experience displayed alongside content',
        howToSpot:
          'Look for abbreviations like MD, PhD, CISSP, CPA, or phrases like "Board Certified", "15 years experience"',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: '"As Featured In" Press Sections',
        description:
          'Media outlet logos (NYT, Forbes, TechCrunch) displayed as credibility indicators',
        howToSpot:
          'Look for media logos with "Featured in", "As seen on", or "Press" labels, typically in grayscale',
        severity: ImpactLevel.MEDIUM,
      },
    ],

    patterns: [
      {
        name: 'Expert Endorsement Pattern',
        description: 'Named authority figures providing product recommendations with their credentials',
        indicators: [
          'Professional headshot with name and title',
          'Quote or testimonial attributed to a credentialed individual',
          'Specific claims tied to the authority\'s domain expertise',
          '"Recommended by", "Approved by", or "Endorsed by" language',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Institutional Trust Pattern',
        description: 'Leveraging the reputation of known organizations to transfer trust',
        indicators: [
          'Company or university logos in a "trusted by" section',
          'Case studies featuring recognized brands',
          'Partnership announcements with established institutions',
          'Customer logos prominently displayed on homepage or pricing page',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Certification Authority Pattern',
        description: 'Displaying compliance, security, or quality certifications to signal trustworthiness',
        indicators: [
          'SOC 2, ISO, HIPAA, PCI-DSS badges',
          'Industry award logos or "Best of" badges',
          '"Independently audited" or "third-party verified" claims',
          'Compliance certification dates and auditor names',
        ],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Domain Expert Content Pattern',
        description: 'Content authored or reviewed by recognized experts to borrow their authority',
        indicators: [
          '"Medically reviewed by" or "Fact-checked by" labels',
          'Author bios with professional credentials',
          'Expert contributor sections on blogs or content platforms',
          'Research citations and peer-reviewed references',
        ],
        severity: ImpactLevel.MEDIUM,
        confidence: 'medium',
      },
    ],

    checklistQuestions: [
      'Are there expert endorsements? If so, is the expert\'s domain relevant to the product?',
      'Are professional credentials displayed? Are they verifiable?',
      'Are there trust badges or certifications? Do they link to verification?',
      'Is there an "as seen on" or "trusted by" logo section?',
      'Are authority figure images used (lab coats, professional settings)?',
      'Do expert quotes contain specific claims or just vague praise?',
      'Is the authority genuine or manufactured (stock photos, unnamed "experts")?',
      'Are endorsements appropriately disclosed as paid or organic?',
      'Could users verify the authority claims if they wanted to?',
      'Is the authority being applied to a domain where it\'s actually relevant?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in authority bias.

Analyze the provided design for authority bias patterns. Identify:

1. **Expert Endorsements**: Named professionals, their credentials, and domain relevance
2. **Institutional Authority**: Company logos, university affiliations, organizational partnerships
3. **Certification Signals**: Trust badges, compliance marks, audit certifications
4. **Credential Displays**: Professional titles, degrees, experience claims
5. **Media Authority**: "As seen on", press mentions, publication features

For each authority signal found:
- Identify the type and source of authority
- Assess whether the authority is relevant to the product domain
- Determine if the credentials are verifiable
- Evaluate whether the endorsement is genuine or manufactured
- Check for proper disclosure (paid endorsements, affiliations)
- Suggest improvements for ethical, effective use

Consider:
- Is the authority figure's expertise actually relevant to the claim?
- Are credentials verifiable or do they rely on stock photos and vague titles?
- Is there a healthy balance between authority signals and user autonomy?
- Are endorsements transparent about paid relationships?
- Could authority signals inadvertently exclude or mislead vulnerable users?

Provide actionable recommendations for authentic, ethical authority building.`,

    outputSchema: {
      type: 'object',
      properties: {
        authorityPatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              authoritySource: { type: 'string' },
              domainRelevance: { type: 'string' },
              verifiability: { type: 'string' },
              authenticity: { type: 'string' },
              ethical: { type: 'boolean' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'authoritySource',
              'domainRelevance',
              'ethical',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            authorityRelevance: { type: 'number' },
            credentialVerifiability: { type: 'number' },
            authenticityScore: { type: 'number' },
            ethicalScore: { type: 'number' },
          },
          required: [
            'authorityRelevance',
            'credentialVerifiability',
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
        'authorityPatterns',
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
        title: 'Identify Relevant Authority Sources',
        description:
          'Determine which types of authority are most credible and relevant for your product domain and audience',
        example:
          'For a health product: board-certified doctors. For developer tools: senior engineers at respected companies. For B2B: enterprise customer CTOs.',
        tips: [
          'Match authority type to your audience (developers trust developers, not celebrities)',
          'Domain relevance is non-negotiable—irrelevant authority backfires',
          'Consider multiple authority types: expert, institutional, peer, and media',
        ],
      },
      {
        step: 2,
        title: 'Secure Authentic Endorsements',
        description:
          'Obtain genuine endorsements from real experts who have actually used your product and can speak to specific benefits',
        example:
          'Send free product to board-certified dermatologists; ask for honest reviews with specific claims they\'re comfortable making',
        tips: [
          'Real experts will only endorse products they genuinely believe in',
          'Ask for specific claims rather than generic praise',
          'Ensure proper disclosure of any compensation or free product',
        ],
      },
      {
        step: 3,
        title: 'Display Authority with Full Transparency',
        description:
          'Present endorsements with complete, verifiable credentials and appropriate context',
        example:
          '"Dr. Sarah Chen, MD, FAAD — Board-Certified Dermatologist, Stanford Medical Center" with link to verify',
        tips: [
          'Always include full name, title, and institutional affiliation',
          'Add verification links where possible',
          'Disclose paid partnerships clearly and prominently',
        ],
      },
      {
        step: 4,
        title: 'Place Authority Signals Strategically',
        description:
          'Position authority cues near decision points where trust is most needed',
        example:
          'Place certification badges next to the signup CTA, not buried in the footer',
        tips: [
          'Authority signals near CTAs reduce decision anxiety',
          'Header placement establishes credibility before users evaluate content',
          'Don\'t cluster all authority in one section; distribute it along the user journey',
        ],
      },
      {
        step: 5,
        title: 'Balance Authority with User Autonomy',
        description:
          'Present expert opinions as one input, not the only input; respect the user\'s right to decide for themselves',
        example:
          'Show expert review alongside user reviews, ratings, comparison data, and objective specifications',
        tips: [
          'Authority should inform, not pressure',
          'Combine expert opinion with data and user reviews for balanced decision-making',
          'Encourage users to verify and research rather than blindly trust',
        ],
      },
      {
        step: 6,
        title: 'Audit and Refresh Authority Signals',
        description:
          'Regularly verify that endorsements remain current, credentials are still valid, and certifications are up to date',
        example:
          'Quarterly review: check that all expert endorsers still hold their positions, certifications haven\'t expired, and no authorities have been discredited',
        tips: [
          'Set calendar reminders for certification renewal dates',
          'Monitor news about endorsing experts for reputational issues',
          'Update testimonial quotes when products or features change significantly',
        ],
      },
    ],

    dos: [
      'Use domain-relevant experts whose authority directly applies to your product',
      'Display full, verifiable credentials (name, title, institution, verification link)',
      'Disclose paid endorsements and sponsorships transparently',
      'Place authority signals near decision points where trust matters most',
      'Combine expert authority with user reviews and objective data for balance',
      'Keep certifications current and link to independent verification',
      'Use real photos of real experts—never stock photos posing as authorities',
      'Match authority sources to your audience (developers for dev tools, doctors for health)',
      'Curate a focused set of high-quality endorsements rather than quantity-bombing',
      'Include specific, substantive claims in expert endorsements rather than vague praise',
    ],

    donts: [
      'Don\'t use stock photos of people in lab coats as "expert endorsements"',
      'Don\'t display irrelevant celebrity endorsements (actors endorsing financial products)',
      'Don\'t inflate credentials or use misleading title associations',
      'Don\'t use unnamed, unverifiable "experts" ("doctors agree", "studies show")',
      'Don\'t bury FTC-required disclosure of paid endorsements in fine print',
      'Don\'t display expired certifications or endorsements from discredited figures',
      'Don\'t use authority signals to override user autonomy on important decisions',
      'Don\'t imply institutional partnerships that don\'t exist through logo usage',
      'Don\'t overload pages with dozens of badges and logos—it dilutes the signal',
      'Don\'t use authority bias to manipulate vulnerable users (medical, financial distress)',
    ],

    bestPractices: [
      {
        title: 'Authentic Over Manufactured Authority',
        description:
          'Invest in earning genuine endorsements from real domain experts rather than manufacturing the appearance of authority',
        rationale:
          'Authentic authority survives scrutiny and builds compounding trust; manufactured authority collapses when exposed',
        example:
          'Send product to 50 dermatologists for honest review rather than hiring an actor in a lab coat',
      },
      {
        title: 'Domain Relevance Is Non-Negotiable',
        description:
          'Every authority signal must have clear, direct relevance to the product domain and the specific claims being made',
        rationale:
          'A PhD in physics adds no authority to a nutrition claim; informed users will reject irrelevant expertise',
        example:
          'For a cybersecurity product, feature endorsements from CISOs and security researchers, not generic "tech executives"',
      },
      {
        title: 'Make Authority Verifiable',
        description:
          'Link every credential, certification, and endorsement to a verification source that users can independently check',
        rationale:
          'Verifiability transforms authority from a persuasion tactic into a trust signal; it demonstrates confidence',
        example:
          'Certification badges link to the issuing body\'s verification page; expert profiles link to their LinkedIn or institutional page',
      },
      {
        title: 'Layer Multiple Authority Types',
        description:
          'Combine expert authority, institutional authority, and peer authority for a comprehensive trust architecture',
        rationale:
          'Different users respond to different authority types; layering covers more of your audience',
        example:
          'Named expert endorsement + enterprise customer logos + press mentions + user community testimonials',
      },
      {
        title: 'Disclose Relationships Prominently',
        description:
          'Clearly state when endorsements are paid, sponsored, or involve free product, and do so near the endorsement, not in fine print',
        rationale:
          'Transparent disclosure actually increases trust for honest brands; it\'s also legally required in most jurisdictions',
        example:
          '"Paid partnership" label directly below the expert endorsement, in readable font size',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '1.1.1',
        guideline:
          'Non-text Content — Certification badges and authority logos must have descriptive alt text',
        implementation:
          'Use descriptive alt text like "SOC 2 Type II Certified — audited January 2026" rather than "badge" or "logo". Ensure all trust signals are conveyed to screen reader users.',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships — Authority credentials must be conveyed through semantic markup, not just visual styling',
        implementation:
          'Use proper heading hierarchy for expert names, semantic markup for credentials and titles, and ARIA labels on certification badge links.',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.4.4',
        guideline:
          'Link Purpose — Certification verification links must have clear, descriptive link text',
        implementation:
          'Use "Verify our SOC 2 certification" rather than "Click here" or "Learn more". Ensure all verification links are keyboard accessible.',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.4.3',
        guideline:
          'Contrast — Credential text and badge labels must meet minimum contrast ratios',
        implementation:
          'Ensure professional titles, credential abbreviations, and badge text meet 4.5:1 contrast ratio. Grayscale logo bars must remain distinguishable.',
      },
    ],

    ethics: [
      {
        concern: 'Fabricated Authority',
        severity: 'critical',
        explanation:
          'Creating fake experts, using stock photos as "doctors", or inventing certifications that don\'t exist',
        mitigation:
          'Only display real people with real credentials who have genuinely endorsed your product. Verify all certifications are issued by legitimate bodies.',
      },
      {
        concern: 'Irrelevant Domain Expertise',
        severity: 'high',
        explanation:
          'Using an authority figure whose expertise is in a completely different domain than the product (e.g., actor endorsing medical device)',
        mitigation:
          'Ensure every endorser\'s expertise is directly relevant to the claims they make about your product. Disclose the scope of their expertise clearly.',
      },
      {
        concern: 'Hidden Paid Endorsements',
        severity: 'critical',
        explanation:
          'Failing to disclose that endorsements are paid or that experts received free product, violating FTC guidelines',
        mitigation:
          'Prominently disclose all material relationships. Follow FTC Endorsement Guides. Place disclosure near the endorsement, not in page footer.',
      },
      {
        concern: 'Credential Inflation',
        severity: 'high',
        explanation:
          'Exaggerating titles, misrepresenting affiliations, or using impressive-sounding but irrelevant qualifications',
        mitigation:
          'Present credentials accurately. Only highlight qualifications relevant to the endorsement. Provide verification links so users can confirm.',
      },
      {
        concern: 'Exploiting Authority for Harmful Products',
        severity: 'critical',
        explanation:
          'Using expert endorsements to sell products that could harm users (unproven health supplements, risky financial products)',
        mitigation:
          'Refuse to use authority signals for products with unsubstantiated claims. Ensure endorsed products are safe and beneficial. Include appropriate risk disclosures.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'Behavioral Study of Obedience',
        author: 'Milgram, S.',
        year: 1963,
        doi: '10.1037/h0040525',
        description:
          'The foundational experiment demonstrating the power of authority over individual judgment, where 65% of participants administered perceived lethal shocks when instructed by an authority figure',
        type: 'foundational',
      },
      {
        title: 'The Perils of Obedience',
        author: 'Milgram, S.',
        year: 1974,
        description:
          'Milgram\'s comprehensive account of his obedience experiments and their implications for understanding authority in society',
        type: 'foundational',
      },
      {
        title: 'Authority and Its Enemies',
        author: 'Kelman, H. C., & Hamilton, V. L.',
        year: 1989,
        description:
          'Research on how authority legitimacy and role obligations affect compliance behavior in organizations',
        type: 'advanced',
      },
    ],

    books: [
      {
        title: 'Obedience to Authority: An Experimental View',
        author: 'Milgram, Stanley',
        year: 1974,
        isbn: '9780061765216',
        description:
          'Milgram\'s own account of his obedience experiments, the foundational work on authority bias',
        type: 'foundational',
      },
      {
        title: 'Influence: The Psychology of Persuasion',
        author: 'Cialdini, Robert B.',
        year: 2006,
        isbn: '9780061241895',
        description:
          'Chapter on the Authority principle — one of Cialdini\'s six principles of persuasion. Covers how titles, clothing, and trappings of authority trigger automatic compliance',
        type: 'foundational',
      },
      {
        title: 'Pre-Suasion: A Revolutionary Way to Influence and Persuade',
        author: 'Cialdini, Robert B.',
        year: 2016,
        isbn: '9781501109805',
        description:
          'Extends Cialdini\'s authority research to "pre-suasion" — how establishing authority before the ask dramatically increases compliance',
        type: 'advanced',
      },
      {
        title: 'Thinking, Fast and Slow',
        author: 'Kahneman, Daniel',
        year: 2011,
        isbn: '9780374275631',
        description:
          'Covers how System 1 thinking leads to automatic deference to perceived authority without conscious evaluation',
        type: 'foundational',
      },
    ],

    articles: [
      {
        title: 'Authority Bias in UX Design',
        author: 'Nielsen Norman Group',
        url: 'https://www.nngroup.com/articles/authority-principle/',
        description:
          'Practical guide to leveraging authority signals in user interfaces while maintaining ethical standards',
        type: 'practical',
      },
      {
        title: 'The Role of Trust Signals in Web Design',
        author: 'Baymard Institute',
        url: 'https://baymard.com/blog/perceived-security-of-payment-page',
        description:
          'Research on how trust badges and certification displays affect checkout conversion rates',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'The Milgram Experiment (1962) Original Footage',
        author: 'Stanley Milgram',
        url: 'https://www.youtube.com/watch?v=xOYLCy5PVgM',
        description:
          'Original footage from Milgram\'s obedience experiment demonstrating authority bias in action',
        type: 'foundational',
      },
      {
        title: 'Robert Cialdini on the Authority Principle',
        author: 'Cialdini, Robert B.',
        url: 'https://www.youtube.com/watch?v=cFdCzN7RYbw',
        description:
          'Cialdini explains how authority operates as an automatic influence trigger in everyday decisions',
        type: 'practical',
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
