# Pulido post-revisión: idioma con `?lang=` y pendientes menores — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Corregir el botón de idioma atascado cuando la URL trae `?lang=`, y resolver los 6 pendientes menores de la revisión final de `2026-11-06-proyectos-escala`.

**Architecture:** La lógica de idioma que hoy depende de `window` se separa en un módulo puro, `src/i18n/lang.ts`, testeable con Node. `client.ts` lo usa. El resto son ajustes puntuales en componentes, CSS global y el runner de comprobaciones.

**Tech Stack:** Astro 6, Tailwind 3, Node 22 (`--experimental-strip-types`, `node:test`), sharp (sólo para regenerar los placeholders).

**Spec:** no hay documento de diseño propio. Los requisitos salen de los hallazgos de la revisión final del plan `docs/superpowers/plans/2026-11-06-proyectos-escala.md` (registro borrado tras el cierre; los hallazgos se copian abajo) y de la petición del usuario: "escribe el plan" para el bug de idioma y los pendientes menores. Spec de referencia: `docs/superpowers/specs/2026-11-06-proyectos-escala-design.md`.

## Hallazgos a resolver
1. **Idioma atascado:** con `?lang=en` en la URL, el botón no puede pasar a ES, porque `getLang()` da prioridad a la URL sobre `localStorage`.
2. **Imágenes de las tarjetas:** máximo 640w, borrosas en móviles 3x a 390px.
3. **Placeholder:** el texto "CAPTURA PRÓXIMAMENTE" está grabado en español; los visitantes EN lo ven igual.
4. **Encabezados:** en la home, "Más proyectos" es `h3` y las tarjetas también `h3`, así que el esquema de encabezados queda plano.
5. **Hover:** el borde de las tarjetas cambia sin transición. `.js .animate-on-scroll` pisa `transition-all`.
6. **Runner:** el log de los tests unitarios va a una ruta fija, `/tmp/portfolio-unit.log`.
7. **Orden en `/proyectos`:** con más de 3 destacados, `/proyectos` y la home los ordenan distinto.

## Global Constraints
- Sin cambios visibles de textos ni de datos de proyectos.
- Toda clave nueva de traducción en `es` y `en` (el check 02 lo valida). Este plan no debería necesitar ninguna.
- Clases Tailwind literales.
- Verificación de cada tarea: `npm run build && bash tests/dist/run.sh`. Incluye los tests unitarios de `tests/unit/*.test.ts`.
- **Cambio sobre la spec 2026-11-06 aprobado por el usuario al pedir este plan:** el placeholder deja de llevar "Captura próximamente" grabado. Queda sólo el nombre; el texto alternativo sigue indicando que es temporal.

## Review Focus
1. **Visitante que llega por `/?lang=en` y alterna ES→EN→ES:** cada clic cambia el idioma, la URL refleja el idioma actual (`?lang=`) y al recargar se mantiene. → Task 1, tests unitarios de `resolveLang` y `withLangParam`.
2. **URL con otros parámetros o hash (`/?utm_source=x&lang=en#proyectos`):** cambiar idioma conserva los demás parámetros y el hash. → Task 1, test unitario.
3. **Galería abierta desde una tarjeta con `h4`:** el título de la galería sigue mostrando el nombre. → Task 2, check de que el selector de la galería incluye `h4`.
4. **No-JS / movimiento reducido:** el cambio de `transition` no puede reintroducir `opacity:0` fuera de `.js`. → Task 3, el check 04 existente sigue en verde.
5. **Más de 3 destacados:** `/proyectos` y la home siguen el mismo orden. → Task 2, test unitario de `orderProjects`.

---

### Task 1: Idioma con `?lang=` en la URL

**Files:**
- Create: `src/i18n/lang.ts`, `tests/unit/lang.test.ts`
- Modify: `src/i18n/client.ts`

**Interfaces:**
- Produces (`src/i18n/lang.ts`, sin `window` ni imports de Astro):
```ts
export type Lang = "es" | "en";
export function resolveLang(search: string, stored: string | null): Lang;
// prioridad: ?lang válido en `search` > `stored` válido > "es"
export function withLangParam(href: string, lang: Lang): string | null;
// si `href` tiene ?lang, devuelve el mismo href con lang reemplazado (conserva los demás params y el hash); si no lo tiene, null
```
- `client.ts`:
  - `getLang()` pasa a ser `resolveLang(location.search, localStorage.getItem("lang"))`;
  - `setLang(lang)` además llama `withLangParam(location.href, lang)` y, si no es `null`, hace `history.replaceState(null, "", url)`;
  - `Lang` se re-exporta desde `lang.ts`.

- [ ] **Step 1: Write the failing test** `tests/unit/lang.test.ts`:
  - `resolveLang("?lang=en", "es") === "en"`;
  - `resolveLang("", "en") === "en"`;
  - `resolveLang("?lang=fr", null) === "es"`;
  - `resolveLang("", "xx") === "es"`;
  - `withLangParam("https://daybeldiaz.dev/?lang=en", "es") === "https://daybeldiaz.dev/?lang=es"`;
  - `withLangParam("https://daybeldiaz.dev/proyectos?utm_source=x&lang=en#proyectos", "es") === "https://daybeldiaz.dev/proyectos?utm_source=x&lang=es#proyectos"`;
  - `withLangParam("https://daybeldiaz.dev/#proyectos", "en") === null`.
- [ ] **Step 2:** `node --experimental-strip-types --no-warnings --test tests/unit/lang.test.ts` → Expected: FAIL `ERR_MODULE_NOT_FOUND`.
- [ ] **Step 3: Implement** `lang.ts` con `URLSearchParams` y `URL`, y adaptar `client.ts` según Interfaces.
- [ ] **Step 4:** el mismo comando → PASS 7/7. Luego `npm run build && bash tests/dist/run.sh` → All checks passed.
- [ ] **Step 5:** Commit `fix: language toggle works when ?lang is in the URL`.

---

### Task 2: Tarjetas: resolución, encabezados, orden y placeholder neutro

**Files:**
- Modify: `src/components/ProjectCard.astro`, `src/components/Sections/Projects.astro`, `src/components/ProjectDialogs.astro`, `src/pages/proyectos.astro`, `src/lib/projectLayout.ts`, `scripts/make-placeholder.mjs`, `tests/unit/projectLayout.test.ts`
- Regenerate: `src/assets/projects/cifmec/placeholder.png`, `src/assets/projects/galansorteos/placeholder.png`
- Test: `tests/dist/16-cards-polish.sh`

**Interfaces:**
- Produces (`projectLayout.ts`): `export function orderProjects<T extends { featured?: boolean }>(items: T[]): T[]`. Devuelve `[...featured, ...resto]` con la misma regla de tope que `splitProjects`: los destacados que pasan de `MAX_FEATURED` quedan en el resto, en el orden del array.
- `ProjectCard` acepta la prop `headingLevel?: 3 | 4` (por defecto 3). Renderiza `h3` o `h4` con las mismas clases. La home pasa `headingLevel={4}`; `/proyectos` usa el valor por defecto.
- Selector del título de la galería en `ProjectDialogs`: `:is(.project-case, .project-card)[data-project-id="${id}"] :is(h3, h4)`.
- `ProjectCard` `<Image widths={[400, 640, 960]}>`.
- `make-placeholder.mjs`: sin la línea "CAPTURA PRÓXIMAMENTE"; el nombre queda centrado verticalmente.

- [ ] **Step 1: Write the failing tests**
  - `tests/unit/projectLayout.test.ts` añade:
    - `orderProjects` con 5 items todos featured devuelve `["p0","p1","p2","p3","p4"]`;
    - con `[f, n, f, n, f, f]` (ids `p0..p5`) devuelve `["p0","p2","p4","p1","p3","p5"]`. `p5` es el cuarto destacado, así que queda en el resto, después de `p3`.
  - `tests/dist/16-cards-polish.sh`:
```bash
H=dist/index.html
python3 - "$H" <<'PY' || FAILED=1
import sys,re; h=open(sys.argv[1]).read()
cards=re.findall(r'<article class="project-card.*?</article>', h, re.S)
bad=[c for c in cards if '<h4' not in c]
sys.exit(print("FAIL: home cards must use h4") or 1 if bad or len(cards)!=2 else 0)
PY
assert_present "$H" 'srcset="[^"]*960w'
assert_present src/components/ProjectDialogs.astro ':is\(h3, h4\)'
assert_absent  scripts/make-placeholder.mjs 'PRÓXIMAMENTE'
assert_present src/pages/proyectos.astro 'orderProjects'
```
- [ ] **Step 2:** `npm run build && bash tests/dist/run.sh` → Expected: FAIL (unit tests de `orderProjects` y check 16).
- [ ] **Step 3: Implement** según Interfaces y regenerar los dos placeholders con `node scripts/make-placeholder.mjs <ruta> "<Nombre>"`.
- [ ] **Step 4:** `npm run build && bash tests/dist/run.sh` → All checks passed.
- [ ] **Step 5:** Commit `fix: sharper card images, heading levels, consistent order, neutral placeholders`.

---

### Task 3: Transición de hover y runner

**Files:**
- Modify: `src/layouts/Layout.astro` (regla `.js .animate-on-scroll`), `tests/dist/run.sh`
- Test: `tests/dist/17-hover-runner.sh`

**Interfaces:**
- La regla `.js .animate-on-scroll` declara en `transition`: `opacity 0.6s …, transform 0.6s …, border-color 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease`. Las curvas de opacity y transform no cambian.
- `run.sh` guarda el log unitario en `$(mktemp)` y lo borra al terminar.

- [ ] **Step 1: Write the failing check** `17-hover-runner.sh`:
```bash
CSS=$(mktemp); cat dist/_astro/*.css dist/index.html > "$CSS"
assert_present "$CSS" '\.js \.animate-on-scroll\{[^}]*border-color \.3s'
rm -f "$CSS"
assert_absent tests/dist/run.sh '/tmp/portfolio-unit\.log'
```
- [ ] **Step 2:** Build + checks → FAIL.
- [ ] **Step 3: Implement** según Interfaces.
- [ ] **Step 4:** Build + checks → All checks passed. El check 04 (sin `opacity:0` fuera de `.js`) sigue en verde.
- [ ] **Step 5:** Commit `fix: smooth card hover under scroll animation; temp log for unit tests`.

---

## Fuera de este plan
Siguen pendientes los menores de la primera revisión (2026-11-05), que el usuario no incluyó:
- el levantamiento de las tarjetas de Skills al pasar el mouse;
- la caché `immutable` de los webp en `vercel.json`;
- que el menú del CV se cierre al salir con Tab;
- el nombre accesible del diálogo de detalles;
- el texto alternativo de las imágenes en inglés;
- el foco al cerrar la galería abierta desde Detalles;
- el `src=""` inicial de la galería;
- el respaldo si falla el JS;
- las traducciones propias del formulario de Contacto;
- la protección de la animación del Hero ante dobles inicializaciones.
