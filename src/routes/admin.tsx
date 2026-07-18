import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useCallback } from "react";
import type { Session } from "@supabase/supabase-js";
import { Star, UserCircle, LogOut, Check, X, Loader2, Trash2, RotateCcw, Upload, Eye, EyeOff, Image as ImageIcon, Video, Pencil, UploadCloud, ChevronLeft, ChevronRight } from "lucide-react";
import { supabase, type ReviewRow } from "@/lib/supabase";


export const Route = createFileRoute("/admin")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Admin — Shooting Star Travel" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setReady(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  if (!ready) {
    return (
      <div className="min-h-screen grid place-items-center bg-background">
        <Loader2 className="animate-spin text-muted-foreground" />
      </div>
    );
  }

  return session ? <Dashboard onLogout={() => supabase.auth.signOut()} email={session.user.email ?? ""} /> : <LoginForm />;
}

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) setError(error.message);
  };

  return (
    <div className="min-h-screen grid place-items-center bg-background px-4">
      <form onSubmit={submit} className="w-full max-w-sm bg-card border border-border rounded-xl p-8 shadow-sm">
        <h1 className="text-xl font-semibold text-foreground">Admin sign in</h1>
        <p className="mt-1 text-sm text-muted-foreground">Sign in to manage reviews and gallery.</p>
        <div className="mt-6 space-y-3">
          <input type="email" required autoComplete="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring" />
          <input type="password" required autoComplete="current-password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring" />
        </div>
        {error && <p className="mt-3 text-sm text-destructive">{error}</p>}
        <button type="submit" disabled={loading} className="mt-5 w-full rounded-md bg-primary text-primary-foreground py-2 text-sm font-medium hover:bg-primary/90 disabled:opacity-60">
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}

type TopTab = "reviews" | "gallery";

function Dashboard({ onLogout, email }: { onLogout: () => void; email: string }) {
  const [topTab, setTopTab] = useState<TopTab>("reviews");

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-foreground">Admin dashboard</h1>
            <p className="text-xs text-muted-foreground">{email}</p>
          </div>
          <button onClick={onLogout} className="inline-flex items-center gap-1.5 rounded-md border border-input bg-background px-3 py-1.5 text-sm hover:bg-accent">
            <LogOut size={14} /> Log out
          </button>
        </div>
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex gap-1">
            {(["reviews", "gallery"] as TopTab[]).map((t) => (
              <button
                key={t}
                onClick={() => setTopTab(t)}
                className={`px-4 py-2.5 text-sm font-medium border-b-2 transition ${
                  topTab === t ? "border-primary text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {t === "reviews" ? "Reviews" : "Gallery"}
              </button>
            ))}
          </div>
        </div>
      </header>

      {topTab === "reviews" ? <ReviewsPanel /> : <GalleryPanel />}
    </div>
  );
}

/* ───────────────────────── Reviews panel ───────────────────────── */

type ReviewTab = "pending" | "approved" | "rejected" | "all";

function ReviewsPanel() {
  const [rows, setRows] = useState<ReviewRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<ReviewTab>("pending");
  const [busyId, setBusyId] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setErr(null);
    const { data, error } = await supabase.from("reviews").select("*").order("created_at", { ascending: false });
    if (error) setErr(error.message);
    setRows((data as ReviewRow[]) ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const updateStatus = async (id: string, status: "approved" | "rejected" | "pending") => {
    setBusyId(id);
    const { error } = await supabase.from("reviews").update({ status }).eq("id", id);
    setBusyId(null);
    if (error) return setErr(error.message);
    await load();
  };

  const deleteReview = async (id: string) => {
    setBusyId(id);
    const { error } = await supabase.from("reviews").delete().eq("id", id);
    setBusyId(null);
    setDeleteConfirmId(null);
    if (error) return setErr(error.message);
    await load();
  };

  const counts = {
    pending: rows.filter((r) => r.status === "pending").length,
    approved: rows.filter((r) => r.status === "approved").length,
    rejected: rows.filter((r) => r.status === "rejected").length,
    all: rows.length,
  };

  const filtered = tab === "all" ? rows : rows.filter((r) => r.status === tab);

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <div className="flex flex-wrap gap-2 mb-6">
        {(["pending", "approved", "rejected", "all"] as ReviewTab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-full px-4 py-1.5 text-sm border transition ${
              tab === t ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border text-foreground hover:bg-accent"
            }`}
          >
            {t[0].toUpperCase() + t.slice(1)} <span className="opacity-70">({counts[t]})</span>
          </button>
        ))}
      </div>

      {err && <div className="mb-4 rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">{err}</div>}

      {loading ? (
        <div className="grid place-items-center py-20"><Loader2 className="animate-spin text-muted-foreground" /></div>
      ) : filtered.length === 0 ? (
        <p className="text-sm text-muted-foreground py-12 text-center">No reviews in this tab.</p>
      ) : (
        <div className="space-y-4">
          {filtered.map((r) => (
            <ReviewAdminCard key={r.id} r={r} busy={busyId === r.id} onUpdate={updateStatus} onDeleteRequest={setDeleteConfirmId} />
          ))}
        </div>
      )}

      {deleteConfirmId && (
        <ConfirmDialog
          title="Permanently delete this review?"
          onCancel={() => setDeleteConfirmId(null)}
          onConfirm={() => deleteReview(deleteConfirmId)}
          busy={busyId === deleteConfirmId}
        />
      )}
    </div>
  );
}

function ReviewAdminCard({
  r, busy, onUpdate, onDeleteRequest,
}: { r: ReviewRow; busy: boolean; onUpdate: (id: string, status: "approved" | "rejected" | "pending") => void; onDeleteRequest: (id: string) => void; }) {
  const photos = r.photos ?? [];
  const date = r.created_at ? new Date(r.created_at).toLocaleDateString() : "";
  const statusMeta =
    r.status === "approved" ? { label: "Approved", color: "bg-emerald-100 text-emerald-700" } :
    r.status === "rejected" ? { label: "Rejected", color: "bg-rose-100 text-rose-700" } :
    { label: "Pending", color: "bg-amber-100 text-amber-700" };

  return (
    <article className="bg-card border border-border rounded-xl p-5">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          {r.avatar ? <img src={r.avatar} alt="" className="h-10 w-10 rounded-full object-cover" /> : (
            <div className="h-10 w-10 rounded-full bg-muted grid place-items-center"><UserCircle size={22} className="text-muted-foreground" /></div>
          )}
          <div>
            <p className="text-sm font-semibold text-foreground">{r.name || "Anonymous"}</p>
            <p className="text-xs text-muted-foreground">{r.tour_label || r.tour_slug || "—"} · {date}</p>
          </div>
        </div>
        <span className={`text-[11px] uppercase tracking-wide px-2 py-1 rounded-full font-medium ${statusMeta.color}`}>{statusMeta.label}</span>
      </div>

      <div className="mt-3 flex gap-0.5 text-amber-500">
        {Array.from({ length: Math.max(0, Math.min(5, r.rating ?? 0)) }).map((_, i) => <Star key={i} size={14} fill="currentColor" stroke="none" />)}
      </div>

      <p className="mt-3 text-sm text-foreground/85 leading-relaxed whitespace-pre-line">{r.text}</p>

      {photos.length > 0 && (
        <div className="mt-3 flex gap-2 flex-wrap">
          {photos.map((p, i) => (
            <a key={i} href={p} target="_blank" rel="noopener noreferrer" className="block">
              <img src={p} alt="" className="h-16 w-16 object-cover rounded-md border border-border" />
            </a>
          ))}
        </div>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-2">
        {r.status === "pending" && (
          <>
            <button onClick={() => onUpdate(r.id, "approved")} disabled={busy} className="inline-flex items-center gap-1.5 rounded-md bg-emerald-600 text-white px-3 py-1.5 text-sm hover:bg-emerald-700 disabled:opacity-60"><Check size={14} /> Approve</button>
            <button onClick={() => onUpdate(r.id, "rejected")} disabled={busy} className="inline-flex items-center gap-1.5 rounded-md bg-rose-600 text-white px-3 py-1.5 text-sm hover:bg-rose-700 disabled:opacity-60"><X size={14} /> Reject</button>
          </>
        )}
        {r.status === "approved" && (
          <>
            <button onClick={() => onUpdate(r.id, "pending")} disabled={busy} className="inline-flex items-center gap-1.5 rounded-md bg-amber-600 text-white px-3 py-1.5 text-sm hover:bg-amber-700 disabled:opacity-60"><RotateCcw size={14} /> Unapprove</button>
            <button onClick={() => onUpdate(r.id, "rejected")} disabled={busy} className="inline-flex items-center gap-1.5 rounded-md bg-rose-600 text-white px-3 py-1.5 text-sm hover:bg-rose-700 disabled:opacity-60"><X size={14} /> Reject</button>
          </>
        )}
        {r.status === "rejected" && (
          <button onClick={() => onUpdate(r.id, "approved")} disabled={busy} className="inline-flex items-center gap-1.5 rounded-md bg-emerald-600 text-white px-3 py-1.5 text-sm hover:bg-emerald-700 disabled:opacity-60"><Check size={14} /> Approve</button>
        )}
        <button onClick={() => onDeleteRequest(r.id)} disabled={busy} className="inline-flex items-center gap-1.5 rounded-md border border-destructive/40 text-destructive px-3 py-1.5 text-sm hover:bg-destructive/10 disabled:opacity-60 ml-auto"><Trash2 size={14} /> Delete</button>
      </div>
    </article>
  );
}

/* ───────────────────────── Gallery panel ───────────────────────── */

const GALLERY_BUCKET = "gallery-photos";
const ACCEPTED = ["image/jpeg", "image/png", "image/webp"];

type GalleryRow = {
  id: string;
  photos: string[] | null;
  youtube_url: string | null;
  note: string | null;
  status: string;
  created_at: string;
  // legacy columns that may exist on old rows, unused by the form:
  tour_slug?: string | null;
  tour_label?: string | null;
  trip_date?: string | null;
};

async function uploadGalleryPhoto(file: File): Promise<string | null> {
  if (!ACCEPTED.includes(file.type)) return null;
  const ext = file.name.split(".").pop() || "jpg";
  const path = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}.${ext}`;
  const { error } = await supabase.storage.from(GALLERY_BUCKET).upload(path, file, {
    contentType: file.type, cacheControl: "3600", upsert: false,
  });
  if (error) {
    console.error("gallery upload failed", error);
    return null;
  }
  const { data } = supabase.storage.from(GALLERY_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

function GalleryPanel() {
  const [rows, setRows] = useState<GalleryRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // form state
  const [photoFiles, setPhotoFiles] = useState<File[]>([]);
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [note, setNote] = useState("");
  const [warn, setWarn] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formMsg, setFormMsg] = useState<{ kind: "ok" | "err"; text: string } | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  useEffect(() => {
    const urls = photoFiles.map((f) => URL.createObjectURL(f));
    setPreviewUrls(urls);
    return () => { urls.forEach((u) => URL.revokeObjectURL(u)); };
  }, [photoFiles]);

  const load = useCallback(async () => {
    setLoading(true);
    setErr(null);
    const { data, error } = await supabase.from("gallery").select("*").order("created_at", { ascending: false });
    if (error) setErr(error.message);
    setRows((data as GalleryRow[]) ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  function addFiles(incoming: FileList | File[] | null) {
    if (!incoming) return;
    const accepted = Array.from(incoming).filter((f) => ACCEPTED.includes(f.type));
    const combined = [...photoFiles, ...accepted];
    if (combined.length > 5) {
      setWarn("You can upload up to 5 photos");
      setPhotoFiles(combined.slice(0, 5));
    } else {
      setWarn("");
      setPhotoFiles(combined);
    }
  }

  function onPhotosPick(e: React.ChangeEvent<HTMLInputElement>) {
    addFiles(e.target.files);
    e.target.value = "";
  }

  function removePhoto(idx: number) {
    setPhotoFiles((prev) => prev.filter((_, i) => i !== idx));
    setWarn("");
  }

  function movePhoto(idx: number, dir: -1 | 1) {
    setPhotoFiles((prev) => {
      const next = [...prev];
      const target = idx + dir;
      if (target < 0 || target >= next.length) return prev;
      [next[idx], next[target]] = [next[target], next[idx]];
      return next;
    });
  }


  async function submitAlbum(e: React.FormEvent) {
    e.preventDefault();
    setFormMsg(null);
    setSubmitting(true);
    try {
      const uploads = await Promise.all(photoFiles.map(uploadGalleryPhoto));
      const photos = uploads.filter((u): u is string => !!u);
      const { error } = await supabase.from("gallery").insert({
        photos,
        youtube_url: youtubeUrl.trim() || null,
        note: note.trim() || null,
        status: "published",
      });
      if (error) throw error;
      setFormMsg({ kind: "ok", text: "Post added." });
      setPhotoFiles([]);
      setYoutubeUrl("");
      setNote("");
      setWarn("");
      await load();
    } catch (e: any) {
      setFormMsg({ kind: "err", text: e?.message || "Failed to add post." });
    } finally {
      setSubmitting(false);
    }
  }

  async function toggleStatus(row: GalleryRow) {
    setBusyId(row.id);
    const next = row.status === "published" ? "hidden" : "published";
    const { error } = await supabase.from("gallery").update({ status: next }).eq("id", row.id);
    setBusyId(null);
    if (error) return setErr(error.message);
    await load();
  }

  async function deleteAlbum(id: string) {
    setBusyId(id);
    const { error } = await supabase.from("gallery").delete().eq("id", id);
    setBusyId(null);
    setDeleteConfirmId(null);
    if (error) return setErr(error.message);
    await load();
  }

  async function saveEdit(id: string, patch: { note: string | null; youtube_url: string | null }) {
    setBusyId(id);
    const { error } = await supabase.from("gallery").update(patch).eq("id", id);
    setBusyId(null);
    if (error) return setErr(error.message);
    await load();
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {/* Add form */}
      <section className="bg-card border border-border rounded-xl p-5 md:p-6 mb-8">
        <h2 className="text-base font-semibold text-foreground">Add new post</h2>
        <form onSubmit={submitAlbum} className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="block md:col-span-2">
            <span className="block text-xs font-medium text-muted-foreground mb-1">Photos (up to 5)</span>
            <label
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragOver(false);
                addFiles(e.dataTransfer.files);
              }}
              className={`flex flex-col items-center justify-center gap-2 w-full rounded-xl border-2 border-dashed px-6 py-10 text-center cursor-pointer transition ${
                dragOver ? "border-primary bg-primary/5" : "border-border bg-background hover:bg-accent/40"
              }`}
            >
              <UploadCloud size={32} className="text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Click to upload photos</span>
              <span className="text-xs text-muted-foreground">Up to 5 · JPG, PNG, or WebP</span>
              <input
                type="file"
                multiple
                accept="image/jpeg,image/png,image/webp"
                onChange={onPhotosPick}
                className="hidden"
              />
            </label>
            {warn && <p className="mt-2 text-xs text-amber-600">{warn}</p>}
            {photoFiles.length > 0 && (
              <div className="mt-3">
                <p className="text-xs text-muted-foreground mb-2">
                  {photoFiles.length} photo{photoFiles.length === 1 ? "" : "s"} selected · first photo is the cover
                </p>
                <div className="flex flex-wrap gap-3">
                  {photoFiles.map((f, i) => (
                    <div key={`${f.name}-${i}`} className="relative h-24 w-24 rounded-md overflow-hidden border border-border bg-muted group">
                      {previewUrls[i] && (
                        <img src={previewUrls[i]} alt="" className="h-full w-full object-cover" />
                      )}
                      <button
                        type="button"
                        onClick={() => removePhoto(i)}
                        aria-label="Remove photo"
                        className="absolute top-1 right-1 h-6 w-6 grid place-items-center rounded-full bg-black/60 text-white hover:bg-black/80"
                      >
                        <X size={12} />
                      </button>
                      <div className="absolute bottom-0 inset-x-0 flex justify-between bg-black/50 opacity-0 group-hover:opacity-100 transition">
                        <button
                          type="button"
                          onClick={() => movePhoto(i, -1)}
                          disabled={i === 0}
                          aria-label="Move left"
                          className="flex-1 py-1 text-white text-xs disabled:opacity-30 hover:bg-black/40"
                        >
                          <ChevronLeft size={12} className="mx-auto" />
                        </button>
                        <button
                          type="button"
                          onClick={() => movePhoto(i, 1)}
                          disabled={i === photoFiles.length - 1}
                          aria-label="Move right"
                          className="flex-1 py-1 text-white text-xs disabled:opacity-30 hover:bg-black/40"
                        >
                          <ChevronRight size={12} className="mx-auto" />
                        </button>
                      </div>
                      {i === 0 && (
                        <span className="absolute top-1 left-1 text-[9px] uppercase tracking-wide bg-primary text-primary-foreground px-1.5 py-0.5 rounded">Cover</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <label className="block md:col-span-2">
            <span className="block text-xs font-medium text-muted-foreground mb-1">YouTube URL (optional)</span>
            <input type="url" placeholder="https://youtu.be/…" value={youtubeUrl} onChange={(e) => setYoutubeUrl(e.target.value)} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
          </label>
          <label className="block md:col-span-2">
            <span className="block text-xs font-medium text-muted-foreground mb-1">Note / Story (optional)</span>
            <textarea
              rows={4}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Write a short note or story to show under the photos…"
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
          </label>
          <div className="md:col-span-2 flex items-center gap-3">
            <button type="submit" disabled={submitting} className="inline-flex items-center gap-1.5 rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:bg-primary/90 disabled:opacity-60">
              {submitting ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
              {submitting ? "Adding…" : "Add to Gallery"}
            </button>
            {formMsg && (
              <p className={`text-sm ${formMsg.kind === "ok" ? "text-emerald-700" : "text-destructive"}`}>{formMsg.text}</p>
            )}
          </div>
        </form>
      </section>

      {/* Manage existing */}
      <h2 className="text-base font-semibold text-foreground mb-3">Posts</h2>
      {err && <div className="mb-4 rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">{err}</div>}

      {loading ? (
        <div className="grid place-items-center py-20"><Loader2 className="animate-spin text-muted-foreground" /></div>
      ) : rows.length === 0 ? (
        <p className="text-sm text-muted-foreground py-12 text-center">No posts yet.</p>
      ) : (
        <div className="space-y-3">
          {rows.map((row) => (
            <GalleryAdminCard
              key={row.id}
              row={row}
              busy={busyId === row.id}
              onToggle={() => toggleStatus(row)}
              onDeleteRequest={() => setDeleteConfirmId(row.id)}
              onSaveEdit={(patch) => saveEdit(row.id, patch)}
            />
          ))}
        </div>
      )}

      {deleteConfirmId && (
        <ConfirmDialog
          title="Permanently delete this post?"
          onCancel={() => setDeleteConfirmId(null)}
          onConfirm={() => deleteAlbum(deleteConfirmId)}
          busy={busyId === deleteConfirmId}
        />
      )}
    </div>
  );
}

function GalleryAdminCard({
  row, busy, onToggle, onDeleteRequest, onSaveEdit,
}: {
  row: GalleryRow;
  busy: boolean;
  onToggle: () => void;
  onDeleteRequest: () => void;
  onSaveEdit: (patch: { note: string | null; youtube_url: string | null }) => void | Promise<void>;
}) {
  const photos = row.photos ?? [];
  const cover = photos[0];
  const date = row.created_at ? new Date(row.created_at).toLocaleDateString() : "—";
  const isPublished = row.status === "published";
  const badge = isPublished
    ? { label: "Published", color: "bg-emerald-100 text-emerald-700" }
    : { label: "Hidden", color: "bg-slate-200 text-slate-700" };

  const firstLine = (row.note || "").split(/\r?\n/)[0].trim();
  const heading = firstLine ? (firstLine.length > 80 ? firstLine.slice(0, 80) + "…" : firstLine) : "Untitled post";

  const [editing, setEditing] = useState(false);
  const [editNote, setEditNote] = useState(row.note ?? "");
  const [editYoutube, setEditYoutube] = useState(row.youtube_url ?? "");

  function startEdit() {
    setEditNote(row.note ?? "");
    setEditYoutube(row.youtube_url ?? "");
    setEditing(true);
  }

  async function save() {
    await onSaveEdit({
      note: editNote.trim() || null,
      youtube_url: editYoutube.trim() || null,
    });
    setEditing(false);
  }

  return (
    <article className="bg-card border border-border rounded-xl p-4">
      <div className="flex gap-4 items-start">
        <div className="h-20 w-28 shrink-0 rounded-md overflow-hidden bg-muted">
          {cover ? <img src={cover} alt="" className="h-full w-full object-cover" /> : <div className="h-full w-full grid place-items-center text-muted-foreground"><ImageIcon size={20} /></div>}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div className="min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">{heading}</p>
              <p className="text-xs text-muted-foreground">
                {date} · {photos.length} photo{photos.length === 1 ? "" : "s"}
                {row.youtube_url ? <> · <span className="inline-flex items-center gap-1"><Video size={11} />video</span></> : null}
              </p>
            </div>
            <span className={`text-[11px] uppercase tracking-wide px-2 py-1 rounded-full font-medium ${badge.color}`}>{badge.label}</span>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <button onClick={onToggle} disabled={busy} className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm disabled:opacity-60 ${isPublished ? "bg-amber-600 text-white hover:bg-amber-700" : "bg-emerald-600 text-white hover:bg-emerald-700"}`}>
              {isPublished ? <><EyeOff size={14} /> Hide</> : <><Eye size={14} /> Publish</>}
            </button>
            <button onClick={startEdit} disabled={busy} className="inline-flex items-center gap-1.5 rounded-md bg-slate-600 text-white px-3 py-1.5 text-sm hover:bg-slate-700 disabled:opacity-60">
              <Pencil size={14} /> Edit
            </button>
            <button onClick={onDeleteRequest} disabled={busy} className="inline-flex items-center gap-1.5 rounded-md border border-destructive/40 text-destructive px-3 py-1.5 text-sm hover:bg-destructive/10 disabled:opacity-60 ml-auto">
              <Trash2 size={14} /> Delete
            </button>
          </div>
        </div>
      </div>

      {editing && (
        <div className="mt-4 border-t border-border pt-4 grid gap-3">
          <label className="block">
            <span className="block text-xs font-medium text-muted-foreground mb-1">Note / Story</span>
            <textarea
              rows={4}
              value={editNote}
              onChange={(e) => setEditNote(e.target.value)}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
          </label>
          <label className="block">
            <span className="block text-xs font-medium text-muted-foreground mb-1">YouTube URL</span>
            <input
              type="url"
              value={editYoutube}
              onChange={(e) => setEditYoutube(e.target.value)}
              placeholder="https://youtu.be/…"
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
          </label>
          <div className="flex items-center gap-2">
            <button onClick={save} disabled={busy} className="inline-flex items-center gap-1.5 rounded-md bg-primary text-primary-foreground px-3 py-1.5 text-sm font-medium hover:bg-primary/90 disabled:opacity-60">
              {busy ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />} Save
            </button>
            <button onClick={() => setEditing(false)} disabled={busy} className="rounded-md border border-input bg-background px-3 py-1.5 text-sm hover:bg-accent">
              Cancel
            </button>
          </div>
        </div>
      )}
    </article>
  );
}


function ConfirmDialog({ title, onCancel, onConfirm, busy }: { title: string; onCancel: () => void; onConfirm: () => void; busy: boolean }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-card border border-border rounded-xl p-6 max-w-sm w-full shadow-lg">
        <h3 className="text-base font-semibold text-foreground">{title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">This cannot be undone.</p>
        <div className="mt-5 flex justify-end gap-2">
          <button onClick={onCancel} className="rounded-md border border-input bg-background px-3 py-2 text-sm hover:bg-accent">Cancel</button>
          <button onClick={onConfirm} disabled={busy} className="inline-flex items-center gap-1.5 rounded-md bg-destructive text-destructive-foreground px-3 py-2 text-sm hover:bg-destructive/90 disabled:opacity-60">
            <Trash2 size={14} /> Delete
          </button>
        </div>
      </div>
    </div>
  );
}
