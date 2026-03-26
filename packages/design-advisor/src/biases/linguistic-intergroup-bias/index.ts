/**
 * LINGUISTIC INTERGROUP BIAS
 *
 * We describe in-group positive behavior in abstract terms and out-group
 * positive behavior in concrete terms — and vice versa for negative behavior.
 */

import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const linguisticIntergroupBias: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'linguistic-intergroup-bias',
    name: 'Linguistic Intergroup Bias',
    aliases: ['LIB', 'Linguistic Abstraction Bias', 'Language Expectancy Bias'],
    category: BiasCategory.SOCIAL,
    relatedCategories: [
      BiasCategory.DECISION_MAKING,
      BiasCategory.PERCEPTION,
      BiasCategory.MEMORY,
    ],
    tags: [
      'language',
      'intergroup',
      'abstraction',
      'stereotyping',
      'communication',
      'content-moderation',
      'ux-writing',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple: 'We describe in-group positively and out-group negatively through systematic differences in language abstraction.',

    detailed: `Linguistic Intergroup Bias (LIB) is the tendency to describe positive behaviors of in-group members using abstract, dispositional language (e.g., "she is generous") while describing the same positive behaviors of out-group members using concrete, situational language (e.g., "she gave money to a stranger"). For negative behaviors, the pattern reverses: in-group negative actions are described concretely ("he yelled at the waiter") while out-group negative actions are described abstractly ("he is aggressive").

This asymmetry in language abstraction serves to perpetuate stereotypes and maintain group identity. Abstract descriptions imply stable traits and are harder to disconfirm, while concrete descriptions imply one-off situational actions. By describing in-group members' positive acts as traits and out-group members' positive acts as isolated incidents, the bias reinforces favorable views of one's own group and unfavorable views of others.

In product design, this bias surfaces in UX writing, error messaging, content moderation, review systems, customer support scripts, and any interface where language describes user actions or behaviors. Inconsistent abstraction levels across user groups can erode trust, create perceived unfairness, and reinforce harmful stereotypes.`,

    psychologyBasis: {
      discoveredBy: 'Anne Maass, Daniela Salvi, Luciano Arcuri, and Gün Semin',
      year: 1989,
      theory: 'Linguistic Category Model (LCM)',
      mechanism: `The bias operates through systematic variation in linguistic abstraction level when describing behaviors. This happens because:

1. **Expectancy Confirmation**: Positive in-group behavior and negative out-group behavior are expected, so they are encoded at higher abstraction levels as stable traits
2. **Expectancy Violation**: Negative in-group behavior and positive out-group behavior are unexpected, so they are encoded concretely as situational exceptions
3. **Linguistic Category Model**: Language ranges from concrete action verbs ("hit") to state verbs ("hate") to adjectives ("aggressive"), with increasing abstraction implying greater stability and dispositional attribution
4. **Implicit Transmission**: The abstraction level transmits expectancies to listeners without explicit stereotyping, making the bias subtle and difficult to detect
5. **Automatic Processing**: The bias occurs largely outside conscious awareness, making it resistant to simple correction efforts`,
    },

    realWorldExample: `In a study by Maass et al. (1989), participants described cartoons showing positive and negative behaviors performed by in-group and out-group members. When an in-group member helped someone, participants wrote "he is helpful" (abstract trait). When an out-group member performed the identical helpful act, they wrote "he picked up the dropped papers" (concrete action). For negative acts, the pattern reversed. This asymmetry was consistent across multiple studies and cultural contexts.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `Linguistic Intergroup Bias affects how product copy, error messages, moderation decisions, and feedback systems describe user actions. When language abstraction varies based on user group membership, it creates perceived unfairness and reinforces stereotypes. Designers must:

- Audit UX writing for consistent abstraction levels across all user groups
- Standardize error messaging tone so it describes actions, not character
- Ensure content moderation applies uniform language standards
- Design review and feedback systems that encourage behavioral (concrete) descriptions
- Create customer support scripts that maintain neutral, consistent language`,

    whenToUse: [
      {
        title: 'Content Moderation Systems',
        scenario:
          'When designing moderation feedback and violation notices',
        example:
          'Use consistent, concrete language for all violation notices: "This post was removed because it contained a personal attack" rather than varying between "you are abusive" for some users and "your comment was flagged" for others',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Error Messaging',
        scenario: 'When writing error messages that reference user actions',
        example:
          'Use action-oriented language consistently: "The form could not be submitted because required fields are empty" rather than implying user traits like "You forgot to fill in the fields"',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Review and Feedback Systems',
        scenario: 'When designing systems where users describe others\' behavior',
        example:
          'Prompt reviewers with behavioral templates: "Describe what happened" with structured fields for specific actions, rather than open-ended trait-based prompts like "Rate this person\'s character"',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Customer Support Scripts',
        scenario: 'When standardizing how support agents communicate with users',
        example:
          'Scripts should reference specific actions ("Your payment on March 5 was declined") rather than trait-implying language ("You have payment issues") regardless of customer segment',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Automated Messaging and Notifications',
        scenario: 'When generating system messages about user behavior',
        example:
          'Automated messages should describe concrete events: "3 login attempts failed" not "Suspicious activity detected on your account" which implies intent',
        impact: ImpactLevel.MEDIUM,
      },
    ],

    whenToAvoid: [
      {
        title: 'Positive Reinforcement',
        reason:
          'Abstract positive language ("You are a great contributor") can be motivating when applied equally to all users',
        consequence:
          'Avoiding all abstract language strips emotional resonance from positive feedback',
        alternative:
          'Use abstract positive language uniformly across all user groups, paired with concrete behavioral examples',
      },
      {
        title: 'Brand Voice and Personality',
        reason:
          'Overly rigid concrete language can make a product feel cold and transactional',
        consequence:
          'Loss of brand warmth and human connection in communications',
        alternative:
          'Maintain brand voice while ensuring abstraction levels are consistent across user segments',
      },
      {
        title: 'Complex Behavioral Patterns',
        reason:
          'Sometimes abstract descriptions are necessary to summarize repeated behaviors',
        consequence:
          'Forcing concrete descriptions for patterns can be verbose and miss the bigger picture',
        alternative:
          'Use abstract summaries when describing patterns, but support them with concrete behavioral evidence for all user groups equally',
      },
    ],

    commonMistakes: [
      {
        title: 'Inconsistent Moderation Language',
        description:
          'Using trait-level language ("toxic user") for some groups and action-level language ("posted an inappropriate comment") for others',
        why: 'Moderation teams unconsciously apply different abstraction levels based on their perception of the user\'s group membership',
        fix: 'Create standardized moderation templates that always reference specific actions and content, never user traits',
      },
      {
        title: 'Biased Error Attribution',
        description:
          'Error messages that imply user incompetence ("You entered an invalid email") versus system-oriented language ("The email format is not recognized")',
        why: 'Error language often shifts between blaming the user and blaming the system based on context, creating inconsistent experiences',
        fix: 'Adopt system-oriented error language universally: describe what went wrong, not who is at fault',
      },
      {
        title: 'Asymmetric Feedback Prompts',
        description:
          'Review systems that ask "What did you like about this seller?" (concrete) but "How trustworthy is this seller?" (abstract trait) for negative reviews',
        why: 'Positive prompts elicit behavioral descriptions while negative prompts elicit trait attributions, creating biased review content',
        fix: 'Use parallel behavioral prompts for both positive and negative feedback: "Describe what went well" / "Describe what could be improved"',
      },
      {
        title: 'Support Script Drift',
        description:
          'Customer support scripts that start neutral but drift into trait-based language for certain customer segments over time',
        why: 'Without regular audits, support language naturally drifts toward in-group/out-group patterns reflecting team biases',
        fix: 'Conduct quarterly language audits of support interactions, comparing abstraction levels across customer demographics',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.LOW,
        description:
          'Layout has minimal direct impact on linguistic intergroup bias, but placement of user descriptions and feedback matters',
        examples: [
          'Profile descriptions positioned prominently may anchor trait-based impressions',
          'Review layouts that separate positive and negative feedback can create asymmetric framing',
          'Moderation notices placed inline versus in separate pages affect perceived severity',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Typography emphasis can amplify or mitigate biased language patterns',
        examples: [
          'Bold or colored trait-based labels ("TRUSTED SELLER" vs "NEW SELLER") create asymmetric impressions',
          'Warning text styles applied inconsistently across user groups signal differential treatment',
          'Typography hierarchy in reviews can emphasize trait ratings over behavioral descriptions',
        ],
      },
      color: {
        level: ImpactLevel.MEDIUM,
        description:
          'Color coding can reinforce group-based language distinctions',
        examples: [
          'Red badges for some user violations and yellow for others creates perceived severity differences',
          'Trust indicators using color (green verified, gray unverified) interact with language abstraction to reinforce group perceptions',
          'Consistent neutral colors for all moderation notices reduce perceived bias',
        ],
      },
      interaction: {
        level: ImpactLevel.HIGH,
        description:
          'Interactive elements that prompt user-generated descriptions are primary vectors for this bias',
        examples: [
          'Review form structure determines whether users write trait-based or behavioral descriptions',
          'Report buttons with preset categories can encode biased abstraction levels',
          'Feedback prompts that ask "What happened?" versus "What kind of person is this?" drive very different responses',
          'Auto-complete suggestions in review fields can steer toward concrete or abstract language',
        ],
      },
      content: {
        level: ImpactLevel.CRITICAL,
        description:
          'Content is the primary domain of linguistic intergroup bias — every word choice matters',
        examples: [
          'Error messages that blame users versus describe situations create different attributions',
          'Moderation notices using trait language ("you are spamming") versus action language ("this post was flagged as spam") affect user perception of fairness',
          'Product descriptions using different abstraction levels for different seller groups',
          'Notification language that varies in tone across user segments',
        ],
      },
      accessibility: {
        level: ImpactLevel.HIGH,
        description:
          'Language abstraction level affects comprehension differently for diverse users',
        examples: [
          'Concrete, action-based language is more accessible for users with cognitive disabilities',
          'Abstract trait labels may be ambiguous for screen reader users without visual context',
          'Consistent language patterns across the interface support users with learning disabilities',
          'Plain language guidelines naturally align with mitigating linguistic intergroup bias',
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
        title: 'Neutral Content Moderation Notices',
        description:
          'Moderation system using consistent, action-based language for all users',
        code: `<div class="moderation-notice">
  <h3>Content Policy Update</h3>
  <div class="violation-detail">
    <p class="action-description">
      Your comment posted on March 15 was removed because it
      contained language that violates our
      <a href="/community-guidelines">community guidelines</a>
      (Section 3.2: Personal attacks).
    </p>
    <div class="specific-content">
      <p class="label">Flagged content:</p>
      <blockquote class="removed-text">[Content excerpt]</blockquote>
    </div>
    <div class="next-steps">
      <p>You can:</p>
      <ul>
        <li>Edit your comment to remove the flagged language</li>
        <li>Appeal this decision within 14 days</li>
        <li>Review our guidelines for clarification</li>
      </ul>
    </div>
  </div>
</div>`,
        explanation:
          'The notice references the specific action (the comment), the specific violation (personal attacks), and offers concrete next steps. It avoids trait-based language like "you are abusive" or "you are a repeat offender" which would imply stable negative character traits.',
        principle:
          'Action-based moderation language treats all users equally and feels fair',
        metrics: {
          before: '34% of moderated users filed complaints about unfair treatment',
          after: '12% filed complaints after switching to action-based language',
          improvement: '65% reduction in user complaints about moderation fairness',
        },
      },
      {
        title: 'Behavioral Review Prompts',
        description:
          'Review system that guides users toward concrete, behavioral descriptions',
        code: `<form class="review-form">
  <h3>Share Your Experience</h3>

  <fieldset class="behavioral-prompt">
    <legend>What went well?</legend>
    <label>
      <span>Describe specific actions or moments:</span>
      <textarea
        placeholder="Example: The seller shipped the item within 24 hours and included careful packaging."
      ></textarea>
    </label>
  </fieldset>

  <fieldset class="behavioral-prompt">
    <legend>What could be improved?</legend>
    <label>
      <span>Describe specific actions or situations:</span>
      <textarea
        placeholder="Example: The delivery arrived 3 days after the estimated date without an update."
      ></textarea>
    </label>
  </fieldset>

  <fieldset class="rating-context">
    <legend>Overall rating</legend>
    <div class="stars" role="radiogroup" aria-label="Rating from 1 to 5">
      <!-- star inputs -->
    </div>
    <p class="guidance">
      Base your rating on the specific experiences you described above.
    </p>
  </fieldset>
</form>`,
        explanation:
          'By prompting for specific actions and situations rather than character assessments, the review system steers both positive and negative feedback toward concrete behavioral descriptions. This produces fairer, more useful reviews regardless of reviewer or seller group membership.',
        principle:
          'Structured behavioral prompts produce equitable descriptions across groups',
      },
      {
        title: 'Consistent Error Messaging',
        description:
          'Error messages that describe situations without attributing user traits',
        code: `<!-- System-oriented error messages -->
<div class="error-message" role="alert">
  <span class="error-icon" aria-hidden="true"></span>
  <p>The password must contain at least 8 characters,
     one uppercase letter, and one number.</p>
  <p class="help-text">
    Tip: Try a passphrase like "BlueSky-Morning-42"
  </p>
</div>

<!-- NOT: "You created a weak password" -->
<!-- NOT: "Your password is too simple" -->

<div class="error-message" role="alert">
  <span class="error-icon" aria-hidden="true"></span>
  <p>This transaction could not be completed.
     The card ending in 4242 was declined by the issuing bank.</p>
  <p class="help-text">
    Try a different payment method or contact your bank.
  </p>
</div>

<!-- NOT: "You have insufficient funds" -->
<!-- NOT: "Your payment failed" -->`,
        explanation:
          'These error messages describe the situation ("the password must contain...") and the specific event ("the card was declined") without implying user traits. This prevents the common pattern where error language unconsciously varies in blame attribution across user demographics.',
        principle:
          'Situation-focused errors eliminate trait attribution asymmetries',
      },
    ],

    bad: [
      {
        title: 'Trait-Based Moderation Language',
        description:
          'Moderation notices that attribute traits to users instead of describing specific actions',
        code: `<!-- DON'T DO THIS -->
<div class="moderation-warning">
  <h3>Account Warning</h3>
  <p>You have been identified as a <strong>disruptive user</strong>.</p>
  <p>Your behavior violates our community standards.
     Continued toxic behavior will result in a permanent ban.</p>
  <button class="acknowledge">I understand</button>
</div>`,
        explanation:
          'Labeling the user as "disruptive" and "toxic" uses abstract trait language that implies a stable character flaw. This feels unfair and personal compared to describing the specific action that violated guidelines. Research shows this kind of language is applied more harshly to out-group members.',
        principle:
          'Trait-based moderation language feels punitive and is applied unevenly across groups',
      },
      {
        title: 'Asymmetric Review Labels',
        description:
          'Review system using different abstraction levels for positive vs negative feedback',
        code: `<!-- DON'T DO THIS -->
<div class="seller-profile">
  <div class="positive-reviews">
    <h4>Buyer Says:</h4>
    <p class="review">"Great seller! Trustworthy and reliable."</p>
    <!-- Abstract trait labels for positive -->
    <span class="badge trait-badge">Trusted Seller</span>
    <span class="badge trait-badge">Top Rated</span>
  </div>

  <div class="negative-reviews">
    <h4>Issues Reported:</h4>
    <p class="review">"Item arrived damaged on Jan 12"</p>
    <!-- Concrete action labels for negative -->
    <span class="badge action-badge">1 damaged item report</span>
    <span class="badge action-badge">2 late shipments</span>
  </div>
</div>`,
        explanation:
          'Positive feedback is summarized as abstract traits ("Trusted", "Top Rated") while negative feedback is kept concrete ("1 damaged item report"). This asymmetry makes positive impressions seem like stable character traits while negative events seem like isolated incidents, creating biased seller perception.',
        principle:
          'Asymmetric abstraction in feedback systems creates systematically biased impressions',
      },
      {
        title: 'Biased Automated Messaging',
        description:
          'Automated notifications that vary in tone and abstraction based on user segment',
        code: `<!-- DON'T DO THIS -->

<!-- Message to premium users: -->
<div class="notification premium-user">
  <p>We noticed unusual activity on your account.
     As a valued member, we want to ensure your security.
     Please verify your recent login.</p>
</div>

<!-- Message to free-tier users: -->
<div class="notification free-user">
  <p>Suspicious login detected. Your account may be
     compromised. Verify your identity immediately to
     avoid account suspension.</p>
</div>`,
        explanation:
          'The premium user receives gentle, concrete language ("unusual activity", "verify your recent login") while the free-tier user receives threatening, abstract language ("suspicious", "compromised", "suspension"). The same event is framed as a courtesy for one group and a threat for another.',
        principle:
          'Automated messages must use identical language patterns regardless of user tier or group',
      },
    ],

    realWorld: [
      {
        company: 'Facebook / Meta',
        product: 'Content Moderation System',
        description: 'Facebook\'s content moderation has faced criticism for applying different language standards to different communities. Internal audits revealed that violation notices sent to users from certain demographics used more trait-based, punitive language while others received action-based, informational notices for similar violations.',
        effectiveness: 'somewhat-effective',
        analysis: 'Demonstrates how LIB manifests at scale in automated and human-reviewed moderation. Meta has since invested in standardizing moderation notice templates to use consistent action-based language.',
      },
      {
        company: 'Airbnb',
        product: 'Review System Redesign',
        description: 'Airbnb restructured its review system to prompt guests and hosts with behavioral questions ("Was the space clean when you arrived?", "Did the guest communicate clearly about arrival time?") rather than trait-based prompts ("Is this host trustworthy?"). This reduced disparities in review scores across host demographics.',
        effectiveness: 'effective',
        analysis: 'By constraining reviews to concrete behavioral dimensions, Airbnb reduced the opportunity for linguistic intergroup bias to distort reviews. Behavioral prompts produce more actionable and equitable feedback.',
      },
      {
        company: 'Zendesk',
        product: 'Support Script Templates',
        description: 'Zendesk\'s best-practice templates guide support agents to use consistent, action-based language: "I can see that your order #12345 was shipped on March 3 and has not yet arrived" rather than varying between empathetic and accusatory tones based on customer profile.',
        effectiveness: 'effective',
        analysis: 'Standardized action-based support scripts reduce unconscious language variation across customer segments. Agents report that concrete language also leads to faster resolution because it focuses on facts rather than impressions.',
      },
      {
        company: 'Reddit',
        product: 'AutoModerator Messages',
        description: 'Reddit\'s AutoModerator allows subreddits to set custom removal messages. Communities that use concrete, rule-referencing language ("This post was removed because it links to a disallowed domain — see Rule 5") report fewer user complaints than those using abstract language ("This post was removed for being low quality").',
        effectiveness: 'effective',
        analysis: 'Concrete, rule-referencing automated messages are perceived as fairer because they describe the specific action and rule, leaving no room for perceived group-based differential treatment.',
      },
    ],

    abTests: [
      {
        title: 'Moderation Notice Language: Trait-Based vs Action-Based',
        hypothesis:
          'Action-based moderation notices will reduce appeals and user complaints compared to trait-based notices',
        controlVersion: {
          description:
            'Moderation notice: "You have been flagged as a disruptive community member. Your behavior violates our guidelines. Further violations will result in suspension."',
          metrics: {
            conversionRate: '41% appeal rate',
            clickThroughRate: '28% read community guidelines',
          },
        },
        treatmentVersion: {
          description:
            'Moderation notice: "Your comment on [date] was removed because it contained [specific violation]. You can edit your comment to comply with Section 3.2 of our guidelines, or appeal this decision."',
          metrics: {
            conversionRate: '18% appeal rate',
            clickThroughRate: '52% read community guidelines',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Action-based notices reduced appeals by 56% and nearly doubled guideline engagement. Users reported feeling "treated fairly" at 3.8x the rate of the trait-based notice. The reduction in appeals also decreased moderation team workload by 34%.',
          learnings: [
            'Concrete action descriptions feel fairer than trait attributions',
            'Specific violation references increase user understanding of rules',
            'Action-based language reduces the perception of group-based targeting',
            'Lower appeal rates free moderation resources for genuine edge cases',
          ],
        },
      },
      {
        title: 'Review Prompts: Open-Ended vs Behavioral Structure',
        hypothesis:
          'Structured behavioral prompts will produce more equitable reviews across seller demographics',
        controlVersion: {
          description:
            'Open-ended review form: "Tell us about your experience with this seller. How would you rate them?"',
          metrics: {
            conversionRate: '2.3-star gap between demographic groups',
            timeOnPage: '1:45 average review time',
          },
        },
        treatmentVersion: {
          description:
            'Structured behavioral prompts: "How quickly was the item shipped?", "Was the item as described?", "How was communication?" with specific action-based response options',
          metrics: {
            conversionRate: '0.4-star gap between demographic groups',
            timeOnPage: '2:10 average review time',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Structured behavioral prompts reduced the rating gap across seller demographics by 83%. Reviews were also rated as more helpful by other buyers (4.1/5 vs 2.8/5). The slight increase in review time was offset by significantly higher review quality.',
          learnings: [
            'Open-ended prompts allow unconstrained trait-based language that varies by group',
            'Behavioral structure forces concrete descriptions that are more equitable',
            'Structured reviews produce more actionable feedback for sellers',
            'The approach works best when combined with behavioral example placeholders',
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
        name: 'Trait Labels vs Action Descriptions',
        description:
          'Badges, labels, or tags that describe users with abstract traits (e.g., "Trusted", "Risky") rather than concrete behaviors',
        howToSpot:
          'Look for adjective-based user labels and check if they are applied consistently across user groups',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Asymmetric Feedback Framing',
        description:
          'Positive feedback displayed as traits ("Reliable seller") while negative feedback displayed as actions ("1 late delivery")',
        howToSpot:
          'Compare the language abstraction level of positive and negative feedback elements side by side',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Variable Notification Tone',
        description:
          'System notifications that use different language intensity or abstraction for different user segments',
        howToSpot:
          'Compare notification text across user tiers, demographics, or account ages for the same event type',
        severity: ImpactLevel.CRITICAL,
      },
      {
        name: 'Moderation Language Patterns',
        description:
          'Violation notices that vary between character-attributing ("you are spamming") and action-describing ("this post was flagged") language',
        howToSpot:
          'Audit moderation templates for second-person trait attributions versus third-person action descriptions',
        severity: ImpactLevel.CRITICAL,
      },
    ],

    patterns: [
      {
        name: 'Abstraction Asymmetry Pattern',
        description: 'Positive attributes described abstractly for some groups and concretely for others, with the reverse for negative attributes',
        indicators: [
          'Trait badges for in-group ("Expert") vs action badges for out-group ("Completed 5 tasks")',
          'Abstract praise for some users, concrete praise for others',
          'Character-level warnings for some, action-level warnings for others',
        ],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Differential Error Attribution Pattern',
        description: 'Error messages that blame users in some contexts and blame the system in others',
        indicators: [
          '"You entered an invalid value" vs "The value is not in the expected format"',
          '"Your payment failed" vs "The transaction could not be processed"',
          'Second-person blame language applied inconsistently',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Moderation Template Drift Pattern',
        description: 'Moderation language that has drifted from action-based templates toward trait-based language over time',
        indicators: [
          'Trait labels in moderation notes ("toxic", "spammer", "troll")',
          'Escalating abstraction in repeat-offender language',
          'Inconsistent formality levels across violation types',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'medium',
      },
      {
        name: 'Review System Bias Pattern',
        description: 'Review or rating systems where prompt structure encourages different abstraction levels for different evaluation dimensions',
        indicators: [
          'Trait-based prompts for character ("Is this person trustworthy?")',
          'Action-based prompts for service ("Was the item shipped on time?")',
          'Asymmetric positive vs negative prompt structures',
        ],
        severity: ImpactLevel.MEDIUM,
        confidence: 'high',
      },
    ],

    checklistQuestions: [
      'Does the interface describe user actions or user traits?',
      'Are error messages phrased as user failures or system states?',
      'Do moderation notices reference specific actions or attribute character traits?',
      'Are review prompts structured to elicit behavioral descriptions or trait assessments?',
      'Is the same language template used for all user groups receiving the same type of notification?',
      'Do positive and negative feedback use the same level of language abstraction?',
      'Are automated messages consistent in tone across user segments or tiers?',
      'Have content templates been audited for abstraction-level consistency?',
      'Do support scripts reference concrete events rather than implying user characteristics?',
      'Are badge and label systems based on observable actions rather than inferred traits?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in linguistic intergroup bias (LIB).

Analyze the provided design for linguistic intergroup bias patterns. Identify:

1. **Abstraction Asymmetries**: Where positive behaviors are described abstractly for some groups and concretely for others (and vice versa for negative behaviors)
2. **Error Attribution Language**: Whether error messages blame users (trait-implying) or describe situations (action-based)
3. **Moderation Language**: Whether violation notices use trait labels or action descriptions
4. **Review/Feedback Prompts**: Whether prompts steer toward behavioral or dispositional descriptions
5. **Notification Consistency**: Whether message tone and abstraction varies across user segments

For each pattern found:
- Identify the abstraction level used (concrete action, state description, or abstract trait)
- Assess whether the level is consistent across user groups
- Determine if the pattern could reinforce stereotypes or create perceived unfairness
- Evaluate whether language encourages behavioral or trait-based user descriptions
- Suggest specific rewrites using consistent, action-based language

Consider:
- Are moderation notices describing actions or labeling users?
- Do error messages attribute blame to users or describe situations?
- Are review prompts structured to produce equitable descriptions?
- Does automated messaging maintain consistent tone across user segments?
- Would a user from any group perceive the language as fair?

Provide actionable recommendations for achieving consistent, action-based language across the interface.`,

    outputSchema: {
      type: 'object',
      properties: {
        abstractionPatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              location: { type: 'string' },
              currentLanguage: { type: 'string' },
              abstractionLevel: { type: 'string' },
              affectedGroups: { type: 'string' },
              fairnessAssessment: { type: 'string' },
              suggestedRewrite: { type: 'string' },
            },
            required: [
              'location',
              'currentLanguage',
              'abstractionLevel',
              'fairnessAssessment',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            abstractionConsistency: { type: 'number' },
            errorAttributionFairness: { type: 'number' },
            moderationLanguageScore: { type: 'number' },
            reviewPromptEquity: { type: 'number' },
          },
          required: [
            'abstractionConsistency',
            'errorAttributionFairness',
            'moderationLanguageScore',
            'reviewPromptEquity',
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
        'abstractionPatterns',
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
        title: 'Audit Existing Language',
        description:
          'Review all user-facing copy for abstraction-level consistency across user groups and contexts',
        example:
          'Catalog all error messages, moderation notices, notifications, and review prompts; classify each as trait-based or action-based',
        tips: [
          'Use a spreadsheet to track language patterns by user segment',
          'Look specifically for adjectives vs verbs in user descriptions',
          'Compare language used for the same event across different user groups',
        ],
      },
      {
        step: 2,
        title: 'Standardize on Action-Based Language',
        description:
          'Rewrite all user-describing copy to reference specific actions and events rather than implied traits',
        example:
          'Change "You are a spammer" to "This post was removed because it contained promotional links (Section 4.1)"',
        tips: [
          'Replace adjectives with verb phrases: "unreliable" becomes "delivery arrived after estimated date"',
          'Reference specific content, dates, and rule sections',
          'Use third-person for content ("this post") rather than second-person for user ("you are")',
        ],
      },
      {
        step: 3,
        title: 'Create Language Templates',
        description:
          'Build standardized templates for all recurring user communications to prevent drift',
        example:
          'Moderation template: "Your [content type] posted on [date] was [action] because it [specific violation]. See [rule reference]."',
        tips: [
          'Template variables should be content-focused, not user-focused',
          'Include example fills for each variable',
          'Review templates quarterly for drift',
        ],
      },
      {
        step: 4,
        title: 'Structure Review and Feedback Systems',
        description:
          'Design review prompts that elicit behavioral descriptions rather than trait assessments',
        example:
          'Replace "Rate the seller" with structured prompts: "How quickly did they ship?", "Was the item as described?", "How was their communication?"',
        tips: [
          'Use behavioral dimensions with concrete examples',
          'Provide placeholder text showing action-based responses',
          'Keep parallel structure for positive and negative prompts',
        ],
      },
      {
        step: 5,
        title: 'Test Across Groups',
        description:
          'Validate that language feels equally fair to users from different demographic and behavioral groups',
        example:
          'Show identical moderation notices to diverse user panels and measure perceived fairness ratings',
        tips: [
          'Include users from groups historically affected by LIB',
          'Measure perceived fairness, not just comprehension',
          'Compare emotional response across groups',
        ],
      },
    ],

    dos: [
      'Use concrete, action-based language when describing user behaviors',
      'Maintain consistent abstraction levels across all user groups and segments',
      'Reference specific content, dates, and rules in moderation notices',
      'Structure review prompts to elicit behavioral descriptions',
      'Audit language templates regularly for abstraction drift',
      'Use system-oriented error messages that describe situations, not user traits',
      'Apply identical notification templates regardless of user tier or demographics',
      'Provide behavioral examples in review placeholder text',
    ],

    donts: [
      'Don\'t use trait-based labels in moderation ("toxic user", "spammer")',
      'Don\'t vary error message blame attribution across user groups',
      'Don\'t prompt for character assessments in review systems',
      'Don\'t use different notification tones for different user tiers',
      'Don\'t allow moderation scripts to drift toward trait-based language',
      'Don\'t summarize positive feedback as traits while keeping negative feedback concrete',
      'Don\'t use abstract threat language ("suspicious activity") when concrete descriptions exist',
      'Don\'t assume that "professional" language is inherently neutral — audit it',
    ],

    bestPractices: [
      {
        title: 'Action-First Language',
        description:
          'Always describe what happened before (or instead of) describing who did it or what kind of person they are',
        rationale:
          'Action-based descriptions are perceived as fairer, are more informative, and resist group-based interpretation asymmetries',
        example:
          '"This comment was removed for containing a personal attack" instead of "You have been flagged as abusive"',
      },
      {
        title: 'Parallel Prompt Structure',
        description:
          'Use identical linguistic structure for positive and negative feedback prompts',
        rationale:
          'Parallel structure prevents the natural tendency to use traits for one valence and actions for the other',
        example:
          'Positive: "Describe what went well" / Negative: "Describe what could be improved" — both behavioral, both parallel',
      },
      {
        title: 'Template-Driven Communication',
        description:
          'Use fill-in-the-blank templates for all recurring user communications to prevent abstraction drift',
        rationale:
          'Templates enforce consistent abstraction levels and prevent unconscious bias from entering communications',
        example:
          '"Your [content type] on [date] was [action] because [specific rule]. You can [concrete next step]."',
      },
      {
        title: 'Quarterly Language Audits',
        description:
          'Regularly audit user-facing language for abstraction-level consistency across groups',
        rationale:
          'Language naturally drifts over time as new team members, edge cases, and contexts introduce variation',
        example:
          'Sample 100 moderation notices per quarter, classify abstraction level, compare across user demographics',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '3.1.5',
        guideline:
          'Reading Level — Use the clearest and most concrete language appropriate for the content',
        implementation:
          'Concrete, action-based language aligns with plain language requirements and is more accessible for users with cognitive disabilities',
      },
      {
        wcagLevel: 'AA',
        criterion: '3.3.1',
        guideline:
          'Error Identification — Clearly identify and describe errors in text',
        implementation:
          'Action-based error messages that describe the specific problem (not user traits) provide clearer error identification for all users',
      },
      {
        wcagLevel: 'AA',
        criterion: '3.3.3',
        guideline:
          'Error Suggestion — Provide specific suggestions for correcting errors',
        implementation:
          'Concrete, behavioral language naturally leads to actionable suggestions rather than vague trait-based feedback',
      },
    ],

    ethics: [
      {
        concern: 'Systematic Group Stereotyping',
        severity: 'critical',
        explanation:
          'Abstract trait language applied to out-groups reinforces and perpetuates negative stereotypes at scale',
        mitigation:
          'Enforce action-based language in all user-describing copy. Never apply trait labels derived from group membership. Audit for consistency.',
      },
      {
        concern: 'Unfair Moderation Perception',
        severity: 'critical',
        explanation:
          'Trait-based moderation language makes users from targeted groups feel personally attacked rather than informed about rule violations',
        mitigation:
          'Use standardized action-based moderation templates. Reference specific content and rules. Offer clear appeal mechanisms.',
      },
      {
        concern: 'Review System Discrimination',
        severity: 'high',
        explanation:
          'Open-ended review prompts allow linguistic intergroup bias to produce systematically different descriptions for sellers from different demographic groups',
        mitigation:
          'Structure reviews around behavioral dimensions. Use concrete prompts. Monitor for rating disparities across demographics.',
      },
      {
        concern: 'Tiered User Treatment',
        severity: 'high',
        explanation:
          'Different communication tones for premium vs free users can encode intergroup language biases that map onto socioeconomic groups',
        mitigation:
          'Use identical language templates across all user tiers. Vary only factual content (plan details), never tone or abstraction level.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'Language Use in Intergroup Contexts: The Linguistic Intergroup Bias',
        author: 'Maass, A., Salvi, D., Arcuri, L., & Semin, G. R.',
        year: 1989,
        doi: '10.1037/0022-3514.57.6.981',
        description:
          'The foundational paper introducing linguistic intergroup bias and demonstrating systematic abstraction asymmetries in descriptions of in-group vs out-group behaviors',
        type: 'foundational',
      },
      {
        title: 'The Linguistic Intergroup Bias as an Instrument of Social Discrimination',
        author: 'Wigboldus, D. H. J., Semin, G. R., & Spears, R.',
        year: 2000,
        doi: '10.1006/jesp.1999.1397',
        description:
          'Demonstrates how linguistic intergroup bias serves as a subtle but effective tool for transmitting stereotypes and expectations to others',
        type: 'advanced',
      },
      {
        title: 'The Linguistic Category Model, Its Bases, Applications and Range',
        author: 'Semin, G. R., & Fiedler, K.',
        year: 1991,
        doi: '10.1080/14792779143000006',
        description:
          'Describes the Linguistic Category Model (LCM) that provides the theoretical framework for understanding language abstraction levels',
        type: 'foundational',
      },
      {
        title: 'Linguistic Bias in Personnel Selection',
        author: 'Rubini, M., & Menegatti, M.',
        year: 2014,
        description:
          'Demonstrates how linguistic intergroup bias affects hiring and personnel decisions, with implications for HR platform design',
        type: 'case-study',
      },
    ],

    books: [
      {
        title: 'Stereotypes and Prejudice: Essential Readings',
        author: 'Stangor, C. (Ed.)',
        year: 2000,
        isbn: '9780863775895',
        description:
          'Comprehensive collection including key papers on linguistic intergroup bias and its role in stereotype maintenance',
        type: 'foundational',
      },
      {
        title: 'The Oxford Handbook of Language and Social Psychology',
        author: 'Holtgraves, T. M. (Ed.)',
        year: 2014,
        isbn: '9780199838639',
        description:
          'Covers the relationship between language, social cognition, and intergroup dynamics including LIB',
        type: 'advanced',
      },
    ],

    articles: [
      {
        title: 'How Language Shapes Prejudice Against Groups',
        author: 'Beukeboom, C. J., & Burgers, C.',
        url: 'https://doi.org/10.1177/1745691619885116',
        description:
          'Accessible overview of how language biases including LIB contribute to prejudice formation and maintenance',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'Language and Social Cognition',
        author: 'Gün Semin',
        url: 'https://www.youtube.com/results?search_query=gun+semin+linguistic+category+model',
        description:
          'Lectures by the co-developer of the Linguistic Category Model explaining how language abstraction transmits social information',
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
      'in-group-bias',
      'outgroup-homogeneity-bias',
      'stereotype-bias',
      'fundamental-attribution-error',
    ],

    conflicts: [
      'perspective-taking',
    ],

    confusedWith: [
      'in-group-bias',
      'fundamental-attribution-error',
      'implicit-bias',
    ],

    hierarchy: {
      parent: 'cognitive-bias',
      children: [
        'abstraction-asymmetry',
        'moderation-language-bias',
      ],
    },
  },
};
