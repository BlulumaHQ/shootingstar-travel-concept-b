import { createFileRoute } from "@tanstack/react-router";
import { IcefieldsShuttlePage } from "../icefields-parkway-jasper-banff-shuttle-tours";
import { hreflangLinks } from "@/i18n/locale";

export const Route = createFileRoute("/zh/icefields-parkway-jasper-banff-shuttle-tours")({
  head: () => ({
    meta: [
      { title: "冰原大道、傑士伯、班夫接駁觀光行程 | Shooting Star Travel" },
      { name: "description", content: "班夫、傑士伯、Hinton、哥倫比亞冰原、Medicine Lake 與 Maligne Lake 之間的彈性接駁觀光，依星期排班、可加購景點門票。" },
      { property: "og:locale", content: "zh_Hant" },
    ],
    links: hreflangLinks("/icefields-parkway-jasper-banff-shuttle-tours", "zh"),
  }),
  component: IcefieldsShuttlePage,
});
