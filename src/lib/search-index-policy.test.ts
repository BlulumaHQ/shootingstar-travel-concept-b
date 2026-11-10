import { describe, test } from "node:test";
import { strict as assert } from "node:assert";
import { applySearchIndexPolicy, isPlatformSearchHost } from "./search-index-policy";

describe("platform hostname search policy", () => {
  for (const suffix of ["lovable.app", "workers.dev", "pages.dev", "netlify.app"]) {
    test(`${suffix}: every nested HTML path is public but noindex`, async () => {
      for (const host of [`project.${suffix}`, `draft.project.${suffix}`, `PROJECT.${suffix}.`]) {
        assert.equal(isPlatformSearchHost(host), true);
        for (const path of ["/", "/en/reviews", "/ko/tours/seattle-2-day", "/admin"]) {
          const result = applySearchIndexPolicy(new Request(`https://${host}${path}`), new Response("<html>unchanged</html>", {
            headers: { "Content-Type": "text/html; charset=utf-8", "Set-Cookie": "public-test=1; Path=/" },
          }));
          assert.equal(result.status, 200);
          assert.equal(result.headers.get("x-robots-tag"), "noindex");
          assert.equal(result.headers.get("location"), null);
          assert.equal(result.headers.get("set-cookie"), "public-test=1; Path=/");
          assert.equal(await result.text(), "<html>unchanged</html>");
        }
      }
    });
  }

  test("custom domains and suffix lookalikes retain their exact existing rules", () => {
    for (const host of ["www.shootingstartravel.ca", "shootingstartravel.ca", "localhost", "lovable.app.example.org", "notlovable.app"]) {
      assert.equal(isPlatformSearchHost(host), false);
      for (const existing of [undefined, "index, follow", "noindex, nofollow"]) {
        const headers = new Headers({ "Content-Type": "text/html" });
        if (existing) headers.set("X-Robots-Tag", existing);
        const original = new Response("unchanged", { headers });
        assert.equal(applySearchIndexPolicy(new Request(`https://${host}/reviews`), original), original);
        assert.equal(original.headers.get("x-robots-tag"), existing ?? null);
      }
    }
  });

  test("forwarded host cannot apply or bypass the policy", () => {
    const custom = new Response("html", { headers: { "Content-Type": "text/html" } });
    assert.equal(applySearchIndexPolicy(new Request("https://www.shootingstartravel.ca/", { headers: { "X-Forwarded-Host": "project.lovable.app" } }), custom), custom);
    const platform = applySearchIndexPolicy(new Request("https://project.lovable.app/", { headers: { "X-Forwarded-Host": "www.shootingstartravel.ca" } }), custom);
    assert.equal(platform.headers.get("x-robots-tag"), "noindex");
  });

  test("assets, APIs, robots and sitemap responses remain unchanged", () => {
    for (const type of ["application/json", "application/xml", "text/plain", "text/css", "image/jpeg"]) {
      const original = new Response("unchanged", { headers: { "Content-Type": type } });
      assert.equal(applySearchIndexPolicy(new Request("https://project.pages.dev/sitemap.xml"), original), original);
    }
  });

  test("HTML errors and existing crawler restrictions are preserved", async () => {
    for (const status of [404, 500]) {
      const result = applySearchIndexPolicy(new Request("https://project.workers.dev/missing"), new Response("error", {
        status, headers: { "Content-Type": "application/xhtml+xml", "X-Robots-Tag": "nofollow" },
      }));
      assert.equal(result.status, status);
      assert.equal(result.headers.get("x-robots-tag"), "nofollow, noindex");
      assert.equal(await result.text(), "error");
    }
  });
});