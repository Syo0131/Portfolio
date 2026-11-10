"""Calcula lo que la home y /proyectos deberían mostrar a partir de los datos reales.

Lee src/data/projects.ts (ids y `featured: true`, en orden) y los topes de
src/lib/projectLayout.ts, y aplica la misma regla que splitProjects/orderProjects.
Así los checks no dependen de cuántos proyectos haya.
"""
import json, re, sys

data = open("src/data/projects.ts").read()
layout = open("src/lib/projectLayout.ts").read()
max_featured = int(re.search(r"MAX_FEATURED = (\d+)", layout).group(1))
max_cards = int(re.search(r"MAX_CARDS = (\d+)", layout).group(1))

body = data[data.index("export const projects"):]
# Cada proyecto empieza con `id: "..."`; su bloque llega hasta el siguiente id.
starts = [(m.start(), m.group(1)) for m in re.finditer(r'\bid: "([^"]+)"', body)]
items = []
for n, (pos, pid) in enumerate(starts):
    end = starts[n + 1][0] if n + 1 < len(starts) else len(body)
    items.append((pid, "featured: true" in body[pos:end]))

featured, rest = [], []
for pid, is_featured in items:
    (featured if is_featured and len(featured) < max_featured else rest).append(pid)
show_view_all = len(rest) > max_cards
cards = rest[: max_cards - 1] if show_view_all else rest

json.dump({
    "all": [pid for pid, _ in items],
    "featured": featured,
    "cards": cards,
    "ordered": featured + rest,
    "showViewAll": show_view_all,
}, sys.stdout)
