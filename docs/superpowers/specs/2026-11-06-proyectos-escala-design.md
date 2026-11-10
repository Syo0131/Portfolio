# Proyectos: datos completos y sección que escala sin scroll infinito

Fecha: 2026-11-06 · Rama base: `feature/portafolio-mejoras` (aún sin merge a `master`)
Diseño previo: `docs/superpowers/specs/2026-11-05-portafolio-mejoras-design.md`

## Por qué

1. **Datos completos.** Los datos de proyecto quedaron con `TODO` (resultados, rol de Spendly, enlace de código). El usuario ya dio la información real.
2. **Tono.** Los textos actuales se sienten rígidos y con palabras de moda ("orquesté el SDLC", "arquitectura robusta"). El usuario quiere un tono **profesional y cercano a la vez**, sin perder el foco técnico.
3. **Escala.** Hay 2 proyectos nuevos listos para entrar (CIFMEC, Galan Sorteos) y vendrán más. Hoy cada proyecto es una fila de casi una pantalla, así que con 5 o más la sección se vuelve un scroll eterno. El usuario quiere evitarlo y eligió la **opción A** de la maqueta (https://claude.ai/artifact/EASrSJnVdH62ambfj868Na).

## Objetivos
- Hasta **3 proyectos destacados** en las filas grandes actuales (`ProjectCase`).
- El resto va en un bloque **"Más proyectos"** con tarjetas compactas en cuadrícula.
- La sección tiene un **largo acotado** sin importar cuántos proyectos haya. Si se superan las tarjetas que caben, se enlaza a una página `/proyectos` con todos.
- Completar y reescribir todos los textos de los 5 proyectos en ES y EN con el tono pedido.
- Agregar CIFMEC y Galan Sorteos con **imágenes temporales**: el usuario pondrá las capturas reales después.

## No objetivos
- Actualizar la captura de Spendly. El usuario decidió dejarla como está; quitar el `TODO` de la imagen no hace falta.
- Carrusel, filtros por categoría, paginación o "cargar más". Se descartaron.
- Rediseñar las filas destacadas: el layout B ya construido se mantiene.

## Anti-objetivos (sería un fracaso aunque funcione)
- Que los textos inventen datos que el usuario no dio (métricas, cifras, funcionalidades). En CIFMEC **no hay números de rendimiento**: no poner porcentajes ni puntajes.
- Que agregar un proyecto nuevo obligue a tocar componentes. Debe bastar con editar `src/data/projects.ts`, `translations.ts` y poner las imágenes.
- Que una imagen temporal parezca definitiva, o que pueda olvidarse sin aviso.

## Restricciones
- Stack existente: Astro 6, Tailwind 3, `astro:assets`, i18n en cliente con `data-i18n` (`src/i18n/client.ts`), y el arnés de comprobaciones `tests/dist/` (`npm run build && bash tests/dist/run.sh`).
- Toda clave de texto nueva debe existir en `es` y `en`. Ya hay un check que lo valida.
- Las tarjetas reutilizan los diálogos existentes (`ProjectDialogs.astro`): galería y detalles. No se crean diálogos nuevos.
- Tailwind: clases literales, sin clases construidas dinámicamente.
- Respetar lo que el usuario edita a mano en `stack`. Por ejemplo, El Pensum ya tiene 6 tecnologías en su stack corto, y eso se queda así.

## Decisiones del usuario

### Estructura de la sección
- **Destacados**, en este orden: **CIFMEC, Spendly, Tograbao**. Se renderizan con `ProjectCase` (filas grandes alternadas). El primero lleva el tamaño de "featured" actual.
- **Más proyectos**: **El Pensum** y **Galan Sorteos**, en tarjetas compactas.
- Para elegir destacados basta con una marca en los datos (hoy existe `featured?: boolean`).

### Datos por proyecto (ES / EN)

**CIFMEC** (nuevo)
- URL: `https://cifmec.edu.do`. Etiqueta del marco: `cifmec.edu.do`. Sin enlace a código.
- Qué es: **un centro médico**, en palabras del usuario ("una web de un centro medico, que se llama cifmec"), aunque el dominio sea `.edu.do`. La descripción se apoya en eso.
- Categoría: **Frontend**. Fue decisión mía porque no tiene backend propio; el usuario no objetó.
- Stack corto: Next.js, Docker, Dokploy. Stack completo: Next.js, Docker, Dokploy, VPS.
- Rol: "Diseño, desarrollo y despliegue, de principio a fin" / "Design, development and deployment, end to end"
- Resultado: "Reemplazó un sitio en WordPress por uno rediseñado y mucho más rápido" / "Replaced a WordPress site with a redesigned, much faster one"
- Frase corta: "Rediseño y migración del sitio de CIFMEC de WordPress a Next.js, con un salto enorme en rendimiento y una imagen más moderna." / "Redesign and migration of CIFMEC's site from WordPress to Next.js, with a huge jump in performance and a more modern look."
- Descripción larga (redactada por mí con el mismo tono; sin cifras): "Sitio web para CIFMEC, un centro médico que dependía de un WordPress lento y con un diseño desactualizado. Lo rediseñé desde cero y lo reconstruí con Next.js, priorizando la velocidad de carga y una navegación clara. También me encargué del despliegue en un VPS con Docker y Dokploy." / "Website for CIFMEC, a medical center that relied on a slow WordPress site with an outdated design. I redesigned it from scratch and rebuilt it with Next.js, focusing on load speed and clear navigation. I also handled deployment on a VPS with Docker and Dokploy."

**Spendly**
- Quitar `urlGit`: el repositorio es privado y no se muestra el botón "Código".
- Datos: Clave: "Registro automático desde correos del banco" (ya existe) · Rol: "Desarrollo full-stack, de principio a fin" / "Solo full-stack developer, end to end" · Resultado: "15–20 personas lo usan para llevar sus finanzas sin registrar gastos a mano" / "Used by 15–20 people to track their finances without manual entry"
- Frase corta: "Nació como proyecto personal para aprender Spring Boot y hoy registra los gastos de sus usuarios de forma automática, leyendo las notificaciones del banco." / "Started as a personal project to learn Spring Boot; today it logs users' expenses automatically from their bank notifications."
- Descripción larga: "Aplicación full-stack de finanzas personales con backend en Java y Spring Boot (Spring Security, Spring Data JPA y PostgreSQL) y frontend en Angular. Su pieza central es un proceso que interpreta las notificaciones de transacciones que llegan por correo y registra cada gasto automáticamente, así nadie tiene que anotar nada al final del día. La API está documentada con Swagger y corre en Docker sobre Dokploy." / "Full-stack personal finance app with a Java and Spring Boot backend (Spring Security, Spring Data JPA and PostgreSQL) and an Angular frontend. At its core is a process that reads the transaction notifications arriving by email and logs each expense automatically, so nobody has to enter anything at the end of the day. The API is documented with Swagger and runs on Docker with Dokploy."
- La imagen se queda como está.

**Tograbao Real State**
- Datos: Rol: "Líder de proyecto" (ya existe) · Equipo: "3 personas" (ya existe) · Resultado: "Pasó de depender de redes sociales a tener su propio catálogo de propiedades en línea." / "Went from relying on social media to running its own online property catalog."
- Frase corta: "Plataforma inmobiliaria para explorar terrenos y propiedades en un solo lugar. Lideré a un equipo de 3 personas, desde la idea hasta producción." / "A real estate platform to browse land and properties in one place. I led a team of 3, from idea to production."
- Descripción larga: "Plataforma inmobiliaria con frontend en Next.js y Strapi como CMS headless, para que el cliente publique y actualice propiedades sin tocar código. Le dimos prioridad al SEO y a la velocidad de carga, de modo que cada terreno o casa se encuentre fácil en buscadores. Como líder de proyecto coordiné a un equipo de 3 personas con metodología ágil, desde la planificación hasta el despliegue en contenedores Docker gestionados con Dokploy." / "Real estate platform built with a Next.js frontend and Strapi as a headless CMS, so the client can publish and update listings without touching code. We prioritized SEO and load speed so every property is easy to find on search engines. As project lead, I coordinated a team of 3 using agile practices, from planning to deployment in Docker containers managed with Dokploy."

**El Pensum API**
- Datos: Rol: "Backend e infraestructura" (ya existe) · Equipo: "4 personas" / "4 people" (reemplaza al dato "Infraestructura") · Objetivo: "Centralizar los pensums de universidades e institutos de RD para compararlos en un solo lugar" / "Centralize curricula from Dominican universities and institutes so they can be compared in one place". La etiqueta **"Objetivo" / "Goal"** reemplaza a "Resultado" porque el usuario ya no está en el proyecto.
- Frase corta: "API central de una plataforma para comparar pensums de universidades dominicanas y orientar a estudiantes con un test vocacional. Me encargué del backend y la infraestructura." / "Core API for a platform that compares curricula across Dominican universities and guides students with a career test. I owned the backend and infrastructure."
- Descripción larga: "API REST en Java y Spring Boot que modela la estructura académica de RD (universidades, recintos, facultades, carreras y pensums) con todas sus relaciones jerárquicas. Me encargué de la seguridad con Spring Security, la persistencia con Spring Data JPA y PostgreSQL, y la documentación con Swagger. También monté la infraestructura: servidor VPS, DNS, certificados SSL y despliegue en contenedores con Docker y Dokploy." / "REST API in Java and Spring Boot that models the Dominican academic structure (universities, campuses, schools, degrees and curricula) with all their hierarchical relationships. I handled security with Spring Security, persistence with Spring Data JPA and PostgreSQL, and documentation with Swagger. I also set up the infrastructure: VPS server, DNS, SSL certificates and containerized deployment with Docker and Dokploy."
- Stack corto: el que el usuario dejó, Spring Boot, Spring Security, PostgreSQL, Docker, Dokploy, Swagger.

**Galan Sorteos** (nuevo)
- URL: `https://galansorteos.com`. Etiqueta: `galansorteos.com`. Sin enlace a código. Lo hizo solo.
- Categoría: Full-Stack. Stack corto: Next.js, Payload CMS, PostgreSQL. Stack completo: Next.js, Payload CMS, PostgreSQL, Docker, Dokploy, VPS.
- Frase corta: "Plataforma de rifas donde los participantes reservan boletos subiendo su comprobante de transferencia." / "Raffle platform where participants reserve tickets by uploading their bank transfer receipt."
- Descripción larga: "Plataforma de rifas construida con Next.js y Payload CMS sobre PostgreSQL. Al subir el comprobante de transferencia, los boletos quedan reservados; un administrador valida el pago desde el panel de Payload y, si lo aprueba, los boletos se asignan al participante, y si lo rechaza vuelven a estar disponibles. La desarrollé de principio a fin y la desplegué en un VPS con Docker y Dokploy." / "Raffle platform built with Next.js and Payload CMS on PostgreSQL. When a participant uploads their transfer receipt, the tickets are reserved; an admin validates the payment from the Payload panel and either assigns the tickets or releases them back if it's rejected. I built it end to end and deployed it on a VPS with Docker and Dokploy."
- Datos (no los dio en forma de "facts"; los derivo de lo que contó, y van en el diálogo de detalles): Rol: "Desarrollo full-stack, de principio a fin" (reutiliza el texto de Spendly) · Clave: "Validación de pagos con reserva y liberación de boletos" / "Payment validation with ticket reserve and release".

### Tono
Profesional y cercano a la vez, en primera persona, frases directas, sin palabras de moda. Mantener nombres de tecnologías y detalles técnicos reales.

## Decisiones mías (el usuario puede cambiarlas)
- **Tope de destacados: 3.** Si se marcan más, los que sobran (según el orden del array) bajan a tarjetas.
- **"Más proyectos" muestra hasta 6 tarjetas.** Si hay más de 6 no destacados, se ven los primeros 5 y la sexta posición es una tarjeta "Ver todos los proyectos →" que enlaza a `/proyectos`.
- **La página `/proyectos` se construye ya,** aunque hoy no se enlace (con 2 no destacados no aparece la tarjeta). Así, cuando se agregue el proyecto número 10, no habrá un enlace a una página inexistente. Usa `Layout`, el mismo `SectionTitle`, muestra **todos** los proyectos como tarjetas compactas (destacados primero), los mismos diálogos y un enlace para volver a `/#proyectos`. Debe entrar en el sitemap.
- **Tarjeta compacta:** captura 16:9 que abre la galería, categoría, nombre, frase corta, chips con el `stack` completo tal como esté en los datos, y botones "Ver en vivo" (si hay URL) y "Detalles". Cuadrícula de 3 columnas en escritorio, 2 en tablet y 1 en móvil.
- **El diálogo de detalles muestra los datos clave** (facts), porque en las tarjetas compactas no se ven y si no se perderían.
- **Imágenes temporales:** un placeholder genérico por proyecto nuevo, oscuro, con el nombre del proyecto y el texto "Captura próximamente", y la marca `placeholder: true` en el proyecto. En desarrollo debe notarse que es temporal; en producción se ve digno y no roto. Se agrega un `// TODO: captura real` en los datos. Cómo se genera el placeholder (SVG en `src/assets`, imagen compartida, etc.) queda en manos de quien implemente, siempre que funcione con la galería y con `astro:assets`.
- **`/proyectos` usa el mismo Header y Footer que la home.** Los enlaces del menú (sidebar y móvil) y del footer pasan de `#seccion` a `/#seccion`: en la home siguen siendo saltos dentro de la página, sin recargar, y desde `/proyectos` llevan a la sección correcta de la home. Con eso, `/proyectos` también tiene el selector de idioma y aplica `getLang()` al cargar (`?lang=en` o el idioma guardado), igual que la home. El resaltado de sección activa simplemente no marca nada en `/proyectos`.
- **CIFMEC va primero aunque tenga imagen temporal** (decisión del usuario): pondrá la captura real antes del PR a la rama de producción.
- **Aviso de imagen temporal: no bloquea el build.** Se hacen tres cosas: el `// TODO: captura real` en los datos, una etiqueta visible "Imagen temporal" solo en desarrollo (`import.meta.env.DEV`) y un `console.warn` durante el build que lista los proyectos con `placeholder: true`. Las comprobaciones de `tests/dist/` no fallan por esto.
- **CIFMEC sin dato de "Equipo"**: muestra 2 facts (Rol y Resultado).

## Qué queda a criterio de quien implemente
- Nombre y archivo del componente de tarjeta compacta, por ejemplo `ProjectCard.astro`.
- Cómo se separan destacados y no destacados (helper en `projects.ts` o en la sección).
- Detalles visuales de la tarjeta, dentro del lenguaje actual (`.surface`, `font-display`, acento cian).
- Claves de traducción nuevas (`projects.more`, `projects.viewAll`, `projects.fact.goal`, etc.).
- Comprobaciones nuevas en `tests/dist/`, como mínimo:
  - Cantidad de filas destacadas.
  - Cantidad de tarjetas.
  - Que no aparezca `Pendiente`.
  - Que Spendly no tenga enlace de código.
  - Que exista `dist/proyectos/index.html`.
  - Que la regla del tope funcione con datos de prueba, o mediante una función pura testeable.

## Verificación esperada
- `npm run build && bash tests/dist/run.sh` en verde.
- Manual (`npm run preview`):
  - La sección muestra 3 filas y 2 tarjetas.
  - Las tarjetas abren la galería y los detalles correctos, que incluyen los datos clave.
  - Al cambiar a EN se traducen todos los textos nuevos.
  - `/proyectos` carga con las 5 tarjetas y sus diálogos.
  - A 390px no hay scroll horizontal.
