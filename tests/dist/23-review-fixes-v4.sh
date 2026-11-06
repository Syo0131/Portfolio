# I1: los checks de proyectos no pueden fijar cantidades de tarjetas/proyectos a mano.
for f in tests/dist/13-sections.sh tests/dist/14-projects-page.sh; do
  assert_absent "$f" "project-card' [0-9]"
done
# I2: si el respaldo ya mostró un elemento antes de que corra el script, no debe volver a ocultarse.
python3 - <<'PY' || FAILED=1
import sys; s=open('src/layouts/Layout.astro').read()
i=s.find('dataset.reveal = "ready"'); j=s.find('reveal-fallback', s.find('<script>'))
ok = i!=-1 and j!=-1 and j < i
sys.exit(0 if ok else print("FAIL: reveal script must handle elements already shown by the fallback before setting data-reveal") or 1)
PY
# I3 (re-graded): en Safari, focusout con relatedTarget null al hacer clic no debe cerrar el menú bajo el puntero.
assert_present src/components/Sections/Hero.astro 'container\.matches\(":hover"\)'
