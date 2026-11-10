/** Match DNS suffix boundaries, never caller-provided forwarding headers. */
export function isPlatformSearchHost(hostname: string): boolean {
  const host = hostname.toLowerCase().replace(/\.+$/, "");
  return ["lovable.app", "workers.dev", "pages.dev", "netlify.app"].some(
    (suffix) => host.endsWith(`.${suffix}`),
  );
}

/** Preserve the body stream, status, cookies and all existing crawler rules. */
export function applySearchIndexPolicy(request: Request, response: Response): Response {
  if (!isPlatformSearchHost(new URL(request.url).hostname)) return response;
  const contentType = (response.headers.get("content-type") ?? "").split(";", 1)[0].trim().toLowerCase();
  if (contentType !== "text/html" && contentType !== "application/xhtml+xml") return response;

  const headers = new Headers(response.headers);
  headers.append("X-Robots-Tag", "noindex");
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}