H=dist/index.html
# Critical 1: elements with the `hidden` attribute must not be shown by a display utility class.
python3 - "$H" <<'PY' || FAILED=1
import sys, glob, re
from html.parser import HTMLParser
css = "".join(open(f).read() for f in glob.glob("dist/_astro/*.css")) + open(sys.argv[1]).read()
safe = re.search(r"\[hidden\][^{]*\{display:none ?!important\}", css) is not None
bad = []
class P(HTMLParser):
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if "hidden" in a and re.search(r"(^|\s)(flex|grid|block|inline-flex|inline-block)(\s|$)", a.get("class") or ""):
            bad.append(f"<{tag} class='{a.get('class')}'>")
P().feed(open(sys.argv[1]).read())
if bad and not safe:
    print("FAIL: [hidden] overridden by display class on", len(bad), "elements, e.g.", bad[0]); sys.exit(1)
PY
# Critical 2: CV menu must touch the button (no margin gap that fires mouseleave) and
# a click on hover-capable devices must not close a menu that hover just opened.
assert_absent "$H" 'id="cv-menu"[^>]*\bmt-2\b'
assert_present src/components/Sections/Hero.astro 'hoverCapable'
assert_present src/components/Sections/Hero.astro 'clearTimeout\(closeTimer\)'
