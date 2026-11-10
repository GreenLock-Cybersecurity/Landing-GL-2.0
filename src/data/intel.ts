// Ciberinteligencia: hub, servicios (due diligence, rastreo, evidencia, despachos) y landings de campaña.
// El contenido sale de los diseños de Claude Design (entrega v7) y vive en `intel-pages.json`;
// aquí van los tipos, las imágenes y los textos compartidos.
import type { ImageMetadata } from 'astro';
import raw from './intel-pages.json';

import imgDetective from '@assets/detective.webp';
import imgEstafador from '@assets/estafador.webp';
import imgAbogado from '@assets/ci-abogado.webp';
import imgLpEstafa from '@assets/lp-estafa-online.webp';
import imgLpPerfil from '@assets/lp-perfil-falso.webp';
import imgLpMarca from '@assets/lp-suplantacion-marca.webp';
import imgPasoEncargo from '@assets/paso-encargo.webp';
import imgPasoPago from '@assets/paso-pago.webp';
import imgPasoInvestigacion from '@assets/paso-investigacion.webp';
import imgPasoEntrega from '@assets/paso-entrega.webp';
import imgPasoViabilidad from '@assets/paso-viabilidad.webp';

/** Nombre del entregable. Nunca «informe pericial» ni «perito» (no lo ratificamos todavía). */
export const INFORME = 'informe técnico de evidencias digitales';

export const PHONE = '+34 603 35 85 17';
export const PHONE_HREF = 'tel:+34603358517';

const IMAGES: Record<string, { src: ImageMetadata; alt: string }> = {
  detective: { src: imgDetective, alt: 'Personaje de investigación de GreenLock' },
  estafador: { src: imgEstafador, alt: 'Rastreo de huella digital' },
  'ci-abogado': { src: imgAbogado, alt: 'Evidencia digital para despachos de abogados' },
  'lp-estafa-online': { src: imgLpEstafa, alt: 'Estafa online' },
  'lp-perfil-falso': { src: imgLpPerfil, alt: 'Perfil falso' },
  'lp-suplantacion-marca': { src: imgLpMarca, alt: 'Suplantación de marca' },
  'paso-encargo': { src: imgPasoEncargo, alt: '' },
  'paso-pago': { src: imgPasoPago, alt: '' },
  'paso-investigacion': { src: imgPasoInvestigacion, alt: '' },
  'paso-entrega': { src: imgPasoEntrega, alt: '' },
  'paso-viabilidad': { src: imgPasoViabilidad, alt: '' },
};

export function intelImage(name: string) {
  const img = IMAGES[name];
  if (!img) throw new Error(`Imagen de ciberinteligencia desconocida: ${name}`);
  return img;
}

export interface IntelLink {
  label: string;
  href?: string;
}

export interface IntelCard {
  title?: string;
  text?: string;
  small?: string;
  items?: string[];
  href?: string;
  linkLabel?: string;
  img?: string;
}

export type IntelNote =
  | { kind: 'box'; title: string; text: string; small?: string }
  | { kind: 'dark'; title: string; text: string }
  | { kind: 'plain'; text: string }
  | { kind: 'chips'; title: string; chips: string[] };

export type IntelSection =
  | { kind: 'grid'; variant: 'situations' | 'checks' | 'links' | 'plain'; tone?: string; eyebrow: string; h2: string; intro: string[]; cards: IntelCard[]; notes: IntelNote[] }
  | { kind: 'report'; tone?: string; eyebrow: string; h2: string; intro: string[]; items: string[]; mock: { kind: string; title: string; subtitle: string; risk: boolean } }
  | { kind: 'steps'; tone?: string; eyebrow: string; h2: string; steps: { title: string; text: string; img: string }[] }
  | { kind: 'notdo'; tone?: string; text: string }
  | { kind: 'band'; tone?: string; eyebrow: string; h2: string; intro: string[]; link: IntelLink & { href: string } }
  | { kind: 'faq'; tone?: string; h2: string; faq: { q: string; a: string }[] }
  | { kind: 'form' };

export interface IntelForm {
  eyebrow: string;
  title: string;
  intro: string;
  cta: string;
  /** Línea de negocio preseleccionada (valor que acepta el Worker) */
  linea: string;
  /** Formulario de alta de despacho colaborador */
  colab: boolean;
  slug: string;
  identLabel: string | null;
  identPlaceholder: string | null;
}

export interface IntelPage {
  name: string;
  path: string;
  kind: 'hub' | 'service' | 'landing';
  seo: { title: string; description: string; jsonld: Record<string, unknown>[] };
  hero: { crumbs?: IntelLink[]; eyebrow: string; h1: string; sub: string; cta: { label: string; href: string }; img: string };
  form: IntelForm;
  sections: IntelSection[];
  closing: { text: string; link: { label: string; href: string } } | null;
}

export const intelPages = raw as unknown as Record<string, IntelPage>;

export const intelServices = ['due-diligence-empresas', 'rastreo-huella-digital', 'evidencia-digital-juicio', 'abogados'] as const;
export const intelLandings = [
  'investigar-empresa-antes-de-firmar',
  'perfil-falso-quien-esta-detras',
  'suplantacion-de-marca-web-falsa',
  'estafa-online-identificar-autor',
  'prueba-digital-para-juicio',
] as const;

export const intelHub = () => intelPages['ciberinteligencia'];
export const intelService = (slug: string) => intelPages[`ciberinteligencia-${slug}`];
export const intelLanding = (slug: string) => intelPages[slug];

/** Líneas de servicio que acepta el Worker (`/lead/inteligencia`). */
export const LINEAS = ['Due diligence de empresa', 'Rastreo de huella digital', 'Evidencia digital para juicio'] as const;
export const FINALIDADES = ['Firmar un contrato', 'Invertir', 'Conceder crédito', 'Reclamar', 'Denuncia', 'Procedimiento judicial', 'Otro'] as const;
export const VOLUMENES = ['Menos de 5 al año', 'Entre 5 y 20 al año', 'Más de 20 al año'] as const;

/** Texto de /gracias según la página de origen (?servicio=slug). */
export const GRACIAS_SERVICIO: Record<string, string> = {
  'due-diligence-empresas': 'Due diligence de empresa',
  'investigar-empresa-antes-de-firmar': 'Due diligence de empresa',
  'rastreo-huella-digital': 'Rastreo de huella digital',
  'perfil-falso-quien-esta-detras': 'Rastreo de huella digital',
  'suplantacion-de-marca-web-falsa': 'Rastreo de huella digital',
  'estafa-online-identificar-autor': 'Rastreo de huella digital',
  'evidencia-digital-juicio': 'Evidencia digital para juicio',
  'prueba-digital-para-juicio': 'Evidencia digital para juicio',
  abogados: 'Alta como despacho colaborador',
  ciberinteligencia: 'Ciberinteligencia',
};
