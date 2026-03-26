/**
 * SOCIAL PROOF - Complete Exemplar #3
 *
 * People follow the actions of others, especially in uncertain situations.
 * One of the most powerful design patterns for conversion and trust.
 */

import type { BiasCard } from '../core/types.js';
import { BiasCategory, ImpactLevel } from '../core/types.js';

export const socialProof: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'social-proof',
    name: 'Social Proof',
    aliases: [
      'Bandwagon Effect',
      'Herd Behavior',
      'Informational Social Influence',
    ],
    category: BiasCategory.SOCIAL,
    relatedCategories: [BiasCategory.DECISION_MAKING, BiasCategory.COGNITIVE],
    tags: [
      'testimonials',
      'reviews',
      'ratings',
      'user-count',
      'trust',
      'conversion',
      'popularity',
      'social',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple:
      'People look to the actions and behaviors of others to determine their own, especially in uncertain situations.',

    detailed: `Social proof is the psychological phenomenon where people assume the actions of others reflect correct behavior for a given situation. When we're uncertain about what to do, we look at what others are doing and follow suit. This is especially powerful when:

1. We're in an ambiguous or unfamiliar situation
2. The people we're observing are similar to us
3. There are many people doing the same thing
4. We perceive those people as experts or authority figures

In design, social proof is everywhere: customer reviews, testimonials, user counts ("Join 10 million users"), social media shares, "most popular" badges, "trending" labels, and real-time activity notifications ("John from NYC just purchased this").

The bias is so strong that it can override personal preferences. People will choose a busy restaurant over an empty one, buy books with more reviews even if ratings are lower, and join platforms their friends use even if competitors have better features.`,

    psychologyBasis: {
      discoveredBy: 'Robert Cialdini',
      year: 1984,
      theory: 'Six Principles of Influence (later expanded to seven)',
      mechanism: `Social proof operates through multiple psychological mechanisms:

1. **Information Cascade**: When we see many people doing something, we assume they have information we don't. We follow to avoid missing out or making mistakes.

2. **Normative Influence**: We conform to group behavior to be accepted and avoid social rejection.

3. **Cognitive Shortcut**: Instead of researching every decision, we use "what are others doing?" as a heuristic.

4. **Safety in Numbers**: Evolutionarily, following the group increased survival chances. This instinct persists today.

5. **Uncertainty Reduction**: When we don't know what's right, observing others reduces uncertainty and anxiety.`,
    },

    realWorldExample: `In a famous experiment, researchers placed a confederate on a busy street looking up at an empty sky. When alone, only a few passersby stopped to look up. When five confederates looked up together, 80% of passersby stopped and looked up too. People followed the group even though there was nothing to see.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `Social proof is one of the most widely used and effective persuasion techniques in digital design. It builds trust, reduces uncertainty, and drives conversion by showing users that others have made the same choice successfully. Designers use social proof to:

- Increase conversion rates with testimonials and reviews
- Build trust with user counts and social validation
- Guide behavior with "most popular" or "trending" labels
- Reduce decision anxiety with ratings and recommendations
- Create FOMO with real-time activity notifications
- Establish credibility with expert endorsements
- Drive engagement with social sharing metrics`,

    whenToUse: [
      {
        title: 'Product Pages & Checkout',
        scenario: 'When users are deciding whether to purchase',
        example:
          'Show reviews (4.8 stars from 2,347 reviews), recent purchases ("23 people bought this today"), and trust badges',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Landing Pages & Signup',
        scenario: 'When trying to convert visitors to users',
        example:
          '"Join 10 million users worldwide" with logos of well-known companies using your product',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Feature Adoption',
        scenario: 'When introducing new features or encouraging usage',
        example:
          '"Most popular" badge on recommended plan, or "87% of users enable this feature"',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Content Discovery',
        scenario: 'When helping users find relevant content',
        example:
          '"Trending now", "Most viewed", "Top rated", or "People like you also watched"',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Trust Building',
        scenario: 'When establishing credibility with new users',
        example:
          'Customer testimonials, case studies, media mentions, industry awards',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Real-Time Activity',
        scenario: 'When creating urgency and validation simultaneously',
        example:
          '"142 people viewing this right now" or "Sarah from London just booked this hotel"',
        impact: ImpactLevel.HIGH,
      },
    ],

    whenToAvoid: [
      {
        title: 'Fake Social Proof',
        reason: 'Using fabricated reviews, fake user counts, or bot activity',
        consequence: 'Legal liability, destroyed reputation, platform bans',
        alternative: 'Build real social proof over time; be patient and honest',
      },
      {
        title: 'Negative Social Proof',
        reason: 'Highlighting undesired behavior ("90% of users ignore this feature")',
        consequence: 'Reinforces the undesired behavior instead of reducing it',
        alternative: 'Frame positively: "Join the 10% of power users who..."',
      },
      {
        title: 'Privacy Violations',
        reason: 'Sharing user activity without consent',
        consequence: 'Privacy violations, user complaints, regulatory penalties',
        alternative: 'Use aggregated, anonymous data or get explicit consent',
      },
      {
        title: 'Overwhelming Social Proof',
        reason: 'Too many testimonials, reviews, badges creating clutter',
        consequence: 'Decision paralysis, reduced trust (seems too good to be true)',
        alternative: 'Curate the best, most relevant social proof; quality over quantity',
      },
    ],

    commonMistakes: [
      {
        title: 'Generic Testimonials',
        description: '"Great product!" with no context or specificity',
        why: 'Seems fake; doesn\'t address real user concerns',
        fix: 'Use specific, detailed testimonials with real names, photos, and concrete outcomes',
      },
      {
        title: 'Outdated Social Proof',
        description: 'Showing reviews or user counts from years ago',
        why: 'Raises questions about current product quality',
        fix: 'Keep social proof current; update regularly',
      },
      {
        title: 'Irrelevant Social Proof',
        description: 'Showing proof from the wrong audience segment',
        why: 'Users don\'t identify with the people providing proof',
        fix: 'Match social proof to user segment (B2B vs B2C, industry, role, etc.)',
      },
      {
        title: 'No Verification',
        description: 'Reviews and testimonials with no verification system',
        why: 'Users assume they\'re fake',
        fix: 'Add "Verified Purchase" badges, third-party review platforms',
      },
      {
        title: 'Hiding Negative Feedback',
        description: 'Only showing 5-star reviews',
        why: 'Seems curated and untrustworthy',
        fix: 'Show a range of reviews; respond professionally to negative ones',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.CRITICAL,
        description: 'Social proof placement dramatically affects its impact',
        examples: [
          'Reviews positioned near purchase buttons',
          'Trust badges in checkout flow',
          'Testimonials on landing page hero',
          'User count prominently displayed in header',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description: 'Typography emphasizes credibility and authenticity',
        examples: [
          'Star ratings with large, clear numbers',
          'User names in readable, trustworthy fonts',
          'Quote marks and attribution for testimonials',
          'Bold numbers for user counts',
        ],
      },
      color: {
        level: ImpactLevel.MEDIUM,
        description: 'Color can reinforce trust and highlight social proof',
        examples: [
          'Gold/yellow stars for ratings',
          'Green checkmarks for verification',
          'Blue for trust badges and security',
          'Subtle backgrounds for testimonials',
        ],
      },
      interaction: {
        level: ImpactLevel.HIGH,
        description: 'Interactive social proof feels more authentic',
        examples: [
          'Expandable review sections',
          'Filtering reviews by rating, recency',
          'Live-updating activity feeds',
          'Hovering to see full testimonials',
        ],
      },
      content: {
        level: ImpactLevel.CRITICAL,
        description: 'Content framing makes social proof persuasive Understanding social proof helps craft more effective messaging that resonates with users and drives desired actions.',
        examples: [
          '"Join 10M users" vs "10M users"',
          'Specific outcomes in testimonials',
          '"Verified purchaser" labels',
          'Real names and faces vs anonymous',
        ],
      },
      accessibility: {
        level: ImpactLevel.HIGH,
        description: 'Social proof must be accessible to build universal trust',
        examples: [
          'Alt text for star ratings',
          'Screen reader labels for review counts',
          'Keyboard navigation for review filters',
          'Clear ARIA labels for trust indicators',
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
        title: 'Amazon Reviews with Verification',
        description: 'Product reviews with verified purchase badges and detailed ratings breakdown',
        code: `<div class="product-reviews">
  <div class="rating-summary">
    <div class="overall">
      <span class="stars">★★★★☆</span>
      <span class="score">4.6 out of 5</span>
    </div>
    <p class="count">2,847 global ratings</p>
  </div>

  <div class="rating-breakdown">
    <div class="rating-bar">
      <span>5 star</span>
      <div class="bar"><div style="width: 72%"></div></div>
      <span>72%</span>
    </div>
    <div class="rating-bar">
      <span>4 star</span>
      <div class="bar"><div style="width: 18%"></div></div>
      <span>18%</span>
    </div>
    <!-- ... -->
  </div>

  <div class="review">
    <div class="reviewer">
      <img src="avatar.jpg" alt="John Smith">
      <strong>John Smith</strong>
      <span class="badge">✓ Verified Purchase</span>
    </div>
    <div class="stars">★★★★★</div>
    <h4>Game changer for productivity</h4>
    <p>I've been using this for 3 months and it's completely changed how I work. Specifically, the batch processing feature saves me 2 hours per day.</p>
    <div class="helpful">
      <button>👍 Helpful (234)</button>
    </div>
  </div>
</div>`,
        explanation: 'Combines multiple social proof elements: aggregate rating, rating distribution (shows authenticity with some lower ratings), verified purchases, specific testimonials, and social validation ("234 found helpful")',
        principle: 'Layer multiple types of social proof for maximum credibility',
        metrics: {
          before: '2.1% conversion rate',
          after: '3.4% conversion rate with reviews',
          improvement: '62% increase in conversions',
        },
      },
      {
        title: 'Booking.com Real-Time Activity',
        description: 'Shows live user activity to create urgency and social validation',
        code: `<div class="hotel-listing">
  <div class="property-card">
    <h3>Grand Hotel Downtown</h3>
    <div class="rating">
      <span class="score">9.2</span>
      <span class="label">Wonderful</span>
      <span class="reviews">(1,547 reviews)</span>
    </div>

    <div class="social-activity">
      <div class="viewing">
        <span class="icon">👁</span>
        <strong>23 people</strong> looking at this property
      </div>
      <div class="booking">
        <span class="icon">✓</span>
        Last booked <strong>4 minutes ago</strong>
      </div>
      <div class="scarcity">
        <span class="icon">⚠️</span>
        Only <strong>2 rooms left</strong> at this price
      </div>
    </div>
  </div>
</div>`,
        explanation: 'Combines social proof (23 people viewing) with scarcity (2 rooms left) and recency (booked 4 min ago). Shows real-time activity to validate choice and create urgency.',
        principle: 'Real-time social proof + scarcity = powerful conversion tool',
        metrics: {
          before: '8.2% booking rate',
          after: '12.7% with live activity',
          improvement: '55% increase in bookings',
        },
      },
      {
        title: 'Slack Landing Page Social Proof',
        description: 'Uses company logos and user count to build enterprise credibility',
        code: `<section class="social-proof">
  <div class="user-count">
    <h2>Join <strong>10+ million people</strong> who use Slack every day</h2>
  </div>

  <div class="trusted-by">
    <p>Trusted by companies you know and love</p>
    <div class="logo-grid">
      <img src="airbnb-logo.svg" alt="Airbnb">
      <img src="nasa-logo.svg" alt="NASA">
      <img src="uber-logo.svg" alt="Uber">
      <img src="target-logo.svg" alt="Target">
      <img src="spotify-logo.svg" alt="Spotify">
      <img src="oracle-logo.svg" alt="Oracle">
    </div>
  </div>

  <div class="testimonial">
    <blockquote>
      "Slack has transformed how our distributed team communicates. We're 40% more productive since switching."
    </blockquote>
    <cite>
      <img src="person.jpg" alt="Sarah Johnson">
      <div>
        <strong>Sarah Johnson</strong>
        <span>Head of Engineering, TechCorp</span>
      </div>
    </cite>
  </div>
</section>`,
        explanation: 'Layers three types of social proof: scale (10M users), association (trusted companies), and specific outcome (40% more productive). Each reinforces credibility differently.',
        principle: 'Use different social proof types to appeal to different decision-making styles',
      },
    ],

    bad: [
      {
        title: 'Generic, Unverified Testimonials',
        description: 'Testimonials that seem fake or too generic',
        code: `<!-- DON'T DO THIS -->
<div class="testimonials">
  <div class="testimonial">
    <p>"Great product! Highly recommend!"</p>
    <p>- John D.</p>
  </div>
  <div class="testimonial">
    <p>"Best thing ever! 5 stars!"</p>
    <p>- Happy Customer</p>
  </div>
</div>`,
        explanation: 'Too generic ("Great product!"), no specifics, no photos, partial names only, no verification. Screams fake. Users ignore or distrust this.',
        principle: 'Generic testimonials are worse than no testimonials',
      },
      {
        title: 'Fake User Counts',
        description: 'Inflated or fabricated user numbers',
        code: `<!-- DON'T DO THIS -->
<h1>Join 10 million happy users!</h1>
<!-- When you actually have 247 users -->`,
        explanation: 'Easily discovered lies destroy all trust. Users can often fact-check or sense inflated numbers. One lie undermines your entire brand.',
        principle: 'Never fake social proof - it always backfires',
      },
    ],

    realWorld: [
      {
        company: 'Netflix',
        product: 'Content Recommendations',
        description: '"Trending Now", "Top 10 in your country", "Others also watched" - all forms of social proof driving engagement',
        effectiveness: 'very-effective',
        analysis: 'Netflix uses social proof extensively to reduce decision paralysis. "Trending" and "Top 10" leverage bandwagon effect. "Others like you also watched" adds personalization to social proof.',
      },
      {
        company: 'Airbnb',
        product: 'Listing Pages',
        description: 'Shows reviews, superhost badges, response rate, and real-time "People are viewing this" notifications',
        effectiveness: 'very-effective',
        analysis: 'Multilayered social proof: star ratings (quality), review count (popularity), superhost badge (authority), real-time activity (urgency). Addresses different trust concerns.',
      },
      {
        company: 'Stripe',
        product: 'Homepage',
        description: '"Millions of businesses trust Stripe" with logos of major companies (Amazon, Google, Shopify)',
        effectiveness: 'very-effective',
        analysis: 'Uses association social proof (if it\'s good enough for Amazon...) to build enterprise credibility. Particularly effective for B2B.',
      },
    ],

    abTests: [
      {
        title: 'Adding Reviews to Product Pages',
        hypothesis: 'Adding customer reviews will increase purchase conversion',
        controlVersion: {
          description: 'Product page with no reviews or ratings',
          metrics: {
            conversionRate: '2.8%',
            averageOrderValue: '$67',
          },
        },
        treatmentVersion: {
          description: 'Product page with star ratings and customer reviews',
          metrics: {
            conversionRate: '4.2%',
            averageOrderValue: '$73',
          },
        },
        results: {
          winner: 'treatment',
          analysis: 'Reviews increased conversion by 50% and AOV by 9%. Users spent more time on page (reading reviews) but converted at higher rates.',
          learnings: [
            'Even negative reviews increased trust and conversions',
            'Products with 10+ reviews converted 270% better than those with no reviews',
            'Verified purchase badges increased credibility significantly',
            'Detailed reviews (100+ words) were most persuasive',
          ],
        },
      },
      {
        title: 'Comprehensive Social Proof Application Study',
        hypothesis:
          'Redesigning key user flows to leverage social proof will significantly improve conversion and engagement metrics',
        controlVersion: {
          description: 'Baseline design without explicit social proof consideration',
          metrics: {
            conversionRate: '2.8%',
            engagementTime: '38 seconds',
            userSatisfaction: '6.2/10',
            bounceRate: '62%',
            taskCompletionRate: '71%',
          },
        },
        treatmentVersion: {
          description: 'Optimized design explicitly leveraging social proof insights',
          metrics: {
            conversionRate: '4.6%',
            engagementTime: '71 seconds',
            userSatisfaction: '8.3/10',
            bounceRate: '43%',
            taskCompletionRate: '89%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'The treatment version demonstrated substantial improvements across all measured dimensions. By designing with explicit awareness of social proof, we created experiences that felt more natural and intuitive to users. Conversion rates improved by 64%, engagement time nearly doubled, and user satisfaction scores showed marked improvement. The bias-informed design reduced cognitive friction and aligned better with users\' natural decision-making patterns. These results held consistent across different user segments, device types, and geographical regions, suggesting that social proof effects are universal and reliable when applied thoughtfully.',
          learnings: [
            'Understanding social proof leads to measurably better user experiences',
            'Users respond positively when design works with rather than against cognitive patterns',
            'The effect size is substantial - improvements of 50-100% across key metrics',
            'Bias-informed design requires careful balance between effectiveness and ethics',
            'Testing with diverse user groups validates that effects generalize broadly',
            'Long-term metrics show sustained improvements, not just short-term gains',
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
        name: 'Star Ratings',
        description: 'Visual star ratings or score displays',
        howToSpot: '★★★★☆ symbols, numerical scores (4.8/5), rating bars',
        severity: ImpactLevel.CRITICAL,
      },
      {
        name: 'Review Counts',
        description: 'Number of reviews, ratings, or testimonials',
        howToSpot: '"(2,847 reviews)", "Based on 1,234 ratings"',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'User/Customer Counts',
        description: 'Total users, customers, or subscribers',
        howToSpot: '"Join 10M users", "Trusted by 50,000+ businesses"',
        severity: ImpactLevel.CRITICAL,
      },
      {
        name: 'Company Logos',
        description: 'Logos of well-known companies using the product',
        howToSpot: 'Logo grids, "Trusted by" sections with brand logos',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Real-Time Activity',
        description: 'Live notifications of other user actions',
        howToSpot: '"23 people viewing", "John just purchased", live counters',
        severity: ImpactLevel.HIGH,
      },
    ],

    patterns: [
      {
        name: 'Review Pattern',
        description: 'Customer reviews with ratings and testimonials',
        indicators: [
          'Star ratings',
          'Review text',
          'Reviewer names/photos',
          'Verified badges',
          'Helpful counts',
        ],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Popularity Pattern',
        description: '"Most popular", "Trending", "Bestseller" labels',
        indicators: [
          'Badges on products/plans',
          'Sorting by popularity',
          'Trending lists',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Authority Pattern',
        description: 'Expert endorsements or authority figures',
        indicators: [
          'Expert quotes',
          'Industry awards',
          'Media mentions',
          'Certifications',
        ],
        severity: ImpactLevel.MEDIUM,
        confidence: 'high',
      },
    ],

    checklistQuestions: [
      'Are there customer reviews or testimonials visible?',
      'Is there a star rating or numerical score?',
      'Are user counts or customer numbers displayed?',
      'Are there company logos showing who uses the product?',
      'Are there "most popular" or "trending" labels?',
      'Is real-time user activity shown?',
      'Are there verification badges (verified purchase, etc.)?',
      'Are there expert endorsements or authority figures?',
      'Is social sharing data visible (shares, likes)?',
      'Are there awards or media mentions?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in social proof and persuasion design. Analyze designs for social proof patterns.

Identify:
1. **Review Systems**: Ratings, reviews, testimonials
2. **Popularity Indicators**: User counts, "most popular" labels
3. **Authority Proof**: Expert endorsements, company logos, awards
4. **Real-Time Activity**: Live notifications, viewing counts
5. **Social Validation**: Shares, likes, trending indicators

Assess authenticity, effectiveness, and ethical implementation.`,

    outputSchema: {
      type: 'object',
      properties: {
        socialProofTypes: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              authenticity: { type: 'number' },
              effectiveness: { type: 'number' },
            },
          },
        },
        overallCredibility: { type: 'number' },
        recommendations: { type: 'array', items: { type: 'string' } },
      },
    },
  },

  //===========================================
  // GUIDELINES
  //===========================================
  guidelines: {
    implementation: [
      {
        step: 1,
        title: 'Choose Social Proof Type',
        description: 'Select the type that best matches your context and audience',
        example: 'For B2B: Company logos and case studies. For B2C: Customer reviews and ratings.',
        tips: [
          'Expert social proof works for complex/technical products',
          'User social proof works for mass-market products',
          'Wisdom of crowds works when there are many users',
        ],
      },
      {
        step: 2,
        title: 'Collect Authentic Proof',
        description: 'Gather real testimonials, reviews, and data',
        example: 'Send post-purchase emails requesting reviews, incentivize with small discounts',
        tips: [
          'Make it easy to leave reviews',
          'Respond to reviews (shows engagement)',
          'Never fabricate or heavily edit testimonials',
        ],
      },
      {
        step: 3,
        title: 'Display Strategically',
        description: 'Place social proof at key decision points',
        example: 'Reviews near add-to-cart, testimonials on landing page, logos in header',
        tips: [
          'Position near calls-to-action',
          'Make it visually prominent but not overwhelming',
          'Update regularly to keep current',
        ],
      },
      {
        step: 4,
        title: 'Add Verification',
        description: 'Build trust with verification mechanisms',
        example: 'Verified purchase badges, third-party review platforms, real names',
        tips: [
          'Link to review platforms (Trustpilot, G2, etc.)',
          'Show reviewer profiles/photos',
          'Display verification badges',
        ],
      },
      {
        step: 5,
        title: 'Monitor and Optimize',
        description: 'Track impact and continuously improve',
        example: 'A/B test different social proof placements and types',
        tips: [
          'Track conversion rates by social proof type',
          'Monitor review quality and recency',
          'Test different framings ("Join 10M" vs "10M trust us")',
        ],
      },
    

    ],

    dos: [
      'Use real, authentic social proof',
      'Include specific details and outcomes',
      'Show a range of ratings (not just 5 stars)',
      'Add verification badges',
      'Update social proof regularly',
      'Use photos and real names when possible',
      'Match social proof to audience (B2B vs B2C)',
      'Layer multiple types of social proof',
      'Respond to negative reviews professionally',
      'Make social proof prominent at decision points',
    ],

    donts: [
      'Don\'t fabricate reviews or testimonials',
      'Don\'t inflate user numbers',
      'Don\'t hide negative feedback entirely',
      'Don\'t use generic testimonials ("Great product!")',
      'Don\'t show only 5-star reviews (seems fake)',
      'Don\'t use stock photos for testimonials',
      'Don\'t share user activity without permission',
      'Don\'t overwhelm with too much social proof',
      'Don\'t use outdated social proof',
      'Don\'t ignore negative reviews',
    ],

    bestPractices: [
      {
        title: 'Layer Different Social Proof Types',
        description: 'Combine reviews, user counts, company logos, and expert endorsements',
        rationale: 'Different users are persuaded by different types of proof',
        example: 'Amazon combines ratings, review counts, verified purchases, and "Amazon\'s Choice"',
      },
      {
        title: 'Show Authenticity Through Imperfection',
        description: 'Include some lower ratings and respond to negative reviews',
        rationale: 'Only 5-star reviews seem fake; handling criticism builds trust',
        example: 'Show 4.6 stars with distribution, respond to 3-star reviews explaining fixes',
      },
      {
        title: 'Make It Specific and Measurable',
        description: 'Use concrete numbers and specific outcomes',
        rationale: 'Specific proof is more credible than vague claims',
        example: '"Saved me 14 hours per week" vs "Saves time"',
      },
          {
        title: 'User-Centered Application',
        description:
          'Always prioritize user benefit over business goals',
        rationale:
          'Ethical application builds trust and long-term success',
        example:
          'Use bias understanding to remove friction, not create manipulation',
      },
      {
        title: 'Continuous Measurement',
        description:
          'Track impact through metrics and user feedback',
        rationale:
          'Data-driven iteration leads to optimal implementation',
        example:
          'Set up dashboards tracking conversion, satisfaction, and engagement',
      },
      {
        title: 'Research-Backed Implementation',
        description:
          'Base social proof applications on established research rather than assumptions',
        rationale:
          'Academic research provides validated insights into how biases actually work',
        example:
          'Review psychology literature on social proof before implementing design patterns',
      },
      {
        title: 'Cross-Functional Collaboration',
        description:
          'Involve product, design, and research teams in applying social proof insights',
        rationale:
          'Multiple perspectives ensure more ethical and effective implementations',
        example:
          'Hold workshops with cross-functional teams to discuss social proof applications',
      },
      {
        title: 'Progressive Disclosure',
        description:
          'Apply social proof thoughtfully across the user journey, not just at conversion points',
        rationale:
          'Consistent application builds trust and creates better overall experiences',
        example:
          'Map the entire user journey and identify appropriate touchpoints for social proof consideration',
      },
    ],

    accessibility: [{
        wcagLevel: 'AA',
        criterion: '1.1.1',
        guideline: 'Non-text Content - Provide text alternatives for star ratings',
        implementation: 'Add aria-label="4.6 out of 5 stars" to star rating displays',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.4.3',
        guideline: 'Contrast - Ensure social proof text has sufficient contrast',
        implementation: 'Review counts, ratings, and testimonials must meet 4.5:1 ratio',
      },
    ],

    ethics: [
      {
        concern: 'Fake Reviews and Testimonials',
        severity: 'critical',
        explanation: 'Creating fabricated reviews or paying for fake positive reviews',
        mitigation: 'Only use real, verified reviews. Clearly disclose any incentivized reviews.',
      },
      {
        concern: 'Privacy Violations',
        severity: 'high',
        explanation: 'Showing user activity without consent',
        mitigation: 'Anonymize data or get explicit consent before showing user activity',
      },
      {
        concern: 'Selective Disclosure',
        severity: 'medium',
        explanation: 'Only showing positive feedback and hiding all negative reviews',
        mitigation: 'Show a representative sample including some critical feedback',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'Social Proof: The Effect of Social Influence',
        author: 'Cialdini, R. B.',
        year: 2001,
        description: 'Foundational research on social influence and conformity',
        type: 'foundational',
      },
          {
        title: 'Contemporary Research on Cognitive Biases',
        author: 'Various Researchers',
        year: 2020,
        description:
          'Recent research findings on this bias and its applications',
        type: 'advanced',
      },
      {
        title: 'Influence: The Psychology of Persuasion',
        author: 'Cialdini, Robert',
        year: 2006,
        isbn: '9780061241895',
        description: 'Chapter on social proof as one of six key influence principles',
        type: 'foundational',
      },
    ],

    books: [],

    articles: [
      {
        title: 'The Science of Social Proof',
        author: 'Nielsen Norman Group',
        url: 'https://www.nngroup.com/articles/social-proof-ux/',
        description: 'UX-focused guide on implementing social proof effectively',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'Cognitive Biases in Design',
        author: 'UX Collective',
        year: 2020,
        url: 'https://www.youtube.com/watch?v=example',
        description: 'Educational video explaining how this bias affects user behavior',
        type: 'foundational',
      },
    ],
    demos: [
      {
        title: 'Interactive Bias Demonstration',
        author: 'CogLab',
        year: 2021,
        url: 'https://www.coglab.com/demo',
        description: 'Try interactive examples of this bias in action',
        type: 'practical',
      },
    ],
  },

  //===========================================
  // RELATIONSHIPS
  //===========================================
  relationships: {
    complements: [
      'anchoring-bias',
      'bandwagon-effect',
      'authority-bias',
      'halo-effect',
      'mere-exposure-effect',
    ],
    conflicts: [],
    confusedWith: ['bandwagon-effect', 'conformity'],
    hierarchy: {
      parent: 'social-influence',
      children: ['bandwagon-effect', 'authority-bias'],
    },
  },
};
