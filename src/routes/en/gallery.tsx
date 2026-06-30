import { createFileRoute } from "@tanstack/react-router";
import { GalleryPage } from "../gallery";
import { hreflangLinks } from "@/i18n/locale";

export const Route = createFileRoute("/en/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Shooting Star Travel" },
      { name: "description", content: "Latest travel moments, photos, and videos from Shooting Star Travel." },
      { property: "og:title", content: "Gallery — Shooting Star Travel" },
      { property: "og:locale", content: "en_US" },
    ],
    links: hreflangLinks("/gallery", "en"),
  }),
  component: GalleryPage,
});
