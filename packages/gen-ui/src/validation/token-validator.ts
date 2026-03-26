/**
 * Design Token Validator
 *
 * Scans ParseResult props for raw values that should use --cg-* design tokens.
 * Returns TokenViolation[] as warnings (does not block rendering).
 */

import type { ElementNode, TokenViolation } from '../types.js';

// Patterns that indicate raw values instead of design tokens
const HEX_COLOR = /^#[0-9a-fA-F]{3,8}$/;
const RGB_COLOR = /^rgba?\s*\(/i;
const HSL_COLOR = /^hsla?\s*\(/i;
const PX_VALUE = /^\d+(\.\d+)?px$/;
const EM_VALUE = /^\d+(\.\d+)?em$/;
const REM_VALUE = /^\d+(\.\d+)?rem$/;
const RAW_FONT = /^(Arial|Helvetica|Times|Georgia|Verdana|Courier|Comic Sans|Impact)/i;

// Props that typically contain visual values
const VISUAL_PROPS = new Set([
  'color', 'backgroundColor', 'background', 'borderColor',
  'textColor', 'fill', 'stroke', 'shadow', 'boxShadow',
  'fontSize', 'fontFamily', 'fontWeight',
  'padding', 'margin', 'gap', 'spacing',
  'borderRadius', 'borderWidth', 'width', 'height',
  'minWidth', 'minHeight', 'maxWidth', 'maxHeight',
]);

function suggestToken(prop: string, value: string): string {
  if (HEX_COLOR.test(value) || RGB_COLOR.test(value) || HSL_COLOR.test(value)) {
    if (prop.toLowerCase().includes('background')) return '--cg-color-surface-default';
    if (prop.toLowerCase().includes('text') || prop.toLowerCase() === 'color') return '--cg-color-text-default';
    if (prop.toLowerCase().includes('border')) return '--cg-color-border-default';
    return '--cg-color-action-primary-background-default';
  }
  if (PX_VALUE.test(value) || EM_VALUE.test(value) || REM_VALUE.test(value)) {
    if (prop.toLowerCase().includes('font') || prop.toLowerCase().includes('size')) return '--cg-font-size-body-md';
    if (prop.toLowerCase().includes('radius')) return '--cg-radius-md';
    return '--cg-spacing-md';
  }
  if (RAW_FONT.test(value)) return '--cg-font-family-body';
  return '--cg-*';
}

function scanProps(
  component: string,
  props: Record<string, unknown>,
  violations: TokenViolation[],
): void {
  for (const [key, value] of Object.entries(props)) {
    if (typeof value === 'string' && VISUAL_PROPS.has(key)) {
      const isViolation =
        HEX_COLOR.test(value) ||
        RGB_COLOR.test(value) ||
        HSL_COLOR.test(value) ||
        PX_VALUE.test(value) ||
        EM_VALUE.test(value) ||
        REM_VALUE.test(value) ||
        RAW_FONT.test(value);

      if (isViolation) {
        violations.push({
          component,
          prop: key,
          value,
          suggestion: suggestToken(key, value),
        });
      }
    }

    // Recurse into nested ElementNodes
    if (value && typeof value === 'object' && 'type' in (value as Record<string, unknown>)) {
      const node = value as ElementNode;
      if (node.type === 'element' && node.props) {
        scanProps(node.typeName, node.props as Record<string, unknown>, violations);
      }
    }

    // Recurse into arrays
    if (Array.isArray(value)) {
      for (const item of value) {
        if (item && typeof item === 'object' && 'type' in item) {
          const node = item as ElementNode;
          if (node.type === 'element' && node.props) {
            scanProps(node.typeName, node.props as Record<string, unknown>, violations);
          }
        }
      }
    }
  }
}

/**
 * Validate an ElementNode tree for design token compliance.
 * Returns violations found (warnings, not errors).
 */
export function validateTokenUsage(root: ElementNode | null): TokenViolation[] {
  if (!root) return [];
  const violations: TokenViolation[] = [];
  scanProps(root.typeName, root.props as Record<string, unknown>, violations);
  return violations;
}
