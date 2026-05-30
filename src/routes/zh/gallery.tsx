import { createFileRoute } from "@tanstack/react-router";
import { GalleryPage } from "../zh-gallery-shared";
import { hreflangLinks } from "@/i18n/locale";

export const Route = createFileRoute("/zh/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery | Shootingstar Travel" },
      { name: "description", content: "持續更新最新旅遊照片、影片與行程紀錄。" },
      { property: "og:title", content: "Gallery | Shootingstar Travel" },
      { property: "og:locale", content: "zh_Hant" },
    ],
    links: hreflangLinks("/gallery", "zh"),
  }),
  component: GalleryPage,
});
