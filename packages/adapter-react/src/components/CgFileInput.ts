import { createWrapper } from '../create-wrapper.js';
export const CgFileInput = /* @__PURE__ */ createWrapper('cg-file-input', ['label', 'placeholder', 'helper', 'accept', 'name', 'multiple', 'maxSize', 'maxFiles', 'disabled', 'error', 'success'],
  {
    onFileReject: 'cg-file-reject',
    onFileChange: 'cg-file-change',
    onFileRemove: 'cg-file-remove',
    onFileClear: 'cg-file-clear',
  }
);
