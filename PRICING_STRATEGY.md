# Pricing Strategy
## Cognivo Business Model & Pricing Tiers

**Last Updated:** November 16, 2025

---

## Overview

Cognivo's pricing is designed to be **fair, transparent, and value-aligned**. We believe you should pay based on the value you receive, not arbitrary seat counts or feature gates.

### Pricing Philosophy

1. **Start Free** - Generous free tier for developers and small teams
2. **Pay for Usage** - Scale costs with actual AI usage, not team size
3. **Open Core** - Core library is MIT licensed and free forever
4. **Premium Services** - Pay for hosted services, support, and enterprise features

---

## 🎯 Pricing Tiers

### Tier 1: Open Source (FREE)

**Price:** $0 forever

**What's Included:**
- ✅ Full access to `@cognivo/components` library (207 components)
- ✅ Complete `@cognivo/core` AI framework
- ✅ Design token system
- ✅ All 8 AI intents (EXPLAIN, FORECAST, DETECT_ANOMALY, etc.)
- ✅ Framework support (Vue, React, Svelte, vanilla JS)
- ✅ MIT License (use commercially, modify, distribute)
- ✅ Community support (GitHub Discussions, Discord)
- ✅ Documentation and examples

**Bring Your Own:**
- 🔑 Your own OpenAI/Anthropic API key
- ☁️ Your own hosting (Vercel, Netlify, AWS, etc.)
- 📊 Your own analytics and monitoring

**Perfect For:**
- Individual developers
- Side projects and prototypes
- Open source projects
- Small startups (<10 people)
- Learning and experimentation

**Getting Started:**
```bash
pnpm add @cognivo/components @cognivo/adapter-openai
# Use with your own OpenAI API key
```

**Typical Monthly Cost:**
- Library: $0
- OpenAI API (light usage): $5-15/month
- **Total: $5-15/month**

---

### Tier 2: Developer ($49/month)

**Price:** $49/month per project (or $39/month billed annually)

**Everything in Free, plus:**
- ✅ **Hosted AI Gateway** - No need for API keys in frontend
- ✅ **Request analytics** - Dashboard showing AI usage, costs, performance
- ✅ **Prompt caching** - 60-90% cost savings on AI requests
- ✅ **Rate limiting** - Protect against abuse and runaway costs
- ✅ **Multiple AI providers** - Switch between OpenAI, Anthropic, local models
- ✅ **Priority support** - Email support with 48-hour response
- ✅ **Usage alerts** - Get notified before hitting limits

**Includes:**
- 10,000 AI requests/month
- 5 GB prompt cache storage
- 3 team members
- Standard support (email, 48h response)

**Additional usage:**
- $5 per 1,000 additional AI requests
- Auto-scaling with usage-based billing

**Perfect For:**
- Professional developers
- Growing startups (10-50 people)
- Production applications
- Teams needing better cost control

**Value Proposition:**
- Save 60-90% on AI costs with prompt caching
- No API key management headaches
- Better security (keys stay server-side)
- Usage insights and cost optimization

**ROI Example:**
```
Without Cognivo Developer:
- OpenAI direct: $120/month (10K requests without caching)

With Cognivo Developer:
- Subscription: $49/month
- AI requests: Included (10K requests with caching)
- Savings: $71/month = $852/year
```

---

### Tier 3: Team ($149/month)

**Price:** $149/month (or $119/month billed annually)

**Everything in Developer, plus:**
- ✅ **50,000 AI requests/month** (5x more)
- ✅ **Unlimited team members**
- ✅ **Advanced analytics** - Custom dashboards, exports, API access
- ✅ **Custom AI models** - Use your own fine-tuned models
- ✅ **Webhook integrations** - Connect to Slack, Datadog, etc.
- ✅ **SSO/SAML** - Enterprise authentication
- ✅ **Priority support** - Email + chat, 24-hour response
- ✅ **Quarterly business reviews** - Optimize your AI usage

**Includes:**
- 50,000 AI requests/month
- Unlimited team members
- 25 GB prompt cache storage
- Custom domain support
- Advanced role-based access control

**Additional usage:**
- $4 per 1,000 additional AI requests (20% discount)

**Perfect For:**
- Established companies (50-200 people)
- Multiple production applications
- Teams requiring advanced features
- Organizations with compliance needs

**Value Proposition:**
- Significant volume discounts
- Better collaboration with unlimited seats
- Advanced security and compliance
- Dedicated support and optimization help

---

### Tier 4: Enterprise (Custom Pricing)

**Price:** Contact sales (typically $999+ /month)

**Everything in Team, plus:**
- ✅ **Custom AI request volume** - Negotiated based on needs
- ✅ **On-premises deployment** - Run Cognivo in your own infrastructure
- ✅ **Custom SLA** - Uptime guarantees, dedicated support
- ✅ **White-label** - Remove Cognivo branding
- ✅ **Custom integrations** - Build custom adapters and features
- ✅ **Training and onboarding** - Dedicated workshops for your team
- ✅ **24/7 phone support** - Direct line to engineering team
- ✅ **Legal and security reviews** - Help with compliance, audits, etc.

**Perfect For:**
- Large enterprises (200+ people)
- Highly regulated industries (finance, healthcare)
- Companies with strict data sovereignty requirements
- Organizations needing custom features

**What's Negotiable:**
- Request volume and pricing
- SLA terms (99.9%, 99.99%)
- Deployment model (cloud, on-prem, hybrid)
- Support level (24/7, dedicated team)
- Custom development work

**Contact:** enterprise@cognivo.dev

---

## 📊 Pricing Comparison

| Feature | Open Source | Developer | Team | Enterprise |
|---------|-------------|-----------|------|------------|
| **Price** | $0 | $49/mo | $149/mo | Custom |
| **AI Requests/mo** | Unlimited* | 10,000 | 50,000 | Custom |
| **Team Members** | Unlimited | 3 | Unlimited | Unlimited |
| **Components** | All 207 | All 207 | All 207 | All 207 |
| **AI Intents** | All 8 | All 8 | All 8 | All 8 |
| **Frameworks** | All | All | All | All |
| **License** | MIT | MIT | MIT | Custom |
| **Hosted Gateway** | ❌ | ✅ | ✅ | ✅ |
| **Prompt Caching** | ❌ | ✅ | ✅ | ✅ |
| **Analytics** | ❌ | Basic | Advanced | Custom |
| **Multi-Provider** | ✅ DIY | ✅ | ✅ | ✅ |
| **SSO/SAML** | ❌ | ❌ | ✅ | ✅ |
| **Support** | Community | Email (48h) | Email+Chat (24h) | 24/7 Phone |
| **SLA** | None | 99% | 99.5% | Custom |
| **On-Premises** | ✅ | ❌ | ❌ | ✅ |
| **White-Label** | ❌ | ❌ | ❌ | ✅ |

\* You pay your own AI provider costs (OpenAI, Anthropic, etc.)

---

## 💰 Cost Calculator

### Example 1: Early-Stage Startup

**Scenario:**
- 5-person team
- 1 production dashboard
- 200 AI requests/day = 6,000/month
- Light usage

**Recommended Tier:** Developer ($49/month)

**Total Cost:**
- Cognivo: $49/month
- AI requests: Included in plan
- **Total: $49/month**

**vs. Building In-House:**
- 2 weeks dev time: $10,000
- Ongoing maintenance: $2,000/month
- AI costs without caching: $100/month
- **Total First Year: $34,400**

**Savings with Cognivo:** $33,812 first year

---

### Example 2: Growing SaaS Company

**Scenario:**
- 25-person team
- 5 production dashboards
- 1,000 AI requests/day = 30,000/month
- Medium usage

**Recommended Tier:** Team ($149/month)

**Total Cost:**
- Cognivo: $149/month
- AI requests: Included (30K < 50K limit)
- **Total: $149/month**

**vs. Building In-House:**
- 1 month dev time: $20,000
- Ongoing maintenance: $5,000/month
- AI costs without caching: $500/month
- **Total First Year: $86,000**

**Savings with Cognivo:** $84,212 first year

---

### Example 3: Enterprise

**Scenario:**
- 200-person company
- 20+ production dashboards
- 10,000 AI requests/day = 300,000/month
- Heavy usage across many teams

**Recommended Tier:** Enterprise (Custom)

**Estimated Cost:**
- Cognivo: $2,000/month (negotiated)
- Includes 300K requests/month
- On-premises deployment option
- Dedicated support team
- **Total: $2,000/month**

**vs. Building In-House:**
- 3 months dev time: $120,000
- Ongoing team (2 engineers): $25,000/month
- AI costs: $3,000/month
- **Total First Year: $456,000**

**Savings with Cognivo:** $432,000 first year

---

## 🎁 Add-Ons & Services

### Professional Services

| Service | Price | Description |
|---------|-------|-------------|
| **Quick Start Package** | $2,500 | 2-day workshop: architecture review, implementation help, best practices |
| **Custom Integration** | $5,000+ | Build custom AI adapter for your proprietary model or data source |
| **Migration Service** | $3,000+ | Migrate from existing BI tool or custom solution to Cognivo |
| **Training Workshop** | $1,500/day | On-site or remote training for your team |
| **Consulting** | $250/hour | Ad-hoc consulting, architecture review, optimization |

### Technical Support Packages

| Package | Price | What's Included |
|---------|-------|-----------------|
| **Basic** (included in Developer) | Included | Email support, 48h response |
| **Priority** (included in Team) | Included | Email + chat support, 24h response |
| **Premium** | +$500/month | 4-hour response, video calls, dedicated Slack channel |
| **Enterprise** | Custom | 24/7 phone support, dedicated engineer |

---

## 🔄 Migration Credits

### Switch from Competitor?

We offer **migration credits** to help you switch from traditional BI tools or custom solutions:

| From | Migration Credit | Valid For |
|------|-----------------|-----------|
| **Tableau, Power BI, Looker** | $500 credit | Applied to first 3 months |
| **Custom AI integration** | $1,000 credit | Applied to first 6 months |
| **Other AI component library** | $250 credit | Applied to first 3 months |

**How to Claim:**
1. Contact sales@cognivo.dev
2. Provide proof of current tool usage
3. Commit to annual plan
4. Receive credits applied to your account

---

## 📈 Pricing Rationale

### Why These Prices?

**Developer Tier ($49/month):**
- Costs us ~$20/month to serve (hosting, AI caching, support)
- **Margin:** 60% (sustainable and fair)
- **Value:** Save $71+ /month on AI costs alone (prompt caching)

**Team Tier ($149/month):**
- Costs us ~$70/month to serve
- **Margin:** 53%
- **Value:** Save $300+ /month vs. direct AI provider costs

**Enterprise Tier:**
- Variable costs based on volume and deployment
- **Margin:** 40-60% depending on customization
- **Value:** Save $400K+ /year vs. building in-house

### Competitive Positioning

**vs. Traditional BI (Tableau, Power BI):**
- Tableau: $70/user/month = $840/year per user
- Cognivo Team: $149/month = $1,788/year for unlimited users
- **Savings:** For 10-user team: $6,612/year

**vs. Building In-House:**
- Engineering cost: $200K+ first year
- Ongoing maintenance: $60K+/year
- Cognivo: $49-149/month = $588-1,788/year
- **Savings:** $198K+ first year

**vs. AI Chatbot UIs:**
- Most chatbot UIs: $200-500/month for basic features
- Cognivo: Better structured outputs, UI integration
- **Competitive:** Similar or lower pricing for superior product

---

## 🎯 Pricing Strategy Goals

### Year 1 (2025)
- **Target:** 100 paid customers
- **Mix:** 70% Developer, 25% Team, 5% Enterprise
- **MRR Goal:** $10,000/month
- **Focus:** Product-market fit, customer feedback, iteration

### Year 2 (2026)
- **Target:** 500 paid customers
- **Mix:** 50% Developer, 40% Team, 10% Enterprise
- **MRR Goal:** $75,000/month
- **Focus:** Scale, enterprise features, international expansion

### Year 3 (2027)
- **Target:** 2,000 paid customers
- **Mix:** 40% Developer, 45% Team, 15% Enterprise
- **MRR Goal:** $250,000/month
- **Focus:** Market leadership, ecosystem, partnerships

---

## 💡 Monetization Philosophy

### What's Free Forever

- Core library code (MIT license)
- All 207 components
- All 8 AI intents
- Framework integrations
- Design tokens
- Documentation
- Community support

**Why?** We believe great tools should be accessible. Open source builds community, trust, and adoption.

### What's Paid

- Hosted services (gateway, caching, analytics)
- Premium support
- Enterprise features (SSO, on-prem, SLA)
- Professional services

**Why?** Running infrastructure and providing world-class support costs money. We charge for the services that require ongoing costs and dedicated teams.

---

## 🚀 Special Offers

### Early Adopter Pricing (Limited Time)

**Lock in 50% off for life** if you sign up before December 31, 2025:
- Developer: ~~$49~~ **$24.50/month** forever
- Team: ~~$149~~ **$74.50/month** forever

**Conditions:**
- Must commit to annual billing
- Price lock guaranteed as long as subscription active
- Offer ends December 31, 2025 or after 100 customers (whichever comes first)

### Open Source Discount

**50% off any paid tier** if you:
- Maintain a popular open source project (1,000+ stars)
- Use Cognivo in your public project
- Add "Powered by Cognivo" badge to your README

### Educational/Non-Profit

**Free Team tier** for:
- Accredited educational institutions
- Registered non-profit organizations
- Government agencies (case-by-case)

**Requirements:**
- Provide proof of status
- Use for non-commercial purposes
- Willing to be featured as case study (optional)

---

## 📞 Sales & Support

### How to Buy

**Developer & Team:**
- Self-serve signup at cognivo.dev
- Credit card billing via Stripe
- Instant activation
- Cancel anytime

**Enterprise:**
- Contact sales@cognivo.dev
- Custom quote within 2 business days
- Contract negotiation
- Onboarding support included

### Payment Methods

- Credit card (Visa, Mastercard, Amex)
- ACH (US only, for annual plans)
- Wire transfer (Enterprise only)
- Purchase order (Enterprise, 30-day terms)

### Billing

- Monthly or annual billing
- Annual gets 20% discount
- Usage-based overages billed monthly
- No hidden fees
- Cancel anytime (no refunds on annual plans)

---

## ❓ FAQ

**Q: What happens if I exceed my AI request limit?**

A: You'll be charged $5 per 1,000 additional requests (Developer) or $4 per 1,000 (Team). We'll email you before charging, and you can set usage caps in your dashboard.

**Q: Can I switch tiers mid-month?**

A: Yes! Upgrades take effect immediately (prorated credit). Downgrades take effect at next billing cycle.

**Q: Do you offer refunds?**

A: Monthly plans: Cancel anytime, no refunds for partial months. Annual plans: No refunds, but you can downgrade/cancel for next year.

**Q: What if I'm already on a paid plan and my usage drops?**

A: Downgrade anytime. Your new rate starts next billing cycle.

**Q: Can I use the free tier in production?**

A: Absolutely! The free tier is MIT licensed. Use it however you want. Just bring your own AI provider API key.

**Q: Is the source code really free?**

A: Yes. The core library is MIT licensed on GitHub. Use it, modify it, distribute it. No strings attached.

**Q: What's the difference between Free and Developer besides hosting?**

A: Mainly the hosted AI gateway (better security, cost savings via caching) and usage analytics. The components and features are identical.

**Q: Do I need to credit Cognivo if I use the free tier?**

A: Not required, but appreciated! Add "Built with Cognivo" to your app or docs.

---

## 🎓 For Investors

### Unit Economics

| Metric | Value | Notes |
|--------|-------|-------|
| **CAC** (Customer Acquisition Cost) | $200-500 | Via content marketing, SEO, developer advocacy |
| **ARPU** (Avg Revenue Per User) | $75/month | Blended across all tiers |
| **Gross Margin** | 75% | High margin SaaS product |
| **Churn** (target) | <5%/month | Low churn due to integration stickiness |
| **LTV** (Lifetime Value) | $1,800+ | 24+ month avg customer lifetime |
| **LTV:CAC Ratio** | 3.6:1 | Healthy unit economics |
| **Payback Period** | 6.7 months | Fast payback, reinvest in growth |

### Market Opportunity

- **TAM:** $15B (BI tools market)
- **SAM:** $3B (Developer-focused BI)
- **SOM:** $150M (AI-native segment, 2027)

**Target:** Capture 5% of SOM by 2027 = $7.5M ARR

---

## 📚 Related Documents

- [AI_CAPABILITY_MATRIX.md](./AI_CAPABILITY_MATRIX.md) - What Cognivo can do
- [FINANCIAL_DASHBOARD.md](./FINANCIAL_DASHBOARD.md) - Complete implementation example
- [WHY_COGNIVO.md](./WHY_COGNIVO.md) - Why choose Cognivo

---

**Ready to get started?** Sign up at **cognivo.dev** or contact **sales@cognivo.dev** for Enterprise inquiries.
