#!/usr/bin/env bash
# check-token-usage.sh — CI guard against token system regressions
# Run from repo root: bash scripts/check-token-usage.sh

set -uo pipefail

COMPONENTS_DIR="packages/components/src/components"
ERRORS=0

echo "=== Design Token Usage Check ==="
echo ""

# 1. Extra closing parentheses (P0 syntax errors)
echo "Checking for extra closing parentheses in rgba()..."
PAREN_MATCHES=$(grep -rn 'rgba([^)]*))))' "$COMPONENTS_DIR" --include="*.ts" | wc -l | tr -d ' ')
if [ "$PAREN_MATCHES" -gt 0 ]; then
  echo "  FAIL: Found $PAREN_MATCHES lines with extra closing parentheses in rgba()"
  grep -rn 'rgba([^)]*))))' "$COMPONENTS_DIR" --include="*.ts" | head -10
  ERRORS=$((ERRORS + 1))
else
  echo "  PASS: No extra parentheses found"
fi
echo ""

# 2. Bare cubic-bezier outside var() — should use motion tokens
echo "Checking for bare cubic-bezier values (not inside var())..."
# Match cubic-bezier that is NOT preceded by a comma+space (which would indicate it's a var() fallback)
BEZIER_MATCHES=$(grep -rn 'cubic-bezier' "$COMPONENTS_DIR" --include="*.ts" | grep -v 'var(--cg-' | grep -v '// ' | wc -l | tr -d ' ')
if [ "$BEZIER_MATCHES" -gt 0 ]; then
  echo "  WARN: Found $BEZIER_MATCHES lines with bare cubic-bezier (not wrapped in var())"
  grep -rn 'cubic-bezier' "$COMPONENTS_DIR" --include="*.ts" | grep -v 'var(--cg-' | grep -v '// ' | head -10
  # Warning only — some unique easings are intentional
else
  echo "  PASS: All cubic-bezier values use tokens"
fi
echo ""

# 3. Bare font stacks without --cg-font-family token
echo "Checking for bare font-family declarations..."
FONT_MATCHES=$(grep -rn "font-family:" "$COMPONENTS_DIR" --include="*.ts" | grep -v 'var(--cg-font-family' | grep -v 'font-family: inherit' | grep -v 'font-family: monospace' | wc -l | tr -d ' ')
if [ "$FONT_MATCHES" -gt 0 ]; then
  echo "  WARN: Found $FONT_MATCHES lines with bare font-family (not using --cg-font-family-* token)"
  grep -rn "font-family:" "$COMPONENTS_DIR" --include="*.ts" | grep -v 'var(--cg-font-family' | grep -v 'font-family: inherit' | grep -v 'font-family: monospace' | head -10
else
  echo "  PASS: All font-family declarations use tokens"
fi
echo ""

# 4. Hardcoded scale() transforms without token
echo "Checking for bare scale() transforms..."
SCALE_MATCHES=$(grep -rn 'scale(0\.9' "$COMPONENTS_DIR" --include="*.ts" | grep -v 'var(--cg-interaction' | grep -v '@keyframes' | wc -l | tr -d ' ')
if [ "$SCALE_MATCHES" -gt 0 ]; then
  echo "  WARN: Found $SCALE_MATCHES lines with bare scale() (not using --cg-interaction-press-scale)"
  grep -rn 'scale(0\.9' "$COMPONENTS_DIR" --include="*.ts" | grep -v 'var(--cg-interaction' | grep -v '@keyframes' | head -10
else
  echo "  PASS: All scale transforms use tokens"
fi
echo ""

# Summary
echo "=== Summary ==="
if [ "$ERRORS" -gt 0 ]; then
  echo "FAILED: $ERRORS critical error(s) found"
  exit 1
else
  echo "PASSED: No critical errors (warnings may exist above)"
  exit 0
fi
