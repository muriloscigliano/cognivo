// Type-level test. Compiled by types.test.ts against the BUILT declarations
// (dist/), resolved through the package's own `exports` — exactly what a
// consumer's TypeScript sees. Lines marked @ts-expect-error MUST fail.
import { CgButton, CgCheckbox, CgCombobox, CgInput, CgModal, CgSelect, AiCommandPalette } from '@cognivo/adapter-react';

export const ok = [
  <CgInput key="1" name="email" type="email" label="E-mail" required value="x" onInput={(e) => e.detail.value} />,
  <CgCheckbox key="2" name="consent" checked onChange={(e) => e.detail.checked} />,
  <CgButton key="3" type="submit" variant="primary" id="save" style={{ width: 1 }}>Save</CgButton>,
  <CgCombobox key="4" name="source" options={[{ value: 'a', label: 'A' }]} onChange={(e: CustomEvent) => e.detail} />,
  <CgModal key="5" open title="Add contact" onClose={() => undefined}><p>body</p></CgModal>,
  <CgSelect key="6" name="status" onChange={(e) => e.detail.value} />,
  <AiCommandPalette key="7" onCommandClose={() => undefined} />,
];

export const bad = [
  // @ts-expect-error unknown prop (typo) on a typed wrapper
  <CgInput key="b1" valu="typo" />,
  // @ts-expect-error wrong prop type
  <CgButton key="b2" variant={42} />,
  // @ts-expect-error derived wrapper: size is a closed union on cg-modal
  <CgModal key="b3" size="huge" />,
  // @ts-expect-error derived wrapper: unknown prop
  <CgCombobox key="b4" optionz={[]} />,
];
