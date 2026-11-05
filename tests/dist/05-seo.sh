#!/usr/bin/env bash

python3 - <<'PY' || FAILED=1
import json, sys
v = json.load(open('vercel.json'))
e = []
if any(r.get('source') == '/(.*)' for r in v.get('rewrites', [])):
    e.append('catch-all rewrite')
for h in v.get('headers', []):
    for kv in h.get('headers', []):
        if 'immutable' in kv['value'] and h['source'] != '/_astro/(.*)':
            e.append('immutable on ' + h['source'])
        if kv['key'] == 'X-XSS-Protection':
            e.append('x-xss')
        if kv['key'] == 'Content-Security-Policy' and 'unsafe-eval' in kv['value']:
            e.append('unsafe-eval')
if e:
    print('FAIL:', e)
    sys.exit(1)
sys.exit(0)
PY

assert_absent public/robots.txt '_astro|Crawl-delay'
assert_file dist/404.html
H=dist/index.html
assert_present "$H" 'og:image:width" content="1024'
assert_present "$H" 'github\.com/Syo0131'
assert_absent  "$H" 'github\.com/daybeldiaz'
