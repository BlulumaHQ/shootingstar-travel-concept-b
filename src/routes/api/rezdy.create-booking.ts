import { createFileRoute } from "@tanstack/react-router";

type CreateBookingBody = {
  productCode?: string;
  sessionId?: string | number;
  startTimeLocal?: string; // "YYYY-MM-DD HH:mm:ss"
  guests?: number;
  tourLanguage?: string;
  notes?: string;
  customer?: {
    firstName?: string;
    lastName?: string;
    name?: string;
    email?: string;
    phone?: string;
  };
};

const ALLOWED_LANGUAGES = ["English", "Mandarin", "Korean"] as const;

export const Route = createFileRoute("/api/rezdy/create-booking")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const apiKey = process.env.REZDY_API_KEY;
        const envProductCode = process.env.REZDY_PRODUCT_CODE;

        if (!apiKey || !envProductCode) {
          return Response.json(
            { success: false, message: "Server is missing Rezdy credentials." },
            { status: 500 },
          );
        }

        let body: CreateBookingBody;
        try {
          body = (await request.json()) as CreateBookingBody;
        } catch {
          return Response.json(
            { success: false, message: "Invalid JSON body." },
            { status: 400 },
          );
        }

        const productCode = body.productCode || envProductCode;
        const guests = Math.max(1, Math.min(Number(body.guests ?? 1) || 1, 50));
        const startTimeLocal = body.startTimeLocal;

        if (!startTimeLocal) {
          return Response.json(
            { success: false, message: "Missing startTimeLocal for the selected session." },
            { status: 400 },
          );
        }

        const c = body.customer ?? {};
        const fullName = (c.name ?? "").trim();
        const [firstFromFull, ...restFromFull] = fullName.split(/\s+/);
        const firstName = (c.firstName ?? firstFromFull ?? "Guest").trim() || "Guest";
        const lastName = (c.lastName ?? restFromFull.join(" ") ?? "").trim() || "Booking";

        if (!c.email) {
          return Response.json(
            { success: false, message: "Customer email is required." },
            { status: 400 },
          );
        }

        const payload = {
          status: "CONFIRMED",
          customer: {
            firstName,
            lastName,
            email: c.email,
            phone: c.phone ?? "",
          },
          items: [
            {
              productCode,
              startTimeLocal,
              quantities: [{ optionLabel: "Adult", value: guests }],
              participants: Array.from({ length: guests }, () => ({
                fields: [
                  { label: "First Name", value: firstName },
                  { label: "Last Name", value: lastName },
                ],
              })),
            },
          ],
          payments: [
            {
              type: "CASH",
              amount: 0,
              currency: "CAD",
              date: new Date().toISOString(),
              label: "Test booking (no payment processed)",
            },
          ],
          fields: [],
          comments: "Test booking created from Shootingstar Travel website.",
        };

        try {
          const url = new URL("https://api.rezdy.com/v1/bookings");
          url.searchParams.set("apiKey", apiKey);

          const res = await fetch(url.toString(), {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify(payload),
          });

          const data = (await res.json().catch(() => ({}))) as {
            booking?: { orderNumber?: string; reference?: string; bookingReference?: string };
            requestStatus?: { success?: boolean; error?: { errorMessage?: string } };
          };

          if (!res.ok || data.requestStatus?.success === false) {
            const errMsg =
              data.requestStatus?.error?.errorMessage ??
              `Rezdy responded ${res.status} ${res.statusText}`;
            console.error("[rezdy] create booking failed:", errMsg, data);
            return Response.json(
              { success: false, message: errMsg },
              { status: 502 },
            );
          }

          const booking = data.booking ?? {};
          return Response.json({
            success: true,
            bookingReference:
              booking.bookingReference ?? booking.reference ?? booking.orderNumber ?? null,
            orderNumber: booking.orderNumber ?? null,
            sessionId: body.sessionId ?? null,
            productCode,
          });
        } catch (err) {
          const message = err instanceof Error ? err.message : "Unknown error";
          console.error("[rezdy] create booking error:", err);
          return Response.json(
            { success: false, message },
            { status: 500 },
          );
        }
      },
    },
  },
});
