import { useCallback, useEffect, useState } from "react";
import { Loader2, RotateCcw, Eye, EyeOff, Pencil, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { supabase } from "@/lib/supabase";

/* Admin → Footer Tours: manage up to 7 "Popular Tours" footer links. */

const FOOTER_MAX = 7;

type FooterRow = {
  id: string;
  sort_order: number;
  published: boolean;
  url: string;
  linked_tour_slug: string | null;
  label_en: string;
  label_zh: string | null;
  label_ko: string | null;
};

type TourLite = { slug: string; locale: string; title: string | null; published: boolean | null; sort_order: number | null };

type FooterDraft = {
  id?: string;
  url: string;
  linked_tour_slug: string | null;
  label_en: string;
  label_zh: string;
  label_ko: string;
};

const CATEGORY_PAGES: { url: string; en: string; zh: string; ko: string }[] = [
  { url: "/banff-tours", en: "Banff Tours", zh: "班夫行程", ko: "밴프 투어" },
  { url: "/jasper-tours", en: "Jasper Tours", zh: "賈斯伯行程", ko: "재스퍼 투어" },
  { url: "/rocky-mountain-lake-tours", en: "Rocky Mountain Lake Tours", zh: "洛磯山脈湖泊之旅", ko: "로키 마운틴 레이크 투어" },
  { url: "/icefields-parkway-jasper-banff-shuttle-tours", en: "Icefields Parkway & Jasper Shuttles", zh: "冰原大道與賈斯伯接駁", ko: "아이스필드 파크웨이 & 재스퍼 셔틀" },
  { url: "/tours", en: "All Tours", zh: "所有行程", ko: "전체 투어" },
];

const EMPTY_DRAFT: FooterDraft = { url: "", linked_tour_slug: null, label_en: "", label_zh: "", label_ko: "" };

export function FooterToursPanel() {
  const [rows, setRows] = useState<FooterRow[]>([]);
  const [tours, setTours] = useState<TourLite[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const [draft, setDraft] = useState<FooterDraft | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<FooterRow | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setErr(null);
    const [f, t] = await Promise.all([
      supabase.from("footer_popular_tours").select("*").order("sort_order", { ascending: true }),
      supabase.from("tours").select("slug,locale,title,published,sort_order").order("sort_order", { ascending: true }),
    ]);
    if (f.error) setErr(f.error.message);
    setRows((f.data as FooterRow[]) ?? []);
    setTours((t.data as TourLite[]) ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { void load(); }, [load]);

  const slugs = Array.from(new Set(tours.map((r) => r.slug)));
  const publishedSlugs = new Set(tours.filter((r) => r.published).map((r) => r.slug));
  const titleFor = (slug: string, locale: string) =>
    tours.find((r) => r.slug === slug && r.locale === locale)?.title ?? "";

  const publishedCount = rows.filter((r) => r.published).length;
  const canAdd = rows.length < FOOTER_MAX;

  const togglePublished = async (row: FooterRow) => {
    if (!row.published && publishedCount >= FOOTER_MAX) { setErr(`At most ${FOOTER_MAX} links can be shown.`); return; }
    setBusy(row.id);
    const { error } = await supabase.from("footer_popular_tours").update({ published: !row.published }).eq("id", row.id);
    if (error) setErr(error.message);
    else setRows((prev) => prev.map((r) => (r.id === row.id ? { ...r, published: !r.published } : r)));
    setBusy(null);
  };

  const move = async (index: number, dir: -1 | 1) => {
    const next = [...rows];
    const j = index + dir;
    if (!next[index] || !next[j]) return;
    [next[index], next[j]] = [next[j], next[index]];
    setBusy(next[j].id);
    const results = await Promise.all(
      next.map((r, i) => supabase.from("footer_popular_tours").update({ sort_order: i + 1 }).eq("id", r.id)),
    );
    const failed = results.find((r) => r.error);
    if (failed?.error) setErr(failed.error.message);
    setBusy(null);
    await load();
  };

  const save = async () => {
    if (!draft) return;
    if (!draft.url.trim() || !draft.label_en.trim()) { setErr("Link and English label are required."); return; }
    setBusy("save");
    setErr(null);
    const payload = {
      url: draft.url.trim(),
      linked_tour_slug: draft.linked_tour_slug || null,
      label_en: draft.label_en.trim(),
      label_zh: draft.label_zh.trim() || null,
      label_ko: draft.label_ko.trim() || null,
    };
    const { error } = draft.id
      ? await supabase.from("footer_popular_tours").update(payload).eq("id", draft.id)
      : await supabase.from("footer_popular_tours").insert({
          ...payload,
          published: publishedCount < FOOTER_MAX,
          sort_order: (rows[rows.length - 1]?.sort_order ?? 0) + 1,
        });
    setBusy(null);
    if (error) { setErr(error.message); return; }
    setDraft(null);
    await load();
  };

  const remove = async () => {
    if (!confirmDelete) return;
    setBusy(confirmDelete.id);
    const { error } = await supabase.from("footer_popular_tours").delete().eq("id", confirmDelete.id);
    setBusy(null);
    setConfirmDelete(null);
    if (error) setErr(error.message);
    await load();
  };

  const pickSource = (value: string) => {
    if (!draft) return;
    if (value.startsWith("tour:")) {
      const slug = value.slice(5);
      setDraft({
        ...draft,
        url: `/tours/${slug}`,
        linked_tour_slug: slug,
        label_en: titleFor(slug, "en") || slug,
        label_zh: titleFor(slug, "zh"),
        label_ko: titleFor(slug, "ko"),
      });
    } else if (value.startsWith("page:")) {
      const p = CATEGORY_PAGES.find((c) => c.url === value.slice(5));
      if (p) setDraft({ ...draft, url: p.url, linked_tour_slug: null, label_en: p.en, label_zh: p.zh, label_ko: p.ko });
    }
  };

  const inputCls = "w-full rounded-md border border-input bg-background px-2.5 py-1.5 text-sm";

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm text-muted-foreground">
          Footer “Popular Tours” links · <span className="font-medium text-foreground">{rows.length} / {FOOTER_MAX}</span> used.
          Links to hidden tours are never shown on the site.
        </p>
        <div className="flex gap-2">
          <button onClick={() => void load()} className="inline-flex items-center gap-1.5 rounded-md border border-input bg-background px-2.5 py-1.5 text-sm hover:bg-accent">
            <RotateCcw size={14} /> Refresh
          </button>
          <button
            onClick={() => setDraft({ ...EMPTY_DRAFT })}
            disabled={!canAdd}
            title={canAdd ? "" : `Maximum ${FOOTER_MAX} links`}
            className="inline-flex items-center gap-1.5 rounded-md bg-primary text-primary-foreground px-3 py-1.5 text-sm hover:bg-primary/90 disabled:opacity-50"
          >
            + Add link
          </button>
        </div>
      </div>

      {err && <p className="mt-4 text-sm text-destructive">{err}</p>}

      {loading ? (
        <div className="py-16 grid place-items-center"><Loader2 className="animate-spin text-muted-foreground" /></div>
      ) : (
        <div className="mt-4 space-y-2">
          {rows.map((r, i) => {
            const slug = r.linked_tour_slug || r.url.match(/^\/tours\/([^/?#]+)/)?.[1] || null;
            const blocked = !!slug && !publishedSlugs.has(slug);
            return (
              <div key={r.id} className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3">
                <span className="w-5 text-center text-sm font-semibold text-muted-foreground">{i + 1}</span>
                <div className="flex flex-col">
                  <button onClick={() => void move(i, -1)} disabled={i === 0 || !!busy} aria-label="Move up" className="text-muted-foreground hover:text-foreground disabled:opacity-30"><ChevronLeft size={16} className="rotate-90" /></button>
                  <button onClick={() => void move(i, 1)} disabled={i === rows.length - 1 || !!busy} aria-label="Move down" className="text-muted-foreground hover:text-foreground disabled:opacity-30"><ChevronRight size={16} className="rotate-90" /></button>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-foreground truncate">{r.label_en}</div>
                  <div className="text-xs text-muted-foreground truncate">
                    {[r.label_zh, r.label_ko].filter(Boolean).join(" · ")} · {r.url}
                  </div>
                  {blocked && r.published && (
                    <div className="mt-1 text-xs text-destructive">Hidden on the site: its linked tour is not published.</div>
                  )}
                </div>
                <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs ${r.published ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
                  {r.published ? <Eye size={12} /> : <EyeOff size={12} />} {r.published ? "Shown" : "Hidden"}
                </span>
                <button onClick={() => void togglePublished(r)} disabled={busy === r.id} className="inline-flex items-center gap-1.5 rounded-md border border-input bg-background px-2.5 py-1.5 text-xs hover:bg-accent disabled:opacity-60">
                  {busy === r.id ? <Loader2 size={13} className="animate-spin" /> : r.published ? <EyeOff size={13} /> : <Eye size={13} />}
                  {r.published ? "Hide" : "Show"}
                </button>
                <button onClick={() => setDraft({ id: r.id, url: r.url, linked_tour_slug: r.linked_tour_slug, label_en: r.label_en, label_zh: r.label_zh ?? "", label_ko: r.label_ko ?? "" })} aria-label="Edit" className="rounded-md border border-input bg-background p-1.5 hover:bg-accent">
                  <Pencil size={13} />
                </button>
                <button onClick={() => setConfirmDelete(r)} aria-label="Remove" className="rounded-md border border-input bg-background p-1.5 text-destructive hover:bg-accent">
                  <Trash2 size={13} />
                </button>
              </div>
            );
          })}
          {rows.length === 0 && (
            <p className="py-10 text-center text-muted-foreground">No footer links yet. Run the footer_popular_tours migration, or add one above.</p>
          )}
        </div>
      )}

      {draft && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-card border border-border rounded-xl p-6 max-w-md w-full shadow-lg space-y-3">
            <h3 className="text-base font-semibold text-foreground">{draft.id ? "Edit footer link" : "Add footer link"}</h3>
            <label className="block text-xs text-muted-foreground">
              Quick pick
              <select defaultValue="" onChange={(e) => pickSource(e.target.value)} className={`${inputCls} mt-1`}>
                <option value="" disabled>Choose a tour or page…</option>
                <optgroup label="Pages">
                  {CATEGORY_PAGES.map((p) => <option key={p.url} value={`page:${p.url}`}>{p.en}</option>)}
                </optgroup>
                <optgroup label="Tours">
                  {slugs.map((s) => (
                    <option key={s} value={`tour:${s}`}>{titleFor(s, "en") || s}{publishedSlugs.has(s) ? "" : " (hidden)"}</option>
                  ))}
                </optgroup>
              </select>
            </label>
            <label className="block text-xs text-muted-foreground">Link
              <input value={draft.url} onChange={(e) => setDraft({ ...draft, url: e.target.value })} placeholder="/tours/rockies-3-day" className={`${inputCls} mt-1`} />
            </label>
            <label className="block text-xs text-muted-foreground">English label
              <input value={draft.label_en} onChange={(e) => setDraft({ ...draft, label_en: e.target.value })} className={`${inputCls} mt-1`} />
            </label>
            <label className="block text-xs text-muted-foreground">中文 label
              <input value={draft.label_zh} onChange={(e) => setDraft({ ...draft, label_zh: e.target.value })} className={`${inputCls} mt-1`} />
            </label>
            <label className="block text-xs text-muted-foreground">한국어 label
              <input value={draft.label_ko} onChange={(e) => setDraft({ ...draft, label_ko: e.target.value })} className={`${inputCls} mt-1`} />
            </label>
            <div className="pt-2 flex justify-end gap-2">
              <button onClick={() => setDraft(null)} className="rounded-md border border-input bg-background px-3 py-2 text-sm hover:bg-accent">Cancel</button>
              <button onClick={() => void save()} disabled={busy === "save"} className="inline-flex items-center gap-1.5 rounded-md bg-primary text-primary-foreground px-3 py-2 text-sm hover:bg-primary/90 disabled:opacity-60">
                {busy === "save" && <Loader2 size={14} className="animate-spin" />} Save
              </button>
            </div>
          </div>
        </div>
      )}

      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-card border border-border rounded-xl p-6 max-w-sm w-full shadow-lg">
            <h3 className="text-base font-semibold text-foreground">Remove “{confirmDelete.label_en}” from the footer?</h3>
            <p className="mt-1 text-sm text-muted-foreground">Only the footer link is removed. The tour itself is not affected.</p>
            <div className="mt-5 flex justify-end gap-2">
              <button onClick={() => setConfirmDelete(null)} className="rounded-md border border-input bg-background px-3 py-2 text-sm hover:bg-accent">Cancel</button>
              <button onClick={() => void remove()} className="rounded-md bg-destructive text-destructive-foreground px-3 py-2 text-sm hover:bg-destructive/90">Remove</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
