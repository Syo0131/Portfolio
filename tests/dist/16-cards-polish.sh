H=dist/index.html
python3 - "$H" <<'PY' || FAILED=1
import sys,re; h=open(sys.argv[1]).read()
cards=re.findall(r'<article class="project-card.*?</article>', h, re.S)
bad=[c for c in cards if '<h4' not in c]
blurry=[c for c in cards if '960w' not in c]
if blurry: print('FAIL: card images need a 960w source')
sys.exit(print("FAIL: home cards must use h4") or 1 if bad or len(cards)<1 else (1 if blurry else 0))
PY
assert_present src/components/ProjectDialogs.astro ':is\(h3, h4\)'
assert_absent  scripts/make-placeholder.mjs 'PRÓXIMAMENTE'
assert_present src/pages/proyectos.astro 'orderProjects'
