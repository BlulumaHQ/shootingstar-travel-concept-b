import { createFileRoute } from "@tanstack/react-router";

type RezdyExtra = {
  id?: number | string;
  name?: string;
  description?: string;
  price?: number;
  extraPriceType?: string;
  isOptional?: boolean;
};

type RezdyPickupLocation = {
  id?: number | string;
  locationName?: string;
};

type RezdyProductPayload = {
  productCode?: string;
  name?: string;
  extras?: RezdyExtra[];
  pickupId?: number | string | null;
  pickupLocations?: RezdyPickupLocation[];
};

export const Route = createFileRoute("/api/rezdy/product")({
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
          const rezdyUrl = new URL(
            `https://api.rezdy.com/v1/products/${encodeURIComponent(productCode)}`,
          );
          rezdyUrl.searchParams.set("apiKey", apiKey);

          const res = await fetch(rezdyUrl.toString(), {
            headers: { Accept: "application/json" },
          });

          if (!res.ok) {
            const text = await res.text().catch(() => "");
            return Response.json(
              {
                success: false,
                message: "Unable to load tour product from Rezdy.",
                details: `Rezdy responded ${res.status} ${res.statusText}${text ? `: ${text.slice(0, 200)}` : ""}`,
              },
              { status: 502 },
            );
          }

          const data = (await res.json()) as {
            product?: RezdyProductPayload;
            requestStatus?: { success?: boolean; error?: { errorMessage?: string } };
          };

          if (data.requestStatus && data.requestStatus.success === false) {
            return Response.json(
              {
                success: false,
                message: "Unable to load tour product from Rezdy.",
                details: data.requestStatus.error?.errorMessage ?? "Rezdy request failed.",
              },
              { status: 502 },
            );
          }

          const product = data.product ?? {};
          const extras = Array.isArray(product.extras)
            ? product.extras.map((e) => ({
                id: e.id != null ? String(e.id) : null,
                name: e.name ?? "",
                description: e.description ?? "",
                price: typeof e.price === "number" ? e.price : 0,
                extraPriceType: e.extraPriceType ?? "ANY",
                isOptional: e.isOptional !== false,
              })).filter((e) => e.name)
            : [];

          const pickupId =
            product.pickupId != null
              ? String(product.pickupId)
              : null;

          return Response.json({
            success: true,
            productCode,
            extras,
            pickupId,
          });
        } catch (err) {
          const message = err instanceof Error ? err.message : "Unknown error";
          console.error("[rezdy] product fetch failed:", err);
          return Response.json(
            {
              success: false,
              message: "Unable to load tour product from Rezdy.",
              details: message.slice(0, 200),
            },
            { status: 500 },
          );
        }
      },
    },
  },
});
