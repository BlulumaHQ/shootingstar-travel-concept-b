import { createFileRoute, redirect } from "@tanstack/react-router";

// /zh/* is a legacy alias of the new default (bare) Chinese routes.
// Permanently redirect to the bare equivalent so there are no duplicate URLs in SEO.
export const Route = createFileRoute("/zh/tours/$slug")({
  beforeLoad: ({ params }) => {
    throw redirect({ to: "/tours/$slug", params: params as any, replace: true });
  },
  component: () => null,
});
