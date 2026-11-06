H=dist/index.html
# Important 1: sólo la primera fila destacada usa el tamaño grande.
assert_count "$H" 'grid-cols-\[1\.4fr_1fr\]|grid-cols-\[1fr_1\.4fr\]' 1
# Important 2: en la home los enlaces del menú son hashes puros (sin recarga con ?lang=en);
# fuera de la home apuntan a /#seccion.
assert_count  "$H" 'href="/#' 0
assert_present "$H" 'href="#proyectos"'
assert_present dist/proyectos/index.html 'href="/#proyectos"'
