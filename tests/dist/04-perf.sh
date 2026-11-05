#!/usr/bin/env bash

L=src/layouts/Layout.astro
assert_present "$L" 'classList\.add\("js"\)'
assert_absent  "$L" 'will-change|animate-pulse-gentle|blur-\[100px\]'
assert_present "$L" 'unobserve\('
assert_absent src/components/Sections/Footer.astro 'blur-\[100px\]'
for f in src/components/Sections/Skill.astro src/components/Sections/Contact.astro src/components/CertificationsBadge.astro src/components/Sections/Certifications.astro; do
  assert_absent "$f" 'animation: *fadeIn'
done

# sin .js nada queda oculto
CSS=$(cat dist/_astro/*.css 2>/dev/null || true)
if echo "$CSS" | grep -oE '[^}]*\{[^}]*opacity: *0[;}]' | grep -E 'animate-(on-scroll|fade|scale)' | grep -vq '\.js '; then
  echo "FAIL: hidden without .js"
  FAILED=1
fi
