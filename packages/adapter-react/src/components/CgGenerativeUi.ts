import { createWrapper } from '../create-wrapper.js';
import type { Library, ParseResult, TokenViolation } from '@cognivo/gen-ui';

export interface CgGenerativeUiProps {
  /** Raw LLM response text (component-lang format). */
  response?: string | null;
  /** Component library definition. */
  library?: Library;
  /** Whether the LLM is still streaming. */
  isStreaming?: boolean;
  /** Fired when the parse result changes. */
  onParseResult?: (e: CustomEvent<{ result: ParseResult }>) => void;
  /** Fired when token violations are detected. */
  onTokenViolations?: (e: CustomEvent<{ violations: TokenViolation[] }>) => void;
  className?: string;
}

export const CgGenerativeUi = createWrapper<CgGenerativeUiProps>(
  'cg-generative-ui',
  ['response', 'library', 'isStreaming'],
  {
    onParseResult: 'parse-result',
    onTokenViolations: 'token-violations',
  },
);
