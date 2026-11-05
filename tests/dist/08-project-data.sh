assert_file src/data/projects.ts
for d in spendly elpensum tograbao; do assert_missing_file "public/$d"; assert_file "src/assets/projects/$d"; done
assert_absent src/components/OptimizedImage.astro '/public/'
assert_absent dist/index.html '/(spendly|elpensum|tograbao)/[^"]*\.png'
assert_absent dist/index.html 'Pendiente|Pending'
assert_present dist/index.html 'https://tograbao\.com'
