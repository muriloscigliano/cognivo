---
"@cognivo/components": minor
---

`cg-app-shell`: a sidebar column that works in a real dashboard, and a proper phone drawer.

- **Desktop:** the sidebar column is viewport-height, sticks under the (sticky) header while the page scrolls, and scrolls on its own, so `position: sticky` content inside it works and a slotted `cg-sidebar`'s footer sits at the bottom of the screen instead of floating mid-page. Collapsed, the column is `inert` and hidden (it was only `aria-hidden`, with its links still in the tab order).
- **Phone (≤ 768px):** collapsing no longer breaks the layout (the desktop two-column rule won over the phone one, leaving main 0px wide). While the drawer is open a backdrop covers the page (click closes), Escape closes, the page behind does not scroll, and focus moves to the first control in the sidebar on open and back to the opener on close. Backdrop and Escape fire `cg-app-shell-toggle` like `toggleSidebar()`.
- **Theme:** the column paints `--cg-color-surface-sidebar-*`, light in the light theme (it was black in both).

*Behaviour change:* the collapsed sidebar is `inert` instead of `aria-hidden="true"`.
