import { createFileRoute } from "@tanstack/react-router";

type RezdyPriceOption = {
  label?: string;
  price?: number;
  seatsUsed?: number;
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

          const res = await fetch(rezdyUrl.toString(), {
            headers: { Accept: "application/json" },
          });

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

          const sessions = (data.sessions ?? []).map((s) => ({
            id: s.id != null ? String(s.id) : null,
            startTimeLocal: s.startTimeLocal ?? s.startTime ?? null,
            endTimeLocal: s.endTimeLocal ?? s.endTime ?? null,
            allDay: Boolean(s.allDay),
            seatsAvailable: typeof s.seatsAvailable === "number" ? s.seatsAvailable : null,
            priceOptions: Array.isArray(s.priceOptions)
              ? s.priceOptions.map((p) => ({
                  label: p.label ?? "Adult",
                  price: typeof p.price === "number" ? p.price : 0,
                  seatsUsed: typeof p.seatsUsed === "number" ? p.seatsUsed : 1,
                }))
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
