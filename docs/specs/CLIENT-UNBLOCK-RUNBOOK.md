# Client unblock runbook — fix the broken @cognivo npm release

_Verified 2026-07-01 against live npm + a real tarball install test._

## Root cause (confirmed, not guessed)

`@cognivo/components@0.8.0` was published to npm depending on `@cognivo/core@0.4.0`.
**`@cognivo/core` was never published** (404). So `npm install @cognivo/components`
(and `design-advisor`, and `adapter-react` which peer-needs components) 404s on core.

The published `components@0.8.0` tarball itself is fine — its dep is correctly written
as `@cognivo/core: 0.4.0` (pnpm rewrote `workspace:*` on publish). The ONLY defect is a
**partial publish**: the leaves shipped, the trunk (`core`) didn't. Same for `tokens`,
`adapter-vue`, and the rest of the 404s.

**Proven:** packing `core + tokens + components + adapter-vue` with `pnpm pack` and
installing the tarballs into a clean project → all import cleanly. The code works. The
registry just has a hole.

## The golden rule

**Publish with `pnpm` / `changesets` — NEVER plain `npm publish`.**
Plain `npm pack` ships `"@cognivo/core": "workspace:*"` verbatim (uninstallable).
`pnpm`/`changesets` rewrite it to the real version. This was verified both ways.

## Two publishing gaps that must both be closed

1. **Missing versions.** npm has `components@0.8.0` but `core` at 404. `components@0.8.0`
   pins `core@0.4.0` exactly — so **`core` must be published at exactly `0.4.0`** to
   satisfy the already-published `components@0.8.0`. (Local core IS 0.4.0 — lines up.)
2. **Version drift.** Local repo is `0.4.0` everywhere; npm has `0.5.0`/`0.8.0`. Decide a
   target and align before the next `changeset version`.

---

## FAST PATH — unblock the client (publish 3 missing packages)

This makes the ALREADY-PUBLISHED `components@0.8.0` installable and delivers Vue + theming.

```bash
# from repo root, logged into npm as the @cognivo owner
pnpm --filter @cognivo/core --filter @cognivo/tokens --filter @cognivo/adapter-vue build
pnpm verify-publish            # must print ✅ before continuing

# publish core at 0.4.0 FIRST (components@0.8.0 already pins it)
cd packages/core        && pnpm publish --access public --no-git-checks && cd ../..
cd packages/tokens      && pnpm publish --access public --no-git-checks && cd ../..
# adapter-vue peer-needs components@0.8.0 (already on npm) — bump its version to match if desired
cd packages/adapter-vue && pnpm publish --access public --no-git-checks && cd ../..
```

Then verify from OUTSIDE the repo:
```bash
cd $(mktemp -d) && npm init -y >/dev/null
npm install @cognivo/components @cognivo/adapter-vue @cognivo/tokens vue
node -e "require('@cognivo/components'); console.log('client install OK')"
```

## FULL PATH — coherent whole-library release (recommended after the fast fix)

```bash
pnpm changeset                 # describe the release, pick bumps
pnpm changeset version         # aligns all versions + internal deps
pnpm release                   # = build → verify-publish → changeset publish
```
`pnpm release` now runs `verify-publish` as a hard gate: a partial/broken publish is
blocked before it can reach npm.

## What I already did in the repo (this session)

- Added `scripts/verify-publish.mjs` — preflight that FAILS if any public package depends
  on an @cognivo package that won't be on npm at the right version. Negative-tested: it
  catches exactly the core-is-missing failure that broke the client.
- Wired it into `release` / `publish-packages` so it can't be skipped.
- Verified the full client chain builds + installs from tarballs.

## Still needs YOUR decision

- Target version to align to (up to 0.8.0, or reset the scope).
- The 4 `lens-*` packages (0.1.x, unpublished, undocumented): ship or mark `private`?
- I do NOT run `npm publish` — outward-facing + irreversible. Everything above is ready
  for you to execute; the guard guarantees the next publish is flawless.
