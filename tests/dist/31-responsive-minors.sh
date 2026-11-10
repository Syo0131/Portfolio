# Las filas de proyectos piden la imagen según su ancho real (no 100vw) desde 640 px.
assert_present src/components/ProjectCase.astro 'sizes="\(min-width: 1024px\) 60vw, \(min-width: 640px\) 45vw, 100vw"'
# En móvil (< 640) el espacio entre datos clave sigue como antes (gap-4).
assert_present src/components/ProjectCase.astro '<dl class="grid grid-cols-1 gap-4 sm:gap-3">'
