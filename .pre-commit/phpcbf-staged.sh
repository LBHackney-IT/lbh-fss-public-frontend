#!/usr/bin/env bash
# Runs phpcbf on staged wordpress/*.php files, excluding build output (same as phpcs.xml.dist).
# Used by lint-staged.

set -e

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

EXCLUDE_DIR="lbh-fss-public-frontend"

FILES=()
for f in "$@"; do
  if [[ "$f" == wordpress/*.php ]] && [[ "$f" != *"/${EXCLUDE_DIR}/"* ]]; then
    FILES+=("$f")
  fi
done

[[ ${#FILES[@]} -eq 0 ]] && exit 0

./vendor/bin/phpcbf -q --standard=phpcs.xml.dist --extensions=php "${FILES[@]}" || true
