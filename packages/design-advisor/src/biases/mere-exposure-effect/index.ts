/**
 * MERE EXPOSURE EFFECT
 */


import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const mereExposureEffect: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'mere-exposure-effect',
    name: 'Mere Exposure Effect',
    aliases: ['Familiarity Principle', 'Exposure Effect', 'Zajonc Effect'],
    category: BiasCategory.COGNITIVE,
    relatedCategories: [
      BiasCategory.DECISION_MAKING,
      BiasCategory.PERCEPTION,
      BiasCategory.MEMORY,
    ],
    tags: [
      'familiarity',
      'repetition',
      'preference',
      'branding',
      'trust',
      'recognition',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple: 'People prefer things they\'re familiar with over novel things',

    detailed: `The Mere Exposure Effect is the tendency for people to develop a preference for things simply because they are familiar with them. Repeated exposure to a stimulus increases liking, even when people don't consciously remember seeing it before.

This effect is remarkably powerful: Studies show that people prefer nonsense syllables, random shapes, and even photographs of strangers simply because they've been exposed to them multiple times. The exposure doesn't need to be memorable or even conscious - subliminal exposure works too.

In design and branding, this explains why consistency, repetition, and brand presence matter so much. The more users see your logo, design patterns, or interface elements, the more they'll prefer them - not because they're objectively better, but because familiarity feels good.`,

    psychologyBasis: {
      discoveredBy: 'Robert Zajonc',
      year: 1968,
      theory: 'Affective Primacy Hypothesis',
      mechanism: `Repeated exposure to a stimulus increases liking and preference through a process that operates below conscious awareness. This happens because:

1. **Perceptual Fluency**: Familiar stimuli are processed more easily by the brain, and this processing ease is misattributed as liking
2. **Uncertainty Reduction**: Familiarity signals safety — what we've encountered before without harm feels less threatening
3. **Implicit Memory**: The brain encodes exposures even when we don't consciously remember them, building a sense of recognition
4. **Affect Transfer**: The positive feeling of easy recognition transfers to a positive evaluation of the stimulus itself
5. **Habituation**: Repeated exposure reduces the initial arousal response to novelty, replacing wariness with comfort

The mechanism is automatic and pre-cognitive — Zajonc demonstrated that affective responses (liking) can occur before cognitive recognition (identifying what something is).`,
    },

    realWorldExample: `Zajonc showed participants Chinese characters (meaningless to them) at different frequencies: 1, 2, 5, 10, or 25 times. Then asked which they preferred. Result: Direct correlation between exposure frequency and preference. Characters shown 25 times were liked far more than those shown once - despite zero semantic meaning or context.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `The Mere Exposure Effect profoundly affects how users perceive brands, interfaces, and products. Familiarity breeds preference, not contempt. Designers can leverage this to:

- Build brand trust through consistent visual identity across all touchpoints
- Increase CTA effectiveness by repeating calls-to-action in varied but recognizable forms
- Strengthen logo and brand recognition through strategic frequency of exposure
- Smooth onboarding by progressively introducing features so they feel familiar before deep use
- Drive conversions through retargeting ads that build familiarity before purchase decisions`,

    whenToUse: [
      {
        title: 'Brand Consistency Across Touchpoints',
        scenario:
          'When establishing or reinforcing brand identity across multiple platforms and channels',
        example:
          'Use the same color palette, typography, logo placement, and visual language on web, mobile, email, and social media so users build familiarity with every interaction',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Repeated CTA Placement',
        scenario: 'When guiding users toward key conversion actions on long pages or multi-step flows',
        example:
          'Place the primary CTA at the hero section, mid-page, and bottom of page — each time the user sees it, preference and click likelihood increase',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Onboarding and Feature Introduction',
        scenario: 'When introducing new users to product features progressively',
        example:
          'Show new features in tooltips, empty states, and contextual hints across multiple sessions before expecting adoption — familiarity lowers resistance',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Retargeting and Re-engagement',
        scenario: 'When users have visited but not converted, or have gone inactive',
        example:
          'Serve retargeting ads showing the product or brand they previously viewed — each exposure increases preference and return likelihood',
        impact: ImpactLevel.MEDIUM,
      },
      {
        title: 'Design Pattern Reuse',
        scenario: 'When building interfaces that feel intuitive and comfortable',
        example:
          'Use established UI patterns (hamburger menus, card layouts, bottom navigation) that users have seen thousands of times across other apps',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Logo and Brand Element Exposure',
        scenario: 'When building long-term brand recognition and preference',
        example:
          'Place the logo consistently in headers, loading screens, email signatures, and splash screens to accumulate exposure over time',
        impact: ImpactLevel.MEDIUM,
      },
    ],

    whenToAvoid: [
      {
        title: 'Over-Repetition Causing Annoyance',
        reason:
          'Excessive exposure crosses a threshold from familiarity into irritation and banner blindness',
        consequence:
          'Users develop ad fatigue, actively ignore repeated elements, or develop negative brand associations',
        alternative:
          'Vary the presentation while maintaining consistent brand elements; respect frequency caps in advertising',
      },
      {
        title: 'Masking Usability Problems',
        reason:
          'Users may grow accustomed to poor UX through repeated exposure without the issues being addressed',
        consequence:
          'Users tolerate bad design out of familiarity, but new users will still bounce — Stockholm syndrome is not a UX strategy',
        alternative:
          'Use familiarity to reinforce good patterns, not to paper over usability issues; test with new users regularly',
      },
      {
        title: 'Deceptive Pattern Normalization',
        reason:
          'Repeated exposure to dark patterns can make manipulative design feel normal and acceptable',
        consequence:
          'Users are conditioned to accept practices that harm them; regulatory and trust risks increase',
        alternative:
          'Build familiarity with ethical, user-centered patterns that genuinely serve user goals',
      },
      {
        title: 'Stifling Innovation',
        reason:
          'Over-reliance on familiar patterns can prevent adoption of objectively better new approaches',
        consequence:
          'Product feels stale; misses opportunities for meaningful improvement because "users are used to it"',
        alternative:
          'Introduce innovations gradually, building familiarity through progressive exposure rather than abrupt change',
      },
    ],

    commonMistakes: [
      {
        title: 'Confusing Repetition with Spam',
        description:
          'Bombarding users with the same message or ad at too high a frequency',
        why: 'The mere exposure effect has an inverted-U curve — moderate exposure increases liking, but excessive exposure causes irritation and avoidance',
        fix: 'Set frequency caps, vary creative assets while maintaining brand consistency, and monitor ad fatigue metrics',
      },
      {
        title: 'Inconsistent Brand Application',
        description:
          'Using different visual styles, colors, or layouts across channels so each exposure feels novel rather than familiar',
        why: 'Mere exposure only works when each contact reinforces the same stimulus — inconsistency resets the familiarity counter',
        fix: 'Create and enforce a design system with strict brand guidelines across all touchpoints',
      },
      {
        title: 'Ignoring the Exposure-to-Preference Curve',
        description:
          'Assuming more exposure is always better without measuring preference changes',
        why: 'Research shows preference peaks at moderate exposure and declines with overexposure (the "wear-out" effect)',
        fix: 'Track sentiment and engagement metrics alongside exposure frequency; find the optimal exposure count for your audience',
      },
      {
        title: 'Familiarity Without Quality',
        description:
          'Relying on repeated exposure to make a poor product feel acceptable',
        why: 'Mere exposure increases preference for neutral stimuli, but cannot overcome strongly negative initial impressions',
        fix: 'Ensure the product, brand, or interface is at least neutral-to-positive before investing in exposure strategies',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.HIGH,
        description:
          'Consistent layout patterns across pages and sessions build structural familiarity',
        examples: [
          'Consistent header, navigation, and footer placement builds spatial memory and comfort',
          'Repeating card-based layouts across different content types creates a familiar rhythm',
          'Maintaining the same grid structure across pages reduces cognitive effort on each visit',
          'Logo placement in the same position reinforces brand recognition on every page load',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Consistent typographic choices create recognizable brand voice and reading comfort',
        examples: [
          'Using the same typeface family consistently builds reading fluency and brand recognition',
          'Consistent heading hierarchy feels familiar and reduces scanning effort over time',
          'Brand-specific typography choices become associated with positive experiences',
          'Repeated exposure to a distinctive font makes it feel "right" for the brand',
        ],
      },
      color: {
        level: ImpactLevel.CRITICAL,
        description:
          'Brand colors are among the strongest mere exposure vectors — color recognition is fast and emotional',
        examples: [
          'Coca-Cola red, Spotify green, Facebook blue — color becomes inseparable from brand through repetition',
          'Consistent accent color usage builds an emotional vocabulary users recognize instantly',
          'Color consistency across platforms reinforces brand familiarity at the pre-cognitive level',
          'Seasonal or campaign color variations should always maintain core brand palette recognition',
        ],
      },
      interaction: {
        level: ImpactLevel.HIGH,
        description:
          'Familiar interaction patterns reduce friction and increase user confidence',
        examples: [
          'Repeated use of the same gesture patterns (swipe, pull-to-refresh) builds muscle memory preference',
          'Consistent button behaviors and feedback patterns feel natural after multiple exposures',
          'Familiar micro-interactions (like animations) create a sense of polish users grow to expect',
          'Progressive feature exposure through repeated contextual hints builds readiness to adopt',
        ],
      },
      content: {
        level: ImpactLevel.HIGH,
        description:
          'Consistent brand voice and messaging style become preferred through repeated reading',
        examples: [
          'A distinctive brand voice becomes recognizable and preferred across all content',
          'Repeated exposure to product terminology builds fluency and reduces learning curve',
          'Consistent CTA language ("Get Started", "Try Free") builds recognition and click-readiness',
          'Newsletter and email templates that maintain visual consistency get higher open rates over time',
        ],
      },
      accessibility: {
        level: ImpactLevel.MEDIUM,
        description:
          'Familiar patterns are especially critical for users who rely on consistent navigation',
        examples: [
          'Screen reader users build mental models through consistent heading structures and landmarks',
          'Keyboard navigation patterns that remain consistent reduce learning burden for motor-impaired users',
          'Consistent ARIA labels and roles build familiarity for assistive technology users',
          'Predictable focus order across pages benefits users who rely on sequential navigation',
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
        title: 'Consistent Brand Elements Across Touchpoints',
        description:
          'Design system enforcing the same visual language across web, mobile, and email',
        code: `<header class="brand-header">
  <img src="logo.svg" alt="Acme" class="brand-logo">
  <nav class="brand-nav">
    <a href="/features">Features</a>
    <a href="/pricing">Pricing</a>
    <a href="/docs">Docs</a>
  </nav>
  <button class="cta-primary">Get Started</button>
</header>

<!-- Same header structure in email -->
<table class="email-header" role="presentation">
  <tr>
    <td><img src="logo.svg" alt="Acme" width="120"></td>
    <td align="right">
      <a href="/features" class="email-link">Features</a>
      <a href="/pricing" class="email-link">Pricing</a>
    </td>
  </tr>
</table>

<style>
/* Design tokens ensure consistency */
.brand-header, .email-header {
  background: var(--cg-color-brand-surface);
  border-bottom: 2px solid var(--cg-color-brand-primary);
}
.cta-primary {
  background: var(--cg-color-brand-primary);
  color: var(--cg-color-brand-on-primary);
  border-radius: var(--cg-radius-md);
  font-family: var(--cg-font-brand);
}
</style>`,
        explanation:
          'Every touchpoint reinforces the same brand elements: logo, colors, typography, and CTA styling. Users build familiarity across channels, and each consistent exposure increases preference and trust.',
        principle:
          'Consistent brand exposure across touchpoints compounds familiarity into preference and trust',
        metrics: {
          before: '42% brand recall after 3 touchpoints with inconsistent design',
          after: '78% brand recall after 3 touchpoints with consistent design system',
          improvement: '86% increase in unaided brand recall through design consistency',
        },
      },
      {
        title: 'Familiar UI Patterns From the Ecosystem',
        description:
          'Using established design patterns that users already recognize from other apps',
        code: `<!-- Bottom navigation - familiar from iOS/Android -->
<nav class="bottom-nav" aria-label="Main navigation">
  <a href="/home" class="nav-item active" aria-current="page">
    <svg class="nav-icon"><use href="#icon-home"/></svg>
    <span>Home</span>
  </a>
  <a href="/search" class="nav-item">
    <svg class="nav-icon"><use href="#icon-search"/></svg>
    <span>Search</span>
  </a>
  <a href="/create" class="nav-item">
    <svg class="nav-icon"><use href="#icon-plus"/></svg>
    <span>Create</span>
  </a>
  <a href="/notifications" class="nav-item">
    <svg class="nav-icon"><use href="#icon-bell"/></svg>
    <span>Alerts</span>
  </a>
  <a href="/profile" class="nav-item">
    <svg class="nav-icon"><use href="#icon-user"/></svg>
    <span>Profile</span>
  </a>
</nav>

<!-- Pull-to-refresh - familiar gesture -->
<div class="feed" data-pull-refresh="true">
  <div class="refresh-indicator">
    <svg class="spinner"><use href="#icon-refresh"/></svg>
    <span>Pull to refresh</span>
  </div>
</div>`,
        explanation:
          'By using bottom navigation and pull-to-refresh patterns that users have encountered thousands of times across other apps, the interface feels immediately familiar and comfortable. Users\' prior exposure to these patterns transfers as preference.',
        principle:
          'Leveraging ecosystem-wide familiarity means users arrive pre-exposed to your patterns',
      },
      {
        title: 'Progressive Feature Introduction',
        description:
          'Gradually exposing users to a feature across multiple sessions before expecting adoption',
        code: `<!-- Session 1: Subtle hint -->
<div class="feature-hint subtle" role="status">
  <span class="hint-icon">✨</span>
  <p>Did you know? You can automate this with Workflows.</p>
  <button class="hint-dismiss" aria-label="Dismiss">×</button>
</div>

<!-- Session 3: Contextual suggestion -->
<div class="feature-suggestion" role="complementary">
  <h4>Save time with Workflows</h4>
  <p>You've done this task 5 times this week. Workflows can do it automatically.</p>
  <button class="cta-secondary">Learn More</button>
  <button class="hint-dismiss" aria-label="Dismiss">Not now</button>
</div>

<!-- Session 5: Empty state with familiar feature -->
<div class="empty-state">
  <img src="workflows-illustration.svg" alt="">
  <h3>No manual tasks today!</h3>
  <p>Set up a Workflow to handle these automatically.</p>
  <button class="cta-primary">Create Your First Workflow</button>
</div>`,
        explanation:
          'By the time the user sees the full CTA in session 5, "Workflows" is already a familiar concept. Each prior exposure built recognition and reduced novelty aversion, making adoption feel natural rather than forced.',
        principle:
          'Progressive exposure builds familiarity before asking for commitment, reducing adoption friction',
        metrics: {
          before: '8% feature adoption when introduced with a single announcement',
          after: '27% feature adoption with progressive 5-session exposure strategy',
          improvement: '238% increase in feature adoption through graduated familiarity',
        },
      },
    ],

    bad: [
      {
        title: 'Ad Fatigue From Over-Repetition',
        description:
          'Showing the exact same retargeting ad too many times causes irritation instead of preference',
        code: `<!-- DON'T DO THIS -->
<!-- Same ad shown 15+ times to the same user -->
<div class="retargeting-ad">
  <img src="product-shoe.jpg" alt="Running shoe">
  <h3>Still thinking about these shoes?</h3>
  <p>They're waiting for you! Buy now!</p>
  <button class="buy-now">Buy Now - $129</button>
</div>

<!-- User sees this same creative on: -->
<!-- Facebook (3x/day), Instagram (2x/day), -->
<!-- Google Display (4x/day), YouTube pre-roll (2x/day) -->
<!-- Total: 11+ exposures/day for 2 weeks = 150+ exposures -->`,
        explanation:
          'Exceeding optimal exposure frequency causes the inverted-U effect: liking peaks at moderate exposure and drops sharply with overexposure. Users develop negative associations, ad blindness, and may actively avoid the brand.',
        principle:
          'Overexposure reverses the mere exposure effect — frequency caps are essential',
      },
      {
        title: 'Banner Blindness From Static Repetition',
        description:
          'Placing the same promotional banner in the same position on every page until users stop seeing it entirely',
        code: `<!-- DON'T DO THIS -->
<!-- Same banner, same position, every single page -->
<div class="promo-banner" style="
  position: fixed;
  top: 0;
  width: 100%;
  background: #ff6600;
  padding: 12px;
  text-align: center;
">
  <p>🔥 UPGRADE TO PRO! Get 50% off! Limited time! 🔥</p>
  <button>Upgrade Now</button>
</div>

<!-- After 2 weeks, click-through rate drops from 3.2% to 0.1% -->
<!-- Users develop "top banner blindness" and stop seeing it entirely -->`,
        explanation:
          'When the exact same element appears in the exact same position without variation, users habituate to it as visual noise. This is not mere exposure building preference — it is stimulus saturation creating invisibility.',
        principle:
          'Static repetition without variation leads to habituation and banner blindness, not preference',
      },
      {
        title: 'Notification Spam Destroying Brand Sentiment',
        description:
          'Sending excessive push notifications or emails in an attempt to build familiarity',
        code: `<!-- DON'T DO THIS -->
<!-- Day 1 after signup: 4 emails -->
<!-- Subject: "Welcome to AppX!" -->
<!-- Subject: "Complete your profile on AppX" -->
<!-- Subject: "Don't miss out on AppX features!" -->
<!-- Subject: "Your AppX journey starts now!" -->

<!-- Day 2: 3 more emails + 2 push notifications -->
<!-- Day 3: 2 more emails + 3 push notifications -->
<!-- Day 7: User unsubscribes / uninstalls -->

<div class="push-notification">
  <img src="app-icon.png" alt="AppX">
  <p><strong>AppX</strong></p>
  <p>You haven't opened AppX today! Come back and explore!</p>
  <small>3 minutes ago</small>
</div>`,
        explanation:
          'Aggressive notification frequency crosses from familiarity into annoyance. Each unwanted interruption creates a negative association. The brand becomes linked to irritation rather than preference, driving unsubscribes and uninstalls.',
        principle:
          'Forced, intrusive exposure creates negative associations — mere exposure requires non-aversive contact',
      },
    ],

    realWorld: [
      {
        company: 'Coca-Cola',
        product: 'Global Branding',
        description: 'Coca-Cola maintains the most consistent brand identity in history — the same red, the same script logo, the same bottle silhouette across every country and every channel. Decades of mere exposure have made the brand feel like a default choice worldwide.',
        effectiveness: 'very-effective',
        analysis: 'Coca-Cola demonstrates mere exposure at its most powerful: billions of impressions over 130+ years creating a deep familiarity that registers as preference. Studies show people prefer Coca-Cola in branded tastings but not in blind tastings — the familiarity, not the flavor, drives choice.',
      },
      {
        company: 'Google',
        product: 'Material Design',
        description: 'Google\'s Material Design system is used across Gmail, Maps, Drive, YouTube, Android, and dozens of other products. Users encounter the same design patterns (FABs, bottom sheets, cards) across multiple daily interactions, building deep familiarity.',
        effectiveness: 'very-effective',
        analysis: 'By using a unified design system across its ecosystem, Google ensures that every product interaction reinforces familiarity with the same patterns. New Google products feel instantly comfortable because users have been pre-exposed through existing products.',
      },
      {
        company: 'Spotify',
        product: 'Wrapped Campaign',
        description: 'Spotify Wrapped appears every December with a consistent visual format — bold colors, large typography, personal data stories. Each year\'s exposure builds familiarity with the format, making it a cultural event users anticipate and share.',
        effectiveness: 'very-effective',
        analysis: 'Wrapped leverages mere exposure across years: the consistent format becomes familiar and expected. Users share it on social media, creating vicarious exposure for non-users. The campaign builds both intra-user familiarity (annual ritual) and inter-user exposure (social sharing).',
      },
      {
        company: 'Instagram',
        product: 'Consistent UI and Iconography',
        description: 'Instagram\'s core interface — the camera icon, the heart for likes, the grid profile layout, the Stories circles at the top — has remained fundamentally consistent since its early years. Despite feature additions, the core visual language is deeply familiar.',
        effectiveness: 'effective',
        analysis: 'Instagram demonstrates strategic consistency: core patterns stay stable while new features (Reels, Shopping) adopt the same visual language. Users\' deep familiarity with the base interface makes new features feel like natural extensions rather than foreign additions.',
      },
      {
        company: 'Apple',
        product: 'Product Design Language',
        description: 'Apple\'s consistent design language — rounded rectangles, minimalist white space, SF Pro typography, consistent icon style — spans hardware, software, retail, packaging, and advertising. Every Apple interaction reinforces the same aesthetic.',
        effectiveness: 'very-effective',
        analysis: 'Apple leverages mere exposure across physical and digital touchpoints. The consistent design language means that seeing an Apple Store, using an iPhone, or opening apple.com all compound the same familiarity. This cross-channel consistency is a key driver of brand preference.',
      },
    ],

    abTests: [
      {
        title: 'Retargeting Frequency: Low vs Medium vs High Exposure',
        hypothesis:
          'Moderate retargeting frequency will outperform both low and high frequency due to the mere exposure inverted-U curve',
        controlVersion: {
          description:
            'Low frequency: Retargeting ads shown 1-3 times per week to visitors who didn\'t convert',
          metrics: {
            conversionRate: '1.8%',
            brandSentiment: '6.2/10',
            adRecall: '22%',
          },
        },
        treatmentVersion: {
          description:
            'Medium frequency: Retargeting ads shown 5-7 times per week with creative rotation (3 variants maintaining brand consistency)',
          metrics: {
            conversionRate: '3.4%',
            brandSentiment: '7.1/10',
            adRecall: '48%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Medium frequency with creative rotation hit the sweet spot of the mere exposure curve. A third high-frequency variant (15+/week, same creative) was also tested and showed declining results: 2.1% conversion, 4.8/10 sentiment — confirming the inverted-U.',
          learnings: [
            'Optimal retargeting frequency was 5-7 exposures per week for this audience',
            'Creative rotation prevented banner blindness while maintaining brand familiarity',
            'High frequency (15+/week) caused negative sentiment and lower conversions than low frequency',
            'Brand recall peaked at medium frequency and plateaued — more exposure did not mean more recall',
          ],
        },
      },
      {
        title: 'Progressive Feature Introduction vs Single Announcement',
        hypothesis:
          'Gradually exposing users to a new feature over multiple sessions will increase adoption compared to a single announcement',
        controlVersion: {
          description:
            'Single announcement: Modal popup on first login after feature launch, with "Try Now" CTA and dismiss option',
          metrics: {
            conversionRate: '11%',
            timeToAdopt: '1 day (for those who adopted)',
            weeklyRetention: '23%',
          },
        },
        treatmentVersion: {
          description:
            'Progressive exposure: Session 1 subtle badge, Session 2 contextual hint, Session 3 empty-state suggestion, Session 4 guided walkthrough option',
          metrics: {
            conversionRate: '29%',
            timeToAdopt: '8 days (median)',
            weeklyRetention: '61%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Progressive exposure nearly tripled adoption rate and dramatically improved retention. Users who adopted after gradual exposure showed 165% higher weekly retention, suggesting familiarity led to genuine preference rather than curiosity clicks.',
          learnings: [
            'Familiarity built over multiple sessions converted to more committed adoption',
            'Single-announcement adopters had high churn — novelty without familiarity',
            'Progressive exposure reduced "feature fear" and adoption resistance',
            'The optimal number of exposure touchpoints before full CTA was 3-4 sessions',
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
        name: 'Repeated Brand Elements',
        description:
          'Logo, brand colors, and visual identity appearing consistently across pages and components',
        howToSpot:
          'Check header, footer, loading states, empty states, and email templates for consistent brand element placement',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Consistent Visual Language',
        description:
          'Same design tokens, component styles, and layout patterns reused throughout the product',
        howToSpot:
          'Compare multiple pages and flows — do they share the same typographic scale, color palette, spacing, and component library?',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Repeated CTA Patterns',
        description:
          'The same call-to-action appearing multiple times across a page or user journey',
        howToSpot:
          'Look for the same button text, style, and action appearing at top, middle, and bottom of pages or across multiple touchpoints',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Retargeting and Re-engagement Patterns',
        description:
          'Ads, emails, or notifications that re-expose users to previously viewed products or features',
        howToSpot:
          'Check for retargeting pixels, email drip campaigns, push notification schedules, and "you viewed this" patterns',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Progressive Feature Hints',
        description:
          'Feature references appearing in tooltips, badges, empty states, and contextual suggestions across sessions',
        howToSpot:
          'Track how new features are introduced — is there a multi-session exposure strategy, or just a single announcement?',
        severity: ImpactLevel.LOW,
      },
    ],

    patterns: [
      {
        name: 'Brand Consistency Pattern',
        description: 'Unified brand identity elements repeated across all touchpoints and channels',
        indicators: [
          'Same logo, colors, and typography on web, mobile, and email',
          'Design system enforcing consistent component usage',
          'Brand guidelines covering all visual and interaction patterns',
          'Cross-channel visual continuity',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Frequency and Exposure Pattern',
        description: 'Deliberate repetition strategy to build familiarity through controlled exposure',
        indicators: [
          'Retargeting campaigns with frequency caps',
          'Email drip sequences with consistent branding',
          'Multi-touch feature introduction strategies',
          'Repeated CTA placement across user journey',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Ecosystem Familiarity Pattern',
        description: 'Using established design patterns that users recognize from the broader ecosystem',
        indicators: [
          'Standard navigation patterns (bottom tabs, hamburger menu)',
          'Common gesture patterns (swipe, pull-to-refresh)',
          'Platform-native UI conventions (Material Design, HIG)',
          'Familiar icon semantics (heart for like, bell for notifications)',
        ],
        severity: ImpactLevel.MEDIUM,
        confidence: 'high',
      },
      {
        name: 'Overexposure Risk Pattern',
        description: 'Signs that exposure frequency has crossed from familiarity into irritation',
        indicators: [
          'Declining click-through rates on repeated elements',
          'Increasing unsubscribe or notification opt-out rates',
          'User complaints about repetitive messaging',
          'Banner blindness in heatmap data',
        ],
        severity: ImpactLevel.CRITICAL,
        confidence: 'medium',
      },
    ],

    checklistQuestions: [
      'Are brand elements (logo, colors, typography) consistent across all touchpoints?',
      'How many times does a user encounter the primary CTA before converting?',
      'Is there a frequency cap on retargeting ads and re-engagement notifications?',
      'Are new features introduced progressively or through a single announcement?',
      'Does the interface use established, familiar design patterns from the broader ecosystem?',
      'Is there evidence of banner blindness or ad fatigue in analytics data?',
      'Do cross-channel experiences (web, mobile, email) feel like the same brand?',
      'How are design tokens and component libraries enforcing visual consistency?',
      'Is there a strategy for introducing design changes gradually to preserve familiarity?',
      'Are users developing preference through exposure, or irritation through overexposure?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in the mere exposure effect.

Analyze the provided design for mere exposure effect patterns. Identify:

1. **Brand Consistency**: How consistently brand elements appear across touchpoints
2. **Exposure Frequency**: How often key elements, CTAs, and brand marks are repeated
3. **Familiarity Leverage**: Use of established, recognizable UI patterns from the broader ecosystem
4. **Progressive Introduction**: How new features or concepts are gradually introduced to build familiarity
5. **Overexposure Risks**: Signs that repetition has crossed from familiarity into irritation

For each pattern found:
- Identify what stimulus is being repeated and where
- Assess whether the exposure frequency is optimal, too low, or too high
- Determine if the repetition builds genuine familiarity or causes fatigue
- Evaluate consistency across channels and touchpoints
- Suggest improvements for optimal exposure strategy

Consider:
- Is the design building familiarity ethically, or normalizing manipulative patterns?
- Are there inconsistencies across touchpoints that waste exposure opportunities?
- Is the exposure frequency appropriate for the audience and context?
- Are new features introduced gradually or forced through single announcements?
- Is there evidence of overexposure (banner blindness, declining engagement)?

Provide actionable recommendations for optimal, ethical use of mere exposure.`,

    outputSchema: {
      type: 'object',
      properties: {
        exposurePatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              stimulus: { type: 'string' },
              frequency: { type: 'string' },
              consistencyScore: { type: 'number' },
              fatigueRisk: { type: 'string' },
              ethical: { type: 'boolean' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'stimulus',
              'frequency',
              'ethical',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            brandConsistency: { type: 'number' },
            exposureOptimality: { type: 'number' },
            fatigueRisk: { type: 'number' },
            ethicalScore: { type: 'number' },
          },
          required: [
            'brandConsistency',
            'exposureOptimality',
            'fatigueRisk',
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
        'exposurePatterns',
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
        title: 'Audit Brand Consistency',
        description:
          'Map every touchpoint where users encounter your brand and assess visual consistency',
        example:
          'Audit: website, mobile app, emails, social ads, help docs, invoices — are they all using the same design tokens?',
        tips: [
          'Create a touchpoint map listing every user contact point',
          'Screenshot each touchpoint and compare brand elements side by side',
          'Identify inconsistencies that are wasting exposure opportunities',
        ],
      },
      {
        step: 2,
        title: 'Establish a Design System',
        description:
          'Create a shared design system that enforces consistent brand expression across all channels',
        example:
          'Implement shared tokens for color, typography, spacing, and component styles that all teams consume',
        tips: [
          'Use design tokens (CSS custom properties) to ensure consistency at the code level',
          'Create component libraries that encode brand patterns once and reuse everywhere',
          'Document brand guidelines with concrete examples of correct and incorrect usage',
        ],
      },
      {
        step: 3,
        title: 'Plan Exposure Frequency',
        description:
          'Design deliberate exposure strategies with optimal frequency for each channel and context',
        example:
          'Retargeting: 5-7 exposures/week with 3 creative variants. Email: 2-3/week max. Push: 1/day max.',
        tips: [
          'Research optimal frequency for your audience (varies by industry and product type)',
          'Set frequency caps to prevent overexposure',
          'Vary creative assets while maintaining brand consistency to prevent fatigue',
        ],
      },
      {
        step: 4,
        title: 'Introduce Features Progressively',
        description:
          'Build familiarity with new features through gradual, multi-session exposure before full CTAs',
        example:
          'Session 1: Badge icon. Session 2: Tooltip mention. Session 3: Contextual suggestion. Session 4: Full walkthrough offer.',
        tips: [
          'Start with low-commitment exposure (visual cues, mentions) before asking for action',
          'Track exposure count per user to trigger the right message at the right stage',
          'Respect user dismissals — forced repetition after dismissal causes irritation',
        ],
      },
      {
        step: 5,
        title: 'Monitor Fatigue and Optimize',
        description:
          'Track metrics that indicate whether exposure is building preference or causing fatigue',
        example:
          'Dashboard: ad CTR over time, email open rate trends, notification opt-out rates, brand sentiment surveys',
        tips: [
          'Watch for declining engagement as a signal of overexposure',
          'Survey users periodically to measure brand sentiment and familiarity',
          'A/B test different exposure frequencies to find the optimal point',
        ],
      },
    ],

    dos: [
      'Maintain strict brand consistency across all touchpoints and channels',
      'Use design tokens and shared component libraries to enforce visual consistency',
      'Set frequency caps on retargeting, email, and push notification campaigns',
      'Vary creative assets while maintaining core brand elements to prevent fatigue',
      'Introduce new features progressively through multi-session exposure strategies',
      'Use familiar, established UI patterns that users recognize from the broader ecosystem',
      'Monitor engagement metrics for signs of overexposure and ad fatigue',
      'Build familiarity with neutral-to-positive stimuli — ensure quality before investing in exposure',
    ],

    donts: [
      'Don\'t exceed optimal exposure frequency — more is not always better',
      'Don\'t show the exact same creative in the same position indefinitely (causes banner blindness)',
      'Don\'t use forced, intrusive repetition (aggressive pop-ups, spam notifications)',
      'Don\'t rely on familiarity to compensate for poor product quality or usability',
      'Don\'t normalize dark patterns through repeated exposure',
      'Don\'t introduce major design overhauls without gradual transition periods',
      'Don\'t ignore inconsistencies across channels — each inconsistent exposure is wasted',
      'Don\'t assume familiarity equals preference for strongly negative stimuli',
    ],

    bestPractices: [
      {
        title: 'Optimal Exposure Frequency',
        description:
          'Find the sweet spot on the inverted-U curve where exposure builds maximum preference without fatigue',
        rationale:
          'Research shows preference peaks at moderate exposure (10-20 for lab stimuli) and declines with overexposure. Real-world optimal frequency depends on context.',
        example:
          'A/B test 3, 5, 7, and 10 weekly retargeting exposures; measure both conversion and brand sentiment to find the peak',
      },
      {
        title: 'Vary Within Consistency',
        description:
          'Rotate creative assets and messaging while maintaining core brand elements (logo, colors, typography)',
        rationale:
          'Same-stimulus repetition causes habituation; varied-but-consistent exposure maintains novelty while building brand familiarity',
        example:
          'Three ad variants sharing the same brand colors, logo, and CTA but with different imagery and copy angles',
      },
      {
        title: 'Progressive Disclosure for New Features',
        description:
          'Introduce new features through graduated exposure over multiple sessions before expecting adoption',
        rationale:
          'Familiarity reduces the novelty aversion that blocks feature adoption; progressive exposure builds readiness',
        example:
          'Session 1: Badge. Session 2: Tooltip. Session 3: Contextual suggestion. Session 4: Guided walkthrough.',
      },
      {
        title: 'Cross-Channel Consistency Audit',
        description:
          'Regularly audit all touchpoints to ensure brand consistency is maintained as teams and channels grow',
        rationale:
          'Each inconsistent touchpoint wastes an exposure opportunity and can confuse the brand familiarity signal',
        example:
          'Quarterly brand audit comparing web, mobile, email, social, docs, and support interfaces side by side',
      },
      {
        title: 'Ethical Familiarity Building',
        description:
          'Build familiarity with patterns that genuinely serve users, not with manipulative designs',
        rationale:
          'Mere exposure can normalize dark patterns — this is a responsibility, not just a technique',
        example:
          'Build familiarity with clear pricing, honest messaging, and accessible patterns — not with hidden fees or confusing opt-outs',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships - Ensure consistent structure is conveyed semantically, not just visually',
        implementation:
          'Use consistent heading levels, landmark regions, and ARIA roles across all pages so assistive technology users build the same structural familiarity as visual users',
      },
      {
        wcagLevel: 'AA',
        criterion: '3.2.3',
        guideline:
          'Consistent Navigation - Navigation mechanisms that appear on multiple pages must be presented in the same relative order',
        implementation:
          'Keep navigation structure, order, and labeling consistent across all pages. This is both a WCAG requirement and a core mere exposure strategy.',
      },
      {
        wcagLevel: 'AA',
        criterion: '3.2.4',
        guideline:
          'Consistent Identification - Components with the same functionality must be identified consistently',
        implementation:
          'Use the same labels, icons, and ARIA descriptions for the same actions everywhere. Consistency builds familiarity for all users, including those using assistive technology.',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.4.1',
        guideline:
          'Use of Color - Brand familiarity through color must not rely on color alone',
        implementation:
          'Combine brand colors with shapes, labels, and semantic HTML so brand recognition is accessible to users with color vision deficiencies.',
      },
    ],

    ethics: [
      {
        concern: 'Normalizing Dark Patterns',
        severity: 'critical',
        explanation:
          'Repeated exposure to manipulative design patterns (hidden opt-outs, confusing unsubscribe flows) can make them feel "normal" to users',
        mitigation:
          'Audit all repeated patterns for ethical alignment. Build familiarity only with patterns that serve user interests. Review against dark pattern databases.',
      },
      {
        concern: 'Ad Fatigue and Intrusion',
        severity: 'high',
        explanation:
          'Excessive retargeting or notification frequency crosses from familiarity building into harassment',
        mitigation:
          'Implement strict frequency caps. Monitor opt-out rates and sentiment. Respect user preferences for communication frequency.',
      },
      {
        concern: 'Resistance to Beneficial Change',
        severity: 'medium',
        explanation:
          'Strong familiarity with existing patterns can create resistance to objectively better alternatives',
        mitigation:
          'When introducing improvements, use gradual transitions. Explain changes clearly. Offer temporary access to familiar patterns during transition.',
      },
      {
        concern: 'Exploiting Familiarity for Upselling',
        severity: 'high',
        explanation:
          'Building trust through consistent, helpful interactions and then leveraging that trust for aggressive upselling',
        mitigation:
          'Ensure upsell suggestions are genuinely relevant and helpful. Maintain the same ethical standard in monetization touchpoints as in product touchpoints.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'Attitudinal Effects of Mere Exposure',
        author: 'Zajonc, R. B.',
        year: 1968,
        doi: '10.1037/h0025848',
        description:
          'The foundational paper establishing the mere exposure effect — repeated exposure to stimuli increases preference',
        type: 'foundational',
      },
      {
        title: 'Mere Exposure: A Gateway to the Subliminal',
        author: 'Bornstein, R. F.',
        year: 1989,
        doi: '10.1111/j.1467-8721.1989.tb00084.x',
        description:
          'Meta-analysis of 208 mere exposure experiments confirming the effect and identifying moderating variables',
        type: 'foundational',
      },
      {
        title: 'Feeling and Thinking: Preferences Need No Inferences',
        author: 'Zajonc, R. B.',
        year: 1980,
        doi: '10.1037/0003-066X.35.2.151',
        description:
          'Zajonc\'s influential paper arguing that affective reactions can occur independently of cognitive processing',
        type: 'advanced',
      },
      {
        title: 'Perceptual Fluency and Aesthetic Pleasure: Is Beauty in the Perceiver\'s Processing Experience?',
        author: 'Reber, R., Schwarz, N., & Winkielman, P.',
        year: 2004,
        doi: '10.1207/s15327957pspr0804_3',
        description:
          'Links mere exposure to perceptual fluency — explains why familiarity feels aesthetically pleasing',
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
          'Chapter on cognitive ease discusses mere exposure effect and how fluency drives preference',
        type: 'foundational',
      },
      {
        title: 'Subliminal: How Your Unconscious Mind Rules Your Behavior',
        author: 'Mlodinow, Leonard',
        year: 2012,
        isbn: '9780307378217',
        description:
          'Explores subliminal mere exposure and how unconscious familiarity shapes preferences and decisions',
        type: 'practical',
      },
      {
        title: 'Designing for Behavior Change',
        author: 'Wendel, Stephen',
        year: 2013,
        isbn: '9781449367626',
        description:
          'Practical guide to applying behavioral psychology including mere exposure in product design',
        type: 'practical',
      },
    ],

    articles: [
      {
        title: 'The Mere Exposure Effect in UX Design',
        author: 'Laws of UX',
        url: 'https://lawsofux.com/mere-exposure-effect/',
        description:
          'Concise overview of mere exposure effect with practical design applications',
        type: 'practical',
      },
      {
        title: 'Familiarity Bias in UX: The Mere-Exposure Effect',
        author: 'Nielsen Norman Group',
        url: 'https://www.nngroup.com/articles/mere-exposure-effect/',
        description:
          'Evidence-based guide to leveraging familiarity in user experience design',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'The Mere Exposure Effect',
        author: 'The Decision Lab',
        url: 'https://thedecisionlab.com/biases/mere-exposure-effect',
        description:
          'Clear explanation of the mere exposure effect with real-world examples',
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
      'status-quo-bias',
      'endowment-effect',
      'halo-effect',
    ],

    conflicts: [
      'novelty-bias',
      'curiosity-gap',
    ],

    confusedWith: [
      'availability-heuristic',
      'recognition-heuristic',
      'fluency-heuristic',
    ],

    hierarchy: {
      parent: 'cognitive-bias',
      children: [
        'familiarity-bias',
        'processing-fluency',
      ],
    },
  },
};
