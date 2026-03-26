/**
 * IKEA EFFECT
 */


import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const ikeaEffect: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'ikea-effect',
    name: 'Ikea Effect',
    aliases: [],
    category: BiasCategory.DECISION_MAKING,
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
    simple: 'People value things more when they helped build or create them.',

    detailed: `The IKEA Effect is the cognitive bias where people place disproportionately high value on products they partially created or assembled themselves. The act of creation - even minimal involvement - creates emotional attachment and perceived value far beyond the object's intrinsic worth.

Named after IKEA furniture (which customers assemble themselves), this effect shows that effort invested creates value. A self-assembled bookshelf feels more valuable than an identical pre-assembled one, not because it's better, but because "I made it."

In design, this suggests powerful opportunities for user customization, personalization, and co-creation. Let users contribute even a little, and they'll value the product more highly, forgive its flaws, and become emotionally invested in its success.`,

    psychologyBasis: {
      discoveredBy: 'Various Researchers',
      year: 1970,
      theory: 'Cognitive Bias Research',
      mechanism: `People place disproportionately high value on things they helped create, even partially. This happens because:

1. **Effort Justification**: The brain rationalizes invested effort by inflating the perceived value of the outcome — "I worked hard on this, so it must be good"
2. **Competence Signaling**: Successful creation affirms self-competence, and the product becomes a symbol of that competence
3. **Psychological Ownership**: Even partial involvement in creation triggers a sense of ownership that extends beyond legal possession
4. **Emotional Attachment**: The act of building forges an emotional bond with the object, similar to how parents bond with children through caregiving
5. **Completion Bias**: Successfully finishing a creation task triggers dopamine reward, associating positive feelings with the result

Critically, the effect requires successful completion — abandoned or failed creations do not receive the valuation boost. The effort must feel meaningful, not frustrating.`,
    },

    realWorldExample: `Norton's study had participants fold origami. They valued their amateur creations as highly as expert work - willing to pay 5x more for their own clumsy crane than for an expert's. Observers saw the true quality gap, but creators were blind to flaws, valuing effort over outcome.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `The IKEA Effect profoundly shapes how users perceive value, commitment, and satisfaction in digital products. When users invest effort in customizing, building, or configuring something, they develop emotional ownership and inflated perceived value. Designers can leverage this to:

- Increase product stickiness through customization features that make users co-creators
- Boost perceived value by letting users configure, personalize, or assemble experiences
- Drive retention through user-generated content and co-creation tools
- Reduce churn by building emotional investment through setup wizards and configuration flows
- Create evangelists — users who built something themselves will defend and promote it`,

    whenToUse: [
      {
        title: 'Onboarding & Setup Wizards',
        scenario:
          'When new users are configuring their workspace, dashboard, or profile for the first time',
        example:
          'Notion-style workspace setup where users choose layout, name spaces, and pick templates — creating a workspace that feels "theirs" from minute one',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Customization & Personalization',
        scenario: 'When users can modify templates, themes, or layouts to match their preferences',
        example:
          'Canva lets users start from a template and customize colors, fonts, images — even small tweaks make the design feel personally created',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Product Configuration',
        scenario: 'When offering products or services with configurable options',
        example:
          'Nike By You lets customers choose colors, materials, and add personal text to shoes — each pair feels uniquely crafted by the buyer',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'User-Generated Content Tools',
        scenario: 'When providing tools for users to create and share their own content',
        example:
          'Minecraft gives players blocks and tools to build anything — creations become deeply personal and valued far beyond their objective quality',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'DIY Templates & Starter Kits',
        scenario: 'When helping users build something from a structured starting point',
        example:
          'Shopify theme customizer lets store owners adjust a starter template into "their" storefront, building ownership without requiring design skills',
        impact: ImpactLevel.MEDIUM,
      },
      {
        title: 'Progressive Profile Building',
        scenario: 'When gradually collecting user preferences to create a personalized experience',
        example:
          'Spotify asks users to pick favorite artists during onboarding, then builds a "your music" experience that feels co-created',
        impact: ImpactLevel.MEDIUM,
      },
    ],

    whenToAvoid: [
      {
        title: 'Complex Mandatory Setup',
        reason:
          'Forcing extensive customization before users can access core value creates frustration, not ownership',
        consequence:
          'High abandonment rates during onboarding — users quit before reaching the payoff',
        alternative:
          'Provide sensible defaults with optional customization. Let users experience value first, then invite personalization',
      },
      {
        title: 'Frustrating Configuration',
        reason:
          'If the creation process is too difficult or error-prone, the IKEA Effect reverses — failed effort breeds resentment',
        consequence:
          'Users associate the product with frustration instead of accomplishment, increasing churn',
        alternative:
          'Ensure creation tasks are achievable with clear guidance, undo support, and progressive complexity',
      },
      {
        title: 'Time-Critical Tasks',
        reason:
          'When users need to accomplish something quickly, forced customization feels like an obstacle',
        consequence:
          'Users resent being slowed down and associate the product with wasted time',
        alternative:
          'Offer pre-built options for speed, with customization as an optional enhancement later',
      },
      {
        title: 'Expert-Level Tools Without Support',
        reason:
          'Exposing novice users to expert-level creation tools without scaffolding leads to failure',
        consequence:
          'Incomplete creations do not trigger the IKEA Effect — they trigger abandonment',
        alternative:
          'Provide guided creation paths, templates, and progressive disclosure of advanced options',
      },
    ],

    commonMistakes: [
      {
        title: 'Too Much Effort Required',
        description:
          'Making the customization or creation process so complex that most users cannot complete it',
        why: 'The IKEA Effect requires successful completion — abandoned efforts produce frustration, not value',
        fix: 'Find the "Goldilocks zone" of effort: enough to feel meaningful, not enough to overwhelm. Provide guardrails, templates, and undo.',
      },
      {
        title: 'Trivial Customization',
        description:
          'Offering only superficial personalization (e.g., pick a color) that feels meaningless',
        why: 'If the effort feels trivial, users do not develop real ownership or attachment',
        fix: 'Ensure customization meaningfully changes the user experience. Let users shape structure, not just decoration.',
      },
      {
        title: 'No Visible Outcome',
        description:
          'Users invest effort in configuration but the result is not clearly visible or celebrated',
        why: 'Without seeing the fruit of their labor, users cannot form attachment to it',
        fix: 'Show a clear before/after, celebrate completion, and keep the user\'s creation prominently visible.',
      },
      {
        title: 'Blocking Core Value Behind Setup',
        description:
          'Requiring extensive customization before users can access the product at all',
        why: 'Users who have not yet experienced the product\'s value have no motivation to invest effort',
        fix: 'Use progressive onboarding: deliver value first, then invite customization once users understand what they are personalizing.',
      },
      {
        title: 'No Undo or Recovery',
        description:
          'Users who make customization mistakes and cannot undo them feel trapped, not empowered',
        why: 'Fear of irreversible mistakes suppresses experimentation, which is essential for the IKEA Effect',
        fix: 'Provide robust undo, version history, and "reset to default" options throughout the creation flow.',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.HIGH,
        description:
          'Layout customization is one of the strongest triggers for the IKEA Effect — rearranging elements makes the space feel personally owned',
        examples: [
          'Drag-and-drop dashboard widgets create personal workspaces',
          'Customizable sidebar navigation order increases ownership',
          'Rearrangeable card layouts let users build "their" view of data',
          'Resizable panels and columns give users architectural control',
        ],
      },
      typography: {
        level: ImpactLevel.LOW,
        description:
          'Typography choices in creation tools affect perceived quality of user-made content',
        examples: [
          'Font selection in design tools makes creations feel more polished',
          'Custom heading styles in documents increase perceived authorship',
          'Template typography presets help users achieve professional results',
          'Font pairing suggestions reduce decision fatigue in creation flows',
        ],
      },
      color: {
        level: ImpactLevel.MEDIUM,
        description:
          'Color customization is an accessible, low-effort way to trigger ownership',
        examples: [
          'Theme color pickers make interfaces feel personally branded',
          'Custom palette creation in design tools builds attachment',
          'Accent color selection during onboarding personalizes the experience immediately',
          'Color-coded categories that users define create organizational ownership',
        ],
      },
      interaction: {
        level: ImpactLevel.CRITICAL,
        description:
          'Interactive creation and configuration are the primary vehicles for the IKEA Effect in digital products',
        examples: [
          'Drag-and-drop builders trigger strong ownership through physical-feeling interaction',
          'Step-by-step configuration wizards build investment incrementally',
          'Real-time preview of customizations provides immediate creation feedback',
          'Inline editing makes users feel like authors, not just consumers',
        ],
      },
      content: {
        level: ImpactLevel.HIGH,
        description:
          'User-generated and user-customized content drives the deepest IKEA Effect engagement',
        examples: [
          'Template customization turns generic content into personal creations',
          'User-written descriptions, bios, and labels create content ownership',
          'Curated collections and playlists feel like personal creative works',
          'Custom naming of folders, projects, and items builds identity attachment',
        ],
      },
      accessibility: {
        level: ImpactLevel.HIGH,
        description:
          'Creation tools must be accessible to ensure all users can participate in the IKEA Effect',
        examples: [
          'Keyboard-navigable drag-and-drop ensures motor-impaired users can customize layouts',
          'Screen reader support in configuration wizards enables blind users to build ownership',
          'Color customization must include contrast checking for low-vision users',
          'Alternative input methods for creation tools (voice, switch, etc.) broaden participation',
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
        title: 'Canva Template Customization',
        description:
          'Canva lets users start from professional templates and customize every element, creating a design that feels personally crafted',
        code: `<div class="canva-editor">
  <div class="template-base">
    <h2 contenteditable="true">Your Company Name</h2>
    <p contenteditable="true">Your tagline goes here</p>
  </div>
  <div class="customization-panel">
    <div class="color-picker">
      <label>Brand Color</label>
      <input type="color" value="#6C63FF">
    </div>
    <div class="font-selector">
      <label>Heading Font</label>
      <select>
        <option>Montserrat</option>
        <option>Playfair Display</option>
        <option>Roboto</option>
      </select>
    </div>
    <div class="layout-options">
      <label>Layout</label>
      <button class="layout-btn active">Centered</button>
      <button class="layout-btn">Left-aligned</button>
      <button class="layout-btn">Split</button>
    </div>
  </div>
  <div class="creation-feedback">
    <span class="status">Your design is looking great!</span>
    <button class="primary">Download Your Creation</button>
  </div>
</div>`,
        explanation:
          'Users start with a professional template but customize colors, fonts, text, and layout. Each change makes the design feel more "theirs." The language ("Your design", "Your Creation") reinforces ownership. The result is professional quality with personal investment.',
        principle:
          'Structured templates with meaningful customization create the optimal balance of quality and ownership',
        metrics: {
          before: '23% of users returned within 7 days (pre-made designs only)',
          after: '61% of users returned within 7 days (template customization)',
          improvement: '165% increase in 7-day retention through co-creation',
        },
      },
      {
        title: 'Nike By You Custom Shoes',
        description:
          'Nike lets customers design custom shoes by choosing colors, materials, and personal text',
        code: `<div class="nike-configurator">
  <div class="shoe-preview">
    <img src="custom-shoe-3d.png" alt="Your custom Nike shoe">
    <span class="rotation-hint">Drag to rotate your design</span>
  </div>
  <div class="customization-steps">
    <div class="step active">
      <h3>Step 1: Base Color</h3>
      <div class="color-swatches">
        <button class="swatch selected" style="background: #1a1a1a"></button>
        <button class="swatch" style="background: #ffffff"></button>
        <button class="swatch" style="background: #e63946"></button>
        <button class="swatch" style="background: #457b9d"></button>
      </div>
    </div>
    <div class="step">
      <h3>Step 2: Swoosh Color</h3>
    </div>
    <div class="step">
      <h3>Step 3: Personal ID</h3>
      <input type="text" maxlength="6" placeholder="Your initials">
    </div>
  </div>
  <div class="progress-bar">
    <span>3 of 8 steps complete</span>
    <div class="bar"><div class="fill" style="width: 37.5%"></div></div>
  </div>
  <p class="ownership-message">Designed by you. Made by Nike.</p>
</div>`,
        explanation:
          'The step-by-step configurator breaks customization into manageable decisions. A 3D preview provides immediate feedback. Progress tracking builds investment. The tagline "Designed by you. Made by Nike." explicitly frames the user as co-creator, combining personal ownership with brand quality.',
        principle:
          'Step-by-step creation with real-time preview maximizes investment while preventing overwhelm',
        metrics: {
          before: 'Standard shoes: 2.1% return rate',
          after: 'Nike By You shoes: 0.4% return rate',
          improvement: '81% reduction in returns — people do not return what they created',
        },
      },
      {
        title: 'Notion Workspace Setup',
        description:
          'Notion onboarding guides users through building their personal workspace with templates and customization',
        code: `<div class="notion-onboarding">
  <h2>Build Your Workspace</h2>
  <p>Choose what matters to you. We'll set it up together.</p>

  <div class="use-case-grid">
    <button class="use-case selected">
      <span class="icon">📋</span>
      <span>Project Management</span>
    </button>
    <button class="use-case">
      <span class="icon">📝</span>
      <span>Notes & Docs</span>
    </button>
    <button class="use-case selected">
      <span class="icon">🎯</span>
      <span>Goals & OKRs</span>
    </button>
    <button class="use-case">
      <span class="icon">📚</span>
      <span>Knowledge Base</span>
    </button>
  </div>

  <div class="workspace-preview">
    <div class="sidebar-preview">
      <span class="page">📋 Projects</span>
      <span class="page">🎯 Goals Q1</span>
      <span class="page">📥 Inbox</span>
    </div>
    <p class="preview-label">Your workspace preview</p>
  </div>

  <button class="primary">Create My Workspace</button>
</div>`,
        explanation:
          'Users select their use cases, and the workspace preview updates in real-time. The sidebar preview shows "their" pages being built. The language ("Build Your Workspace", "Create My Workspace") frames onboarding as creation rather than configuration. Users leave onboarding feeling they built something.',
        principle:
          'Onboarding-as-creation transforms passive setup into active ownership building',
      },
      {
        title: 'Build-A-Bear Workshop Online',
        description:
          'Step-by-step bear creation with naming, outfitting, and a birth certificate',
        code: `<div class="bear-builder">
  <div class="creation-stages">
    <div class="stage completed">Choose</div>
    <div class="stage completed">Stuff</div>
    <div class="stage active">Dress</div>
    <div class="stage">Name</div>
  </div>

  <div class="bear-preview">
    <img src="custom-bear.png" alt="Your bear wearing a red hoodie">
  </div>

  <div class="outfit-options">
    <h3>Dress Your Bear</h3>
    <div class="outfits">
      <button class="outfit selected">Red Hoodie</button>
      <button class="outfit">Denim Jacket</button>
      <button class="outfit">Superhero Cape</button>
    </div>
  </div>

  <div class="birth-certificate-preview">
    <p class="certificate-title">Birth Certificate</p>
    <p>Name: <strong>Captain Snuggles</strong></p>
    <p>Born: <strong>March 20, 2026</strong></p>
    <p>Created by: <strong>You</strong></p>
  </div>
</div>`,
        explanation:
          'The multi-stage creation process (choose, stuff, dress, name) builds cumulative investment. The birth certificate formalizes ownership — this is not a product, it is a creation with an identity. Each step is simple enough that children can complete it, demonstrating ideal effort calibration.',
        principle:
          'Ceremonial completion (birth certificate) amplifies the IKEA Effect by formalizing the creation relationship',
      },
    ],

    bad: [
      {
        title: 'Mandatory Complex Configuration',
        description:
          'Forcing users through an extensive, confusing setup before they can use the product',
        code: `<!-- DON'T DO THIS -->
<div class="forced-setup">
  <h2>Complete Setup to Continue (Step 12 of 23)</h2>
  <div class="config-form">
    <label>API Endpoint Configuration</label>
    <input type="text" placeholder="https://api.yourservice.com/v2">

    <label>Webhook Secret Key</label>
    <input type="password" placeholder="Enter 64-character key">

    <label>CORS Origin Policy</label>
    <select>
      <option>Strict-Origin-When-Cross-Origin</option>
      <option>Same-Origin</option>
      <option>No-Referrer</option>
    </select>

    <label>Rate Limit Strategy</label>
    <textarea placeholder="JSON configuration..."></textarea>
  </div>
  <p class="warning">You cannot proceed without completing all fields.</p>
  <button disabled>Continue (12 required fields remaining)</button>
</div>`,
        explanation:
          'This forces technical configuration on all users with no defaults, no "skip" option, and no explanation of why each field matters. The 23-step process overwhelms rather than empowers. Users who cannot complete it will abandon — and incomplete creation produces frustration, not the IKEA Effect.',
        principle:
          'Forced, complex creation without scaffolding produces abandonment and resentment, not ownership',
      },
      {
        title: 'Customization Without Guidance or Undo',
        description:
          'Exposing users to a blank canvas with no templates, no suggestions, and no undo',
        code: `<!-- DON'T DO THIS -->
<div class="empty-builder">
  <h2>Build Your Dashboard</h2>
  <div class="empty-canvas" style="min-height: 600px; border: 2px dashed #ccc;">
    <p style="color: #999;">Drag widgets here to build your dashboard</p>
    <p style="color: #ccc; font-size: 0.8rem;">
      (No templates available. No undo. Changes are permanent.)
    </p>
  </div>
  <div class="widget-list">
    <div class="widget">Revenue Chart (requires data source config)</div>
    <div class="widget">KPI Card (requires metric definition)</div>
    <div class="widget">Custom SQL Table (requires query)</div>
  </div>
</div>`,
        explanation:
          'A blank canvas with complex widgets, no templates, and no undo is paralyzing. Users do not know where to start, fear making mistakes, and will either abandon or create something they are dissatisfied with. The IKEA Effect requires a sense of accomplishment, not anxiety.',
        principle:
          'Creation without scaffolding, guidance, or safety nets produces paralysis, not ownership',
      },
      {
        title: 'Superficial "Personalization" Theater',
        description:
          'Offering meaningless customization that does not actually change the experience',
        code: `<!-- DON'T DO THIS -->
<div class="fake-personalization">
  <h2>Personalize Your Experience!</h2>
  <div class="avatar-picker">
    <p>Choose your avatar</p>
    <div class="avatars">
      <img src="avatar1.png" alt="Blue circle">
      <img src="avatar2.png" alt="Green circle">
      <img src="avatar3.png" alt="Red circle">
    </div>
  </div>
  <p class="done">Great! Your experience is now personalized.</p>
  <!-- Avatar appears nowhere else in the product -->
</div>`,
        explanation:
          'Picking a colored circle that never appears again is not meaningful customization. Users see through performative personalization quickly. It generates cynicism rather than ownership, and may actually decrease trust ("if this is their idea of personalization...").',
        principle:
          'Token customization that does not meaningfully change the experience erodes trust instead of building ownership',
      },
    ],

    realWorld: [
      {
        company: 'IKEA',
        product: 'Flat-Pack Furniture',
        url: 'https://www.ikea.com',
        description: 'The namesake of the effect. IKEA sells furniture that customers assemble themselves. Despite identical materials and design, customers consistently rate self-assembled IKEA furniture as more valuable than equivalent pre-assembled furniture. The assembly process transforms a commodity into a personal creation.',
        effectiveness: 'very-effective',
        analysis: 'IKEA perfected the effort-to-value formula: clear instructions, achievable difficulty, and a tangible finished product. The assembly process is annoying enough to feel like work, but simple enough that nearly everyone succeeds. This is the benchmark for IKEA Effect implementation.',
      },
      {
        company: 'Nike',
        product: 'Nike By You (formerly NIKEiD)',
        url: 'https://www.nike.com/nike-by-you',
        description: 'Nike By You lets customers design custom shoes by choosing colors, materials, and adding personal text. Custom shoes cost 30-50% more than standard models, yet have dramatically lower return rates. Customers treat them as personal creations, not mere purchases.',
        effectiveness: 'very-effective',
        analysis: 'Nike nails the balance: meaningful customization (colors, materials, text) with constrained choices (you cannot design a bad shoe). The 3D preview provides instant feedback. Premium pricing actually reinforces perceived value — "I designed something worth paying more for."',
      },
      {
        company: 'Canva',
        product: 'Template-Based Design Tool',
        url: 'https://www.canva.com',
        description: 'Canva provides professional templates that users customize with their own colors, text, images, and layouts. Users consistently describe their designs as "I made this" even when 90% of the design came from the template. The editing process creates sufficient ownership.',
        effectiveness: 'very-effective',
        analysis: 'Canva demonstrates that even minimal customization triggers strong ownership when the end result looks professional. Templates lower the skill floor while customization builds the emotional ceiling. Users become evangelists for "their" designs.',
      },
      {
        company: 'Mojang (Microsoft)',
        product: 'Minecraft',
        url: 'https://www.minecraft.net',
        description: 'Minecraft gives players basic blocks and tools to build anything they imagine. Players invest hundreds of hours in creations that have no objective value outside the game. Creations are shared, defended, and mourned when lost — demonstrating extreme IKEA Effect.',
        effectiveness: 'very-effective',
        analysis: 'Minecraft is the purest digital IKEA Effect: zero templates, infinite possibility, and visible, persistent results. The depth of attachment players feel toward their creations — often crude by objective standards — perfectly illustrates how effort creates disproportionate value.',
      },
      {
        company: 'Subway',
        product: 'Build Your Own Sandwich',
        url: 'https://www.subway.com',
        description: 'Subway built an entire brand around customers choosing bread, protein, toppings, and sauces. Despite using standard ingredients, customers rate their custom sandwiches as better-tasting than equivalent pre-made sandwiches. The assembly line format makes creation visible and participatory.',
        effectiveness: 'effective',
        analysis: 'Subway proves the IKEA Effect works even with minimal creative input. Choosing from a menu of options (not truly "creating") is enough to trigger ownership. The visible assembly process reinforces participation. The lesson: even constrained choices build attachment.',
      },
    ],

    abTests: [
      {
        title: 'Onboarding: Guided Setup vs Skip-to-Dashboard',
        hypothesis:
          'Users who customize their workspace during onboarding will show higher retention than those who skip directly to a default dashboard',
        controlVersion: {
          description:
            'Default dashboard with a "Customize later" option. Users land on a pre-built workspace immediately.',
          metrics: {
            conversionRate: '72% completed onboarding',
            timeOnPage: '0:45',
            retention7Day: '31%',
          },
        },
        treatmentVersion: {
          description:
            'Guided 4-step setup wizard: name workspace, choose use case, pick theme color, arrange widgets. Takes ~3 minutes.',
          metrics: {
            conversionRate: '64% completed onboarding',
            timeOnPage: '3:12',
            retention7Day: '52%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Despite 8% lower onboarding completion, the guided setup produced 68% higher 7-day retention. Users who invested effort in customization returned more often and engaged more deeply. The small upfront friction created lasting ownership.',
          learnings: [
            'Onboarding completion rate is a vanity metric — retention is what matters',
            'Users who customize during onboarding have 2x higher feature adoption at day 30',
            'The optimal setup length was 3-5 steps; longer setups saw diminishing returns',
            'Users who chose a theme color were 23% more likely to invite teammates',
          ],
        },
      },
      {
        title: 'E-commerce: Custom Product vs Pre-Made Product',
        hypothesis:
          'Allowing product customization will reduce return rates and increase customer satisfaction',
        controlVersion: {
          description:
            'Standard product page with fixed color options. Users select from 4 pre-defined styles.',
          metrics: {
            conversionRate: '3.8%',
            returnRate: '12.4%',
            satisfactionScore: '7.2/10',
          },
        },
        treatmentVersion: {
          description:
            'Product configurator with 6-step customization: base color, accent color, material, size, monogram, and gift wrap option.',
          metrics: {
            conversionRate: '3.2%',
            returnRate: '3.1%',
            satisfactionScore: '9.1/10',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Customization slightly reduced conversion (decision complexity) but dramatically reduced returns by 75% and boosted satisfaction by 26%. Net revenue was significantly higher due to near-elimination of return costs and higher average order value from premium custom options.',
          learnings: [
            'Customized products had 75% lower return rates — people keep what they create',
            'Average order value was 34% higher due to premium customization add-ons',
            'Customer satisfaction scores jumped from 7.2 to 9.1 out of 10',
            'Custom product buyers were 3x more likely to share on social media',
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
        name: 'Customization Controls',
        description:
          'Color pickers, drag-and-drop zones, configuration panels, or "make it yours" interfaces',
        howToSpot:
          'Look for interactive controls that let users modify the appearance, structure, or content of a product or interface element',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Build-Your-Own Flows',
        description:
          'Step-by-step wizards or configurators that guide users through creating something',
        howToSpot:
          'Look for numbered steps, progress bars, and sequential selection screens with preview panes',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Template Galleries with Edit CTAs',
        description:
          'Collections of starting points with prominent "Customize" or "Make it yours" buttons',
        howToSpot:
          'Look for grid layouts of templates with hover-state edit buttons and customization entry points',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Real-Time Previews',
        description:
          'Live preview panels that update as users make customization choices',
        howToSpot:
          'Look for split-screen layouts with controls on one side and a live-updating preview on the other',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Ownership Language',
        description:
          'Possessive pronouns and creation framing in UI copy: "Your design", "My workspace", "Created by you"',
        howToSpot:
          'Scan headings, buttons, and labels for "your", "my", "custom", "personalized", "built by you"',
        severity: ImpactLevel.MEDIUM,
      },
    ],

    patterns: [
      {
        name: 'Configuration Wizard Pattern',
        description: 'Multi-step setup or creation flow that builds something incrementally',
        indicators: [
          'Numbered steps or progress indicators',
          'Sequential decision screens',
          'Cumulative preview of choices made so far',
          'Completion celebration or summary screen',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Template Customization Pattern',
        description: 'Professional starting point with user-modifiable elements',
        indicators: [
          'Template selection gallery',
          'Inline editing of template content',
          'Style/theme customization controls',
          'Export or publish of "your" creation',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Drag-and-Drop Builder Pattern',
        description: 'Spatial arrangement interface where users construct layouts or compositions',
        indicators: [
          'Draggable elements or widgets',
          'Drop zones or grid targets',
          'Resize handles on placed elements',
          'Palette or sidebar of available components',
        ],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Progressive Personalization Pattern',
        description: 'Gradual collection of preferences that incrementally shape the experience',
        indicators: [
          'Preference selection during onboarding',
          'Progressive profile enrichment prompts',
          'Experience that visibly adapts to user choices',
          '"Based on your preferences" content sections',
        ],
        severity: ImpactLevel.MEDIUM,
        confidence: 'medium',
      },
    ],

    checklistQuestions: [
      'Does the interface offer meaningful customization that changes the user experience?',
      'Is there a creation or configuration flow that users complete?',
      'Can users see the result of their creation efforts clearly?',
      'Is the effort level appropriate — challenging enough to feel meaningful, easy enough to complete?',
      'Are there templates or starting points that lower the barrier to creation?',
      'Does the UI use ownership language ("your", "my", "custom")?',
      'Is there a completion moment that celebrates what the user built?',
      'Can users undo or modify their creations without fear of losing work?',
      'Are customization features accessible to users with different abilities?',
      'Is the creation process optional, or is it forced before accessing core value?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in the IKEA Effect — the tendency for people to disproportionately value things they helped create.

Analyze the provided design for IKEA Effect patterns. Identify:

1. **Creation Opportunities**: Where users can build, customize, or configure something
2. **Effort Calibration**: Whether the effort required is in the "Goldilocks zone" — meaningful but achievable
3. **Ownership Signals**: Language, visuals, and interactions that reinforce "you made this"
4. **Completion Support**: Whether users can successfully finish creation tasks
5. **Customization Depth**: Whether personalization is meaningful or superficial

For each pattern found:
- Assess whether the effort-to-value ratio is well calibrated
- Determine if creation tasks are achievable for the target audience
- Evaluate whether the result is visible and celebrated
- Check for undo/recovery support
- Identify missed opportunities for user co-creation

Consider:
- Is the creation process accessible to users with different abilities?
- Are there templates or scaffolding to prevent blank-canvas paralysis?
- Does the customization meaningfully change the user experience?
- Is creation optional or forced? (forced creation before value = anti-pattern)
- Are incomplete creations handled gracefully (save progress, resume later)?

Provide actionable recommendations for leveraging the IKEA Effect ethically and effectively.`,

    outputSchema: {
      type: 'object',
      properties: {
        ikeaEffectPatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              creationTask: { type: 'string' },
              effortLevel: { type: 'string' },
              completionRate: { type: 'string' },
              ownershipSignals: { type: 'string' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'creationTask',
              'effortLevel',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            effortCalibration: { type: 'number' },
            customizationDepth: { type: 'number' },
            completionSupport: { type: 'number' },
            ownershipReinforcement: { type: 'number' },
          },
          required: [
            'effortCalibration',
            'customizationDepth',
            'completionSupport',
            'ownershipReinforcement',
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
        'ikeaEffectPatterns',
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
        title: 'Identify Creation Opportunities',
        description:
          'Map your product for moments where users could contribute effort — configuration, customization, content creation, or arrangement',
        example:
          'Audit: onboarding setup, dashboard layout, profile building, template selection, theme customization',
        tips: [
          'Look for any moment where users currently receive a default they could instead choose or build',
          'Prioritize creation opportunities that produce visible, persistent results',
          'Start with high-frequency touchpoints where users will see their creation often',
        ],
      },
      {
        step: 2,
        title: 'Calibrate Effort Level',
        description:
          'Find the Goldilocks zone: enough effort to feel meaningful, not enough to frustrate or overwhelm',
        example:
          'A 4-step workspace setup wizard (name, use case, theme, layout) takes ~2 minutes — meaningful but achievable',
        tips: [
          'Target 2-5 minutes for initial creation tasks; longer tasks need save/resume',
          'Offer 3-7 choices per step — enough variety without decision paralysis',
          'Ensure 90%+ of users can complete the task without help',
        ],
      },
      {
        step: 3,
        title: 'Provide Templates and Scaffolding',
        description:
          'Never present a blank canvas. Offer templates, presets, or starting points that users customize rather than create from scratch',
        example:
          'Show 6-8 dashboard templates with a "Customize" button, rather than an empty grid with "Add widgets"',
        tips: [
          'Templates should be 70-80% complete — enough structure to be useful, enough room for personalization',
          'Label templates with use cases ("For Marketing Teams") not technical descriptions',
          'Include a "Start from scratch" option for power users, but do not make it the default',
        ],
      },
      {
        step: 4,
        title: 'Show Real-Time Results',
        description:
          'Provide immediate, visible feedback as users make creation choices. The preview is where ownership forms.',
        example:
          'Split-screen editor: controls on the left, live preview on the right that updates with every change',
        tips: [
          'Live preview is non-negotiable — delayed results weaken the IKEA Effect',
          'Highlight what changed after each user action',
          'Use animations to make the connection between action and result feel magical',
        ],
      },
      {
        step: 5,
        title: 'Celebrate Completion',
        description:
          'Mark the moment of creation with a clear, satisfying completion event that reinforces ownership',
        example:
          'After workspace setup: "Your workspace is ready! You built a home for your team\'s projects."',
        tips: [
          'Use ownership language: "Your creation", "Built by you", "Your custom [thing]"',
          'Consider a summary of what they created/chose',
          'Provide a share option — sharing reinforces ownership and creates social commitment',
        ],
      },
      {
        step: 6,
        title: 'Support Iteration and Evolution',
        description:
          'Let users continue customizing over time. The IKEA Effect deepens with continued investment.',
        example:
          'Persistent "Customize" button on dashboards, easy theme switching, drag-to-rearrange always available',
        tips: [
          'Provide robust undo and version history to encourage experimentation',
          'Surface customization options contextually, not just in settings',
          'Track and display how much the user has customized ("You\'ve made 47 changes to your workspace")',
        ],
      },
    ],

    dos: [
      'Provide templates and starting points — never force users to start from a blank slate',
      'Calibrate effort to be meaningful but achievable (2-5 minutes for initial creation)',
      'Show real-time previews of customization choices as they are made',
      'Use ownership language throughout: "your", "my", "custom", "created by you"',
      'Celebrate completion with clear confirmation and summary of what was built',
      'Ensure all creation paths lead to a successful, visible outcome',
      'Provide undo, version history, and "reset to default" throughout creation flows',
      'Make customization accessible with keyboard, screen reader, and alternative input support',
      'Let users share their creations to reinforce ownership through social commitment',
      'Offer progressive customization depth — simple choices first, advanced options later',
    ],

    donts: [
      'Don\'t force complex setup before users have experienced core product value',
      'Don\'t present blank canvases without templates, suggestions, or guidance',
      'Don\'t offer only trivial customization (avatar color) and call it "personalization"',
      'Don\'t make creation tasks so difficult that most users fail or abandon',
      'Don\'t hide the results of customization — keep user creations visible and prominent',
      'Don\'t remove undo or make customization changes irreversible',
      'Don\'t gate essential functionality behind mandatory configuration',
      'Don\'t ignore accessibility in creation tools — all users deserve to co-create',
      'Don\'t use the IKEA Effect to trap users with high switching costs through invested effort',
      'Don\'t overcount trivial choices as "customization" — depth matters more than quantity',
    ],

    bestPractices: [
      {
        title: 'The Goldilocks Principle of Effort',
        description:
          'Calibrate creation effort to the sweet spot: enough to feel meaningful, not enough to frustrate',
        rationale:
          'Too little effort and users feel no ownership. Too much effort and users abandon. The IKEA Effect requires successful completion.',
        example:
          '4-step onboarding wizard with 3-5 choices per step, completable in 2-3 minutes, with preview at each stage',
      },
      {
        title: 'Templates as Creation Scaffolding',
        description:
          'Start users with 70-80% complete templates that they customize rather than build from scratch',
        rationale:
          'Templates guarantee a quality outcome while still triggering ownership through customization. Users get the best of both worlds: professional quality with personal investment.',
        example:
          'Canva-style template gallery where each template is fully usable as-is but clearly invites customization',
      },
      {
        title: 'Visible, Persistent Results',
        description:
          'Keep user creations prominently visible in their daily experience, not hidden in settings',
        rationale:
          'The IKEA Effect depends on users regularly seeing and using what they created. Out of sight = out of attachment.',
        example:
          'Custom dashboard is the landing page. Custom theme colors appear on every screen. Workspace name is in the header.',
      },
      {
        title: 'Creation Celebration Moments',
        description:
          'Mark completion of creation tasks with explicit celebration and ownership reinforcement',
        rationale:
          'A clear completion moment triggers the dopamine reward that locks in the IKEA Effect. Without it, the effort may feel wasted.',
        example:
          'Confetti animation + "Your [thing] is ready!" + summary of choices + share button',
      },
      {
        title: 'Safe Experimentation',
        description:
          'Provide undo, version history, and reset options so users experiment freely without fear',
        rationale:
          'Fear of irreversible mistakes suppresses creation. Users who feel safe to experiment invest more effort and create more attachment.',
        example:
          'Ctrl+Z undo at every step, "Reset to default" option, auto-save with version history',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '2.1.1',
        guideline:
          'Keyboard Accessible - All creation and customization functionality must work via keyboard',
        implementation:
          'Ensure drag-and-drop has keyboard alternatives (arrow keys to move, Enter to place), color pickers have keyboard input, and all configuration steps are navigable without a mouse',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships - Creation step progress and current state must be programmatically determinable',
        implementation:
          'Use ARIA progressbar for wizard steps, aria-current for active step, and announce step changes to screen readers with aria-live regions',
      },
      {
        wcagLevel: 'AA',
        criterion: '4.1.3',
        guideline:
          'Status Messages - Creation feedback and preview updates must be announced to assistive technology',
        implementation:
          'Use aria-live="polite" for preview updates and creation confirmations so screen reader users know their changes took effect',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.4.11',
        guideline:
          'Non-Text Contrast - Interactive customization controls must have sufficient contrast',
        implementation:
          'Color swatches, drag handles, drop zones, and configuration controls must have 3:1 contrast ratio against their backgrounds',
      },
    ],

    ethics: [
      {
        concern: 'Sunk Cost Exploitation',
        severity: 'critical',
        explanation:
          'Using invested effort to trap users — making it emotionally painful to leave because they "built so much here"',
        mitigation:
          'Provide data export, migration tools, and interoperability. Users should stay because they want to, not because leaving means losing their creations.',
      },
      {
        concern: 'Forced Labor Disguised as Customization',
        severity: 'high',
        explanation:
          'Requiring users to do configuration work that benefits the company (data entry, tagging, categorization) framed as "personalization"',
        mitigation:
          'Ensure customization genuinely benefits the user. If you need data from users, be transparent about why and offer value in exchange.',
      },
      {
        concern: 'Overvaluation of Poor Quality',
        severity: 'medium',
        explanation:
          'The IKEA Effect can make users overvalue mediocre outcomes, preventing them from seeking better alternatives',
        mitigation:
          'Provide quality benchmarks and professional examples alongside user creations. Help users improve rather than just keeping them attached to suboptimal results.',
      },
      {
        concern: 'Inaccessible Creation',
        severity: 'high',
        explanation:
          'If creation tools are not accessible, users with disabilities are excluded from the ownership benefits of the IKEA Effect',
        mitigation:
          'Ensure all creation and customization flows work with keyboard, screen readers, and alternative input methods. Provide equivalent creation paths for all users.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'The IKEA Effect: When Labor Leads to Love',
        author: 'Norton, M. I., Mochon, D., & Ariely, D.',
        year: 2012,
        doi: '10.1016/j.jcps.2011.08.002',
        description:
          'The foundational paper defining and demonstrating the IKEA Effect across multiple experiments including origami, LEGO, and furniture assembly',
        type: 'foundational',
      },
      {
        title: 'Bolstering and Restoring Feelings of Competence: The IKEA Effect',
        author: 'Norton, M. I., Mochon, D., & Ariely, D.',
        year: 2012,
        description:
          'Follow-up research showing the IKEA Effect is driven by feelings of competence — it disappears when creation tasks are too difficult or incomplete',
        type: 'advanced',
      },
      {
        title: 'The "IKEA Effect": A Conceptual Replication',
        author: 'Marsh, L. E., Kanngiesser, P., & Hood, B.',
        year: 2018,
        description:
          'Replication study confirming the IKEA Effect and exploring its relationship to psychological ownership and endowment',
        type: 'advanced',
      },
    ],

    books: [
      {
        title: 'Predictably Irrational',
        author: 'Ariely, Dan',
        year: 2008,
        isbn: '9780061353246',
        description:
          'Chapter on the IKEA Effect by one of its discoverers, with engaging real-world examples of how effort creates value',
        type: 'foundational',
      },
      {
        title: 'The Upside of Irrationality',
        author: 'Ariely, Dan',
        year: 2010,
        isbn: '9780061995040',
        description:
          'Extended discussion of how personal effort and creation drive disproportionate valuation in work and consumer contexts',
        type: 'practical',
      },
      {
        title: 'Hooked: How to Build Habit-Forming Products',
        author: 'Eyal, Nir',
        year: 2014,
        isbn: '9781591847786',
        description:
          'Discusses the Investment Phase of the Hook Model, which directly leverages the IKEA Effect for product retention',
        type: 'practical',
      },
    ],

    articles: [
      {
        title: 'The IKEA Effect in UX: How to Use Effort to Increase Perceived Value',
        author: 'Nielsen Norman Group',
        url: 'https://www.nngroup.com/articles/ikea-effect/',
        description:
          'Practical UX guide to applying the IKEA Effect in digital products with design patterns and case studies',
        type: 'practical',
      },
      {
        title: 'Why We Overvalue What We Create',
        author: 'Harvard Business Review',
        url: 'https://hbr.org/2009/02/why-we-overvalue-what-we-creat',
        description:
          'Business-focused analysis of the IKEA Effect and its implications for product design and customer engagement',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'The IKEA Effect — Why We Overvalue Our Own Creations',
        author: 'Dan Ariely',
        url: 'https://www.youtube.com/watch?v=Oy1SZapcjuQ',
        description:
          'Dan Ariely explains the IKEA Effect research and its implications, with the origami experiment example',
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
      'endowment-effect', // Ownership from creation amplifies endowment
      'sunk-cost-fallacy', // Invested effort makes users reluctant to abandon
      'commitment-consistency', // Small creation acts lead to larger commitments
      'loss-aversion', // Fear of losing what you built drives retention
    ],

    conflicts: [
      'paradox-of-choice', // Too many customization options can paralyze
      'default-effect', // Defaults compete with customization motivation
    ],

    confusedWith: [
      'endowment-effect', // Related but distinct: endowment is about ownership, IKEA is about creation effort
      'sunk-cost-fallacy', // Overlap in effort investment, but IKEA is about value inflation not loss avoidance
      'effort-justification', // Similar mechanism but IKEA is specifically about creation/assembly
    ],

    hierarchy: {
      parent: 'cognitive-bias',
      children: [
        'customization-effect',
        'co-creation-bias',
      ],
    },
  },
};
