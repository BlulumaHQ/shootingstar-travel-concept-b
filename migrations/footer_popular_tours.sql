-- ============================================================================
-- Shooting Star Travel — Footer "Popular Tours" (managed in Admin → Footer Tours)
-- Max 7 links shown. Safe to run more than once.
-- ============================================================================

create table if not exists public.footer_popular_tours (
  id uuid primary key default gen_random_uuid(),
  sort_order integer not null default 0,
  published boolean not null default true,
  url text not null,
  linked_tour_slug text,
  label_en text not null,
  label_zh text,
  label_ko text,
  created_at timestamptz not null default now()
);

grant select on public.footer_popular_tours to anon;
grant select, insert, update, delete on public.footer_popular_tours to authenticated;
grant all on public.footer_popular_tours to service_role;

alter table public.footer_popular_tours enable row level security;

drop policy if exists "Public can read published footer tours" on public.footer_popular_tours;
create policy "Public can read published footer tours"
  on public.footer_popular_tours for select
  to anon, authenticated
  using (published = true or auth.uid() is not null);

drop policy if exists "Admins manage footer tours" on public.footer_popular_tours;
create policy "Admins manage footer tours"
  on public.footer_popular_tours for all
  to authenticated
  using (true) with check (true);

-- Seed only when the table is empty.
insert into public.footer_popular_tours (sort_order, url, linked_tour_slug, label_en, label_zh, label_ko)
select * from (values
  (1, '/banff-tours', null, 'Banff Tours', '班夫行程', '밴프 투어'),
  (2, '/jasper-tours', null, 'Jasper Tours', '賈斯伯行程', '재스퍼 투어'),
  (3, '/tours/western-usa-8-day', 'western-usa-8-day', 'Western US 8-Day Tour', '美西八日遊', '미국 서부 8일 투어'),
  (4, '/tours/rockies-3-day', 'rockies-3-day', 'Rocky Mountains 3-Day Tour', '加拿大洛磯山三日遊', '캐나다 록키 3일 투어'),
  (5, '/tours/vegas-canyon-4-day', 'vegas-canyon-4-day', 'Las Vegas & Canyons 4-Day Tour', '拉斯維加斯與大峽谷四日遊', '라스베이거스 & 캐니언 4일 투어'),
  (6, '/tours/victoria-1-day', 'victoria-1-day', 'Victoria 1-Day Tour', '維多利亞一日遊', '빅토리아 1일 투어'),
  (7, '/tours/seattle-2-day', 'seattle-2-day', 'Seattle 2-Day Tour', '西雅圖兩日遊', '시애틀 2일 투어')
) as v(sort_order, url, linked_tour_slug, label_en, label_zh, label_ko)
where not exists (select 1 from public.footer_popular_tours);
