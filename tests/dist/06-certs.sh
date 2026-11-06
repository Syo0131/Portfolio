H=dist/index.html
assert_missing_file src/components/CertificationsModal.astro
assert_absent "$H" 'certifications-modal|openCertificationsModal'
# Cantidades y orden derivados de los datos de Certifications.astro (no fijos).
python3 - "$H" <<'PY' || FAILED=1
import re, sys
src = open("src/components/Sections/Certifications.astro").read()
visible = int(re.search(r"const VISIBLE = (\d+);", src).group(1))
certs = re.findall(r'titleKey: "([^"]+)",(?:(?!titleKey:).)*?sortDate: "([^"]+)"', src, re.S)
expected = [k for k, _ in sorted(certs, key=lambda c: c[1], reverse=True)]
h = open(sys.argv[1]).read()
sec = h[h.index('id="certifications"'):h.index('id="skills"')]
shown = re.findall(r'cert-card.*?data-i18n="(certifications\.[a-z]+\.title)"', sec, re.S)
errs = []
if shown != expected: errs.append(f"order {shown} != {expected}")
extras = sec.count("data-cert-extra")
if extras != max(0, len(expected) - visible): errs.append(f"extras {extras} != {max(0, len(expected) - visible)}")
for e in errs: print("FAIL: certs", e)
sys.exit(1 if errs else 0)
PY
