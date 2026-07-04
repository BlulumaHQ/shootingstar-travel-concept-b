import { createFileRoute } from "@tanstack/react-router";

type RezdyPriceOption = {
  label?: string;
  price?: number;
  seatsUsed?: number;
  minQuantity?: number;
  maxQuantity?: number;
  priceGroupType?: string;
};

type RezdySession = {
  id?: number | string;
  startTimeLocal?: string;
  endTimeLocal?: string;
  startTime?: string;
  endTime?: string;
  allDay?: boolean;
  seatsAvailable?: number;
  priceOptions?: RezdyPriceOption[];
};

export const Route = createFileRoute("/api/rezdy/availability")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const apiKey = process.env.REZDY_API_KEY;
        if (!apiKey) {
          return Response.json(
            { success: false, message: "Server is missing Rezdy credentials." },
            { status: 500 },
          );
        }

        const url = new URL(request.url);
        const productCode = url.searchParams.get("productCode")?.trim();
        if (!productCode) {
          return Response.json(
            { success: false, message: "Missing productCode query parameter." },
            { status: 400 },
          );
        }

        try {
          const start = new Date();
          const end = new Date();
          end.setDate(end.getDate() + 365);
          const fmt = (d: Date) => d.toISOString().slice(0, 10);

          const rezdyUrl = new URL("https://api.rezdy.com/v1/availability");
          rezdyUrl.searchParams.set("apiKey", apiKey);
          rezdyUrl.searchParams.set("productCode", productCode);
          rezdyUrl.searchParams.set("startTimeLocal", `${fmt(start)} 00:00:00`);
          rezdyUrl.searchParams.set("endTimeLocal", `${fmt(end)} 23:59:59`);

          const productUrl = new URL(
            `https://api.rezdy.com/v1/products/${encodeURIComponent(productCode)}`,
          );
          productUrl.searchParams.set("apiKey", apiKey);

          const [res, productRes] = await Promise.all([
            fetch(rezdyUrl.toString(), { headers: { Accept: "application/json" } }),
            fetch(productUrl.toString(), { headers: { Accept: "application/json" } }),
          ]);

          if (!res.ok) {
            const text = await res.text().catch(() => "");
            return Response.json(
              {
                success: false,
                message: "Unable to load tour availability from Rezdy.",
                details: `Rezdy responded ${res.status} ${res.statusText}${text ? `: ${text.slice(0, 200)}` : ""}`,
              },
              { status: 502 },
            );
          }

          const data = (await res.json()) as {
            sessions?: RezdySession[];
            requestStatus?: { success?: boolean; error?: { errorMessage?: string } };
          };

          if (data.requestStatus && data.requestStatus.success === false) {
            return Response.json(
              {
                success: false,
                message: "Unable to load tour availability from Rezdy.",
                details: data.requestStatus.error?.errorMessage ?? "Rezdy request failed.",
              },
              { status: 502 },
            );
          }

          // Build product-level priceOptions map keyed by label (case-insensitive)
          // as a fallback for min/max/priceGroupType when a session omits them.
          const productLevelByLabel = new Map<
            string,
            { minQuantity?: number; maxQuantity?: number; priceGroupType?: string }
          >();
          if (productRes.ok) {
            const productJson = (await productRes.json().catch(() => ({}))) as {
              product?: { priceOptions?: RezdyPriceOption[] };
            };
            const opts = productJson.product?.priceOptions ?? [];
            for (const p of opts) {
              const key = (p.label ?? "").trim().toLowerCase();
              if (!key) continue;
              productLevelByLabel.set(key, {
                minQuantity: typeof p.minQuantity === "number" ? p.minQuantity : undefined,
                maxQuantity: typeof p.maxQuantity === "number" ? p.maxQuantity : undefined,
                priceGroupType: p.priceGroupType,
              });
            }
          }

          const sessions = (data.sessions ?? []).map((s) => ({
            id: s.id != null ? String(s.id) : null,
            startTimeLocal: s.startTimeLocal ?? s.startTime ?? null,
            endTimeLocal: s.endTimeLocal ?? s.endTime ?? null,
            allDay: Boolean(s.allDay),
            seatsAvailable: typeof s.seatsAvailable === "number" ? s.seatsAvailable : null,
            priceOptions: Array.isArray(s.priceOptions)
              ? s.priceOptions.map((p) => {
                  const fallback =
                    productLevelByLabel.get((p.label ?? "").trim().toLowerCase()) ?? {};
                  return {
                    label: p.label ?? "Adult",
                    price: typeof p.price === "number" ? p.price : 0,
                    seatsUsed: typeof p.seatsUsed === "number" ? p.seatsUsed : 1,
                    minQuantity:
                      typeof p.minQuantity === "number" ? p.minQuantity : fallback.minQuantity,
                    maxQuantity:
                      typeof p.maxQuantity === "number" ? p.maxQuantity : fallback.maxQuantity,
                    priceGroupType: p.priceGroupType ?? fallback.priceGroupType,
                  };
                })
              : [],
          }));

          return Response.json({ success: true, productCode, sessions });
        } catch (err) {
          const message = err instanceof Error ? err.message : "Unknown error";
          console.error("[rezdy] availability fetch failed:", err);
          return Response.json(
            {
              success: false,
              message: "Unable to load tour availability from Rezdy.",
              details: message.slice(0, 200),
            },
            { status: 500 },
          );
        }
      },
    },
  },
});
