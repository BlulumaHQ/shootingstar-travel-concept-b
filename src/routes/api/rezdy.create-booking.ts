import { createFileRoute } from "@tanstack/react-router";

type BookingItem = { label?: string; quantity?: number };

type CreateBookingBody = {
  productCode?: string;
  startTimeLocal?: string;
  items?: BookingItem[];
  customer?: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
  };
  notes?: string;
};

export const Route = createFileRoute("/api/rezdy/create-booking")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const apiKey = process.env.REZDY_API_KEY;
        if (!apiKey) {
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

        const productCode = body.productCode?.trim();
        const startTimeLocal = body.startTimeLocal?.trim();
        const items = Array.isArray(body.items) ? body.items : [];
        const c = body.customer ?? {};

        if (!productCode) {
          return Response.json(
            { success: false, message: "Missing productCode." },
            { status: 400 },
          );
        }
        if (!startTimeLocal) {
          return Response.json(
            { success: false, message: "Missing startTimeLocal for the selected session." },
            { status: 400 },
          );
        }
        if (!c.email) {
          return Response.json(
            { success: false, message: "Customer email is required." },
            { status: 400 },
          );
        }

        const quantities = items
          .map((i) => ({
            optionLabel: (i.label ?? "Adult").trim() || "Adult",
            value: Math.max(0, Math.floor(Number(i.quantity ?? 0) || 0)),
          }))
          .filter((q) => q.value > 0);

        if (quantities.length === 0) {
          return Response.json(
            { success: false, message: "Please select at least one ticket." },
            { status: 400 },
          );
        }

        const totalGuests = quantities.reduce((sum, q) => sum + q.value, 0);
        const firstName = (c.firstName ?? "Guest").trim() || "Guest";
        const lastName = (c.lastName ?? "Booking").trim() || "Booking";

        const payload = {
          status: "PROCESSING",
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
              quantities,
              participants: Array.from({ length: totalGuests }, () => ({
                fields: [
                  { label: "First Name", value: firstName },
                  { label: "Last Name", value: lastName },
                ],
              })),
              extras: [],
            },
          ],
          comments: body.notes?.trim() || "",
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
            booking,
            bookingReference:
              booking.bookingReference ?? booking.reference ?? booking.orderNumber ?? null,
            orderNumber: booking.orderNumber ?? null,
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
