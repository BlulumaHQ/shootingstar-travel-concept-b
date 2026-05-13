import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import banff from "@/assets/tour-banff.jpg";
import rockies from "@/assets/tour-rockies.jpg";
import vancouver from "@/assets/tour-vancouver.jpg";
import aurora from "@/assets/tour-aurora.jpg";
import jasper from "@/assets/dest-jasper.jpg";
import victoria from "@/assets/tour-victoria.jpg";
import { CompassMark, DottedLine, JourneyPath } from "@/components/site/BrandMarks";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "部落格 | Shootingstar Travel" },
      { name: "description", content: "加拿大旅遊指南、季節攻略與在地建議，幫你規劃下一段旅程。" },
      { property: "og:title", content: "部落格 | Shootingstar Travel" },
      { property: "og:description", content: "加拿大旅遊知識與在地觀點，由 Shootingstar Travel 整理。" },
      { property: "og:image", content: rockies },
    ],
  }),
  component: BlogPage,
});

const posts = [
  { img: rockies, cat: "旅遊攻略", title: "加拿大洛磯山旅遊前需要知道的 8 件事", excerpt: "天氣、交通、住宿與最佳季節，第一次去落磯山的完整準備清單。", read: "8 分鐘閱讀" },
  { img: banff, cat: "行程比較", title: "班夫自由行與跟團旅遊怎麼選？", excerpt: "從預算、體驗深度與彈性比較兩種旅遊方式，幫你挑出最適合的玩法。", read: "6 分鐘閱讀" },
  { img: vancouver, cat: "城市指南", title: "第一次來溫哥華，哪些景點最值得安排？", excerpt: "我們整理了 10 個本地人也常去的角落，從 Stanley Park 到 Granville Island。", read: "7 分鐘閱讀" },
  { img: aurora, cat: "極光指南", title: "極光旅行最佳季節與準備方式", excerpt: "什麼時候最容易看到極光？要帶哪些裝備？這篇一次告訴你。", read: "9 分鐘閱讀" },
  { img: jasper, cat: "深度旅遊", title: "傑士伯：被低估的暗夜星空保護區", excerpt: "比起班夫，傑士伯更安靜、更原始。一篇文章帶你認識這個寶藏小鎮。", read: "5 分鐘閱讀" },
  { img: victoria, cat: "島嶼旅行", title: "維多利亞一日遊：花園、渡輪與英倫午茶", excerpt: "從溫哥華出發的最美一日離島行程提案。", read: "6 分鐘閱讀" },
];

function BlogPage() {
  const [feature, ...rest] = posts;
  return (
    <SiteLayout>
      <section className="relative bg-cream pt-24 md:pt-32 pb-14 overflow-hidden">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <div className="flex items-center gap-3 text-primary/75">
            <CompassMark size={18} className="text-primary/65" />
            <DottedLine length={36} className="text-primary/45" />
            <span className="text-[11px] tracking-[0.4em] uppercase font-medium">Travel Journal</span>
          </div>
          <h1 className="font-serif text-4xl md:text-[56px] text-ink mt-6 font-medium tracking-[-0.015em] leading-[1.1]">
            部落格
          </h1>
          <p className="mt-7 text-ink/60 max-w-xl leading-[2] text-[15px]">
            旅遊知識、季節攻略與在地觀點。願這些文字，陪伴你規劃下一段旅程。
          </p>
        </div>
        <JourneyPath className="absolute -bottom-4 left-0 right-0 w-full h-24 text-primary/40 hidden md:block" variant="arc" />
      </section>

      <section className="bg-cream pb-12 pt-6">
        <div className="mx-auto max-w-[1200px] px-6 md:px-12">
          <Link to="/blog" className="group grid md:grid-cols-2 gap-10 md:gap-14 items-center">
            <div className="aspect-[4/3] overflow-hidden rounded-[4px] shadow-[0_20px_40px_-25px_rgba(60,80,70,0.35)]">
              <img src={feature.img} alt={feature.title} className="h-full w-full object-cover group-hover:scale-[1.03] transition duration-700" />
            </div>
            <div>
              <p className="text-[11px] tracking-[0.3em] uppercase text-primary font-medium">{feature.cat}</p>
              <h2 className="font-serif text-2xl md:text-[36px] text-ink mt-4 leading-[1.2] tracking-[-0.012em] font-medium">{feature.title}</h2>
              <p className="mt-6 text-ink/60 leading-[2] text-[15px]">{feature.excerpt}</p>
              <div className="mt-7 flex items-center gap-5 text-[12px] text-ink/50 tracking-[0.1em] uppercase">
                <span>{feature.read}</span>
                <span className="text-primary tracking-[0.18em]">繼續閱讀 →</span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      <section className="bg-cream pb-32 md:pb-40 pt-16">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12">
            {rest.map((p) => (
              <Link to="/blog" key={p.title} className="group block">
                <div className="aspect-[4/3] overflow-hidden rounded-[4px] shadow-[0_18px_36px_-24px_rgba(60,80,70,0.32)]">
                  <img src={p.img} alt={p.title} loading="lazy" className="h-full w-full object-cover group-hover:scale-[1.04] transition duration-[1000ms]" />
                </div>
                <p className="mt-6 text-[10.5px] tracking-[0.3em] uppercase text-primary font-medium">{p.cat}</p>
                <h3 className="mt-2.5 font-serif text-[19px] text-ink leading-snug font-semibold group-hover:text-primary transition">{p.title}</h3>
                <p className="mt-3 text-[13.5px] text-ink/60 leading-[1.95]">{p.excerpt}</p>
                <p className="mt-5 text-[11px] tracking-[0.18em] uppercase text-ink/45">{p.read} · 繼續閱讀 →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
