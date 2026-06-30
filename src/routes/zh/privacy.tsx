import { createFileRoute, redirect } from "@tanstack/react-router";

// /zh/* is a legacy alias of the new default (bare) Chinese routes.
// Permanently redirect to the bare equivalent so there are no duplicate URLs in SEO.
export const Route = createFileRoute("/zh/privacy")({
  beforeLoad: () => {
    throw redirect({ to: "/privacy", replace: true });
  },
  component: () => null,
});
