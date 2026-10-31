// ============================================================================
// GreenLock Blog — Hardcoded posts (no CMS).
// Article bodies live in ./blog-bodies.json (recovered from a previous build).
// ============================================================================
import type { ImageMetadata } from 'astro';
import imgNis2 from '@assets/NIS2.webp';
import imgOwasp from '@assets/owasp.webp';
import imgPentesting from '@assets/pentesting.webp';
import hacknetLogo from '@assets/HackNet-Logo.webp';
import crtoBadge from '@assets/crto.webp';
import bodiesJson from './blog-bodies.json';

const BODIES = bodiesJson as Record<string, string>;

export interface BlogCert {
  label: string;
  icon?: ImageMetadata;
}

export interface BlogAuthor {
  name: string;
  role: string;
  initials: string;
  certifications?: BlogCert[];
  linkedin?: string;
  youtube?: string;
  instagram?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string; // ISO date (sorting / RSS)
  dateText: string;    // human-readable (display)
  readTime: string;
  author: BlogAuthor;
  tags: string[];
  image?: ImageMetadata;
  imageUrl?: string;
  body: string;
}

const diego: BlogAuthor = {
  name: 'Diego Rodríguez',
  role: 'Co-founder & Security Engineering',
  initials: 'DR',
  certifications: [{ label: 'HackNet · 100.000+ seguidores', icon: hacknetLogo }],
  linkedin: 'https://www.linkedin.com/in/hackn3t/',
  youtube: 'https://www.youtube.com/@hackn3t',
  instagram: 'https://www.instagram.com/hacknetx/',
};

const damian: BlogAuthor = {
  name: 'Damián Pérez',
  role: 'Co-founder & Offensive Security',
  initials: 'DP',
  certifications: [{ label: 'CRTO Certified', icon: crtoBadge }],
  linkedin: 'https://www.linkedin.com/in/dpmcyber/',
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'agentic-ai-nueva-amenaza-ciberseguridad-empresas',
    title: 'Agentic AI: La Nueva Arma Ofensiva que Ninguna Empresa Española Está Viendo Venir',
    excerpt:
      'La Agentic AI ha eliminado la principal barrera que protegía a las empresas medianas: el coste operativo del atacante. Lo que antes requería semanas, hoy lo ejecuta un enjambre autónomo en minutos. Esto es lo que necesitas saber.',
    category: 'Red Team',
    publishedAt: '2026-03-16',
    dateText: '16 de marzo de 2026',
    readTime: '7 min',
    author: damian,
    tags: ['inteligencia artificial', 'ciberseguridad', 'agentic ai', 'pymes', 'hacking'],
    imageUrl:
      'https://cdn.sanity.io/images/7zdc8w7a/production/27a9999b752ad04fdde20fa15215251650965b8a-1024x1024.png?w=800&auto=format',
    body: BODIES['agentic-ai-nueva-amenaza-ciberseguridad-empresas'],
  },
  {
    slug: 'nis2-guia-completa',
    title: 'NIS2: qué es, a quién afecta y cómo prepararse',
    excerpt:
      'La nueva directiva europea de ciberseguridad NIS2 ya está en vigor. Te explicamos sus requisitos y cómo cumplirla.',
    category: 'Compliance',
    publishedAt: '2026-01-20',
    dateText: '20 de enero de 2026',
    readTime: '10 min',
    author: diego,
    tags: ['NIS2', 'compliance', 'normativa', 'Europa', 'ciberseguridad'],
    image: imgNis2,
    body: BODIES['nis2-guia-completa'],
  },
  {
    slug: 'owasp-top-10-2021',
    title: 'OWASP Top 10 en 2021: vulnerabilidades web críticas',
    excerpt:
      'Analizamos las 10 vulnerabilidades más explotadas en aplicaciones web según OWASP y cómo protegerte ante ellas.',
    category: 'Seguridad Web',
    publishedAt: '2025-10-03',
    dateText: '3 de octubre de 2025',
    readTime: '12 min',
    author: damian,
    tags: ['OWASP', 'vulnerabilidades', 'seguridad web', 'desarrollo seguro', 'API'],
    image: imgOwasp,
    body: BODIES['owasp-top-10-2021'],
  },
  {
    slug: 'que-es-pentesting-empresa-2026',
    title: 'Qué es el pentesting y por qué tu empresa lo necesita en 2026',
    excerpt:
      'Descubre cómo una auditoría de seguridad ofensiva puede proteger tu negocio de las amenazas más críticas del panorama actual.',
    category: 'Pentesting',
    publishedAt: '2025-06-12',
    dateText: '12 de junio de 2025',
    readTime: '8 min',
    author: damian,
    tags: ['pentesting', 'ciberseguridad', 'auditoría', 'OWASP', 'empresas'],
    image: imgPentesting,
    body: BODIES['que-es-pentesting-empresa-2026'],
  },
];

export function getSortedPosts(): BlogPost[] {
  return [...BLOG_POSTS].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getRelatedPosts(slug: string, limit = 2): BlogPost[] {
  const current = getPost(slug);
  const others = getSortedPosts().filter((p) => p.slug !== slug);
  const sameCat = others.filter((p) => current && p.category === current.category);
  const rest = others.filter((p) => !current || p.category !== current.category);
  return [...sameCat, ...rest].slice(0, limit);
}
