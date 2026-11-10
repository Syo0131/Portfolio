CSS=$(mktemp); cat dist/_astro/*.css dist/index.html > "$CSS"
assert_present "$CSS" '\.js \.animate-on-scroll\{[^}]*border-color \.3s'
rm -f "$CSS"
assert_absent tests/dist/run.sh '/tmp/portfolio-unit\.log'
