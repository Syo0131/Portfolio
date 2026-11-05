#!/usr/bin/env bash

H=dist/index.html
assert_count "$H" '<main' 1
for f in src/components/Sections/AboutMe.astro src/components/Sections/LearningPath.astro src/components/SkillBadge.astro src/components/Badge.astro src/components/Highlight.astro public/do.svg public/astro.svg public/background.svg public/yami.jpg; do
  assert_missing_file "$f"
done
assert_absent "$H" '\+1 año|\+2 años'
assert_absent public/manifest.json '\+2 años'
assert_absent "$H" "Hello, I'm"
assert_absent src/components/Sections/Experience.astro 'Infraestructure'
assert_absent src/components/Sections/Hero.astro 'OptimizedImage|Highlight'
python3 tests/dist/div_balance.py "$H" || FAILED=1

# orden de experiencia (primera aparición de cada empresa dentro de #experiencia)
python3 - "$H" <<'PY' || FAILED=1
import sys, re
h = open(sys.argv[1]).read()
s = h[h.index('id="experiencia"'):]
i = [s.index(k) for k in ("IKEA", "Freelance", "El Pensum")]
if i == sorted(i):
    sys.exit(0)
else:
    print("FAIL: experience order", i)
    sys.exit(1)
PY
