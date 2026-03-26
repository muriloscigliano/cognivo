/**
 * MENTAL ACCOUNTING
 *
 * We treat money differently based on where it comes from or how we categorize it
 */


import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const mentalAccounting: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'mental-accounting',
    name: 'Mental Accounting',
    aliases: ['Mental Budgeting', 'Psychological Accounting', 'Category Budgeting'],
    category: BiasCategory.COGNITIVE,
    relatedCategories: [
      BiasCategory.DECISION_MAKING,
      BiasCategory.PERCEPTION,
    ],
    tags: [
      'pricing',
      'money',
      'budgeting',
      'spending',
      'categorization',
      'fungibility',
      'payment-framing',
      'decision-making',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple: 'We treat money differently based on where it comes from or how we categorize it',

    detailed: `Mental accounting is a cognitive bias in which people categorize money into separate mental "accounts" and treat those accounts differently, even though money is fungible (interchangeable). A dollar earned from a bonus feels different from a dollar earned from salary, even though both have identical purchasing power.

People create internal budgets for categories like "entertainment," "groceries," and "savings," and resist moving money between them. A person might refuse to spend $50 from their "food budget" on a concert ticket, yet freely spend $50 from their "entertainment budget" on an expensive meal. The labels we attach to money change how willingly we spend it.

In UX and product design, mental accounting profoundly affects how users perceive pricing, subscriptions, bundles, gift card balances, and payment methods. Designers who understand mental accounting can frame costs in ways that feel more comfortable to users, create effective budgeting tools, and structure pricing that aligns with how people naturally think about money.`,

    psychologyBasis: {
      discoveredBy: 'Richard Thaler',
      year: 1985,
      theory: 'Behavioral Economics / Prospect Theory Extension',
      mechanism: `The brain assigns money to mental categories and evaluates gains and losses within each account separately rather than looking at overall wealth. This happens because:

1. **Categorization**: People group financial transactions into mental "accounts" (rent, food, entertainment) and track each independently
2. **Narrow Framing**: Gains and losses are evaluated per-account rather than across total wealth, violating the economic principle of fungibility
3. **Sunk Cost Integration**: Money already "spent" in a mental account (e.g., a prepaid card) feels like it has already been allocated, reducing the pain of spending it
4. **Opening and Closing Accounts**: People mentally "open" an account when making a purchase decision and "close" it when the transaction is complete, affecting how they evaluate ongoing costs like subscriptions
5. **Source Dependence**: Money from different sources (salary vs. windfall vs. gift) gets assigned to different accounts with different spending rules`,
    },

    realWorldExample: `In a classic example, imagine you arrive at a theater and discover you have lost the $10 ticket you purchased earlier. Most people would not buy another ticket. But if you arrive at the theater and discover you have lost a $10 bill from your wallet, most people would still buy a ticket. Economically, both situations are identical: you are $10 poorer and deciding whether to spend $10 on a show. But mentally, the lost ticket comes from the "entertainment account" (now overspent), while the lost cash comes from a general account, leaving the entertainment budget intact.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `Mental accounting affects how users perceive costs, evaluate subscriptions, respond to bundles, and interact with payment systems. Designers can leverage this to:

- Frame pricing in per-unit or per-day terms to place costs in smaller mental accounts
- Create bundle pricing that groups items into a single "account," reducing per-item evaluation
- Use gift card and credit systems to pre-allocate money into spending accounts
- Design budgeting interfaces that align with natural mental categories
- Structure subscription pricing to minimize the pain of recurring payments`,

    whenToUse: [
      {
        title: 'Subscription Pricing Framing',
        scenario:
          'When presenting recurring subscription costs to potential customers',
        example:
          'Show "$0.99/day" instead of "$29.99/month" or "$359/year" to place the cost in a "daily small purchase" mental account',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Bundle Pricing',
        scenario: 'When selling multiple products or features together',
        example:
          'Offer a "Creative Suite" for $49/mo instead of listing each tool separately ($15 + $12 + $10 + $8 + $4), reducing individual cost evaluation',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Gift Card and Wallet Systems',
        scenario: 'When designing prepaid balance or store credit experiences',
        example:
          'Starbucks app shows a dedicated "Starbucks balance" that feels separate from the bank account, making spending feel painless',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Budgeting App Categories',
        scenario: 'When helping users manage and track spending',
        example:
          'YNAB-style "give every dollar a job" approach that leverages natural mental accounting with explicit category budgets',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Savings Goal Framing',
        scenario: 'When encouraging users to save money toward specific goals',
        example:
          'Show separate visual "jars" or "envelopes" for vacation, emergency fund, and new car rather than a single savings total',
        impact: ImpactLevel.MEDIUM,
      },
      {
        title: 'Payment Method Selection',
        scenario: 'When offering multiple payment options at checkout',
        example:
          'Highlight store credit or reward points as a separate "free money" balance to encourage spending',
        impact: ImpactLevel.MEDIUM,
      },
    ],

    whenToAvoid: [
      {
        title: 'Obscuring Total Costs',
        reason:
          'Breaking costs into tiny per-day amounts can hide the true annual expense from users',
        consequence:
          'Users may commit to subscriptions they cannot actually afford, leading to cancellations and distrust',
        alternative:
          'Show per-day framing alongside the total monthly and annual cost for full transparency',
      },
      {
        title: 'Exploiting Windfall Money',
        reason:
          'Targeting users immediately after bonuses, tax refunds, or gifts to encourage overspending',
        consequence:
          'Users feel manipulated when they realize they spent windfall money impulsively',
        alternative:
          'Offer saving or investment options alongside spending options for windfall money',
      },
      {
        title: 'Hiding Fees Across Accounts',
        reason:
          'Splitting charges across multiple categories or billing dates to make total cost less visible',
        consequence:
          'Users lose trust when they discover the true total cost was deliberately obscured',
        alternative:
          'Consolidate and clearly show all fees and charges in a single transparent summary',
      },
      {
        title: 'Debt-Related Decisions',
        reason:
          'Mental accounting can cause people to invest at low returns while carrying high-interest debt',
        consequence:
          'Users make financially harmful decisions by treating debt and savings as separate unrelated accounts',
        alternative:
          'Provide holistic financial views that show the relationship between debt and savings',
      },
    ],

    commonMistakes: [
      {
        title: 'Inconsistent Price Framing',
        description:
          'Showing per-day pricing on the marketing page but per-month on the checkout page',
        why: 'Users feel deceived when the framing shifts, breaking the mental account they formed',
        fix: 'Maintain consistent price framing throughout the funnel, showing both daily and total clearly',
      },
      {
        title: 'Too Many Budget Categories',
        description:
          'Budgeting apps that create dozens of granular categories, overwhelming users',
        why: 'People naturally maintain 5-10 mental accounts; too many creates cognitive overload and abandonment',
        fix: 'Start with broad categories that match natural mental accounts and let users customize gradually',
      },
      {
        title: 'Ignoring Payment Pain',
        description:
          'Not considering how different payment methods trigger different levels of spending pain',
        why: 'Credit cards, digital wallets, and store credits all create different pain-of-paying experiences',
        fix: 'Design checkout flows that acknowledge payment method psychology; show running totals for low-pain methods',
      },
      {
        title: 'Rigid Account Boundaries',
        description:
          'Forcing users into strict spending categories that do not match their mental models',
        why: 'People\'s mental accounts are personal and flexible; rigid systems feel constraining',
        fix: 'Allow users to define, rename, and reorganize their own categories',
      },
      {
        title: 'Ignoring Account Closure',
        description:
          'Not providing clear "account closure" moments when a transaction or subscription period ends',
        why: 'Users need to mentally close accounts to feel resolution; open accounts create anxiety',
        fix: 'Send clear summaries at billing periods, project completions, or subscription renewals',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.HIGH,
        description:
          'Layout determines how financial information is grouped and separated, reinforcing or breaking mental account boundaries',
        examples: [
          'Separate visual sections for different spending categories reinforce mental accounts',
          'Side-by-side bundle vs individual pricing layouts affect value perception',
          'Dashboard layouts that group income and expenses into accounts shape financial self-image',
          'Card-based layouts for savings goals create distinct visual "jars" for each account',
        ],
      },
      typography: {
        level: ImpactLevel.HIGH,
        description:
          'Typography size and weight determine which price framing dominates user perception',
        examples: [
          'Large per-day price with small annual total frames cost in the smaller account',
          'Bold savings amounts next to regular total prices emphasize the discount account',
          'Small-print fees in different type weight get mentally separated from the main price',
          'Currency and number formatting affect perceived magnitude within accounts',
        ],
      },
      color: {
        level: ImpactLevel.MEDIUM,
        description:
          'Color coding reinforces mental account boundaries and spending emotions',
        examples: [
          'Green for savings and red for overspending reinforces budget account status',
          'Color-coded spending categories create visual account separation',
          'Gift card and credit balances in distinct colors feel like separate money',
          'Muted colors on fees reduce their perceived inclusion in the "cost account"',
        ],
      },
      interaction: {
        level: ImpactLevel.CRITICAL,
        description:
          'Payment interactions and account management directly trigger mental accounting',
        examples: [
          'One-tap payments with stored credit reduce pain of paying by leveraging pre-allocated accounts',
          'Drag-and-drop budget allocation mimics physical envelope budgeting',
          'Auto-reload wallet balances keep the spending account always "funded" and separate',
          'Subscription toggle interactions feel different from one-time purchase buttons',
        ],
      },
      content: {
        level: ImpactLevel.CRITICAL,
        description:
          'Copy and framing language directly shape which mental account users assign costs to',
        examples: [
          '"Just $2.50 per coffee" frames a subscription in the daily beverage account',
          '"Your rewards balance" language creates a separate free-money account',
          '"Investment in your career" reframes an expense as a growth account',
          'Bundle names like "Family Plan" shift cost to the shared household account',
        ],
      },
      accessibility: {
        level: ImpactLevel.HIGH,
        description:
          'Accessible price presentation ensures all users can understand cost framing and account structures',
        examples: [
          'Screen readers must convey both per-unit and total pricing, not just the visually emphasized one',
          'Clear aria-labels for gift card balances and account categories',
          'Color-coded budget categories need text labels for color-blind users',
          'Price comparison tables need proper headers so assistive tech can convey the full picture',
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
        title: 'Transparent Per-Day Pricing with Total',
        description:
          'Subscription page showing daily cost alongside clear monthly and annual totals',
        code: `<div class="pricing-card">
  <h3>Pro Plan</h3>
  <div class="price-primary">
    <span class="daily-price">$0.99</span>
    <span class="period">/day</span>
  </div>
  <div class="price-details">
    <p class="monthly">$29.99/month, billed monthly</p>
    <p class="annual">Or $299/year (save $60)</p>
  </div>
  <ul class="features">
    <li>Unlimited projects</li>
    <li>Priority support</li>
    <li>Advanced analytics</li>
  </ul>
  <button class="cta">Start Free Trial</button>
</div>`,
        explanation:
          'The per-day price places the cost in a "small daily expense" mental account (less than a coffee), making it feel affordable. Crucially, the monthly and annual totals are clearly visible, maintaining transparency.',
        principle:
          'Frame costs in small-account terms while keeping total costs transparent',
        metrics: {
          before: '8.2% conversion with $29.99/month only',
          after: '14.1% conversion with $0.99/day + monthly/annual shown',
          improvement: '72% increase in subscription signups',
        },
      },
      {
        title: 'Visual Savings Goals with Envelope Budgeting',
        description:
          'Budgeting app with visual "envelope" categories that match natural mental accounts',
        code: `<div class="budget-envelopes">
  <div class="envelope" style="--fill: 75%">
    <div class="envelope-icon">🏠</div>
    <h4>Housing</h4>
    <div class="progress-bar">
      <div class="fill" style="width: 75%"></div>
    </div>
    <p class="amounts">$1,500 of $2,000 spent</p>
    <p class="remaining">$500 remaining</p>
  </div>

  <div class="envelope" style="--fill: 40%">
    <div class="envelope-icon">🛒</div>
    <h4>Groceries</h4>
    <div class="progress-bar">
      <div class="fill" style="width: 40%"></div>
    </div>
    <p class="amounts">$240 of $600 spent</p>
    <p class="remaining">$360 remaining</p>
  </div>

  <div class="envelope" style="--fill: 90%">
    <div class="envelope-icon">🎭</div>
    <h4>Entertainment</h4>
    <div class="progress-bar warning">
      <div class="fill" style="width: 90%"></div>
    </div>
    <p class="amounts">$180 of $200 spent</p>
    <p class="remaining warning">$20 remaining</p>
  </div>
</div>`,
        explanation:
          'This design works with natural mental accounting rather than against it. Users already think in categories; the visual envelopes make those categories explicit, trackable, and motivating.',
        principle:
          'Align interface categories with natural mental accounts to empower informed spending',
      },
      {
        title: 'Bundle Pricing with Component Breakdown',
        description:
          'SaaS bundle showing combined price with transparent component values',
        code: `<div class="bundle-pricing">
  <h3>Creative Suite Bundle</h3>
  <div class="bundle-price">
    <span class="price">$49</span><span class="period">/month</span>
    <span class="savings-badge">Save $26/mo</span>
  </div>

  <div class="included-tools">
    <h4>Everything included:</h4>
    <div class="tool">
      <span class="name">Design Tool</span>
      <span class="individual-price">$19/mo if purchased alone</span>
    </div>
    <div class="tool">
      <span class="name">Photo Editor</span>
      <span class="individual-price">$15/mo if purchased alone</span>
    </div>
    <div class="tool">
      <span class="name">Video Editor</span>
      <span class="individual-price">$25/mo if purchased alone</span>
    </div>
    <div class="tool">
      <span class="name">Storage (1TB)</span>
      <span class="individual-price">$10/mo if purchased alone</span>
    </div>
    <div class="tool">
      <span class="name">Fonts Library</span>
      <span class="individual-price">$6/mo if purchased alone</span>
    </div>
  </div>

  <div class="total-comparison">
    <p class="individual-total">Individual total: $75/mo</p>
    <p class="bundle-total">Bundle price: $49/mo</p>
  </div>
</div>`,
        explanation:
          'The bundle collapses five separate mental accounts into one. Users evaluate one $49 decision instead of five separate ones. Showing individual prices creates anchoring while the bundle feels like a single, simpler account.',
        principle:
          'Bundling consolidates mental accounts, reducing evaluation friction while transparency builds trust',
        metrics: {
          before: '23% purchased 2+ individual tools',
          after: '41% purchased the bundle',
          improvement: '78% increase in multi-tool adoption',
        },
      },
    ],

    bad: [
      {
        title: 'Hidden Total Cost with Per-Day Framing',
        description:
          'Subscription page showing only daily price to obscure the real annual commitment',
        code: `<!-- DON'T DO THIS -->
<div class="pricing">
  <h3>Premium Access</h3>
  <div class="price">
    <span class="amount">$1.99</span>
    <span class="period">/day</span>
  </div>
  <button class="cta">Subscribe Now</button>
  <small style="color: #ccc; font-size: 0.6em;">
    *Annual plan, billed at $726.35/year, non-refundable
  </small>
</div>`,
        explanation:
          'This deliberately exploits mental accounting by hiding the true annual cost ($726) behind a tiny daily price. The fine print is designed to be missed. Users will feel deceived when they see the actual charge.',
        principle:
          'Never use mental accounting framing to hide the true cost of a commitment',
      },
      {
        title: 'Manipulative Windfall Targeting',
        description:
          'E-commerce site pushing luxury purchases tied to tax refund timing',
        code: `<!-- DON'T DO THIS -->
<div class="promo-banner">
  <h2>Tax Refund Season Sale!</h2>
  <p>Your refund is FREE MONEY - treat yourself!</p>
  <p class="subtitle">Average refund: $3,167. That's enough for:</p>
  <div class="suggestions">
    <div class="item">
      <img src="luxury-watch.jpg" alt="Luxury watch">
      <p>Designer Watch - $2,899</p>
      <p class="framing">Still $268 left over!</p>
    </div>
  </div>
  <button class="urgent">Shop Tax Refund Deals</button>
</div>`,
        explanation:
          'This exploits the "windfall account" tendency by framing a tax refund as "free money" separate from regular income. A tax refund is not free money; it is the return of overpaid taxes. Encouraging users to treat it differently is manipulative.',
        principle:
          'Do not exploit windfall mental accounting to encourage impulsive luxury spending',
      },
      {
        title: 'Forced Wallet Loading',
        description:
          'App requiring minimum top-up amounts to create a pre-committed spending account',
        code: `<!-- DON'T DO THIS -->
<div class="wallet-topup">
  <h3>Add Funds to Your Wallet</h3>
  <p>Minimum top-up: $50</p>
  <div class="options">
    <button class="amount">$50</button>
    <button class="amount recommended">$100</button>
    <button class="amount">$200</button>
  </div>
  <p class="note">Wallet funds are non-refundable</p>
  <p class="expire">Unused balance expires in 12 months</p>
</div>`,
        explanation:
          'Forcing users to pre-load a wallet creates a mental "sunk cost" account. Once money is in the wallet, it feels already spent, reducing the pain of using it. Combined with non-refundable and expiring funds, this traps users into spending.',
        principle:
          'Do not force pre-commitment to spending accounts with unfavorable terms',
      },
    ],

    realWorld: [
      {
        company: 'Starbucks',
        product: 'Starbucks Card / App Balance',
        url: 'https://www.starbucks.com/rewards',
        description:
          'The Starbucks app encourages loading money onto a digital card. Once funds are in the "Starbucks account," they feel pre-allocated for coffee, removing the pain of paying at each visit. The balance feels like "Starbucks money," not real money.',
        effectiveness: 'very-effective',
        analysis:
          'Starbucks holds billions in stored card value. By creating a separate mental account, customers spend more freely and visit more often. The preloaded balance also creates switching costs and habitual behavior.',
      },
      {
        company: 'YNAB',
        product: 'You Need A Budget',
        url: 'https://www.ynab.com',
        description:
          'YNAB explicitly leverages mental accounting by asking users to "give every dollar a job." Each dollar is assigned to a category (envelope), making mental accounts tangible and trackable. Users allocate money to rent, groceries, fun, etc.',
        effectiveness: 'very-effective',
        analysis:
          'Rather than fighting mental accounting, YNAB embraces it as a feature. Users who naturally think in categories get a tool that formalizes that thinking, leading to better financial outcomes and high customer loyalty.',
      },
      {
        company: 'Amazon',
        product: 'Gift Card Balance',
        url: 'https://www.amazon.com',
        description:
          'Amazon prominently shows gift card balance at checkout. Users treat gift card balance as "Amazon money" rather than real money, spending it more freely and often on items they would not buy with their bank card.',
        effectiveness: 'very-effective',
        analysis:
          'The gift card balance creates a dedicated "Amazon account" in users\' minds. It also reduces cart abandonment because the payment feels pre-committed. Amazon benefits from both the float and the increased willingness to spend.',
      },
      {
        company: 'Uber',
        product: 'Uber Credits and Ride Passes',
        url: 'https://www.uber.com',
        description:
          'Uber offers ride credits and monthly ride passes that pre-allocate money to transportation. A $24.99/month ride pass feels like a single transportation expense, making individual rides feel "free" even when they have surge pricing.',
        effectiveness: 'effective',
        analysis:
          'The ride pass creates a mental "transportation subscription" account. Individual rides no longer trigger cost evaluation, increasing ride frequency. Credits from promotions feel like bonus money, encouraging extra rides.',
      },
    ],

    abTests: [
      {
        title: 'Subscription Framing: Per-Day vs Per-Month',
        hypothesis:
          'Framing subscription cost as a daily amount will increase conversions by placing the cost in a "small daily expense" mental account',
        controlVersion: {
          description:
            'Pricing page showing "$29.99/month" as the primary price display',
          metrics: {
            conversionRate: '8.2%',
            timeOnPage: '1:45',
            bounceRate: '62%',
          },
        },
        treatmentVersion: {
          description:
            'Pricing page showing "$0.99/day" as primary price with "$29.99/month" shown below in regular weight',
          metrics: {
            conversionRate: '14.1%',
            timeOnPage: '2:10',
            bounceRate: '48%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Daily framing increased conversions by 72%. Users mentally compared $0.99 to other daily purchases (coffee, snacks) rather than evaluating $29.99 against their monthly budget. Bounce rate dropped 23% as users engaged more with the value proposition.',
          learnings: [
            'Per-day framing shifts cost into a "daily small purchase" mental account',
            'Users are more likely to convert when cost is comparable to habitual small purchases',
            'Transparency is key: showing both daily and monthly prevented negative post-purchase feelings',
            'Effect was strongest for users in the consideration phase, less for those comparing competitors',
          ],
        },
      },
      {
        title: 'Bundle vs Individual Pricing',
        hypothesis:
          'Presenting tools as a single bundle will increase multi-product adoption by consolidating mental accounts',
        controlVersion: {
          description:
            'Individual pricing for each tool: Design ($19/mo), Photo ($15/mo), Video ($25/mo) shown as separate products',
          metrics: {
            conversionRate: '23%',
            averageRevenuePerUser: '$22',
            multiProductAdoption: '18%',
          },
        },
        treatmentVersion: {
          description:
            'Bundle pricing: "Creative Suite" at $49/mo with all three tools, individual prices shown for comparison',
          metrics: {
            conversionRate: '31%',
            averageRevenuePerUser: '$38',
            multiProductAdoption: '41%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Bundle pricing increased multi-product adoption by 128% and ARPU by 73%. Users evaluated one $49 decision instead of three separate ones. The bundle created a single "creative tools" mental account rather than three competing accounts.',
          learnings: [
            'Bundles reduce the number of mental accounts users must evaluate',
            'Showing individual prices alongside bundle price creates value anchoring',
            'Users who chose the bundle reported higher satisfaction despite spending more',
            'The "all-in-one" framing reduced decision fatigue and choice paralysis',
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
        name: 'Separate Account Displays',
        description:
          'Distinct visual sections showing separate balances, budgets, or fund pools (e.g., wallet balance, gift card balance, reward points)',
        howToSpot:
          'Look for multiple balance indicators, separate "accounts" or "wallets," or visually distinct money pools in the interface',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Per-Unit Price Framing',
        description:
          'Prices broken down into small units (per-day, per-use, per-item) rather than showing total cost prominently',
        howToSpot:
          'Look for large per-day/per-use prices with total cost in small print or secondary position',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Spending Category Visualization',
        description:
          'Color-coded categories, progress bars, or pie charts breaking spending into distinct accounts',
        howToSpot:
          'Look for budget category cards, envelope-style layouts, or spending breakdown charts',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Payment Method Framing',
        description:
          'Different visual treatment for different payment methods, especially store credit, rewards, or gift cards',
        howToSpot:
          'Look for highlighted "use your balance" prompts, points conversion displays, or separate payment method sections',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Bundle Pricing Layouts',
        description:
          'Grouped products shown as a single price with individual values listed for comparison',
        howToSpot:
          'Look for "bundle and save" layouts, crossed-out individual totals, or "included in your plan" lists',
        severity: ImpactLevel.HIGH,
      },
    ],

    patterns: [
      {
        name: 'Wallet/Balance Pre-Loading Pattern',
        description: 'Users are encouraged to load money into an in-app wallet or account before spending',
        indicators: [
          'Top-up or add-funds prompts',
          'Stored balance prominently displayed',
          'Minimum top-up requirements',
          'Auto-reload settings',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Per-Unit Reframing Pattern',
        description: 'Total cost broken into smallest possible unit to minimize perceived expense',
        indicators: [
          'Per-day or per-use pricing as primary display',
          'Total cost in secondary or fine-print position',
          'Comparison to common small purchases ("less than a coffee")',
          'Price-per-unit calculations on product pages',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Category Budget Pattern',
        description: 'Spending is organized into explicit categories with individual limits',
        indicators: [
          'Budget category cards or envelopes',
          'Per-category spending progress bars',
          'Category-level alerts when limits are approached',
          'Allocation sliders for distributing funds across categories',
        ],
        severity: ImpactLevel.MEDIUM,
        confidence: 'high',
      },
      {
        name: 'Source-Dependent Spending Pattern',
        description: 'Different money sources are treated or displayed differently',
        indicators: [
          'Gift card balance shown separately from primary payment',
          'Reward points displayed as a separate currency',
          'Cashback or credit shown as "free" or "bonus" money',
          'Refund credited to store balance rather than original payment method',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
    ],

    checklistQuestions: [
      'Are costs framed in small per-unit amounts while hiding the total?',
      'Does the interface create separate "accounts" or "wallets" for user funds?',
      'Are different money sources (cash, credit, gift cards, rewards) treated differently in the UI?',
      'Is there a pre-loading or top-up mechanism that separates spending from earning?',
      'Are bundle prices presented in a way that prevents individual item cost evaluation?',
      'Do spending categories align with users\' natural mental budgets?',
      'Is the total cost of ownership clear across all time periods?',
      'Are expiring balances or credits used to create spending urgency?',
      'Does the payment flow reduce pain-of-paying through account pre-commitment?',
      'Is there transparency about the true cost regardless of how it is framed?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in mental accounting.

Analyze the provided design for mental accounting patterns. Identify:

1. **Account Separation**: How the interface creates or reinforces separate mental accounts for money
2. **Price Framing**: How costs are broken down, per-unit framed, or bundled
3. **Payment Method Effects**: How different payment sources are presented and whether they reduce pain of paying
4. **Category Structures**: How spending categories are organized and whether they align with natural mental accounts
5. **Source Dependence**: Whether different money sources (earned, gifted, won, credited) are treated differently

For each pattern found:
- Identify which mental account is being created or leveraged
- Assess whether the framing is transparent about true total costs
- Determine if users can make informed decisions despite the framing
- Evaluate ethical implications of the account manipulation
- Suggest improvements for honest, user-benefiting mental accounting design

Consider:
- Is per-unit pricing hiding a large total commitment?
- Are pre-loaded wallets creating sunk-cost spending pressure?
- Do spending categories genuinely help users budget or just encourage spending?
- Is windfall or gift money being targeted for impulsive spending?
- Are expiring credits creating artificial urgency?

Provide actionable recommendations for ethical, transparent use of mental accounting in design.`,

    outputSchema: {
      type: 'object',
      properties: {
        mentalAccountPatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              accountCreated: { type: 'string' },
              framing: { type: 'string' },
              transparencyLevel: { type: 'string' },
              potentialHarm: { type: 'string' },
              ethical: { type: 'boolean' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'accountCreated',
              'framing',
              'ethical',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            costTransparency: { type: 'number' },
            accountManipulation: { type: 'number' },
            userBenefit: { type: 'number' },
            ethicalScore: { type: 'number' },
          },
          required: [
            'costTransparency',
            'accountManipulation',
            'userBenefit',
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
        'mentalAccountPatterns',
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
        title: 'Identify Natural Mental Accounts',
        description:
          'Research how your users naturally categorize spending related to your product or service',
        example:
          'Users of a fitness app think of gym membership, supplements, and gear as separate "fitness" sub-accounts',
        tips: [
          'Interview users about how they budget for your product category',
          'Identify which existing mental account your product fits into',
          'Understand whether your product competes within one account or spans multiple',
        ],
      },
      {
        step: 2,
        title: 'Choose Appropriate Price Framing',
        description:
          'Select a price framing that places your product in a favorable mental account without being deceptive',
        example:
          'A $30/month learning platform framed as "$1/day for career growth" places it in the daily self-improvement account',
        tips: [
          'Match your framing to the account where users would naturally place the expense',
          'Always show the total commitment alongside any per-unit framing',
          'Test different framings to find what resonates without misleading',
        ],
      },
      {
        step: 3,
        title: 'Design Transparent Account Structures',
        description:
          'If creating wallets, credits, or balance systems, ensure users always understand the real value and terms',
        example:
          'Show gift card balance alongside a clear note: "This balance was loaded from your Visa ending in 4242"',
        tips: [
          'Make it easy to convert between account values and real currency',
          'Clearly communicate expiration dates and terms',
          'Allow easy withdrawal or refund of pre-loaded balances',
        ],
      },
      {
        step: 4,
        title: 'Build Category-Aligned Budget Tools',
        description:
          'If your product involves financial management, align categories with natural mental accounts',
        example:
          'Start with 5-7 broad categories (Housing, Food, Transport, Entertainment, Savings, Bills, Personal) and let users customize',
        tips: [
          'Start broad and let users drill down, not the other way around',
          'Provide smart defaults based on common mental account structures',
          'Allow flexible reallocation between accounts',
        ],
      },
      {
        step: 5,
        title: 'Test for Understanding and Satisfaction',
        description:
          'Verify that users understand the true cost and feel good about their purchase decisions',
        example:
          'Post-purchase survey: "Did the pricing clearly communicate the total cost?" and track 30-day cancellation rates',
        tips: [
          'Measure comprehension of total cost, not just conversion rate',
          'Track post-purchase satisfaction and cancellation rates',
          'Watch for signs of "bill shock" when users see actual charges',
        ],
      },
    ],

    dos: [
      'Frame prices in units that match natural spending mental accounts',
      'Always show total cost alongside any per-unit framing',
      'Design budgeting categories that match how users naturally think about money',
      'Allow users to customize and rename their own mental account categories',
      'Show clear summaries when closing billing periods or subscription cycles',
      'Make it easy to see total spending across all accounts and categories',
      'Use mental accounting to help users save more and spend mindfully',
      'Provide honest comparisons between bundle and individual pricing',
    ],

    donts: [
      'Don\'t hide total costs behind per-day or per-use framing',
      'Don\'t force minimum top-up amounts with non-refundable terms',
      'Don\'t frame tax refunds, bonuses, or gifts as "free money" to encourage overspending',
      'Don\'t make expiring credits or balances difficult to track',
      'Don\'t split fees across billing dates to obscure total cost',
      'Don\'t prevent users from seeing their total spending across all accounts',
      'Don\'t use separate accounts to hide the true cost of a product',
      'Don\'t create artificial categories that fragment natural spending awareness',
    ],

    bestPractices: [
      {
        title: 'Dual-Frame Pricing',
        description:
          'Show both per-unit and total pricing simultaneously, with the per-unit framing as the attention-grabber and total as the honest anchor',
        rationale:
          'Users get the benefit of relatable framing while maintaining full cost awareness',
        example:
          '"$0.99/day" in large text with "$29.99/month or $299/year" clearly visible below',
      },
      {
        title: 'Honest Bundle Communication',
        description:
          'Show individual prices alongside bundle price so users can see genuine savings',
        rationale:
          'Transparent comparison builds trust and helps users evaluate the bundle rationally',
        example:
          'List each tool\'s individual price, show the total, then show the bundle discount clearly',
      },
      {
        title: 'Natural Category Defaults',
        description:
          'Start budgeting tools with broad categories that match common mental accounts',
        rationale:
          'Users abandon tools that force unnatural categorization; alignment increases adoption',
        example:
          'Default categories: Housing, Food, Transport, Entertainment, Bills, Savings, Personal; then allow customization',
      },
      {
        title: 'Account Closure Moments',
        description:
          'Provide clear "here\'s what happened" summaries when billing periods end or subscriptions renew',
        rationale:
          'Users need to mentally close accounts for satisfaction; open-ended spending creates anxiety',
        example:
          'Monthly email: "This month you used Premium 47 times. At $29.99/mo, that\'s $0.64 per use."',
      },
      {
        title: 'Holistic Financial View',
        description:
          'Allow users to see spending across all categories and accounts in one unified view',
        rationale:
          'Mental accounting can cause blind spots; a holistic view helps users make better overall decisions',
        example:
          'Dashboard showing total monthly spending with category breakdown and month-over-month trends',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships - Ensure price framing conveys both per-unit and total cost to all users',
        implementation:
          'Use semantic HTML and aria-labels so screen readers announce both the per-day price and the total monthly/annual cost, not just the visually emphasized one',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.4.1',
        guideline:
          'Use of Color - Don\'t rely solely on color to indicate budget status',
        implementation:
          'Combine color-coded budget categories with text labels, icons, and progress percentages so color-blind users can understand account status',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.4.6',
        guideline:
          'Headings and Labels - Use clear headings for each mental account or budget category',
        implementation:
          'Label each account section with descriptive headings (e.g., "Gift Card Balance: $25.00") so assistive technologies can navigate between accounts',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.3.2',
        guideline:
          'Meaningful Sequence - Present pricing information in a logical order',
        implementation:
          'Ensure DOM order presents the primary price, then total cost, then terms, so screen readers convey costs in a logical, transparent sequence',
      },
    ],

    ethics: [
      {
        concern: 'Hidden Total Costs',
        severity: 'critical',
        explanation:
          'Using per-unit framing to obscure the true total cost of a subscription or commitment',
        mitigation:
          'Always show total monthly and annual costs prominently alongside any per-day or per-use framing. Never hide the total in fine print.',
      },
      {
        concern: 'Non-Refundable Pre-Loading',
        severity: 'critical',
        explanation:
          'Requiring users to pre-load money into wallets with non-refundable or expiring terms, creating sunk-cost pressure to spend',
        mitigation:
          'Allow easy refunds of wallet balances. If expiration is necessary, provide clear warnings and reminders well in advance.',
      },
      {
        concern: 'Windfall Exploitation',
        severity: 'high',
        explanation:
          'Targeting users with promotions timed to bonuses, tax refunds, or gifts, framing windfall money as "free" to encourage overspending',
        mitigation:
          'Present saving and investing options alongside spending options. Do not frame earned income (tax refunds) as windfalls.',
      },
      {
        concern: 'Category Fragmentation',
        severity: 'medium',
        explanation:
          'Creating so many separate accounts or categories that users lose sight of total spending',
        mitigation:
          'Always provide an easily accessible total-spending view. Limit default categories to match natural mental accounts.',
      },
      {
        concern: 'Credit-to-Spending Pipeline',
        severity: 'high',
        explanation:
          'Automatically converting refunds, returns, or compensation to store credit rather than original payment method',
        mitigation:
          'Default to refunding to original payment method. Offer store credit as an option, not the default or only choice.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'Mental Accounting and Consumer Choice',
        author: 'Thaler, R.',
        year: 1985,
        doi: '10.1287/mksc.4.3.199',
        description:
          'The foundational paper introducing mental accounting theory and its effects on consumer spending decisions',
        type: 'foundational',
      },
      {
        title: 'Mental Accounting Matters',
        author: 'Thaler, R.',
        year: 1999,
        doi: '10.1002/(SICI)1099-0771(199912)12:4<183::AID-BDM318>3.0.CO;2-F',
        description:
          'Comprehensive review and update of mental accounting theory with new evidence and applications',
        type: 'foundational',
      },
      {
        title: 'Toward a Positive Theory of Consumer Choice',
        author: 'Thaler, R.',
        year: 1980,
        doi: '10.1016/0167-2681(80)90051-7',
        description:
          'Early paper laying groundwork for mental accounting within behavioral economics framework',
        type: 'foundational',
      },
    ],

    books: [
      {
        title: 'Misbehaving: The Making of Behavioral Economics',
        author: 'Thaler, Richard',
        year: 2015,
        isbn: '9780393352795',
        description:
          'Thaler\'s personal account of developing mental accounting and behavioral economics, with extensive real-world examples',
        type: 'foundational',
      },
      {
        title: 'Nudge: Improving Decisions About Health, Wealth, and Happiness',
        author: 'Thaler, R., & Sunstein, C.',
        year: 2008,
        isbn: '9780143115267',
        description:
          'Practical applications of mental accounting and other behavioral biases in policy and product design',
        type: 'practical',
      },
      {
        title: 'Thinking, Fast and Slow',
        author: 'Kahneman, Daniel',
        year: 2011,
        isbn: '9780374275631',
        description:
          'Coverage of mental accounting within broader cognitive bias framework, connecting it to prospect theory',
        type: 'foundational',
      },
    ],

    articles: [
      {
        title: 'Mental Accounting in UX: How Users Categorize Money',
        author: 'Nielsen Norman Group',
        url: 'https://www.nngroup.com/articles/mental-accounting/',
        description:
          'Practical guide to mental accounting patterns in digital product design',
        type: 'practical',
      },
      {
        title: 'The Psychology of Pricing: Mental Accounting',
        author: 'Price Intelligently',
        url: 'https://www.priceintelligently.com/blog/mental-accounting',
        description:
          'How SaaS companies can ethically use mental accounting in pricing strategy',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'Richard Thaler on Mental Accounting',
        author: 'University of Chicago',
        url: 'https://www.youtube.com/watch?v=1mHjkc_5Cng',
        description:
          'Lecture by the originator of mental accounting theory with consumer behavior examples',
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
      'anchoring-bias',     // Price anchors interact with account framing
      'framing-effect',     // How costs are framed determines which account they enter
      'loss-aversion',      // Losses within a mental account feel worse than overall losses
      'sunk-cost-fallacy',  // Pre-loaded accounts create sunk cost pressure
      'endowment-effect',   // Money in "my account" feels more valuable
    ],

    conflicts: [
      'fungibility',        // Mental accounting violates the economic principle of fungibility
    ],

    confusedWith: [
      'framing-effect',     // Overlaps but framing is broader than account categorization
      'sunk-cost-fallacy',  // Related but distinct: sunk cost is about past spending, mental accounting is about categorization
      'anchoring-bias',     // Price anchoring affects accounts but is a separate mechanism
    ],

    hierarchy: {
      parent: 'cognitive-bias',
      children: [
        'payment-decoupling',
        'category-budgeting',
        'windfall-effect',
      ],
    },
  },
};
