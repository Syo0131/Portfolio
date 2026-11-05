# Portafolio: mejoras visuales, rendimiento y rediseño de Proyectos — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Corregir bugs visuales/HTML, aligerar el sitio, unificar la estética y rediseñar la sección Proyectos como casos de estudio en filas (opción B).

**Architecture:** Sitio estático Astro 6 + Tailwind 3, una sola página (`src/pages/index.astro`) compuesta por secciones en `src/components/Sections/`. i18n en cliente: el HTML se genera en español y `LanguageToggle` reemplaza textos con `data-i18n` usando `src/i18n/translations.ts`. No hay framework de tests: cada tarea añade un script de comprobación en `tests/dist/` que inspecciona el código fuente y el build (`dist/`), y `tests/dist/run.sh` los ejecuta todos.

**Tech Stack:** Astro 6, Tailwind CSS 3, astro-icon, `astro:assets`, bash + python3 para las comprobaciones.

**Spec:** `docs/superpowers/specs/2026-11-05-portafolio-mejoras-design.md`

## Global Constraints

- Todo texto visible nuevo lleva `data-i18n` (o `data-i18n-aria` / `data-i18n-placeholder`) y su clave existe en `translations.es` **y** `translations.en`.
- Años de experiencia: **"+3 años" / "+3 years"** en todas partes (Hero, Layout, manifest, JSON-LD).
- Usuario de GitHub: `Syo0131` (`https://github.com/Syo0131`). LinkedIn: `https://linkedin.com/in/daybeldiaz`.
- Experiencia: actuales primero por fecha de inicio desc. → IKEA (jun 2025), Freelance (mar 2024), El Pensum (nov 2025 – feb 2026).
- Archivos a borrar: `src/components/Sections/AboutMe.astro`, `src/components/Sections/LearningPath.astro`, `src/components/SkillBadge.astro`, `src/components/Badge.astro`, `src/components/Highlight.astro`, `public/do.svg`, `public/astro.svg`, `public/background.svg`, `public/yami.jpg`.
- Fuente de títulos: `@fontsource-variable/sora`, expuesta como `font-display` en Tailwind. El cuerpo sigue en system-ui.
- Usar clases `shakespeare-*` en lugar de hex sueltos (`#5eb3e4`, `#20cef0`).
- Animaciones sólo dentro de `@media (prefers-reduced-motion: no-preference)`; sin JS el contenido debe verse.
- `npm`/`node` pueden estar bloqueados por el sandbox de Claude Code (`env: 'node': Permission denied`); ejecutar `npm run build` fuera del sandbox si ocurre.
- Un commit por tarea, mensaje en inglés estilo conventional commits.

## Review Focus

1. **Recarga con idioma EN guardado**: Hero, modales de proyectos, botón "Ver todas" y menú CV deben mostrarse en inglés. → Task 2 añade check de claves nuevas en ambos idiomas; Task 8 paso manual.
2. **JS deshabilitado o fallido**: ninguna sección debe quedar en `opacity:0`. → Task 4 check: el CSS sólo oculta `.animate-on-scroll` bajo `.js`.
3. **Datos pendientes en producción**: los facts sin valor no deben aparecer en el build. → Task 7 check: `dist/index.html` no contiene "Pendiente".
4. **Usuario de teclado / táctil**: menú del CV y diálogos operables con Tab/Enter/Escape y el foco vuelve al disparador. → Task 3 y Task 8 pasos manuales.
5. **CV actualizado con el mismo nombre**: no debe quedar cacheado un año. → Task 5 check sobre `vercel.json`.

---

### Task 0: Arnés de comprobaciones

**Files:**
- Create: `tests/dist/run.sh`, `tests/dist/lib.sh`

**Interfaces:**
- Produces: funciones bash en `lib.sh`: `assert_count <file> <regex> <n>`, `assert_present <file> <regex>`, `assert_absent <file> <regex>`, `assert_missing_file <path>`, `assert_file <path>`; cada una imprime `FAIL: …` y pone `FAILED=1`. `run.sh` hace `source lib.sh`, ejecuta cada `tests/dist/[0-9]*.sh` (en orden) y sale con 1 si `FAILED=1`. Los checks se ejecutan con el build ya hecho (`npm run build && bash tests/dist/run.sh`).

- [ ] **Step 1:** Crear `lib.sh` y `run.sh`. `assert_count` cuenta **ocurrencias**, no líneas (`grep -oE "$re" "$f" | wc -l`), porque Astro comprime el HTML en pocas líneas; las demás usan `grep -qE`.
- [ ] **Step 2:** Run `bash tests/dist/run.sh` → Expected: exit 0, sin checks.
- [ ] **Step 3:** Commit `chore: add dist check harness`.

---

### Task 1: Limpieza y bugs de HTML

**Files:**
- Delete: los de Global Constraints.
- Modify: `src/pages/index.astro`, `src/layouts/Layout.astro`, `src/components/ExperienceTimeline.astro`, `src/components/Sections/Experience.astro`, `src/components/Sections/Hero.astro`, `public/manifest.json`
- Test: `tests/dist/01-cleanup.sh`, `tests/dist/div_balance.py`

**Interfaces:**
- Produces: `Layout.astro` es dueño del único `<main>`; `index.astro` pone `<Header />` y `<Footer />` en slots nombrados `header` / `footer` del Layout, fuera de `main`.

- [ ] **Step 1: Write the failing check** `01-cleanup.sh`:
```bash
H=dist/index.html
assert_count "$H" '<main' 1
for f in src/components/Sections/AboutMe.astro src/components/Sections/LearningPath.astro src/components/SkillBadge.astro src/components/Badge.astro src/components/Highlight.astro public/do.svg public/astro.svg public/background.svg public/yami.jpg; do assert_missing_file "$f"; done
assert_absent "$H" '\+1 año|\+2 años'
assert_absent public/manifest.json '\+2 años'
assert_absent "$H" "Hello, I'm"
assert_absent src/components/Sections/Experience.astro 'Infraestructure'
assert_absent src/components/Sections/Hero.astro 'OptimizedImage|Highlight'
python3 tests/dist/div_balance.py "$H" || FAILED=1
# orden de experiencia (primera aparición de cada empresa dentro de #experiencia)
python3 - "$H" <<'PY' || FAILED=1
import sys,re; h=open(sys.argv[1]).read(); s=h[h.index('id="experiencia"'):]
i=[s.index(k) for k in ("IKEA","Freelance","El Pensum")]
sys.exit(0 if i==sorted(i) else print("FAIL: experience order",i) or 1)
PY
```
`div_balance.py <file>`: con `html.parser.HTMLParser` cuenta `<div>` abiertos/cerrados; imprime `FAIL: div balance <n>` y sale 1 si no cuadra.

- [ ] **Step 2:** `npm run build && bash tests/dist/run.sh` → Expected: FAIL (main=2, archivos presentes, orden, etc.).
- [ ] **Step 3: Implement**
  - Borrar archivos; quitar imports `AboutMe`/`LearningPath` de `index.astro` y `OptimizedImage`/`Highlight` de `Hero.astro`.
  - `Layout.astro`: `<slot name="header" />` antes de `<main>`, `<slot />` dentro, `<slot name="footer" />` después. `index.astro`: quitar su `<main>`, usar `slot="header"` / `slot="footer"`.
  - `ExperienceTimeline.astro`: cerrar el `<div class={alignmentClassesMobile}>` antes de `</li>`.
  - `Experience.astro`: reordenar array a IKEA, Freelance, El Pensum (y alternar `alignment` top/bottom/top, `alignmentMobile` right/left/right); "Infraestructure" → "Infrastructure" (también en `translations.ts` si aparece).
  - `Hero.astro`: textos por defecto = valores ES de `translations.ts` ("Hey, Soy", "+3 años de experiencia").
  - `manifest.json` y descripciones de `Layout.astro`: "+3 años".
- [ ] **Step 4:** `npm run build && bash tests/dist/run.sh` → Expected: exit 0.
- [ ] **Step 5:** Commit `fix: remove unused files, fix nested main, unclosed div and experience order`.

---

### Task 2: i18n de una sola fuente + Hero sin polling

**Files:**
- Modify: `src/components/LanguageToggle.astro`, `src/components/Sections/Header.astro`, `src/components/Sections/Hero.astro`, `src/layouts/Layout.astro`
- Create: `src/i18n/client.ts`
- Test: `tests/dist/02-i18n.sh`

**Interfaces:**
- Produces (`src/i18n/client.ts`, importado en `<script>` normales, que Astro deduplica):
  - `getLang(): "es" | "en"` — prioridad `?lang=` de la URL, luego `localStorage.lang`, luego `"es"`.
  - `setLang(lang: "es" | "en"): void` — guarda en localStorage, aplica traducciones (`data-i18n`, `data-i18n-placeholder`, `data-i18n-aria`), pone `<html lang>`, y despacha `document.dispatchEvent(new CustomEvent("langchange", { detail: { lang } }))`.
  - `t(key: TranslationKey, lang?: "es" | "en"): string`.
  - `onLangChange(cb: (lang) => void): void` — wrapper de `addEventListener("langchange")`.
- El botón usa `class="lang-toggle"` y el texto `class="lang-text"` (sin ids).

- [ ] **Step 1: Write the failing check** `02-i18n.sh`:
```bash
H=dist/index.html
assert_absent "$H" 'id="lang-toggle"|id="lang-text"'
assert_count "$H" 'class="lang-toggle' 2
assert_count "$H" '"nav\.home": *"' 0      # el JSON de traducciones ya no va inline en el HTML
assert_absent src/components/Sections/Hero.astro 'setInterval'
assert_present src/components/Sections/Hero.astro 'prefers-reduced-motion'
# toda clave usada en data-i18n existe en ambos idiomas
python3 - <<'PY' || FAILED=1
import re,glob,sys
src=open('src/i18n/translations.ts').read(); es,en=src.split('\n  en: {')
keys=set(re.findall(r'data-i18n(?:-aria|-placeholder)?="([^"]+)"',open('dist/index.html').read()))
miss=[k for k in keys if f'"{k}"' not in es or f'"{k}"' not in en]
sys.exit(print("FAIL: missing i18n keys",miss) or 1 if miss else 0)
PY
```
- [ ] **Step 2:** Build + run → Expected: FAIL.
- [ ] **Step 3: Implement** `client.ts` según Interfaces; `LanguageToggle.astro` sin `define:vars`, su script importa `getLang`/`setLang` y enlaza todos los `.lang-toggle` una sola vez (guardar `dataset.bound`). Aplicar `setLang(getLang())` al cargar. `Hero.astro`: reemplazar `setInterval` por `onLangChange(restart)`; si `matchMedia("(prefers-reduced-motion: reduce)").matches`, mostrar el primer rol estático y no animar. Quitar `applyDetailBtnI18n` y fallbacks manuales de idioma en `Projects.astro`/`ProjectsBadge.astro` (los reemplaza `data-i18n`). Añadir a `translations.ts` toda clave que el check reporte faltante.
- [ ] **Step 4:** Build + run → Expected: exit 0. Manual: `npm run preview`, cambiar a EN, recargar → Hero y nav en inglés; abrir `/?lang=en` en ventana privada → inglés.
- [ ] **Step 5:** Commit `refactor: single i18n client module with langchange event`.

---

### Task 3: Menú del CV accesible

**Files:**
- Modify: `src/components/Sections/Hero.astro`
- Test: `tests/dist/03-cv-menu.sh`

**Interfaces:**
- Produces: botón `id="cv-menu-btn"` con `aria-haspopup="menu" aria-controls="cv-menu" aria-expanded="false"`; lista `id="cv-menu"` con `role="menu"` y `hidden` por defecto; enlaces con `role="menuitem"`.

- [ ] **Step 1: Write the failing check**:
```bash
H=dist/index.html
assert_present "$H" 'id="cv-menu-btn"[^>]*aria-expanded="false"|aria-expanded="false"[^>]*id="cv-menu-btn"'
assert_present "$H" 'id="cv-menu"[^>]*hidden'
assert_absent src/components/Sections/Hero.astro 'group-hover:visible'
```
- [ ] **Step 2:** Build + run → FAIL.
- [ ] **Step 3: Implement** toggle por clic (cambia `hidden` y `aria-expanded`), cierre con Escape (devuelve foco al botón) y clic fuera. En escritorio (`@media (hover:hover)`) abrir también con `mouseenter`/cerrar con `mouseleave` del contenedor.
- [ ] **Step 4:** Build + run → PASS. Manual: Tab hasta el botón, Enter abre, Tab recorre ES/EN, Escape cierra y el foco vuelve; en emulación táctil, tap abre/cierra.
- [ ] **Step 5:** Commit `fix: make CV download menu keyboard and touch accessible`.

---

### Task 4: Rendimiento global (fondo y animaciones)

**Files:**
- Modify: `src/layouts/Layout.astro`, `src/components/Sections/Footer.astro`, `src/components/Sections/Skill.astro`, `src/components/Sections/Contact.astro`, `src/components/CertificationsBadge.astro`, `src/components/Sections/Certifications.astro`, `src/components/Sections/Experience.astro`
- Test: `tests/dist/04-perf.sh`

**Interfaces:**
- Produces: script inline en `<head>`: `document.documentElement.classList.add("js")`. Las clases `.animate-on-scroll`, `.animate-fade-left/right`, `.animate-scale` sólo ocultan bajo `.js` y dentro de `prefers-reduced-motion: no-preference`. Nueva utilidad `.stagger` + estilo `--i` (índice) para retrasos escalonados de hijos al hacerse visible el padre. Observer: `unobserve` tras añadir `animate-visible`.

- [ ] **Step 1: Write the failing check**:
```bash
L=src/layouts/Layout.astro
assert_present "$L" 'classList\.add\("js"\)'
assert_absent  "$L" 'will-change|animate-pulse-gentle|blur-\[100px\]'
assert_present "$L" 'unobserve\('
assert_absent src/components/Sections/Footer.astro 'blur-\[100px\]'
for f in src/components/Sections/Skill.astro src/components/Sections/Contact.astro src/components/CertificationsBadge.astro src/components/Sections/Certifications.astro; do assert_absent "$f" 'animation: *fadeIn'; done
# sin .js nada queda oculto
CSS=$(cat dist/_astro/*.css)
echo "$CSS" | grep -oE '[^}]*\{[^}]*opacity: *0[;}]' | grep -E 'animate-(on-scroll|fade|scale)' | grep -vq '\.js ' && { echo "FAIL: hidden without .js"; FAILED=1; }
```
- [ ] **Step 2:** Build + run → FAIL.
- [ ] **Step 3: Implement** Fondo: quitar los 2 orbes con blur y su keyframe; añadir al contenedor fijo `background: radial-gradient(...)` estático con `shakespeare-500` a baja opacidad en las mismas posiciones; dejar 4 partículas (quitar 5 y 6). Footer: orbe → `radial-gradient` estático. Sustituir las animaciones de carga de Skill/Contact/Certificaciones por `animate-on-scroll` en el contenedor + `.stagger` en los hijos. `Experience.astro`: `resize` → `ResizeObserver` sobre `#scroll-container`.
- [ ] **Step 4:** Build + run → PASS. Manual: DevTools → deshabilitar JS → todas las secciones visibles; Performance → scroll de toda la página sin tareas largas de "Paint" del fondo.
- [ ] **Step 5:** Commit `perf: static background glow, scroll-only animations, no-JS safe`.

---

### Task 5: Config, SEO y caché

**Files:**
- Modify: `vercel.json`, `public/robots.txt`, `src/layouts/Layout.astro`
- Create: `src/pages/404.astro`
- Test: `tests/dist/05-seo.sh`

- [ ] **Step 1: Write the failing check**:
```bash
python3 - <<'PY' || FAILED=1
import json,sys; v=json.load(open('vercel.json')); e=[]
if any(r.get('source')=='/(.*)' for r in v.get('rewrites',[])): e.append('catch-all rewrite')
for h in v['headers']:
  for kv in h['headers']:
    if 'immutable' in kv['value'] and h['source']!='/_astro/(.*)': e.append('immutable on '+h['source'])
    if kv['key']=='X-XSS-Protection': e.append('x-xss')
    if kv['key']=='Content-Security-Policy' and 'unsafe-eval' in kv['value']: e.append('unsafe-eval')
sys.exit(print('FAIL:',e) or 1 if e else 0)
PY
assert_absent public/robots.txt '_astro|Crawl-delay'
assert_file dist/404.html
H=dist/index.html
assert_present "$H" 'og:image:width" content="1024'
assert_present "$H" 'github\.com/Syo0131'
assert_absent  "$H" 'github\.com/daybeldiaz'
```
- [ ] **Step 2:** Build + run → FAIL.
- [ ] **Step 3: Implement** `vercel.json`: un bloque `"/_astro/(.*)"` con `public, max-age=31536000, immutable`; el bloque de imágenes/pdf de `/public` pasa a `public, max-age=86400, must-revalidate`; borrar el bloque js/css genérico, `X-XSS-Protection`, `'unsafe-eval'` y la rewrite `/(.*)`. `robots.txt`: quitar `Disallow: /_astro/` y `Crawl-delay`. `Layout.astro`: `og:image:width/height` = 1024/1024, `sameAs` GitHub → `Syo0131`; el `hreflang` con `?lang=en` se mantiene (Task 2 ya lee `?lang=`). `404.astro`: usa `Layout`, título "Página no encontrada", enlace a `/`.
- [ ] **Step 4:** Build + run → PASS.
- [ ] **Step 5:** Commit `fix: cache headers, real 404, robots and structured data`.

---

### Task 6: Certificaciones sin modal, ordenadas

**Files:**
- Delete: `src/components/CertificationsModal.astro`
- Modify: `src/components/Sections/Certifications.astro`, `src/i18n/translations.ts`
- Test: `tests/dist/06-certs.sh`

**Interfaces:**
- Produces: cada cert tiene `sortDate: string` (`"YYYY-MM"`, `"9999-99"` para "Cursando"); se ordena desc. Las primeras 6 visibles; el resto con `hidden` y `data-cert-extra`. Botón `id="certs-toggle"` con `aria-expanded`, textos `certifications.showAll` ("Ver todas" / "Show all") y `certifications.showLess` ("Ver menos" / "Show less").

- [ ] **Step 1: Write the failing check**:
```bash
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
```
- [ ] **Step 2:** Build + run → FAIL.
- [ ] **Step 3: Implement** según Interfaces; el toggle alterna `hidden` en `[data-cert-extra]` y el texto/`data-i18n` del botón.
- [ ] **Step 4:** Build + run → PASS.
- [ ] **Step 5:** Commit `refactor: inline certifications expand, sort by date`.

---

### Task 7: Tipografía, títulos y superficies

**Files:**
- Modify: `package.json`, `tailwind.config.mjs`, `src/layouts/Layout.astro`, `src/components/SectionTitle.astro`, `src/components/Sections/Hero.astro`, `src/components/Sections/Header.astro`, `src/components/ExperienceTimeline.astro`, `src/components/CertificationsBadge.astro`, `src/components/Sections/Skill.astro`, `src/components/Sections/Contact.astro`, y cada sección que pasa `class="mb-*"` a `SectionTitle`
- Test: `tests/dist/07-style.sh`

**Interfaces:**
- Produces:
  - Tailwind `fontFamily.display: ['"Sora Variable"', 'system-ui', 'sans-serif']`; import `@fontsource-variable/sora` en `Layout.astro`.
  - `SectionTitle` props: `{ titleKey?: string; eyebrow?: string; eyebrowKey?: string; class?: string }`; `h2` con `font-display`; eyebrow en `<span>` mono pequeño `text-shakespeare-400 uppercase tracking-[0.15em]`. Márgenes sólo en el componente.
  - Clases globales en `Layout.astro` (`@layer components`): `.surface` (fondo `bg-slate-900/40`, `border border-slate-800/60`, `rounded-2xl`) y `.surface-hover` (borde `shakespeare-500/40` en hover). Usarlas en Experiencia, Certificaciones, Skills y Contacto en lugar de sus mezclas actuales.

- [ ] **Step 1: Write the failing check**:
```bash
assert_present package.json '@fontsource-variable/sora'
assert_present tailwind.config.mjs 'display:'
assert_present "$(ls dist/_astro/*.css | head -1)" 'Sora Variable'
assert_present src/components/SectionTitle.astro 'font-display'
assert_absent src/components/Sections/Header.astro '#5eb3e4|#20cef0'
for f in src/components/ExperienceTimeline.astro src/components/CertificationsBadge.astro src/components/Sections/Skill.astro src/components/Sections/Contact.astro; do assert_present "$f" '\bsurface\b'; done
```
(si el CSS se divide en varios archivos, hacer `cat dist/_astro/*.css` a un temporal y comprobar ahí).
- [ ] **Step 2:** Build + run → FAIL.
- [ ] **Step 3: Implement** `npm i @fontsource-variable/sora`; aplicar `font-display` al `h1` del Hero, `SectionTitle` y nombres de proyecto; eyebrows: Experiencia "Trayectoria"/"Career", Proyectos "Casos de estudio"/"Case studies", Certificaciones "Aprendizaje"/"Learning", Skills "Stack"/"Stack" (claves `*.eyebrow` en `translations.ts`). Estados activos del nav con `text-shakespeare-400 bg-shakespeare-500/15 ring-1 ring-shakespeare-400/40`.
- [ ] **Step 4:** Build + run → PASS. Manual: Network → sólo un woff2 de Sora (latin) cargado.
- [ ] **Step 5:** Commit `style: display font, section eyebrows and shared surfaces`.

---

### Task 8: Datos e imágenes de proyectos

**Files:**
- Create: `src/data/projects.ts`
- Move: `public/spendly/*`, `public/elpensum/*`, `public/tograbao/*` → `src/assets/projects/{spendly,elpensum,tograbao}/` (`git mv`)
- Modify: `src/components/OptimizedImage.astro`, `src/i18n/translations.ts`
- Test: `tests/dist/08-project-data.sh`

**Interfaces:**
- Produces (`src/data/projects.ts`):
```ts
import type { ImageMetadata } from "astro";
import type { TranslationKey } from "../i18n/translations";
export interface ProjectFact { labelKey: TranslationKey; valueKey?: TranslationKey } // sin valueKey = pendiente
export interface Project {
  id: "tograbao" | "spendly" | "elpensum";
  name: string; categoryKey: TranslationKey; pitchKey: TranslationKey; descriptionKey: TranslationKey;
  facts: ProjectFact[]; stack: string[]; stackFull: string[];
  images: { src: ImageMetadata; alt: string }[];
  urlDemo?: string; urlDemoLabel?: string; urlGit?: string; featured?: boolean;
}
export const projects: Project[];
```
- Valores (orden del array = orden en pantalla):
  - **tograbao** (featured): urlDemo `https://tograbao.com`, label `tograbao.com`; stack `Next.js, Strapi, Docker, Dokploy`; facts: role → `projects.tograbao.fact.role` ("Líder de proyecto"/"Project lead"), team → `projects.tograbao.fact.team` ("3 personas"/"3 people"), result (pendiente). Pitch ES: "Plataforma inmobiliaria rápida y optimizada para SEO. Lideré a un equipo de 3 personas de principio a fin." EN: "Fast, SEO-optimized real estate platform. I led a team of 3 from start to finish."
  - **spendly**: urlDemo `https://frontend.daybeldiaz.dev/`, label `frontend.daybeldiaz.dev`; urlGit `https://github.com/Syo0131` con `// TODO: enlazar al repositorio`; stack `Spring Boot, Angular, PostgreSQL, Docker`; facts: key → `projects.spendly.fact.key` ("Registro automático desde correos del banco"/"Auto-logging from bank emails"), role (pendiente), result (pendiente). Pitch ES: "Finanzas personales que registra tus gastos solos leyendo las notificaciones del banco." EN: "Personal finance app that logs your expenses automatically from bank notifications."
  - **elpensum**: urlDemo `https://backend.elpensum.com/swagger-ui/index.html`, label `backend.elpensum.com`; stack `Spring Boot, Spring Security, PostgreSQL, Docker`; facts: role → `projects.elpensum.fact.role` ("Backend e infraestructura"/"Backend & infrastructure"), infra → `projects.elpensum.fact.infra` ("VPS, DNS y SSL propios"/"Own VPS, DNS and SSL"), result (pendiente). Pitch ES: "API que modela universidades, carreras y pensums, sobre infraestructura cloud montada por mí." EN: "API modeling universities, degrees and curricula, on cloud infrastructure I set up."
  - `stackFull` = las listas `technologies` actuales de `Projects.astro`. `descriptionKey` = las claves `projects.*.description` existentes.
  - Etiquetas: `projects.fact.role` Rol/Role, `projects.fact.team` Equipo/Team, `projects.fact.key` Clave/Key feature, `projects.fact.infra` Infraestructura/Infrastructure, `projects.fact.result` Resultado/Outcome, `projects.pending` Pendiente/Pending.
- `OptimizedImage.astro` acepta `src: ImageMetadata | string`; si es string conserva el glob actual pero sobre `src/assets/**` (Hero no lo usa ya; si queda sin usos, borrarlo).

- [ ] **Step 1: Write the failing check**:
```bash
assert_file src/data/projects.ts
for d in spendly elpensum tograbao; do assert_missing_file "public/$d"; assert_file "src/assets/projects/$d"; done
assert_absent src/components/OptimizedImage.astro '/public/'
assert_absent dist/index.html '/(spendly|elpensum|tograbao)/[^"]*\.png'
assert_absent dist/index.html 'Pendiente|Pending'
assert_present dist/index.html 'https://tograbao\.com'
```
- [ ] **Step 2:** Build + run → FAIL.
- [ ] **Step 3: Implement** según Interfaces; `Projects.astro` pasa a importar `projects` de `src/data/projects.ts` (el render cambia en Task 9; aquí basta con adaptar `ProjectsBadge` a `Project` para que el build pase).
- [ ] **Step 4:** Build + run → PASS.
- [ ] **Step 5:** Commit `refactor: typed project data and optimized project images`.

---

### Task 9: Proyectos en layout B con diálogos únicos

**Files:**
- Delete: `src/components/ProjectsBadge.astro`
- Create: `src/components/ProjectCase.astro`, `src/components/ProjectDialogs.astro`
- Modify: `src/components/Sections/Projects.astro`, `src/i18n/translations.ts`
- Test: `tests/dist/09-projects.sh`

**Interfaces:**
- Consumes: `Project`, `projects` (Task 8); `SectionTitle` con `eyebrowKey` (Task 7); `setLang`/`onLangChange` (Task 2); `.animate-on-scroll` (Task 4).
- Produces:
  - `ProjectCase.astro` props `{ project: Project; index: number; total: number }`. Raíz `<article class="project-case" data-project-id>`; `index` impar → imagen a la derecha en `lg`; `project.featured` → grid `lg:grid-cols-[1.4fr_1fr]`, resto `lg:grid-cols-[1.2fr_1fr]`; en móvil una columna con imagen arriba. Imagen dentro de marco de navegador (barra con 3 puntos + `urlDemoLabel`), `<Image>` con `widths={[640,960,1280]}` `sizes="(min-width:1024px) 60vw, 100vw"`, `loading` eager si `index===0`. La imagen es un `<button class="open-gallery" data-project-id>`. Info: categoría, `h3` `font-display`, pitch, facts (los sin `valueKey` sólo si `import.meta.env.DEV`, con texto `projects.pending`), chips de `stack`, CTAs "Ver en vivo" (`projects.viewLive`) y "Detalles" (`projects.details`, `button.open-details`) más "Código" (`projects.code`) si hay `urlGit`.
  - `ProjectDialogs.astro` props `{ projects: Project[] }`: un `<dialog id="project-gallery">` y un `<dialog id="project-details">`. Las URLs webp de la galería (`getImage({ src, format: "webp", width: 1600 })`) van en `<script type="application/json" id="project-gallery-data">` como `Record<id, {src, alt}[]>`. El de detalles contiene un `<section data-project-id hidden>` por proyecto con descripción completa (`descriptionKey`), `stackFull`, enlaces. Flechas ocultas si sólo hay 1 imagen; ←/→ navegan; cierre nativo con Escape, botón (`projects.close`) y clic en backdrop.
  - Claves nuevas: `projects.viewLive` Ver en vivo/View live, `projects.details` Detalles/Details, `projects.code` Código/Code, `projects.close` Cerrar/Close, `projects.viewImages` Ver imágenes/View images, `projects.prevImage` Imagen anterior/Previous image, `projects.nextImage` Imagen siguiente/Next image, `projects.stack` Stack/Stack, `projects.eyebrow` Casos de estudio/Case studies. Borrar `projects.filter.*`, `projects.category.*`, `projects.showMore/showLess/readMore/readLess`.

- [ ] **Step 1: Write the failing check**:
```bash
H=dist/index.html
assert_missing_file src/components/ProjectsBadge.astro
assert_absent "$H" 'filter-btn|show-more-btn'
assert_count  "$H" '<dialog' 2
assert_count  "$H" 'class="project-case' 3
assert_present "$H" 'id="project-gallery-data"'
assert_present "$H" '\.webp'
assert_absent src/components/ProjectCase.astro 'Cerrar|Ver Demo|Ver imágenes'
assert_absent src/components/ProjectDialogs.astro '>(Cerrar|Ver Demo en vivo|Stack)<'
```
(el check i18n de Task 2 ya cubre que las claves nuevas existan en ES y EN).
- [ ] **Step 2:** Build + run → FAIL.
- [ ] **Step 3: Implement** según Interfaces. `Projects.astro` queda: `SectionTitle` con `eyebrowKey="projects.eyebrow"`, lista `flex flex-col gap-16 lg:gap-24` de `ProjectCase`, y `<ProjectDialogs projects={projects} />`. Un solo `<script>` en `ProjectDialogs.astro`, sin `setTimeout`, enlazado con `dataset.bound`.
- [ ] **Step 4:** Build + run → PASS. Manual (`npm run preview`):
  - Escritorio: filas alternadas, la primera más ancha; abrir galería desde cada imagen, navegar con flechas y ←/→, cerrar con Escape → el foco vuelve a la imagen.
  - "Detalles" abre el proyecto correcto; cambiar a EN con el diálogo abierto → textos en inglés.
  - 390px: una columna; en consola `document.documentElement.scrollWidth <= innerWidth` → `true`.
  - Lighthouse móvil antes (commit de Task 8) y después: registrar Performance, LCP, CLS y bytes transferidos en el mensaje del PR.
- [ ] **Step 5:** Commit `feat: case-study project rows with shared gallery and details dialogs`.
