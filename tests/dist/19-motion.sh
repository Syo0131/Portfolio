L=src/layouts/Layout.astro
assert_present "$L" 'dataset\.reveal *= *"ready"'
python3 - "$L" <<'PY2' || FAILED=1
import re,sys; s=open(sys.argv[1]).read()
m=re.search(r'const ANIMATION_CLASSES = \[(.*?)\]', s, re.S)
ok=m and '"animate-on-scroll"' in m.group(1) and 'classList.remove(...ANIMATION_CLASSES)' in s
sys.exit(0 if ok else print("FAIL: reveal hand-off must remove animate-on-scroll") or 1)
PY2
CSS=$(mktemp); cat dist/_astro/*.css dist/index.html > "$CSS"
assert_present "$CSS" '\.js:not\(\[data-reveal\]\) \.animate-on-scroll'
assert_absent  "$CSS" '\.animate-visible\{[^}]*!important'
rm -f "$CSS"
assert_absent  src/components/Sections/Hero.astro 'style="animation: *heroFadeIn'
assert_present src/components/Sections/Hero.astro 'roleElement\.dataset\.bound'
