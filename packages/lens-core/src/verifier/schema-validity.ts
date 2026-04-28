import type { FixManifest } from '../types/fix.js';
import type { CheckResult, VerifierCheck } from './types.js';

/**
 * WAI-ARIA 1.2 role enumeration (subset commonly relevant to design-system audits).
 * Sourced from https://www.w3.org/TR/wai-aria-1.2/#role_definitions.
 */
const VALID_ARIA_ROLES = new Set([
  'alert', 'alertdialog', 'application', 'article', 'banner', 'button',
  'cell', 'checkbox', 'columnheader', 'combobox', 'complementary',
  'contentinfo', 'definition', 'dialog', 'directory', 'document',
  'feed', 'figure', 'form', 'grid', 'gridcell', 'group', 'heading',
  'img', 'link', 'list', 'listbox', 'listitem', 'log', 'main',
  'marquee', 'math', 'menu', 'menubar', 'menuitem', 'menuitemcheckbox',
  'menuitemradio', 'navigation', 'none', 'note', 'option', 'presentation',
  'progressbar', 'radio', 'radiogroup', 'region', 'row', 'rowgroup',
  'rowheader', 'scrollbar', 'search', 'searchbox', 'separator', 'slider',
  'spinbutton', 'status', 'switch', 'tab', 'table', 'tablist', 'tabpanel',
  'term', 'textbox', 'timer', 'toolbar', 'tooltip', 'tree', 'treegrid',
  'treeitem',
]);

const ARIA_BOOLEAN_VALUES = new Set(['true', 'false']);
const ARIA_TRISTATE_VALUES = new Set(['true', 'false', 'mixed']);

const ARIA_BOOLEAN_ATTRS = ['aria-hidden', 'aria-disabled', 'aria-required', 'aria-readonly', 'aria-selected', 'aria-expanded'];
const ARIA_TRISTATE_ATTRS = ['aria-pressed', 'aria-checked'];

/**
 * Schema-validity check (Spec §9.4):
 * ARIA attribute values must be valid per WAI-ARIA spec.
 */
function runSchemaValidity(manifest: FixManifest): CheckResult {
  const attrChanges = manifest.preview?.attributeChanges ?? [];

  for (const change of attrChanges) {
    const name = change.attribute.toLowerCase();
    const value = change.value;
    if (value === null) continue; // removal is always safe

    if (name === 'role' && !VALID_ARIA_ROLES.has(value)) {
      return {
        checkId: 'schema-validity',
        passed: false,
        reason: `"${value}" is not a valid WAI-ARIA role.`,
      };
    }

    if (ARIA_BOOLEAN_ATTRS.includes(name) && !ARIA_BOOLEAN_VALUES.has(value)) {
      return {
        checkId: 'schema-validity',
        passed: false,
        reason: `${name} requires "true" or "false", got "${value}".`,
      };
    }

    if (ARIA_TRISTATE_ATTRS.includes(name) && !ARIA_TRISTATE_VALUES.has(value)) {
      return {
        checkId: 'schema-validity',
        passed: false,
        reason: `${name} requires "true", "false", or "mixed", got "${value}".`,
      };
    }
  }

  return { checkId: 'schema-validity', passed: true };
}

export const checkSchemaValidity: VerifierCheck = Object.assign(runSchemaValidity, {
  checkId: 'schema-validity' as const,
});
