/**
 * Dynamic Software Interfaces — S1/S2: rich app-chrome surface templates.
 * Plan: ../02-build-plan-phase-S-W.md.
 *
 * The review's "blind-realness" gap: bare Stack+TextContent reads as a wireframe.
 * These templates compose REAL chrome-bearing components (Card, Avatar,
 * MetricCard, Badge) so a generated surface reads as a shipped app — while still
 * being pure STRUCTURE with bindings (no inlined data). Shared by the mock
 * generator and (later) referenced by few-shot examples for the real adapter.
 *
 * Field set (S2, matches the golden dataset + inbox env):
 *   subject, from, receivedAt, dueDate, unread, priority, items
 */

import { field, literal } from './contracts.js';
import { node, type InterfaceTemplate } from './template.js';

/** A rich message list: a Card per message with avatar, subject, sender, badge. */
export function richListTemplate(): InterfaceTemplate {
  return {
    schemaId: 'inbox.message.v1',
    root: 'root',
    nodes: {
      root: node('root', 'Stack', { direction: literal('column'), gap: literal('sm') }, ['rowCard']),
      // Card = real chrome (border, padding, radius from the design system)
      rowCard: node('rowCard', 'Card', { variant: literal('outline'), padding: literal('md') }, ['rowInner']),
      rowInner: node('rowInner', 'Stack', { direction: literal('row'), gap: literal('md'), align: literal('center') }, ['avatar', 'texts', 'badge']),
      avatar: node('avatar', 'Avatar', { name: field('item.from'), size: literal('sm') }),
      texts: node('texts', 'Stack', { direction: literal('column'), gap: literal('xs') }, ['subject', 'meta']),
      subject: node('subject', 'TextContent', { text: field('item.subject'), size: literal('medium') }),
      meta: node('meta', 'TextContent', { text: field('item.from'), size: literal('small') }),
      badge: node('badge', 'Badge', { label: field('item.priority'), variant: literal('neutral') }),
    },
    repeats: { rowCard: { over: field('items'), as: 'item' } },
  };
}

/** A task checklist with sender context, each in a card. */
export function richTaskTemplate(): InterfaceTemplate {
  return {
    schemaId: 'inbox.message.v1',
    root: 'root',
    nodes: {
      root: node('root', 'Stack', { direction: literal('column'), gap: literal('sm') }, ['taskCard']),
      taskCard: node('taskCard', 'Card', { variant: literal('outline'), padding: literal('sm') }, ['taskRow']),
      taskRow: node('taskRow', 'Stack', { direction: literal('row'), gap: literal('md'), align: literal('center') }, ['check', 'who']),
      check: node('check', 'Checkbox', { label: field('item.subject') }),
      who: node('who', 'Badge', { label: field('item.from'), variant: literal('neutral') }),
    },
    repeats: { taskCard: { over: field('items'), as: 'item' } },
  };
}

/** A summary: a header + metric cards over the same data. */
export function richSummaryTemplate(): InterfaceTemplate {
  return {
    schemaId: 'inbox.message.v1',
    root: 'root',
    nodes: {
      root: node('root', 'Stack', { direction: literal('column'), gap: literal('lg') }, ['hdr', 'cards']),
      hdr: node('hdr', 'TextContent', { text: literal('Inbox summary'), size: literal('large') }),
      cards: node('cards', 'Stack', { direction: literal('column'), gap: literal('sm') }, ['card']),
      card: node('card', 'MetricCard', { title: field('item.subject'), value: field('item.priority') }),
    },
    repeats: { card: { over: field('items'), as: 'item' } },
  };
}
