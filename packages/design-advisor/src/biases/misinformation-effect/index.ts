/**
 * MISINFORMATION EFFECT
 *
 * Post-event information can alter memory of the original event.
 * Misleading information encountered after an experience changes recall.
 */

import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const misinformationEffect: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'misinformation-effect',
    name: 'Misinformation Effect',
    aliases: ['Post-Event Misinformation', 'Memory Conformity', 'Retroactive Interference'],
    category: BiasCategory.MEMORY,
    relatedCategories: [
      BiasCategory.DECISION_MAKING,
      BiasCategory.PERCEPTION,
    ],
    tags: [
      'memory',
      'recall',
      'messaging-consistency',
      'version-history',
      'correction',
      'trust',
      'information-integrity',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple:
      'Exposure to misleading information after an event distorts memory of the original event.',

    detailed: `The misinformation effect occurs when post-event information alters a person's memory of the original experience. Once new (often inaccurate) information is introduced after an event, it becomes integrated into the original memory, making it difficult or impossible to distinguish what was actually experienced from what was suggested later.

This effect demonstrates that human memory is reconstructive, not reproductive. Each time we recall an event, we rebuild it from fragments, and those fragments are vulnerable to contamination by information encountered between the event and the recall.

In UX design, the misinformation effect has critical implications for how users remember product experiences, feature capabilities, and past interactions. Inconsistent messaging across touchpoints (marketing, onboarding, support docs, changelogs) can overwrite users' accurate memories of what a product does or did. Designers must ensure messaging consistency, provide transparent version histories, and implement clear correction patterns when information changes.`,

    psychologyBasis: {
      discoveredBy: 'Elizabeth Loftus',
      year: 1974,
      theory: 'Reconstructive Memory / Post-Event Information Effect',
      mechanism: `Post-event information contaminates original memory traces through several mechanisms:

1. **Memory Trace Replacement**: New information overwrites the original memory trace, making the original irrecoverable
2. **Source Monitoring Failure**: People fail to distinguish between information from the original event and information encountered afterward
3. **Retrieval Interference**: Post-event information competes with original memory at retrieval, and the more recent or vivid version wins
4. **Social Conformity**: Information from authoritative or social sources is accepted and integrated uncritically
5. **Discrepancy Detection Failure**: When post-event information is subtly different from the original, people often fail to notice the discrepancy and simply adopt the newer version`,
    },

    realWorldExample: `In Loftus and Palmer's classic 1974 experiment, participants watched a film of a car accident. When asked "How fast were the cars going when they smashed into each other?" they estimated higher speeds than those asked about cars that "hit" each other. A week later, the "smashed" group was more likely to falsely report seeing broken glass (there was none). The verb used after the event altered their memory of the event itself.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `The misinformation effect directly impacts how users recall product experiences, feature behavior, and past interactions. Inconsistent information across touchpoints can overwrite accurate memories. Designers must:

- Maintain consistent feature descriptions and messaging across all surfaces
- Provide transparent changelogs and version histories so users can verify their memory
- Implement clear correction UX when previously communicated information changes
- Design fact-checking and source-attribution features to help users verify information
- Avoid post-experience messaging that contradicts what users actually encountered`,

    whenToUse: [
      {
        title: 'Consistent Feature Descriptions',
        scenario:
          'When describing product features across marketing, onboarding, docs, and in-app surfaces',
        example:
          'Use a single source of truth for feature descriptions that feeds all touchpoints, ensuring users never encounter contradictory information about what a feature does',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Changelog Transparency',
        scenario: 'When product behavior, features, or policies change over time',
        example:
          'Provide detailed, timestamped changelogs that acknowledge what changed and why, so users can reconcile their memory of past behavior with current behavior',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Error Correction Patterns',
        scenario: 'When correcting previously published incorrect information',
        example:
          'Display corrections inline with original content, clearly labeling what was wrong and what is now accurate, rather than silently updating',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Version History and Audit Trails',
        scenario: 'When users need to verify what they saw or did previously',
        example:
          'Provide accessible version history for documents, settings, and communications so users can confirm their recollections against actual records',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Onboarding Refresh After Updates',
        scenario: 'When significant product changes alter previously learned workflows',
        example:
          'Show contextual "what changed" tooltips in areas where workflows differ from what users previously learned, preventing memory contamination from outdated mental models',
        impact: ImpactLevel.MEDIUM,
      },
    ],

    whenToAvoid: [
      {
        title: 'Silent Content Updates',
        reason:
          'Silently changing content without notification overwrites users\' memory of original information',
        consequence:
          'Users distrust the platform when they notice discrepancies, or worse, act on altered information believing it to be the original',
        alternative:
          'Always flag content changes with timestamps, diff views, or correction notices',
      },
      {
        title: 'Contradictory Messaging Across Channels',
        reason:
          'Different descriptions of the same feature in marketing vs docs vs in-app create memory conflicts',
        consequence:
          'Users form inaccurate mental models, leading to confusion, support tickets, and churn',
        alternative:
          'Maintain a single source of truth for all feature descriptions with automated sync across channels',
      },
      {
        title: 'Retroactive Policy Changes Without Notice',
        reason:
          'Changing terms, policies, or pricing without clear notification distorts users\' understanding of their agreement',
        consequence:
          'Legal liability, erosion of trust, users feeling deceived when they realize changes were made',
        alternative:
          'Send explicit change notifications with clear before/after comparisons and effective dates',
      },
      {
        title: 'Manipulative Reframing of Past Events',
        reason:
          'Deliberately reframing a past negative experience (outage, bug, data loss) in misleading terms is unethical',
        consequence:
          'Short-term PR benefit but long-term trust destruction when users compare their memory against the reframing',
        alternative:
          'Acknowledge issues honestly and transparently, matching users\' actual experience',
      },
    ],

    commonMistakes: [
      {
        title: 'Inconsistent Feature Naming',
        description:
          'Calling the same feature different names across marketing, onboarding, docs, and settings',
        why: 'Each new name contaminates users\' memory of what the feature is called, making it unfindable and confusing',
        fix: 'Establish a product glossary and enforce consistent terminology across all touchpoints',
      },
      {
        title: 'Silent Bug Fix Without Acknowledgment',
        description:
          'Fixing a bug that users experienced but not acknowledging the original issue',
        why: 'Users who experienced the bug may doubt their own memory or lose trust when the issue is never acknowledged',
        fix: 'Include bug fixes in release notes with clear descriptions of what was wrong and what was corrected',
      },
      {
        title: 'Overwriting Help Docs Without Versioning',
        description:
          'Updating documentation to reflect new behavior without preserving previous versions',
        why: 'Users who learned from older docs can\'t verify whether the product changed or their memory is wrong',
        fix: 'Provide versioned documentation or clear "updated on" timestamps with change summaries',
      },
      {
        title: 'Post-Incident Spin',
        description:
          'Downplaying or reframing past incidents in follow-up communications',
        why: 'Users who experienced the incident will notice the discrepancy between their memory and the company\'s account, destroying trust',
        fix: 'Match post-incident communication to the severity users actually experienced; acknowledge impact honestly',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.MEDIUM,
        description:
          'Layout affects how correction and versioning information is presented relative to original content',
        examples: [
          'Inline corrections vs separate correction pages affect whether users update their memory',
          'Placement of "updated" badges near changed content helps users notice modifications',
          'Changelog positioning determines whether users encounter version history naturally',
          'Side-by-side before/after layouts make changes clear and verifiable',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Typography distinguishes original content from corrections and updates',
        examples: [
          'Strikethrough text for corrected information preserves the original alongside the correction',
          'Italic or differently styled "editor\'s note" annotations flag post-publication changes',
          'Timestamp typography establishes when information was current',
          'Distinct heading styles for "What changed" sections aid scanning',
        ],
      },
      color: {
        level: ImpactLevel.HIGH,
        description:
          'Color coding helps users distinguish original, updated, and corrected information',
        examples: [
          'Highlight colors for changed text in diff views make modifications visible',
          'Distinct background colors for correction notices separate them from original content',
          'Version status indicators (current vs archived) use color to convey recency',
          'Warning colors for deprecated or superseded information prevent reliance on outdated content',
        ],
      },
      interaction: {
        level: ImpactLevel.HIGH,
        description:
          'Interactions determine how users encounter corrections and verify their memories',
        examples: [
          'Expandable version history lets users compare current with past versions on demand',
          'Hover states showing "last updated" timestamps provide quick verification',
          'Undo/redo functionality lets users recover previous states they remember',
          'Notification interactions for content changes prompt users to update their understanding',
        ],
      },
      content: {
        level: ImpactLevel.CRITICAL,
        description:
          'Content consistency across touchpoints is the primary defense against the misinformation effect',
        examples: [
          'Single-source feature descriptions syndicated to all surfaces prevent contradictions',
          'Timestamped content lets users know when information was last verified',
          'Correction notices with clear "was X, now Y" language help users update memory accurately',
          'Transparent changelogs with rationale help users understand why information changed',
        ],
      },
      accessibility: {
        level: ImpactLevel.HIGH,
        description:
          'Correction and versioning information must be accessible to all users, regardless of ability',
        examples: [
          'Screen readers must announce correction status and change dates for updated content',
          'Visual diff highlights need text equivalents for non-visual users',
          'Version history navigation must be keyboard accessible',
          'Color-coded change indicators need non-color alternatives (icons, labels, ARIA states)',
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
        title: 'Transparent Changelog with Before/After',
        description:
          'Product changelog that clearly shows what changed, when, and why',
        code: `<section class="changelog">
  <h2>Changelog</h2>

  <article class="changelog-entry">
    <header>
      <time datetime="2026-03-15">March 15, 2026</time>
      <span class="badge">Feature Change</span>
    </header>
    <h3>Export format updated from CSV to XLSX</h3>
    <div class="change-detail">
      <div class="before">
        <span class="label">Previously</span>
        <p>Data exports were generated as CSV files</p>
      </div>
      <div class="after">
        <span class="label">Now</span>
        <p>Data exports are generated as XLSX files with formatting preserved</p>
      </div>
    </div>
    <p class="rationale">
      <strong>Why:</strong> CSV exports lost cell formatting and formulas.
      XLSX preserves your work. CSV export is still available under
      Advanced Options.
    </p>
  </article>
</section>`,
        explanation:
          'By clearly showing what changed, when, and why, users can reconcile their memory of past behavior with the new behavior. The "Previously / Now" pattern prevents memory contamination.',
        principle:
          'Transparent change documentation prevents memory distortion by giving users a verifiable record',
        metrics: {
          before: '47 support tickets per feature change asking "did this always work this way?"',
          after: '8 support tickets per feature change with transparent changelog',
          improvement: '83% reduction in memory-confusion support tickets',
        },
      },
      {
        title: 'Inline Content Correction Notice',
        description:
          'Blog post with visible correction that preserves the original claim',
        code: `<article class="blog-post">
  <h2>Q4 Performance Results</h2>

  <div class="correction-notice" role="note" aria-label="Correction">
    <strong>Correction (March 18, 2026):</strong>
    <p>This article originally stated revenue grew 34%. The correct
    figure is 24%. The error was due to a calculation that included
    non-recurring income. We regret the error.</p>
  </div>

  <p>Our Q4 results show revenue grew
    <span class="corrected">
      <del>34%</del>
      <ins>24%</ins>
    </span>
    year-over-year, driven by expansion in enterprise accounts.
  </p>
</article>`,
        explanation:
          'The correction preserves the original error alongside the fix, so readers who saw the original can understand exactly what changed. The semantic HTML (del/ins) communicates the change to assistive technology as well.',
        principle:
          'Visible corrections with preserved originals let users update their memory accurately rather than being silently misled',
      },
      {
        title: 'Feature Description Consistency System',
        description:
          'Single-source feature descriptions that appear identically across marketing, docs, and in-app',
        code: `<!-- Marketing page -->
<section class="feature" data-feature-id="smart-search">
  <h3>Smart Search</h3>
  <p class="feature-description">
    Find anything across your workspace using natural language.
    Smart Search understands context, synonyms, and partial matches.
  </p>
  <span class="last-verified">Description verified March 2026</span>
</section>

<!-- Help docs use same source -->
<article class="help-article" data-feature-id="smart-search">
  <h2>Using Smart Search</h2>
  <blockquote class="feature-definition" cite="/api/features/smart-search">
    Find anything across your workspace using natural language.
    Smart Search understands context, synonyms, and partial matches.
  </blockquote>
  <p>To use Smart Search, press Cmd+K or click the search icon...</p>
</article>`,
        explanation:
          'Both surfaces pull from the same canonical description. Users who read the marketing page and later consult the docs encounter identical language, reinforcing accurate memory rather than introducing contradictions.',
        principle:
          'Single-source content syndication eliminates cross-touchpoint contradictions that cause memory distortion',
      },
    ],

    bad: [
      {
        title: 'Silent Content Update',
        description:
          'Help article updated without any indication that content changed',
        code: `<!-- DON'T DO THIS -->
<!-- Original article said "Free plan includes 10 projects" -->
<!-- Silently changed to: -->
<article class="help-article">
  <h2>Free Plan Limits</h2>
  <p>The free plan includes 5 projects and 1 GB of storage.</p>
  <!-- No update date, no change notice, no version history -->
</article>`,
        explanation:
          'Users who read the original article remember "10 projects." When they hit the 5-project limit, they\'ll believe it\'s a bug or feel deceived. The silent update created a misinformation effect: the new content overwrites discoverable truth but not user memory.',
        principle:
          'Silent content changes create trust-destroying discrepancies between user memory and current reality',
      },
      {
        title: 'Contradictory Feature Descriptions',
        description:
          'Marketing page describes a feature differently than the in-app experience',
        code: `<!-- DON'T DO THIS -->
<!-- Marketing page: -->
<section class="feature-highlight">
  <h3>AI-Powered Analytics</h3>
  <p>Get real-time insights powered by machine learning.
  Our AI analyzes your data automatically and surfaces trends.</p>
</section>

<!-- Actual in-app experience: -->
<div class="analytics-panel">
  <h3>Analytics</h3>
  <p>View your usage statistics. Run reports manually
  to see trends over the past 30 days.</p>
  <button>Generate Report</button>
</div>`,
        explanation:
          'Marketing promises "real-time, automatic, AI-powered" but the product requires manual report generation. Users\' memory of the marketing claim contaminates their experience, making the actual product feel broken or misleading.',
        principle:
          'Cross-channel inconsistency is the most common source of misinformation effect in product design',
      },
      {
        title: 'Reframing a Past Incident',
        description:
          'Post-incident communication that downplays what users experienced',
        code: `<!-- DON'T DO THIS -->
<!-- Users experienced 6 hours of data loss and downtime -->
<!-- Post-incident email: -->
<div class="incident-email">
  <h3>Service Update</h3>
  <p>Earlier today, some users may have experienced brief
  intermittent connectivity issues. Our team quickly identified
  and resolved a minor service disruption. No data was affected.</p>
  <p>We apologize for any inconvenience.</p>
</div>`,
        explanation:
          'Users who lost 6 hours of work will immediately recognize the discrepancy between the company\'s "brief intermittent issues" framing and their actual experience. This attempted reframing destroys trust far more than honest acknowledgment would.',
        principle:
          'Deliberate post-event reframing backfires when it contradicts users\' lived experience',
      },
    ],

    realWorld: [
      {
        company: 'Wikipedia',
        product: 'Edit History',
        description: 'Wikipedia provides complete edit history for every article, showing every change, who made it, and when. Users can compare any two versions side by side. This transparency prevents the misinformation effect by making the evolution of information fully traceable.',
        effectiveness: 'very-effective',
        analysis: 'The edit history system is the gold standard for combating misinformation effect. Users can verify claims against historical versions, see when information was added or changed, and understand the provenance of every statement. The diff view makes changes visually obvious.',
      },
      {
        company: 'Twitter/X',
        product: 'Community Notes (Birdwatch)',
        description: 'Community Notes adds crowdsourced context to potentially misleading tweets. Rather than removing content, it preserves the original alongside corrections, helping users update their understanding without relying on silent deletion.',
        effectiveness: 'effective',
        analysis: 'By keeping the original post visible alongside corrections, Community Notes addresses the misinformation effect at the point of encounter. Users see both the claim and the correction, reducing the chance that the original misinformation overwrites accurate knowledge.',
      },
      {
        company: 'Google Docs',
        product: 'Version History',
        description: 'Google Docs provides granular version history showing every edit, who made it, and when. Users can restore previous versions or view changes highlighted in the document. This prevents collaborative misinformation where one editor\'s changes alter another\'s understanding.',
        effectiveness: 'very-effective',
        analysis: 'In collaborative editing, the misinformation effect is a constant risk: one person changes a figure and others\' memory of the original is overwritten. Version history gives teams a verifiable record to check against their recollections.',
      },
      {
        company: 'Apple',
        product: 'App Update Notes',
        description: 'App Store update notes describe what changed in each version. Well-written update notes (like those from apps such as Bear or Fantastical) explain what is different and why, helping users reconcile their memory of previous behavior with the new version.',
        effectiveness: 'effective',
        analysis: 'When apps change behavior without clear update notes, users experience the misinformation effect: they remember how something worked, encounter different behavior, and can\'t determine whether their memory is wrong or the app changed. Clear notes resolve this ambiguity.',
      },
    ],

    abTests: [
      {
        title: 'Feature Change Communication: Silent Update vs Transparent Changelog',
        hypothesis:
          'Transparent changelogs will reduce confusion-related support tickets and increase trust scores',
        controlVersion: {
          description:
            'Feature behavior changed with no notification or changelog entry. Help docs silently updated to reflect new behavior.',
          metrics: {
            conversionRate: 'N/A',
            timeOnPage: 'N/A',
            scrollDepth: 'N/A',
            supportTickets: '47 per change',
            trustScore: '6.2/10',
          },
        },
        treatmentVersion: {
          description:
            'Feature change announced via in-app banner with "Previously / Now" format, linked to detailed changelog entry explaining rationale.',
          metrics: {
            conversionRate: 'N/A',
            timeOnPage: '2:45 on changelog',
            scrollDepth: '82%',
            supportTickets: '8 per change',
            trustScore: '8.7/10',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Transparent communication reduced confusion-related support tickets by 83% and increased trust scores by 40%. Users who read the changelog were 3x less likely to report the change as a "bug" compared to users who discovered the change on their own.',
          learnings: [
            'Users prefer knowing something changed even if the change is unwelcome',
            'Previously/Now format is more effective than just describing new behavior',
            'Including rationale ("why we changed this") further reduces negative sentiment',
            'In-app banners drove 5x more changelog views than email notifications',
          ],
        },
      },
      {
        title: 'Content Correction: Silent Fix vs Visible Correction Notice',
        hypothesis:
          'Visible correction notices will maintain higher trust than silent fixes',
        controlVersion: {
          description:
            'Blog post with factual error silently corrected. Original text replaced with accurate text, no indication of change.',
          metrics: {
            conversionRate: 'N/A',
            trustScore: '5.8/10',
            returnVisits: '23%',
          },
        },
        treatmentVersion: {
          description:
            'Blog post with visible correction notice at top, strikethrough on original error, and inserted correction with explanation.',
          metrics: {
            conversionRate: 'N/A',
            trustScore: '8.1/10',
            returnVisits: '41%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Visible corrections increased trust by 40% and return visits by 78%. Users who saw the correction notice rated the publication as more credible than those who saw the silently fixed version, even though the correction made the original error visible.',
          learnings: [
            'Acknowledging errors increases credibility rather than decreasing it',
            'Users who noticed silent corrections felt more betrayed than those who saw transparent ones',
            'Correction notices with explanations outperformed simple corrections',
            'Preserving the original error (strikethrough) was preferred over complete replacement',
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
        name: 'Missing Timestamps',
        description:
          'Content without publication or last-updated dates, making it impossible to know when information was current',
        howToSpot:
          'Look for articles, help docs, or feature descriptions with no visible dates or version indicators',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Absent Version History',
        description:
          'Documents, settings, or policies with no accessible change history',
        howToSpot:
          'Check whether users can view previous versions of content, configurations, or agreements',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Inconsistent Terminology',
        description:
          'The same feature or concept described with different names or descriptions across touchpoints',
        howToSpot:
          'Compare feature names and descriptions between marketing, onboarding, docs, settings, and support',
        severity: ImpactLevel.CRITICAL,
      },
      {
        name: 'Missing Correction Notices',
        description:
          'Updated content with no indication that it was changed from a previous version',
        howToSpot:
          'Look for content that seems different from what you remember but shows no edit history or correction notice',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Post-Incident Minimization',
        description:
          'Follow-up communications that describe past events in softer terms than the actual experience',
        howToSpot:
          'Compare incident communications against actual user-reported impact and severity',
        severity: ImpactLevel.CRITICAL,
      },
    ],

    patterns: [
      {
        name: 'Cross-Touchpoint Inconsistency Pattern',
        description: 'Feature descriptions differ between marketing, docs, and in-app experience',
        indicators: [
          'Marketing promises capabilities the product doesn\'t have',
          'Help docs describe behavior that differs from actual UI',
          'Onboarding teaches workflows that have since changed',
          'Support macros reference outdated feature names or paths',
        ],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Silent Update Pattern',
        description: 'Content or behavior changes with no user-facing notification or record',
        indicators: [
          'No changelog or release notes',
          'Help docs updated without "last updated" timestamps',
          'Policy changes buried in generic notification emails',
          'UI changes deployed without any in-app guidance',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Memory-Contradicting Reframe Pattern',
        description: 'Post-event communication that contradicts users\' direct experience',
        indicators: [
          'Incident reports that minimize severity',
          'Feature removal described as "simplification" or "improvement"',
          'Price increases framed as "plan updates"',
          'Downtime described as "maintenance" retroactively',
        ],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Missing Provenance Pattern',
        description: 'Information presented without source attribution, dates, or version context',
        indicators: [
          'Statistics without dates or sources',
          'Claims without citations',
          'Screenshots without version indicators',
          'Testimonials without dates or product version context',
        ],
        severity: ImpactLevel.MEDIUM,
        confidence: 'medium',
      },
    ],

    checklistQuestions: [
      'Are feature descriptions consistent across marketing, docs, onboarding, and in-app surfaces?',
      'Do all content pages show publication dates and last-updated timestamps?',
      'Is there a changelog or version history that documents changes over time?',
      'When content is corrected, is the correction visible and the original preserved?',
      'Do post-incident communications accurately reflect the severity users experienced?',
      'Can users access previous versions of documents, settings, or policies?',
      'Is terminology consistent across all touchpoints?',
      'When features change, are users notified with clear before/after explanations?',
      'Are update notes specific enough to help users reconcile memory with new behavior?',
      'Does the design help users verify their recollections against actual records?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in the misinformation effect.

Analyze the provided design for misinformation effect vulnerabilities. Identify:

1. **Cross-Touchpoint Consistency**: Whether feature descriptions, terminology, and messaging are consistent across all surfaces
2. **Change Transparency**: How changes to content, features, or policies are communicated and documented
3. **Correction UX**: How errors or outdated information are corrected and whether originals are preserved
4. **Version History**: Whether users can access previous versions of content to verify their recollections
5. **Post-Event Communication**: Whether follow-up messaging accurately reflects user experience

For each vulnerability found:
- Identify where the inconsistency or transparency gap exists
- Assess the risk of users forming distorted memories
- Determine whether the effect is accidental or deliberately manipulative
- Evaluate the trust impact
- Suggest specific improvements

Consider:
- Is messaging consistent between marketing, onboarding, docs, and in-app experience?
- Are content changes documented with timestamps and rationale?
- Can users verify their recollections against historical records?
- Are corrections visible or are errors silently overwritten?
- Does post-incident communication match the severity users experienced?

Provide actionable recommendations for preventing harmful misinformation effects.`,

    outputSchema: {
      type: 'object',
      properties: {
        misinformationVulnerabilities: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              inconsistency: { type: 'string' },
              memoryRisk: { type: 'string' },
              trustImpact: { type: 'string' },
              intentional: { type: 'boolean' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'inconsistency',
              'memoryRisk',
              'intentional',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            messagingConsistency: { type: 'number' },
            changeTransparency: { type: 'number' },
            correctionQuality: { type: 'number' },
            trustScore: { type: 'number' },
          },
          required: [
            'messagingConsistency',
            'changeTransparency',
            'correctionQuality',
            'trustScore',
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
        'misinformationVulnerabilities',
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
        title: 'Audit Cross-Touchpoint Consistency',
        description:
          'Map every place a feature or concept is described (marketing, docs, onboarding, in-app, support) and verify they match',
        example:
          'Create a feature glossary spreadsheet mapping each feature name and description across all surfaces',
        tips: [
          'Start with your highest-traffic features',
          'Include support macros and chatbot scripts in the audit',
          'Check screenshots in docs against current UI',
        ],
      },
      {
        step: 2,
        title: 'Implement a Single Source of Truth',
        description:
          'Create a canonical content source that feeds all touchpoints, eliminating drift',
        example:
          'Use a headless CMS or content API where feature descriptions are authored once and syndicated to marketing, docs, and in-app help',
        tips: [
          'Automate content syndication to prevent manual drift',
          'Include feature descriptions, terminology, and capability claims',
          'Version the source content itself',
        ],
      },
      {
        step: 3,
        title: 'Design Change Communication',
        description:
          'Create a standard format for communicating changes with before/after context',
        example:
          'Use a "Previously / Now / Why" template for all changelog entries and change notifications',
        tips: [
          'Include what changed, not just what is new',
          'Explain why the change was made',
          'Use in-app contextual notifications, not just email',
        ],
      },
      {
        step: 4,
        title: 'Build Correction UX Patterns',
        description:
          'Design standard components for content corrections that preserve originals',
        example:
          'Create a <correction-notice> component with role="note" that shows correction date, original text (struck through), and corrected text',
        tips: [
          'Use semantic HTML (del/ins) for corrections',
          'Make corrections accessible to screen readers',
          'Include correction rationale when possible',
        ],
      },
      {
        step: 5,
        title: 'Provide Verifiable History',
        description:
          'Give users access to version history so they can confirm their recollections',
        example:
          'Add a "Version history" link to docs, settings pages, and policy documents showing timestamped changes',
        tips: [
          'Make version history accessible, not hidden',
          'Provide visual diffs for text changes',
          'Include who made changes when relevant',
        ],
      },
    ],

    dos: [
      'Maintain consistent feature descriptions across all touchpoints',
      'Timestamp all content with publication and last-updated dates',
      'Provide transparent changelogs with before/after context',
      'Preserve original content alongside corrections using del/ins elements',
      'Notify users of changes that affect their existing workflows or understanding',
      'Offer version history for documents, settings, and policies',
      'Match post-incident communication to actual user-experienced severity',
      'Use a single source of truth for feature descriptions and terminology',
    ],

    donts: [
      'Don\'t silently update content without timestamps or change notices',
      'Don\'t use different names for the same feature across channels',
      'Don\'t minimize or reframe past incidents in ways that contradict user experience',
      'Don\'t delete previous versions of content without archiving them',
      'Don\'t change policies without explicit notification and before/after comparison',
      'Don\'t let marketing describe capabilities the product doesn\'t actually have',
      'Don\'t overwrite help documentation without "last updated" indicators',
      'Don\'t use post-event messaging to manipulate users\' memory of their experience',
    ],

    bestPractices: [
      {
        title: 'Previously / Now / Why Pattern',
        description:
          'When communicating changes, always state what it was, what it is now, and why it changed',
        rationale:
          'This format helps users update their memory accurately by anchoring to their existing knowledge before introducing the change',
        example:
          '"Previously, exports were CSV. Now, exports are XLSX. Why: to preserve formatting and formulas."',
      },
      {
        title: 'Feature Glossary as Source of Truth',
        description:
          'Maintain a canonical glossary of feature names and descriptions that feeds all surfaces',
        rationale:
          'Terminology drift across touchpoints is the most common cause of misinformation effect in products',
        example:
          'A shared content API serving feature descriptions to marketing, docs, onboarding, and in-app help',
      },
      {
        title: 'Visible Correction Over Silent Fix',
        description:
          'When correcting errors, make the correction visible rather than silently replacing content',
        rationale:
          'Visible corrections increase trust and help users who saw the original update their memory accurately',
        example:
          'Use a correction notice component with strikethrough original and clearly marked correction',
      },
      {
        title: 'Contextual Change Notifications',
        description:
          'Notify users of changes at the point of interaction, not just via email',
        rationale:
          'Users are most likely to update their mental model when they encounter the change in context',
        example:
          'Show a "This feature changed" tooltip or banner the first time a user encounters modified behavior',
      },
      {
        title: 'Incident Communication Integrity',
        description:
          'Match post-incident messaging to the severity that users actually experienced',
        rationale:
          'Users will compare the company\'s account against their own experience; discrepancies destroy trust',
        example:
          'If users experienced 6 hours of downtime, acknowledge 6 hours of downtime, not "brief intermittent issues"',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships - Corrections and version information must be semantically conveyed',
        implementation:
          'Use <del> and <ins> elements for corrections, role="note" for correction notices, and ARIA labels for version status indicators',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.4.1',
        guideline:
          'Use of Color - Don\'t rely solely on color to indicate changed or corrected content',
        implementation:
          'Combine color highlighting with text labels ("Corrected:", "Updated:"), icons, and semantic HTML so all users perceive changes',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.4.6',
        guideline:
          'Headings and Labels - Use clear headings for correction notices and changelog entries',
        implementation:
          'Give correction notices and changelog sections descriptive headings so all users can navigate to change information',
      },
      {
        wcagLevel: 'AA',
        criterion: '4.1.3',
        guideline:
          'Status Messages - Communicate content changes as status messages for assistive technology',
        implementation:
          'Use aria-live regions or role="status" to announce content updates and corrections to screen reader users',
      },
    ],

    ethics: [
      {
        concern: 'Deliberate Memory Manipulation',
        severity: 'critical',
        explanation:
          'Intentionally reframing past events or silently changing records to alter users\' memory of what happened',
        mitigation:
          'Never silently alter records of past events. Preserve originals alongside any corrections. Match communication to actual user experience.',
      },
      {
        concern: 'Gaslighting Through Silent Updates',
        severity: 'critical',
        explanation:
          'Changing content without notification, causing users to doubt their own memory when they notice discrepancies',
        mitigation:
          'Always timestamp content and provide change history. When users report discrepancies, acknowledge the change rather than implying they misremember.',
      },
      {
        concern: 'Marketing-Reality Gaps',
        severity: 'high',
        explanation:
          'Marketing materials describing capabilities that the product doesn\'t actually deliver, creating false memories of promised features',
        mitigation:
          'Ensure marketing claims are verifiable against actual product behavior. Use a shared content source for feature descriptions.',
      },
      {
        concern: 'Post-Incident Minimization',
        severity: 'high',
        explanation:
          'Downplaying past incidents in official communications to make the company\'s track record appear better than it was',
        mitigation:
          'Keep public incident reports accurate and proportional. Preserve incident history with actual impact data.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'Semantic Integration of Verbal Information into a Visual Memory',
        author: 'Loftus, E. F., Miller, D. G., & Burns, H. J.',
        year: 1978,
        doi: '10.1037/0096-1523.4.1.19',
        description:
          'Landmark study demonstrating how post-event verbal information becomes integrated into visual memory, establishing the misinformation effect',
        type: 'foundational',
      },
      {
        title: 'Reconstruction of Automobile Destruction: An Example of the Interaction Between Language and Memory',
        author: 'Loftus, E. F., & Palmer, J. C.',
        year: 1974,
        description:
          'The classic "smashed vs hit" experiment showing that word choice in post-event questions alters memory of the event itself',
        type: 'foundational',
      },
      {
        title: 'Eyewitness Testimony',
        author: 'Loftus, E. F.',
        year: 1979,
        description:
          'Comprehensive treatment of the misinformation effect and its implications for eyewitness reliability',
        type: 'foundational',
      },
      {
        title: 'Misinformation and Memory: The Creation of New Memories',
        author: 'Loftus, E. F., & Hoffman, H. G.',
        year: 1989,
        doi: '10.1037/0278-7393.15.1.100',
        description:
          'Demonstrates how misleading post-event information can create entirely new false memories, not just alter existing ones',
        type: 'advanced',
      },
    ],

    books: [
      {
        title: 'Eyewitness Testimony',
        author: 'Loftus, Elizabeth F.',
        year: 1979,
        isbn: '9780674287778',
        description:
          'The definitive work on how post-event information distorts memory, by the researcher who discovered and named the misinformation effect',
        type: 'foundational',
      },
      {
        title: 'The Myth of Repressed Memory',
        author: 'Loftus, Elizabeth F., & Ketcham, Katherine',
        year: 1994,
        isbn: '9780312141233',
        description:
          'Explores how suggestion and misinformation can create entirely false memories, with implications for information design',
        type: 'practical',
      },
      {
        title: 'Remembering: A Study in Experimental and Social Psychology',
        author: 'Bartlett, Frederic C.',
        year: 1932,
        isbn: '9780521483568',
        description:
          'Foundational work on reconstructive memory theory that underpins the misinformation effect',
        type: 'foundational',
      },
    ],

    articles: [
      {
        title: 'The Misinformation Effect and Its Implications for UX Writing',
        author: 'Nielsen Norman Group',
        url: 'https://www.nngroup.com/articles/consistency-and-standards/',
        description:
          'Practical UX guidelines for maintaining consistency and preventing user confusion through contradictory information',
        type: 'practical',
      },
      {
        title: 'Designing for Trust: How Transparent Communication Builds User Confidence',
        author: 'Interaction Design Foundation',
        url: 'https://www.interaction-design.org/literature/article/design-for-trust',
        description:
          'How transparency in change communication and error correction builds lasting user trust',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'How Reliable Is Your Memory? Elizabeth Loftus',
        author: 'TED',
        url: 'https://www.ted.com/talks/elizabeth_loftus_how_reliable_is_your_memory',
        description:
          'Elizabeth Loftus explains her research on the misinformation effect and false memory creation',
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
      'confirmation-bias',    // Users selectively accept misinformation that confirms existing beliefs
      'source-confusion',     // Forgetting where information came from enables misinformation integration
      'recency-effect',       // More recent information overwrites older memories
      'authority-bias',       // Misinformation from authoritative sources is more readily accepted
    ],

    conflicts: [
      'picture-superiority-effect', // Visual memories are harder to overwrite with verbal misinformation
    ],

    confusedWith: [
      'false-memory',          // Related but broader: misinformation effect is one mechanism of false memory
      'suggestibility',        // Overlaps but suggestibility is a personality trait, misinformation effect is a phenomenon
      'retroactive-interference', // Related memory concept but more general than misinformation effect
    ],

    hierarchy: {
      parent: 'memory-bias',
      children: [
        'post-event-information-effect',
        'verbal-overshadowing',
        'imagination-inflation',
      ],
    },
  },
};
