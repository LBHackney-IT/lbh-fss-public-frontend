#!/usr/bin/env bash
# WordPress PHP lint & format (phpcs + phpcbf) for pre-commit.
# Runs only on wordpress/**/*.php. Skips if PHP or vendor not available.

set -e

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

if ! command -v php >/dev/null 2>&1; then
  echo "Skipping PHP checks (php not found). Install PHP to lint/format WordPress files."
  exit 0
fi

if [[ ! -x vendor/bin/phpcs ]]; then
  echo "Skipping PHP checks (run 'composer install' for WordPress coding standards)."
  exit 0
fi

# Filter to wordpress/*.php only (pre-commit may pass other php files)
FILES=()
for f in "$@"; do
  [[ "$f" == wordpress/*.php ]] && FILES+=("$f")
done

[[ ${#FILES[@]} -eq 0 ]] && exit 0

# Format first, then lint
./vendor/bin/phpcbf --standard=WordPress -q "${FILES[@]}" || true
./vendor/bin/phpcs --standard=WordPress -n "${FILES[@]}"
