import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { AiAgentCard } from '../components/ai-agent-card/ai-agent-card.js';

if (!customElements.get('ai-agent-card')) {
  customElements.define('ai-agent-card', AiAgentCard);
}

const nextFrame = () => new Promise<void>((r) => requestAnimationFrame(() => r()));

describe('ai-agent-card', () => {
  let el: AiAgentCard;

  beforeEach(async () => {
    el = document.createElement('ai-agent-card') as AiAgentCard;
    el.name = 'Researcher';
    el.agentRole = 'Data Analyst';
    el.status = 'thinking';
    el.task = 'Querying vector store...';
    el.handoffChain = ['Planner', 'Researcher', 'Coder'];
    el.capabilities = ['search', 'summarize'];
    document.body.appendChild(el);
    await el.updateComplete;
  });

  afterEach(() => el.remove());

  it('highlights this agent as the current handoff step, with past and future steps distinct', () => {
    const steps = el.shadowRoot!.querySelectorAll('.handoff-step');
    expect(steps.length).toBe(3);
    expect(steps[0].classList.contains('past')).toBe(true);
    expect(steps[1].classList.contains('current')).toBe(true);
    expect(steps[2].classList.contains('current')).toBe(false);
    expect(steps[2].classList.contains('past')).toBe(false);
  });

  it('falls back to the last chain entry when the agent name is not in the chain', async () => {
    el.name = 'Orchestrator';
    await el.updateComplete;
    const steps = el.shadowRoot!.querySelectorAll('.handoff-step');
    expect(steps[2].classList.contains('current')).toBe(true);
  });

  it('exposes the agent role via agent-role without hijacking the ARIA role attribute', async () => {
    el.remove();
    el = document.createElement('ai-agent-card') as AiAgentCard;
    el.setAttribute('agent-role', 'Data Analyst');
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('.role')!.textContent).toBe('Data Analyst');
    // The host's ARIA role attribute must stay untouched by the property.
    expect(el.getAttribute('role')).toBeNull();
  });

  it('renders pause/cancel actions in-flow inside the header when active', () => {
    expect(el.shadowRoot!.querySelector('.header .actions')).not.toBeNull();
    const badge = el.shadowRoot!.querySelector('.header .header-badge');
    expect(badge).not.toBeNull();
  });

  it('names the handoff and capabilities containers with role="group"', () => {
    const handoff = el.shadowRoot!.querySelector('.handoff')!;
    expect(handoff.getAttribute('role')).toBe('group');
    expect(handoff.getAttribute('aria-label')).toContain('Handoff:');
    const caps = el.shadowRoot!.querySelector('.caps')!;
    expect(caps.getAttribute('role')).toBe('group');
    expect(caps.getAttribute('aria-label')).toContain('Capabilities:');
  });

  it('announces status transitions in the polite live region', async () => {
    const live = el.shadowRoot!.querySelector('[role="status"]')!;
    expect(live.getAttribute('aria-live')).toBe('polite');
    el.status = 'done';
    await el.updateComplete;
    await nextFrame();
    await el.updateComplete;
    expect(live.textContent).toContain('Researcher: done');
  });
});
