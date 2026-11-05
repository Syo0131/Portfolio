H=dist/index.html
assert_missing_file src/components/CertificationsModal.astro
assert_absent "$H" 'certifications-modal|openCertificationsModal'
assert_count  "$H" 'cert-card' 8
assert_count  "$H" 'data-cert-extra' 2
python3 - "$H" <<'PY' || FAILED=1
import sys; h=open(sys.argv[1]).read(); s=h[h.index('id="certifications"'):]
o=[s.index(k) for k in ("Java avanzado","Enterprise full stack","Introduccion a SQL","Spring Framework 6")]
sys.exit(0 if o==sorted(o) else print("FAIL: cert order") or 1)
PY
