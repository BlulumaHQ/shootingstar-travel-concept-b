# Domain-aware search indexing

The existing TanStack Start server entry applies `X-Robots-Tag: noindex` to HTML and XHTML responses whose incoming URL hostname is a subdomain of `lovable.app`, `workers.dev`, `pages.dev`, or `netlify.app`. Matching is case-insensitive, handles a trailing DNS dot, and checks suffix boundaries. Request forwarding headers do not control this policy.

All other domains receive the original response, including their existing crawler restrictions. The policy does not change routes, access controls, redirects, content, canonical URLs, sitemap, robots.txt, or visuals. Existing `/admin` noindex remains intact. It preserves streamed response bodies, status, and existing headers.

## Deployment and coverage limits

- Publish changes to deploy the server policy. Any external server deployment must also redeploy this code.
- `build:static` explicitly deletes the server and produces one static HTML document. This policy cannot operate there. Cloudflare Pages or Netlify static hosting needs a hostname-aware edge function/proxy that applies the same rule after obtaining an HTML response. Do not use global `_headers` or embed unconditional noindex in the export: either would also affect custom domains.
- HTML served directly from platform-owned assets, prerender caches, authentication screens or hosting error pages can bypass this server. These require platform-side hostname-aware handling; this project cannot claim coverage for them without checking their actual public responses.
- Keep robots.txt crawlable so crawlers can read noindex. Do not add `Disallow: /`.
- Shared caches must remain separated by hostname; a custom-domain response must never be served a cached platform-domain header.

## Inspection on November 10, 2026

- Project URL lookup reports this project unpublished and no connected custom domains. The source's existing canonical and sitemap domain is `https://www.shootingstartravel.ca`; it was preserved, not treated as a verified deployment of this project.
- Anonymous GETs to the known preview `/` and `/en/reviews` return platform-controlled HTTP 401 with `X-Robots-Tag: noindex, nofollow`, not publicly accessible application HTML.
- The unpublished `shootingstar-travel-concept-b.lovable.app` `/` and `/en/reviews` return platform-controlled HTTP 404 HTML without noindex. This server edit cannot modify those unpublished hosting responses.
- No actual `workers.dev`, `pages.dev`, or `netlify.app` project address was supplied or discovered. Coverage on those platforms is code-tested only, not verified on public deployments.
- Eight policy tests pass, including all four suffixes, nested paths, public status/body preservation, custom-domain pass-through, forwarded-host spoofing, non-HTML exclusion and HTML errors. The automatic project build passes.
- Live localhost GETs return 200 for `/`, `/en/reviews`, `/ko/tours/seattle-2-day` and `/admin`; the missing page returns 404. Localhost receives no added noindex, canonical URLs remain unchanged, `/admin` retains its existing noindex, robots.txt is crawlable, and sitemap.xml remains XML.
- Simulated external Host headers are rejected by Vite's existing development host allowlist before the application runs (403 text/plain). No allowlist or access policy was changed to bypass that restriction; these requests do not verify deployed hostname handling.

After publishing, verify anonymous GETs on the platform homepage, localized nested pages, direct tour links, admin shell and missing-page HTML. Check status, content type and `X-Robots-Tag`, then check the real connected custom domain has no newly added noindex and retains its canonical/sitemap/robots policies. Public shared previews can be used for a separate anonymous preview check; the ordinary private preview remains subject to Lovable's existing access gate.