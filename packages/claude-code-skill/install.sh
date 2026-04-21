#!/usr/bin/env bash
set -euo pipefail

SKILL_SRC="$(cd "$(dirname "$0")/skill" && pwd)"
SKILL_DIR="${HOME}/.claude/skills/cognivo"

mkdir -p "${HOME}/.claude/skills"

if [ -L "$SKILL_DIR" ]; then
  rm "$SKILL_DIR"
elif [ -d "$SKILL_DIR" ]; then
  echo "Warning: $SKILL_DIR exists and is not a symlink. Remove it manually to re-install."
  exit 1
fi

ln -s "$SKILL_SRC" "$SKILL_DIR"
echo "Cognivo skill installed at $SKILL_DIR"
echo "Use /cognivo or just ask Claude Code about Cognivo UI generation."
