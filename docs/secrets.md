# Server Secrets

Server-side secrets are read at runtime from `process.env` inside the
Cloudflare Worker (see `src/routes/api/rezdy.*.ts`).

## Required secrets

| Name             | Used by                                    | Notes                              |
| ---------------- | ------------------------------------------ | ---------------------------------- |
| `REZDY_API_KEY`  | `src/routes/api/rezdy.*.ts` (availability, | Rezdy Booking API key (Production) |
|                  | create-booking, victoria-availability)     |                                    |
| `LOVABLE_API_KEY`| Lovable AI Gateway (managed)               | Auto-managed, do not edit          |

## How secrets are bound to the Worker

This project deploys via Lovable's Cloudflare integration. Secrets added through
Lovable (Project Settings → Secrets, or the agent's secrets tool) are injected
into the Worker's runtime environment on **every** deployment and are available
as `process.env.<NAME>`.

**Do NOT** hardcode secret values in `wrangler.jsonc`, source code, or `.env`
files committed to the repo. `wrangler.jsonc` intentionally does not declare
`[vars]` for secrets — declaring a secret name there with no value would
shadow the runtime binding.

## Rotating / updating `REZDY_API_KEY`

1. Open Project Settings → Secrets (or ask the agent to call `update_secret`).
2. Paste the new key value.
3. Redeploy. The new value is bound to the next Worker deployment automatically.

## Verifying

After deploy, hit:

```
GET https://<your-domain>/api/rezdy/availability?productCode=PEHQ9W
```

A successful response returns `{ "success": true, "sessions": [...] }`. A 500
with `"Server is missing Rezdy credentials."` means the secret is not bound —
re-check Project Settings → Secrets and redeploy.
