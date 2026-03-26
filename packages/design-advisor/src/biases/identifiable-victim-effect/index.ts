/**
 * IDENTIFIABLE VICTIM EFFECT
 *
 * We care more about specific identified victims than statistical ones
 */


import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const identifiableVictimEffect: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'identifiable-victim-effect',
    name: 'Identifiable Victim Effect',
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
    simple: 'We care more about specific identified victims than statistical ones',

    detailed: `The Identifiable Victim Effect describes the tendency for people to offer greater help and feel stronger emotions when a specific, identifiable individual is observed in need, compared to a large, vaguely defined group with the same need. A single named child with a photograph generates more donations than statistics about millions of children facing famine.

This bias operates at the intersection of emotion and decision-making. When we see "Rokia, age 7, from Mali" we feel empathy and urgency. When we read "3 million children face starvation in sub-Saharan Africa," the number is too abstract to trigger the same emotional response. The statistician cannot feel the pulse of a single life within a large number.

In product design, this effect is leveraged through individual testimonials, named case studies, personal narratives on landing pages, and human-centered error messages. Designers must balance the persuasive power of individual stories with the responsibility not to exploit individual suffering for commercial gain.`,

    psychologyBasis: {
      discoveredBy: 'Thomas Schelling',
      year: 1968,
      theory: 'Statistical Lives vs. Identified Lives',
      mechanism: `People respond more strongly to a specific, identifiable individual in need than to large anonymous groups. This happens because:

1. **Emotional Engagement**: A single identified person activates empathy circuits; large numbers trigger "psychic numbing" where emotions shut down
2. **Imagery and Concreteness**: A named person with a face is concrete and imaginable; statistics are abstract and hard to visualize
3. **Perceived Efficacy**: Helping one specific person feels achievable and meaningful; helping millions feels futile and overwhelming
4. **Singularity Effect**: As the number of victims increases, compassion per person decreases — empathy does not scale linearly with need
5. **Narrative Processing**: The brain processes individual stories through narrative empathy pathways, which are far more emotionally potent than analytical processing of numbers`,
    },

    realWorldExample: `In a classic experiment by Small & Loewenstein (2003), participants given $5 were asked to donate to a charity. One group read about "Rokia, a 7-year-old girl from Mali, desperately poor and facing starvation." Another group read statistical information: "Food shortages in Malawi are affecting more than 3 million children." The group shown Rokia's story donated significantly more. A third group that received both the story and the statistics donated less than the story-only group — the statistics actually dampened the emotional response to the individual child.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `The Identifiable Victim Effect profoundly impacts how users respond to narratives, testimonials, and calls to action in interfaces. Designers can leverage this to:

- Create compelling landing pages by leading with individual customer success stories rather than aggregate metrics
- Build trust through named, photographed testimonials with personal narratives
- Drive donations and support through individual case studies with specific names and circumstances
- Humanize error states and empty states with personal, empathetic messaging
- Increase conversion by making abstract product benefits concrete through one person's journey`,

    whenToUse: [
      {
        title: 'Customer Testimonials and Case Studies',
        scenario:
          'When building trust and demonstrating product value on landing pages',
        example:
          'Feature "Maria, a freelance designer who saved 12 hours per week" with her photo and story, rather than "Our users save an average of 10 hours per week"',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Charity and Fundraising Campaigns',
        scenario: 'When soliciting donations or support for a cause',
        example:
          'Show "Help Aiden, age 9, get the surgery he needs" with a photo and backstory, alongside an option to donate',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Onboarding and Welcome Flows',
        scenario: 'When introducing new users to the product and its value',
        example:
          'Walk users through one specific person\'s journey: "See how James set up his dashboard in 5 minutes and landed his first client"',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Error Messages and Empty States',
        scenario: 'When users encounter errors, empty states, or dead ends',
        example:
          'Instead of "No results found," show "We couldn\'t find what you\'re looking for. Sarah from our support team can help — here\'s how to reach her"',
        impact: ImpactLevel.MEDIUM,
      },
      {
        title: 'Product Storytelling on Landing Pages',
        scenario: 'When converting visitors into users through narrative',
        example:
          'Lead with a single founder\'s or customer\'s origin story rather than listing product features in bullet points',
        impact: ImpactLevel.HIGH,
      },
    ],

    whenToAvoid: [
      {
        title: 'Exploiting Individual Suffering',
        reason:
          'Using identifiable individuals to manipulate emotions purely for commercial gain is unethical',
        consequence:
          'Users feel manipulated, brand reputation suffers, and real people may be harmed by exploitation of their stories',
        alternative:
          'Use genuine stories with consent and context; pair personal narratives with systemic information',
      },
      {
        title: 'Obscuring Systemic Issues',
        reason:
          'Focusing only on individual stories can mask larger systemic problems that need structural solutions',
        consequence:
          'Users may feel compassion for one person but ignore millions; real problems go unaddressed',
        alternative:
          'Pair individual stories with data about the broader issue; use the individual as a window into the systemic problem',
      },
      {
        title: 'Fabricated or Misleading Personal Stories',
        reason:
          'Invented testimonials or exaggerated personal narratives destroy trust when discovered',
        consequence:
          'Legal liability, user backlash, and permanent credibility damage',
        alternative:
          'Only use real stories from real people with their explicit consent and accurate details',
      },
      {
        title: 'Manipulative Emotional Appeals in Critical Decisions',
        reason:
          'Using identified individuals to pressure users into medical, financial, or legal decisions',
        consequence:
          'Users make emotion-driven decisions with potentially serious consequences',
        alternative:
          'Present balanced information with both individual stories and objective data for critical choices',
      },
    ],

    commonMistakes: [
      {
        title: 'Using Stock Photos as "Real" People',
        description:
          'Pairing generic stock photography with fabricated testimonial quotes',
        why: 'Users increasingly recognize stock photos, destroying authenticity and trust',
        fix: 'Use real photos of real customers with genuine, attributed quotes and verifiable details',
      },
      {
        title: 'Overloading with Multiple Stories',
        description:
          'Showing 10+ testimonials on one page, diluting the identifiable victim effect',
        why: 'The effect relies on singularity — one vivid story is more powerful than many mediocre ones',
        fix: 'Feature one or two deeply detailed stories prominently; aggregate additional social proof separately',
      },
      {
        title: 'Stories Without Specificity',
        description:
          'Vague testimonials like "Great product! — J.M." without detail or narrative',
        why: 'The effect requires concreteness: a name, a face, specific circumstances, a measurable outcome',
        fix: 'Include full name, photo, role, specific before/after details, and a narrative arc',
      },
      {
        title: 'Ignoring Consent and Privacy',
        description:
          'Sharing customer stories, photos, or details without proper permission',
        why: 'Violates privacy, potentially illegal, and damages trust if exposed',
        fix: 'Always get explicit written consent; let customers review and approve their stories before publication',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.HIGH,
        description:
          'Layout determines whether individual stories are featured prominently or buried among abstract data',
        examples: [
          'Hero sections with a single customer story outperform feature lists',
          'Full-width story sections with large photos create emotional engagement',
          'Card layouts featuring individual people with names and photos drive clicks',
          'Sidebar testimonials with real headshots increase perceived credibility',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Typography helps establish the personal, human tone needed for individual stories',
        examples: [
          'Pull quotes with a person\'s name and photo feel more credible than anonymous text',
          'Handwriting-style fonts for signatures add personal authenticity',
          'First-person narrative text ("I was struggling...") is more engaging than third-person',
          'Name attribution in bold beneath quotes reinforces identifiability',
        ],
      },
      color: {
        level: ImpactLevel.MEDIUM,
        description:
          'Color choices affect the emotional warmth and trustworthiness of individual stories',
        examples: [
          'Warm tones in testimonial sections create empathy and approachability',
          'High-contrast photos of real people draw attention within a page',
          'Subtle background colors for story sections differentiate them from data-heavy areas',
          'Consistent color treatment for customer stories creates a recognizable pattern',
        ],
      },
      interaction: {
        level: ImpactLevel.HIGH,
        description:
          'Interactive elements can deepen engagement with individual stories',
        examples: [
          'Video testimonials with play buttons achieve higher engagement than text alone',
          'Click-to-expand story cards let users choose to go deeper into a narrative',
          'Before/after sliders showing one person\'s transformation are highly compelling',
          'Interactive timelines of one customer\'s journey create narrative investment',
        ],
      },
      content: {
        level: ImpactLevel.CRITICAL,
        description:
          'Content is the primary vehicle for the identifiable victim effect — narrative quality determines emotional impact',
        examples: [
          'A single named customer story converts better than "10,000 happy customers"',
          'Specific outcomes ("saved $4,200 in 3 months") outperform vague praise ("really helpful tool")',
          'Stories with struggle-and-resolution arcs are more memorable than simple endorsements',
          'First-person narratives ("When I started, I was drowning in spreadsheets...") engage empathy circuits',
        ],
      },
      accessibility: {
        level: ImpactLevel.HIGH,
        description:
          'Accessibility ensures that the emotional power of individual stories reaches all users',
        examples: [
          'Alt text on customer photos should include the person\'s name and role for screen reader empathy',
          'Video testimonials need captions and transcripts to reach deaf and hard-of-hearing users',
          'Audio descriptions should convey the human elements (facial expressions, setting) of video stories',
          'Semantic markup of blockquotes with proper citation connects the story to the person for assistive tech',
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
        title: 'Individual Customer Success Story',
        description:
          'SaaS landing page featuring one detailed customer journey with photo, name, and specific results',
        code: `<section class="customer-story">
  <div class="story-hero">
    <img src="maria-chen.jpg" alt="Maria Chen, freelance designer">
    <div class="story-intro">
      <h2>How Maria Got Her Weekends Back</h2>
      <p class="subtitle">Maria Chen, Freelance Designer, Portland OR</p>
    </div>
  </div>

  <blockquote>
    "I was spending every Sunday doing invoices and chasing payments.
    Now I set it up once and everything runs automatically.
    Last month I took my first real weekend off in two years."
  </blockquote>

  <div class="results">
    <div class="metric">
      <span class="number">12 hours</span>
      <span class="label">saved per week</span>
    </div>
    <div class="metric">
      <span class="number">$4,200</span>
      <span class="label">recovered in unpaid invoices</span>
    </div>
  </div>

  <p class="context">Maria is one of 2,847 freelancers using our platform.</p>
</section>`,
        explanation:
          'Maria is a real, named person with a photo, a specific location, and a concrete narrative arc (problem, solution, outcome). The individual story creates empathy and identification. The aggregate stat at the bottom provides context without undermining the emotional impact.',
        principle:
          'One vivid, identifiable story creates stronger emotional connection than aggregate statistics',
        metrics: {
          before: '3.1% conversion rate with "2,847 happy freelancers" headline',
          after: '5.7% conversion rate with Maria\'s individual story',
          improvement: '84% increase in sign-up conversion',
        },
      },
      {
        title: 'Named Case Study with Before/After',
        description:
          'B2B case study page featuring a specific company contact with measurable transformation',
        code: `<article class="case-study">
  <header>
    <img src="james-okafor.jpg" alt="James Okafor, CTO of Meridian Health">
    <div>
      <h2>"We went from 3 data breaches a year to zero"</h2>
      <p>James Okafor, CTO at Meridian Health</p>
      <p class="company-size">450 employees, healthcare sector</p>
    </div>
  </header>

  <section class="journey">
    <div class="before">
      <h3>Before</h3>
      <p>James's team was manually auditing security logs.
      Three breaches in 2023 put patient data at risk.</p>
    </div>
    <div class="after">
      <h3>After</h3>
      <p>Automated threat detection caught 147 potential
      incidents. Zero breaches in 12 months.</p>
    </div>
  </section>

  <footer>
    <a href="/case-studies/meridian-health">Read full case study</a>
  </footer>
</article>`,
        explanation:
          'James is an identifiable individual with a name, role, company, and specific before/after metrics. The story makes an abstract security product concrete and relatable through one person\'s experience.',
        principle:
          'Named individuals with specific outcomes make abstract B2B products tangible and trustworthy',
      },
      {
        title: 'Personal Testimonial with Photo and Context',
        description:
          'Charity donation page featuring one child with a name, photo, and specific story',
        code: `<section class="sponsor-child">
  <img src="amara.jpg" alt="Amara, age 8, from Senegal" class="child-photo">

  <div class="child-story">
    <h2>Meet Amara</h2>
    <p class="age-location">Age 8, Dakar, Senegal</p>
    <p>Amara loves drawing and wants to be a teacher when she
    grows up. She walks 3 miles to school every day because her
    family can't afford the bus fare. Your sponsorship covers
    her transportation, school supplies, and one meal a day.</p>

    <div class="impact">
      <p><strong>$35/month</strong> gives Amara safe transport,
      supplies, and daily nutrition.</p>
    </div>

    <button class="primary">Sponsor Amara</button>
  </div>

  <p class="broader-context">
    1.2 million children in Senegal lack access to education.
    <a href="/our-mission">Learn about our mission</a>
  </p>
</section>`,
        explanation:
          'Amara is a specific child with a name, age, location, dreams, and concrete needs. The donation amount maps directly to her specific outcomes. The broader context is present but doesn\'t dilute the emotional connection to one child.',
        principle:
          'A single identified individual with specific needs generates more empathy and action than statistics about millions',
        metrics: {
          before: '$18 average donation with "Help children in Senegal" messaging',
          after: '$41 average donation with Amara\'s individual story',
          improvement: '128% increase in average donation amount',
        },
      },
    ],

    bad: [
      {
        title: 'Exploiting Individual Suffering for Marketing',
        description:
          'Using dramatic personal tragedy to sell an unrelated product',
        code: `<!-- DON'T DO THIS -->
<div class="testimonial-manipulative">
  <img src="crying-person.jpg" alt="Person in distress">
  <h2>"I almost lost everything..."</h2>
  <p>John was on the verge of bankruptcy. His marriage was
  falling apart. He couldn't sleep at night. Then he discovered
  our productivity app and EVERYTHING CHANGED.</p>
  <p class="dramatic">Don't let this happen to YOU.</p>
  <button class="urgent">Start Free Trial Before It's Too Late</button>
</div>`,
        explanation:
          'This exploits an individual\'s suffering to create false urgency for an unrelated product. A productivity app does not prevent bankruptcy or save marriages. The dramatic framing manipulates emotions rather than informing.',
        principle:
          'Never exploit personal tragedy or suffering to sell products unrelated to the problem',
      },
      {
        title: 'Fabricated Personal Stories',
        description:
          'Using stock photos and invented names to create fake testimonials',
        code: `<!-- DON'T DO THIS -->
<div class="fake-testimonials">
  <div class="testimonial">
    <img src="stock-photo-1.jpg" alt="Happy customer">
    <p>"This changed my life!" — Jessica T., New York</p>
  </div>
  <div class="testimonial">
    <img src="stock-photo-2.jpg" alt="Happy customer">
    <p>"I can't imagine working without it!" — Mike R., Chicago</p>
  </div>
  <div class="testimonial">
    <img src="stock-photo-3.jpg" alt="Happy customer">
    <p>"Best purchase I ever made!" — Sarah L., Austin</p>
  </div>
</div>`,
        explanation:
          'Stock photos with generic names and vague praise are transparently fake. Users recognize stock photography, and the lack of specificity (no company, no measurable outcome, no real narrative) signals fabrication. This destroys trust.',
        principle:
          'Fabricated identifiable victims backfire — users detect inauthenticity and lose all trust',
      },
      {
        title: 'Ignoring Systemic Context for Emotional Manipulation',
        description:
          'Using an individual story to distract from a company\'s role in a larger problem',
        code: `<!-- DON'T DO THIS -->
<div class="greenwashing">
  <img src="farmer.jpg" alt="Smiling farmer">
  <h2>Meet Pedro, Our Coffee Partner</h2>
  <p>"Thanks to [Brand], I can send my daughter to school."</p>
  <button>Feel Good About Your Purchase</button>
  <!-- No mention that the company pays below fair-trade rates -->
  <!-- No mention of systemic exploitation in supply chain -->
</div>`,
        explanation:
          'Using one farmer\'s story to create a feel-good narrative while hiding systemic exploitation is manipulative. The identifiable victim effect is weaponized to deflect from corporate responsibility.',
        principle:
          'Individual stories must not be used to obscure systemic problems or corporate accountability',
      },
    ],

    realWorld: [
      {
        company: 'GoFundMe',
        product: 'Campaign Pages',
        url: 'https://www.gofundme.com',
        description:
          'GoFundMe\'s entire model is built on the identifiable victim effect. Each campaign features one person or family with a name, photos, a specific story, and a concrete funding goal. Individual campaigns routinely raise more than large institutional appeals.',
        effectiveness: 'very-effective',
        analysis:
          'GoFundMe is perhaps the purest commercial application of the identifiable victim effect. By giving every cause a face, a name, and a personal narrative, they transform abstract needs into emotionally compelling individual stories. The platform\'s success validates that people give far more to identified individuals than to anonymous statistics.',
      },
      {
        company: 'UNICEF',
        product: 'Child Sponsorship Program',
        url: 'https://www.unicef.org',
        description:
          'UNICEF and similar organizations use individual child sponsorship models where donors are matched with a specific named child, receive their photo, and get personal progress updates. This generates dramatically higher donation rates than appeals based on statistics about millions of children.',
        effectiveness: 'very-effective',
        analysis:
          'The child sponsorship model is the canonical example of identifiable victim effect in fundraising. By making one child\'s life tangible and trackable, organizations sustain long-term donor engagement. Donors feel personally connected and responsible for "their" child\'s wellbeing.',
      },
      {
        company: 'Kickstarter',
        product: 'Creator Stories',
        url: 'https://www.kickstarter.com',
        description:
          'Kickstarter campaign pages feature the creator prominently — their name, photo, video introduction, and personal story about why the project matters to them. Backers fund people as much as products.',
        effectiveness: 'very-effective',
        analysis:
          'By centering the creator as an identifiable individual with a dream, Kickstarter transforms product purchases into personal support relationships. Campaigns where creators share genuine personal stories consistently outperform those that focus only on product specifications.',
      },
      {
        company: 'Charity: Water',
        product: 'Donation Campaigns',
        url: 'https://www.charitywater.org',
        description:
          'Charity: Water shows donors exactly which community their money helped, with GPS coordinates, photos of specific people drinking clean water for the first time, and named individuals sharing their stories of transformation.',
        effectiveness: 'very-effective',
        analysis:
          'By connecting each donation to a specific, identifiable community and individual, Charity: Water closes the empathy loop. Donors see the face of the person they helped, reinforcing the identifiable victim connection and driving repeat donations.',
      },
    ],

    abTests: [
      {
        title: 'Landing Page: Individual Story vs Aggregate Statistics',
        hypothesis:
          'A single named customer story will convert better than aggregate customer metrics',
        controlVersion: {
          description:
            'Landing page hero section: "Join 10,000+ professionals who save an average of 12 hours per week. 98% satisfaction rate."',
          metrics: {
            conversionRate: '3.1%',
            timeOnPage: '1:15',
            scrollDepth: '38%',
          },
        },
        treatmentVersion: {
          description:
            'Landing page hero section: Maria Chen\'s story with photo, specific details about her 12-hour-per-week time savings, and a quote about getting her weekends back',
          metrics: {
            conversionRate: '5.7%',
            timeOnPage: '3:42',
            scrollDepth: '72%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'The individual story increased conversions by 84%. Users spent 3x longer on the page and scrolled nearly twice as deep. In follow-up surveys, 67% of converters mentioned Maria by name as a reason they signed up. Only 8% of control group converters could recall any specific statistic.',
          learnings: [
            'One identified person with a name and photo outperforms aggregate metrics for emotional engagement',
            'Users remember individual stories but forget statistics almost immediately',
            'The individual story drove deeper page engagement, not just headline scanning',
            'Combining the individual story with supporting statistics (at the bottom) performed best of all variants',
          ],
        },
      },
      {
        title: 'Donation Page: Named Child vs Statistical Need',
        hypothesis:
          'A donation page featuring one named child will generate higher donations than one describing the scale of the problem',
        controlVersion: {
          description:
            'Donation page: "3.1 million children in East Africa face acute food insecurity. Your donation helps provide emergency nutrition programs."',
          metrics: {
            conversionRate: '2.4%',
            averageDonation: '$18',
          },
        },
        treatmentVersion: {
          description:
            'Donation page: "Meet Amara, age 8. She walks 3 miles to school every day because her family can\'t afford bus fare. $35/month covers her transport, supplies, and daily meals."',
          metrics: {
            conversionRate: '5.8%',
            averageDonation: '$41',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'The named child version more than doubled both conversion rate and average donation. Donors reported feeling that their money would "make a real difference" for the individual child, whereas the statistical version made them feel their contribution was "a drop in the ocean."',
          learnings: [
            'Singularity drives action: one child > 3.1 million children for emotional response',
            'Specific dollar-to-outcome mapping ($35 = transport + supplies + meals) increases willingness to give',
            'Statistical framing can actually reduce giving by inducing "psychic numbing" and feelings of helplessness',
            'Adding statistics to the individual story slightly reduced donations, confirming Small & Loewenstein\'s findings',
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
        name: 'Individual Portrait Photography',
        description: 'Large photos of specific, named individuals featured prominently in testimonials or case studies',
        howToSpot: 'Look for headshots, full portraits, or candid photos of real people with name attribution nearby',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Personal Narrative Blocks',
        description: 'Extended first-person quotes or story sections telling one person\'s journey',
        howToSpot: 'Look for blockquotes, pull quotes, or narrative sections written in first person with attribution',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Named Attribution',
        description: 'Specific names, roles, companies, and locations attached to testimonials',
        howToSpot: 'Check whether testimonials include full names, job titles, company names, or geographic locations',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Individual Outcome Metrics',
        description: 'Specific, measurable results attributed to one person\'s experience',
        howToSpot: 'Look for numbers tied to a named individual: "Maria saved 12 hours" rather than "users save 10 hours on average"',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Emotional Story Arcs',
        description: 'Before/after narratives showing one person\'s transformation',
        howToSpot: 'Look for struggle-resolution patterns: problem description followed by solution and measurable outcome for one individual',
        severity: ImpactLevel.HIGH,
      },
    ],

    patterns: [
      {
        name: 'Single-Person Hero Pattern',
        description: 'Landing page hero section featuring one named individual\'s story rather than aggregate data',
        indicators: ['Large hero photo of a real person', 'First-person quote in the hero section', 'Name and role attribution', 'Specific personal outcome metrics'],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Named Sponsorship Pattern',
        description: 'Donation or support pages matching donors with a specific named recipient',
        indicators: ['Individual recipient with name, age, location', 'Personal photo of the recipient', 'Specific needs tied to donation amount', '"Sponsor [Name]" or "Help [Name]" call-to-action'],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Case Study Narrative Pattern',
        description: 'Detailed case studies built around one person\'s journey with a product or service',
        indicators: ['Named contact person with photo', 'Before/after transformation narrative', 'Specific metrics attributed to the individual', 'Company context and role details'],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Humanized Communication Pattern',
        description: 'Error messages, empty states, or support prompts that reference a specific named person',
        indicators: ['Named support person in error states', '"Talk to [Name]" instead of "Contact support"', 'Support agent photos and names in chat widgets', 'Personal sign-offs on automated messages'],
        severity: ImpactLevel.MEDIUM,
        confidence: 'medium',
      },
    ],

    checklistQuestions: [
      'Are testimonials attributed to specific, named individuals with photos?',
      'Do case studies feature one person\'s detailed journey rather than aggregate results?',
      'Is there a personal narrative arc (problem, solution, outcome) for an identified individual?',
      'Are donation or support appeals centered on a specific named recipient?',
      'Do customer stories include specific, measurable outcomes for the individual?',
      'Are the individual stories genuine (real people, real consent, real outcomes)?',
      'Is the individual story balanced with broader context about the systemic issue?',
      'Could the use of individual stories be perceived as exploitative or manipulative?',
      'Are identified individuals from diverse backgrounds and experiences?',
      'Is there consent and privacy protection for the individuals featured?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in the identifiable victim effect.

Analyze the provided design for identifiable victim effect patterns. Identify:

1. **Individual Stories**: Named, photographed individuals with personal narratives
2. **Specificity Level**: How concrete and detailed individual testimonials are (name, photo, role, metrics)
3. **Emotional Engagement**: Whether individual stories create empathy and identification
4. **Statistical Balance**: Whether aggregate data supplements or undermines individual stories
5. **Ethical Use**: Whether individual stories are genuine, consensual, and non-exploitative

For each pattern found:
- Identify who the identifiable individual is and how they are presented
- Assess whether the story is genuine and ethical
- Determine if the individual story is appropriately specific and detailed
- Evaluate whether systemic context is provided alongside individual narratives
- Suggest improvements for authentic, ethical storytelling

Consider:
- Are individual stories genuine and based on real people with consent?
- Is the identifiable victim effect being used to inform or to manipulate?
- Are individual stories masking systemic issues that need transparency?
- Is there diversity in the individuals featured?
- Are individual stories appropriately paired with broader context?

Provide actionable recommendations for ethical, effective use of identifiable stories.`,

    outputSchema: {
      type: 'object',
      properties: {
        identifiedVictimPatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              individualIdentified: { type: 'string' },
              specificityLevel: { type: 'string' },
              emotionalImpact: { type: 'string' },
              authenticity: { type: 'string' },
              ethical: { type: 'boolean' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'individualIdentified',
              'specificityLevel',
              'ethical',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            storytellingEffectiveness: { type: 'number' },
            authenticityScore: { type: 'number' },
            ethicalScore: { type: 'number' },
            systemicContextBalance: { type: 'number' },
          },
          required: [
            'storytellingEffectiveness',
            'authenticityScore',
            'ethicalScore',
            'systemicContextBalance',
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
        'identifiedVictimPatterns',
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
        title: 'Find a Real, Willing Participant',
        description:
          'Identify a genuine customer, beneficiary, or user who has a compelling story and is willing to share it publicly',
        example:
          'Reach out to Maria Chen, a freelance designer who saved 12 hours per week using the product, and ask if she would share her story',
        tips: [
          'Always get explicit written consent before using anyone\'s story, name, or photo',
          'Choose someone your target audience can identify with',
          'Ensure the story is genuine and verifiable',
        ],
      },
      {
        step: 2,
        title: 'Capture Specific, Concrete Details',
        description:
          'Gather the person\'s full name, photo, role, location, and measurable before/after outcomes',
        example:
          'Maria Chen, Freelance Designer, Portland OR. Before: 12 hours/week on invoicing. After: 30 minutes/week. Recovered $4,200 in unpaid invoices.',
        tips: [
          'Specificity drives the identifiable victim effect — vague stories lose power',
          'Include measurable outcomes whenever possible',
          'Capture the emotional journey, not just the data points',
        ],
      },
      {
        step: 3,
        title: 'Craft a Narrative Arc',
        description:
          'Structure the story as: struggle (before), discovery (turning point), transformation (after)',
        example:
          '"I was spending every Sunday doing invoices..." (struggle) → "Then I found [product]..." (discovery) → "Last month I took my first real weekend off in two years" (transformation)',
        tips: [
          'The narrative arc is what makes the story memorable and emotionally engaging',
          'Let the person tell their story in their own words when possible',
          'Focus on the human outcome, not just the product features',
        ],
      },
      {
        step: 4,
        title: 'Design for Visual Prominence',
        description:
          'Give the individual story prime real estate — hero sections, above-the-fold, large photos',
        example:
          'Full-width hero section with Maria\'s photo on the left, her quote and story on the right, and outcome metrics below',
        tips: [
          'Large, high-quality photos of real people are essential',
          'The story should be the first thing visitors see, not buried below the fold',
          'Use white space to let the story breathe',
        ],
      },
      {
        step: 5,
        title: 'Add Supporting Context',
        description:
          'Below the individual story, provide aggregate data and broader context to ground the narrative in reality',
        example:
          '"Maria is one of 2,847 freelancers using our platform. Average time saved: 10.3 hours/week."',
        tips: [
          'Context should support, not undermine, the individual story',
          'Place aggregate data after the individual narrative, not before',
          'Don\'t overwhelm the story with statistics — keep context brief',
        ],
      },
    ],

    dos: [
      'Feature real people with real names, real photos, and genuine stories',
      'Get explicit written consent from every individual featured',
      'Include specific, measurable outcomes for the identified individual',
      'Structure stories with a narrative arc: struggle, discovery, transformation',
      'Place individual stories prominently in the visual hierarchy',
      'Provide broader systemic context alongside individual narratives',
      'Use high-quality, authentic photography — not stock photos',
      'Let individuals tell their stories in their own words when possible',
    ],

    donts: [
      'Don\'t fabricate testimonials or use stock photos with invented names',
      'Don\'t exploit individual suffering to sell unrelated products',
      'Don\'t use individual stories to mask systemic problems or corporate responsibility',
      'Don\'t feature individuals without their explicit written consent',
      'Don\'t overload pages with dozens of testimonials — singularity drives the effect',
      'Don\'t strip stories of specificity — vague quotes lose all emotional power',
      'Don\'t use dramatic, manipulative framing to exaggerate personal hardship',
      'Don\'t ignore diversity — featured individuals should reflect your actual user base',
    ],

    bestPractices: [
      {
        title: 'Lead with One Story, Support with Data',
        description:
          'Feature one deeply detailed individual story first, then provide aggregate metrics as supporting evidence',
        rationale:
          'Research shows that individual stories followed by statistics perform better than either alone, but the story must come first to establish emotional engagement',
        example:
          'Hero section: Maria\'s story. Below the fold: "Join 2,847 freelancers saving an average of 10 hours/week"',
      },
      {
        title: 'Ensure Authenticity and Verifiability',
        description:
          'Use real names, real photos, real companies, and verifiable outcomes',
        rationale:
          'Users are increasingly sophisticated at detecting fabricated testimonials; authenticity is the foundation of the identifiable victim effect',
        example:
          'Include LinkedIn links, company websites, or video testimonials that users can verify independently',
      },
      {
        title: 'Rotate Stories for Audience Segments',
        description:
          'Show different identified individuals to different audience segments so visitors see someone like themselves',
        rationale:
          'The identifiable victim effect is strongest when the audience can identify with the featured individual',
        example:
          'Show a freelancer\'s story to freelancer visitors, an agency story to agency visitors, an enterprise story to enterprise visitors',
      },
      {
        title: 'Include Systemic Context',
        description:
          'Pair individual stories with information about the broader problem or population affected',
        rationale:
          'Individual stories without systemic context can create a false sense that the problem is small or fully addressed',
        example:
          '"Amara is one of 1.2 million children in Senegal who lack access to education. Your sponsorship helps one child — and funds programs reaching thousands."',
      },
      {
        title: 'Respect Privacy and Dignity',
        description:
          'Present individuals with dignity, not as helpless victims; emphasize agency and resilience',
        rationale:
          'Portraying people as helpless objects of pity is dehumanizing and can backfire ethically and emotionally',
        example:
          'Show Amara\'s strengths and aspirations ("loves drawing, wants to be a teacher") rather than only her deprivation',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '1.1.1',
        guideline:
          'Non-text Content - Customer photos must have meaningful alt text',
        implementation:
          'Alt text should include the person\'s name and role (e.g., alt="Maria Chen, freelance designer from Portland") so screen reader users connect the story to a real person',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.2.1',
        guideline:
          'Audio-only and Video-only - Video testimonials need alternatives',
        implementation:
          'Provide captions, transcripts, and audio descriptions for all video testimonials so the individual\'s story reaches deaf, hard-of-hearing, and blind users',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships - Story structure must be semantically conveyed',
        implementation:
          'Use proper blockquote elements with cite attributes, figure/figcaption for photos, and heading hierarchy so assistive technology conveys the narrative structure',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.4.6',
        guideline:
          'Headings and Labels - Story sections need descriptive headings',
        implementation:
          'Use headings like "Maria\'s Story" or "How James Transformed His Security" rather than generic "Testimonial" labels',
      },
    ],

    ethics: [
      {
        concern: 'Exploitation of Suffering',
        severity: 'critical',
        explanation:
          'Using an individual\'s personal hardship, illness, or tragedy to sell products or services that are unrelated to their actual problem',
        mitigation:
          'Only feature individuals whose stories are genuinely relevant to the product. Ensure the product actually delivered the claimed benefit. Get informed, enthusiastic consent.',
      },
      {
        concern: 'Fabricated Identities',
        severity: 'critical',
        explanation:
          'Creating fictional people with stock photos and invented stories to simulate the identifiable victim effect',
        mitigation:
          'Never fabricate testimonials. Every individual must be real, verifiable, and consenting. Consider linking to LinkedIn profiles or other verification.',
      },
      {
        concern: 'Masking Systemic Issues',
        severity: 'high',
        explanation:
          'Using individual success stories to distract from systemic problems the company contributes to (e.g., one "happy farmer" masking exploitative supply chains)',
        mitigation:
          'Pair individual stories with transparent disclosure about systemic challenges. Don\'t use personal narratives to deflect from corporate accountability.',
      },
      {
        concern: 'Privacy and Consent Violations',
        severity: 'critical',
        explanation:
          'Sharing personal stories, photos, or details without proper informed consent from the individual',
        mitigation:
          'Always get explicit, written, revocable consent. Let individuals review and approve their stories before publication. Provide a way for them to withdraw consent.',
      },
      {
        concern: 'Dehumanizing Portrayal',
        severity: 'high',
        explanation:
          'Presenting individuals as helpless victims or objects of pity rather than as people with agency and dignity',
        mitigation:
          'Emphasize the individual\'s strengths, aspirations, and agency alongside their challenges. Avoid "poverty porn" or gratuitous depictions of suffering.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'The Life You Can Save: Acting Now to End World Poverty',
        author: 'Schelling, T.',
        year: 1968,
        description:
          'The foundational work introducing the distinction between "statistical lives" and "identified lives," establishing that people value known individuals more than anonymous groups',
        type: 'foundational',
      },
      {
        title: 'Sympathy and Callousness: The Impact of Deliberative Thought on Donations to Identifiable and Statistical Victims',
        author: 'Small, D. A., Loewenstein, G., & Slovic, P.',
        year: 2007,
        doi: '10.1016/j.obhdp.2006.01.005',
        description:
          'Demonstrates that analytic thinking reduces donations to identifiable victims, while feelings-based thinking increases them — statistics can actually dampen empathy',
        type: 'foundational',
      },
      {
        title: 'If I Look at the Mass I Will Never Act: Psychic Numbing and Genocide',
        author: 'Slovic, P.',
        year: 2007,
        doi: '10.1080/17405620701615508',
        description:
          'Explores "psychic numbing" — the phenomenon where compassion decreases as the number of victims increases, with profound implications for design and communication',
        type: 'advanced',
      },
      {
        title: 'Helping a Victim or Helping the Victim: Altruism and Identifiability',
        author: 'Small, D. A., & Loewenstein, G.',
        year: 2003,
        doi: '10.1023/A:1023013008323',
        description:
          'The key experimental study showing that people donate significantly more to an identified individual than to a statistical description of the same need',
        type: 'foundational',
      },
    ],

    books: [
      {
        title: 'Thinking, Fast and Slow',
        author: 'Kahneman, Daniel',
        year: 2011,
        isbn: '9780374275631',
        description:
          'Comprehensive coverage of how emotional responses to individuals override analytical responses to statistics, including the identifiable victim effect',
        type: 'foundational',
      },
      {
        title: 'Numbers and Nerves: Information, Emotion, and Meaning in a World of Data',
        author: 'Slovic, S., & Slovic, P.',
        year: 2015,
        isbn: '9780870717802',
        description:
          'Explores why statistics fail to motivate action and how individual stories bridge the gap between numbers and human compassion',
        type: 'advanced',
      },
    ],

    articles: [
      {
        title: 'The Identifiable Victim Effect in UX and Marketing',
        author: 'Nielsen Norman Group',
        url: 'https://www.nngroup.com/articles/',
        description:
          'Practical guide to applying the identifiable victim effect ethically in user experience and product design',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'Why We Ignore Statistics and Listen to Stories',
        author: 'Paul Slovic',
        url: 'https://www.youtube.com/results?search_query=paul+slovic+identifiable+victim',
        description:
          'Paul Slovic explains psychic numbing and the identifiable victim effect, with implications for design and communication',
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
      'narrative-bias',
      'empathy-gap',
      'loss-aversion',
    ],

    conflicts: [
      'base-rate-neglect',
    ],

    confusedWith: [
      'availability-heuristic',
      'empathy-gap',
      'in-group-bias',
    ],

    hierarchy: {
      parent: 'cognitive-bias',
      children: [
        'singularity-effect',
        'psychic-numbing',
      ],
    },
  },
};
