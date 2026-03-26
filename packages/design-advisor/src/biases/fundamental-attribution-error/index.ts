/**
 * FUNDAMENTAL ATTRIBUTION ERROR
 *
 * We attribute others' actions to character but our own to circumstances
 */


import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const fundamentalAttributionError: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'fundamental-attribution-error',
    name: 'Fundamental Attribution Error',
    aliases: ['Correspondence Bias', 'Attribution Effect', 'Over-Attribution'],
    category: BiasCategory.ATTRIBUTION,
    relatedCategories: [
      BiasCategory.COGNITIVE,
      BiasCategory.SOCIAL,
      BiasCategory.PERCEPTION,
    ],
    tags: [
      'attribution',
      'error-messages',
      'empathy',
      'blame',
      'user-research',
      'customer-support',
      'forgiving-design',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple: 'We attribute others\' actions to character but our own to circumstances',

    detailed: `The Fundamental Attribution Error is the tendency to overemphasize personality-based or dispositional explanations for others' behavior while underestimating the influence of situational factors. When someone else makes a mistake, we assume it reflects who they are ("they're careless"), but when we make the same mistake, we point to circumstances ("the interface was confusing").

This asymmetry has profound implications for UX design. When designers commit the fundamental attribution error, they blame users for mistakes instead of examining the situational context the interface created. Error messages that say "Invalid input" implicitly blame the user's competence rather than acknowledging that the system failed to guide them properly.

In product design, this bias shapes how we write error messages, design support flows, interpret user research data, and build feedback systems. Recognizing it leads to more forgiving, empathetic interfaces that take responsibility for failures and help users recover gracefully.`,

    psychologyBasis: {
      discoveredBy: 'Lee Ross',
      year: 1977,
      theory: 'Attribution Theory',
      mechanism: `The brain defaults to dispositional explanations for others' behavior because:

1. **Actor-Observer Asymmetry**: When observing others, we focus on the person (the salient figure) rather than the situation (the background). When we're the actor, we're acutely aware of situational pressures.
2. **Cognitive Economy**: Dispositional attributions are simpler and faster than situational analysis. Saying "they're incompetent" requires less mental effort than mapping all the contextual factors.
3. **Just-World Belief**: We want to believe people get what they deserve. Attributing failures to character preserves our sense of a predictable, fair world.
4. **Perceptual Salience**: The person performing the action is visually salient; the situation is often invisible. We explain what we see, and we see the person, not the constraints.
5. **Cultural Reinforcement**: Western individualist cultures emphasize personal agency and responsibility, reinforcing dispositional thinking over situational awareness.

This mechanism is automatic — designers and developers unconsciously blame users for system-created problems, leading to punitive rather than supportive UX patterns.`,
    },

    realWorldExample: `When a driver cuts you off in traffic, your immediate reaction is "what a jerk" — attributing their behavior to character. But when you cut someone off, you think "I didn't see them" or "I'm late for an emergency" — attributing your identical behavior to circumstances. In reality, the other driver may also be rushing to an emergency or dealing with a blind spot. The fundamental attribution error causes us to extend empathy to ourselves but not to others performing the same actions.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `The Fundamental Attribution Error profoundly shapes how products treat users when things go wrong. It manifests in blame-oriented error messages, punitive UX patterns, and a failure to account for the situational context users operate in. Designers who overcome this bias can:

- Write error messages that take system responsibility rather than blaming users
- Design forgiving input handling that prevents errors before they happen
- Build customer support experiences that assume good intent
- Interpret user research without blaming participants for confusion
- Create recovery flows that help rather than shame users`,

    whenToUse: [
      {
        title: 'Error Message Design',
        scenario:
          'When communicating failures, errors, or validation issues to users',
        example:
          'Replace "Invalid email address" with "That doesn\'t look like an email address — did you mean user@example.com?"',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Customer Support UX',
        scenario: 'When designing help flows, support tickets, or FAQ experiences',
        example:
          'Open with "We\'re sorry you\'re having trouble" rather than "Please check that you followed the instructions correctly"',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'User Research Interpretation',
        scenario: 'When analyzing why users fail tasks or abandon flows',
        example:
          'Instead of "5 users couldn\'t find the button", frame as "Our layout didn\'t make the button discoverable for 5 users"',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Feedback and Rating Systems',
        scenario: 'When designing systems where users rate or review other people',
        example:
          'Prompt reviewers to consider situational factors: "Was the delivery affected by weather or traffic conditions?"',
        impact: ImpactLevel.MEDIUM,
      },
      {
        title: 'Forgiving Input Design',
        scenario: 'When building forms, search fields, or any text input',
        example:
          'Accept multiple phone number formats instead of requiring exact formatting — the system should adapt to the user, not the reverse',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Onboarding Recovery',
        scenario: 'When users struggle during initial setup or first-run experiences',
        example:
          'If a user skips steps or makes mistakes during onboarding, offer gentle guidance rather than blocking progress with error states',
        impact: ImpactLevel.MEDIUM,
      },
    ],

    whenToAvoid: [
      {
        title: 'Security Violations',
        reason:
          'Genuine security threats may require clear attribution of responsibility',
        consequence:
          'Being too forgiving with security violations could enable bad actors',
        alternative:
          'Distinguish between accidental errors (forgiving) and deliberate misuse (firm but fair)',
      },
      {
        title: 'Legal Compliance',
        reason:
          'Some regulatory contexts require clear user acknowledgment of responsibility',
        consequence:
          'Over-absorbing blame could create legal liability or compliance issues',
        alternative:
          'Use neutral, factual language for required disclosures while remaining empathetic in tone',
      },
      {
        title: 'Critical Safety Actions',
        reason:
          'Users performing safety-critical tasks need clear, direct feedback about errors',
        consequence:
          'Overly soft messaging could lead users to underestimate the severity of a mistake',
        alternative:
          'Be direct about what went wrong and its consequences, but frame it as the system helping the user, not blaming them',
      },
    ],

    commonMistakes: [
      {
        title: 'Blame-First Error Messages',
        description:
          'Writing error messages that implicitly or explicitly blame the user: "You entered an invalid value"',
        why: 'Designers unconsciously assume users are careless rather than examining how the interface failed to guide them',
        fix: 'Rewrite all errors from the system\'s perspective: "We couldn\'t process that value. Here\'s what we expect..."',
      },
      {
        title: 'Punitive UX Patterns',
        description:
          'Clearing form fields after validation errors, requiring users to start over, or locking accounts after few attempts',
        why: 'The assumption is that users "should have gotten it right" — a dispositional attribution that ignores unclear UI',
        fix: 'Preserve user input on errors, offer inline validation before submission, use progressive lockout with clear recovery paths',
      },
      {
        title: 'Blaming User Research Participants',
        description:
          'Interpreting usability test failures as user incompetence: "That participant just wasn\'t tech-savvy"',
        why: 'It\'s psychologically easier to attribute task failure to the participant than to accept the design is flawed',
        fix: 'Always ask "What about the design caused this?" before attributing failure to the user. Look for patterns across participants.',
      },
      {
        title: 'Assuming User Intent',
        description:
          'Treating unusual user behavior as malicious or negligent rather than exploring situational causes',
        why: 'Multiple rapid form submissions might be frustration-driven retries, not spam attempts',
        fix: 'Design for the charitable interpretation first. Handle edge cases gracefully before adding punitive measures.',
      },
      {
        title: 'Condescending Help Text',
        description:
          'Writing help copy that implies users should already know how to do something: "Simply enter your API key"',
        why: 'The word "simply" assumes the task is easy for everyone — a dispositional view that ignores varied technical contexts',
        fix: 'Write help text that guides without condescension. Remove words like "simply", "just", "obviously", "easily".',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.MEDIUM,
        description:
          'Layout determines how prominently errors and help content appear, affecting the blame dynamic',
        examples: [
          'Inline validation positioned near inputs feels like guidance; modal error dialogs feel like punishment',
          'Proximity of help text to inputs reduces errors before they happen',
          'Error messages displayed far from the relevant field feel like accusations rather than assistance',
          'Recovery paths placed prominently signal that mistakes are expected and acceptable',
        ],
      },
      typography: {
        level: ImpactLevel.HIGH,
        description:
          'Typography choices in error and help states signal blame vs support',
        examples: [
          'ALL CAPS error messages feel like shouting at the user',
          'Softer font weights in error states reduce perceived aggression',
          'Clear, readable help text signals the system is there to assist',
          'Bold accusatory labels ("WRONG!") vs informative labels ("Let\'s fix this")',
        ],
      },
      color: {
        level: ImpactLevel.HIGH,
        description:
          'Color communicates whether errors are punitive warnings or helpful guidance',
        examples: [
          'Aggressive red error states feel like blame; warm amber feels like guidance',
          'Using brand colors in error states maintains trust and reduces shame',
          'Green success states after error recovery reinforce positive outcome',
          'Neutral gray for informational messages avoids blame connotation',
        ],
      },
      interaction: {
        level: ImpactLevel.CRITICAL,
        description:
          'Interaction patterns determine whether the system punishes mistakes or helps users recover',
        examples: [
          'Clearing form data on error punishes users for the system\'s unclear guidance',
          'Inline validation that guides before submission prevents blame-worthy moments',
          'Undo functionality assumes good intent and allows easy recovery',
          'Auto-save protects users from losing work, assuming the system should handle persistence',
        ],
      },
      content: {
        level: ImpactLevel.CRITICAL,
        description:
          'Content tone is where the fundamental attribution error is most visible — every error message either blames or helps',
        examples: [
          '"Invalid input" blames the user; "We need a different format" takes system responsibility',
          '"Something went wrong on our end" vs "You broke something" — entirely different emotional impact',
          'Empty states that say "You haven\'t added anything yet" vs "Ready when you are — add your first item"',
          'Help text that teaches vs help text that scolds',
        ],
      },
      accessibility: {
        level: ImpactLevel.HIGH,
        description:
          'Users with disabilities are especially affected by attribution errors — interfaces often blame users for accessibility failures',
        examples: [
          'Error messages must be announced by screen readers in a non-punitive tone',
          'Form validation errors should describe what\'s needed, not what the user did wrong',
          'Keyboard-only users encountering focus traps are experiencing a system failure, not a user failure',
          'Ensure error recovery paths are fully accessible — don\'t punish users twice',
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
        title: 'System-Owned Error Messages',
        description:
          'Error messaging that takes responsibility and offers help rather than blaming the user',
        code: `<div class="error-state" role="alert">
  <div class="error-icon">
    <svg aria-hidden="true"><!-- friendly icon --></svg>
  </div>
  <h3>We couldn't save your changes</h3>
  <p>Our server had trouble processing your request.
     Your work is safe — we've saved a draft locally.</p>
  <div class="recovery-actions">
    <button class="primary">Try Again</button>
    <button class="secondary">Download Draft</button>
  </div>
  <details>
    <summary>Technical details</summary>
    <p>Error 503: Service temporarily unavailable</p>
  </details>
</div>`,
        explanation:
          'The message uses "we" language, takes system responsibility, reassures the user that their work is safe, and provides clear recovery actions. No blame is placed on the user.',
        principle:
          'System-owned language transforms error states from blame into assistance',
        metrics: {
          before: '23% of users abandoned the flow after "Error: Request failed"',
          after: '8% abandoned after empathetic error with recovery actions',
          improvement: '65% reduction in error-state abandonment',
        },
      },
      {
        title: 'Forgiving Form Validation',
        description:
          'Input handling that adapts to user behavior instead of demanding exact formats',
        code: `<div class="form-field">
  <label for="phone">Phone number</label>
  <input
    type="tel"
    id="phone"
    placeholder="(555) 123-4567"
    aria-describedby="phone-help"
  />
  <p id="phone-help" class="help-text">
    Any format works — we'll figure it out
  </p>
</div>

<!-- The system accepts all of these: -->
<!-- 5551234567 -->
<!-- (555) 123-4567 -->
<!-- 555-123-4567 -->
<!-- +1 555 123 4567 -->
<!-- Result: all normalized to +15551234567 -->`,
        explanation:
          'Instead of demanding a specific format and showing "Invalid phone number" when users deviate, the system accepts any reasonable format and normalizes it. The help text signals flexibility, not rigidity.',
        principle:
          'Forgiving input design assumes the system should adapt to users, not the reverse',
        metrics: {
          before: '18% error rate on phone field with strict formatting',
          after: '2% error rate with flexible input parsing',
          improvement: '89% reduction in phone number validation errors',
        },
      },
      {
        title: 'Empathetic Empty States',
        description:
          'Empty states that welcome action rather than highlighting what the user hasn\'t done',
        code: `<div class="empty-state">
  <img src="illustration-welcome.svg"
       alt="Illustration of an open notebook"
       class="empty-illustration" />
  <h3>Your dashboard is ready</h3>
  <p>This is where your projects will live.
     Start with one and we'll help you along the way.</p>
  <button class="primary">Create Your First Project</button>
  <p class="subtle">
    Not sure where to start?
    <a href="/templates">Browse templates</a>
  </p>
</div>`,
        explanation:
          'Compare this to "You have no projects" or "Nothing here yet" — which subtly blame the user for emptiness. This version frames the empty state as readiness and potential.',
        principle:
          'Empty states should frame absence as opportunity, not inadequacy',
      },
    ],

    bad: [
      {
        title: 'User-Blaming Error Messages',
        description:
          'Error messages that explicitly blame user competence or attention',
        code: `<!-- DON'T DO THIS -->
<div class="error-message">
  <span class="error-icon">❌</span>
  <p><strong>INVALID INPUT</strong></p>
  <p>You entered an incorrect email address.
     Please enter a valid email address.</p>
</div>

<!-- ALSO DON'T DO THIS -->
<div class="error-message">
  <p>Error: You failed to complete the required fields.</p>
</div>

<!-- AND DON'T DO THIS -->
<div class="error-message">
  <p>Wrong password. Please try again.</p>
</div>`,
        explanation:
          '"You entered an incorrect email" places blame on the user. "You failed to complete" uses failure language directed at the person. "Wrong password" is accusatory. All of these commit the fundamental attribution error by treating the problem as a user character flaw rather than a system guidance failure.',
        principle:
          'Never use "you" + negative verb in error messages — it attributes failure to the person',
      },
      {
        title: 'Punitive Form Behavior',
        description:
          'Clearing user input after errors, forcing users to start over',
        code: `<!-- DON'T DO THIS -->
<form onsubmit="if(!validate()) { this.reset(); showError(); }">
  <input name="name" placeholder="Full name" />
  <input name="email" placeholder="Email" />
  <input name="phone" placeholder="Phone (XXX-XXX-XXXX)" />
  <textarea name="message" placeholder="Your message"></textarea>

  <!-- After ONE validation error, all fields are cleared -->
  <!-- User loses ALL their input and must retype everything -->
  <!-- The implicit message: "You got it wrong, start over" -->

  <button type="submit">Submit</button>
</form>`,
        explanation:
          'Clearing all form data because of a single validation error is punitive. It treats the user\'s mistake as worthy of punishment rather than acknowledging the system\'s failure to validate inline or provide clear guidance.',
        principle:
          'Never punish users by destroying their work — preserve input and guide correction',
      },
      {
        title: 'Condescending Help Documentation',
        description:
          'Help content that implies tasks are trivially easy, blaming users for needing help',
        code: `<!-- DON'T DO THIS -->
<article class="help-article">
  <h2>Setting Up Your API Key</h2>
  <p>Simply navigate to Settings, then simply click on
     API Keys, and simply copy your key. It's that easy!</p>

  <div class="troubleshooting">
    <h3>Having trouble?</h3>
    <p>Make sure you're following the steps correctly.
       If you still can't figure it out, contact support.</p>
  </div>
</article>`,
        explanation:
          'Words like "simply", "easy", "just" imply that anyone struggling is deficient. "Make sure you\'re following the steps correctly" directly blames the user. "If you still can\'t figure it out" frames the user as the problem, not the documentation.',
        principle:
          'Help content should teach without condescension — remove words that trivialize difficulty',
      },
    ],

    realWorld: [
      {
        company: 'Apple',
        product: 'macOS Error Messages',
        url: 'https://developer.apple.com/design/human-interface-guidelines/managing-errors',
        description:
          'Apple\'s Human Interface Guidelines mandate system-owned error language. macOS errors say "The document could not be saved" rather than "You failed to save the document." Recovery options are always prominent.',
        effectiveness: 'very-effective',
        analysis:
          'Apple consistently avoids user-blaming language across their entire ecosystem. Error messages are framed as system states ("couldn\'t", "unable to") rather than user failures ("you didn\'t", "incorrect"). This builds trust and reduces frustration during error recovery.',
      },
      {
        company: 'Google',
        product: 'Google Search Suggestions',
        url: 'https://www.google.com/',
        description:
          'When users misspell a search query, Google says "Did you mean: [suggestion]?" and shows results for both the original and corrected query. It never says "You spelled this wrong."',
        effectiveness: 'very-effective',
        analysis:
          'Google\'s "Did you mean?" is a masterclass in avoiding attribution error. Instead of blaming the user for a typo, it frames the correction as a helpful suggestion. The user\'s original query is still respected, signaling that the system serves the user rather than judging them.',
      },
      {
        company: 'Slack',
        product: 'Error States and Bot Messages',
        url: 'https://slack.com/',
        description:
          'Slack uses friendly, conversational error messages with personality. Connection failures say "Trouble connecting — we\'re trying to reconnect" with a visible retry indicator. Bot errors are self-deprecating rather than user-blaming.',
        effectiveness: 'very-effective',
        analysis:
          'Slack\'s entire UX voice assumes good intent from users. Error states use "we" language and often include humor ("Something went wrong. Our servers had a hiccup."). This transforms frustrating moments into brand-building touchpoints.',
      },
      {
        company: 'GitHub',
        product: '404 Page',
        url: 'https://github.com/404',
        description:
          'GitHub\'s 404 page features a fun illustrated scene rather than a stern "Page Not Found" error. It gently suggests the user check the URL or use search, without implying they did something wrong.',
        effectiveness: 'effective',
        analysis:
          'By making 404 pages playful rather than accusatory, GitHub transforms a navigation failure into a positive brand moment. The page acknowledges that broken links happen without attributing blame to anyone — neither the user nor the system.',
      },
      {
        company: 'Stripe',
        product: 'API Error Messages',
        url: 'https://stripe.com/docs/error-handling',
        description:
          'Stripe\'s API returns errors with clear, actionable descriptions: "The card number is not a valid credit card number" includes a machine-readable code and a human-readable suggestion for resolution.',
        effectiveness: 'effective',
        analysis:
          'Stripe\'s developer-facing errors balance technical precision with empathetic framing. Rather than "Invalid card" (blame), they describe the specific issue and path forward. This reduces developer frustration and speeds up integration.',
      },
    ],

    abTests: [
      {
        title: 'Error Message Tone: Blaming vs Empathetic',
        hypothesis:
          'Empathetic, system-owned error messages will reduce form abandonment compared to user-blaming messages',
        controlVersion: {
          description:
            'Standard error messages: "Invalid email address", "You must enter a valid phone number", "Incorrect password"',
          metrics: {
            conversionRate: '52%',
            bounceRate: '31%',
            timeOnPage: '2:45',
          },
        },
        treatmentVersion: {
          description:
            'Empathetic error messages: "That doesn\'t look like an email — check for typos?", "We need a phone number to reach you — any format works", "That password didn\'t match — try again or reset it"',
          metrics: {
            conversionRate: '64%',
            bounceRate: '19%',
            timeOnPage: '2:10',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Empathetic error messages increased form completion by 23% and reduced bounce rate by 39%. Users spent less time on the page because they corrected errors faster — the non-blaming tone encouraged immediate action rather than frustrated re-reading.',
          learnings: [
            'System-owned language ("we need") outperformed user-blaming language ("you must")',
            'Offering suggestions alongside errors dramatically reduced repeated mistakes',
            'Users reported feeling "less stressed" in post-task surveys with empathetic messages',
            'The effect was strongest for first-time users who were less familiar with the form',
          ],
        },
      },
      {
        title: 'Form Recovery: Preserve Input vs Clear on Error',
        hypothesis:
          'Preserving user input after validation errors will increase completion rate',
        controlVersion: {
          description:
            'Multi-step form that clears the current step on validation error, requiring users to re-enter all fields',
          metrics: {
            conversionRate: '38%',
            averageAttempts: '2.7',
            supportTickets: '12 per 1000 users',
          },
        },
        treatmentVersion: {
          description:
            'Multi-step form that preserves all input on error, highlights only the problematic field, and offers inline correction guidance',
          metrics: {
            conversionRate: '71%',
            averageAttempts: '1.3',
            supportTickets: '3 per 1000 users',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Preserving input and providing inline guidance nearly doubled completion rates. Average attempts dropped from 2.7 to 1.3, and support tickets dropped by 75%. The punitive pattern of clearing data assumed user negligence; the forgiving pattern assumed system responsibility.',
          learnings: [
            'Clearing user input is one of the most punitive UX patterns — it always assumes user fault',
            'Inline validation prevented most errors before they could become form-level failures',
            'Support ticket reduction saved significant operational cost alongside UX improvement',
            'Users who experienced the forgiving version rated overall product quality higher in NPS surveys',
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
        name: 'Blame Language in Errors',
        description:
          'Error messages using "you", "your", "invalid", "wrong", "failed", or "incorrect" directed at the user',
        howToSpot:
          'Search error messages for second-person pronouns paired with negative verbs: "You entered", "Your input was", "You failed to"',
        severity: ImpactLevel.CRITICAL,
      },
      {
        name: 'Punitive Visual Treatment',
        description:
          'Aggressive red error states with large icons, bold text, or all-caps warnings that feel like punishment',
        howToSpot:
          'Look for error states that use larger, bolder, or more aggressive styling than necessary — do they inform or intimidate?',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Missing Contextual Help',
        description:
          'Input fields with no placeholder text, help text, or format guidance — expecting users to "just know"',
        howToSpot:
          'Check forms for bare input fields without labels, placeholders, or inline help. Look for fields that only explain expectations after an error occurs.',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Condescending Microcopy',
        description:
          'Help text or tooltips using words like "simply", "just", "easily", "obviously" that trivialize task difficulty',
        howToSpot:
          'Search for diminishing adverbs in help text, tooltips, and onboarding copy',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Input Destruction on Error',
        description:
          'Form fields that clear user input after validation failure, forcing re-entry',
        howToSpot:
          'Submit a form with intentional errors and check whether previously entered data is preserved or destroyed',
        severity: ImpactLevel.CRITICAL,
      },
    ],

    patterns: [
      {
        name: 'User-Blame Error Pattern',
        description: 'Error messaging that attributes failure to the user rather than the system',
        indicators: [
          '"You entered an invalid..." messages',
          '"Please enter a valid..." without explaining what valid means',
          '"Error: incorrect..." without recovery guidance',
          'Error messages that describe user action rather than system state',
        ],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Punitive Recovery Pattern',
        description: 'System responses to user errors that punish rather than assist',
        indicators: [
          'Clearing form data after validation errors',
          'Requiring account re-authentication after minor errors',
          'Locking out users after few failed attempts without warning',
          'Hiding the error details while showing only generic failure messages',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Missing Guidance Pattern',
        description: 'Expecting users to succeed without contextual help, then blaming them when they fail',
        indicators: [
          'Forms with no inline validation or format hints',
          'Complex workflows with no progressive disclosure or guidance',
          'Technical jargon in user-facing messages without explanation',
          'Settings pages with no descriptions or documentation links',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'medium',
      },
      {
        name: 'Assumed Competence Pattern',
        description: 'Interfaces designed for expert users that blame beginners for struggling',
        indicators: [
          'No onboarding or tutorial for complex features',
          'Dense, jargon-heavy interfaces with no progressive disclosure',
          '"Advanced" features exposed by default without context',
          'Documentation that assumes prior knowledge without introductions',
        ],
        severity: ImpactLevel.MEDIUM,
        confidence: 'medium',
      },
    ],

    checklistQuestions: [
      'Do any error messages use "you" paired with negative verbs (entered, failed, forgot)?',
      'Does the system preserve user input when validation errors occur?',
      'Are error messages written from the system\'s perspective ("We couldn\'t") or the user\'s ("You didn\'t")?',
      'Do form fields provide format guidance before users attempt input?',
      'Does help text use condescending language ("simply", "just", "obviously")?',
      'Are recovery paths from error states clear and easily accessible?',
      'Does the system accept flexible input formats, or does it demand exact formatting?',
      'When users fail tasks in testing, is the first instinct to blame the user or examine the design?',
      'Are empty states framed as opportunity ("Ready for your first project") or deficit ("You have no projects")?',
      'Do error states feel like helpful guidance or punitive correction?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in the fundamental attribution error and its impact on user interfaces.

Analyze the provided design for fundamental attribution error patterns. Identify:

1. **Blame Language**: Error messages, validation text, or microcopy that attributes failure to the user's character or competence rather than the situation or system
2. **Punitive Patterns**: Interactions that punish users for mistakes (clearing data, locking out, hiding information)
3. **Missing Context**: Areas where lack of guidance sets users up for failure, then blames them for it
4. **Tone and Voice**: Whether the overall UX voice assumes good intent or treats users as potential sources of error
5. **Recovery Design**: Whether error recovery is supportive (forgiving) or punitive (blaming)

For each pattern found:
- Identify the specific language or interaction that commits the attribution error
- Assess the emotional impact on users
- Rewrite the offending copy or interaction using system-owned, empathetic framing
- Determine whether the error could be prevented entirely with better guidance
- Evaluate accessibility of error states and recovery paths

Consider:
- Does the interface take responsibility for guiding users, or does it blame them when guidance is insufficient?
- Are error messages written from the system's perspective or directed accusingly at the user?
- Do recovery paths preserve user effort and assume good intent?
- Is help text empathetic and instructive, or condescending and trivializing?
- Would a user with less experience or technical knowledge feel blamed or supported?

Provide actionable rewrites for every blame-oriented pattern found.`,

    outputSchema: {
      type: 'object',
      properties: {
        attributionPatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              currentLanguage: { type: 'string' },
              blameTarget: { type: 'string' },
              suggestedRewrite: { type: 'string' },
              emotionalImpact: { type: 'string' },
              severity: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'currentLanguage',
              'blameTarget',
              'suggestedRewrite',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            blameScore: { type: 'number' },
            empathyScore: { type: 'number' },
            recoveryDesignScore: { type: 'number' },
            guidanceScore: { type: 'number' },
          },
          required: [
            'blameScore',
            'empathyScore',
            'recoveryDesignScore',
            'guidanceScore',
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
              rewriteExamples: { type: 'array', items: { type: 'string' } },
              expectedImpact: { type: 'string' },
            },
            required: ['priority', 'title', 'description'],
          },
        },
      },
      required: [
        'attributionPatterns',
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
        title: 'Audit All Error Messages',
        description:
          'Review every error message, validation string, and failure state for blame-oriented language',
        example:
          'Search codebase for "invalid", "incorrect", "wrong", "failed", "you must", "you need to" in user-facing strings',
        tips: [
          'Create a spreadsheet of every error message with columns for current text, blame assessment, and rewrite',
          'Involve UX writers, not just developers, in the audit',
          'Test error messages with real users to gauge emotional response',
        ],
      },
      {
        step: 2,
        title: 'Rewrite with System-Owned Language',
        description:
          'Replace user-blaming language with system-perspective language that takes responsibility',
        example:
          'Change "Invalid email address" to "We need an email address — check for typos?"',
        tips: [
          'Use "we" instead of "you" in error contexts',
          'Describe the system state, not the user action: "couldn\'t process" instead of "you entered incorrectly"',
          'Always include what the user should do next, not just what went wrong',
        ],
      },
      {
        step: 3,
        title: 'Design Forgiving Inputs',
        description:
          'Make form fields accept flexible input and normalize data server-side',
        example:
          'Accept phone numbers as "555-123-4567", "(555) 123-4567", "5551234567" — all normalize to the same value',
        tips: [
          'Parse and normalize rather than reject non-conforming input',
          'Provide format guidance before errors occur, not after',
          'Use inline validation that guides in real time',
        ],
      },
      {
        step: 4,
        title: 'Preserve User Effort',
        description:
          'Never destroy user input as a consequence of errors. Always preserve work.',
        example:
          'On form validation failure, highlight the problematic field but keep all other fields intact',
        tips: [
          'Auto-save form progress periodically',
          'Implement undo/redo for destructive actions',
          'Provide draft recovery for session timeouts',
        ],
      },
      {
        step: 5,
        title: 'Test for Emotional Impact',
        description:
          'Conduct user testing specifically focused on error states and recovery flows',
        example:
          'Ask users to rate how the error message made them feel: supported, neutral, or blamed',
        tips: [
          'Include error scenarios deliberately in usability tests',
          'Use sentiment analysis on support tickets to find blame patterns',
          'A/B test error message tone and measure completion rates',
        ],
      },
    ],

    dos: [
      'Use system-owned language in errors: "We couldn\'t process that" not "You entered invalid data"',
      'Preserve all user input when validation errors occur',
      'Provide format guidance before users attempt input, not just after errors',
      'Design flexible input parsing that adapts to user behavior',
      'Include clear recovery actions with every error message',
      'Frame empty states as opportunity, not deficit',
      'Write help text that teaches without condescension',
      'Assume good intent from users in all interaction design',
      'Test error flows with real users and measure emotional response',
      'Use inline validation to prevent errors before form submission',
    ],

    donts: [
      'Don\'t use "you" + negative verb in error messages ("You entered", "You failed")',
      'Don\'t clear form data as punishment for validation errors',
      'Don\'t use condescending words: "simply", "just", "obviously", "easily"',
      'Don\'t require exact input formatting when flexible parsing is possible',
      'Don\'t lock users out without clear explanation and recovery path',
      'Don\'t write error messages that describe user incompetence',
      'Don\'t design empty states that highlight user inaction',
      'Don\'t assume user research task failures are participant problems',
      'Don\'t use ALL CAPS or aggressive styling in error messages',
      'Don\'t hide error details — users deserve to understand what happened',
    ],

    bestPractices: [
      {
        title: 'The "We" Test',
        description:
          'Rewrite every error message starting with "We" — if it sounds absurd, the original was blaming the user',
        rationale:
          'System-owned language forces you to take design responsibility for user errors',
        example:
          '"Invalid input" becomes "We couldn\'t understand that input" — revealing the system\'s responsibility to parse',
      },
      {
        title: 'Error Prevention Over Error Handling',
        description:
          'Invest more in preventing errors through clear guidance than in handling errors after they occur',
        rationale:
          'The best error message is no error message. If users frequently trigger an error, the design is at fault.',
        example:
          'Add inline format hints, real-time validation, and smart defaults to prevent errors before they happen',
      },
      {
        title: 'Charitable Interpretation Default',
        description:
          'Design for the most charitable interpretation of user behavior',
        rationale:
          'Multiple rapid submissions are likely frustration retries, not spam. Unusual input is likely a formatting difference, not incompetence.',
        example:
          'Rate-limit with a friendly message ("Still working on it — give us a moment") rather than blocking with "Too many requests"',
      },
      {
        title: 'Recovery Path Prominence',
        description:
          'Make error recovery paths more prominent than error descriptions',
        rationale:
          'Users need to know what to do next, not be reminded of what went wrong',
        example:
          'Error dialogs should have large, clear action buttons and minimal blame-oriented description',
      },
      {
        title: 'Tone Consistency Across States',
        description:
          'Maintain the same empathetic, supportive tone in error states as in success states',
        rationale:
          'A product that\'s friendly during success but hostile during failure destroys trust at the most critical moment',
        example:
          'If your success state says "Great job!", your error state should say "Let\'s fix this together" — not "Error: invalid input"',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '3.3.1',
        guideline:
          'Error Identification - Errors must be identified and described to the user in text',
        implementation:
          'Use aria-live regions to announce errors in non-punitive language. Describe what is needed, not what the user did wrong. "Email field needs a valid address" not "You entered an invalid email".',
      },
      {
        wcagLevel: 'AA',
        criterion: '3.3.3',
        guideline:
          'Error Suggestion - When an error is detected, provide suggestions for correction',
        implementation:
          'Always pair error identification with specific, actionable suggestions. "Did you mean user@gmail.com?" is better than "Invalid email format".',
      },
      {
        wcagLevel: 'AA',
        criterion: '3.3.4',
        guideline:
          'Error Prevention - For legal, financial, or data submission, allow review, correction, or reversal',
        implementation:
          'Provide confirmation steps, undo capabilities, and draft saving. Never make errors irreversible. Frame confirmation as "Let\'s double-check" not "Are you sure you didn\'t make a mistake?"',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.4.1',
        guideline:
          'Use of Color - Don\'t rely on color alone to convey error states',
        implementation:
          'Combine color with icons, text labels, and ARIA attributes. Ensure error styling is visible in high contrast mode and meaningful to screen reader users.',
      },
    ],

    ethics: [
      {
        concern: 'User Blame and Shame',
        severity: 'critical',
        explanation:
          'Error messages that blame users for system failures cause frustration, shame, and abandonment — especially harmful for users with less technical experience or cognitive disabilities',
        mitigation:
          'Audit all user-facing error text for blame language. Rewrite with system-owned perspective. Test with diverse user groups including those with less technical literacy.',
      },
      {
        concern: 'Power Asymmetry',
        severity: 'high',
        explanation:
          'The system has all the power to define what constitutes an "error" and who is at fault. This asymmetry is easily abused to shift responsibility from poor design to user behavior.',
        mitigation:
          'Establish a culture where every user error is treated as a design opportunity. Track error rates as design quality metrics, not user competence metrics.',
      },
      {
        concern: 'Bias in User Research',
        severity: 'high',
        explanation:
          'Researchers who commit the fundamental attribution error dismiss usability failures as participant problems rather than design problems, perpetuating bad design',
        mitigation:
          'Train research teams to default to design-attributing interpretations. Require pattern analysis across participants before attributing failure to individual factors.',
      },
      {
        concern: 'Disproportionate Impact on Marginalized Users',
        severity: 'critical',
        explanation:
          'Users with disabilities, lower technical literacy, or non-native language speakers bear the highest cost of blame-oriented design — they encounter more errors and feel more shamed by accusatory messages',
        mitigation:
          'Test error states and recovery flows specifically with underrepresented user groups. Ensure empathetic language is clear, translatable, and jargon-free.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'The Intuitive Psychologist and His Shortcomings: Distortions in the Attribution Process',
        author: 'Ross, L.',
        year: 1977,
        description:
          'The foundational paper that named the Fundamental Attribution Error and established it as a core concept in social psychology',
        type: 'foundational',
      },
      {
        title: 'The Attribution of Attitudes',
        author: 'Jones, E. E., & Harris, V. A.',
        year: 1967,
        doi: '10.1016/0022-1031(67)90034-0',
        description:
          'The classic experiment demonstrating that people attribute essay positions to the writer\'s true beliefs even when the position was assigned — one of the earliest demonstrations of correspondence bias',
        type: 'foundational',
      },
      {
        title: 'The Correspondence Bias',
        author: 'Gilbert, D. T., & Malone, P. S.',
        year: 1995,
        description:
          'Comprehensive review of the fundamental attribution error, its mechanisms, and boundary conditions',
        type: 'advanced',
      },
      {
        title: 'Culture and the Fundamental Attribution Error',
        author: 'Choi, I., Nisbett, R. E., & Norenzayan, A.',
        year: 1999,
        description:
          'Cross-cultural research showing how the fundamental attribution error varies across individualist and collectivist cultures',
        type: 'advanced',
      },
    ],

    books: [
      {
        title: 'The Person and the Situation',
        author: 'Ross, L., & Nisbett, R. E.',
        year: 1991,
        isbn: '9781905177448',
        description:
          'Comprehensive exploration of situational influences on behavior by the researcher who coined "fundamental attribution error"',
        type: 'foundational',
      },
      {
        title: 'Don\'t Make Me Think',
        author: 'Krug, Steve',
        year: 2014,
        isbn: '9780321965516',
        description:
          'Classic UX book whose core principle — that systems should adapt to users, not the reverse — directly counters the fundamental attribution error in design',
        type: 'practical',
      },
      {
        title: 'The Design of Everyday Things',
        author: 'Norman, Don',
        year: 2013,
        isbn: '9780465050659',
        description:
          'Norman\'s concept of "design affordances" and "system errors vs human errors" is fundamentally about overcoming the attribution error in product design',
        type: 'foundational',
      },
    ],

    articles: [
      {
        title: 'Error Messages: UX Writing Guidelines',
        author: 'Nielsen Norman Group',
        url: 'https://www.nngroup.com/articles/error-message-guidelines/',
        description:
          'Practical guidelines for writing non-blaming, helpful error messages in interfaces',
        type: 'practical',
      },
      {
        title: 'The Art of the Error Message',
        author: 'Marina Posniak, UX Collective',
        url: 'https://uxdesign.cc/the-art-of-the-error-message-9f878e3a660b',
        description:
          'Guide to empathetic error message writing that avoids the fundamental attribution error',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'The Fundamental Attribution Error',
        author: 'Khan Academy',
        url: 'https://www.khanacademy.org/test-prep/mcat/social-sciences-practice/social-sciences-practice-tut/e/fundamental-attribution-error',
        description:
          'Clear explanation of the fundamental attribution error with examples from everyday life',
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
      'actor-observer-bias',
      'self-serving-bias',
      'empathy-gap',
      'curse-of-knowledge',
    ],

    conflicts: [
      'just-world-hypothesis',
    ],

    confusedWith: [
      'actor-observer-bias',
      'self-serving-bias',
      'ultimate-attribution-error',
    ],

    hierarchy: {
      parent: 'attribution-bias',
      children: [
        'correspondence-bias',
        'actor-observer-asymmetry',
      ],
    },
  },
};
