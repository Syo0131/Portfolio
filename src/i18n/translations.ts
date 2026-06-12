export const languages = {
  es: "Español",
  en: "English",
};

export const defaultLang = "es"

export const translations = {
  es: {
    // Navigation
    "nav.home": "Inicio",
    "nav.experience": "Experiencia Laboral",
    "nav.projects": "Proyectos",
    "nav.skills": "Habilidades",
    "nav.aboutme": "Sobre mí",
    "nav.contact": "Contacto",
    "nav.certifications": "Certificaciones",

    // Hero
    "hero.greeting": "Hey, Soy",
    "hero.experience": "+3 años de experiencia",
    "hero.role": " Ingeniero de software",
    "hero.location": "de República Dominicana",
    "hero.description":
      "Especializado en backend Java/Spring Boot e infraestructura cloud. Diseño APIs robustas, automatizo despliegues con Docker y construyo sistemas escalables de extremo a extremo.",
    "hero.downloadCv": "Descargar CV",

    // ! Experience Laboral
    "experience.title": "Experiencia Laboral",
    "experience.freelance.position": "Product Manager & FullStack Developer",
    "experience.freelance.company": "Freelance",
    "experience.freelance.period": "Marzo 2024 - Presente",
    "experience.freelance.type": "Freelance",
    "experience.freelance.desc1":
      "Gestión end-to-end de proyectos de software: levantamiento de requerimientos con el cliente, definición de la arquitectura técnica, documentación y coordinación del equipo de desarrollo cuando el proyecto lo requiere.",
    "experience.freelance.desc2":
      "Responsable del ciclo completo de entrega: desde la toma de decisiones tecnológicas hasta el despliegue en producción, asegurando que la solución final se alinee con los objetivos del negocio.",
    "experience.java.position": "Java Analyst Developer",
    "experience.java.company": "BitBox Caribe SRL",
    "experience.java.period": "Junio 2025 - Presente",
    "experience.java.type": "Jornada completa",
    "experience.java.desc1":
      "Desarrollo y mantenimiento de módulos Java para la gestión de usuarios y tarjetas de fidelidad.",
    "experience.java.desc2":
      "Implementación de funcionalidades para el procesamiento de facturas electrónicas y conciliación de transacciones.",
    "experience.pensum.position": "BackEnd & Infraestructure engineer",
    "experience.pensum.company": "El Pensum",
    "experience.pensum.period": "Noviembre 2025 - Febrero 2026",
    "experience.pensum.type": "Contrato de formación",
    "experience.pensum.desc1":
      "Diseño y gestión de la infraestructura cloud: configuración de servidores VPS, DNS, seguridad SSL y pipelines de despliegue automatizado con Docker y Dokploy.",
    "experience.pensum.desc2":
      "Desarrollo del backend completo con Java Spring Boot y Spring Security, modelando una arquitectura jerárquica para la gestión de universidades, recintos, facultades, carreras y pensums.",
    "experience.founder.position": "Founder & Product Manager",
    "experience.founder.period": "Junio 2025 - Presente",
    "experience.founder.desc1": "Dirección integral en el desarrollo de software a medida para clientes, desde la toma de requerimientos hasta el despliegue final.",
    "experience.founder.desc2": "Gestión de proyectos tecnológicos, alineando los objetivos de negocio con la arquitectura y coordinando equipos de desarrollo.",

    // Projects

    // * Spendly
    "projects.title": "Proyectos",
    "projects.spendly.name": "Spendly",
    "projects.spendly.description":
      "Aplicación web full-stack para el control inteligente de finanzas personales. Desarrollada con Spring Boot y Angular, cuenta con un sistema automatizado que parsea y registra los gastos directamente a partir de las notificaciones de transacciones recibidas por correo electrónico, garantizando un control en tiempo real.",
    "projects.spendly.category": "Full-Stack",

    // // * Citadel Logs
    // "projects.citadelLogs.name": "Citadel Logs",
    // "projects.citadelLogs.description":
    //   "Aplicación web desarrollada con React y Node.js para la visualización y gestión de logs en tiempo real, ofreciendo una interfaz intuitiva para monitorear eventos del sistema.",
    // "projects.citadelLogs.category": "Full-Stack",

    "projects.elpensum.name": "El Pensum API",
    "projects.elpensum.description":
      "Diseño y despliegue de la infraestructura cloud utilizando Docker y Dokploy, incluyendo configuración de servidores VPS, DNS y seguridad SSL. Desarrollo de una API REST robusta y segura con Java Spring Boot, Spring Security y PostgreSQL, diseñada para el modelado jerárquico complejo de entidades académicas (universidades, recintos, facultades, carreras y pensums).",
    "projects.elpensum.category": "Backend",

    // * Tograbao Real State
    "projects.tograbao.name": "Tograbao Real State",
    "projects.tograbao.description":
      "Plataforma inmobiliaria de alto rendimiento optimizada para SEO y velocidad de carga. Como líder de proyecto, orquesté el ciclo de vida completo del software (SDLC) coordinando a un equipo de 3 personas bajo metodologías ágiles. Implementé una arquitectura robusta utilizando Next.js para un frontend ultrarrápido, Strapi como Headless CMS para la gestión ágil de propiedades, y despliegue contenedorizado con Docker y Dokploy.",
    "projects.tograbao.category": "Full-Stack",

    // * Filters & Pagination
    "projects.filter.all": "Todos",
    "projects.category.fullstack": "Full-Stack",
    "projects.category.backend": "Backend",
    "projects.category.frontend": "Frontend",
    "projects.showMore": "Ver más proyectos",
    "projects.showLess": "Ver menos",
    "projects.readMore": "Leer más",
    "projects.readLess": "Leer menos",

    // Skills
    "skills.title": "Habilidades Técnicas",
    "skills.frontend": "Frontend",
    "skills.backend": "Backend",
    "skills.tools": "Tools",

    // Certifications
    "certifications.title": "Certificaciones",
    "certifications.viewCert": "Ver Certificación",
    "certifications.inProgress": "En curso",
    "certifications.completed": "Completado",
    "certifications.comingSoon": "Próximamente",
    "certifications.showMore": "Ver más certificaciones",
    "certifications.showLess": "Ver menos",
    "certifications.close": "Cerrar",
    "certifications.spring.title":
      "Spring Framework 6 & Spring Boot 3 desde cero a experto",
    "certifications.spring.date": "Octubre 2025",
    "certifications.java.title":
    "Java avanzado: reactividad, concurrencia y patrones",
    "certifications.java.date": "Cursando",
    "certifications.fullstack.title": "Desarrollo Web Full Stack - Nivel Intermedio",
    "certifications.fullstack.date": "Enero 2026",
    "certifications.springframework.title": "Spring Boot with Spring Framework",
    "certifications.springframework.date": "Enero 2026",
    "certifications.python.title":
      "Python para principiantes - Aprende desde cero",
    "certifications.python.date": "Mayo 2024",
    "certifications.csharp.title": "Introducción a la programación con C#",
    "certifications.csharp.date": "Diciembre 2025",
    "certifications.solid.title": "Principios SOLID y Clean Code",
    "certifications.solid.date": "Enero 2026",
    "certifications.sql.title": "Introducción a SQL",
    "certifications.sql.date": "Febrero 2026",
    "certifications.enterprise.title": "Enterprise full stack with Spring Boot 4 and Angular 21",
    "certifications.enterprise.date": "Marzo 2026",

    // Learning Path
    "learning.title": "Ruta de Aprendizaje",
    "learning.subtitle": "Mi enfoque actual",

    // Contact
    "contact.title": "¿Tienes algún proyecto en mente?",
    "contact.subtitle": "Completa el formulario y te responderé lo antes posible.",
    "contact.name": "Nombre",
    "contact.namePlaceholder": "Tu nombre completo",
    "contact.email": "Email",
    "contact.emailPlaceholder": "tu@email.com",
    "contact.message": "Mensaje",
    "contact.messagePlaceholder": "Cuéntame sobre tu proyecto o idea...",
    "contact.send": "Enviar mensaje",

    // Footer
    "footer.cta": "¿Listo para crear algo increíble juntos?",
    "footer.talk": "Hablemos",
    "footer.role": "Desarrollador Java • República Dominicana",
    "footer.available": "Disponible para nuevos proyectos",
    "footer.credit": "Diseñado y desarrollado con",
    "footer.using": "usando Astro & Tailwind CSS",
  },
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.experience": "Experiences",
    "nav.projects": "Projects",
    "nav.skills": "Skills",
    "nav.aboutme": "About me",
    "nav.contact": "Contact",
    "nav.certifications": "Certifications",

    // Hero
    "hero.greeting": "Hey, I'm",
    "hero.experience": "+3 years of experience",
    "hero.role": "Sotftware Engineer",
    "hero.location": "from Dominican Republic",
    "hero.description":
      "Specialized in Java/Spring Boot backend and cloud infrastructure. I design robust APIs, automate deployments with Docker, and build scalable end-to-end systems.",
    "hero.downloadCv": "Download CV",

    // Experience
    "experience.title": "Experiences",
    "experience.freelance.position": "Product Manager & FullStack Developer",
    "experience.freelance.company": "Freelance",
    "experience.freelance.period": "March 2024 - Present",
    "experience.freelance.type": "Freelance",
    "experience.freelance.desc1":
      "End-to-end software project management: requirements gathering with the client, technical architecture definition, documentation, and development team coordination when the project demands it.",
    "experience.freelance.desc2":
      "Responsible for the complete delivery cycle: from technology decisions to production deployment, ensuring the final solution aligns with the business objectives.",
    "experience.java.position": "Java Analyst Developer",
    "experience.java.company": "BitBox Caribe SRL",
    "experience.java.period": "June 2025 - Present",
    "experience.java.type": "Full-time",
    "experience.java.desc1":
      "Development and maintenance of Java modules for user management and loyalty cards.",
    "experience.java.desc2":
      "Implementation of functionalities for electronic invoice processing and transaction reconciliation.",
    "experience.pensum.position": "BackEnd & Infrastructure Engineer",
    "experience.pensum.company": "El Pensum",
    "experience.pensum.period": "November 2025 - February 2026",
    "experience.pensum.type": "Training contract",
    "experience.pensum.desc1":
      "Design and management of the project's cloud infrastructure: VPS server configuration, DNS, SSL security, and automated deployment pipelines with Docker and Dokploy.",
    "experience.pensum.desc2":
      "Full backend development with Java Spring Boot and Spring Security, modeling a complex hierarchical architecture for managing universities, campuses, faculties, careers, and curricula.",
    "experience.founder.position": "Founder & Product Manager",
    "experience.founder.period": "June 2025 - Present",
    "experience.founder.desc1": "End-to-end direction of custom software development for clients, from requirements gathering to final deployment.",
    "experience.founder.desc2": "Management of technology projects, aligning business goals with architecture and coordinating development teams.",

    // Projects

    "projects.title": "Projects",
    "projects.spendly.name": "Spendly",
    "projects.spendly.description":
      "Full-stack web application for smart personal finance tracking. Built with Spring Boot and Angular, it features an automated system that parses and logs expenses directly from bank transaction emails, ensuring real-time control over budgets.",
    "projects.spendly.category": "Full-Stack",
    "projects.elpensum.name": "El Pensum API",
    "projects.elpensum.description":
      "Design and deployment of the cloud infrastructure using Docker and Dokploy, including VPS server, DNS, and SSL security configuration. Developed a robust and secure REST API with Java Spring Boot, Spring Security, and PostgreSQL, designed for complex hierarchical modeling of academic entities (universities, campuses, faculties, careers, and curricula/pensums).",
    "projects.elpensum.category": "Backend",

    // * Tograbao Real State
    "projects.tograbao.name": "Tograbao Real State",
    "projects.tograbao.description":
      "High-performance real estate platform optimized for SEO and load speed. As project lead, I orchestrated the complete software development lifecycle (SDLC) coordinating a team of 3 under agile methodologies. Implemented a robust architecture utilizing Next.js for a lightning-fast frontend, Strapi as a Headless CMS for agile property management, and containerized deployment with Docker and Dokploy.",
    "projects.tograbao.category": "Full-Stack",

    // * Filters & Pagination
    "projects.filter.all": "All",
    "projects.category.fullstack": "Full-Stack",
    "projects.category.backend": "Backend",
    "projects.category.frontend": "Frontend",
    "projects.showMore": "Show more projects",
    "projects.showLess": "Show less",
    "projects.readMore": "Read more",
    "projects.readLess": "Read less",

    // Skills
    "skills.title": "Technical Skills",
    "skills.frontend": "Frontend",
    "skills.backend": "Backend",
    "skills.tools": "Tools",

    // Certifications
    "certifications.title": "Certifications",
    "certifications.viewCert": "View Certificate",
    "certifications.inProgress": "In progress",
    "certifications.completed": "Completed",
    "certifications.comingSoon": "Coming soon",
    "certifications.showMore": "Show more certifications",
    "certifications.showLess": "Show less",
    "certifications.close": "Close",
    "certifications.spring.title":
      "Spring Framework 6 & Spring Boot 3 from zero to expert",
    "certifications.spring.date": "October 2025",
    "certifications.java.title":
    "Advanced Java: reactivity, concurrency and patterns",
    "certifications.java.date": "In progress",
    "certifications.fullstack.title": "Full Stack Web Development - Intermediate Level",
    "certifications.fullstack.date": "January 2026",
    "certifications.springframework.title": "Spring Boot with Spring Framework",
    "certifications.springframework.date": "January 2026",
    "certifications.python.title": "Python for beginners - Learn from scratch",
    "certifications.python.date": "May 2024",
    "certifications.csharp.title": "Introduction to programming with C#",
    "certifications.csharp.date": "December 2025",
    "certifications.solid.title": "SOLID Principles and Clean Code",
    "certifications.solid.date": "January 2026",
    "certifications.sql.title": "Introduction to SQL",
    "certifications.sql.date": "February 2026",
    "certifications.enterprise.title": "Enterprise full stack with Spring Boot 4 and Angular 21",
    "certifications.enterprise.date": "March 2026",

    // Learning Path
    "learning.title": "Learning Path",
    "learning.subtitle": "My current focus",

    // Contact
    "contact.title": "Have a project in mind?",
    "contact.subtitle": "Fill out the form and I'll get back to you as soon as possible.",
    "contact.name": "Name",
    "contact.namePlaceholder": "Your full name",
    "contact.email": "Email",
    "contact.emailPlaceholder": "you@email.com",
    "contact.message": "Message",
    "contact.messagePlaceholder": "Tell me about your project or idea...",
    "contact.send": "Send message",

    // Footer
    "footer.cta": "Ready to create something amazing together?",
    "footer.talk": "Let's talk",
    "footer.role": "Java Analyst Developer • Dominican Republic",
    "footer.available": "Available for new projects",
    "footer.credit": "Designed and developed with",
    "footer.using": "using Astro & Tailwind CSS",
  },
} as const;

export type TranslationKey = keyof (typeof translations)["es"];

export function getLangFromUrl(url: URL) {
  const lang = url.searchParams.get("lang");
  if (lang && lang in translations) {
    return lang as keyof typeof translations;
  }
  return defaultLang;
}

export function useTranslations(lang: keyof typeof translations) {
  return function t(key: TranslationKey) {
    return translations[lang][key] || translations[defaultLang][key];
  };
}
