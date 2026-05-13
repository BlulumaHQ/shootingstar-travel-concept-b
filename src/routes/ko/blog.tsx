import { createFileRoute } from "@tanstack/react-router";
import { BlogPage } from "../blog";
import { hreflangLinks } from "@/i18n/locale";

export const Route = createFileRoute("/ko/blog")({
  head: () => ({
    meta: [
      { title: "여행 일지 | Shootingstar Travel" },
      { name: "description", content: "캐나다 여행을 위한 가이드, 시즌 팁, 그리고 현지 가이드의 일상 노트." },
      { property: "og:title", content: "여행 일지 | Shootingstar Travel" },
      { property: "og:locale", content: "ko_KR" },
    ],
    links: hreflangLinks("/blog", "ko"),
  }),
  component: BlogPage,
});
