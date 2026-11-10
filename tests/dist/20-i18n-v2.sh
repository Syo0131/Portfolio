H=dist/index.html
assert_present "$H" 'data-i18n-alt="projects\.spendly\.img1"'
assert_present src/i18n/client.ts 'data-i18n-alt'
assert_absent  src/components/Sections/Contact.astro 'localStorage|const translations *='
assert_present src/components/Sections/Contact.astro 'from "\.\./\.\./i18n/client"'
assert_present src/components/ProjectDialogs.astro 'altKey'
assert_absent  src/data/projects.ts '\balt:'
