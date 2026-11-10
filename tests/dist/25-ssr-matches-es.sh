# El texto que sale del servidor debe ser el mismo que pone setLang("es") al cargar:
# si no, el contenido cambia (y se mueve) en cuanto corre el JS.
for page in dist/index.html dist/proyectos/index.html; do
python3 - "$page" "$(python3 tests/dist/es_values.py)" <<'PY' || FAILED=1
import html, json, re, sys
from html.parser import HTMLParser
page, es = sys.argv[1], json.loads(sys.argv[2])
norm = lambda s: re.sub(r"\s+", " ", s).strip()
bad = []
class P(HTMLParser):
    def __init__(self):
        super().__init__(); self.stack = []
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag in ("br", "img", "input", "meta", "link", "source", "hr"): return
        self.stack.append([a.get("data-i18n"), "", False])
        if len(self.stack) > 1: self.stack[-2][2] = True  # el padre tiene hijos
    def handle_endtag(self, tag):
        if not self.stack: return
        key, text, has_child = self.stack.pop()
        if key and not has_child and key in es and norm(text) != norm(es[key]):
            bad.append((key, norm(text)[:60], norm(es[key])[:60]))
    def handle_data(self, d):
        if self.stack: self.stack[-1][1] += d
P().feed(open(page).read())
for k, got, want in bad: print(f"FAIL: {page} [{k}] server={got!r} es={want!r}")
sys.exit(1 if bad else 0)
PY
done
