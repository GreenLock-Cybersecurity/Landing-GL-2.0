# GreenLock leads Worker

## Despliegue
```
npm i -g wrangler
wrangler login
wrangler kv namespace create RATE        # copia el id en wrangler.toml
wrangler secret put CRM_URL              # https://tu-crm.up.railway.app/api/leads
wrangler secret put CRM_API_KEY          # openssl rand -hex 32
wrangler secret put TURNSTILE_SECRET     # opcional, de dash.cloudflare.com > Turnstile
wrangler deploy
```
Pon la URL del Worker en la landing (`LEADS_URL`).

## Endpoints
- `POST /lead/informe` → `{ domain, email, name, website, token }`
- `POST /lead/partner` → `{ tipo, empresa, email, website, token }`

`website` es el honeypot (debe ir vacío).

## Verificación en el CRM (Node/Express)
```js
const crypto = require('crypto');
app.post('/api/leads', express.raw({ type: 'application/json' }), (req, res) => {
  const ts = req.get('X-Timestamp'), sig = req.get('X-Signature') || '';
  if (req.get('X-Api-Key') !== process.env.CRM_API_KEY) return res.sendStatus(401);
  if (Math.abs(Date.now() / 1000 - Number(ts)) > 300) return res.sendStatus(401);
  const expected = crypto.createHmac('sha256', process.env.CRM_API_KEY).update(`${ts}.${req.body}`).digest('hex');
  if (sig.length !== expected.length || !crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return res.sendStatus(401);
  const lead = JSON.parse(req.body);
  // guardar lead...
  res.json({ ok: true });
});
```
