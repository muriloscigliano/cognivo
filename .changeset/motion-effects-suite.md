---
"@cognivo/components": minor
"@cognivo/tokens": minor
"@cognivo/gen-ui": minor
"@cognivo/adapter-react": minor
"@cognivo/adapter-vue": minor
---

Motion & Effects suite: four new components and a pure-CSS motion recipe layer.

- `cg-border-beam` — animated traveling border light (beam/line/pulse variants, shared rAF pulse driver, reduced-motion static highlight)
- `cg-liquid` + `cg-liquid-item` — gooey liquid effects: SVG silhouette goo filter behind crisp content, morph/move effects, spring physics compiled to CSS `linear()` easings
- `ai-thinking-orb` — canvas dotted agent-status orb with nine deterministic states, offscreen/hidden-tab auto-pause
- `@cognivo/tokens/motion.css` — new export: 14 token-governed CSS motion recipes (modal, dropdown, panel-reveal, card-resize, page-nav, text-swap, text-reveal, number-flip, icon-swap, badge-pop, success-confirm, error-shake, avatar-group, stagger), all with prefers-reduced-motion collapses
- New tier-3 tokens: `--cg-component-border-beam-{color,width,radius}`
- All four components registered in the gen-ui generative library (200 components) with bias hints, plus React/Vue adapter wrappers
