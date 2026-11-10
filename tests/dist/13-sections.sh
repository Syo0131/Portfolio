H=dist/index.html
EXP=$(python3 tests/dist/project_expect.py)
python3 - "$H" "$EXP" <<'PY' || FAILED=1
import json, re, sys
h = open(sys.argv[1]).read(); e = json.loads(sys.argv[2]); errs = []
sec = h[h.index('id="proyectos"'):h.index('id="project-gallery-data"')]
rows = re.findall(r'<article class="project-case[^"]*" data-project-id="([^"]+)"', sec)
cards = re.findall(r'<article class="project-card[^"]*" data-project-id="([^"]+)"', sec)
if rows != e["featured"]: errs.append(f"rows {rows} != {e['featured']}")
if cards != e["cards"]: errs.append(f"cards {cards} != {e['cards']}")
if bool(e["cards"]) != ('data-i18n="projects.more"' in sec): errs.append("'Más proyectos' heading presence")
if e["showViewAll"] != ('href="/proyectos"' in sec): errs.append("'Ver todos' card presence")
for x in errs: print("FAIL:", x)
sys.exit(1 if errs else 0)
PY
