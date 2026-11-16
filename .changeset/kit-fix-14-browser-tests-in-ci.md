---
---

CI only (no release): the `build-and-test` job installs Playwright Chromium, so the components package's real-browser suites run on every push. The harness now fails (instead of skipping) when `CI` is set and Chromium is missing; turbo hashes `CI` into the test task and passes `PLAYWRIGHT_BROWSERS_PATH` through.
