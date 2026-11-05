assert_present package.json '@fontsource-variable/sora'
assert_present tailwind.config.mjs 'display:'
CSS_ALL=$(mktemp); cat dist/_astro/*.css > "$CSS_ALL" 2>/dev/null
assert_present "$CSS_ALL" 'Sora Variable'
rm -f "$CSS_ALL"
assert_present src/components/SectionTitle.astro 'font-display'
assert_absent src/components/Sections/Header.astro '#5eb3e4|#20cef0'
for f in src/components/ExperienceTimeline.astro src/components/CertificationsBadge.astro src/components/Sections/Skill.astro src/components/Sections/Contact.astro; do assert_present "$f" '\bsurface\b'; done
