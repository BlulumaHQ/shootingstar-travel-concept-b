import { createFileRoute } from "@tanstack/react-router";
import { PrivacyPage } from "../privacy";

export const Route = createFileRoute("/zh/privacy")({
  head: () => ({ meta: [{ title: "隱私權政策 | Shootingstar Travel" }] }),
  component: PrivacyPage,
});
