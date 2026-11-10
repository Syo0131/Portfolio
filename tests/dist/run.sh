#!/usr/bin/env bash
# Sin `set -e`: un comando que devuelve != 0 dentro de un check (p. ej. `grep -c` con 0
# coincidencias) cortaría toda la suite en silencio. Cada check marca FAILED explícitamente,
# y si un script termina con error inesperado se reporta como fallo.

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$DIR/lib.sh"

shopt -s nullglob
scripts=("$DIR"/[0-9]*.sh)
shopt -u nullglob

echo "==> Running unit tests..."
UNIT_LOG=$(mktemp)
if ! node --experimental-strip-types --no-warnings --test "$DIR"/../unit/*.test.ts > "$UNIT_LOG" 2>&1; then
  tail -30 "$UNIT_LOG"
  echo "FAIL: unit tests"
  FAILED=1
fi
rm -f "$UNIT_LOG"

for script in "${scripts[@]}"; do
  echo "==> Running $(basename "$script")..."
  if ! source "$script"; then
    echo "FAIL: $(basename "$script") terminó con error"
    FAILED=1
  fi
done

if [ "$FAILED" -ne 0 ]; then
  echo "==> Some checks FAILED"
  exit 1
fi

echo "==> All checks passed"
exit 0
