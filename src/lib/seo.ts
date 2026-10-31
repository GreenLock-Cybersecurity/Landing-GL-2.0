// Helpers de datos estructurados (JSON-LD) para las páginas de servicio y de caso.
export interface Crumb {
  label: string;
  href?: string;
}

const SITE = 'https://greenlock.tech';

/** BreadcrumbList a partir de las migas de pan; la última es la página actual (`path`). */
export function breadcrumbSchema(crumbs: Crumb[], path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.label,
      item: new URL(c.href ?? path, SITE).href,
    })),
  };
}
