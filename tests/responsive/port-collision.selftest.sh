#!/usr/bin/env bash
# Autoprueba del arnés: con el puerto 4410 ocupado debe fallar con un mensaje claro
# y NO dejar ningún `astro preview` vivo en otro puerto.
cd "$(dirname "$0")/../.."
node -e 'require("http").createServer((q,s)=>s.end("x")).listen(4410,"127.0.0.1")' &
DUMMY=$!
sleep 1
before=$(ss -ltn | grep -cE '127.0.0.1:44(1[1-9]|2[0-9]) ')
out=$(node tests/responsive/run.mjs 2>&1)
sleep 2
after=$(ss -ltn | grep -cE '127.0.0.1:44(1[1-9]|2[0-9]) ')
kill $DUMMY
echo "$out" | grep -q "4410 está ocupado" || { echo "FAIL: harness did not report the busy port"; echo "$out" | tail -3; exit 1; }
if [ "$after" -gt "$before" ]; then
  echo "FAIL: harness leaked an astro preview server ($before -> $after listeners on 4411-4429)"
  ss -ltnp | grep -E '127.0.0.1:44(1[1-9]|2[0-9]) ' | grep -oP 'pid=\K[0-9]+' | while read p; do kill -TERM -"$(ps -o pgid= -p $p | tr -d ' ')" 2>/dev/null; done
  exit 1
fi
echo "OK: busy port reported, no leaked server"
