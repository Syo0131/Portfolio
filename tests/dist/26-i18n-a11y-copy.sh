# Etiquetas accesibles traducibles, referencias ARIA válidas y textos visibles con clave.
for page in dist/index.html dist/proyectos/index.html dist/404.html; do
python3 - "$page" <<'PY' || FAILED=1
import re, sys
from html.parser import HTMLParser
page = sys.argv[1]; h = open(page).read()
# Nombres propios / términos iguales en ambos idiomas: no necesitan clave.
ALLOW = {"LinkedIn", "GitHub", "Email", "Stack"}
errs, ids, refs = [], set(), []
class P(HTMLParser):
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if "id" in a: ids.add(a["id"])
        if a.get("aria-labelledby"): refs.append(a["aria-labelledby"])
        lab = a.get("aria-label")
        if lab and "data-i18n-aria" not in a and lab not in ALLOW:
            errs.append(f"aria-label without data-i18n-aria: <{tag}> {lab!r}")
P().feed(h)
for r in refs:
    for i in r.split():
        if i not in ids and "${" not in i: errs.append(f"aria-labelledby points to missing id {i!r}")
for e in errs: print(f"FAIL: {page}: {e}")
sys.exit(1 if errs else 0)
PY
done
assert_present dist/index.html 'data-i18n="experience\.swipeHint"'
assert_present dist/404.html 'data-i18n="notFound\.title"'
assert_present dist/404.html 'class="lang-toggle'
# Erratas de copy detectadas en la revisión
assert_absent src/i18n/translations.ts 'Sotftware|"Hey, Soy"|": " Ingeniero|"Experiences"|Java Analyst Developer • Dominican|Infrastructure engineer'
assert_absent dist/index.html '>Github<'
