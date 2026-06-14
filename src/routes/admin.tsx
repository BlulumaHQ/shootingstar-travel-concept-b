import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useCallback } from "react";
import type { Session } from "@supabase/supabase-js";
import { Star, UserCircle, LogOut, Check, X, Loader2, Trash2, RotateCcw } from "lucide-react";
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
        <p className="mt-1 text-sm text-muted-foreground">Sign in to moderate reviews.</p>
        <div className="mt-6 space-y-3">
          <input
            type="email"
            required
            autoComplete="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
          <input
            type="password"
            required
            autoComplete="current-password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        {error && <p className="mt-3 text-sm text-destructive">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="mt-5 w-full rounded-md bg-primary text-primary-foreground py-2 text-sm font-medium hover:bg-primary/90 disabled:opacity-60"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}

type Tab = "pending" | "approved" | "rejected" | "all";

function Dashboard({ onLogout, email }: { onLogout: () => void; email: string }) {
  const [rows, setRows] = useState<ReviewRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<Tab>("pending");
  const [busyId, setBusyId] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setErr(null);
    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) setErr(error.message);
    setRows((data as ReviewRow[]) ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const updateStatus = async (id: string, status: "approved" | "rejected" | "pending") => {
    setBusyId(id);
    const { error } = await supabase.from("reviews").update({ status }).eq("id", id);
    setBusyId(null);
    if (error) {
      setErr(error.message);
      return;
    }
    await load();
  };

  const deleteReview = async (id: string) => {
    setBusyId(id);
    const { error } = await supabase.from("reviews").delete().eq("id", id);
    setBusyId(null);
    setDeleteConfirmId(null);
    if (error) {
      setErr(error.message);
      return;
    }
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
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-foreground">Review moderation</h1>
            <p className="text-xs text-muted-foreground">{email}</p>
          </div>
          <button
            onClick={onLogout}
            className="inline-flex items-center gap-1.5 rounded-md border border-input bg-background px-3 py-1.5 text-sm hover:bg-accent"
          >
            <LogOut size={14} /> Log out
          </button>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="flex flex-wrap gap-2 mb-6">
          {(["pending", "approved", "rejected", "all"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded-full px-4 py-1.5 text-sm border transition ${
                tab === t
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card border-border text-foreground hover:bg-accent"
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
              <ReviewAdminCard
                key={r.id}
                r={r}
                busy={busyId === r.id}
                onUpdate={updateStatus}
                onDeleteRequest={setDeleteConfirmId}
              />
            ))}
          </div>
        )}
      </div>

      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-card border border-border rounded-xl p-6 max-w-sm w-full shadow-lg">
            <h3 className="text-base font-semibold text-foreground">Permanently delete this review?</h3>
            <p className="mt-1 text-sm text-muted-foreground">This cannot be undone.</p>
            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="rounded-md border border-input bg-background px-3 py-2 text-sm hover:bg-accent"
              >
                Cancel
              </button>
              <button
                onClick={() => deleteReview(deleteConfirmId)}
                disabled={busyId === deleteConfirmId}
                className="inline-flex items-center gap-1.5 rounded-md bg-destructive text-destructive-foreground px-3 py-2 text-sm hover:bg-destructive/90 disabled:opacity-60"
              >
                <Trash2 size={14} /> Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ReviewAdminCard({
  r,
  busy,
  onUpdate,
  onDeleteRequest,
}: {
  r: ReviewRow;
  busy: boolean;
  onUpdate: (id: string, status: "approved" | "rejected" | "pending") => void;
  onDeleteRequest: (id: string) => void;
}) {
  const photos = r.photos ?? [];
  const date = r.created_at ? new Date(r.created_at).toLocaleDateString() : "";

  const statusMeta =
    r.status === "approved"
      ? { label: "Approved", color: "bg-emerald-100 text-emerald-700" }
      : r.status === "rejected"
      ? { label: "Rejected", color: "bg-rose-100 text-rose-700" }
      : { label: "Pending", color: "bg-amber-100 text-amber-700" };

  return (
    <article className="bg-card border border-border rounded-xl p-5">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          {r.avatar ? (
            <img src={r.avatar} alt="" className="h-10 w-10 rounded-full object-cover" />
          ) : (
            <div className="h-10 w-10 rounded-full bg-muted grid place-items-center">
              <UserCircle size={22} className="text-muted-foreground" />
            </div>
          )}
          <div>
            <p className="text-sm font-semibold text-foreground">{r.name || "Anonymous"}</p>
            <p className="text-xs text-muted-foreground">{r.tour_label || r.tour_slug || "—"} · {date}</p>
          </div>
        </div>
        <span className={`text-[11px] uppercase tracking-wide px-2 py-1 rounded-full font-medium ${statusMeta.color}`}>
          {statusMeta.label}
        </span>
      </div>

      <div className="mt-3 flex gap-0.5 text-amber-500">
        {Array.from({ length: Math.max(0, Math.min(5, r.rating ?? 0)) }).map((_, i) => (
          <Star key={i} size={14} fill="currentColor" stroke="none" />
        ))}
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
            <button
              onClick={() => onUpdate(r.id, "approved")}
              disabled={busy}
              className="inline-flex items-center gap-1.5 rounded-md bg-emerald-600 text-white px-3 py-1.5 text-sm hover:bg-emerald-700 disabled:opacity-60"
            >
              <Check size={14} /> Approve
            </button>
            <button
              onClick={() => onUpdate(r.id, "rejected")}
              disabled={busy}
              className="inline-flex items-center gap-1.5 rounded-md bg-rose-600 text-white px-3 py-1.5 text-sm hover:bg-rose-700 disabled:opacity-60"
            >
              <X size={14} /> Reject
            </button>
          </>
        )}
        {r.status === "approved" && (
          <>
            <button
              onClick={() => onUpdate(r.id, "pending")}
              disabled={busy}
              className="inline-flex items-center gap-1.5 rounded-md bg-amber-600 text-white px-3 py-1.5 text-sm hover:bg-amber-700 disabled:opacity-60"
            >
              <RotateCcw size={14} /> Unapprove
            </button>
            <button
              onClick={() => onUpdate(r.id, "rejected")}
              disabled={busy}
              className="inline-flex items-center gap-1.5 rounded-md bg-rose-600 text-white px-3 py-1.5 text-sm hover:bg-rose-700 disabled:opacity-60"
            >
              <X size={14} /> Reject
            </button>
          </>
        )}
        {r.status === "rejected" && (
          <button
            onClick={() => onUpdate(r.id, "approved")}
            disabled={busy}
            className="inline-flex items-center gap-1.5 rounded-md bg-emerald-600 text-white px-3 py-1.5 text-sm hover:bg-emerald-700 disabled:opacity-60"
          >
            <Check size={14} /> Approve
          </button>
        )}
        <button
          onClick={() => onDeleteRequest(r.id)}
          disabled={busy}
          className="inline-flex items-center gap-1.5 rounded-md border border-destructive/40 text-destructive px-3 py-1.5 text-sm hover:bg-destructive/10 disabled:opacity-60 ml-auto"
        >
          <Trash2 size={14} /> Delete
        </button>
      </div>
    </article>
  );
}
