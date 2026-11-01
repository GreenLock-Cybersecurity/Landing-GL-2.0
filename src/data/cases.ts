// ============================================================================
// GreenLock — Casos de ciberinteligencia (páginas /ciberinteligencia/<slug> y
// hub /ciberinteligencia). Contenido tomado de los diseños de Claude Design.
// ============================================================================
import type { Pic } from './services';
import imgEstafador from '@assets/estafador.webp';
import imgMascotaAcoso from '@assets/mascota-acoso.webp';
import imgMascotaPerfilFalso from '@assets/mascota-perfil-falso.webp';
import imgMascotaSuplantacion from '@assets/mascota-suplantacion.webp';
import imgPartnerCompliance from '@assets/partner-compliance.webp';

export interface InvestigationCase {
  slug: string;
  /** Nombre corto para las migas */
  name: string;
  /** Opción marcada en el formulario OSINT de la home (/#contar-caso-N) */
  caseIndex: number;
  seo: { title: string; description: string };
  schema: Record<string, unknown>[];
  hero: { eyebrow: string; h1: string; sub: string; img: Pic };
  signals: { eyebrow: string; title: string; items: string[] };
  todo: { eyebrow: string; title: string; items: { title: string; text: string }[] };
  /** `title` admite **resaltado** en verde */
  help: { eyebrow: string; title: string; lead: string };
  related: string[];
  cta: { eyebrow: string; title: string; text: string };
  card: { title: string; text: string; img: Pic };
}

export const cases: InvestigationCase[] = [
  {
    slug: "estafa-online",
    name: "Estafa online",
    caseIndex: 0,
    seo: { title: "¿Te han estafado por internet? Qué hacer y cómo conseguir pruebas | GreenLock", description: "Si te han estafado en una tienda falsa, una inversión o por un falso banco, seguimos el rastro digital y lo convertimos en un informe pericial para tu denuncia." },
    schema: [],
    hero: { eyebrow: "Investigación digital", h1: "¿Te han estafado por internet?", sub: "Una tienda falsa, una inversión que no existía o alguien que se hizo pasar por tu banco. Seguimos el rastro que dejó la web o la cuenta usada y lo convertimos en prueba para tu denuncia.", img: { src: imgEstafador, alt: "Estafa online" } },
    signals: {
      eyebrow: "¿Te suena?",
      title: "Señales de que te está pasando",
      items: [
        "Pagaste y nunca recibiste el producto o el dinero",
        "La web o el perfil ha desaparecido",
        "Te piden más dinero para \"recuperar\" lo perdido",
        "Te contactaron haciéndose pasar por tu banco o una empresa",
      ],
    },
    todo: {
      eyebrow: "Qué hacer ahora",
      title: "Antes de nada, protege las pruebas",
      items: [
        { title: "No borres nada", text: "Conserva mensajes, emails, perfiles y justificantes de pago." },
        { title: "Guarda capturas con contexto", text: "Que se vea la fecha, la hora y la dirección (URL)." },
        { title: "No contactes a quien está detrás", text: "Puede borrar el rastro o ponerte en riesgo." },
        { title: "Actúa cuanto antes", text: "El rastro digital se pierde con el tiempo." },
      ],
    },
    help: { eyebrow: "Cómo te ayudamos", title: "Detrás de cada caso hay **un rastro.** Lo seguimos y lo convertimos en prueba.", lead: "Trabajamos solo con información pública y técnica, dentro de la ley. El informe documenta lo encontrado para que tu abogado, la plataforma o la policía puedan actuar." },
    related: ["suplantacion-identidad", "perfil-falso", "acoso-difamacion", "prueba-digital-juicio"],
    cta: { eyebrow: "Confidencial", title: "Cuanto antes actúes, más rastro queda.", text: "Cuéntanos qué ha pasado. Te contactaremos en menos de 24 horas." },
    card: { title: "¿Te han estafado por internet?", text: "Tiendas falsas, inversiones fraudulentas o falsos bancos.", img: { src: imgEstafador, alt: "¿Te han estafado por internet?" } },
  },
  {
    slug: "suplantacion-identidad",
    name: "Suplantación de identidad",
    caseIndex: 1,
    seo: { title: "¿Te suplantan la identidad en internet? Qué hacer | GreenLock", description: "Si alguien usa tu nombre, tus fotos o tus datos en internet, documentamos el rastro digital con fuentes abiertas y lo convertimos en prueba para denunciar." },
    schema: [],
    hero: { eyebrow: "Investigación digital", h1: "¿Te están suplantando la identidad en internet?", sub: "Alguien usa tu nombre, tus fotos o tus datos para engañar a otros. Seguimos el rastro que deja en internet y lo convertimos en prueba para que puedas denunciar.", img: { src: imgMascotaSuplantacion, alt: "¿Te están suplantando la identidad en internet?", scale: 1.55 } },
    signals: {
      eyebrow: "¿Te suena?",
      title: "Señales de que te está pasando",
      items: [
        "Tus contactos reciben mensajes \"tuyos\" que no has enviado",
        "Aparecen cuentas, compras o contratos a tu nombre",
        "Te llegan avisos de accesos o cambios que no has hecho",
        "Usan tus fotos o tus datos en otros sitios",
      ],
    },
    todo: {
      eyebrow: "Qué hacer ahora",
      title: "Antes de nada, protege las pruebas",
      items: [
        { title: "No borres nada", text: "Conserva mensajes, emails, perfiles y justificantes de pago." },
        { title: "Guarda capturas con contexto", text: "Que se vea la fecha, la hora y la dirección (URL)." },
        { title: "No contactes a quien está detrás", text: "Puede borrar el rastro o ponerte en riesgo." },
        { title: "Actúa cuanto antes", text: "El rastro digital se pierde con el tiempo." },
      ],
    },
    help: { eyebrow: "Cómo te ayudamos", title: "Detrás de cada caso hay **un rastro.** Lo seguimos y lo convertimos en prueba.", lead: "Trabajamos solo con información pública y técnica, dentro de la ley. El informe documenta lo encontrado para que tu abogado, la plataforma o la policía puedan actuar." },
    related: ["estafa-online", "perfil-falso", "acoso-difamacion", "prueba-digital-juicio"],
    cta: { eyebrow: "Confidencial", title: "Cuanto antes actúes, más rastro queda.", text: "Cuéntanos qué ha pasado. Te contactaremos en menos de 24 horas." },
    card: { title: "¿Te están suplantando la identidad en internet?", text: "Alguien usa tu nombre, tus fotos o tus datos.", img: { src: imgMascotaSuplantacion, alt: "¿Te están suplantando la identidad en internet?", scale: 1.55 } },
  },
  {
    slug: "perfil-falso",
    name: "Perfil falso",
    caseIndex: 1,
    seo: { title: "¿Hay un perfil falso con tus datos? Cómo documentarlo | GreenLock", description: "Un perfil falso con tu nombre o tus fotos puede dañar tu reputación o estafar a tus contactos. Lo documentamos como prueba para la plataforma o un juez." },
    schema: [],
    hero: { eyebrow: "Investigación digital", h1: "¿Hay un perfil falso con tus datos?", sub: "Un perfil con tu nombre o tus fotos puede dañar tu reputación o usarse para estafar a tus contactos. Documentamos el perfil y su actividad para que la plataforma o un juez puedan actuar.", img: { src: imgMascotaPerfilFalso, alt: "¿Hay un perfil falso con tus datos?", scale: 1.55 } },
    signals: {
      eyebrow: "¿Te suena?",
      title: "Señales de que te está pasando",
      items: [
        "Hay un perfil con tus fotos o tu nombre que no es tuyo",
        "Tus contactos te avisan de mensajes extraños",
        "Publica en tu nombre o pide dinero",
        "La plataforma no atiende tus denuncias",
      ],
    },
    todo: {
      eyebrow: "Qué hacer ahora",
      title: "Antes de nada, protege las pruebas",
      items: [
        { title: "No borres nada", text: "Conserva mensajes, emails, perfiles y justificantes de pago." },
        { title: "Guarda capturas con contexto", text: "Que se vea la fecha, la hora y la dirección (URL)." },
        { title: "No contactes a quien está detrás", text: "Puede borrar el rastro o ponerte en riesgo." },
        { title: "Actúa cuanto antes", text: "El rastro digital se pierde con el tiempo." },
      ],
    },
    help: { eyebrow: "Cómo te ayudamos", title: "Detrás de cada caso hay **un rastro.** Lo seguimos y lo convertimos en prueba.", lead: "Trabajamos solo con información pública y técnica, dentro de la ley. El informe documenta lo encontrado para que tu abogado, la plataforma o la policía puedan actuar." },
    related: ["estafa-online", "suplantacion-identidad", "acoso-difamacion", "prueba-digital-juicio"],
    cta: { eyebrow: "Confidencial", title: "Cuanto antes actúes, más rastro queda.", text: "Cuéntanos qué ha pasado. Te contactaremos en menos de 24 horas." },
    card: { title: "¿Hay un perfil falso con tus datos?", text: "Un perfil en redes con tu nombre o tus fotos.", img: { src: imgMascotaPerfilFalso, alt: "¿Hay un perfil falso con tus datos?", scale: 1.55 } },
  },
  {
    slug: "acoso-difamacion",
    name: "Acoso y difamación",
    caseIndex: 2,
    seo: { title: "¿Te acosan o difaman desde cuentas anónimas? | GreenLock", description: "Si te acosan, amenazan o difaman desde cuentas anónimas, analizamos y documentamos su actividad como prueba para tu abogado o la policía." },
    schema: [],
    hero: { eyebrow: "Investigación digital", h1: "¿Te acosan o difaman desde cuentas anónimas?", sub: "Cuentas sin nombre que te insultan, te amenazan o publican mentiras sobre ti. Analizamos su actividad y la documentamos como prueba para que tu abogado o la policía puedan actuar.", img: { src: imgMascotaAcoso, alt: "¿Te acosan o difaman desde cuentas anónimas?", scale: 1.55 } },
    signals: {
      eyebrow: "¿Te suena?",
      title: "Señales de que te está pasando",
      items: [
        "Recibes mensajes o comentarios ofensivos de cuentas sin identificar",
        "Se publican mentiras sobre ti o tu negocio",
        "Aparecen cuentas nuevas cuando bloqueas las anteriores",
        "Las amenazas afectan a tu vida personal o profesional",
      ],
    },
    todo: {
      eyebrow: "Qué hacer ahora",
      title: "Antes de nada, protege las pruebas",
      items: [
        { title: "No borres nada", text: "Conserva mensajes, emails, perfiles y justificantes de pago." },
        { title: "Guarda capturas con contexto", text: "Que se vea la fecha, la hora y la dirección (URL)." },
        { title: "No contactes a quien está detrás", text: "Puede borrar el rastro o ponerte en riesgo." },
        { title: "Actúa cuanto antes", text: "El rastro digital se pierde con el tiempo." },
      ],
    },
    help: { eyebrow: "Cómo te ayudamos", title: "Detrás de cada caso hay **un rastro.** Lo seguimos y lo convertimos en prueba.", lead: "Trabajamos solo con información pública y técnica, dentro de la ley. El informe documenta lo encontrado para que tu abogado, la plataforma o la policía puedan actuar." },
    related: ["estafa-online", "suplantacion-identidad", "perfil-falso", "prueba-digital-juicio"],
    cta: { eyebrow: "Confidencial", title: "Cuanto antes actúes, más rastro queda.", text: "Cuéntanos qué ha pasado. Te contactaremos en menos de 24 horas." },
    card: { title: "¿Te acosan o difaman desde cuentas anónimas?", text: "Cuentas anónimas que te insultan, amenazan o difaman.", img: { src: imgMascotaAcoso, alt: "¿Te acosan o difaman desde cuentas anónimas?", scale: 1.55 } },
  },
  {
    slug: "prueba-digital-juicio",
    name: "Prueba digital para juicio",
    caseIndex: 3,
    seo: { title: "¿Necesitas una prueba digital para un juicio? Informe pericial | GreenLock", description: "Capturas y mensajes pueden no bastar ante un juez. Documentamos la evidencia digital con método y te entregamos un informe pericial para el procedimiento." },
    schema: [],
    hero: { eyebrow: "Investigación digital", h1: "¿Necesitas una prueba digital para un juicio?", sub: "Capturas de pantalla, mensajes o publicaciones pueden no bastar ante un juez. Recogemos y documentamos la evidencia digital con método y te entregamos un informe pericial que puede aportarse al procedimiento.", img: { src: imgPartnerCompliance, alt: "Prueba digital para juicio", scale: 1.45 } },
    signals: {
      eyebrow: "¿Te suena?",
      title: "Señales de que te está pasando",
      items: [
        "Tienes capturas pero dudas de que sirvan como prueba",
        "La otra parte puede borrar el contenido",
        "Tu abogado te pide un informe pericial",
        "Necesitas conservar y fechar publicaciones o mensajes",
      ],
    },
    todo: {
      eyebrow: "Qué hacer ahora",
      title: "Antes de nada, protege las pruebas",
      items: [
        { title: "No borres nada", text: "Conserva mensajes, emails, perfiles y justificantes de pago." },
        { title: "Guarda capturas con contexto", text: "Que se vea la fecha, la hora y la dirección (URL)." },
        { title: "No contactes a quien está detrás", text: "Puede borrar el rastro o ponerte en riesgo." },
        { title: "Actúa cuanto antes", text: "El rastro digital se pierde con el tiempo." },
      ],
    },
    help: { eyebrow: "Cómo te ayudamos", title: "Detrás de cada caso hay **un rastro.** Lo seguimos y lo convertimos en prueba.", lead: "Trabajamos solo con información pública y técnica, dentro de la ley. El informe documenta lo encontrado para que tu abogado, la plataforma o la policía puedan actuar." },
    related: ["estafa-online", "suplantacion-identidad", "perfil-falso", "acoso-difamacion"],
    cta: { eyebrow: "Confidencial", title: "Cuanto antes actúes, más rastro queda.", text: "Cuéntanos qué ha pasado. Te contactaremos en menos de 24 horas." },
    card: { title: "¿Necesitas una prueba digital para un juicio?", text: "Evidencia digital documentada para tu abogado o el juzgado.", img: { src: imgPartnerCompliance, alt: "¿Necesitas una prueba digital para un juicio?", scale: 1.45 } },
  },
];

export const caseBySlug = (slug: string) => cases.find((c) => c.slug === slug);
export const caseHref = (slug: string) => `/ciberinteligencia/${slug}`;
