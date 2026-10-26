// GreenLock · Cloudflare Worker: recibe formularios de la landing, filtra y reenvía al CRM.
// Secrets (wrangler secret put): CRM_URL, CRM_API_KEY, TURNSTILE_SECRET (opcional)
// Vars: ALLOWED_ORIGINS="https://greenlock.tech,https://www.greenlock.tech"
// KV binding: RATE (rate limit por IP)

const SCHEMAS = {
  informe: { domain: 120, email: 160, name: 100 },
  partner: { tipo: 60, empresa: 140, email: 160 },
  osint: { caso: 60, name: 100, email: 160, message: 1000 },
  auditoria: { servicio: 60, name: 100, empresa: 140, email: 160 },
};
const META = { page: 300, referrer: 300, utm_source: 100, utm_medium: 100, utm_campaign: 100 };
const OPTIONAL = {
  informe: { phone: 30, scan: 900, ...META },
  partner: { name: 100, phone: 30, ...META },
  osint: { phone: 30, ...META },
  auditoria: { phone: 30, message: 1000, ...META },
};
const LISTS = {
  tipo: ['Despacho / Compliance', 'Consultora', 'MSSP / IT'],
  caso: ['Estafa o fraude online', 'Suplantación de marca', 'Perfilado y reputación', 'Otro'],
  servicio: ['Auditoría perimetral', 'Pentesting', 'Red Team', 'Ciberseguridad continua', 'No lo sé'],
};
const EMAIL_RE = /^[^\s@]{1,64}@[^\s@]+\.[a-z]{2,}$/i;
const DOMAIN_RE = /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,}(\/.*)?$/i;
const LIMIT = 5, WINDOW = 3600;

export default {
  async fetch(req, env) {
    const origin = req.headers.get('Origin') || '';
    const allowed = (env.ALLOWED_ORIGINS || '').split(',').map(s => s.trim());
    const cors = {
      'Access-Control-Allow-Origin': allowed.includes(origin) ? origin : allowed[0] || '',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Vary': 'Origin',
    };
    const out = (status, ok) => new Response(JSON.stringify({ ok }), { status, headers: { ...cors, 'Content-Type': 'application/json' } });

    if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
    if (req.method !== 'POST' || !allowed.includes(origin)) return out(403, false);

    const type = new URL(req.url).pathname.replace(/^\/lead\//, '');
    const schema = SCHEMAS[type];
    if (!schema) return out(404, false);

    let body;
    try { body = await req.json(); } catch { return out(400, false); }

    // Honeypot: si viene relleno, fingimos éxito y descartamos
    if (body.website) return out(200, true);

    const ip = req.headers.get('CF-Connecting-IP') || '0';

    // Turnstile
    if (env.TURNSTILE_SECRET) {
      const fd = new FormData();
      fd.append('secret', env.TURNSTILE_SECRET);
      fd.append('response', body.token || '');
      fd.append('remoteip', ip);
      const v = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body: fd }).then(r => r.json()).catch(() => ({}));
      if (!v.success) return out(403, false);
    }

    // Rate limit
    if (env.RATE) {
      const key = `rl:${ip}`;
      const n = parseInt(await env.RATE.get(key) || '0', 10);
      if (n >= LIMIT) return out(429, false);
      await env.RATE.put(key, String(n + 1), { expirationTtl: WINDOW });
    }

    // Validación + whitelist de campos
    const lead = {};
    for (const [k, max] of Object.entries(schema)) {
      const v = String(body[k] ?? '').trim();
      if (!v || v.length > max) return out(400, false);
      lead[k] = v;
    }
    for (const [k, max] of Object.entries(OPTIONAL[type] || {})) { const v = String(body[k] ?? '').trim(); if (v) lead[k] = v.slice(0, max); }
    if (!EMAIL_RE.test(lead.email)) return out(400, false);
    if (lead.domain && !DOMAIN_RE.test(lead.domain)) return out(400, false);
    for (const [k, list] of Object.entries(LISTS)) if (lead[k] && !list.includes(lead[k])) return out(400, false);

    const payload = { type, ...lead, source: 'landing', ip, receivedAt: new Date().toISOString() };
    const raw = JSON.stringify(payload);
    const ts = Math.floor(Date.now() / 1000).toString();
    const sig = await hmac(env.CRM_API_KEY, `${ts}.${raw}`);

    const res = await fetch(env.CRM_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Api-Key': env.CRM_API_KEY, 'X-Timestamp': ts, 'X-Signature': sig },
      body: raw,
    }).catch(() => null);

    return res && res.ok ? out(200, true) : out(502, false);
  },
};

async function hmac(secret, msg) {
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const buf = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(msg));
  return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
}
