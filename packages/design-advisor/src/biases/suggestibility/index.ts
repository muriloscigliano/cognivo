/**
 * SUGGESTIBILITY
 *
 * The tendency to incorporate external suggestions and leading
 * information into one's own memory and perception.
 */

import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const suggestibility: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'suggestibility',
    name: 'Suggestibility',
    aliases: ['Suggestibility Effect', 'Misinformation Effect', 'Leading Question Effect'],
    category: BiasCategory.MEMORY,
    relatedCategories: [
      BiasCategory.DECISION_MAKING,
      BiasCategory.PERCEPTION,
    ],
    tags: [
      'memory',
      'suggestion',
      'leading-questions',
      'defaults',
      'auto-complete',
      'framing',
      'surveys',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple:
      'We incorporate external suggestions and leading information into our own memory and perception.',

    detailed: `Suggestibility is a memory and perception bias in which external cues, leading questions, or framed information alter what a person remembers, believes, or decides. Rather than retrieving pristine memories or forming independent judgments, humans reconstruct their cognition around the suggestions they receive.

This effect is especially powerful when suggestions come from perceived authorities, are repeated, or arrive when the person is uncertain. In digital interfaces, suggestibility manifests through auto-complete results, default selections, placeholder text, survey question wording, recommendation labels, and AI-generated suggestions.

Designers must understand suggestibility because every default, placeholder, and recommendation is a suggestion. The way a question is worded, the options pre-selected, and the completions offered all shape user responses, sometimes helpfully (reducing friction) and sometimes harmfully (biasing honest feedback or nudging unintended choices).`,

    psychologyBasis: {
      discoveredBy: 'Elizabeth Loftus and Gisli Gudjonsson',
      year: 1979,
      theory: 'Misinformation Effect and Interrogative Suggestibility',
      mechanism: `The brain integrates external suggestions into its own memory and judgment through several mechanisms:

1. **Source Monitoring Failure**: The brain fails to distinguish between self-generated thoughts and externally suggested information, treating suggestions as if they were original memories
2. **Memory Reconstruction**: Memories are not replayed like recordings but reconstructed each time, making them vulnerable to suggestion during retrieval
3. **Social Compliance**: People adopt suggested answers to conform with perceived authority or social expectations, especially under uncertainty
4. **Repetition-Based Acceptance**: Repeated suggestions become more familiar and are mistaken for truth (the illusory truth effect reinforcing suggestibility)
5. **Anchoring Integration**: Suggestions act as cognitive anchors that constrain the range of responses a person considers plausible

The mechanism operates below conscious awareness; people genuinely believe their suggested responses are their own independent judgments.`,
    },

    realWorldExample: `In Loftus's landmark 1979 study, participants watched a car accident video. Those asked "How fast were the cars going when they smashed into each other?" estimated significantly higher speeds than those asked "How fast were the cars going when they contacted each other?" A week later, the "smashed" group was more likely to falsely remember broken glass at the scene. A single word in a question altered both immediate judgment and long-term memory.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `Suggestibility affects how users respond to surveys, interact with search, select defaults, and trust AI recommendations. Designers can leverage suggestibility ethically to:

- Reduce friction by offering helpful defaults and auto-complete suggestions
- Guide users toward beneficial choices through thoughtful recommendation framing
- Improve form completion rates with well-chosen placeholder text
- Enhance onboarding with suggestive walkthroughs and contextual prompts

Designers must also guard against suggestibility to:
- Ensure surveys collect honest, unbiased feedback
- Prevent defaults from overriding genuine user preferences
- Avoid auto-complete from reinforcing harmful stereotypes or assumptions
- Keep AI suggestions from replacing independent user judgment`,

    whenToUse: [
      {
        title: 'Smart Defaults',
        scenario:
          'When pre-selecting options that align with the majority of users\' needs',
        example:
          'Pre-select the most common shipping option or timezone based on location, reducing cognitive effort',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Helpful Auto-Complete',
        scenario: 'When assisting users with search or form completion',
        example:
          'Offer auto-complete suggestions based on popular queries or the user\'s own history, clearly labeled as suggestions',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Onboarding Prompts',
        scenario: 'When guiding new users through initial setup',
        example:
          'Suggest popular configuration choices with clear "customize later" options to reduce setup friction',
        impact: ImpactLevel.MEDIUM,
      },
      {
        title: 'Contextual Recommendations',
        scenario: 'When suggesting next actions in a workflow',
        example:
          'After a user completes a task, suggest the most common next step with a clear rationale for the suggestion',
        impact: ImpactLevel.MEDIUM,
      },
      {
        title: 'Error Recovery Suggestions',
        scenario: 'When helping users recover from mistakes or dead ends',
        example:
          'Suggest corrections for typos in search queries ("Did you mean...") to guide users toward intended results',
        impact: ImpactLevel.HIGH,
      },
    ],

    whenToAvoid: [
      {
        title: 'User Research Surveys',
        reason:
          'Leading questions and suggestive wording bias survey responses, yielding unreliable data',
        consequence:
          'Product decisions based on skewed feedback that reflects designer assumptions rather than user reality',
        alternative:
          'Use neutral, open-ended question wording; avoid loaded terms; randomize option order',
      },
      {
        title: 'Consent and Preference Collection',
        reason:
          'Pre-checked consent boxes or suggestive defaults can lead users to agree to things they would not choose independently',
        consequence:
          'Erosion of trust, regulatory violations (GDPR), and user resentment when they discover unwanted opt-ins',
        alternative:
          'Require explicit opt-in; present choices without pre-selection; use neutral framing',
      },
      {
        title: 'Medical or Legal Decision-Making',
        reason:
          'Suggestions in high-stakes contexts can override independent judgment with serious consequences',
        consequence:
          'Users may select inappropriate medical treatments or legal options because a suggestion made them seem recommended',
        alternative:
          'Present all options equally without suggestive framing; require active, informed selection',
      },
      {
        title: 'Search Results with Stereotype Risk',
        reason:
          'Auto-complete can surface and reinforce harmful stereotypes or biased associations',
        consequence:
          'Users adopt and spread biased information; platform credibility and social harm',
        alternative:
          'Audit auto-complete results for bias; filter harmful suggestions; diversify suggestion sources',
      },
    ],

    commonMistakes: [
      {
        title: 'Leading Survey Questions',
        description:
          'Wording survey questions in ways that suggest a desired answer ("How much did you enjoy...?" implies enjoyment)',
        why: 'Users default to the suggested frame, producing artificially positive or skewed responses',
        fix: 'Use neutral phrasing: "How would you describe your experience?" with balanced scale options',
      },
      {
        title: 'Suggestive Placeholder Text',
        description:
          'Using placeholder text that implies expected answers (e.g., placeholder="Great experience!" in a feedback field)',
        why: 'Placeholder text acts as a suggestion, anchoring responses toward the implied answer',
        fix: 'Use neutral placeholders like "Type your feedback here" or format hints like "e.g., 2026-03-20"',
      },
      {
        title: 'Opinionated Defaults Without Disclosure',
        description:
          'Pre-selecting options that benefit the business without clearly labeling them as defaults',
        why: 'Users trust defaults as recommendations and may not realize they can or should change them',
        fix: 'Label defaults clearly ("Default: Standard plan") and explain why it was selected',
      },
      {
        title: 'Uncritical AI Suggestion Adoption',
        description:
          'Presenting AI-generated suggestions without confidence indicators or alternative options',
        why: 'Users treat AI suggestions as authoritative, suppressing their own judgment and alternative exploration',
        fix: 'Show confidence levels, present multiple alternatives, and include "None of these" options',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.MEDIUM,
        description:
          'Layout determines which suggestions users encounter first and most prominently',
        examples: [
          'Top-positioned auto-complete suggestions are selected most often',
          'Default selections placed prominently receive higher adoption',
          'Suggestion panels positioned near input fields have stronger influence',
          'Recommendation carousels at the top of pages drive more clicks than buried ones',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Text styling affects how authoritative and trustworthy suggestions appear',
        examples: [
          'Bold suggestion text appears more definitive and is adopted more readily',
          'Italicized or lighter placeholder text is perceived as less directive',
          'Larger font sizes on recommended options increase their suggestive power',
          'Quotation marks around suggestions signal external source vs system recommendation',
        ],
      },
      color: {
        level: ImpactLevel.MEDIUM,
        description:
          'Color signals which suggestions are preferred, recommended, or default',
        examples: [
          'Blue or green highlighting on suggested options implies endorsement',
          'Muted colors on non-suggested alternatives reduce their perceived viability',
          'Brand-colored suggestions carry more authority than neutral-colored ones',
          'Warning colors on certain options can suggestively discourage selection',
        ],
      },
      interaction: {
        level: ImpactLevel.CRITICAL,
        description:
          'Interactive patterns are the primary vehicle for suggestibility in interfaces',
        examples: [
          'Auto-complete dropdowns shape search queries before users finish typing',
          'Pre-filled form fields suggest expected answers and reduce independent thought',
          'Default radio button or checkbox selections are accepted by 70-90% of users',
          'AI copilot inline suggestions are accepted at high rates without review',
        ],
      },
      content: {
        level: ImpactLevel.CRITICAL,
        description:
          'Content wording is the most direct channel for suggestibility effects',
        examples: [
          'Question wording in surveys can shift responses by 20-40%',
          'Label text on form fields frames what users consider valid input',
          'Recommendation copy ("Recommended for you", "Most popular") drives selection',
          'Chatbot response suggestions constrain conversation to offered paths',
        ],
      },
      accessibility: {
        level: ImpactLevel.HIGH,
        description:
          'Suggestions must be perceivable and distinguishable for all users',
        examples: [
          'Screen reader users need suggestions announced with clear "suggestion" role context',
          'Auto-complete must be navigable and dismissable via keyboard',
          'Default selections must be clearly communicated in non-visual modes',
          'Suggestive styling (color, size) must have non-visual equivalents for assistive tech',
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
        title: 'Neutral Survey Question Wording',
        description:
          'User feedback survey using unbiased, open-ended question phrasing',
        code: `<form class="feedback-survey">
  <fieldset>
    <legend>Tell us about your experience</legend>

    <label for="experience">How would you describe your experience?</label>
    <select id="experience">
      <option value="" disabled selected>Select one</option>
      <option value="very-positive">Very positive</option>
      <option value="positive">Positive</option>
      <option value="neutral">Neutral</option>
      <option value="negative">Negative</option>
      <option value="very-negative">Very negative</option>
    </select>

    <label for="feedback">What stood out to you? (optional)</label>
    <textarea
      id="feedback"
      placeholder="Share any thoughts about your experience"
      rows="4"
    ></textarea>

    <label for="improve">What could we improve?</label>
    <textarea
      id="improve"
      placeholder="Your suggestions help us get better"
      rows="4"
    ></textarea>
  </fieldset>
</form>`,
        explanation:
          'Questions are worded neutrally ("How would you describe" instead of "How much did you enjoy"). Placeholders are non-leading. The scale is balanced with equal positive and negative options. No option is pre-selected.',
        principle:
          'Neutral question framing produces honest, unbiased user feedback',
        metrics: {
          before: '78% positive responses with leading questions ("How much did you enjoy?")',
          after: '52% positive, 31% neutral, 17% negative with neutral wording',
          improvement: 'Responses now accurately reflect user sentiment distribution',
        },
      },
      {
        title: 'Transparent Auto-Complete with Source Labels',
        description:
          'Search auto-complete that clearly labels suggestion sources',
        code: `<div class="search-container">
  <input
    type="search"
    placeholder="Search products..."
    aria-label="Search products"
    role="combobox"
    aria-expanded="true"
    aria-controls="suggestions"
  />
  <ul id="suggestions" role="listbox" aria-label="Search suggestions">
    <li role="option" class="suggestion">
      <span class="query">wireless headphones</span>
      <span class="source-label">Your recent search</span>
    </li>
    <li role="option" class="suggestion">
      <span class="query">wireless headphones noise cancelling</span>
      <span class="source-label">Popular search</span>
    </li>
    <li role="option" class="suggestion">
      <span class="query">wireless headphones for running</span>
      <span class="source-label">Popular search</span>
    </li>
    <li role="option" class="suggestion browse-all">
      <span class="query">Browse all headphones</span>
      <span class="source-label">Category</span>
    </li>
  </ul>
</div>`,
        explanation:
          'Each suggestion is labeled with its source (user history vs popular vs category), helping users understand why the suggestion appeared and make informed choices rather than blindly accepting the first option.',
        principle:
          'Labeling suggestion sources increases user agency and reduces blind acceptance',
      },
      {
        title: 'Non-Leading Form Labels',
        description:
          'Form fields with neutral labels and non-suggestive placeholder text',
        code: `<form class="profile-setup">
  <div class="field">
    <label for="role">What is your role?</label>
    <select id="role">
      <option value="" disabled selected>Choose your role</option>
      <option value="designer">Designer</option>
      <option value="developer">Developer</option>
      <option value="pm">Product Manager</option>
      <option value="researcher">Researcher</option>
      <option value="other">Other</option>
    </select>
  </div>

  <div class="field">
    <label for="team-size">Team size</label>
    <input
      id="team-size"
      type="number"
      placeholder="e.g., 5"
      min="1"
      aria-describedby="team-hint"
    />
    <span id="team-hint" class="hint">
      Number of people on your team
    </span>
  </div>

  <div class="field">
    <label for="goal">Primary goal</label>
    <textarea
      id="goal"
      placeholder="Describe what you want to achieve"
      rows="3"
    ></textarea>
  </div>
</form>`,
        explanation:
          'Labels ask neutral questions without implying expected answers. Placeholder text uses format hints ("e.g., 5") rather than suggestive content. No defaults are pre-selected, preserving user agency.',
        principle:
          'Neutral form design collects authentic user input rather than echoed suggestions',
      },
    ],

    bad: [
      {
        title: 'Leading Survey with Suggestive Wording',
        description:
          'Feedback form using loaded questions that bias responses',
        code: `<!-- DON'T DO THIS -->
<form class="feedback">
  <h3>We'd love to hear how much you enjoyed our product!</h3>

  <label>How amazing was your experience today?</label>
  <select>
    <option selected>Extremely amazing</option>
    <option>Very amazing</option>
    <option>Amazing</option>
    <option>Somewhat amazing</option>
    <option>Not amazing yet</option>
  </select>

  <label>What did you love most about the new feature?</label>
  <textarea placeholder="I loved how easy it was to..."></textarea>

  <label>Would you recommend us to friends? (Most users do!)</label>
  <input type="radio" name="recommend" value="yes" checked> Yes
  <input type="radio" name="recommend" value="no"> No
</form>`,
        explanation:
          'Every element is suggestive: the heading assumes enjoyment, the scale has no negative options, the question presupposes love, the placeholder suggests a positive response, and the recommendation question has a leading parenthetical with "Yes" pre-selected.',
        principle:
          'Leading questions produce useless data that confirms designer assumptions rather than revealing user truth',
      },
      {
        title: 'Manipulative Default Opt-Ins',
        description:
          'Settings page with pre-checked options that benefit the company',
        code: `<!-- DON'T DO THIS -->
<div class="settings">
  <h3>Your Preferences</h3>
  <label>
    <input type="checkbox" checked>
    Send me personalized offers and promotions
  </label>
  <label>
    <input type="checkbox" checked>
    Share my usage data to improve the product
  </label>
  <label>
    <input type="checkbox" checked>
    Allow partner companies to contact me
  </label>
  <label>
    <input type="checkbox">
    Opt out of all communications
  </label>
</div>`,
        explanation:
          'Business-favorable options are pre-checked while the user-protective option is unchecked. This exploits suggestibility: most users accept defaults without reviewing them, resulting in unwanted data sharing and communications.',
        principle:
          'Pre-checked opt-ins exploit default bias and violate informed consent',
      },
      {
        title: 'Biased Auto-Complete Suggestions',
        description:
          'Search auto-complete that promotes sponsored or biased results',
        code: `<!-- DON'T DO THIS -->
<div class="search">
  <input type="search" value="best " />
  <ul class="suggestions">
    <li class="sponsored">best premium plan upgrade</li>
    <li class="sponsored">best reasons to subscribe</li>
    <li>best features</li>
    <li>best practices</li>
  </ul>
</div>`,
        explanation:
          'Auto-complete suggestions are manipulated to promote commercial interests. Users trust auto-complete as reflecting genuine popular queries, not knowing top results are commercially motivated.',
        principle:
          'Disguising promotional content as organic suggestions erodes trust and manipulates user intent',
      },
    ],

    realWorld: [
      {
        company: 'Google',
        product: 'Google Search Autocomplete',
        description: 'Google autocomplete suggests queries as users type, based on popular searches, user history, and trending topics. These suggestions powerfully shape what users search for, often replacing their original intent with a suggested query.',
        effectiveness: 'very-effective',
        analysis: 'Google invests heavily in autocomplete quality because suggestions directly influence billions of searches. They filter harmful and misleading suggestions but the power of suggestion means top results disproportionately shape public information-seeking behavior.',
      },
      {
        company: 'SurveyMonkey',
        product: 'Question Design Templates',
        description: 'SurveyMonkey provides question templates with guidance on neutral wording. Their platform warns users when question phrasing appears leading and suggests more neutral alternatives.',
        effectiveness: 'effective',
        analysis: 'By building suggestibility awareness into the survey creation tool itself, SurveyMonkey helps users collect more reliable data. The in-context guidance educates survey creators about leading question risks.',
      },
      {
        company: 'Intercom',
        product: 'Chatbot Response Suggestions',
        description: 'Intercom chatbots offer quick-reply buttons that suggest common responses. While this reduces friction, the suggested responses constrain the conversation to paths the company has anticipated, potentially missing unusual but important user needs.',
        effectiveness: 'effective',
        analysis: 'Quick-reply suggestions work well for common scenarios but can create tunnel vision. Users with atypical needs may click a "close enough" suggestion rather than type their actual question, leading to resolution gaps.',
      },
      {
        company: 'GitHub',
        product: 'Copilot Code Suggestions',
        description: 'GitHub Copilot suggests code inline as developers type. Developers frequently accept suggestions without thorough review, incorporating AI-suggested patterns, variable names, and approaches into their codebase.',
        effectiveness: 'effective',
        analysis: 'Copilot dramatically increases coding speed but raises suggestibility concerns: developers may accept suboptimal or insecure code because the suggestion appeared authoritative. Studies show acceptance rates above 30%, with many acceptances occurring with minimal review.',
      },
    ],

    abTests: [
      {
        title: 'Survey Wording: Leading vs Neutral Questions',
        hypothesis:
          'Neutral question wording will produce more varied and accurate response distributions',
        controlVersion: {
          description:
            'Survey with leading questions: "How much did you enjoy the new feature?" with scale from "Loved it" to "It was okay"',
          metrics: {
            conversionRate: '89%',
            timeOnPage: '1:45',
            scrollDepth: '60%',
          },
        },
        treatmentVersion: {
          description:
            'Survey with neutral questions: "How would you describe your experience with the new feature?" with balanced scale from "Very positive" to "Very negative"',
          metrics: {
            conversionRate: '72%',
            timeOnPage: '2:30',
            scrollDepth: '85%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'While the leading version produced higher "satisfaction" scores (89% positive), the neutral version revealed that 23% of users had negative experiences that were invisible in the leading version. Product decisions based on neutral data led to fixes that improved actual retention by 15%.',
          learnings: [
            'Leading questions inflate positive metrics but hide real problems',
            'Neutral wording produces lower satisfaction scores but more actionable insights',
            'Users spend more time on neutral surveys, providing thoughtful responses',
            'The "lost" negative feedback from leading questions cost the team months of undetected issues',
          ],
        },
      },
      {
        title: 'Default Selection: Pre-Selected vs No Default',
        hypothesis:
          'Removing pre-selected defaults will produce more intentional user choices',
        controlVersion: {
          description:
            'Settings page with "Share usage data" and "Email notifications" pre-checked as defaults',
          metrics: {
            conversionRate: '91%',
            clickThroughRate: '94%',
          },
        },
        treatmentVersion: {
          description:
            'Settings page with no pre-checked options and clear descriptions for each choice',
          metrics: {
            conversionRate: '34%',
            clickThroughRate: '67%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Pre-checked defaults produced 91% opt-in, but follow-up research showed 68% of those users did not realize they had opted in. The explicit version produced 34% opt-in from users who genuinely wanted the features, resulting in 3x higher engagement with those features and zero "why am I getting emails?" support tickets.',
          learnings: [
            'Default acceptance is not the same as informed consent',
            'Genuine opt-in users engage 3x more with the features they chose',
            'Removing suggestive defaults eliminated a category of support complaints',
            'Explicit choices build trust and reduce churn from unwanted experiences',
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
        name: 'Pre-Selected Defaults',
        description:
          'Radio buttons, checkboxes, or dropdown menus with options already selected before user interaction',
        howToSpot:
          'Look for checked checkboxes, pre-selected radio buttons, or dropdowns showing a non-placeholder value on first load',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Leading Placeholder Text',
        description:
          'Input placeholders that suggest specific answers rather than format hints',
        howToSpot:
          'Check if placeholder text contains opinions, expected answers, or leading phrases instead of neutral format examples',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Suggestive Labels and Microcopy',
        description:
          'Form labels, question text, or helper text that implies a preferred response',
        howToSpot:
          'Read question text for loaded words ("enjoy", "love", "amazing"), assumed conclusions, or parenthetical nudges ("most users choose...")',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Auto-Complete Prominence',
        description:
          'Search or input suggestions that appear immediately and prominently, potentially overriding user intent',
        howToSpot:
          'Type partial queries and observe if suggestions appear before meaningful input, especially if top suggestions seem commercially motivated',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'AI Suggestion Inline Display',
        description:
          'AI-generated suggestions displayed inline as if they are the natural completion of user input',
        howToSpot:
          'Look for greyed-out or ghost text appearing ahead of the cursor, especially without confidence indicators or source attribution',
        severity: ImpactLevel.HIGH,
      },
    ],

    patterns: [
      {
        name: 'Leading Question Pattern',
        description: 'Questions worded to suggest or assume a particular answer',
        indicators: [
          'Loaded adjectives in question stems ("How great was...")',
          'Unbalanced response scales (more positive than negative options)',
          'Assumed conclusions in question framing ("Since you enjoyed...")',
          'Parenthetical social proof ("Most users agree...")',
        ],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Default Nudge Pattern',
        description: 'Pre-selected options that favor one choice without explicit justification',
        indicators: [
          'Pre-checked opt-in checkboxes',
          'Pre-selected plan tiers or subscription options',
          'Default-on toggles for data sharing or communications',
          'Hidden "recommended" defaults in multi-step flows',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Auto-Complete Steering Pattern',
        description: 'Search or input suggestions that direct users toward specific content or actions',
        indicators: [
          'Sponsored or promoted suggestions mixed with organic ones',
          'Suggestions that complete partial input toward commercial actions',
          'Auto-complete that prioritizes recent or trending over relevant',
          'Suggestion ordering that favors business metrics over user intent',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'medium',
      },
      {
        name: 'AI Authority Pattern',
        description: 'AI suggestions presented with implicit authority that suppresses user judgment',
        indicators: [
          'Single AI suggestion without alternatives',
          'No confidence score or uncertainty indicator',
          'Inline ghost text that auto-completes on Tab/Enter',
          'AI responses without "I could be wrong" or source attribution',
        ],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
    ],

    checklistQuestions: [
      'Are any form options pre-selected before user interaction?',
      'Do survey questions use neutral or loaded language?',
      'Does placeholder text suggest specific answers or merely show format?',
      'Are auto-complete suggestions labeled with their source (history, popular, sponsored)?',
      'Do AI suggestions include confidence indicators and alternatives?',
      'Are response scales balanced with equal positive and negative options?',
      'Can users easily override or dismiss suggestions?',
      'Do defaults benefit the user or the business?',
      'Is there a "None of these" or custom option alongside suggestions?',
      'Are chatbot quick-reply buttons accompanied by a free-text input option?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in suggestibility and the misinformation effect.

Analyze the provided design for suggestibility patterns. Identify:

1. **Leading Questions**: Survey or form questions that suggest or assume answers
2. **Default Suggestions**: Pre-selected options, auto-complete behavior, and placeholder text
3. **AI Suggestions**: How AI-generated content is presented and whether it suppresses independent judgment
4. **Recommendation Framing**: How suggestions are labeled and positioned
5. **Response Constraints**: Whether suggestion options limit or channel user expression

For each pattern found:
- Identify whether the suggestion helps or manipulates the user
- Assess if the suggestion is clearly labeled as a suggestion vs. a fact
- Determine whether users can easily override or ignore the suggestion
- Evaluate if the suggestion introduces bias into data collection
- Check if alternatives and free-form options are available

Consider:
- Are survey questions collecting genuine user sentiment or echoing designer assumptions?
- Do defaults serve user needs or business interests?
- Are auto-complete suggestions transparent about their source and ranking?
- Do AI suggestions include confidence levels and alternatives?
- Can users with accessibility needs perceive and dismiss suggestions equally well?

Provide actionable recommendations for ethical, transparent suggestion design.`,

    outputSchema: {
      type: 'object',
      properties: {
        suggestibilityPatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              suggestionContent: { type: 'string' },
              transparency: { type: 'string' },
              userAgency: { type: 'string' },
              biasRisk: { type: 'string' },
              ethical: { type: 'boolean' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'suggestionContent',
              'transparency',
              'ethical',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            questionNeutrality: { type: 'number' },
            defaultTransparency: { type: 'number' },
            userAgencyScore: { type: 'number' },
            ethicalScore: { type: 'number' },
          },
          required: [
            'questionNeutrality',
            'defaultTransparency',
            'userAgencyScore',
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
        'suggestibilityPatterns',
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
        title: 'Audit Existing Suggestions',
        description:
          'Review all defaults, auto-complete, placeholder text, and question wording for suggestive content',
        example:
          'Catalog every pre-selected option, placeholder, and survey question across the product',
        tips: [
          'Check surveys for leading or loaded question language',
          'Review placeholder text for opinion or expected-answer content',
          'List all pre-checked defaults and who they benefit',
        ],
      },
      {
        step: 2,
        title: 'Neutralize Question Wording',
        description:
          'Rewrite survey and form questions using neutral, non-leading language',
        example:
          'Change "How much did you enjoy..." to "How would you describe your experience with..."',
        tips: [
          'Remove loaded adjectives (amazing, great, easy)',
          'Balance response scales with equal positive and negative options',
          'Avoid assumed conclusions in question stems',
        ],
      },
      {
        step: 3,
        title: 'Design Transparent Defaults',
        description:
          'Ensure all pre-selected options are clearly labeled and justified',
        example:
          'Label pre-selected options: "Default: Standard plan (selected because most users choose this)"',
        tips: [
          'Explain why each default was selected',
          'Make it equally easy to change or accept defaults',
          'Prefer no default over a business-biased default',
        ],
      },
      {
        step: 4,
        title: 'Label Suggestion Sources',
        description:
          'Clearly indicate where auto-complete and recommendation suggestions come from',
        example:
          'Tag suggestions as "Your history", "Popular", "Sponsored", or "AI-generated"',
        tips: [
          'Never disguise sponsored suggestions as organic',
          'Distinguish between personal history and popular suggestions',
          'Label AI-generated content explicitly',
        ],
      },
      {
        step: 5,
        title: 'Preserve User Agency',
        description:
          'Always provide ways to override, dismiss, or ignore suggestions',
        example:
          'Include "None of these" options, free-text fields, and clear dismiss controls',
        tips: [
          'Ensure suggestions are dismissable, not forced',
          'Offer free-form alternatives alongside suggestion lists',
          'Let users disable auto-complete if they prefer',
        ],
      },
    ],

    dos: [
      'Use neutral, non-leading language in all surveys and forms',
      'Label auto-complete suggestions with their source',
      'Provide balanced response scales with equal positive and negative options',
      'Include "Other" or free-text options alongside suggestion lists',
      'Show confidence levels on AI-generated suggestions',
      'Make defaults easily changeable with clear visual affordance',
      'Test survey wording with cognitive interviewing to detect leading phrasing',
      'Offer multiple AI suggestion alternatives rather than a single answer',
    ],

    donts: [
      'Don\'t use loaded adjectives in survey questions',
      'Don\'t pre-check opt-in boxes for marketing or data sharing',
      'Don\'t disguise sponsored auto-complete results as organic suggestions',
      'Don\'t use placeholder text that suggests expected answers',
      'Don\'t present AI suggestions without confidence indicators',
      'Don\'t assume pre-selected defaults represent informed user choice',
      'Don\'t rely on suggestive defaults for consent collection',
      'Don\'t frame chatbot quick-replies as the only response options',
    ],

    bestPractices: [
      {
        title: 'Neutral Question Design',
        description:
          'Write survey and form questions that do not suggest or assume any particular answer',
        rationale:
          'Leading questions produce data that reflects the question wording, not user sentiment',
        example:
          '"How would you rate this feature?" with a 5-point scale from "Very negative" to "Very positive"',
      },
      {
        title: 'Source-Labeled Suggestions',
        description:
          'Tag every auto-complete and recommendation with its origin',
        rationale:
          'Users make better decisions when they know whether a suggestion comes from their history, popularity data, or commercial promotion',
        example:
          'Auto-complete items tagged with "Recent", "Trending", "Suggested", or "Sponsored"',
      },
      {
        title: 'Confidence-Aware AI Suggestions',
        description:
          'Display AI confidence levels and multiple alternatives for AI-generated suggestions',
        rationale:
          'Single authoritative-looking AI suggestions suppress independent judgment; showing uncertainty restores it',
        example:
          'AI suggestion with "85% confidence" badge, two alternative suggestions, and a "Write your own" option',
      },
      {
        title: 'Explicit Consent Over Default Opt-In',
        description:
          'Require active user selection for data sharing, communications, and terms acceptance',
        rationale:
          'Default acceptance is not informed consent; explicit opt-in builds trust and is legally required in many jurisdictions',
        example:
          'Unchecked checkboxes with clear descriptions: "Check to receive marketing emails (about 2 per week)"',
      },
      {
        title: 'Cognitive Interview Testing',
        description:
          'Test question wording with real users using cognitive interviewing techniques',
        rationale:
          'Only user testing can reveal whether phrasing is leading, confusing, or ambiguous',
        example:
          'Ask 5 users to "think aloud" while reading each survey question and note where they feel guided or confused',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships - Ensure suggestions are semantically distinct from user-entered content',
        implementation:
          'Use ARIA roles (role="option", aria-autocomplete) so screen readers announce suggestions as suggestions, not as confirmed input',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.1.1',
        guideline:
          'Keyboard - Ensure auto-complete suggestions are fully keyboard navigable and dismissable',
        implementation:
          'Support arrow key navigation, Enter to accept, Escape to dismiss, and ensure focus management does not trap users in suggestion lists',
      },
      {
        wcagLevel: 'AA',
        criterion: '4.1.2',
        guideline:
          'Name, Role, Value - Communicate default selections and suggestions to assistive technology',
        implementation:
          'Use aria-selected for pre-chosen options, announce default state, and ensure users know when a value was system-suggested vs. user-chosen',
      },
    ],

    ethics: [
      {
        concern: 'Leading Question Bias',
        severity: 'critical',
        explanation:
          'Suggestive survey and form wording produces artificially positive data, hiding real problems',
        mitigation:
          'Use neutral question wording, balanced scales, and cognitive interview testing. Compare results from leading vs neutral versions to calibrate.',
      },
      {
        concern: 'Dark Pattern Defaults',
        severity: 'critical',
        explanation:
          'Pre-checking business-favorable options exploits the fact that 70-90% of users accept defaults without review',
        mitigation:
          'Require explicit opt-in for data sharing, marketing, and third-party access. Leave all consent checkboxes unchecked by default.',
      },
      {
        concern: 'Auto-Complete Manipulation',
        severity: 'high',
        explanation:
          'Mixing sponsored or promotional suggestions with organic auto-complete results deceives users about suggestion origins',
        mitigation:
          'Label all sponsored suggestions clearly. Maintain editorial separation between organic and promoted results.',
      },
      {
        concern: 'AI Suggestion Over-Reliance',
        severity: 'high',
        explanation:
          'Presenting AI suggestions as authoritative single answers suppresses independent thinking and can propagate errors at scale',
        mitigation:
          'Always show confidence levels, offer multiple alternatives, include "None of these" options, and encourage users to verify AI output.',
      },
      {
        concern: 'Memory Contamination',
        severity: 'medium',
        explanation:
          'Suggestive questions in post-experience surveys can alter users\' actual memories of the experience, not just their reports',
        mitigation:
          'Use immediate, neutral post-experience prompts. Avoid re-framing user experiences through leading retrospective questions.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'Eyewitness Testimony',
        author: 'Loftus, E. F.',
        year: 1979,
        description:
          'Foundational work on how suggestions and leading questions alter memory, establishing the misinformation effect',
        type: 'foundational',
      },
      {
        title: 'The Gudjonsson Suggestibility Scales',
        author: 'Gudjonsson, G. H.',
        year: 1984,
        doi: '10.1016/S0191-8869(84)80023-2',
        description:
          'Introduced standardized measurement of interrogative suggestibility, distinguishing yield (accepting suggestions) from shift (changing answers under pressure)',
        type: 'foundational',
      },
      {
        title: 'Semantic Integration of Verbal Information into a Visual Memory',
        author: 'Loftus, E. F., Miller, D. G., & Burns, H. J.',
        year: 1978,
        doi: '10.1016/S0022-5371(78)90065-1',
        description:
          'Demonstrated that misleading post-event information becomes integrated into original memory traces',
        type: 'foundational',
      },
      {
        title: 'Make-Believe Memories',
        author: 'Loftus, E. F.',
        year: 2003,
        doi: '10.1037/0003-066X.58.11.867',
        description:
          'Review of how suggestion can create entirely false memories, with implications for digital experience design',
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
          'The foundational text on suggestibility and memory distortion through leading information',
        type: 'foundational',
      },
      {
        title: 'The Psychology of Interrogations and Confessions',
        author: 'Gudjonsson, Gisli H.',
        year: 2003,
        isbn: '9780470844618',
        description:
          'Comprehensive treatment of suggestibility in questioning contexts, with direct applications to survey and form design',
        type: 'foundational',
      },
      {
        title: 'Nudge: Improving Decisions About Health, Wealth, and Happiness',
        author: 'Thaler, Richard H., & Sunstein, Cass R.',
        year: 2008,
        isbn: '9780300122237',
        description:
          'Explores how defaults and choice architecture (forms of suggestion) shape decisions, with ethical frameworks',
        type: 'practical',
      },
    ],

    articles: [
      {
        title: 'Default Effect: How to Optimize Your UX with Smart Defaults',
        author: 'Nielsen Norman Group',
        url: 'https://www.nngroup.com/articles/the-power-of-defaults/',
        description:
          'Practical guide to designing ethical defaults that leverage suggestibility without manipulation',
        type: 'practical',
      },
      {
        title: 'Leading Questions in Surveys',
        author: 'Qualtrics Research',
        url: 'https://www.qualtrics.com/experience-management/research/leading-questions/',
        description:
          'Guide to identifying and eliminating leading questions in user research',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'How Reliable Is Your Memory? - Elizabeth Loftus',
        author: 'TED',
        url: 'https://www.ted.com/talks/elizabeth_loftus_how_reliable_is_your_memory',
        description:
          'Elizabeth Loftus explains how suggestion and misinformation alter human memory',
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
      'anchoring-bias',       // Suggestions act as anchors for subsequent judgments
      'default-effect',       // Defaults are a form of suggestion
      'authority-bias',       // Suggestions from authorities are more readily accepted
      'social-proof',         // "Most users choose..." adds social suggestion
    ],

    conflicts: [
      'reactance',            // Some users resist obvious suggestions
      'need-for-cognition',   // High-cognition users evaluate rather than accept suggestions
    ],

    confusedWith: [
      'priming',              // Related but priming is unconscious activation, suggestibility involves explicit suggestion
      'anchoring-bias',       // Anchoring uses numeric reference points; suggestibility is broader
      'conformity-bias',      // Conformity is social pressure; suggestibility is information-based
    ],

    hierarchy: {
      parent: 'memory-bias',
      children: [
        'misinformation-effect',
        'leading-question-effect',
        'default-effect',
      ],
    },
  },
};
