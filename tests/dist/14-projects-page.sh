P=dist/proyectos/index.html
assert_file "$P"
python3 - "$P" "$(python3 tests/dist/project_expect.py)" <<'PY2' || FAILED=1
import json, re, sys
h = open(sys.argv[1]).read(); e = json.loads(sys.argv[2])
cards = re.findall(r'<article class="project-card[^"]*" data-project-id="([^"]+)"', h)
sys.exit(0 if cards == e["ordered"] else print(f"FAIL: /proyectos cards {cards} != {e['ordered']}") or 1)
PY2
assert_count "$P" '<dialog' 2
assert_present "$P" 'class="lang-toggle'
assert_present "$P" 'href="/#proyectos"'
assert_absent src/components/Sections/Header.astro 'href="#'
assert_absent src/components/Sections/Footer.astro 'href="#'
assert_present dist/index.html 'data-section="proyectos"'
assert_absent  dist/index.html 'data-section="/'
assert_present dist/sitemap-0.xml 'daybeldiaz\.dev/proyectos'
