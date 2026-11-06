H=dist/index.html
assert_absent  "$H" 'role="menu"|role="menuitem"'
assert_present src/components/Sections/Hero.astro 'focusout'
FIRST=$(python3 -c "import json,subprocess;print(json.loads(subprocess.check_output(['python3','tests/dist/project_expect.py']))['all'][0])")
assert_present "$H" "id=\"project-details-title-$FIRST\""
assert_present src/components/ProjectDialogs.astro 'aria-labelledby'
assert_present src/components/ProjectDialogs.astro 'fromDetails'
assert_absent  "$H" 'id="project-gallery-img"[^>]*src=""|src=""[^>]*id="project-gallery-img"'
assert_count   dist/proyectos/index.html '<h1' 1
