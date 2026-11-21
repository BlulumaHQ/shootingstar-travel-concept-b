import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";
import { applySearchIndexPolicy } from "./lib/search-index-policy";
import { KOREAN_ENABLED } from "./i18n/locale";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => ((m as { default?: ServerEntry }).default ?? (m as unknown as ServerEntry)),
    );
  }
  return serverEntryPromise;
}

function brandedErrorResponse(): Response {
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isCatastrophicSsrErrorBody(body: string, responseStatus: number): boolean {
  let payload: unknown;
  try {
    payload = JSON.parse(body);
  } catch {
    return false;
  }

  if (!payload || Array.isArray(payload) || typeof payload !== "object") {
    return false;
  }

  const fields = payload as Record<string, unknown>;
  const expectedKeys = new Set(["message", "status", "unhandled"]);
  if (!Object.keys(fields).every((key) => expectedKeys.has(key))) {
    return false;
  }

  return (
    fields.unhandled === true &&
    fields.message === "HTTPError" &&
    (fields.status === undefined || fields.status === responseStatus)
  );
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isCatastrophicSsrErrorBody(body, response.status)) {
    return response;
  }

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return brandedErrorResponse();
}

/** While Korean is closed, send /ko/* to the matching English page (302 = temporary). */
function koreanRedirect(request: Request): Response | null {
  if (KOREAN_ENABLED) return null;
  const url = new URL(request.url);
  if (url.pathname !== "/ko" && !url.pathname.startsWith("/ko/")) return null;
  const rest = url.pathname.slice(3); // "" or "/tours/..."
  url.pathname = `/en${rest}`;
  return Response.redirect(url.toString(), 302);
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    const ko = koreanRedirect(request);
    if (ko) return ko;
    try {
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return applySearchIndexPolicy(request, await normalizeCatastrophicSsrResponse(response));
    } catch (error) {
      console.error(error);
      return applySearchIndexPolicy(request, brandedErrorResponse());
    }
  },
};
