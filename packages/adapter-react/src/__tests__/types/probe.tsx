// Type-level test. Compiled by types.test.ts against the BUILT declarations
// (dist/), resolved through the package's own `exports` — exactly what a
// consumer's TypeScript sees. Lines marked @ts-expect-error MUST fail.
import { createRef, type MouseEvent } from 'react';
import { CgAppShell, CgButton, CgCheckbox, CgChip, CgCombobox, CgInput, CgLink, CgModal, CgPagination, CgSelect, CgTable, CgTextarea, AiCommandPalette } from '@cognivo/adapter-react';
import type { CgTableColumn, CgTableSort, CgPageChangeDetail, CgTextareaElement } from '@cognivo/adapter-react';

// cg-textarea: a typed ref with the selection API (insert at the cursor).
const textareaRef = createRef<CgTextareaElement>();
export const insertVariable = (): void => {
  const ta = textareaRef.current;
  if (!ta) return;
  ta.setRangeText('{{first_name}}', ta.selectionStart ?? 0, ta.selectionEnd ?? 0, 'end');
  ta.setSelectionRange(0, 0, 'forward');
  ta.focus();
};

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
  // cg-table: name, row headers, sorting (accessor/compare, controlled + manual), rich cells.
  <CgTable
    key="11"
    caption="Open deals"
    captionHidden
    label="Deals"
    labelledby="deals-heading"
    manualSort
    sort={{ key: 'amount', direction: 'desc' }}
    columns={[
      { key: 'company', label: 'Company', rowHeader: true, slotted: true, sortable: true, accessor: (cell: unknown) => String(cell) },
      { key: 'amount', label: 'Amount', sortable: true, align: 'right', compare: (a: unknown, b: unknown) => Number(a) - Number(b) },
    ]}
    rows={[['Acme', 300]]}
    onSortChange={(e) => { const s: CgTableSort = e.detail; return s.direction === 'asc'; }}
    onSort={(e) => e.detail.key}
  >
    <a slot="cell-0-company" href="/deals/1">Acme</a>
  </CgTable>,
  <CgTable key="12" sort={null} />,
  // cg-pagination cursor mode.
  <CgPagination
    key="13"
    mode="cursor"
    hasPrevious
    hasNext={false}
    messages={{ previousLabel: 'Anterior', nextLabel: 'Próxima' }}
    onPageChange={(e) => { const d: CgPageChangeDetail = e.detail; return 'direction' in d ? d.direction : d.page; }}
  />,
  <CgPagination key="14" total={10} current={2} onPageChange={(e) => ('page' in e.detail ? e.detail.page : 0)} />,
  // cg-input type="date" with min/max.
  <CgInput key="15" type="date" name="close" label="Close date" min="2026-01-01" max="2026-12-31" />,
  // cg-button link mode.
  <CgButton key="16" href="/deals/new" target="_blank" rel="noopener noreferrer" variant="secondary">New deal</CgButton>,
  // cg-select accessible label different from the visible one.
  <CgSelect key="17" label="Stage" accessibleLabel="Deal stage" />,
  <CgSelect key="18" aria-label="Filter by stage" />,
  // cg-table truncating column.
  <CgTable key="19" columns={[{ key: 'notes', label: 'Notes', truncate: true, width: '240px' }]} rows={[['…']]} />,
  <CgTextarea key="20" ref={textareaRef} name="body" />,
  <CgAppShell key="21" sidebarCollapsed onToggle={(e: CustomEvent) => e.detail} />,
];

export const column: CgTableColumn = { key: 'x', label: 'X', rowHeader: true };


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
  // @ts-expect-error sort direction is asc | desc
  <CgTable key="b7" sort={{ key: 'name', direction: 'up' }} />,
  // @ts-expect-error onSortChange's detail is a TableSort
  <CgTable key="b8" onSortChange={(e: CustomEvent<{ page: number }>) => e.detail.page} />,
  // @ts-expect-error pagination mode is pages | cursor
  <CgPagination key="b9" mode="infinite" />,
  // @ts-expect-error onPageChange's detail is { page } | { direction }
  <CgPagination key="b10" onPageChange={(e: CustomEvent<{ cursor: string }>) => e.detail.cursor} />,
  // @ts-expect-error hasNext is a boolean
  <CgPagination key="b11" hasNext="yes" />,
  // @ts-expect-error cg-input types are a closed union
  <CgInput key="b12" type="datetime" />,
  // @ts-expect-error href is a string
  <CgButton key="b13" href={42} />,
  // @ts-expect-error truncate is a boolean
  <CgTable key="b14" columns={[{ key: 'a', label: 'A', truncate: 'yes' }]} />,
  // @ts-expect-error accessibleLabel is a string
  <CgSelect key="b15" accessibleLabel={1} />,
];
