import { createFileRoute } from "@tanstack/react-router";
import { ToursIndexPage } from "../tours.index";
import { hreflangLinks } from "@/i18n/locale";

export const Route = createFileRoute("/zh/tours/")({
  head: () => ({
    meta: [
      { title: "行程介紹 | Shootingstar Travel" },
      { name: "description", content: "瀏覽 Shootingstar Travel 加拿大小團精選行程：洛磯山、班夫、極光、溫哥華、維多利亞與私人包團。" },
      { property: "og:locale", content: "zh_Hant" },
    ],
    links: hreflangLinks("/tours", "zh"),
  }),
  component: ToursIndexPage,
});
