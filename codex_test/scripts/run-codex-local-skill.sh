#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
LOCAL_CODEX_HOME="$ROOT_DIR/.codex-home"
SKILL_NAME="ppt-scroll-web-builder"
SKILL_SRC="$ROOT_DIR/skills/$SKILL_NAME"
SKILL_DST_DIR="$LOCAL_CODEX_HOME/skills"
SKILL_LINK="$SKILL_DST_DIR/$SKILL_NAME"

if [[ ! -d "$SKILL_SRC" ]]; then
  echo "Skill source not found: $SKILL_SRC" >&2
  exit 1
fi

mkdir -p "$SKILL_DST_DIR"
ln -sfn "$SKILL_SRC" "$SKILL_LINK"

if [[ $# -eq 0 ]]; then
  CMD=("codex")
else
  CMD=("$@")
fi

export CODEX_HOME="$LOCAL_CODEX_HOME"
echo "CODEX_HOME=$CODEX_HOME"
echo "Loaded skill link: $SKILL_LINK -> $SKILL_SRC"
exec "${CMD[@]}"
