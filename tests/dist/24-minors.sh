python3 - <<'PY' || FAILED=1
import re,sys; s=open('src/layouts/Layout.astro').read()
m=re.search(r'@media \(prefers-reduced-motion: no-preference\) \{(.*?)\n  \}\n', s, re.S)
inside = m and 'reveal-fallback' in m.group(1) and '.js:not([data-reveal])' in m.group(1)
outside = s.replace(m.group(0), '') if m else s
leaked = re.search(r'\.js:not\(\[data-reveal\]\)', outside[:outside.find('<script')])
sys.exit(0 if inside and not leaked else print("FAIL: reveal fallback must live only inside the no-preference media query") or 1)
PY
assert_present tests/dist/02-i18n.sh 'altKey'
assert_absent  tests/dist/22-hygiene.sh '16-cards-polish'
