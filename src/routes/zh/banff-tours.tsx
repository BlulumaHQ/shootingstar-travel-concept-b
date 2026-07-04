import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/zh/banff-tours")({
  beforeLoad: () => {
    throw redirect({ to: "/banff-tours", replace: true });
  },
  component: () => null,
});
