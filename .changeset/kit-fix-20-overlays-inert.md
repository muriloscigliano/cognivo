---
"@cognivo/components": patch
---

Closed overlays leave the tab order and the accessibility tree. `cg-drawer` (previously only slid off screen: its close button and slotted fields were still tabbable and announced), `cg-alert-dialog` (inert, but still read out) and `cg-command` (its `hidden` palette was still `display: flex`, so slotted header fields stayed tabbable) are now `inert` and `visibility: hidden` when closed, slotted content included; visibility flips only after the exit animation. Real-browser tests cover every overlay that uses the shared focus trap (drawer, sheet, alert-dialog, command, lightbox, popover; modal has its own): closed → nothing inside is reachable or announced; open → Tab and Shift+Tab stay inside; Escape closes and returns focus to the opener.
