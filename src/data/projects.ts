import type { ImageMetadata } from "astro";
import type { TranslationKey } from "../i18n/translations";

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
  id: "tograbao" | "spendly" | "elpensum";
  name: string;
  categoryKey: TranslationKey;
  pitchKey: TranslationKey;
  descriptionKey: TranslationKey;
  facts: ProjectFact[];
  stack: string[];
  stackFull: string[];
  images: { src: ImageMetadata; alt: string }[];
  urlDemo?: string;
  urlDemoLabel?: string;
  urlGit?: string;
  featured?: boolean;
}

// El orden del array es el orden en pantalla.
export const projects: Project[] = [
  {
    id: "tograbao",
    name: "Tograbao Real State",
    categoryKey: "projects.tograbao.category",
    pitchKey: "projects.tograbao.pitch",
    descriptionKey: "projects.tograbao.description",
    facts: [
      { labelKey: "projects.fact.role", valueKey: "projects.tograbao.fact.role" },
      { labelKey: "projects.fact.team", valueKey: "projects.tograbao.fact.team" },
      { labelKey: "projects.fact.result" }, // TODO: completar
    ],
    stack: ["Next.js", "Strapi", "Docker", "Dokploy"],
    stackFull: ["Strapi", "Dokploy", "Next.js", "Tailwind CSS", "Docker", "Swagger"],
    images: [
      { src: tograbaoHero, alt: "Tograbao Real State: portada" },
      { src: tograbaoAbout, alt: "Tograbao Real State: sección Nosotros" },
      { src: tograbaoProperties, alt: "Tograbao Real State: listado de propiedades" },
    ],
    urlDemo: "https://tograbao.com",
    urlDemoLabel: "tograbao.com",
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
      { labelKey: "projects.fact.role" }, // TODO: completar
      { labelKey: "projects.fact.result" }, // TODO: completar
    ],
    stack: ["Spring Boot", "Angular", "PostgreSQL", "Docker"],
    stackFull: [
      "Java", "Spring Boot", "PostgreSQL", "Angular", "Dokploy",
      "Docker", "Swagger", "Spring Security", "Spring Data JPA",
    ],
    // TODO: reemplazar Spendly.png por una captura con datos de ejemplo (la actual se ve vacía)
    images: [
      { src: spendlyHome, alt: "Spendly: panel principal" },
      { src: spendlyEndpoints, alt: "Spendly: endpoints de la API" },
      { src: spendlySidebar, alt: "Spendly: menú lateral" },
    ],
    urlDemo: "https://frontend.daybeldiaz.dev/",
    urlDemoLabel: "frontend.daybeldiaz.dev",
    urlGit: "https://github.com/Syo0131", // TODO: enlazar al repositorio
  },
  {
    id: "elpensum",
    name: "El Pensum API",
    categoryKey: "projects.elpensum.category",
    pitchKey: "projects.elpensum.pitch",
    descriptionKey: "projects.elpensum.description",
    facts: [
      { labelKey: "projects.fact.role", valueKey: "projects.elpensum.fact.role" },
      { labelKey: "projects.fact.infra", valueKey: "projects.elpensum.fact.infra" },
      { labelKey: "projects.fact.result" }, // TODO: completar
    ],
    stack: ["Spring Boot", "Spring Security", "PostgreSQL", "Docker"],
    stackFull: [
      "Spring Boot", "Spring Security", "PostgreSQL",
      "Dokploy", "Docker", "Swagger", "Spring Data JPA",
    ],
    images: [
      { src: pensumWeb, alt: "El Pensum: sitio web" },
      { src: pensumApi, alt: "El Pensum: API" },
      { src: pensumEndpoints, alt: "El Pensum: endpoints de la API" },
    ],
    urlDemo: "https://backend.elpensum.com/swagger-ui/index.html",
    urlDemoLabel: "backend.elpensum.com",
  },
];
