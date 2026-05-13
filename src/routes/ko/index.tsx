import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { StarMark, DottedLine } from "@/components/site/BrandMarks";

export const Route = createFileRoute("/ko/")({
  head: () => ({
    meta: [
      { title: "Shootingstar Travel | 캐나다 부티크 여행 (준비 중)" },
      { name: "description", content: "한국어 페이지는 곧 공개됩니다. Shootingstar Travel은 캐나다 부티크 소그룹 여행을 정성껏 준비합니다." },
      { property: "og:title", content: "Shootingstar Travel | 캐나다 부티크 여행" },
      { property: "og:locale", content: "ko_KR" },
    ],
    links: [
      { rel: "canonical", href: "https://shootingstar-travel-concept-b.lovable.app/ko" },
      { rel: "alternate", hrefLang: "en", href: "https://shootingstar-travel-concept-b.lovable.app/" },
      { rel: "alternate", hrefLang: "zh-Hant", href: "https://shootingstar-travel-concept-b.lovable.app/zh" },
      { rel: "alternate", hrefLang: "ko", href: "https://shootingstar-travel-concept-b.lovable.app/ko" },
      { rel: "alternate", hrefLang: "x-default", href: "https://shootingstar-travel-concept-b.lovable.app/" },
    ],
  }),
  component: KoComingSoon,
});

function KoComingSoon() {
  return (
    <SiteLayout>
      <section className="bg-cream min-h-[70vh] flex items-center">
        <div className="mx-auto max-w-[760px] px-6 md:px-12 py-24 text-center">
          <div className="flex items-center justify-center gap-3 text-primary/75">
            <StarMark size={18} className="text-primary/65" />
            <DottedLine length={36} className="text-primary/45" />
            <span className="text-[11px] tracking-[0.4em] uppercase">Coming Soon</span>
            <DottedLine length={36} className="text-primary/45" />
            <StarMark size={18} className="text-primary/65" />
          </div>
          <h1 className="font-serif text-4xl md:text-[56px] text-ink mt-8 font-medium leading-[1.15] tracking-[-0.012em]">
            한국어 페이지는<br />곧 공개됩니다
          </h1>
          <p className="mt-7 text-ink/65 leading-[2] text-[15px]">
            Shootingstar Travel은 캐나다 부티크 소그룹 여행을 정성껏 준비합니다. 한국어 사이트는 현재 작업 중이며, 곧 새로운 모습으로 만나뵙겠습니다.
          </p>
          <p className="mt-5 text-ink/55 leading-[2] text-[14px]">
            The Korean version of our site is currently in production. Please visit our English or Chinese pages in the meantime.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link to="/" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-primary-foreground text-[13px] tracking-[0.12em] uppercase">
              English Site →
            </Link>
            <Link to={"/zh" as never} className="inline-flex items-center gap-2 rounded-full border border-primary/40 px-6 py-3 text-primary text-[13px] tracking-[0.12em] uppercase hover:bg-primary hover:text-primary-foreground transition">
              中文版 →
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
