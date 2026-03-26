/**
 * SOURCE CONFUSION (Source Monitoring Error)
 *
 * We remember information but forget where it came from,
 * misattributing the source of a memory.
 */

import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const sourceConfusion: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'source-confusion',
    name: 'Source Confusion',
    aliases: ['Source Monitoring Error', 'Source Misattribution', 'Cryptomnesia'],
    category: BiasCategory.MEMORY,
    relatedCategories: [
      BiasCategory.DECISION_MAKING,
      BiasCategory.PERCEPTION,
    ],
    tags: [
      'memory',
      'attribution',
      'source-monitoring',
      'content-origin',
      'trust',
      'credibility',
      'misinformation',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple:
      'People remember information but forget or misattribute where, when, or how they originally learned it.',

    detailed: `Source confusion (also called source monitoring error) is a memory bias in which a person correctly recalls a piece of information but incorrectly attributes its origin. The brain stores content and context separately, and retrieval can reconnect them incorrectly — causing someone to confuse whether they read, heard, imagined, or directly experienced something.

This matters enormously in digital interfaces because users consume content from many sources simultaneously: official documentation, user-generated posts, AI-generated text, advertisements, editorial content, and social media shares. Without clear source labeling, users may attribute a piece of content to the wrong author, platform, or level of authority.

In UX design, source confusion affects how users evaluate credibility, trust brands, and make decisions based on information they cannot trace back to its origin. Designers must provide clear, persistent source attribution to help users maintain accurate mental models of where their knowledge comes from.`,

    psychologyBasis: {
      discoveredBy: 'Marcia K. Johnson, Shahin Hashtroudi, and D. Stephen Lindsay',
      year: 1993,
      theory: 'Source Monitoring Framework',
      mechanism: `The brain does not store memories with a simple "source tag." Instead, source attribution is a judgment made at retrieval time, based on characteristics of the memory. This process fails because:

1. **Separate Storage**: Content and source metadata are encoded in different brain regions and can become dissociated over time
2. **Familiarity Without Recollection**: Information can feel familiar (semantic memory) while the episodic context of learning it fades
3. **Similarity-Based Confusion**: When two sources share features (e.g., both are text on a screen), they become harder to distinguish in memory
4. **Imagination Inflation**: Vividly imagining an event can later be confused with actually experiencing it
5. **Sleeper Effect**: Over time, the persuasiveness of a message persists while the memory of its (low-credibility) source fades

Source monitoring is effortful — people default to accepting information as valid unless they actively retrieve and evaluate its origin.`,
    },

    realWorldExample: `In Johnson, Hashtroudi, and Lindsay's (1993) foundational research, participants who read statements attributed to both trustworthy and untrustworthy sources initially discounted claims from the untrustworthy source. However, after a delay, they remembered the claims but forgot the source — and began treating previously discounted claims as credible. This "sleeper effect" demonstrates how source confusion can transform distrusted information into believed information over time.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `Source confusion affects how users attribute, trust, and act on information in digital interfaces. Designers must consider:

- How clearly content is labeled with its origin (official, user-generated, AI-generated, sponsored)
- Whether brand voice and visual identity remain consistent across channels so users correctly attribute experiences
- How cross-platform messaging maintains traceability so users know where they learned something
- Whether citation and attribution patterns are clear enough to survive in users' memories
- How AI-generated content is distinguished from human-authored content`,

    whenToUse: [
      {
        title: 'Content Source Labels',
        scenario:
          'When displaying content from multiple sources in a single interface',
        example:
          'Tag each piece of content with a persistent, visible source label: "Official", "Community", "AI-Generated", or "Sponsored"',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Brand Consistency Across Touchpoints',
        scenario: 'When users interact with your product across email, web, mobile, and third-party integrations',
        example:
          'Maintain consistent visual identity, tone, and attribution so users correctly remember which experiences came from your brand',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'User-Generated vs Official Content',
        scenario: 'When mixing editorial content with community contributions on the same page',
        example:
          'Use distinct visual treatments — background colors, border styles, author badges — to separate official from user-generated content',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'AI-Generated Content Disclosure',
        scenario: 'When AI produces or assists in content creation',
        example:
          'Add clear "Generated by AI" or "AI-assisted" labels that persist with the content as it is shared or referenced',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: '"Via" Attribution Chains',
        scenario: 'When content is shared, reposted, or aggregated from other platforms',
        example:
          'Show "via @originalauthor" or "Originally published on [Source]" to preserve the attribution chain',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Citation Design in Knowledge Bases',
        scenario: 'When presenting factual claims that users may later repeat or act on',
        example:
          'Inline citations with expandable source details so users can verify and remember where information came from',
        impact: ImpactLevel.HIGH,
      },
    ],

    whenToAvoid: [
      {
        title: 'Over-Labeling Homogeneous Content',
        reason:
          'When all content genuinely comes from one authoritative source, excessive labels add clutter',
        consequence:
          'Users experience label fatigue and start ignoring source indicators entirely',
        alternative:
          'Establish brand identity clearly at the page/section level rather than labeling every paragraph',
      },
      {
        title: 'Source Labels as Credibility Shortcuts',
        reason:
          'Users may over-rely on source labels and skip evaluating content quality',
        consequence:
          'An "Official" label on poor content still gets trusted; a "Community" label on excellent content gets dismissed',
        alternative:
          'Combine source labels with quality signals (verified, peer-reviewed, editor-approved)',
      },
      {
        title: 'Cross-Platform Attribution That Breaks Privacy',
        reason:
          'Tracking content provenance can reveal user behavior across platforms',
        consequence:
          'Users feel surveilled when attribution reveals how content traveled through private channels',
        alternative:
          'Attribute to the publishing source, not the sharing chain, when privacy is at stake',
      },
    ],

    commonMistakes: [
      {
        title: 'Mixing Content Sources Without Visual Distinction',
        description:
          'Displaying official content, user reviews, sponsored posts, and AI summaries with identical styling',
        why: 'Users cannot distinguish sources and may attribute marketing claims to editorial content, or treat AI output as expert opinion',
        fix: 'Use consistent, distinct visual treatments for each content source: background colors, icons, borders, and explicit labels',
      },
      {
        title: 'Inconsistent Brand Voice Across Channels',
        description:
          'Using different tone, terminology, or visual identity in email vs app vs website',
        why: 'Users forget which channel they encountered information in, and inconsistency makes them unsure whether it came from your brand at all',
        fix: 'Establish a unified design language and tone of voice across all touchpoints, with consistent use of design tokens',
      },
      {
        title: 'Ephemeral Attribution',
        description:
          'Showing source labels only on first view, in tooltips, or in contexts that disappear (toasts, modals)',
        why: 'Source information must be available at the moment of recall, not just the moment of first encounter',
        fix: 'Make source attribution persistent and visible alongside content wherever it appears, including in saved, shared, and exported states',
      },
      {
        title: 'Failing to Label AI-Generated Content',
        description:
          'Presenting AI outputs (summaries, recommendations, generated text) without disclosure',
        why: 'Users will attribute AI-generated content to human experts or the brand itself, creating false authority',
        fix: 'Always label AI-generated or AI-assisted content with a clear, standardized indicator that persists through sharing',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.HIGH,
        description:
          'Layout determines how clearly content sources are separated and attributed',
        examples: [
          'Distinct content zones for official vs community vs sponsored content',
          'Persistent source headers on content cards and feed items',
          'Visual separation between editorial and user-generated sections',
          'Sidebar attribution panels for reference content',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Typography can signal content origin and authority level',
        examples: [
          'Distinct typefaces or weights for official vs community content',
          'Source labels in consistent, legible type treatments',
          'Citation styling that is scannable and memorable',
          'Author bylines with consistent formatting across content types',
        ],
      },
      color: {
        level: ImpactLevel.HIGH,
        description:
          'Color coding is one of the strongest tools for source differentiation',
        examples: [
          'Consistent background tint for user-generated content (e.g., light yellow)',
          'Border or accent color for AI-generated content (e.g., purple)',
          'Sponsored content with a distinct background shade',
          'Official content using brand primary colors, community using neutral tones',
        ],
      },
      interaction: {
        level: ImpactLevel.MEDIUM,
        description:
          'Interactive patterns affect how users discover and remember source information',
        examples: [
          'Hover/focus states that reveal full source attribution',
          'Expandable citation panels for detailed provenance',
          'Source filters that let users view content by origin',
          'Copy-to-clipboard that preserves attribution metadata',
        ],
      },
      content: {
        level: ImpactLevel.CRITICAL,
        description:
          'Content strategy is the primary lever for preventing source confusion',
        examples: [
          'Clear bylines with author role and credentials',
          '"Via" attribution on shared or aggregated content',
          'Inline citations with links to original sources',
          'Content type labels: "Editorial", "Community Post", "AI Summary", "Sponsored"',
        ],
      },
      accessibility: {
        level: ImpactLevel.HIGH,
        description:
          'Source attribution must be available to all users, including those using assistive technology',
        examples: [
          'ARIA labels that announce content source (e.g., "User-generated review")',
          'Screen reader announcements for content type transitions',
          'Source information not conveyed solely through color',
          'Keyboard-accessible source detail expandables',
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
        title: 'Clear Source Labels on Mixed Content',
        description:
          'Knowledge base displaying official docs, community answers, and AI summaries with distinct visual treatments',
        code: `<div class="content-feed">
  <article class="content-card content-card--official">
    <header class="source-label">
      <span class="source-badge source-badge--official">Official Documentation</span>
      <span class="author">Engineering Team</span>
      <time>Updated Mar 2026</time>
    </header>
    <h3>API Rate Limiting</h3>
    <p>All API endpoints are rate-limited to 1,000 requests per minute per API key...</p>
  </article>

  <article class="content-card content-card--community">
    <header class="source-label">
      <span class="source-badge source-badge--community">Community Answer</span>
      <span class="author">@dev_sarah</span>
      <time>2 days ago</time>
    </header>
    <h3>Handling Rate Limit Errors</h3>
    <p>I found that implementing exponential backoff with jitter works best...</p>
  </article>

  <article class="content-card content-card--ai">
    <header class="source-label">
      <span class="source-badge source-badge--ai">AI-Generated Summary</span>
      <span class="model">Based on 47 community posts</span>
    </header>
    <h3>Common Rate Limiting Patterns</h3>
    <p>Community consensus suggests three main approaches to handling rate limits...</p>
  </article>
</div>`,
        explanation:
          'Each content card clearly identifies its source through persistent labels, distinct visual treatments, and author attribution. Users can immediately distinguish official documentation from community contributions from AI-generated summaries.',
        principle:
          'Persistent, visually distinct source labels prevent misattribution of content authority',
        metrics: {
          before: '41% of users incorrectly attributed community advice to official docs',
          after: '8% misattribution rate with clear source labels',
          improvement: '80% reduction in source misattribution',
        },
      },
      {
        title: 'Via Attribution on Shared Content',
        description:
          'Social feed preserving attribution chain when content is reshared',
        code: `<article class="shared-post">
  <header class="share-attribution">
    <img src="resharer-avatar.jpg" alt="">
    <div class="share-meta">
      <span class="resharer">Alex Kim shared</span>
      <time>3 hours ago</time>
    </div>
  </header>

  <div class="original-content">
    <header class="original-attribution">
      <img src="original-avatar.jpg" alt="">
      <div class="original-meta">
        <span class="original-author">Dr. Maria Santos</span>
        <span class="original-source">via Research Digest</span>
        <time>Originally published Jan 15, 2026</time>
      </div>
    </header>
    <p>New meta-analysis confirms that spaced repetition improves
    long-term retention by 150% compared to massed practice...</p>
    <footer class="citation">
      <a href="#" class="source-link">View original article on Research Digest</a>
    </footer>
  </div>
</article>`,
        explanation:
          'The full attribution chain is preserved: who shared it, who originally authored it, where it was originally published, and when. Users can trace the content back to its authoritative source.',
        principle:
          'Attribution chains preserve provenance through resharing, preventing source loss',
      },
      {
        title: 'AI Content Disclosure with Persistent Label',
        description:
          'Chat interface clearly distinguishing AI-generated responses from human support',
        code: `<div class="chat-thread">
  <div class="message message--human-agent">
    <div class="message-source">
      <img src="agent-photo.jpg" alt="">
      <span class="agent-name">Jordan (Support Team)</span>
      <span class="badge badge--human">Human Agent</span>
    </div>
    <p>Let me look into your billing issue. I see the charge on your account.</p>
  </div>

  <div class="message message--ai">
    <div class="message-source">
      <span class="ai-icon" aria-hidden="true"></span>
      <span class="agent-name">AI Assistant</span>
      <span class="badge badge--ai">AI-Generated</span>
    </div>
    <p>Based on your account history, here is a summary of recent charges...</p>
    <footer class="ai-disclosure">
      <small>This response was generated by AI and may contain errors.
      <a href="#">Verify with a human agent</a></small>
    </footer>
  </div>
</div>`,
        explanation:
          'Each message clearly identifies whether it came from a human agent or an AI system. The AI disclosure persists with the message and includes a path to human verification.',
        principle:
          'AI content must be labeled at the point of display, not just at the point of generation',
      },
    ],

    bad: [
      {
        title: 'Mixed Sources Without Attribution',
        description:
          'Product page blending marketing copy, user reviews, and AI summaries with identical styling',
        code: `<!-- DON'T DO THIS -->
<div class="product-info">
  <p>This is the most advanced widget on the market, trusted by
  thousands of professionals worldwide.</p>

  <p>I've been using this for 6 months and it changed my workflow
  completely. Best purchase I've made.</p>

  <p>Analysis of 2,847 reviews indicates an average satisfaction
  score of 4.7/5 with primary praise for ease of use.</p>

  <p>Industry-leading performance with 99.9% uptime guarantee.</p>
</div>`,
        explanation:
          'Marketing copy, a user review, an AI-generated summary, and a product claim are displayed identically. Users cannot tell which is the company speaking, which is a real user, and which is AI-generated. This leads to misattribution of credibility.',
        principle:
          'Identical styling across different content sources guarantees source confusion',
      },
      {
        title: 'Disappearing Attribution',
        description:
          'Source information shown only in a toast notification that auto-dismisses',
        code: `<!-- DON'T DO THIS -->
<div class="search-results">
  <div class="result">
    <h3>How to Reset Your Password</h3>
    <p>Navigate to Settings > Security > Reset Password...</p>
    <!-- Source only shown in a 3-second toast on first load -->
  </div>
</div>

<script>
  showToast("Some results are AI-generated", { duration: 3000 });
</script>`,
        explanation:
          'The AI-generated disclosure disappears after 3 seconds. When users later recall this information, they will attribute it to official documentation because there is no persistent source indicator.',
        principle:
          'Ephemeral attribution is equivalent to no attribution — source labels must persist',
      },
      {
        title: 'Sponsored Content Disguised as Editorial',
        description:
          'Paid placement styled identically to editorial articles',
        code: `<!-- DON'T DO THIS -->
<article class="article">
  <h2>10 Best Project Management Tools for 2026</h2>
  <p>After extensive testing, we recommend ToolX as the clear winner...</p>
  <small style="color: #ccc; font-size: 0.6em;">Sponsored by ToolX</small>
</article>`,
        explanation:
          'The "Sponsored" label is minimized to near-invisibility. Users will remember this as an editorial recommendation, not a paid advertisement. This is a deliberate exploitation of source confusion.',
        principle:
          'Minimizing sponsorship disclosure exploits source confusion to deceive users',
      },
    ],

    realWorld: [
      {
        company: 'Wikipedia',
        product: 'Citation System',
        description: 'Wikipedia uses inline numbered citations that link to a detailed references section. Every factual claim is tied to a verifiable source, helping readers trace information provenance and avoid misattribution.',
        effectiveness: 'very-effective',
        analysis: 'Wikipedia\'s citation system is one of the most effective source attribution designs at scale. The persistent, inline nature of citations means users always see the source alongside the claim, reducing source confusion when they later recall the information.',
      },
      {
        company: 'Twitter/X',
        product: 'Community Notes',
        description: 'Community Notes adds crowdsourced context directly below tweets that may be misleading. The distinct visual treatment (different background, "Readers added context" label) clearly separates the annotation from the original content.',
        effectiveness: 'effective',
        analysis: 'By visually distinguishing the correction from the original post and labeling its community origin, the feature helps users maintain separate memory traces for the claim and its evaluation.',
      },
      {
        company: 'Google',
        product: 'AI Overviews in Search',
        description: 'Google labels AI-generated search summaries with an "AI Overview" badge and lists source URLs. This distinguishes AI-synthesized answers from organic search results and direct website content.',
        effectiveness: 'effective',
        analysis: 'The AI Overview label helps users understand they are reading a synthesis rather than a direct quote. However, the sources listed below are sometimes not salient enough, and users may still misattribute the AI summary to the cited sources verbatim.',
      },
      {
        company: 'Substack',
        product: 'Restack Attribution',
        description: 'When a writer "restacks" (shares) another author\'s post, Substack shows the full attribution chain: who restacked it, the original author, and the original publication. The original content retains its visual identity.',
        effectiveness: 'effective',
        analysis: 'Preserving the original publication\'s branding within the restack helps users correctly attribute content to its original author rather than the person who shared it.',
      },
    ],

    abTests: [
      {
        title: 'Source Labels on Mixed Content: Labeled vs Unlabeled',
        hypothesis:
          'Adding persistent source labels will reduce content misattribution and increase user trust',
        controlVersion: {
          description:
            'Help center mixing official docs and community answers with identical styling, no source labels',
          metrics: {
            conversionRate: '52%',
            timeOnPage: '2:10',
            scrollDepth: '55%',
          },
        },
        treatmentVersion: {
          description:
            'Same content with persistent source badges ("Official", "Community", "AI Summary") and distinct background colors per source type',
          metrics: {
            conversionRate: '61%',
            timeOnPage: '2:45',
            scrollDepth: '72%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Source labels increased task completion by 17%. Users spent more time reading and explored deeper. In post-task surveys, 78% of treatment users correctly identified content sources vs 34% in control. Trust scores increased by 23%.',
          learnings: [
            'Users actively want to know where content comes from',
            'Source labels increase engagement, not decrease it',
            'Correct attribution correlated strongly with task completion',
            'Users in control group frequently misattributed community advice to official documentation',
          ],
        },
      },
      {
        title: 'AI Disclosure: Persistent Label vs One-Time Banner',
        hypothesis:
          'Persistent per-item AI labels will produce better source recall than a one-time page banner',
        controlVersion: {
          description:
            'Single banner at top of page: "Some content on this page is AI-generated"',
          metrics: {
            conversionRate: '45%',
            clickThroughRate: '18%',
          },
        },
        treatmentVersion: {
          description:
            'Individual "AI-Generated" badge on each AI-produced content block, with tooltip showing model and confidence',
          metrics: {
            conversionRate: '44%',
            clickThroughRate: '25%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Per-item labels had no negative effect on conversion but increased source recall from 22% to 71% in follow-up surveys. Users clicked through to verify AI content 39% more often.',
          learnings: [
            'Page-level disclosure is forgotten almost immediately — source confusion kicks in',
            'Per-item labels create stronger memory associations between content and source',
            'Users appreciate granular disclosure and do not find it intrusive',
            'Persistent labels support the effortful source monitoring process that prevents misattribution',
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
        name: 'Missing Source Labels',
        description:
          'Content displayed without any indication of its origin, author, or content type',
        howToSpot:
          'Look for text blocks, cards, or feed items with no byline, badge, or source indicator',
        severity: ImpactLevel.CRITICAL,
      },
      {
        name: 'Identical Styling Across Sources',
        description:
          'Official, community, AI, and sponsored content rendered with the same visual treatment',
        howToSpot:
          'Compare the styling of different content types — if they look identical, source confusion is likely',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Ephemeral Attribution',
        description:
          'Source information shown only temporarily (toasts, tooltips, modals) that disappears',
        howToSpot:
          'Check if source labels persist when scrolling, navigating, or returning to content',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Minimized Sponsorship Disclosure',
        description:
          'Sponsored or paid content labels that are visually de-emphasized (tiny text, low contrast, distant placement)',
        howToSpot:
          'Look for "Sponsored", "Ad", or "Paid" labels and check if they are legible and prominent',
        severity: ImpactLevel.CRITICAL,
      },
      {
        name: 'Unlabeled AI Content',
        description:
          'AI-generated or AI-assisted content presented without disclosure',
        howToSpot:
          'Check if AI-generated summaries, recommendations, or responses are labeled as such',
        severity: ImpactLevel.CRITICAL,
      },
    ],

    patterns: [
      {
        name: 'Content Mixing Pattern',
        description: 'Multiple content sources displayed in a single feed or page without differentiation',
        indicators: [
          'Official and community content in the same list',
          'AI summaries adjacent to human-written content',
          'Sponsored posts in editorial feeds',
          'Aggregated content from multiple external sources',
        ],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Attribution Chain Loss',
        description: 'Content that has been shared or aggregated loses its original source information',
        indicators: [
          'Reshared posts without "via" attribution',
          'Aggregated content without source links',
          'Screenshots of text without original author',
          'Quotes without citation',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Brand Voice Inconsistency',
        description: 'Product uses different visual identity or tone across channels, making attribution difficult',
        indicators: [
          'Different logos or color schemes across platforms',
          'Varying tone of voice in email vs app vs website',
          'Inconsistent component styling across touchpoints',
          'Third-party integrations that break brand continuity',
        ],
        severity: ImpactLevel.MEDIUM,
        confidence: 'medium',
      },
      {
        name: 'AI Disclosure Gap',
        description: 'AI-generated content lacks clear, persistent identification',
        indicators: [
          'Chat responses without human/AI distinction',
          'Auto-generated summaries without labels',
          'AI recommendations styled as editorial picks',
          'Generated images without provenance metadata',
        ],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
    ],

    checklistQuestions: [
      'Can users immediately identify the source of every piece of content on this page?',
      'Are official, community, AI-generated, and sponsored content visually distinct from each other?',
      'Do source labels persist when content is scrolled, saved, shared, or exported?',
      'Is AI-generated content clearly and persistently labeled?',
      'When content is reshared, is the original author and source preserved?',
      'Is sponsored or paid content disclosed prominently and durably?',
      'Is brand identity consistent enough across channels that users correctly attribute experiences?',
      'Can screen reader users identify content sources through ARIA labels?',
      'If users recall this information later, will they remember where it came from?',
      'Are citation or source links accessible and functional at all times?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in source monitoring and source confusion (source misattribution).

Analyze the provided design for source confusion risks. Identify:

1. **Content Source Clarity**: How clearly is each piece of content attributed to its origin?
2. **Source Differentiation**: Are different content types (official, community, AI, sponsored) visually distinct?
3. **Attribution Persistence**: Do source labels persist across views, sharing, and export?
4. **AI Disclosure**: Is AI-generated content clearly identified?
5. **Brand Consistency**: Is the brand identity consistent enough for correct attribution across channels?

For each issue found:
- Identify what content is at risk of misattribution
- Assess who might be harmed (users, original authors, the brand)
- Determine the severity of potential misattribution
- Evaluate regulatory implications (FTC, EU AI Act, etc.)
- Suggest specific improvements with implementation details

Consider:
- Will users remember where this information came from a week later?
- Could source confusion cause users to over-trust or under-trust content?
- Is there a risk that sponsored content will be remembered as editorial?
- Are AI outputs distinguishable from human-authored content?
- Does the attribution chain survive resharing?

Provide actionable recommendations for reducing source confusion.`,

    outputSchema: {
      type: 'object',
      properties: {
        sourceConfusionRisks: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              contentType: { type: 'string' },
              location: { type: 'string' },
              currentAttribution: { type: 'string' },
              misattributionRisk: { type: 'string' },
              severity: { type: 'string' },
              recommendation: { type: 'string' },
            },
            required: [
              'contentType',
              'location',
              'misattributionRisk',
              'severity',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            attributionClarity: { type: 'number' },
            sourceDifferentiation: { type: 'number' },
            attributionPersistence: { type: 'number' },
            aiDisclosureScore: { type: 'number' },
          },
          required: [
            'attributionClarity',
            'sourceDifferentiation',
            'attributionPersistence',
            'aiDisclosureScore',
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
        'sourceConfusionRisks',
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
        title: 'Audit Content Sources',
        description:
          'Identify every distinct source of content in your interface: official, community, AI-generated, sponsored, third-party, user-submitted',
        example:
          'Content inventory: 4 sources — editorial team, community forum, AI summarizer, sponsored partners',
        tips: [
          'Map every content type to its origin',
          'Include indirect sources like aggregated or reshared content',
          'Document which sources users are most likely to confuse',
        ],
      },
      {
        step: 2,
        title: 'Design Distinct Visual Treatments',
        description:
          'Create visually distinct styles for each content source using design tokens',
        example:
          'Official: brand-primary background. Community: neutral-100 background with community icon. AI: purple-50 background with AI badge. Sponsored: yellow-50 background with "Sponsored" label.',
        tips: [
          'Use multiple visual channels: color, icons, labels, borders',
          'Do not rely on color alone — ensure labels are textual',
          'Keep treatments consistent across the entire product',
        ],
      },
      {
        step: 3,
        title: 'Implement Persistent Source Labels',
        description:
          'Add source badges or bylines that remain visible in all contexts: feed, detail view, saved items, exports, shares',
        example:
          'Every content card has a non-removable source badge in its header, encoded in both visual and semantic HTML',
        tips: [
          'Source labels should survive copy-paste, export, and screenshot',
          'Test that labels appear in email digests and notifications',
          'Include source info in structured data and meta tags',
        ],
      },
      {
        step: 4,
        title: 'Preserve Attribution Chains',
        description:
          'When content is reshared or aggregated, maintain the full chain from original author through intermediaries',
        example:
          '"Shared by Alex Kim. Originally by Dr. Maria Santos via Research Digest (Jan 2026)"',
        tips: [
          'Store attribution metadata alongside content',
          'Display both the sharer and the original author',
          'Link back to the original source when possible',
        ],
      },
      {
        step: 5,
        title: 'Test Source Recall',
        description:
          'Measure whether users can correctly identify content sources after a delay',
        example:
          'Show users content, then 24 hours later ask: "Where did you learn that the API rate limit is 1,000 requests per minute?"',
        tips: [
          'Test recall after delays (1 hour, 1 day, 1 week)',
          'Compare source attribution accuracy across design variants',
          'Pay special attention to AI vs human content confusion',
        ],
      },
    ],

    dos: [
      'Label every piece of content with its source type (official, community, AI, sponsored)',
      'Use visually distinct treatments for different content sources',
      'Make source labels persistent across all views and contexts',
      'Preserve attribution chains when content is shared or aggregated',
      'Disclose AI-generated content clearly and prominently',
      'Maintain consistent brand identity across all channels',
      'Include source information in structured data and accessibility labels',
      'Test source recall with real users after realistic delays',
    ],

    donts: [
      'Don\'t display content from multiple sources with identical styling',
      'Don\'t use ephemeral disclosure (toasts, tooltips) as the only source indicator',
      'Don\'t minimize sponsorship or advertising labels',
      'Don\'t present AI-generated content as human-authored',
      'Don\'t strip attribution when content is reshared or aggregated',
      'Don\'t rely on color alone to distinguish content sources',
      'Don\'t assume users will remember source context from their first encounter',
      'Don\'t use inconsistent brand identity across channels',
    ],

    bestPractices: [
      {
        title: 'Source Badge System',
        description:
          'Create a standardized set of source badges used consistently across the entire product',
        rationale:
          'Consistent badges become recognizable over time, supporting faster and more accurate source monitoring',
        example:
          'Badge components: <source-badge type="official">, <source-badge type="community">, <source-badge type="ai">, <source-badge type="sponsored">',
      },
      {
        title: 'Layered Attribution',
        description:
          'Provide source information at multiple levels: quick scan (badge), medium detail (byline), and full detail (expandable provenance)',
        rationale:
          'Different tasks require different levels of source verification; layered attribution supports all of them',
        example:
          'Badge: "Community" | Byline: "@dev_sarah, 2 days ago" | Expanded: "Posted in #api-help, 47 upvotes, verified by moderator"',
      },
      {
        title: 'Cross-Channel Brand Consistency',
        description:
          'Use the same design tokens, voice, and attribution patterns across web, mobile, email, and third-party integrations',
        rationale:
          'Consistent identity helps users correctly attribute experiences to your brand rather than confusing them with competitors or third parties',
        example:
          'Same --cg-* token values, same component library, same tone of voice across all platforms',
      },
      {
        title: 'Attribution-Preserving Sharing',
        description:
          'When users share, export, or copy content, automatically include source metadata',
        rationale:
          'Source information is most valuable downstream — when content is consumed outside its original context',
        example:
          'Copy button appends "Source: [Author] via [Platform], [Date]" to clipboard content',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships - Source attribution must be programmatically determinable',
        implementation:
          'Use ARIA labels on content containers (aria-label="Community post by @dev_sarah") and semantic HTML (article, cite, blockquote with cite attribute)',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.4.1',
        guideline:
          'Use of Color - Don\'t rely solely on color to indicate content source',
        implementation:
          'Combine background color with text labels, icons, and ARIA labels so source information is available to all users',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.4.3',
        guideline:
          'Contrast - Source labels must be legible with sufficient contrast',
        implementation:
          'Source badges and labels must meet 4.5:1 contrast ratio. Do not use low-contrast text for sponsored or AI disclosure labels.',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.4.6',
        guideline:
          'Headings and Labels - Use descriptive labels for content source sections',
        implementation:
          'Section headings like "Official Documentation", "Community Answers", "AI-Generated Summary" help all users navigate by source',
      },
    ],

    ethics: [
      {
        concern: 'Disguised Advertising',
        severity: 'critical',
        explanation:
          'Styling sponsored or paid content identically to editorial content exploits source confusion to deceive users',
        mitigation:
          'Use prominent, persistent "Sponsored" or "Ad" labels with distinct visual treatment. Follow FTC endorsement guidelines.',
      },
      {
        concern: 'Undisclosed AI Content',
        severity: 'critical',
        explanation:
          'Presenting AI-generated content as human-authored creates false authority and may violate emerging AI transparency regulations',
        mitigation:
          'Label all AI-generated or AI-assisted content clearly. Include model information and confidence levels where appropriate.',
      },
      {
        concern: 'Attribution Stripping',
        severity: 'high',
        explanation:
          'Removing or obscuring original authorship when aggregating or resharing content harms creators and misleads users',
        mitigation:
          'Always preserve and display original author and source. Link back to original content when possible.',
      },
      {
        concern: 'Authority Laundering',
        severity: 'high',
        explanation:
          'Presenting low-credibility information alongside high-credibility sources so it borrows unearned authority',
        mitigation:
          'Maintain clear visual separation between content of different authority levels. Use distinct zones or sections.',
      },
      {
        concern: 'Sleeper Effect Exploitation',
        severity: 'medium',
        explanation:
          'Knowing that users will forget the source over time, intentionally presenting low-credibility claims where they will be remembered without their source',
        mitigation:
          'Design for long-term source recall: persistent labels, repeated attribution, and source information in saved/bookmarked content.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'Source Monitoring',
        author: 'Johnson, M. K., Hashtroudi, S., & Lindsay, D. S.',
        year: 1993,
        doi: '10.1037/0033-2909.114.1.3',
        description:
          'The foundational paper establishing the Source Monitoring Framework, explaining how people attribute the origins of memories',
        type: 'foundational',
      },
      {
        title: 'Reality Monitoring and Source Monitoring',
        author: 'Lindsay, D. S., & Johnson, M. K.',
        year: 2000,
        description:
          'Updated review of source monitoring research, including applications to eyewitness testimony and false memories',
        type: 'foundational',
      },
      {
        title: 'Source Monitoring',
        author: 'Mitchell, K. J., & Johnson, M. K.',
        year: 2009,
        doi: '10.1016/B978-012373951-2.50015-4',
        description:
          'Comprehensive chapter on source monitoring processes, failures, and neural substrates',
        type: 'advanced',
      },
      {
        title: 'The Sleeper Effect in Persuasion',
        author: 'Kumkale, G. T., & Albarracin, D.',
        year: 2004,
        doi: '10.1037/0033-2909.130.1.143',
        description:
          'Meta-analysis of the sleeper effect — how message persuasiveness persists while source memory fades',
        type: 'advanced',
      },
    ],

    books: [
      {
        title: 'The Seven Sins of Memory',
        author: 'Schacter, Daniel L.',
        year: 2001,
        isbn: '9780618219193',
        description:
          'Chapter on misattribution covers source confusion in depth, with real-world examples and implications',
        type: 'foundational',
      },
      {
        title: 'Memory Distortions and Their Prevention',
        author: 'Johnson, M. K.',
        year: 2006,
        description:
          'Review of how source monitoring failures lead to memory distortions and strategies for prevention',
        type: 'practical',
      },
    ],

    articles: [
      {
        title: 'Designing for Content Attribution in the Age of AI',
        author: 'Nielsen Norman Group',
        url: 'https://www.nngroup.com/articles/content-attribution/',
        description:
          'Practical UX guide to designing clear source attribution in interfaces that mix human and AI content',
        type: 'practical',
      },
      {
        title: 'FTC Endorsement Guides: What People Are Asking',
        author: 'Federal Trade Commission',
        url: 'https://www.ftc.gov/business-guidance/resources/ftc-endorsement-guides-what-people-are-asking',
        description:
          'Regulatory guidelines on disclosing sponsored content and endorsements',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'Source Monitoring and False Memories',
        author: 'Crash Course Psychology',
        url: 'https://www.youtube.com/watch?v=buhKyBMi_Ac',
        description:
          'Accessible explanation of how source monitoring failures contribute to false memories',
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
      'mere-exposure-effect', // Familiarity from repeated exposure can be misattributed
      'authority-bias', // Source confusion can create or destroy perceived authority
      'halo-effect', // Misattributed source can transfer positive/negative associations
      'confirmation-bias', // Users may attribute information to sources that confirm their beliefs
    ],

    conflicts: [
      'availability-heuristic', // Vivid source memories can prevent source confusion
    ],

    confusedWith: [
      'misinformation-effect', // Related but misinformation is about content distortion, not source
      'false-memory', // Source confusion can contribute to false memories but is distinct
      'cryptomnesia', // Forgetting you learned something and thinking you originated it
    ],

    hierarchy: {
      parent: 'memory-bias',
      children: [
        'cryptomnesia',
        'sleeper-effect',
        'reality-monitoring-error',
      ],
    },
  },
};
