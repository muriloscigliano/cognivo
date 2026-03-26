/**
 * HORN EFFECT
 *
 * One negative trait influences our overall perception negatively
 */


import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const hornEffect: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'horn-effect',
    name: 'Horn Effect',
    aliases: ['Reverse Halo Effect', 'Devil Effect', 'Negative Halo'],
    category: BiasCategory.SOCIAL,
    relatedCategories: [
      BiasCategory.DECISION_MAKING,
      BiasCategory.PERCEPTION,
      BiasCategory.MEMORY,
    ],
    tags: [
      'first-impression',
      'judgment',
      'perception',
      'negativity-bias',
      'trust',
      'onboarding',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple: 'One negative trait influences our overall perception negatively',

    detailed: `The horn effect is the cognitive bias where a single negative trait, experience, or attribute causes a person to view everything else about a product, person, or brand more negatively. It is the reverse of the halo effect: where one positive trait elevates overall perception, one negative trait drags it down.

In product design, the horn effect means that a single bad experience — a slow page load, a confusing signup form, a visible error, or a poorly designed landing page — can poison the user's perception of the entire product. Users who encounter friction early on will judge subsequent features, content, and reliability more harshly, even if those areas are objectively excellent.

The horn effect is particularly dangerous because negative impressions are stronger and more persistent than positive ones. Recovering from a horn effect is significantly harder than building from a halo effect, making first-touch quality and error prevention critical design priorities.`,

    psychologyBasis: {
      discoveredBy: 'Edward Thorndike',
      year: 1920,
      theory: 'Implicit Personality Theory / Global Evaluation Transfer',
      mechanism: `The brain forms a global evaluative impression from a single observed trait and applies it across all dimensions. This happens because:

1. **Global Evaluation Transfer**: One negative observation creates a negative "halo" that colors all subsequent judgments about unrelated attributes
2. **Negativity Bias Amplification**: Negative traits are weighted more heavily than positive ones in impression formation — a single flaw feels more diagnostic than multiple strengths
3. **Confirmation Bias Cascade**: Once the negative impression is formed, the brain selectively attends to information that confirms the negative view and discounts contradictory positive evidence
4. **Cognitive Consistency**: People strive for coherent mental models — if one trait is bad, the brain assumes other traits are also bad to maintain a consistent narrative
5. **Affect Heuristic**: The negative emotional response triggered by the initial bad trait becomes a shortcut for evaluating everything else

The mechanism is automatic and resistant to correction — even after the initial negative trait is addressed, the overall negative impression persists.`,
    },

    realWorldExample: `In Thorndike's original 1920 study of military officers, soldiers who were rated poorly on one trait (e.g., physical appearance) were also rated poorly on completely unrelated traits (e.g., intelligence, leadership, loyalty). A soldier perceived as physically unfit was judged as less intelligent and less reliable, despite no logical connection. Nisbett and Wilson (1977) later demonstrated this with a lecturer experiment: when an instructor behaved coldly, students rated his accent, mannerisms, and even his physical appearance as irritating — the same traits rated as charming when he was warm.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `The horn effect means a single negative touchpoint can contaminate the user's perception of your entire product. Designers must understand that:

- A slow initial load makes users perceive the product as unreliable, even if it's fast afterwards
- A confusing signup form makes users assume the whole product is poorly designed
- A single visible error or crash poisons trust in all features, including unrelated ones
- Poor visual design on one page makes users doubt the quality of engineering and security
- One bad customer service interaction overrides dozens of positive product experiences`,

    whenToUse: [
      {
        title: 'First-Touch Quality Assurance',
        scenario:
          'When designing onboarding, landing pages, or first-run experiences',
        example:
          'Invest disproportionate effort in the first 30 seconds of user experience — fast load, clear value proposition, polished visuals — because this sets the global impression',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Error Recovery Design',
        scenario: 'When designing error states, 404 pages, and failure recovery flows',
        example:
          'Design error pages that rebuild trust: friendly 404 pages with helpful navigation, error messages that offer solutions, and graceful degradation that shows competence even in failure',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Competitive Differentiation',
        scenario: 'When users are comparing your product to competitors after a bad experience elsewhere',
        example:
          'Highlight reliability, uptime, and polish in areas where competitors fail — users experiencing horn effect with a competitor are primed to notice your strengths in those exact areas',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Trust Repair After Incidents',
        scenario: 'When recovering from outages, data breaches, or public failures',
        example:
          'Proactively address the incident with transparent communication, visible improvements, and over-deliver on reliability to counteract the horn effect spreading to unrelated product areas',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Review and Rating Strategy',
        scenario: 'When displaying user reviews or ratings where negative reviews exist',
        example:
          'Show how negative feedback was addressed, display response rates, and surface the most helpful reviews (not just the most negative) to prevent a single bad review from triggering horn effect',
        impact: ImpactLevel.MEDIUM,
      },
    ],

    whenToAvoid: [
      {
        title: 'Legitimate Criticism Suppression',
        reason:
          'Using horn effect awareness to hide or minimize valid negative feedback',
        consequence:
          'Users lose trust if they discover suppressed reviews or hidden issues, making the horn effect worse',
        alternative:
          'Address criticism transparently and show how you responded to and resolved issues',
      },
      {
        title: 'Competitor Smearing',
        reason:
          'Deliberately triggering horn effect against competitors by highlighting their one flaw',
        consequence:
          'Users may perceive your brand as untrustworthy or petty, triggering horn effect against you instead',
        alternative:
          'Focus on your own strengths rather than competitor weaknesses',
      },
      {
        title: 'Over-Polishing at Expense of Substance',
        reason:
          'Investing all effort in surface appearance to avoid horn effect while neglecting core functionality',
        consequence:
          'Beautiful but broken product triggers an even stronger horn effect — "looks good but doesn\'t work"',
        alternative:
          'Balance visual polish with functional reliability; prioritize core experience quality',
      },
      {
        title: 'Ignoring Real Problems',
        reason:
          'Dismissing user complaints as "just the horn effect" instead of fixing real issues',
        consequence:
          'Real problems compound and the horn effect becomes justified reality',
        alternative:
          'Investigate every negative perception — distinguish horn effect distortion from legitimate issues',
      },
    ],

    commonMistakes: [
      {
        title: 'Neglecting First Load Performance',
        description:
          'Prioritizing features over initial load speed, causing the first impression to be "this is slow"',
        why: 'A slow first load triggers horn effect that makes all subsequent interactions feel sluggish, even if they are fast',
        fix: 'Prioritize perceived performance: show skeleton screens, load critical content first, target sub-2-second initial render',
      },
      {
        title: 'Ugly Error States',
        description:
          'Leaving default browser error pages, raw stack traces, or unstyled error messages',
        why: 'Error states are the moments when horn effect is most likely to trigger — a crude error page signals incompetence across the board',
        fix: 'Design every error state deliberately: helpful messaging, branded visuals, clear recovery paths',
      },
      {
        title: 'Ignoring the Weakest Touchpoint',
        description:
          'Having 95% polished experience but one rough edge (e.g., bad email templates, clunky settings page)',
        why: 'Users encounter the weak link and it colors their entire perception — "if they can\'t get the settings page right, what else is broken?"',
        fix: 'Audit every touchpoint for minimum quality threshold; no page or state should be "good enough"',
      },
      {
        title: 'Poor Onboarding Creating Lasting Damage',
        description:
          'Complex, confusing, or friction-heavy onboarding that turns off users before they see the product\'s value',
        why: 'Onboarding is the highest-stakes horn effect trigger — users who struggle to get started will perceive the entire product as difficult',
        fix: 'Simplify onboarding ruthlessly: progressive disclosure, sensible defaults, quick time-to-value',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.HIGH,
        description:
          'Layout problems in the first screen create lasting negative impressions of overall product quality',
        examples: [
          'Cluttered above-the-fold layout makes users assume the whole product is chaotic',
          'Broken layouts or overflow on first visit trigger distrust of engineering quality',
          'Poor responsive design on mobile makes desktop version seem untrustworthy too',
          'Misaligned elements signal lack of attention to detail across all features',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Typography problems signal amateur quality and erode credibility',
        examples: [
          'Font loading failures (FOUT/FOIT) make product feel unpolished',
          'Poor hierarchy or wall-of-text makes content seem poorly organized everywhere',
          'Inconsistent typography signals lack of design discipline',
          'Hard-to-read text creates perception of carelessness',
        ],
      },
      color: {
        level: ImpactLevel.HIGH,
        description:
          'Color mistakes trigger strong negative aesthetic reactions that spread to non-visual attributes',
        examples: [
          'Clashing or garish colors make product seem amateurish and untrustworthy',
          'Poor contrast creates accessibility issues that signal "they don\'t care about users"',
          'Inconsistent color usage makes product feel fragmented',
          'Overly aggressive red/warning colors create anxiety that persists across the experience',
        ],
      },
      interaction: {
        level: ImpactLevel.CRITICAL,
        description:
          'Failed interactions are the strongest horn effect triggers — broken functionality poisons everything',
        examples: [
          'Failed form submissions make users distrust all data handling',
          'Laggy animations or transitions make the entire product feel slow',
          'Broken buttons or dead links signal that other features may also be broken',
          'Unresponsive UI during loading makes users question product reliability',
        ],
      },
      content: {
        level: ImpactLevel.HIGH,
        description:
          'Content quality issues spread to perceptions of product quality and company credibility',
        examples: [
          'Typos or grammatical errors make users question overall attention to detail',
          'Outdated content suggests the product is abandoned or neglected',
          'Generic placeholder text signals laziness in all aspects of the product',
          'Confusing or jargon-heavy copy makes users assume the product is not user-friendly',
        ],
      },
      accessibility: {
        level: ImpactLevel.HIGH,
        description:
          'Accessibility failures create horn effect for disabled users, making them feel excluded from the entire product',
        examples: [
          'Missing alt text signals the product was built without considering screen reader users',
          'Keyboard traps make users assume nothing else will work for them either',
          'Poor ARIA labels create confusion that extends to overall product perception',
          'Missing focus indicators signal disregard for accessibility throughout the product',
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
        title: 'Skeleton Loading for Fast Perceived Performance',
        description:
          'Showing content structure immediately while data loads, preventing "slow" first impression',
        code: `<div class="dashboard">
  <div class="metric-card">
    <div class="skeleton-line" style="width: 60%"></div>
    <div class="skeleton-number"></div>
  </div>
  <div class="metric-card">
    <div class="skeleton-line" style="width: 40%"></div>
    <div class="skeleton-number"></div>
  </div>
  <!-- Real content replaces skeleton within 200ms -->
</div>

<style>
.skeleton-line {
  height: 14px;
  background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 4px;
}
@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
</style>`,
        explanation:
          'By showing the page structure instantly, users perceive the app as fast and responsive even before data loads. This prevents the horn effect trigger of "this product is slow" from ever forming.',
        principle:
          'Perceived performance matters more than actual performance for first impressions',
        metrics: {
          before: '38% of users bounced during 3-second blank loading screen',
          after: '12% bounce rate with skeleton loading (same actual load time)',
          improvement: '68% reduction in bounce rate by preventing negative first impression',
        },
      },
      {
        title: 'Branded 404 Page with Helpful Recovery',
        description:
          'Professional error page that rebuilds trust instead of destroying it',
        code: `<div class="error-page">
  <div class="error-illustration">
    <!-- Friendly, on-brand illustration -->
    <img src="/images/404-illustration.svg" alt="Page not found illustration">
  </div>
  <h1>We can't find that page</h1>
  <p>The page you're looking for may have moved or no longer exists.
  Here's how we can help:</p>

  <div class="recovery-actions">
    <a href="/" class="primary-action">Go to Homepage</a>
    <a href="/search" class="secondary-action">Search Our Site</a>
  </div>

  <div class="popular-pages">
    <h3>Popular Pages</h3>
    <ul>
      <li><a href="/docs">Documentation</a></li>
      <li><a href="/pricing">Pricing</a></li>
      <li><a href="/support">Support</a></li>
    </ul>
  </div>
</div>`,
        explanation:
          'A polished 404 page demonstrates competence even in failure. Instead of triggering "this site is broken," users think "they handle problems gracefully." The helpful recovery options rebuild trust immediately.',
        principle:
          'Error states are opportunities to demonstrate quality and prevent horn effect',
      },
      {
        title: 'Graceful Degradation During Outage',
        description:
          'Maintaining partial functionality and transparent communication during service issues',
        code: `<div class="status-banner" role="alert">
  <div class="status-icon warning"></div>
  <div class="status-content">
    <strong>Some features are temporarily limited</strong>
    <p>Our analytics engine is being updated. You can still access
    your dashboard, send messages, and manage your team.
    <a href="/status">View live status</a></p>
  </div>
  <span class="eta">Expected resolution: ~15 minutes</span>
</div>

<!-- Dashboard still loads with cached data -->
<div class="dashboard" data-state="partial">
  <div class="widget available">
    <h3>Team Activity</h3>
    <!-- Real-time data still working -->
  </div>
  <div class="widget degraded">
    <h3>Analytics</h3>
    <p class="degraded-notice">Showing data from 1 hour ago</p>
    <!-- Cached data displayed instead of empty state -->
  </div>
</div>`,
        explanation:
          'Instead of showing a full error page that triggers "the whole product is down," this approach shows what still works, provides an ETA, and displays cached data. Users perceive a minor hiccup rather than a systemic failure.',
        principle:
          'Partial functionality with transparency prevents horn effect from spreading to the entire product',
      },
    ],

    bad: [
      {
        title: 'Slow Loading With No Feedback',
        description:
          'Blank white screen for 4+ seconds while the app loads',
        code: `<!-- DON'T DO THIS -->
<html>
  <body>
    <!-- Nothing visible for 4 seconds while JS bundle loads -->
    <div id="app"></div>
    <script src="/bundle.js"></script> <!-- 2.5MB uncompressed -->
  </body>
</html>

<!-- User sees: blank white page for 4 seconds -->
<!-- User thinks: "This product is slow and poorly built" -->
<!-- Horn effect: "If they can't even load a page fast,
     how can I trust them with my data?" -->`,
        explanation:
          'A blank loading screen is the most common horn effect trigger in web products. Users who wait more than 3 seconds form a negative impression that persists throughout the entire session. They perceive subsequent features as slower and less reliable, even if they are objectively fast.',
        principle:
          'The first seconds define perception of the entire product — never show a blank screen',
      },
      {
        title: 'Ugly Signup Form That Signals Amateur Quality',
        description:
          'Poorly designed registration form with default browser styling',
        code: `<!-- DON'T DO THIS -->
<form action="/register" style="margin: 20px;">
  <h2>Sign Up</h2>
  <label>Email:</label>
  <input type="text" name="email"><br>
  <label>Password:</label>
  <input type="password" name="pass"><br>
  <label>Confirm Password:</label>
  <input type="password" name="pass2"><br>
  <input type="checkbox" name="terms"> I agree to Terms<br><br>
  <input type="submit" value="Submit">
</form>

<!-- User thinks: "If this is how they build their signup,
     imagine how bad the actual product is" -->`,
        explanation:
          'The signup form is often the first interactive experience a user has with the product. An unstyled, generic form triggers immediate horn effect: if the team cannot invest in a polished entry point, users assume the core product is equally neglected. This impression persists even if the product behind the form is excellent.',
        principle:
          'Signup and onboarding are the highest-stakes moments for horn effect — never leave them unstyled',
      },
      {
        title: 'Raw Error Messages Exposed to Users',
        description:
          'Showing technical error details or stack traces to end users',
        code: `<!-- DON'T DO THIS -->
<div class="error" style="color: red; font-family: monospace;">
  Error: ECONNREFUSED 127.0.0.1:5432
  at TCPConnectWrap.afterConnect [as oncomplete]
  (node:net:1187:16)

  PostgreSQL connection failed.
  Check your DATABASE_URL environment variable.

  Stack trace:
  at Pool.connect (/app/node_modules/pg/lib/pool.js:35:12)
  at /app/src/routes/api/users.ts:45:18
</div>`,
        explanation:
          'Exposing raw technical errors is one of the most damaging horn effect triggers. Users see stack traces and think: "This is broken, insecure, and amateurish." The negative impression spreads to security ("are they leaking my data too?"), reliability ("what else is failing?"), and overall competence.',
        principle:
          'Technical errors exposed to users trigger the strongest horn effect — always catch and humanize errors',
      },
    ],

    realWorld: [
      {
        company: 'Apple App Store',
        product: 'App Store Reviews',
        description: 'A single prominent one-star review with a compelling negative story can tank an app\'s download rate, even when the app has thousands of five-star reviews. Apple\'s sorting algorithm and review display can amplify the horn effect when negative reviews are shown first.',
        effectiveness: 'somewhat-effective',
        analysis: 'The horn effect causes users to weigh a single vivid negative review more heavily than aggregate positive ratings. Apps with a highly visible negative review at the top see measurable download drops regardless of their overall 4.5+ rating. Apple\'s review system does little to mitigate this.',
      },
      {
        company: 'Google',
        product: 'PageSpeed Insights / Core Web Vitals',
        description: 'Google\'s research confirmed that slow page loads don\'t just hurt bounce rates — they make users perceive the brand as less trustworthy and less credible overall. A site that loads in 5+ seconds is judged as less secure, less professional, and lower quality, even if its content is excellent.',
        effectiveness: 'very-effective',
        analysis: 'Google uses this horn effect understanding to justify Core Web Vitals as a ranking signal. Their data shows that performance perception spreads beyond the loading experience to affect trust, conversion, and brand perception globally.',
      },
      {
        company: 'Various',
        product: 'Job Interview First Impressions',
        description: 'Research by Barrick, Swider, and Stewart (2010) found that interviewers who formed a negative first impression in the first 10 seconds rated candidates significantly lower on competence, intelligence, and likability throughout the rest of the interview — regardless of actual performance.',
        effectiveness: 'effective',
        analysis: 'This research demonstrates the horn effect in its purest form. It directly parallels product design: the first 10 seconds of user interaction set a global impression that biases all subsequent evaluation. Products that fumble the opening moments fight an uphill battle for the rest of the user journey.',
      },
      {
        company: 'United Airlines',
        product: 'Brand Perception After "United Breaks Guitars"',
        description: 'After musician Dave Carroll posted a viral video about United damaging his guitar and refusing to compensate, United\'s stock dropped $180 million. The single incident triggered a massive horn effect: customers began rating United lower on unrelated attributes like food quality, seat comfort, and punctuality.',
        effectiveness: 'somewhat-effective',
        analysis: 'A textbook horn effect case: one highly visible negative event (guitar handling) spread to global brand perception across all dimensions. United\'s failure to respond quickly amplified the damage. This shows how a single failure can contaminate perception of entirely unrelated product attributes when recovery mechanisms are absent.',
      },
    ],

    abTests: [
      {
        title: 'First Load Experience: Blank vs Skeleton Screen',
        hypothesis:
          'Skeleton loading screens will improve overall product satisfaction ratings, not just loading perception',
        controlVersion: {
          description:
            'Standard blank loading screen with spinner for 3 seconds before content appears',
          metrics: {
            conversionRate: '62%',
            timeOnPage: '2:10',
            scrollDepth: '45%',
          },
        },
        treatmentVersion: {
          description:
            'Skeleton screen showing page structure immediately, content appearing progressively over same 3 seconds',
          metrics: {
            conversionRate: '78%',
            timeOnPage: '4:35',
            scrollDepth: '72%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Skeleton loading not only reduced bounce rate by 26% but increased overall session engagement by 119%. Post-session surveys showed users in the skeleton group rated the product as "faster," "more professional," and "more reliable" — even though actual load time was identical. The horn effect from blank loading poisoned the entire session.',
          learnings: [
            'Preventing a negative first impression improved perception of completely unrelated features',
            'Users who experienced blank loading rated the product 1.8 points lower on "trustworthiness"',
            'The horn effect from a 3-second blank screen persisted throughout the entire session',
            'Even users who stayed past the blank load explored fewer features (horn effect on perceived quality)',
          ],
        },
      },
      {
        title: '404 Page Quality: Default vs Branded',
        hypothesis:
          'A branded, helpful 404 page will prevent horn effect from spreading to overall product perception',
        controlVersion: {
          description:
            'Default browser/server 404 page with "Not Found" message',
          metrics: {
            conversionRate: '8%',
            clickThroughRate: '12%',
          },
        },
        treatmentVersion: {
          description:
            'Custom-designed 404 with brand illustration, helpful messaging, search bar, and popular page links',
          metrics: {
            conversionRate: '34%',
            clickThroughRate: '56%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'The branded 404 page recovered 325% more users who would have otherwise bounced. More importantly, users who hit the branded 404 and continued browsing gave the product the same satisfaction scores as users who never encountered an error — the horn effect was completely neutralized.',
          learnings: [
            'Default error pages trigger severe horn effect that persists across the session',
            'Well-designed error recovery can fully neutralize the horn effect',
            'Users who recovered via branded 404 actually rated "customer care" higher than users who never hit an error',
            'Error states are the highest-ROI design investment for preventing horn effect',
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
        name: 'Slow or Blank Initial Load',
        description:
          'First page load shows blank screen, spinner, or no content for more than 1-2 seconds',
        howToSpot:
          'Time the first meaningful paint; check if skeleton screens or progressive loading are used',
        severity: ImpactLevel.CRITICAL,
      },
      {
        name: 'Unstyled Error States',
        description:
          'Error messages, 404 pages, or failure states using default browser styling or raw technical messages',
        howToSpot:
          'Trigger common errors (bad URL, failed form, network disconnect) and check if all error states are designed',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Rough Onboarding Flow',
        description:
          'Signup, registration, or first-run experience that feels unpolished compared to the core product',
        howToSpot:
          'Walk through the entire first-time user experience and compare its polish level to the main product',
        severity: ImpactLevel.CRITICAL,
      },
      {
        name: 'Visible Quality Inconsistencies',
        description:
          'Some pages or features are highly polished while others are clearly neglected',
        howToSpot:
          'Browse all major sections and rate visual quality consistently; look for "forgotten" pages like settings, help, or account pages',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Prominent Negative Reviews',
        description:
          'Negative reviews, low ratings, or critical feedback displayed prominently without context or response',
        howToSpot:
          'Check review display order, whether negative reviews are addressed, and if response rates are visible',
        severity: ImpactLevel.MEDIUM,
      },
    ],

    patterns: [
      {
        name: 'First-Impression Failure Pattern',
        description: 'The initial user encounter with the product triggers a negative reaction that colors all subsequent interactions',
        indicators: ['Blank or slow loading screen', 'Complex registration with many required fields', 'Unclear value proposition on landing page', 'Broken or missing images on first view'],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Error Cascade Pattern',
        description: 'A single visible error causes users to lose trust in all product functionality',
        indicators: ['Unhandled JavaScript errors visible to users', 'Raw server error messages', 'Broken form validation with unhelpful messages', 'Dead links or 404 errors in main navigation'],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Quality Inconsistency Pattern',
        description: 'Uneven polish across the product creates negative impressions from the weakest touchpoint',
        indicators: ['Unstyled emails while app is polished', 'Default browser UI in settings while main app is custom', 'Placeholder text or images still present', 'Inconsistent design language between sections'],
        severity: ImpactLevel.HIGH,
        confidence: 'medium',
      },
      {
        name: 'Negative Social Proof Dominance Pattern',
        description: 'Negative reviews, complaints, or failures are more visible than positive signals',
        indicators: ['Negative reviews sorted to top', 'No responses to user complaints', 'Failed status indicators without resolution timestamps', 'Bug reports visible without fix confirmations'],
        severity: ImpactLevel.MEDIUM,
        confidence: 'medium',
      },
    ],

    checklistQuestions: [
      'What is the very first thing a new user sees? Is it polished?',
      'How long does the initial page load take, and what does the user see while waiting?',
      'Are all error states designed, branded, and helpful?',
      'Is the onboarding flow as polished as the core product?',
      'What is the weakest visual touchpoint in the product?',
      'How does the product handle network failures or slow connections?',
      'Are there any raw technical error messages that could reach users?',
      'How are negative reviews or feedback displayed?',
      'Is there quality parity across all pages, including settings, help, and account pages?',
      'What happens when a user encounters their first error or failure in the product?',
      'Does the design recover gracefully from negative moments?',
      'Are there any "forgotten" pages or states that could trigger horn effect?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in the horn effect (reverse halo effect).

Analyze the provided design for horn effect vulnerabilities. Identify:

1. **First-Impression Risks**: Loading states, onboarding flows, landing pages, signup forms
2. **Error State Quality**: How failures, errors, and edge cases are handled visually
3. **Quality Consistency**: Whether all touchpoints meet minimum polish standards
4. **Negative Perception Triggers**: Elements that could create a global negative impression
5. **Recovery Mechanisms**: Whether the design can recover from negative moments

For each vulnerability found:
- Identify the specific trigger and its location
- Assess severity (how strongly it could trigger horn effect)
- Determine which other product areas would be negatively affected
- Evaluate how persistent the negative impression would be
- Suggest specific design improvements to prevent or recover from the horn effect

Consider:
- What is the worst-case first impression a user could have?
- Are there any unpolished or neglected touchpoints?
- Do error states demonstrate competence or signal carelessness?
- Is there quality parity across all user-facing surfaces?
- How quickly can the design recover from a negative moment?

Provide actionable recommendations for preventing and recovering from horn effect.`,

    outputSchema: {
      type: 'object',
      properties: {
        hornEffectVulnerabilities: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              trigger: { type: 'string' },
              location: { type: 'string' },
              severity: { type: 'string' },
              affectedAreas: { type: 'array' },
              persistenceDuration: { type: 'string' },
              recommendation: { type: 'string' },
            },
            required: [
              'trigger',
              'location',
              'severity',
              'affectedAreas',
              'recommendation',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            firstImpressionQuality: { type: 'number' },
            errorStateQuality: { type: 'number' },
            qualityConsistency: { type: 'number' },
            recoveryCapability: { type: 'number' },
          },
          required: [
            'firstImpressionQuality',
            'errorStateQuality',
            'qualityConsistency',
            'recoveryCapability',
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
        'hornEffectVulnerabilities',
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
        title: 'Audit First-Touch Experiences',
        description:
          'Map every possible first interaction a user can have with your product and rate its quality',
        example:
          'List all entry points: landing page, signup form, email invite link, shared link, app store listing — rate each on a 1-10 polish scale',
        tips: [
          'Include non-obvious entry points like shared links, email templates, and error pages',
          'Test on slow connections and old devices — that is where horn effect is worst',
          'Have someone unfamiliar with the product do the first-run experience while you observe',
        ],
      },
      {
        step: 2,
        title: 'Eliminate Blank Loading States',
        description:
          'Replace every blank or spinner-only loading state with skeleton screens or progressive content',
        example:
          'Implement skeleton loading for the dashboard: show card outlines and shimmer animations within 200ms, replace with real data as it loads',
        tips: [
          'Target first meaningful paint under 1 second',
          'Show the most important content structure immediately',
          'Use optimistic UI patterns where appropriate',
        ],
      },
      {
        step: 3,
        title: 'Design Every Error State',
        description:
          'Create branded, helpful designs for every possible error condition',
        example:
          'Design custom pages for: 404, 500, network timeout, form validation errors, empty states, and permission denied',
        tips: [
          'Error states should feel like intentional design, not accidents',
          'Always provide a recovery path (go home, try again, contact support)',
          'Match the visual quality of error pages to your best pages',
        ],
      },
      {
        step: 4,
        title: 'Establish Minimum Quality Threshold',
        description:
          'Define and enforce a minimum visual quality standard that every page and state must meet',
        example:
          'Quality threshold checklist: branded colors, proper typography, responsive layout, designed empty states, no default browser UI',
        tips: [
          'Audit "forgotten" pages: settings, account, billing, help, email templates',
          'The weakest page defines perceived quality, not the strongest',
          'Include transactional emails and notifications in the quality audit',
        ],
      },
      {
        step: 5,
        title: 'Build Trust Recovery Mechanisms',
        description:
          'Design specific flows and communications for recovering from negative experiences',
        example:
          'After a failed action, show: "We noticed something went wrong. Here is what happened, what we did about it, and how to proceed."',
        tips: [
          'Acknowledge the problem honestly — do not pretend it did not happen',
          'Show what you are doing to prevent recurrence',
          'Over-deliver on the next interaction after a failure',
        ],
      },
    ],

    dos: [
      'Invest disproportionate effort in first-impression moments (loading, onboarding, signup)',
      'Design every error state with the same care as your hero section',
      'Use skeleton loading and progressive rendering to eliminate blank screens',
      'Maintain quality parity across all touchpoints, including settings and emails',
      'Respond to negative feedback publicly and show resolution',
      'Test the product on slow connections and old devices',
      'Build trust recovery flows that acknowledge and address failures',
      'Audit the weakest touchpoint regularly — that is what defines perception',
    ],

    donts: [
      'Don\'t neglect error states, empty states, or edge cases',
      'Don\'t allow raw technical errors to reach end users',
      'Don\'t have some pages polished and others using default browser styling',
      'Don\'t ignore slow load times — they poison the entire user experience',
      'Don\'t bury negative reviews without addressing them',
      'Don\'t assume users will forgive a bad first impression because the product is good',
      'Don\'t leave onboarding as an afterthought while polishing the main product',
      'Don\'t dismiss user complaints as "just a minor issue" — any visible flaw can trigger horn effect',
    ],

    bestPractices: [
      {
        title: 'The 3-Second Rule',
        description:
          'Show meaningful content within 3 seconds of any user action — blank screens beyond this trigger horn effect',
        rationale:
          'Research shows that 3 seconds is the threshold where users form a "slow" impression that persists throughout the session',
        example:
          'Use skeleton screens, server-side rendering, or cached content to ensure sub-3-second first paint on every page',
      },
      {
        title: 'Error States as Trust Builders',
        description:
          'Design error states that demonstrate competence and care, turning potential horn effect triggers into trust builders',
        rationale:
          'A well-handled error shows "they thought of everything" — a poorly handled error shows "they don\'t care"',
        example:
          'GitHub\'s 404 page and Slack\'s "Something went wrong" page both feel intentional and maintain brand trust',
      },
      {
        title: 'Weakest Link Audit',
        description:
          'Regularly identify and upgrade the lowest-quality touchpoint in your product, because that touchpoint defines overall perception',
        rationale:
          'Horn effect means users judge the whole product by its worst part, not its best part',
        example:
          'Monthly audit: screenshot every page and state, rank by visual quality, fix the bottom 10%',
      },
      {
        title: 'Progressive Onboarding',
        description:
          'Get users to a "wow moment" as quickly as possible before any friction can trigger horn effect',
        rationale:
          'If users experience value before encountering any issues, they are more likely to forgive later problems (halo effect protects against horn effect)',
        example:
          'Pre-populate sample data so users see a working dashboard immediately, then guide them to add their own data',
      },
      {
        title: 'Transparent Incident Communication',
        description:
          'When failures occur, communicate proactively, honestly, and with specific resolution timelines',
        rationale:
          'Silence during incidents amplifies horn effect — users fill the information vacuum with worst-case assumptions',
        example:
          'Status pages with real-time updates, email notifications with ETAs, and post-mortems that show what was learned',
      },
    ],

    accessibility: [{
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships - Error states must be semantically communicated, not just visual',
        implementation:
          'Use role="alert" for error messages, proper ARIA labels for error states, and ensure screen reader users get the same quality error recovery experience as sighted users',
      },
      {
        wcagLevel: 'AA',
        criterion: '3.3.1',
        guideline:
          'Error Identification - Errors must be clearly identified and described in text',
        implementation:
          'All error states must have clear text descriptions, not just color or icons. Screen reader users are especially vulnerable to horn effect from poorly communicated errors.',
      },
      {
        wcagLevel: 'AA',
        criterion: '3.3.3',
        guideline:
          'Error Suggestion - Provide suggestions for fixing errors when possible',
        implementation:
          'Every error message should include a suggested fix or recovery path. Unhelpful errors trigger stronger horn effect for users who depend on assistive technology.',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.1.1',
        guideline:
          'Keyboard - All error recovery flows must be keyboard accessible',
        implementation:
          'Ensure error dismissal, retry actions, and recovery navigation all work with keyboard. A keyboard trap during an error state creates a compounded horn effect.',
      },
    ],

    ethics: [
      {
        concern: 'Exploiting Horn Effect Against Competitors',
        severity: 'high',
        explanation:
          'Deliberately highlighting competitor flaws to trigger horn effect and steal users',
        mitigation:
          'Focus marketing on your own strengths. Let competitors\' horn effect issues speak for themselves without amplifying them unfairly.',
      },
      {
        concern: 'Suppressing Negative Feedback',
        severity: 'critical',
        explanation:
          'Hiding, burying, or deleting negative reviews to prevent horn effect on your own product',
        mitigation:
          'Display reviews transparently. Address negative feedback publicly. Suppression is worse than the horn effect it tries to prevent — it destroys trust entirely when discovered.',
      },
      {
        concern: 'Manufactured First Impressions',
        severity: 'medium',
        explanation:
          'Creating an artificially polished first impression that misrepresents actual product quality',
        mitigation:
          'First impressions should be representative of the real product. Invest in actual quality, not just demo quality. Bait-and-switch triggers a stronger horn effect when users discover the real product.',
      },
      {
        concern: 'Dismissing Accessibility as Minor',
        severity: 'critical',
        explanation:
          'Treating accessibility issues as low priority because they affect "fewer users," not recognizing that accessibility failures trigger horn effect for disabled users',
        mitigation:
          'Treat accessibility as a first-impression quality signal. For disabled users, a missing alt text or keyboard trap is their equivalent of a blank loading screen — it poisons the entire experience.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'A Constant Error in Psychological Ratings',
        author: 'Thorndike, E. L.',
        year: 1920,
        doi: '10.1037/h0071663',
        description:
          'The foundational paper that first documented the halo effect and horn effect in military officer evaluations',
        type: 'foundational',
      },
      {
        title: 'The Halo Effect: Evidence for Unconscious Alteration of Judgments',
        author: 'Nisbett, R. E., & Wilson, T. D.',
        year: 1977,
        doi: '10.1037/0022-3514.35.4.250',
        description:
          'Demonstrated that subjects were unaware of the halo/horn effect even as it influenced their ratings of unrelated attributes',
        type: 'foundational',
      },
      {
        title: 'Initial Impressions: What They Are, What They Are Not, and How They Influence Structured Interview Outcomes',
        author: 'Barrick, M. R., Swider, B. W., & Stewart, G. L.',
        year: 2010,
        doi: '10.1037/a0018235',
        description:
          'Showed that negative first impressions in interviews predicted final interview ratings more strongly than actual interview performance',
        type: 'practical',
      },
    ],

    books: [
      {
        title: 'Thinking, Fast and Slow',
        author: 'Kahneman, Daniel',
        year: 2011,
        isbn: '9780374275631',
        description:
          'Covers halo and horn effects as examples of System 1 substitution — replacing complex judgments with simpler evaluative impressions',
        type: 'foundational',
      },
      {
        title: 'The Halo Effect... and the Eight Other Business Delusions That Deceive Managers',
        author: 'Rosenzweig, Phil',
        year: 2007,
        isbn: '9780743291255',
        description:
          'Explores how halo and horn effects distort business judgment — companies seen as failing are retroactively judged as having bad strategy, culture, and leadership',
        type: 'practical',
      },
    ],

    articles: [
      {
        title: 'The Halo Effect in UX Design',
        author: 'Nielsen Norman Group',
        url: 'https://www.nngroup.com/articles/halo-effect/',
        description:
          'NNG\'s analysis of how first impressions (positive and negative) color perception of entire products and brands',
        type: 'practical',
      },
      {
        title: 'Why Performance Matters',
        author: 'Google Web Fundamentals',
        url: 'https://web.dev/why-speed-matters/',
        description:
          'Google\'s research on how page load speed affects user perception of brand quality, trust, and reliability — a horn effect case study',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'The Halo Effect and Horn Effect',
        author: 'Practical Psychology',
        url: 'https://www.youtube.com/watch?v=FixOBrhVWFo',
        description:
          'Clear explanation of both halo and horn effects with real-world examples',
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
      'halo-effect',
      'negativity-bias',
      'primacy-effect',
      'loss-aversion',
    ],

    conflicts: [
      'halo-effect',
      'mere-exposure-effect',
    ],

    confusedWith: [
      'halo-effect',
      'negativity-bias',
      'confirmation-bias',
    ],

    hierarchy: {
      parent: 'cognitive-bias',
      children: [
        'first-impression-effect',
        'negative-halo',
      ],
    },
  },
};
