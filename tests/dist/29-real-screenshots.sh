# CIFMEC y Galan Sorteos usan sus capturas reales (ya no la imagen temporal).
assert_absent src/data/projects.ts 'placeholder: true|Placeholder|TODO: captura real'
python3 - <<'PY' || FAILED=1
import json, re, sys
h = open("dist/index.html").read()
gal = json.loads(re.search(r'<script type="application/json" id="project-gallery-data">(.*?)</script>', h, re.S).group(1))
want = {"cifmec": 2, "galansorteos": 3}
errs = [f"{k}: {len(gal.get(k, []))} images, expected {n}" for k, n in want.items() if len(gal.get(k, [])) != n]
errs += [f"{k}: still uses the placeholder" for k in want if any("placeholder" in i["src"] for i in gal.get(k, []))]
for e in errs: print("FAIL: gallery", e)
sys.exit(1 if errs else 0)
PY
