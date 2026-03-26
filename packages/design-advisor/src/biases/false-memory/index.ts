/**
 * FALSE MEMORY
 *
 * We remember events that never happened
 */


import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const falseMemory: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'false-memory',
    name: 'False Memory',
    aliases: [],
    category: BiasCategory.MEMORY,
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
    simple: 'We remember events that never happened',

    detailed: `This memory bias illustrates how human memory is reconstructive rather than reproductive, showing how information storage and retrieval is shaped by context, emotion, and cognitive processes. Memory is fallible and subject to systematic distortions.

In UX design, this bias impacts how users remember past interactions, learn interface patterns, and build mental models of systems. Understanding memory limitations and enhancements helps designers create more learnable interfaces and effective onboarding experiences.

Designers can support better memory through appropriate use of recognition over recall, consistent patterns, and strategic repetition, while being aware that users may misremember past experiences or preferences.`,

    psychologyBasis: {
      discoveredBy: 'Various Researchers',
      year: 1970,
      theory: 'Cognitive Bias Research',
      mechanism: `The brain reconstructs memories rather than playing them back like a recording. Each act of recall is a creative process shaped by current context, beliefs, and expectations. This happens because:

1. **Reconstructive Retrieval**: Memory is not stored as a fixed snapshot but as fragments that are reassembled at recall time, introducing gaps and distortions
2. **Schema-Driven Filling**: The brain uses existing mental models (schemas) to fill in missing details, often inserting plausible but inaccurate information
3. **Post-Event Information**: New information encountered after an event can alter the original memory, blending fact with suggestion (the misinformation effect)
4. **Source Monitoring Errors**: People confuse where they learned something — mixing up what they actually did with what they imagined, read about, or were told
5. **Emotional Reconstruction**: Emotional state at the time of recall colors the memory, causing people to remember events as more positive or more negative than they were

The mechanism is automatic and unconscious — people genuinely believe their reconstructed memories are accurate.`,
    },

    realWorldExample: `In the classic Loftus & Palmer (1974) experiment, participants watched footage of a car accident and were asked how fast the cars were going when they "smashed" vs "hit" each other. Those who heard "smashed" estimated higher speeds and were more likely to falsely remember seeing broken glass that was never in the video. The wording of a question literally altered the memory of the event.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `False memory affects how users recall past actions, remember previous interface states, and reconstruct their history of interactions with a product. Because users routinely misremember what they did, when they did it, and what the system showed them, designers must:

- Provide persistent activity logs and audit trails so users don't rely on faulty recall
- Display clear "last action" indicators and undo history
- Offer searchable, browsable history for all significant user actions
- Use confirmation screens and receipts to create accurate reference points
- Design onboarding that accounts for users misremembering previous instructions`,

    whenToUse: [
      {
        title: 'Activity Logs and History',
        scenario:
          'When users need to recall what they did in the past within your product',
        example:
          'Provide a searchable activity log showing every edit, deletion, and setting change with timestamps and details',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Undo and Revision History',
        scenario: 'When users need to reverse or review past actions',
        example:
          'Show a full revision timeline (like Google Docs version history) so users can see and restore any prior state instead of guessing what changed',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Confirmation and Receipt Screens',
        scenario: 'When users complete important actions like purchases, settings changes, or form submissions',
        example:
          'Display a detailed confirmation screen and send an email receipt with exactly what was submitted, so users have an accurate record to reference later',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Last Action Indicators',
        scenario: 'When users return to a product after time away and need to pick up where they left off',
        example:
          'Show "You were last here 3 days ago, editing the Q4 Report" with a direct link to resume, so users don\'t have to reconstruct their last session from memory',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Preference and Settings Summaries',
        scenario: 'When users need to verify or update their configuration',
        example:
          'Display a clear summary of current settings with change history ("You changed your notification preference to Weekly on Jan 15") instead of relying on users to remember what they chose',
        impact: ImpactLevel.MEDIUM,
      },
    ],

    whenToAvoid: [
      {
        title: 'Over-Correcting User Memory',
        reason:
          'Aggressively contradicting what a user believes they did can feel patronizing or create frustration',
        consequence:
          'Users may lose trust in the system if it constantly tells them they are wrong about their own actions',
        alternative:
          'Present the factual record alongside user choices, framing it as a helpful reference rather than a correction',
      },
      {
        title: 'Exposing Embarrassing History',
        reason:
          'Detailed activity logs can surface actions users would rather forget or didn\'t realize were being tracked',
        consequence:
          'Privacy concerns, user discomfort, and potential trust erosion',
        alternative:
          'Give users control over their history — allow clearing, hiding, or scoping what\'s visible in activity logs',
      },
      {
        title: 'Surveillance-Like Tracking',
        reason:
          'Extremely granular tracking of every micro-action can feel invasive',
        consequence:
          'Users feel monitored and may change their behavior or leave the product',
        alternative:
          'Log meaningful actions at an appropriate granularity; be transparent about what is tracked and why',
      },
      {
        title: 'Weaponizing Records in Disputes',
        reason:
          'Using detailed logs to prove users "wrong" in support interactions can damage relationships',
        consequence:
          'Users feel blamed and defensive rather than supported',
        alternative:
          'Use records to solve the user\'s problem, not to assign fault. Focus on resolution, not evidence.',
      },
    ],

    commonMistakes: [
      {
        title: 'No Activity History at All',
        description:
          'Many products provide no way for users to review their past actions, forcing them to rely entirely on memory',
        why: 'Users routinely misremember what they did, what they changed, and when they did it — leading to repeated work, errors, and support tickets',
        fix: 'Implement a persistent, searchable activity log for all significant user actions',
      },
      {
        title: 'Assuming Users Remember Onboarding',
        description:
          'Showing important instructions once during onboarding and never again',
        why: 'Users form false memories of what they were told, or forget instructions entirely, then blame the product when things go wrong',
        fix: 'Make all onboarding content re-accessible at any time. Use contextual help that surfaces relevant guidance in the moment',
      },
      {
        title: 'Vague Confirmation Messages',
        description:
          'Showing "Changes saved" without specifying what changed',
        why: 'Users will misremember what they just submitted and have no reference point to verify against later',
        fix: 'Show specific confirmation details: "Email changed to john@example.com" or "3 items removed from your cart"',
      },
      {
        title: 'Destructive Actions Without Recovery',
        description:
          'Permanent deletions with no undo, archive, or recovery option',
        why: 'Users often misremember whether they meant to delete something or what was in the deleted item. Without recovery, the mistake is permanent',
        fix: 'Use soft deletes with a grace period, provide trash/archive, and show what was deleted with an undo option',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.HIGH,
        description:
          'Layout determines how easily users can find records of their past actions',
        examples: [
          'Persistent sidebar or nav item for activity history keeps it discoverable',
          'Timeline layouts help users orient their actions chronologically',
          'Breadcrumbs and navigation trails show where a user has been',
          '"Recently viewed" sections provide recognition-based navigation instead of recall',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Typography helps distinguish current state from historical records',
        examples: [
          'Timestamps in a readable format help users anchor memories to real dates',
          'Diff-style formatting (strikethrough for old, bold for new) clarifies what changed',
          'Monospace fonts for IDs and reference numbers aid accurate recall',
          'Clear labels like "Current" vs "Previous" prevent confusion',
        ],
      },
      color: {
        level: ImpactLevel.MEDIUM,
        description:
          'Color coding helps users distinguish between past and present states',
        examples: [
          'Green for additions and red for deletions in revision history (like Git diffs)',
          'Muted colors for older activity, vivid for recent actions',
          'Color-coded status indicators that persist across sessions',
          'Highlighting unsaved changes vs committed changes',
        ],
      },
      interaction: {
        level: ImpactLevel.CRITICAL,
        description:
          'Interactions must support memory verification and action recovery',
        examples: [
          'Undo/redo at every level gives users a safety net for misremembered actions',
          'Hover or click to see "last modified by X on Y date" for any element',
          'Search and filter in activity logs lets users find what they vaguely remember',
          'Confirmation dialogs that recap what will happen prevent memory-based errors',
        ],
      },
      content: {
        level: ImpactLevel.CRITICAL,
        description:
          'Content must serve as the source of truth that compensates for unreliable human memory',
        examples: [
          'Detailed activity descriptions ("You moved 3 files to Archive on March 10") replace vague recall',
          'Email confirmations and receipts create a persistent external record',
          'Changelogs and release notes remind users what actually changed vs what they think changed',
          'Inline help text that says "You previously chose X" prevents misremembered preferences',
        ],
      },
      accessibility: {
        level: ImpactLevel.HIGH,
        description:
          'Accessible activity histories ensure all users can verify their past actions',
        examples: [
          'Screen reader-friendly activity logs with proper ARIA labels and semantic structure',
          'Keyboard-navigable revision history and undo controls',
          'Text-based activity descriptions that don\'t rely solely on visual diff colors',
          'Clear focus management when navigating between current and historical states',
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
        title: 'Comprehensive Activity Log',
        description:
          'SaaS application providing a detailed, searchable activity history',
        code: `<section class="activity-log" aria-label="Activity History">
  <header class="log-header">
    <h3>Activity History</h3>
    <input type="search" placeholder="Search your activity..." aria-label="Search activity log">
    <select aria-label="Filter by action type">
      <option>All Actions</option>
      <option>Edits</option>
      <option>Deletions</option>
      <option>Settings Changes</option>
    </select>
  </header>

  <ol class="activity-list">
    <li class="activity-item">
      <time datetime="2026-03-19T14:32:00Z">Yesterday, 2:32 PM</time>
      <p><strong>You</strong> edited <a href="/docs/q4-report">Q4 Report</a></p>
      <p class="detail">Changed title from "Q4 Draft" to "Q4 Final Report"</p>
      <button class="undo-btn">Undo</button>
    </li>
    <li class="activity-item">
      <time datetime="2026-03-18T09:15:00Z">Mar 18, 9:15 AM</time>
      <p><strong>You</strong> deleted 3 files from <a href="/folders/archive">Archive</a></p>
      <p class="detail">budget-v1.xlsx, notes-old.md, draft-2.pdf</p>
      <button class="restore-btn">Restore</button>
    </li>
  </ol>
</section>`,
        explanation:
          'A detailed activity log with timestamps, specific descriptions of what changed, and undo/restore options means users never have to rely on their faulty memory. Searchable and filterable so users can find exactly what they vaguely recall.',
        principle:
          'External records compensate for reconstructive memory — show users what they actually did, not what they think they did',
        metrics: {
          before: '23% of support tickets were "I can\'t remember what I changed"',
          after: '4% of support tickets about forgotten actions after adding activity log',
          improvement: '83% reduction in memory-related support requests',
        },
      },
      {
        title: 'Version History with Visual Diff',
        description:
          'Document editor showing full revision history with change comparisons',
        code: `<aside class="version-panel" aria-label="Version History">
  <h3>Version History</h3>
  <p class="current-indicator">Current version saved 10 minutes ago</p>

  <ol class="version-list">
    <li class="version active">
      <strong>Current Version</strong>
      <time>Mar 20, 3:45 PM</time>
      <span class="author">You</span>
    </li>
    <li class="version">
      <strong>Version 4</strong>
      <time>Mar 19, 2:30 PM</time>
      <span class="author">You</span>
      <span class="summary">+2 paragraphs, -1 image</span>
    </li>
    <li class="version">
      <strong>Version 3</strong>
      <time>Mar 15, 11:00 AM</time>
      <span class="author">Sarah Chen</span>
      <span class="summary">Added comments, revised intro</span>
    </li>
  </ol>

  <div class="diff-view">
    <p class="removed">The project will launch in Q3.</p>
    <p class="added">The project will launch in Q4 2026.</p>
  </div>

  <button class="restore-btn">Restore This Version</button>
</aside>`,
        explanation:
          'Users often misremember what version of a document they last edited, or what a collaborator changed. A visual diff and full version timeline lets users see the objective truth instead of reconstructing from memory.',
        principle:
          'Version history turns memory from a recall task into a recognition task, dramatically reducing errors',
      },
      {
        title: 'Confirmation Screen with Full Details',
        description:
          'Order confirmation that provides a complete, referenceable record',
        code: `<section class="confirmation" aria-label="Order Confirmation">
  <h2>Order Confirmed</h2>
  <p class="order-id">Order #ORD-2026-8847</p>

  <div class="order-details">
    <h3>What You Ordered</h3>
    <ul>
      <li>Pro Plan — Annual ($468/year, billed today)</li>
      <li>5 additional seats ($240/year, billed today)</li>
    </ul>

    <h3>Payment</h3>
    <p>Visa ending in 4242 — Charged $708.00</p>

    <h3>What Happens Next</h3>
    <p>Your Pro features are active now. Your next billing date is March 20, 2027.</p>
  </div>

  <p class="email-notice">A copy of this receipt has been sent to you@example.com</p>
  <a href="/account/orders/ORD-2026-8847">View this order anytime</a>
</section>`,
        explanation:
          'Users routinely misremember what plan they signed up for, how much they paid, and what was included. A detailed confirmation with a persistent link and email copy creates an accurate external record that prevents false memories from causing disputes or confusion.',
        principle:
          'Detailed confirmations create referenceable truth that prevents memory-based disputes',
      },
    ],

    bad: [
      {
        title: 'No Record of Destructive Actions',
        description:
          'File manager that permanently deletes with no undo or history',
        code: `<!-- DON'T DO THIS -->
<dialog class="delete-confirm">
  <p>Delete these files?</p>
  <div class="actions">
    <button class="cancel">Cancel</button>
    <button class="danger">Delete</button>
  </div>
</dialog>
<!-- After clicking Delete: files are gone forever,
     no trash, no undo, no record of what was deleted -->`,
        explanation:
          'With no record of what was deleted and no recovery option, users who misremember whether they meant to delete something (or what the files contained) have no recourse. They will also misremember the system as having "lost" their files rather than recalling that they deleted them.',
        principle:
          'Without an external record, users will reconstruct what happened inaccurately and blame the system',
      },
      {
        title: 'Vague "Changes Saved" Toast',
        description:
          'Settings page that confirms changes without saying what changed',
        code: `<!-- DON'T DO THIS -->
<div class="toast success">
  <p>Changes saved!</p>
</div>
<!-- User changed 4 settings but the toast doesn't say which ones.
     Tomorrow they won't remember what they changed. -->`,
        explanation:
          'A generic "Changes saved" message gives users no anchor for what they actually modified. Within hours they will misremember which settings they changed, potentially leading them to change them again or blame the system when the settings they "didn\'t touch" behave differently.',
        principle:
          'Vague confirmations guarantee false memories about what was actually done',
      },
      {
        title: 'One-Time Onboarding with No Reference',
        description:
          'Complex setup wizard shown once, never accessible again',
        code: `<!-- DON'T DO THIS -->
<div class="onboarding-wizard">
  <h2>Step 3 of 5: Configure Your Workspace</h2>
  <p>Choose your default view, notification preferences,
     and team permissions. You can't change these later
     without contacting support.</p>
  <!-- After completing wizard, no way to review choices
       or access instructions again -->
</div>`,
        explanation:
          'Users will misremember the choices they made during onboarding, the instructions they were given, and even which options were available. With no way to review or revisit, they form false memories about what the product told them and what they configured.',
        principle:
          'One-time instructions are guaranteed to be misremembered — always provide a way to review',
      },
    ],

    realWorld: [
      {
        company: 'Facebook',
        product: 'On This Day / Memories',
        description: 'Facebook\'s "On This Day" feature shows users their actual posts and photos from previous years. This corrects the false nostalgia and reconstructed memories people have about their past, showing them what they actually shared vs what they think they shared.',
        effectiveness: 'very-effective',
        analysis: 'By surfacing real records, Facebook gives users a factual counterpoint to their reconstructed memories. Users frequently express surprise at what they actually posted, demonstrating how much false memory distorts our recall of even our own actions.',
      },
      {
        company: 'Google',
        product: 'Chrome Browser History',
        description: 'Chrome\'s searchable browser history lets users find pages they visited even when they misremember the site name, date, or content. Autocomplete suggestions from history help users recognize what they\'re looking for rather than recall it from scratch.',
        effectiveness: 'very-effective',
        analysis: 'Browser history transforms a recall task ("What was that site I visited last week?") into a recognition task, compensating for users\' inability to accurately reconstruct their browsing from memory.',
      },
      {
        company: 'GitHub',
        product: 'Git Blame and Commit History',
        description: 'Git blame shows exactly who changed every line of code and when, with full commit messages. This prevents the common developer false memory of "I didn\'t change that" or "That was always like that" by providing an irrefutable record.',
        effectiveness: 'very-effective',
        analysis: 'Developers frequently misremember who wrote what code and why. Git blame serves as an objective source of truth that resolves disputes and prevents teams from acting on false memories about their own codebase.',
      },
      {
        company: 'Notion',
        product: 'Page History and Activity Log',
        description: 'Notion provides page-level version history and workspace-wide activity logs, showing every edit, comment, and permission change with timestamps and author attribution.',
        effectiveness: 'effective',
        analysis: 'In collaborative workspaces, team members routinely misremember who edited what and when. Notion\'s audit trail prevents the "I\'m sure I didn\'t delete that paragraph" false memory that causes team friction.',
      },
    ],

    abTests: [
      {
        title: 'Activity Log: Present vs Absent',
        hypothesis:
          'Providing a detailed activity log will reduce support tickets related to "forgotten" actions and increase user confidence',
        controlVersion: {
          description:
            'SaaS dashboard with no activity history — users must rely on their own memory to recall past actions',
          metrics: {
            conversionRate: 'N/A',
            timeOnPage: '2:10',
            scrollDepth: '35%',
          },
        },
        treatmentVersion: {
          description:
            'Same dashboard with a searchable activity log showing all user actions with timestamps, details, and undo options',
          metrics: {
            conversionRate: 'N/A',
            timeOnPage: '4:45',
            scrollDepth: '72%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Support tickets about "I can\'t remember what I changed" dropped 83%. Users spent more time in the product and reported significantly higher confidence in the accuracy of their workspace. Self-service resolution increased by 61%.',
          learnings: [
            'Users vastly overestimate the accuracy of their own memory — they don\'t know they need a log until they have one',
            'Searchable history turns recall into recognition, dramatically reducing cognitive load',
            'Undo options in the activity log reduced "accidental" deletions by 47%',
            'Users who accessed the activity log had 34% higher retention at 30 days',
          ],
        },
      },
      {
        title: 'Confirmation Screens: Detailed vs Generic',
        hypothesis:
          'Detailed confirmation screens with specific action summaries will reduce disputes and increase trust',
        controlVersion: {
          description:
            'Generic confirmation: "Your changes have been saved" with no details about what changed',
          metrics: {
            conversionRate: 'N/A',
            clickThroughRate: '5%',
          },
        },
        treatmentVersion: {
          description:
            'Detailed confirmation: "You changed your plan from Basic to Pro ($49/mo), added 3 team seats, and updated billing to Visa ending 4242" with email receipt link',
          metrics: {
            conversionRate: 'N/A',
            clickThroughRate: '28%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Billing disputes dropped 52%. Users who received detailed confirmations were 3x less likely to contact support claiming they "didn\'t make that change." Trust scores increased significantly.',
          learnings: [
            'Users misremember their own settings changes within 24 hours',
            'Detailed confirmations serve as an external memory anchor',
            'Email receipts were referenced in 34% of subsequent support interactions, resolving issues faster',
            'Specific details ("Visa ending 4242") provided much stronger memory cues than generic confirmations',
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
        name: 'Missing Activity History',
        description: 'No visible record of past user actions in the interface',
        howToSpot: 'Look for the absence of activity feeds, audit logs, or "recent actions" sections — if users must rely entirely on memory, false memory risk is high',
        severity: ImpactLevel.CRITICAL,
      },
      {
        name: 'Vague Confirmations',
        description: 'Toast messages or confirmation screens that lack specific details about what was done',
        howToSpot: 'Look for generic messages like "Saved", "Done", or "Success" without specifying what was saved, done, or completed',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'No Undo or Recovery',
        description: 'Destructive actions (delete, overwrite, submit) with no way to reverse or review',
        howToSpot: 'Try deleting or modifying something and check if there is any undo button, trash folder, or revision history',
        severity: ImpactLevel.CRITICAL,
      },
      {
        name: 'One-Time Instructions',
        description: 'Important guidance shown once during onboarding with no way to revisit',
        howToSpot: 'Complete the onboarding flow and check whether the instructions or choices can be reviewed later',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Absent Change Attribution',
        description: 'In collaborative tools, changes appear with no indication of who made them or when',
        howToSpot: 'Look for shared documents or settings where edits are not attributed to specific users or timestamps',
        severity: ImpactLevel.HIGH,
      },
    ],

    patterns: [
      {
        name: 'Memory-Dependent Navigation',
        description: 'Users must recall names, paths, or locations from memory to find things they previously accessed',
        indicators: ['No "recently viewed" section', 'No search with history-aware suggestions', 'No bookmarks or favorites', 'Navigation requires recall instead of recognition'],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Ephemeral State Pattern',
        description: 'System states, notifications, or messages that disappear and cannot be retrieved',
        indicators: ['Auto-dismissing toasts with important information', 'Notifications that can\'t be reviewed after dismissal', 'Modal dialogs with no way to re-access their content', 'Temporary banners with critical instructions'],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Unrecorded Collaboration Pattern',
        description: 'Multiple users can modify shared resources with no audit trail',
        indicators: ['Shared settings with no change log', 'Collaborative documents without version history', 'Team actions with no attribution', 'No "last modified by" indicators'],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Recall-Heavy Form Pattern',
        description: 'Forms that require users to remember information from previous steps or sessions',
        indicators: ['Multi-step forms with no summary step', 'Forms referencing prior selections without showing them', 'Settings pages that don\'t show current values', 'Order flows that don\'t recap what was chosen'],
        severity: ImpactLevel.MEDIUM,
        confidence: 'medium',
      },
    ],

    checklistQuestions: [
      'Can users see a record of their past actions in this interface?',
      'Is the activity history searchable and filterable?',
      'Do confirmation messages specify exactly what was changed?',
      'Can destructive actions be undone or recovered?',
      'Is onboarding content accessible after initial setup?',
      'Do collaborative features show who changed what and when?',
      'Are notifications and alerts reviewable after dismissal?',
      'Do multi-step flows provide a summary of all choices made?',
      'Can users verify their current settings against what they remember choosing?',
      'Is navigation designed for recognition rather than recall?',
      'Does the design account for users misremembering their own past actions?',
      'Are there persistent records that serve as external memory for users?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in false memory and reconstructive memory biases.

Analyze the provided design for false memory vulnerability patterns. Identify:

1. **Memory Dependencies**: Where users must rely on their own recall of past actions or states
2. **Missing Records**: Absent activity logs, version history, or audit trails
3. **Ephemeral Information**: Important content that disappears and cannot be retrieved
4. **Vague Confirmations**: Feedback that lacks specific details about what happened
5. **Recall vs Recognition**: Whether navigation and search support recognition over recall

For each vulnerability found:
- Identify what users might misremember and how
- Assess the consequence of the false memory (support ticket, data loss, trust erosion)
- Determine how severe the gap is (critical, high, medium, low)
- Suggest specific design solutions (activity logs, version history, detailed confirmations)
- Evaluate whether the design currently provides any external memory support

Consider:
- Can users verify what they actually did vs what they think they did?
- Are destructive actions recoverable if a user misremembers their intent?
- Do collaborative features prevent "I didn't change that" disputes?
- Is onboarding content re-accessible or is it a one-time memory test?
- Are confirmation screens detailed enough to serve as reference records?

Provide actionable recommendations for reducing false memory vulnerability.`,

    outputSchema: {
      type: 'object',
      properties: {
        memoryVulnerabilities: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              whatUsersMightMisremember: { type: 'string' },
              consequence: { type: 'string' },
              severity: { type: 'string' },
              currentSupport: { type: 'string' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'whatUsersMightMisremember',
              'consequence',
              'severity',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            activityHistoryCoverage: { type: 'number' },
            undoRecoverability: { type: 'number' },
            confirmationDetail: { type: 'number' },
            recognitionOverRecall: { type: 'number' },
          },
          required: [
            'activityHistoryCoverage',
            'undoRecoverability',
            'confirmationDetail',
            'recognitionOverRecall',
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
        'memoryVulnerabilities',
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
        title: 'Audit Memory Dependencies',
        description:
          'Identify every point in your product where users must rely on their own recall of past actions, settings, or information',
        example:
          'Map all flows where users need to remember what they did previously: settings changes, document edits, purchases, deletions',
        tips: [
          'Walk through your product after a 48-hour gap and note where you struggle to remember what you did',
          'Check support tickets for "I don\'t remember" or "I didn\'t do that" complaints',
          'Identify every destructive or irreversible action',
        ],
      },
      {
        step: 2,
        title: 'Implement Activity Logging',
        description:
          'Build a persistent, searchable record of all significant user actions',
        example:
          'Activity feed: "Mar 19, 2:32 PM — You renamed Q4 Draft to Q4 Final Report"',
        tips: [
          'Log the action, the old state, the new state, the timestamp, and the actor',
          'Make the log searchable by keyword, date, and action type',
          'Include direct links to affected items',
        ],
      },
      {
        step: 3,
        title: 'Add Undo and Version History',
        description:
          'Ensure every significant action can be reversed or reviewed',
        example:
          'Google Docs-style version history with named versions, author attribution, and one-click restore',
        tips: [
          'Implement soft deletes with a trash/archive recovery period',
          'Show visual diffs between versions',
          'Allow users to name and pin important versions',
        ],
      },
      {
        step: 4,
        title: 'Design Detailed Confirmations',
        description:
          'Replace generic "Saved" messages with specific summaries of what was done',
        example:
          'Instead of "Changes saved", show "Plan changed from Basic to Pro ($49/mo). Next billing: April 20, 2026. Email receipt sent."',
        tips: [
          'Include the specific items, values, and outcomes',
          'Send email/notification copies for important actions',
          'Provide a persistent link to review the action later',
        ],
      },
      {
        step: 5,
        title: 'Design for Recognition Over Recall',
        description:
          'Wherever possible, let users recognize what they need rather than recall it from memory',
        example:
          'Show "Recently viewed" items, autocomplete search with history, and visual thumbnails instead of requiring users to type exact names',
        tips: [
          'Add "recently viewed" and "recently edited" sections to dashboards',
          'Use search autocomplete that draws from user history',
          'Show current setting values on every settings page, not just during editing',
        ],
      },
    ],

    dos: [
      'Provide searchable activity logs for all significant user actions',
      'Include timestamps, specific details, and actor attribution in all records',
      'Implement undo and version history for all editable content',
      'Use detailed confirmation screens that specify exactly what was done',
      'Send email receipts and notifications for important actions',
      'Design navigation for recognition (recently viewed, favorites) over recall',
      'Make onboarding content re-accessible at any time',
      'Show "last modified" indicators on collaborative content',
    ],

    donts: [
      'Don\'t rely on users accurately remembering their past actions',
      'Don\'t use generic confirmation messages like "Saved" without details',
      'Don\'t make deletions or overwrites permanently irreversible',
      'Don\'t show important instructions only once during onboarding',
      'Don\'t dismiss notifications and alerts without a way to review them later',
      'Don\'t require users to recall exact names, paths, or IDs from memory',
      'Don\'t assume users will remember what settings they chose last week',
      'Don\'t build collaborative tools without change attribution and audit trails',
    ],

    bestPractices: [
      {
        title: 'External Memory Over Internal Memory',
        description:
          'Always provide a system-of-record that users can reference instead of relying on their own recall',
        rationale:
          'Human memory is reconstructive, not reproductive — external records are the only reliable source of truth',
        example:
          'Activity log, version history, email receipts, and confirmation pages all serve as external memory',
      },
      {
        title: 'Recognition Over Recall at Every Level',
        description:
          'Design all navigation, search, and settings to let users recognize what they need rather than recall it',
        rationale:
          'Recognition tasks are vastly more accurate than recall tasks because they provide cues that trigger correct memories',
        example:
          'Show recent items with thumbnails, autocomplete search from history, display current settings alongside change forms',
      },
      {
        title: 'Graceful Recovery from Misremembered Actions',
        description:
          'Assume users will misremember what they did and build recovery paths accordingly',
        rationale:
          'Users who believe they "didn\'t do that" need a way to verify and recover, not a dead end',
        example:
          'Soft deletes with 30-day recovery, undo for the last N actions, revision history with one-click restore',
      },
      {
        title: 'Specific Over Generic Feedback',
        description:
          'Every system response should include enough detail to serve as a future memory reference',
        rationale:
          'Generic feedback provides no memory anchor; specific feedback creates a referenceable record',
        example:
          '"Email changed to john@new.com" instead of "Settings saved"',
      },
      {
        title: 'Continuous Memory Support',
        description:
          'Provide memory aids throughout the user journey, not just at action time',
        rationale:
          'Users revisit products after days, weeks, or months and need help reconstructing their context',
        example:
          '"Welcome back! You were last working on Q4 Report (3 days ago). You have 2 unseen comments."',
      },
    ],

    accessibility: [{
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships - Activity logs and version history must use semantic HTML',
        implementation:
          'Use ordered lists for chronological activity, proper table markup for audit trails, and ARIA labels for interactive history controls',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.4.1',
        guideline:
          'Use of Color - Don\'t rely only on color to indicate changes in diff views',
        implementation:
          'Combine color coding (red/green for deletions/additions) with text prefixes (+/-), icons, or labels accessible to screen readers',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.4.6',
        guideline:
          'Headings and Labels - Activity entries and version labels must be descriptive',
        implementation:
          'Label each activity entry and version with clear, descriptive headings that convey the action, author, and timestamp to all users',
      },
    ],

    ethics: [
      {
        concern: 'Privacy in Activity Tracking',
        severity: 'critical',
        explanation:
          'Detailed activity logs can expose user behavior in ways that feel invasive or that could be used against them',
        mitigation:
          'Be transparent about what is logged. Give users control to view, export, and delete their activity history. Never use logs to blame users in support interactions.',
      },
      {
        concern: 'Gaslighting Through Records',
        severity: 'critical',
        explanation:
          'A system that always asserts its record over the user\'s memory can feel like gaslighting, especially if the system has bugs',
        mitigation:
          'Present records as helpful references, not corrections. Acknowledge that systems can have errors too. Provide a way to dispute or annotate records.',
      },
      {
        concern: 'Surveillance Creep',
        severity: 'high',
        explanation:
          'Activity logging designed to help users can be repurposed for employer surveillance or behavioral tracking',
        mitigation:
          'Clearly separate user-facing activity logs from admin/analytics tracking. Give users visibility into what admins can see. Follow data minimization principles.',
      },
      {
        concern: 'Manipulating Memory Through Selective Display',
        severity: 'high',
        explanation:
          'Showing only positive past interactions (like Facebook Memories) while hiding negative ones can create false nostalgia and manipulate engagement',
        mitigation:
          'If surfacing historical content, do so accurately and give users full control over what is shown and what is hidden.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'Reconstruction of Automobile Destruction: An Example of the Interaction Between Language and Memory',
        author: 'Loftus, E. F., & Palmer, J. C.',
        year: 1974,
        doi: '10.1016/S0022-5371(74)80011-3',
        description:
          'The landmark study showing that the wording of questions can alter eyewitness memory of events, establishing the misinformation effect',
        type: 'foundational',
      },
      {
        title: 'Creating False Memories: Remembering Words Not Presented in Lists',
        author: 'Roediger, H. L., & McDermott, K. B.',
        year: 1995,
        doi: '10.1037/0278-7393.21.4.803',
        description:
          'Introduced the DRM (Deese-Roediger-McDermott) paradigm, demonstrating that people reliably "remember" words they never saw when those words are related to presented items',
        type: 'foundational',
      },
      {
        title: 'The Formation of False Memories',
        author: 'Loftus, E. F.',
        year: 1997,
        doi: '10.1023/A:1025484719507',
        description:
          'Comprehensive review of how entirely false memories of events that never occurred can be implanted through suggestion',
        type: 'advanced',
      },
      {
        title: 'Rich False Memories: The Royal Road to Success',
        author: 'Loftus, E. F.',
        year: 2003,
        description:
          'Overview of research showing that false memories can be as vivid, detailed, and confidently held as real ones',
        type: 'advanced',
      },
    ],

    books: [
      {
        title: 'The Seven Sins of Memory: How the Mind Forgets and Remembers',
        author: 'Schacter, Daniel L.',
        year: 2001,
        isbn: '9780618219193',
        description:
          'Comprehensive framework for understanding memory failures including false memory, misattribution, and suggestibility',
        type: 'foundational',
      },
      {
        title: 'Eyewitness Testimony',
        author: 'Loftus, Elizabeth F.',
        year: 1996,
        isbn: '9780674287778',
        description:
          'Foundational work on the unreliability of human memory and its implications, by the leading researcher in false memory',
        type: 'foundational',
      },
    ],

    articles: [
      {
        title: 'Recognition Over Recall in User Interfaces',
        author: 'Nielsen Norman Group',
        url: 'https://www.nngroup.com/articles/recognition-and-recall/',
        description:
          'Practical UX guide on designing for recognition rather than recall, directly applicable to mitigating false memory effects',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'How Reliable Is Your Memory? — Elizabeth Loftus',
        author: 'TED',
        url: 'https://www.ted.com/talks/elizabeth_loftus_how_reliable_is_your_memory',
        description:
          'Elizabeth Loftus presents decades of research on false memory, showing how memories can be implanted and distorted',
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
