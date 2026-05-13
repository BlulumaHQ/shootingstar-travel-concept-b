import { createFileRoute } from "@tanstack/react-router";
import { TermsPage } from "../terms";

export const Route = createFileRoute("/zh/terms")({
  head: () => ({ meta: [{ title: "服務條款 | Shootingstar Travel" }] }),
  component: TermsPage,
});
