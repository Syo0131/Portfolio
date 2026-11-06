H=dist/index.html
assert_absent  "$H" 'role="menu"|role="menuitem"'
assert_present src/components/Sections/Hero.astro 'focusout'
assert_present "$H" 'id="project-details-title-cifmec"'
assert_present src/components/ProjectDialogs.astro 'aria-labelledby'
assert_present src/components/ProjectDialogs.astro 'fromDetails'
assert_absent  "$H" 'id="project-gallery-img"[^>]*src=""|src=""[^>]*id="project-gallery-img"'
assert_count   dist/proyectos/index.html '<h1' 1
