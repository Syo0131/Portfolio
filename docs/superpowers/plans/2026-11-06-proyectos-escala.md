# Proyectos: datos completos y sección que escala — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Completar y reescribir los datos de los 5 proyectos, y dividir la sección en hasta 3 destacados (filas) + "Más proyectos" (tarjetas) con página `/proyectos`.

**Architecture:** Los datos siguen en `src/data/projects.ts`. La regla de reparto (destacados/tarjetas/"ver todos") es una función pura en `src/lib/projectLayout.ts`, sin imports de Astro, testeable con Node. `ProjectCase` (filas) se mantiene; se añade `ProjectCard` (tarjeta compacta) y se reutiliza `ProjectDialogs`. Las comprobaciones siguen en `tests/dist/`.

**Tech Stack:** Astro 6, Tailwind 3, `astro:assets`, sharp (para generar placeholders una vez), Node 22 `--experimental-strip-types` para el test de la función pura.

**Spec:** `docs/superpowers/specs/2026-11-06-proyectos-escala-design.md`

## Global Constraints
- Todos los textos ES/EN se copian **literalmente** de la spec. Ninguna cifra o funcionalidad inventada.
- Toda clave nueva existe en `es` y `en` (check 02 ya lo valida).
- Clases Tailwind literales.
- Respetar el `stack` de El Pensum que editó el usuario: `["Spring Boot","Spring Security","PostgreSQL","Docker","Dokploy","Swagger"]`. Su cambio sin commitear se incluye en el commit de la Task 1.
- Orden de destacados: CIFMEC, Spendly, Tograbao. No destacados: El Pensum, Galan Sorteos.
- Comando de verificación de cada tarea: `npm run build && bash tests/dist/run.sh` (más `node --experimental-strip-types tests/unit/projectLayout.test.ts` desde la Task 2).

## Review Focus
1. **Cambio de idioma en `/proyectos`**: el selector existe y `?lang=en` o el idioma guardado traducen la página. → Task 3, check de `lang-toggle` en `dist/proyectos/index.html`.
2. **Enlaces del menú desde `/proyectos`**: deben llevar a `/#seccion` de la home. El resaltado activo no debe romperse en la home. → Task 3, check de que no queden `href="#` en Header/Footer y de `data-section` correcto.
3. **Placeholder en producción**: digno y sin la etiqueta de desarrollo. → Task 1, check de que "Imagen temporal" no esté en `dist`.
4. **Más de 3 destacados o más de 6 no destacados**: el reparto respeta los topes. → Task 2, test unitario.
5. **Facts en el diálogo de detalles**: visibles para los proyectos en tarjeta. → Task 1, check de `dl` en `#project-details`.

---

### Task 1: Datos, textos, placeholders y facts en detalles

**Files:**
- Modify: `src/data/projects.ts`, `src/i18n/translations.ts`, `src/components/ProjectDialogs.astro`, `src/components/ProjectCase.astro`
- Create: `scripts/make-placeholder.mjs`, `src/assets/projects/cifmec/placeholder.png`, `src/assets/projects/galansorteos/placeholder.png`, `src/integrations/placeholderWarning.ts` (o un aviso equivalente en el build)
- Test: `tests/dist/12-project-data-v2.sh`

**Interfaces:**
- Produces: `Project.id` amplía la unión a `"cifmec" | "galansorteos"`; nuevo campo opcional `placeholder?: boolean`. `projects` en el orden: cifmec, spendly, tograbao, elpensum, galansorteos. `featured: true` en los tres primeros.
- Nuevas claves: `projects.fact.goal` (Objetivo/Goal), `projects.placeholderBadge` (Imagen temporal/Temporary image), `projects.placeholderCaption` (Captura próximamente/Screenshot coming soon), `projects.facts` (Datos clave/Key facts), claves `projects.cifmec.*` y `projects.galansorteos.*` (name no, category, pitch, description, fact.*), y las claves de facts de la spec (`projects.tograbao.fact.result`, `projects.spendly.fact.role`, `projects.spendly.fact.result`, `projects.elpensum.fact.team`, `projects.elpensum.fact.goal`). Se borran `projects.elpensum.fact.infra` y `projects.fact.infra` si quedan sin uso.

- [ ] **Step 1: Write the failing check** `12-project-data-v2.sh`:
```bash
H=dist/index.html
assert_absent src/data/projects.ts 'TODO: completar|TODO: enlazar'
assert_present "$H" 'https://cifmec\.edu\.do'
assert_present "$H" 'https://galansorteos\.com'
assert_absent  "$H" 'github\.com/Syo0131"[^>]*>[^<]*<[^>]*>[^<]*C[oó]digo'   # Spendly sin botón Código
assert_count   "$H" 'data-i18n="projects\.code"' 0
assert_absent  "$H" 'Pendiente|Imagen temporal'
assert_present "$H" 'id="project-details".*<dl'
assert_present "$H" '15–20 personas'
assert_present "$H" 'equipo de 3 personas, desde la idea hasta producción'
assert_absent  src/i18n/translations.ts 'orquesté'
```
- [ ] **Step 2:** `npm run build && bash tests/dist/run.sh` → Expected: FAIL.
- [ ] **Step 3: Implement**
  - `scripts/make-placeholder.mjs <out.png> "<Nombre>"`: genera con sharp un PNG de 1600×900. Fondo `#0b1118` con rejilla sutil, el nombre en grande y "Captura próximamente" debajo, en gris claro. Ejecutarlo para CIFMEC y Galan Sorteos.
  - `projects.ts`: datos exactos de la spec. Imágenes `[{ src: placeholder, alt: "<Nombre>: captura próximamente" }]` y `placeholder: true` con `// TODO: captura real`. Quitar `urlGit` de Spendly y el TODO de la imagen de Spendly.
  - `translations.ts`: reemplazar pitch y description de los 3 existentes; agregar las nuevas.
  - `ProjectCase.astro`: si `project.placeholder && import.meta.env.DEV`, mostrar la etiqueta `projects.placeholderBadge` sobre la imagen.
  - `ProjectDialogs.astro`: dentro de cada `section`, antes del stack, un `<dl>` con los facts (`valueKey` presente) usando el mismo estilo de borde de acento.
  - Aviso de build: una integración Astro mínima en `astro.config.mjs` (hook `astro:build:done`) que importe la lista de ids con placeholder y haga `logger.warn`. Si importar `projects.ts` desde la config no es viable (imports de imágenes), basta con un `console.warn` en el frontmatter de `Projects.astro`, que corre en build.
- [ ] **Step 4:** Build + checks → PASS.
- [ ] **Step 5:** Commit `feat: complete project data, add CIFMEC and Galan Sorteos with placeholders`.

---

### Task 2: Reparto destacados / tarjetas

**Files:**
- Create: `src/lib/projectLayout.ts`, `src/components/ProjectCard.astro`, `tests/unit/projectLayout.test.ts`
- Modify: `src/components/Sections/Projects.astro`, `src/i18n/translations.ts`, `tests/dist/run.sh` (ejecutar también los tests unitarios)
- Test: `tests/unit/projectLayout.test.ts`, `tests/dist/13-sections.sh`

**Interfaces:**
- Produces (`src/lib/projectLayout.ts`, genérico, sin imports):
```ts
export const MAX_FEATURED = 3;
export const MAX_CARDS = 6;
export function splitProjects<T extends { featured?: boolean }>(items: T[]):
  { featured: T[]; cards: T[]; showViewAll: boolean };
```
  Regla: `featured` = los primeros `MAX_FEATURED` con `featured: true`, en orden. El resto, en orden de array, va a `rest`. Si `rest.length <= MAX_CARDS`, entonces `cards = rest` y `showViewAll = false`. Si no, `cards = rest.slice(0, MAX_CARDS - 1)` y `showViewAll = true`.
- `ProjectCard.astro` props `{ project: Project }`. Raíz `<article class="project-card ...">`:
  - captura 16:9 `button.open-gallery`, con `data-project-id`, `<Image widths={[400,640]} sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw">`;
  - categoría, `h3` en `font-display`, pitch y chips de `stack`;
  - botones "Ver en vivo" (si hay `urlDemo`) y `button.open-details`;
  - superficie `.surface .surface-hover`.
- `Projects.astro`:
  - destacados con `ProjectCase` (`total` = número de destacados);
  - si `cards.length`, un bloque `h3` "Más proyectos" (`projects.more`) con grid `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6`;
  - si `showViewAll`, una tarjeta enlace a `/proyectos` (`projects.viewAll` "Ver todos los proyectos"/"View all projects");
  - `ProjectDialogs` con **todos** los proyectos.
- Claves: `projects.more` "Más proyectos"/"More projects", `projects.viewAll`.
- Ajuste: `ProjectDialogs` toma el título de la galería de `.project-case h3`. Debe buscar también en `.project-card` (`[data-project-id="${id}"] h3`).

- [ ] **Step 1: Write the failing tests**
  - `tests/unit/projectLayout.test.ts` (con `node:test` y `node:assert`):
    - 5 items con los 3 primeros featured → featured 3, cards 2, showViewAll false;
    - 5 featured → featured 3, cards 2 (los 2 sobrantes bajan, en orden);
    - 0 featured y 6 items → cards 6, showViewAll false;
    - 3 featured y 7 no featured → cards 5, showViewAll true;
    - lista vacía → todo vacío y showViewAll false.
  - `13-sections.sh`:
```bash
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
```
  - `run.sh`: antes de los scripts de dist, correr `node --experimental-strip-types --test tests/unit/` y poner `FAILED=1` si falla.
- [ ] **Step 2:** Build + checks → FAIL.
- [ ] **Step 3: Implement** según Interfaces.
- [ ] **Step 4:** Build + checks → PASS.
- [ ] **Step 5:** Commit `feat: featured rows plus compact project cards`.

---

### Task 3: Página `/proyectos` y enlaces del menú

**Files:**
- Create: `src/pages/proyectos.astro`
- Modify: `src/components/Sections/Header.astro`, `src/components/Sections/Footer.astro`, `src/components/Headerbadge.astro`
- Test: `tests/dist/14-projects-page.sh`

**Interfaces:**
- Consumes: `ProjectCard`, `ProjectDialogs`, `projects`, `SectionTitle` y las slots `header`/`footer` de `Layout`.
- `proyectos.astro`:
  - `Layout` con título "Proyectos · Daybel Diaz";
  - `<Header slot="header" />` y `<Footer slot="footer" />`;
  - sección `id="todos-los-proyectos"` con `SectionTitle` (`projects.title`, eyebrow `projects.eyebrow`);
  - enlace "← Volver al inicio" (`projects.backHome` "Volver al inicio"/"Back to home") a `/#proyectos`;
  - grid con `ProjectCard` para **todos** los proyectos, destacados primero, y `ProjectDialogs`.
- Header y Footer: todos los `href="#x"` pasan a `href="/#x"`. `Headerbadge.astro`: `sectionId = href.split("#")[1] ?? ""`, para que `data-section` siga siendo `x`.

- [ ] **Step 1: Write the failing check**:
```bash
P=dist/proyectos/index.html
assert_file "$P"
assert_count "$P" 'class="project-card' 5
assert_count "$P" '<dialog' 2
assert_present "$P" 'class="lang-toggle'
assert_present "$P" 'href="/#proyectos"'
assert_absent src/components/Sections/Header.astro 'href="#'
assert_absent src/components/Sections/Footer.astro 'href="#'
assert_present dist/index.html 'data-section="proyectos"'
assert_absent  dist/index.html 'data-section="/'
assert_present dist/sitemap-0.xml 'daybeldiaz\.dev/proyectos'
```
- [ ] **Step 2:** Build + checks → FAIL.
- [ ] **Step 3: Implement** según Interfaces.
- [ ] **Step 4:** Build + checks → PASS. Manual (usuario): en `/proyectos`, el selector ES/EN traduce todo y un enlace del menú lleva a la sección de la home.
- [ ] **Step 5:** Commit `feat: /proyectos page and home-absolute nav links`.
