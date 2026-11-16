/* Fixture for no-hardcoded-strings.test.ts — each flagged literal is deliberate. */
import { html, css } from 'lit';
import { defineMessages } from '../../utils/messages.js';

const MESSAGES = defineMessages('cg-fixture', { ok: 'Allowed: lives in the map' });

export const styles = css`.x { content: 'Not Flagged'; }`;

export function render(open: boolean, name: string) {
  console.warn(`Ignored: console text ${name}`);
  if (name === 'Ignored Comparison') throw new Error('Ignored error text');
  const label = open ? 'Close dialog' : MESSAGES.ok;
  return html`
    <p>No data</p>
    <cg-checkbox aria-label="Select all rows"></cg-checkbox>
    <input placeholder="Search..." type="text" />
    <span title="${name} hours"></span>
    <button aria-label=${label} @click=${() => `Remove ${name}`}>${name}</button>
  `;
}
