# Daybel Diaz · Portafolio

Sitio personal de [daybeldiaz.dev](https://daybeldiaz.dev): experiencia, proyectos, certificaciones y contacto, en español e inglés.

Hecho con **Astro 6**, **Tailwind CSS 3** y `astro:assets` para las imágenes. Se despliega en **Vercel**.

## Comandos

| Comando | Qué hace |
|---|---|
| `npm install` | Instala dependencias |
| `npm run dev` | Servidor local en `localhost:4321` |
| `npm run build` | Genera el sitio estático en `dist/` |
| `npm run preview` | Sirve `dist/` para revisarlo antes de publicar |
| `npm run build && bash tests/dist/run.sh` | Comprobaciones del build + tests unitarios |

## Estructura

```
src/
  components/      Secciones y componentes (ProjectCase, ProjectCard, ProjectDialogs, …)
  data/projects.ts Datos de los proyectos (orden = orden en pantalla)
  i18n/            Traducciones (translations.ts) y cambio de idioma en el cliente
  lib/             Lógica pura testeable (reparto de proyectos, decisiones de UI)
  pages/           index, /proyectos y 404
tests/
  dist/            Comprobaciones sobre el build (bash + python)
  unit/            Tests unitarios (node:test)
scripts/           Utilidades (imagen temporal de proyecto)
```

## Agregar un proyecto

1. Añádelo en `src/data/projects.ts`. Con `featured: true` va en las filas grandes (máximo 3); el resto va en "Más proyectos" y, a partir de 7, aparece "Ver todos los proyectos" (`/proyectos`).
2. Pon sus textos en `src/i18n/translations.ts`, en `es` **y** `en`.
3. Pon sus capturas en `src/assets/projects/<id>/`. Si aún no las tienes:
   `node scripts/make-placeholder.mjs src/assets/projects/<id>/placeholder.png "<Nombre>"` y marca `placeholder: true` (el build avisará mientras siga así).

## Idioma

El HTML se genera en español. Al cargar, el cliente aplica el idioma guardado o el de `?lang=en`, reemplazando los textos marcados con `data-i18n` (y `data-i18n-aria`, `data-i18n-alt`, `data-i18n-placeholder`).

## Contacto

El formulario usa EmailJS. Variables de entorno: `PUBLIC_EMAILJS_PUBLIC_KEY`, `PUBLIC_EMAILJS_SERVICE_ID` y `PUBLIC_EMAILJS_TEMPLATE_ID`.
