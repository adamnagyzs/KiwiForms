#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TYPES_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
ROOT_DIR="$(cd "$TYPES_DIR/../.." && pwd)"
OUTPUT_FILE="$TYPES_DIR/src/database/database.types.ts"

resolve_project_id() {
  if [ -n "${SUPABASE_PROJECT_ID:-}" ]; then
    echo "$SUPABASE_PROJECT_ID"
    return
  fi

  local supabase_url="${SUPABASE_URL:-}"

  if [ -z "$supabase_url" ] && [ -f "$ROOT_DIR/apps/api/.env" ]; then
    supabase_url="$(
      grep -E '^SUPABASE_URL=' "$ROOT_DIR/apps/api/.env" \
        | cut -d= -f2- \
        | tr -d '"' \
        | tr -d "'"
    )"
  fi

  if [ -n "$supabase_url" ]; then
    echo "$supabase_url" | sed -E 's|https://([^.]+)\.supabase\.co.*|\1|'
    return
  fi

  return 1
}

PROJECT_ID="$(resolve_project_id || true)"

if [ -z "$PROJECT_ID" ]; then
  echo "Error: Could not determine Supabase project ID." >&2
  echo "Set SUPABASE_PROJECT_ID or SUPABASE_URL (e.g. in apps/api/.env)." >&2
  exit 1
fi

echo "Generating database types from Supabase project: $PROJECT_ID"

supabase gen types typescript --project-id "$PROJECT_ID" > "$OUTPUT_FILE"

echo "Wrote $OUTPUT_FILE"
