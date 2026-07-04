import { createFileRoute } from "@tanstack/react-router";

// Disabled: this endpoint previously created Rezdy bookings with a placeholder
// payment record, which caused orders to be confirmed without actual payment.
// All bookings must now go through the Rezdy hosted checkout page.
const GONE_BODY = {
  success: false,
  message:
    "Direct booking is disabled. Please complete your booking on the Rezdy hosted checkout page.",
} as const;

export const Route = createFileRoute("/api/rezdy/create-booking")({
  server: {
    handlers: {
      POST: async () => Response.json(GONE_BODY, { status: 410 }),
      GET: async () => Response.json(GONE_BODY, { status: 410 }),
    },
  },
});
