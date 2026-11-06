"""Imprime como JSON el diccionario `es` de src/i18n/translations.ts (claves -> textos)."""
import json, re, sys
src = open("src/i18n/translations.ts").read()
es = src[src.index("  es: {"):src.index("\n  en: {")]
pairs = re.findall(r'\n    "([^"]+)":\s*\n?\s*"((?:[^"\\]|\\.)*)"', es)
json.dump({k: json.loads(f'"{v}"') for k, v in pairs}, sys.stdout, ensure_ascii=False)
