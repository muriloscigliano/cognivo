# Cognivo UI Patterns

Reference compositions for the most common UI tasks. Each pattern uses Cognivo tags, tier-2 tokens for colors, and bias wrappers only where the psychology genuinely applies.

## 1. Pricing page (3 tiers with anchoring + social proof)

```html
<cg-stack direction="row" gap="lg" align="stretch">
  <cg-card variant="outlined">
    <cg-text slot="header" variant="title">Starter</cg-text>
    <cg-text variant="display">$9/mo</cg-text>
    <cg-button variant="secondary" full-width>Choose Starter</cg-button>
  </cg-card>

  <bias-anchoring anchor="$199" current="$99" label="Save 50%">
    <cg-card variant="elevated">
      <cg-badge slot="header" variant="success">Most popular</cg-badge>
      <cg-text variant="display">$99/mo</cg-text>
      <bias-social-proof count="2400" type="purchased"></bias-social-proof>
      <cg-button variant="primary" full-width>Choose Pro</cg-button>
    </cg-card>
  </bias-anchoring>

  <cg-card variant="outlined">
    <cg-text slot="header" variant="title">Enterprise</cg-text>
    <cg-text variant="display">Custom</cg-text>
    <cg-button variant="secondary" full-width>Contact sales</cg-button>
  </cg-card>
</cg-stack>
```

Rationale: anchoring raises perceived value on the middle tier; social-proof converts the hesitant buyer. Starter and Enterprise use `outlined` so the elevated Pro card visually leads.

## 2. Dashboard layout

```html
<cg-stack direction="column">
  <cg-navbar brand="Acme" sticky>
    <cg-button slot="end" variant="primary">New project</cg-button>
  </cg-navbar>

  <cg-stack direction="row">
    <cg-sidebar collapsible>
      <!-- nav items -->
    </cg-sidebar>

    <cg-stack direction="column" gap="lg" padding="lg">
      <cg-stack direction="row" gap="md">
        <cg-metric-card label="Revenue" value="$42K" change="+12%"></cg-metric-card>
        <cg-metric-card label="Users" value="1.2K" change="+3%"></cg-metric-card>
        <cg-metric-card label="Conversion" value="4.8%" change="-0.3%"></cg-metric-card>
      </cg-stack>

      <cg-chart type="line" data-src="/api/revenue"></cg-chart>

      <ai-data-table src="/api/recent" sortable anomaly-detection></ai-data-table>
    </cg-stack>
  </cg-stack>
</cg-stack>
```

## 3. AI chat screen

```html
<cg-stack direction="column" style="height: 100dvh">
  <cg-navbar brand="Assistant" sticky></cg-navbar>

  <ai-chat
    stream-url="/api/chat/stream"
    show-follow-ups
    enable-markdown
    enable-copy
  >
    <ai-thinking slot="loading" variant="dots"></ai-thinking>
    <ai-empty-state
      slot="empty"
      title="Ask anything"
      description="I can summarize, draft, or analyze your data."
    ></ai-empty-state>
  </ai-chat>
</cg-stack>
```

## 4. Onboarding flow (progressive commitment)

```html
<bias-commitment step="2" total="4" show-progress>
  <cg-card variant="elevated">
    <cg-text slot="header" variant="title">Tell us about your team</cg-text>

    <cg-stack direction="column" gap="md" data-step="1">
      <cg-input label="Team name" required></cg-input>
      <cg-select label="Team size" required></cg-select>
    </cg-stack>

    <cg-stack slot="footer" direction="row" gap="sm" justify="end">
      <cg-button variant="ghost">Back</cg-button>
      <cg-button variant="primary">Continue</cg-button>
    </cg-stack>
  </cg-card>
</bias-commitment>
```

Rationale: progressive commitment improves completion by front-loading small asks. Use only when step-by-step genuinely reduces cognitive load.

## 5. Settings page (tabbed form)

```html
<cg-stack direction="column" gap="lg" padding="xl">
  <cg-text variant="heading">Settings</cg-text>

  <cg-tabs value="profile">
    <cg-tabs-panel value="profile" label="Profile">
      <cg-form>
        <cg-input label="Display name"></cg-input>
        <cg-input label="Email" type="email"></cg-input>
        <cg-textarea label="Bio" rows="4"></cg-textarea>
        <cg-button slot="submit" variant="primary">Save changes</cg-button>
      </cg-form>
    </cg-tabs-panel>

    <cg-tabs-panel value="billing" label="Billing">
      <ai-cost-dashboard period="month"></ai-cost-dashboard>
    </cg-tabs-panel>

    <cg-tabs-panel value="api" label="API keys">
      <ai-api-key-manager></ai-api-key-manager>
    </cg-tabs-panel>
  </cg-tabs>
</cg-stack>
```

## 6. Landing hero with reciprocity CTA

```html
<cg-stack direction="column" align="center" gap="xl" padding="2xl">
  <cg-text variant="display" align="center">Ship AI features in minutes.</cg-text>
  <cg-text variant="lead" align="center" muted>
    Drop-in components with streaming, retries, and observability built in.
  </cg-text>

  <bias-reciprocity gift="Free 14-day trial — no credit card" icon="gift" prominence="high">
    <cg-stack direction="row" gap="sm">
      <cg-button variant="primary" size="lg">Start free</cg-button>
      <cg-button variant="ghost" size="lg">Watch demo</cg-button>
    </cg-stack>
  </bias-reciprocity>

  <bias-authority source="Stripe, Vercel, Linear" kind="featured"></bias-authority>
</cg-stack>
```

Rationale: reciprocity lowers activation energy before the ask; authority provides legitimacy without overclaiming.
