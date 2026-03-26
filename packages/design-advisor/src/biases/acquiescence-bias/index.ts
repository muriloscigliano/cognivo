/**
 * ACQUIESCENCE BIAS
 *
 * The tendency to agree with statements or say "yes" regardless of content.
 */

import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const acquiescenceBias: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'acquiescence-bias',
    name: 'Acquiescence Bias',
    aliases: ['Yes-Saying Bias', 'Agreement Bias', 'Yea-Saying'],
    category: BiasCategory.COGNITIVE,
    relatedCategories: [
      BiasCategory.DECISION_MAKING,
      BiasCategory.PERCEPTION,
    ],
    tags: [
      'agreement',
      'compliance',
      'survey-design',
      'questioning',
      'social-desirability',
      'user-research',
      'feedback',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple: 'We tend to agree with statements or say "yes" regardless of content.',

    detailed: `Acquiescence bias is the tendency for respondents to agree with statements presented to them, regardless of the actual content. When asked a yes/no question or presented with a Likert-scale statement, people disproportionately select "agree" or "yes" — even when the statement contradicts their true beliefs or prior responses.

This bias is especially prevalent in surveys, interviews, feedback forms, and any interface that solicits user opinions through agree/disagree scales. It stems from social norms around politeness, cognitive laziness (agreeing requires less effort than critically evaluating), and power dynamics between the questioner and respondent.

In UX and product design, acquiescence bias poses a serious threat to data quality. Feedback forms, NPS surveys, user research interviews, consent flows, and confirmation dialogs are all vulnerable. Designers who fail to account for this bias will collect misleadingly positive data and build products based on false signals.`,

    psychologyBasis: {
      discoveredBy: 'Cronbach',
      year: 1946,
      theory: 'Response Set Theory',
      mechanism: `Acquiescence bias arises from multiple interacting psychological mechanisms:

1. **Cognitive Economy**: Agreeing is cognitively easier than disagreeing. Saying "yes" requires less mental effort than critically evaluating a statement and formulating a "no" response.
2. **Social Desirability**: People want to be seen as agreeable and cooperative. Disagreeing feels confrontational, especially with authority figures or brands.
3. **Power Asymmetry**: When respondents perceive the questioner as higher-status (researcher, company, institution), they default to agreement to maintain social harmony.
4. **Satisficing**: Rather than optimizing their responses, respondents "satisfice" — picking the easiest acceptable answer, which is often "agree."
5. **Cultural Norms**: Some cultures have stronger acquiescence tendencies due to collectivist values, deference to authority, or politeness norms.

The bias is automatic and pervasive — respondents are typically unaware they are defaulting to agreement rather than expressing genuine opinions.`,
    },

    realWorldExample: `In a landmark study, researchers presented participants with pairs of contradictory statements (e.g., "I enjoy meeting new people" and "I prefer to avoid social gatherings"). A significant proportion of respondents agreed with both contradictory statements, demonstrating that their "agree" responses were driven by acquiescence rather than genuine attitudes. This pattern has been replicated across domains from political surveys to product feedback forms, showing that agreement rates can inflate positive responses by 10-20%.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `Acquiescence bias fundamentally threatens the validity of user feedback and research data. It affects how users respond to surveys, consent to terms, confirm actions, and provide feedback. Designers must account for this bias to:

- Collect accurate, unbiased user feedback through balanced survey instruments
- Design research methodologies that surface genuine opinions rather than reflexive agreement
- Build consent flows that ensure informed, deliberate choices rather than automatic "yes" clicks
- Create confirmation dialogs that prompt genuine reflection rather than habitual agreement
- Structure feedback forms that capture real sentiment, not politeness-driven positivity`,

    whenToUse: [
      {
        title: 'Survey Instrument Design',
        scenario:
          'When designing NPS surveys, satisfaction questionnaires, or feedback forms',
        example:
          'Use balanced scales with equal numbers of positively and negatively worded items, and alternate their order to counteract acquiescence',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'User Research Interviews',
        scenario: 'When conducting qualitative research or usability testing',
        example:
          'Use open-ended questions ("Tell me about your experience") instead of leading ones ("Did you find this easy to use?")',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Consent and Permission Flows',
        scenario: 'When asking users to agree to terms, permissions, or data collection',
        example:
          'Require active, specific choices rather than a single "I agree to all" checkbox to ensure deliberate consent',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Confirmation Dialogs',
        scenario: 'When asking users to confirm destructive or important actions',
        example:
          'Use friction-adding confirmation (type the project name to delete) rather than simple "Yes/No" dialogs that invite reflexive agreement',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'A/B Test Survey Methodology',
        scenario: 'When collecting qualitative feedback alongside quantitative A/B tests',
        example:
          'Use forced-choice between two options rather than agree/disagree scales to eliminate acquiescence from survey results',
        impact: ImpactLevel.MEDIUM,
      },
    ],

    whenToAvoid: [
      {
        title: 'Quick Pulse Checks',
        reason:
          'Sometimes a simple thumbs-up/thumbs-down is appropriate for low-stakes micro-feedback',
        consequence:
          'Over-engineering simple interactions adds unnecessary friction',
        alternative:
          'Use binary reactions (emoji, thumbs) for low-stakes feedback but reserve balanced instruments for important research',
      },
      {
        title: 'Emergency or Time-Critical Flows',
        reason:
          'Adding reverse-coded items or complex balanced scales slows down urgent interactions',
        consequence:
          'Users abandon critical flows due to excessive cognitive load',
        alternative:
          'Use direct, clear prompts for time-sensitive actions and save balanced measurement for post-hoc research',
      },
      {
        title: 'Simple Feature Toggles',
        reason:
          'Toggles and binary on/off settings are action-oriented, not opinion-oriented',
        consequence:
          'Applying survey design principles to UI controls creates confusion',
        alternative:
          'Reserve acquiescence-bias mitigation for opinion and feedback collection, not functional UI controls',
      },
      {
        title: 'Progressive Onboarding',
        reason:
          'Asking users to actively disagree with onboarding steps creates unnecessary friction',
        consequence:
          'Users feel interrogated rather than guided',
        alternative:
          'Use onboarding as education, then collect balanced feedback after the user has experience',
      },
    ],

    commonMistakes: [
      {
        title: 'All Positively-Worded Survey Items',
        description:
          'Writing every survey question so that "agree" means "positive" (e.g., "The product is easy to use," "I am satisfied with support")',
        why: 'Acquiescent respondents will agree with everything, producing artificially inflated satisfaction scores',
        fix: 'Include reverse-coded items: "The product is confusing to navigate," "Support response times are too slow." Balance positive and negative framing.',
      },
      {
        title: 'Leading Questions in User Research',
        description:
          'Asking "Did you find the checkout easy?" instead of "Describe your checkout experience"',
        why: 'Leading questions with embedded positive framing trigger agreement bias, producing unreliable qualitative data',
        fix: 'Use open-ended, neutral prompts: "Walk me through what happened when you tried to check out." Follow up with specific probes only after the user has shared unprompted observations.',
      },
      {
        title: 'Single "I Agree" Consent Checkboxes',
        description:
          'Bundling multiple permissions into one "I agree to all terms" checkbox',
        why: 'Acquiescence bias combined with cognitive laziness means users agree without understanding what they are consenting to',
        fix: 'Break consent into specific, granular choices. Require separate opt-in for each permission category.',
      },
      {
        title: 'Yes-Defaulting Confirmation Dialogs',
        description:
          'Placing "Yes" as the primary, pre-focused button in confirmation dialogs',
        why: 'Users reflexively click the highlighted primary action, especially when it aligns with agreement bias',
        fix: 'For destructive actions, make the safe option (Cancel) the primary button, or require typed confirmation.',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.MEDIUM,
        description:
          'Survey and form layout affects response patterns and agreement tendency',
        examples: [
          'Placing "Agree" options on the left (first in reading order) increases selection',
          'Vertical vs horizontal scale layouts affect acquiescence rates',
          'Grouping all positive items together amplifies agreement streaks',
          'Visual separation between items reduces careless agreement',
        ],
      },
      typography: {
        level: ImpactLevel.LOW,
        description:
          'Text presentation in surveys and forms affects respondent effort',
        examples: [
          'Longer, more complex item wording reduces satisficing and reflexive agreement',
          'Clear, readable typography encourages careful reading over skimming',
          'Bold keywords in survey items draw attention to content rather than default agreement',
          'Item numbering helps respondents track progress and stay engaged',
        ],
      },
      color: {
        level: ImpactLevel.MEDIUM,
        description:
          'Color in response scales and buttons influences agreement patterns',
        examples: [
          'Green "Agree" and red "Disagree" buttons add evaluative framing that amplifies acquiescence',
          'Neutral, uniform colors across scale points reduce directional bias',
          'Highlighting the primary action button biases toward that response',
          'Color-coding survey sections helps differentiate positively and negatively worded items',
        ],
      },
      interaction: {
        level: ImpactLevel.CRITICAL,
        description:
          'Interactive patterns in surveys and dialogs are the primary venue for acquiescence bias',
        examples: [
          'Pre-selected "Agree" radio buttons dramatically increase agreement rates',
          'Auto-advancing after selection reduces reflection time and increases acquiescence',
          'Requiring explicit selection (no default) reduces bias by 15-25%',
          'Adding a brief pause or review step before submission reduces reflexive agreement',
        ],
      },
      content: {
        level: ImpactLevel.CRITICAL,
        description:
          'Question and statement wording is the primary lever for mitigating or amplifying acquiescence bias',
        examples: [
          'Balanced positive/negative item wording is the gold standard for bias reduction',
          'Open-ended questions bypass acquiescence entirely',
          'Forced-choice between two options eliminates agree/disagree framing',
          'Specific, behavioral questions ("How many times did you...") reduce opinion-based acquiescence',
        ],
      },
      accessibility: {
        level: ImpactLevel.HIGH,
        description:
          'Accessible survey design must account for acquiescence bias across modalities',
        examples: [
          'Screen reader users may acquiesce more when scale options are read sequentially (agree first)',
          'Keyboard navigation order for response options affects selection patterns',
          'Clear ARIA labels for survey items help assistive technology users engage critically',
          'Cognitive accessibility: simpler language reduces satisficing but may increase acquiescence in yes/no formats',
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
        title: 'Balanced Likert Scale with Reverse-Coded Items',
        description:
          'Customer satisfaction survey alternating positively and negatively worded items',
        code: `<form class="satisfaction-survey">
  <h3>Help us improve your experience</h3>

  <fieldset class="survey-item">
    <legend>1. The product is easy to navigate.</legend>
    <div class="likert-scale">
      <label><input type="radio" name="q1" value="1"> Strongly Disagree</label>
      <label><input type="radio" name="q1" value="2"> Disagree</label>
      <label><input type="radio" name="q1" value="3"> Neutral</label>
      <label><input type="radio" name="q1" value="4"> Agree</label>
      <label><input type="radio" name="q1" value="5"> Strongly Agree</label>
    </div>
  </fieldset>

  <fieldset class="survey-item reverse-coded">
    <legend>2. I often feel confused about where to find things.</legend>
    <div class="likert-scale">
      <label><input type="radio" name="q2" value="5"> Strongly Disagree</label>
      <label><input type="radio" name="q2" value="4"> Disagree</label>
      <label><input type="radio" name="q2" value="3"> Neutral</label>
      <label><input type="radio" name="q2" value="2"> Agree</label>
      <label><input type="radio" name="q2" value="1"> Strongly Agree</label>
    </div>
  </fieldset>

  <fieldset class="survey-item">
    <legend>3. Customer support resolves my issues quickly.</legend>
    <div class="likert-scale">
      <!-- scale options -->
    </div>
  </fieldset>

  <fieldset class="survey-item reverse-coded">
    <legend>4. I have to contact support multiple times for the same issue.</legend>
    <div class="likert-scale">
      <!-- reverse-scored scale options -->
    </div>
  </fieldset>
</form>`,
        explanation:
          'Alternating positively and negatively worded items forces respondents to read each question carefully. Acquiescent responders who agree with both "easy to navigate" and "confused about where to find things" are flagged as inconsistent, allowing data quality checks.',
        principle:
          'Balanced positive/negative item wording detects and mitigates acquiescence bias',
        metrics: {
          before: '82% satisfaction with all-positive wording',
          after: '67% satisfaction with balanced wording',
          improvement: 'More accurate measurement; identified 18% acquiescent responders',
        },
      },
      {
        title: 'Forced-Choice Survey Design',
        description:
          'Feedback form using forced-choice pairs instead of agree/disagree scales',
        code: `<form class="forced-choice-survey">
  <h3>Which statement better describes your experience?</h3>

  <fieldset class="choice-pair">
    <legend>Navigation</legend>
    <label class="choice">
      <input type="radio" name="nav" value="easy">
      <span>I can usually find what I need without difficulty</span>
    </label>
    <label class="choice">
      <input type="radio" name="nav" value="hard">
      <span>I often struggle to locate the features I need</span>
    </label>
  </fieldset>

  <fieldset class="choice-pair">
    <legend>Performance</legend>
    <label class="choice">
      <input type="radio" name="perf" value="fast">
      <span>The application responds quickly to my actions</span>
    </label>
    <label class="choice">
      <input type="radio" name="perf" value="slow">
      <span>I frequently wait for pages or actions to load</span>
    </label>
  </fieldset>

  <fieldset class="open-ended">
    <legend>What one thing would most improve your experience?</legend>
    <textarea name="improvement" rows="3"
      placeholder="Describe in your own words..."></textarea>
  </fieldset>
</form>`,
        explanation:
          'Forced-choice format completely eliminates the agree/disagree dimension. Respondents must choose between two descriptions, making acquiescence impossible. The open-ended question captures unscripted feedback.',
        principle:
          'Forced-choice eliminates acquiescence by removing the agreement dimension entirely',
        metrics: {
          before: '91% "agree" with "The product meets my needs" (Likert)',
          after: '62% chose the positive option in forced-choice format',
          improvement: 'Revealed 29 percentage points of acquiescence-inflated positivity',
        },
      },
      {
        title: 'Friction-Based Confirmation Dialog',
        description:
          'Destructive action requiring typed confirmation instead of simple yes/no',
        code: `<dialog class="confirm-delete" aria-labelledby="confirm-title">
  <h3 id="confirm-title">Delete project "Cognivo v2"?</h3>
  <p class="warning">This will permanently delete all files,
  settings, and history. This action cannot be undone.</p>

  <div class="confirm-input">
    <label for="project-name">
      Type <strong>Cognivo v2</strong> to confirm deletion:
    </label>
    <input type="text" id="project-name"
      placeholder="Type project name here"
      autocomplete="off">
  </div>

  <div class="actions">
    <button class="primary" type="button">Cancel</button>
    <button class="danger" type="button" disabled>
      Delete permanently
    </button>
  </div>
</dialog>`,
        explanation:
          'Requiring users to type the project name prevents reflexive "Yes" clicking. The Cancel button is the primary (highlighted) action, reversing the typical acquiescence-friendly pattern. The Delete button remains disabled until the user demonstrates deliberate intent.',
        principle:
          'Friction-based confirmation bypasses acquiescence by requiring deliberate, effortful action',
      },
    ],

    bad: [
      {
        title: 'All-Positive Survey Items',
        description:
          'Satisfaction survey with only positively-worded agree/disagree items',
        code: `<!-- DON'T DO THIS -->
<form class="bad-survey">
  <h3>How satisfied are you?</h3>

  <div class="item">
    <p>The product is easy to use.</p>
    <select><option>Agree</option><option>Disagree</option></select>
  </div>
  <div class="item">
    <p>The product is well-designed.</p>
    <select><option>Agree</option><option>Disagree</option></select>
  </div>
  <div class="item">
    <p>I would recommend this product.</p>
    <select><option>Agree</option><option>Disagree</option></select>
  </div>
  <div class="item">
    <p>Customer support is helpful.</p>
    <select><option>Agree</option><option>Disagree</option></select>
  </div>
  <div class="item">
    <p>The product meets my needs.</p>
    <select><option>Agree</option><option>Disagree</option></select>
  </div>
</form>`,
        explanation:
          'Every item is positively worded with "Agree" as the first option. Acquiescent respondents will agree with all five items without critical evaluation, producing artificially high satisfaction scores that mask real usability problems.',
        principle:
          'All-positive wording with agree-first ordering maximizes acquiescence contamination',
      },
      {
        title: 'Leading Questions in User Research',
        description:
          'Usability test script with embedded positive assumptions',
        code: `<!-- DON'T DO THIS -->
<div class="interview-script">
  <h3>Post-Task Interview Questions</h3>
  <ol>
    <li>Did you find the new checkout flow easy to use?</li>
    <li>Was the navigation intuitive?</li>
    <li>Did you like the new color scheme?</li>
    <li>Would you say the page loads quickly?</li>
    <li>Do you agree that this is better than the old version?</li>
  </ol>
</div>`,
        explanation:
          'Every question embeds a positive assumption and invites a "yes" response. Participants will agree with the interviewer due to social desirability and power dynamics, producing useless data that validates the design team\'s assumptions rather than revealing real problems.',
        principle:
          'Leading questions with embedded positive framing produce agreement, not insight',
      },
      {
        title: 'Bundled Consent with Single Agree Button',
        description:
          'Terms of service with a single "I Agree" covering multiple unrelated permissions',
        code: `<!-- DON'T DO THIS -->
<div class="consent-flow">
  <h3>Terms and Conditions</h3>
  <div class="terms-text" style="height: 200px; overflow: scroll;">
    <!-- 15,000 words of legal text -->
  </div>
  <label>
    <input type="checkbox" required>
    I agree to the Terms of Service, Privacy Policy,
    Data Processing Agreement, Cookie Policy,
    marketing communications, and third-party data sharing.
  </label>
  <button class="primary">Continue</button>
</div>`,
        explanation:
          'Bundling multiple permissions into a single agreement exploits acquiescence bias. Users reflexively check the box to proceed without understanding they have consented to marketing emails and third-party data sharing alongside necessary terms.',
        principle:
          'Bundled consent exploits agreement bias to extract permissions users would decline individually',
      },
    ],

    realWorld: [
      {
        company: 'SurveyMonkey',
        product: 'Survey Best Practices Guide',
        description: 'SurveyMonkey recommends balanced scales with alternating positive and negative item wording in their official methodology guides. They provide templates that include reverse-coded items and warn against all-positive surveys.',
        effectiveness: 'very-effective',
        analysis: 'By educating survey creators about acquiescence bias, SurveyMonkey helps produce more valid research data. Their balanced templates have become an industry standard for online survey design.',
      },
      {
        company: 'Apple',
        product: 'App Store Review Prompts',
        description: 'Apple replaced the old "Rate this app" prompt (which invited reflexive 5-star ratings) with a more neutral in-app review system that presents the star picker without leading language, and limits how often apps can prompt users.',
        effectiveness: 'effective',
        analysis: 'The neutral framing and frequency limits reduce acquiescence-driven inflated ratings, producing more reliable app quality signals for the App Store ecosystem.',
      },
      {
        company: 'Slack',
        product: 'NPS Survey Design',
        description: 'Slack uses the standard 0-10 NPS scale but supplements it with open-ended follow-up questions like "What is the primary reason for your score?" rather than leading agree/disagree follow-ups.',
        effectiveness: 'effective',
        analysis: 'The open-ended follow-up bypasses acquiescence bias entirely, surfacing genuine reasons for satisfaction or dissatisfaction that agree/disagree scales would miss.',
      },
      {
        company: 'GitHub',
        product: 'Destructive Action Confirmations',
        description: 'GitHub requires users to type the repository name to confirm deletion, and uses red styling with the warning "This action cannot be undone." The dangerous button is secondary, not primary.',
        effectiveness: 'very-effective',
        analysis: 'Typed confirmation completely bypasses acquiescence bias for destructive actions. Users cannot reflexively agree; they must demonstrate deliberate intent through effortful input.',
      },
    ],

    abTests: [
      {
        title: 'Balanced vs All-Positive Survey Wording',
        hypothesis:
          'Surveys with balanced positive/negative wording will produce more accurate satisfaction scores than all-positive surveys',
        controlVersion: {
          description:
            'Customer satisfaction survey with 10 positively-worded Likert items ("easy to use," "well-designed," "fast," etc.)',
          metrics: {
            conversionRate: '88% overall satisfaction',
            timeOnPage: '1:45 average completion time',
            scrollDepth: '12% response variance',
          },
        },
        treatmentVersion: {
          description:
            'Same survey with 5 positive and 5 reverse-coded negative items, alternating order',
          metrics: {
            conversionRate: '71% overall satisfaction',
            timeOnPage: '2:30 average completion time',
            scrollDepth: '28% response variance',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Balanced wording revealed 17 percentage points of acquiescence-inflated satisfaction. Respondents spent 43% more time (indicating more careful reading). Response variance doubled, producing richer data for product decisions. Identified 15% of respondents as acquiescent (agreed with contradictory items).',
          learnings: [
            'All-positive surveys overestimate satisfaction by 15-20% on average',
            'Balanced wording increases completion time but improves data quality dramatically',
            'Reverse-coded items serve as built-in data quality checks',
            'Higher response variance in balanced surveys indicates genuine opinion measurement',
          ],
        },
      },
      {
        title: 'Forced-Choice vs Agree/Disagree for Feature Feedback',
        hypothesis:
          'Forced-choice format will produce more actionable feature prioritization data',
        controlVersion: {
          description:
            'Feature feedback survey asking users to rate agreement with 8 statements like "I would use dark mode" on a 5-point Likert scale',
          metrics: {
            conversionRate: '82% agreed with 6+ features',
            clickThroughRate: '4.1 average agreement score',
          },
        },
        treatmentVersion: {
          description:
            'Same features presented as paired forced-choices: "Would you rather have dark mode or keyboard shortcuts?" with 8 matchups',
          metrics: {
            conversionRate: 'Clear ranking emerged with top 3 features',
            clickThroughRate: '2.3 average features strongly preferred',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Agree/disagree format showed users "wanting" almost every feature (acquiescence), making prioritization impossible. Forced-choice produced a clear feature ranking that matched actual usage data when features were later released.',
          learnings: [
            'Agree/disagree scales produce artificially high desire for every option',
            'Forced-choice reveals true preference order by eliminating acquiescence',
            'Feature prioritization requires relative comparison, not absolute agreement',
            'Forced-choice data correlated 0.78 with actual feature adoption vs 0.31 for Likert',
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
        name: 'All-Positive Item Wording',
        description:
          'Survey or feedback form where every item is worded so that "agree" means a positive evaluation',
        howToSpot:
          'Read each survey item — if agreeing with every item paints a uniformly positive picture, acquiescence bias is likely inflating scores',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Agree-First Response Order',
        description:
          'Scale options presented with "Agree" or "Yes" as the first/leftmost option',
        howToSpot:
          'Check if "Strongly Agree" appears first in Likert scales or if "Yes" is the first option in binary choices',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Leading Question Language',
        description:
          'Questions that embed positive assumptions or suggest the expected answer',
        howToSpot:
          'Look for questions starting with "Did you find it easy..." "Would you agree that..." "Don\'t you think..."',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Single Bundled Consent',
        description:
          'Multiple permissions grouped under a single "I Agree" action',
        howToSpot:
          'Check for single checkboxes or buttons that cover terms, privacy, marketing, and data sharing simultaneously',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Yes-Defaulting Confirmation',
        description:
          'Confirmation dialogs with "Yes" or "OK" as the primary, highlighted action',
        howToSpot:
          'Check if the affirmative action is visually emphasized (primary color, larger, pre-focused) in confirmation dialogs',
        severity: ImpactLevel.MEDIUM,
      },
    ],

    patterns: [
      {
        name: 'Uniform Agreement Pattern',
        description: 'Survey data showing suspiciously high agreement rates across all items, including items that should have varied responses',
        indicators: ['90%+ agreement across all survey items', 'Very low response variance', 'Contradictory items both receiving high agreement', 'Completion time far below expected reading time'],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Positional Response Pattern',
        description: 'Respondents consistently selecting the first or same-position option regardless of item content',
        indicators: ['First option selected disproportionately', 'Straight-line responses down the same column', 'No variance in scale position across items', 'Speed of completion suggests non-reading'],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Social Desirability Pattern',
        description: 'Responses skewed toward what the respondent thinks the questioner wants to hear',
        indicators: ['Interview responses that mirror interviewer framing', 'Feedback that matches company messaging rather than user experience', 'Unusually positive feedback from users with known usability issues', 'Agreement with contradictory statements from the same authority'],
        severity: ImpactLevel.HIGH,
        confidence: 'medium',
      },
      {
        name: 'Reflexive Consent Pattern',
        description: 'Users clicking through consent and confirmation flows with minimal reading or reflection',
        indicators: ['Sub-second consent checkbox completion', 'Immediate "Yes" clicks on confirmation dialogs', 'Users surprised by consequences of actions they confirmed', 'High agreement rates on opt-in prompts regardless of content'],
        severity: ImpactLevel.MEDIUM,
        confidence: 'medium',
      },
    ],

    checklistQuestions: [
      'Are all survey items worded so that "agree" is the positive response?',
      'Do any items use reverse-coding (where "agree" indicates a negative experience)?',
      'Is "Agree" or "Yes" presented as the first option in response scales?',
      'Do interview questions embed positive assumptions about the product?',
      'Are consent flows bundled into a single "I Agree" action?',
      'Do confirmation dialogs highlight "Yes" as the primary action?',
      'Is there a mechanism to detect acquiescent response patterns in data?',
      'Are open-ended questions included to bypass agree/disagree framing?',
      'Have survey items been tested for balanced positive/negative wording?',
      'Does the research methodology account for power dynamics between interviewer and participant?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX research methodology, specializing in acquiescence bias (agreement bias).

Analyze the provided design for acquiescence bias vulnerabilities. Identify:

1. **Survey & Form Design**: Are questions worded to invite reflexive agreement? Are all items positively worded?
2. **Response Scale Structure**: Is "Agree" or "Yes" presented first? Are scales balanced?
3. **Question Framing**: Do questions embed positive assumptions or lead toward agreement?
4. **Consent Flows**: Are multiple permissions bundled under single agreement actions?
5. **Confirmation Dialogs**: Do confirmations default to the affirmative action?
6. **Research Methodology**: Do interview scripts use open-ended or leading questions?

For each vulnerability found:
- Identify the specific acquiescence risk
- Assess how much it may inflate positive responses
- Determine the impact on data quality or user autonomy
- Suggest a concrete mitigation (balanced wording, forced-choice, typed confirmation, etc.)

Consider:
- Would this design produce different results with balanced vs all-positive wording?
- Are there mechanisms to detect acquiescent respondents?
- Do consent flows ensure informed, deliberate agreement?
- Is the research methodology robust against social desirability effects?
- Are there cultural considerations for the target audience?

Provide actionable recommendations for reducing acquiescence contamination.`,

    outputSchema: {
      type: 'object',
      properties: {
        acquiescenceVulnerabilities: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              currentWording: { type: 'string' },
              acquiescenceRisk: { type: 'string' },
              estimatedInflation: { type: 'string' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'acquiescenceRisk',
              'recommendation',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            balanceScore: { type: 'number' },
            dataQualityRisk: { type: 'number' },
            consentIntegrity: { type: 'number' },
            methodologicalRigor: { type: 'number' },
          },
          required: [
            'balanceScore',
            'dataQualityRisk',
            'consentIntegrity',
            'methodologicalRigor',
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
        'acquiescenceVulnerabilities',
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
        title: 'Audit Existing Surveys and Forms',
        description:
          'Review all current surveys, feedback forms, and consent flows for acquiescence vulnerability',
        example:
          'Catalog every agree/disagree item and check if any are reverse-coded',
        tips: [
          'Flag any survey where all items are positively worded',
          'Check response data for suspiciously uniform agreement',
          'Identify consent flows that bundle multiple permissions',
        ],
      },
      {
        step: 2,
        title: 'Implement Balanced Item Wording',
        description:
          'Rewrite surveys to include equal numbers of positively and negatively worded items',
        example:
          'For "The product is easy to use," add "I struggle to complete tasks in the product"',
        tips: [
          'Aim for 50/50 positive/negative item split',
          'Alternate positive and negative items to prevent pattern responding',
          'Ensure reverse-coded items are scored correctly in analysis',
        ],
      },
      {
        step: 3,
        title: 'Use Forced-Choice for Prioritization',
        description:
          'Replace agree/disagree scales with forced-choice pairs when ranking preferences',
        example:
          '"Would you rather have faster load times or more customization options?"',
        tips: [
          'Forced-choice is ideal for feature prioritization',
          'Pair options of similar desirability to force real trade-offs',
          'Use MaxDiff or Best-Worst scaling for larger option sets',
        ],
      },
      {
        step: 4,
        title: 'Rewrite Interview Scripts',
        description:
          'Replace leading questions with open-ended, neutral prompts',
        example:
          'Change "Did you find this easy?" to "Describe your experience with this feature"',
        tips: [
          'Start with broad, open-ended questions',
          'Use "Tell me about..." and "Walk me through..." framings',
          'Probe with neutral follow-ups: "What happened next?"',
        ],
      },
      {
        step: 5,
        title: 'Add Data Quality Checks',
        description:
          'Implement mechanisms to detect acquiescent respondents in survey data',
        example:
          'Flag respondents who agree with both "X is easy" and "X is confusing"',
        tips: [
          'Include at least 2 contradictory item pairs per survey',
          'Monitor completion time — very fast completion suggests non-reading',
          'Calculate response variance — zero variance indicates straight-lining',
        ],
      },
    ],

    dos: [
      'Balance surveys with equal positive and negative item wording',
      'Use open-ended questions alongside scaled items',
      'Alternate positive and negative items to break agreement streaks',
      'Use forced-choice format for feature and preference prioritization',
      'Require typed confirmation for destructive or high-consequence actions',
      'Break consent into granular, specific permissions',
      'Include acquiescence detection items (contradictory pairs) in surveys',
      'Train researchers to use neutral, non-leading interview prompts',
      'Present response scales without visual bias toward agreement',
      'Monitor survey data for suspicious uniform-agreement patterns',
    ],

    donts: [
      'Don\'t write all survey items so that "agree" means "positive"',
      'Don\'t ask leading questions like "Did you find this easy to use?"',
      'Don\'t bundle multiple permissions into a single "I Agree" checkbox',
      'Don\'t make "Yes" the primary/highlighted action in confirmation dialogs',
      'Don\'t present "Agree" first in Likert-scale response options',
      'Don\'t assume high agreement rates mean genuine satisfaction',
      'Don\'t use agree/disagree scales for feature prioritization',
      'Don\'t skip reverse-coded items to "keep the survey simple"',
      'Don\'t ignore cultural factors that amplify acquiescence in your audience',
      'Don\'t treat acquiescence-contaminated data as reliable for product decisions',
    ],

    bestPractices: [
      {
        title: 'Balance Every Scale',
        description:
          'For every positively worded survey item, include a corresponding negatively worded item measuring the same construct',
        rationale:
          'Balanced scales allow detection and statistical correction of acquiescence bias',
        example:
          'Pair "The interface is intuitive" with "I find the interface confusing"',
      },
      {
        title: 'Use Behavioral Over Attitudinal Questions',
        description:
          'Ask about specific behaviors ("How many times did you contact support?") rather than attitudes ("Support is helpful")',
        rationale:
          'Behavioral questions have objectively verifiable answers, making acquiescence impossible',
        example:
          '"How many minutes did your last task take?" vs "The product is fast"',
      },
      {
        title: 'Neutralize Interview Power Dynamics',
        description:
          'Reduce the status gap between interviewer and participant to minimize social desirability',
        rationale:
          'Participants agree more with people they perceive as higher-status or as having a stake in the answer',
        example:
          'Have researchers introduce themselves as learners, not designers. Say "We\'re trying to find problems" to give permission for criticism.',
      },
      {
        title: 'Granular Consent Architecture',
        description:
          'Break consent into specific, individually toggleable permissions',
        rationale:
          'Granular consent ensures each permission is a deliberate choice rather than reflexive blanket agreement',
        example:
          'Separate checkboxes for: essential cookies, analytics, marketing emails, third-party sharing',
      },
      {
        title: 'Friction for Consequence',
        description:
          'Add proportional friction to confirmation dialogs based on consequence severity',
        rationale:
          'Higher friction prevents reflexive agreement on high-consequence actions',
        example:
          'Low: single click. Medium: "Are you sure?" dialog. High: typed confirmation. Critical: cool-down period.',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships - Survey structure must be programmatically determinable',
        implementation:
          'Use fieldset/legend for survey items, proper label associations for inputs, and ARIA to convey scale structure to assistive technology users.',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.4.6',
        guideline:
          'Headings and Labels - Survey items and form controls must have descriptive labels',
        implementation:
          'Each survey item needs a clear, complete text label. Screen reader users must understand the full question before encountering response options.',
      },
      {
        wcagLevel: 'AA',
        criterion: '3.2.2',
        guideline:
          'On Input - Changing a form control must not automatically cause a context change',
        implementation:
          'Selecting a radio button in a survey should not auto-advance to the next question. Allow users to review and change responses before submission.',
      },
      {
        wcagLevel: 'AA',
        criterion: '3.3.2',
        guideline:
          'Labels or Instructions - Consent forms must clearly describe what the user is agreeing to',
        implementation:
          'Each consent checkbox must have a plain-language label explaining the specific permission. Avoid legalese that discourages reading.',
      },
    ],

    ethics: [
      {
        concern: 'Exploiting Agreement Bias in Consent',
        severity: 'critical',
        explanation:
          'Designing consent flows that exploit acquiescence bias to extract permissions users would decline if asked individually',
        mitigation:
          'Use granular, opt-in consent architecture. Each permission should be a separate, deliberate choice. Default to opted-out for non-essential permissions.',
      },
      {
        concern: 'False Confidence in Survey Data',
        severity: 'high',
        explanation:
          'Using acquiescence-contaminated survey data to justify product decisions, creating a false sense of user satisfaction',
        mitigation:
          'Always use balanced survey instruments. Report acquiescence detection rates. Disclose methodological limitations in research reports.',
      },
      {
        concern: 'Leading Research to Confirm Bias',
        severity: 'high',
        explanation:
          'Designing user research with leading questions to validate pre-existing design decisions rather than discover genuine user needs',
        mitigation:
          'Use neutral, open-ended research protocols. Have research scripts reviewed by someone outside the design team. Report both positive and negative findings.',
      },
      {
        concern: 'Dark Pattern Confirmations',
        severity: 'critical',
        explanation:
          'Designing confirmation dialogs that exploit reflexive agreement to push users through subscription renewals, charges, or data collection',
        mitigation:
          'Use clear, unambiguous language. Make the safe/reversible option the primary action. Add proportional friction for high-consequence confirmations.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'The Acquiescence Response Set',
        author: 'Messick, S.',
        year: 1966,
        description:
          'Foundational work establishing acquiescence as a systematic response bias distinct from content-driven responding',
        type: 'foundational',
      },
      {
        title: 'Response Styles and the Assessment of Psychopathology',
        author: 'Krosnick, J. A.',
        year: 1991,
        description:
          'Comprehensive framework for understanding acquiescence and other response styles in survey research, with practical mitigation strategies',
        type: 'foundational',
      },
      {
        title: 'Attitude Strength and Susceptibility to Acquiescence Response Bias',
        author: 'Krosnick, J. A., & Petty, R. E.',
        year: 1995,
        description:
          'Demonstrates that acquiescence is strongest when respondents have weak attitudes or low engagement with the topic',
        type: 'advanced',
      },
      {
        title: 'Satisficing in Surveys: Initial Evidence',
        author: 'Krosnick, J. A.',
        year: 1999,
        doi: '10.1002/dir.10006',
        description:
          'Links acquiescence to the broader satisficing framework — respondents choose the easiest acceptable response rather than the optimal one',
        type: 'advanced',
      },
    ],

    books: [
      {
        title: 'Survey Methodology',
        author: 'Groves, R. M., et al.',
        year: 2009,
        isbn: '9780470465462',
        description:
          'Comprehensive reference on survey design methodology, including extensive treatment of acquiescence and other response biases',
        type: 'foundational',
      },
      {
        title: 'Designing Surveys: A Guide to Decisions and Procedures',
        author: 'Czaja, R., & Blair, J.',
        year: 2005,
        isbn: '9780761927464',
        description:
          'Practical guide to survey design with specific guidance on mitigating acquiescence through balanced item wording',
        type: 'practical',
      },
    ],

    articles: [
      {
        title: 'How to Write Good Survey Questions',
        author: 'SurveyMonkey',
        url: 'https://www.surveymonkey.com/mp/writing-survey-questions/',
        description:
          'Practical guidance on avoiding leading questions and acquiescence-inducing wording in online surveys',
        type: 'practical',
      },
      {
        title: 'Acquiescence Bias in UX Research',
        author: 'Nielsen Norman Group',
        url: 'https://www.nngroup.com/articles/leading-questions/',
        description:
          'UX-focused article on how leading questions and agreement bias contaminate user research findings',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'Response Bias in Surveys',
        author: 'Research Methods',
        url: 'https://www.youtube.com/watch?v=acquiescence-bias',
        description:
          'Educational overview of acquiescence and other response biases with survey design examples',
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
      'social-desirability-bias',
      'authority-bias',
      'default-effect',
      'status-quo-bias',
    ],

    conflicts: [
      'reactance',
      'contrarian-bias',
    ],

    confusedWith: [
      'social-desirability-bias',
      'confirmation-bias',
      'yes-bias',
    ],

    hierarchy: {
      parent: 'response-bias',
      children: [
        'yes-saying',
        'satisficing',
      ],
    },
  },
};
