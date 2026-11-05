#!/usr/bin/env bash

H=dist/index.html
assert_absent "$H" 'id="lang-toggle"|id="lang-text"'
assert_count "$H" 'class="lang-toggle' 2
assert_count "$H" '"nav\.home": *"' 0      # el JSON de traducciones ya no va inline en el HTML
assert_absent src/components/Sections/Hero.astro 'setInterval'
assert_present src/components/Sections/Hero.astro 'prefers-reduced-motion'
# toda clave usada en data-i18n existe en ambos idiomas
python3 - <<'PY' || FAILED=1
import re, glob, sys
src = open('src/i18n/translations.ts').read()
parts = src.split('\n  en: {')
if len(parts) < 2:
    print("FAIL: could not split translations into es/en")
    sys.exit(1)
es, en = parts[0], parts[1]
keys = set(re.findall(r'data-i18n(?:-aria|-placeholder)?="([^"]+)"', open('dist/index.html').read()))
miss = [k for k in keys if f'"{k}"' not in es or f'"{k}"' not in en]
if miss:
    print("FAIL: missing i18n keys", miss)
    sys.exit(1)
sys.exit(0)
PY
