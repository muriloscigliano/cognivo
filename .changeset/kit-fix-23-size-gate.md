---
"@cognivo/components": patch
---

Unused shared styles really are dropped now. The library build no longer minifies its ES output: esbuild's syntax minifier was inlining the `/* @__PURE__ */` style wrappers into bare tagged templates, so a consumer's bundler kept every keyframe in `motion.css` (shimmer, fadeSlideIn, pulse, scaleIn, …) with `cg-input`. The size test's sentinel for this (`cg-ai-effect-glow`) was dead — no component uses that style, so it could never fail; the sentinels are now styles some component does use, each proven live by bundling that component. The test also has a lower bound (9 KB) and checks the three components' code is present. Measured input + checkbox + button + Lit: 12.67 KB gzip; gate 13 KB.
