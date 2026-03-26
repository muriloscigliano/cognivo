import { createVueWrapper } from '../create-wrapper.js';

export const CgGenerativeUi = createVueWrapper(
  'cg-generative-ui',
  {
    response: { type: String, default: null },
    library: { type: Object, default: null },
    isStreaming: { type: Boolean, default: false },
  },
  {
    'parse-result': 'parse-result',
    'token-violations': 'token-violations',
  },
);
