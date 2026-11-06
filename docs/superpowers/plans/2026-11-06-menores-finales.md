# Pendientes menores finales — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Cerrar los 4 menores que dejó la revisión del plan `2026-11-06-pendientes-revisiones` y convertir en tests de comportamiento las decisiones de UI que hoy sólo se comprueban buscando texto.

**Architecture:** Las decisiones de interfaz que hoy viven dentro de `<script>` de componentes Astro se extraen a funciones puras en `src/lib/ui.ts`, sin DOM ni Astro, y se testean con `node:test`. Los componentes las importan. El resto son ajustes de CSS y de los checks.

**Tech Stack:** Astro 6, Node 22 (`--experimental-strip-types`, `node:test`), bash + python3.

**Spec:** sin documento propio. Los requisitos son los hallazgos de la revisión, copiados abajo, y la petición del usuario: "revisar todos los problemas menores, realizar un plan y luego ejecutar esos fix, y así dejamos el proyecto libre de errores menores".

## Hallazgos
| id | Hallazgo | Tarea |
|---|---|---|
| M1 | El respaldo CSS `reveal-fallback` está fuera de `prefers-reduced-motion: no-preference` | 1 |
| M2 | El check 02 no cubre las claves de alt que sólo usa la galería (`img2`, `img3` en el JSON) | 1 |
| M4 | `22-hygiene.sh` comprueba el texto de otro check (`16-cards-polish.sh`) | 1 |
| M3 | Las conductas de UI (respaldo ya mostrado, cierre del menú del CV, navegación y retorno de la galería) sólo se verifican buscando texto | 2 |

**Decisión del usuario** (ya tomada, se mantiene): al cerrar la galería abierta desde Detalles se vuelve siempre a Detalles.

## Global Constraints
- Sin cambios visibles de comportamiento: lo que hoy funciona sigue igual. Los tests nuevos fijan ese comportamiento.
- Funciones puras: sin `window`, `document` ni imports de Astro; sólo tipos y valores.
- Verificación de cada tarea: `npm run build && bash tests/dist/run.sh` (incluye `tests/unit/*.test.ts`).
- **Política de cierre (pedida por el usuario):** en la revisión final, los hallazgos menores también entran en la pasada de correcciones, no sólo los Critical/Important.

## Review Focus
1. **Movimiento reducido con el JS de módulo caído:** nada queda oculto. Bajo `reduce` no se oculta nada, así que el respaldo no hace falta. → Task 1, check de que la regla del respaldo vive dentro del media query y check 04 en verde.
2. **Galería con 1 imagen:** las flechas no aparecen y ←/→ no cambian nada. → Task 2, test de `galleryStep`.
3. **Menú del CV: Tab al siguiente control fuera del menú con el puntero encima:** debe cerrarse igual (el puntero sólo importa cuando `relatedTarget` es `null`). → Task 2, test de `shouldCloseCvMenu`.
4. **Respaldo a medio animar (entre 2 s y 2,4 s) cuando llega el script:** el elemento se libera y no vuelve a `opacity 0`. → Task 2, test de `fallbackAlreadyShown`.
5. **Agregar una clave de alt sólo en ES:** el check 02 falla. → Task 1.

---

### Task 1: CSS del respaldo y checks (M1, M2, M4)

**Files:** Modify `src/layouts/Layout.astro`, `tests/dist/02-i18n.sh`, `tests/dist/22-hygiene.sh` · Test `tests/dist/24-minors.sh`

**Interfaces:**
- La regla `.js:not([data-reveal]) .animate-*` con `animation: reveal-fallback …` y su `@keyframes` se mueven dentro del bloque `@media (prefers-reduced-motion: no-preference)` que ya existe en `Layout.astro`.
- `02-i18n.sh`: además de los `data-i18n*` del HTML, extrae los `"altKey":"…"` del `<script id="project-gallery-data">` de `dist/index.html` y exige cada clave en `es` y `en`.
- `22-hygiene.sh`: se elimina la línea que inspecciona `16-cards-polish.sh`.

- [ ] **Step 1: Write the failing check** `24-minors.sh`:
```bash
python3 - <<'PY' || FAILED=1
import re,sys; s=open('src/layouts/Layout.astro').read()
m=re.search(r'@media \(prefers-reduced-motion: no-preference\) \{(.*?)\n  \}\n', s, re.S)
inside = m and 'reveal-fallback' in m.group(1) and '.js:not([data-reveal])' in m.group(1)
outside = s.replace(m.group(0), '') if m else s
leaked = re.search(r'\.js:not\(\[data-reveal\]\)', outside[:outside.find('<script')])
sys.exit(0 if inside and not leaked else print("FAIL: reveal fallback must live only inside the no-preference media query") or 1)
PY
assert_present tests/dist/02-i18n.sh 'altKey'
assert_absent  tests/dist/22-hygiene.sh '16-cards-polish'
```
- [ ] **Step 2:** Build + checks → FAIL.
- [ ] **Step 3: Implement** según Interfaces. Para comprobar que el 02 nuevo detecta faltantes, borrar temporalmente `"projects.spendly.img2"` de `en`, ver FAIL y restaurar.
- [ ] **Step 4:** Build + checks → PASS.
- [ ] **Step 5:** Commit `fix: reveal fallback only under no-preference; i18n check covers gallery alts`.

---

### Task 2: Decisiones de UI como funciones puras con tests (M3)

**Files:** Create `src/lib/ui.ts`, `tests/unit/ui.test.ts` · Modify `src/layouts/Layout.astro`, `src/components/Sections/Hero.astro`, `src/components/ProjectDialogs.astro`

**Interfaces** (`src/lib/ui.ts`):
```ts
export interface AnimationLike { animationName?: string; playState: string; currentTime: number | null }
/** true si la animación reveal-fallback terminó o ya pasó su retraso de 2000 ms. */
export function fallbackAlreadyShown(animations: AnimationLike[], delayMs?: number): boolean; // delayMs por defecto 2000
/** Decide si el menú del CV se cierra en focusout. relatedInside: null si relatedTarget es null. */
export function shouldCloseCvMenu(relatedInside: boolean | null, hovered: boolean): boolean;
/** Índice siguiente en la galería con vuelta; con total <= 1 devuelve 0. */
export function galleryStep(current: number, delta: number, total: number): number;
```
- `Layout.astro`: el pre-pase usa `fallbackAlreadyShown(el.getAnimations?.() ?? [])`.
- `Hero.astro`: `focusout` usa `shouldCloseCvMenu(next ? container.contains(next) : null, container.matches(":hover"))`.
- `ProjectDialogs.astro`: `show(i)` y las flechas usan `galleryStep`.

- [ ] **Step 1: Write the failing test** `tests/unit/ui.test.ts`:
  - `fallbackAlreadyShown`:
    - `[]` → false;
    - `[{animationName:"other", playState:"finished", currentTime:5000}]` → false;
    - `[{animationName:"reveal-fallback", playState:"finished", currentTime:2400}]` → true;
    - `[{animationName:"reveal-fallback", playState:"running", currentTime:2100}]` → true;
    - `[{animationName:"reveal-fallback", playState:"running", currentTime:500}]` → false;
    - `currentTime:null` y `running` → false.
  - `shouldCloseCvMenu`:
    - `(true, false)` → false (el foco sigue dentro);
    - `(false, true)` → true (Tab fuera con el puntero encima);
    - `(null, true)` → false (clic en Safari);
    - `(null, false)` → true.
  - `galleryStep`:
    - `(0, 1, 3)` → 1;
    - `(2, 1, 3)` → 0;
    - `(0, -1, 3)` → 2;
    - `(0, 1, 1)` → 0;
    - `(0, -1, 0)` → 0.
- [ ] **Step 2:** `node --experimental-strip-types --no-warnings --test tests/unit/ui.test.ts` → FAIL `ERR_MODULE_NOT_FOUND`.
- [ ] **Step 3: Implement** `ui.ts` y conectarlo en los tres componentes según Interfaces. Los checks de texto 19, 21 y 23 que dependían de la forma inline se ajustan para exigir el import de `ui.ts`; queda registrado como ruling.
- [ ] **Step 4:** Unit + build + checks → PASS.
- [ ] **Step 5:** Commit `refactor: UI decisions as pure functions with behavioral unit tests`.
