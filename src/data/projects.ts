import type { ImageMetadata } from "astro";
import type { TranslationKey } from "../i18n/translations";

import cifmecPlaceholder from "../assets/projects/cifmec/placeholder.png";
import galanPlaceholder from "../assets/projects/galansorteos/placeholder.png";
import tograbaoHero from "../assets/projects/tograbao/hero.png";
import tograbaoAbout from "../assets/projects/tograbao/aboutus.png";
import tograbaoProperties from "../assets/projects/tograbao/properties.png";
import spendlyHome from "../assets/projects/spendly/Spendly.png";
import spendlyEndpoints from "../assets/projects/spendly/EndpointsSpendly.png";
import spendlySidebar from "../assets/projects/spendly/SpendlySideBar.png";
import pensumWeb from "../assets/projects/elpensum/pensumweb.png";
import pensumApi from "../assets/projects/elpensum/elpensumAPI.png";
import pensumEndpoints from "../assets/projects/elpensum/EndpointsPensum.png";

/** Un dato clave del proyecto. Sin `valueKey` = pendiente: sólo se muestra en desarrollo. */
export interface ProjectFact {
  labelKey: TranslationKey;
  valueKey?: TranslationKey;
}

export interface Project {
  id: "cifmec" | "spendly" | "tograbao" | "elpensum" | "galansorteos";
  name: string;
  categoryKey: TranslationKey;
  pitchKey: TranslationKey;
  descriptionKey: TranslationKey;
  facts: ProjectFact[];
  stack: string[];
  stackFull: string[];
  images: { src: ImageMetadata; altKey: TranslationKey }[];
  urlDemo?: string;
  urlDemoLabel?: string;
  urlGit?: string;
  /** Va en las filas grandes. Máximo 3 (ver src/lib/projectLayout.ts); los que sobran bajan a tarjetas. */
  featured?: boolean;
  /** La imagen es temporal. Se marca en desarrollo y se avisa en el build. */
  placeholder?: boolean;
}

// El orden del array es el orden en pantalla.
// Para agregar un proyecto: añádelo aquí, pon sus textos en translations.ts (es y en) y sus imágenes
// en src/assets/projects/<id>/. Sin captura todavía: `node scripts/make-placeholder.mjs <ruta.png> "<Nombre>"`.
export const projects: Project[] = [
  {
    id: "cifmec",
    name: "CIFMEC",
    categoryKey: "projects.cifmec.category",
    pitchKey: "projects.cifmec.pitch",
    descriptionKey: "projects.cifmec.description",
    facts: [
      { labelKey: "projects.fact.role", valueKey: "projects.cifmec.fact.role" },
      { labelKey: "projects.fact.result", valueKey: "projects.cifmec.fact.result" },
    ],
    stack: ["Next.js", "Docker", "Dokploy"],
    stackFull: ["Next.js", "Docker", "Dokploy", "VPS"],
    // TODO: captura real (reemplazar el placeholder y quitar `placeholder: true`)
    images: [{ src: cifmecPlaceholder, altKey: "projects.cifmec.img1" }],
    placeholder: true,
    urlDemo: "https://cifmec.edu.do",
    urlDemoLabel: "cifmec.edu.do",
    featured: true,
  },
  {
    id: "spendly",
    name: "Spendly",
    categoryKey: "projects.spendly.category",
    pitchKey: "projects.spendly.pitch",
    descriptionKey: "projects.spendly.description",
    facts: [
      { labelKey: "projects.fact.key", valueKey: "projects.spendly.fact.key" },
      { labelKey: "projects.fact.role", valueKey: "projects.spendly.fact.role" },
      { labelKey: "projects.fact.result", valueKey: "projects.spendly.fact.result" },
    ],
    stack: ["Spring Boot", "Angular", "PostgreSQL", "Docker"],
    stackFull: [
      "Java", "Spring Boot", "PostgreSQL", "Angular", "Dokploy",
      "Docker", "Swagger", "Spring Security", "Spring Data JPA",
    ],
    images: [
      { src: spendlyHome, altKey: "projects.spendly.img1" },
      { src: spendlyEndpoints, altKey: "projects.spendly.img2" },
      { src: spendlySidebar, altKey: "projects.spendly.img3" },
    ],
    urlDemo: "https://frontend.daybeldiaz.dev/",
    urlDemoLabel: "frontend.daybeldiaz.dev",
    featured: true,
  },
  {
    id: "tograbao",
    name: "Tograbao Real State",
    categoryKey: "projects.tograbao.category",
    pitchKey: "projects.tograbao.pitch",
    descriptionKey: "projects.tograbao.description",
    facts: [
      { labelKey: "projects.fact.role", valueKey: "projects.tograbao.fact.role" },
      { labelKey: "projects.fact.team", valueKey: "projects.tograbao.fact.team" },
      { labelKey: "projects.fact.result", valueKey: "projects.tograbao.fact.result" },
    ],
    stack: ["Next.js", "Strapi", "Docker", "Dokploy"],
    stackFull: ["Strapi", "Dokploy", "Next.js", "Tailwind CSS", "Docker", "Swagger"],
    images: [
      { src: tograbaoHero, altKey: "projects.tograbao.img1" },
      { src: tograbaoAbout, altKey: "projects.tograbao.img2" },
      { src: tograbaoProperties, altKey: "projects.tograbao.img3" },
    ],
    urlDemo: "https://tograbao.com",
    urlDemoLabel: "tograbao.com",
    featured: true,
  },
  {
    id: "elpensum",
    name: "El Pensum API",
    categoryKey: "projects.elpensum.category",
    pitchKey: "projects.elpensum.pitch",
    descriptionKey: "projects.elpensum.description",
    facts: [
      { labelKey: "projects.fact.role", valueKey: "projects.elpensum.fact.role" },
      { labelKey: "projects.fact.team", valueKey: "projects.elpensum.fact.team" },
      { labelKey: "projects.fact.goal", valueKey: "projects.elpensum.fact.goal" },
    ],
    stack: ["Spring Boot", "Spring Security", "PostgreSQL", "Docker", "Dokploy", "Swagger"],
    stackFull: [
      "Spring Boot", "Spring Security", "PostgreSQL",
      "Dokploy", "Docker", "Swagger", "Spring Data JPA",
    ],
    images: [
      { src: pensumWeb, altKey: "projects.elpensum.img1" },
      { src: pensumApi, altKey: "projects.elpensum.img2" },
      { src: pensumEndpoints, altKey: "projects.elpensum.img3" },
    ],
    urlDemo: "https://backend.elpensum.com/swagger-ui/index.html",
    urlDemoLabel: "backend.elpensum.com",
  },
  {
    id: "galansorteos",
    name: "Galan Sorteos",
    categoryKey: "projects.galansorteos.category",
    pitchKey: "projects.galansorteos.pitch",
    descriptionKey: "projects.galansorteos.description",
    facts: [
      { labelKey: "projects.fact.role", valueKey: "projects.galansorteos.fact.role" },
      { labelKey: "projects.fact.key", valueKey: "projects.galansorteos.fact.key" },
    ],
    stack: ["Next.js", "Payload CMS", "PostgreSQL"],
    stackFull: ["Next.js", "Payload CMS", "PostgreSQL", "Docker", "Dokploy", "VPS"],
    // TODO: captura real (reemplazar el placeholder y quitar `placeholder: true`)
    images: [{ src: galanPlaceholder, altKey: "projects.galansorteos.img1" }],
    placeholder: true,
    urlDemo: "https://galansorteos.com",
    urlDemoLabel: "galansorteos.com",
  },
];
