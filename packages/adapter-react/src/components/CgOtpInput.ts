import { createWrapper } from '../create-wrapper.js';
export const CgOtpInput = /* @__PURE__ */ createWrapper('cg-otp-input', ['length', 'value', 'disabled', 'error', 'mask'],
  {
    onOtpChange: 'cg-otp-change',
    onOtpComplete: 'cg-otp-complete',
  }
);
