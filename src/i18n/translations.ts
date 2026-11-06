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
    "experience.pensum.position": "BackEnd & Infrastructure engineer",
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
    "projects.tograbao.fact.role": "Líder de proyecto",
    "projects.tograbao.fact.team": "3 personas",
    "projects.spendly.fact.key": "Registro automático desde correos del banco",
    "projects.elpensum.fact.role": "Backend e infraestructura",
    "projects.fact.role": "Rol",
    "projects.fact.team": "Equipo",
    "projects.fact.key": "Clave",
    "projects.fact.result": "Resultado",
    "projects.pending": "Pendiente",
    "projects.viewLive": "Ver en vivo",
    "projects.details": "Detalles",
    "projects.code": "Código",
    "projects.close": "Cerrar",
    "projects.viewImages": "Ver imágenes",
    "projects.prevImage": "Imagen anterior",
    "projects.nextImage": "Imagen siguiente",
    "projects.stack": "Stack",
    "projects.fact.goal": "Objetivo",
    "projects.facts": "Datos clave",
    "projects.placeholderBadge": "Imagen temporal",
    "projects.cifmec.category": "Frontend",
    "projects.cifmec.pitch": "Rediseño y migración del sitio de CIFMEC de WordPress a Next.js, con un salto enorme en rendimiento y una imagen más moderna.",
    "projects.cifmec.description": "Sitio web para CIFMEC, un centro médico que dependía de un WordPress lento y con un diseño desactualizado. Lo rediseñé desde cero y lo reconstruí con Next.js, priorizando la velocidad de carga y una navegación clara. También me encargué del despliegue en un VPS con Docker y Dokploy.",
    "projects.cifmec.fact.role": "Diseño, desarrollo y despliegue, de principio a fin",
    "projects.cifmec.fact.result": "Reemplazó un sitio en WordPress por uno rediseñado y mucho más rápido",
    "projects.spendly.pitch": "Nació como proyecto personal para aprender Spring Boot y hoy registra los gastos de sus usuarios de forma automática, leyendo las notificaciones del banco.",
    "projects.spendly.description": "Aplicación full-stack de finanzas personales con backend en Java y Spring Boot (Spring Security, Spring Data JPA y PostgreSQL) y frontend en Angular. Su pieza central es un proceso que interpreta las notificaciones de transacciones que llegan por correo y registra cada gasto automáticamente, así nadie tiene que anotar nada al final del día. La API está documentada con Swagger y corre en Docker sobre Dokploy.",
    "projects.spendly.fact.role": "Desarrollo full-stack, de principio a fin",
    "projects.spendly.fact.result": "15–20 personas lo usan para llevar sus finanzas sin registrar gastos a mano",
    "projects.tograbao.pitch": "Plataforma inmobiliaria para explorar terrenos y propiedades en un solo lugar. Lideré a un equipo de 3 personas, desde la idea hasta producción.",
    "projects.tograbao.description": "Plataforma inmobiliaria con frontend en Next.js y Strapi como CMS headless, para que el cliente publique y actualice propiedades sin tocar código. Le dimos prioridad al SEO y a la velocidad de carga, de modo que cada terreno o casa se encuentre fácil en buscadores. Como líder de proyecto coordiné a un equipo de 3 personas con metodología ágil, desde la planificación hasta el despliegue en contenedores Docker gestionados con Dokploy.",
    "projects.tograbao.fact.result": "Pasó de depender de redes sociales a tener su propio catálogo de propiedades en línea.",
    "projects.elpensum.pitch": "API central de una plataforma para comparar pensums de universidades dominicanas y orientar a estudiantes con un test vocacional. Me encargué del backend y la infraestructura.",
    "projects.elpensum.description": "API REST en Java y Spring Boot que modela la estructura académica de RD (universidades, recintos, facultades, carreras y pensums) con todas sus relaciones jerárquicas. Me encargué de la seguridad con Spring Security, la persistencia con Spring Data JPA y PostgreSQL, y la documentación con Swagger. También monté la infraestructura: servidor VPS, DNS, certificados SSL y despliegue en contenedores con Docker y Dokploy.",
    "projects.elpensum.fact.team": "4 personas",
    "projects.elpensum.fact.goal": "Centralizar los pensums de universidades e institutos de RD para compararlos en un solo lugar",
    "projects.galansorteos.category": "Full-Stack",
    "projects.galansorteos.pitch": "Plataforma de rifas donde los participantes reservan boletos subiendo su comprobante de transferencia.",
    "projects.galansorteos.description": "Plataforma de rifas construida con Next.js y Payload CMS sobre PostgreSQL. Al subir el comprobante de transferencia, los boletos quedan reservados; un administrador valida el pago desde el panel de Payload y, si lo aprueba, los boletos se asignan al participante, y si lo rechaza vuelven a estar disponibles. La desarrollé de principio a fin y la desplegué en un VPS con Docker y Dokploy.",
    "projects.galansorteos.fact.role": "Desarrollo full-stack, de principio a fin",
    "projects.galansorteos.fact.key": "Validación de pagos con reserva y liberación de boletos",
    "projects.more": "Más proyectos",
    "projects.viewAll": "Ver todos los proyectos",
    "projects.title": "Proyectos",
    "projects.spendly.name": "Spendly",
    "projects.spendly.category": "Full-Stack",

    // // * Citadel Logs
    // "projects.citadelLogs.name": "Citadel Logs",
    // "projects.citadelLogs.description":
    //   "Aplicación web desarrollada con React y Node.js para la visualización y gestión de logs en tiempo real, ofreciendo una interfaz intuitiva para monitorear eventos del sistema.",
    // "projects.citadelLogs.category": "Full-Stack",

    "projects.elpensum.name": "El Pensum API",
    "projects.elpensum.category": "Backend",

    // * Tograbao Real State
    "projects.tograbao.name": "Tograbao Real State",
    "projects.tograbao.category": "Full-Stack",


    // Skills
    "skills.title": "Habilidades Técnicas",
    "skills.frontend": "Frontend",
    "skills.backend": "Backend",
    "skills.tools": "Tools",

    // Certifications
    "experience.eyebrow": "Trayectoria",
    "projects.eyebrow": "Casos de estudio",
    "certifications.eyebrow": "Aprendizaje",
    "skills.eyebrow": "Stack",
    "certifications.title": "Certificaciones",
    "certifications.viewCert": "Ver Certificación",
    "certifications.inProgress": "En curso",
    "certifications.completed": "Completado",
    "certifications.comingSoon": "Próximamente",
    "certifications.showAll": "Ver todas",
    "certifications.showLess": "Ver menos",
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

    "projects.tograbao.fact.role": "Project lead",
    "projects.tograbao.fact.team": "3 people",
    "projects.spendly.fact.key": "Auto-logging from bank emails",
    "projects.elpensum.fact.role": "Backend & infrastructure",
    "projects.fact.role": "Role",
    "projects.fact.team": "Team",
    "projects.fact.key": "Key feature",
    "projects.fact.result": "Outcome",
    "projects.pending": "Pending",
    "projects.viewLive": "View live",
    "projects.details": "Details",
    "projects.code": "Code",
    "projects.close": "Close",
    "projects.viewImages": "View images",
    "projects.prevImage": "Previous image",
    "projects.nextImage": "Next image",
    "projects.stack": "Stack",
    "projects.fact.goal": "Goal",
    "projects.facts": "Key facts",
    "projects.placeholderBadge": "Temporary image",
    "projects.cifmec.category": "Frontend",
    "projects.cifmec.pitch": "Redesign and migration of CIFMEC's site from WordPress to Next.js, with a huge jump in performance and a more modern look.",
    "projects.cifmec.description": "Website for CIFMEC, a medical center that relied on a slow WordPress site with an outdated design. I redesigned it from scratch and rebuilt it with Next.js, focusing on load speed and clear navigation. I also handled deployment on a VPS with Docker and Dokploy.",
    "projects.cifmec.fact.role": "Design, development and deployment, end to end",
    "projects.cifmec.fact.result": "Replaced a WordPress site with a redesigned, much faster one",
    "projects.spendly.pitch": "Started as a personal project to learn Spring Boot; today it logs users' expenses automatically from their bank notifications.",
    "projects.spendly.description": "Full-stack personal finance app with a Java and Spring Boot backend (Spring Security, Spring Data JPA and PostgreSQL) and an Angular frontend. At its core is a process that reads the transaction notifications arriving by email and logs each expense automatically, so nobody has to enter anything at the end of the day. The API is documented with Swagger and runs on Docker with Dokploy.",
    "projects.spendly.fact.role": "Solo full-stack developer, end to end",
    "projects.spendly.fact.result": "Used by 15–20 people to track their finances without manual entry",
    "projects.tograbao.pitch": "A real estate platform to browse land and properties in one place. I led a team of 3, from idea to production.",
    "projects.tograbao.description": "Real estate platform built with a Next.js frontend and Strapi as a headless CMS, so the client can publish and update listings without touching code. We prioritized SEO and load speed so every property is easy to find on search engines. As project lead, I coordinated a team of 3 using agile practices, from planning to deployment in Docker containers managed with Dokploy.",
    "projects.tograbao.fact.result": "Went from relying on social media to running its own online property catalog.",
    "projects.elpensum.pitch": "Core API for a platform that compares curricula across Dominican universities and guides students with a career test. I owned the backend and infrastructure.",
    "projects.elpensum.description": "REST API in Java and Spring Boot that models the Dominican academic structure (universities, campuses, schools, degrees and curricula) with all their hierarchical relationships. I handled security with Spring Security, persistence with Spring Data JPA and PostgreSQL, and documentation with Swagger. I also set up the infrastructure: VPS server, DNS, SSL certificates and containerized deployment with Docker and Dokploy.",
    "projects.elpensum.fact.team": "4 people",
    "projects.elpensum.fact.goal": "Centralize curricula from Dominican universities and institutes so they can be compared in one place",
    "projects.galansorteos.category": "Full-Stack",
    "projects.galansorteos.pitch": "Raffle platform where participants reserve tickets by uploading their bank transfer receipt.",
    "projects.galansorteos.description": "Raffle platform built with Next.js and Payload CMS on PostgreSQL. When a participant uploads their transfer receipt, the tickets are reserved; an admin validates the payment from the Payload panel and either assigns the tickets or releases them back if it's rejected. I built it end to end and deployed it on a VPS with Docker and Dokploy.",
    "projects.galansorteos.fact.role": "Solo full-stack developer, end to end",
    "projects.galansorteos.fact.key": "Payment validation with ticket reserve and release",
    "projects.more": "More projects",
    "projects.viewAll": "View all projects",
    "projects.title": "Projects",
    "projects.spendly.name": "Spendly",
    "projects.spendly.category": "Full-Stack",
    "projects.elpensum.name": "El Pensum API",
    "projects.elpensum.category": "Backend",

    // * Tograbao Real State
    "projects.tograbao.name": "Tograbao Real State",
    "projects.tograbao.category": "Full-Stack",


    // Skills
    "skills.title": "Technical Skills",
    "skills.frontend": "Frontend",
    "skills.backend": "Backend",
    "skills.tools": "Tools",

    // Certifications
    "experience.eyebrow": "Career",
    "projects.eyebrow": "Case studies",
    "certifications.eyebrow": "Learning",
    "skills.eyebrow": "Stack",
    "certifications.title": "Certifications",
    "certifications.viewCert": "View Certificate",
    "certifications.inProgress": "In progress",
    "certifications.completed": "Completed",
    "certifications.comingSoon": "Coming soon",
    "certifications.showAll": "Show all",
    "certifications.showLess": "Show less",
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
