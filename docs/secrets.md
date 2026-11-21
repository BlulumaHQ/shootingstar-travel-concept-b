# Server Secrets

Server-side secrets are read at runtime from `process.env` inside the
Cloudflare Worker.

## Required secrets

| Name                 | Used by                     | Notes                                                                 |
| -------------------- | --------------------------- | --------------------------------------------------------------------- |
| `RESEND_API_KEY`     | `src/routes/api/contact.ts` | Resend API key (client's own Resend account)                          |
| `CONTACT_TO_EMAIL`   | `src/routes/api/contact.ts` | Where enquiries are delivered, e.g. `info@shootingstartravel.ca` (comma-separate for several) |
| `CONTACT_FROM_EMAIL` | `src/routes/api/contact.ts` | Verified sender, e.g. `Shooting Star Travel <noreply@send.shootingstartravel.ca>` |
| `LOVABLE_API_KEY`    | Lovable AI Gateway (managed)| Auto-managed, do not edit                                             |

`REZDY_API_KEY` is no longer needed by the site: the custom availability /
product / create-booking endpoints were retired (Nov 2026). All booking and
payment happens on Rezdy's hosted checkout and calendar widget, which need no
API key. `/api/rezdy/create-booking` still answers 410 so old clients fail
loudly instead of creating unpaid bookings.

## How secrets are bound to the Worker

Secrets added through Lovable (Project Settings → Secrets) or as Cloudflare
Worker secrets are injected into the Worker's runtime environment on every
deployment and are available as `process.env.<NAME>`.

**Do NOT** hardcode secret values in `wrangler.jsonc`, source code, or `.env`
files committed to the repo. `wrangler.jsonc` intentionally does not declare
`[vars]` for secrets — declaring a secret name there with no value would
shadow the runtime binding.

## Verifying the contact form

Until all three contact secrets are set, `/api/contact` answers 503 and the
contact page shows an error with the phone / WhatsApp / email links — it never
shows a fake "message sent". After setting them, send one real test enquiry
from the live site and confirm it arrives in the `CONTACT_TO_EMAIL` inbox.
