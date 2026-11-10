H=dist/index.html
assert_missing_file src/components/ProjectsBadge.astro
assert_absent "$H" 'filter-btn|show-more-btn'
assert_count  "$H" '<dialog' 2
assert_present "$H" 'id="project-gallery-data"'
assert_present "$H" '\.webp'
assert_absent src/components/ProjectCase.astro 'Cerrar|Ver Demo|Ver imágenes'
assert_absent src/components/ProjectDialogs.astro '>(Cerrar|Ver Demo en vivo|Stack)<'
