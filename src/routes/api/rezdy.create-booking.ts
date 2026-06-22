import { createFileRoute } from "@tanstack/react-router";

type BookingItem = { label?: string; quantity?: number; optionPrice?: number };
type BookingExtra = { name?: string; quantity?: number; price?: number };

type CreateBookingBody = {
  productCode?: string;
  startTimeLocal?: string;
  items?: BookingItem[];
  extras?: BookingExtra[];
  preferredLanguage?: string;
  pickupId?: string | number | null;
  pickupLocationName?: string | null;
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

        const enrichedItems = items
          .map((i) => ({
            optionLabel: (i.label ?? "Adult").trim() || "Adult",
            value: Math.max(0, Math.floor(Number(i.quantity ?? 0) || 0)),
            optionPrice: Number(i.optionPrice ?? 0),
          }))
          .filter((q) => q.value > 0);

        if (enrichedItems.length === 0) {
          return Response.json(
            { success: false, message: "Please select at least one ticket." },
            { status: 400 },
          );
        }

        const enrichedExtras = (Array.isArray(body.extras) ? body.extras : [])
          .map((x) => ({
            name: (x.name ?? "").trim(),
            quantity: Math.max(0, Math.floor(Number(x.quantity ?? 0) || 0)),
            price: Number(x.price ?? 0),
          }))
          .filter((x) => x.name && x.quantity > 0);

        const firstName = (c.firstName ?? "Guest").trim() || "Guest";
        const lastName = (c.lastName ?? "Booking").trim() || "Booking";
        const preferredLanguage = (body.preferredLanguage ?? "English").trim() || "English";

        const now = new Date();
        const pad2 = (n: number) => String(n).padStart(2, "0");
        const paymentDate = `${now.getFullYear()}-${pad2(now.getMonth() + 1)}-${pad2(now.getDate())} ${pad2(now.getHours())}:${pad2(now.getMinutes())}:${pad2(now.getSeconds())}`;

        const item: Record<string, unknown> = {
          productCode,
          startTimeLocal,
          quantities: enrichedItems.map(({ optionLabel, value }) => ({ optionLabel, value })),
          extras: enrichedExtras.map(({ name, quantity }) => ({ name, quantity })),
        };
        if (body.pickupId) {
          item.pickupId = body.pickupId;
        }

        // Step 1: create the booking WITHOUT payments so Rezdy returns the
        // authoritative totalAmount (tickets + extras + taxes/fees).
        const createPayload = {
          status: "PROCESSING",
          customer: {
            firstName,
            lastName,
            email: c.email,
            phone: c.phone ?? "",
          },
          fields: [{ label: "Preferred language", value: preferredLanguage }],
          items: [item],
          comments: body.notes?.trim() || "",
        };

        try {
          const createUrl = new URL("https://api.rezdy.com/v1/bookings");
          createUrl.searchParams.set("apiKey", apiKey);

          const res = await fetch(createUrl.toString(), {
            method: "POST",
            headers: { "Content-Type": "application/json", Accept: "application/json" },
            body: JSON.stringify(createPayload),
          });

          const data = (await res.json().catch(() => ({}))) as {
            booking?: {
              orderNumber?: string;
              reference?: string;
              bookingReference?: string;
              totalAmount?: number;
              totalCurrency?: string;
            };
            requestStatus?: { success?: boolean; error?: { errorMessage?: string } };
          };

          if (!res.ok || data.requestStatus?.success === false) {
            const errMsg =
              data.requestStatus?.error?.errorMessage ??
              `Rezdy responded ${res.status} ${res.statusText}`;
            console.error("[rezdy] create booking failed:", errMsg, data);
            return Response.json({ success: false, message: errMsg }, { status: 502 });
          }

          const booking = data.booking ?? {};
          const orderNumber = booking.orderNumber ?? null;
          const totalAmount = Number(booking.totalAmount ?? 0);
          const currency = booking.totalCurrency || "CAD";

          // Step 2: record a placeholder payment for the FULL Rezdy total so
          // BALANCE = 0. Replace with real Square payment once integrated.
          if (orderNumber && totalAmount > 0) {
            const payUrl = new URL(
              `https://api.rezdy.com/v1/bookings/${encodeURIComponent(orderNumber)}/payments`,
            );
            payUrl.searchParams.set("apiKey", apiKey);
            const payRes = await fetch(payUrl.toString(), {
              method: "POST",
              headers: { "Content-Type": "application/json", Accept: "application/json" },
              body: JSON.stringify({
                type: "CREDITCARD",
                amount: totalAmount,
                currency,
                label: "Test payment (Square placeholder)",
                date: paymentDate,
              }),
            });
            if (!payRes.ok) {
              const payErr = await payRes.text().catch(() => "");
              console.error("[rezdy] add payment failed:", payRes.status, payErr);
            } else {
              // Step 3: flip to CONFIRMED now that balance is settled.
              const updateUrl = new URL(
                `https://api.rezdy.com/v1/bookings/${encodeURIComponent(orderNumber)}`,
              );
              updateUrl.searchParams.set("apiKey", apiKey);
              const updRes = await fetch(updateUrl.toString(), {
                method: "PUT",
                headers: { "Content-Type": "application/json", Accept: "application/json" },
                body: JSON.stringify({ status: "CONFIRMED" }),
              });
              if (!updRes.ok) {
                console.error("[rezdy] confirm booking failed:", updRes.status);
              }
            }
          }

          return Response.json({
            success: true,
            booking,
            bookingReference:
              booking.bookingReference ?? booking.reference ?? booking.orderNumber ?? null,
            orderNumber,
            totalAmount,
            currency,
            productCode,
          });
        } catch (err) {
          const message = err instanceof Error ? err.message : "Unknown error";
          console.error("[rezdy] create booking error:", err);
          return Response.json({ success: false, message }, { status: 500 });
        }
      },
    },
  },
});
