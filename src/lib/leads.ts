// ============================================================================
// GreenLock — Envío de leads al Worker de Cloudflare (greenlock-leads), que los
// valida y los reenvía al CRM. Las opciones y los límites deben coincidir con
// los que valida el Worker: si no, responde 400.
// ============================================================================

/** Modo de la interfaz: qué formulario se ha rellenado. */
export type LeadMode = 'asesoria' | 'osint' | 'auditoria' | 'partner' | 'informe';

/** Endpoint del Worker: POST /lead/{type}. */
type LeadType = 'informe' | 'partner' | 'osint' | 'auditoria';

const LEADS_URL = (
  import.meta.env.PUBLIC_LEADS_URL || 'https://greenlock-leads.greenlockspain.workers.dev'
).replace(/\/$/, '');

/** Longitud máxima de cada campo (los mismos `maxlength` van en los inputs). */
export const LEAD_LIMITS = {
  domain: 120,
  name: 100,
  email: 160,
  empresa: 140,
  phone: 30,
  message: 1000,
} as const;

/** Opciones de selección única de cada modal. `tipo`, `caso` y `servicio` solo admiten estos valores. */
export const LEAD_OPTIONS = {
  asesoria: [
    'Ciberseguridad: proteger mi empresa de ataques',
    'Ciberinteligencia: investigar una estafa, fraude o suplantación',
    'No lo sé, quiero que me asesoréis',
  ],
  osint: ['Estafa o fraude online', 'Suplantación de marca', 'Perfilado y reputación', 'Otro'],
  auditoria: ['Auditoría perimetral', 'Pentesting', 'Red Team', 'Ciberseguridad continua', 'No lo sé'],
  partner: ['Despacho / Compliance', 'Consultora', 'MSSP / IT'],
} as const;

// El asesoramiento viaja como una auditoría «No lo sé»; la opción elegida va
// como prefijo del mensaje para que el CRM sepa qué pidió.
const ASESORIA_TAGS = ['Ciberseguridad', 'Ciberinteligencia', 'No lo sabe'];

type Values = Record<string, string>;

function buildLead(mode: LeadMode, v: Values, option: number): { type: LeadType; data: Values } {
  switch (mode) {
    case 'informe':
      return { type: 'informe', data: { domain: v.domain, email: v.email, name: v.name } };
    case 'partner':
      return {
        type: 'partner',
        data: { tipo: LEAD_OPTIONS.partner[option], name: v.name, empresa: v.empresa, email: v.email },
      };
    case 'osint':
      return {
        type: 'osint',
        data: { caso: LEAD_OPTIONS.osint[option], name: v.name, email: v.email, phone: v.phone, message: v.message },
      };
    case 'auditoria':
      return {
        type: 'auditoria',
        data: {
          servicio: LEAD_OPTIONS.auditoria[option],
          name: v.name,
          empresa: v.empresa,
          email: v.email,
          phone: v.phone,
          message: v.message,
        },
      };
    case 'asesoria':
      return {
        type: 'auditoria',
        data: {
          servicio: 'No lo sé',
          name: v.name,
          empresa: v.empresa,
          email: v.email,
          phone: v.phone,
          message: `[Asesoramiento sin compromiso · ${ASESORIA_TAGS[option]}] ${v.message}`.trim(),
        },
      };
  }
}

function leadMeta(): Values {
  try {
    const q = new URLSearchParams(location.search);
    const utm = (k: string) => (q.get(k) || '').slice(0, 100);
    return {
      page: location.href.slice(0, 300),
      referrer: (document.referrer || '').slice(0, 300),
      utm_source: utm('utm_source'),
      utm_medium: utm('utm_medium'),
      utm_campaign: utm('utm_campaign'),
    };
  } catch {
    return {};
  }
}

/**
 * Envía un formulario. `values` son los campos tal cual (incluido el honeypot
 * `website`) y `option` el índice de la opción marcada. Devuelve true solo si
 * el Worker responde 200; en ese caso registra `lead_submit` en el dataLayer.
 */
export async function submitLead(mode: LeadMode, values: Values, option = 0): Promise<boolean> {
  const v: Values = {};
  for (const [k, val] of Object.entries(values)) v[k] = (val || '').trim();
  const { type, data } = buildLead(mode, v, option);

  try {
    const res = await fetch(`${LEADS_URL}/lead/${type}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...leadMeta(), ...data, website: v.website || '', token: '' }),
    });
    if (res.status !== 200) return false;
  } catch {
    return false;
  }

  const w = window as unknown as { dataLayer?: unknown[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event: 'lead_submit', lead_type: mode });
  return true;
}
