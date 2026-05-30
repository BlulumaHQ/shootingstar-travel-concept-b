import { createFileRoute } from "@tanstack/react-router";
import { GalleryPage } from "../gallery";
import { hreflangLinks } from "@/i18n/locale";

export const Route = createFileRoute("/ko/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery | Shootingstar Travel" },
      { name: "description", content: "Shooting Star Travel의 최신 여행 순간과 사진, 영상." },
      { property: "og:title", content: "Gallery | Shootingstar Travel" },
      { property: "og:locale", content: "ko_KR" },
    ],
    links: hreflangLinks("/gallery", "ko"),
  }),
  component: GalleryPage,
});
