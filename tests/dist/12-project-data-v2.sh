H=dist/index.html
assert_absent src/data/projects.ts 'TODO: completar|TODO: enlazar'
assert_present "$H" 'https://cifmec\.edu\.do'
assert_present "$H" 'https://galansorteos\.com'
# Botón "Código" sólo donde hay urlGit: una vez en la fila/tarjeta y otra en el diálogo de detalles.
GIT=$(grep -c 'urlGit: "' src/data/projects.ts || true)
assert_count   "$H" 'data-i18n="projects\.code"' $((GIT * 2))
assert_absent  "$H" 'Pendiente|Imagen temporal'
assert_present "$H" 'id="project-details".*<dl'
assert_present "$H" '15–20 personas'
assert_present "$H" 'equipo de 3 personas, desde la idea hasta producción'
assert_absent  src/i18n/translations.ts 'orquesté'
