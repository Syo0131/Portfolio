#!/usr/bin/env bash
set -e

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$DIR/lib.sh"

shopt -s nullglob
scripts=("$DIR"/[0-9]*.sh)
shopt -u nullglob

echo "==> Running unit tests..."
if ! node --experimental-strip-types --no-warnings --test "$DIR"/../unit/*.test.ts > /tmp/portfolio-unit.log 2>&1; then
  tail -30 /tmp/portfolio-unit.log
  echo "FAIL: unit tests"
  FAILED=1
fi

for script in "${scripts[@]}"; do
  echo "==> Running $(basename "$script")..."
  source "$script"
done

if [ "$FAILED" -ne 0 ]; then
  echo "==> Some checks FAILED"
  exit 1
fi

echo "==> All checks passed"
exit 0
