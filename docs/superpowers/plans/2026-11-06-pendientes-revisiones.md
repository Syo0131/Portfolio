# Pendientes de las revisiones — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Resolver los 15 hallazgos menores que quedaron de las revisiones finales de los planes 2026-11-05 y 2026-11-06.

**Architecture:** Arreglos puntuales en animaciones (`Layout.astro`), i18n (`client.ts`, `lang.ts`, `translations.ts`), diálogos y menús (`ProjectDialogs.astro`, `Hero.astro`), datos de proyecto y configuración. Cada uno con su comprobación en `tests/dist/` o un test unitario.

**Tech Stack:** Astro 6, Tailwind 3, Node 22 (`node:test`), bash + python3 para checks.

**Spec:** sin documento de diseño propio. Los requisitos son los hallazgos de las revisiones, copiados abajo, y la petición del usuario: "tenemos que revisar todos esos issues y implementar un fix". Specs de referencia: `docs/superpowers/specs/2026-11-05-portafolio-mejoras-design.md` y `docs/superpowers/specs/2026-11-06-proyectos-escala-design.md`.

## Hallazgos (id → tarea)

| id | Hallazgo | Tarea |
|---|---|---|
| A1 | Las tarjetas de Skills no se levantan al hover: `.animate-visible { transform: none !important }` anula `hover:-translate-y-1` | 1 |
| A8 | Si el JS de módulo falla tras poner `.js`, las secciones quedan en `opacity:0` | 1 |
| A10 | La animación de rol del Hero no tiene guard contra doble init, y `heroFadeIn` (inline) ignora reduced-motion | 1 |
| B3 | `withLangParam` re-serializa la query (`%20`→`+`, `?ref`→`?ref=`) | 2 |
| A9/B1 | `Contact.astro` tiene diccionario propio y lee `localStorage` directo | 2 |
| A5 | El alt de las imágenes de proyectos queda en español en EN | 2 |
| A3 | El menú del CV no se cierra al salir con Tab; `role="menu"` sin navegación con flechas | 3 |
| A4 | El diálogo de detalles no tiene nombre accesible | 3 |
| A6 | Al cerrar la galería abierta desde Detalles, el foco vuelve a la página y no a Detalles | 3 |
| A7 | `<img src="">` en la galería | 3 |
| B5 | `/proyectos` no tiene `h1` | 3 |
| A2 | En `vercel.json` la regla por extensión va después de `/_astro/(.*)`, así que los webp con hash pueden perder `immutable` | 4 |
| B2 | Bucle de partición duplicado en `splitProjects` y `orderProjects` | 4 |
| B4 | `16-cards-polish.sh` fija 2 tarjetas | 4 |

## Global Constraints
- Sin cambios de textos visibles ni de datos, salvo los nuevos alt en inglés y los mensajes de Contacto, que pasan a `translations.ts` con el mismo texto actual.
- Toda clave nueva existe en `es` y `en`. El check 02 se amplía para cubrir `data-i18n-alt`.
- Animaciones sólo dentro de `prefers-reduced-motion: no-preference`; sin JS no hay nada oculto.
- Clases Tailwind literales.
- Verificación de cada tarea: `npm run build && bash tests/dist/run.sh`. Incluye `tests/unit/*.test.ts`.

## Review Focus
1. **Scroll normal con JS sano:** las secciones siguen apareciendo con su animación al entrar en pantalla y no de golpe a los 2 s. → Task 1, check de que el respaldo solo aplica bajo `.js:not([data-reveal])`.
2. **Hover sobre una tarjeta ya revelada:** se levanta y cambia de color con transición; no hay salto al terminar la entrada. → Task 1, check de que el script quita las clases de animación al terminar.
3. **Cambiar a EN con la galería abierta:** el alt de la imagen visible y el título siguen correctos. → Task 2, check de `data-i18n-alt` y de que la galería usa `t(altKey)`.
4. **Usuario de teclado:** Tab fuera del menú del CV lo cierra; Detalles → Ver imágenes → Escape devuelve el foco a Detalles. → Task 3, checks de `focusout` y de reapertura de Detalles.
5. **Agregar un proyecto no destacado:** ningún check falla por contar tarjetas fijas. → Task 4.

---

### Task 1: Animaciones (A1, A8, A10)

**Files:** Modify `src/layouts/Layout.astro`, `src/components/Sections/Hero.astro` · Test `tests/dist/19-motion.sh`

**Interfaces:**
- Observer de `Layout.astro`: al revelar, añade `animate-visible`. Después de `transitionend` de `opacity`, o de un respaldo de 1200 ms, quita `animate-on-scroll`, `animate-fade-left`, `animate-fade-right`, `animate-scale`, `stagger` y `animate-visible`. Desde ese momento el elemento usa sólo sus propias utilidades (hover, transición).
- `.animate-visible` ya no lleva `!important`.
- El script del observer pone `document.documentElement.dataset.reveal = "ready"`. El CSS añade el respaldo `.js:not([data-reveal]) .animate-on-scroll, …fade-left, …fade-right, …scale { animation: reveal-fallback 0.4s ease 2s forwards }` con `@keyframes reveal-fallback { to { opacity: 1; transform: none } }`. Va fuera del media query de movimiento, porque el contenido debe aparecer siempre.
- Hero:
  - `heroFadeIn` pasa del `style` inline a una clase `.hero-fade-in` definida dentro de `prefers-reduced-motion: no-preference`;
  - `initRoleAnimation` sale temprano si `roleElement.dataset.bound === "true"` y, si no, lo marca.

- [ ] **Step 1: Write the failing check** `19-motion.sh`:
```bash
L=src/layouts/Layout.astro
assert_present "$L" 'dataset\.reveal *= *"ready"'
assert_present "$L" 'classList\.remove\([^)]*"animate-on-scroll"'
CSS=$(mktemp); cat dist/_astro/*.css dist/index.html > "$CSS"
assert_present "$CSS" '\.js:not\(\[data-reveal\]\) \.animate-on-scroll'
assert_absent  "$CSS" '\.animate-visible\{[^}]*!important'
rm -f "$CSS"
assert_absent  src/components/Sections/Hero.astro 'style="animation: *heroFadeIn'
assert_present src/components/Sections/Hero.astro 'roleElement\.dataset\.bound'
```
- [ ] **Step 2:** Build + checks → FAIL.
- [ ] **Step 3: Implement** según Interfaces.
- [ ] **Step 4:** Build + checks → PASS. El check 04 (sin `opacity:0` fuera de `.js`) sigue en verde.
- [ ] **Step 5:** Commit `fix: reveal animations hand off to hover, JS-failure fallback, hero motion guards`.

---

### Task 2: Idioma (B3, A9/B1, A5)

**Files:** Modify `src/i18n/lang.ts`, `src/i18n/client.ts`, `src/i18n/translations.ts`, `src/components/Sections/Contact.astro`, `src/data/projects.ts`, `src/components/ProjectCase.astro`, `src/components/ProjectCard.astro`, `src/components/ProjectDialogs.astro`, `tests/dist/02-i18n.sh` · Test `tests/unit/lang.test.ts`, `tests/dist/20-i18n-v2.sh`

**Interfaces:**
- `withLangParam(href, lang)`: misma firma, pero sólo reemplaza el valor de `lang` en la query cruda y deja intactos el resto de parámetros y su codificación.
- `setLang`: además de lo actual, recorre `[data-i18n-alt]` y pone `alt = t(key)`.
- Imágenes de proyecto: `images: { src: ImageMetadata; altKey: TranslationKey }[]`. Desaparece `alt`.
  - Claves `projects.<id>.img<N>`, con N desde 1. ES = el alt actual; EN = traducción literal, por ejemplo "Spendly: main dashboard".
  - Los placeholders usan `projects.<id>.img1` ("CIFMEC: captura próximamente" / "CIFMEC: screenshot coming soon").
- Las `<Image>` de `ProjectCase` y `ProjectCard` llevan `alt={t(altKey)}` y `data-i18n-alt={altKey}`.
- El JSON de la galería guarda `altKey`; el script usa `t(altKey)` con el idioma actual.
- Contact: claves `contact.sending`, `contact.success` y `contact.error` con los textos actuales en ES y EN. `contact.send` ya existe. El script importa `getLang` y `t` de `../../i18n/client` y no lee `localStorage`.
- `02-i18n.sh`: la regex de claves pasa a `data-i18n(?:-aria|-placeholder|-alt)?=`.

- [ ] **Step 1: Write the failing tests**
  - `lang.test.ts` añade:
    - `withLangParam("https://x.dev/?q=a%20b&lang=en", "es") === "https://x.dev/?q=a%20b&lang=es"`;
    - `withLangParam("https://x.dev/?ref&lang=en#p", "es") === "https://x.dev/?ref&lang=es#p"`.
  - `20-i18n-v2.sh`:
```bash
H=dist/index.html
assert_present "$H" 'data-i18n-alt="projects\.spendly\.img1"'
assert_present src/i18n/client.ts 'data-i18n-alt'
assert_absent  src/components/Sections/Contact.astro 'localStorage|const translations *='
assert_present src/components/Sections/Contact.astro 'from "\.\./\.\./i18n/client"'
assert_present src/components/ProjectDialogs.astro 'altKey'
assert_absent  src/data/projects.ts '\balt:'
```
- [ ] **Step 2:** Build + checks → FAIL.
- [ ] **Step 3: Implement** según Interfaces.
- [ ] **Step 4:** Build + checks → PASS.
- [ ] **Step 5:** Commit `fix: translated image alts, shared i18n in contact form, lossless lang param`.

---

### Task 3: Accesibilidad de diálogos y menús (A3, A4, A6, A7, B5)

**Files:** Modify `src/components/Sections/Hero.astro`, `src/components/ProjectDialogs.astro`, `src/components/SectionTitle.astro`, `src/pages/proyectos.astro` · Test `tests/dist/21-a11y.sh`

**Interfaces:**
- **Menú del CV:**
  - pasa a ser un desplegable simple: se quitan `role="menu"`, `role="menuitem"` y `aria-haspopup`, y se mantienen `aria-expanded` y `aria-controls`;
  - se cierra en `focusout` del contenedor cuando `relatedTarget` queda fuera de él.
- **Detalles:**
  - cada `h3` del diálogo lleva `id="project-details-title-<id>"`;
  - `openDetails(id)` pone `aria-labelledby` del `<dialog>` a ese id.
- **Galería desde Detalles:**
  - `openGallery(id, fromDetails: boolean)` recuerda si vino de Detalles;
  - al cerrarse la galería (evento `close`), si vino de Detalles, se reabre Detalles del mismo proyecto y se enfoca su botón `.open-gallery`.
- **`<img>` de la galería:** sin atributo `src` en el HTML; lo pone `show()`.
- **`SectionTitle`:** prop `as?: "h1" | "h2"`, por defecto `"h2"`. `/proyectos` la usa con `as="h1"`.

- [ ] **Step 1: Write the failing check** `21-a11y.sh`:
```bash
H=dist/index.html
assert_absent  "$H" 'role="menu"|role="menuitem"'
assert_present src/components/Sections/Hero.astro 'focusout'
assert_present "$H" 'id="project-details-title-cifmec"'
assert_present src/components/ProjectDialogs.astro 'aria-labelledby'
assert_present src/components/ProjectDialogs.astro 'fromDetails'
assert_absent  "$H" 'id="project-gallery-img"[^>]*src=""|src=""[^>]*id="project-gallery-img"'
assert_count   dist/proyectos/index.html '<h1' 1
```
- [ ] **Step 2:** Build + checks → FAIL.
- [ ] **Step 3: Implement** según Interfaces.
- [ ] **Step 4:** Build + checks → PASS. El check 03 se adapta en este paso: deja de exigir `role="menu"` si lo hacía; se registra como ruling.
- [ ] **Step 5:** Commit `fix: CV disclosure closes on tab-out, named details dialog, focus returns to details, h1 on /proyectos`.

---

### Task 4: Caché e higiene (A2, B2, B4)

**Files:** Modify `vercel.json`, `src/lib/projectLayout.ts`, `tests/dist/16-cards-polish.sh` · Test `tests/dist/22-hygiene.sh`, `tests/unit/projectLayout.test.ts` (sin cambios, debe seguir en verde)

**Interfaces:**
- **`vercel.json`:** el bloque `/_astro/(.*)` queda **después** del bloque por extensión, para que su `Cache-Control` inmutable gane en los archivos con hash.
- **`projectLayout.ts`:**
  - función interna `partition(items)` que devuelve `{ featured, rest }` con la regla del tope;
  - `splitProjects` y `orderProjects` la usan, y sus firmas no cambian.
- **`16-cards-polish.sh`:** `len(cards) < 1` en lugar de `!= 2`.

- [ ] **Step 1: Write the failing check** `22-hygiene.sh`:
```bash
python3 - <<'PY' || FAILED=1
import json,sys; v=[h['source'] for h in json.load(open('vercel.json'))['headers']]
ext=[i for i,s in enumerate(v) if 'webp' in s][0]; astro=v.index('/_astro/(.*)')
sys.exit(0 if astro>ext else print("FAIL: /_astro block must come after the extension block") or 1)
PY
assert_count src/lib/projectLayout.ts 'for \(const item of items\)' 1
assert_absent tests/dist/16-cards-polish.sh 'len\(cards\)!=2'
```
- [ ] **Step 2:** Build + checks → FAIL.
- [ ] **Step 3: Implement** según Interfaces.
- [ ] **Step 4:** Build + checks → PASS, con los tests unitarios de `projectLayout` en verde.
- [ ] **Step 5:** Commit `chore: immutable cache wins for hashed assets, shared partition, robust card check`.
