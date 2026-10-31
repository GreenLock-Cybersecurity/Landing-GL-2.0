// ============================================================================
// GreenLock — Envío de leads al Worker de Cloudflare (greenlock-leads), que los
// valida y los reenvía al CRM. Las opciones y los límites deben coincidir con
// los que valida el Worker: si no, responde 400.
// ============================================================================

/** Modo de la interfaz: qué formulario se ha rellenado. */
export type LeadMode = 'osint' | 'auditoria' | 'partner' | 'informe';

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

/**
 * Opciones de selección única de cada modal: `label` es lo que se ve y `value`
 * lo que valida el Worker (`tipo`, `caso` y `servicio` solo admiten esos valores).
 */
export const LEAD_OPTIONS = {
  osint: [
    { label: 'Estafa o fraude online', value: 'Estafa o fraude online' },
    { label: 'Suplantación de marca', value: 'Suplantación de marca' },
    { label: 'Cuentas anónimas y acoso', value: 'Perfilado y reputación' },
    { label: 'Otro', value: 'Otro' },
  ],
  auditoria: [
    { label: 'Ciberseguridad gestionada', value: 'Ciberseguridad gestionada' },
    { label: 'Auditoría perimetral', value: 'Auditoría perimetral' },
    { label: 'Pentesting', value: 'Pentesting' },
    { label: 'Red Team', value: 'Red Team' },
    { label: 'Ciberseguridad ofensiva continua', value: 'Ciberseguridad ofensiva continua' },
    { label: 'Concienciación y phishing simulado', value: 'Concienciación y phishing simulado' },
    { label: 'No lo sé', value: 'No lo sé' },
  ],
  partner: [
    { label: 'Despacho / Compliance', value: 'Despacho / Compliance' },
    { label: 'Consultora', value: 'Consultora' },
    { label: 'MSSP / IT', value: 'MSSP / IT' },
  ],
} as const;

type Values = Record<string, string>;

/** Campo propio de cada tipo, además de nombre, email, teléfono y mensaje. */
const OPTION_FIELD = { osint: 'caso', auditoria: 'servicio', partner: 'tipo' } as const;

function leadMeta(): Values {
  try {
    const q = new URLSearchParams(location.search);
    const param = (k: string, max = 100) => (q.get(k) || '').slice(0, max);
    return {
      page: location.href.slice(0, 300),
      referrer: (document.referrer || '').slice(0, 300),
      utm_source: param('utm_source'),
      utm_medium: param('utm_medium'),
      utm_campaign: param('utm_campaign'),
      gclid: param('gclid', 200),
    };
  } catch {
    return {};
  }
}

/**
 * Envía un formulario. `values` son los campos tal cual (incluido el honeypot
 * `website`) y `option` el índice de la opción marcada, si el tipo la tiene.
 * Devuelve true solo si el Worker responde 200; en ese caso registra
 * `lead_<tipo>` en el dataLayer para GTM y Google Ads.
 */
export async function submitLead(mode: LeadMode, values: Values, option = 0): Promise<boolean> {
  const data: Values = {};
  for (const [k, val] of Object.entries(values)) data[k] = (val || '').trim();

  if (mode !== 'informe') {
    const opts = LEAD_OPTIONS[mode];
    data[OPTION_FIELD[mode]] = (opts[option] ?? opts[0]).value;
  }

  try {
    const res = await fetch(`${LEADS_URL}/lead/${mode}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...leadMeta(), ...data, website: data.website || '', token: '' }),
    });
    if (res.status !== 200) return false;
  } catch {
    return false;
  }

  const detail = mode === 'informe' ? '' : data[OPTION_FIELD[mode]];
  const w = window as unknown as { dataLayer?: unknown[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event: `lead_${mode}`, lead_type: mode, lead_detail: detail, ...(data.variante ? { variante: data.variante } : {}) });
  return true;
}
