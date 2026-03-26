/**
 * DUNNING KRUGER EFFECT
 *
 * Incompetent people overestimate their ability while experts underestimate theirs
 */


import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const dunningKrugerEffect: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'dunning-kruger-effect',
    name: 'Dunning Kruger Effect',
    aliases: [],
    category: BiasCategory.COGNITIVE,
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
    simple: 'Incompetent people overestimate their ability while experts underestimate theirs',

    detailed: `The Dunning-Kruger Effect is a cognitive bias in which people with limited competence in a domain greatly overestimate their own ability, while genuine experts tend to underestimate theirs. This creates a paradox: the least skilled individuals are often the most confident, while the most skilled doubt themselves.

The effect arises because the same skills needed to produce correct responses are also the skills needed to recognize what a correct response looks like. Without that metacognitive ability, unskilled individuals cannot recognize their own deficits. Conversely, experts assume that tasks they find easy must be easy for everyone, leading them to undervalue their own expertise.

In UX and product design, this bias profoundly affects how users assess their own skill level, choose complexity settings, interact with onboarding flows, and navigate expert-vs-beginner interfaces. Designers must account for the gap between perceived and actual competence when building self-assessment tools, progressive disclosure systems, and skill-gated features.`,

    psychologyBasis: {
      discoveredBy: 'David Dunning and Justin Kruger',
      year: 1999,
      theory: 'Metacognitive Deficiency in the Unskilled',
      mechanism: `The bias stems from a dual failure of metacognition. This happens because:

1. **Metacognitive Deficit**: The skills required to evaluate one's performance are the same skills required to perform well. Without competence, people lack the tools to recognize incompetence.
2. **Illusory Superiority**: Unskilled individuals generate an internal illusion of superiority because they cannot distinguish their poor performance from good performance.
3. **Calibration Failure**: Beginners lack reference points for what expert-level output looks like, so they calibrate their self-assessment against a distorted baseline.
4. **False Consensus**: Low performers assume their level of understanding is typical, believing most people know roughly what they know.
5. **Expert Underestimation**: Highly skilled individuals assume that what comes easily to them comes easily to everyone, producing a "curse of knowledge" that deflates self-assessment.

The effect is asymmetric: training and education reduce overconfidence in novices (as they gain metacognitive awareness), but experts remain prone to underestimating the difficulty others face.`,
    },

    realWorldExample: `In Kruger and Dunning's 1999 study, participants scoring in the bottom quartile on tests of logical reasoning, grammar, and humor estimated their performance to be in the 62nd percentile on average — dramatically overestimating their actual rank. Meanwhile, top-quartile performers estimated themselves around the 75th percentile, underestimating their standing. When bottom-quartile participants were trained in logic, their self-assessments became more accurate — demonstrating that competence itself is required for accurate self-evaluation.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `The Dunning-Kruger Effect fundamentally shapes how users interact with skill-based interfaces, self-assessment tools, and complexity settings. Designers must account for the gap between perceived and actual user competence:

- Self-reported skill levels are unreliable — novices overestimate, experts underestimate
- Onboarding flows that trust user self-assessment will miscalibrate
- Feature complexity settings chosen by users often mismatch their actual needs
- Progressive disclosure must be driven by observed behavior, not self-reported expertise
- Admin panels and developer tools need guardrails for overconfident beginners`,

    whenToUse: [
      {
        title: 'Adaptive Onboarding',
        scenario:
          'When calibrating onboarding complexity to actual user skill level',
        example:
          'Instead of asking "Are you a beginner or expert?", observe user behavior during an interactive tutorial and adapt difficulty dynamically',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Self-Assessment Tools',
        scenario: 'When users need to evaluate their own skills or knowledge',
        example:
          'Replace subjective confidence sliders with calibrated knowledge checks that test actual understanding before assigning skill tiers',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Progressive Disclosure by Observed Skill',
        scenario: 'When revealing advanced features to users as they demonstrate readiness',
        example:
          'Unlock advanced Git commands in a GUI client only after the user has successfully used basic operations (commit, push, pull) multiple times',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Expert vs Novice Interfaces',
        scenario: 'When designing dual-mode interfaces for different skill levels',
        example:
          'Offer a "simple mode" by default with an "advanced mode" toggle, but gate advanced mode behind a brief competency check rather than a simple toggle',
        impact: ImpactLevel.MEDIUM,
      },
      {
        title: 'Error Prevention in Complex Tools',
        scenario: 'When protecting overconfident users from dangerous or irreversible actions',
        example:
          'Require a dry-run preview before executing destructive database queries, even if the user has marked themselves as "advanced"',
        impact: ImpactLevel.CRITICAL,
      },
    ],

    whenToAvoid: [
      {
        title: 'Gatekeeping Core Functionality',
        reason:
          'Skill-gating essential features can frustrate legitimate users and feel patronizing',
        consequence:
          'Users abandon the product because basic workflows are locked behind competency checks',
        alternative:
          'Gate only genuinely dangerous or complex features; keep core functionality accessible to all',
      },
      {
        title: 'Condescending Skill Labels',
        reason:
          'Labeling users as "beginners" can damage self-esteem and create negative associations',
        consequence:
          'Users feel insulted, lose trust, and churn — especially if they perceive the assessment as inaccurate',
        alternative:
          'Use neutral language like "guided mode" vs "full control" rather than skill-level labels',
      },
      {
        title: 'Over-Relying on Self-Reported Data',
        reason:
          'Dunning-Kruger means self-reported expertise is systematically unreliable',
        consequence:
          'Novices get overwhelmed by expert interfaces they chose; experts get bored by beginner flows',
        alternative:
          'Combine self-reports with behavioral signals (task completion, error rates, feature usage patterns)',
      },
      {
        title: 'Blocking Expert Users',
        reason:
          'Excessive guardrails frustrate genuinely skilled users who know what they are doing',
        consequence:
          'Expert users feel the product doesn\'t trust them, leading to tool switching',
        alternative:
          'Provide escape hatches and "don\'t show again" options for experienced users with demonstrated competence',
      },
    ],

    commonMistakes: [
      {
        title: 'Trusting User Self-Assessment at Face Value',
        description:
          'Building skill selection (beginner/intermediate/expert) into onboarding and using it as the sole signal for interface complexity',
        why: 'Novices will select "intermediate" or "expert" because they overestimate their abilities, leading to frustration and errors',
        fix: 'Use behavioral observation (error rates, task completion speed, feature usage) to calibrate the experience, with self-report as only one input',
      },
      {
        title: 'Flat Learning Curves with No Scaffolding',
        description:
          'Presenting all features at once without progressive disclosure, assuming users will self-select what they need',
        why: 'Overconfident beginners will attempt advanced features prematurely and fail, while true experts waste time wading through basics',
        fix: 'Implement behavior-driven progressive disclosure that unlocks complexity based on demonstrated competence',
      },
      {
        title: 'No Guardrails on Dangerous Operations',
        description:
          'Allowing all users to perform destructive or complex operations without confirmation or preview',
        why: 'Overconfident users will execute irreversible actions they don\'t fully understand',
        fix: 'Add dry-run previews, confirmation dialogs with consequence descriptions, and undo capabilities for risky operations',
      },
      {
        title: 'Ignoring Expert Underconfidence',
        description:
          'Designing only for overconfident beginners while neglecting that experts underrate themselves',
        why: 'Expert users may avoid advanced features or tools they are qualified to use because they doubt their ability',
        fix: 'Provide gentle encouragement and evidence of competence: "You\'ve completed 50 successful deployments — you might enjoy our advanced pipeline builder"',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.HIGH,
        description:
          'Layout determines how complexity is revealed and how skill-appropriate paths are presented',
        examples: [
          'Progressive disclosure layouts hide advanced options until earned through demonstrated skill',
          'Side-by-side simple/advanced views let users compare without commitment',
          'Dashboard layouts that adapt density based on observed user proficiency',
          'Wizard-style flows that branch based on behavioral competence signals',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Text complexity and jargon levels signal intended audience and affect comprehension',
        examples: [
          'Technical jargon in tooltips calibrated to observed user level',
          'Layered explanations: headline for beginners, expandable detail for experts',
          'Code examples shown only to users who have demonstrated coding proficiency',
          'Error messages that adapt verbosity: simple for novices, technical for experts',
        ],
      },
      color: {
        level: ImpactLevel.MEDIUM,
        description:
          'Color coding can signal skill levels, risk, and feature complexity',
        examples: [
          'Warm colors (amber, red) on advanced features to signal caution for beginners',
          'Skill-tier badges using color to indicate progression without judgment',
          'Difficulty indicators using green/yellow/red to help users self-calibrate',
          'Subtle background tints differentiating beginner and advanced interface zones',
        ],
      },
      interaction: {
        level: ImpactLevel.CRITICAL,
        description:
          'Interaction patterns determine how users discover their actual skill level through doing',
        examples: [
          'Interactive tutorials that measure actual performance rather than asking about confidence',
          'Undo/redo and dry-run previews that protect overconfident users from mistakes',
          'Contextual hints that appear based on error patterns, not self-reported skill',
          'Confirmation flows that scale with operation risk and inversely with demonstrated expertise',
        ],
      },
      content: {
        level: ImpactLevel.CRITICAL,
        description:
          'Content must bridge the gap between what users think they know and what they actually know',
        examples: [
          'Inline documentation that surfaces when behavioral signals suggest confusion',
          'Calibration quizzes that help users discover their actual knowledge level',
          'Contextual help that appears proactively for users showing Dunning-Kruger patterns',
          'Progress indicators showing objective skill metrics alongside self-assessment',
        ],
      },
      accessibility: {
        level: ImpactLevel.HIGH,
        description:
          'Skill assessment and progressive disclosure must work for all users regardless of ability',
        examples: [
          'Screen reader compatible skill-assessment flows with clear progress feedback',
          'Keyboard-accessible progressive disclosure that doesn\'t trap focus in locked features',
          'Alt text and ARIA labels that clearly communicate feature availability and skill requirements',
          'Reduced-motion alternatives for interactive skill-assessment animations',
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
        title: 'Behavior-Driven Skill Assessment',
        description:
          'Development platform that observes user actions to determine skill level instead of asking',
        code: `<div class="onboarding-flow">
  <h3>Let's get you started</h3>
  <div class="skill-calibration">
    <p class="instruction">Create a simple function that doubles a number:</p>
    <div class="code-editor" role="textbox" aria-label="Code editor">
      <pre><code>function double(n) {
  // your code here
}</code></pre>
    </div>
    <div class="metrics-hidden" aria-hidden="true">
      <!-- Tracks: time to complete, syntax errors, use of advanced patterns -->
    </div>
  </div>
  <div class="adaptive-result">
    <p class="feedback">Nice work! Based on your approach, we've customized
    your workspace for comfortable productivity.</p>
    <!-- No "beginner/expert" label shown — just adapted UI -->
  </div>
</div>`,
        explanation:
          'Rather than asking users to self-assess (which Dunning-Kruger renders unreliable), this flow observes actual coding behavior to calibrate the interface. No skill labels are shown, avoiding ego damage.',
        principle:
          'Observe behavior instead of trusting self-assessment to determine actual skill level',
        metrics: {
          before: '41% of self-reported "experts" needed support tickets within 24 hours',
          after: '12% needed support after behavior-based calibration',
          improvement: '71% reduction in early support requests',
        },
      },
      {
        title: 'Progressive Feature Unlocking',
        description:
          'Database admin tool that unlocks advanced queries after demonstrated competence',
        code: `<div class="query-builder">
  <div class="mode-indicator">
    <span class="current-mode">Standard Mode</span>
    <div class="progression">
      <div class="progress-bar" style="width: 70%" role="progressbar"
           aria-valuenow="70" aria-valuemin="0" aria-valuemax="100">
      </div>
      <p class="progress-text">7 of 10 successful queries to unlock Advanced Mode</p>
    </div>
  </div>

  <div class="available-operations">
    <button class="op enabled">SELECT</button>
    <button class="op enabled">WHERE</button>
    <button class="op enabled">JOIN</button>
    <button class="op locked" disabled aria-label="DROP TABLE - locked until Advanced Mode">
      DROP TABLE <span class="lock-icon">🔒</span>
    </button>
  </div>

  <p class="safety-note">Destructive operations require demonstrated proficiency.
  <a href="#why">Why?</a></p>
</div>`,
        explanation:
          'Destructive operations like DROP TABLE are locked behind demonstrated competence, not self-reported skill. Users see clear, objective criteria for unlocking — removing ambiguity and protecting overconfident beginners.',
        principle:
          'Gate dangerous operations behind demonstrated competence, not self-reported expertise',
      },
      {
        title: 'Expert Encouragement Through Evidence',
        description:
          'Platform that nudges underconfident experts toward advanced features they qualify for',
        code: `<div class="feature-suggestion" role="complementary" aria-label="Feature suggestion">
  <div class="evidence">
    <h4>You might be ready for CI/CD Pipelines</h4>
    <ul class="competence-evidence">
      <li>✓ 127 successful deployments this quarter</li>
      <li>✓ 99.2% deployment success rate</li>
      <li>✓ Average rollback time: 45 seconds</li>
    </ul>
  </div>
  <p class="nudge">Users with your track record typically save 4 hours/week
  with automated pipelines.</p>
  <div class="actions">
    <button class="primary">Explore CI/CD Pipelines</button>
    <button class="secondary">Maybe Later</button>
  </div>
</div>`,
        explanation:
          'Experts often underestimate their abilities (the flip side of Dunning-Kruger). This pattern shows objective evidence of competence to encourage adoption of advanced features the user is clearly ready for.',
        principle:
          'Counter expert underconfidence with objective competence evidence and gentle nudges',
        metrics: {
          before: '18% of qualified users adopted advanced features voluntarily',
          after: '47% adopted after evidence-based encouragement',
          improvement: '161% increase in advanced feature adoption among qualified users',
        },
      },
    ],

    bad: [
      {
        title: 'Naive Self-Assessment Selector',
        description:
          'Onboarding flow that trusts user self-reported skill level',
        code: `<!-- DON'T DO THIS -->
<div class="onboarding">
  <h2>What's your experience level?</h2>
  <div class="skill-selector">
    <button class="level" data-level="beginner">
      🌱 Beginner — I'm just starting out
    </button>
    <button class="level" data-level="intermediate">
      🌿 Intermediate — I know the basics
    </button>
    <button class="level selected" data-level="expert">
      🌳 Expert — I'm a pro!
    </button>
  </div>
  <!-- 73% of actual beginners select "Intermediate" or "Expert" -->
</div>`,
        explanation:
          'Asking users to self-assess their skill level is fundamentally broken due to Dunning-Kruger. Beginners overestimate and select higher tiers, landing in interfaces too complex for them. Experts may underselect.',
        principle:
          'Never use self-reported skill as the sole determinant of interface complexity',
      },
      {
        title: 'All Features Exposed Without Guardrails',
        description:
          'Admin panel showing destructive operations alongside basic ones with no protection',
        code: `<!-- DON'T DO THIS -->
<div class="admin-panel">
  <h3>Database Operations</h3>
  <div class="actions-grid">
    <button class="action">View Records</button>
    <button class="action">Add Record</button>
    <button class="action">Edit Record</button>
    <button class="action danger">Drop Table</button>
    <button class="action danger">Truncate Database</button>
    <button class="action danger">Reset All Permissions</button>
  </div>
  <!-- No confirmation, no preview, no skill gating -->
</div>`,
        explanation:
          'Placing destructive operations alongside routine ones with no guardrails is dangerous when overconfident users have access. A user who overestimates their database knowledge may execute DROP TABLE without understanding the consequences.',
        principle:
          'Destructive operations need guardrails proportional to their risk, regardless of user confidence',
      },
      {
        title: 'Condescending Skill Labels',
        description:
          'Interface that explicitly labels users with skill tiers',
        code: `<!-- DON'T DO THIS -->
<div class="user-profile">
  <div class="skill-badge beginner">
    <span class="badge-icon">🔰</span>
    <span class="badge-text">BEGINNER</span>
  </div>
  <p class="restriction-notice">
    Some features are restricted because you are a beginner.
    <a href="#">Take a test to upgrade your level.</a>
  </p>
</div>`,
        explanation:
          'Explicitly labeling users as "beginners" and restricting features creates resentment, especially in users who already overestimate their abilities. The label feels like an insult rather than helpful guidance.',
        principle:
          'Avoid ego-damaging labels; use neutral language and behavior-based adaptation instead',
      },
    ],

    realWorld: [
      {
        company: 'GitHub',
        product: 'Contribution Graph & Profile Levels',
        description: 'GitHub uses observable behavior (commits, PRs, code reviews) rather than self-reported expertise to surface skill signals. The contribution graph and achievement badges reflect actual activity, helping users and employers calibrate skill assessment against objective data rather than self-perception.',
        effectiveness: 'very-effective',
        analysis: 'By grounding skill signals in observable behavior, GitHub sidesteps Dunning-Kruger entirely. Users cannot inflate their contribution graph; it reflects reality. This helps hiring managers and collaborators assess actual competence.',
      },
      {
        company: 'Stack Overflow',
        product: 'Reputation and Privilege System',
        description: 'Stack Overflow gates moderation privileges (editing, closing, deleting) behind reputation thresholds earned through community-validated answers. Users cannot self-promote to moderator status; they must demonstrate competence that others verify.',
        effectiveness: 'very-effective',
        analysis: 'The reputation system is a textbook Dunning-Kruger countermeasure: privileges are tied to demonstrated and peer-validated competence, not self-assessment. Overconfident beginners cannot access destructive moderation tools until the community has verified their expertise.',
      },
      {
        company: 'Duolingo',
        product: 'Placement Test and Adaptive Difficulty',
        description: 'Duolingo does not ask users to self-assess their language level. Instead, it offers a placement test that observes actual comprehension and production. The adaptive algorithm then continuously adjusts difficulty based on error rates and response times, not user confidence.',
        effectiveness: 'very-effective',
        analysis: 'By measuring actual performance rather than trusting self-reports, Duolingo avoids placing overconfident beginners in advanced lessons (where they would fail and churn) or boring experts with basics they have mastered.',
      },
      {
        company: 'LinkedIn',
        product: 'Skill Assessments',
        description: 'LinkedIn offers optional skill assessment quizzes that award a "verified" badge. Users who self-list skills on their profile can take a test to prove competence. Data shows that many users who list a skill fail the assessment, revealing Dunning-Kruger patterns in professional self-marketing.',
        effectiveness: 'effective',
        analysis: 'LinkedIn Skill Assessments provide a calibration mechanism that surfaces the gap between self-reported and actual competence. The optional nature prevents resentment, while the badge system rewards genuine expertise.',
      },
    ],

    abTests: [
      {
        title: 'Onboarding: Self-Assessment vs Behavioral Calibration',
        hypothesis:
          'Behavior-based skill calibration will reduce early support requests and improve retention compared to self-reported skill selection',
        controlVersion: {
          description:
            'Onboarding flow asking users to select their skill level (Beginner / Intermediate / Expert) and adapting the interface accordingly',
          metrics: {
            conversionRate: '62%',
            timeOnPage: '1:45',
            scrollDepth: '55%',
          },
        },
        treatmentVersion: {
          description:
            'Onboarding flow with a short interactive task (3 minutes) that observes user behavior to determine skill level, then adapts the interface with no explicit skill label shown',
          metrics: {
            conversionRate: '71%',
            timeOnPage: '4:20',
            scrollDepth: '82%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Behavioral calibration increased onboarding completion by 15% and reduced first-week support tickets by 58%. Users in the treatment group were 2.3x more likely to still be active after 30 days. The key driver was accurate skill-matching: novices got appropriate scaffolding instead of being dropped into expert interfaces they had chosen.',
          learnings: [
            'Self-reported skill level correlated only 34% with actual assessed skill',
            'Overconfident beginners (67% of self-reported "experts") had 4x higher churn in control',
            'Behavioral calibration took longer but dramatically improved downstream metrics',
            'Users did not object to the interactive assessment when it was framed as "personalization"',
          ],
        },
      },
      {
        title: 'Advanced Feature Gating: Self-Unlock vs Competence-Unlock',
        hypothesis:
          'Gating advanced features behind demonstrated competence will reduce errors and increase satisfaction versus letting users self-unlock',
        controlVersion: {
          description:
            'Advanced features accessible via a simple toggle: "Enable Advanced Mode" checkbox',
          metrics: {
            conversionRate: '45%',
            clickThroughRate: '38%',
          },
        },
        treatmentVersion: {
          description:
            'Advanced features unlock automatically after users complete 10 successful operations in standard mode, with a progress indicator showing unlock status',
          metrics: {
            conversionRate: '52%',
            clickThroughRate: '61%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Competence-based unlocking reduced critical errors by 73% and increased user satisfaction scores by 22%. Users who earned advanced mode through demonstrated skill were significantly more successful with advanced features.',
          learnings: [
            'Users who self-unlocked advanced mode had 4.1x more critical errors',
            'Competence-unlocked users had higher feature adoption and lower revert rates',
            'The progress indicator itself motivated users to complete more standard operations',
            'Combining a progress indicator with behavioral gating created a positive feedback loop',
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
        name: 'Self-Assessment Selectors',
        description:
          'Dropdowns, radio buttons, or toggles asking users to declare their own skill level',
        howToSpot:
          'Look for "beginner/intermediate/expert" selectors in onboarding, settings, or profile pages',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Flat Feature Exposure',
        description:
          'All features and complexity levels presented simultaneously without progressive disclosure',
        howToSpot:
          'Check for admin panels, toolbars, or settings pages that expose advanced and basic options side by side with no differentiation',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Overconfident Default Settings',
        description:
          'Default configurations that assume high user competence (e.g., advanced mode on, guardrails off)',
        howToSpot:
          'Look for defaults that favor power users: raw SQL editors shown by default, manual configuration over wizards, disabled confirmation dialogs',
        severity: ImpactLevel.CRITICAL,
      },
      {
        name: 'Missing Competence Evidence',
        description:
          'Absence of objective skill indicators alongside self-reported skill claims',
        howToSpot:
          'Check if user profiles show self-listed skills without any verification, badges, or objective metrics',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'No Progressive Disclosure',
        description:
          'Complex tools that show all options at once regardless of user proficiency',
        howToSpot:
          'Look for dense settings pages, multi-option toolbars, or dashboards with no guided or simplified mode',
        severity: ImpactLevel.HIGH,
      },
    ],

    patterns: [
      {
        name: 'Self-Report Gating Pattern',
        description: 'Interface complexity gated entirely by user self-assessment rather than observed behavior',
        indicators: ['Skill-level selectors in onboarding', 'Manual mode toggles (simple/advanced)', '"I am an expert" checkboxes', 'Self-declared proficiency in profiles'],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Flat Complexity Pattern',
        description: 'All features exposed at the same level with no progressive disclosure or competence gating',
        indicators: ['Admin panels with destructive operations alongside basic ones', 'Settings pages with no grouping by complexity', 'Feature-dense toolbars with no collapsing', 'No guided vs expert mode distinction'],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Absent Calibration Pattern',
        description: 'No mechanism for users to discover the gap between their perceived and actual skill level',
        indicators: ['No knowledge checks or placement tests', 'No objective skill metrics or badges', 'No feedback on task performance accuracy', 'Self-reported skills accepted without verification'],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Missing Expert Encouragement Pattern',
        description: 'No system for identifying underconfident experts and nudging them toward advanced features',
        indicators: ['No usage-based feature recommendations', 'No "you might be ready for X" prompts', 'No evidence-based competence feedback', 'Advanced features hidden behind opt-in with no encouragement'],
        severity: ImpactLevel.MEDIUM,
        confidence: 'medium',
      },
    ],

    checklistQuestions: [
      'Does the interface rely on self-reported skill levels for feature gating or complexity adjustment?',
      'Are destructive or advanced operations protected by guardrails proportional to their risk?',
      'Is there progressive disclosure driven by observed user behavior rather than self-assessment?',
      'Do users receive objective feedback on their actual performance and skill level?',
      'Are expert users encouraged to try advanced features based on their demonstrated competence?',
      'Are skill labels neutral and non-condescending (e.g., "guided mode" vs "beginner")?',
      'Is there a calibration mechanism (quiz, placement test, interactive task) to ground self-assessment?',
      'Does the interface adapt to users who demonstrate competence over time?',
      'Are overconfident users protected from irreversible mistakes without feeling patronized?',
      'Does the design account for expert underconfidence as well as novice overconfidence?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in the Dunning-Kruger Effect — the bias where unskilled individuals overestimate their competence while experts underestimate theirs.

Analyze the provided design for Dunning-Kruger vulnerability patterns. Identify:

1. **Self-Assessment Reliance**: Where does the interface trust user self-reports of skill or expertise?
2. **Skill Gating**: How are advanced or dangerous features gated — by self-report, behavioral observation, or not at all?
3. **Progressive Disclosure**: Does complexity scale with demonstrated competence, or is it flat?
4. **Overconfidence Guardrails**: Are overconfident beginners protected from costly mistakes?
5. **Expert Underconfidence**: Are skilled users encouraged to adopt advanced features they qualify for?
6. **Calibration Mechanisms**: Are there quizzes, placement tests, or behavioral signals that help users discover their actual skill level?

For each pattern found:
- Identify whether it assumes accurate self-assessment (a Dunning-Kruger vulnerability)
- Assess the risk: what happens when a novice overestimates or an expert underestimates?
- Determine if the interface adapts to actual vs perceived competence
- Evaluate whether skill labels are neutral or ego-damaging
- Suggest improvements for behavior-driven skill calibration

Consider:
- Are overconfident users one click away from irreversible damage?
- Do underconfident experts miss features they are qualified to use?
- Does onboarding produce accurate or distorted skill-matching?
- Are there feedback loops that help users calibrate self-assessment over time?
- Is the skill-assessment system accessible to users of all abilities?

Provide actionable recommendations for designing interfaces resilient to the Dunning-Kruger Effect.`,

    outputSchema: {
      type: 'object',
      properties: {
        dunningKrugerPatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              selfAssessmentReliance: { type: 'string' },
              riskIfOverconfident: { type: 'string' },
              riskIfUnderconfident: { type: 'string' },
              currentGuardrails: { type: 'string' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'selfAssessmentReliance',
              'riskIfOverconfident',
              'recommendation',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            selfAssessmentReliance: { type: 'number' },
            guardrailAdequacy: { type: 'number' },
            progressiveDisclosureScore: { type: 'number' },
            expertEncouragementScore: { type: 'number' },
            calibrationMechanismScore: { type: 'number' },
          },
          required: [
            'selfAssessmentReliance',
            'guardrailAdequacy',
            'progressiveDisclosureScore',
            'calibrationMechanismScore',
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
        'dunningKrugerPatterns',
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
        title: 'Identify Skill-Sensitive Surfaces',
        description:
          'Map every point in the interface where user competence affects outcomes: settings, admin tools, destructive operations, complexity toggles',
        example:
          'Audit: database admin panel has 12 operations, 4 are destructive, 3 require advanced knowledge',
        tips: [
          'List every feature where a skill mismatch could cause harm',
          'Identify which operations are reversible vs irreversible',
          'Map the gap between what users think they can do and what they actually can do',
        ],
      },
      {
        step: 2,
        title: 'Replace Self-Assessment with Behavioral Observation',
        description:
          'Design systems that observe actual user behavior (error rates, task completion, feature usage) to determine skill level',
        example:
          'Track: successful query count, error frequency, feature breadth usage to build a behavioral skill profile',
        tips: [
          'Use error rates as a primary signal of actual competence',
          'Track task completion time as a secondary competence indicator',
          'Combine multiple behavioral signals for more accurate assessment',
        ],
      },
      {
        step: 3,
        title: 'Implement Progressive Disclosure',
        description:
          'Reveal advanced features gradually as users demonstrate readiness through successful use of simpler features',
        example:
          'Unlock SQL JOINs after 20 successful single-table queries; unlock DROP after 50 successful operations with zero critical errors',
        tips: [
          'Set clear, objective thresholds for feature unlocking',
          'Show progress toward next unlock to motivate learning',
          'Allow manual override with appropriate guardrails (dry-run, confirmation)',
        ],
      },
      {
        step: 4,
        title: 'Add Guardrails Proportional to Risk',
        description:
          'Scale confirmation dialogs, previews, and safety nets with the destructiveness of the operation, not with user self-reported skill',
        example:
          'DROP TABLE always requires: (1) typing the table name, (2) seeing a preview of affected data, (3) 5-second delay before execution',
        tips: [
          'Irreversible operations should always have guardrails regardless of user level',
          'Reduce guardrails for low-risk operations to avoid fatigue',
          'Provide undo for medium-risk operations as a safety net',
        ],
      },
      {
        step: 5,
        title: 'Encourage Underconfident Experts',
        description:
          'Build systems that identify users with high demonstrated competence but low feature adoption, and nudge them toward advanced tools',
        example:
          'If a user has 100+ successful deployments but has never used CI/CD, show: "Users with your experience save 4 hours/week with pipelines"',
        tips: [
          'Use objective evidence (metrics, history) in encouragement messages',
          'Frame advanced features as time-savers, not skill tests',
          'Make the nudge dismissible and non-recurring after dismissal',
        ],
      },
    ],

    dos: [
      'Observe user behavior to assess actual competence rather than trusting self-reports',
      'Implement progressive disclosure that unlocks features based on demonstrated skill',
      'Add guardrails proportional to operation risk, not user confidence level',
      'Use neutral language for skill modes (guided/full-control) rather than labels (beginner/expert)',
      'Provide calibration mechanisms (quizzes, placement tests, interactive tasks)',
      'Nudge underconfident experts toward features they are qualified to use',
      'Show objective competence evidence to help users calibrate self-assessment',
      'Design onboarding that adapts to actual performance, not stated experience',
    ],

    donts: [
      'Don\'t gate interface complexity solely on user self-reported skill level',
      'Don\'t expose destructive operations without guardrails regardless of user confidence',
      'Don\'t use condescending skill labels that damage user self-esteem',
      'Don\'t assume users know what they don\'t know — that is the core of the bias',
      'Don\'t design only for overconfident beginners; account for underconfident experts too',
      'Don\'t present all features at once without progressive disclosure',
      'Don\'t skip guardrails for self-declared "experts" without behavioral verification',
      'Don\'t rely on a single signal for skill assessment; combine behavioral, temporal, and performance data',
    ],

    bestPractices: [
      {
        title: 'Behavioral Skill Profiling',
        description:
          'Build user skill profiles from observed behavior (error rates, task completion, feature usage) rather than self-assessment',
        rationale:
          'Self-reported skill is systematically unreliable due to Dunning-Kruger; behavioral data reflects actual competence',
        example:
          'Track: queries executed, error rate, feature breadth, time-to-complete — weight recent behavior more heavily',
      },
      {
        title: 'Graduated Complexity Revelation',
        description:
          'Reveal interface complexity in stages tied to demonstrated competence milestones',
        rationale:
          'Prevents overconfident beginners from accessing features they cannot use safely, while ensuring experts are not held back',
        example:
          'Stage 1: basic CRUD operations. Stage 2 (after 20 successes): joins and aggregations. Stage 3 (after 50): schema modifications',
      },
      {
        title: 'Risk-Proportional Guardrails',
        description:
          'Scale confirmation and safety mechanisms with operation risk, not user self-reported skill',
        rationale:
          'High-risk operations should always have protection; low-risk operations should minimize friction',
        example:
          'Read operations: no confirmation. Write: simple confirm. Delete: type resource name. Drop database: type name + 10-second delay + manager approval',
      },
      {
        title: 'Evidence-Based Expert Nudges',
        description:
          'Identify underconfident experts via behavioral signals and encourage them with objective evidence',
        rationale:
          'Dunning-Kruger affects experts too — they underestimate themselves and underuse advanced features they are qualified for',
        example:
          '"You have merged 200+ PRs with a 98% approval rate. Have you tried our automated code review feature?"',
      },
      {
        title: 'Neutral Skill Language',
        description:
          'Use neutral, non-judgmental labels for skill modes and feature tiers',
        rationale:
          'Labels like "beginner" feel insulting to overconfident users and inaccurate to underconfident experts',
        example:
          'Use "Guided Mode" and "Full Control" instead of "Beginner Mode" and "Expert Mode"',
      },
    ],

    accessibility: [{
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships - Skill assessments and progressive disclosure must be semantically structured',
        implementation:
          'Use proper ARIA roles and labels for skill-assessment flows, progress indicators, and feature-lock states so screen reader users understand what is available and what is locked',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.4.1',
        guideline:
          'Use of Color - Skill-level indicators and feature-lock states must not rely on color alone',
        implementation:
          'Combine color with icons, text labels, and ARIA attributes to communicate feature availability and skill progression to all users',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.1.1',
        guideline:
          'Keyboard - All skill-assessment interactions must be keyboard accessible',
        implementation:
          'Interactive calibration tasks, placement tests, and progressive disclosure controls must be fully operable via keyboard without trapping focus',
      },
      {
        wcagLevel: 'AA',
        criterion: '4.1.3',
        guideline:
          'Status Messages - Skill progression and feature unlock notifications must be announced to assistive technology',
        implementation:
          'Use aria-live regions to announce feature unlocks, skill progression milestones, and competence feedback to screen reader users',
      },
    ],

    ethics: [
      {
        concern: 'Patronizing Skill Assessment',
        severity: 'high',
        explanation:
          'Labeling users as "beginners" or restricting features based on inaccurate assessments damages self-esteem and trust',
        mitigation:
          'Use neutral language (guided/full-control), behavior-based assessment, and transparent criteria for feature unlocking. Never display derogatory skill labels.',
      },
      {
        concern: 'Privacy of Behavioral Tracking',
        severity: 'high',
        explanation:
          'Observing user behavior for skill assessment requires collecting usage data, which has privacy implications',
        mitigation:
          'Be transparent about behavioral tracking. Allow users to view their skill profile. Process data locally when possible. Comply with GDPR and similar regulations.',
      },
      {
        concern: 'Gatekeeping and Exclusion',
        severity: 'critical',
        explanation:
          'Overly aggressive skill-gating can prevent legitimate users from accessing features they need, creating artificial barriers',
        mitigation:
          'Always provide override paths with appropriate guardrails (dry-run previews, confirmation dialogs). Gate only genuinely dangerous operations.',
      },
      {
        concern: 'Bias in Behavioral Assessment',
        severity: 'high',
        explanation:
          'Behavioral skill profiles may disadvantage users with disabilities, slower processing speeds, or non-standard interaction patterns',
        mitigation:
          'Ensure behavioral assessment accounts for diverse interaction styles. Do not penalize users who work more slowly, use assistive technology, or have different patterns of engagement.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'Unskilled and Unaware of It: How Difficulties in Recognizing One\'s Own Incompetence Lead to Inflated Self-Assessments',
        author: 'Kruger, J., & Dunning, D.',
        year: 1999,
        doi: '10.1037/0022-3514.77.6.1121',
        url: 'https://psycnet.apa.org/doi/10.1037/0022-3514.77.6.1121',
        description:
          'The foundational paper introducing the Dunning-Kruger Effect, demonstrating that unskilled individuals overestimate their competence across multiple domains',
        type: 'foundational',
      },
      {
        title: 'Why People Fail to Recognize Their Own Incompetence',
        author: 'Dunning, D., Johnson, K., Ehrlinger, J., & Kruger, J.',
        year: 2003,
        doi: '10.1111/1467-8721.01235',
        description:
          'Follow-up research exploring the metacognitive mechanisms underlying the Dunning-Kruger Effect',
        type: 'advanced',
      },
      {
        title: 'The Dunning-Kruger Effect: On Being Ignorant of One\'s Own Ignorance',
        author: 'Dunning, D.',
        year: 2011,
        description:
          'Comprehensive review chapter summarizing a decade of research on the effect and its implications',
        type: 'advanced',
      },
    ],

    books: [
      {
        title: 'Thinking, Fast and Slow',
        author: 'Kahneman, Daniel',
        year: 2011,
        isbn: '9780374275631',
        description:
          'Covers overconfidence and calibration biases, closely related to the Dunning-Kruger Effect',
        type: 'foundational',
      },
      {
        title: 'The Knowledge Illusion: Why We Never Think Alone',
        author: 'Sloman, Steven & Fernbach, Philip',
        year: 2017,
        isbn: '9780399184369',
        description:
          'Explores how people overestimate their understanding of complex systems — a theme closely aligned with Dunning-Kruger',
        type: 'practical',
      },
    ],

    articles: [
      {
        title: 'We Are All Confident Idiots',
        author: 'Dunning, David',
        url: 'https://psmag.com/social-justice/confident-idiots-92793',
        description:
          'Accessible overview of the Dunning-Kruger Effect by one of its discoverers, with real-world examples',
        type: 'practical',
      },
      {
        title: 'The Dunning-Kruger Effect in UX Design',
        author: 'Nielsen Norman Group',
        url: 'https://www.nngroup.com/articles/dunning-kruger-ux/',
        description:
          'Practical implications of Dunning-Kruger for designing user interfaces and self-assessment tools',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'Why Incompetent People Think They\'re Amazing',
        author: 'TED-Ed',
        url: 'https://www.youtube.com/watch?v=pOLmD_WVY-E',
        description:
          'Animated explanation of the Dunning-Kruger Effect with clear examples and research summary',
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
