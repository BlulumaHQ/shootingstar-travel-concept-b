import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/ko/$")({
  component: () => <Navigate to="/ko" replace />,
});
