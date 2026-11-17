import { createWrapper } from '../create-wrapper.js';
export const CgCommand = /* @__PURE__ */ createWrapper('cg-command', ['open', 'placeholder', 'commands', 'value', 'emptyText', 'loading'],
  {
    onOpen: 'cg-command-open',
    onClose: 'cg-command-close',
    onCommandInput: 'cg-command-input',
    onCommandSelect: 'cg-command-select',
  }
);
