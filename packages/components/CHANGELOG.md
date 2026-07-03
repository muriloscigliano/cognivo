# @cognivo/components

## 0.8.3

### Patch Changes

- 5ba2052: Polish pass on foundation components:
  - **cg-blockquote**: redesigned as an editorial pull-quote anchored by an oversized decorative quote glyph, replacing the generic left-border treatment. Three variants (default / accent / muted card), tokens only.
  - **cg-button**: route the four transition timing functions through `--cg-transition-easing-default` instead of the raw `ease` keyword, matching the motion-token convention used by sibling components.
