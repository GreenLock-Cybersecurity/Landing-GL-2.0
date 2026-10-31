// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import tailwindCSSFix from './tailwind-vite-fix.mjs';

export default defineConfig({
  site: 'https://greenlock.tech',
  output: 'static',
  compressHTML: true,
  build: {
    format: 'directory',
  },
  prefetch: {
    defaultStrategy: 'viewport',
  },
  image: {
    domains: ['cdn.sanity.io'],
  },
  integrations: [
    sitemap({
      filter: (page) =>
        !/\/legal\/(aviso-legal|privacidad|cookies)/.test(page) &&
        !page.includes('/404') &&
        !page.includes('/gracias') &&
        // Landings de Google Ads: noindex y fuera del sitemap
        !page.includes('/ciberinteligencia/caso/'),
      i18n: {
        defaultLocale: 'es',
        locales: {
          es: 'es-ES',
        },
      },
      serialize(item) {
        // Priorities by content type
        if (item.url === 'https://greenlock.tech/') {
          item.priority = 1.0;
          item.changefreq = 'weekly';
        } else if (item.url.includes('/ciberseguridad/') || item.url.includes('/ciberinteligencia/')) {
          // Hubs y páginas de servicio o de caso
          item.priority = 0.9;
          item.changefreq = 'monthly';
        } else if (
          item.url.includes('/sectores/') &&
          !item.url.endsWith('/sectores/')
        ) {
          item.priority = 0.8;
          item.changefreq = 'monthly';
        } else if (item.url.endsWith('/sectores/')) {
          item.priority = 0.8;
          item.changefreq = 'monthly';
        } else if (item.url.includes('/casos-exito/')) {
          item.priority = 0.8;
          item.changefreq = 'monthly';
        } else if (item.url.includes('/sobre-nosotros')) {
          item.priority = 0.7;
          item.changefreq = 'monthly';
        } else if (item.url.includes('/contacto') || item.url.includes('/solicitar-auditoria')) {
          item.priority = 0.7;
          item.changefreq = 'monthly';
        } else if (item.url.includes('/recursos/blog/') && !item.url.endsWith('/blog/')) {
          item.priority = 0.8;
          item.changefreq = 'monthly';
        } else if (item.url.includes('/recursos/blog')) {
          item.priority = 0.7;
          item.changefreq = 'weekly';
        } else if (item.url.includes('/recursos/glosario')) {
          item.priority = 0.7;
          item.changefreq = 'monthly';
        } else if (item.url.includes('/cumplimiento-nis2') || item.url.includes('/pentesting-empresa') || item.url.includes('/ciberseguridad-360')) {
          item.priority = 0.9;
          item.changefreq = 'monthly';
        } else {
          item.priority = 0.5;
          item.changefreq = 'monthly';
        }
        return item;
      },
    }),
    react(),
  ],
  vite: {
    plugins: [...tailwindCSSFix()],
  },
});
