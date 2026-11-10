import { describe, expect, test } from "bun:test";
import { applySearchIndexPolicy, isPlatformSearchHost } from "./search-index-policy";

describe("platform hostname search policy", () => {
  for (const suffix of ["lovable.app", "workers.dev", "pages.dev", "netlify.app"]) {
    test(`${suffix}: every nested HTML path is public but noindex`, async () => {
      for (const host of [`project.${suffix}`, `draft.project.${suffix}`, `PROJECT.${suffix}.`]) {
        expect(isPlatformSearchHost(host)).toBe(true);
        for (const path of ["/", "/en/reviews", "/ko/tours/seattle-2-day", "/admin"]) {
          const result = applySearchIndexPolicy(new Request(`https://${host}${path}`), new Response("<html>unchanged</html>", {
            headers: { "Content-Type": "text/html; charset=utf-8", "Set-Cookie": "public-test=1; Path=/" },
          }));
          expect(result.status).toBe(200);
          expect(result.headers.get("x-robots-tag")).toBe("noindex");
          expect(result.headers.get("location")).toBeNull();
          expect(result.headers.get("set-cookie")).toBe("public-test=1; Path=/");
          expect(await result.text()).toBe("<html>unchanged</html>");
        }
      }
    });
  }

  test("custom domains and suffix lookalikes retain their exact existing rules", () => {
    for (const host of ["www.shootingstartravel.ca", "shootingstartravel.ca", "localhost", "lovable.app.example.org", "notlovable.app"]) {
      expect(isPlatformSearchHost(host)).toBe(false);
      for (const existing of [undefined, "index, follow", "noindex, nofollow"]) {
        const headers = new Headers({ "Content-Type": "text/html" });
        if (existing) headers.set("X-Robots-Tag", existing);
        const original = new Response("unchanged", { headers });
        expect(applySearchIndexPolicy(new Request(`https://${host}/reviews`), original)).toBe(original);
        expect(original.headers.get("x-robots-tag")).toBe(existing ?? null);
      }
    }
  });

  test("forwarded host cannot apply or bypass the policy", () => {
    const custom = new Response("html", { headers: { "Content-Type": "text/html" } });
    expect(applySearchIndexPolicy(new Request("https://www.shootingstartravel.ca/", { headers: { "X-Forwarded-Host": "project.lovable.app" } }), custom)).toBe(custom);
    const platform = applySearchIndexPolicy(new Request("https://project.lovable.app/", { headers: { "X-Forwarded-Host": "www.shootingstartravel.ca" } }), custom);
    expect(platform.headers.get("x-robots-tag")).toBe("noindex");
  });

  test("assets, APIs, robots and sitemap responses remain unchanged", () => {
    for (const type of ["application/json", "application/xml", "text/plain", "text/css", "image/jpeg"]) {
      const original = new Response("unchanged", { headers: { "Content-Type": type } });
      expect(applySearchIndexPolicy(new Request("https://project.pages.dev/sitemap.xml"), original)).toBe(original);
    }
  });

  test("HTML errors and existing crawler restrictions are preserved", async () => {
    for (const status of [404, 500]) {
      const result = applySearchIndexPolicy(new Request("https://project.workers.dev/missing"), new Response("error", {
        status, headers: { "Content-Type": "application/xhtml+xml", "X-Robots-Tag": "nofollow" },
      }));
      expect(result.status).toBe(status);
      expect(result.headers.get("x-robots-tag")).toBe("nofollow, noindex");
      expect(await result.text()).toBe("error");
    }
  });
});