P=dist/proyectos/index.html
assert_file "$P"
assert_count "$P" 'class="project-card' 5
assert_count "$P" '<dialog' 2
assert_present "$P" 'class="lang-toggle'
assert_present "$P" 'href="/#proyectos"'
assert_absent src/components/Sections/Header.astro 'href="#'
assert_absent src/components/Sections/Footer.astro 'href="#'
assert_present dist/index.html 'data-section="proyectos"'
assert_absent  dist/index.html 'data-section="/'
assert_present dist/sitemap-0.xml 'daybeldiaz\.dev/proyectos'
