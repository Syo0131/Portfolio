H=dist/index.html
# El diálogo de detalles no debe hacer scroll él mismo (sólo su cuerpo), y el cuerpo usa la barra temática.
assert_present "$H" 'id="project-details"[^>]*overflow-hidden'
assert_present "$H" 'scrollbar-themed[^"]*overflow-y-auto|overflow-y-auto[^"]*scrollbar-themed'
CSS_ALL=$(mktemp); cat dist/_astro/*.css "$H" > "$CSS_ALL"
assert_present "$CSS_ALL" '\.scrollbar-themed\{[^}]*scrollbar-color'
assert_present "$CSS_ALL" '\.scrollbar-themed::-webkit-scrollbar-thumb'
rm -f "$CSS_ALL"
