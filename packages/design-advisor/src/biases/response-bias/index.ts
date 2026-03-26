/**
 * RESPONSE BIAS
 *
 * The tendency to respond inaccurately or untruthfully to questions
 * due to framing, social pressure, or wording.
 */

import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const responseBias: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'response-bias',
    name: 'Response Bias',
    aliases: ['Survey Bias', 'Demand Characteristics', 'Acquiescence Bias'],
    category: BiasCategory.SOCIAL,
    relatedCategories: [
      BiasCategory.COGNITIVE,
      BiasCategory.DECISION_MAKING,
    ],
    tags: [
      'surveys',
      'feedback',
      'question-wording',
      'social-desirability',
      'research',
      'forms',
      'user-research',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple:
      'People answer questions inaccurately due to how questions are framed, social pressure, or wording.',

    detailed: `Response bias is a broad term for tendencies that cause respondents to answer questions inaccurately or untruthfully. Rather than reflecting genuine attitudes, opinions, or behaviors, responses are systematically skewed by the way questions are worded, the context in which they are asked, the presence of an observer, or social expectations about what constitutes an acceptable answer.

This bias is pervasive in surveys, feedback forms, user research interviews, and any interface that collects user input. Leading questions, loaded language, unbalanced response scales, and social desirability pressure all contribute to distorted data. For product teams, this means that naive survey designs can produce misleading insights, resulting in features and experiences that address phantom needs rather than real ones.

Understanding response bias is essential for anyone designing forms, surveys, NPS flows, onboarding questionnaires, or user research protocols. Mitigating it requires deliberate attention to question neutrality, response scale balance, anonymity assurances, and randomized ordering.`,

    psychologyBasis: {
      discoveredBy: 'Various Researchers (Cronbach, Edwards, Tourangeau)',
      year: 1946,
      theory: 'Survey Methodology and Psychometrics',
      mechanism: `Response bias arises from multiple interacting psychological mechanisms:

1. **Acquiescence Bias**: Respondents tend to agree with statements regardless of content, especially when fatigued or disengaged
2. **Social Desirability**: People modify answers to present themselves favorably, suppressing socially unacceptable opinions or behaviors
3. **Question-Order Effects**: Earlier questions prime the frame for later ones, shifting how respondents interpret and answer subsequent items
4. **Demand Characteristics**: Respondents infer the "desired" answer from context, wording, or interviewer cues and adjust accordingly
5. **Extreme Response Bias**: Cultural or individual tendencies to favor endpoints of a scale (e.g., always selecting "Strongly Agree") regardless of item content

These mechanisms operate largely outside conscious awareness, making response bias difficult to detect without methodological safeguards.`,
    },

    realWorldExample: `In political polling, asking "Do you support the President's economic plan?" produces significantly different results than asking "What is your opinion on the current economic plan?" The first version cues partisan identity and social desirability, while the second allows more neutral assessment. Polls that fail to control for response bias have famously produced inaccurate predictions, such as the 1936 Literary Digest poll that predicted Landon would defeat Roosevelt in a landslide.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `Response bias directly affects the quality of data collected through any user-facing form, survey, or feedback mechanism. Designers must account for it to:

- Ensure NPS and satisfaction surveys yield actionable, truthful data
- Design feedback forms that capture genuine user sentiment
- Build user research protocols that surface real pain points
- Create response scales that minimize systematic distortion
- Word questions neutrally to avoid leading users toward predetermined answers`,

    whenToUse: [
      {
        title: 'Survey and Form Design',
        scenario:
          'When designing any questionnaire, feedback form, or survey flow',
        example:
          'Use balanced Likert scales with neutral midpoints and randomized item order to reduce acquiescence and order effects',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'NPS and Satisfaction Measurement',
        scenario: 'When collecting Net Promoter Scores or satisfaction ratings',
        example:
          'Place NPS questions early before other questions prime positive or negative frames; use neutral wording like "How likely are you to recommend?" without leading context',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'User Research Interviews',
        scenario: 'When conducting qualitative user research or usability testing',
        example:
          'Use open-ended questions ("Tell me about your experience") rather than leading ones ("Did you find the new feature helpful?")',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Product Feedback Collection',
        scenario: 'When gathering feature requests or bug reports from users',
        example:
          'Provide anonymity assurances and neutral prompts to reduce social desirability bias in feedback',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Onboarding Questionnaires',
        scenario: 'When collecting user preferences or goals during onboarding',
        example:
          'Randomize option order and avoid pre-selecting defaults that signal a "correct" answer',
        impact: ImpactLevel.MEDIUM,
      },
    ],

    whenToAvoid: [
      {
        title: 'Intentional Guided Flows',
        reason:
          'Some contexts benefit from leading the user toward a helpful choice (e.g., setup wizards)',
        consequence:
          'Over-neutralizing guidance flows can confuse users who need direction',
        alternative:
          'Apply response bias mitigation to research instruments, not to guided UX flows where recommendations are helpful',
      },
      {
        title: 'Emergency or Safety Prompts',
        reason:
          'Critical safety questions should be direct, not neutralized to the point of ambiguity',
        consequence:
          'Users may fail to respond appropriately to urgent situations if questions are too neutral',
        alternative:
          'Use clear, direct language for safety prompts; reserve neutral wording for research and feedback collection',
      },
      {
        title: 'Accessibility-Sensitive Contexts',
        reason:
          'Overly complex balanced scales can increase cognitive load for users with cognitive disabilities',
        consequence:
          'Users may abandon forms or provide random answers due to confusion',
        alternative:
          'Simplify scales while maintaining neutrality; provide clear labels and reduce the number of options',
      },
      {
        title: 'Time-Critical Interactions',
        reason:
          'Fully balanced, randomized surveys take longer to complete',
        consequence:
          'Increased abandonment rates when users are in a hurry',
        alternative:
          'Use shorter, focused instruments with the most critical bias mitigations applied',
      },
    ],

    commonMistakes: [
      {
        title: 'Leading Question Wording',
        description:
          'Phrasing questions in a way that suggests the desired answer, e.g., "How much did you enjoy our amazing new feature?"',
        why: 'Loaded adjectives and framing cue the respondent toward a positive answer, inflating satisfaction metrics',
        fix: 'Use neutral language: "How would you describe your experience with [feature name]?"',
      },
      {
        title: 'Unbalanced Response Scales',
        description:
          'Providing more positive options than negative ones (e.g., "Good, Very Good, Excellent" with only "Poor" as the negative option)',
        why: 'Unbalanced scales systematically push responses toward the overrepresented end',
        fix: 'Use symmetrical scales with equal positive and negative options and a clear neutral midpoint',
      },
      {
        title: 'Ignoring Question Order Effects',
        description:
          'Placing emotionally charged or leading items before key measurement questions',
        why: 'Earlier questions prime the cognitive frame for subsequent answers, creating order-dependent distortion',
        fix: 'Randomize question order where possible; place key measurement items early before priming occurs',
      },
      {
        title: 'No Anonymity Assurance',
        description:
          'Collecting identifiable feedback without assuring respondents their answers are confidential',
        why: 'Users self-censor negative feedback when they believe responses are traceable to them',
        fix: 'Explicitly state anonymity or confidentiality policies before the survey begins; remove identifying fields when possible',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.HIGH,
        description:
          'Layout determines the order in which questions are encountered, influencing priming and order effects',
        examples: [
          'Placing satisfaction questions after a list of features primes positive recall',
          'Grouping related questions together can create context-dependent response patterns',
          'Single-question-per-page layouts reduce cross-item contamination',
          'Progress indicators can create pressure to complete quickly, increasing acquiescence',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Text emphasis and formatting can signal importance or suggest desired answers',
        examples: [
          'Bold or highlighted options draw more selections regardless of content',
          'Larger font on certain scale points biases toward those options',
          'Italicized or quoted text can imply the "correct" answer',
          'Consistent typography across all options maintains neutrality',
        ],
      },
      color: {
        level: ImpactLevel.HIGH,
        description:
          'Color associations (green = good, red = bad) can bias scale responses',
        examples: [
          'Green-colored positive options and red-colored negative options bias toward positive selection',
          'Neutral, uniform colors across all response options reduce bias',
          'Highlighting one response option with a different color increases its selection rate',
          'Background colors on satisfaction scales can subtly signal desired responses',
        ],
      },
      interaction: {
        level: ImpactLevel.CRITICAL,
        description:
          'Interactive elements like defaults, pre-selections, and validation cues strongly influence responses',
        examples: [
          'Pre-selected radio buttons anchor users to the default choice',
          'Requiring justification for negative ratings discourages honest negative feedback',
          'Slider starting positions bias toward the initial value',
          'Inline validation (green checkmarks) on certain answers signals correctness',
        ],
      },
      content: {
        level: ImpactLevel.CRITICAL,
        description:
          'Question wording is the primary driver of response bias; even small phrasing changes produce large effects',
        examples: [
          '"How satisfied are you?" vs "How would you rate your experience?" yield different distributions',
          'Including the word "honestly" paradoxically increases social desirability bias',
          'Double-barreled questions ("Was it fast and easy?") confuse responses',
          'Agree/disagree formats are more susceptible to acquiescence than forced-choice formats',
        ],
      },
      accessibility: {
        level: ImpactLevel.HIGH,
        description:
          'Screen readers linearize visual layouts, changing the order effects and potentially introducing new biases',
        examples: [
          'Screen reader users encounter options in DOM order, which may differ from visual order',
          'Complex matrix questions are difficult to navigate with assistive technology, increasing random responses',
          'ARIA labels on scale points provide additional framing that can introduce bias',
          'Voice-input users may experience different social desirability pressures than text-input users',
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
        title: 'Neutral Likert Scale with Balanced Options',
        description:
          'Customer satisfaction survey using a symmetrical 5-point scale with clear, neutral labels',
        code: `<fieldset class="survey-question">
  <legend>How would you rate your experience with this feature?</legend>
  <div class="likert-scale" role="radiogroup">
    <label>
      <input type="radio" name="experience" value="1">
      <span>Very Poor</span>
    </label>
    <label>
      <input type="radio" name="experience" value="2">
      <span>Poor</span>
    </label>
    <label>
      <input type="radio" name="experience" value="3">
      <span>Neutral</span>
    </label>
    <label>
      <input type="radio" name="experience" value="4">
      <span>Good</span>
    </label>
    <label>
      <input type="radio" name="experience" value="5">
      <span>Very Good</span>
    </label>
  </div>
</fieldset>`,
        explanation:
          'The scale is perfectly balanced with equal positive and negative options, a clear neutral midpoint, and no pre-selection. The question wording is neutral without loaded adjectives.',
        principle:
          'Symmetrical scales with neutral midpoints minimize acquiescence and extreme response biases',
        metrics: {
          before: 'Unbalanced scale: 78% positive, 12% neutral, 10% negative',
          after: 'Balanced scale: 52% positive, 28% neutral, 20% negative',
          improvement: 'More accurate sentiment distribution, revealing genuine dissatisfaction previously hidden',
        },
      },
      {
        title: 'Anonymous Feedback with Randomized Options',
        description:
          'Product feedback form with anonymity assurance and randomized response ordering',
        code: `<form class="feedback-form">
  <div class="anonymity-notice">
    <span class="icon" aria-hidden="true">&#128274;</span>
    <p>Your responses are <strong>completely anonymous</strong>.
    We cannot trace answers back to individual users.</p>
  </div>

  <fieldset>
    <legend>What best describes your primary use of this product?</legend>
    <!-- Options rendered in random order per user -->
    <label><input type="radio" name="use" value="personal"> Personal projects</label>
    <label><input type="radio" name="use" value="team"> Team collaboration</label>
    <label><input type="radio" name="use" value="client"> Client work</label>
    <label><input type="radio" name="use" value="learning"> Learning and exploration</label>
    <label><input type="radio" name="use" value="other"> Other</label>
  </fieldset>

  <fieldset>
    <legend>What is the biggest challenge you face with this product?</legend>
    <textarea placeholder="Please describe in your own words..."
              rows="4"></textarea>
  </fieldset>
</form>`,
        explanation:
          'Anonymity assurance reduces social desirability bias. Randomized option order prevents primacy effects. Open-ended follow-up captures genuine feedback without constraining responses.',
        principle:
          'Anonymity and randomization reduce social desirability and order effects',
      },
      {
        title: 'Balanced Question Wording in NPS Survey',
        description:
          'NPS question presented with neutral framing and no priming context',
        code: `<div class="nps-survey">
  <h3>Quick Question</h3>
  <p>Based on your overall experience, how likely are you to
  recommend this product to a friend or colleague?</p>

  <div class="nps-scale" role="radiogroup" aria-label="Likelihood to recommend">
    <div class="scale-labels">
      <span>Not at all likely</span>
      <span>Extremely likely</span>
    </div>
    <div class="scale-options">
      <label><input type="radio" name="nps" value="0"><span>0</span></label>
      <label><input type="radio" name="nps" value="1"><span>1</span></label>
      <label><input type="radio" name="nps" value="2"><span>2</span></label>
      <label><input type="radio" name="nps" value="3"><span>3</span></label>
      <label><input type="radio" name="nps" value="4"><span>4</span></label>
      <label><input type="radio" name="nps" value="5"><span>5</span></label>
      <label><input type="radio" name="nps" value="6"><span>6</span></label>
      <label><input type="radio" name="nps" value="7"><span>7</span></label>
      <label><input type="radio" name="nps" value="8"><span>8</span></label>
      <label><input type="radio" name="nps" value="9"><span>9</span></label>
      <label><input type="radio" name="nps" value="10"><span>10</span></label>
    </div>
  </div>

  <fieldset class="followup">
    <legend>What is the primary reason for your score?</legend>
    <textarea placeholder="Optional..." rows="3"></textarea>
  </fieldset>
</div>`,
        explanation:
          'The NPS question uses standard neutral wording without priming ("Based on your overall experience" rather than "After enjoying our great features"). No option is pre-selected. The follow-up is open-ended and optional, reducing pressure.',
        principle:
          'Neutral framing and no pre-selection yield more accurate NPS data',
      },
    ],

    bad: [
      {
        title: 'Leading Question with Loaded Language',
        description:
          'Satisfaction survey using biased wording that pushes toward positive responses',
        code: `<!-- DON'T DO THIS -->
<div class="satisfaction-survey">
  <h3>We'd love to hear how much you enjoyed our product!</h3>
  <p>How amazing was your experience with our revolutionary new feature?</p>
  <div class="options">
    <label><input type="radio" name="rating" value="5" checked> Absolutely loved it!</label>
    <label><input type="radio" name="rating" value="4"> Really liked it</label>
    <label><input type="radio" name="rating" value="3"> It was good</label>
    <label><input type="radio" name="rating" value="2"> It was okay</label>
    <label><input type="radio" name="rating" value="1"> Could be better</label>
  </div>
</div>`,
        explanation:
          'Multiple response bias triggers: "How amazing" presumes a positive experience, "revolutionary" is loaded language, the most positive option is pre-selected, and even the lowest option ("Could be better") is framed positively rather than negatively. This design will produce artificially inflated satisfaction scores.',
        principle:
          'Leading language, pre-selections, and unbalanced scales inflate metrics and hide real problems',
      },
      {
        title: 'Identifiable Feedback with Social Pressure',
        description:
          'Feedback form that reveals respondent identity and applies pressure',
        code: `<!-- DON'T DO THIS -->
<div class="feedback-form">
  <div class="user-info">
    <img src="avatar.jpg" alt="Your photo">
    <p>Submitting as <strong>John Smith</strong></p>
    <p class="note">Your manager will review this feedback</p>
  </div>

  <h3>How would you rate the new workflow tool?</h3>
  <p class="context">Your team spent 6 months building this feature.</p>

  <div class="options">
    <label><input type="radio" name="rating" value="great"> Great</label>
    <label><input type="radio" name="rating" value="good"> Good</label>
    <label><input type="radio" name="rating" value="ok"> Acceptable</label>
  </div>
</div>`,
        explanation:
          'Showing the respondent\'s identity and noting that a manager will review the feedback creates strong social desirability pressure. Mentioning the team spent 6 months builds guilt around negative responses. The scale has no genuinely negative options.',
        principle:
          'Identifiable feedback with authority review and guilt framing suppresses honest responses',
      },
      {
        title: 'Double-Barreled Questions with Agree/Disagree Format',
        description:
          'Survey using compound questions and agree/disagree format that maximizes acquiescence bias',
        code: `<!-- DON'T DO THIS -->
<div class="survey">
  <div class="question">
    <p>The product is easy to use and reasonably priced.</p>
    <label><input type="radio" name="q1" value="5"> Strongly Agree</label>
    <label><input type="radio" name="q1" value="4"> Agree</label>
    <label><input type="radio" name="q1" value="3"> Somewhat Agree</label>
    <label><input type="radio" name="q1" value="2"> Disagree</label>
    <label><input type="radio" name="q1" value="1"> Strongly Disagree</label>
  </div>

  <div class="question">
    <p>Customer support is responsive and knowledgeable.</p>
    <label><input type="radio" name="q2" value="5"> Strongly Agree</label>
    <label><input type="radio" name="q2" value="4"> Agree</label>
    <label><input type="radio" name="q2" value="3"> Somewhat Agree</label>
    <label><input type="radio" name="q2" value="2"> Disagree</label>
    <label><input type="radio" name="q2" value="1"> Strongly Disagree</label>
  </div>
</div>`,
        explanation:
          'Double-barreled questions combine two distinct topics ("easy to use AND reasonably priced") making it impossible to disagree with one and agree with the other. The agree/disagree format triggers acquiescence bias, where respondents tend to agree regardless of content. The scale also has three agree options but only two disagree options.',
        principle:
          'Double-barreled questions and agree/disagree formats maximize response distortion',
      },
    ],

    realWorld: [
      {
        company: 'Typeform',
        product: 'Typeform Surveys',
        url: 'https://www.typeform.com',
        description: 'Typeform presents one question at a time in a conversational format, reducing question-order contamination and cognitive overload. Their interface avoids visual bias cues and maintains consistent, neutral styling across all response options.',
        effectiveness: 'very-effective',
        analysis: 'Single-question-per-screen design minimizes cross-item priming and order effects. The conversational tone reduces social desirability pressure by making the experience feel less formal than traditional surveys.',
      },
      {
        company: 'SurveyMonkey',
        product: 'Question Bank',
        url: 'https://www.surveymonkey.com',
        description: 'SurveyMonkey provides a pre-validated question bank with neutrally worded questions and balanced response scales. Their randomization features let researchers shuffle both question and option order automatically.',
        effectiveness: 'effective',
        analysis: 'Pre-validated question templates ensure neutral wording, and built-in randomization features reduce order effects. However, users can still override these defaults and create biased surveys.',
      },
      {
        company: 'Qualtrics',
        product: 'Survey Flow Logic',
        url: 'https://www.qualtrics.com',
        description: 'Qualtrics offers advanced randomization, piping, and display logic that researchers use to counterbalance question order, randomize scale direction, and control for response bias at the platform level.',
        effectiveness: 'very-effective',
        analysis: 'Enterprise-grade bias mitigation through counter-balancing, attention checks, and forced-choice formats. The sophistication of the tooling makes it a gold standard for minimizing response bias in large-scale research.',
      },
      {
        company: 'Hotjar',
        product: 'On-Site Surveys',
        url: 'https://www.hotjar.com',
        description: 'Hotjar embeds short, contextual feedback widgets directly in the product experience. By asking a single question at the point of interaction, they reduce recall bias and social desirability effects.',
        effectiveness: 'effective',
        analysis: 'In-context, single-question surveys capture more accurate feedback than retrospective multi-question surveys. The anonymity of the widget format reduces social desirability pressure compared to direct interviews.',
      },
    ],

    abTests: [
      {
        title: 'Neutral vs Leading Question Wording in CSAT Survey',
        hypothesis:
          'Neutrally worded questions will produce lower but more accurate satisfaction scores than leading questions',
        controlVersion: {
          description:
            'Satisfaction survey asking "How much did you enjoy using our product?" with options from "Loved it" to "It was okay"',
          metrics: {
            conversionRate: '89% positive',
            completionRate: '72%',
          },
        },
        treatmentVersion: {
          description:
            'Satisfaction survey asking "How would you rate your experience?" with balanced options from "Very Poor" to "Very Good" and a neutral midpoint',
          metrics: {
            conversionRate: '61% positive',
            completionRate: '78%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Neutral wording revealed that 28% of users had genuinely negative experiences that were hidden by the leading question format. The neutral version also had higher completion rates, suggesting users found it more credible. Subsequent feature improvements based on the neutral data reduced churn by 15%.',
          learnings: [
            'Leading questions inflate positive responses by 25-40%',
            'Neutral surveys have higher completion rates due to perceived credibility',
            'Accurate data from neutral surveys leads to better product decisions',
            'Teams should compare biased and unbiased survey results to calibrate historical data',
          ],
        },
      },
      {
        title: 'Anonymous vs Identified Feedback Collection',
        hypothesis:
          'Anonymous feedback forms will yield more honest negative feedback than identified ones',
        controlVersion: {
          description:
            'Feedback form showing user name and avatar, with manager review notification',
          metrics: {
            conversionRate: '4% negative feedback',
            completionRate: '45%',
          },
        },
        treatmentVersion: {
          description:
            'Anonymous feedback form with explicit privacy assurance: "Responses cannot be traced to individuals"',
          metrics: {
            conversionRate: '23% negative feedback',
            completionRate: '68%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Anonymous feedback revealed 5.75x more negative feedback, suggesting the identified version was massively suppressing honest critical responses. Completion rates also increased by 51%, as users were more willing to participate when assured of anonymity.',
          learnings: [
            'Identified feedback suppresses negative responses by approximately 80%',
            'Anonymity assurances must be explicit and prominent to be effective',
            'Higher negative feedback rates correlate with more actionable product insights',
            'Anonymous feedback should be the default for internal satisfaction surveys',
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
        name: 'Leading Question Language',
        description:
          'Questions containing loaded adjectives, presuppositions, or emotional framing (e.g., "amazing", "revolutionary", "enjoy")',
        howToSpot:
          'Read each question and check for words that assume a particular sentiment or suggest a desired answer',
        severity: ImpactLevel.CRITICAL,
      },
      {
        name: 'Unbalanced Response Scales',
        description:
          'Scales with more positive options than negative ones, or scales missing a neutral midpoint',
        howToSpot:
          'Count the number of positive and negative options on each scale; check for neutral midpoint presence',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Pre-Selected Defaults',
        description:
          'Survey options with a default selection, especially positive ones, that bias toward a particular response',
        howToSpot:
          'Check for any pre-checked radio buttons, pre-filled sliders, or highlighted default options',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Identifiable Response Context',
        description:
          'Feedback forms displaying user identity, manager review notices, or attribution that suppresses honesty',
        howToSpot:
          'Look for user avatars, names, department labels, or statements about who will see responses',
        severity: ImpactLevel.CRITICAL,
      },
      {
        name: 'Color-Coded Scale Points',
        description:
          'Response options using green for positive and red for negative, signaling desired responses through color',
        howToSpot:
          'Check whether scale point colors create an implicit value hierarchy (green = good, red = bad)',
        severity: ImpactLevel.MEDIUM,
      },
    ],

    patterns: [
      {
        name: 'Acquiescence Pattern',
        description: 'Survey design that maximizes agreement tendency through agree/disagree formats and positively framed statements',
        indicators: [
          'All items framed as positive statements to agree or disagree with',
          'No reverse-coded items to catch acquiescent responding',
          'Agree/disagree format used instead of forced-choice',
          'Long surveys with repetitive format increasing fatigue-driven agreement',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Social Desirability Pattern',
        description: 'Design elements that increase pressure to respond in socially acceptable ways',
        indicators: [
          'Respondent identity visible during feedback',
          'Authority figures mentioned as reviewers',
          'Questions about sensitive topics without anonymity assurances',
          'Group settings where others can see responses',
        ],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Question-Order Contamination Pattern',
        description: 'Question sequences where earlier items prime or frame later responses',
        indicators: [
          'Positive priming questions before satisfaction measurement',
          'Feature highlights shown immediately before feedback collection',
          'Emotional or controversial questions preceding neutral ones',
          'No randomization of question order',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'medium',
      },
      {
        name: 'Demand Characteristics Pattern',
        description: 'Design cues that signal the expected or desired response to the user',
        indicators: [
          'Context text that frames the desired outcome before the question',
          'Visual emphasis on certain response options',
          'Validation feedback (checkmarks, smileys) tied to specific answers',
          'Required justification only for negative responses',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
    ],

    checklistQuestions: [
      'Are survey questions worded neutrally without loaded adjectives or presuppositions?',
      'Is the response scale balanced with equal positive and negative options?',
      'Is there a neutral midpoint on rating scales?',
      'Are response options presented without pre-selection or defaults?',
      'Is question order randomized or at least carefully sequenced to avoid priming?',
      'Are respondents assured of anonymity or confidentiality?',
      'Are there reverse-coded items to detect acquiescent responding?',
      'Do any questions combine multiple topics (double-barreled)?',
      'Is visual styling consistent across all response options (no color bias)?',
      'Are required justifications applied equally to positive and negative responses?',
      'Is the survey length reasonable to avoid fatigue-driven acquiescence?',
      'Are forced-choice formats used instead of agree/disagree where appropriate?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in survey methodology, psychometrics, and UX research, specializing in response bias detection and mitigation.

Analyze the provided design for response bias patterns. Identify:

1. **Question Wording**: Leading language, loaded adjectives, presuppositions, double-barreled questions
2. **Scale Design**: Balance of positive/negative options, midpoint presence, scale direction, label neutrality
3. **Social Desirability Cues**: Identity visibility, authority review, attribution, sensitive topics without safeguards
4. **Order Effects**: Question sequencing, priming, context contamination
5. **Demand Characteristics**: Visual cues, defaults, validation feedback, required justifications that signal desired responses

For each pattern found:
- Identify the specific response bias type (acquiescence, social desirability, order effect, demand characteristic)
- Assess severity and likely impact on data quality
- Estimate the direction and magnitude of distortion
- Provide a concrete rewrite or redesign recommendation
- Reference relevant methodological literature

Consider:
- Would a psychometrician approve this instrument?
- Are there sufficient safeguards (randomization, anonymity, reverse-coding)?
- Is the data collected likely to reflect genuine user sentiment?
- Are the biases systematic enough to invalidate conclusions?
- How would this design perform differently across cultures (extreme response bias varies by culture)?

Provide actionable recommendations for producing more accurate, trustworthy user data.`,

    outputSchema: {
      type: 'object',
      properties: {
        responseBiasPatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              biasType: { type: 'string' },
              distortionDirection: { type: 'string' },
              severity: { type: 'string' },
              rewriteRecommendation: { type: 'string' },
              ethical: { type: 'boolean' },
            },
            required: [
              'type',
              'location',
              'biasType',
              'severity',
              'ethical',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            questionNeutrality: { type: 'number' },
            scaleBalance: { type: 'number' },
            anonymitySafeguards: { type: 'number' },
            orderBiasControl: { type: 'number' },
            dataReliability: { type: 'number' },
          },
          required: [
            'questionNeutrality',
            'scaleBalance',
            'anonymitySafeguards',
            'orderBiasControl',
            'dataReliability',
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
        'responseBiasPatterns',
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
        title: 'Audit Question Wording',
        description:
          'Review every question for leading language, loaded adjectives, presuppositions, and double-barreled constructions',
        example:
          'Change "How much did you enjoy our new feature?" to "How would you rate your experience with [feature name]?"',
        tips: [
          'Remove all evaluative adjectives (amazing, great, revolutionary)',
          'Eliminate presuppositions that assume a particular experience',
          'Split double-barreled questions into separate items',
        ],
      },
      {
        step: 2,
        title: 'Balance Response Scales',
        description:
          'Ensure all rating scales have equal numbers of positive and negative options with a clear neutral midpoint',
        example:
          'Use "Very Poor / Poor / Neutral / Good / Very Good" instead of "Okay / Good / Very Good / Excellent"',
        tips: [
          'Maintain symmetry: equal positive and negative options',
          'Include a clearly labeled neutral midpoint',
          'Use consistent scale length across all questions (5-point or 7-point)',
        ],
      },
      {
        step: 3,
        title: 'Implement Randomization',
        description:
          'Randomize question order and option order to control for primacy, recency, and order effects',
        example:
          'Use survey platform randomization features to shuffle question blocks and response option order per respondent',
        tips: [
          'Randomize within logical blocks, not across unrelated topics',
          'Randomize response option order for multiple-choice questions',
          'Consider counter-balancing scale direction (left-to-right vs right-to-left)',
        ],
      },
      {
        step: 4,
        title: 'Ensure Anonymity',
        description:
          'Provide explicit anonymity or confidentiality assurances and remove identifying information from the form',
        example:
          'Add a prominent notice: "Your responses are anonymous and cannot be traced back to you"',
        tips: [
          'Remove user avatars, names, and identifying fields from feedback forms',
          'Never mention that managers or specific individuals will review responses',
          'Consider using third-party survey tools to reinforce anonymity perception',
        ],
      },
      {
        step: 5,
        title: 'Include Bias Detection Items',
        description:
          'Add reverse-coded items and attention checks to detect and measure response bias',
        example:
          'If one item says "The product is easy to use", include a reverse-coded item like "I often struggle with this product"',
        tips: [
          'Include at least 2-3 reverse-coded items per survey',
          'Add attention check questions ("Please select Strongly Agree for this item")',
          'Analyze consistency between forward and reverse-coded items to detect acquiescence',
        ],
      },
    ],

    dos: [
      'Use neutral, unbiased language in all questions and prompts',
      'Balance response scales with equal positive and negative options',
      'Randomize question and option order to prevent order effects',
      'Provide explicit anonymity or confidentiality assurances',
      'Include reverse-coded items to detect acquiescent responding',
      'Use forced-choice formats when agree/disagree would introduce bias',
      'Test surveys with cognitive interviews to identify confusing or leading items',
      'Keep surveys short to reduce fatigue-driven acquiescence',
    ],

    donts: [
      'Don\'t use loaded adjectives or emotional language in questions',
      'Don\'t pre-select any response option as a default',
      'Don\'t create unbalanced scales with more positive than negative options',
      'Don\'t show respondent identity when collecting honest feedback',
      'Don\'t require justification only for negative responses',
      'Don\'t use color coding that signals "right" and "wrong" answers',
      'Don\'t ask double-barreled questions that combine multiple topics',
      'Don\'t place priming content immediately before key measurement questions',
    ],

    bestPractices: [
      {
        title: 'Use Forced-Choice Over Agree/Disagree',
        description:
          'Replace agree/disagree Likert items with forced-choice formats where respondents pick between two opposing statements',
        rationale:
          'Agree/disagree formats are highly susceptible to acquiescence bias; forced-choice formats require genuine evaluation of content',
        example:
          'Instead of "The product is easy to use: Agree/Disagree", use "Which describes your experience better? A) I can complete tasks without difficulty B) I frequently need help"',
      },
      {
        title: 'Separate Measurement from Feedback Collection',
        description:
          'Use validated scales for quantitative measurement and open-ended questions for qualitative insight',
        rationale:
          'Mixing quantitative scales and qualitative prompts in the same item compromises both; separating them produces cleaner data',
        example:
          'First: NPS scale. Then: "What is the primary reason for your score?" as a separate open-ended question',
      },
      {
        title: 'Pilot Test with Think-Aloud Protocol',
        description:
          'Before deploying a survey, test it with 5-8 users using think-aloud protocol to identify confusing or leading items',
        rationale:
          'Cognitive interviews reveal how respondents actually interpret questions, exposing unintended biases invisible to the survey designer',
        example:
          'Ask pilot participants: "What does this question mean to you? How did you decide on your answer?"',
      },
      {
        title: 'Counterbalance Scale Directions',
        description:
          'Alternate whether positive or negative options appear first across different questions',
        rationale:
          'Consistent left-to-right ordering (negative-to-positive or vice versa) creates position bias; counterbalancing neutralizes it',
        example:
          'Randomize whether "Very Poor" or "Very Good" appears on the left for each respondent',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships - Ensure survey structure is programmatically determinable',
        implementation:
          'Use <fieldset> and <legend> for question groups, proper <label> associations for all inputs, and ARIA role="radiogroup" for scale items so assistive technology conveys structure accurately',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.4.1',
        guideline:
          'Use of Color - Don\'t use color alone to differentiate scale points',
        implementation:
          'Avoid green/red color coding on scale points. Use text labels for every option so screen reader and color-blind users perceive all options equally',
      },
      {
        wcagLevel: 'AA',
        criterion: '3.3.2',
        guideline:
          'Labels or Instructions - Provide clear instructions for all form inputs',
        implementation:
          'Ensure every scale has clearly labeled endpoints, every question has a visible label, and instructions explain how to respond without biasing the answer',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.4.6',
        guideline:
          'Headings and Labels - Use descriptive headings for survey sections',
        implementation:
          'Label survey sections with neutral headings. Ensure DOM order matches visual order so screen reader users encounter questions in the intended sequence',
      },
    ],

    ethics: [
      {
        concern: 'Inflating Satisfaction Metrics',
        severity: 'critical',
        explanation:
          'Deliberately using leading questions and unbalanced scales to produce artificially high satisfaction scores, misleading stakeholders about actual user sentiment',
        mitigation:
          'Use validated, neutrally worded instruments. Report methodology alongside results. Conduct regular bias audits of all survey instruments.',
      },
      {
        concern: 'Suppressing Negative Feedback',
        severity: 'critical',
        explanation:
          'Designing feedback flows that make it difficult or uncomfortable to express dissatisfaction (e.g., requiring justification only for low ratings)',
        mitigation:
          'Apply equal friction to all response options. Never require extra steps for negative feedback. Ensure anonymous submission is available.',
      },
      {
        concern: 'Manipulative Question Framing',
        severity: 'high',
        explanation:
          'Using framing effects to push respondents toward answers that serve business goals rather than reflecting genuine sentiment',
        mitigation:
          'Have questions reviewed by someone outside the team with no stake in the outcome. Use pre-validated question banks.',
      },
      {
        concern: 'Privacy in Feedback Collection',
        severity: 'high',
        explanation:
          'Collecting identifiable feedback without informed consent or clear privacy policies, chilling honest responses',
        mitigation:
          'Default to anonymous collection. When identification is necessary, explain why and how data will be used. Obtain explicit consent.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'The Science of Asking Questions',
        author: 'Tourangeau, R., Rips, L. J., & Rasinski, K.',
        year: 2000,
        description:
          'Comprehensive framework for understanding how question wording, context, and format affect survey responses',
        type: 'foundational',
      },
      {
        title: 'Self-Reports in Organizational Research: Problems and Prospects',
        author: 'Schwarz, N.',
        year: 1999,
        doi: '10.1016/S0065-2601(08)60016-1',
        description:
          'Seminal work on how context effects, question order, and response format influence self-report data in organizational settings',
        type: 'foundational',
      },
      {
        title: 'Response Effects in Surveys: A Review and Synthesis',
        author: 'Sudman, S., & Bradburn, N. M.',
        year: 1974,
        description:
          'Classic review cataloging the major sources of response bias in survey research',
        type: 'foundational',
      },
      {
        title: 'Acquiescence Response Bias in Studies of Personality',
        author: 'Cronbach, L. J.',
        year: 1946,
        description:
          'The original identification and characterization of acquiescence bias in personality measurement',
        type: 'foundational',
      },
    ],

    books: [
      {
        title: 'The Psychology of Survey Response',
        author: 'Tourangeau, R., Rips, L. J., & Rasinski, K.',
        year: 2000,
        isbn: '9780521576291',
        description:
          'Definitive textbook on cognitive processes underlying survey response, including all major response bias mechanisms',
        type: 'foundational',
      },
      {
        title: 'Asking Questions: The Definitive Guide to Questionnaire Design',
        author: 'Bradburn, N. M., Sudman, S., & Wansink, B.',
        year: 2004,
        isbn: '9780787970888',
        description:
          'Practical guide to writing unbiased survey questions with extensive examples of good and bad wording',
        type: 'practical',
      },
    ],

    articles: [
      {
        title: 'Designing Better Surveys for UX Research',
        author: 'Nielsen Norman Group',
        url: 'https://www.nngroup.com/articles/survey-design/',
        description:
          'Practical guide to avoiding response bias in UX research surveys',
        type: 'practical',
      },
      {
        title: 'Writing Good Survey Questions',
        author: 'Pew Research Center',
        url: 'https://www.pewresearch.org/our-methods/u-s-surveys/writing-survey-questions/',
        description:
          'Guidelines for writing neutral, unbiased survey questions from one of the world\'s leading survey research organizations',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'How Survey Wording Can Bias Results',
        author: 'Pew Research Center',
        url: 'https://www.youtube.com/watch?v=survey-bias-pew',
        description:
          'Demonstrates how small wording changes produce dramatically different survey results',
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
      'framing-effect',        // Question framing is a key driver of response bias
      'social-proof',          // Social desirability relates to conforming to perceived norms
      'anchoring-bias',        // Scale anchors and default values influence responses
      'primacy-effect',        // First options in a list are selected more often
    ],

    conflicts: [
      'transparency-bias',     // Transparency about intentions can counteract response bias
    ],

    confusedWith: [
      'framing-effect',        // Overlaps but framing is broader than response-specific distortion
      'acquiescence-bias',     // Acquiescence is a subtype of response bias, not a separate bias
      'social-desirability',   // Social desirability is a subtype of response bias
    ],

    hierarchy: {
      parent: 'cognitive-bias',
      children: [
        'acquiescence-bias',
        'social-desirability-bias',
        'extreme-response-bias',
        'question-order-effect',
      ],
    },
  },
};
