# Important 1: setLang no debe lanzar si el almacenamiento está bloqueado.
python3 - <<'PY' || FAILED=1
import re,sys; s=open('src/i18n/client.ts').read()
body=s[s.index('export function setLang'):]
body=body[:body.index('\n}\n')]
ok=re.search(r'try\s*\{\s*localStorage\.setItem\("lang", lang\);?\s*\}\s*catch', body)
sys.exit(0 if ok else print("FAIL: setLang writes localStorage without try/catch") or 1)
PY
# Important 2 (re-graded): el escalonado sólo retrasa opacity/transform, no los colores de hover.
CSS=$(mktemp); cat dist/_astro/*.css dist/index.html > "$CSS"
assert_present "$CSS" '\.js \.stagger\{transition-delay:calc\(var\(--i, ?0\) \* \.1s\), ?calc\(var\(--i, ?0\) \* \.1s\), ?0s, ?0s, ?0s\}'
rm -f "$CSS"
