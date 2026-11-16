// Type-level test. Compiled by types.test.ts against the BUILT declarations
// (dist/), resolved through the package's own `exports` — exactly what a
// consumer's TypeScript sees. Lines marked @ts-expect-error MUST fail.
import type { MouseEvent } from 'react';
import { CgButton, CgCheckbox, CgChip, CgCombobox, CgInput, CgLink, CgModal, CgSelect, CgTable, AiCommandPalette } from '@cognivo/adapter-react';

export const ok = [
  <CgInput key="1" name="email" type="email" label="E-mail" required value="x" onCgInput={(e) => e.detail.value} />,
  <CgCheckbox key="2" name="consent" checked onCgChange={(e) => e.detail.checked} />,
  <CgButton key="3" type="submit" variant="primary" id="save" style={{ width: 1 }}>Save</CgButton>,
  <CgCombobox key="4" name="source" options={[{ value: 'a', label: 'A' }]} onComboboxChange={(e: CustomEvent) => e.detail} />,
  <CgModal key="5" open title="Add contact" onClose={() => undefined}><p>body</p></CgModal>,
  <CgSelect key="6" name="status" onCgChange={(e) => e.detail.value} />,
  <AiCommandPalette key="7" onCommandClose={() => undefined} />,
  // Data props follow the element class, not a drifting hand-written interface.
  <CgTable key="8" columns={[{ key: 'name', label: 'Name' }]} rows={[['Ana']]} />,
  // onClick is React's native click everywhere; the custom event has its own name.
  <CgLink key="9" href="/" onClick={(e: MouseEvent<HTMLElement>) => e.clientX} onLinkClick={(e: CustomEvent) => e.detail} />,
  <CgChip key="10" onClick={(e: MouseEvent<HTMLElement>) => e.button} onChipClick={(e: CustomEvent) => e.detail} />,
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
  // @ts-expect-error rows are arrays of cells
  <CgTable key="b5" rows={[{ name: 'Ana' }]} />,
  // @ts-expect-error onClick is the native MouseEvent handler, not a CustomEvent one
  <CgLink key="b6" onClick={(e: CustomEvent<{ href: string }>) => e.detail.href} />,
];
