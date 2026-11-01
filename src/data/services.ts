// ============================================================================
// GreenLock — Servicios de ciberseguridad (páginas /ciberseguridad/<slug>,
// hub /ciberseguridad, bloque de la home, menú y footer).
// Contenido tomado de los diseños de Claude Design. Lo que va [entre
// corchetes] es un dato pendiente de rellenar.
// ============================================================================
import type { ImageMetadata } from 'astro';
import img360 from '@assets/360.webp';
import imgContinuaRobot from '@assets/continua-robot.webp';
import imgMascotaConcienciacion from '@assets/mascota-concienciacion.webp';
import imgMascotaInformeAuditoria from '@assets/mascota-informe-auditoria.webp';
import imgMascotaPentestApps from '@assets/mascota-pentest-apps.webp';
import imgMascotaPentestWordpress from '@assets/mascota-pentest-wordpress.webp';
import imgMascotaProteccionGestionada from '@assets/mascota-proteccion-gestionada.webp';
import imgPerimetral from '@assets/perimetral.webp';
import imgRedTeam from '@assets/red-team.webp';

export interface Pic {
  src: ImageMetadata;
  alt: string;
  /** Escala visual de la ilustración (algunas mascotas traen mucho margen) */
  scale?: number;
}

export type ServiceGroup = 'gestionada' | 'auditoria' | 'formacion';

export interface Service {
  slug: string;
  group: ServiceGroup;
  /** Nombre corto: migas, menú, footer y tarjetas */
  name: string;
  seo: { title: string; description: string };
  /** JSON-LD adicional a la miga de pan */
  schema: Record<string, unknown>[];
  hero: { eyebrow: string; h1: string; sub: string; ctaLabel: string; wa: string; img: Pic };
  review: { eyebrow: string; title: string; items: { title: string; text: string }[] };
  receive: { eyebrow: string; title: string; items: string[]; img: Pic };
  /** Slugs de los tres servicios relacionados */
  related: string[];
  cta: { title: string; text: string };
  card: { text: string; img: Pic };
  /** Texto de la tarjeta en la home, si difiere */
  homeText?: string;
}

export const services: Service[] = [
  {
    slug: "gestionada",
    group: "gestionada",
    name: "Ciberseguridad gestionada",
    seo: { title: "Ciberseguridad gestionada para pymes | GreenLock", description: "Ciberseguridad gestionada para pymes: medidas a medida de tu negocio, protección de equipos y aplicaciones web y monitorización constante. Tú te dedicas a tu negocio; nosotros, a tu seguridad." },
    schema: [{"@context": "https://schema.org", "@type": "Service", "name": "Ciberseguridad gestionada", "serviceType": "Ciberseguridad gestionada", "description": "Ciberseguridad gestionada para pymes: medidas a medida de tu negocio, protección de equipos y aplicaciones web y monitorización constante. Tú te dedicas a tu negocio; nosotros, a tu seguridad.", "areaServed": "ES", "provider": {"@type": "Organization", "name": "GreenLock Cybersecurity", "url": "https://greenlock.tech/"}}],
    hero: {
      eyebrow: "Recomendado para pymes",
      h1: "Ciberseguridad gestionada para tu pyme",
      sub: "Nos cuentas cómo funciona tu negocio y nos ocupamos de tu ciberseguridad: ponemos las medidas de protección que necesitas, protegemos tus equipos y tus webs, y lo vigilamos todo de forma constante.",
      ctaLabel: "Quiero mi ciberseguridad gestionada",
      wa: "https://wa.me/34603358517?text=Hola%2C%20me%20interesa%3A%20Protecci%C3%B3n%20gestionada",
      img: { src: imgMascotaProteccionGestionada, alt: "Ciberseguridad gestionada" },
    },
    review: {
      eyebrow: "Cómo funciona",
      title: "Qué incluye",
      items: [
        { title: "A medida de tu negocio", text: "Nos cuentas cómo trabajas y diseñamos las medidas que necesitas." },
        { title: "Protección de tus equipos", text: "Ordenadores y servidores protegidos frente a malware y ransomware." },
        { title: "Protección de tus webs y aplicaciones", text: "Frenamos los ataques antes de que lleguen a tus webs y aplicaciones." },
        { title: "Vigilancia constante", text: "Monitorizamos tus equipos y actuamos si algo pasa." },
      ],
    },
    receive: {
      eyebrow: "Qué recibes",
      title: "Tu ciberseguridad, en manos de un equipo experto",
      items: [
        "Medidas de seguridad configuradas para tu negocio",
        "Equipos y aplicaciones protegidos",
        "Vigilancia constante y aviso si algo pasa",
        "Informe periódico del estado de tu seguridad",
        "Servicio a medida para cada cliente",
      ],
      img: { src: imgMascotaInformeAuditoria, alt: "Informe de auditoría" },
    },
    related: ["auditoria-perimetral", "pentest-web", "pentest-aplicaciones"],
    cta: { title: "¿Hablamos de tu ciberseguridad gestionada?", text: "Cuéntanos qué necesitas y te preparamos una propuesta. Te contactaremos en menos de 24 horas." },
    card: { text: "Nos cuentas cómo funciona tu negocio y nos ocupamos de tu ciberseguridad: ponemos las medidas de protección que necesitas, protegemos tus equipos y tus webs, y lo vigilamos todo de forma constante.", img: { src: imgMascotaProteccionGestionada, alt: "Ciberseguridad gestionada" } },
  },
  {
    slug: "auditoria-perimetral",
    group: "auditoria",
    name: "Auditoría perimetral",
    seo: { title: "Auditoría perimetral de ciberseguridad para empresas | GreenLock", description: "Auditoría perimetral: revisamos lo que tu empresa expone a internet (webs, servidores, correo y nube) y te decimos qué puede usar un atacante para entrar." },
    schema: [{"@context": "https://schema.org", "@type": "Service", "name": "Auditoría perimetral", "serviceType": "Auditoría perimetral", "description": "Auditoría perimetral: revisamos lo que tu empresa expone a internet (webs, servidores, correo y nube) y te decimos qué puede usar un atacante para entrar.", "areaServed": "ES", "provider": {"@type": "Organization", "name": "GreenLock Cybersecurity", "url": "https://greenlock.tech/"}}],
    hero: {
      eyebrow: "Ciberseguridad para empresas",
      h1: "Auditoría perimetral de ciberseguridad",
      sub: "Revisamos todo lo que tu empresa expone a internet (webs, servidores, correo y servicios en la nube) y te decimos qué podría usar un atacante para entrar.",
      ctaLabel: "Solicitar auditoría",
      wa: "https://wa.me/34603358517?text=Hola%2C%20me%20interesa%3A%20Auditor%C3%ADa%20perimetral",
      img: { src: imgPerimetral, alt: "Auditoría perimetral" },
    },
    review: {
      eyebrow: "Qué revisamos",
      title: "Lo que comprobamos en tu empresa",
      items: [
        { title: "Superficie expuesta", text: "Dominios, subdominios, IPs y servicios publicados en internet." },
        { title: "Correo y suplantación", text: "SPF, DKIM y DMARC: si alguien puede enviar emails en tu nombre." },
        { title: "Servicios vulnerables", text: "Versiones desactualizadas y configuraciones inseguras." },
        { title: "Filtraciones", text: "Credenciales y datos de tu empresa en fuentes abiertas." },
      ],
    },
    receive: {
      eyebrow: "Qué recibes",
      title: "Un informe que entiende dirección y que tu equipo técnico puede aplicar",
      items: [
        "Informe técnico-ejecutivo: resumen para dirección y detalle técnico de cada hallazgo, con su evidencia y su prioridad",
        "Plan de corrección ordenado por riesgo",
        "Reunión para explicarte los resultados",
        "Re-pentesting incluido para comprobar las correcciones",
      ],
      img: { src: imgMascotaInformeAuditoria, alt: "Informe de auditoría" },
    },
    related: ["pentest-web", "pentest-aplicaciones", "pentest-wordpress"],
    cta: { title: "¿Hablamos de tu auditoría perimetral?", text: "Cuéntanos qué necesitas y te preparamos una propuesta. Te contactaremos en menos de 24 horas." },
    card: { text: "Todo lo que tu empresa expone a internet, revisado antes que los atacantes.", img: { src: imgPerimetral, alt: "Auditoría perimetral" } },
    homeText: "Análisis exhaustivo de tu superficie de ataque externa. Identificamos cada punto de entrada antes que los atacantes.",
  },
  {
    slug: "pentest-web",
    group: "auditoria",
    name: "Pentest web",
    seo: { title: "Pentest web: prueba de penetración de aplicaciones web | GreenLock", description: "Pentest web siguiendo OWASP: atacamos tu aplicación de forma controlada y te entregamos cada vulnerabilidad con su impacto y cómo corregirla." },
    schema: [{"@context": "https://schema.org", "@type": "Service", "name": "Pentest web", "serviceType": "Pentest web", "description": "Pentest web siguiendo OWASP: atacamos tu aplicación de forma controlada y te entregamos cada vulnerabilidad con su impacto y cómo corregirla.", "areaServed": "ES", "provider": {"@type": "Organization", "name": "GreenLock Cybersecurity", "url": "https://greenlock.tech/"}}],
    hero: {
      eyebrow: "Ciberseguridad para empresas",
      h1: "Pentest web",
      sub: "Atacamos tu aplicación web de forma controlada, como lo haría un atacante real, y te entregamos cada fallo con su impacto y cómo corregirlo.",
      ctaLabel: "Solicitar auditoría",
      wa: "https://wa.me/34603358517?text=Hola%2C%20me%20interesa%3A%20Pentest%20web",
      img: { src: img360, alt: "Pentest web" },
    },
    review: {
      eyebrow: "Qué revisamos",
      title: "Lo que comprobamos en tu aplicación",
      items: [
        { title: "Autenticación y sesiones", text: "Inicio de sesión, recuperación de contraseña y gestión de sesiones." },
        { title: "Control de acceso", text: "Si un usuario puede ver o modificar datos de otro." },
        { title: "Inyecciones y XSS", text: "Entradas que permiten ejecutar código o robar datos." },
        { title: "Lógica de negocio", text: "Fallos en pagos, pedidos o flujos propios de tu aplicación." },
      ],
    },
    receive: {
      eyebrow: "Qué recibes",
      title: "Un informe que entiende dirección y que tu equipo técnico puede aplicar",
      items: [
        "Informe técnico-ejecutivo: resumen para dirección y detalle técnico de cada hallazgo, con su evidencia y su prioridad",
        "Plan de corrección ordenado por riesgo",
        "Reunión para explicarte los resultados",
        "Re-pentesting incluido para comprobar las correcciones",
      ],
      img: { src: imgMascotaInformeAuditoria, alt: "Informe de auditoría" },
    },
    related: ["auditoria-perimetral", "pentest-aplicaciones", "pentest-wordpress"],
    cta: { title: "¿Hablamos de tu pentest web?", text: "Cuéntanos qué necesitas y te preparamos una propuesta. Te contactaremos en menos de 24 horas." },
    card: { text: "Tu aplicación web atacada de forma controlada, con metodología OWASP.", img: { src: img360, alt: "Pentest web" } },
    homeText: "Explotación controlada de tu aplicación web con metodología OWASP. Hallazgos priorizados y reproducibles.",
  },
  {
    slug: "pentest-aplicaciones",
    group: "auditoria",
    name: "Pentest de APIs y apps móviles",
    seo: { title: "Pentest de APIs y aplicaciones móviles | GreenLock", description: "Pentest de APIs y apps móviles (Android e iOS): autorización, tokens, almacenamiento y tráfico. Informe con cada hallazgo priorizado." },
    schema: [{"@context": "https://schema.org", "@type": "Service", "name": "Pentest de APIs y apps móviles", "serviceType": "Pentest de APIs y apps móviles", "description": "Pentest de APIs y apps móviles (Android e iOS): autorización, tokens, almacenamiento y tráfico. Informe con cada hallazgo priorizado.", "areaServed": "ES", "provider": {"@type": "Organization", "name": "GreenLock Cybersecurity", "url": "https://greenlock.tech/"}}],
    hero: {
      eyebrow: "Ciberseguridad para empresas",
      h1: "Pentest de APIs y aplicaciones móviles",
      sub: "Revisamos tus APIs y tus apps Android e iOS para encontrar fallos que expongan datos de tus usuarios o permitan saltarse permisos.",
      ctaLabel: "Solicitar auditoría",
      wa: "https://wa.me/34603358517?text=Hola%2C%20me%20interesa%3A%20Pentest%20de%20APIs%20y%20apps%20m%C3%B3viles",
      img: { src: imgMascotaPentestApps, alt: "Pentest de APIs y apps móviles", scale: 1.55 },
    },
    review: {
      eyebrow: "Qué revisamos",
      title: "Lo que comprobamos en tu aplicación",
      items: [
        { title: "Autorización en la API", text: "Acceso a recursos de otros usuarios (IDOR/BOLA) y permisos mal aplicados." },
        { title: "Tokens y autenticación", text: "Cómo se emiten, guardan y validan las credenciales." },
        { title: "La app en el dispositivo", text: "Datos guardados en el móvil, tráfico y protección del código." },
        { title: "Exposición de datos", text: "Respuestas que devuelven más información de la necesaria." },
      ],
    },
    receive: {
      eyebrow: "Qué recibes",
      title: "Un informe que entiende dirección y que tu equipo técnico puede aplicar",
      items: [
        "Informe técnico-ejecutivo: resumen para dirección y detalle técnico de cada hallazgo, con su evidencia y su prioridad",
        "Plan de corrección ordenado por riesgo",
        "Reunión para explicarte los resultados",
        "Re-pentesting incluido para comprobar las correcciones",
      ],
      img: { src: imgMascotaInformeAuditoria, alt: "Informe de auditoría" },
    },
    related: ["auditoria-perimetral", "pentest-web", "pentest-wordpress"],
    cta: { title: "¿Hablamos de tu pentest de APIs y apps móviles?", text: "Cuéntanos qué necesitas y te preparamos una propuesta. Te contactaremos en menos de 24 horas." },
    card: { text: "APIs y apps Android e iOS: autorización, tokens y datos expuestos.", img: { src: imgMascotaPentestApps, alt: "Pentest de APIs y apps móviles", scale: 1.55 } },
    homeText: "APIs y apps Android e iOS: autorización, tokens y datos expuestos.",
  },
  {
    slug: "pentest-wordpress",
    group: "auditoria",
    name: "Pentest WordPress",
    seo: { title: "Pentest WordPress: auditoría de seguridad de tu web | GreenLock", description: "Auditoría de seguridad WordPress: plugins y temas vulnerables, accesos al panel, configuración y ficheros expuestos. Informe y plan de corrección." },
    schema: [{"@context": "https://schema.org", "@type": "Service", "name": "Pentest WordPress", "serviceType": "Pentest WordPress", "description": "Auditoría de seguridad WordPress: plugins y temas vulnerables, accesos al panel, configuración y ficheros expuestos. Informe y plan de corrección.", "areaServed": "ES", "provider": {"@type": "Organization", "name": "GreenLock Cybersecurity", "url": "https://greenlock.tech/"}}],
    hero: {
      eyebrow: "Ciberseguridad para empresas",
      h1: "Pentest WordPress",
      sub: "Tu web en WordPress es una de las puertas más atacadas de tu negocio. Revisamos plugins, temas, accesos y configuración para cerrarla.",
      ctaLabel: "Solicitar auditoría",
      wa: "https://wa.me/34603358517?text=Hola%2C%20me%20interesa%3A%20Pentest%20WordPress",
      img: { src: imgMascotaPentestWordpress, alt: "Pentest WordPress", scale: 1.45 },
    },
    review: {
      eyebrow: "Qué revisamos",
      title: "Lo que comprobamos en tu aplicación",
      items: [
        { title: "Plugins y temas", text: "Versiones con vulnerabilidades conocidas o abandonadas." },
        { title: "Usuarios y panel", text: "Accesos al administrador, contraseñas y enumeración de usuarios." },
        { title: "Configuración", text: "Servidor, core y permisos de ficheros." },
        { title: "Ficheros expuestos", text: "Copias de seguridad, logs o configuraciones accesibles." },
      ],
    },
    receive: {
      eyebrow: "Qué recibes",
      title: "Un informe que entiende dirección y que tu equipo técnico puede aplicar",
      items: [
        "Informe técnico-ejecutivo: resumen para dirección y detalle técnico de cada hallazgo, con su evidencia y su prioridad",
        "Plan de corrección ordenado por riesgo",
        "Reunión para explicarte los resultados",
        "Re-pentesting incluido para comprobar las correcciones",
      ],
      img: { src: imgMascotaInformeAuditoria, alt: "Informe de auditoría" },
    },
    related: ["auditoria-perimetral", "pentest-web", "pentest-aplicaciones"],
    cta: { title: "¿Hablamos de tu pentest WordPress?", text: "Cuéntanos qué necesitas y te preparamos una propuesta. Te contactaremos en menos de 24 horas." },
    card: { text: "Plugins, temas, accesos y configuración de tu web WordPress.", img: { src: imgMascotaPentestWordpress, alt: "Pentest WordPress", scale: 1.45 } },
    homeText: "Plugins, temas, accesos y configuración de tu web WordPress.",
  },
  {
    slug: "red-team",
    group: "auditoria",
    name: "Red Team",
    seo: { title: "Red Team: simulación de ataque real a tu empresa | GreenLock", description: "Ejercicio de Red Team con MITRE ATT&CK: simulamos un ataque real (OSINT, ingeniería social, acceso inicial y movimiento lateral) y medimos si tu equipo lo detecta." },
    schema: [{"@context": "https://schema.org", "@type": "Service", "name": "Red Team", "serviceType": "Red Team", "description": "Ejercicio de Red Team con MITRE ATT&CK: simulamos un ataque real (OSINT, ingeniería social, acceso inicial y movimiento lateral) y medimos si tu equipo lo detecta.", "areaServed": "ES", "provider": {"@type": "Organization", "name": "GreenLock Cybersecurity", "url": "https://greenlock.tech/"}}],
    hero: {
      eyebrow: "Ciberseguridad para empresas",
      h1: "Red Team: simulamos un ataque real a tu empresa",
      sub: "Actuamos como un grupo atacante real, de principio a fin, para comprobar hasta dónde llegaría y si tu equipo lo detecta a tiempo.",
      ctaLabel: "Solicitar auditoría",
      wa: "https://wa.me/34603358517?text=Hola%2C%20me%20interesa%3A%20Red%20Team",
      img: { src: imgRedTeam, alt: "Red Team" },
    },
    review: {
      eyebrow: "Qué revisamos",
      title: "Lo que comprobamos en tu empresa",
      items: [
        { title: "OSINT e ingeniería social", text: "Lo que se sabe de tu empresa y de tu equipo, y cómo se usaría." },
        { title: "Acceso inicial", text: "Phishing, servicios expuestos o acceso físico, según el alcance." },
        { title: "Movimiento lateral", text: "Hasta dónde se llega una vez dentro." },
        { title: "Detección y respuesta", text: "Si tu equipo o tu proveedor detecta el ataque y cómo reacciona." },
      ],
    },
    receive: {
      eyebrow: "Qué recibes",
      title: "Un informe que entiende dirección y que tu equipo técnico puede aplicar",
      items: [
        "Informe técnico-ejecutivo: resumen para dirección y detalle técnico de cada hallazgo, con su evidencia y su prioridad",
        "Plan de corrección ordenado por riesgo",
        "Reunión para explicarte los resultados",
        "Re-pentesting incluido para comprobar las correcciones",
      ],
      img: { src: imgMascotaInformeAuditoria, alt: "Informe de auditoría" },
    },
    related: ["auditoria-perimetral", "pentest-web", "pentest-aplicaciones"],
    cta: { title: "¿Hablamos de tu Red Team?", text: "Cuéntanos qué necesitas y te preparamos una propuesta. Te contactaremos en menos de 24 horas." },
    card: { text: "Un ataque real de principio a fin para medir tu capacidad de detección.", img: { src: imgRedTeam, alt: "Red Team" } },
    homeText: "Simulación de ataque real end-to-end. OSINT, ingeniería social, acceso físico y movimiento lateral sin restricciones.",
  },
  {
    slug: "ofensiva-continua",
    group: "auditoria",
    name: "Ciberseguridad ofensiva continua",
    seo: { title: "Ciberseguridad ofensiva continua: pentesting periódico | GreenLock", description: "Ciberseguridad ofensiva continua: pentesting periódico sobre tus sistemas, detectamos nuevas vulnerabilidades y hacemos seguimiento de las correcciones." },
    schema: [{"@context": "https://schema.org", "@type": "Service", "name": "Ciberseguridad ofensiva continua", "serviceType": "Ciberseguridad ofensiva continua", "description": "Ciberseguridad ofensiva continua: pentesting periódico sobre tus sistemas, detectamos nuevas vulnerabilidades y hacemos seguimiento de las correcciones.", "areaServed": "ES", "provider": {"@type": "Organization", "name": "GreenLock Cybersecurity", "url": "https://greenlock.tech/"}}],
    hero: {
      eyebrow: "Ciberseguridad para empresas",
      h1: "Ciberseguridad ofensiva continua",
      sub: "Atacamos tus sistemas de forma periódica, como lo haría un atacante real, para encontrar nuevas brechas antes que nadie. Protegido todo el año, no solo el día de la auditoría.",
      ctaLabel: "Solicitar auditoría",
      wa: "https://wa.me/34603358517?text=Hola%2C%20me%20interesa%3A%20Ciberseguridad%20continua",
      img: { src: imgContinuaRobot, alt: "Ciberseguridad ofensiva continua" },
    },
    review: {
      eyebrow: "Qué revisamos",
      title: "Lo que comprobamos en tu empresa",
      items: [
        { title: "Revisiones mensuales", text: "Cada mes revisamos de nuevo tu superficie expuesta." },
        { title: "Nuevas vulnerabilidades", text: "Aviso cuando aparece un fallo que te afecta." },
        { title: "Seguimiento de correcciones", text: "Comprobamos que lo corregido sigue corregido." },
        { title: "Informe periódico", text: "Estado de tu seguridad y evolución en el tiempo." },
      ],
    },
    receive: {
      eyebrow: "Qué recibes",
      title: "Un informe que entiende dirección y que tu equipo técnico puede aplicar",
      items: [
        "Informe técnico-ejecutivo: resumen para dirección y detalle técnico de cada hallazgo, con su evidencia y su prioridad",
        "Plan de corrección ordenado por riesgo",
        "Reunión para explicarte los resultados",
        "Re-pentesting incluido para comprobar las correcciones",
      ],
      img: { src: imgMascotaInformeAuditoria, alt: "Informe de auditoría" },
    },
    related: ["auditoria-perimetral", "pentest-web", "pentest-aplicaciones"],
    cta: { title: "¿Hablamos de tu ciberseguridad ofensiva continua?", text: "Cuéntanos qué necesitas y te preparamos una propuesta. Te contactaremos en menos de 24 horas." },
    card: { text: "Revisiones periódicas para estar protegido todo el año.", img: { src: imgContinuaRobot, alt: "Ciberseguridad ofensiva continua" } },
    homeText: "Atacamos tus sistemas de forma periódica, como lo haría un atacante real, para encontrar nuevas brechas antes que nadie.",
  },
  {
    slug: "concienciacion-phishing",
    group: "formacion",
    name: "Concienciación y phishing simulado",
    seo: { title: "Concienciación en ciberseguridad y phishing simulado | GreenLock", description: "Formación en ciberseguridad para empleados y campañas de phishing simulado para medir y reducir el riesgo humano en tu empresa." },
    schema: [{"@context": "https://schema.org", "@type": "Service", "name": "Concienciación y phishing simulado", "serviceType": "Concienciación y phishing simulado", "description": "Formación en ciberseguridad para empleados y campañas de phishing simulado para medir y reducir el riesgo humano en tu empresa.", "areaServed": "ES", "provider": {"@type": "Organization", "name": "GreenLock Cybersecurity", "url": "https://greenlock.tech/"}}],
    hero: {
      eyebrow: "Ciberseguridad para empresas",
      h1: "Concienciación y phishing simulado para tu equipo",
      sub: "La mayoría de ataques empiezan con un email. Formamos a tu equipo y lo ponemos a prueba con campañas de phishing simulado.",
      ctaLabel: "Solicitar auditoría",
      wa: "https://wa.me/34603358517?text=Hola%2C%20me%20interesa%3A%20Concienciaci%C3%B3n%20y%20phishing%20simulado",
      img: { src: imgMascotaConcienciacion, alt: "Concienciación y phishing simulado" },
    },
    review: {
      eyebrow: "Qué revisamos",
      title: "Lo que comprobamos en tu empresa",
      items: [
        { title: "Phishing simulado", text: "Campañas realistas adaptadas a tu empresa." },
        { title: "Formación práctica", text: "Sesiones cortas sobre lo que de verdad se usa para atacar." },
        { title: "Mejora continua", text: "Nuevas campañas para comprobar la evolución." },
      ],
    },
    receive: {
      eyebrow: "Qué recibes",
      title: "Un informe que entiende dirección y que tu equipo técnico puede aplicar",
      items: [
        "Informe técnico-ejecutivo: resumen para dirección y detalle técnico de cada hallazgo, con su evidencia y su prioridad",
        "Plan de corrección ordenado por riesgo",
        "Reunión para explicarte los resultados",
        "Re-pentesting incluido para comprobar las correcciones",
      ],
      img: { src: imgMascotaInformeAuditoria, alt: "Informe de auditoría" },
    },
    related: ["auditoria-perimetral", "pentest-web", "pentest-aplicaciones"],
    cta: { title: "¿Hablamos de tu concienciación y phishing simulado?", text: "Cuéntanos qué necesitas y te preparamos una propuesta. Te contactaremos en menos de 24 horas." },
    card: { text: "Formación y campañas de phishing simulado para reducir el riesgo humano.", img: { src: imgMascotaConcienciacion, alt: "Concienciación y phishing simulado" } },
    homeText: "Formamos a tu equipo y lo ponemos a prueba con campañas de phishing simulado para reducir el riesgo humano.",
  },
];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);
export const servicesIn = (group: ServiceGroup) => services.filter((s) => s.group === group);
export const serviceHref = (slug: string) => `/ciberseguridad/${slug}`;

/** Índice de la opción del formulario de auditoría de la home que corresponde a cada servicio. */
export function auditOption(slug: string): number {
  if (slug === 'gestionada') return 0;
  if (slug === 'auditoria-perimetral') return 1;
  if (slug.startsWith('pentest-')) return 2;
  if (slug === 'red-team') return 3;
  if (slug === 'ofensiva-continua') return 4;
  if (slug === 'concienciacion-phishing') return 5;
  return 6;
}
