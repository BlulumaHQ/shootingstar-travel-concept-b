-- ============================================================================
-- Shooting Star Travel — Admin-controlled visibility
--   1. hero_slides table (homepage hero, managed in Admin → Hero Slides)
--   2. Banff → Jasper Express Shuttle season correction (summer)
--   3. Admin (authenticated) update policy for tours.published
-- Safe to run more than once. Nothing is deleted.
-- ============================================================================

-- 1. HERO SLIDES ------------------------------------------------------------

create table if not exists public.hero_slides (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  published boolean not null default true,
  sort_order integer not null default 0,
  image text,
  link_url text,
  linked_tour_slug text,
  duration_ms integer default 6000,

  eyebrow_en text, headline_line_1_en text, headline_line_2_en text,
  subheadline_en text, primary_label_en text, secondary_label_en text,

  eyebrow_zh text, headline_line_1_zh text, headline_line_2_zh text,
  subheadline_zh text, primary_label_zh text, secondary_label_zh text,

  eyebrow_ko text, headline_line_1_ko text, headline_line_2_ko text,
  subheadline_ko text, primary_label_ko text, secondary_label_ko text,

  created_at timestamptz not null default now()
);

grant select on public.hero_slides to anon;
grant select, insert, update, delete on public.hero_slides to authenticated;
grant all on public.hero_slides to service_role;

alter table public.hero_slides enable row level security;

drop policy if exists "Public can read published hero slides" on public.hero_slides;
create policy "Public can read published hero slides"
  on public.hero_slides for select
  to anon, authenticated
  using (published = true or auth.uid() is not null);

drop policy if exists "Admins manage hero slides" on public.hero_slides;
create policy "Admins manage hero slides"
  on public.hero_slides for all
  to authenticated
  using (true) with check (true);

-- Seed the slides that are live today. Existing rows are left untouched.
insert into public.hero_slides
  (key, published, sort_order, link_url, linked_tour_slug, duration_ms,
   eyebrow_en, headline_line_1_en, headline_line_2_en, subheadline_en, primary_label_en, secondary_label_en,
   eyebrow_zh, headline_line_1_zh, headline_line_2_zh, subheadline_zh, primary_label_zh, secondary_label_zh,
   eyebrow_ko, headline_line_1_ko, headline_line_2_ko, subheadline_ko, primary_label_ko, secondary_label_ko)
values
  ('stampede', false, 0, null, 'moraine-lake-lake-louise-calgary-departure', 7000,
   '🔥 Limited time offer', 'Stampede season special · Save 30%', null,
   'During the excitement of Calgary Stampede season, enjoy our limited-time Calgary departure day tour to Moraine Lake × Lake Louise. Beyond the Stampede, let the unforgettable lake views of the Rockies add one more beautiful memory to your journey.',
   'Book Now', null,
   '🔥 限時優惠', '牛仔節季限定優惠 · 立省 30%', null,
   '趁著卡加立牛仔節的熱鬧季節,我們推出卡加立出發的夢蓮湖 × 露易絲湖雙湖一日遊限時優惠。牛仔節之外,讓洛磯山的絕美湖景為你的旅程再添一筆難忘回憶。',
   '立即預訂', null,
   '🔥 기간 한정 특가', '스탬피드 시즌 한정 · 30% 할인', null,
   '캘거리 스탬피드의 활기찬 시즌을 맞아 캘거리 출발 모레인 호수 × 레이크 루이스 두 호수 일일 투어를 기간 한정 특가로 선보입니다. 스탬피드와 더불어 로키 산맥의 아름다운 호수 풍경이 여행에 잊지 못할 추억을 더해드립니다.',
   '지금 예약', null),

  ('intro', true, 1, '/tours', null, 6000,
   '— Shooting Star Travel', 'Travel that shines', 'like a shooting star.',
   'Boutique small-group journeys across the Canadian Rockies and the Western United States — paced for slow mornings, mountain light, and stories worth keeping.',
   'Explore Tours', 'Our Story',
   '— Shooting Star Travel', '旅行,', '如流星般閃耀。',
   '加拿大洛磯山脈與美國西部的精品小團旅行 —— 緩慢的清晨、山林的光,以及值得收藏的故事。',
   '探索行程', '關於我們',
   '— Shooting Star Travel', '별똥별처럼', '빛나는 여행.',
   '캐나디안 록키와 미국 서부를 가로지르는 부티크 소그룹 여정 — 느린 아침, 산의 빛, 그리고 간직할 만한 이야기.',
   '투어 둘러보기', '브랜드 이야기'),

  ('lakes', true, 2, '/rocky-mountain-lake-tours', null, 6000,
   '— Featured · Canadian Rockies', 'Rocky Mountain', 'Lake Tours',
   'Moraine Lake, Lake Louise, Emerald Lake — turquoise water and alpine air on a single, considered day across the Bow Valley.',
   'Explore Lake Tours', null,
   '— 精選 · 加拿大洛磯', '洛磯山脈', '湖泊一日遊',
   '夢蓮湖、露易絲湖、翡翠湖 —— 一天之內,走過 Bow Valley 的綠松石湖水與高山空氣。',
   '探索湖泊行程', null,
   '— 추천 · 캐나디안 록키', '로키 마운틴', '레이크 투어',
   '모레인 호수, 루이스 호수, 에메랄드 호수 — 보우 밸리의 터쿠아즈 빛 호수와 알파인의 공기를 하루에.',
   '레이크 투어 둘러보기', null),

  ('icefields', true, 3, '/icefields-parkway-jasper-banff-shuttle-tours', null, 6000,
   '— New · Banff ⇄ Jasper', 'Icefields Parkway', 'Shuttle & Sightseeing',
   'Flexible weekday-based shuttles between Banff, Jasper, the Columbia Icefield, and Maligne Lake — with optional attractions and clear pickup points.',
   'Explore Shuttle Routes', null,
   '— 全新 · 班夫 ⇄ 賈斯伯', '冰原大道', '接駁與觀光行程',
   '班夫、賈斯伯、哥倫比亞冰原與瑪琳湖之間的彈性接駁,依星期安排路線,可加購景點門票,接送地點清楚。',
   '探索接駁路線', null,
   '— 신상품 · 밴프 ⇄ 재스퍼', '아이스필드 파크웨이', '셔틀 & 사이트싱',
   '밴프, 재스퍼, 컬럼비아 아이스필드, 멀린 호수 사이의 요일별 셔틀 — 선택형 어트랙션 티켓과 명확한 픽업 지점.',
   '셔틀 노선 둘러보기', null)
on conflict (key) do nothing;

-- 2. SEASON CORRECTION ------------------------------------------------------

update public.tours
   set season = 'summer'
 where slug = 'banff-to-jasper-express-shuttle';

-- 3. ADMIN VISIBILITY CONTROL FOR TOURS -------------------------------------

grant select, update on public.tours to authenticated;

drop policy if exists "Admins update tours" on public.tours;
create policy "Admins update tours"
  on public.tours for update
  to authenticated
  using (true) with check (true);

-- Signed-in admins must also be able to SEE hidden tours in the CMS.
drop policy if exists "Admins read all tours" on public.tours;
create policy "Admins read all tours"
  on public.tours for select
  to authenticated
  using (true);
