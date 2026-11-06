# Sin claves de traducción muertas, y es/en con exactamente las mismas claves.
python3 - <<'PY' || FAILED=1
import glob, re, sys
src = open("src/i18n/translations.ts").read()
es_blk = src[src.index("  es: {"):src.index("\n  en: {")]; en_blk = src[src.index("\n  en: {"):]
keys = lambda b: set(re.findall(r'\n    "([^"]+)":', b))
es, en = keys(es_blk), keys(en_blk)
code = "".join(open(p).read() for ext in ("astro", "ts", "mjs") for p in glob.glob(f"src/**/*.{ext}", recursive=True) if not p.endswith("translations.ts"))
unused = sorted(k for k in es if f'"{k}"' not in code)
errs = []
if unused: errs.append(f"unused translation keys: {unused}")
if es ^ en: errs.append(f"keys only in one language: {sorted(es ^ en)}")
for e in errs: print("FAIL:", e)
sys.exit(1 if errs else 0)
PY
assert_absent src/i18n/translations.ts 'export const languages|export function getLangFromUrl|Citadel'
if grep -rq "astro:page-load" src; then echo "FAIL: astro:page-load listeners remain (no ClientRouter: they never fire)"; FAILED=1; fi
assert_absent src/components/CertificationsBadge.astro 'hovercolor|buttonText'
assert_absent src/components/Sections/Contact.astro 'form-input\.success|form-input\.error'
assert_absent src/components/Sections/Skill.astro 'animation-delay|<style>\s*$'
assert_absent src/components/ProjectDialogs.astro 'id="project-gallery-img"[^>]*transition-opacity|transition-opacity[^"]*"\s*\n\s*id="project-gallery-img"'
# Checks que fijaban datos actuales
assert_absent tests/dist/12-project-data-v2.sh "projects\\\\.code\"' 0"
assert_absent tests/dist/16-cards-polish.sh 'len\(cards\)<1'
assert_absent tests/dist/21-a11y.sh 'project-details-title-cifmec'
# Config
python3 - <<'PY' || FAILED=1
import re, sys, datetime as d
exp = re.search(r"Expires: (\S+)", open("public/.well-known/security.txt").read()).group(1)
ok = d.datetime.fromisoformat(exp.replace("Z", "+00:00")) > d.datetime.now(d.timezone.utc) + d.timedelta(days=180)
sys.exit(0 if ok else print(f"FAIL: security.txt Expires {exp} is less than 6 months away") or 1)
PY
assert_absent public/robots.txt '/api/'
assert_absent astro.config.mjs 'dangerouslyProcessSVG'
assert_absent package.json '@iconify-json/(devicon"|file-icons|logos|streamline)'
assert_absent README.md 'Astro Starter Kit'
