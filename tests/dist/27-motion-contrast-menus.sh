# Iconos decorativos ocultos a lectores de pantalla (el nombre accesible lo da el texto o el aria-label del control).
for page in dist/index.html dist/proyectos/index.html dist/404.html; do
python3 - "$page" <<'PY' || FAILED=1
import re, sys
h = open(sys.argv[1]).read()
bad = [s for s in re.findall(r"<svg[^>]*>", h) if "aria-hidden" not in s and 'role="img"' not in s]
sys.exit(print(f"FAIL: {sys.argv[1]}: {len(bad)} decorative <svg> without aria-hidden, e.g. {bad[0][:90]}") or 1 if bad else 0)
PY
done
# Contraste: texto pequeño gris oscuro sobre fondo casi negro (<4.5:1).
assert_absent_dir() { if grep -rqE "$2" $1 --include=*.astro; then echo "FAIL: '$2' still used in $1"; grep -rnE "$2" $1 --include=*.astro | head -3; FAILED=1; fi; }
assert_absent_dir src 'text-slate-500'
# Animaciones decorativas infinitas sólo con movimiento permitido.
assert_absent_dir src '(^|[" ])animate-(ping|pulse)\b'
# Hero: no vaciar el rol al salir (bfcache lo restauraría en blanco); flecha del CV según aria-expanded.
assert_absent  src/components/Sections/Hero.astro 'beforeunload'
assert_absent  src/components/Sections/Hero.astro 'group-hover:rotate-180'
assert_present src/components/Sections/Hero.astro 'group-aria-expanded:rotate-180'
# Arrastre en Experiencia sin scroll suave forzado.
assert_absent  src/components/Sections/Experience.astro 'scroll-behavior: *smooth'
# Menú móvil: botón real, controla el menú, se cierra con Escape y clic fuera.
assert_present dist/index.html 'id="mobile-menu-toggle"[^>]*type="button"|type="button"[^>]*id="mobile-menu-toggle"'
assert_present dist/index.html 'id="mobile-menu-toggle"[^>]*aria-controls="mobile-menu"|aria-controls="mobile-menu"[^>]*id="mobile-menu-toggle"'
assert_present src/components/Sections/Header.astro '"Escape"'
# Footer: landmark nav con nombre.
assert_present dist/index.html '<nav[^>]*data-i18n-aria="a11y\.footerNav"'
