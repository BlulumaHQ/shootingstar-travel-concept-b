import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import journal from "@/assets/journal.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "關於我們 | Shootingstar Travel" },
      { name: "description", content: "Shootingstar Travel 由一群熱愛加拿大山林的旅人創立，十年來用心策劃每一段值得收藏的旅程。" },
      { property: "og:title", content: "關於我們 | Shootingstar Travel" },
      { property: "og:description", content: "在地小團、慢走、用心 — 我們對每位旅人的承諾。" },
      { property: "og:image", content: journal },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-5xl px-6 md:px-10 py-20">
        <p className="font-hand text-clay text-2xl">— our story</p>
        <h1 className="font-serif text-5xl md:text-6xl mt-2">關於我們</h1>

        <div className="grid md:grid-cols-2 gap-12 mt-12 items-start">
          <img src={journal} alt="" className="rounded-xl shadow-xl" />
          <div className="space-y-6 text-foreground/80 leading-loose">
            <p>Shootingstar Travel 起源於一場橫越洛磯山的長途旅行。創辦人在班夫的星空下，看見一顆劃過天際的流星，心裡許了一個願：把這份感動，分享給更多旅人。</p>
            <p>十年來，我們堅持小團、堅持在地、堅持慢慢走。我們相信，旅行的意義不在打卡，而在那些被風吹過、被光照過的瞬間。</p>
            <p>從規劃路線、挑選住宿、到挑選一杯咖啡的轉角小店，我們用心對待每一個細節，只為了讓你回家時，能帶走一段值得收藏的故事。</p>
          </div>
        </div>

        <div className="mt-20 grid md:grid-cols-3 gap-8 text-center">
          {[
            { n: "10+", l: "年在地經驗" },
            { n: "2,400+", l: "旅人共同走過" },
            { n: "4.9 / 5", l: "旅客平均評價" },
          ].map((s) => (
            <div key={s.l} className="paper-card rounded-xl p-8">
              <div className="font-serif text-5xl text-primary">{s.n}</div>
              <div className="mt-2 text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
