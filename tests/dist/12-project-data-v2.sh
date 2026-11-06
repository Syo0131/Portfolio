H=dist/index.html
assert_absent src/data/projects.ts 'TODO: completar|TODO: enlazar'
assert_present "$H" 'https://cifmec\.edu\.do'
assert_present "$H" 'https://galansorteos\.com'
assert_count   "$H" 'data-i18n="projects\.code"' 0      # ningún proyecto expone botón "Código"
assert_absent  "$H" 'Pendiente|Imagen temporal'
assert_present "$H" 'id="project-details".*<dl'
assert_present "$H" '15–20 personas'
assert_present "$H" 'equipo de 3 personas, desde la idea hasta producción'
assert_absent  src/i18n/translations.ts 'orquesté'
