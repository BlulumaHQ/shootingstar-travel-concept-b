import { createFileRoute, redirect } from "@tanstack/react-router";

// /zh/* is a legacy alias of the new default (bare) Chinese routes.
// Permanently redirect to the bare equivalent so there are no duplicate URLs in SEO.
export const Route = createFileRoute("/zh/rocky-mountain-lake-tours")({
  beforeLoad: () => {
    throw redirect({ to: "/rocky-mountain-lake-tours", replace: true });
  },
  component: () => null,
});
