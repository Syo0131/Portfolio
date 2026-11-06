H=dist/index.html
assert_count "$H" 'class="project-case' 3
assert_count "$H" 'class="project-card' 2
assert_present "$H" 'data-i18n="projects\.more"'
assert_absent  "$H" 'href="/proyectos"'      # con 2 tarjetas no hay "Ver todos"
python3 - "$H" <<'PY' || FAILED=1
import sys; h=open(sys.argv[1]).read(); s=h[h.index('id="proyectos"'):]
o=[s.index(k) for k in ('data-project-id="cifmec"','data-project-id="spendly"','data-project-id="tograbao"','data-project-id="elpensum"','data-project-id="galansorteos"')]
sys.exit(0 if o==sorted(o) else print("FAIL: project order") or 1)
PY
