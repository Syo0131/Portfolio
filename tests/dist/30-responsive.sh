# Geometría real en Chrome a varios anchos (tests/responsive/). Sin Chrome no se salta: falla.
if [ ! -x /opt/google/chrome/chrome ]; then
  echo "FAIL: Chrome no instalado — ejecuta: npx playwright install --with-deps chrome"
  FAILED=1
else
  RESP_LOG=$(mktemp)
  if ! node tests/responsive/run.mjs > "$RESP_LOG" 2>&1; then
    grep -E "^FAIL" "$RESP_LOG" || tail -20 "$RESP_LOG"
    FAILED=1
  fi
  rm -f "$RESP_LOG"
fi
