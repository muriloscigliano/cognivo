// Known component contrast failures (scripts/contrast-baseline.json).
//
// The baseline can only shrink and its entries can only get better:
//  - Each entry is one painted pair: `<theme> <fg> on <bg> @ <component> <selector>`,
//    with the ratio measured when it was listed and the reason it is not fixed.
//  - `maxEntries` is the most entries the file may hold. More entries fail; fewer
//    fail too until `maxEntries` is lowered to match (the count ratchets down).
//  - A listed pair measuring below its recorded ratio fails (it got worse).
//  - A listed entry that passes now, or is no longer painted, is stale and fails
//    until removed.

const EPSILON = 0.005

/** The baseline key for one painted, failing pair. */
export const baselineKey = (theme, label, where) => `${theme} ${label} @ ${where}`

/**
 * Check the derived component rows against the baseline.
 * `rows`: evaluated component pairs ({ theme, label, ratio, status, pair: { usedBy, min } }).
 * Returns { errors: string[], known: number }; known rows get status 'KNOWN'.
 */
export function checkBaseline(rows, baseline) {
  const entries = baseline.entries ?? {}
  const errors = []
  const used = new Set()
  for (const row of rows) {
    if (!row.pair.component || row.status === 'PASS') continue
    let allKnown = true
    for (const where of row.pair.usedBy) {
      const key = baselineKey(row.theme, row.label, where)
      const listed = entries[key]
      const measured = row.ratio == null ? 'unresolved' : row.ratio.toFixed(2)
      if (!listed) {
        allKnown = false
        errors.push(`FAIL ${key} = ${measured} (min ${row.pair.min})`)
        continue
      }
      used.add(key)
      if (row.ratio == null || row.ratio < listed.ratio - EPSILON) {
        allKnown = false
        errors.push(`FAIL ${key} got worse: listed at ${Number(listed.ratio).toFixed(2)}, now ${measured}`)
      }
    }
    if (allKnown) row.status = 'KNOWN'
  }
  for (const key of Object.keys(entries)) {
    if (!used.has(key)) errors.push(`STALE baseline entry (passes now or no longer painted; delete it): ${key}`)
  }
  const count = Object.keys(entries).length
  const max = baseline.maxEntries
  if (typeof max !== 'number') errors.push('contrast-baseline.json needs a numeric maxEntries')
  else if (count > max) errors.push(`contrast-baseline.json has ${count} entries; it may hold at most ${max} (the list can only shrink)`)
  else if (count < max) errors.push(`contrast-baseline.json has ${count} entries: lower maxEntries to ${count} so the list cannot grow back`)
  return { errors, known: used.size }
}
