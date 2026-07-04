import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/zh/jasper-tours")({
  beforeLoad: () => {
    throw redirect({ to: "/jasper-tours", replace: true });
  },
  component: () => null,
});
