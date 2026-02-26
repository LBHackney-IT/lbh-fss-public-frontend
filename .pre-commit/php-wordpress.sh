#!/usr/bin/env bash
# WordPress PHP lint & format (phpcs + phpcbf) for pre-commit.
# Runs only on wordpress/**/*.php, excluding build output. Skips if PHP or vendor not available.

set -e

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

# Must match phpcs.xml.dist <exclude-pattern>
EXCLUDE_DIR="lbh-fss-public-frontend"

if ! command -v php >/dev/null 2>&1; then
  echo "Skipping PHP checks (php not found). Install PHP to lint/format WordPress files."
  exit 0
fi

if [[ ! -x vendor/bin/phpcs ]]; then
  echo "Skipping PHP checks (run 'composer install' for WordPress coding standards)."
  exit 0
fi

# Filter to wordpress/*.php only, excluding build output (same as phpcs.xml.dist)
FILES=()
for f in "$@"; do
  if [[ "$f" == wordpress/*.php ]] && [[ "$f" != *"/${EXCLUDE_DIR}/"* ]]; then
    FILES+=("$f")
  fi
done

[[ ${#FILES[@]} -eq 0 ]] && exit 0

# Use same ruleset as CI/local (phpcs.xml.dist)
./vendor/bin/phpcbf -q --standard=phpcs.xml.dist --extensions=php "${FILES[@]}" || true
./vendor/bin/phpcs -n --standard=phpcs.xml.dist --extensions=php "${FILES[@]}"
