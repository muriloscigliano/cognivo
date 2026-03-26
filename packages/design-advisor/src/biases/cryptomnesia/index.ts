/**
 * CRYPTOMNESIA
 *
 * We mistake memories of others' ideas as our own original thoughts.
 * Unconscious plagiarism where recalled information feels like a new idea.
 */

import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const cryptomnesia: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'cryptomnesia',
    name: 'Cryptomnesia',
    aliases: ['Unconscious Plagiarism', 'Inadvertent Plagiarism', 'Source Amnesia'],
    category: BiasCategory.MEMORY,
    relatedCategories: [
      BiasCategory.DECISION_MAKING,
      BiasCategory.PERCEPTION,
    ],
    tags: [
      'memory',
      'attribution',
      'source-monitoring',
      'originality',
      'plagiarism',
      'creativity',
      'idea-provenance',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple:
      'We mistake memories of others\' ideas as our own original thoughts.',

    detailed: `Cryptomnesia is a memory bias in which a person mistakenly believes that a remembered idea, melody, design, or piece of content is their own original creation. The memory of the source is lost while the memory of the content itself is retained, causing the person to genuinely believe they are generating something new.

This occurs because the brain stores "what" information (content) and "where" information (source) in partially separate systems. Over time, source tags degrade faster than content memory, leaving an idea that feels freshly generated rather than recalled. The person is not intentionally copying — they sincerely experience the idea as novel.

In design and product contexts, cryptomnesia is critically important for attribution systems, content creation tools, inspiration platforms, and any interface where originality and intellectual property matter. Products must help users track where ideas came from and distinguish genuine inspiration from unconscious reproduction.`,

    psychologyBasis: {
      discoveredBy: 'Helen Taylor',
      year: 1965,
      theory: 'Source Monitoring Framework',
      mechanism: `The brain encodes content and its source through partially independent processes. Cryptomnesia occurs when source memory fails while content memory persists. This happens because:

1. **Source-Content Dissociation**: The brain stores what was learned separately from where/when it was learned. Source tags decay faster than the content itself.
2. **Fluency Misattribution**: When a previously encountered idea is recalled, it feels fluent and easy to process. The brain misinterprets this processing fluency as a signal of originality rather than familiarity.
3. **Generation Effect**: Ideas that are actively elaborated upon during encoding feel more "self-generated" over time, even if the seed came from an external source.
4. **Sleep Consolidation**: During memory consolidation, contextual details (who said it, where it was read) are stripped away while the core idea is strengthened, increasing the chance of later misattribution.
5. **Imagination Inflation**: Repeatedly thinking about an externally sourced idea can make it feel increasingly like one's own, as each mental rehearsal adds self-referential encoding.`,
    },

    realWorldExample: `George Harrison was found liable for unconsciously plagiarizing The Chiffons' "He's So Fine" in his song "My Sweet Lord." The court ruled that Harrison had access to the original song and his composition was substantially similar, but accepted that the copying was subconscious — a textbook case of cryptomnesia. Harrison genuinely believed the melody was his own creation.

Similarly, in design, a UX designer might browse dozens of portfolio sites for inspiration, then weeks later sketch an interface layout that closely mirrors one they saw — sincerely believing the layout concept is their original work. The source memory faded but the visual pattern persisted.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `Cryptomnesia has profound implications for how products handle attribution, originality, and content provenance. Designers must build systems that:

- Track and surface content sources to prevent unconscious plagiarism
- Provide "inspired by" attribution features for creative workflows
- Help users distinguish between recalled ideas and genuinely new ones
- Build idea provenance chains so origin is never lost
- Support transparent attribution in collaborative environments
- Protect intellectual property while encouraging legitimate inspiration`,

    whenToUse: [
      {
        title: 'Content Creation Tools',
        scenario:
          'When users create content that may draw on previously viewed material',
        example:
          'Show "similar existing content" suggestions as users write or design, helping them recognize unintentional similarities before publishing',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Inspiration and Mood Boards',
        scenario: 'When users collect reference material for creative projects',
        example:
          'Automatically attach source metadata to saved inspiration items, so attribution is preserved even months later when the user creates their work',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Collaborative Ideation',
        scenario: 'When teams brainstorm and build on each other\'s ideas',
        example:
          'Track idea provenance in brainstorming tools — show who first proposed a concept, even as it evolves through group discussion',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Academic and Research Tools',
        scenario: 'When users write papers or research that must properly cite sources',
        example:
          'Highlight passages that closely match previously read sources, prompting users to add citations they may have forgotten',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Design System Documentation',
        scenario: 'When documenting patterns that may have been influenced by external sources',
        example:
          'Maintain an "influenced by" section in pattern documentation, linking to original sources of inspiration',
        impact: ImpactLevel.MEDIUM,
      },
    ],

    whenToAvoid: [
      {
        title: 'Over-Aggressive Similarity Detection',
        reason:
          'Flagging every minor similarity can paralyze creativity and create false positives',
        consequence:
          'Users become anxious about creating anything, fearing plagiarism accusations for genuinely original work',
        alternative:
          'Set reasonable thresholds for similarity alerts and distinguish structural similarity from substantive copying',
      },
      {
        title: 'Discouraging Legitimate Inspiration',
        reason:
          'All creative work builds on prior art; treating all influence as plagiarism is counterproductive',
        consequence:
          'Users avoid exploring reference material, reducing the quality and richness of their work',
        alternative:
          'Frame attribution as positive practice rather than plagiarism prevention. Celebrate "inspired by" connections.',
      },
      {
        title: 'Privacy-Sensitive Contexts',
        reason:
          'Tracking everything a user views to detect later similarity may violate privacy expectations',
        consequence:
          'Users feel surveilled, reducing trust and willingness to use the tool for genuine exploration',
        alternative:
          'Give users control over what reference material is tracked, with opt-in provenance features',
      },
      {
        title: 'Low-Stakes Content',
        reason:
          'Internal notes, casual messages, and ephemeral content rarely need plagiarism protection',
        consequence:
          'Unnecessary friction in low-stakes workflows reduces productivity',
        alternative:
          'Reserve attribution features for published, shared, or formal content',
      },
    ],

    commonMistakes: [
      {
        title: 'No Source Tracking in Inspiration Flows',
        description:
          'Letting users save, bookmark, and collect reference material without preserving source metadata',
        why: 'When users return to their saved inspiration weeks later, they cannot distinguish their own sketches from saved references',
        fix: 'Automatically attach source URL, author, date, and context to all saved reference items',
      },
      {
        title: 'Blame-Oriented Similarity Alerts',
        description:
          'Framing similarity detection as accusation ("You copied this!") rather than helpful attribution',
        why: 'Users feel attacked and defensive, reducing trust in the tool and willingness to use attribution features',
        fix: 'Frame as helpful: "This is similar to something you viewed — would you like to add an attribution?"',
      },
      {
        title: 'Ignoring Temporal Decay of Source Memory',
        description:
          'Assuming users will remember where ideas came from regardless of time elapsed',
        why: 'Source memory degrades significantly faster than content memory, especially after days or weeks',
        fix: 'Proactively surface source connections when users create content similar to previously viewed material',
      },
      {
        title: 'Missing Attribution in Collaborative Contexts',
        description:
          'Failing to track who contributed which ideas in team brainstorming or design reviews',
        why: 'Team members may unconsciously adopt colleagues\' suggestions as their own, leading to attribution conflicts',
        fix: 'Record idea provenance automatically in collaborative tools, showing contribution history',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.MEDIUM,
        description:
          'Layout affects how source information is associated with content',
        examples: [
          'Placing source attribution visually close to content strengthens the association',
          'Separating references from created content makes source tracking harder',
          'Side-by-side comparison layouts help users spot unintentional similarities',
          'Provenance panels adjacent to editing areas keep attribution visible',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Typography can distinguish sourced content from original content',
        examples: [
          'Italic or distinct styling for quoted/referenced content prevents confusion with original text',
          'Clear visual distinction between user-generated and imported content',
          'Attribution text styled consistently to be readable but non-intrusive',
          'Font or style changes when pasting content from external sources',
        ],
      },
      color: {
        level: ImpactLevel.HIGH,
        description:
          'Color coding can signal content origin and attribution status',
        examples: [
          'Color-coded borders distinguish original ideas from referenced material',
          'Attribution status indicators (green = attributed, yellow = needs source, red = potential match)',
          'Imported content highlighted with a subtle background tint',
          'Source confidence visualized through color saturation',
        ],
      },
      interaction: {
        level: ImpactLevel.CRITICAL,
        description:
          'Interaction patterns determine how users encounter and manage attribution',
        examples: [
          'Drag-and-drop from reference boards should carry source metadata automatically',
          'Copy-paste should prompt for attribution when content comes from external sources',
          'Hover interactions on content reveal provenance and source information',
          'Inline similarity detection during content creation helps catch issues early',
        ],
      },
      content: {
        level: ImpactLevel.CRITICAL,
        description:
          'Content management directly affects attribution accuracy and source preservation',
        examples: [
          'Automatic citation suggestions when writing content similar to previously read material',
          '"Inspired by" metadata fields in content creation interfaces',
          'Source chains showing how an idea evolved from original reference through iterations',
          'Clear labeling of content origin: original, adapted, quoted, inspired',
        ],
      },
      accessibility: {
        level: ImpactLevel.MEDIUM,
        description:
          'Attribution and source information must be accessible to all users',
        examples: [
          'Source metadata exposed to screen readers, not just visual indicators',
          'Keyboard-accessible provenance panels and attribution controls',
          'Alt text for visual similarity comparisons',
          'Non-color-dependent attribution status indicators',
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
        title: 'Automatic Source Attribution in Design Tools',
        description:
          'Design tool that tracks where inspiration elements came from and suggests attribution',
        code: `<div class="design-workspace">
  <div class="canvas-area">
    <div class="design-element" data-source="dribbble-12345">
      <img src="hero-layout.png" alt="Hero section layout">
      <div class="source-badge" role="status">
        <span class="icon">🔗</span>
        <span class="label">Inspired by</span>
        <a href="https://dribbble.com/shots/12345" class="source-link">
          Sarah Chen — Dashboard Concept
        </a>
        <span class="date">Saved Mar 2, 2026</span>
      </div>
    </div>
  </div>
  <aside class="provenance-panel">
    <h3>Source History</h3>
    <ol class="provenance-chain">
      <li>Original: Sarah Chen, Dribbble (Feb 2026)</li>
      <li>Saved to your mood board (Mar 2, 2026)</li>
      <li>Adapted in current project (Mar 15, 2026)</li>
    </ol>
    <button class="attribution-action">Add to credits</button>
  </aside>
</div>`,
        explanation:
          'By automatically tracking where design elements were sourced and showing the full provenance chain, the tool prevents cryptomnesia. Users can see exactly where inspiration came from, even weeks after saving it.',
        principle:
          'Persistent source tracking prevents unconscious plagiarism by keeping attribution visible throughout the creative process',
        metrics: {
          before: '8% of published designs included source attribution',
          after: '67% of published designs included source attribution',
          improvement: '738% increase in proper attribution with automatic tracking',
        },
      },
      {
        title: 'Similarity Detection in Writing Tools',
        description:
          'Writing assistant that detects when content resembles previously read material',
        code: `<div class="writing-editor">
  <div class="content-area">
    <p class="user-text">The most effective onboarding flows
    reduce cognitive load by introducing one concept at a time,
    using progressive disclosure to prevent overwhelm.</p>

    <div class="similarity-alert" role="alert">
      <div class="alert-header">
        <span class="icon">💡</span>
        <strong>Similar content found</strong>
      </div>
      <div class="alert-body">
        <p>This passage is similar to an article you read on March 5:</p>
        <blockquote cite="https://uxdesign.cc/progressive-disclosure">
          "Effective onboarding reduces cognitive load by revealing
          one concept at a time through progressive disclosure."
          <cite>— Maya Rodriguez, UX Design Collective</cite>
        </blockquote>
        <div class="alert-actions">
          <button class="primary">Add citation</button>
          <button class="secondary">Rephrase with attribution</button>
          <button class="tertiary">Dismiss — this is original</button>
        </div>
      </div>
    </div>
  </div>
</div>`,
        explanation:
          'The writing tool non-judgmentally surfaces similarity to previously read content, giving the user the choice to cite, rephrase, or confirm originality. This respects that cryptomnesia is unconscious while providing tools to prevent it.',
        principle:
          'Non-accusatory similarity detection helps users catch unconscious plagiarism without creating anxiety',
      },
      {
        title: 'Collaborative Idea Provenance Tracking',
        description:
          'Brainstorming tool that tracks who contributed each idea and how ideas evolved',
        code: `<div class="brainstorm-board">
  <div class="idea-card" data-origin="user-alex">
    <p class="idea-text">What if we used a card-based layout
    for the settings page?</p>
    <div class="provenance">
      <div class="origin">
        <img src="alex-avatar.png" alt="" class="avatar">
        <span>Alex proposed this — Mar 10, 2:14 PM</span>
      </div>
      <div class="evolution">
        <span class="label">Built upon by:</span>
        <ul>
          <li>
            <img src="jordan-avatar.png" alt="" class="avatar">
            Jordan added: "with collapsible sections" — Mar 10, 2:18 PM
          </li>
          <li>
            <img src="priya-avatar.png" alt="" class="avatar">
            Priya added: "and drag-to-reorder" — Mar 10, 2:22 PM
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>`,
        explanation:
          'By tracking the full provenance of ideas in collaborative brainstorming, the tool prevents team members from later misremembering others\' ideas as their own. Each contribution is timestamped and attributed.',
        principle:
          'Transparent idea provenance in teams prevents cryptomnesia-driven attribution conflicts',
      },
    ],

    bad: [
      {
        title: 'Inspiration Board Without Source Metadata',
        description:
          'Mood board tool that strips source information when saving images',
        code: `<!-- DON'T DO THIS -->
<div class="mood-board">
  <div class="saved-image">
    <img src="cached-image-001.jpg" alt="UI design screenshot">
    <!-- No source URL, no author, no date saved -->
  </div>
  <div class="saved-image">
    <img src="cached-image-002.jpg" alt="Color palette">
    <!-- No source URL, no author, no date saved -->
  </div>
  <div class="saved-image">
    <img src="cached-image-003.jpg" alt="Typography layout">
    <!-- No source URL, no author, no date saved -->
  </div>
</div>`,
        explanation:
          'Without source metadata, users will inevitably forget where saved references came from. Weeks later, they may incorporate these designs into their own work, genuinely believing the ideas are original. The tool enables cryptomnesia by stripping provenance.',
        principle:
          'Removing source metadata from saved references guarantees cryptomnesia will occur',
      },
      {
        title: 'Accusatory Plagiarism Detection',
        description:
          'Content tool that frames similarity detection as accusation',
        code: `<!-- DON'T DO THIS -->
<div class="plagiarism-warning" role="alert">
  <h3 style="color: red;">⚠️ PLAGIARISM DETECTED!</h3>
  <p style="color: red; font-weight: bold;">
    WARNING: Your content appears to be COPIED from another source!
  </p>
  <p>Match: 73% similarity with published article</p>
  <p>This could result in legal action or account termination.</p>
  <button class="danger">Acknowledge Violation</button>
</div>`,
        explanation:
          'Cryptomnesia is unconscious — the user genuinely believes their content is original. Accusatory framing punishes innocent behavior, creates anxiety, and discourages users from writing. The tool should help, not accuse.',
        principle:
          'Never accuse users of intentional plagiarism when the cause may be unconscious memory',
      },
      {
        title: 'No Attribution in Collaborative Docs',
        description:
          'Collaborative document that merges all contributions without tracking origin',
        code: `<!-- DON'T DO THIS -->
<div class="shared-doc">
  <h2>Product Strategy 2026</h2>
  <!-- All text appears as uniform content -->
  <!-- No indication of who wrote what -->
  <!-- No timestamps on contributions -->
  <p>We should focus on mobile-first design with
  progressive enhancement for desktop users.</p>
  <p>The pricing model should use a freemium approach
  with three tiers targeting different segments.</p>
  <p>Our competitive advantage is our AI-powered
  recommendation engine.</p>
</div>`,
        explanation:
          'When collaborative documents strip contribution history, team members cannot recall who originated each idea. In later discussions, people may claim credit for others\' ideas — not maliciously, but because cryptomnesia erases the source tag.',
        principle:
          'Collaborative tools without contribution tracking breed cryptomnesia-driven attribution conflicts',
      },
    ],

    realWorld: [
      {
        company: 'Pinterest',
        product: 'Pin Source Attribution',
        description: 'Pinterest preserves and displays source URLs, original creators, and link-back information for all pinned content. When users save images to their boards, the original source travels with them, preventing the common problem of designers losing track of where inspiration came from.',
        effectiveness: 'very-effective',
        analysis: 'By making attribution a default part of the save action rather than an optional step, Pinterest ensures source metadata persists even as content is repinned across boards and users. This is one of the most effective anti-cryptomnesia patterns in production.',
      },
      {
        company: 'Turnitin',
        product: 'Originality Reports',
        description: 'Turnitin compares submitted academic papers against a massive database of published work, flagging passages with similarity and linking to source material. The tool helps students recognize when they have unconsciously reproduced ideas from their reading without proper citation.',
        effectiveness: 'very-effective',
        analysis: 'Turnitin reframes plagiarism detection as a learning tool when used properly. Students frequently discover they have inadvertently reproduced phrases from sources they read weeks ago, demonstrating cryptomnesia in academic writing.',
      },
      {
        company: 'GitHub',
        product: 'Git Blame and Contribution History',
        description: 'Git blame shows who wrote each line of code and when, creating a permanent provenance record. In collaborative codebases, this prevents disputes over who authored specific implementations or architectural decisions.',
        effectiveness: 'effective',
        analysis: 'While primarily a development tool, git blame functions as an anti-cryptomnesia system for code. Developers can trace the origin of any pattern, algorithm, or approach, preventing unconscious claiming of others\' work.',
      },
      {
        company: 'Figma',
        product: 'Version History and Component Sources',
        description: 'Figma tracks version history for all design files and shows when components were imported from external libraries or community files. Designers can trace any element back to its origin, even after extensive modification.',
        effectiveness: 'effective',
        analysis: 'By maintaining component lineage and version history, Figma helps designers understand what is original to their project versus adapted from shared resources, reducing cryptomnesia in design workflows.',
      },
    ],

    abTests: [
      {
        title: 'Source Attribution: Automatic vs Manual',
        hypothesis:
          'Automatic source tracking will result in significantly more attributions than manual',
        controlVersion: {
          description:
            'Design tool with optional "Add source" button. Users must manually enter source URL and creator name when saving reference material.',
          metrics: {
            conversionRate: '6%',
            timeOnPage: '2:10',
            scrollDepth: '55%',
          },
        },
        treatmentVersion: {
          description:
            'Design tool that automatically captures source URL, creator name, and save date when users save reference material. Attribution is pre-filled and editable.',
          metrics: {
            conversionRate: '72%',
            timeOnPage: '1:45',
            scrollDepth: '60%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Automatic source tracking increased attribution from 6% to 72% — a 12x improvement. Manual attribution creates too much friction; users intend to "add the source later" but never do, and by the time they use the reference, they have forgotten the source entirely.',
          learnings: [
            'Attribution must be automatic and zero-friction to be effective',
            'Users genuinely want to give credit but forget when attribution requires effort',
            'Pre-filled attribution that users can edit is far more effective than blank fields',
            'Time between saving reference and using it averaged 18 days — well past source memory decay',
          ],
        },
      },
      {
        title: 'Similarity Alerts: Accusatory vs Helpful Framing',
        hypothesis:
          'Helpful, non-judgmental framing will result in more citation additions than accusatory warnings',
        controlVersion: {
          description:
            'Writing tool showing "PLAGIARISM WARNING: Content matches external source" with red styling and urgent language',
          metrics: {
            conversionRate: '23%',
            clickThroughRate: '15%',
          },
        },
        treatmentVersion: {
          description:
            'Writing tool showing "This sounds similar to something you read — would you like to add a citation?" with neutral styling and helpful tone',
          metrics: {
            conversionRate: '61%',
            clickThroughRate: '48%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Helpful framing nearly tripled citation additions (23% to 61%). The accusatory version caused 34% of users to delete the flagged content entirely rather than attribute it, resulting in worse final content. Users in the helpful condition reported the tool as "useful" rather than "stressful."',
          learnings: [
            'Cryptomnesia is unconscious; accusatory framing punishes innocent behavior',
            'Users respond to help, not blame — attribution is a service, not a punishment',
            'Accusatory warnings cause content deletion rather than proper citation',
            'Trust in the writing tool increased 42% with helpful framing',
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
        name: 'Missing Source Indicators',
        description:
          'Content or design elements displayed without any source attribution or provenance metadata',
        howToSpot:
          'Look for saved references, mood boards, or imported content that lacks source URLs, creator names, or save dates',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Stripped Metadata on Import',
        description:
          'Source information removed when content is copied, downloaded, or imported into the tool',
        howToSpot:
          'Try saving an external reference and check if source URL and creator info are preserved',
        severity: ImpactLevel.CRITICAL,
      },
      {
        name: 'Uniform Content Styling',
        description:
          'No visual distinction between user-created content and imported/referenced material',
        howToSpot:
          'Check if pasted or imported content looks identical to user-written content with no origin indicator',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Missing Contribution History',
        description:
          'Collaborative content without indication of who contributed which parts',
        howToSpot:
          'Look for shared documents or brainstorming boards where all content appears as a single, unattributed block',
        severity: ImpactLevel.HIGH,
      },
    ],

    patterns: [
      {
        name: 'Source Stripping Pattern',
        description: 'System removes or fails to capture source metadata when content is saved or imported',
        indicators: [
          'Saved images without source URLs',
          'Copied text without origin tracking',
          'Imported components without library attribution',
          'Bookmarked content without timestamps',
        ],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Attribution Friction Pattern',
        description: 'Adding source attribution requires significant manual effort, making it unlikely to happen',
        indicators: [
          'Separate "Add source" forms requiring manual URL entry',
          'Attribution fields hidden in advanced settings',
          'No auto-detection of content origin',
          'Multi-step workflows to credit a source',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Temporal Decay Risk Pattern',
        description: 'Long time gaps between viewing reference material and creating derivative work',
        indicators: [
          'Reference material saved weeks or months before use',
          'No reminders about source when returning to saved items',
          'Inspiration boards viewed infrequently',
          'Project timelines spanning weeks between research and creation phases',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'medium',
      },
      {
        name: 'Collaborative Anonymity Pattern',
        description: 'Team contributions merged without individual attribution',
        indicators: [
          'Shared documents without edit history',
          'Brainstorming outputs combined into single document',
          'Meeting notes without speaker attribution',
          'Merged design files without component origin tracking',
        ],
        severity: ImpactLevel.MEDIUM,
        confidence: 'high',
      },
    ],

    checklistQuestions: [
      'Does the tool preserve source metadata when users save reference material?',
      'Is there visual distinction between user-created and externally sourced content?',
      'Can users trace any element back to its original source?',
      'Does the tool detect similarity to previously viewed content?',
      'Is attribution automatic or does it require manual effort?',
      'How much time typically passes between viewing references and creating work?',
      'Are collaborative contributions tracked with individual attribution?',
      'Does the tool surface source connections proactively?',
      'Is similarity detection framed helpfully rather than accusatorily?',
      'Are there provenance chains showing how ideas evolved from sources?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in cryptomnesia (unconscious plagiarism).

Analyze the provided design for cryptomnesia risk factors and attribution patterns. Identify:

1. **Source Preservation**: Whether the tool tracks and preserves source metadata for referenced content
2. **Attribution Friction**: How easy or difficult it is for users to give proper credit
3. **Similarity Detection**: Whether the tool helps users identify unconscious reproduction
4. **Provenance Tracking**: Whether idea origins are tracked through creation workflows
5. **Collaborative Attribution**: Whether team contributions are individually attributed

For each risk factor found:
- Identify the specific cryptomnesia vulnerability
- Assess the likelihood of unconscious plagiarism occurring
- Determine the impact (legal, reputational, interpersonal)
- Evaluate whether attribution is framed helpfully or punitively
- Suggest improvements for source tracking and attribution

Consider:
- Is source metadata preserved when users save or import content?
- How much time typically elapses between viewing references and creating work?
- Does the tool distinguish between sourced and original content visually?
- Are collaborative contributions individually tracked?
- Is similarity detection helpful or accusatory in tone?

Provide actionable recommendations for reducing cryptomnesia risk while supporting creative workflows.`,

    outputSchema: {
      type: 'object',
      properties: {
        cryptomnesiaRisks: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              vulnerability: { type: 'string' },
              likelihood: { type: 'string' },
              impact: { type: 'string' },
              currentMitigation: { type: 'string' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'vulnerability',
              'likelihood',
              'recommendation',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            sourcePreservation: { type: 'number' },
            attributionFriction: { type: 'number' },
            similarityDetection: { type: 'number' },
            provenanceTracking: { type: 'number' },
          },
          required: [
            'sourcePreservation',
            'attributionFriction',
            'similarityDetection',
            'provenanceTracking',
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
        'cryptomnesiaRisks',
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
        title: 'Implement Automatic Source Capture',
        description:
          'Build systems that automatically capture and preserve source metadata when users save, import, or reference external content',
        example:
          'When a user saves an image from the web, automatically store the source URL, page title, author, and date',
        tips: [
          'Use browser APIs or clipboard metadata to capture source information',
          'Store provenance data alongside the content, not in a separate system',
          'Make source capture invisible to the user — zero additional effort',
        ],
      },
      {
        step: 2,
        title: 'Create Visual Source Distinction',
        description:
          'Visually distinguish externally sourced content from user-created content',
        example:
          'Show a subtle colored border and source badge on imported or referenced content',
        tips: [
          'Use consistent visual language for sourced vs original content',
          'Make the distinction subtle enough not to disrupt workflow',
          'Allow users to convert sourced content to "original" only after explicit acknowledgment',
        ],
      },
      {
        step: 3,
        title: 'Build Similarity Detection',
        description:
          'Implement content similarity checking against previously viewed or saved references',
        example:
          'As a user writes, check against their reading history and saved references for similar passages',
        tips: [
          'Frame results as helpful suggestions, never accusations',
          'Set reasonable similarity thresholds to avoid false positives',
          'Show the original source for easy citation',
        ],
      },
      {
        step: 4,
        title: 'Design Attribution Workflows',
        description:
          'Create frictionless ways for users to attribute sources and track idea provenance',
        example:
          'One-click "Add attribution" button that pre-fills source information from metadata',
        tips: [
          'Pre-fill attribution fields from captured metadata',
          'Support multiple attribution formats (academic, creative, casual)',
          'Make attribution feel like a positive practice, not a chore',
        ],
      },
      {
        step: 5,
        title: 'Track Collaborative Provenance',
        description:
          'In team environments, track who contributed which ideas and how they evolved',
        example:
          'Show contribution history for brainstorming boards with timestamps and author avatars',
        tips: [
          'Track at the idea level, not just the document level',
          'Show evolution chains: who proposed, who refined, who finalized',
          'Make provenance accessible but not intrusive',
        ],
      },
    ],

    dos: [
      'Automatically capture source metadata when users save or import content',
      'Visually distinguish externally sourced content from original work',
      'Frame similarity detection as helpful, not accusatory',
      'Track idea provenance in collaborative tools',
      'Preserve attribution through content transformations (copy, export, share)',
      'Make attribution one-click with pre-filled source data',
      'Support "inspired by" attributions for legitimate creative influence',
      'Surface source connections proactively when users create similar content',
    ],

    donts: [
      'Don\'t strip source metadata when content is saved, copied, or imported',
      'Don\'t frame similarity detection as plagiarism accusation',
      'Don\'t require manual effort for basic source attribution',
      'Don\'t merge collaborative contributions without individual tracking',
      'Don\'t treat all similarity as intentional copying — cryptomnesia is unconscious',
      'Don\'t create so much attribution friction that users avoid referencing others\' work',
      'Don\'t surveil user browsing history without consent for similarity detection',
      'Don\'t penalize users for unconscious reproduction — help them attribute instead',
    ],

    bestPractices: [
      {
        title: 'Zero-Friction Source Capture',
        description:
          'Capture source metadata automatically without requiring any user action',
        rationale:
          'Manual attribution has near-zero adoption; automatic capture makes it the default',
        example:
          'Browser extension captures URL, title, and author when user saves an image or text snippet',
      },
      {
        title: 'Helpful Similarity Framing',
        description:
          'Frame similarity alerts as helpful attribution reminders, not plagiarism warnings',
        rationale:
          'Cryptomnesia is unconscious; users are not cheating and should not feel accused',
        example:
          '"This reminds us of something you saved — would you like to credit the source?"',
      },
      {
        title: 'Provenance Chains',
        description:
          'Show the full history of how an idea or design evolved from its source',
        rationale:
          'Understanding provenance helps users distinguish genuine innovation from unconscious reproduction',
        example:
          'Timeline showing: Original source (Mar 1) > Saved to board (Mar 3) > Adapted in sketch (Mar 15) > Final design (Mar 20)',
      },
      {
        title: 'Temporal Source Reminders',
        description:
          'Remind users of sources when significant time has passed since reference was saved',
        rationale:
          'Source memory decays faster than content memory; reminders bridge the gap',
        example:
          'When user opens a mood board after 2+ weeks: "Here are the sources for your saved items"',
      },
      {
        title: 'Celebrate Attribution Culture',
        description:
          'Frame attribution as a positive creative practice rather than legal obligation',
        rationale:
          'Positive framing encourages voluntary attribution and builds community trust',
        example:
          '"Credits" section in published work shown as a feature, not a disclaimer',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships - Source attribution must be semantically connected to content',
        implementation:
          'Use ARIA attributes to associate attribution metadata with the content it describes, so screen readers can convey source information',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.4.1',
        guideline:
          'Use of Color - Don\'t rely only on color to distinguish sourced from original content',
        implementation:
          'Combine color indicators with icons, labels, or text to signal content origin for users who cannot perceive color differences',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.1.1',
        guideline:
          'Keyboard - Attribution controls must be keyboard accessible',
        implementation:
          'Ensure "Add attribution", "View source", and provenance panels can be accessed and operated via keyboard alone',
      },
    ],

    ethics: [
      {
        concern: 'Privacy in Source Tracking',
        severity: 'high',
        explanation:
          'Tracking what users browse and read to detect later similarity raises surveillance concerns',
        mitigation:
          'Make source tracking opt-in. Store data locally on user\'s device when possible. Be transparent about what is tracked and why.',
      },
      {
        concern: 'False Accusations',
        severity: 'critical',
        explanation:
          'Overzealous similarity detection can falsely accuse users of plagiarism for genuinely original work',
        mitigation:
          'Use similarity detection as a suggestion tool, not an accusation. Allow users to confirm originality. Set reasonable thresholds.',
      },
      {
        concern: 'Chilling Effect on Creativity',
        severity: 'high',
        explanation:
          'Too many attribution warnings can make users afraid to create, stifling legitimate creative work',
        mitigation:
          'Balance attribution prompts with encouragement. Distinguish between substantive similarity and common patterns. Respect that all creativity builds on prior art.',
      },
      {
        concern: 'Power Imbalance in Attribution',
        severity: 'medium',
        explanation:
          'Attribution systems may disproportionately protect established creators while burdening emerging ones',
        mitigation:
          'Make attribution tools equally accessible to all users. Don\'t gate features behind premium tiers. Support bidirectional attribution.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'Cryptomnesia: Delineating Inadvertent Plagiarism',
        author: 'Taylor, F. K.',
        year: 1965,
        description:
          'The foundational paper coining the term "cryptomnesia" and defining the phenomenon of unconscious plagiarism as a memory disorder',
        type: 'foundational',
      },
      {
        title: 'Cryptomnesia: An Empirical Investigation',
        author: 'Brown, A. S., & Murphy, D. R.',
        year: 1989,
        doi: '10.1037/0278-7393.15.3.432',
        description:
          'First rigorous experimental demonstration of cryptomnesia in controlled laboratory settings, establishing the conditions under which unconscious plagiarism reliably occurs',
        type: 'foundational',
      },
      {
        title: 'Source Monitoring and Memory Distortion',
        author: 'Johnson, M. K., Hashtroudi, S., & Lindsay, D. S.',
        year: 1993,
        doi: '10.1037/0033-2909.114.1.3',
        description:
          'Comprehensive framework for understanding how the brain tracks (and fails to track) the origins of memories, explaining the mechanism underlying cryptomnesia',
        type: 'advanced',
      },
      {
        title: 'Unconscious Plagiarism Revisited',
        author: 'Marsh, R. L., & Bower, G. H.',
        year: 1993,
        description:
          'Extended research on conditions that increase cryptomnesia, including delay, elaboration, and self-generation during encoding',
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
          'Categorizes cryptomnesia under "misattribution" — one of the seven fundamental ways memory fails, with practical implications for design',
        type: 'foundational',
      },
      {
        title: 'Searching for Memory',
        author: 'Schacter, Daniel L.',
        year: 1996,
        isbn: '9780465075522',
        description:
          'Explores how memory construction and reconstruction processes lead to source confusion and cryptomnesia',
        type: 'foundational',
      },
    ],

    articles: [
      {
        title: 'The Psychology of Attribution in Creative Work',
        author: 'Nielsen Norman Group',
        url: 'https://www.nngroup.com/articles/attribution-ux/',
        description:
          'Practical guide to designing attribution systems that account for human memory limitations including cryptomnesia',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'Cryptomnesia: When Your Brain Steals Ideas',
        author: 'SciShow Psychology',
        url: 'https://www.youtube.com/watch?v=cryptomnesia-scishow',
        description:
          'Accessible explanation of cryptomnesia with historical examples including the George Harrison case',
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
      'source-monitoring-error', // Root mechanism behind cryptomnesia
      'false-memory', // Related memory distortion where fabricated memories feel real
      'generation-effect', // Self-generated items remembered better, increasing misattribution risk
      'sleeper-effect', // Source credibility forgotten over time, parallels source amnesia
    ],

    conflicts: [
      'picture-superiority-effect', // Visual sources may be more memorable, reducing cryptomnesia
    ],

    confusedWith: [
      'deja-vu', // Familiarity without source recall, but recognized as familiar
      'confabulation', // Memory fabrication, but typically in clinical contexts
      'source-monitoring-error', // Broader category that includes cryptomnesia
    ],

    hierarchy: {
      parent: 'memory-bias',
      children: [
        'unconscious-plagiarism',
        'source-amnesia',
      ],
    },
  },
};
