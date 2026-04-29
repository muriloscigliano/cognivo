import { defineRule } from '@cognivo/lens-core';

const PREFIXES = ['cg-', 'ai-'];

export const RULE_ID = 'core/system-health/cg-component-no-manifest';

/**
 * Why this rule exists:
 * Cognivo components are expected to publish a manifest at scan time
 * (`engagedBiasIds`, variant, state) so downstream rules — especially the
 * conversion + ethics packs — can reason about the cognitive load they
 * introduce. A component without a manifest is invisible to that analysis.
 * Filed as `consider` because it's a publishing hygiene issue, not a runtime
 * defect.
 */
export default defineRule({
  id: RULE_ID,
  title: 'Cognivo component is missing its manifest',
  category: 'system-health',
  severity: 'consider',
  intentScope: [],
  cost: 'cheap',
  citations: [],
  defaultEnabled: true,
  fixCategory: 'judgment',

  applies: () => true,

  detect: ({ scene }) => {
    const offenders = scene.find('*').filter(
      (n) => PREFIXES.some((p) => n.tag.startsWith(p)) && n.componentManifest === undefined
    );
    if (offenders.length === 0) return undefined;
    return offenders.map((node) => ({
      targetNodeId: node.id,
      confidence: 90,
      message: `<${node.tag}> has no component manifest.`,
      why:
        'Conversion / ethics rules read engagedBiasIds from the component manifest. Without it, ' +
        'this component is invisible to bias analysis. Publish the component with a manifest entry ' +
        'in @cognivo/components or its consumer package.',
      fixHint: {
        kind: 'restructure',
        summary: 'Add a component manifest entry exposing engagedBiasIds + variant + state.',
        reason: 'Manifests power downstream bias and persona analysis.',
      },
    }));
  },

  fixtures: [
    { name: 'cg-no-manifest', expect: 'finding' },
    { name: 'ai-no-manifest', expect: 'finding' },
    { name: 'cg-with-manifest', expect: 'no-finding' },
    { name: 'plain-html', expect: 'no-finding' },
    { name: 'bias-wrapper', expect: 'no-finding' },
  ],
});
