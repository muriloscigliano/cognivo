# @cognivo/adapter-react

React wrappers for every Cognivo web component: typed props, and every Cognivo `CustomEvent` mapped to an `on…` prop (React's own DOM props such as `onClick` and `onChange` keep their native meaning).

```bash
npm install @cognivo/adapter-react @cognivo/components react
```

```tsx
import { CgInput } from '@cognivo/adapter-react';

<CgInput label="Email" onCgInput={(e) => console.log(e.detail.value)} />;
```

## Size budget

`pnpm size` (run in CI) limits `dist/index.js` to **10.03 KB gzip**, the size measured on 2026-11-16 (10,268 B). It was 7.59 KB (under an 8 KB budget) before every component event was mapped: the 271 event maps are most of the growth. The limit should come down as the wrappers get leaner, and is never raised past a measured size.
