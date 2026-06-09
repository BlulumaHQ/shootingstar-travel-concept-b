import { createFileRoute } from "@tanstack/react-router";

type RezdySession = {
  id?: number | string;
  startTimeLocal?: string;
  endTimeLocal?: string;
  startTime?: string;
  endTime?: string;
  seatsAvailable?: number;
  totalPrice?: number;
  priceOptions?: Array<{ price?: number; label?: string }>;
  productCode?: string;
};

type CleanSession = {
  date: string | null;
  startTime: string | null;
  endTime: string | null;
  seatsAvailable: number | null;
  price: number | null;
  currency: string;
  productCode: string;
  rawSessionId: string | null;
};

function splitDateTime(value?: string): { date: string | null; time: string | null } {
  if (!value) return { date: null, time: null };
  // Rezdy local format: "2025-07-12 09:00:00" or ISO
  const normalized = value.replace("T", " ");
  const [date, time] = normalized.split(" ");
  return { date: date ?? null, time: time ? time.slice(0, 5) : null };
}

export const Route = createFileRoute("/api/rezdy/victoria-availability")({
  server: {
    handlers: {
      GET: async () => {
        const apiKey = process.env.REZDY_API_KEY;
        const productCode = process.env.REZDY_PRODUCT_CODE;

        if (!apiKey || !productCode) {
          return Response.json(
            {
              success: false,
              message: "Unable to load tour availability from Rezdy.",
              details: "Missing REZDY_API_KEY or REZDY_PRODUCT_CODE in server environment.",
            },
            { status: 500 },
          );
        }

        try {
          const start = new Date();
          const end = new Date();
          end.setDate(end.getDate() + 180);
          const fmt = (d: Date) => d.toISOString().slice(0, 10);

          const url = new URL("https://api.rezdy.com/v1/availability");
          url.searchParams.set("apiKey", apiKey);
          url.searchParams.set("productCode", productCode);
          url.searchParams.set("startTimeLocal", `${fmt(start)} 00:00:00`);
          url.searchParams.set("endTimeLocal", `${fmt(end)} 23:59:59`);

          const res = await fetch(url.toString(), {
            method: "GET",
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

          const sessions: CleanSession[] = (data.sessions ?? []).map((s) => {
            const startSrc = s.startTimeLocal ?? s.startTime;
            const endSrc = s.endTimeLocal ?? s.endTime;
            const start = splitDateTime(startSrc);
            const end = splitDateTime(endSrc);
            const price =
              typeof s.totalPrice === "number"
                ? s.totalPrice
                : Array.isArray(s.priceOptions) && typeof s.priceOptions[0]?.price === "number"
                  ? (s.priceOptions[0]!.price as number)
                  : null;

            return {
              date: start.date,
              startTime: start.time,
              endTime: end.time,
              seatsAvailable: typeof s.seatsAvailable === "number" ? s.seatsAvailable : null,
              price,
              currency: "CAD",
              productCode: s.productCode ?? productCode,
              rawSessionId: s.id != null ? String(s.id) : null,
            };
          });

          return Response.json({
            success: true,
            productCode,
            sessions,
          });
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
