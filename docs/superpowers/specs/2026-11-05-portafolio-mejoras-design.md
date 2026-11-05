# Portafolio: rediseño de Proyectos + mejoras visuales y de rendimiento en todo el sitio

## Contexto
Los proyectos no se ven con impacto: hay tres tarjetas iguales, mucho ruido de etiquetas, una portada vacía en Spendly y filtros que no aportan. Además, el análisis completo del sitio (Astro 6 + Tailwind 3) encontró errores visuales, bugs de HTML/JS, peso innecesario y problemas de SEO y caché. El objetivo es que la sección de Proyectos sea lo más fuerte del sitio (opción **B: casos de estudio en filas**, elegida por el usuario) y dejar el resto limpio, rápido y consistente.

Decisiones del usuario:
- Proyectos con layout B.
- Usar los datos disponibles hoy. Los campos que falten quedan como pendientes para que el usuario los complete a mano.
- Borrar los archivos que no se usan.
- Agregar una fuente propia para los títulos.
- Ordenar la experiencia con lo más reciente primero.

---

## 1. Sección Proyectos (prioridad)
Archivos: `src/components/Sections/Projects.astro` y `src/components/ProjectsBadge.astro`. El segundo se reescribe como fila de caso de estudio y puede renombrarse a `ProjectCase.astro`.

- **Datos.** Mover el array de proyectos a `src/data/projects.ts` con un tipo explícito: `name`, `categoryKey`, `pitchKey` (frase corta), `descriptionKey` (texto largo para el modal), `facts: {labelKey, value?}[]`, `stack` (3 o 4 tecnologías principales), `stackFull`, `images`, `urlDemo`, `urlDemoLabel` (dominio que se muestra en el marco), `urlGit?` y `featured?`.
  - Los `facts` sin `value` se renderizan solo en desarrollo (`import.meta.env.DEV`) como "pendiente" y se omiten en producción. Agregar un comentario `// TODO: completar` en cada uno.
  - Datos que ya existen: Tograbao (líder de proyecto, equipo de 3, Next.js/Strapi), Spendly (parseo automático de correos bancarios) y El Pensum (infraestructura VPS/DNS/SSL, modelado jerárquico).
- **Layout B.** Cada proyecto es una fila a todo el ancho: una captura grande en un marco de navegador (barra con 3 puntos y el dominio) y la información al lado. La imagen alterna de lado en cada fila. La primera fila (`featured`) va un poco más grande. En móvil queda en una sola columna con la imagen arriba.
  - Información: categoría (mono, en mayúsculas), nombre grande, frase corta, 2 o 3 facts con borde de acento, chips del stack corto, y los CTA "Ver en vivo" (primario) y "Código" o "Detalles" (secundario).
- **Quitar** los filtros por categoría, el botón "Ver más" y el `<style>` inyectado por JS en `Projects.astro`.
- **Modales.**
  - Unificar en un único `<dialog>` de imágenes y un único `<dialog>` de detalle para toda la sección (hoy son 2 por tarjeta), alimentados con `data-*` o un JSON embebido.
  - Las imágenes del carrusel y del modal se generan optimizadas en el build con `getImage()` de `astro:assets` (webp, unos 1600px de ancho) y se pasan como URLs. Ya no se usan los PNG originales de `/public`.
  - Soltar el listener global de Escape: `<dialog>` ya lo maneja de forma nativa.
  - Inicializar sin `setTimeout(100)`.
- **i18n.** Pasar a claves de traducción los textos fijos de los modales ("Cerrar", "Ver imágenes", "Ver Demo en vivo", "Stack", "Leer más"). Agregar las claves nuevas (`pitch`, etiquetas de facts) en `src/i18n/translations.ts` para ES y EN.
- **Enlaces.** Corregir `urlDemo: "Tograbao.com"` a `https://tograbao.com`. Dejar un TODO en el `urlGit` de Spendly, que hoy apunta al perfil y no al repo.
- **Imágenes.**
  - Las capturas de proyectos pasan de `public/` a `src/assets/projects/` para que Astro las optimice. Eso elimina el `import.meta.glob("/public/**")` de `OptimizedImage.astro`.
  - La primera captura usa `loading="eager"`.
  - Agregar `sizes` responsivos y `widths`.
- **Spendly.** La captura actual se ve vacía. La reemplaza el usuario (se deja anotado). No se bloquea el trabajo por esto.

## 2. Bugs visuales y de HTML
- `src/layouts/Layout.astro` + `src/pages/index.astro`: hay un `<main>` dentro de otro `<main>`. Dejar uno solo, y que Header y Footer queden fuera de `main`.
- `src/components/ExperienceTimeline.astro`: en la versión móvil, el `<div class={alignmentClassesMobile}>` nunca se cierra.
- `src/components/Sections/Experience.astro`:
  - Ordenar con los trabajos actuales primero, por fecha de inicio descendente: IKEA (jun. 2025), Freelance (mar. 2024) y después El Pensum (nov. 2025 – feb. 2026, ya terminado).
  - Corregir la errata "Infraestructure".
- `src/components/Sections/Hero.astro`:
  - El texto por defecto es "Hello, I'm" con la página en español.
  - Dice "+1 año", mientras Layout dice "+3 años" y el manifest "+2 años". Unificar en **"+3 años"**, que es el valor de `translations.ts` (`hero.experience`) y el que ya se muestra tras cargar el JS.
  - Quitar los imports sin uso (`OptimizedImage`, `Highlight`).
- **Dropdown del CV (Hero).** Solo abre con hover, así que no sirve en táctil ni con teclado. Cambiarlo a botón con toggle por clic y `aria-expanded`, cierre con Escape o clic fuera, y mantener el hover en escritorio.
- `src/components/Sections/Header.astro`: `LanguageToggle` se renderiza 2 veces con `id="lang-toggle"` y `id="lang-text"` duplicados.
  - Cambiar los ids a clases.
  - Mover el JSON de traducciones (`define:vars`) a un único `<script type="application/json" id="i18n-data">` o importarlo en un script normal, que Astro deduplica.
  - Emitir un evento `langchange` al cambiar el idioma.
- **Colores fijos.** Hay hex hardcodeados (`#5eb3e4`, `#20cef0`, `rgba(...)`) en los estados activos del nav y en los modales. Usar las clases y tokens `shakespeare-*`.

## 3. Rendimiento
- **Fondo (`Layout.astro`).** 2 orbes con `blur-[100px]` animando `scale` en capa fija y 6 partículas animadas.
  - Reemplazar los orbes por un `radial-gradient` estático en el fondo, sin filtro blur.
  - Reducir las partículas a 3 o 4, animando solo `transform`/`opacity`.
  - Mantener todo dentro de `prefers-reduced-motion: no-preference`.
  - En el footer hay otro orbe con blur: mismo tratamiento.
- **Animaciones de scroll.**
  - `will-change` está permanente en todas las secciones: quitarlo.
  - Hacer `unobserve` tras animar.
  - Sacar el estado inicial `opacity:0` cuando no hay JS: aplicar la clase solo si `document.documentElement` tiene `js`, que se agrega con un script inline en el `<head>`.
  - Certificaciones, Skills y Contacto animan al cargar la página aunque estén fuera de pantalla. Usar el mismo sistema `animate-on-scroll`.
- **Hero.**
  - Hay un `setInterval` cada 300 ms que lee `localStorage` para siempre. Reemplazarlo por escuchar el evento `langchange`.
  - Respetar `prefers-reduced-motion`: mostrar el rol estático, sin máquina de escribir.
- **Certificaciones.** `CertificationsModal.astro` vuelve a renderizar las 8 tarjetas (14 en total en el DOM) solo para mostrar 2 más. Reemplazarlo por un botón "Ver todas" que despliega las 2 restantes en el mismo grid.
  - Así se eliminan el modal, la función global `window.openCertificationsModal` y el listener de Escape duplicado.
  - Ordenar por fecha.
- **Experiencia.** Los listeners de `resize` sin throttle se pueden pasar a `ResizeObserver`.

## 4. Estética global
- **Fuente para títulos.**
  - Auto-hospedada con `@fontsource-variable/<fuente>`, por ejemplo Sora o Manrope (decide quien implemente). Registrarla en `tailwind.config.mjs` como `fontFamily.display`.
  - Aplicarla a `h1` (nombre), `SectionTitle` y nombres de proyecto.
  - Precargar solo el woff2 latino.
  - El cuerpo sigue en system-ui.
- **`SectionTitle.astro`.** Añadir una variante con eyebrow (etiqueta mono pequeña en acento) para dar jerarquía, y unificar los márgenes: hoy cada sección pasa sus propios `mb-*` además de los del componente.
- **Lenguaje visual de tarjetas.** Unificar radios, bordes y fondo entre Experiencia, Certificaciones, Skills y Contacto. Hoy se mezclan `bg-slate-900/30`, `/40` y `/60`, gradientes y `rounded-xl/2xl/3xl`. Definir 1 o 2 estilos de superficie como clases en `Layout.astro` o con `@apply`.

## 5. SEO, caché y config
- `vercel.json`:
  - Los PDFs del CV e imágenes de `/public` tienen `immutable` por 1 año aunque no llevan hash: si se actualiza el CV, los visitantes ven el viejo. Dejar `immutable` solo para `/_astro/(.*)`, y para el resto de `/public` usar `max-age=86400` o `must-revalidate`.
  - La rewrite `/(.*) → /` convierte cualquier 404 en la home, lo que crea soft-404 en Google. Quitarla y agregar `src/pages/404.astro`.
  - Quitar `'unsafe-eval'` del CSP y el header obsoleto `X-XSS-Protection`.
- `public/robots.txt`:
  - `Disallow: /_astro/` impide que Google cargue el CSS y el JS. Quitarlo.
  - `Crawl-delay` no aporta nada.
- `Layout.astro` (SEO):
  - La imagen OG `linkedin2.jpg` es de 1024×1024, pero se declara de 1200×630. Corregir las medidas o crear una OG de 1200×630.
  - En `sameAs`, GitHub apunta a `daybeldiaz` cuando el usuario real es `Syo0131`.
  - El `hreflang` `?lang=en` no funciona: el idioma solo se lee de `localStorage`. Leer también `?lang=` en el arranque, o quitar ese hreflang.
  - `og:image:alt` y la descripción deben usar el mismo número de años de experiencia que el Hero.
- **Limpieza.** Borrar:
  - `src/components/Sections/AboutMe.astro`, `LearningPath.astro`, `SkillBadge.astro`, `Badge.astro` y `Highlight.astro`.
  - Sus imports en `index.astro`.
  - `public/do.svg`, `astro.svg`, `background.svg` y `yami.jpg`.

---

## Orden de ejecución sugerido (commits separados)
1. Limpieza y bugs de HTML (sección 2 + borrado).
2. Config, SEO y caché (sección 5).
3. Rendimiento global (sección 3).
4. Fuente y estética global (sección 4).
5. Rediseño de Proyectos (sección 1).

## Verificación
- `npm run build`: sin errores. Revisar en `dist/` que las capturas salgan como `.webp` en `/_astro/` y que ya no se referencien los PNG originales.
- `npm run preview` y recorrido manual en escritorio y a 390px:
  - Proyectos: filas alternadas y la primera más grande.
  - Los modales abren y cierran (clic, botón y Escape), y el carrusel avanza.
  - El cambio ES/EN traduce los textos nuevos y el rol del Hero.
  - El dropdown del CV funciona por clic y con teclado.
  - "Ver todas" en Certificaciones funciona.
  - La experiencia está en el orden nuevo.
- Lighthouse (Chrome DevTools, móvil) antes y después: comparar Performance, LCP, CLS y el peso total transferido.
- Validar el HTML de `dist/index.html` con el validador W3C: sin `main` anidado, sin ids duplicados y sin divs sin cerrar.
- Comprobar que una ruta inexistente devuelve 404 en el preview.
