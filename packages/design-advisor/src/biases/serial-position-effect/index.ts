/**
 * SERIAL POSITION EFFECT
 */


import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const serialPositionEffect: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'serial-position-effect',
    name: 'Serial Position Effect',
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
    simple: 'First and last items are remembered best; middle items are forgotten.',

    detailed: `The Serial Position Effect is the tendency to recall first (primacy) and last (recency) items in a sequence better than middle items. This creates a U-shaped memory curve where beginning and end dominate recall while the middle fades.

This combines two distinct mechanisms: primacy effect (first items transferred to long-term memory) and recency effect (last items still in working memory). Together they create one of the most reliable and powerful biases in psychology.

In design, this means users will notice, remember, and act on items at the beginning and end of lists, menus, catalogs, and sequences - while middle items are systematically overlooked. Strategic positioning of important content at first or last positions dramatically increases its effectiveness.`,

    psychologyBasis: {
      discoveredBy: 'Various Researchers',
      year: 1970,
      theory: 'Cognitive Bias Research',
      mechanism: `The serial position effect arises from two distinct memory systems working together:

1. **Primacy Effect**: The first items in a sequence receive more rehearsal time and are transferred into long-term memory. Early items face less interference from competing information.
2. **Recency Effect**: The last items remain in short-term (working) memory and are easily retrieved because they were most recently encoded.
3. **Middle Decay**: Items in the middle suffer from both proactive interference (earlier items blocking encoding) and retroactive interference (later items overwriting them).
4. **Rehearsal Gradient**: Early items receive disproportionately more mental rehearsal, strengthening their memory trace.
5. **Attention Curve**: Attention peaks at the beginning of a sequence (novelty), drops in the middle (habituation), and rises again at the end (anticipation of completion).

The result is a characteristic U-shaped recall curve that has been replicated across thousands of studies since Ebbinghaus (1885).`,
    },

    realWorldExample: `Show someone a list of 20 words, then ask them to recall the list. They'll remember the first 3-4 words (primacy), the last 3-4 words (recency), and forget most of the middle. This happens even when all words are equally common and meaningful - position alone determines memory.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `The Serial Position Effect profoundly impacts how users perceive and remember items in any sequential UI element. Menus, navigation bars, feature lists, tab bars, and content feeds are all shaped by this bias. Designers can leverage it to:

- Place the most important navigation items at the first and last positions in tab bars and menus
- Position key features at the start and end of feature lists for maximum recall
- Order content sequences so critical information occupies edge positions
- Structure onboarding flows so the first and final steps leave lasting impressions
- Design checkout and form flows where the most important fields anchor the beginning and end`,

    whenToUse: [
      {
        title: 'Navigation and Tab Bar Design',
        scenario:
          'When designing bottom tab bars, top navigation menus, or sidebar navigation',
        example:
          'Place "Home" as the first tab and "Profile" or primary CTA as the last tab in a 5-item bottom navigation bar',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Feature Lists and Marketing Pages',
        scenario: 'When presenting a list of product features or benefits on a landing page',
        example:
          'Lead with your most compelling feature and close with your strongest differentiator; place less critical features in the middle',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Menu and Dropdown Ordering',
        scenario: 'When organizing items in dropdown menus, context menus, or settings panels',
        example:
          'Place the most frequently used actions at the top and bottom of a dropdown menu, with less common options in the middle',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Onboarding and Tutorial Sequences',
        scenario: 'When designing multi-step onboarding or tutorial flows',
        example:
          'Open onboarding with a "wow" moment and close with a clear, memorable call to action; middle steps handle routine setup',
        impact: ImpactLevel.MEDIUM,
      },
      {
        title: 'Content Sequencing and Feeds',
        scenario: 'When ordering items in content feeds, carousels, or recommendation lists',
        example:
          'Place the strongest recommendation first and a compelling "discover more" item last in a horizontal carousel',
        impact: ImpactLevel.MEDIUM,
      },
    ],

    whenToAvoid: [
      {
        title: 'Equally Important Options',
        reason:
          'When all items must receive equal attention (e.g., legal consent checkboxes, survey questions)',
        consequence:
          'Users may skip or overlook middle items, causing incomplete responses or missed consent',
        alternative:
          'Use randomized ordering or paginate items individually to neutralize position bias',
      },
      {
        title: 'Critical Safety Information in Sequences',
        reason:
          'Burying safety warnings in the middle of a list relies on position bias working against the user',
        consequence:
          'Users miss critical safety steps or warnings placed in forgotten middle positions',
        alternative:
          'Isolate safety-critical information outside of lists, or repeat it at multiple positions',
      },
      {
        title: 'Accessibility-Sensitive Ordering',
        reason:
          'Screen reader users navigate linearly and may not perceive "edge" positions the same way',
        consequence:
          'Assistive technology users may experience different position effects than visual users',
        alternative:
          'Supplement positional emphasis with semantic emphasis (headings, ARIA landmarks, labels)',
      },
      {
        title: 'Manipulative Menu Hiding',
        reason:
          'Deliberately burying "unsubscribe" or "cancel" options in the middle of long menus',
        consequence:
          'User frustration, distrust, and potential regulatory issues (dark pattern)',
        alternative:
          'Place important user actions (cancel, unsubscribe) in predictable, prominent positions',
      },
    ],

    commonMistakes: [
      {
        title: 'Overloading the Middle',
        description:
          'Placing too many important items in the middle of navigation or lists where they will be forgotten',
        why: 'The middle of any sequence is the memory dead zone; items there receive the least attention and recall',
        fix: 'Limit list length to 5-7 items when possible, and ensure critical items are at positions 1 or last',
      },
      {
        title: 'Too Many Items in Navigation',
        description:
          'Creating tab bars or menus with 8+ items, diluting the primacy and recency advantage',
        why: 'As lists grow longer, the middle dead zone expands and even edge items lose some advantage',
        fix: 'Limit primary navigation to 5 items maximum; group secondary items under "More" menus',
      },
      {
        title: 'Ignoring Position When Reordering',
        description:
          'Alphabetically sorting menus or lists without considering position-based recall',
        why: 'Alphabetical order may place the most important item ("Analytics") first by accident but equally might bury it',
        fix: 'Use task frequency and importance to determine ordering, not alphabetical convention',
      },
      {
        title: 'Inconsistent Ordering Across Views',
        description:
          'Changing the position of navigation items or features across different pages or states',
        why: 'Users build spatial memory for item positions; changing order destroys learned recall patterns',
        fix: 'Maintain consistent item positions across all views and states of the application',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.CRITICAL,
        description:
          'Layout determines which items occupy the first and last visible positions in any sequence',
        examples: [
          'Tab bars: first and last tabs receive the most taps and recall',
          'Navigation menus: top and bottom items in vertical lists are remembered best',
          'Grid layouts: top-left (first scanned) and bottom-right (last viewed) positions dominate attention',
          'Card carousels: first and last visible cards get the most engagement',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Typographic emphasis can reinforce or counteract positional advantages',
        examples: [
          'Bold or larger text on middle items can partially offset the serial position disadvantage',
          'Headings at the start of lists reinforce primacy by adding semantic weight',
          'Numbered lists make position explicit, slightly reducing the effect',
          'Consistent typography across items lets position bias dominate recall',
        ],
      },
      color: {
        level: ImpactLevel.MEDIUM,
        description:
          'Color differentiation can help middle items stand out against positional disadvantage',
        examples: [
          'Highlighting a middle menu item with an accent color can boost its recall',
          'Active/selected state indicators help users find items regardless of position',
          'Color-coded categories can create sub-groupings that reset the serial position curve',
          'Badge or notification dots on middle items draw attention to overlooked positions',
        ],
      },
      interaction: {
        level: ImpactLevel.HIGH,
        description:
          'Interactive sequences (wizards, carousels, feeds) are strongly shaped by serial position',
        examples: [
          'First and last steps of a wizard or onboarding flow are remembered and rated highest',
          'Swipeable carousels see highest engagement on the first and last visible items',
          'Infinite scroll feeds show declining engagement for middle content',
          'The first and last interaction in a session disproportionately shape satisfaction',
        ],
      },
      content: {
        level: ImpactLevel.CRITICAL,
        description:
          'Content ordering directly determines which messages users remember from any sequence',
        examples: [
          'Feature lists: lead with the strongest feature and close with the key differentiator',
          'Email content: opening and closing lines are recalled; middle paragraphs are skimmed',
          'Product descriptions: first benefit and last call-to-action carry the most weight',
          'FAQ pages: first and last questions get the most reads',
        ],
      },
      accessibility: {
        level: ImpactLevel.HIGH,
        description:
          'Assistive technology users navigate sequentially, making position effects even more pronounced',
        examples: [
          'Screen reader users hear items in DOM order, reinforcing primacy for early items',
          'Keyboard navigation (Tab key) creates a strong serial position curve through focus order',
          'Skip navigation links help users jump to key positions, counteracting the effect',
          'ARIA landmarks create sub-sequences that can reset the serial position curve',
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
        title: 'Strategic Tab Bar Ordering',
        description:
          'Mobile app bottom navigation placing most important actions at edges',
        code: `<nav class="tab-bar" role="tablist">
  <!-- Position 1 (Primacy): Most used action -->
  <a class="tab active" role="tab" aria-selected="true">
    <span class="icon">🏠</span>
    <span class="label">Home</span>
  </a>

  <!-- Positions 2-4 (Middle): Secondary actions -->
  <a class="tab" role="tab">
    <span class="icon">🔍</span>
    <span class="label">Search</span>
  </a>
  <a class="tab" role="tab">
    <span class="icon">📋</span>
    <span class="label">Activity</span>
  </a>
  <a class="tab" role="tab">
    <span class="icon">💬</span>
    <span class="label">Messages</span>
  </a>

  <!-- Position 5 (Recency): Key action / identity -->
  <a class="tab" role="tab">
    <span class="icon">👤</span>
    <span class="label">Profile</span>
  </a>
</nav>`,
        explanation:
          'Home (most used) occupies the first position for primacy advantage. Profile (identity/settings hub) occupies the last position for recency advantage. Secondary features like Search, Activity, and Messages sit in the middle where exact recall matters less because users access them through deliberate navigation.',
        principle:
          'Place highest-priority items at the first and last positions in any navigation sequence',
        metrics: {
          before: 'Random tab ordering: 45% of taps on Home, 8% on Profile',
          after: 'Strategic ordering: 52% of taps on Home, 18% on Profile',
          improvement: '15% increase in Home usage, 125% increase in Profile engagement',
        },
      },
      {
        title: 'Feature List with Strategic Ordering',
        description:
          'SaaS landing page ordering features to maximize recall of key differentiators',
        code: `<section class="features">
  <h2>Why Teams Choose Us</h2>
  <ol class="feature-list">
    <!-- First: Most compelling differentiator -->
    <li class="feature primary">
      <h3>AI-Powered Insights</h3>
      <p>Automatic pattern detection across all your data sources</p>
    </li>

    <!-- Middle: Important but less differentiating -->
    <li class="feature">
      <h3>Real-Time Collaboration</h3>
      <p>Work together with unlimited team members</p>
    </li>
    <li class="feature">
      <h3>Custom Dashboards</h3>
      <p>Build exactly the views you need</p>
    </li>
    <li class="feature">
      <h3>Data Import</h3>
      <p>Connect 200+ data sources in one click</p>
    </li>

    <!-- Last: Strong closing differentiator -->
    <li class="feature primary">
      <h3>Enterprise Security</h3>
      <p>SOC 2 Type II certified with end-to-end encryption</p>
    </li>
  </ol>
</section>`,
        explanation:
          'AI-Powered Insights leads the list (primacy) to set high expectations. Enterprise Security closes the list (recency) to leave a lasting impression of trust. The middle features are valuable but more commodity; their exact recall matters less.',
        principle:
          'Anchor feature lists with your strongest differentiators at first and last positions',
      },
      {
        title: 'Onboarding Flow with Strong Bookends',
        description:
          'Multi-step onboarding that starts and ends with memorable moments',
        code: `<div class="onboarding-flow">
  <!-- Step 1 (Primacy): Impressive "wow" moment -->
  <div class="step step-1 active">
    <h2>Welcome! Watch your data come alive</h2>
    <div class="demo-animation">
      <!-- Animated visualization of sample data -->
    </div>
    <p>This is what your dashboard will look like in 2 minutes.</p>
  </div>

  <!-- Steps 2-4 (Middle): Routine setup -->
  <div class="step step-2">
    <h2>Connect your data source</h2>
    <!-- Standard integration form -->
  </div>
  <div class="step step-3">
    <h2>Invite your team</h2>
    <!-- Email invitation form -->
  </div>
  <div class="step step-4">
    <h2>Choose your preferences</h2>
    <!-- Settings selection -->
  </div>

  <!-- Step 5 (Recency): Memorable completion -->
  <div class="step step-5">
    <h2>You're all set! Here's your first insight</h2>
    <div class="first-insight">
      <p class="insight">"Your team is 23% more productive on Tuesdays"</p>
    </div>
    <button class="primary">Explore Your Dashboard</button>
  </div>
</div>`,
        explanation:
          'The first step creates a "wow" moment with an animated preview, leveraging primacy to set positive expectations. The final step delivers an immediate personalized insight, leveraging recency to leave users feeling the product is already valuable. Middle steps handle mundane setup that users forget quickly anyway.',
        principle:
          'Bookend multi-step flows with memorable moments; routine steps belong in the middle',
        metrics: {
          before: 'Standard onboarding: 62% completion rate, 3.2/5 satisfaction',
          after: 'Bookended onboarding: 78% completion rate, 4.4/5 satisfaction',
          improvement: '26% higher completion, 38% higher satisfaction',
        },
      },
    ],

    bad: [
      {
        title: 'Key Action Buried in Middle of Menu',
        description:
          'Settings menu placing critical "Security" option in the forgettable middle',
        code: `<!-- DON'T DO THIS -->
<ul class="settings-menu">
  <li>Display</li>
  <li>Notifications</li>
  <li>Language</li>
  <li>Security & Privacy</li>  <!-- Critical item buried in middle! -->
  <li>Integrations</li>
  <li>Storage</li>
  <li>About</li>
</ul>`,
        explanation:
          'Security & Privacy is arguably the most important settings option, yet it sits at position 4 of 7 — the absolute dead center of the serial position curve. Users scanning this menu will remember Display (first) and About (last) but consistently overlook Security. This is especially dangerous because security settings often require user attention.',
        principle:
          'Never bury critical actions in the middle of a list; place them at positions 1 or last',
      },
      {
        title: 'Too Many Navigation Items',
        description:
          'Tab bar with 8 items, creating a massive middle dead zone',
        code: `<!-- DON'T DO THIS -->
<nav class="tab-bar">
  <a class="tab">Home</a>
  <a class="tab">Search</a>
  <a class="tab">Trending</a>
  <a class="tab">Create</a>
  <a class="tab">Messages</a>
  <a class="tab">Notifications</a>
  <a class="tab">Saved</a>
  <a class="tab">Profile</a>
</nav>`,
        explanation:
          'With 8 items, positions 3 through 6 (Trending, Create, Messages, Notifications) fall into the serial position dead zone. Users will remember Home and Profile but struggle to recall the middle 4 items. The tab bar also becomes cramped on mobile, compounding the problem. Critical actions like Create and Messages are lost.',
        principle:
          'Limit navigation to 5 items maximum to minimize the middle dead zone',
      },
      {
        title: 'Cancel/Unsubscribe Hidden in Middle',
        description:
          'Account page deliberately burying the cancel option in a long list',
        code: `<!-- DON'T DO THIS -->
<ul class="account-options">
  <li>Edit Profile</li>
  <li>Billing Information</li>
  <li>Payment Methods</li>
  <li>Subscription Plan</li>
  <li>Cancel Subscription</li>  <!-- Deliberately buried -->
  <li>Referral Program</li>
  <li>Help & Support</li>
  <li>Privacy Settings</li>
  <li>Log Out</li>
</ul>`,
        explanation:
          'Deliberately exploiting serial position effect to hide "Cancel Subscription" at position 5 of 9 is a dark pattern. While this may reduce cancellations short-term, it creates user frustration, damages trust, and may violate consumer protection regulations in many jurisdictions.',
        principle:
          'Never weaponize serial position effect to hide user rights or critical actions',
      },
    ],

    realWorld: [
      {
        company: 'Apple',
        product: 'iOS Tab Bar (5-item pattern)',
        url: 'https://developer.apple.com/design/human-interface-guidelines/tab-bars',
        description:
          'Apple\'s Human Interface Guidelines recommend a maximum of 5 tabs in bottom navigation. Apps like Phone (Favorites, Recents, Contacts, Keypad, Voicemail) place the most-used action first and the most-needed-for-completion action last. The pattern is so consistent that iOS users can predict tab positions across apps.',
        effectiveness: 'very-effective',
        analysis:
          'The 5-item tab bar is the gold standard for mobile navigation precisely because it minimizes the serial position dead zone. With only 5 items, only positions 2-4 are "middle" — and position 3 is often given a visually distinct treatment (larger icon, accent color) to compensate.',
      },
      {
        company: 'Google',
        product: 'Search Results Page',
        url: 'https://www.google.com',
        description:
          'Google displays 10 organic results per page. Positions 1-3 (primacy) receive the vast majority of clicks, while position 10 (recency, last on page) gets more clicks than positions 6-9. This creates the classic serial position U-curve in click-through rates.',
        effectiveness: 'very-effective',
        analysis:
          'Google Search is one of the largest natural demonstrations of the serial position effect. CTR data consistently shows a U-shaped curve: position 1 gets ~30% CTR, positions 5-7 drop to ~2-4%, and position 10 recovers slightly to ~3%. The effect is so strong that entire industries (SEO) exist around it.',
      },
      {
        company: 'Spotify',
        product: 'Playlist and Queue Ordering',
        url: 'https://www.spotify.com',
        description:
          'Spotify places algorithmically recommended "top picks" at the beginning of auto-generated playlists (Discover Weekly, Daily Mix) and ends with familiar favorites. Middle tracks are more experimental. Users consistently rate playlists higher when they recognize the first and last songs.',
        effectiveness: 'effective',
        analysis:
          'By leveraging primacy (strong opener) and recency (satisfying closer), Spotify increases playlist completion rates and satisfaction scores. The middle of the playlist is where the algorithm takes risks with unfamiliar music — the position where forgetting is an advantage for discovery.',
      },
      {
        company: 'Restaurant Industry',
        product: 'Menu Design',
        description:
          'Restaurant menu designers consistently place high-margin items at the top and bottom of each section. The first item listed (primacy) and the last item before the next section heading (recency) receive disproportionate orders. Eye-tracking studies confirm diners spend 2-3x longer looking at edge positions.',
        effectiveness: 'very-effective',
        analysis:
          'The restaurant industry has empirically optimized for serial position effect for decades. High-margin "chef specials" are placed first, and premium items close each section. This is one of the oldest and most validated applications of the effect in commercial design.',
      },
    ],

    abTests: [
      {
        title: 'Tab Bar Order: Strategic vs Alphabetical',
        hypothesis:
          'Placing key actions at first and last tab positions will increase engagement over alphabetical ordering',
        controlVersion: {
          description:
            'Bottom tab bar with 5 items in alphabetical order: Activity, Home, Messages, Profile, Search',
          metrics: {
            conversionRate: '34%',
            clickThroughRate: 'Home: 28%, Profile: 11%, Search: 22%',
            timeOnPage: '4:12 avg session',
          },
        },
        treatmentVersion: {
          description:
            'Bottom tab bar with 5 items in strategic order: Home, Search, Activity, Messages, Profile',
          metrics: {
            conversionRate: '41%',
            clickThroughRate: 'Home: 38%, Profile: 19%, Search: 18%',
            timeOnPage: '5:34 avg session',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Strategic positioning increased Home engagement by 36% (primacy) and Profile engagement by 73% (recency). Overall session duration increased 32% as users could more easily navigate to core functions. Search dropped slightly from position 1 to position 2 but remained healthy.',
          learnings: [
            'First and last tab positions receive significantly more engagement',
            'Alphabetical ordering wastes primacy and recency advantages',
            'The middle position (3 of 5) had lowest engagement regardless of what item was placed there',
            'Users adapted to the new ordering within 2 sessions, building spatial memory',
          ],
        },
      },
      {
        title: 'Feature List Ordering: Key Features at Edges vs Random',
        hypothesis:
          'Placing strongest features at the first and last positions will increase recall and conversion',
        controlVersion: {
          description:
            'Landing page with 6 features in development-priority order (how they were built)',
          metrics: {
            conversionRate: '5.1%',
            scrollDepth: '52%',
          },
        },
        treatmentVersion: {
          description:
            'Same 6 features reordered: strongest differentiator first, second strongest last, commodity features in middle',
          metrics: {
            conversionRate: '7.8%',
            scrollDepth: '71%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Reordering features to leverage serial position effect increased conversion by 53% and scroll depth by 37%. In follow-up recall surveys, users in the treatment group correctly recalled the first and last features 80% of the time vs 45% for control group middle-positioned equivalents.',
          learnings: [
            'Feature ordering has measurable impact on conversion even when features are identical',
            'Users who recalled more features were 2x more likely to convert',
            'The "bookend" strategy (strong open + strong close) outperformed "best feature first" alone',
            'Middle features showed no significant difference in recall regardless of ordering strategy',
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
        name: 'Navigation Item Count',
        description:
          'Tab bars, menus, or navigation lists with more than 5 items, creating a large middle dead zone',
        howToSpot:
          'Count items in primary navigation. More than 5 items means the serial position dead zone is significant.',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Critical Items in Middle Positions',
        description:
          'Important actions, features, or content placed in the middle of a list or sequence',
        howToSpot:
          'Identify the most important items in a list and check if they occupy positions other than first or last',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Uniform List Styling',
        description:
          'Long lists where all items have identical styling, offering no visual compensation for middle-position disadvantage',
        howToSpot:
          'Look for lists of 5+ items with no visual differentiation. Middle items will be forgotten without positional or stylistic emphasis.',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Sequential Content Without Bookends',
        description:
          'Multi-step flows, carousels, or content sequences that lack a strong opening or closing moment',
        howToSpot:
          'Check the first and last steps of wizards, onboarding flows, or tutorials. Weak bookends waste primacy and recency.',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Dark Pattern: Hidden Actions in Middle',
        description:
          'Critical user actions (cancel, unsubscribe, delete account) deliberately placed in middle positions of long lists',
        howToSpot:
          'Look for important user-rights actions buried in positions 3-7 of 8+ item lists. This is an intentional exploitation of serial position effect.',
        severity: ImpactLevel.CRITICAL,
      },
    ],

    patterns: [
      {
        name: 'Edge-Position Strategy',
        description: 'Key items deliberately placed at first and last positions in navigation or lists',
        indicators: [
          'Most-used action is the first navigation item',
          'Important CTA or identity item is the last navigation item',
          'Less critical items occupy middle positions',
          'Navigation has 5 or fewer items',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Middle Dead Zone Problem',
        description: 'Important content or actions lost in the middle of long sequences',
        indicators: [
          'Critical features at positions 3-5 of 7+ item lists',
          'Key menu actions buried in the middle',
          'Important form fields in the center of long forms',
          'Primary CTA in the middle of a content sequence',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Bookend Content Pattern',
        description: 'Strong opening and closing content framing a multi-step or sequential experience',
        indicators: [
          'Onboarding starts with impressive demo or preview',
          'Tutorial ends with achievement or personalized result',
          'Landing page opens with hero and closes with strong CTA',
          'Email opens with key message and closes with action',
        ],
        severity: ImpactLevel.MEDIUM,
        confidence: 'high',
      },
      {
        name: 'Navigation Overload Pattern',
        description: 'Too many items in primary navigation, expanding the serial position dead zone',
        indicators: [
          'Tab bars with 6+ items',
          'Primary navigation with 8+ links',
          'Dropdown menus with 10+ unstructured items',
          'Sidebar with 15+ uncategorized links',
        ],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
    ],

    checklistQuestions: [
      'How many items are in the primary navigation? Is it 5 or fewer?',
      'What occupies the first and last positions in each list or menu?',
      'Are the most important actions placed at edge positions (first/last)?',
      'Is there any critical content buried in the middle of a long list?',
      'Do multi-step flows have strong, memorable opening and closing steps?',
      'Are there dark patterns hiding user-rights actions in middle positions?',
      'Could any long lists be shortened or paginated to reduce the dead zone?',
      'Is visual differentiation used to compensate for middle-position disadvantage?',
      'Are navigation items consistent in position across all views and states?',
      'Have you tested recall of items at different positions in your key sequences?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in the serial position effect (primacy and recency).

Analyze the provided design for serial position effect patterns. Identify:

1. **Navigation Structure**: Tab bars, menus, sidebars — item count and ordering strategy
2. **Content Sequencing**: Feature lists, onboarding flows, content feeds — what occupies edge positions
3. **Middle Dead Zones**: Critical items buried in middle positions of long lists
4. **Bookend Strategy**: Whether multi-step experiences have strong opening and closing moments
5. **Dark Patterns**: Important user actions (cancel, unsubscribe) deliberately hidden in middle positions

For each pattern found:
- Identify the items at positions 1, last, and middle
- Assess whether the ordering serves user goals or business manipulation
- Determine if critical items are appropriately positioned
- Evaluate navigation length (5 items or fewer is optimal)
- Suggest reordering to leverage primacy and recency ethically

Consider:
- Are the most important items at the first and last positions?
- Could the list be shortened to reduce the middle dead zone?
- Do multi-step flows waste the primacy/recency advantage on mundane steps?
- Is the serial position effect being exploited to hide important user actions?
- Are screen reader and keyboard users experiencing the same positional advantages?

Provide actionable recommendations for ethical, effective use of serial position effect.`,

    outputSchema: {
      type: 'object',
      properties: {
        positionPatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              element: { type: 'string' },
              totalItems: { type: 'number' },
              firstPosition: { type: 'string' },
              lastPosition: { type: 'string' },
              middleItems: { type: 'string' },
              assessment: { type: 'string' },
              deadZoneRisk: { type: 'string' },
              recommendation: { type: 'string' },
            },
            required: [
              'element',
              'totalItems',
              'firstPosition',
              'lastPosition',
              'assessment',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            navigationEfficiency: { type: 'number' },
            positioningStrategy: { type: 'number' },
            middleDeadZoneRisk: { type: 'number' },
            ethicalScore: { type: 'number' },
          },
          required: [
            'navigationEfficiency',
            'positioningStrategy',
            'middleDeadZoneRisk',
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
        'positionPatterns',
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
        title: 'Audit Current Sequences',
        description:
          'Identify all sequential UI elements: navigation bars, menus, feature lists, onboarding flows, content feeds',
        example:
          'Map every list or sequence in the app: bottom tab bar (5 items), settings menu (9 items), onboarding (6 steps), feature page (8 features)',
        tips: [
          'Document the current position of every item in each sequence',
          'Identify which items are most critical for user success',
          'Note any sequences with more than 5-7 items',
        ],
      },
      {
        step: 2,
        title: 'Prioritize Items by Importance',
        description:
          'Rank items in each sequence by frequency of use, business value, and user need',
        example:
          'Tab bar items ranked: Home (daily use), Profile (daily), Search (frequent), Messages (moderate), Activity (occasional)',
        tips: [
          'Use analytics data to determine actual usage frequency',
          'Consider both user goals and business goals',
          'Identify which items absolutely must be recalled and found easily',
        ],
      },
      {
        step: 3,
        title: 'Place Key Items at Edges',
        description:
          'Position the top 2 most important items at the first and last positions in each sequence',
        example:
          'Tab bar: Home (position 1) and Profile (position 5). Feature list: AI Insights (first) and Enterprise Security (last).',
        tips: [
          'First position (primacy) is best for the single most important item',
          'Last position (recency) is best for the second most important or the completion action',
          'If both are equally important, the first position has a slight edge for long-term recall',
        ],
      },
      {
        step: 4,
        title: 'Reduce Sequence Length',
        description:
          'Shorten lists to 5-7 items to minimize the middle dead zone. Group or hide less critical items.',
        example:
          'Reduce settings menu from 9 items to 5 by grouping: Account, Security, Preferences, Integrations, About. Move sub-items into each group.',
        tips: [
          'The optimal navigation length is 5 items (minimal dead zone)',
          'Use progressive disclosure: show top items, hide rest under "More"',
          'Group related items to create sub-sequences with their own edge positions',
        ],
      },
      {
        step: 5,
        title: 'Compensate for Middle Positions',
        description:
          'Use visual differentiation to help middle-positioned items compete for attention',
        example:
          'In a 5-item tab bar, give the center item (position 3) a larger icon, accent color, or badge indicator',
        tips: [
          'Use color, size, or iconography to boost middle items when needed',
          'Add notification badges or indicators to draw attention',
          'Consider the "center stage" pattern: making the middle item visually distinct',
        ],
      },
      {
        step: 6,
        title: 'Test and Measure Position Impact',
        description:
          'A/B test item ordering and measure recall, engagement, and task completion for each position',
        example:
          'Test current ordering vs strategic ordering. Measure tap rates per position, recall surveys, and task completion time.',
        tips: [
          'Track engagement metrics per position, not just per item',
          'Run recall tests: ask users which items they remember from navigation',
          'Monitor whether reordering improves task completion for key flows',
        ],
      },
    ],

    dos: [
      'Place the most important navigation items at the first and last positions',
      'Limit primary navigation to 5 items to minimize the serial position dead zone',
      'Start onboarding and tutorial flows with a compelling, memorable moment',
      'End multi-step sequences with a satisfying achievement or clear CTA',
      'Use visual differentiation to compensate when critical items must be in middle positions',
      'Maintain consistent item positions across all views and states',
      'Test item recall at different positions to validate your ordering strategy',
      'Group long lists into sections, creating sub-sequences with new edge positions',
    ],

    donts: [
      'Don\'t bury critical actions (cancel, security, delete) in the middle of long lists',
      'Don\'t use alphabetical ordering for navigation without considering position impact',
      'Don\'t create tab bars or primary navigation with more than 5-7 items',
      'Don\'t place mundane or routine content at the first or last position of sequences',
      'Don\'t change navigation ordering between views or states',
      'Don\'t ignore the serial position effect when designing feature lists or marketing content',
      'Don\'t exploit the middle dead zone to hide unsubscribe, cancel, or delete options',
      'Don\'t assume all items in a list receive equal attention from users',
    ],

    bestPractices: [
      {
        title: 'The 5-Item Rule',
        description:
          'Limit primary navigation to 5 items maximum. With 5 items, only positions 2-4 are "middle," and users can recall all 5 with reasonable accuracy.',
        rationale:
          'Research shows recall drops significantly for items beyond position 5. Miller\'s Law (7 plus or minus 2) intersects with serial position to make 5 the sweet spot for navigation.',
        example:
          'iOS tab bar pattern: 5 items, most-used at edges, with "More" for additional items',
      },
      {
        title: 'Bookend Strategy for Sequences',
        description:
          'Design the first and last steps of any multi-step experience to be the most memorable and impactful',
        rationale:
          'Primacy sets expectations; recency determines lasting impression. Routine setup belongs in the middle where forgetting is acceptable.',
        example:
          'Onboarding: Step 1 shows a "wow" demo, Steps 2-4 handle setup, Step 5 delivers a personalized insight',
      },
      {
        title: 'Center Stage Compensation',
        description:
          'When a critical item must occupy a middle position, use visual differentiation to compensate for the positional disadvantage',
        rationale:
          'Visual salience (size, color, shape) can partially offset the serial position dead zone by creating a Von Restorff effect (isolation effect)',
        example:
          'Instagram places "Create" at center position with a distinct plus-icon design, larger than surrounding tabs',
      },
      {
        title: 'Sectioning Long Lists',
        description:
          'Break long lists into logical sections with headings, creating multiple sub-sequences each with their own primacy/recency edges',
        rationale:
          'Section breaks reset the serial position curve. A 20-item list broken into 4 sections of 5 has 8 edge positions instead of 2.',
        example:
          'Settings: "Account" section (3 items), "Privacy" section (3 items), "Appearance" section (3 items) instead of one flat list of 9',
      },
      {
        title: 'Consistent Spatial Memory',
        description:
          'Keep navigation items in the same position across all pages, states, and device orientations',
        rationale:
          'Users build spatial memory for item locations. Moving items between positions forces re-learning and breaks the serial position advantage.',
        example:
          'Tab bar items remain in the same order on all screens; sidebar links maintain position even when sections expand/collapse',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '1.3.2',
        guideline:
          'Meaningful Sequence - Ensure DOM order matches the intended serial position strategy',
        implementation:
          'Use proper DOM ordering so screen readers encounter first-position items first. Don\'t rely on CSS flexbox order or grid placement to reposition items visually while leaving DOM order different.',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.4.3',
        guideline:
          'Focus Order - Keyboard focus order should reflect the strategic item positioning',
        implementation:
          'Ensure tabindex and focus order align with the intended serial position. The first Tab press should land on the most important navigation item.',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.4.5',
        guideline:
          'Multiple Ways - Provide alternative navigation methods beyond positional memory',
        implementation:
          'Supplement positional navigation with search, breadcrumbs, or site maps so users who cannot rely on spatial memory can still find items efficiently.',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.4.6',
        guideline:
          'Headings and Labels - Use clear headings to create sub-sequences in long lists',
        implementation:
          'Break long lists into headed sections so assistive technology users can jump between section edges, resetting the serial position curve.',
      },
    ],

    ethics: [
      {
        concern: 'Hiding Cancellation Options',
        severity: 'critical',
        explanation:
          'Deliberately placing "cancel subscription" or "delete account" in the middle of long lists to exploit the serial position dead zone',
        mitigation:
          'Place important user-rights actions in predictable, prominent positions. Many jurisdictions now legally require easy-to-find cancellation options.',
      },
      {
        concern: 'Manipulative Feature Ordering',
        severity: 'medium',
        explanation:
          'Placing misleading or exaggerated features at edge positions to inflate perceived product value',
        mitigation:
          'Ensure features listed at primacy and recency positions are accurate and representative of actual product capabilities.',
      },
      {
        concern: 'Burying Disclosures',
        severity: 'high',
        explanation:
          'Placing important legal disclosures, terms, or warnings in middle positions of content sequences where they will be overlooked',
        mitigation:
          'Important disclosures should be positioned at the beginning or end of sequences, or isolated from lists entirely with distinct visual treatment.',
      },
      {
        concern: 'Exploiting Position for Dark Patterns',
        severity: 'critical',
        explanation:
          'Using serial position knowledge to hide opt-out options, privacy controls, or complaint mechanisms in the dead zone of long menus',
        mitigation:
          'Audit all user-rights and privacy-related actions for positional visibility. These should never be disadvantaged by serial position.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'Memory: A Contribution to Experimental Psychology',
        author: 'Ebbinghaus, H.',
        year: 1885,
        description:
          'The foundational work that first documented the serial position effect through systematic experiments with nonsense syllable lists',
        type: 'foundational',
      },
      {
        title: 'The Serial Position Effect of Free Recall',
        author: 'Murdock, B. B.',
        year: 1962,
        doi: '10.1037/h0045106',
        description:
          'The landmark paper that established the U-shaped serial position curve and distinguished primacy from recency mechanisms',
        type: 'foundational',
      },
      {
        title: 'Two Storage Mechanisms in Free Recall',
        author: 'Glanzer, M., & Cunitz, A. R.',
        year: 1966,
        doi: '10.1016/S0022-5371(66)80044-0',
        description:
          'Demonstrated that primacy and recency effects arise from separate memory systems (long-term vs short-term)',
        type: 'advanced',
      },
      {
        title: 'Implications of Short-Term Memory for a General Theory of Memory',
        author: 'Atkinson, R. C., & Shiffrin, R. M.',
        year: 1968,
        description:
          'The multi-store memory model that explains the dual mechanisms behind the serial position effect',
        type: 'foundational',
      },
    ],

    books: [
      {
        title: 'Memory: A Contribution to Experimental Psychology',
        author: 'Ebbinghaus, Hermann',
        year: 1885,
        description:
          'The original monograph documenting forgetting curves and serial position effects — the starting point for modern memory research',
        type: 'foundational',
      },
      {
        title: 'Cognitive Psychology',
        author: 'Sternberg, Robert J., & Sternberg, Karin',
        year: 2016,
        isbn: '9781305644656',
        description:
          'Comprehensive coverage of serial position effect in the context of memory models, with experimental evidence and design implications',
        type: 'foundational',
      },
      {
        title: 'Laws of UX',
        author: 'Yablonski, Jon',
        year: 2020,
        isbn: '9781492055310',
        description:
          'Practical guide to applying serial position effect and other psychological principles in UX design',
        type: 'practical',
      },
    ],

    articles: [
      {
        title: 'Serial Position Effect: How to Create Better User Interfaces',
        author: 'Interaction Design Foundation',
        url: 'https://www.interaction-design.org/literature/article/serial-position-effect',
        description:
          'Practical guide to applying the serial position effect in navigation, content, and interface design',
        type: 'practical',
      },
      {
        title: 'The Serial Position Effect: Why ABC and XYZ Stand Out',
        author: 'Nielsen Norman Group',
        url: 'https://www.nngroup.com/articles/serial-position-effect/',
        description:
          'UX-focused analysis of how serial position affects usability and navigation design',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'Serial Position Effect in UX Design',
        author: 'NNgroup',
        url: 'https://www.youtube.com/watch?v=ZiQMfuRDqJM',
        description:
          'Video explanation of how primacy and recency shape user behavior in interfaces',
        type: 'practical',
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
