# Responsive del portafolio — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Que el sitio se vea correcto entre 375 y 1536 px, corrigiendo los 6 problemas medidos con capturas reales el 2026-11-10.

**Architecture:** Ajustes de clases Tailwind en los componentes afectados. Para probarlos de verdad se añade un arnés que abre el build en Chrome real (Playwright) en varios anchos y mide geometría: solapes, alturas y columnas. Cada tarea agrega su comprobación y la ve fallar antes de arreglar.

**Tech Stack:** Astro 6, Tailwind 3.4, `playwright` (devDependency, canal `chrome`, ya instalado en `/opt/google/chrome`), Node 22.

**Spec:** sin documento propio. Los requisitos son los hallazgos del brainstorm del 2026-11-10, medidos con Chrome en 375/390/768/1024/1280/1440/1536 px y copiados abajo. Diseño base: `docs/superpowers/specs/2026-11-06-proyectos-escala-design.md`.

## Hallazgos (medidos)
| id | Problema | Medida actual | Tarea |
|---|---|---|---|
| R1 | El menú lateral fijo (`#main-sidebar`, visible desde `lg`) tapa contenido | solape de 255 px a 1024, 127 a 1152, 72 a 1280, 37 a 1366, 0 a 1440 | 1 |
| R2 | Proyectos enormes entre 768 y 1023 px: filas en 1 columna | cada fila ≈ 0,85 × alto de pantalla a 768×1024; sección ≈ 3,6 pantallas | 2 |
| R6 | Datos clave (facts) apretados a 1024: 3 columnas en una columna de texto angosta | un `dd` ocupa 6 líneas | 2 |
| R3 | Habilidades a 768: 3 tarjetas angostas con iconos en 3 columnas | "Hibernate" y "PostgreSQL" se pisan | 3 |
| R4 | Experiencia en móvil: timeline centrada con texto en medias columnas | bloques de ≈ 170 px, líneas de 2–3 palabras | 4 |
| R5 | Encabezado móvil (`header.lg:hidden`) sin fondo | los títulos pasan bajo el botón ES y el menú | 5 |

## Decisiones de diseño (mías; el usuario no expresó preferencia sobre el menú lateral)
- **R1:** se mantiene el menú lateral y su diseño. El contenido reserva su espacio con padding derecho `lg:pr-[104px] xl:pr-[124px]` en `<main>` y en el pie. Esos valores son el ancho del menú más su margen (60+24 en `lg`, 72+32 en `xl`) más unos 20 px de aire.
- **R2:** las filas destacadas pasan a 2 columnas desde `md` (768), no desde `lg`. Proporciones en `md`: `[1.1fr_1fr]` y, al alternar, `[1fr_1.1fr]`; desde `lg` siguen las actuales. Títulos: grande `text-2xl md:text-3xl xl:text-4xl`, normal `text-2xl xl:text-3xl`.
- **R6:** facts en 3 columnas sólo cuando la fila es de 1 columna (`sm`, 640–767) o hay espacio (`xl`). En `md`/`lg` van en 1 columna: `sm:grid-cols-3 md:grid-cols-1 xl:grid-cols-3`.
- **R3:** se mantienen las 3 tarjetas en `md`; los iconos de cada tarjeta pasan a 2 columnas en `md` y vuelven a 3 en `lg`: `grid-cols-3 sm:grid-cols-4 md:grid-cols-2 lg:grid-cols-3`.
- **R4:** en móvil la timeline pasa a riel a la izquierda: línea vertical a `left-[7px]`, punto sobre la línea y todo el texto a la derecha, alineado a la izquierda, a ancho completo menos el riel. Se eliminan `alignmentMobile` y la alternancia derecha/izquierda en móvil. En `md`+ no cambia nada.
- **R5:** la barra móvil lleva fondo `bg-black/80 backdrop-blur-md` y `border-b border-white/5`.

## Global Constraints
- Sin cambios de diseño en escritorio ≥ 1440 px, salvo el padding de R1. Ningún texto cambia.
- Sin scroll horizontal en ningún ancho probado (375, 390, 768, 900, 1024, 1152, 1280, 1366, 1440, 1536).
- Clases Tailwind literales.
- La comprobación responsive corre en `bash tests/dist/run.sh`. Si falta Chrome, falla con la instrucción `npx playwright install --with-deps chrome`; no se salta en silencio.
- Verificación de cada tarea: `npm run build && bash tests/dist/run.sh`.

## Review Focus
1. **Ancho intermedio de VS Code (≈ 900 px):** las filas en 2 columnas no deben quedar apretadas. → Task 2: el texto de cada fila mide ≥ 300 px de ancho a 900 px.
2. **Menú lateral sobre el pie de página y Contacto:** también deben respetar el espacio. → Task 1: el check mide `footer` y `#contacto`.
3. **Fila alternada (texto a la izquierda) en `md`:** la imagen va a la derecha y no se cruzan. → Task 2: a 768 px la imagen de la fila 2 está a la derecha de su texto.
4. **Experiencia en tablet (768) con la timeline horizontal:** no debe cambiar con R4. → Task 4: a 768 px la lista de escritorio sigue visible y la móvil oculta.
5. **Menú móvil abierto:** el panel desplegable sigue legible sobre el nuevo fondo. → Task 5: con el menú abierto a 390 px, el panel tiene fondo opaco (alfa ≥ 0,8).

---

### Task 0: Arnés responsive con Chrome

**Files:**
- Create: `tests/responsive/run.mjs`, `tests/responsive/checks/00-no-horizontal-scroll.mjs`, `tests/dist/30-responsive.sh`
- Modify: `package.json` (devDependency `playwright`, misma versión que usa `npx`: `1.65.0`)

**Interfaces:**
- Produces:
  - `tests/responsive/run.mjs`:
    - levanta `astro preview --host 127.0.0.1 --port 4410` sobre `dist/` y espera la línea `Local`;
    - abre Chrome con `chromium.launch({ channel: "chrome" })` y `reducedMotion: "reduce"`;
    - importa cada `tests/responsive/checks/*.mjs`, que exporta `export const widths: [number, number][]`, `export const path = "/"` (opcional) y `export default async function check(page, { width, height }): Promise<string[]>` (lista de errores);
    - por cada ancho, navega, ejecuta el check e imprime `FAIL: [<archivo> @<w>x<h>] <error>`;
    - sale con 1 si hubo errores, apaga el servidor y cierra el navegador siempre (en `finally`).
  - `tests/dist/30-responsive.sh`: ejecuta `node tests/responsive/run.mjs`. Si no existe `/opt/google/chrome/chrome`, imprime `FAIL: Chrome no instalado — ejecuta: npx playwright install --with-deps chrome` y pone `FAILED=1`.
- Check base `tests/responsive/checks/00-no-horizontal-scroll.mjs`: en los 10 anchos de Global Constraints, `document.documentElement.scrollWidth <= clientWidth`.

- [ ] **Step 1:** escribir `run.mjs`, el check 00 y `30-responsive.sh`, y `npm i -D playwright@1.65.0`.
- [ ] **Step 2:** `npm run build && bash tests/dist/run.sh` → Expected: PASS, porque hoy no hay scroll horizontal. Para probar que el arnés detecta fallos, añadir temporalmente `min-width: 2000px` al `body`, ver `FAIL: [00-no-horizontal-scroll.mjs @375x812]…` y quitarlo.
- [ ] **Step 3:** Commit `test: responsive harness with real Chrome via Playwright`.

---

### Task 1: El menú lateral no tapa contenido (R1)

**Files:** Modify `src/layouts/Layout.astro` (`<main>` y el envoltorio del slot `footer`) · Test `tests/responsive/checks/01-sidebar-overlap.mjs`

**Interfaces:**
- `<main>` añade `lg:pr-[104px] xl:pr-[124px]`.
- El slot `footer` queda dentro de `<div class="lg:pr-[104px] xl:pr-[124px]">`.

- [ ] **Step 1: Write the failing check** `01-sidebar-overlap.mjs`:
  - `widths`: 1024×768, 1152×800, 1280×800, 1366×768, 1440×900, 1536×864.
  - Si `#main-sidebar` está visible, para cada elemento de `.project-case`, `.project-card`, `.cert-card`, `.skill-category`, `#experiencia .surface`, `#contacto .surface` y `footer nav`, comprueba que `rect.right <= sidebarNav.left - 8`. Cada infracción es `"<selector> overlaps sidebar by Npx"`. Antes de medir, hacer scroll de cada elemento a la vista, para no depender de que la sección esté en pantalla.
  - En la timeline de experiencia sólo cuentan las tarjetas visibles dentro del contenedor con scroll: usar `rect.right` recortado al rect de `#scroll-container`.
- [ ] **Step 2:** Build + checks → Expected: FAIL a 1024, 1152, 1280 y 1366.
- [ ] **Step 3: Implement** según Interfaces.
- [ ] **Step 4:** Build + checks → PASS.
- [ ] **Step 5:** Commit `fix: content reserves space for the fixed side menu on laptops`.

---

### Task 2: Filas de proyectos en tablet/laptop pequeña y facts (R2, R6)

**Files:** Modify `src/components/ProjectCase.astro` · Test `tests/responsive/checks/02-project-rows.mjs`

**Interfaces:**
- `gridCols` (líneas 22–31) pasa a combinar `md:` y `lg:`. Literales:
  - grande normal: `"md:grid-cols-[1.1fr_1fr] lg:grid-cols-[1.4fr_1fr]"`;
  - grande alternada: `"md:grid-cols-[1fr_1.1fr] lg:grid-cols-[1fr_1.4fr]"`;
  - normal: `"md:grid-cols-[1.1fr_1fr] lg:grid-cols-[1.2fr_1fr]"`;
  - normal alternada: `"md:grid-cols-[1fr_1.1fr] lg:grid-cols-[1fr_1.2fr]"`.
- Raíz: `gap-8 md:gap-10 lg:gap-14`. Imagen alternada: `md:order-2` en lugar de `lg:order-2`.
- Título: grande `text-2xl md:text-3xl xl:text-4xl`; normal `text-2xl xl:text-3xl`.
- Facts `<dl>`: `grid grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-1 xl:grid-cols-3`.

- [ ] **Step 1: Write the failing check** `02-project-rows.mjs`:
  - `widths`: 768×1024, 900×700, 1024×768, 390×844.
  - Desde 768: cada `.project-case` tiene 2 columnas en `gridTemplateColumns` y altura ≤ 0,6 × alto de pantalla.
  - A 900: el bloque de texto de cada fila (el hijo que no es `.browser-frame`) mide ≥ 300 px.
  - A 768: en la fila 2, la imagen está a la derecha de su texto (`frame.left > text.left`).
  - Facts: a 1024, cada `dd` de `.project-case` ocupa ≤ 3 líneas (`height ≤ 3 × lineHeight`).
  - A 390: las filas siguen en 1 columna.
- [ ] **Step 2:** Build + checks → Expected: FAIL a 768 y 900 (1 columna) y a 1024 (facts).
- [ ] **Step 3: Implement** según Interfaces.
- [ ] **Step 4:** Build + checks → PASS.
- [ ] **Step 5:** Commit `fix: project rows go two-column from tablet; facts stack on narrow columns`.

---

### Task 3: Habilidades a 768 (R3)

**Files:** Modify `src/components/Sections/Skill.astro:137` · Test `tests/responsive/checks/03-skills-labels.mjs`

**Interfaces:** grid de iconos `grid grid-cols-3 sm:grid-cols-4 md:grid-cols-2 lg:grid-cols-3 gap-4`.

- [ ] **Step 1: Write the failing check** `03-skills-labels.mjs`:
  - `widths`: 390×844, 768×1024, 1024×768, 1440×900.
  - En cada `.skill-category`, ningún par de etiquetas (`.skill-item span`) se cruza.
  - Ninguna etiqueta es más ancha que su `.skill-item`: `span.scrollWidth <= item.clientWidth + 1`.
- [ ] **Step 2:** Build + checks → Expected: FAIL a 768.
- [ ] **Step 3: Implement.**
- [ ] **Step 4:** Build + checks → PASS.
- [ ] **Step 5:** Commit `fix: skill icons use two columns on tablet`.

---

### Task 4: Experiencia en móvil con riel a la izquierda (R4)

**Files:** Modify `src/components/ExperienceTimeline.astro` (variante `mobile`), `src/components/Sections/Experience.astro` (línea vertical móvil y datos de `alignmentMobile`) · Test `tests/responsive/checks/04-experience-mobile.mjs`

**Interfaces:**
- `Props` pierde `alignmentMobile`, y también se quita de los datos de `Experience.astro`.
- Variante `mobile`:
  - `<li class="relative pl-8 mb-10">`;
  - punto `absolute left-0 top-2 w-3.5 h-3.5 …` centrado sobre la línea;
  - contenedor de texto `text-left` a ancho completo.
- Línea móvil en `Experience.astro`: `absolute left-[7px] top-0 h-full w-0.5 …`, en lugar de `left-1/2 -translate-x-1/2`.

- [ ] **Step 1: Write the failing check** `04-experience-mobile.mjs`:
  - `widths`: 375×812, 390×844, 768×1024.
  - Hasta 767 px: cada `h3` de la lista móvil visible mide ≥ 0,7 × ancho de `#experiencia ul`, y su `text-align` computado es `left` o `start`.
  - A 768: la lista móvil (`#experiencia .md\:hidden`) tiene `display: none` y `#scroll-container` está visible.
- [ ] **Step 2:** Build + checks → Expected: FAIL a 375 y 390.
- [ ] **Step 3: Implement** según Interfaces.
- [ ] **Step 4:** Build + checks → PASS. El check 25, que compara el HTML del servidor con `es`, sigue en verde.
- [ ] **Step 5:** Commit `fix: mobile experience timeline uses a left rail with full-width text`.

---

### Task 5: Encabezado móvil con fondo (R5)

**Files:** Modify `src/components/Sections/Header.astro:76` · Test `tests/responsive/checks/05-mobile-header.mjs`

**Interfaces:** el contenedor interior de `header.lg:hidden` (el `div` con `flex items-center justify-end`) lleva `bg-black/80 backdrop-blur-md border-b border-white/5`.

- [ ] **Step 1: Write the failing check** `05-mobile-header.mjs`:
  - `widths`: 375×812, 390×844, 768×1024.
  - El fondo computado de la barra (`#mobile-menu-toggle` → la barra `div` que lo contiene) tiene alfa ≥ 0,7.
  - Al pulsar `#mobile-menu-toggle`, `#mobile-menu` es visible y su fondo tiene alfa ≥ 0,8.
  - A 1024 el `header` no se muestra.
- [ ] **Step 2:** Build + checks → Expected: FAIL en el alfa de la barra.
- [ ] **Step 3: Implement.**
- [ ] **Step 4:** Build + checks → PASS.
- [ ] **Step 5:** Commit `fix: mobile header bar has a solid backdrop`.

---

### Cierre
- Repetir las capturas del brainstorm (390, 768, 1024, 1440 en Hero, Experiencia, Proyectos, Certificaciones, Habilidades y Contacto) en el scratchpad y revisarlas a ojo antes de la revisión final. Es parte de la verificación, no un check automático.
