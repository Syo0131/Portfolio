python3 - <<'PY' || FAILED=1
import json,sys; v=[h['source'] for h in json.load(open('vercel.json'))['headers']]
ext=[i for i,s in enumerate(v) if 'webp' in s][0]; astro=v.index('/_astro/(.*)')
sys.exit(0 if astro>ext else print("FAIL: /_astro block must come after the extension block") or 1)
PY
assert_count src/lib/projectLayout.ts 'for \(const item of items\)' 1
assert_absent tests/dist/16-cards-polish.sh 'len\(cards\)!=2'
