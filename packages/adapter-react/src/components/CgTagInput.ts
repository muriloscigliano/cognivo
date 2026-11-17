import { createWrapper } from '../create-wrapper.js';
export const CgTagInput = /* @__PURE__ */ createWrapper('cg-tag-input', ['value', 'label', 'placeholder', 'helper', 'name', 'delimiter', 'max', 'allowDuplicates', 'disabled', 'error', 'success'],
  {
    onTagAdd: 'cg-tag-add',
    onTagChange: 'cg-tag-change',
    onTagRemove: 'cg-tag-remove',
  }
);
